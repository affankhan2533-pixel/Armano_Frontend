import crypto from 'crypto';
import { NextResponse } from 'next/server';
import { validateRfqPayload } from '@/lib/server/validation';
import { checkRfqRateLimit, extractClientIp } from '@/lib/server/rateLimiter';
import { verifyTurnstileToken } from '@/lib/server/turnstile';
import { getSupabaseServiceClient } from '@/lib/server/supabase';
import { sendRfqNotificationEmail } from '@/lib/server/email';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

// Max request body size: 64 KB
const MAX_PAYLOAD_BYTES = 64 * 1024;

/**
 * Generate a cryptographically secure, human-readable quotation reference number
 * Format: RFQ-YYYYMMDD-XXXXXX (e.g., RFQ-20261102-7A9B3C)
 */
function generateReferenceNumber() {
  const dateStr = new Date().toISOString().slice(0, 10).replace(/-/g, '');
  const randomHex = crypto.randomBytes(3).toString('hex').toUpperCase();
  return `RFQ-${dateStr}-${randomHex}`;
}

/**
 * Handle POST request for B2B RFQ Submissions
 */
export async function POST(request) {
  try {
    // 1. Request Size Guard: Check Content-Length
    const contentLength = request.headers.get('content-length');
    if (contentLength && parseInt(contentLength, 10) > MAX_PAYLOAD_BYTES) {
      return NextResponse.json(
        {
          success: false,
          error: 'Request payload exceeds maximum allowed size (64 KB).',
          code: 'PAYLOAD_TOO_LARGE',
        },
        { status: 413 }
      );
    }

    // 2. Origin & Host Integrity Check
    const origin = request.headers.get('origin');
    const host = request.headers.get('host');
    if (process.env.NODE_ENV === 'production' && origin && host) {
      try {
        const originHost = new URL(origin).host;
        if (originHost !== host && !originHost.endsWith(host)) {
          return NextResponse.json(
            { success: false, error: 'Cross-origin request rejected.', code: 'FORBIDDEN_ORIGIN' },
            { status: 403 }
          );
        }
      } catch {
        // Invalid origin URL format
        return NextResponse.json(
          { success: false, error: 'Malformed origin header.', code: 'FORBIDDEN_ORIGIN' },
          { status: 403 }
        );
      }
    }

    // 3. Persistent Rate Limiting
    const rateLimit = await checkRfqRateLimit(request);
    if (!rateLimit.allowed) {
      return NextResponse.json(
        {
          success: false,
          error: 'Quotation request limit reached. Please wait before submitting again, or contact our Mumbai workshop desk directly at +91 8591897469.',
          code: 'RATE_LIMITED',
          retryAfter: rateLimit.resetInSeconds,
        },
        {
          status: 429,
          headers: {
            'Retry-After': String(rateLimit.resetInSeconds),
          },
        }
      );
    }

    // 4. Parse Request Body Safely
    let body;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json(
        { success: false, error: 'Malformed JSON payload.', code: 'INVALID_JSON' },
        { status: 400 }
      );
    }

    // 5. Cloudflare Turnstile Server-Side Verification
    const turnstileToken = body.turnstile_token || body['cf-turnstile-response'];
    const clientIp = extractClientIp(request);
    const turnstileResult = await verifyTurnstileToken(turnstileToken, clientIp);

    if (!turnstileResult.success) {
      return NextResponse.json(
        {
          success: false,
          error: turnstileResult.error || 'Security verification failed. Please try again.',
          code: 'SECURITY_CHALLENGE_FAILED',
        },
        { status: 400 }
      );
    }

    // 6. Schema Validation, Sanitization & Master Catalogue Resolution
    const validation = validateRfqPayload(body);

    // Honeypot spam trap triggered: silently discard without database insert
    if (validation.isBot) {
      return NextResponse.json(
        {
          success: true,
          reference: generateReferenceNumber(),
          message: 'Quotation request recorded.',
        },
        { status: 200 }
      );
    }

    if (!validation.valid) {
      return NextResponse.json(
        {
          success: false,
          error: 'Please correct the highlighted fields before submitting.',
          errors: validation.errors,
          code: 'VALIDATION_ERROR',
        },
        { status: 400 }
      );
    }

    const rfqData = validation.data;
    const referenceNumber = generateReferenceNumber();

    // 7. Supabase Database Persistence
    const supabase = getSupabaseServiceClient();

    if (!supabase) {
      // If Supabase credentials are not configured in environment
      if (process.env.NODE_ENV === 'production') {
        console.error('[RFQ_ERROR] Supabase database credentials are not configured in production.');
        return NextResponse.json(
          {
            success: false,
            error: 'Procurement database infrastructure is currently unconfigured. Please connect directly with our Mumbai factory desk at +91 8591897469.',
            code: 'DATABASE_UNCONFIGURED',
          },
          { status: 503 }
        );
      } else {
        // Development / Preview mode before client configures live database keys
        console.warn('[RFQ_DEV_NOTICE] Supabase not configured in local environment. Simulating persistence for RFQ:', referenceNumber);
      }
    } else {
      // Execute database insert with Row Level Security
      const { error: insertError } = await supabase
        .from('rfq_enquiries')
        .insert({
          reference_number: referenceNumber,
          company_name: rfqData.company_name,
          contact_person: rfqData.contact_person,
          business_email: rfqData.business_email,
          phone_number: rfqData.phone_number,
          product_sku: rfqData.product_sku,
          product_name: rfqData.product_name,
          product_category: rfqData.product_category,
          provisional_quantity: rfqData.provisional_quantity,
          custom_quantity: rfqData.custom_quantity,
          customisation_requirements: rfqData.customisation_requirements,
          privacy_consent_at: rfqData.privacy_consent_at,
          privacy_policy_version: rfqData.privacy_policy_version,
          marketing_consent: rfqData.marketing_consent,
          email_status: 'pending',
          status: 'submitted',
        });

      if (insertError) {
        console.error('[RFQ_PERSISTENCE_ERROR] Failed to insert enquiry record:', insertError.message);
        return NextResponse.json(
          {
            success: false,
            error: 'We were unable to record your quotation draft at this time. Please call our factory desk directly at +91 8591897469.',
            code: 'PERSISTENCE_FAILED',
          },
          { status: 500 }
        );
      }
    }

    // 8. Transactional Outbound Email Dispatch
    // Critical Rule: A database-confirmed enquiry is NEVER failed merely because email fails.
    const emailResult = await sendRfqNotificationEmail(rfqData, referenceNumber);

    // Update email status in database if client is available
    if (supabase) {
      try {
        await supabase
          .from('rfq_enquiries')
          .update({ email_status: emailResult.status })
          .eq('reference_number', referenceNumber);
      } catch (updateErr) {
        console.warn('[EMAIL_STATUS_UPDATE_WARNING] Could not update email status:', updateErr.message);
      }
    }

    // 9. Minimal Safe Server Audit Log (Zero PII logged)
    console.warn(
      `[RFQ_AUDIT] Reference: ${referenceNumber} | SKU: ${rfqData.product_sku} | EmailStatus: ${emailResult.status} | Timestamp: ${rfqData.privacy_consent_at}`
    );

    // 10. Return Genuine Success Response
    return NextResponse.json(
      {
        success: true,
        reference: referenceNumber,
        productSku: rfqData.product_sku,
        productName: rfqData.product_name,
        message: 'Your commercial quotation draft has been securely recorded. Our Mumbai manufacturing desk will review specifications and follow up with counter-sampling guidance.',
      },
      { status: 200 }
    );
  } catch (unexpectedError) {
    // Catch-all: Never leak internal error message or stack trace to client
    console.error('[RFQ_UNEXPECTED_ERROR] Serverless route exception:', unexpectedError.message);
    return NextResponse.json(
      {
        success: false,
        error: 'An internal server error occurred while processing your request. Please try again or call our workshop directly.',
        code: 'INTERNAL_ERROR',
      },
      { status: 500 }
    );
  }
}

/**
 * Reject all non-POST methods with HTTP 405 Method Not Allowed
 */
export async function GET() {
  return NextResponse.json(
    { success: false, error: 'Method Not Allowed. Enquiries must be submitted via POST.', code: 'METHOD_NOT_ALLOWED' },
    { status: 405, headers: { Allow: 'POST' } }
  );
}
