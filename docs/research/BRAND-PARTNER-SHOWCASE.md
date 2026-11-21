# ARMANO — Brand Partner Showcase & Trademark Governance

**Document Status**: Implementation-Ready Architectural & Legal Blueprint  
**Feature Name**: Infinite Brand Partner Marquee  
**Governance Standard**: Zero-Trust Trademark Rendering (Strict Legal Compliance)

---

## 1. Executive Summary & Legal Risk Assessment

The client has requested an automatically scrolling horizontal showcase featuring prominent beauty, cosmetics, and skincare brand logos under a proposed heading such as *"Brands We've Manufactured For"*.

### 1.1 Legal Assessment Under Indian & International Law
Under the **Trade Marks Act, 1999 (India)** and international intellectual property conventions:
- Using a registered trademark or brand logo on a public commercial website constitutes commercial representation.
- Showing third-party trademarked logos (e.g., M·A·C, CeraVe, Nykaa, Bobbi Brown, Smashbox) without an executed manufacturing contract that explicitly grants public promotional display rights exposes ARMANO to **cease-and-desist actions, trademark infringement litigation, and damages**.
- Even if ARMANO physically manufactured sample pouches or bulk batches for these brands (as evidenced by physical photos in `reference/product-images/`), manufacturing agreements routinely contain **Non-Disclosure Agreements (NDAs)** or white-label clauses that prohibit public disclosure.

### 1.2 Absolute Architectural Mandate
1. **NEVER** invent fictitious partnerships or download unauthorized brand SVGs.
2. **ZERO-TRUST RENDERING**: Every brand entry must be bound to a strict approval status flag. Only entries with `approvalStatus: "APPROVED"` and `publicationPermissionDocumented: true` are permitted to mount in the client-side DOM.
3. If formal approvals are not yet secured, the section remains **hidden from production** or replaced with an elegant **"Manufacturing Capabilities & Material Innovation Showcase"**.

---

## 2. Brand Registry Data Architecture

To ensure strict programmatic governance, the brand showcase is fed by a dedicated registry schema (`src/data/brandRegistry.js`):

```javascript
/**
 * @typedef {Object} BrandRegistryEntry
 * @property {string} id - Unique identifier (e.g., 'brand-mac')
 * @property {string} brandName - Official registered brand name
 * @property {string} logoAsset - Path to approved vector logo in public/images/brand/
 * @property {string} relationshipEvidence - Reference to physical asset / photo
 * @property {boolean} publicationPermissionDocumented - Written consent on file
 * @property {'PENDING_APPROVAL' | 'APPROVED' | 'REJECTED' | 'UNPUBLISHED'} approvalStatus
 * @property {string} altText - Semantic, descriptive accessibility label
 * @property {string|null} externalUrl - Optional authorized brand URL
 * @property {string} notes - Internal compliance documentation
 */

export const brandRegistry = [
  {
    id: 'brand-mac',
    brandName: 'M·A·C Cosmetics',
    logoAsset: '/images/brand/mac-logo.svg',
    relationshipEvidence: 'Physical samples in reference/product-images/image copy 21.png, 24.png',
    publicationPermissionDocumented: false,
    approvalStatus: 'PENDING_APPROVAL',
    altText: 'M·A·C Cosmetics brand logo',
    externalUrl: null,
    notes: 'Observed on holographic pouch & factory batch of lime patent bags. Pending written client consent.'
  },
  {
    id: 'brand-cerave',
    brandName: 'CeraVe',
    logoAsset: '/images/brand/cerave-logo.svg',
    relationshipEvidence: 'Physical sample in reference/product-images/image.png',
    publicationPermissionDocumented: false,
    approvalStatus: 'PENDING_APPROVAL',
    altText: 'CeraVe Dermatological Skincare logo',
    externalUrl: null,
    notes: 'Observed on white vegan leather pouch. Pending written client consent.'
  },
  {
    id: 'brand-nykaa',
    brandName: 'Nykaa',
    logoAsset: '/images/brand/nykaa-logo.svg',
    relationshipEvidence: 'Physical samples in image copy 4.png, 6.png, 9.png, 34.png',
    publicationPermissionDocumented: false,
    approvalStatus: 'PENDING_APPROVAL',
    altText: 'Nykaa Beauty and Cosmetics logo',
    externalUrl: null,
    notes: 'Observed on Wanderlust bags, Maison Moi perfume pouches, and Stay Pink batch. Pending written client consent.'
  },
  {
    id: 'brand-pilgrim',
    brandName: 'Pilgrim',
    logoAsset: '/images/brand/pilgrim-logo.svg',
    relationshipEvidence: 'Physical samples in image copy 13.png, 14.png',
    publicationPermissionDocumented: false,
    approvalStatus: 'PENDING_APPROVAL',
    altText: 'Pilgrim Beauty brand logo',
    externalUrl: null,
    notes: 'Observed on two-tone packshots with gold foil and cyan/pink pouches. Pending written client consent.'
  },
  {
    id: 'brand-bobbi-brown',
    brandName: 'Bobbi Brown',
    logoAsset: '/images/brand/bobbi-brown-logo.svg',
    relationshipEvidence: 'Physical sample in image copy 17.png',
    publicationPermissionDocumented: false,
    approvalStatus: 'PENDING_APPROVAL',
    altText: 'Bobbi Brown Cosmetics logo',
    externalUrl: null,
    notes: 'Observed on metallic chevron quilted pouch hardware plate. Pending written client consent.'
  },
  {
    id: 'brand-smashbox',
    brandName: 'Smashbox Cosmetics',
    logoAsset: '/images/brand/smashbox-logo.svg',
    relationshipEvidence: 'Physical sample in image copy 25.png',
    publicationPermissionDocumented: false,
    approvalStatus: 'PENDING_APPROVAL',
    altText: 'Smashbox Cosmetics brand logo',
    externalUrl: null,
    notes: 'Observed on red vegan leather packshot pouch. Pending written client consent.'
  },
  {
    id: 'brand-forest-essentials',
    brandName: 'Forest Essentials',
    logoAsset: '/images/brand/forest-essentials-logo.svg',
    relationshipEvidence: 'Physical sample in image copy 22.png',
    publicationPermissionDocumented: false,
    approvalStatus: 'PENDING_APPROVAL',
    altText: 'Forest Essentials Luxurious Ayurveda logo',
    externalUrl: null,
    notes: 'Observed on bulk batch of magenta canvas/leather pouches. Pending written client consent.'
  },
  {
    id: 'brand-paese',
    brandName: 'Paese Cosmetics',
    logoAsset: '/images/brand/paese-logo.svg',
    relationshipEvidence: 'Physical samples in image copy 33.png, 35.png',
    publicationPermissionDocumented: false,
    approvalStatus: 'PENDING_APPROVAL',
    altText: 'Paese Cosmetics logo',
    externalUrl: null,
    notes: 'Observed on red arch handle vanity bag and navy patent dome pouch. Pending written client consent.'
  },
  {
    id: 'brand-forever52',
    brandName: 'Daily Life Forever52',
    logoAsset: '/images/brand/forever52-logo.svg',
    relationshipEvidence: 'Physical sample in image copy 28.png',
    publicationPermissionDocumented: false,
    approvalStatus: 'PENDING_APPROVAL',
    altText: 'Daily Life Forever52 Professional Makeup logo',
    externalUrl: null,
    notes: 'Observed on navy houndstooth pouch debossing. Pending written client consent.'
  }
];

/**
 * Filter utility ensuring zero unapproved trademarks ever render publicly
 */
export function getApprovedBrands() {
  return brandRegistry.filter(
    (b) => b.approvalStatus === 'APPROVED' && b.publicationPermissionDocumented === true
  );
}
```

---

## 3. Interactive Marquee Component Engineering

### 3.1 Technical Specifications
- **Seamless Infinite Loop**: Constructed using pure CSS linear animations with duplicated array tracks (`translate3d(-50%, 0, 0)`), ensuring 60 FPS performance without JavaScript recalculations or visual stutter.
- **Pause on Interaction**: The track pauses immediately on `:hover` and `:focus-within` to allow scrutiny by interested procurement buyers.
- **Accessibility & Reduced Motion**: Automatically disables continuous animation when `prefers-reduced-motion: reduce` is detected, converting into a clean, horizontally scrollable flex container with snap points.
- **Grayscale-to-Color Hover**: Logos are styled in a refined, muted monochrome tone (`opacity-60 grayscale hover:opacity-100 hover:grayscale-0 transition-all`) to maintain editorial elegance.

### 3.2 Visual Fallback Mode (While Approvals Are Pending)
If `getApprovedBrands().length === 0`:
The section automatically transitions from "Brands We've Manufactured For" to:
**"Engineered For Enterprise Beauty & Lifestyle Programmes"**  
Showcasing verified manufacturing strengths extracted directly from manufacturer documentation:
- *Direct Factory Manufacturing (No Middlemen / Intermediaries)*
- *Custom Sizes & Silhouette Development (OEM / ODM)*
- *Multiple Material & Surface Finishing Capabilities*
- *Custom Branding Techniques (Debossing, Foil Stamping, Screen Printing)*
- *Provisional Volume Inquiries Accepted (10k / 20k / 50k Verbal Indications)*
- *Dedicated Client & Procurement Support Desk (Mumbai Facility)*

