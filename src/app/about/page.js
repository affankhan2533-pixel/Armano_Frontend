import Link from 'next/link';
import { Container } from '@/components/ui/Container';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { MapPin, Phone, ShieldCheck, Factory, Scissors, Award, Users } from 'lucide-react';

export const metadata = {
  title: 'About Our Factory & Heritage',
  description: 'Generational craftsmanship meets modern industrial assembly. Discover ARMANO’s direct B2B manufacturing facility in Sion-Dharavi, Mumbai, India.',
};

export default function AboutPage() {
  return (
    <div className="py-12 sm:py-20 bg-[#FBF9F5] text-[#121316]">
      <Container>
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="mb-8">
          <ol className="flex items-center space-x-2 text-xs font-mono text-[#5A5D64]">
            <li><Link href="/" className="hover:text-[#0A261D]">Home</Link></li>
            <li>/</li>
            <li className="text-[#C5A059] font-medium">About Our Factory</li>
          </ol>
        </nav>

        {/* Hero Narrative */}
        <div className="max-w-3xl mb-16 space-y-4">
          <Badge variant="primary">Industrial Heritage</Badge>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-[#0A261D] tracking-tight">
            Direct B2B Manufacturing Rooted in Mumbai’s Industrial Fabric
          </h1>
          <p className="text-base sm:text-lg text-[#5A5D64] leading-relaxed">
            ARMANO operates as a B2B contract manufacturer based in Mumbai, Maharashtra. We produce cosmetic packaging collections, pouches, and custom bags for brand procurement programmes with direct factory communication.
          </p>
        </div>

        {/* Factory Facility Profile Card */}
        <div className="p-8 sm:p-10 bg-[#0A261D] text-[#FBF9F5] rounded-sm border border-[#C5A059]/40 mb-16 shadow-xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="space-y-4">
              <span className="text-xs font-mono uppercase tracking-widest text-[#C5A059]">Verified Facility Profile</span>
              <h2 className="text-2xl sm:text-3xl font-serif text-[#FBF9F5]">
                Sion-Dharavi Manufacturing Floor
              </h2>
              <p className="text-xs sm:text-sm text-[#94969C] leading-relaxed">
                Operating from Mumbai’s recognized manufacturing corridor in Sion-Dharavi, our facility manages material cutting, stitch assembly, and pre-dispatch inspection for commercial B2B orders.
              </p>
              <div className="space-y-2 text-xs text-[#E8D5B5] pt-2">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-[#C5A059] shrink-0" />
                  <span>Sion-Dharavi Industrial Facility, Mumbai, Maharashtra, India</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-[#C5A059] shrink-0" />
                  <span>Factory Contact: +91 8591897469 (Rehan)</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-white/5 rounded-sm border border-white/10 text-center">
                <span className="text-2xl font-mono font-bold text-[#C5A059] block">13</span>
                <span className="text-[11px] text-[#94969C] uppercase tracking-wider">Catalog SKUs</span>
              </div>
              <div className="p-4 bg-white/5 rounded-sm border border-white/10 text-center">
                <span className="text-2xl font-mono font-bold text-[#C5A059] block">4</span>
                <span className="text-[11px] text-[#94969C] uppercase tracking-wider">Core Divisions</span>
              </div>
              <div className="p-4 bg-white/5 rounded-sm border border-white/10 text-center">
                <span className="text-2xl font-mono font-bold text-[#C5A059] block">10k+</span>
                <span className="text-[11px] text-[#94969C] uppercase tracking-wider">Provisional Tiers</span>
              </div>
              <div className="p-4 bg-white/5 rounded-sm border border-white/10 text-center">
                <span className="text-2xl font-mono font-bold text-[#C5A059] block">100%</span>
                <span className="text-[11px] text-[#94969C] uppercase tracking-wider">Factory Direct</span>
              </div>
            </div>
          </div>
        </div>

        {/* Operational Values */}
        <div className="space-y-8 mb-16">
          <h2 className="text-2xl sm:text-3xl font-serif text-[#0A261D]">Manufacturing Integrity & Standards</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="p-6 bg-white rounded-sm border border-[#E8D5B5] space-y-3">
              <Scissors className="w-6 h-6 text-[#C5A059]" />
              <h3 className="text-lg font-serif text-[#0A261D]">Craftsmanship Standards</h3>
              <p className="text-xs text-[#5A5D64] leading-relaxed">
                Workshop artisans assemble cut panels, apply zipper closures, and construct silhouettes aligned with client technical packages.
              </p>
            </div>
            <div className="p-6 bg-white rounded-sm border border-[#E8D5B5] space-y-3">
              <ShieldCheck className="w-6 h-6 text-[#C5A059]" />
              <h3 className="text-lg font-serif text-[#0A261D]">Pre-Production Counter-Sampling</h3>
              <p className="text-xs text-[#5A5D64] leading-relaxed">
                We produce an authoritative physical counter-sample for client dimensional inspection and material sign-off before cutting bulk rolls.
              </p>
            </div>
            <div className="p-6 bg-white rounded-sm border border-[#E8D5B5] space-y-3">
              <Factory className="w-6 h-6 text-[#C5A059]" />
              <h3 className="text-lg font-serif text-[#0A261D]">Transparent Assembly</h3>
              <p className="text-xs text-[#5A5D64] leading-relaxed">
                Direct access to the manufacturing floor. Inquire directly with our operations team regarding lead times, tooling dies, and shipment timelines.
              </p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center pt-8 border-t border-[#E8D5B5]/60">
          <Button href="/contact" variant="primary" size="lg">
            Schedule Factory Consultation
          </Button>
        </div>
      </Container>
    </div>
  );
}
