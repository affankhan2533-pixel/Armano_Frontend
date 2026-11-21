import Link from 'next/link';
import { categories } from '@/data/categories';
import { ArrowRight } from 'lucide-react';

/**
 * Desktop Category MegaMenu Dropdown Flyout
 */
export function MegaMenu({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div
      onMouseLeave={onClose}
      className="absolute top-full left-0 w-full bg-white/98 backdrop-blur-md border-b border-[#E8DED0] shadow-xl py-8 z-40 text-[#242424] transition-all duration-300 ease-[var(--ease-luxury)]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between pb-4 border-b border-[#E8DED0] mb-6">
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-[#C5A059]">B2B Manufacturing Divisions</span>
            <h3 className="text-xl font-serif text-[#10352C] mt-1 font-normal">Direct Factory Production Lines</h3>
          </div>
          <Link
            href="/products"
            onClick={onClose}
            className="text-xs tracking-wider uppercase text-[#10352C] hover:text-[#C5A059] flex items-center gap-1.5 transition-colors font-medium"
          >
            <span>View All SKUs (AR-001 – AR-013)</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {categories.map((cat) => (
            <Link
              key={cat.id}
              href={`/${cat.slug}`}
              onClick={onClose}
              className="group p-5 rounded-sm bg-[#F7F4EF] hover:bg-white border border-[#E8DED0] hover:border-[#10352C]/30 hover:shadow-md transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <span className="text-[10px] font-mono uppercase text-[#C5A059] tracking-wider block mb-1">
                  {cat.skus.length > 0 ? `${cat.skus.length} Verified SKUs` : 'Bespoke OEM Service'}
                </span>
                <h4 className="text-base font-serif text-[#10352C] group-hover:text-[#164E3D] transition-colors mb-2 font-medium">
                  {cat.title}
                </h4>
                <p className="text-xs text-[#737373] leading-relaxed line-clamp-2">
                  {cat.description}
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-[#E8DED0] flex items-center justify-between text-xs text-[#10352C]">
                <span className="font-sans font-medium">Explore Division</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform text-[#C5A059]" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
