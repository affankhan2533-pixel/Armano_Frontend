import Link from 'next/link';
import { getProducts } from '@/lib/data';
import { CatalogueView } from '@/components/catalogue/CatalogueView';
import { ShieldCheck, Phone, ArrowUpRight } from 'lucide-react';

export const metadata = {
  title: 'Master Pouch Catalogue (AR-001 – AR-013)',
  description: 'Explore the verified source catalogue of 13 commercial cosmetic pouches (AR-001 through AR-013) manufactured by ARMANO in Mumbai under the source POUCHES division.',
  alternates: {
    canonical: '/products',
  },
  openGraph: {
    title: 'Master Pouch Catalogue (AR-001 – AR-013) | ARMANO B2B Bags & Pouches',
    description: 'Explore the complete verified catalogue of 13 commercial pouch silhouettes manufactured directly in Mumbai for beauty brands and lifestyle programmes.',
    url: '/products',
  },
};

export default function ProductsPage() {
  const allProducts = getProducts();

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
            <li className="text-[#10352C] font-medium" aria-current="page">
              Master Pouch Catalogue (AR-001 – AR-013)
            </li>
          </ol>
        </nav>

        {/* Editorial Title Area (Inspired by Quiet Luxury References) */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-8 border-b border-[#E8DED0]">
          <div className="max-w-3xl space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/80 border border-[#E8DED0] text-[#10352C] text-xs font-mono tracking-wider uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C5A059]" />
              <span>Direct B2B Manufacturer • Mumbai Facility</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-[#10352C] font-normal tracking-tight">
              Master Pouch Catalogue
            </h1>

            <p className="text-sm sm:text-base text-[#4A4D53] font-light leading-relaxed max-w-2xl">
              The verified source catalogue of 13 commercial pouch silhouettes (SKUs AR-001 through AR-013) listed under the original manufacturer <span className="font-mono text-xs text-[#10352C] bg-white px-1.5 py-0.5 rounded border border-[#E8DED0]">POUCHES</span> heading. Each item represents an authentic workshop prototype engineered for volume contract production with custom sizing, materials, and branding.
            </p>
          </div>

          <div className="flex items-center gap-4 text-xs font-mono text-[#737373]">
            <a
              href="tel:+918591897469"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xs bg-white border border-[#E8DED0] text-[#10352C] hover:border-[#10352C] transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-[#C5A059]" />
              <span>Direct Factory Desk (+91 8591897469)</span>
            </a>
          </div>
        </div>

        {/* Interactive Catalogue View (Search, Filters, Sort, Grid, Cards) */}
        <CatalogueView initialProducts={allProducts} />

        {/* Technical Governance & Counter-Sampling Notice */}
        <div className="p-6 sm:p-8 rounded-sm bg-white border border-[#E8DED0] shadow-2xs space-y-4">
          <div className="flex items-center gap-2.5 text-[#10352C]">
            <ShieldCheck className="w-5 h-5 text-[#C5A059]" />
            <h3 className="text-lg font-serif">
              Technical Sampling & Specification Governance
            </h3>
          </div>
          <p className="text-xs sm:text-sm text-[#4A4D53] font-light leading-relaxed">
            All 13 master silhouettes depicted are production prototypes manufactured at our Sion-Dharavi facility in Mumbai. Dimensions, lining substrates, zipper teeth gauges, and branding treatments (blind debossing, foil stamping, screen printing, custom hardware) are customized to client technical specification sheets during the physical counter-sampling stage.
          </p>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 pt-2 text-xs font-mono text-[#737373] border-t border-[#E8DED0]/70">
            <span>✓ Physical Counter-Sampling Sign-Off</span>
            <span>✓ Provisional Order Tiers: 10,000 / 20,000 / 50,000</span>
            <span>✓ Direct Factory Tooling from CAD Tech-Packs</span>
          </div>
        </div>
      </div>
    </div>
  );
}
