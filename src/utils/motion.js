/**
 * ARMANO V8.6 — Cinematic Motion Design System Tokens & Utilities
 * 
 * Provides centralized animation choreography, timings, cubic-bezier easings,
 * and accessibility guards for high-end luxury editorial and product-led motion.
 */

export const MOTION_TIMINGS = {
  instant: 0,
  micro: 180,       // Hover, active, swatch selection
  fast: 280,        // Dropdowns, pill toggles, tooltips
  medium: 520,      // Card transitions, modal entries
  slow: 840,        // Section reveals, typography masks
  cinematic: 1100,  // Image clip-path uncurling, luxury reveals
};

export const MOTION_EASINGS = {
  // High-fashion editorial curve (steep acceleration, long elegant deceleration tail)
  editorial: 'cubic-bezier(0.16, 1, 0.3, 1)',
  // Luxury product reveal curve (balanced, ultra-smooth)
  luxury: 'cubic-bezier(0.22, 1, 0.36, 1)',
  // Natural UI interaction curve for buttons and swatches
  snappy: 'cubic-bezier(0.4, 0, 0.2, 1)',
  // Gentle floating and camera drift
  ambient: 'cubic-bezier(0.45, 0.05, 0.55, 0.95)',
};

/**
 * Returns true if the client has requested reduced motion at the OS/browser level.
 */
export function getPrefersReducedMotion() {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/**
 * Subscribes to changes in the prefers-reduced-motion media query.
 */
export function subscribeReducedMotion(callback) {
  if (typeof window === 'undefined') return () => {};
  const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
  mediaQuery.addEventListener('change', callback);
  return () => mediaQuery.removeEventListener('change', callback);
}

/**
 * Calculates stagger delay for index-based sequential reveals.
 * Caps maximum stagger to prevent delayed UI readiness on long lists.
 */
export function getStaggerDelay(index, baseDelay = 70, maxDelay = 350) {
  return Math.min(index * baseDelay, maxDelay);
}
