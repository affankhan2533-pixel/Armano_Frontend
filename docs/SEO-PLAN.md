# ARMANO — B2B Search Engine Optimization (SEO) & Inbound Strategy

**Document Status**: Implementation-Ready SEO Strategic Blueprint  
**Primary Target Market**: India (Mumbai / Delhi NCR / Bangalore / Pan-India) & International B2B Export Inquiries  
**Compliance Standard**: Google Search Essentials & Core Web Vitals (CWV) Guidelines  
**Notice**: *SEO is an organic discipline subject to search engine algorithmic updates. This plan establishes rigorous technical, on-page, and local SEO foundations without making false promises of guaranteed rankings.*

---

## 1. High-Intent Commercial Keyword Clusters

Targeting high-intent enterprise procurement queries where searchers have active buying intent for commercial packaging:

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                       CORE B2B KEYWORD TAXONOMY                             │
├───────────────────────────────┬────────────────┬────────────────────────────┤
│ Target Search Query           │ Search Intent  │ Target Landing Page        │
├───────────────────────────────┼────────────────┼────────────────────────────┤
│ "cosmetic pouch manufacturer" │ Commercial B2B │ `/cosmetic-pouches` & `/`  │
├───────────────────────────────┼────────────────┼────────────────────────────┤
│ "custom cosmetic bag          │ OEM / Custom   │ `/custom-manufacturing`    │
│  manufacturer"                │ Sourcing       │                            │
├───────────────────────────────┼────────────────┼────────────────────────────┤
│ "skincare packaging pouches"  │ Niche Beauty   │ `/cosmetic-pouches`        │
├───────────────────────────────┼────────────────┼────────────────────────────┤
│ "bulk cosmetic pouches        │ High-Volume    │ `/products` & `/contact`   │
│  manufacturer"                │ Procurement    │                            │
├───────────────────────────────┼────────────────┼────────────────────────────┤
│ "tote bag manufacturer        │ Geo-Targeted   │ `/tote-bags` & `/about`    │
│  mumbai"                      │ Local B2B      │                            │
├───────────────────────────────┼────────────────┼────────────────────────────┤
│ "custom corporate gifting     │ Enterprise B2B │ `/corporate-gifting`       │
│  bags"                        │ Marketing / PR │                            │
└───────────────────────────────┴────────────────┴────────────────────────────┘
```

---

## 2. Technical SEO Architecture

1. **Server-Side Rendered (SSR) HTML**: Using Next.js App Router, all catalog pages render complete HTML semantic trees on the server, guaranteeing that search engine bots immediately index all text, headings, and product specifications without needing client-side JavaScript execution.
2. **Canonical Link Tags**: Every page emits a strict self-referential `<link rel="canonical" href="https://armanobags.com/..." />` tag to eliminate duplicate content issues between trailing slashes and URL query parameters.
3. **Open Graph & Twitter Card Metadata**: Dynamic generation of rich social sharing previews (1200x630 WebP images) with descriptive titles and summaries.
4. **Clean Heading Hierarchy**: Exactly one `<h1>` per page, followed by logical nested `<h2>`, `<h3>` tags with keyword-rich semantic headings.

---

## 3. Schema.org Structured Data (JSON-LD)

The application injects machine-readable JSON-LD schemas to earn rich search snippets:

### 3.1 Organization & Manufacturer Schema (`/`)
```json
{
  "@context": "https://schema.org",
  "@type": "Manufacturer",
  "name": "ARMANO",
  "url": "https://armanobags.com",
  "logo": "https://armanobags.com/images/brand/armano-logo.png",
  "description": "Premium B2B manufacturer of cosmetic pouches, skincare packaging bags, tote bags, and custom corporate gifting solutions in Mumbai, India.",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "B: 162-212, Ground Floor, Maharana Pratap Nagar, Sant Kakkaya Marg, Dhorwada, Dharavi, Sion",
    "addressLocality": "Mumbai",
    "addressRegion": "Maharashtra",
    "postalCode": "400017",
    "addressCountry": "IN"
  },
  "telephone": "+91-8591897469",
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "+91-8591897469",
    "contactType": "sales",
    "areaServed": ["IN", "AE", "US", "GB"],
    "availableLanguage": ["English", "Hindi"]
  }
}
```

### 3.2 Product & ItemList Schema (`/products/[slug]`)
Each catalog SKU provides structured product data indicating category, material, manufacturer, and B2B inquiry availability without exposing misleading retail pricing.

---

## 4. Local SEO & Mumbai Industrial Presence

1. **Google Business Profile Alignment**: Ensure Name, Address, and Phone (NAP) exactly match the physical factory location:
   `ARMANO — B: 162-212, Maharana Pratap Nagar, Sant Kakkaya Marg, Sion-Dharavi, Mumbai 400017 (+91 8591897469)`.
2. **Local Citation Strategy**: Indexing within verified Indian B2B directories (IndiaMART, TradeIndia, ExportersIndia) with consistent backlink attribution.
3. **Regional Industrial Content**: Highlighting Mumbai’s historic textile and leathercraft manufacturing heritage on `/about` and `/custom-manufacturing` to capture localized queries.

---

## 5. Robots.txt & Crawl Budget Optimization

File: `public/robots.txt`
```
User-agent: *
Allow: /
Disallow: /api/
Disallow: /_next/
Disallow: /private/

Sitemap: https://armanobags.com/sitemap.xml
```

---

## 6. Core Web Vitals (CWV) Performance Budgets

To ensure superior search rankings, page load speeds are strictly budgeted:
- **Largest Contentful Paint (LCP)**: `< 2.0s` (Prioritize hero packshots, defer Three.js render).
- **Interaction to Next Paint (INP)**: `< 150ms` (Lightweight event listeners, debounced inputs).
- **Cumulative Layout Shift (CLS)**: `< 0.05` (Explicit image width/height, self-hosted WOFF2 fonts with `font-display: swap`).
