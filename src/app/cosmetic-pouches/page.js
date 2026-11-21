import Image from 'next/image';
import Link from 'next/link';
import { getProductsByCategory } from '@/lib/data';
import { ArrowRight, Phone, ShieldCheck, Sparkles } from 'lucide-react';

export const metadata = {
  title: 'Cosmetic & Skincare Pouches (AR-001 – AR-013)',
  description: 'Explore the complete verified catalogue of 13 cosmetic and skincare pouches (SKUs AR-001 through AR-013) manufactured by ARMANO in Mumbai.',
  alternates: {
    canonical: '/cosmetic-pouches',
  },
};

export default function CosmeticPouchesPage() {
  const categoryProducts = getProductsByCategory('cosmetic-pouches');

  return (
    <div className="bg-[#F7F4EF] text-[#242424] min-h-screen py-10 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb">
          <ol className="flex items-center space-x-2 text-xs font-mono text-[#737373]">
            <li>
              <Link href="/" className="hover:text-[#10352C] transition-colors">
                Home
              </Link>
            </li>
            <li>/</li>
            <li>
              <Link href="/products" className="hover:text-[#10352C] transition-colors">
                Master Catalogue
              </Link>
            </li>
            <li>/</li>
            <li className="text-[#10352C] font-semibold" aria-current="page">
              Cosmetic & Skincare Pouches
            </li>
          </ol>
        </nav>

        {/* Editorial Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-8 border-b border-[#E8DED0]">
          <div className="max-w-3xl space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/80 border border-[#E8DED0] text-[#10352C] text-xs font-mono tracking-wider uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C5A059]" />
              <span>Verified Product Family • Source Heading: POUCHES</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-[#10352C] font-normal tracking-tight">
              Cosmetic & Skincare Pouches
            </h1>

            <p className="text-sm sm:text-base text-[#4A4D53] font-light leading-relaxed max-w-2xl">
              The authoritative 13-SKU production catalogue verified from the manufacturer source document (AR-001 through AR-013). Each item is a physical workshop prototype available for custom contract manufacturing.
            </p>
          </div>

          <div className="flex items-center gap-4 text-xs font-mono text-[#737373]">
            <span className="px-3 py-1.5 rounded-sm bg-white border border-[#E8DED0] text-[#10352C] font-semibold">
              {categoryProducts.length} Verified Master SKUs
            </span>
          </div>
        </div>

        {/* 13 Verified Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categoryProducts.map((product) => {
            const displayName = product.workingName || product.name || product.title;
            const appearanceList = product.observedAppearance || product.observedFinishes || [];

            return (
              <article
                key={product.sku}
                className="group bg-white rounded-sm border border-[#E8DED0] hover:border-[#10352C]/40 transition-all duration-300 flex flex-col justify-between overflow-hidden shadow-2xs hover:shadow-md"
              >
                {/* Packshot Image */}
                <Link
                  href={`/products/${product.slug}`}
                  className="relative aspect-[4/3] w-full bg-[#F7F4EF]/70 p-6 flex items-center justify-center border-b border-[#E8DED0] overflow-hidden"
                >
                  <div className="absolute top-3.5 left-3.5 z-10 flex items-center gap-2">
                    <span className="text-[10px] font-mono uppercase tracking-widest px-2.5 py-1 rounded-full bg-white/95 text-[#10352C] border border-[#E8DED0] font-semibold shadow-2xs">
                      {product.sku}
                    </span>
                    {product.is3DEnabled && (
                      <span className="text-[9px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-full bg-[#10352C] text-[#F7F4EF] flex items-center gap-1 shadow-2xs">
                        <Sparkles className="w-2.5 h-2.5 text-[#C5A059]" /> 3D Visual Prototype
                      </span>
                    )}
                  </div>

                  <div className="relative w-full h-full">
                    <Image
                      src={product.heroImage}
                      alt={`${displayName} — ${product.sku}`}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-contain p-2 group-hover:scale-104 transition-transform duration-500"
                    />
                  </div>
                </Link>

                {/* Details & Specifications */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-[#737373] block">
                      {product.silhouetteFamily || product.silhouette}
                    </span>
                    <h2 className="text-xl font-serif text-[#10352C] font-normal leading-snug group-hover:text-[#164E3D] transition-colors">
                      <Link href={`/products/${product.slug}`}>
                        {displayName}
                      </Link>
                    </h2>
                    <p className="text-xs text-[#4A4D53] font-light leading-relaxed line-clamp-2">
                      {product.description}
                    </p>
                  </div>

                  {/* Observed Appearance */}
                  <div className="pt-3 border-t border-[#E8DED0]/70 space-y-1.5">
                    <span className="text-[9px] font-mono uppercase text-[#737373] tracking-wider block">
                      Observed Appearance:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {appearanceList.slice(0, 2).map((item, idx) => (
                        <span
                          key={idx}
                          className="text-[10px] font-mono px-2 py-0.5 rounded-xs bg-[#F7F4EF] border border-[#E8DED0] text-[#4A4D53]"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Action Link */}
                  <div className="pt-3 border-t border-[#E8DED0]/70 flex items-center justify-between">
                    <Link
                      href={`/products/${product.slug}`}
                      className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-[#10352C] hover:text-[#C5A059] transition-colors font-medium"
                    >
                      <span>Prototype Specs</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>

                    <Link
                      href={`/contact?sku=${product.sku}&product=${encodeURIComponent(displayName)}#rfq`}
                      className="text-[11px] font-mono uppercase tracking-wider text-[#C5A059] hover:underline"
                    >
                      Request RFQ &rarr;
                    </Link>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {/* Counter-Sampling Quality Banner */}
        <div className="p-8 rounded-sm bg-white border border-[#E8DED0] flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-2xs">
          <div className="space-y-1 max-w-2xl">
            <h3 className="text-xl font-serif text-[#10352C]">
              Direct Mumbai Factory Physical Sampling
            </h3>
            <p className="text-xs text-[#5A5D64] leading-relaxed">
              Every pouch silhouette is graded and counter-sampled at our Sion-Dharavi facility prior to volume production. Request physical material swatches, CAD sizing variations, or custom zip-puller tooling.
            </p>
          </div>
          <Link
            href="/contact#rfq"
            className="px-6 py-3 rounded-xs bg-[#10352C] text-[#F7F4EF] hover:bg-[#164E3D] transition-colors text-xs font-mono uppercase tracking-wider shrink-0"
          >
            Request Counter-Sample
          </Link>
        </div>
      </div>
    </div>
  );
}
