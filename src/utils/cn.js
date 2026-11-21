import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Combines conditional class names and safely merges Tailwind CSS utility classes
 * @param  {...any} inputs - Class strings, objects, or arrays
 * @returns {string} Merged className string
 */
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}
