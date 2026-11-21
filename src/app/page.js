import { HeroSection } from '@/sections/hero/HeroSection';
import { CategoryShowcaseSection } from '@/sections/home/CategoryShowcaseSection';
import { MasterProductGallery } from '@/sections/home/MasterProductGallery';
import { EditorialCampaignBanner } from '@/sections/home/EditorialCampaignBanner';
import { ManufacturingStorySection } from '@/sections/home/ManufacturingStorySection';
import { AtelierHorizontalGallery } from '@/sections/home/AtelierHorizontalGallery';
import { B2bEnquirySection } from '@/sections/home/B2bEnquirySection';

export const metadata = {
  title: 'ARMANO — Bags & Pouches, Made for Brands | Direct Mumbai Manufacturer',
  description: 'Custom cosmetic pouches, carry-alls, and bespoke gifting packaging manufactured in Mumbai for beauty labels and retail brand programmes. Master catalogue silhouettes AR-001 through AR-013.',
};

/**
 * ARMANO V8.0 — Image-First Luxury Storefront
 * Built in accordance with Fontana Contarini & Purplle luxury e-commerce references:
 * - Preserved interactive 3D hero with right-side pouch & colour swatches
 * - Section 01: Our Collections (4 photographic category tiles)
 * - Section 02: Featured Product Silhouettes (5-column desktop storefront grid, 10 silhouettes)
 * - Section 03: Editorial Campaign Banner (Promotional image-led impact)
 * - Section 04: Manufacturing Story (4 visual steps with authentic imagery)
 * - Section 05: Atelier Showcase (Horizontal product portfolio)
 * - Section 06: Final B2B Enquiry Section (Deep forest green luxury CTA)
 */
export default function HomePage() {
  return (
    <>
      {/* 00. Interactive 3D Luxury Hero (Preserved V7.2.1) */}
      <HeroSection />

      {/* 01. Large Image-Led Collection Showcase (Our Collections) */}
      <CategoryShowcaseSection />

      {/* 02. Featured Product Silhouettes (5-Column Reference 1 Storefront Grid) */}
      <MasterProductGallery />

      {/* 03. Full-Width Editorial Product Campaign (Designed Around Your Brand) */}
      <EditorialCampaignBanner />

      {/* 04. Manufacturing Story (01–04 Visual Steps) */}
      <ManufacturingStorySection />

      {/* 05. Premium Atelier Gallery (Horizontal Showcase) */}
      <AtelierHorizontalGallery />

      {/* 06. Minimal B2B Conversion Pavilion (Direct Factory Quote) */}
      <B2bEnquirySection />
    </>
  );
}
