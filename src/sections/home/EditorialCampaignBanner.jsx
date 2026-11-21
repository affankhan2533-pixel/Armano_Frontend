'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Sparkles } from 'lucide-react';
import { EditorialReveal } from '@/components/motion/EditorialReveal';

/**
 * ARMANO V8.0 — Section 03: Editorial Campaign Banner
 * Reference 2 style image-led section:
 * - 1 authentic photograph
 * - Short eyebrow
 * - 1 elegant heading
 * - Maximum 1 short supporting sentence
 * - 1 primary CTA
 */
export function EditorialCampaignBanner() {
  return (
    <section id="campaign" className="relative bg-[#10352C] text-[#F7F4EF] overflow-hidden border-b border-[#0A261D]">
      {/* Ambient Luxury Lighting Glow */}
      <div className="absolute top-1/2 left-1/3 -translate-y-1/2 w-[500px] sm:w-[700px] h-[500px] sm:h-[700px] rounded-full bg-[#C5A059]/10 blur-3xl pointer-events-none" />

      {/* Atmospheric Radial Background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_50%,rgba(20,60,48,0.8)_0%,#0D261F_100%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Left Column: Authentic High-Resolution Close-up Photography (7 Cols) */}
          <div className="lg:col-span-7 order-2 lg:order-1">
            <EditorialReveal variant="image-reveal" duration={850}>
              <div className="relative w-full h-[340px] xs:h-[400px] sm:h-[480px] lg:h-[540px] rounded-xs overflow-hidden bg-gradient-to-br from-[#164336] to-[#0A2019] border border-white/10 shadow-2xl group">
                <Image
                  src="/images/products/AR-009-puffer.png"
                  alt="ARMANO Quilted Pouch Physical Prototype"
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 60vw"
                  className="object-contain p-6 sm:p-10 filter drop-shadow-[0_25px_35px_rgba(0,0,0,0.4)] transition-transform duration-1000 ease-[var(--ease-luxury)] group-hover:scale-105"
                />

                {/* Corner Atelier Monogram Accent */}
                <div className="absolute bottom-4 left-4 z-10 flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/40 backdrop-blur-md border border-white/15 text-[10px] font-mono tracking-widest uppercase text-[#E8D5B5]">
                  <Sparkles className="w-3 h-3 text-[#C5A059]" />
                  <span>Quilted Cushion Silhouette • Metallic Finish Zip</span>
                </div>
              </div>
            </EditorialReveal>
          </div>

          {/* Right Column: Refined Editorial Typography & Action (5 Cols) */}
          <div className="lg:col-span-5 order-1 lg:order-2 space-y-6 text-center lg:text-left">
            <EditorialReveal variant="fade-up" delay={50} duration={600}>
              <span className="text-xs font-mono uppercase tracking-[0.25em] text-[#C5A059] block font-semibold">
                ATELIER CAMPAIGN
              </span>
            </EditorialReveal>

            <EditorialReveal variant="fade-up" delay={150} duration={700}>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-serif text-[#FBF9F5] font-normal leading-[1.08] tracking-tight">
                Designed Around <br className="hidden sm:inline" />
                <span className="italic font-normal text-[#E8D5B5]">Your Brand.</span>
              </h2>
            </EditorialReveal>

            <EditorialReveal variant="fade-up" delay={250} duration={750}>
              <p className="text-sm sm:text-base text-[#D0C9BD] font-light leading-relaxed max-w-md mx-auto lg:mx-0">
                Custom cosmetic pouches and bespoke packaging engineered directly in Mumbai for global beauty labels.
              </p>
            </EditorialReveal>

            <EditorialReveal variant="fade-up" delay={350} duration={800}>
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                <Link
                  href="/contact#rfq"
                  className="group inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xs bg-[#C5A059] text-[#10352C] hover:bg-[#D4B26F] transition-all duration-300 ease-[var(--ease-luxury)] text-sm font-medium tracking-wide shadow-lg hover:shadow-xl focus-visible:ring-2 focus-visible:ring-white"
                >
                  <span>Request a Bulk Quote</span>
                  <ArrowRight className="w-4 h-4 text-[#10352C] group-hover:translate-x-1 transition-transform duration-300 ease-[var(--ease-luxury)]" />
                </Link>

                <Link
                  href="/products"
                  className="inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xs border border-white/20 text-[#F7F4EF] hover:bg-white/10 transition-colors duration-300 text-sm font-medium tracking-wide"
                >
                  <span>Explore Silhouettes</span>
                </Link>
              </div>
            </EditorialReveal>
          </div>
        </div>
      </div>
    </section>
  );
}
