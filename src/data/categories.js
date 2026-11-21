/**
 * ARMANO Manufacturing Divisions Taxonomy
 * Source Baseline: ARMANO MANUFACTURER.pdf
 * 
 * STRICT CATEGORY & SERVICE GOVERNANCE:
 * 1. Cosmetic & Skincare Pouches constitutes the verified master SKU family (AR-001 through AR-013).
 * 2. Tote Bags, Corporate Gifting, and Custom Manufacturing are bespoke contract manufacturing
 *    divisions fabricated directly from client tech-packs and CAD patterns.
 * 3. Zero speculative or invented SKU numbers are assigned to service divisions.
 */

export const categories = [
  {
    id: 'cosmetic-pouches',
    slug: 'cosmetic-pouches',
    title: 'Cosmetic & Skincare Pouches',
    subtitle: 'Verified 13-SKU Manufacturer Catalogue',
    classification: 'Verified Product Family',
    description: 'The complete 13-SKU production catalogue verified from the manufacturer source document. Engineered for beauty brands, retail packaging, and promotional programmes.',
    heroImage: '/images/categories/01-cosmetic-pouches.png',
    skus: ['AR-001', 'AR-002', 'AR-003', 'AR-004', 'AR-005', 'AR-006', 'AR-007', 'AR-008', 'AR-009', 'AR-010', 'AR-011', 'AR-012', 'AR-013'],
    features: [
      '13 Verified Source Silhouettes (AR-001 through AR-013)',
      'Custom Dimensioning Graded to Brand Tech-Packs',
      'Screen Printing, Blind Debossing & Foil Stamping Options',
      'Direct Mumbai Factory Physical Counter-Sampling',
    ],
  },
  {
    id: 'tote-bags',
    slug: 'tote-bags',
    title: 'Bespoke Tote Bags & Carry-Alls',
    subtitle: 'Custom Contract Manufacturing',
    classification: 'Bespoke Manufacturing Service',
    description: 'Dedicated contract manufacturing division for structured tote bags and shopper carry-alls produced to client order specifications.',
    heroImage: '/images/categories/02-tote-bags.png',
    skus: [],
    features: [
      'Engineered from Client Tech-Packs & Specification Sheets',
      'Commercial Canvas-Style & Faux-Leather Material Options',
      'Custom Handles, Compartment Layouts & Hardware',
      'Physical Counter-Sampling Prior to Production Run',
    ],
  },
  {
    id: 'corporate-gifting',
    slug: 'corporate-gifting',
    title: 'Luxury Gifting & Packaging Programmes',
    subtitle: 'Event Presentation & Brand Campaigns',
    classification: 'Bespoke Manufacturing Service',
    description: 'Contract manufacturing division for brand gifting programmes, luxury packaging carry-bags, cosmetic presentation suites, and seasonal packaging.',
    heroImage: '/images/categories/03-corporate-gifting-suite.png',
    skus: [],
    features: [
      'Structured PVC Window Kits, Coated Fabrics & Curated Finishes',
      'Custom Hardware & Metal Zipper Configurations',
      'Embossing, Foil Stamping & Ribbon Accents',
      'Provisional Order Tiers: 10,000 / 20,000 / 50,000',
    ],
  },
  {
    id: 'custom-manufacturing',
    slug: 'custom-manufacturing',
    title: 'Custom OEM/ODM Manufacturing',
    subtitle: 'Bespoke Fabrication from Client Tech-Packs',
    classification: 'Bespoke Manufacturing Service',
    description: 'Bespoke manufacturing and prototype development from client technical specification sheets, CAD blueprints, and physical material swatches at our Mumbai facility.',
    heroImage: '/images/categories/04-oem-manufacturing.png',
    isEditorialVisual: true,
    skus: [],
    features: [
      'Client Technical Pack & CAD Realisation',
      'Material Selection (Vinyl, Woven Canvas Style, Coated Fabrics)',
      'Direct Mumbai Facility Fabrication',
      'Physical Pre-Production Sample Approval',
    ],
  },
];
