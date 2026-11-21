'use client';

import Image from 'next/image';
import { EditorialReveal } from '@/components/motion/EditorialReveal';

const STORY_PANELS = [
  {
    step: '01',
    phase: '01 — DESIGN & PATTERN',
    title: 'Design & Pattern',
    caption: 'Precision CAD pattern grading and dimensional tech-packs prepared for exact assembly.',
    image: '/images/factory/01-design-pattern.png',
    imageAlt: 'ARMANO Technical Tech-Pack Blueprint and Pattern Grading',
    desktopColSpan: 'lg:col-span-7',
  },
  {
    step: '02',
    phase: '02 — MATERIAL SELECTION',
    title: 'Material Selection',
    caption: 'Curated woven textiles, structured vegan leatherette, and custom metallic hardware.',
    image: '/images/factory/02-material-selection.png',
    imageAlt: 'ARMANO Curated Textile Weaves and Metallic Zipper Hardware',
    desktopColSpan: 'lg:col-span-5',
  },
  {
    step: '03',
    phase: '03 — PHYSICAL SAMPLING',
    title: 'Physical Sampling',
    caption: 'Finished cosmetic pouch prototypes constructed for tactile inspection and brand sign-off.',
    image: '/images/factory/03-physical-sampling.png',
    imageAlt: 'ARMANO Authentic Pre-Production Counter-Samples on Workshop Table',
    desktopColSpan: 'lg:col-span-5',
  },
  {
    step: '04',
    phase: '04 — WORKSHOP PRODUCTION',
    title: 'Workshop Production',
    caption: 'Precision batch cutting, assembly, and multi-point packing in our Mumbai atelier.',
    image: '/images/factory/04-workshop-production.png',
    imageAlt: 'ARMANO Mumbai Production Workshop Packaging and Inspection Station',
    desktopColSpan: 'lg:col-span-7',
  },
];

/**
 * ARMANO V8.3 — Section 04: Manufacturing Story (Image-First Editorial Redesign)
 *
 * Requirements:
 * - 4 large image-led editorial panels (01 Design & Pattern, 02 Material Selection, 03 Physical Sampling, 04 Workshop Production)
 * - Large authentic photographs occupying ~75–85% of each panel
 * - Asymmetrical editorial grid (Row 1: 7-col / 5-col; Row 2: 5-col / 7-col on desktop)
 * - Balanced 2-col on laptop, clean vertical stack on mobile
 * - Clean white and warm ivory backgrounds with minimal borders
 * - Subtle image zoom on hover
 * - Small section numbers (01–04), short titles, and maximum one short supporting sentence
 */
export function ManufacturingStorySection() {
  return (
    <section id="story" className="py-20 lg:py-28 bg-[#FFFFFF] text-[#242424] border-b border-[#E8DED0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <EditorialReveal variant="fade-up" duration={600}>
          <div className="text-center max-w-2xl mx-auto mb-14 lg:mb-18 space-y-3">
            <span className="text-xs font-mono uppercase tracking-[0.2em] text-[#C5A059] block font-semibold">
              Atelier Process // 04 Stages
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-[#10352C] font-normal tracking-tight uppercase">
              Manufacturing Story
            </h2>
            <p className="text-sm sm:text-base text-[#5A5D64] font-light leading-relaxed max-w-xl mx-auto">
              From initial CAD technical blueprints to physical counter-sampling and atelier packaging in Mumbai.
            </p>
          </div>
        </EditorialReveal>

        {/* Asymmetrical Editorial Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch">
          {STORY_PANELS.map((panel, idx) => (
            <div
              key={panel.step}
              className={`col-span-1 md:col-span-1 ${panel.desktopColSpan} flex flex-col`}
            >
              <EditorialReveal variant="fade-up" delay={(idx % 2) * 120} duration={750} className="h-full flex flex-col">
                <div className="group bg-[#FFFFFF] rounded-xs border border-[#EAE5DE] hover:border-[#10352C]/50 transition-all duration-500 ease-[var(--ease-luxury)] overflow-hidden shadow-2xs hover:shadow-lg hover:-translate-y-1 flex flex-col h-full">
                  {/* Photographic Hero Area — occupies 75–85% of panel height */}
                  <div className="relative w-full h-[280px] sm:h-[340px] lg:h-[420px] overflow-hidden bg-[#FAF7F2] shrink-0">
                    <Image
                      src={panel.image}
                      alt={panel.imageAlt}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 60vw"
                      className="object-cover transition-transform duration-750 ease-[var(--ease-luxury)] group-hover:scale-104"
                    />

                    {/* Step Number Badge */}
                    <div className="absolute top-3.5 left-3.5 z-10">
                      <span className="text-[11px] font-mono tracking-widest text-[#10352C] bg-white/95 backdrop-blur-xs px-2.5 py-1 rounded-xs border border-[#E8DED0] shadow-2xs font-semibold">
                        {panel.step}
                      </span>
                    </div>
                  </div>

                  {/* Minimal Editorial Text Caption */}
                  <div className="p-5 sm:p-6 bg-[#FFFFFF] flex-1 flex flex-col justify-center space-y-1.5 border-t border-[#F0EBE1]">
                    <div className="flex items-baseline justify-between gap-3">
                      <h3 className="text-lg sm:text-xl font-serif text-[#10352C] group-hover:text-[#C5A059] transition-colors duration-300 font-normal tracking-tight">
                        {panel.title}
                      </h3>
                      <span className="text-[10px] font-mono uppercase tracking-[0.18em] text-[#C5A059] font-medium shrink-0">
                        Phase {panel.step}
                      </span>
                    </div>
                    <p className="text-xs sm:text-[13px] text-[#5A5D64] font-light leading-relaxed">
                      {panel.caption}
                    </p>
                  </div>
                </div>
              </EditorialReveal>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
