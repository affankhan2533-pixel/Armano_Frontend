import { getApprovedBrands } from '@/data/brandRegistry';
import { Sparkles, Layers, Box, CheckCircle2, Shield } from 'lucide-react';
import { EditorialReveal } from '@/components/motion/EditorialReveal';

/**
 * Brand Capability & Standards Strip (V6 Redesign)
 * High-luxury B2B verification strip:
 * - Tech-Pack Alignment
 * - Curated Material Sourcing
 * - Provisional Order Tiers (10k / 20k / 50k)
 * - Physical Counter-Sample Protocol
 */
export function BrandCapabilityBanner() {
  const approvedBrands = getApprovedBrands();

  const capabilities = [
    {
      num: '01',
      title: 'Tech-Pack Alignment',
      desc: 'Custom dimensions, seam placements, and panel proportions developed to client tech-pack specifications.',
      icon: Box,
    },
    {
      num: '02',
      title: 'Curated Material Sourcing',
      desc: 'Commercial coated fabrics, durable woven textiles, and metal hardware configurations selected to client order requirements.',
      icon: Layers,
    },
    {
      num: '03',
      title: 'Provisional Order Tiers',
      desc: 'Structured RFQ scoping tiers for 10,000, 20,000, and 50,000 unit programmes.',
      icon: Sparkles,
    },
    {
      num: '04',
      title: 'Counter-Sample Protocol',
      desc: 'Buyer physical sample inspection and sign-off prior to scheduled volume manufacturing.',
      icon: CheckCircle2,
    },
  ];

  return (
    <section className="py-16 lg:py-20 bg-[#FFFFFF] text-[#242424] border-b border-[#E8DED0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <EditorialReveal variant="fade-up" duration={650}>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div className="max-w-2xl space-y-2">
              <span className="text-xs font-mono uppercase tracking-widest text-[#C5A059] block">
                Manufacturing Standards // Sion-Dharavi Desk
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif text-[#10352C] font-normal tracking-tight">
                Contract Packaging Standards for Beauty &amp; Lifestyle Brands
              </h2>
            </div>
            <div className="flex items-center gap-2 text-xs font-mono text-[#737373]">
              <Shield className="w-4 h-4 text-[#C5A059]" />
              <span>Direct Factory Manufacturing</span>
            </div>
          </div>
        </EditorialReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {capabilities.map((cap) => {
            const Icon = cap.icon;
            return (
              <div
                key={cap.num}
                className="p-6 rounded-sm bg-[#F7F4EF] border border-[#E8DED0] hover:border-[#10352C]/40 luxury-card-hover space-y-3 h-full transition-all duration-300 shadow-2xs flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-semibold text-[#C5A059]">
                      STANDARD // {cap.num}
                    </span>
                    <div className="w-7 h-7 rounded-xs bg-white text-[#10352C] border border-[#E8DED0] flex items-center justify-center shrink-0">
                      <Icon className="w-3.5 h-3.5 text-[#C5A059]" />
                    </div>
                  </div>

                  <h3 className="text-base font-serif font-normal text-[#10352C]">
                    {cap.title}
                  </h3>

                  <p className="text-xs text-[#5A5D64] leading-relaxed font-light">
                    {cap.desc}
                  </p>
                </div>

                <div className="pt-3 border-t border-[#E8DED0]/70 text-[10px] font-mono text-[#737373] flex items-center justify-between">
                  <span>Mumbai Atelier</span>
                  <span className="text-[#10352C] font-medium">Verified Spec</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Brand-Partner Showcase Slot (Hidden until brand permissions are formally documented) */}
        {approvedBrands.length > 0 && (
          <div className="mt-14 pt-10 border-t border-[#E8DED0] text-center">
            <span className="text-xs font-mono uppercase tracking-widest text-[#737373] block mb-6">
              Verified Brand Partnerships
            </span>
            <div className="flex flex-wrap items-center justify-center gap-8 opacity-75">
              {approvedBrands.map((brand) => (
                <span key={brand.id} className="text-sm font-serif tracking-widest uppercase text-[#10352C]">
                  {brand.name}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
