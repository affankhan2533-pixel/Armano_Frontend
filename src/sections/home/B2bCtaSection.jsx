'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Phone, CheckCircle2, Factory, Sparkles } from 'lucide-react';
import { EditorialReveal } from '@/components/motion/EditorialReveal';

/**
 * Substantial, Complete B2B Conversion Pavilion (V6.1)
 * - Deep Atelier Green (#10352C) luxury pavilion styling with Warm Ivory typography
 * - Interactive 10,000 / 20,000 / 50,000 provisional quantity selector cards
 * - High-visibility Primary "Request a Bulk Quote" and "Direct Call" CTAs
 * - Direct Mumbai facility provenance (Sion-Dharavi)
 * - Strict compliance: verified claims only, balanced responsive spacing
 */
export function B2bCtaSection() {
  const [selectedTier, setSelectedTier] = useState('20,000');

  const tiers = [
    {
      volume: '10,000',
      label: 'Provisional Scope Tier',
      desc: 'Indicative volume for capsule launches & seasonal programs',
      perks: 'Material sourcing & custom pull options',
    },
    {
      volume: '20,000',
      label: 'Standard Commercial Scope',
      desc: 'Indicative volume for retail cosmetics & beauty lines',
      perks: 'Physical counter-sample review included',
    },
    {
      volume: '50,000',
      label: 'Volume Production Scope',
      desc: 'Indicative volume for brand packaging programs',
      perks: 'Scheduled batch delivery options',
    },
  ];

  return (
    <section className="py-16 lg:py-20 bg-[#10352C] text-[#F7F4EF] relative overflow-hidden border-b border-[#0A261D]">
      {/* Subtle Atelier Vector Grid Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:36px_36px] pointer-events-none" />

      {/* Gold Ambient Flare */}
      <div className="absolute -top-32 right-1/4 w-96 h-96 bg-[#C5A059]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <EditorialReveal variant="fade-up" duration={650}>
          <div className="text-center max-w-3xl mx-auto mb-10 space-y-3.5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-[#C5A059]/40 text-[#C5A059] text-xs font-mono tracking-widest uppercase">
              <Factory className="w-3.5 h-3.5 text-[#C5A059]" />
              <span>Direct Factory RFQ Desk • Sion-Dharavi, Mumbai</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-[#FBF9F5] font-normal leading-[1.15] tracking-tight">
              Ready to Commission Your Brand’s Next Packaging Programme?
            </h2>

            <p className="text-sm sm:text-base text-[#D0C9BD] font-light leading-relaxed max-w-2xl mx-auto">
              Whether tailoring an existing master catalogue silhouette (AR-001 – AR-013) or engineering a custom tech-pack, our Mumbai atelier provides direct pricing and physical counter-samples.
            </p>
          </div>
        </EditorialReveal>

        {/* 10k / 20k / 50k Interactive Selection Cards */}
        <div className="mb-8">
          <div className="text-center mb-4">
            <span className="text-xs font-mono uppercase tracking-widest text-[#C5A059] font-medium">
              Step 1: Select Provisional Order Volume (Click to Pre-fill RFQ)
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6">
            {tiers.map((tier) => {
              const isSelected = selectedTier === tier.volume;
              return (
                <button
                  key={tier.volume}
                  type="button"
                  onClick={() => setSelectedTier(tier.volume)}
                  className={`text-left p-6 rounded-sm transition-all duration-300 relative cursor-pointer flex flex-col justify-between border ${
                    isSelected
                      ? 'bg-[#0A261D] border-[#C5A059] shadow-lg ring-1 ring-[#C5A059]'
                      : 'bg-white/5 border-white/10 hover:border-white/30 hover:bg-white/10'
                  }`}
                >
                  <div className="space-y-2">
                    <div className="flex items-baseline justify-between">
                      <span className="text-2xl sm:text-3xl font-mono font-semibold text-[#F7F4EF]">
                        {tier.volume}
                      </span>
                      <span className="text-xs font-mono uppercase text-[#C5A059] tracking-wider">
                        Units
                      </span>
                    </div>

                    <h3 className="text-base font-serif text-[#FAF8F5] font-medium">
                      {tier.label}
                    </h3>

                    <p className="text-xs text-[#D0C9BD] leading-relaxed">
                      {tier.desc}
                    </p>
                  </div>

                  <div className="pt-4 mt-4 border-t border-white/10 flex items-center justify-between text-[11px] font-mono">
                    <span className="text-[#C5A059] flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      {tier.perks}
                    </span>
                    <span className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center shrink-0 ${isSelected ? 'border-[#C5A059] bg-[#C5A059]' : 'border-white/30'}`}>
                      {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-[#10352C]" />}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>

          <p className="text-[11px] font-mono text-[#D0C9BD]/70 text-center mt-3 italic">
            *Volume selections represent provisional RFQ indications for scoping, pending technical specification review.
          </p>
        </div>

        {/* Action CTAs (Always Visible on Desktop and Mobile) */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
          <Link
            href={`/contact?sku=BESPOKE&product=Bespoke%20Packaging%20Programme&tier=${selectedTier}#rfq`}
            className="group w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xs bg-[#C5A059] text-[#10352C] hover:bg-[#D4B26F] transition-all duration-300 text-sm font-semibold tracking-wide shadow-md hover:shadow-lg focus-visible:ring-2 focus-visible:ring-white"
          >
            <span>Request a Bulk Quote ({selectedTier} Units)</span>
            <ArrowRight className="w-4 h-4 text-[#10352C] group-hover:translate-x-1 transition-transform duration-300" />
          </Link>

          <a
            href="tel:+918591897469"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-xs bg-white/10 text-[#F7F4EF] border border-white/20 hover:border-white hover:bg-white/15 transition-all duration-300 text-sm font-medium tracking-wide focus-visible:ring-2 focus-visible:ring-[#C5A059]"
          >
            <Phone className="w-4 h-4 text-[#C5A059]" />
            <span>Direct Call (+91 8591897469)</span>
          </a>
        </div>

        {/* Atelier Provenance Strip */}
        <div className="mt-10 pt-6 border-t border-white/10 flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-xs font-mono text-[#D0C9BD]/80">
          <span className="flex items-center gap-2">
            <Factory className="w-4 h-4 text-[#C5A059]" />
            Direct Factory Manufacturer Desk
          </span>
          <span className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#C5A059]" />
            Physical Counter-Sampling Included
          </span>
          <span className="flex items-center gap-2">
            <Factory className="w-4 h-4 text-[#C5A059]" />
            Sion-Dharavi Facility, Mumbai
          </span>
        </div>
      </div>
    </section>
  );
}
