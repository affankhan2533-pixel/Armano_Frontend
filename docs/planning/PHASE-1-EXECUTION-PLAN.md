# ARMANO — GSD Phase 1: Foundation Setup & Core Design System (Execution Plan)

**Document Status**: Implementation-Ready Task & Engineering Specification (Final ESLint 10 & Lockfile Accounting Pass)  
**Phase**: GSD Phase 1 of 4  
**Project**: ARMANO Premium B2B Manufacturer Digital Flagship  
**Author**: Principal Software Architect & Lead Systems Engineer  
**Execution Rule**: **PLANNING ONLY (No package installations, Next.js initialization, or codebase changes until approved)**  
**Mandatory Modern Stack (Exact Pinned Versions)**:
- **Framework**: Next.js 16 App Router (`next@16.4.3`) — Standard `.next` output for planned Vercel deployment
- **UI Engine**: React 19 (`react@19.3.1`), React DOM (`react-dom@19.3.1`)
- **Language**: Strictly Pure JavaScript (ESNext / JSX) — *No Authored TypeScript*
- **Path Resolution**: `jsconfig.json` (`@/*` -> `./src/*`)
- **Styling**: Tailwind CSS v4 (`tailwindcss@4.3.3`, `@tailwindcss/postcss@4.3.3`, `postcss@8.5.32`)
- **Linter & Code Quality**: ESLint 10 (`eslint@10.14.0`), `eslint-config-next@16.4.3` (Official Flat Config via `defineConfig` / `globalIgnores` from `eslint/config` and direct `eslint-config-next/core-web-vitals` import), `eslint.config.mjs`
- **Runtime**: Node.js 24 (`v24.21.0`), npm (`v11.19.0`), `npm ci` reproducible install protocol
- **Icons & Helpers**: `lucide-react@1.66.0`, `clsx@2.1.1`, `tailwind-merge@3.7.0`
- **CLI Scripts**: `npm run dev`, `npm run build`, `npm run start`, and `eslint .` (removed deprecated `next lint`)

**Architectural Baselines**:
- Discovery & Factual Validation Audit Complete ([`DISCOVERY-VALIDATION-REPORT.md`](file:///c:/Users/AFFAN%20KHAN/OneDrive/Desktop/ARMANO/docs/research/DISCOVERY-VALIDATION-REPORT.md))
- Dependency Compatibility & Peer Review Complete ([`DEPENDENCY-COMPATIBILITY-REPORT.md`](file:///c:/Users/AFFAN%20KHAN/OneDrive/Desktop/ARMANO/docs/planning/DEPENDENCY-COMPATIBILITY-REPORT.md))

---

## 1. Executive Summary & Phase 1 Objectives

The objective of **Phase 1** is to establish the complete, modern, production-ready technical and visual foundation of the ARMANO website. Upon completion of Phase 1, the platform will have a running, production-buildable Next.js 16 App Router application (generating default `.next` output for planned Vercel deployment), a custom luxury design system powered by Tailwind CSS v4 CSS-first `@theme` tokens, an accessible layout shell, an audited decoupled data layer (SKUs `AR-001` through `AR-013`), and an editorial luxury homepage foundation.

### 1.1 Out-of-Scope Guardrails for Phase 1
To maintain strict architectural boundaries, advanced features are scheduled for subsequent phases:
- **Phase 2**: Three.js WebGL canvas, interactive 3D pouch viewport (`@react-three/fiber`), shader mutations, advanced GSAP ScrollTrigger timeline choreographies, and individual dynamic `/products/[slug]` templates.
- **Phase 3**: Backend serverless RFQ API (`/api/enquiry`), Resend email delivery, private presigned S3/R2 file upload pipeline (5MB cap), and Cloudflare Turnstile anti-spam integration.
- **Phase 4**: Production analytics, marketing integrations, public domain DNS cutover, and production hosting deployment.

---

## 2. Pre-Planning Governance & Factual Discovery Baseline

In accordance with principal technical auditor instructions, all planning tasks strictly adhere to these verified facts:

1. **PDF Page Structure vs. Catalogue Layout**:
   - **Physical PDF Pages 1–3**: Product item grids featuring verified manufacturer SKUs **AR-001 through AR-013**.
   - **Physical PDF Pages 4–7**: High-resolution visual sample showcase plates without text.
   - **Physical PDF Page 8 (Object 107)**: Company Profile & Manufacturing Desk block (ARMANO title, Sion-Dharavi address, Contact Rehan `+91 8591897469`, GSTIN `27EOGPM4521C1Z6`, About Us, What We Offer). In the physical brochure, this represents the Introductory Profile or Back Cover.
2. **Photographed Customer Trademarks**:
   - All brand marks (M·A·C, CeraVe, Nykaa, Pilgrim, Bobbi Brown, Smashbox, Forest Essentials, Paese, Forever52, Artefan, Rays) are recorded strictly as `[VISUAL OBSERVATION - UNAPPROVED FOR PUBLIC USE]`.
   - `src/data/brandRegistry.js` enforces `approvalStatus: "PENDING_APPROVAL"` with `getApprovedBrands()` returning `[]`. **Zero third-party brand logos will render in Phase 1 DOM**.
3. **Provisional Order Scales**:
   - The quantities **10,000 / 20,000 / 50,000** are documented strictly as `[CLIENT STATEMENT - PROVISIONAL SELECTION ONLY]` (client-provided verbal indications for RFQ selection), not certified plant capacity or statutory MOQs.
4. **Security & Legal Specifications**:
   - Rate limiting, CSP headers, upload pipelines, and DPDP Act terms are categorized as `[PROPOSED SPECIFICATION — PENDING IMPLEMENTATION & VALIDATION]`.
5. **Statutory Business Details**:
   - Legal business entity, GSTIN portal verification, premises lease proof, and `operations@armanobags.com` remain flagged as `[UNCONFIRMED / PENDING CLIENT VERIFICATION]`.
6. **Legal Route Shell Safeguard**:
   - Phase 1 legal pages (`/privacy-policy`, `/terms-and-conditions`, `/cookie-policy`, `/returns-and-refunds`) are implemented strictly as UI structural layout shells featuring clear disclaimers (`[PROPOSED SPECIFICATION / DRAFT SHELL — PENDING FORMAL LEGAL REVIEW & CLIENT SIGN-OFF]`). Unapproved drafts are strictly never represented as final published legal policies.
7. **JavaScript-Only Standard & Ambient Declarations**:
   - All authored application source code is strictly pure JavaScript (`.js`, `.jsx`). No authored TypeScript (`.ts`, `.tsx`, `tsconfig.json`).
   - If the Next.js runtime emits ambient declarations (`next-env.d.ts`) during build/dev, this is handled as an engine-generated declaration artifact and ignored by ESLint (`globalIgnores`), without adding authored TypeScript.

---

## 3. GSD Phase 1 Atomic Task Breakdown

```
Phase 1: Foundation & Core Design System
├── TASK 1.1: Modern Tooling & Application Foundation (Next.js 16, React 19, ESLint 10 Native Flat Config)
├── TASK 1.2: Luxury Design System & Typography Engine (Tailwind v4 @theme, Mulish, Cormorant, JetBrains Mono)
├── TASK 1.3: Evidence-Backed Decoupled Data Layer (AR-001..AR-013 in src/data/)
├── TASK 1.4: Accessible Layout Shell & Reusable UI Primitives (Header, StickyNav, Drawer, Footer)
├── TASK 1.5: Editorial Luxury Homepage Foundation (Hero scaffold, Showcase, Capability Banner)
├── TASK 1.6: Route Skeleton & Informational/Legal Page Shells (/about, /products, /contact, legal shells)
└── TASK 1.7: Code Quality, Accessibility & Production Build Verification (ESLint CLI, npm run build)
```

---

### Task 1.1: Modern Tooling & Application Foundation Setup
- **Objective**: Initialize Next.js 16, React 19, Tailwind CSS v4, PostCSS, and native ESLint 10 flat config in pure JavaScript within the existing folder architecture without deleting or displacing reference assets.
- **Detailed Scope**:
  1. Generate `package.json` with scripts:
     - `"dev": "next dev"`
     - `"build": "next build"`
     - `"start": "next start"`
     - `"lint": "eslint ."` *(using direct ESLint CLI; removed deprecated `next lint`)*
  2. Configure exact dependencies (no caret ranges):
     - `next`: `16.4.3`
     - `react`: `19.3.1`
     - `react-dom`: `19.3.1`
     - `lucide-react`: `1.66.0`
     - `clsx`: `2.1.1`
     - `tailwind-merge`: `3.7.0`
  3. Configure exact devDependencies (no caret ranges):
     - `tailwindcss`: `4.3.3`
     - `@tailwindcss/postcss`: `4.3.3`
     - `postcss`: `8.5.32`
     - `eslint`: `10.14.0`
     - `eslint-config-next`: `16.4.3`
  4. Create `next.config.mjs` configuring proposed HTTP security headers, image domains, and React strict mode. Note: default `next build` emits `.next`. Do not enable `output: "standalone"` automatically for planned Vercel deployments (reserved for self-hosted container environments only).
  5. Create `postcss.config.mjs` registering `@tailwindcss/postcss`.
  6. Create `eslint.config.mjs` following the official Next.js 16 flat config pattern:
     ```javascript
     import { defineConfig, globalIgnores } from 'eslint/config';
     import nextVitals from 'eslint-config-next/core-web-vitals';

     const eslintConfig = defineConfig([
       ...nextVitals,
       globalIgnores([
         '.next/**',
         'out/**',
         'build/**',
         'next-env.d.ts',
       ]),
       {
         rules: {
           'no-console': ['warn', { allow: ['warn', 'error'] }],
           'react/no-unescaped-entities': 'off',
         },
       },
     ]);

     export default eslintConfig;
     ```
  7. Create `jsconfig.json` establishing `@/*` path mapping to `./src/*`.
  8. Freeze dependency tree with `npm install --package-lock-only` to generate `package-lock.json`, enforcing `npm ci` for reproducible installations.
  9. Verify all 70 existing directories (`reference/`, `docs/`, `src/`, `public/`, `tests/`) remain intact.
- **Dependencies**: None.
- **Acceptance Criteria**:
  - `npm run lint` executes using ESLint 10 flat config with 0 errors.
  - `npm run build` compiles clean Next.js 16 App Router bundle into default `.next`.
  - Zero authored TypeScript files (`.ts`, `.tsx`) or `tsconfig.json` are introduced.

---

### Task 1.2: Luxury Design System & Typography Engine (Tailwind v4)
- **Objective**: Configure Tailwind CSS v4 using modern CSS-first `@theme` declarations with the verified *Artisanal Industrial Luxury* design tokens and independent typography font stacks (zero circular variables).
- **Detailed Scope**:
  1. Configure `src/styles/globals.css` with `@import "tailwindcss";` and `@theme` block:
     - Deep Forest Green: `#0A261D` (`--color-primary-900`)
     - Emerald Accent: `#164E3D` (`--color-primary-700`)
     - Champagne Gold: `#C5A059` (`--color-accent-gold`)
     - Warm Gold Light: `#E8D5B5` (`--color-accent-soft`)
     - Warm Alabaster: `#FBF9F5` (`--color-canvas-light`)
     - Soft Parchment: `#F3EFE6` (`--color-canvas-soft`)
     - Obsidian Black: `#121316` (`--color-ink-primary`)
     - Charcoal Slate: `#5A5D64` (`--color-ink-muted`)
     - Display Serif: `--font-serif: var(--font-cormorant, "Cormorant Garamond"), Georgia, serif;`
     - Body Sans: `--font-sans: var(--font-mulish, "Mulish"), system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;`
     - Tabular Mono: `--font-mono: var(--font-jetbrains, "JetBrains Mono"), ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;`
  2. Implement CSS reset, keyframes (subtle pulse, smooth shimmer, marquee translation), and custom scrollbar styling in `src/styles/globals.css`.
  3. Create `src/utils/cn.js` combining `clsx` and `tailwind-merge` for robust dynamic class merging.
  4. Create `src/utils/formatters.js` for formatting SKU numbers, inquiry quantities, and dimension strings.
- **Dependencies**: Task 1.1.
- **Acceptance Criteria**:
  - Utility classes `bg-primary-900`, `text-accent-gold`, `font-serif`, etc., generate properly under Tailwind v4.
  - Zero circular CSS font variables. Font stacks degrade gracefully to standard system monospace/serif/sans fonts.
  - Focus rings (`focus-visible:ring-2 focus-visible:ring-accent-gold`) pass WCAG 2.1 AA 3:1 contrast requirements.

---

### Task 1.3: Evidence-Backed Decoupled Data Layer
- **Objective**: Implement single-source-of-truth JavaScript data stores and query helpers in `src/data/`, adhering strictly to audited facts.
- **Detailed Scope**:
  1. `src/data/products.js`:
     - Master array of all 13 verified items: **`AR-001` through `AR-013`**.
     - Each entry defines: `sku`, `slug`, `title`, `category`, `subcategory`, `observedFinishes`, `brandingOptions`, `provisionalOrderTiers` (`['10,000', '20,000', '50,000']`), `heroImage`, and `is3DEnabled`.
     - Zero unapproved brand logos.
  2. `src/data/categories.js`:
     - Four primary commercial divisions:
       1. `cosmetic-pouches`: Cosmetic & Skincare Pouches
       2. `tote-bags`: Premium Tote Bags & Carry-Alls
       3. `corporate-gifting`: Luxury Gifting & Evening Packaging
       4. `custom-manufacturing`: Bespoke OEM/ODM Packaging
  3. `src/data/brandRegistry.js`:
     - Zero-Trust registry with approval status flags. All 11 visual observation brands initialized with `approvalStatus: "PENDING_APPROVAL"` and `publicationPermissionDocumented: false`.
     - Implement `getApprovedBrands()` filter returning only formally documented entries.
  4. `src/data/navigation.js`:
     - Header mega-menu schema, mobile drawer links, and multi-column B2B footer links.
  5. `src/lib/data.js`:
     - Reusable, pure data query helpers: `getProducts()`, `getProductBySku(sku)`, `getProductBySlug(slug)`, `getProductsByCategory(cat)`, `getCategories()`.
- **Dependencies**: Task 1.1.
- **Acceptance Criteria**:
  - All 13 SKUs strictly match `AR-001` through `AR-013`. Zero instances of `AP-`.
  - Calling `getApprovedBrands()` returns an empty array `[]` (guaranteeing zero trademark leakage).

---

### Task 1.4: Accessible Layout Shell & Reusable UI Primitives
- **Objective**: Build mobile-first, highly accessible presentational primitives and site-wide layout wrappers.
- **Detailed Scope**:
  1. UI Primitives (`src/components/ui/`):
     - `Button.jsx`: Primary (Deep Forest + Gold), Secondary (Outline Parchment), Ghost, and Text variants. Full keyboard focus and active states.
     - `Container.jsx`: Responsive max-width container with consistent editorial padding (`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8`).
     - `Section.jsx`: Semantic `<section>` wrapper with configurable background tokens and spacing.
     - `Badge.jsx`: Micro-status tags (`Provisional`, `Factory Direct`, `Custom OEM`).
     - `Card.jsx`: Surface card with border and elevation hover effect.
  2. Form Primitives (`src/components/forms/`):
     - `InputField.jsx`: Floating label or top-label text input with ARIA invalid states and error message linking.
     - `SelectField.jsx`: Native-backed accessible select dropdown.
     - `TextareaField.jsx`: Multiline technical specification field with character limits.
  3. Layout & Navigation (`src/components/layout/` & `src/components/navigation/`):
     - `Header.jsx`: Sticky backdrop-blurred navigation bar featuring the provisional ARMANO typographic wordmark, desktop navigation links, and "Request Factory Quote" action.
     - `StickyNav.jsx`: Scroll-reactive header wrapper managing scroll direction detection and subtle blur transitions.
     - `MegaMenu.jsx`: Accessible desktop dropdown flyout with category links and packshot preview cards.
     - `MobileDrawer.jsx`: Accessible mobile modal drawer with slide-in animation, inert background focus trapping, and body scroll locking.
     - `Footer.jsx`: Multi-column enterprise footer displaying verified factory location (Sion-Dharavi, Mumbai), telephone (`+91 8591897469`), contact person (Rehan), provisional wordmark, category directories, and statutory compliance links.
- **Dependencies**: Task 1.2.
- **Acceptance Criteria**:
  - Keyboard navigation allows full focus traversal of Header, StickyNav, Drawer, and Footer.
  - Mobile drawer closes on `Escape` keypress and traps focus when open.
  - Minimum tap target size >= 48x48px on all mobile interactive controls.

---

### Task 1.5: Editorial Luxury Homepage Foundation
- **Objective**: Build the initial homepage (`src/app/page.js`) composing editorial narrative sections that wow enterprise procurement buyers without relying on heavy WebGL in Phase 1.
- **Detailed Scope**:
  1. `src/sections/hero/HeroSection.jsx`:
     - Editorial 2D hero composition pairing Cormorant Garamond display typography with studio packshots.
     - Headline: *"Artisanal Precision. Industrial Scale."*
     - Subtitle: *"Direct B2B Manufacturer of Luxury Cosmetic Pouches, Skincare Packaging & Custom OEM Collections in Mumbai."*
     - Dual CTA: *"Explore Catalogue (AR-001 – AR-013)"* & *"Request Custom Quotation"*.
     - Scaffold container prepared for Phase 2 Three.js canvas mount.
  2. `src/sections/home/CategoryShowcaseSection.jsx`:
     - Four-column interactive category showcase spotlighting Cosmetic Pouches, Tote Bags, Corporate Gifting, and Custom OEM Manufacturing.
  3. `src/sections/home/ManufacturingIntroSection.jsx`:
     - "Direct-from-the-Maker" narrative detailing the Mumbai factory floor, zero intermediary markup, custom sizing, and verified craftsmanship.
  4. `src/sections/home/BrandCapabilityBanner.jsx`:
     - Clean visual fallback banner: *"Engineered For Enterprise Beauty & Lifestyle Programmes"*, displaying verified manufacturing capabilities (Direct Factory Pricing, Custom Tooling, High-Volume Assembly) without unauthorized trademarks.
  5. `src/sections/home/B2bCtaSection.jsx`:
     - High-impact inbound anchor directing buyers to the procurement inquiry desk with provisional 10k/20k/50k quantity selectors.
- **Dependencies**: Task 1.3, Task 1.4.
- **Acceptance Criteria**:
  - Page renders cleanly on mobile (360px), tablet (768px), and desktop (1440px).
  - Exactly one `<h1>` tag present on the page.
  - Zero broken image links or placeholder text.

---

### Task 1.6: Route Skeleton & Informational/Legal Page Shells
- **Objective**: Establish foundational route segments with semantic headings, metadata, and breadcrumbs to ensure complete information architecture from Day 1.
- **Detailed Scope**:
  1. Category Pages:
     - `src/app/cosmetic-pouches/page.js`
     - `src/app/tote-bags/page.js`
     - `src/app/corporate-gifting/page.js`
     - `src/app/custom-manufacturing/page.js`
  2. Informational & Procurement Pages:
     - `src/app/about/page.js` (Generational Mumbai craftsmanship story & factory overview)
     - `src/app/products/page.js` (Catalog grid scaffolding displaying AR-001..AR-013)
     - `src/app/contact/page.js` (Factory location block, phone +91 8591897469, contact Rehan, static RFQ form scaffold)
  3. Statutory Compliance Shells *(Provisional UI layout shells only — NOT represented as final published policies)*:
     - `src/app/privacy-policy/page.js` (Draft DPDP Act 2023 policy shell with banner disclaimer)
     - `src/app/terms-and-conditions/page.js` (Commercial B2B terms shell with banner disclaimer)
     - `src/app/cookie-policy/page.js` (Zero tracking disclosure shell with banner disclaimer)
     - `src/app/returns-and-refunds/page.js` (Counter-sampling & defect claims protocol shell with banner disclaimer)
- **Dependencies**: Task 1.4.
- **Acceptance Criteria**:
  - All 12 route pages resolve with HTTP 200 and render cohesive Header and Footer shells.
  - Every page exports unique, descriptive metadata (`title`, `description`).
  - Legal shells display prominent notice: `[PROPOSED SPECIFICATION / DRAFT SHELL — PENDING FORMAL LEGAL REVIEW & CLIENT SIGN-OFF]`.

---

### Task 1.7: Code Quality, Accessibility & Production Build Verification
- **Objective**: Validate the complete application against strict engineering quality, performance, and accessibility benchmarks.
- **Detailed Scope**:
  1. Run `eslint .` via `npm run lint` to enforce zero warnings or errors under ESLint 10 native flat config.
  2. Run `npm run build` to confirm default `.next` bundle compiles cleanly under Next.js 16.
  3. Audit DOM tree for semantic landmarks (`<header>`, `<nav>`, `<main>`, `<section>`, `<footer>`).
  4. Validate all image elements use `next/image` with explicit `width`, `height`, and descriptive `alt` text.
  5. Verify zero authored TypeScript dependencies or leftover boilerplate files.
  6. Confirm `package-lock.json` reproducible install via `npm ci`.
- **Dependencies**: Tasks 1.1 through 1.6.
- **Acceptance Criteria**:
  - Production build generates without errors or dynamic server bailout warnings.
  - Zero console errors or unhandled hydration warnings during development server runtime.

---

## 4. Authoritative Manifest of Planned Deliverables & Generated Artifacts

### 4.1 Authored Application & Configuration Deliverables (Exactly 45 Files)

```
ARMANO/
│
├── [TIER 1: Root Tooling & Path Configuration — 5 Files]
│   ├── package.json                                   # Exact pinned manifest, scripts (npm run lint -> eslint .)
│   ├── next.config.mjs                                # Next.js 16 configuration (default .next build)
│   ├── postcss.config.mjs                             # PostCSS registering @tailwindcss/postcss
│   ├── eslint.config.mjs                              # Native ESLint 10 Flat Config (eslint-config-next/core-web-vitals)
│   └── jsconfig.json                                  # Pure JavaScript path aliases (@/* -> ./src/*)
│
├── [TIER 2: App Router Layout & Segments — 13 Files]
│   ├── src/app/layout.js                              # Root layout, Google Mulish & Cormorant fonts, metadata
│   ├── src/app/page.js                                # Editorial luxury homepage composition
│   ├── src/app/about/page.js                          # Factory heritage & Mumbai infrastructure
│   ├── src/app/products/page.js                       # Master catalog grid shell (AR-001..AR-013)
│   ├── src/app/cosmetic-pouches/page.js               # Cosmetic pouches category landing
│   ├── src/app/tote-bags/page.js                      # Premium tote bags category landing
│   ├── src/app/corporate-gifting/page.js              # Corporate gifting & luxury packaging
│   ├── src/app/custom-manufacturing/page.js           # OEM/ODM manufacturing gateway
│   ├── src/app/contact/page.js                        # Factory contact & RFQ form scaffold
│   ├── src/app/privacy-policy/page.js                 # DPDP Act 2023 draft layout shell (with disclaimer)
│   ├── src/app/terms-and-conditions/page.js           # Commercial B2B contract layout shell (with disclaimer)
│   ├── src/app/cookie-policy/page.js                  # Zero tracking disclosure layout shell (with disclaimer)
│   └── src/app/returns-and-refunds/page.js            # B2B sampling inspection layout shell (with disclaimer)
│
├── [TIER 3: Decoupled Data Layer & Query Helpers — 5 Files]
│   ├── src/data/products.js                           # Master products data store (AR-001..AR-013)
│   ├── src/data/categories.js                         # 4 commercial divisions & taxonomy
│   ├── src/data/brandRegistry.js                      # Zero-Trust brand approval registry (pending approval)
│   ├── src/data/navigation.js                         # Navigation menus & footer link schemas
│   └── src/lib/data.js                                # Reusable pure query helpers (getProducts, etc.)
│
├── [TIER 4: Shared Components & UI Primitives — 13 Files]
│   ├── src/components/ui/Button.jsx                   # Luxury button primitive (Primary, Ghost, Outline)
│   ├── src/components/ui/Container.jsx                # Responsive editorial max-width wrapper
│   ├── src/components/ui/Section.jsx                  # Semantic <section> with padding & tokens
│   ├── src/components/ui/Badge.jsx                    # Micro-status tag (Provisional, Factory Direct)
│   ├── src/components/ui/Card.jsx                     # Surface card with border & subtle lift
│   ├── src/components/forms/InputField.jsx            # Accessible text input with ARIA states
│   ├── src/components/forms/SelectField.jsx           # Accessible dropdown selector
│   ├── src/components/forms/TextareaField.jsx         # Accessible multiline textarea
│   ├── src/components/layout/Header.jsx               # Sticky backdrop-blur header shell
│   ├── src/components/layout/Footer.jsx               # Multi-column B2B enterprise footer
│   ├── src/components/navigation/StickyNav.jsx        # Scroll-reactive navigation controller
│   ├── src/components/navigation/MegaMenu.jsx         # Desktop category flyout with previews
│   └── src/components/navigation/MobileDrawer.jsx     # Accessible mobile slide-in navigation drawer
│
├── [TIER 5: Composed Homepage Sections — 5 Files]
│   ├── src/sections/hero/HeroSection.jsx              # 2D editorial hero scaffold (prepped for Phase 2 3D)
│   ├── src/sections/home/CategoryShowcaseSection.jsx  # 4-division category visual showcase
│   ├── src/sections/home/ManufacturingIntroSection.jsx# Mumbai factory craftsmanship narrative
│   ├── src/sections/home/BrandCapabilityBanner.jsx    # Verified capability banner (clean fallback mode)
│   └── src/sections/home/B2bCtaSection.jsx            # High-conversion RFQ CTA anchor
│
└── [TIER 6: Styles, Utilities & Public Directives — 4 Files]
    ├── src/styles/globals.css                         # Tailwind v4 @import & @theme luxury tokens
    ├── src/utils/cn.js                                # Classnames merge utility (clsx + tailwind-merge)
    ├── src/utils/formatters.js                        # SKU, dimension, and inquiry number formatters
    └── public/robots.txt                              # Search crawler directives
```

**Accurate Tier Calculation Verification**:
$$\mathbf{5 + 13 + 5 + 13 + 5 + 4 = 45\text{ authored deliverable files}}$$

### 4.2 Installation-Generated Artifact Accounting (Separately Accounted)
- **`package-lock.json` (+1 file)**: Generated via `npm install --package-lock-only`, bringing the total project tracking files to **46 files**.
- **`next-env.d.ts` (+1 transient file, optional)**: Ambient declaration file emitted automatically by Next.js engine; ignored by ESLint and git.
- **`node_modules/` & `.next/` (directories)**: Standard dependency and build caches (ignored by git).

---

## 5. Dependencies & Prerequisites

### 5.1 System Environment
- **Node.js**: `v24.21.0` (Active on system)
- **npm**: `v11.19.0` (Active on system)
- **OS**: Windows (PowerShell)

### 5.2 Exact Dependency Manifest (`package.json`)
```json
{
  "name": "armano-website",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "eslint ."
  },
  "dependencies": {
    "clsx": "2.1.1",
    "lucide-react": "1.66.0",
    "next": "16.4.3",
    "react": "19.3.1",
    "react-dom": "19.3.1",
    "tailwind-merge": "3.7.0"
  },
  "devDependencies": {
    "@tailwindcss/postcss": "4.3.3",
    "eslint": "10.14.0",
    "eslint-config-next": "16.4.3",
    "postcss": "8.5.32",
    "tailwindcss": "4.3.3"
  }
}
```

### 5.3 Deterministic Installation Protocol
1. Lockfile creation: `npm install --package-lock-only` generates a frozen `package-lock.json`.
2. Clean installs: `npm ci` is used for all builds to guarantee reproducible installations with 0 version drift.

---

## 6. Comprehensive Acceptance Criteria for Phase 1

1. **Executable Modern Codebase**:
   - `npm run build` succeeds under Next.js 16 with zero compilation errors, emitting the standard `.next` directory. Standalone output (`output: "standalone"`) is disabled for planned Vercel deployments.
   - `npm run lint` executes using native ESLint 10 flat configuration (`eslint-config-next/core-web-vitals` with `defineConfig`/`globalIgnores`) with zero warnings or errors.
2. **Strict Pure JavaScript Architecture**:
   - Exactly 0 authored TypeScript files (`.ts`, `.tsx`, `tsconfig.json`). All application source files use pure ESNext JavaScript (`.js`, `.jsx`). Ambient declaration files (`next-env.d.ts`) emitted automatically by Next.js are allowed but ignored by ESLint. Path aliases configured via `jsconfig.json` (`@/*` -> `./src/*`).
3. **Authoritative SKU Taxonomy**:
   - All catalog entries in `src/data/products.js` use **`AR-001` through `AR-013`**. Zero occurrences of `AP-`.
4. **Trademark Safety**:
   - `getApprovedBrands()` returns an empty array `[]`. Zero unapproved client brand marks mount in the client-side DOM.
5. **Tailwind v4 CSS-First Design System**:
   - Primary Deep Forest Green (`#0A261D`), Champagne Gold (`#C5A059`), and Warm Alabaster (`#FBF9F5`) are configured via `@theme` in `src/styles/globals.css`.
   - Typography font stacks use non-circular definitions with robust system fallbacks.
6. **Responsive Layout Shell**:
   - Sticky Header, StickyNav, Focus-Trapped Mobile Drawer, and Footer function smoothly across 360px to 1920px viewports.
7. **Accessibility Compliance**:
   - WCAG 2.1 AA keyboard focus traversal, visible focus rings, ARIA labels, and minimum 48x48px tap targets.
8. **Informational Route & Legal Shell Integrity**:
   - All 12 route pages resolve with HTTP 200.
   - Legal pages are structured UI layout shells displaying the required draft notice: `[PROPOSED SPECIFICATION / DRAFT SHELL — PENDING FORMAL LEGAL REVIEW & CLIENT SIGN-OFF]`.
9. **Accurate Deliverables Audit**:
   - Exactly **45 authored files** delivered matching Tier 1–6, with `package-lock.json` accounted separately as an installation artifact (totaling 46 tracked root files).

---

## 7. Estimated Complexity & Risk Assessment

- **Complexity Rating**: **Moderate (Level 3 of 5)**  
  *(Modern Next.js 16 setup, Tailwind v4 CSS-first theming, accessible UI primitives, and static data structuring without 3D WebGL or backend databases).*
- **Identified Risks & Mitigations**:
  - *Risk 1 (Tailwind v4 Deprecated Syntax)*: Completely avoided legacy `tailwind.config.js` and `@tailwind` directives. Utilized modern `@import "tailwindcss";` and `@theme` directives directly in CSS.
  - *Risk 2 (ESLint 10 Flat Config)*: Direct import of `eslint-config-next/core-web-vitals` with `defineConfig` in `eslint.config.mjs` avoids brittle compat wrappers.
  - *Risk 3 (Deployment Output Mismatch)*: Maintained default Next.js build output for Vercel, omitting unnecessary `output: "standalone"`.
  - *Risk 4 (Reference Asset Safety)*: Strict read-only enforcement for `reference/` directory. Zero files moved or modified.

---

## 8. Principal Architect Recommendation & Blocker Status

The modernized GSD Phase 1 execution plan is **thorough, technically synchronized with current stable releases, factually validated, and free of any architectural blockers**.

> **STRICT EXECUTION RULE ENFORCED**:  
> No packages have been installed, no Next.js project has been initialized, and no application source code files have been written.

**Zero planning blockers remain. Execution is paused and ready to proceed upon approval.**
