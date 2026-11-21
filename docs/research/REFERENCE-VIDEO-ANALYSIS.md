# ARMANO — Reference Video Analysis & 3D Experience Blueprint

**Document Status**: Implementation-Ready 3D Architectural Blueprint  
**Media Source**: `reference/videos/WhatsApp Video 2026-11-01 at 8.37.06 PM.mp4`  
**Video Characteristics**: MP4 container, H.264/AAC, 2.37s duration, 48kHz audio  

---

## 1. Visual Scene Breakdown & Creative Anatomy

The supplied reference video features a web design showcase created for a luxury apparel/accessories brand ("Monet Maison"), curated by digital product creators to demonstrate high-converting 3D WebGL user experiences.

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                      REFERENCE VIDEO SCENE COMPOSITION                      │
├─────────────────────────────────────────────────────────────────────────────┤
│  [Top Navigation: Logo Left | Centered Nav Links | Utility / Cart Right]    │
│                                                                             │
│  [Left Editorial Column]               [Center 3D Stage]       [Right Rail] │
│  "Stand out                           ╭─────────────────╮      $149 ($199)  │
│   Without trying"                     │  3D Puffer Bag  │      Color Variant│
│  "Crafted from premium nylon with     │  Floating Model │      Thumbnails:  │
│   cloud-like insulation. Designed     │  Subtle Idle    │      [Orange]     │
│   to elevate everyday style..."       │  Breathing /    │      [Black]      │
│  [Button: Explore Collection]         │  Mouse Follow   │      [Sage]       │
│                                       ╰─────────────────╯                   │
│                                         [Contact Shadow]                    │
│                                                                             │
│  [Bottom Left: Socials]             "Confidence, wrapped in warmth"         │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 1.1 Core Visual Observations from the Reference
1. **Product-Centric Hero Viewport**: The product is elevated into an interactive art piece rather than a static 2D photograph.
2. **Warm Studio Lighting & Specular Highlights**: A cinematic warm amber/terracotta backdrop with soft gradient vignetting that matches the product tone. Highlights dance across the pillowy contours of the puffer material as it rotates.
3. **Interactive Variant Transitions**: Clicking different color/material thumbnails on the right panel smoothly updates the 3D model’s shaders without page reloads or scene stutter.
4. **Minimalist Editorial Framing**: Crisp typography surrounds the viewport, using luxury whitespace and clear hierarchy rather than cluttered badges.

---

## 2. Creative & Technical Translation for ARMANO

In the reference video, the product showcased is a puffy insulated jacket/bag. In ARMANO’s real-world product catalog, **`image copy 19.png` (Neon Green Grid Puffer)** and **`image copy 20.png` (Electric Orange Ribbed Puffer)** represent direct real-world counterparts to this exact visual aesthetic!

### 2.1 The ARMANO 3D Hero Concept: "The Architectural Pouch"
We will architect a flagship Three.js / React Three Fiber (R3F) interactive hero for ARMANO:

- **Centerpiece Geometry**: A high-fidelity, physically based 3D model of a signature ARMANO cosmetic pouch featuring:
  - Realistic quilted pillow channels with micro-surface wrinkles.
  - Metallic zipper teeth with reflective brass/gold shaders.
  - Custom branded puller charm and precision perimeter stitching.
  - Subtle fabric grain normal map (reflecting satin, nylon, or Saffiano leatherette).
- **Interactive Lighting Rig**:
  - `Environment`: Low-intensity studio HDRI environment map for realistic soft reflections.
  - `Key Light`: Directional light with warm champagne warmth (`#FFF5E4`) casting soft contact shadows.
  - `Rim Light`: Cool edge light (`#E0ECFF`) emphasizing product silhouette borders.
  - `Contact Shadow`: Soft Drei `<ContactShadows>` plane preventing the model from looking "detached" from the floor.
- **Micro-Interactions & Physics**:
  - **Idle State**: Gentle floating oscillation (sinusoidal levitation) using `@react-three/drei`'s `<Float>`.
  - **Cursor Parallax**: Subtle 3D tilt tracking the user’s pointer movement on desktop.
  - **Material & Swatch Switcher**: Right-side interactive palette allowing B2B buyers to toggle materials in real time:
    1. *Terracotta Quilted Puffer* (Warm Luxury)
    2. *Emerald Forest Green Leatherette* (Heritage Signature)
    3. *Champagne Gold Metallic Satin* (Evening Glamour)
    4. *Midnight Obsidian Gloss Patent* (High-Fashion Edge)
    5. *Pastel Blush Saffiano* (D2C Beauty Essential)

---

## 3. Scroll-Driven Storytelling (GSAP + Three.js Integration)

As the user scrolls down the homepage, the 3D model does not simply disappear—it drives a continuous narrative sequence:

```
[HERO STAGE: 0% Scroll]
→ Full frontal presentation, floating, interactive rotation.
                  │
                  ▼
[CRAFTSMANSHIP ZOOM: 15% - 30% Scroll]
→ Camera smoothly dollies close to the zipper hardware and stitch line.
→ Caption reveals: "Zero-Defect Perimeter Stitching & Custom Metal Pullers".
                  │
                  ▼
[MATERIAL EXPLODED VIEW: 35% - 55% Scroll]
→ Pouch smoothly rotates to showcase base gusset, lining, and volume.
→ Caption reveals: "Reinforced Linings & Precision Edge Stitching".
                  │
                  ▼
[BULK MANUFACTURING SCALE: 60% - 80% Scroll]
→ Camera pulls back to reveal a serialized multiplicity of pouches.
→ Caption reveals: "High-Volume Contract Inquiries: 10k, 20k, 50k+ Scales".
                  │
                  ▼
[SETTLES INTO RFQ CTA: 100% Scroll]
→ Model docks gracefully into the sidebar of the Request for Quote configurator.
```

---

## 4. Performance Engineering & Lightweight Fallbacks

WebGL and 3D scenes can severely degrade performance and Core Web Vitals (CWV) if not architected with strict performance budgets:

### 4.1 Strict Performance Guardrails
1. **Asset Size Budget**: The complete 3D `.glb` file must not exceed **2.0 MB** (compressed using Draco or Meshopt decimation).
2. **Texture Budget**: PBR texture maps (BaseColor, Roughness, Normal) must be packed into a single texture atlas at **1024x1024** or **2048x2048 WebP/KTX2** format.
3. **Canvas Deactivation (Intersection Observer)**: When the 3D canvas scrolls out of viewport, render loops (`useFrame`) are halted automatically to eliminate GPU battery drain.
4. **Framerate Clamping**: Cap rendering at 60 FPS on high-refresh monitors; downgrade to 30 FPS on lower-tier mobile hardware.

### 4.2 Progressive Enhancement & Mobile Fallback Strategy
Not all B2B enterprise procurement officers browse on high-end desktop workstations. On mobile or unsupported devices:
- **Capability Detection**: Check for WebGL 2.0 availability and hardware concurrency (`navigator.hardwareConcurrency`).
- **Low-Power / Mobile Fallback**: Replace the live WebGL canvas with an interactive **360-degree pre-rendered WebP image sprite sheet** or a responsive high-resolution studio packshot carousel with swipe gestures.
- This guarantees **instant Largest Contentful Paint (LCP < 2.0s)** and zero layout shift on mobile devices.

---

## 5. 3D Asset Procurement Checklist (Client Inputs Required)

To model and render physically accurate 3D assets matching ARMANO’s exact pouch geometry:

- [ ] **Orthographic Packshots**: Pure front, back, top, bottom, and side profile photographs taken on a flat tripod plane.
- [ ] **Exact Dimensional Specs**: Height, Width, Depth, and Gusset expansion in millimeters (`mm`).
- [ ] **Fabric Swatch Reference**: Macro close-up photos of fabric texture grain (for bump and normal map extraction).
- [ ] **Hardware Dimensions**: Zipper teeth gauge (e.g., #3, #5, #8 nylon or metal), puller length and thickness.
- [ ] **Color Standards**: Exact Pantone (PMS) or Hex values for brand colorways.
- [ ] *(Optional)* **CAD / Die-Line Patterns**: 2D vector cutting dies or tech packs used on the factory floor.
