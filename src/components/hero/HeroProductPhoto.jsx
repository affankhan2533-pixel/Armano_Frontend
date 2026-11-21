'use client';
/* eslint-disable @next/next/no-img-element */

/**
 * Authentic ARMANO Master SKU AR-009 Cosmetic Pouch Photo Component
 * - Displays the authentic client photograph (/images/products/AR-009-cutout.png)
 * - Uses direct static image element to avoid Next.js image proxy attachment headers
 * - Large, completely visible, uncropped with original proportions
 * - Seamless transparent blending with subtle natural contact shadow
 * - Zero rectangular cards, zero grey backgrounds
 * - Guaranteed print-safe for PDF generation
 */
export function HeroProductPhoto({ priority = true, className = '' }) {
  return (
    <div
      className={`relative w-full h-[180px] xs:h-[205px] sm:h-[270px] md:h-[350px] lg:h-[min(500px,58vh)] xl:h-[560px] flex flex-col items-center justify-center p-1 sm:p-4 select-none bg-transparent ${className}`}
      style={{ background: 'transparent' }}
    >
      {/* Product Image Frame */}
      <div className="relative w-full max-w-[270px] xs:max-w-[300px] sm:max-w-[380px] md:max-w-[460px] lg:max-w-[540px] xl:max-w-[580px] h-[160px] xs:h-[185px] sm:h-[240px] md:h-[320px] lg:h-[450px] xl:h-[490px] flex items-center justify-center">
        {/* Direct static transparent cutout image with 100% reliability across all browsers and PDF exports */}
        <img
          src="/images/products/AR-009-cutout.png"
          alt="ARMANO Quilted Cosmetic Pouch Master SKU AR-009"
          width="1600"
          height="1200"
          loading={priority ? 'eager' : 'lazy'}
          fetchPriority={priority ? 'high' : 'auto'}
          decoding="async"
          className="w-full h-full object-contain filter drop-shadow-[0_20px_30px_rgba(25,20,15,0.18)] transition-transform duration-700 hover:scale-102"
        />

        {/* Subtle realistic contact shadow underneath the pouch base */}
        <div
          className="absolute -bottom-2 sm:-bottom-3 w-[72%] h-3 sm:h-6 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(35,28,20,0.20)_0%,transparent_70%)] blur-md pointer-events-none"
          aria-hidden="true"
        />
      </div>
    </div>
  );
}
