'use client';

import { useState, useEffect, useRef } from 'react';
import { getPrefersReducedMotion } from '@/utils/motion';

/**
 * ARMANO V8.6 — Resilient Luxury Scroll Reveal Hook
 * 
 * - Only triggers when elements genuinely enter the viewport.
 * - Eliminates off-screen timeouts that triggered animations prematurely before scrolling.
 * - Hardware-accelerated composite properties only (opacity, transform, clip-path).
 * - Full prefers-reduced-motion support (instant visibility without animations).
 * - Graceful fallback: immediate visibility if IntersectionObserver is unsupported.
 * 
 * @param {Object} options
 * @param {number} [options.threshold=0.06] - Percentage of element visible before trigger
 * @param {string} [options.rootMargin='0px 0px -50px 0px'] - Pre-triggers slightly before viewport edge
 * @param {boolean} [options.once=true] - Trigger once
 * @param {number} [options.delay=0] - Stagger delay in milliseconds
 * @returns {{ ref: React.RefObject, isVisible: boolean }}
 */
export function useScrollReveal({
  threshold = 0.06,
  rootMargin = '0px 0px -50px 0px',
  once = true,
  delay = 0,
} = {}) {
  const [isVisible, setIsVisible] = useState(() => {
    if (typeof window === 'undefined') return false;
    return getPrefersReducedMotion() || typeof window.IntersectionObserver === 'undefined';
  });
  const elementRef = useRef(null);

  useEffect(() => {
    if (getPrefersReducedMotion() || typeof IntersectionObserver === 'undefined') {
      return;
    }

    const node = elementRef.current;
    if (!node) {
      return;
    }

    let timeoutId = null;

    try {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            if (delay > 0) {
              timeoutId = setTimeout(() => {
                setIsVisible(true);
              }, delay);
            } else {
              setIsVisible(true);
            }

            if (once) {
              observer.unobserve(node);
            }
          } else if (!once) {
            if (timeoutId) clearTimeout(timeoutId);
            setIsVisible(false);
          }
        },
        { threshold, rootMargin }
      );

      observer.observe(node);

      return () => {
        if (timeoutId) clearTimeout(timeoutId);
        observer.disconnect();
      };
    } catch {
      // Failsafe for restrictive environments: defer update outside synchronous effect body
      setTimeout(() => {
        setIsVisible(true);
      }, 0);
    }
  }, [threshold, rootMargin, once, delay]);

  return { ref: elementRef, isVisible };
}
