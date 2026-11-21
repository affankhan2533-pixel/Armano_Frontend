'use client';

import { useState, useMemo, useRef, useEffect, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { 
  Search, 
  X, 
  ArrowRight, 
  Sparkles, 
  Grid3X3, 
  LayoutGrid, 
  ChevronDown, 
  ChevronLeft, 
  ChevronRight, 
  RotateCcw,
  SlidersHorizontal
} from 'lucide-react';

const SILHOUETTE_TABS = [
  { id: 'all', label: 'All Verified Pouches', count: 13 },
  { id: 'Boxy & Rectangular', label: 'Boxy & Rectangular', count: 3 },
  { id: 'Contrast Base', label: 'Two-Tone Contrast Base', count: 1 },
  { id: 'Dome & Curved', label: 'Dome & Curved', count: 1 },
  { id: 'Barrel & Cylinder', label: 'Barrel & Cylinder', count: 1 },
  { id: 'Quilted Puffer', label: 'Quilted Puffer', count: 1 },
  { id: 'Multi-Chamber', label: 'Multi-Chamber', count: 1 },
  { id: 'Structured Train Case', label: 'Train Case Box', count: 1 },
  { id: 'Wristlet Clutch', label: 'Wristlet Clutch', count: 1 },
  { id: 'Clear Window', label: 'Clear PVC Window', count: 1 },
  { id: 'Sculptural Novelty', label: 'Novelty & Debossed', count: 1 },
];

export function CatalogueView({ initialProducts = [] }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeSilhouette, setActiveSilhouette] = useState('all');
  const [sortBy, setSortBy] = useState('sku-asc');
  const [gridColumns, setGridColumns] = useState('3'); // '2' or '3'

  // Ref & State for smooth horizontal scroll navigation
  const pillsContainerRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  // Check scroll boundary state
  const checkScroll = useCallback(() => {
    const el = pillsContainerRef.current;
    if (!el) return;
    const { scrollLeft, scrollWidth, clientWidth } = el;
    setCanScrollLeft(scrollLeft > 6);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 6);
  }, []);

  useEffect(() => {
    const el = pillsContainerRef.current;
    if (!el) return;

    checkScroll();
    window.addEventListener('resize', checkScroll);
    el.addEventListener('scroll', checkScroll, { passive: true });

    // Enable horizontal scroll on mouse wheel over pills
    const handleWheel = (e) => {
      if (Math.abs(e.deltaY) > Math.abs(e.deltaX) && el.scrollWidth > el.clientWidth) {
        e.preventDefault();
        el.scrollLeft += e.deltaY;
      }
    };
    el.addEventListener('wheel', handleWheel, { passive: false });

    return () => {
      window.removeEventListener('resize', checkScroll);
      el.removeEventListener('scroll', checkScroll);
      el.removeEventListener('wheel', handleWheel);
    };
  }, [checkScroll]);

  const scrollPills = (direction) => {
    const el = pillsContainerRef.current;
    if (!el) return;
    const scrollAmount = direction === 'left' ? -260 : 260;
    el.scrollBy({ left: scrollAmount, behavior: 'smooth' });
  };

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    return initialProducts
      .filter((item) => {
        // Silhouette family filter
        if (activeSilhouette !== 'all' && item.silhouetteFamily !== activeSilhouette) {
          return false;
        }

        // Search query filter (matches SKU, Title, Silhouette, Finishes, or Branding)
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase().trim();
          const matchesSku = item.sku.toLowerCase().includes(q);
          const matchesTitle = (item.workingName || item.name || item.title).toLowerCase().includes(q);
          const matchesSilhouette = item.silhouetteFamily?.toLowerCase().includes(q) || item.silhouette?.toLowerCase().includes(q);
          const matchesFinishes = (item.observedAppearance || item.observedFinishes || []).some((f) => f.toLowerCase().includes(q));
          const matchesBranding = item.brandingOptions?.some((b) => b.toLowerCase().includes(q));

          return matchesSku || matchesTitle || matchesSilhouette || matchesFinishes || matchesBranding;
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'sku-asc') {
          return a.sku.localeCompare(b.sku);
        }
        if (sortBy === 'sku-desc') {
          return b.sku.localeCompare(a.sku);
        }
        if (sortBy === 'title-asc') {
          const nameA = a.workingName || a.name || a.title;
          const nameB = b.workingName || b.name || b.title;
          return nameA.localeCompare(nameB);
        }
        if (sortBy === 'silhouette') {
          return (a.silhouetteFamily || '').localeCompare(b.silhouetteFamily || '');
        }
        return 0;
      });
  }, [initialProducts, activeSilhouette, searchQuery, sortBy]);

  const resetFilters = () => {
    setSearchQuery('');
    setActiveSilhouette('all');
    setSortBy('sku-asc');
    if (pillsContainerRef.current) {
      pillsContainerRef.current.scrollTo({ left: 0, behavior: 'smooth' });
    }
  };

  const activeTabMeta = SILHOUETTE_TABS.find((t) => t.id === activeSilhouette);

  return (
    <div className="space-y-10">
      {/* Editorial Luxury Filter & Search Suite */}
      <section 
        aria-label="Catalogue controls" 
        className="bg-white/95 backdrop-blur-md rounded-2xl border border-[#E8DED0] shadow-[0_4px_24px_-4px_rgba(16,53,44,0.04)] p-4 sm:p-6 space-y-4 sm:space-y-5 transition-all"
      >
        {/* Row 1: Search Bar + Sort Dropdown + View Toggle */}
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3 sm:gap-4">
          {/* Refined Search Input */}
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#C5A059] pointer-events-none transition-colors" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by SKU (e.g. AR-009), silhouette, or finish..."
              className="w-full h-11 pl-11 pr-24 rounded-full bg-[#FAF8F5] border border-[#E2D7C7] text-sm text-[#10352C] placeholder:text-[#8E8B82] focus:bg-white focus:outline-none focus:border-[#10352C] focus:ring-2 focus:ring-[#10352C]/10 transition-all font-sans"
              aria-label="Search catalogue by SKU or attribute"
            />
            {/* Search metadata badge & clear button */}
            <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1.5">
              {searchQuery ? (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="w-6 h-6 rounded-full bg-[#E8DED0]/60 hover:bg-[#10352C] text-[#5A5D64] hover:text-[#F7F4EF] flex items-center justify-center transition-colors"
                  aria-label="Clear search query"
                  title="Clear search"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              ) : (
                <span className="hidden sm:inline-block text-[10px] font-mono uppercase tracking-widest text-[#A8A49C] px-2 py-0.5 rounded-full bg-white/70 border border-[#E8DED0]/60 pointer-events-none">
                  Live
                </span>
              )}
            </div>
          </div>

          {/* Controls Cluster: Sort + Density Toggle */}
          <div className="flex items-center justify-between lg:justify-end gap-2.5 sm:gap-3 shrink-0">
            {/* Custom Styled Sort Dropdown */}
            <div className="relative flex items-center flex-1 sm:flex-initial">
              <label htmlFor="sort-select" className="text-[11px] font-mono uppercase tracking-wider text-[#737373] hidden sm:inline mr-2 whitespace-nowrap">
                Sort:
              </label>
              <div className="relative w-full sm:w-auto">
                <select
                  id="sort-select"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full sm:w-auto h-11 pl-4 pr-9 rounded-full bg-[#FAF8F5] hover:bg-white border border-[#E2D7C7] hover:border-[#C5A059] text-xs font-mono uppercase tracking-wider text-[#10352C] focus:outline-none focus:border-[#10352C] focus:ring-2 focus:ring-[#10352C]/10 cursor-pointer appearance-none transition-all shadow-2xs"
                  aria-label="Sort products by SKU or name"
                >
                  <option value="sku-asc">SKU (AR-001 – AR-013)</option>
                  <option value="sku-desc">SKU (AR-013 – AR-001)</option>
                  <option value="title-asc">Product Name (A – Z)</option>
                  <option value="silhouette">Silhouette Family</option>
                </select>
                <ChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#C5A059] pointer-events-none" />
              </div>
            </div>

            {/* Grid Density Toggle (2 vs 3 columns) */}
            <div 
              className="inline-flex items-center h-11 p-1 rounded-full bg-[#FAF8F5] border border-[#E2D7C7] shadow-2xs shrink-0"
              role="group"
              aria-label="Grid layout density"
            >
              <button
                type="button"
                onClick={() => setGridColumns('2')}
                className={`h-9 px-3 rounded-full flex items-center gap-1.5 text-xs font-mono transition-all cursor-pointer ${
                  gridColumns === '2' 
                    ? 'bg-[#10352C] text-[#F7F4EF] shadow-xs' 
                    : 'text-[#737373] hover:text-[#10352C]'
                }`}
                title="Spacious 2-column editorial view"
                aria-label="2 Columns View"
                aria-pressed={gridColumns === '2'}
              >
                <LayoutGrid className="w-3.5 h-3.5" />
                <span className="hidden xl:inline text-[11px] uppercase tracking-wider">Editorial</span>
              </button>
              <button
                type="button"
                onClick={() => setGridColumns('3')}
                className={`h-9 px-3 rounded-full flex items-center gap-1.5 text-xs font-mono transition-all cursor-pointer ${
                  gridColumns === '3' 
                    ? 'bg-[#10352C] text-[#F7F4EF] shadow-xs' 
                    : 'text-[#737373] hover:text-[#10352C]'
                }`}
                title="Compact 3-column catalogue view"
                aria-label="3 Columns View"
                aria-pressed={gridColumns === '3'}
              >
                <Grid3X3 className="w-3.5 h-3.5" />
                <span className="hidden xl:inline text-[11px] uppercase tracking-wider">Grid</span>
              </button>
            </div>
          </div>
        </div>

        {/* Row 2: Silhouette Category Carousel with Elegant Scroll Navigation */}
        <div className="relative group/carousel">
          {/* Scroll Left Chevron Button */}
          {canScrollLeft && (
            <button
              type="button"
              onClick={() => scrollPills('left')}
              className="absolute -left-2.5 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-white/95 border border-[#E2D7C7] shadow-md flex items-center justify-center text-[#10352C] hover:bg-[#FAF8F5] hover:border-[#10352C] transition-all"
              aria-label="Scroll categories left"
              title="Previous categories"
            >
              <ChevronLeft className="w-4 h-4 text-[#C5A059]" />
            </button>
          )}

          {/* Silhouette Pills Horizontal Rail (Strictly No Ugly Scrollbar) */}
          <div
            ref={pillsContainerRef}
            className="flex items-center gap-2 overflow-x-auto py-1 no-scrollbar scroll-smooth select-none"
            role="tablist"
            aria-label="Silhouette Filters"
            style={{
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
            }}
          >
            {SILHOUETTE_TABS.map((tab) => {
              const isActive = activeSilhouette === tab.id;
              return (
                <button
                  key={tab.id}
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => {
                    setActiveSilhouette(tab.id);
                  }}
                  className={`h-9 px-4 rounded-full text-xs font-mono uppercase tracking-wider transition-all duration-200 shrink-0 cursor-pointer flex items-center gap-2 ${
                    isActive
                      ? 'bg-[#10352C] text-[#F7F4EF] shadow-xs ring-1 ring-[#10352C]'
                      : 'bg-[#FAF8F5] hover:bg-white text-[#5A5D64] hover:text-[#10352C] border border-[#E2D7C7] hover:border-[#C5A059]/60'
                  }`}
                >
                  <span className="whitespace-nowrap">{tab.label}</span>
                  <span
                    className={`text-[10px] font-semibold px-1.5 py-0.2 rounded-full transition-colors ${
                      isActive
                        ? 'bg-[#C5A059] text-[#0A261D]'
                        : 'bg-white/80 text-[#737373] border border-[#E8DED0]'
                    }`}
                  >
                    {tab.count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Scroll Right Chevron Button */}
          {canScrollRight && (
            <button
              type="button"
              onClick={() => scrollPills('right')}
              className="absolute -right-2.5 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-white/95 border border-[#E2D7C7] shadow-md flex items-center justify-center text-[#10352C] hover:bg-[#FAF8F5] hover:border-[#10352C] transition-all"
              aria-label="Scroll categories right"
              title="Next categories"
            >
              <ChevronRight className="w-4 h-4 text-[#C5A059]" />
            </button>
          )}
        </div>

        {/* Row 3: Active Filter Status Strip & Live Metrics */}
        <div className="pt-3 border-t border-[#E8DED0]/70 flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
          <div className="flex flex-wrap items-center gap-2 text-[#5A5D64]">
            <span className="inline-flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#10352C] animate-pulse" />
              <span>
                Showing <strong className="text-[#10352C] font-semibold">{filteredProducts.length}</strong> of 13 verified silhouettes
              </span>
            </span>

            {/* Active Category Chip */}
            {activeSilhouette !== 'all' && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#10352C]/10 text-[#10352C] border border-[#10352C]/20 text-[11px]">
                <span>Category: {activeTabMeta?.label}</span>
                <button
                  type="button"
                  onClick={() => setActiveSilhouette('all')}
                  className="hover:text-[#C5A059] p-0.5"
                  aria-label="Remove category filter"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}

            {/* Active Search Chip */}
            {searchQuery.trim() && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#C5A059]/15 text-[#8C6F34] border border-[#C5A059]/30 text-[11px]">
                <span>Query: &ldquo;{searchQuery}&rdquo;</span>
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="hover:text-[#10352C] p-0.5"
                  aria-label="Remove search filter"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}
          </div>

          {/* Quick Reset All Action */}
          {(searchQuery || activeSilhouette !== 'all' || sortBy !== 'sku-asc') && (
            <button
              type="button"
              onClick={resetFilters}
              className="inline-flex items-center gap-1 text-[#C5A059] hover:text-[#8C6F34] transition-colors cursor-pointer text-xs font-medium uppercase tracking-wider"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset All Filters</span>
            </button>
          )}
        </div>
      </section>

      {/* Product Grid or Empty State */}
      {filteredProducts.length > 0 ? (
        <div
          className={`grid gap-6 sm:gap-8 ${
            gridColumns === '2'
              ? 'grid-cols-1 md:grid-cols-2'
              : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
          }`}
        >
          {filteredProducts.map((item) => {
            const displayName = item.workingName || item.name || item.title;
            const appearanceList = item.observedAppearance || item.observedFinishes || [];

            return (
              <article
                key={item.sku}
                className="group bg-[#F7F4EF] rounded-sm border border-[#E8DED0] hover:border-[#10352C]/40 luxury-card-hover flex flex-col justify-between overflow-hidden shadow-2xs transition-all duration-300"
              >
                {/* Product Packshot Window */}
                <Link
                  href={`/products/${item.slug}`}
                  className="relative block w-full aspect-[4/3] bg-[#FAF8F5] overflow-hidden border-b border-[#E8DED0]"
                >
                  <div className="absolute top-4 left-4 z-10 flex flex-wrap items-center gap-2">
                    <span className="text-xs font-mono px-3 py-1 rounded-sm bg-[#10352C] text-[#F7F4EF] font-medium shadow-xs">
                      {item.sku}
                    </span>
                    {item.is3DEnabled && (
                      <span className="text-xs font-mono px-2.5 py-1 rounded-sm bg-white/95 text-[#10352C] border border-[#E8DED0] flex items-center gap-1 shadow-xs">
                        <Sparkles className="w-3 h-3 text-[#C5A059]" /> 3D Prototype
                      </span>
                    )}
                  </div>

                  <div className="relative w-full h-full p-6 flex items-center justify-center">
                    <Image
                      src={item.heroImage}
                      alt={`${displayName} — ${item.sku} authentic catalogue packshot`}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-contain p-4 group-hover:scale-105 transition-transform duration-500 ease-[var(--ease-luxury)]"
                    />
                  </div>
                </Link>

                {/* Product Details & Actions */}
                <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs text-[#737373]">
                      <span>{item.silhouetteFamily || item.silhouette}</span>
                      <span className="font-mono text-[#C5A059]">{item.sourceHeading}</span>
                    </div>

                    <h2 className="text-xl font-serif text-[#10352C] font-normal leading-snug group-hover:text-[#164E3D] transition-colors">
                      <Link href={`/products/${item.slug}`}>
                        {displayName}
                      </Link>
                    </h2>

                    <p className="text-sm text-[#4A4D53] font-light leading-relaxed line-clamp-2">
                      {item.description}
                    </p>
                  </div>

                  {/* Observed Appearance Finishes */}
                  <div className="pt-3 border-t border-[#E8DED0]/60 space-y-1.5">
                    <span className="text-xs text-[#737373] block">
                      Prototype Finish:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {appearanceList.slice(0, 2).map((finish, idx) => (
                        <span
                          key={idx}
                          className="text-xs px-2.5 py-0.5 rounded-sm bg-white border border-[#E8DED0] text-[#4A4D53]"
                        >
                          {finish}
                        </span>
                      ))}
                      {appearanceList.length > 2 && (
                        <span className="text-xs px-2 py-0.5 text-[#737373]">
                          +{appearanceList.length - 2} more
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Action Row */}
                  <div className="pt-4 border-t border-[#E8DED0]/60 flex items-center justify-between gap-3">
                    <Link
                      href={`/products/${item.slug}`}
                      className="text-xs font-mono uppercase tracking-wider text-[#737373] hover:text-[#10352C] transition-colors"
                    >
                      Specifications
                    </Link>

                    <Link
                      href={`/contact?sku=${item.sku}&product=${encodeURIComponent(displayName)}#rfq`}
                      className="inline-flex items-center gap-1.5 text-xs font-medium text-[#10352C] hover:text-[#C5A059] transition-colors py-1.5 px-3.5 rounded-full bg-white border border-[#E8DED0] hover:border-[#10352C] shadow-2xs"
                    >
                      <span>Inquire RFQ</span>
                      <ArrowRight className="w-3.5 h-3.5 text-[#C5A059]" />
                    </Link>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      ) : (
        /* Empty State */
        <div className="text-center py-20 bg-white rounded-2xl border border-[#E8DED0] p-8 space-y-4 shadow-2xs">
          <div className="w-12 h-12 rounded-full bg-[#FAF8F5] border border-[#E8DED0] flex items-center justify-center mx-auto text-[#C5A059]">
            <Search className="w-5 h-5" />
          </div>
          <p className="text-base font-serif text-[#10352C]">
            No verified pouch silhouettes matched &ldquo;{searchQuery}&rdquo;.
          </p>
          <p className="text-xs font-mono text-[#737373] max-w-md mx-auto">
            Try searching by SKU number (e.g. AR-001 through AR-013) or selecting another silhouette family.
          </p>
          <button
            type="button"
            onClick={resetFilters}
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#10352C] text-[#F7F4EF] hover:bg-[#164E3D] transition-colors text-xs font-mono uppercase tracking-wider shadow-xs cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5 text-[#C5A059]" />
            <span>Reset All Filters</span>
          </button>
        </div>
      )}

      {/* Service Division Discovery Banner */}
      <div className="p-6 sm:p-8 rounded-2xl bg-white border border-[#E8DED0] flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-2xs">
        <div className="space-y-1.5 max-w-2xl">
          <span className="text-[11px] font-mono uppercase tracking-widest text-[#C5A059] block">
            Bespoke OEM / ODM Manufacturing Services
          </span>
          <h3 className="text-xl font-serif text-[#10352C]">
            Custom Tote Bags, Corporate Gifting & Direct CAD Tooling
          </h3>
          <p className="text-xs text-[#5A5D64] leading-relaxed">
            Require specialized volume manufacturing beyond the 13 catalogue pouch silhouettes? ARMANO produces custom tote bags, executive evening gifting, and bespoke OEM tooling fabricated directly from brand tech-packs.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 shrink-0">
          <Link
            href="/tote-bags"
            className="px-4 py-2.5 rounded-full bg-[#F7F4EF] hover:bg-white border border-[#E8DED0] text-xs font-mono uppercase tracking-wider text-[#10352C] transition-colors"
          >
            Tote Bags OEM &rarr;
          </Link>
          <Link
            href="/corporate-gifting"
            className="px-4 py-2.5 rounded-full bg-[#F7F4EF] hover:bg-white border border-[#E8DED0] text-xs font-mono uppercase tracking-wider text-[#10352C] transition-colors"
          >
            Corporate Gifting &rarr;
          </Link>
          <Link
            href="/custom-manufacturing"
            className="px-4 py-2.5 rounded-full bg-[#10352C] text-[#F7F4EF] hover:bg-[#164E3D] text-xs font-mono uppercase tracking-wider transition-colors shadow-xs"
          >
            Custom Tooling &rarr;
          </Link>
        </div>
      </div>
    </div>
  );
}
