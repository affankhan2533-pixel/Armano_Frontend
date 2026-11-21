# ARMANO — Visual Identity & Brand Design Direction

**Document Status**: Implementation-Ready Creative Direction  
**Aesthetic Theme**: *Artisanal Industrial Luxury* — Where Mumbai’s generational leathercraft mastery converges with Swiss/Nordic editorial minimalism.  
**Strict Rule**: No final logo is committed. A provisional typographic wordmark is established until the client formally supplies and approves vector brand assets.

---

## 1. Creative Philosophy & Strategic Vision

Traditional B2B manufacturing websites often suffer from utilitarian drabness—overloaded with clip-art icons, harsh blues, cluttered specification tables, and low-res factory photos. 

ARMANO’s digital flagship takes the opposite approach: **High-Aesthetic Editorial Presence**.
The visual language communicates authority, precision, and luxury manufacturing capability. It reassures prestige beauty brand executives that ARMANO understands luxury packaging aesthetics, material tactility, and flawless execution.

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                       ARMANO BRAND PILLARS & ESSENCE                        │
├─────────────────────┬─────────────────────┬─────────────────────────────────┤
│ ARTISANAL MASTERY   │ INDUSTRIAL SCALE    │ BESPOKE FIDELITY                │
│ Generational        │ High-volume batch   │ Tailored private label          │
│ craftsmanship and   │ inquiries for       │ programs matching global beauty │
│ hand-finished detail│ 10k–50k+ scales     │ packaging standards             │
└─────────────────────┴─────────────────────┴─────────────────────────────────┘
```

---

## 2. Color System & Architectural Tokens

The palette balances grounding organic earth tones with refined metallic accents and airy, warm editorial neutrals:

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                            ARMANO COLOR PALETTE                             │
├───────────────────┬───────────┬──────────────┬──────────────────────────────┤
│ Token Name        │ Hex Code  │ Tailwind Var │ Application & Usage          │
├───────────────────┼───────────┼──────────────┼──────────────────────────────┤
│ Deep Forest Green │ `#0A261D` │ `primary-900`│ Primary dark mode, hero      │
│                   │           │              │ backgrounds, footer bedrock  │
├───────────────────┼───────────┼──────────────┼──────────────────────────────┤
│ Emerald Accent    │ `#164E3D` │ `primary-700`│ Interactive states, cards,   │
│                   │           │              │ subtle gradient highlights   │
├───────────────────┼───────────┼──────────────┼──────────────────────────────┤
│ Champagne Gold    │ `#C5A059` │ `accent-gold`│ Metallic accents, keylines,  │
│                   │           │              │ luxury badges, primary CTAs  │
├───────────────────┼───────────┼──────────────┼──────────────────────────────┤
│ Warm Gold Light   │ `#E8D5B5` │ `accent-soft`│ Hover states, subtle borders │
├───────────────────┼───────────┼──────────────┼──────────────────────────────┤
│ Warm Alabaster    │ `#FBF9F5` │ `canvas-light│ Clean light-mode background, │
│                   │           │              │ editorial white space        │
├───────────────────┼───────────┼──────────────┼──────────────────────────────┤
│ Soft Parchment    │ `#F3EFE6` │ `canvas-soft`│ Card surfaces, spec tables   │
├───────────────────┼───────────┼──────────────┼──────────────────────────────┤
│ Obsidian Black    │ `#121316` │ `ink-primary`│ High-contrast headings, body │
│                   │           │              │ typography on light grounds  │
├───────────────────┼───────────┼──────────────┼──────────────────────────────┤
│ Charcoal Slate    │ `#5A5D64` │ `ink-muted`  │ Secondary metadata, captions │
└───────────────────┴───────────┴──────────────┴──────────────────────────────┘
```

---

## 3. Typography Architecture

The typographic hierarchy pairs high-fashion serif elegance with ultra-clean geometric sans-serif clarity:

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                           TYPOGRAPHY HIERARCHY                              │
├───────────────────┬──────────────────────────┬──────────────────────────────┤
│ Role              │ Typeface Family          │ Architectural Usage          │
├───────────────────┼──────────────────────────┼──────────────────────────────┤
│ Display / Brand   │ **Cormorant Garamond**   │ Editorial headlines, hero    │
│ Wordmark          │ *(Provisional)* /        │ titles, section openers      │
│                   │ **Playfair Display**     │ (Refined high-fashion serif) │
├───────────────────┼──────────────────────────┼──────────────────────────────┤
│ Body / UI / Specs │ **Mulish**               │ Navigation, technical specs, │
│                   │ *(Direct modern evolution│ RFQ forms, body paragraphs   │
│                   │   of Muli from PDF)*     │ (Maximum legibility)         │
├───────────────────┼──────────────────────────┼──────────────────────────────┤
│ Technical Numbers │ **Mulish Tabular** /     │ Sizing, quantities, SKU IDs, │
│                   │ JetBrains Mono           │ dimension charts             │
└───────────────────┴──────────────────────────┴──────────────────────────────┘
```

---

## 4. Provisional Wordmark Specification

Until the client provides and signs off on the official vector brand logo:
- **Treatment**: Clean, tracking-spaced typographic wordmark:
  ```
  A  R  M  A  N  O
  M U M B A I
  ```
- **Styling**: `font-serif text-2xl tracking-[0.35em] uppercase font-medium`
- **Sub-tag**: `text-[10px] tracking-[0.45em] uppercase text-accent-gold`
- **Rule**: Never stretch, distort, or create arbitrary graphic logos that misrepresent the client's official trademark.

---

## 5. UI Layout, Spacing & Motion Guidelines

1. **Generous Negative Space**: Layouts use breathing room (`py-24`, `py-32` on desktop) to evoke quiet luxury.
2. **Subtle Surface Depth**: Avoid heavy drop-shadows. Utilize delicate 1px keyline borders (`border-ink-primary/10` or `border-accent-gold/20`) and soft blurred backdrops (`backdrop-blur-md`).
3. **Restrained Motion Language**:
   - Page transitions: Smooth fade-ins (`opacity: 0` to `1` over 0.6s with cubic-bezier easing).
   - Card hovers: Subtle 4px elevation lift and 1.02x scale with buttery smooth spring physics.
   - Interactive 3D: Damped inertia camera controls without sudden snapping.
4. **Mobile Usability Focus**:
   - Minimum tap target size of **48x48px** for all interactive buttons and filters.
   - Fixed, high-accessibility bottom navigation drawer for rapid RFQ initiation on smartphones.
