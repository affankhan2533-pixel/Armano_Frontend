'use client';

import { useState, useEffect } from 'react';
import { cn } from '@/utils/cn';

/**
 * Scroll-Reactive Sticky Navigation Controller
 */
export function StickyNav({ children, className }) {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div
      className={cn(
        'sticky top-0 z-50 w-full transition-all duration-300 ease-[var(--ease-luxury)]',
        isScrolled
          ? 'bg-[#F7F4EF]/95 backdrop-blur-md border-b border-[#E8DED0] shadow-sm'
          : 'bg-[#F7F4EF]/70 backdrop-blur-md border-b border-[#E8DED0]/50',
        className
      )}
    >
      {children}
    </div>
  );
}
