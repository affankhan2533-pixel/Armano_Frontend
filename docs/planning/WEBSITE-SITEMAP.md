# ARMANO — Website Sitemap & Information Architecture

**Document Status**: Implementation-Ready Routing Blueprint  
**Routing Framework**: Next.js App Router (JavaScript ESNext)  
**SEO Objective**: Comprehensive indexation for high-intent B2B packaging and bulk manufacturing queries.

---

## 1. Information Architecture Hierarchy

The website routing is architected to optimize buyer discovery journeys while maximizing topical authority for search engine crawlers:

```
ARMANO PLATFORM SITEMAP
├── / (Root Homepage)
│   ├── Interactive 3D Pouch Hero (WebGL / R3F)
│   ├── Brand Capability Spotlight / Approved Partner Marquee
│   ├── Core Product Silhouettes (Cosmetic, Totes, Gifting, Custom)
│   ├── Factory & Craftsmanship Narrative (Direct Mumbai Manufacturer)
│   ├── OEM / ODM Contract Manufacturing Process (Provisional 10k / 20k / 50k Scales)
│   ├── Material & Custom Branding Innovation Matrix
│   └── High-Conversion RFQ Quote Inbound Anchor
│
├── /about (Heritage & Infrastructure)
│   ├── The ARMANO Story (Generational Mumbai Craftsmanship)
│   ├── Factory Floor Capabilities (Maharana Pratap Nagar, Sion-Dharavi)
│   ├── Quality Assurance Protocol & Stitching Inspection
│   └── Sourcing & Material Surface Library
│
├── /products (Master Filterable Catalogue)
│   ├── Category Filters (Cosmetic Pouches, Totes, Gifting, Organizers)
│   ├── Material Filters (Vegan Leather, Canvas, Velvet, Puffer, PVC, Faux Fur)
│   ├── Silhouette Filters (Boxy, Dome, Barrel, Puffer, Heart, Flat)
│   ├── Search & Dynamic Sorting (Newest, Popular, Volume Programs)
│   └── Quick RFQ Initiation from Card Grid
│
├── /products/[slug] (Dynamic Product Specification Page)
│   ├── High-Resolution Image Carousel & Zoom
│   ├── 3D Viewport (Available on Select Flagship SKUs)
│   ├── Verified Dimensions & Structural Specifications
│   ├── Supported Custom Branding Methods (Deboss, Foil, Screen Print)
│   ├── Provisional Volume Tiers (10,000 / 20,000 / 50,000 Units — Client Verbal Indication)
│   └── Individual Product Quote Request Modal
│
├── /cosmetic-pouches (Category Landing Page)
│   ├── Deep-Dive: Zipper, Boxy, Transparent, Quilted Puffer Pouches
│   └── Tailored Inquiry CTA for D2C Beauty & Skincare Brands
│
├── /tote-bags (Category Landing Page)
│   ├── Deep-Dive: Canvas Shoppers, Eco-Cotton, Structured PU Totes
│   └── Bulk Order Configuration (Branded Event & Retail Programs)
│
├── /corporate-gifting (Category Landing Page)
│   ├── Luxury PR Hampers, Executive Gift Sets, Velvet Clutches
│   └── Premium Customization for Corporate Agencies
│
├── /custom-manufacturing (OEM / ODM Engineering Gateway)
│   ├── 5-Stage Contract Manufacturing Roadmap
│   ├── Custom Die-Lines, Pattern Development & Tooling
│   ├── Pattern Drafting & Physical Counter-Sampling Workflow
│   └── Volume Production Program Inquiries (Provisional 10k–50k Scale)
│
├── /contact (Factory Showroom & Procurement Desk)
│   ├── Physical Factory Address Block (Sion / Dharavi, Mumbai)
│   ├── Direct Operations Hotline (+91 8591897469 — Rehan)
│   ├── Interactive Google Map / Factory Visit Appointment Booking
│   └── Comprehensive B2B Request for Quote (RFQ) Form
│
├── Legal & Compliance Routes
│   ├── /privacy-policy (DPDP Act 2023 & B2B Data Handling)
│   ├── /terms-and-conditions (Commercial Manufacturing Terms & Disclaimers)
│   ├── /cookie-policy (Cookie Audit & Consent Storage)
│   └── /returns-and-refunds (B2B Inspection, Sampling & Batch Policies)
│
└── Backend Serverless API Endpoints
    ├── /api/enquiry (Secure RFQ Submission, Validation & Email Routing)
    ├── /api/health (System Status & Uptime Monitoring)
    └── /api/catalog (Dynamic Product Data Service)
```

---

## 2. Dynamic Navigation Schema

To support single-source-of-truth navigation updates, all menu items are driven by a centralized schema in `src/data/navigation.js`:

```javascript
export const headerNav = [
  { label: 'Products', href: '/products', isMegaMenu: true },
  { label: 'Cosmetic Pouches', href: '/cosmetic-pouches' },
  { label: 'Tote Bags', href: '/tote-bags' },
  { label: 'Corporate Gifting', href: '/corporate-gifting' },
  { label: 'Custom Manufacturing', href: '/custom-manufacturing' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact', isCta: true }
];

export const footerNav = {
  categories: [
    { label: 'Cosmetic Pouches', href: '/cosmetic-pouches' },
    { label: 'Tote Bags', href: '/tote-bags' },
    { label: 'Corporate Gifting', href: '/corporate-gifting' },
    { label: 'Custom Manufacturing', href: '/custom-manufacturing' },
    { label: 'Browse All Products', href: '/products' }
  ],
  company: [
    { label: 'About ARMANO', href: '/about' },
    { label: 'Factory & Operations', href: '/about#factory' },
    { label: 'Quality Standards', href: '/about#quality' },
    { label: 'Contact Procurement', href: '/contact' }
  ],
  legal: [
    { label: 'Privacy Policy', href: '/privacy-policy' },
    { label: 'Terms & Conditions', href: '/terms-and-conditions' },
    { label: 'Cookie Policy', href: '/cookie-policy' },
    { label: 'Returns & Sampling Policy', href: '/returns-and-refunds' }
  ]
};
```

---

## 3. SEO Sitemap XML & Priority Weighting

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <!-- Core Flagship Pages -->
  <url><loc>https://armanobags.com/</loc><priority>1.0</priority><changefreq>weekly</changefreq></url>
  <url><loc>https://armanobags.com/products</loc><priority>0.9</priority><changefreq>weekly</changefreq></url>
  <url><loc>https://armanobags.com/cosmetic-pouches</loc><priority>0.9</priority><changefreq>weekly</changefreq></url>
  <url><loc>https://armanobags.com/tote-bags</loc><priority>0.9</priority><changefreq>weekly</changefreq></url>
  <url><loc>https://armanobags.com/custom-manufacturing</loc><priority>0.9</priority><changefreq>monthly</changefreq></url>
  <url><loc>https://armanobags.com/corporate-gifting</loc><priority>0.8</priority><changefreq>weekly</changefreq></url>
  <url><loc>https://armanobags.com/about</loc><priority>0.7</priority><changefreq>monthly</changefreq></url>
  <url><loc>https://armanobags.com/contact</loc><priority>0.8</priority><changefreq>monthly</changefreq></url>
  
  <!-- Legal Pages -->
  <url><loc>https://armanobags.com/privacy-policy</loc><priority>0.3</priority><changefreq>yearly</changefreq></url>
  <url><loc>https://armanobags.com/terms-and-conditions</loc><priority>0.3</priority><changefreq>yearly</changefreq></url>
  <url><loc>https://armanobags.com/cookie-policy</loc><priority>0.3</priority><changefreq>yearly</changefreq></url>
  <url><loc>https://armanobags.com/returns-and-refunds</loc><priority>0.3</priority><changefreq>yearly</changefreq></url>
</urlset>
```
