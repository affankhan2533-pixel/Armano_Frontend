'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Sparkles, Eye, ShieldCheck } from 'lucide-react';

export function ProductGallery({ images = [], title = '', sku = '', is3DEnabled = false, isPendingPhotoApproval = false }) {
  const [selectedImage, setSelectedImage] = useState(images[0] || '');

  return (
    <div className="space-y-4">
      {/* Main Large Packshot Stage */}
      <div className="relative aspect-square w-full rounded-sm bg-[#FAF8F5] border border-[#E8DED0] overflow-hidden p-6 sm:p-10 flex items-center justify-center shadow-2xs group">
        {/* Floating Badges */}
        <div className="absolute top-4 left-4 z-10 flex flex-wrap items-center gap-2">
          <span className="text-xs font-mono px-3 py-1 rounded-sm bg-[#10352C] text-[#F7F4EF] font-medium shadow-xs">
            {sku}
          </span>
          {is3DEnabled && (
            <span className="text-xs font-mono px-2.5 py-1 rounded-sm bg-white text-[#10352C] border border-[#E8DED0] flex items-center gap-1.5 shadow-xs">
              <Sparkles className="w-3 h-3 text-[#C5A059]" /> 3D Prototype
            </span>
          )}
        </div>

        <div className="absolute top-4 right-4 z-10 flex flex-wrap items-center gap-2">
          {isPendingPhotoApproval ? (
            <span className="text-xs font-mono px-3 py-1 rounded-sm bg-[#FFFBF0] border border-[#C5A059]/50 text-[#8C6F34] flex items-center gap-1.5 shadow-2xs font-semibold">
              AR-002 — Photo Pending Approval
            </span>
          ) : (
            <span className="text-xs font-sans px-3 py-1 rounded-sm bg-white/95 border border-[#E8DED0] text-[#5A5D64] flex items-center gap-1.5 shadow-2xs">
              <ShieldCheck className="w-3.5 h-3.5 text-[#C5A059]" /> Catalogue Sample
            </span>
          )}
        </div>

        {/* Selected Main Image */}
        <div className="relative w-full h-full transition-opacity duration-300 ease-[var(--ease-luxury)]">
          <Image
            key={selectedImage}
            src={selectedImage}
            alt={`${title} — ${sku} authentic factory packshot`}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            priority
            className="object-contain p-4 group-hover:scale-104 transition-transform duration-700 ease-[var(--ease-luxury)]"
          />
        </div>
      </div>

      {/* Thumbnail Selector (if gallery has multiple images) */}
      {images.length > 1 && (
        <div className="flex items-center gap-3 overflow-x-auto pb-2" role="tablist" aria-label="Product Images">
          {images.map((img, idx) => {
            const isSelected = selectedImage === img;
            return (
              <button
                key={idx}
                type="button"
                role="tab"
                aria-selected={isSelected}
                aria-label={`View angle ${idx + 1}`}
                onClick={() => setSelectedImage(img)}
                className={`relative w-20 h-20 rounded-sm bg-white p-2 border transition-all cursor-pointer overflow-hidden flex items-center justify-center shrink-0 ${
                  isSelected
                    ? 'border-[#10352C] ring-2 ring-[#10352C]/20 shadow-xs'
                    : 'border-[#E8DED0] hover:border-[#10352C]/40 opacity-80 hover:opacity-100'
                }`}
              >
                <div className="relative w-full h-full">
                  <Image
                    src={img}
                    alt={`${sku} thumbnail view ${idx + 1}`}
                    fill
                    sizes="80px"
                    className="object-contain"
                  />
                </div>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
