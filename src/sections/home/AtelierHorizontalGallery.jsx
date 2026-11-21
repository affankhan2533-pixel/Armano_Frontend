'use client';

import { useRef, useState, useCallback, useEffect } from 'react';
import Image from 'next/image';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { EditorialReveal } from '@/components/motion/EditorialReveal';

const GALLERY_ITEMS = [
  {
    id: '01',
    title: 'Vanilla Trio Suite',
    category: '01 // Cosmetic Pouches',
    image: '/images/atelier/01-cosmetic-suite.png',
    imageAlt: 'ARMANO Trio of Graded Cosmetic Pouches on Workshop Studio Tabletop',
  },
  {
    id: '02',
    title: 'Structured Carry-All Tote',
    category: '02 // Tote Bags & Carry-Alls',
    image: '/images/atelier/02-carry-all-tote.png',
    imageAlt: 'ARMANO Structured Blush Pink Carry-All Tote Bag with Shoulder Straps',
  },
  {
    id: '03',
    title: 'Channel Quilted Puffer',
    category: '03 // Quilted Architecture',
    image: '/images/atelier/03-channel-quilted.png',
    imageAlt: 'ARMANO Vertical Channel-Quilted Lofted Puffer Cosmetic Pouch',
  },
  {
    id: '04',
    title: 'Tactile Cord Weave Pouch',
    category: '04 // Woven Textiles',
    image: '/images/atelier/04-woven-textile.png',
    imageAlt: 'ARMANO Chevron Cord Woven Textile Pouch with Metallic Zip Glide',
  },
  {
    id: '05',
    title: 'Heavy Brass Hardware Profile',
    category: '05 // Hardware & Zipper Details',
    image: '/images/atelier/05-hardware-profile.png',
    imageAlt: 'ARMANO Polished Brass Zipper Teeth and Custom Metal Puller Detail',
  },
  {
    id: '06',
    title: 'Atelier Prototype Suite',
    category: '06 // Sion Atelier Archive',
    image: '/images/atelier/06-atelier-cluster.png',
    imageAlt: 'ARMANO Mumbai Atelier Showroom Collection of Assorted Prototype Pouches',
  },
];

/**
 * ARMANO V8.4 — Section 05: Premium Atelier Image Gallery
 *
 * Requirements:
 * - Clean warm ivory background (#FAF8F5)
 * - Large authentic photographs occupying 85–90% of visual card area
 * - Elegant horizontal image slider with mouse drag, mobile touch swipe & keyboard navigation
 * - Small image counter (01 / 06) and thin hairline navigation arrows
 * - Subtle image zoom on hover
 * - Zero unverified claims, zero synthetic cutouts, authentic client archive assets
 */
export function AtelierHorizontalGallery() {
  const scrollContainerRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const dragStartX = useRef(0);
  const dragScrollLeft = useRef(0);
  const hasMoved = useRef(false);

  // Calculate the active index based on horizontal scroll position
  const updateActiveIndex = useCallback(() => {
    if (!scrollContainerRef.current) return;
    const container = scrollContainerRef.current;
    const scrollLeft = container.scrollLeft;
    const children = Array.from(container.children);
    if (!children.length) return;

    let closestIndex = 0;
    let minDiff = Infinity;
    children.forEach((child, i) => {
      const diff = Math.abs(child.offsetLeft - scrollLeft - 16);
      if (diff < minDiff) {
        minDiff = diff;
        closestIndex = i;
      }
    });
    setCurrentIndex(closestIndex);
  }, []);

  const scrollToIndex = (index) => {
    if (!scrollContainerRef.current) return;
    const container = scrollContainerRef.current;
    const children = Array.from(container.children);
    const targetIndex = Math.max(0, Math.min(children.length - 1, index));
    if (children[targetIndex]) {
      const childOffset = children[targetIndex].offsetLeft - container.offsetLeft;
      container.scrollTo({
        left: Math.max(0, childOffset),
        behavior: 'smooth',
      });
      setCurrentIndex(targetIndex);
    }
  };

  const handlePrev = () => scrollToIndex(currentIndex - 1);
  const handleNext = () => scrollToIndex(currentIndex + 1);

  // Desktop Mouse Drag Handlers
  const handleMouseDown = (e) => {
    if (!scrollContainerRef.current) return;
    setIsDragging(true);
    hasMoved.current = false;
    dragStartX.current = e.pageX - scrollContainerRef.current.offsetLeft;
    dragScrollLeft.current = scrollContainerRef.current.scrollLeft;
  };

  const handleMouseMove = (e) => {
    if (!isDragging || !scrollContainerRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollContainerRef.current.offsetLeft;
    const walk = (x - dragStartX.current) * 1.3;
    if (Math.abs(walk) > 5) {
      hasMoved.current = true;
    }
    scrollContainerRef.current.scrollLeft = dragScrollLeft.current - walk;
  };

  const handleMouseUpOrLeave = () => {
    if (!isDragging) return;
    setIsDragging(false);
    updateActiveIndex();
  };

  // Keyboard Navigation
  const handleKeyDown = (e) => {
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      handlePrev();
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      handleNext();
    }
  };

  // Attach passive scroll listener for smooth index updates
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          updateActiveIndex();
          ticking = false;
        });
        ticking = true;
      }
    };

    container.addEventListener('scroll', onScroll, { passive: true });
    return () => container.removeEventListener('scroll', onScroll);
  }, [updateActiveIndex]);

  return (
    <section id="atelier-gallery" className="py-20 lg:py-28 bg-[#FAF8F5] text-[#242424] border-b border-[#E8DED0] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header with Live Counter and Navigation Controls */}
        <EditorialReveal variant="fade-up" duration={600}>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 lg:mb-14">
            <div className="max-w-2xl space-y-2.5">
              <span className="text-xs font-mono uppercase tracking-[0.2em] text-[#C5A059] block font-semibold">
                Visual Portfolio // Atelier Gallery
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-[#10352C] font-normal tracking-tight uppercase">
                The Atelier Showcase
              </h2>
              <p className="text-sm sm:text-base text-[#5A5D64] font-light leading-relaxed">
                A visual overview of verified contract manufacturing prototypes photographed at our Mumbai facility.
              </p>
            </div>

            {/* Counter and Thin Navigation Arrows */}
            <div className="flex items-center gap-4 self-start md:self-end shrink-0">
              {/* Image Counter */}
              <div className="text-xs font-mono tracking-widest text-[#10352C] font-semibold bg-white/80 px-3 py-1.5 rounded-xs border border-[#EAE5DE] shadow-2xs">
                <span>{String(currentIndex + 1).padStart(2, '0')}</span>
                <span className="mx-1.5 text-[#C5A059]">/</span>
                <span className="text-[#8C8F96]">06</span>
              </div>

              {/* Navigation Arrows */}
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handlePrev}
                  disabled={currentIndex === 0}
                  aria-label="Previous Slide"
                  className="w-10 h-10 rounded-full border border-[#DCD5CB] hover:border-[#10352C] bg-white flex items-center justify-center text-[#10352C] hover:bg-[#F7F4EF] active:scale-95 transition-all duration-300 ease-[var(--ease-luxury)] shadow-2xs cursor-pointer disabled:opacity-35 disabled:cursor-not-allowed focus-visible:ring-2 focus-visible:ring-[#C5A059]"
                >
                  <ArrowLeft className="w-4 h-4" strokeWidth={1.5} />
                </button>
                <button
                  type="button"
                  onClick={handleNext}
                  disabled={currentIndex === GALLERY_ITEMS.length - 1}
                  aria-label="Next Slide"
                  className="w-10 h-10 rounded-full border border-[#DCD5CB] hover:border-[#10352C] bg-white flex items-center justify-center text-[#10352C] hover:bg-[#F7F4EF] active:scale-95 transition-all duration-300 ease-[var(--ease-luxury)] shadow-2xs cursor-pointer disabled:opacity-35 disabled:cursor-not-allowed focus-visible:ring-2 focus-visible:ring-[#C5A059]"
                >
                  <ArrowRight className="w-4 h-4" strokeWidth={1.5} />
                </button>
              </div>
            </div>
          </div>
        </EditorialReveal>

        {/* Horizontal Editorial Image Slider */}
        <div
          ref={scrollContainerRef}
          role="region"
          aria-label="Atelier prototype image gallery"
          tabIndex={0}
          onKeyDown={handleKeyDown}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUpOrLeave}
          onMouseLeave={handleMouseUpOrLeave}
          className={`flex items-stretch gap-6 overflow-x-auto pb-6 pt-2 no-scrollbar snap-x snap-mandatory ${
            isDragging ? 'cursor-grabbing select-none' : 'cursor-grab'
          }`}
          style={{ scrollSnapType: 'x mandatory', touchAction: 'pan-x' }}
        >
          {GALLERY_ITEMS.map((item) => (
            <div
              key={item.id}
              className="group relative w-[82vw] max-w-[340px] sm:w-[440px] sm:max-w-none lg:w-[500px] shrink-0 rounded-xs border border-[#EAE5DE] hover:border-[#10352C]/50 overflow-hidden bg-[#FFFFFF] transition-all duration-300 shadow-2xs hover:shadow-lg snap-start flex flex-col"
            >
              {/* Product Photograph Area — occupies 85–90% of panel height */}
              <div className="relative w-full h-[320px] sm:h-[400px] lg:h-[450px] overflow-hidden bg-[#FAF7F2] shrink-0">
                <Image
                  src={item.image}
                  alt={item.imageAlt}
                  fill
                  draggable={false}
                  sizes="(max-width: 640px) 85vw, (max-width: 1024px) 50vw, 500px"
                  className="object-contain p-4 sm:p-6 transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:scale-104 select-none pointer-events-none"
                />

                {/* Floating Plate Number */}
                <div className="absolute top-3.5 left-3.5 z-10 pointer-events-none">
                  <span className="text-[11px] font-mono tracking-widest text-[#10352C] bg-white/95 backdrop-blur-xs px-2.5 py-1 rounded-xs border border-[#E8DED0] shadow-2xs font-semibold">
                    {item.id}
                  </span>
                </div>
              </div>

              {/* Minimalist Editorial Caption */}
              <div className="p-4 sm:p-5 bg-[#FFFFFF] flex-1 flex items-baseline justify-between gap-3 border-t border-[#F0EBE1]">
                <div className="space-y-0.5">
                  <span className="text-[10px] font-mono uppercase tracking-[0.18em] text-[#C5A059] block font-medium">
                    {item.category}
                  </span>
                  <h3 className="text-base sm:text-lg font-serif text-[#10352C] font-normal tracking-tight">
                    {item.title}
                  </h3>
                </div>
                <span className="text-xs font-mono text-[#8C8F96] tracking-widest font-light shrink-0">
                  {item.id} / 06
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
