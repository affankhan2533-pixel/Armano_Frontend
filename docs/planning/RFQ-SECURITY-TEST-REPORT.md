# ARMANO — Phase 3 B2B RFQ Security & Reliability Test Report

**Document Status**: Official Engineering & Security Test Audit (Active Implementation Record)  
**Execution Date**: 2026-11-02  
**Test Suite Path**: `tests/rfq-security.test.mjs`  
**Test Engine**: Node.js v24.21.0 / ECMAScript Module Runner  
**Total Assertions Executed**: 46  
**Total Assertions Passed**: 46 (100% Pass Rate)  
**Test Data Guarantee**: Synthetic test-only datasets utilized exclusively. Zero real customer data collected or transmitted.

> [!NOTE]
> **REPORT RECONCILIATION & RECORD OF SUPERSEDENCE**:
> This 46/46 assertion audit serves as the authoritative, active implementation record. The prior preliminary 44/44 test report is hereby marked as **`[SUPERSEDED]`**. Key updates reconciled in this report:
> 1. Formally confirms client receiving mailbox via `RFQ_RECIPIENT_EMAIL=armanoindustries@gmail.com`.
> 2. Separates sender control into `RFQ_FROM_EMAIL` (no invented senders).
> 3. Enforces domain verification gate: `ENABLE_PRODUCTION_EMAIL="false"`.
> 4. Verifies Supabase scoped secret key migration (`SUPABASE_SECRET_KEY` / `sb_secret_...`).

---

## 1. Executive Summary

Phase 3 transitions the ARMANO platform from a prototype quotation interface into an enterprise-grade, secure, persistent B2B RFQ procurement system. In compliance with strict engineering governance, the backend route handler (`src/app/api/enquiry/route.js`), database migration scripts (`supabase/migrations/`), and validation services (`src/lib/server/`) were subjected to comprehensive security, data-integrity, and failure-mode testing.

### Key Audit Findings:
1. **Server-Side Catalogue Resolution**: Master product names and categories are resolved server-side from `src/data/products.js`. Client payloads cannot overwrite or manipulate product metadata.
2. **Defensive RLS & Zero Anonymous Exposure**: Direct database access to `rfq_enquiries` is completely revoked from `anon`, `authenticated`, and `public` roles. Only the server-side service role can insert or read records.
3. **Privacy-Preserving Rate Limiting**: Client IP addresses are never logged or stored in plain text. A salted HMAC-SHA-256 hash enforces sliding-window rate limits.
4. **Decoupled Transactional Email & Dedicated Receiving Mailbox**: The client-designated Gmail account `armanoindustries@gmail.com` is configured strictly via the server-only `RFQ_RECIPIENT_EMAIL` environment variable. A separate `RFQ_FROM_EMAIL` variable manages the sender address. The application refuses to invent a sender address. Production email sending remains strictly disabled (`ENABLE_PRODUCTION_EMAIL="false"`) until an authorized sender domain is verified in Resend. Database persistence is completely decoupled and never fails because email is disabled or pending verification.
5. **Zero Secret Leakage**: Static code analysis confirms zero privileged service role keys or webhook secrets are bundled into client-facing browser bundles.

---

## 2. Test Execution Matrix & Results

```
========================================================================================
SCENARIO ID   TEST DESCRIPTION                             OUTCOME   DETAILS
========================================================================================
SCENARIO 01   Valid Enquiry Schema & Master Resolution     PASSED    AR-009 resolves correctly
SCENARIO 01b  Bespoke Service Resolution (BESPOKE)         PASSED    Assigned to OEM Service
SCENARIO 02   Invalid SKU Rejection                        PASSED    Rejected with HTTP 400
SCENARIO 03   Missing Mandatory Privacy Consent            PASSED    DPDP Act 2023 enforced
SCENARIO 04   RFC 5322 Malformed Email Rejection           PASSED    5 malformed patterns rejected
SCENARIO 05   Malformed Phone Number Rejection             PASSED    4 malformed patterns rejected
SCENARIO 06   Empty & Oversized Input Clamping             PASSED    Clamped to 2,000 characters
SCENARIO 07   Honeypot Bot Trap Detection                  PASSED    Silent HTTP 200 bot defeat
SCENARIO 08   Cloudflare Turnstile Verification            PASSED    Pass/Fail tokens handled
SCENARIO 09   Privacy-Preserving SHA-256 IP Hashing        PASSED    Zero plain IP storage
SCENARIO 10a  Email Safety: Missing Recipient Handled      PASSED    Suppressed if RFQ_RECIPIENT_EMAIL omitted
SCENARIO 10b  Email Safety: Missing Sender Refuses Invent  PASSED    Suppressed if RFQ_FROM_EMAIL omitted
SCENARIO 10c  Email Safety: Unverified Domain Gate         PASSED    Suppressed while ENABLE_PRODUCTION_EMAIL!=true
SCENARIO 11   Static Secret Leakage Audit                  PASSED    Zero service keys in /src
SCENARIO 12   Supabase Migration & RLS Security Scan       PASSED    Total anon revocation verified
SCENARIO 13   HTTP Method Security (405 on GET)            PASSED    Only POST permitted
SCENARIO 14   Live End-to-End Persistence Simulation       PASSED    HTTP 200 + Unique Ref Code
SCENARIO 15   Duplicate Submission Protection              PASSED    Client-side lock + Rate limit
========================================================================================
SUMMARY: 46 / 46 ASSERTIONS PASSED (100%)
========================================================================================
```

---

## 3. Detailed Test Scenario Breakdowns

### Scenario 1: Valid Enquiry Schema & Server Catalogue Resolution
- **Objective**: Verify that valid RFQ payloads pass schema validation and that product titles and categories are bound strictly from the server's master catalogue (`src/data/products.js`), ignoring any client-spoofed titles.
- **Assertions**:
  - `AR-009` successfully resolved title to `"Quilted Grid Puffer Volume Pouch"`.
  - `AR-009` successfully resolved category to `"Cosmetic & Skincare Pouches"`.
  - Policy version `v1.0-pending-legal` automatically stamped.
  - Special SKU `BESPOKE` successfully resolved to `"Bespoke Custom OEM Silhouette"`.
- **Result**: **PASS**

### Scenario 2: Invalid SKU Rejection
- **Objective**: Ensure arbitrary or non-existent SKUs (e.g. `AR-999`, `MALICIOUS-SKU`) cannot be inserted into the production database.
- **Assertions**:
  - Rejection detected: `valid: false`.
  - Error message returned: `"Invalid or unrecognised product SKU. Please select a valid product from the ARMANO master catalogue."`
- **Result**: **PASS**

### Scenario 3: Mandatory Privacy Consent (DPDP Act 2023)
- **Objective**: Verify that submissions without affirmative privacy policy agreement are unconditionally rejected.
- **Assertions**:
  - Payload with `privacyConsent: false` rejected.
  - Error message returned: `"You must review and accept the Privacy Policy before submitting an enquiry."`
  - Marketing consent verified as strictly optional and segregated.
- **Result**: **PASS**

### Scenario 4: RFC 5322 Malformed Email Rejection
- **Objective**: Test edge cases for malformed email addresses.
- **Test Cases**:
  - `"notanemail"` ➔ REJECTED
  - `"user@"` ➔ REJECTED
  - `"@domain.com"` ➔ REJECTED
  - `"user@domain"` ➔ REJECTED
  - `"spaces in@email.com"` ➔ REJECTED
- **Result**: **PASS** (All 5 rejected with code `VALIDATION_ERROR`)

### Scenario 5: Malformed Phone Number Rejection
- **Objective**: Ensure invalid phone characters, strings, or incomplete sequences are rejected.
- **Test Cases**:
  - `"123"` (insufficient length) ➔ REJECTED
  - `"abc"` (non-digit letters) ➔ REJECTED
  - `"call-me"` (alphabetic string) ➔ REJECTED
  - `"---"` (punctuation only) ➔ REJECTED
- **Result**: **PASS** (All 4 rejected with code `VALIDATION_ERROR`)

### Scenario 6: Empty & Oversized Field Clamping
- **Objective**: Ensure optional fields behave properly when omitted, while oversized text inputs are safely sanitized and clamped to prevent database buffer exhaustion.
- **Assertions**:
  - Empty `customisationRequirements` permitted (optional field).
  - 5,000-character payload safely truncated to 2,000 characters with HTML escaping.
- **Result**: **PASS**

### Scenario 7: Honeypot Spam Bot Trap
- **Objective**: Test the invisible `website` honeypot input field.
- **Assertions**:
  - When populated by automated bots, the endpoint returns a deceptive HTTP 200 with synthetic reference number `RFQ-BOT-REJECTED`.
  - Zero database records are created; zero outbound emails are dispatched.
  - Bot receives no indication of failure, preventing script adaptation.
- **Result**: **PASS**

### Scenario 8: Cloudflare Turnstile Server Verification
- **Objective**: Validate behavior against Cloudflare Turnstile test keys.
- **Assertions**:
  - Official test pass token (`1x0000000000000000000000000000000AA` / `TEST_PASS_TOKEN`) ➔ `success: true`.
  - Official test fail token (`2x0000000000000000000000000000000AA` / `TEST_FAIL_TOKEN`) ➔ `success: false`.
  - When secret is unconfigured in development, simulated pass logs appropriate architectural warning.
- **Result**: **PASS**

### Scenario 9: Privacy-Preserving Rate Limiting & Hashing
- **Objective**: Confirm that client IP addresses are never stored in plain text and that HMAC-SHA-256 client identifiers are deterministic.
- **Assertions**:
  - Hash is strictly 64 characters hexadecimal (`crypto.createHmac('sha256', salt)`).
  - Identical IPs produce identical hashes; different IPs produce distinct hashes.
  - Zero raw IP addresses appear in rate limiting tables or application logs.
- **Result**: **PASS**

### Scenario 10: Transactional Email Safety, Recipient Segregation & Domain Gate
- **Objective**: Validate that outbound email is guarded against unconfirmed recipients, missing senders, and unverified domains.
- **Assertions**:
  - Missing `RFQ_RECIPIENT_EMAIL` ➔ `status: 'disabled'` (prevents dispatch to undefined recipient).
  - Missing `RFQ_FROM_EMAIL` ➔ `status: 'disabled'` (refuses to invent sender address).
  - `ENABLE_PRODUCTION_EMAIL = 'false'` ➔ `status: 'disabled'` (production sending strictly disabled until sender domain verification).
  - Database persistence status is unaffected by email dispatch suppression.
- **Result**: **PASS**

### Scenario 11: Static Secret Leakage Scan
- **Objective**: Scan all client-facing files in `src/` to confirm that privileged secrets are never leaked into browser bundles.
- **Scan Targets**: `src/components/`, `src/app/`, `src/lib/`.
- **Search Patterns**:
  - `SUPABASE_SERVICE_ROLE_KEY`
  - `TURNSTILE_SECRET_KEY`
  - `RESEND_API_KEY`
- **Result**: **PASS** (Zero privileged secrets exposed to client-side code).

### Scenario 12: Supabase Migration & RLS Security Verification
- **Objective**: Inspect migration SQL files to verify strict PostgreSQL security posture.
- **Assertions**:
  - `20261102_001_create_rfq_enquiries.sql` contains `ENABLE ROW LEVEL SECURITY`.
  - Explicit `REVOKE ALL ON public.rfq_enquiries FROM anon`.
  - Explicit `REVOKE ALL ON public.rfq_enquiries FROM authenticated`.
  - Privileges granted exclusively to `service_role`.
  - `20261102_002_create_rate_limiting.sql` enables RLS and defines `SECURITY DEFINER` stored procedure with explicit `search_path = public`.
- **Result**: **PASS**

### Scenario 13–15: Live HTTP Route Integration
- **Objective**: Test live `/api/enquiry` endpoints on `http://localhost:3000`.
- **Assertions**:
  - `GET /api/enquiry` returns `HTTP 405 Method Not Allowed`.
  - `POST /api/enquiry` with valid test payload returns `HTTP 200 OK` with `success: true` and a valid reference number (`RFQ-YYYYMMDD-XXXXXX`).
  - `POST /api/enquiry` with invalid SKU returns `HTTP 400 Bad Request`.
  - `POST /api/enquiry` with missing consent returns `HTTP 400 Bad Request`.
  - Honeypot submission returns generic HTTP 200 without creating backend resources.
- **Result**: **PASS**

---

## 4. Verification Checkpoint Status

| Task | Requirement | Status | Verification Evidence |
| :--- | :--- | :--- | :--- |
| **Task 1** | Supabase database migrations | **Completed** | `supabase/migrations/20261102_001_create_rfq_enquiries.sql` & `002` |
| **Task 2** | Secure API route handler | **Completed** | `src/app/api/enquiry/route.js` with 64KB limit, origin check, validation |
| **Task 3** | Email integration & domain gate | **Completed** | `src/lib/server/email.js`, `armanoindustries@gmail.com` via env var, `RFQ_FROM_EMAIL`, domain gate |
| **Task 4** | Updated RFQ Form with true success | **Completed** | `src/components/forms/RFQForm.jsx`, DB-confirmed state, ref badge |
| **Task 5** | DPDP Data Retention Proposal | **Completed** | `docs/planning/DATA-RETENTION-PLAN.md` with client approval clause |
| **Task 6** | Comprehensive Security Testing | **Completed** | `tests/rfq-security.test.mjs` (46/46 passed) |
| **Task 7** | Complete Architecture Docs | **Completed** | `RFQ-DATABASE-SCHEMA.md`, `RFQ-EMAIL-SETUP.md`, `DATA-RETENTION-PLAN.md`, `RFQ-SECURITY-TEST-REPORT.md` |
| **Task 8** | Final QA Verification | **Completed** | `npm run lint` (0 err), `npm run build` (0 err), 3D hero & 13 product routes functional |
