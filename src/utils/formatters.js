/**
 * Format SKU code ensuring authoritative AR-### standard
 * @param {string} sku - Product SKU (e.g. "AR-001")
 * @returns {string} Formatted SKU
 */
export function formatSku(sku) {
  if (!sku) return '';
  return sku.toUpperCase().trim();
}

/**
 * Format provisional enquiry quantities with thousands separator
 * @param {number|string} quantity - Order quantity (e.g. 10000 -> "10,000 Units")
 * @returns {string} Formatted quantity label
 */
export function formatQuantity(quantity) {
  if (!quantity) return '';
  const num = typeof quantity === 'string' ? parseInt(quantity.replace(/,/g, ''), 10) : quantity;
  if (isNaN(num)) return String(quantity);
  return `${num.toLocaleString('en-IN')} Units`;
}

/**
 * Format dimensions object to human-readable string
 * @param {object} dims - Dimensions { length, width, height, unit }
 * @returns {string} Formatted dimension string
 */
export function formatDimensions(dims) {
  if (!dims) return 'Custom Dimensions Available';
  const { length, width, height, unit = 'cm' } = dims;
  if (!length && !width && !height) return 'Bespoke Tooling to Tech-Pack';
  return `${length || '—'} × ${width || '—'} × ${height || '—'} ${unit}`;
}
