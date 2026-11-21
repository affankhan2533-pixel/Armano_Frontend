# ARMANO — Enterprise Security Architecture & Threat Model

**Document Status**: Implementation-Ready Security Specification  
**Classification**: Defense-in-Depth Engineering Framework  
**Scope**: Inbound B2B RFQ Gateway, Serverless API Routes, WebGL Viewport & Client Assets  
**Security Notice**: *No web application is completely impenetrable. This architecture establishes multi-layered defense-in-depth controls to mitigate practical attack vectors while identifying residual risks requiring ongoing penetration audits.*

---

## 1. Threat Modeling for B2B Manufacturing Web Platform

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                          IDENTIFIED THREAT VECTORS                          │
├─────────────────────┬──────────────────────┬────────────────────────────────┤
│ Attack Vector       │ Risk Description     │ Implemented Defense Control    │
├─────────────────────┼──────────────────────┼────────────────────────────────┤
│ 1. Spam & Form      │ Automated bots       │ Cloudflare Turnstile, invisible│
│    Flooding         │ flooding RFQ inbox   │ honeypot, IP rate limiting     │
├─────────────────────┼──────────────────────┼────────────────────────────────┤
│ 2. Injection & XSS  │ Malicious payload in │ Server-side schema validation, │
│                     │ inquiry text fields  │ HTML entity sanitization, CSP  │
├─────────────────────┼──────────────────────┼────────────────────────────────┤
│ 3. Secret Leakage   │ Exposing API keys in │ Strict NEXT_PUBLIC_ separation,│
│                     │ client bundle        │ serverless route boundary      │
├─────────────────────┼──────────────────────┼────────────────────────────────┤
│ 4. DDoS / Exhaustion│ Crashing serverless  │ Edge rate limiting, request    │
│                     │ functions & memory   │ payload size caps (max 100 KB) │
├─────────────────────┼──────────────────────┼────────────────────────────────┤
│ 5. PII Breach       │ Intercepting buyer   │ Strict TLS 1.3 encryption,     │
│                     │ contact information  │ ephemeral memory transit       │
└─────────────────────┴──────────────────────┴────────────────────────────────┘
```

---

## 2. Server-Side Validation, Rate Limiting & Anti-Spam Pipeline

All client input arriving at `/api/enquiry` traverses an audited defense-in-depth pipeline:

```
[Incoming POST Request]
          │
          ▼
[1. Request Size Check: Reject if Body > 100 KB (HTTP 413)]
          │
          ▼
[2. Edge Rate Limiting: 5 requests / IP / 10 min window (HTTP 429)]
    (Implemented via Cloudflare WAF / Upstash Redis; avoids in-memory serverless resets)
          │
          ▼
[3. Invisible Honeypot Trap: Reject silently if hidden decoy field is populated]
          │
          ▼
[4. CAPTCHA Verification: Cloudflare Turnstile token validated server-side]
          │
          ▼
[5. Strict Server Schema Validation: Type checks, email regex, string length bounds]
          │
          ▼
[6. Input Sanitization: Strip HTML tags, escape angle brackets, strip null bytes]
          │
          ▼
[7. Secure Transmission: Resend API via HTTPS TLS 1.3 to verified client inbox]
          │
          ▼
[8. Return Sanitized Generic Success Response (Zero Stack Trace / System Leak)]
```

### 2.1 Serverless Rate Limiting Nuances
In stateless serverless runtimes (such as Vercel Edge / AWS Lambda), in-memory JavaScript counters (e.g. `Map()` or `new Set()`) reset each time an instance cold-starts or scales horizontally across regions. To ensure robust enforcement:
- **Primary Mechanism**: Edge-level rate limiting via **Cloudflare WAF / Cloudflare Workers**, enforcing IP rate limits before requests reach serverless functions.
- **Secondary Application Fallback**: Integration with a low-latency managed Redis key-value store (e.g., **Upstash Redis**) using a sliding-window counter algorithm (`@upstash/ratelimit`).

---

## 3. Secure File Attachment Architecture (Tech-Packs & Vector Artwork)

B2B manufacturing clients frequently request uploading 2D CAD patterns, tech-packs, and vector artwork for counter-sampling quotations. Handling file uploads in a web environment presents severe vulnerabilities (webshell injection, SVG-based XSS, denial of service via memory exhaustion).

### 3.1 Security Pipeline for Tech-Pack Uploads
To mitigate these risks without overloading serverless compute:

```
[Client RFQ Form: User Selects File]
                 │
                 ▼
[Step 1: Client-Side Pre-Validation (File Size <= 5 MB, Extension Whitelist)]
                 │
                 ▼
[Step 2: Request Presigned Upload URL from /api/upload/presign]
    - Authenticates Turnstile token & rate limit
    - Generates short-lived (5 min) S3/R2 presigned PUT URL
                 │
                 ▼
[Step 3: Direct-to-Storage Upload (Bypasses Next.js Serverless Function Entirely)]
    - File streams directly from buyer browser to Private S3 / Cloudflare R2 bucket
    - Zero buffering in serverless memory or /tmp filesystem
                 │
                 ▼
[Step 4: Asynchronous Bucket Malware Scan & Validation Trigger]
    - Automated event scans file magic bytes (verifies true header matches extension)
    - Anti-malware scanning (ClamAV / AWS GuardDuty Malware Protection)
    - Rejects executable polyglots and scriptable payloads
                 │
                 ▼
[Step 5: Secure Staff Retrieval via Expiring Signed URLs]
    - Storage bucket has ZERO public read access (Block Public Access 100% enabled)
    - Factory staff access file via authenticated, 15-minute expiring GET presigned URL
```

### 3.2 File Attachment Whitelist & Constraints
- **Maximum File Size**: Strict **5.0 MB** cap per file; maximum 2 files per RFQ submission.
- **Strict MIME-Type Whitelist**:
  - `application/pdf` (`.pdf`) — Standard technical specification documents.
  - `image/png` (`.png`) & `image/jpeg` (`.jpg`, `.jpeg`) — Studio packshots & fabric photos.
  - `image/webp` (`.webp`) — Modern compressed images.
  - `application/dxf` (`.dxf`) — 2D vector CAD cutting patterns.
- **Explicitly Prohibited File Types**:
  - Executable binaries (`.exe`, `.bin`, `.msi`, `.bat`, `.cmd`, `.sh`, `.ps1`).
  - Scriptable server files (`.php`, `.py`, `.rb`, `.js`, `.jsp`).
  - Raw unparsed SVG (`.svg`) — Disallowed in initial upload form due to embedded `<script>` tag XSS vectors, unless sanitized via a DOMPurify/SVGO pipeline.
- **Storage Lifecycle Policy**: All tech-pack attachments are tagged with an automatic lifecycle deletion policy of **60 days**, after which uncontracted sample files are permanently expunged.

---

## 4. Serverless Runtime & Storage Considerations

1. **Stateless Compute & `/tmp` Ephemeral Nature**:
   - Next.js serverless functions execute in isolated micro-VMs with ephemeral `/tmp` storage (capped at 512 MB).
   - Local files written to `/tmp` are destroyed when container instances terminate and are **never shared** between concurrent requests.
   - The platform strictly enforces **Zero-Disk-Persistence**: form data is processed entirely in ephemeral RAM and forwarded via outbound TLS APIs.
2. **Payload Exhaustion Defenses**:
   - Body parser middleware rejects any inbound POST request exceeding **100 KB** for JSON endpoints, preventing heap memory exhaustion attacks.

---

## 5. HTTP Security Headers & Content Security Policy (CSP)

The application enforces defense-in-depth HTTP response headers configured in `next.config.js`:

```javascript
// Production Security Headers in next.config.js
const securityHeaders = [
  { key: 'X-DNS-Prefetch-Control', value: 'on' },
  { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
  { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
  {
    key: 'Content-Security-Policy',
    value: [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' https://challenges.cloudflare.com",
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
      "font-src 'self' https://fonts.gstatic.com data:",
      "img-src 'self' data: https: blob:",
      "connect-src 'self' https://challenges.cloudflare.com https://api.resend.com",
      "frame-src https://challenges.cloudflare.com https://www.google.com",
      "object-src 'none'",
      "base-uri 'self'",
      "form-action 'self'"
    ].join('; ')
  }
];
```

*Note on CSP Evolution*: Prior to production launch, `'unsafe-inline'` script allowances should be phased out in favor of dynamic cryptographic nonces generated per-request in Next.js middleware.

---

## 6. Secrets Management & Environment Isolation

1. **Strict Client/Server Separation**:
   - Variables prefixed with `NEXT_PUBLIC_` are bundled into client JavaScript. They must **never** contain private API keys, database credentials, or email secrets.
   - Server-only secrets (`RESEND_API_KEY`, `TURNSTILE_SECRET_KEY`, `STORAGE_SECRET_ACCESS_KEY`) execute solely within serverless API routes (`src/app/api/`).
2. **Git Hygiene & Secret Leak Prevention**:
   - `.env`, `.env*.local`, `.env.production` are strictly blocked in `.gitignore`.
   - CI/CD pipelines enforce automated secret detection (e.g., GitHub Secret Scanning / TruffleHog).

---

## 7. Email Infrastructure & Operational Routing Security

> [!WARNING]
> **UNVERIFIED SALES EMAIL NOTICE `[UNCONFIRMED - PENDING CLIENT CONFIRMATION]`**:
> The address `operations@armanobags.com` is an unverified suggested placeholder. It must **NOT** be configured as the active recipient for production RFQ forms until the client formally verifies domain ownership, mailbox provisioning, and authorization.

### 7.1 DNS Security & Domain Reputation (SPF, DKIM, DMARC)
To guarantee high email deliverability and protect the brand from phishing spoofing:
- **SPF (Sender Policy Framework)**: Authorize Resend's sending IPs in TXT record: `v=spf1 include:amazonses.com ~all`.
- **DKIM (DomainKeys Identified Mail)**: Configure 2048-bit cryptographic DKIM keys provided by the email service provider.
- **DMARC (Domain-based Message Authentication)**: Enforce strict alignment: `v=DMARC1; p=quarantine; pct=100; rua=mailto:dmarc-reports@[domain].com`.

---

## 8. Data Retention & Privacy Protection (DPDP Act, 2023 India)

1. **Data Minimization**:
   - Form fields collect strictly necessary B2B procurement details: Company Name, Procurement Officer Name, Business Email, Phone Number, Product Category, and Quantity Tier.
   - Zero consumer PII (passwords, payment cards, Aadhaar/national IDs) is ever collected.
2. **Zero Permanent Web Database (Ephemeral Transit)**:
   - Quotation submissions are transmitted directly via transactional email to the factory desk and stored in the secure corporate email provider. No exposed MySQL/Postgres database contains customer leads.
3. **Data Retention & Right to Erasure**:
   - Serverless execution logs retain anonymized transaction IDs for **30 days** before automated expiration.
   - Procurement buyers can exercise data correction or deletion requests under the DPDP Act 2023 by submitting a formal request to the designated factory contact.

---

## 9. Residual Risk Profile & Continuous Security Mandate

> [!IMPORTANT]
> **SYSTEM SECURITY DISCLAIMER**:
> No web application is completely impenetrable. ARMANO’s security architecture implements defense-in-depth principles to mitigate known threats, but residual operational risks remain:

1. **Third-Party API Dependency**: Outages at Cloudflare (Turnstile) or Resend (Email) can disrupt form submissions. *Mitigation: Implement client-side error states and secondary phone/WhatsApp procurement channels.*
2. **Social Engineering / Phone Phishing**: Attackers may contact the published factory phone number (+91 8591897469) impersonating corporate buyers or suppliers. *Mitigation: Internal staff operational protocol requiring email confirmation before sharing price matrices.*
3. **Pre-Launch Penetration Testing**: Prior to public launch, conduct automated vulnerability scans (OWASP ZAP) and manual API fuzzing on all endpoints.

