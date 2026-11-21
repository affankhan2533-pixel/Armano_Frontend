'use client';

import { useState, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Search, X, ArrowRight, Sparkles, Grid3X3, LayoutGrid } from 'lucide-react';

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
  };

  return (
    <div className="space-y-10">
      {/* Top Controls: Search Bar & Utility Bar */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
          {/* Real-Time Keyword Search Input */}
          <div className="relative flex-1 max-w-lg">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#737373]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by SKU (e.g. AR-009), silhouette, or finish..."
              className="w-full pl-11 pr-10 py-3 rounded-sm bg-white border border-[#E8DED0] text-sm text-[#242424] placeholder:text-[#737373] focus:outline-none focus:border-[#10352C] focus:ring-1 focus:ring-[#10352C] transition-all"
              aria-label="Search catalogue"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 p-1 text-[#737373] hover:text-[#10352C]"
                aria-label="Clear search"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Sort & Grid Toggle Controls */}
          <div className="flex items-center justify-between sm:justify-end gap-3">
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono uppercase text-[#737373] hidden md:inline">Sort:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-3 py-2.5 rounded-sm bg-white border border-[#E8DED0] text-xs font-mono uppercase text-[#242424] focus:outline-none focus:border-[#10352C] cursor-pointer"
                aria-label="Sort products"
              >
                <option value="sku-asc">SKU (AR-001 – AR-013)</option>
                <option value="sku-desc">SKU (AR-013 – AR-001)</option>
                <option value="title-asc">Product Name (A – Z)</option>
                <option value="silhouette">Silhouette Family</option>
              </select>
            </div>

            {/* Grid Density Toggle (2 vs 3 columns) */}
            <div className="hidden lg:flex items-center p-1 rounded-sm bg-white border border-[#E8DED0]">
              <button
                type="button"
                onClick={() => setGridColumns('2')}
                className={`p-1.5 rounded-xs transition-colors ${gridColumns === '2' ? 'bg-[#10352C] text-[#F7F4EF]' : 'text-[#737373] hover:text-[#10352C]'}`}
                title="2 Columns"
                aria-label="2 Columns View"
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => setGridColumns('3')}
                className={`p-1.5 rounded-xs transition-colors ${gridColumns === '3' ? 'bg-[#10352C] text-[#F7F4EF]' : 'text-[#737373] hover:text-[#10352C]'}`}
                title="3 Columns"
                aria-label="3 Columns View"
              >
                <Grid3X3 className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Silhouette Family Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar" role="tablist" aria-label="Silhouette Filters">
          {SILHOUETTE_TABS.map((tab) => {
            const isActive = activeSilhouette === tab.id;
            return (
              <button
                key={tab.id}
                role="tab"
                aria-selected={isActive}
                onClick={() => setActiveSilhouette(tab.id)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-mono uppercase tracking-wider transition-all shrink-0 cursor-pointer flex items-center gap-1.5 ${
                  isActive
                    ? 'bg-[#10352C] text-[#F7F4EF] shadow-xs'
                    : 'bg-white text-[#737373] hover:text-[#10352C] border border-[#E8DED0]'
                }`}
              >
                <span>{tab.label}</span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${isActive ? 'bg-[#C5A059] text-[#10352C]' : 'bg-[#F7F4EF] text-[#737373]'}`}>
                  {tab.count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Results Counter & Reset */}
        <div className="flex items-center justify-between text-xs font-mono text-[#737373] pt-1">
          <span>
            Showing <strong className="text-[#10352C]">{filteredProducts.length}</strong> of 13 verified catalogue items
          </span>
          {(searchQuery || activeSilhouette !== 'all') && (
            <button
              type="button"
              onClick={resetFilters}
              className="text-[#C5A059] hover:underline cursor-pointer"
            >
              Reset filters
            </button>
          )}
        </div>
      </div>

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
                className="group bg-[#F7F4EF] rounded-sm border border-[#E8DED0] hover:border-[#10352C]/40 luxury-card-hover flex flex-col justify-between overflow-hidden shadow-2xs"
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
                      className="inline-flex items-center gap-1.5 text-xs font-medium text-[#10352C] hover:text-[#C5A059] transition-colors py-1 px-3 rounded-sm bg-white border border-[#E8DED0] hover:border-[#10352C] shadow-2xs"
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
        <div className="text-center py-20 bg-white rounded-sm border border-[#E8DED0] p-8 space-y-4">
          <p className="text-sm font-mono text-[#737373]">
            No verified pouch silhouettes matched &ldquo;{searchQuery}&rdquo;.
          </p>
          <button
            type="button"
            onClick={resetFilters}
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xs bg-[#10352C] text-[#F7F4EF] hover:bg-[#164E3D] transition-colors text-xs font-mono uppercase tracking-wider"
          >
            <span>Reset All Filters</span>
          </button>
        </div>
      )}

      {/* Service Division Discovery Banner */}
      <div className="p-6 sm:p-8 rounded-sm bg-white border border-[#E8DED0] flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-2xs">
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
            className="px-3.5 py-2 rounded-xs bg-[#F7F4EF] hover:bg-white border border-[#E8DED0] text-xs font-mono uppercase tracking-wider text-[#10352C] transition-colors"
          >
            Tote Bags OEM &rarr;
          </Link>
          <Link
            href="/corporate-gifting"
            className="px-3.5 py-2 rounded-xs bg-[#F7F4EF] hover:bg-white border border-[#E8DED0] text-xs font-mono uppercase tracking-wider text-[#10352C] transition-colors"
          >
            Corporate Gifting &rarr;
          </Link>
          <Link
            href="/custom-manufacturing"
            className="px-3.5 py-2 rounded-xs bg-[#10352C] text-[#F7F4EF] hover:bg-[#164E3D] text-xs font-mono uppercase tracking-wider transition-colors"
          >
            Custom Tooling &rarr;
          </Link>
        </div>
      </div>
    </div>
  );
}
