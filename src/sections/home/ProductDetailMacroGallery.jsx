'use client';

import Image from 'next/image';
import { EditorialReveal } from '@/components/motion/EditorialReveal';

const DETAIL_ITEMS = [
  {
    num: '01',
    title: 'Quilted Surface Appearance',
    caption: 'Recessed stitch channels with pillowed soft-matte volume and tailored perimeter cushioning observed on physical AR-009 prototype.',
    image: '/images/products/AR-009-puffer.png',
    imageAlt: 'Quilted Surface Appearance and Stitch Channel Detail [Visual Observation]',
  },
  {
    num: '02',
    title: 'Woven Textile Appearance',
    caption: 'Geometric weave pattern with interlocking structural grain and tailored edges observed on physical AR-007 prototype.',
    image: '/images/products/AR-007-woven.png',
    imageAlt: 'Woven Textile Appearance and Geometric Grain Detail [Visual Observation]',
  },
  {
    num: '03',
    title: 'Visible Hardware Details',
    caption: 'Metallic-finish champagne zipper track with articulated puller tab and tailored top seam mounting observed on finished samples.',
    image: '/images/samples/sample-clear-window.png',
    imageAlt: 'Visible Metallic Hardware Details and Zipper Track [Visual Observation]',
  },
  {
    num: '04',
    title: 'Observed Pouch Structure',
    caption: 'Folded box-gusset geometry and wide standing base profile observed on physical travel organizer prototype.',
    image: '/images/products/AR-003-travel.png',
    imageAlt: 'Observed Box-Gusset Pouch Structure and Corner Fold Detail [Visual Observation]',
  },
];

/**
 * ARMANO V7.2.2 — Material Story / Macro Detail Gallery
 * Replaced technical claims with observable descriptions:
 * - Quilted Surface Appearance
 * - Woven Textile Appearance
 * - Visible Hardware Details
 * - Observed Pouch Structure
 * Zero unsupported laboratory claims, zero unverified durability statements.
 */
export function ProductDetailMacroGallery() {
  return (
    <section className="py-20 lg:py-28 bg-[#F7F4EF] text-[#242424] border-b border-[#E8DED0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <EditorialReveal variant="fade-up" duration={600}>
          <div className="text-center max-w-2xl mx-auto mb-14 lg:mb-18 space-y-2.5">
            <span className="text-xs font-mono uppercase tracking-widest text-[#C5A059] block">
              Atelier Craftsmanship // Macro Details
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-[#10352C] font-normal tracking-tight">
              Crafted in Every Detail
            </h2>
            <p className="text-sm sm:text-base text-[#4A4D53] font-light leading-relaxed">
              Tactile textures, metallic hardware details, and structured seam profiles observed on physical ARMANO prototypes.
            </p>
          </div>
        </EditorialReveal>

        {/* 4 Macro Detail Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {DETAIL_ITEMS.map((item, i) => (
            <EditorialReveal key={item.num} variant="fade-up" duration={550 + i * 100}>
              <div className="group flex flex-col h-full bg-[#FFFFFF] rounded-xs border border-[#E8DED0] hover:border-[#10352C]/50 transition-all duration-300 shadow-2xs hover:shadow-md overflow-hidden">
                {/* Macro Crop Container */}
                <div className="relative w-full aspect-square bg-[#FAF8F5] overflow-hidden border-b border-[#E8DED0]/70">
                  <Image
                    src={item.image}
                    alt={item.imageAlt}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-contain p-6 transition-transform duration-700 ease-[var(--ease-luxury)] group-hover:scale-112"
                  />
                  <div className="absolute top-3 left-3 z-10">
                    <span className="text-[10px] font-mono tracking-wider font-semibold text-[#10352C] bg-white/95 px-2 py-0.5 rounded-xs border border-[#E8DED0] shadow-2xs">
                      {item.num}
                    </span>
                  </div>
                </div>

                {/* Caption Content */}
                <div className="p-5 space-y-2 flex-1 flex flex-col justify-between">
                  <div className="space-y-1.5">
                    <h3 className="text-xl font-serif font-normal text-[#10352C] group-hover:text-[#164E3D] transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-xs text-[#5A5D64] leading-relaxed font-light">
                      {item.caption}
                    </p>
                  </div>

                  <span className="text-[10px] font-mono text-[#C5A059] uppercase tracking-wider block pt-2 border-t border-[#E8DED0]/60">
                    Visual Observation // Prototype Detail
                  </span>
                </div>
              </div>
            </EditorialReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
