import { Resend } from 'resend';
import { escapeHtml } from './validation.js';

/**
 * ARMANO Transactional Email Dispatcher via Resend
 * 
 * STRICT ARCHITECTURAL GOVERNANCE:
 * 1. The receiving email address (armanoindustries@gmail.com) is configured exclusively
 *    via the server-only RFQ_RECIPIENT_EMAIL environment variable.
 * 2. It is NEVER hardcoded in application source code.
 * 3. A separate RFQ_FROM_EMAIL variable controls the outbound sender address.
 * 4. We do NOT invent a sender address. If RFQ_FROM_EMAIL is missing, sending is disabled.
 * 5. Resend outbound sender domain is not yet verified: production sending remains
 *    strictly disabled (ENABLE_PRODUCTION_EMAIL === 'true') until an authorised sender domain is verified.
 * 6. Database persistence must work independently of email delivery: failure or suppression
 *    of transactional email never invalidates confirmed database persistence.
 */

/**
 * Dispatch procurement notification email for a saved RFQ
 * @param {object} rfqData - Validated and persisted RFQ data
 * @param {string} referenceNumber - Unique enquiry reference (e.g. RFQ-20261102-A1B2C3)
 * @returns {Promise<{ status: 'sent' | 'disabled' | 'failed', messageId?: string, reason?: string }>}
 */
export async function sendRfqNotificationEmail(rfqData, referenceNumber) {
  const apiKey = process.env.RESEND_API_KEY;
  const recipientEmail = process.env.RFQ_RECIPIENT_EMAIL;
  const fromEmail = process.env.RFQ_FROM_EMAIL;
  const isProductionEnabled = process.env.ENABLE_PRODUCTION_EMAIL === 'true';

  // Check 1: Is Resend API key configured?
  if (!apiKey) {
    return {
      status: 'disabled',
      reason: 'RESEND_API_KEY is not configured in server environment.',
    };
  }

  // Check 2: Is recipient email configured?
  if (!recipientEmail || recipientEmail.trim() === '') {
    return {
      status: 'disabled',
      reason: 'RFQ_RECIPIENT_EMAIL is not configured. Notification suppressed to prevent unconfirmed delivery.',
    };
  }

  // Check 3: Is sender email configured? Do NOT invent a sender address.
  if (!fromEmail || fromEmail.trim() === '') {
    return {
      status: 'disabled',
      reason: 'RFQ_FROM_EMAIL is not configured. Outbound email disabled to avoid unverified sender delivery.',
    };
  }

  // Check 4: Is sender domain verified and production sending explicitly enabled?
  if (!isProductionEnabled) {
    return {
      status: 'disabled',
      reason: 'Outbound production sending is disabled until an authorised sender domain is verified in Resend.',
    };
  }

  const resend = new Resend(apiKey);

  const subject = `[New RFQ Draft] ${referenceNumber} — ${rfqData.product_sku}: ${rfqData.product_name} (${rfqData.company_name})`;

  const quantityDisplay = rfqData.provisional_quantity === 'custom'
    ? `Custom / Bespoke Scope: ${escapeHtml(rfqData.custom_quantity || 'To be graded')}`
    : `${Number(rfqData.provisional_quantity).toLocaleString('en-IN')} Units (Provisional Scale Tier)`;

  // Elegant quiet luxury HTML email template
  const htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>${escapeHtml(subject)}</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #F7F4EF; color: #242424; margin: 0; padding: 24px; }
    .card { max-width: 620px; margin: 0 auto; background: #FFFFFF; border: 1px solid #E8DED0; border-radius: 4px; overflow: hidden; }
    .header { background: #10352C; padding: 28px 32px; color: #F7F4EF; }
    .header h1 { margin: 0 0 6px 0; font-size: 22px; font-weight: normal; letter-spacing: -0.01em; }
    .header .ref { font-family: monospace; font-size: 12px; color: #C5A059; text-transform: uppercase; letter-spacing: 0.1em; }
    .content { padding: 32px; }
    .section-title { font-size: 11px; text-transform: uppercase; letter-spacing: 0.15em; color: #737373; font-family: monospace; margin: 20px 0 8px 0; border-bottom: 1px solid #F0ECE1; padding-bottom: 4px; }
    .data-table { width: 100%; border-collapse: collapse; font-size: 13px; }
    .data-table td { padding: 8px 0; vertical-align: top; }
    .data-table td.label { width: 160px; color: #737373; font-family: monospace; font-size: 11px; text-transform: uppercase; }
    .data-table td.value { color: #242424; font-weight: 500; }
    .notes-box { background: #F7F4EF; border: 1px solid #E8DED0; padding: 14px 16px; font-size: 12px; line-height: 1.6; color: #4A4D53; border-radius: 2px; margin-top: 6px; }
    .footer { background: #F7F4EF; border-top: 1px solid #E8DED0; padding: 18px 32px; font-size: 11px; color: #737373; text-align: center; }
  </style>
</head>
<body>
  <div class="card">
    <div class="header">
      <div class="ref">${escapeHtml(referenceNumber)} • Inbound Commercial Inquiry</div>
      <h1>Request For Quotation Draft</h1>
      <div style="font-size: 12px; color: #E8DED0; opacity: 0.9;">Direct Mumbai Manufacturing Desk</div>
    </div>
    
    <div class="content">
      <div class="section-title">Target Product Silhouette</div>
      <table class="data-table">
        <tr>
          <td class="label">Official SKU:</td>
          <td class="value"><span style="background: #10352C; color: #FFF; padding: 2px 8px; border-radius: 3px; font-family: monospace; font-size: 11px;">${escapeHtml(rfqData.product_sku)}</span></td>
        </tr>
        <tr>
          <td class="label">Product Name:</td>
          <td class="value">${escapeHtml(rfqData.product_name)}</td>
        </tr>
        <tr>
          <td class="label">Catalogue Category:</td>
          <td class="value">${escapeHtml(rfqData.product_category)}</td>
        </tr>
        <tr>
          <td class="label">Projected Scale:</td>
          <td class="value" style="color: #10352C; font-weight: 600;">${quantityDisplay}</td>
        </tr>
      </table>

      <div class="section-title">Commercial Client Information</div>
      <table class="data-table">
        <tr>
          <td class="label">Company / Brand:</td>
          <td class="value">${escapeHtml(rfqData.company_name)}</td>
        </tr>
        <tr>
          <td class="label">Contact Executive:</td>
          <td class="value">${escapeHtml(rfqData.contact_person)}</td>
        </tr>
        <tr>
          <td class="label">Business Email:</td>
          <td class="value"><a href="mailto:${escapeHtml(rfqData.business_email)}" style="color: #10352C; text-decoration: underline;">${escapeHtml(rfqData.business_email)}</a></td>
        </tr>
        <tr>
          <td class="label">Contact Phone / WA:</td>
          <td class="value"><a href="tel:${escapeHtml(rfqData.phone_number)}" style="color: #10352C; text-decoration: none; font-family: monospace;">${escapeHtml(rfqData.phone_number)}</a></td>
        </tr>
      </table>

      <div class="section-title">Customisation & Technical Specifications</div>
      <div class="notes-box">
        ${rfqData.customisation_requirements ? escapeHtml(rfqData.customisation_requirements).replace(/\n/g, '<br>') : '<em>No additional technical specifications provided. Dimensions and substrates to be determined during physical counter-sampling.</em>'}
      </div>

      <div class="section-title">Statutory & Consent Compliance</div>
      <table class="data-table" style="font-size: 11px; color: #737373;">
        <tr>
          <td class="label">DPDP Consent:</td>
          <td>Affirmatively verified (${escapeHtml(rfqData.privacy_policy_version)}) on ${escapeHtml(rfqData.privacy_consent_at)}</td>
        </tr>
        <tr>
          <td class="label">Marketing Consent:</td>
          <td>${rfqData.marketing_consent ? 'Opted In' : 'Declined / Not Granted'}</td>
        </tr>
      </table>
    </div>

    <div class="footer">
      ARMANO B2B Gateway • Sion-Dharavi Industrial Belt, Mumbai, India • Inquiry Ref: ${escapeHtml(referenceNumber)}
    </div>
  </div>
</body>
</html>
  `.trim();

  const textContent = `
============================================================
ARMANO — INBOUND B2B REQUEST FOR QUOTATION DRAFT
Reference Number: ${referenceNumber}
============================================================

TARGET SILHOUETTE:
- SKU: ${rfqData.product_sku}
- Product: ${rfqData.product_name}
- Category: ${rfqData.product_category}
- Scale: ${quantityDisplay}

CLIENT DETAILS:
- Company: ${rfqData.company_name}
- Contact Person: ${rfqData.contact_person}
- Email: ${rfqData.business_email}
- Phone: ${rfqData.phone_number}

TECHNICAL SPECIFICATIONS & NOTES:
${rfqData.customisation_requirements || 'None specified. Graded to client tech-pack during sampling.'}

DATA GOVERNANCE & CONSENT:
- Privacy Policy Consent: Verified (${rfqData.privacy_policy_version}) at ${rfqData.privacy_consent_at}
- Marketing Consent: ${rfqData.marketing_consent ? 'Yes' : 'No'}

Direct Mumbai Manufacturing Desk
============================================================
  `.trim();

  try {
    const { data, error } = await resend.emails.send({
      from: fromEmail,
      to: [recipientEmail],
      replyTo: rfqData.business_email,
      subject,
      html: htmlContent,
      text: textContent,
      tags: [
        { name: 'category', value: 'b2b_rfq' },
        { name: 'sku', value: rfqData.product_sku },
      ],
    });

    if (error) {
      console.warn('[EMAIL_DISPATCH_WARNING] Resend delivery returned error:', error.message);
      return {
        status: 'failed',
        reason: error.message,
      };
    }

    return {
      status: 'sent',
      messageId: data?.id,
    };
  } catch (err) {
    console.warn('[EMAIL_DISPATCH_WARNING] Network exception during email dispatch:', err.message);
    return {
      status: 'failed',
      reason: err.message,
    };
  }
}
