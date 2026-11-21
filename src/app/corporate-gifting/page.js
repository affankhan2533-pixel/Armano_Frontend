import Image from 'next/image';
import Link from 'next/link';
import { getAdditionalSamples } from '@/lib/data';
import { ArrowRight, Phone, ShieldCheck, Sparkles, Gift, Award } from 'lucide-react';

export const metadata = {
  title: 'Corporate Gifting & Evening Packaging (Bespoke Division)',
  description: 'Custom contract manufacturing of velvet evening clutches, metallic gala pouches, and debossed presentation packaging engineered directly from brand tech-packs in Mumbai.',
  alternates: {
    canonical: '/corporate-gifting',
  },
};

export default function CorporateGiftingPage() {
  const allSamples = getAdditionalSamples();
  const velvetSample = allSamples.find((s) => s.id === 'sample-velvet-clutch');

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
                Catalogue
              </Link>
            </li>
            <li>/</li>
            <li className="text-[#10352C] font-semibold" aria-current="page">
              Corporate Gifting Division
            </li>
          </ol>
        </nav>

        {/* Editorial Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-8 border-b border-[#E8DED0]">
          <div className="max-w-3xl space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/80 border border-[#E8DED0] text-[#10352C] text-xs font-mono tracking-wider uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C5A059]" />
              <span>Bespoke Manufacturing Service • Executive Gifting</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-[#10352C] font-normal tracking-tight">
              Luxury Gifting & Evening Packaging
            </h1>

            <p className="text-sm sm:text-base text-[#4A4D53] font-light leading-relaxed max-w-2xl">
              Contract manufacturing division for executive presentation packaging, quilted velvet evening clutches, metallic gala pouches, and festive brand drops engineered from custom brand briefs.
            </p>
          </div>

          <div className="flex items-center gap-4 text-xs font-mono text-[#737373]">
            <span className="px-3 py-1.5 rounded-sm bg-white border border-[#E8DED0] text-[#10352C] font-medium">
              Bespoke Contract Division
            </span>
          </div>
        </div>

        {/* Workshop Prototype Showcase Card */}
        {velvetSample && (
          <div className="bg-white rounded-sm border border-[#E8DED0] overflow-hidden shadow-2xs grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-5 relative aspect-[4/3] w-full bg-[#F7F4EF]/70 p-6 flex items-center justify-center border-b lg:border-b-0 lg:border-r border-[#E8DED0]">
              <div className="absolute top-3.5 left-3.5 z-10">
                <span className="text-[10px] font-mono uppercase tracking-widest px-2.5 py-1 rounded-full bg-white/95 text-[#10352C] border border-[#E8DED0] font-semibold">
                  Workshop Prototype
                </span>
              </div>
              <div className="relative w-full h-full">
                <Image
                  src={velvetSample.image}
                  alt={velvetSample.workingName}
                  fill
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-contain p-4"
                />
              </div>
            </div>

            <div className="lg:col-span-7 p-6 sm:p-10 space-y-5">
              <div className="space-y-1">
                <span className="text-[10px] font-mono uppercase tracking-wider text-[#C5A059] block">
                  {velvetSample.sourceDocument} • {velvetSample.sourcePage}
                </span>
                <h2 className="text-2xl sm:text-3xl font-serif text-[#10352C]">
                  {velvetSample.workingName}
                </h2>
                <p className="text-xs text-[#5A5D64] leading-relaxed pt-1">
                  {velvetSample.visualObservation}
                </p>
              </div>

              {/* Observed Attributes */}
              <div className="p-4 rounded-xs bg-[#F7F4EF] border border-[#E8DED0] space-y-2 text-xs">
                <span className="font-mono uppercase text-[#737373] text-[10px] tracking-wider block font-semibold">
                  Observed Physical Prototype Details
                </span>
                <div className="flex flex-wrap gap-2">
                  {velvetSample.observedAppearance.map((item, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 rounded-xs bg-white border border-[#E8DED0] text-[#242424] font-medium"
                    >
                      {item}
                    </span>
                  ))}
                </div>
                <p className="text-[11px] text-[#737373] pt-1">
                  {velvetSample.missingSpecs}
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3 pt-2">
                <Link
                  href="/contact?service=corporate-gifting#rfq"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xs bg-[#10352C] text-[#F7F4EF] hover:bg-[#164E3D] transition-colors text-xs font-mono uppercase tracking-wider"
                >
                  <span>Request Gifting Quotation</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#C5A059]" />
                </Link>

                <a
                  href="tel:+918591897469"
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-xs bg-white text-[#10352C] border border-[#E8DED0] hover:border-[#10352C] transition-colors text-xs font-mono uppercase tracking-wider"
                >
                  <Phone className="w-3.5 h-3.5 text-[#C5A059]" />
                  <span>Call Workshop Desk</span>
                </a>
              </div>
            </div>
          </div>
        )}

        {/* Manufacturing Capabilities Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 bg-white rounded-sm border border-[#E8DED0] space-y-3 shadow-2xs">
            <Gift className="w-5 h-5 text-[#C5A059]" />
            <h3 className="text-base font-serif text-[#10352C]">Evening Textiles</h3>
            <p className="text-xs text-[#5A5D64] leading-relaxed">
              High-pile velvet, plush velour, metallic glitter jacquards, and smooth satin crafted into clutches, vanity rolls, and festive gift boxes.
            </p>
          </div>

          <div className="p-6 bg-white rounded-sm border border-[#E8DED0] space-y-3 shadow-2xs">
            <Sparkles className="w-5 h-5 text-[#C5A059]" />
            <h3 className="text-base font-serif text-[#10352C]">Prestige Hardware</h3>
            <p className="text-xs text-[#5A5D64] leading-relaxed">
              Mirror gold electroplated pullers, custom cast logo plates, hanging tassel charms, and metal zipper teeth tailored to luxury aesthetics.
            </p>
          </div>

          <div className="p-6 bg-white rounded-sm border border-[#E8DED0] space-y-3 shadow-2xs">
            <Award className="w-5 h-5 text-[#C5A059]" />
            <h3 className="text-base font-serif text-[#10352C]">Individual Packaging</h3>
            <p className="text-xs text-[#5A5D64] leading-relaxed">
              Dust bag packaging, branded tissue wrapping, and rigid presentation box integration for executive gifting and retail PR influencer kits.
            </p>
          </div>
        </div>

        {/* Cross-Link to Verified Pouch Catalogue */}
        <div className="p-6 sm:p-8 rounded-sm bg-[#10352C] text-[#F7F4EF] flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-1 max-w-2xl">
            <span className="text-[10px] font-mono uppercase tracking-widest text-[#C5A059] block">
              Verified Source Catalogue
            </span>
            <h3 className="text-xl font-serif text-white">
              Explore Our 13 Verified Production Pouches (AR-001 – AR-013)
            </h3>
            <p className="text-xs text-[#E8DED0] leading-relaxed">
              Need immediate catalogue silhouettes with documented prototypes? Explore our verified master cosmetic and skincare pouch collection.
            </p>
          </div>
          <Link
            href="/products"
            className="px-6 py-3 rounded-xs bg-[#C5A059] text-[#10352C] hover:bg-white transition-colors text-xs font-mono uppercase tracking-wider font-semibold shrink-0"
          >
            View Master Catalogue &rarr;
          </Link>
        </div>
      </div>
    </div>
  );
}
