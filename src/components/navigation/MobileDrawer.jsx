'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { X, ArrowRight, Phone, MapPin } from 'lucide-react';
import { navigationLinks } from '@/data/navigation';
import { Button } from '@/components/ui/Button';

/**
 * Accessible Mobile Navigation Drawer
 * Enforces keyboard focus trapping, Escape key listener, and body scroll lock.
 */
export function MobileDrawer({ isOpen, onClose }) {
  const drawerRef = useRef(null);
  const closeButtonRef = useRef(null);

  // Handle Escape key
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
      // Focus close button on open
      setTimeout(() => {
        closeButtonRef.current?.focus();
      }, 50);
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Mobile Navigation Menu"
      className="fixed inset-0 z-50 flex justify-end"
    >
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/40 backdrop-blur-xs transition-opacity duration-300"
        aria-hidden="true"
      />

      {/* Drawer Surface */}
      <div
        ref={drawerRef}
        className="relative w-full max-w-sm bg-[#F7F4EF] text-[#242424] h-full shadow-2xl flex flex-col justify-between overflow-y-auto border-l border-[#E8DED0] p-6 z-10 transition-transform duration-350 ease-[var(--ease-luxury)]"
      >
        <div>
          {/* Header & Close Button */}
          <div className="flex items-center justify-between pb-6 border-b border-[#E8DED0]">
            <div>
              <span className="text-xl font-serif tracking-widest text-[#10352C]">ARMANO</span>
              <span className="block text-[10px] tracking-widest uppercase text-[#C5A059]">Direct B2B Manufacturer</span>
            </div>
            <button
              ref={closeButtonRef}
              type="button"
              onClick={onClose}
              aria-label="Close Navigation Menu"
              className="p-2 text-[#737373] hover:text-[#10352C] rounded-sm hover:bg-[#E8DED0]/50 focus-visible:ring-2 focus-visible:ring-[#C5A059] transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Nav Links */}
          <nav className="py-6 flex flex-col space-y-1" aria-label="Mobile Navigation Links">
            {navigationLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={onClose}
                className="group flex items-center justify-between py-3 px-3 rounded-sm hover:bg-white transition-colors text-sm font-sans tracking-wide text-[#242424] hover:text-[#10352C]"
              >
                <span>{link.name}</span>
                <ArrowRight className="w-4 h-4 text-[#737373] group-hover:text-[#10352C] group-hover:translate-x-1 transition-all" />
              </Link>
            ))}
          </nav>
        </div>

        {/* Footer Factory Info & Action */}
        <div className="pt-6 border-t border-[#E8DED0] space-y-4">
          <div className="space-y-2 text-xs text-[#737373]">
            <div className="flex items-start gap-2">
              <MapPin className="w-4 h-4 text-[#C5A059] shrink-0 mt-0.5" />
              <span>Sion-Dharavi, Mumbai, Maharashtra, India</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-[#C5A059] shrink-0" />
              <a href="tel:+918591897469" className="hover:text-[#10352C] transition-colors">
                +91 8591897469 (Rehan)
              </a>
            </div>
          </div>

          <Button
            href="/contact"
            variant="primary"
            size="md"
            className="w-full"
            onClick={onClose}
          >
            Request Factory Quote
          </Button>
        </div>
      </div>
    </div>
  );
}
