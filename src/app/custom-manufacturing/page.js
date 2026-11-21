import Image from 'next/image';
import Link from 'next/link';
import { getAdditionalSamples } from '@/lib/data';
import { ArrowRight, Phone, ShieldCheck, Wrench, Compass, CheckCircle2 } from 'lucide-react';

export const metadata = {
  title: 'Custom OEM/ODM Bag Manufacturing',
  description: 'Bespoke contract manufacturing from client technical packages, material swatches, or CAD specifications fabricated at our Mumbai workshop facility.',
  alternates: {
    canonical: '/custom-manufacturing',
  },
};

export default function CustomManufacturingPage() {
  const allSamples = getAdditionalSamples();
  const toolingSamples = allSamples.filter((s) => s.id === 'sample-brush-belt' || s.id === 'sample-clear-window' || s.id === 'sample-channel-puffer');

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
              Custom OEM/ODM Manufacturing Division
            </li>
          </ol>
        </nav>

        {/* Editorial Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-8 border-b border-[#E8DED0]">
          <div className="max-w-3xl space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/80 border border-[#E8DED0] text-[#10352C] text-xs font-mono tracking-wider uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C5A059]" />
              <span>Bespoke Manufacturing • Client Technical Packs</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-[#10352C] font-normal tracking-tight">
              Custom OEM/ODM Manufacturing Division
            </h1>

            <p className="text-sm sm:text-base text-[#4A4D53] font-light leading-relaxed max-w-2xl">
              Bespoke manufacturing from client technical packs, physical counter-samples, or CAD specifications fabricated at our Mumbai workshop facility.
            </p>
          </div>

          <div className="flex items-center gap-4 text-xs font-mono text-[#737373]">
            <span className="px-3 py-1.5 rounded-sm bg-white border border-[#E8DED0] text-[#10352C] font-medium">
              Bespoke Contract Service
            </span>
          </div>
        </div>

        {/* Unnumbered Prototypes Grid */}
        <div className="space-y-4">
          <div className="flex items-center justify-between border-b border-[#E8DED0] pb-2">
            <div>
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#C5A059] block">
                Source Document Visual Plates (Pages 4–7)
              </span>
              <h2 className="text-xl font-serif text-[#10352C]">
                Additional Workshop Samples — Available for OEM Replication
              </h2>
            </div>
            <span className="text-xs font-mono text-[#737373]">
              Unnumbered Prototypes
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {toolingSamples.map((sample) => (
              <div
                key={sample.id}
                className="bg-white rounded-sm border border-[#E8DED0] overflow-hidden shadow-2xs flex flex-col justify-between"
              >
                <div className="relative aspect-[4/3] w-full bg-[#F7F4EF]/70 p-6 flex items-center justify-center border-b border-[#E8DED0]">
                  <div className="absolute top-3.5 left-3.5 z-10">
                    <span className="text-[10px] font-mono uppercase tracking-widest px-2.5 py-1 rounded-full bg-white/95 text-[#10352C] border border-[#E8DED0] font-semibold">
                      Workshop Sample
                    </span>
                  </div>
                  <div className="relative w-full h-full">
                    <Image
                      src={sample.image}
                      alt={sample.workingName}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-contain p-2"
                    />
                  </div>
                </div>

                <div className="p-5 space-y-3 flex-1 flex flex-col justify-between">
                  <div className="space-y-1.5">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-[#737373] block">
                      {sample.sourcePage}
                    </span>
                    <h3 className="text-lg font-serif text-[#10352C] leading-snug">
                      {sample.workingName}
                    </h3>
                    <p className="text-xs text-[#5A5D64] leading-relaxed line-clamp-2">
                      {sample.visualObservation}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-[#E8DED0]/70 flex items-center justify-between">
                    <span className="text-[10px] font-mono text-[#737373]">
                      Bespoke Tooling
                    </span>
                    <Link
                      href={`/contact?sample=${sample.id}#rfq`}
                      className="text-xs font-mono uppercase tracking-wider text-[#C5A059] hover:text-[#10352C] transition-colors"
                    >
                      Inquire Sample &rarr;
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 4-Step Engineering Workflow */}
        <div className="p-8 rounded-sm bg-white border border-[#E8DED0] shadow-2xs space-y-6">
          <div className="space-y-1">
            <span className="text-[10px] font-mono uppercase tracking-widest text-[#C5A059] block">
              Direct Mumbai Facility Setup
            </span>
            <h3 className="text-2xl font-serif text-[#10352C]">
              4-Step OEM/ODM Tooling & Sampling Process
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-xs">
            <div className="p-4 rounded-xs bg-[#F7F4EF] border border-[#E8DED0] space-y-2">
              <span className="w-6 h-6 rounded-full bg-[#10352C] text-[#F7F4EF] font-mono flex items-center justify-center font-bold text-xs">
                1
              </span>
              <h4 className="font-serif font-bold text-sm text-[#10352C]">Tech-Pack Ingestion</h4>
              <p className="text-[#5A5D64] leading-relaxed">
                Review of client line drawings, dimensional requirements (L × W × H), pocket placements, and material specifications.
              </p>
            </div>

            <div className="p-4 rounded-xs bg-[#F7F4EF] border border-[#E8DED0] space-y-2">
              <span className="w-6 h-6 rounded-full bg-[#10352C] text-[#F7F4EF] font-mono flex items-center justify-center font-bold text-xs">
                2
              </span>
              <h4 className="font-serif font-bold text-sm text-[#10352C]">Sample Preparation</h4>
              <p className="text-[#5A5D64] leading-relaxed">
                Cutting templates, debossing plates, and hardware selections prepared to client technical requirements.
              </p>
            </div>

            <div className="p-4 rounded-xs bg-[#F7F4EF] border border-[#E8DED0] space-y-2">
              <span className="w-6 h-6 rounded-full bg-[#10352C] text-[#F7F4EF] font-mono flex items-center justify-center font-bold text-xs">
                3
              </span>
              <h4 className="font-serif font-bold text-sm text-[#10352C]">Counter-Sampling</h4>
              <p className="text-[#5A5D64] leading-relaxed">
                Assembly of physical master samples at our Sion-Dharavi facility for client tactile sign-off prior to volume cutting.
              </p>
            </div>

            <div className="p-4 rounded-xs bg-[#F7F4EF] border border-[#E8DED0] space-y-2">
              <span className="w-6 h-6 rounded-full bg-[#10352C] text-[#F7F4EF] font-mono flex items-center justify-center font-bold text-xs">
                4
              </span>
              <h4 className="font-serif font-bold text-sm text-[#10352C]">Volume Production</h4>
              <p className="text-[#5A5D64] leading-relaxed">
                Stitching lines, inline QC inspection, polybagged packaging, and logistics dispatch for 10k/20k/50k unit programmes.
              </p>
            </div>
          </div>

          <div className="pt-4 border-t border-[#E8DED0] flex flex-wrap items-center justify-between gap-4">
            <span className="text-xs text-[#737373]">
              Provisional volume tiers: 10,000 / 20,000 / 50,000 units (based on buyer discussions).
            </span>
            <Link
              href="/contact?service=custom-manufacturing#rfq"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xs bg-[#10352C] text-[#F7F4EF] hover:bg-[#164E3D] transition-colors text-xs font-mono uppercase tracking-wider"
            >
              <span>Submit Tech-Pack for RFQ</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#C5A059]" />
            </Link>
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
              Prefer ready-to-produce factory silhouettes? Explore our verified master cosmetic and skincare pouch catalogue.
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
