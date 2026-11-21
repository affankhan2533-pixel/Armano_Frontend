'use client';

import { useState, useEffect, useRef, Component } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { ArrowRight, ArrowUpRight, Factory } from 'lucide-react';
import { HERO_THEMES } from '@/data/heroThemes';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { HeroProductPhoto } from '@/components/hero/HeroProductPhoto';

class HeroErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  componentDidCatch(err) {
    console.warn('Hero section boundary fallback:', err?.message || err);
  }
  render() {
    if (this.state.hasError) {
      return (
        <div className="relative w-full flex flex-col items-center justify-center bg-transparent">
          <HeroProductPhoto priority />
        </div>
      );
    }
    return this.props.children;
  }
}

const Hero3DCanvas = dynamic(
  () => import('@/components/3d/Hero3DCanvas'),
  {
    ssr: false,
    loading: () => <HeroProductPhoto priority />,
  }
);

/**
 * ARMANO V6.3 — Restored Right-Side 3D Hero with Cinematic Parallax & Scroll Depth
 * High-Fashion European Luxury Packaging Atelier:
 * - Restored 42% Left / 58% Right split layout (Visual center at ~72% viewport width).
 * - Zero overlap between 3D product and headline/CTAs.
 * - Borderless transparent WebGL canvas floating directly in studio tone.
 * - Interactive mouse parallax and proximity zoom (scale 0.98 -> 1.045) on desktop.
 * - Controlled scroll depth effect receding the product gracefully into the studio floor.
 * - Mobile layout with centered lower product zone and accessible conversion buttons.
 */
export function HeroSection() {
  const [activeTheme, setActiveTheme] = useState(HERO_THEMES[0]);
  const sectionRef = useRef(null);
  const leftColRef = useRef(null);
  const rightColRef = useRef(null);
  const headingRef = useRef(null);
  const textRef = useRef(null);
  const ctaGroupRef = useRef(null);

  // GSAP Entrance & Scroll Depth Choreography
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // 1. Initial Cinematic Entrance Timeline
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.fromTo(
        leftColRef.current?.querySelector('.hero-eyebrow'),
        { opacity: 0, y: 14 },
        { opacity: 1, y: 0, duration: 0.7, delay: 0.08 }
      )
        .fromTo(
          headingRef.current,
          { opacity: 0, y: 26 },
          { opacity: 1, y: 0, duration: 0.9 },
          '-=0.45'
        )
        .fromTo(
          textRef.current,
          { opacity: 0, y: 18 },
          { opacity: 1, y: 0, duration: 0.75 },
          '-=0.55'
        );

      if (ctaGroupRef.current && window.innerWidth >= 1024) {
        tl.fromTo(
          ctaGroupRef.current,
          { opacity: 0, y: 14 },
          { opacity: 1, y: 0, duration: 0.65 },
          '-=0.45'
        );
      }

      // 2. Controlled Scroll Depth Effect (Product recedes deeper into background on scroll)
      const mm = gsap.matchMedia();
      mm.add('(min-width: 1024px)', () => {
        gsap.to(rightColRef.current, {
          scale: 0.92,
          y: 28,
          opacity: 0.88,
          ease: 'power1.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: 1.0,
            invalidateOnRefresh: true,
          },
        });

        gsap.to(leftColRef.current, {
          y: -22,
          opacity: 0.88,
          ease: 'power1.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: 1.0,
            invalidateOnRefresh: true,
          },
        });
      });

      mm.add('(max-width: 1023px)', () => {
        gsap.to(rightColRef.current, {
          opacity: 0.92,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: 0.8,
            invalidateOnRefresh: true,
          },
        });
      });
    }, sectionRef);

    return () => {
      ctx.revert();
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative min-h-[90svh] lg:min-h-screen flex flex-col justify-center border-b overflow-hidden transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)]"
      style={{
        background: activeTheme.bgGradient,
        borderColor: activeTheme.borderMuted,
      }}
    >
      {/* Dynamic Ambient Studio Glow */}
      <div
        className="absolute top-1/4 right-1/4 w-[400px] sm:w-[650px] h-[400px] sm:h-[650px] rounded-full blur-3xl pointer-events-none transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)]"
        style={{
          background: `radial-gradient(circle, ${activeTheme.ambientGlow} 0%, transparent 70%)`,
        }}
      />

      {/* Subtle Studio Floor Atmosphere */}
      <div
        className="absolute bottom-0 inset-x-0 h-32 pointer-events-none transition-opacity duration-1000"
        style={{
          background: `linear-gradient(to top, ${activeTheme.bgPrimary} 0%, transparent 100%)`,
        }}
      />

      <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-2.5 sm:py-3.5 lg:py-3.5 xl:py-8 relative z-10 flex-1 flex flex-col justify-center">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-1.5 sm:gap-4 lg:gap-8 items-center">
          {/* Left Column: High-Fashion Editorial Typography & CTAs (6 Cols -> 50% Desktop Width) */}
          <div
            ref={leftColRef}
            className="lg:col-span-6 flex flex-col text-center lg:text-left space-y-1.5 sm:space-y-3 lg:space-y-4"
          >
            {/* Atelier Eyebrow */}
            <div className="hero-eyebrow self-center lg:self-start">
              <div
                className="inline-flex items-center gap-2 px-3 sm:px-3.5 py-1 sm:py-1.5 rounded-full border text-[10px] sm:text-xs font-mono tracking-widest uppercase shadow-2xs backdrop-blur-md transition-colors duration-700"
                style={{
                  backgroundColor: activeTheme.badgeBg,
                  borderColor: activeTheme.badgeBorder,
                  color: activeTheme.badgeText,
                }}
              >
                <Factory className="w-3.5 h-3.5 text-[#C5A059]" />
                <span className="truncate">Mumbai Contract Atelier</span>
              </div>
            </div>

            {/* Editorial Display Heading: Balanced 2-Line Composition */}
            <div className="space-y-1 sm:space-y-2">
              <h1
                ref={headingRef}
                className="text-2xl xs:text-3xl sm:text-4xl lg:text-[2.65rem] xl:text-[3.45rem] font-serif font-normal leading-[1.08] tracking-tight transition-colors duration-700"
                style={{ color: activeTheme.textPrimary }}
              >
                <span className="block whitespace-nowrap">Bags &amp; Pouches,</span>
                <span className="block italic font-normal whitespace-nowrap">
                  Made for Brands.
                </span>
              </h1>

              {/* Supporting Editorial Paragraph */}
              <p
                ref={textRef}
                className="text-xs sm:text-sm lg:text-base font-sans font-light leading-relaxed max-w-sm sm:max-w-md lg:max-w-lg mx-auto lg:mx-0 transition-colors duration-700"
                style={{ color: activeTheme.textSecondary }}
              >
                Custom cosmetic pouches, carry-alls, and bespoke gifting packaging, engineered directly in Mumbai for beauty labels and retail brand programmes.
              </p>
            </div>

            {/* Desktop Action CTAs */}
            <div ref={ctaGroupRef} className="hidden lg:block pt-2 xl:pt-3">
              <div className="flex flex-row items-center gap-3.5 xl:gap-4">
                <Link
                  href="/contact#rfq"
                  className="group inline-flex items-center justify-center gap-3 px-7 xl:px-8 py-3 xl:py-3.5 rounded-xs transition-all duration-300 text-xs sm:text-sm font-medium tracking-wide shadow-md hover:shadow-xl focus-visible:ring-2 focus-visible:ring-[#C5A059]"
                  style={{
                    backgroundColor: activeTheme.ctaPrimaryBg,
                    color: activeTheme.ctaPrimaryText,
                  }}
                >
                  <span>Request a Bulk Quote</span>
                  <ArrowRight className="w-4 h-4 text-[#C5A059] group-hover:translate-x-1 transition-transform duration-300" />
                </Link>

                <Link
                  href="/products"
                  className="group inline-flex items-center justify-center gap-2 px-6 xl:px-7 py-3 xl:py-3.5 rounded-xs border backdrop-blur-xs transition-all duration-300 text-xs sm:text-sm font-medium tracking-wide shadow-2xs hover:shadow-xs focus-visible:ring-2 focus-visible:ring-[#C5A059]"
                  style={{
                    backgroundColor: activeTheme.ctaSecondaryBg,
                    borderColor: activeTheme.ctaSecondaryBorder,
                    color: activeTheme.ctaSecondaryText,
                  }}
                >
                  <span>Explore Collection</span>
                  <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300 opacity-70 group-hover:opacity-100" />
                </Link>
              </div>
            </div>
          </div>

          {/* Right Column: Borderless 3D Studio Stage (6 Cols -> 50% Desktop Width, Visual Center ~75%) */}
          <div
            ref={rightColRef}
            className="lg:col-span-6 relative flex flex-col items-center justify-center w-full min-w-0 bg-transparent"
            style={{ background: 'transparent' }}
          >
            <HeroErrorBoundary>
              <Hero3DCanvas
                activeTheme={activeTheme}
                onSelectTheme={setActiveTheme}
              />
            </HeroErrorBoundary>
          </div>

          {/* Mobile-Only Action CTAs (Directly Reachable Below 3D Stage & Swatches) */}
          <div className="lg:hidden w-full pt-1.5 sm:pt-2">
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-2 w-full max-w-xs sm:max-w-sm mx-auto">
              <Link
                href="/contact#rfq"
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xs transition-colors text-xs sm:text-sm font-medium tracking-wide shadow-sm"
                style={{
                  backgroundColor: activeTheme.ctaPrimaryBg,
                  color: activeTheme.ctaPrimaryText,
                }}
              >
                <span>Request a Bulk Quote</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#C5A059]" />
              </Link>

              <Link
                href="/products"
                className="inline-flex items-center justify-center gap-1.5 px-5 py-2 rounded-xs border transition-colors text-xs font-medium tracking-wide"
                style={{
                  backgroundColor: activeTheme.ctaSecondaryBg,
                  borderColor: activeTheme.ctaSecondaryBorder,
                  color: activeTheme.ctaSecondaryText,
                }}
              >
                <span>Explore Collection</span>
                <ArrowUpRight className="w-3.5 h-3.5 opacity-75" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
