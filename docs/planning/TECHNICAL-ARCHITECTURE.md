# ARMANO — Technical Architecture & Full-Stack Specification

**Document Status**: Implementation-Ready Engineering Blueprint (Final ESLint 10 & Lockfile Accounting Pass)  
**Primary Stack**: Next.js 16 App Router (`next@16.4.3`), React 19 (`react@19.3.1`), React DOM (`react-dom@19.3.1`), JavaScript ESNext (strictly no authored TypeScript), Tailwind CSS v4 (`tailwindcss@4.3.3`), `@tailwindcss/postcss@4.3.3`, PostCSS (`postcss@8.5.32`), ESLint 10 (`eslint@10.14.0`, Official Flat Config via `eslint-config-next@16.4.3`), Node.js 24 (`v24.21.0`), `npm ci` reproducible install  
**Performance Budget**: Core Web Vitals Pass (LCP < 2.5s, INP < 200ms, CLS < 0.1)  
**Compatibility Report Reference**: [`DEPENDENCY-COMPATIBILITY-REPORT.md`](file:///c:/Users/AFFAN%20KHAN/OneDrive/Desktop/ARMANO/docs/planning/DEPENDENCY-COMPATIBILITY-REPORT.md)  
**Execution Plan Reference**: [`PHASE-1-EXECUTION-PLAN.md`](file:///c:/Users/AFFAN%20KHAN/OneDrive/Desktop/ARMANO/docs/planning/PHASE-1-EXECUTION-PLAN.md)  

---

## 1. Modern Technology Stack Matrix & Architectural Rationale

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                       ARMANO CORE TECHNOLOGY MATRIX                         │
├─────────────────────┬──────────────────────┬────────────────────────────────┤
│ Layer / Capability  │ Exact Pinned Ver.    │ Technical & Architectural Rationale│
├─────────────────────┼──────────────────────┼────────────────────────────────┤
│ **Application FW**  │ Next.js 16.4.3       │ Modern App Router, hybrid SSR/ │
│                     │                      │ SSG, streaming server rendered │
│                     │                      │ segments. Default .next output.│
├─────────────────────┼──────────────────────┼────────────────────────────────┤
│ **UI Library**      │ React 19.3.1         │ React Server Components,       │
│                     │ & React DOM 19.3.1   │ enhanced hydration, Actions,   │
│                     │                      │ high-performance V8 execution. │
├─────────────────────┼──────────────────────┼────────────────────────────────┤
│ **Language Model**  │ Pure JavaScript      │ Strictly no authored TS. Clean │
│                     │ (ESNext / JSX)       │ `jsconfig.json` path aliasing  │
│                     │                      │ (`@/*` -> `./src/*`).          │
├─────────────────────┼──────────────────────┼────────────────────────────────┤
│ **Styling Engine**  │ Tailwind CSS 4.3.3   │ CSS-first `@theme` tokens in   │
│                     │ + @tailwindcss/      │ `src/styles/globals.css`. Zero │
│                     │ postcss (4.3.3)      │ legacy `tailwind.config.js`.   │
├─────────────────────┼──────────────────────┼────────────────────────────────┤
│ **Linter & Quality**│ ESLint 10.14.0       │ Official ESLint 10 flat config │
│                     │ + eslint-config-next │ (`eslint.config.mjs`) direct   │
│                     │ (16.4.3)             │ import. CLI: `eslint .`.       │
├─────────────────────┼──────────────────────┼────────────────────────────────┤
│ **Runtime Platform**│ Node.js 24 (LTS)     │ Modern V8 runtime, native      │
│                     │ npm v11.19.0         │ fetch, WebStreams, speed.      │
├─────────────────────┼──────────────────────┼────────────────────────────────┤
│ **Iconography**     │ lucide-react 1.66.0  │ Accessible tree-shakeable SVG  │
│                     │                      │ icons with React 19 support.   │
├─────────────────────┼──────────────────────┼────────────────────────────────┤
│ **Class Utilities** │ clsx 2.1.1 +         │ Dynamic utility class merging  │
│                     │ tailwind-merge 3.7.0 │ without runtime overhead.      │
├─────────────────────┼──────────────────────┼────────────────────────────────┤
│ **3D Engine**       │ Three.js + R3F       │ WebGL 2.0 hardware-accelerated │
│ *(Phase 2)*         │ (`@react-three/...`) │ declarative 3D canvas pipeline.│
├─────────────────────┼──────────────────────┼────────────────────────────────┤
│ **3D Abstractions** │ Drei                 │ Production-tested canvas tools │
│ *(Phase 2)*         │ (`@react-three/drei`)│ (OrbitControls, Stage, Float). │
├─────────────────────┼──────────────────────┼────────────────────────────────┤
│ **Advanced Motion** │ GSAP + ScrollTrigger │ Timeline-based scroll rigging, │
│ *(Phase 2)*         │                      │ smooth scrub, camera dollies.  │
├─────────────────────┼──────────────────────┼────────────────────────────────┤
│ **UI Transitions**  │ Framer Motion        │ Declarative layout animations, │
│ *(Phase 2)*         │                      │ spring physics, modal drawers. │
└─────────────────────┴──────────────────────┴────────────────────────────────┘
```

---

## 2. Tailwind CSS v4 CSS-First Styling Architecture

Tailwind CSS v4 introduces a fundamental shift away from JavaScript-based configuration (`tailwind.config.js`) to a pure **CSS-first architecture**.

### 2.1 PostCSS Integration (`postcss.config.mjs`)
The application utilizes `@tailwindcss/postcss` for seamless CSS compilation:
```javascript
export default {
  plugins: {
    '@tailwindcss/postcss': {},
  },
};
```

### 2.2 Design Token Registry (`src/styles/globals.css`)
All brand tokens, color palettes, and typography tokens are declared directly in CSS via the `@theme` directive, maintaining complete continuity with the approved ARMANO luxury design direction. Circular variables have been completely eliminated in favor of clean, independent font stacks:
```css
@import "tailwindcss";

@theme {
  /* Brand Primary Colors */
  --color-primary-900: #0A261D; /* Deep Forest Green */
  --color-primary-800: #0F382B;
  --color-primary-700: #164E3D; /* Emerald Accent */

  /* Luxury Metallic Accents */
  --color-accent-gold: #C5A059; /* Champagne Gold */
  --color-accent-soft: #E8D5B5; /* Warm Gold Light */
  --color-accent-dark: #8C6F34;

  /* Editorial Canvas & Surfaces */
  --color-canvas-light: #FBF9F5; /* Warm Alabaster */
  --color-canvas-soft: #F3EFE6;  /* Soft Parchment */
  --color-canvas-card: #FFFFFF;

  /* Typography Colors */
  --color-ink-primary: #121316; /* Obsidian Black */
  --color-ink-muted: #5A5D64;   /* Charcoal Slate */
  --color-ink-light: #94969C;

  /* Typography Stacks (Non-Circular with Graceful Fallbacks) */
  --font-serif: var(--font-cormorant, "Cormorant Garamond"), Georgia, serif;
  --font-sans: var(--font-mulish, "Mulish"), system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  --font-mono: var(--font-jetbrains, "JetBrains Mono"), ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
}
```

---

## 3. Tooling, Linting & Path Resolution Architecture

### 3.1 Official ESLint 10 Flat Configuration (`eslint.config.mjs`)
Next.js 16 completely removed the legacy `next lint` wrapper. All linting is executed directly using standard `eslint .`.

Using ESLint 10's official `defineConfig` and `globalIgnores` from `'eslint/config'`, combined with `eslint-config-next/core-web-vitals`:
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

### 3.2 Pure JavaScript Path Resolution (`jsconfig.json`)
To preserve the client constraint of strictly **no authored TypeScript** while maintaining clean, maintainable imports, `jsconfig.json` provides IDE and Next.js resolution:
```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "exclude": ["node_modules", ".next"]
}
```

### 3.3 Authoritative Exact NPM Toolchain Manifest (`package.json`)
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

### 3.4 Reproducible Installation Protocol & Generated Artifact Accounting
- **`package-lock.json`**: Generated via `npm install --package-lock-only`, bringing total root tracking files to 46.
- **Strict Installs**: All automated builds and local environments must execute via `npm ci` for bit-for-bit reproducible installs without version drift.
- **Framework Declarations**: If Next.js automatically emits `next-env.d.ts`, this is recognized as an engine-generated ambient declaration and ignored by ESLint; no authored TypeScript is introduced.

### 3.5 Build Output Architecture
- Standard `next build` emits the default `.next` build directory.
- `output: "standalone"` is reserved strictly for self-hosted containerized Docker/Node.js deployments and is **not** enabled automatically for planned Vercel deployments, which natively handle and optimize standard Next.js build artifacts.

---

## 4. Content Management & Decoupled Data Architecture

We evaluated three potential content management architectures to balance client editing needs against maintenance complexity and infrastructure costs:

| Architecture | Description | Pros | Cons | Recommendation |
| :--- | :--- | :--- | :--- | :--- |
| **Option A: Headless Cloud CMS** *(Sanity / Contentful)* | External cloud-hosted API for content | Friendly web UI for non-technical staff | Adds monthly subscription costs, external API dependency, network latency | *Recommended for Phase 3 (Future Scale)* |
| **Option B: Self-Hosted CMS** *(Strapi / Directus)* | Node.js backend with database | Full data ownership | Requires database hosting, security patching, server maintenance | *NOT Recommended (Excessive overhead)* |
| **Option C: Decoupled Data Modules** | Structured JavaScript data modules in `src/data/` | **Zero hosting cost**, zero runtime lag, Git-versioned, instant builds, 100% stable | Non-technical staff must edit structured files or use Git | **SELECTED ARCHITECTURE FOR PHASE 1–2** |

### 4.1 Implementation Strategy & Data Store Specifications
- **Phase 1 & 2**: All products, categories, navigation, and brand records are stored in clean, typed JSDoc JavaScript files inside `src/data/`:
  - `src/data/products.js`: Master store for all 13 verified items (**`AR-001` through `AR-013`**). Zero unapproved client brand logos. Provisional quantity options (`['10,000', '20,000', '50,000']`).
  - `src/data/categories.js`: 4 primary commercial divisions (`cosmetic-pouches`, `tote-bags`, `corporate-gifting`, `custom-manufacturing`).
  - `src/data/brandRegistry.js`: Zero-Trust brand approval registry. All 11 observed brand marks initialized with `approvalStatus: "PENDING_APPROVAL"`. `getApprovedBrands()` returns `[]` until formal written consent is filed.
  - `src/data/navigation.js`: Header mega-menu, mobile drawer, and multi-column footer navigation schemas.
- **Decoupled Service Layer (`src/lib/data.js`)**: All UI components consume data exclusively through service helper functions (`getProducts()`, `getProductBySku(sku)`, `getProductBySlug(slug)`, `getProductsByCategory(category)`).
- **Zero-Friction Upgrade Path**: When the client requests a dedicated visual dashboard later, swapping the local data helper to query Sanity or an API requires **zero modifications** to the UI components.

---

## 5. High-Volume Email Delivery Architecture (Phase 3 Specification)

The RFQ engine handles high-value commercial quotations. Email delivery must be 100% reliable with zero deliverability loss:

| Provider | Evaluation & Fit | Architecture Decision |
| :--- | :--- | :--- |
| **Resend (Recommended)** | Modern, developer-first transactional email API with React Email templates, exceptional inbox delivery, built-in DKIM/SPF verification. | **Primary Choice**: Clean REST API, zero SMTP connection hangs in serverless functions. |
| **SendGrid** | Enterprise standard, but complex dashboard and stringent IP warming requirements for new domains. | Secondary Fallback. |
| **Nodemailer (SMTP)** | Standard SMTP transport over TLS. | Fallback option if client insists on utilizing their existing Google Workspace or cPanel mail server. |

*Note: All email endpoints and serverless functions (`/api/enquiry`) are deferred to Phase 3.*

---

## 6. 3D WebGL Rendering Pipeline & Memory Management (Phase 2 Specification)

Interactive 3D web experiences can cause mobile browser crashes and high memory consumption if not architected with strict lifecycle controls. Phase 2 will implement the following pipeline:

```
[User Lands on Page] 
         │
         ▼
[Detect WebGL Support & Hardware Tier]
   ├── Lower Tier / Mobile: Render Optimized Sprite / Packshot Hero
   └── High Tier: Initialize React Three Fiber Canvas
         │
         ▼
[Progressive Asset Loading via Suspense]
   ├── Display Lightweight 2D Skeleton / Editorial Content
   └── Stream Compressed .glb Model (Draco / Meshopt Decimation)
         │
         ▼
[Active 3D Scene Viewport]
   ├── Render Loop (useFrame) Active
   ├── Damped Pointer Parallax Active
   └── Swatch Switcher Mutates Material Shaders in RAM
         │
         ▼
[Intersection Observer Event: Canvas Scrolls Out of View]
   └── Render Loop PAUSED Immediately (0% GPU Utilization)
```

*Note: 3D canvas and WebGL loaders are deferred to Phase 2.*

---

## 7. Architectural Directory Boundaries & Manifest (Exactly 45 Authored Files)

The codebase enforces strict functional boundaries across 6 tiers totaling **exactly 45 authored files** ($5 + 13 + 5 + 13 + 5 + 4 = 45$):

- **`src/app/` (13 files)**: Next.js 16 App Router route segments (`layout.js`, `page.js`, 4 category pages, 3 informational pages, and 4 statutory compliance layout shells).
  - *Statutory Compliance Layout Shells*: `/privacy-policy`, `/terms-and-conditions`, `/cookie-policy`, and `/returns-and-refunds` are implemented strictly as UI layout shells featuring clear disclaimers (`[PROPOSED SPECIFICATION / DRAFT SHELL — PENDING FORMAL LEGAL REVIEW & CLIENT SIGN-OFF]`). Unapproved drafts are strictly never represented as final published policies.
- **`src/components/ui/` (5 files)**: Pure presentational primitives (`Button.jsx`, `Container.jsx`, `Section.jsx`, `Badge.jsx`, `Card.jsx`) with zero business logic.
- **`src/components/forms/` (3 files)**: Accessible form controls (`InputField.jsx`, `SelectField.jsx`, `TextareaField.jsx`).
- **`src/components/layout/` (2 files)**: Shell components (`Header.jsx`, `Footer.jsx`).
- **`src/components/navigation/` (3 files)**: Navigation controls (`StickyNav.jsx`, `MegaMenu.jsx`, `MobileDrawer.jsx`).
- **`src/sections/` (5 files)**: Composed visual page sections (`HeroSection.jsx`, `CategoryShowcaseSection.jsx`, `ManufacturingIntroSection.jsx`, `BrandCapabilityBanner.jsx`, `B2bCtaSection.jsx`).
- **`src/features/three-d/`**: Isolated Three.js canvas, shaders, camera rigs, and 3D controls (Scheduled for Phase 2).
- **`src/features/enquiry/`**: RFQ state machine, multi-step quotation form, validation, and submission logic (Scheduled for Phase 3).
- **`src/data/` (4 files)**: Centralized, single-source-of-truth static data stores (`products.js`, `categories.js`, `brandRegistry.js`, `navigation.js`).
- **`src/lib/` (1 file)**: Pure service query helpers (`data.js`).
- **`src/utils/` (2 files)**: Shared helper functions (`cn.js`, `formatters.js`).
- **`src/styles/` (1 file)**: Global styles and Tailwind v4 CSS-first design tokens (`globals.css`).
- **`public/` (1 file)**: Search crawler directives (`robots.txt`).
- **Root Tooling (5 files)**: `package.json`, `next.config.mjs`, `postcss.config.mjs`, `eslint.config.mjs`, `jsconfig.json`.
- **`reference/`**: Read-only client assets (PDF, video, 36 packshots). Strictly immutable.
- **`docs/`**: Comprehensive engineering, legal, architectural, and planning documentation.
