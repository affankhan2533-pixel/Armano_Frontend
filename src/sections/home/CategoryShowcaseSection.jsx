'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';
import { EditorialReveal } from '@/components/motion/EditorialReveal';

const DIVISIONS = [
  {
    num: '01',
    title: 'Cosmetic & Skincare Pouches',
    href: '/cosmetic-pouches',
    image: '/images/categories/01-cosmetic-pouches.png',
    imageAlt: 'ARMANO Authentic Cosmetic Pouch Suite Physical Prototype',
  },
  {
    num: '02',
    title: 'Tote Bags & Carry-Alls',
    href: '/tote-bags',
    image: '/images/categories/02-tote-bags.png',
    imageAlt: 'ARMANO Structured Shopper Tote Bag Physical Prototype',
  },
  {
    num: '03',
    title: 'Corporate & Luxury Gifting',
    href: '/corporate-gifting',
    image: '/images/categories/03-corporate-gifting-suite.png',
    imageAlt: 'ARMANO Luxury Executive Gifting Suite & Portfolio Presentation',
  },
  {
    num: '04',
    title: 'Custom OEM / ODM Manufacturing',
    href: '/custom-manufacturing',
    image: '/images/categories/04-oem-manufacturing.png',
    imageAlt: 'ARMANO Mumbai Atelier Workshop Batch Production & Packaging',
  },
];

/**
 * ARMANO V8.1 — Section 01: Our Collections
 * Image-First Luxury Architecture:
 * - Large photographic tiles occupying 80%+ of each card
 * - Clean white background (#FFFFFF) with zero heavy text overlays or dark scrims
 * - Minimal heading and category numbering (01–04)
 * - Consistent 4:5 image proportions with smooth luxury hover zoom
 * - Small circular arrow interaction
 * - 100% authentic, unbranded client photographs for all 4 sectors
 */
export function CategoryShowcaseSection() {
  return (
    <section id="collections" className="py-20 lg:py-28 bg-[#FFFFFF] text-[#242424] border-b border-[#E8DED0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <EditorialReveal variant="fade-up" duration={600}>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 lg:mb-16">
            <div className="max-w-2xl space-y-2.5">
              <span className="text-xs font-mono uppercase tracking-widest text-[#C5A059] block font-semibold">
                Manufacturing Divisions
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-[#10352C] font-normal tracking-tight">
                Our Collections
              </h2>
              <p className="text-sm sm:text-base text-[#4A4D53] font-light leading-relaxed">
                Four dedicated contract manufacturing sectors engineered for global beauty labels and lifestyle brand programmes.
              </p>
            </div>

            <Link
              href="/products"
              className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#10352C] hover:text-[#C5A059] transition-colors py-1.5 border-b border-[#10352C]/30 hover:border-[#C5A059] self-start md:self-end font-medium"
            >
              <span>Explore Master Catalogue</span>
              <ArrowUpRight className="w-4 h-4 text-[#C5A059]" />
            </Link>
          </div>
        </EditorialReveal>

        {/* 4 Large Photographic Tiles Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {DIVISIONS.map((div, i) => (
            <EditorialReveal key={div.num} variant="fade-up" delay={i * 90} duration={750}>
              <Link
                href={div.href}
                className="group flex flex-col bg-[#FFFFFF] rounded-xs border border-[#E8DED0] hover:border-[#10352C]/60 overflow-hidden transition-all duration-500 ease-[var(--ease-luxury)] shadow-2xs hover:shadow-lg hover:-translate-y-1"
              >
                {/* Large Photographic Tile Container (4:5 Aspect Ratio) */}
                <div className="relative w-full aspect-[4/5] bg-[#FAF8F5] overflow-hidden">
                  <Image
                    src={div.image}
                    alt={div.imageAlt}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover transition-transform duration-750 ease-[var(--ease-luxury)] group-hover:scale-105"
                  />

                  {/* Top Left Minimal Number Badge */}
                  <div className="absolute top-3.5 left-3.5 z-10">
                    <span className="text-[11px] font-mono tracking-widest text-[#10352C] bg-white/95 backdrop-blur-xs px-2.5 py-1 rounded-xs border border-[#E8DED0] shadow-2xs font-semibold">
                      {div.num}
                    </span>
                  </div>
                </div>

                {/* Minimal Card Footer (Pure White Ground, Zero Dark Overlay) */}
                <div className="p-4 sm:p-5 bg-white border-t border-[#E8DED0]/70 flex items-center justify-between gap-3 flex-1">
                  <h3 className="text-base sm:text-lg font-serif font-normal text-[#10352C] group-hover:text-[#C5A059] transition-colors leading-snug">
                    {div.title}
                  </h3>

                  <div className="w-8 h-8 rounded-full border border-[#E8DED0] group-hover:border-[#10352C] bg-[#FAF8F5] group-hover:bg-[#10352C] text-[#10352C] group-hover:text-white flex items-center justify-center shrink-0 transition-all duration-300 ease-[var(--ease-luxury)] shadow-2xs group-hover:shadow-sm">
                    <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-300 ease-[var(--ease-luxury)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </div>
                </div>
              </Link>
            </EditorialReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
