# ARMANO V5 — Cinematic Motion Design System & Architectural Specification

**Document Reference**: `ARMANO-DOC-V5-001`  
**Date**: November 6, 2026  
**Role**: Creative Director, Award-Level Web Experience Designer & Senior Three.js Developer  
**System Status**: Release V5 Motion System Baseline  
**Governing Mandates**: Quiet Luxury Editorial Aesthetics, Zero Layout Shift, 60/120fps GPU Acceleration, Full Accessibility  

---

## 1. Executive Summary & Philosophy

ARMANO V5 elevates the digital flagship into a sophisticated, cinematic, product-led B2B manufacturer experience. 

Inspired by high-fashion editorial benchmarks (such as LEMAIRE and luxury cosmetic packaging identities by Lavernia & Cienfuegos), the motion system avoids flashy or gratuitous animation in favour of **negative space, restrained choreography, and tactile physical feedback**.

```
====================================================================================================
ARMANO V5 MOTION SYSTEM SPECIFICATION
====================================================================================================
1. Primary Motion Language:          Quiet Luxury Editorial (Decelerated Decrescendo)
2. Rendering Architecture:           GPU-Accelerated CSS Transforms (3D Matrix) + Three.js WebGL
3. Scroll Intersection Engine:       Passive IntersectionObserver with Threshold & RootMargin
4. WebGL Camera Choreography:        Cinematic Entrance Rig (Lerped Camera Deceleration)
5. Zero Hydration Mismatch:          Strict SSR/Client Alignment, No Layout Shifts
6. Accessibility Governance:         100% prefers-reduced-motion Compliance (Instant Bypass)
7. Off-Screen Execution State:       WebGL Paused When Scrolled Off-Screen (0% Idle GPU Waste)
====================================================================================================
```

---

## 2. Motion System Foundations & Tokens (Task 1)

### 2.1 Choreography Timings
All motion timings are centralized in `src/utils/motion.js` and harmonized across components:

| Token | Duration | Use Case |
| :--- | :--- | :--- |
| `MOTION_TIMINGS.micro` | `180ms` | Swatch selections, button active scales, radio toggles |
| `MOTION_TIMINGS.fast` | `280ms` | Filter pill changes, dropdown disclosures, search clears |
| `MOTION_TIMINGS.medium` | `520ms` | Card elevation, gallery thumbnail switches, drawer slides |
| `MOTION_TIMINGS.slow` | `840ms` | Editorial section entries, narrative text reveals |
| `MOTION_TIMINGS.cinematic` | `1200ms` | Hero 3D camera drift, image uncurling, sequence transitions |

### 2.2 Cubic-Bezier Easing Curves
We implement custom high-fashion and luxury easing curves in `src/styles/globals.css`:
- **Editorial Deceleration (`--ease-editorial`)**: `cubic-bezier(0.16, 1, 0.3, 1)`  
  *Characteristics*: Instant subtle acceleration with a long, unhurried, luxurious deceleration tail.
- **Quiet Luxury (`--ease-luxury`)**: `cubic-bezier(0.22, 1, 0.36, 1)`  
  *Characteristics*: Balanced, organic, frictionless momentum without mechanical bounce.
- **Snappy Micro-Interaction (`--ease-snappy`)**: `cubic-bezier(0.4, 0, 0.2, 1)`  
  *Characteristics*: Crisp tactile response for buttons, focus rings, and switches.

---

## 3. Cinematic 3D Hero Enhancement (Task 3)

The procedural Three.js pouch geometry and authentic material swatches have been preserved and enhanced through three cinematic dimensions:

### 3.1 Smooth Camera Easing Rig (`HeroCameraRig`)
Rather than snapping abruptly to its viewing angle, a dedicated camera controller interpolates the viewport camera:
- **Mount Coordinates**: `[0, 0.35, 5.3]` (elevated, slightly zoomed perspective).
- **Target Coordinates**: `[0, 0.15, 4.8]` (optimal 3/4 volumetric packaging view).
- **Easing**: Exponential decay lerp (`delta * 2.2`), ensuring an unhurried, graceful descent into the scene over the first 1.8 seconds.

### 3.2 Controlled Luxury Idle Motion
In `src/components/3d/QuiltedPouchMesh.jsx`, the idle floating physics were refined to simulate slow-motion studio filming:
- **Floating Altitude**: `Math.sin(t * 0.85) * 0.035` (reduced frequency from `1.2` for smoother breathing).
- **Volumetric Roll**: `Math.sin(t * 0.45) * 0.012`.
- **Zipper Pull Tab Physics**: `pullTabRef.current.rotation.z = -0.22 + Math.sin(t * 1.1) * 0.04`, creating organic inertia as the pouch breathes.

### 3.3 Dynamic Material Lighting Transitions
In `src/components/3d/Hero3DCanvas.jsx`, `SceneLighting` dynamically adapts to the selected swatch:
- For dark substrates (*Noir Charcoal*, *Forest Green*), ambient light increases to `1.05`, and champagne rim illumination is boosted to `3.0` to accentuate the zipper track and pebble-grain leatherette ridges.
- For light substrates (*Vanilla Cream*, *Champagne Blush*), key light casts soft, warm studio shadows onto the ivory floor.

---

## 4. Homepage Cinematic Choreography (Task 2 & Task 6)

1. **Hero Staggered Entrance**:
   - Eyebrow badge reveals upwards (`translateY(8px) -> 0`, `opacity: 0 -> 1`).
   - Main headline lines reveal through an editorial mask slide (`variant="mask-slide"`).
   - Paragraph narrative and dual CTAs fade in with staggered timing (`60ms`, `140ms`, `260ms`, `380ms`).
   - Specifications checklist anchors the B2B proposition with subtle gold checkmarks.

2. **Category Showcase & Mask Reveals**:
   - Clean 4-division editorial grid with `EditorialReveal` stagger (`idx * 120ms`).
   - Image containers uncurl with `luxury-image-zoom` (`scale-100 -> scale-105` on hover) over 700ms.
   - Minimal atelier card features subtle technical realization narrative with animated gold pulse indicator.

3. **Micro-Interactions**:
   - **Sticky Navigation**: Smooth background blur transition (`backdrop-blur-md`) activating seamlessly when scrolled > 20px.
   - **Mega Menu**: Smooth slide-down and fade-in flyout with backdrop blur.
   - **Mobile Drawer**: Hardware-accelerated slide-in (`translate-x-0`) with keyboard focus trapping.
   - **Buttons & CTAs**: Tactile micro-scale (`active:scale-[0.98]`) with smooth arrow translations (`group-hover:translate-x-1`).

---

## 5. Verified Editorial Manufacturing Storytelling (Task 5)

In `src/sections/home/ManufacturingIntroSection.jsx`, the manufacturing section was elevated into an editorial visual sequence inspired by high-end packaging ateliers:

```
[PHASE 01: TECH-PACK]       CAD Pattern Grading & Panel Scaling
                           Visual Evidence: Authentic Mumbai Workshop Bench (AR-013-workbench.png)
[PHASE 02: SUBSTRATES]      Curated Synthetic Leatherettes & Gold Zipper Hardware
                           Visual Evidence: Black Velvet Evening Clutch (sample-velvet-clutch.png)
[PHASE 03: SAMPLING]        Physical Counter-Sample Buyer Inspection & Sign-off
                           Visual Evidence: AR-009 Quilted Puffer Volume Pouch (AR-009.png)
[PHASE 04: CONTRACT RUNS]   Direct Sion-Dharavi Workshop Execution for 10k / 20k / 50k Tiers
```

**Zero Unsupported Claims**: All steps strictly reflect verified factory realities. No unverified machinery, lab tests, or trademarked client logos are displayed.

---

## 6. Product Catalogue & Detail Interactions (Task 4)

- **Uniform 4:3 Frames**: Packshots sit on warm ivory stages (`#FAF8F5`) with `object-contain p-6` preserving all silhouettes, straps, and hardware.
- **Card Hover Physics**: `luxury-card-hover` lifts cards by `-4px` with `--shadow-luxury` without layout shift.
- **Search & Filter Transitions**: Instant keyword filtering with smooth fade-in transitions.
- **Touchscreen Usability**: Zero 3D gyroscope or tilt effects that could interfere with mobile scrolling.
- **Product Gallery**: Smooth cross-fade (`duration-300`) when toggling between multi-angle packshots.

---

## 7. Accessibility & Performance Governance (Task 7 & Task 8)

### 7.1 `prefers-reduced-motion` Architecture
- **Global CSS**:
  ```css
  @media (prefers-reduced-motion: reduce) {
    *, ::before, ::after {
      animation-duration: 0.01ms !important;
      transition-duration: 0.01ms !important;
      scroll-behavior: auto !important;
    }
  }
  ```
- **JavaScript Hooks**: `useScrollReveal` and `Hero3DCanvas` check `getPrefersReducedMotion()`. When detected, all components initialize directly in their fully revealed, stationary states.

### 7.2 WebGL Performance & Off-Screen Lifecycle
- `Hero3DCanvas` attaches a passive `IntersectionObserver` with `rootMargin: '100px'`.
- When the 3D hero scrolls out of view, WebGL execution halts completely, eliminating GPU heat, battery drain, and idle compute overhead on mobile devices.

---

*Specification authored and certified for ARMANO Release V5.*

