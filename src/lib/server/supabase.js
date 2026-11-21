import { createClient } from '@supabase/supabase-js';

/**
 * Server-Side Supabase Service Client
 * 
 * STRICT SECURITY GOVERNANCE:
 * 1. Uses the modern privileged SUPABASE_SECRET_KEY (sb_secret_...) with legacy
 *    SUPABASE_SERVICE_ROLE_KEY fallback to authenticate server-side requests.
 * 2. This module MUST NEVER be imported in client-side components ('use client').
 * 3. SUPABASE_SECRET_KEY and SUPABASE_SERVICE_ROLE_KEY are NEVER prefixed with NEXT_PUBLIC_.
 * 4. All public/anon read/write access to rfq_enquiries is completely revoked at the DB level.
 */

let cachedServiceClient = null;

export function getSupabaseServiceClient() {
  if (cachedServiceClient) {
    return cachedServiceClient;
  }

  const supabaseUrl = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
  // Modern Supabase Secret Key (sb_secret_...) with backwards-compatible legacy fallback
  const secretKey = process.env.SUPABASE_SECRET_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !secretKey) {
    return null;
  }

  cachedServiceClient = createClient(supabaseUrl, secretKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  });

  return cachedServiceClient;
}

/**
 * Health check to verify database connectivity
 * @returns {Promise<{ ok: boolean, reason?: string }>}
 */
export async function checkSupabaseHealth() {
  const client = getSupabaseServiceClient();
  if (!client) {
    return { ok: false, reason: 'SUPABASE_URL or SUPABASE_SECRET_KEY (or legacy SUPABASE_SERVICE_ROLE_KEY) environment variable is not configured.' };
  }

  try {
    // Ping with a lightweight count query
    const { error } = await client
      .from('rfq_enquiries')
      .select('id', { count: 'exact', head: true });

    if (error) {
      return { ok: false, reason: error.message };
    }

    return { ok: true };
  } catch (err) {
    return { ok: false, reason: err.message || 'Database connection error' };
  }
}
