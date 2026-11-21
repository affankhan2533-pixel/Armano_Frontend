'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, ShoppingBag } from 'lucide-react';
import { products } from '@/data/products';
import { EditorialReveal } from '@/components/motion/EditorialReveal';

// 10 Flagship silhouettes matching Fontana Contarini 5-column layout
const FEATURED_SKUS = [
  'AR-001',
  'AR-002',
  'AR-003',
  'AR-004',
  'AR-005',
  'AR-006',
  'AR-007',
  'AR-008',
  'AR-009',
  'AR-010',
];

const SHORT_NAMES = {
  'AR-001': 'Classic Zip-Top Pouch',
  'AR-002': 'Two-Tone Contrast Pouch',
  'AR-003': 'Box Gusset Travel Organizer',
  'AR-004': 'Crimson Velvet Vanity Bag',
  'AR-005': 'Cylindrical Barrel Pouch',
  'AR-006': 'Bow Accent Cosmetic Pouch',
  'AR-007': 'Structured Woven Pouch',
  'AR-008': 'Dual-Zip Tiered Vanity Case',
  'AR-009': 'Quilted Standing Pouch',
  'AR-010': 'Teddy Fleece Texture Pouch',
};

/**
 * ARMANO V8.2.1 — Section 02: Featured Products
 * Cleaned and verified luxury product catalogue:
 * - Pure white background (#FFFFFF)
 * - Five columns on wide desktop (2 rows of 5 = 10 silhouettes)
 * - Four columns on laptop
 * - Two columns on mobile
 * - Large, consistent aspect-square product image area
 * - Natural product photography with original backgrounds, shadows & textures
 * - Minimal card content: 1. Photograph, 2. Small SKU, 3. Short name, 4. Details link, 5. Quote icon
 * - All 10 silhouettes feature authentic client packshots
 */
export function MasterProductGallery() {
  const featuredProducts = products.filter((p) => FEATURED_SKUS.includes(p.sku));

  return (
    <section id="products" className="py-20 lg:py-28 bg-[#FFFFFF] text-[#242424] border-b border-[#E8DED0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header — Fontana Contarini Centered Elegance */}
        <EditorialReveal variant="fade-up" duration={600}>
          <div className="text-center max-w-2xl mx-auto mb-12 lg:mb-16 space-y-3">
            <span className="text-xs font-mono uppercase tracking-[0.2em] text-[#C5A059] block font-semibold">
              Master Catalogue // Direct B2B Production
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-[#10352C] font-normal tracking-tight uppercase">
              Featured Product Silhouettes
            </h2>
            <p className="text-sm sm:text-base text-[#5A5D64] font-light leading-relaxed">
              Curated master silhouettes photographed at our Mumbai atelier. Fabricated to custom brand dimensions and volume specifications.
            </p>
          </div>
        </EditorialReveal>

        {/* 5-Column Storefront Product Grid (Reference 1 Layout) */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6">
          {featuredProducts.map((product, i) => {
            const shortName = SHORT_NAMES[product.sku] || product.workingName || product.name;

            return (
              <EditorialReveal key={product.sku} variant="fade-up" delay={(i % 5) * 75} duration={700}>
                <div className="group flex flex-col h-full bg-[#FFFFFF] rounded-xs border border-[#EAE5DE] hover:border-[#10352C]/60 transition-all duration-500 ease-[var(--ease-luxury)] shadow-2xs hover:shadow-md hover:-translate-y-1 overflow-hidden">
                  {/* Aspect-Square Image Container */}
                  <Link
                    href={`/products/${product.slug}`}
                    className="relative w-full aspect-square bg-[#FAF9F6] overflow-hidden block border-b border-[#EAE5DE]/80"
                  >
                    <Image
                      src={product.heroImage}
                      alt={shortName}
                      fill
                      sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 20vw"
                      className="object-contain p-3.5 sm:p-4.5 transition-transform duration-750 ease-[var(--ease-luxury)] group-hover:scale-105"
                    />

                    {/* Small Official SKU Badge */}
                    <div className="absolute top-2.5 left-2.5 z-10">
                      <span className="text-[10px] font-mono tracking-wider font-semibold text-[#10352C] bg-white/95 backdrop-blur-xs px-2 py-0.5 rounded-xs border border-[#E8DED0] shadow-2xs">
                        {product.sku}
                      </span>
                    </div>
                  </Link>

                  {/* Card Content & Action Row */}
                  <div className="p-3.5 sm:p-4 flex-1 flex flex-col justify-between space-y-3">
                    {/* Short Product Name */}
                    <div>
                      <Link
                        href={`/products/${product.slug}`}
                        className="text-sm sm:text-[15px] font-serif font-normal text-[#10352C] group-hover:text-[#C5A059] transition-colors duration-300 leading-snug line-clamp-1 block"
                        title={shortName}
                      >
                        {shortName}
                      </Link>
                    </div>

                    {/* Minimal Action Row: Details link + Quote Icon */}
                    <div className="pt-2.5 border-t border-[#EAE5DE] flex items-center justify-between gap-2">
                      <Link
                        href={`/products/${product.slug}`}
                        className="text-[11px] font-mono uppercase tracking-wider text-[#4A4D53] hover:text-[#10352C] transition-colors font-medium flex items-center gap-1.5 group/details luxury-link-underline"
                      >
                        <span>Details</span>
                        <ArrowRight className="w-3 h-3 text-[#C5A059] group-hover/details:translate-x-1 transition-transform duration-300 ease-[var(--ease-luxury)]" />
                      </Link>

                      <Link
                        href={`/contact?sku=${product.sku}&product=${encodeURIComponent(shortName)}#rfq`}
                        className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#FAF8F5] border border-[#E8DED0] hover:bg-[#10352C] hover:border-[#10352C] hover:text-white text-[#10352C] flex items-center justify-center transition-all duration-300 ease-[var(--ease-luxury)] shadow-2xs hover:shadow-xs active:scale-95 group/btn shrink-0"
                        title={`Request Bulk Quote for ${product.sku}`}
                        aria-label={`Request Bulk Quote for ${product.sku}`}
                      >
                        <ShoppingBag className="w-3.5 h-3.5 group-hover/btn:scale-108 transition-transform duration-300" />
                      </Link>
                    </div>
                  </div>
                </div>
              </EditorialReveal>
            );
          })}
        </div>

        {/* Bottom Master Index Action */}
        <div className="mt-12 text-center">
          <Link
            href="/products"
            className="inline-flex items-center justify-center gap-3 px-8 py-3.5 rounded-xs bg-white border border-[#E8DED0] hover:border-[#10352C] text-xs font-mono uppercase tracking-widest text-[#10352C] hover:bg-[#FAF8F5] transition-all duration-300 shadow-2xs font-medium"
          >
            <span>Explore Complete Master Index (AR-001 – AR-013)</span>
            <ArrowRight className="w-3.5 h-3.5 text-[#C5A059]" />
          </Link>
        </div>
      </div>
    </section>
  );
}
