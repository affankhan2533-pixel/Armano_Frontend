'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, ArrowUpRight, SlidersHorizontal, Sparkles } from 'lucide-react';
import { products } from '@/data/products';
import { EditorialReveal } from '@/components/motion/EditorialReveal';

const FILTER_TABS = [
  { id: 'all', label: 'All Silhouettes', count: 13 },
  { id: 'Contrast Base', label: 'Contrast Base', count: 1 },
  { id: 'Boxy & Rectangular', label: 'Boxy & Rectangular', count: 4 },
  { id: 'Specialized Silhouettes', label: 'Specialized', count: 5 },
  { id: 'Shoulder & Tote Bags', label: 'Totes & Bags', count: 2 },
  { id: 'Gifting & Pouches', label: 'Gifting Pouches', count: 1 },
];

/**
 * Master Product Discovery Section (V6 Redesign)
 * Features:
 * - Museum-pedestal image presentation with generous breathing room
 * - Prominent SKU identification (AR-001 through AR-013)
 * - Large readable Cormorant Garamond product titles
 * - Refined silhouette family filter pills
 */
export function ProductDiscoverySection() {
  const [activeTab, setActiveTab] = useState('all');

  const filteredProducts = activeTab === 'all'
    ? products
    : products.filter((p) => p.silhouetteFamily === activeTab);

  return (
    <section className="py-20 lg:py-28 bg-[#F7F4EF] text-[#242424] border-b border-[#E8DED0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <EditorialReveal variant="fade-up" duration={700}>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div className="max-w-2xl space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-[#E8DED0] text-[#C5A059] text-xs font-mono tracking-widest uppercase shadow-2xs">
                <span>Master Catalogue // AR-001 – AR-013</span>
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-[#10352C] font-normal tracking-tight">
                Direct Atelier Product Silhouettes
              </h2>
              <p className="text-base text-[#4A4D53] font-light leading-relaxed">
                Review verified factory prototype packshots, silhouette grading, and observed hardware configurations. Select any item to pre-fill an RFQ draft.
              </p>
            </div>

            <Link
              href="/products"
              className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#10352C] hover:text-[#C5A059] transition-colors py-2 px-4 rounded-xs bg-white border border-[#E8DED0] hover:border-[#10352C] self-start md:self-end font-medium shadow-2xs"
            >
              <span>Explore Master Index (13 SKUs)</span>
              <ArrowUpRight className="w-4 h-4 text-[#C5A059]" />
            </Link>
          </div>
        </EditorialReveal>

        {/* Filter Pills Bar */}
        <div className="mb-10 flex items-center justify-between flex-wrap gap-4 pb-4 border-b border-[#E8DED0]">
          <div className="flex items-center gap-2 overflow-x-auto pb-1 max-w-full no-scrollbar" role="tablist" aria-label="Silhouette Filters">
            <SlidersHorizontal className="w-4 h-4 text-[#737373] mr-1 shrink-0 hidden sm:inline" />
            {FILTER_TABS.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-4 py-2 rounded-full text-xs font-mono uppercase tracking-wider transition-all shrink-0 cursor-pointer flex items-center gap-2 ${
                    isActive
                      ? 'bg-[#10352C] text-[#F7F4EF] shadow-xs'
                      : 'bg-white text-[#737373] hover:text-[#10352C] border border-[#E8DED0]'
                  }`}
                >
                  <span>{tab.label}</span>
                  <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${isActive ? 'bg-[#C5A059] text-[#10352C]' : 'bg-[#F7F4EF] text-[#737373]'}`}>
                    {tab.count}
                  </span>
                </button>
              );
            })}
          </div>

          <span className="text-xs font-mono text-[#737373]">
            Showing <strong className="text-[#10352C]">{filteredProducts.length}</strong> of 13 models
          </span>
        </div>

        {/* 13-Product Deliberate Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((product) => {
            const displayName = product.workingName || product.name || product.title;

            return (
              <article
                key={product.sku}
                className="group bg-white rounded-sm border border-[#E8DED0] hover:border-[#10352C]/50 luxury-card-hover overflow-hidden flex flex-col justify-between transition-all duration-300 shadow-2xs"
              >
                {/* Museum-Pedestal Packshot Window */}
                <Link
                  href={`/products/${product.slug}`}
                  className="relative block w-full aspect-[4/3] bg-[#FAF8F5] overflow-hidden border-b border-[#E8DED0] p-6"
                >
                  <div className="absolute top-4 left-4 z-10 flex flex-wrap items-center gap-2">
                    <span className="text-xs font-mono px-3 py-1 rounded-sm bg-[#10352C] text-[#F7F4EF] font-semibold shadow-xs">
                      {product.sku}
                    </span>
                    {product.is3DEnabled && (
                      <span className="text-xs font-mono px-2 py-0.5 rounded-sm bg-white text-[#10352C] border border-[#E8DED0] flex items-center gap-1 shadow-2xs">
                        <Sparkles className="w-3 h-3 text-[#C5A059]" /> 3D Model
                      </span>
                    )}
                  </div>

                  {/* Packshot Image with Smooth Hover Expansion */}
                  <div className="relative w-full h-full">
                    <Image
                      src={product.heroImage}
                      alt={`${product.sku} — ${displayName}`}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-contain p-2 group-hover:scale-[1.04] transition-transform duration-700 ease-[var(--ease-luxury)]"
                    />
                  </div>
                </Link>

                {/* Product Specification Details */}
                <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between text-[11px] font-mono text-[#737373] uppercase tracking-wider mb-1.5">
                      <span>{product.categoryName}</span>
                      <span>{product.sourcePage}</span>
                    </div>

                    <h3 className="text-xl font-serif text-[#10352C] font-normal group-hover:text-[#C5A059] transition-colors leading-snug">
                      <Link href={`/products/${product.slug}`}>
                        {displayName}
                      </Link>
                    </h3>

                    <div className="mt-3 pt-3 border-t border-[#E8DED0]/80 space-y-1.5 text-xs text-[#4A4D53] font-light">
                      <p>
                        <span className="font-mono text-[#737373] uppercase text-[10px]">Silhouette:</span>{' '}
                        {product.silhouetteFamily || product.silhouette}
                      </p>
                      <p className="line-clamp-1">
                        <span className="font-mono text-[#737373] uppercase text-[10px]">Observed Hardware:</span>{' '}
                        {product.observedHardware || 'Zinc alloy zipper with puller'}
                      </p>
                    </div>
                  </div>

                  {/* Action Controls */}
                  <div className="pt-4 border-t border-[#E8DED0]/80 flex items-center justify-between">
                    <span className="text-[11px] font-mono text-[#737373]">
                      Tiers: 10k / 20k / 50k
                    </span>

                    <div className="flex items-center gap-3">
                      <Link
                        href={`/products/${product.slug}`}
                        className="text-xs font-mono uppercase tracking-wider text-[#5A5D64] hover:text-[#10352C] transition-colors"
                      >
                        Specs
                      </Link>
                      <Link
                        href={`/contact?sku=${product.sku}&product=${encodeURIComponent(displayName)}#rfq`}
                        className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider px-3 py-1.5 rounded-xs bg-[#10352C] text-[#F7F4EF] hover:bg-[#C5A059] hover:text-[#10352C] transition-colors font-medium shadow-2xs"
                      >
                        <span>RFQ</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
