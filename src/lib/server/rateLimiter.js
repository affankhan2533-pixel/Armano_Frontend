import crypto from 'crypto';
import { getSupabaseServiceClient } from './supabase.js';

/**
 * Persistent Rate Limiter for Inbound B2B RFQs
 * 
 * ARCHITECTURE & COMPLIANCE:
 * 1. Raw IP addresses are NEVER stored in plain text. A one-way SHA-256 hash is generated with a server salt.
 * 2. Persistent storage via Supabase PostgreSQL function (check_and_increment_rfq_rate_limit).
 * 3. Prevents horizontal scaling / serverless cold-start bypasses.
 * 4. Development fallback store provided with clear architectural warning.
 */

const RATE_LIMIT_MAX_REQUESTS = 5; // Max 5 requests
const RATE_LIMIT_WINDOW_SECONDS = 600; // 10 minute sliding window
const HASH_SALT = process.env.RATE_LIMIT_SALT || 'armano_rfq_production_salt_2026';

// Development-only fallback map (used only when Supabase is not yet configured)
const devFallbackStore = new Map();

/**
 * Generate privacy-preserving SHA-256 hash of client identity
 * @param {string} rawIdentifier - Raw IP address or request header
 * @returns {string} 64-character hexadecimal SHA-256 hash
 */
export function hashClientIdentifier(rawIdentifier) {
  const normalized = (rawIdentifier || 'unknown-client').trim().toLowerCase();
  return crypto.createHmac('sha256', HASH_SALT).update(normalized).digest('hex');
}

/**
 * Extract client IP from incoming request headers
 * @param {Request} request - Next.js Request object
 * @returns {string} Extracted client IP or fallback
 */
export function extractClientIp(request) {
  // Standard proxy headers
  const forwardedFor = request.headers.get('x-forwarded-for');
  if (forwardedFor) {
    const firstIp = forwardedFor.split(',')[0].trim();
    if (firstIp) return firstIp;
  }

  const realIp = request.headers.get('x-real-ip');
  if (realIp) return realIp.trim();

  const cfConnectingIp = request.headers.get('cf-connecting-ip');
  if (cfConnectingIp) return cfConnectingIp.trim();

  return '127.0.0.1';
}

/**
 * Evaluate rate limit for the incoming request
 * @param {Request} request - Next.js Request object
 * @returns {Promise<{ allowed: boolean, currentCount: number, resetInSeconds: number, source: string }>}
 */
export async function checkRfqRateLimit(request) {
  const clientIp = extractClientIp(request);
  const clientHash = hashClientIdentifier(clientIp);

  const supabase = getSupabaseServiceClient();

  // 1. Primary Persistent Mechanism: Supabase PostgreSQL Stored Procedure
  if (supabase) {
    try {
      const { data, error } = await supabase.rpc('check_and_increment_rfq_rate_limit', {
        p_client_hash: clientHash,
        p_max_requests: RATE_LIMIT_MAX_REQUESTS,
        p_window_seconds: RATE_LIMIT_WINDOW_SECONDS,
      });

      if (!error && Array.isArray(data) && data.length > 0) {
        const result = data[0];
        return {
          allowed: Boolean(result.allowed),
          currentCount: result.current_count,
          resetInSeconds: result.reset_in_seconds,
          source: 'database-persistent',
        };
      }
      // If table/rpc doesn't exist yet, fall through with warning
    } catch (rpcErr) {
      console.warn('[RATE_LIMIT_WARNING] Database rate limiter RPC invocation failed, falling back to local monitor:', rpcErr.message);
    }
  }

  // 2. Development Fallback Mechanism
  // CAUTION: In-memory rate limiting does NOT guarantee cross-instance sync in serverless runtimes.
  const now = Date.now();
  const existing = devFallbackStore.get(clientHash);

  if (!existing || now >= existing.windowExpiresAt) {
    devFallbackStore.set(clientHash, {
      count: 1,
      windowExpiresAt: now + RATE_LIMIT_WINDOW_SECONDS * 1000,
    });
    return {
      allowed: true,
      currentCount: 1,
      resetInSeconds: RATE_LIMIT_WINDOW_SECONDS,
      source: 'dev-fallback-memory',
    };
  }

  const resetInSeconds = Math.max(1, Math.round((existing.windowExpiresAt - now) / 1000));

  if (existing.count < RATE_LIMIT_MAX_REQUESTS) {
    existing.count += 1;
    devFallbackStore.set(clientHash, existing);
    return {
      allowed: true,
      currentCount: existing.count,
      resetInSeconds,
      source: 'dev-fallback-memory',
    };
  }

  return {
    allowed: false,
    currentCount: existing.count,
    resetInSeconds,
    source: 'dev-fallback-memory',
  };
}
