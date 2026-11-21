'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu, ChevronDown, Phone } from 'lucide-react';
import { StickyNav } from '@/components/navigation/StickyNav';
import { MegaMenu } from '@/components/navigation/MegaMenu';
import { MobileDrawer } from '@/components/navigation/MobileDrawer';
import { Button } from '@/components/ui/Button';

/**
 * Site-Wide Minimal Premium Header Shell
 */
export function Header() {
  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);
  const [isMobileDrawerOpen, setIsMobileDrawerOpen] = useState(false);

  return (
    <>
      <StickyNav>
        <header className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between">
          {/* Brand Wordmark */}
          <Link href="/" className="group flex flex-col focus-visible:ring-2 focus-visible:ring-[#C5A059] rounded-sm py-1">
            <span className="text-2xl font-serif tracking-[0.2em] text-[#10352C] group-hover:text-[#164E3D] transition-colors font-normal">
              ARMANO
            </span>
            <span className="text-[9px] tracking-[0.25em] uppercase text-[#C5A059] font-sans -mt-0.5 font-medium">
              Direct B2B Manufacturer
            </span>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-8" aria-label="Primary Navigation">
            <button
              type="button"
              onMouseEnter={() => setIsMegaMenuOpen(true)}
              onClick={() => setIsMegaMenuOpen(!isMegaMenuOpen)}
              className="text-xs tracking-wider uppercase text-[#242424] hover:text-[#10352C] flex items-center gap-1.5 transition-colors font-medium py-2 focus-visible:ring-2 focus-visible:ring-[#C5A059] rounded-sm"
              aria-expanded={isMegaMenuOpen}
            >
              <span>Manufacturing Divisions</span>
              <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${isMegaMenuOpen ? 'rotate-180 text-[#C5A059]' : 'text-[#737373]'}`} />
            </button>

            <Link
              href="/products"
              className="text-xs tracking-wider uppercase text-[#242424] hover:text-[#10352C] transition-colors font-medium py-2 focus-visible:ring-2 focus-visible:ring-[#C5A059] rounded-sm"
            >
              Catalogue
            </Link>

            <Link
              href="/about"
              className="text-xs tracking-wider uppercase text-[#242424] hover:text-[#10352C] transition-colors font-medium py-2 focus-visible:ring-2 focus-visible:ring-[#C5A059] rounded-sm"
            >
              About
            </Link>

            <Link
              href="/contact"
              className="text-xs tracking-wider uppercase text-[#242424] hover:text-[#10352C] transition-colors font-medium py-2 focus-visible:ring-2 focus-visible:ring-[#C5A059] rounded-sm"
            >
              Contact
            </Link>
          </nav>

          {/* Right Header Actions */}
          <div className="hidden lg:flex items-center space-x-6">
            <a
              href="tel:+918591897469"
              className="flex items-center gap-2 text-xs text-[#4A4D53] hover:text-[#10352C] transition-colors focus-visible:ring-2 focus-visible:ring-[#C5A059] rounded-sm p-1"
              title="Factory Direct Call"
            >
              <Phone className="w-3.5 h-3.5 text-[#C5A059]" />
              <span className="font-mono">+91 8591897469</span>
            </a>

            <Button href="/contact" variant="primary" size="sm">
              Request a Quote
            </Button>
          </div>

          {/* Mobile Menu Toggle Button */}
          <button
            type="button"
            onClick={() => setIsMobileDrawerOpen(true)}
            aria-label="Open Navigation Menu"
            className="lg:hidden p-2 text-[#10352C] hover:text-[#164E3D] rounded-sm hover:bg-[#E8DED0]/50 focus-visible:ring-2 focus-visible:ring-[#C5A059] transition-colors"
          >
            <Menu className="w-6 h-6" />
          </button>
        </header>

        {/* Desktop Mega Menu Dropdown */}
        <MegaMenu isOpen={isMegaMenuOpen} onClose={() => setIsMegaMenuOpen(false)} />
      </StickyNav>

      {/* Accessible Mobile Drawer */}
      <MobileDrawer isOpen={isMobileDrawerOpen} onClose={() => setIsMobileDrawerOpen(false)} />
    </>
  );
}
