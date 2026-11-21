# ARMANO — Project Architecture & File Hierarchy

**Project Name**: ARMANO Premium B2B Manufacturer Digital Flagship  
**Classification**: Enterprise B2B Manufacturing Platform  
**Target Stack**: Next.js App Router (Pure JavaScript / ESNext), Tailwind CSS, Three.js, React Three Fiber, Drei, GSAP, Framer Motion  
**Code Standard**: Strictly JavaScript (`.js`, `.jsx`). No TypeScript.

---

## 1. Directory Tree & Structural Blueprint

```
ARMANO/
├── reference/                                 # Read-only client source assets
│   ├── pdf/                                   # Original manufacturer PDF catalog
│   │   └── ARMANO MANUFACTURER.pdf            (24.4 MB master catalog, 8 pages)
│   ├── videos/                                # Reference 3D interaction videos
│   │   └── WhatsApp Video 2026-11-01...mp4    (3D puffer bag interactive showcase)
│   ├── product-images/                        # 36 high-resolution factory packshots
│   │   └── image.png ... image copy 35.png    (Visual sample photography)
│   ├── logos/                                 # Awaiting client vector logo files
│   └── client-materials/                      # Awaiting client CAD dies & tech-packs
│
├── docs/                                      # Master engineering & discovery docs
│   ├── ASSET-INVENTORY.md                     # Comprehensive asset forensic audit
│   ├── CLIENT-INPUTS-REQUIRED.md              # Stakeholder input & verification matrix
│   ├── PROJECT-STRUCTURE.md                   # This project structure specification
│   ├── SEO-PLAN.md                            # High-intent B2B search engine strategy
│   ├── research/
│   │   ├── ARMANO-BUSINESS-ANALYSIS.md        # Strategic positioning & fact classification
│   │   ├── BRAND-DESIGN-DIRECTION.md          # Artisanal industrial luxury visual theme
│   │   ├── BRAND-PARTNER-SHOWCASE.md          # Zero-trust trademark marquee governance
│   │   ├── PRODUCT-CATALOGUE.md               # Master product taxonomy & AR-001..013 SKUs
│   │   ├── REFERENCE-VIDEO-ANALYSIS.md        # 3D WebGL scene breakdown & shaders
│   │   └── DISCOVERY-VALIDATION-REPORT.md     # Principal Technical Audit & validation
│   ├── planning/
│   │   ├── DEVELOPMENT-ROADMAP.md             # Phased milestone execution plan
│   │   ├── PHASE-1-EXECUTION-PLAN.md          # GSD Phase 1 atomic tasks & engineering plan
│   │   ├── SECURITY-ARCHITECTURE.md           # Threat model, CSP, rate limits & uploads
│   │   ├── TECHNICAL-ARCHITECTURE.md          # Full-stack Next.js & 3D pipeline specs
│   │   └── WEBSITE-SITEMAP.md                 # Information architecture & route tree
│   ├── legal/
│   │   └── LEGAL-RISK-REGISTER.md             # DPDP Act, trademarks & compliance register
│   └── handover/                              # Final deployment & operational runbooks
│
├── public/                                    # Static assets served at web root
│   ├── images/                                # WebP/AVIF optimized imagery
│   │   ├── hero/                              # High-resolution hero backdrops
│   │   ├── products/                          # Retouched catalog packshots
│   │   ├── factory/                           # Sion-Dharavi manufacturing floor photos
│   │   └── brand/                             # Approved vector logos & marks
│   ├── models/                                # Optimized 3D assets (.glb / .gltf)
│   ├── fonts/                                 # Self-hosted WOFF2 typography files
│   ├── videos/                                # Compressed background video clips
│   ├── favicon.ico
│   └── robots.txt
│
├── src/                                       # Application source code
│   ├── app/                                   # Next.js App Router route segments
│   │   ├── layout.js                          # Root HTML layout, font injection, metadata
│   │   ├── page.js                            # Homepage flagship experience
│   │   ├── about/page.js                      # Factory heritage & Mumbai infrastructure
│   │   ├── products/                          # Filterable master catalog
│   │   │   ├── page.js                        # Product catalog grid & facet filters
│   │   │   └── [slug]/page.js                 # Dynamic product specification page
│   │   ├── cosmetic-pouches/page.js           # Cosmetic & skincare category landing
│   │   ├── tote-bags/page.js                  # Premium tote bags category landing
│   │   ├── corporate-gifting/page.js          # Executive packaging & hampers
│   │   ├── custom-manufacturing/page.js       # OEM/ODM contract engineering gateway
│   │   ├── contact/page.js                    # Factory contact & comprehensive RFQ desk
│   │   ├── privacy-policy/page.js             # DPDP Act 2023 statutory privacy policy
│   │   ├── terms-and-conditions/page.js       # B2B contract terms & disclaimers
│   │   ├── cookie-policy/page.js              # Cookie disclosure & consent controls
│   │   ├── returns-and-refunds/page.js        # Industrial sampling & defect policy
│   │   └── api/                               # Serverless API route handlers
│   │       ├── enquiry/route.js               # RFQ submission, validation & dispatch
│   │       ├── upload/presign/route.js        # Presigned S3/R2 direct upload gateway
│   │       ├── catalog/route.js               # Dynamic product querying service
│   │       └── health/route.js                # Uptime & deployment monitoring
│   │
│   ├── components/                            # Reusable React components
│   │   ├── ui/                                # Presentational primitives (Button, Modal)
│   │   ├── layout/                            # Container, Section, Grid, Header, Footer
│   │   ├── navigation/                        # StickyNav, MegaMenu, MobileDrawer
│   │   ├── product/                           # ProductCard, SpecTable, ImageCarousel
│   │   ├── forms/                             # RfqWizard, FileUpload, InputField
│   │   └── seo/                               # JsonLd, BreadcrumbSchema, OpenGraph
│   │
│   ├── sections/                              # Full-width composed page sections
│   │   ├── hero/                              # Interactive 3D Pouch Hero Section
│   │   ├── home/                              # Editorial narrative & highlight modules
│   │   ├── products/                          # Catalog grid & filter sidebars
│   │   ├── manufacturing/                     # OEM/ODM 5-stage contract process
│   │   ├── about/                             # Generational craftsmanship narrative
│   │   └── contact/                           # B2B RFQ form & factory location map
│   │
│   ├── features/                              # Domain-specific feature modules
│   │   ├── three-d/                           # R3F Canvas, PouchModel, Lighting, Shaders
│   │   ├── enquiry/                           # RFQ state machine, schema, validation
│   │   ├── consent/                           # DPDP-compliant cookie consent manager
│   │   └── analytics/                         # Privacy-preserving event tracking
│   │
│   ├── data/                                  # Centralized decoupled data stores
│   │   ├── products.js                        # Master product catalog (AR-001..AR-013)
│   │   ├── categories.js                      # Primary divisions & taxonomy
│   │   ├── brandRegistry.js                   # Zero-trust brand approval registry
│   │   └── navigation.js                      # Header mega-menu & footer links
│   │
│   ├── lib/                                   # Core libraries & third-party wrappers
│   │   ├── gsap.js                            # GSAP & ScrollTrigger configuration
│   │   ├── email.js                           # Resend API transactional client
│   │   └── storage.js                         # S3 / Cloudflare R2 presigned client
│   │
│   ├── hooks/                                 # Custom React hooks
│   │   ├── useScrollProgress.js               # Scroll position & scrub calculation
│   │   ├── useMediaQuery.js                   # Responsive breakpoint observer
│   │   └── use3DPerformance.js                # WebGL capability & FPS degradation detection
│   │
│   ├── utils/                                 # Pure helper utility functions
│   │   ├── formatters.js                      # Currency, dimensions, quantity strings
│   │   ├── validators.js                      # Server-side schema & regex validators
│   │   └── sanitize.js                        # HTML escaping & input sanitization
│   │
│   ├── styles/                                # Global styling
│   │   ├── globals.css                        # CSS reset, Tailwind directives, keyframes
│   │   └── typography.css                     # Custom font face declarations
│   │
│   └── config/                                # Application configuration constants
│       ├── site.js                            # Metadata, domain URLs, social links
│       └── security.js                        # Rate limit constants, upload whitelists
│
├── tests/                                     # Automated test suites
│   ├── accessibility/                         # WCAG 2.1 AA keyboard & contrast tests
│   ├── e2e/                                   # Playwright end-to-end user flows
│   └── seo/                                   # Lighthouse & schema validation audits
│
├── scripts/                                   # Build & utility helper scripts
├── .gitignore                                 # Git exclusions (.env, node_modules, build)
└── README.md                                  # Repository overview & development guide
```

---

## 2. Architectural Boundaries & Data Flow

```
[Inbound Buyer Request]
         │
         ▼
[Next.js App Router (SSR / SSG)] ───► [SEO JSON-LD Schemas Injected]
         │
         ▼
[Page Components in src/app/]
         │
         ├───► [Presentational Sections in src/sections/]
         │            │
         │            ├───► [UI Primitives in src/components/ui/]
         │            └───► [3D WebGL Canvas in src/features/three-d/]
         │
         └───► [Decoupled Static Data Layer in src/data/]
                      │
                      ├── products.js (AR-001..AR-013 Master Catalog)
                      ├── categories.js (Taxonomy Divisions)
                      └── brandRegistry.js (Zero-Trust Logo Governance)
```
