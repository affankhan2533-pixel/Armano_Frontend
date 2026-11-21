# ARMANO — Client Inputs & Stakeholder Verification Matrix

**Document Status**: Action Required from Client Stakeholders  
**Target Recipient**: ARMANO Leadership & Commercial Team  
**Objective**: Clear all pending operational, legal, and creative dependencies before commencing phase implementation.

---

## 1. Critical Creative & Brand Assets

| # | Item Description | Format Required | Purpose & Technical Impact | Status |
| :- | :--- | :--- | :--- | :--- |
| **1.1** | **Official Brand Logo** | Vector (`.ai`, `.eps`, or clean `.svg`) | Required for desktop header, mobile navigation, favicon suite, footer, and packaging stamp. Currently using a provisional typographic wordmark. | **PENDING** |
| **1.2** | **Brand Trademark Verification** | Registration Details / Class 18 | Ensures ARMANO trademark is protected under Class 18 (Leather and imitation leather goods, bags). | **PENDING** |
| **1.3** | **Official Brand Colors** | Pantone (PMS) or Hex Codes | Calibrating CSS design tokens and 3D shader materials. Defaulting to Deep Forest Green (`#0A261D`) and Champagne Gold (`#C5A059`). | **PENDING** |

---

## 2. Legal & Trademark Permissions (Brand Partner Marquee)

| # | Item Description | Verification Required | Legal Rationale | Status |
| :- | :--- | :--- | :--- | :--- |
| **2.1** | **Written Authorization for Third-Party Logos** | Written consent or contract clause from M·A·C, CeraVe, Nykaa, Pilgrim, Bobbi Brown, Smashbox, Forest Essentials, Paese, Forever52 | Indian Trade Marks Act 1999 prohibits public commercial display of trademarked logos without documented authorization. | **STRICT LEGAL HOLD** |
| **2.2** | **Proposed Heading Approval** | Choice of heading: *"Brands We've Manufactured For"* vs. *"Trusted by Leading Cosmetics Brands"* | Must accurately reflect customer relationships without misrepresenting exclusivity or official partnership status. | **PENDING** |
| **2.3** | **Product Sample Redaction Consent** | Written approval to display unbranded physical samples or permission to airbrush client brand marks | Prevents accidental disclosure of proprietary cosmetic client packaging programs. | **PENDING** |

---

## 3. Commercial & Production Specifications

| # | Item Description | Details Needed | Purpose & Application | Status |
| :- | :--- | :--- | :--- | :--- |
| **3.1** | **Minimum Order Quantities (MOQs)** | Confirmed baseline MOQs per category (e.g., 500 pcs vs. 1,000 pcs vs. 5,000 pcs) | Displaying accurate procurement thresholds on product catalog pages and quote configurators. | **PENDING** |
| **3.2** | **Verified Production Capacity** | Realistic monthly / annual unit capacity across the Sion/Dharavi factory units | Validating client verbal indications of 10k, 20k, and 50k unit production programs. | **PENDING** |
| **3.3** | **Turnaround Time Benchmarks** | - Counter-sample turnaround (e.g., 5–7 days)<br>- Bulk production lead time (e.g., 20–30 days) | Crucial procurement metric for enterprise cosmetics packaging buyers. | **PENDING** |
| **3.4** | **Packaging & Shipping Terms** | Domestic delivery (pan-India) and export capabilities (Incoterms: FOB, CIF, EXW) | Inbound RFQ shipping terms selector for international and domestic procurement. | **PENDING** |

---

## 4. Materials, Technical Data Sheets & Certifications

| # | Item Description | Format Required | Technical Impact & Auditing Requirement | Status |
| :- | :--- | :--- | :--- | :--- |
| **4.1** | **Material Technical Data Sheets (TDS)** | Manufacturer TDS or lab test reports for PU leatherette, canvas, velvet, and PVC | Required to substantiate exact material claims (GSM, backing, polymer ratio, gauge thickness) without misrepresentation. | **PENDING** |
| **4.2** | **Factory Audit & Quality Certifications** | Copies of valid SGS, ISO, SMETA, or REACH compliance certificates (if claimed) | All unsupported certification claims have been removed; requires documentary evidence before publishing. | **PENDING** |
| **4.3** | **Sustainable / Vegan Claims Substantiation** | Cruelty-free / vegan leather certification or supplier declaration | Substantiating "Eco-Cotton" and "Vegan Leatherette" marketing claims under consumer protection guidelines. | **PENDING** |

---

## 5. 3D Experience & Modeling Assets

| # | Item Description | Preferred Format | Technical Impact | Status |
| :- | :--- | :--- | :--- | :--- |
| **5.1** | **Physical Sample or Tech-Pack** | Physical sample bag sent to studio OR 2D vector CAD pattern with exact mm dimensions | High-fidelity 3D modeling of the hero pouch geometry (stitching lines, zipper teeth, gusset depth). | **PENDING** |
| **5.2** | **Orthographic Reference Photos** | High-resolution front, side, top, bottom, and interior packshots taken flat on tripod | Normal map extraction for fabric weave, leatherette grain, and metallic zipper reflections. | **PENDING** |

---

## 6. Technical Infrastructure, Routing & Legal Entity Verification

| # | Item Description | Format / Requirement | Deployment Impact | Status |
| :- | :--- | :--- | :--- | :--- |
| **6.1** | **Primary Inbound Sales Email Confirmation** | Official corporate email address (currently using provisional unverified placeholder: `operations@armanobags.com`) | Destination endpoint for all inbound B2B quote inquiries from `/api/enquiry`. Must be confirmed before connecting live forms. | **PENDING CONFIRMATION** |
| **6.2** | **Domain & DNS Management Access** | Cloudflare / Namecheap / GoDaddy login or DNS management access | Configuring domain routing, SSL/TLS certificates, SPF, DKIM, and DMARC email authentication records. | **PENDING** |
| **6.3** | **Statutory Legal Entity Registration** | Certificate of Incorporation / Partnership Deed / Form GST REG-06 confirming GSTIN `27EOGPM4521C1Z6` | Published in website footer, Terms & Conditions, and Privacy Policy for statutory compliance under Indian E-Commerce Rules. | **PENDING** |
| **6.4** | **Authorized Factory Contact Person** | Formal confirmation of designated commercial representative (Rehan / Operations Desk) | Signatory identification for legal policies and procurement inquiries. | **PENDING** |
| **6.5** | **File Upload Infrastructure Preference** | Preferred cloud storage provider for buyer tech-packs (AWS S3 vs. Cloudflare R2) | Implementation of secure presigned upload gateway for 5MB CAD/PDF attachments. | **PENDING** |
