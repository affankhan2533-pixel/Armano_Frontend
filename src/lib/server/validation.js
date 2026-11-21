import { products } from '../../data/products.js';

/**
 * Server-Side RFQ Schema Validation & Sanitization
 * Enforces strict boundaries, type verification, and catalogue resolution.
 */

// Email RFC 5322 simplified pattern
const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;

// Phone: allows +, digits, spaces, hyphens, brackets, min 7 digits, max 25 chars
const PHONE_REGEX = /^[+]?[(]?[0-9]{1,4}[)]?[-\s./0-9]{6,20}$/;

const VALID_QUANTITY_TIERS = ['10000', '20000', '50000', 'custom'];

export const CURRENT_PRIVACY_POLICY_VERSION = 'v1.0-pending-legal';

/**
 * Sanitize string by stripping dangerous control characters and trimming
 * @param {any} val - Input value
 * @param {number} maxLen - Maximum allowed length
 * @returns {string} Sanitized string
 */
export function sanitizeString(val, maxLen = 200) {
  if (typeof val !== 'string') return '';
  return val
    .replace(/[\u0000-\u0008\u000B-\u000C\u000E-\u001F\u007F]/g, '') // remove ASCII control characters
    .trim()
    .slice(0, maxLen);
}

/**
 * Escape HTML characters to prevent XSS in email and reporting views
 * @param {string} str - Raw string
 * @returns {string} Escaped string
 */
export function escapeHtml(str) {
  if (typeof str !== 'string') return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

/**
 * Validate incoming RFQ request payload
 * @param {object} body - Parsed JSON body
 * @returns {{ valid: boolean, errors?: object, data?: object }}
 */
export function validateRfqPayload(body) {
  const errors = {};

  if (!body || typeof body !== 'object') {
    return { valid: false, errors: { _general: 'Invalid request payload format.' } };
  }

  // 1. Honeypot Check (Spam Trap)
  // Field 'website' or '_hp_confirm' should remain untouched by human users
  const honeypot = body.website || body._hp_confirm;
  if (honeypot && String(honeypot).trim() !== '') {
    return {
      valid: false,
      isBot: true,
      errors: { _general: 'Request rejected by security filter.' }
    };
  }

  // 2. Company Name
  const rawCompany = body.company_name;
  if (!rawCompany || typeof rawCompany !== 'string') {
    errors.company_name = 'Company name is required.';
  } else {
    const company = sanitizeString(rawCompany, 150);
    if (company.length < 2) {
      errors.company_name = 'Company name must be at least 2 characters.';
    }
  }

  // 3. Contact Person
  const rawContact = body.contact_person;
  if (!rawContact || typeof rawContact !== 'string') {
    errors.contact_person = 'Contact person name is required.';
  } else {
    const contact = sanitizeString(rawContact, 100);
    if (contact.length < 2) {
      errors.contact_person = 'Contact person name must be at least 2 characters.';
    }
  }

  // 4. Business Email
  const rawEmail = body.business_email;
  if (!rawEmail || typeof rawEmail !== 'string') {
    errors.business_email = 'Business email address is required.';
  } else {
    const email = sanitizeString(rawEmail.toLowerCase(), 255);
    if (!EMAIL_REGEX.test(email)) {
      errors.business_email = 'Please provide a valid corporate email address.';
    }
  }

  // 5. Phone Number
  const rawPhone = body.phone_number;
  if (!rawPhone || typeof rawPhone !== 'string') {
    errors.phone_number = 'Contact phone number is required.';
  } else {
    const phone = sanitizeString(rawPhone, 30);
    const digitCount = (phone.match(/\d/g) || []).length;
    if (!PHONE_REGEX.test(phone) || digitCount < 7) {
      errors.phone_number = 'Please provide a valid telephone or WhatsApp number with country code.';
    }
  }

  // 6. Product SKU & Server-Side Catalogue Resolution
  // We NEVER trust product_name from client. We resolve it from src/data/products.js!
  const rawSku = body.product_sku;
  let resolvedProduct = null;

  if (!rawSku || typeof rawSku !== 'string') {
    errors.product_sku = 'Target product SKU or silhouette selection is required.';
  } else {
    const sku = sanitizeString(rawSku.toUpperCase(), 50);
    if (sku === 'BESPOKE') {
      resolvedProduct = {
        sku: 'BESPOKE',
        name: 'Bespoke Custom Silhouette (From Client Tech-Pack)',
        category: 'Bespoke OEM Service',
      };
    } else {
      const match = products.find((p) => p.sku.toUpperCase() === sku);
      if (match) {
        resolvedProduct = {
          sku: match.sku,
          name: match.workingName || match.name || match.title,
          category: match.categoryName || 'Cosmetic & Skincare Pouches',
        };
      } else {
        errors.product_sku = `The selected SKU "${escapeHtml(rawSku)}" is not recognized in our master catalogue.`;
      }
    }
  }

  // 7. Provisional Order Scale
  const rawScale = body.provisional_quantity;
  if (!rawScale || !VALID_QUANTITY_TIERS.includes(String(rawScale))) {
    errors.provisional_quantity = 'Please select a provisional order scale (10,000, 20,000, 50,000, or Custom).';
  }

  // 8. Custom Quantity (if scale === 'custom')
  let customQuantity = null;
  if (rawScale === 'custom') {
    const rawCustom = body.custom_quantity;
    if (!rawCustom || typeof rawCustom !== 'string' || sanitizeString(rawCustom, 50).length === 0) {
      errors.custom_quantity = 'Please specify your projected batch quantity or programme scope.';
    } else {
      customQuantity = sanitizeString(rawCustom, 50);
    }
  }

  // 9. Customisation / Tech-Pack Requirements
  const rawNotes = body.customisation_requirements;
  let notes = null;
  if (rawNotes && typeof rawNotes === 'string') {
    notes = sanitizeString(rawNotes, 2000);
  }

  // 10. Privacy Policy Consent (Mandatory under DPDP Act 2023)
  if (body.privacy_consent !== true && body.privacy_consent !== 'true') {
    errors.privacy_consent = 'Consent to the Privacy Policy is mandatory for processing quotation inquiries.';
  }

  // 11. Marketing Consent (Optional)
  const marketingConsent = body.marketing_consent === true || body.marketing_consent === 'true';

  if (Object.keys(errors).length > 0) {
    return { valid: false, errors };
  }

  return {
    valid: true,
    data: {
      company_name: sanitizeString(body.company_name, 150),
      contact_person: sanitizeString(body.contact_person, 100),
      business_email: sanitizeString(body.business_email.toLowerCase(), 255),
      phone_number: sanitizeString(body.phone_number, 30),
      product_sku: resolvedProduct.sku,
      product_name: resolvedProduct.name,
      product_category: resolvedProduct.category,
      provisional_quantity: String(rawScale),
      custom_quantity: customQuantity,
      customisation_requirements: notes,
      privacy_consent_at: new Date().toISOString(),
      privacy_policy_version: CURRENT_PRIVACY_POLICY_VERSION,
      marketing_consent: marketingConsent,
    },
  };
}
