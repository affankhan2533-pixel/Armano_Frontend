'use client';

import Link from 'next/link';
import { ArrowRight, Phone, Factory } from 'lucide-react';
import { EditorialReveal } from '@/components/motion/EditorialReveal';

/**
 * ARMANO V8.0 — Section 06: Final B2B Enquiry Section
 * Minimal, high-luxury conversion section:
 * - Deep Forest Green (#10352C)
 * - Heading: "Let's Create Your Next Collection."
 * - 1 short sentence
 * - 1 prominent Request a Bulk Quote CTA + direct phone contact
 */
export function B2bEnquirySection() {
  return (
    <section id="enquiry" className="py-20 lg:py-28 bg-[#10352C] text-[#F7F4EF] relative overflow-hidden border-b border-[#0A261D]">
      {/* Dynamic Ambient Studio Lighting Flare */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] sm:w-[800px] h-[600px] sm:h-[800px] rounded-full bg-[#C5A059]/10 blur-3xl pointer-events-none" />

      {/* Subtle Atelier Vector Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        {/* Minimal Atelier Eyebrow */}
        <EditorialReveal variant="fade-up" delay={0} duration={600}>
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-[#C5A059]/40 text-[#C5A059] text-xs font-mono tracking-widest uppercase mb-6 shadow-2xs">
            <Factory className="w-3.5 h-3.5 text-[#C5A059]" />
            <span>Direct Sion-Dharavi Facility • Mumbai</span>
          </div>
        </EditorialReveal>

        {/* Section Headline */}
        <EditorialReveal variant="fade-up" delay={120} duration={700}>
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-serif text-[#FBF9F5] font-normal leading-[1.1] tracking-tight mb-5">
            Let&apos;s Create Your <br className="hidden sm:inline" />
            <span className="italic font-normal text-[#E8D5B5]">Next Collection.</span>
          </h2>
        </EditorialReveal>

        {/* Concise Supporting Sentence */}
        <EditorialReveal variant="fade-up" delay={220} duration={750}>
          <p className="text-base sm:text-lg text-[#D0C9BD] font-light leading-relaxed max-w-xl mx-auto mb-10">
            Direct manufacturer pricing and physical counter-samples engineered at our Mumbai atelier for global beauty labels.
          </p>
        </EditorialReveal>

        {/* Action Buttons */}
        <EditorialReveal variant="fade-up" delay={320} duration={800}>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/contact#rfq"
              className="group inline-flex items-center justify-center gap-3 px-9 py-4 rounded-xs bg-[#C5A059] text-[#10352C] hover:bg-[#D4B26F] transition-all duration-300 text-sm font-medium tracking-wide shadow-xl hover:shadow-2xl focus-visible:ring-2 focus-visible:ring-white"
            >
              <span>Request a Bulk Quote</span>
              <ArrowRight className="w-4 h-4 text-[#10352C] group-hover:translate-x-1 transition-transform duration-300" />
            </Link>

            <a
              href="tel:+918591897469"
              className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-xs border border-white/20 text-[#F7F4EF] hover:bg-white/10 transition-colors text-sm font-medium tracking-wide"
            >
              <Phone className="w-4 h-4 text-[#C5A059]" />
              <span className="font-mono">+91 8591897469</span>
            </a>
          </div>
        </EditorialReveal>
      </div>
    </section>
  );
}
