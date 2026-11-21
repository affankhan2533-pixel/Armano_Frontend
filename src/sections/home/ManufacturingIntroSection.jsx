'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Scissors, Layers, Cpu, ShieldCheck, Factory } from 'lucide-react';
import { EditorialReveal } from '@/components/motion/EditorialReveal';

/**
 * Editorial Manufacturing Storytelling Section (V6.3 Archive / Governance Cleaned)
 * Features 4 distinct truthful phases:
 * - 01 Tech-Pack Alignment (Clean Editorial Specification Confirmation)
 * - 02 Material Selection (Curated Substrates & Trims Index)
 * - 03 Physical Counter-Sampling (Authentic AR-009 Prototype Packshot)
 * - 04 Contract Tier Execution (10k / 20k / 50k Volume Ledger)
 * Direct Sion-Dharavi Mumbai provenance. Zero invented numerical dimensions.
 */
export function ManufacturingIntroSection() {
  const verifiedSteps = [
    {
      step: '01',
      icon: Scissors,
      title: 'Tech-Pack Alignment',
      subtitle: 'Pattern Engineering',
      desc: 'Pattern drafting, dimensional grading, and seam specifications established directly from client CAD technical packages.',
      badge: 'CAD Specification',
      visualType: 'blueprint',
    },
    {
      step: '02',
      icon: Layers,
      title: 'Material Selection',
      subtitle: 'Substrate & Trims',
      desc: 'Commercial coated leatherettes, structured canvas-style weaves, and metallic-finish hardware selected to client brand requirements.',
      badge: 'Material Swatches',
      visualType: 'materials',
    },
    {
      step: '03',
      icon: ShieldCheck,
      title: 'Physical Counter-Sampling',
      subtitle: 'Pre-Production Sign-Off',
      desc: 'Physical prototype inspection and tactile sign-off. Seam alignment, material hand-feel, and closure functionality evaluated prior to scheduled production runs.',
      badge: 'Physical Prototype',
      visualType: 'photo',
      image: '/images/products/AR-009.png',
      imageAlt: 'Physical pre-production counter-sample prototype (AR-009) photographed in studio',
      caption: 'AR-009 Verification Prototype',
    },
    {
      step: '04',
      icon: Cpu,
      title: 'Contract Tier Execution',
      subtitle: 'Sion-Dharavi Facility',
      desc: 'Direct workshop manufacturing in Mumbai for beauty labels and retail collections. Structured quotation tiers with quality inspection.',
      badge: '10k / 20k / 50k Tiers',
      visualType: 'tiers',
    },
  ];

  return (
    <section className="py-20 lg:py-28 bg-[#F7F4EF] text-[#242424] border-b border-[#E8DED0] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Sticky Editorial Storytelling Intro */}
          <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-28">
            <EditorialReveal variant="fade-up" duration={650}>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-[#E8DED0] text-[#C5A059] text-xs font-mono tracking-widest uppercase mb-2 shadow-2xs">
                <Factory className="w-3.5 h-3.5 text-[#C5A059]" />
                <span>Atelier Storytelling // 04 Phases</span>
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-[#10352C] font-normal tracking-tight leading-[1.12]">
                Precision Contract Fabrication for Modern Brand Programmes
              </h2>
            </EditorialReveal>

            <EditorialReveal variant="fade-up" duration={700}>
              <p className="text-base text-[#4A4D53] font-light leading-relaxed">
                ARMANO operates directly from Mumbai’s historic leatherette and soft-goods manufacturing hub. We engineer packaging programs from technical blueprints to physical counter-samples and commercial volume execution.
              </p>
            </EditorialReveal>

            {/* Facility Location Card */}
            <EditorialReveal variant="fade-up" duration={750}>
              <div className="p-6 bg-white rounded-sm border border-[#E8DED0] space-y-2.5 shadow-xs">
                <span className="text-xs font-mono uppercase tracking-wider text-[#10352C] block font-semibold">
                  Mumbai Facility Provenance
                </span>
                <p className="text-xs text-[#737373] leading-relaxed">
                  Direct contract fabrication based in Sion-Dharavi, Mumbai, Maharashtra, India. In-person technical desk reviews and sample dispatches handled locally.
                </p>
                <div className="pt-2 flex items-center gap-4 text-xs font-mono text-[#C5A059]">
                  <span>✓ Physical Counter-Sampling</span>
                  <span>✓ 10k–50k RFQ</span>
                </div>
              </div>
            </EditorialReveal>

            <div className="pt-2">
              <Link
                href="/custom-manufacturing"
                className="group inline-flex items-center gap-2 text-sm font-medium text-[#10352C] hover:text-[#C5A059] transition-colors"
              >
                <span>Explore Custom Manufacturing Capabilities</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300 text-[#C5A059]" />
              </Link>
            </div>
          </div>

          {/* Right Column: 4 Sequential Manufacturing Phases */}
          <div className="lg:col-span-7 space-y-6">
            {verifiedSteps.map((step) => {
              const Icon = step.icon;
              return (
                <div
                  key={step.step}
                  className="bg-white rounded-sm border border-[#E8DED0] hover:border-[#10352C]/50 luxury-card-hover p-6 sm:p-8 overflow-hidden transition-all duration-300 shadow-2xs"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 items-center">
                    {/* Phase Number, Header & Narrative */}
                    <div className="sm:col-span-7 space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-baseline gap-2">
                          <span className="text-2xl sm:text-3xl font-serif text-[#C5A059] font-normal leading-none">
                            {step.step}
                          </span>
                          <span className="text-xs font-mono tracking-widest text-[#737373] uppercase">
                            / {step.subtitle}
                          </span>
                        </div>
                        <span className="text-[10px] font-mono uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-[#F7F4EF] text-[#10352C] border border-[#E8DED0] font-medium">
                          {step.badge}
                        </span>
                      </div>

                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-sm bg-[#F7F4EF] text-[#10352C] flex items-center justify-center border border-[#E8DED0] shrink-0">
                          <Icon className="w-4 h-4 text-[#C5A059]" />
                        </div>
                        <h3 className="text-xl font-serif text-[#10352C] font-normal">
                          {step.title}
                        </h3>
                      </div>

                      <p className="text-xs sm:text-sm text-[#4A4D53] font-light leading-relaxed">
                        {step.desc}
                      </p>
                    </div>

                    {/* Visual Panel */}
                    <div className="sm:col-span-5">
                      {/* Phase 01: Clean Editorial Tech-Pack Confirmation */}
                      {step.visualType === 'blueprint' && (
                        <div className="relative h-40 rounded-xs overflow-hidden bg-[#0A261D] text-[#F7F4EF] p-4 flex flex-col justify-between border border-[#E8DED0] select-none">
                          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff0c_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0c_1px,transparent_1px)] bg-[size:18px_18px] pointer-events-none" />
                          <div className="relative z-10 flex items-center justify-between text-[9px] font-mono tracking-wider text-[#C5A059] uppercase">
                            <span>CAD Tech-Pack</span>
                            <span>Mumbai Desk</span>
                          </div>
                          <div className="relative z-10 space-y-1 text-center py-1">
                            <span className="block text-[11px] font-mono font-semibold text-[#FAF8F5]">CLIENT TECH-PACK</span>
                            <span className="text-[10px] text-[#E8D5B5] font-mono block">PRODUCT DIMENSIONS</span>
                            <span className="text-[9.5px] text-[#D0C9BD] font-mono block">MATERIAL &amp; CONSTRUCTION</span>
                            <span className="inline-block text-[8.5px] font-mono text-[#C5A059] uppercase border border-[#C5A059]/40 px-2 py-0.5 rounded-full bg-[#C5A059]/10">
                              PENDING CONFIRMATION
                            </span>
                          </div>
                          <div className="relative z-10 text-[9px] font-mono text-[#E8D5B5]/90 pt-1.5 border-t border-white/10 flex items-center justify-between">
                            <span>Pattern Engineering</span>
                            <span>Sign-off Ready</span>
                          </div>
                        </div>
                      )}

                      {/* Phase 02: Material Selection Swatch Card */}
                      {step.visualType === 'materials' && (
                        <div className="relative h-40 rounded-xs overflow-hidden bg-[#FAF8F5] p-4 flex flex-col justify-between border border-[#E8DED0]">
                          <div className="flex items-center justify-between text-[9px] font-mono tracking-wider text-[#C5A059] uppercase">
                            <span>Curated Substrates</span>
                            <span>Trim Directory</span>
                          </div>
                          <div className="space-y-1.5 py-1">
                            <span className="block text-xs font-serif text-[#10352C] font-medium">Coated &amp; Woven Textiles</span>
                            <div className="grid grid-cols-2 gap-1 text-[9px] font-mono text-[#737373]">
                              <span className="bg-white p-1 rounded-xs border border-[#E8DED0]">PU Faux Leather</span>
                              <span className="bg-white p-1 rounded-xs border border-[#E8DED0]">Woven Canvas</span>
                              <span className="bg-white p-1 rounded-xs border border-[#E8DED0]">Metallic Zips</span>
                              <span className="bg-white p-1 rounded-xs border border-[#E8DED0]">Fabric Lining</span>
                            </div>
                          </div>
                          <div className="text-[9px] font-mono text-[#10352C] pt-1.5 border-t border-[#E8DED0] flex items-center justify-between">
                            <span>Client Swatch Sign-Off</span>
                            <span className="text-[#C5A059]">Commercial Scope</span>
                          </div>
                        </div>
                      )}

                      {/* Phase 03: Physical Counter-Sample Prototype Photo (AR-009) */}
                      {step.visualType === 'photo' && (
                        <div className="relative h-40 rounded-xs overflow-hidden bg-[#FAF8F5] border border-[#E8DED0] flex flex-col items-center justify-between p-3 group">
                          <div className="w-full flex items-center justify-between text-[9px] font-mono tracking-wider text-[#C5A059] uppercase">
                            <span>Prototype Audit</span>
                            <span className="text-[#10352C]">SKU: AR-009</span>
                          </div>
                          <div className="relative w-full h-24 my-1">
                            <Image
                              src={step.image}
                              alt={step.imageAlt}
                              fill
                              sizes="240px"
                              className="object-contain p-1 group-hover:scale-105 transition-transform duration-500 ease-[var(--ease-luxury)]"
                            />
                          </div>
                          <span className="text-[9px] font-mono text-[#737373] tracking-tight">
                            {step.caption}
                          </span>
                        </div>
                      )}

                      {/* Phase 04: Contract Tier Execution Ledger */}
                      {step.visualType === 'tiers' && (
                        <div className="relative h-40 rounded-xs overflow-hidden bg-[#FAF8F5] p-3 flex flex-col justify-between border border-[#E8DED0]">
                          <div className="flex items-center justify-between text-[9px] font-mono text-[#C5A059] uppercase tracking-wider">
                            <span>Scheduled Runs</span>
                            <span>Quality Review</span>
                          </div>
                          <div className="grid grid-cols-3 gap-1.5 text-center py-1">
                            <div className="p-2 bg-white rounded-xs border border-[#E8DED0]">
                              <span className="block font-mono text-sm font-semibold text-[#10352C]">10k</span>
                              <span className="text-[8px] text-[#737373] uppercase">Launch</span>
                            </div>
                            <div className="p-2 bg-[#10352C] text-white rounded-xs shadow-xs">
                              <span className="block font-mono text-sm font-semibold text-[#F7F4EF]">20k</span>
                              <span className="text-[8px] text-[#C5A059] uppercase">Standard</span>
                            </div>
                            <div className="p-2 bg-white rounded-xs border border-[#E8DED0]">
                              <span className="block font-mono text-sm font-semibold text-[#10352C]">50k</span>
                              <span className="text-[8px] text-[#737373] uppercase">Scale</span>
                            </div>
                          </div>
                          <span className="text-[9px] font-mono text-[#737373] text-center pt-1 border-t border-[#E8DED0]">
                            Sion-Dharavi Facility, Mumbai
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
