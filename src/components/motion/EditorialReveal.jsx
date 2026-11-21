'use client';

import { useScrollReveal } from '@/hooks/useScrollReveal';
import { MOTION_EASINGS } from '@/utils/motion';

/**
 * ARMANO V8.6 — EditorialReveal Component
 * High-end cinematic scroll animations for luxury fashion & beauty e-commerce.
 * 
 * Features:
 * - Minimal, quiet luxury transitions (no bouncing, no flashy effects)
 * - Hardware accelerated: purely opacity, transform, and clip-path
 * - Full prefers-reduced-motion support
 * - Zero layout shifts (composited properties only)
 * 
 * @param {Object} props
 * @param {React.ReactNode} props.children - Content to animate
 * @param {'fade-up' | 'fade-in' | 'mask-slide' | 'image-reveal'} [props.variant='fade-up'] - Animation style
 * @param {number} [props.delay=0] - Delay in ms
 * @param {number} [props.duration=750] - Duration in ms
 * @param {string} [props.className=''] - Additional CSS classes
 * @param {number} [props.threshold=0.06] - IntersectionObserver threshold
 * @param {string} [props.rootMargin='0px 0px -50px 0px'] - Pre-triggers before viewport edge
 */
export function EditorialReveal({
  children,
  variant = 'fade-up',
  delay = 0,
  duration = 750,
  className = '',
  threshold = 0.06,
  rootMargin = '0px 0px -50px 0px',
}) {
  const { ref, isVisible } = useScrollReveal({ threshold, rootMargin, delay });

  if (variant === 'mask-slide') {
    return (
      <div ref={ref} className={`overflow-hidden ${className}`} data-reveal="true">
        <div
          style={{
            transform: isVisible ? 'translateY(0%)' : 'translateY(105%)',
            opacity: isVisible ? 1 : 0.05,
            transitionProperty: 'transform, opacity',
            transitionDuration: `${duration}ms`,
            transitionTimingFunction: MOTION_EASINGS.editorial,
          }}
        >
          {children}
        </div>
      </div>
    );
  }

  if (variant === 'image-reveal') {
    return (
      <div
        ref={ref}
        className={`relative overflow-hidden ${className}`}
        data-reveal="true"
      >
        <div
          style={{
            clipPath: isVisible ? 'inset(0% 0% 0% 0%)' : 'inset(6% 0% 6% 0%)',
            transform: isVisible ? 'scale(1) translateY(0)' : 'scale(1.05) translateY(10px)',
            opacity: isVisible ? 1 : 0.25,
            transitionProperty: 'clip-path, transform, opacity',
            transitionDuration: `${duration + 200}ms, ${duration + 250}ms, ${duration}ms`,
            transitionTimingFunction: MOTION_EASINGS.luxury,
          }}
          className="w-full h-full"
        >
          {children}
        </div>
      </div>
    );
  }

  if (variant === 'fade-in') {
    return (
      <div
        ref={ref}
        data-reveal="true"
        style={{
          opacity: isVisible ? 1 : 0.05,
          transitionProperty: 'opacity',
          transitionDuration: `${duration}ms`,
          transitionTimingFunction: MOTION_EASINGS.editorial,
        }}
        className={className}
      >
        {children}
      </div>
    );
  }

  // Default: 'fade-up'
  return (
    <div
      ref={ref}
      data-reveal="true"
      style={{
        opacity: isVisible ? 1 : 0.05,
        transform: isVisible ? 'translateY(0)' : 'translateY(18px)',
        transitionProperty: 'opacity, transform',
        transitionDuration: `${duration}ms`,
        transitionTimingFunction: MOTION_EASINGS.luxury,
      }}
      className={className}
    >
      {children}
    </div>
  );
}
