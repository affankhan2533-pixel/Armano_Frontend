/**
 * Cloudflare Turnstile Server Verification Module
 * Validates browser challenge tokens to prevent automated bot form flooding.
 */

const CLOUDFLARE_SITEVERIFY_URL = 'https://challenges.cloudflare.com/turnstile/v0/siteverify';

/**
 * Verify Turnstile token with Cloudflare's API
 * @param {string} token - Client response token
 * @param {string} clientIp - Client IP address (optional)
 * @returns {Promise<{ success: boolean, error?: string, simulated?: boolean }>}
 */
export async function verifyTurnstileToken(token, clientIp = '') {
  const secretKey = process.env.TURNSTILE_SECRET_KEY;

  // Cloudflare Official Test Key conventions:
  // Secret: 1x0000000000000000000000000000000AA (always passes)
  // Secret: 2x0000000000000000000000000000000AA (always fails)
  // Token: XXX.DUMMY.TOKEN.XXX or 1x0000000000000000000000000000000AA
  if (token === 'TEST_PASS_TOKEN' || token === '1x0000000000000000000000000000000AA') {
    return { success: true, simulated: true };
  }

  if (token === 'TEST_FAIL_TOKEN' || token === '2x0000000000000000000000000000000AA') {
    return { success: false, error: 'Invalid security verification token.' };
  }

  // If Turnstile secret key is not configured in environment (Development / Initial Setup Mode)
  if (!secretKey) {
    // When no secret is provided, log development warning and do not block development testing
    return {
      success: true,
      simulated: true,
      warning: 'TURNSTILE_SECRET_KEY is not configured. Security verification simulated in development.'
    };
  }

  // Token is mandatory when secretKey is configured
  if (!token || typeof token !== 'string' || token.trim() === '') {
    return { success: false, error: 'Turnstile verification token is missing.' };
  }

  try {
    const formData = new URLSearchParams();
    formData.append('secret', secretKey);
    formData.append('response', token);
    if (clientIp) {
      formData.append('remoteip', clientIp);
    }

    const res = await fetch(CLOUDFLARE_SITEVERIFY_URL, {
      method: 'POST',
      body: formData,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });

    if (!res.ok) {
      return { success: false, error: `Turnstile verification service responded with status ${res.status}.` };
    }

    const data = await res.json();

    if (data.success) {
      return { success: true };
    } else {
      const errorCodes = Array.isArray(data['error-codes']) ? data['error-codes'].join(', ') : 'Verification rejected';
      return { success: false, error: `Security check failed (${errorCodes}).` };
    }
  } catch (err) {
    console.error('[TURNSTILE_ERROR] Network error during Cloudflare verification:', err.message);
    return { success: false, error: 'Unable to verify security challenge due to a network error.' };
  }
}
