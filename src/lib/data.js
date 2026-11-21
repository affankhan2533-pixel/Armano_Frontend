import { products } from '@/data/products';
import { categories } from '@/data/categories';
import { additionalSamples } from '@/data/additionalSamples';
import { getApprovedBrands as getApprovedBrandsFromRegistry } from '@/data/brandRegistry';

/**
 * Retrieve all 13 verified catalog products (AR-001 through AR-013)
 * @returns {Array} List of all products
 */
export function getProducts() {
  return products;
}

/**
 * Retrieve all unnumbered workshop samples from PDF pages 4-7
 * @returns {Array} List of additional samples
 */
export function getAdditionalSamples() {
  return additionalSamples;
}

/**
 * Retrieve a single product by exact SKU (case-insensitive)
 * @param {string} sku - Product SKU (e.g. "AR-001")
 * @returns {object|undefined} Product object or undefined
 */
export function getProductBySku(sku) {
  if (!sku) return undefined;
  return products.find((p) => p.sku.toUpperCase() === sku.toUpperCase());
}

/**
 * Retrieve a single product by URL slug
 * @param {string} slug - Product slug (e.g. "ar-001-classic-rectangular-pouch")
 * @returns {object|undefined} Product object or undefined
 */
export function getProductBySlug(slug) {
  if (!slug) return undefined;
  return products.find((p) => p.slug === slug);
}

/**
 * Retrieve products filtered by category slug
 * @param {string} categorySlug - Category identifier (e.g. "cosmetic-pouches")
 * @returns {Array} Filtered list of products
 */
export function getProductsByCategory(categorySlug) {
  if (!categorySlug) return [];
  return products.filter((p) => p.category === categorySlug);
}

/**
 * Retrieve related products for a given SKU (same category prioritized, excluding current)
 * @param {string} currentSku - Current product SKU
 * @param {string} categorySlug - Category identifier
 * @param {number} limit - Maximum number of related products
 * @returns {Array} Related products
 */
export function getRelatedProducts(currentSku, categorySlug, limit = 3) {
  const sameCategory = products.filter(
    (p) => p.category === categorySlug && p.sku !== currentSku
  );

  if (sameCategory.length >= limit) {
    return sameCategory.slice(0, limit);
  }

  const otherProducts = products.filter(
    (p) => p.sku !== currentSku && p.category !== categorySlug
  );

  return [...sameCategory, ...otherProducts].slice(0, limit);
}

/**
 * Retrieve all 4 primary commercial divisions
 * @returns {Array} List of categories
 */
export function getCategories() {
  return categories;
}

/**
 * Retrieve category by slug
 * @param {string} slug - Category slug
 * @returns {object|undefined} Category object or undefined
 */
export function getCategoryBySlug(slug) {
  if (!slug) return undefined;
  return categories.find((c) => c.slug === slug);
}

/**
 * Re-export Zero-Trust brand approval filter
 * Guarantees zero unapproved trademark exposure in Phase 1 & 2
 */
export function getApprovedBrands() {
  return getApprovedBrandsFromRegistry();
}
