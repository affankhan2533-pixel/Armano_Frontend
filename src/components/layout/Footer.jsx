import Link from 'next/link';
import { Phone, MapPin, Mail, ShieldCheck } from 'lucide-react';

/**
 * ARMANO V7.1 — Minimal Luxury B2B Footer
 */
export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#0A261D] text-[#F7F4EF] border-t border-[#C5A059]/30 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-white/10">
          {/* Column 1: Brand Profile (4 Cols) */}
          <div className="lg:col-span-4 space-y-4">
            <Link href="/" className="inline-block">
              <span className="text-2xl font-serif tracking-[0.2em] text-[#F7F4EF] block">
                ARMANO
              </span>
              <span className="text-[9.5px] tracking-[0.25em] uppercase text-[#C5A059] block font-sans">
                Direct B2B Manufacturer
              </span>
            </Link>
            <p className="text-xs sm:text-sm text-[#94969C] leading-relaxed max-w-sm font-light">
              Direct B2B manufacturer of custom cosmetic pouches, structured carry-alls, and bespoke gifting packaging programmes. Engineered in Mumbai for global beauty brands.
            </p>
            <div className="pt-1 text-xs text-[#E8D5B5] flex items-center gap-2 font-mono">
              <ShieldCheck className="w-4 h-4 text-[#C5A059] shrink-0" />
              <span>Direct Factory Facility • Sion-Dharavi</span>
            </div>
          </div>

          {/* Column 2: Manufacturing Divisions (3 Cols) */}
          <div className="lg:col-span-3">
            <h4 className="text-xs font-mono uppercase tracking-widest text-[#C5A059] mb-4">
              Manufacturing Divisions
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              <li>
                <Link href="/cosmetic-pouches" className="text-[#94969C] hover:text-[#C5A059] transition-colors">
                  Cosmetic &amp; Skincare Pouches
                </Link>
              </li>
              <li>
                <Link href="/tote-bags" className="text-[#94969C] hover:text-[#C5A059] transition-colors">
                  Tote Bags &amp; Carry-Alls
                </Link>
              </li>
              <li>
                <Link href="/corporate-gifting" className="text-[#94969C] hover:text-[#C5A059] transition-colors">
                  Corporate &amp; Luxury Gifting
                </Link>
              </li>
              <li>
                <Link href="/custom-manufacturing" className="text-[#94969C] hover:text-[#C5A059] transition-colors">
                  Custom OEM / ODM Manufacturing
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Quick Navigation (2 Cols) */}
          <div className="lg:col-span-2">
            <h4 className="text-xs font-mono uppercase tracking-widest text-[#C5A059] mb-4">
              Explore
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              <li>
                <Link href="/products" className="text-[#94969C] hover:text-[#C5A059] transition-colors">
                  Master Catalogue
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-[#94969C] hover:text-[#C5A059] transition-colors">
                  About Atelier
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-[#94969C] hover:text-[#C5A059] transition-colors">
                  Contact Desk
                </Link>
              </li>
              <li>
                <Link href="/contact#rfq" className="text-[#94969C] hover:text-[#C5A059] transition-colors">
                  Request a Quote
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Factory Desk Details (3 Cols) */}
          <div className="lg:col-span-3">
            <h4 className="text-xs font-mono uppercase tracking-widest text-[#C5A059] mb-4">
              Factory Desk
            </h4>
            <ul className="space-y-3 text-xs text-[#94969C]">
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#C5A059] shrink-0 mt-0.5" />
                <span>Sion-Dharavi Industrial Facility, Mumbai, Maharashtra, India</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#C5A059] shrink-0" />
                <a href="tel:+918591897469" className="hover:text-white transition-colors font-mono">
                  +91 8591897469
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#C5A059] shrink-0" />
                <a href="mailto:armanoindustries@gmail.com" className="hover:text-white transition-colors font-mono">
                  armanoindustries@gmail.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Statutory Compliance */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-[#94969C] gap-4">
          <p>© {currentYear} ARMANO. All rights reserved. Direct B2B Manufacturer, Mumbai.</p>

          <div className="flex flex-wrap items-center gap-5 text-xs">
            <Link href="/privacy-policy" className="hover:text-[#C5A059] transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms-and-conditions" className="hover:text-[#C5A059] transition-colors">
              Terms &amp; Conditions
            </Link>
            <Link href="/cookie-policy" className="hover:text-[#C5A059] transition-colors">
              Cookie Policy
            </Link>
            <Link href="/returns-and-refunds" className="hover:text-[#C5A059] transition-colors">
              Returns Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
