# ARMANO — Implementation Roadmap & Execution Milestones

**Document Status**: Implementation-Ready Engineering Roadmap  
**Architectural Baseline**: Discovery Phase Complete. Ready for Client Review & Staged Execution.

---

## 1. Phased Delivery Overview

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                       ARMANO PROJECT DELIVERY ROADMAP                       │
├───────────────────┬──────────────────────────────────┬──────────────────────┤
│ Milestone Phase   │ Primary Scope & Deliverables     │ Target Outcome       │
├───────────────────┼──────────────────────────────────┼──────────────────────┤
│ **PHASE 0**       │ Forensic Asset Audit, 3D Video   │ Implementation-Ready │
│ *(COMPLETED)*     │ Analysis, Business Blueprint,    │ Strategy & System    │
│                   │ Security & Legal Registers       │ Architecture Specs   │
├───────────────────┼──────────────────────────────────┼──────────────────────┤
│ **PHASE 1**       │ Foundation Setup, Design Tokens, │ Visual Design System │
│                   │ Tailwind Theme, Pure JS Layouts, │ & Decoupled Mock     │
│                   │ Navigation & Data Schemas        │ Catalog Data Layer   │
├───────────────────┼──────────────────────────────────┼──────────────────────┤
│ **PHASE 2**       │ Interactive 3D Pouch Hero (R3F), │ Immersive Flagship   │
│                   │ Dynamic Product Catalog & Pages, │ 3D Product Showcase  │
│                   │ Category Templates, Search/Filter│ & Editorial Pages    │
├───────────────────┼──────────────────────────────────┼──────────────────────┤
│ **PHASE 3**       │ Multi-Step B2B RFQ Funnel, Email │ Enterprise Lead      │
│                   │ API Integration (Resend), Spam & │ Acquisition Engine   │
│                   │ Security Hardening (Turnstile)   │ with Zero-Lag Transit│
├───────────────────┼──────────────────────────────────┼──────────────────────┤
│ **PHASE 4**       │ WCAG 2.1 AA Accessibility, CWV   │ Production-Ready     │
│                   │ Optimization, Schema.org SEO,    │ Deployment & Client  │
│                   │ Legal Terms & Final Handover     │ Delivery             │
└───────────────────┴──────────────────────────────────┴──────────────────────┘
```

---

## 2. Detailed Milestone Breakdown

### Phase 0: Discovery, Asset Audit & Technical Blueprint (COMPLETED)
- [x] Complete forensic extraction of `ARMANO MANUFACTURER.pdf` via custom glyph solver.
- [x] Recursive audit of 36 high-resolution physical product packshots in `reference/product-images/`.
- [x] Technical and creative breakdown of `WhatsApp Video 2026-11-01 at 8.37.06 PM.mp4`.
- [x] Formulation of Zero-Trust Brand Registry and trademark legal risk register.
- [x] Architectural documentation across 13 comprehensive strategic blueprints.

---

### Phase 1: Foundation & Core Design System (NEXT MILESTONE)
- **Dependencies Setup**: Pinned to exact modern stable releases: Next.js 16 App Router (`16.4.3`), React 19 (`19.3.1`), React DOM (`19.3.1`), Tailwind CSS v4 (`4.3.3`), `@tailwindcss/postcss` (`4.3.3`), PostCSS (`8.5.32`), ESLint 10 (`10.14.0`), `eslint-config-next` (`16.4.3`), `lucide-react` (`1.66.0`), `clsx` (`2.1.1`), `tailwind-merge` (`3.7.0`). Strictly pure JavaScript standard with `jsconfig.json` path aliasing and `npm ci` reproducible installs (`package-lock.json` accounted separately from the 45 authored deliverables).
- **Design System Tokens**: Modern CSS-first Tailwind v4 `@theme` configuration in `src/styles/globals.css` with Deep Forest Green (`#0A261D`), Champagne Gold (`#C5A059`), and Warm Alabaster (`#FBF9F5`). Zero legacy `tailwind.config.js`. Non-circular font stacks.
- **Global Typography**: Configure Google Mulish (sans-serif), Cormorant Garamond (editorial luxury serif), and JetBrains Mono.
- **Core Layout Shell**: Build responsive Header, Sticky Navigation, Mega-Menu, Mobile Navigation Drawer, and Comprehensive B2B Footer (13 shared components/primitives).
- **Data Layer Initialization**: Populate `src/data/products.js` (AR-001..AR-013), `categories.js`, and Zero-Trust `brandRegistry.js`.
- **Route Shells & Homepage Foundation**: 12 route pages (including statutory legal shells with draft disclaimers) and 5 homepage editorial narrative sections (Hero, Showcase, Manufacturing Intro, Brand Capability Banner, B2B CTA). Reconciled total: exactly 45 planned deliverable files.
- **Reference**: See [`PHASE-1-EXECUTION-PLAN.md`](file:///c:/Users/AFFAN%20KHAN/OneDrive/Desktop/ARMANO/docs/planning/PHASE-1-EXECUTION-PLAN.md) and [`DEPENDENCY-COMPATIBILITY-REPORT.md`](file:///c:/Users/AFFAN%20KHAN/OneDrive/Desktop/ARMANO/docs/planning/DEPENDENCY-COMPATIBILITY-REPORT.md).

---

### Phase 2: 3D Interactive Experience & Dynamic Catalog
- **3D Hero Development**: Implement Three.js + React Three Fiber + Drei canvas viewport.
- **Material & Color Variant Switcher**: Real-time shader mutation for Terracotta, Forest Green, Champagne Gold, Neon Chartreuse, and Midnight Blue.
- **Scroll Storytelling**: Integrate GSAP ScrollTrigger camera choreography zooming into zipper and stitching details.
- **Mobile Fallback**: Implement pre-rendered 360-degree interactive image sequence for low-power mobile devices.
- **Catalog & Category Pages**: Build filterable `/products` grid with category, silhouette, and material facets.
- **Dynamic Product Detail (`/products/[slug]`)**: Implement dynamic specification sheets, dimension tables, and individual RFQ initiation modals.

---

### Phase 3: High-Volume B2B RFQ Funnel & Security Architecture
- **Multi-Step RFQ Modal & Page**: Implement procurement inquiry wizard with 10k / 20k / 50k provisional order quantity selections (client verbal indication).
- **Serverless API Route (`/api/enquiry`)**: Server-side request payload validation, input sanitization, and invisible honeypot trap.
- **Secure File Upload Pipeline (`/api/upload/presign`)**: Presigned direct upload to private S3/R2 storage for buyer tech-packs (5MB cap, MIME whitelist, malware scan).
- **Anti-Spam & Rate Limiting**: Cloudflare Turnstile CAPTCHA and edge-level IP rate limiting (Cloudflare WAF / Upstash Redis).
- **Transactional Email Routing**: Resend API integration dispatching branded HTML emails to client-verified sales inbox (provisional placeholder: `operations@armanobags.com` `[PENDING CLIENT CONFIRMATION]`).
- **Security Headers & CSP**: Configure Content Security Policy and HTTP security headers in `next.config.js`.

---

### Phase 4: SEO Optimization, Compliance & Production Launch
- **Technical SEO Audit**: Dynamic metadata generation, JSON-LD schemas (`Manufacturer`, `Product`, `BreadcrumbList`), `sitemap.xml`, and `robots.txt`.
- **Accessibility Audit (a11y)**: WCAG 2.1 AA keyboard navigation, contrast ratios, and `prefers-reduced-motion` compliance.
- **Core Web Vitals Optimization**: Asset compression (WebP/AVIF), Draco 3D decimation, code splitting, LCP < 2.0s tuning.
- **Legal Compliance Pages**: Finalize `/privacy-policy`, `/terms-and-conditions`, `/cookie-policy`, and `/returns-and-refunds`.
- **Stakeholder Handover**: Final operational review with client team.
