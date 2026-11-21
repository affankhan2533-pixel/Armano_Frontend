# ARMANO — Legal & Compliance Risk Register

**Document Status**: Implementation-Ready Legal Audit & Governance Register  
**Jurisdiction**: Mumbai, Maharashtra, India (Primary) / International Cross-Border B2B Trade  
**Applicable Statutes**: Digital Personal Data Protection Act (DPDP Act, 2023), Information Technology Act (2000), Trade Marks Act (1999), Consumer Protection (E-Commerce) Rules (2020), Indian Contract Act (1872)

---

## 1. Compliance Risk Matrix

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                          LEGAL RISK MATRIX & AUDIT                          │
├───────────────────┬──────────┬─────────────┬────────────────────────────────┤
│ Risk Event        │ Severity │ Probability │ Mitigation Architecture        │
├───────────────────┼──────────┼─────────────┼────────────────────────────────┤
│ 1. Unauthorized   │ CRITICAL │ HIGH        │ Zero-Trust brand registry. All │
│    Trademark Use  │          │             │ third-party logos suppressed   │
│    (Logo Marquee) │          │             │ until written consent filed.   │
├───────────────────┼──────────┼─────────────┼────────────────────────────────┤
│ 2. DPDP Act Non-  │ HIGH     │ MEDIUM      │ Explicit consent checkbox on   │
│    Compliance     │          │             │ RFQ form, transparent privacy  │
│    (Data Privacy) │          │             │ notice, no unconsented cookies.│
├───────────────────┼──────────┼─────────────┼────────────────────────────────┤
│ 3. Unsubstantiated│ MEDIUM   │ MEDIUM      │ Clearly label 10k/20k/50k as   │
│    Production &   │          │             │ provisional inquiry selections │
│    Capacity Claims│          │             │ not verified plant capacities. │
├───────────────────┼──────────┼─────────────┼────────────────────────────────┤
│ 4. Material Claim │ HIGH     │ MEDIUM      │ Segregate visual observation   │
│    Misstatement   │          │             │ from verified TDS. Disclaim    │
│    (ASCI / CPA)   │          │             │ exact polymer/GSM specs.       │
├───────────────────┼──────────┼─────────────┼────────────────────────────────┤
│ 5. Unverified     │ MEDIUM   │ HIGH        │ Flag statutory entity details; │
│    Statutory Info │          │             │ complete GST portal & lease    │
│    (Entity/GSTIN) │          │             │ validation before live launch. │
├───────────────────┼──────────┼─────────────┼────────────────────────────────┤
│ 6. Misleading B2B │ MEDIUM   │ LOW         │ Disclaimers stating sample     │
│    Sampling Terms │          │             │ terms, tooling charges, and    │
│    & Returns      │          │             │ custom batch acceptance rules. │
└───────────────────┴──────────┴─────────────┴────────────────────────────────┘
```

---

## 2. Privacy Architecture & Third-Party Asset Inventory

Before drafting privacy terms and cookie consent controls, an exhaustive inventory of all browser-level trackers and external connections was conducted:

| External Asset / Resource | Host / Origin | Data Collected / Transmitted | Privacy & Consent Classification |
| :--- | :--- | :--- | :--- |
| **Typography Fonts** | Google Fonts (`fonts.googleapis.com` / `fonts.gstatic.com`) | IP Address, User Agent | Recommended to **self-host WOFF2 fonts** in `public/fonts/` to eliminate external tracking and comply with strict European/Indian privacy standards. |
| **Spam Protection** | Cloudflare Turnstile (`challenges.cloudflare.com`) | Browser telemetry, device risk signals | **Strictly Necessary** security processing; documented in Privacy Policy. |
| **Maps Embed** | Google Maps Embed (`google.com/maps`) | IP Address, Referrer, Location data | **Optional Functional Cookie**; user must accept functional cookies before iframe initializes. |
| **Self-Hosted Video** | Internal (`/videos/*.mp4`) | None (Served directly from web root) | **Zero Tracking**; privacy compliant. |
| **Analytics (Planned)**| Google Analytics 4 (GA4) / Umami | Page views, session duration, click events | **Analytics / Performance**; strictly gated behind affirmative cookie consent banner. |
| **Session Cookies** | Application State (`armano_consent`) | User consent preferences (Strictly local) | **Essential Cookie**; exempt from consent requirements. |

---

## 3. Statutory Policies Drafting Blueprint

### 3.1 Privacy Policy (`/privacy-policy`)
- **Data Controller**: ARMANO (Manufacturing Division, Sion-Dharavi, Mumbai).
- **Categories of Data Processed**: Commercial contact details provided voluntarily in the RFQ inquiry form (Name, Business Name, Corporate Email, Phone Number, Packaging Specifications).
- **Purpose of Processing**: Responding to custom contract manufacturing quotation requests and order fulfillment.
- **Data Sharing Policy**: Zero sale, rental, or commercial licensing of procurement data. Shared strictly with transactional email infrastructure (Resend/SMTP) solely for message delivery.
- **Data Retention & Subject Rights**: Inquiries retained for 24 months for commercial quotation history; deleted upon formal email request to the data protection contact.

### 3.2 Terms & Conditions (`/terms-and-conditions`)
- **Nature of Contract**: The website is an informational showcase and quotation gateway. The submission of an RFQ does not constitute a binding sales agreement until a formal commercial Proforma Invoice / Supply Agreement is executed.
- **Intellectual Property**: All catalog imagery, 3D interactive models, code, and editorial copy are proprietary assets of ARMANO.
- **Custom Tooling & Die Rights**: Custom embossing dies, cutting patterns, and printing plates created for OEM clients remain designated for their exclusive use.
- **Jurisdiction & Dispute Resolution**: Governed by the laws of India; exclusive jurisdiction vested in the competent courts of **Mumbai, Maharashtra**.

### 3.3 Returns, Counter-Sampling & Quality Inspection (`/returns-and-refunds`)
- **B2B Industrial Standard**: In bulk custom manufacturing (OEM/ODM), finished products are custom-manufactured to client-approved tech packs and counter-samples.
- **Sample Approval Gate**: Production commences only after physical counter-sample approval by the client.
- **Defect Claims & Inspection Period**: Claims for transit damage or manufacturing deviations must be logged within **7 business days** of consignment delivery with photographic evidence and batch serialization.

---

## 4. Statutory Business Details Fact Audit

Under Rule 5(2) of the Consumer Protection (E-Commerce) Rules (2020), every commercial online platform operating in India must provide prominent and clear disclosure of legal entity identity:

| Statutory Parameter | Disclosed / Extracted Value | Verification Status | Legal Risk & Governance Action |
| :--- | :--- | :--- | :--- |
| **Brand Trade Name** | ARMANO | `[CLIENT STATEMENT]` | Used in commercial catalog. Protected as common-law trade name; Class 18 trademark search recommended. |
| **Registered Legal Entity** | Pending Client Disclosure | `[UNCONFIRMED]` | High statutory risk if omitted. Client must supply official registered firm/company name prior to deployment. |
| **Factory Operating Address** | Unit B: 162-212, Ground Floor, Maharana Pratap Nagar, Sant Kakkaya Marg, Dhorwada, Dharavi, Sion, Mumbai : 400017 | `[CLIENT STATEMENT]` | Extracted from manufacturer PDF; pending independent lease / municipal tax / utility bill corroboration. |
| **Statutory Tax ID (GSTIN)** | `27EOGPM4521C1Z6` | `[UNCONFIRMED]` | Extracted via cipher from PDF text stream; pending validation on government GST portal (`services.gst.gov.in`). |
| **Authorized Signatory** | Rehan | `[CLIENT STATEMENT]` | Named on catalog contact desk; pending formal authorization letter for commercial contracting. |
| **Authorized Contact Phone** | `+91 8591897469` | `[CLIENT STATEMENT]` | Verified across PDF and courier dispatch labels (`image copy 35.png`). Validated operational telephone. |
| **Official Operational Email** | `operations@armanobags.com` | `[UNCONFIRMED]` | Unverified suggested placeholder. Must not be used as official legal notice address until confirmed. |

