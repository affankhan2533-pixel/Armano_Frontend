# ARMANO — B2B Transactional Email Setup & Governance Guide

**Document Status**: Official Implementation & Operations Guide  
**Email Service Provider**: Resend (`resend.com`)  
**Integration Module**: `src/lib/server/email.js`  
**API Boundary**: Invoked exclusively by server-side route handler (`src/app/api/enquiry/route.js`)

---

## 1. Designated Recipient Mailbox

> [!NOTE]
> **RECEIVING GMAIL ACCOUNT CONFIGURED**:
> The client has created the designated operational receiving Gmail account:
> **`armanoindustries@gmail.com`**
>
> In accordance with strict engineering governance:
> 1. `armanoindustries@gmail.com` is **configured exclusively through the server-only environment variable**:
>    `RFQ_RECIPIENT_EMAIL=armanoindustries@gmail.com`
> 2. This email address is **NEVER hardcoded** into application source code.
> 3. If `RFQ_RECIPIENT_EMAIL` is omitted from the deployment environment, outbound dispatch is automatically suppressed to prevent delivery to an undefined recipient.

---

## 2. Sender Domain Verification & Security Gate

> [!WARNING]
> **PRODUCTION SENDER DOMAIN NOT YET VERIFIED**:
> Outbound transactional emails require a verified domain in Resend (e.g. `@armanobags.com`).
> 1. **Separate Sender Variable**: The sender address is controlled by `RFQ_FROM_EMAIL` (e.g. `ARMANO B2B Desk <procurement@armanobags.com>`).
> 2. **No Invented Senders**: Application code refuses to invent or fallback to an arbitrary sender address. If `RFQ_FROM_EMAIL` is missing, sending is automatically disabled.
> 3. **Production Email Gate**: The environment variable `ENABLE_PRODUCTION_EMAIL` acts as an absolute safety switch. While set to `false`, outbound email remains strictly disabled (`status: 'disabled'`).
> 4. **Decoupled Database Persistence**: Database persistence operates **independently** of email delivery. A database-confirmed enquiry is **NEVER** marked as rejected merely because email delivery failed or was disabled.

---

## 3. Decoupled Persistence & Delivery Architecture

A commercial RFQ represents a critical manufacturing pipeline prospect. A database-confirmed quotation draft must **NEVER** be reported to the buyer as failed merely because an external email provider experienced a transient network glitch or the sender domain is awaiting DNS verification:

```
                  [Buyer Submits RFQ]
                           │
                           ▼
            [Step 1: Save to Database (Supabase)]
                           │
             ┌─────────────┴─────────────┐
             ▼                           ▼
      [Database Fails]           [Database Succeeds]
             │                           │
             ▼                           ▼
    [HTTP 500 Returned]        [Step 2: Attempt Email (Resend)]
  (User prompted to retry)               │
                           ┌─────────────┴─────────────┐
                           ▼                           ▼
                 [Email Fails/Disabled]       [Email Succeeds]
                           │                           │
                           ▼                           ▼
                 [Mark: email_failed]        [Mark: email_sent]
                           │                           │
                           └─────────────┬─────────────┘
                                         ▼
                            [Return HTTP 200 OK]
                   (Buyer receives confirmed Reference Number)
```

### 3.1 Failure Isolation Guarantee
- If Resend API returns an error, or if outbound sending is disabled awaiting domain verification:
  - The quotation draft remains safely stored in `public.rfq_enquiries`.
  - The record is flagged with `email_status = 'failed'` (or `'disabled'`).
  - The buyer receives a genuine HTTP 200 success response with their unique `reference_number`.
  - The factory procurement team can access the record directly in the Supabase database.

---

## 4. Resend Configuration Blueprint

### 4.1 Environment Variables
Add the following keys to your deployment environment:

```bash
# 1. Resend API Key (Generate from Resend Dashboard -> API Keys)
RESEND_API_KEY="re_xxxxxxxxxxxxxxxxxxxxxxxx"

# 2. Configurable Recipient (Client Gmail Account)
RFQ_RECIPIENT_EMAIL="armanoindustries@gmail.com"

# 3. Outbound Sender Address (Separate variable; set once domain is verified)
RFQ_FROM_EMAIL="ARMANO B2B Desk <procurement@armanobags.com>"

# 4. Production Email Gate (Set to 'true' ONLY after domain verification)
ENABLE_PRODUCTION_EMAIL="false"
```

---

## 5. Domain Verification & DNS Records (Client Checklist)

Before enabling `ENABLE_PRODUCTION_EMAIL="true"`, ARMANO's domain administrator must add the following DNS records in their DNS provider (Cloudflare, GoDaddy, Namecheap):

| Type | Name / Host | Value / Target | Priority | Purpose |
| :--- | :--- | :--- | :--- | :--- |
| **TXT** | `resend._domainkey` | *[Provided by Resend Dashboard]* | None | **DKIM** (Cryptographic message integrity) |
| **MX** | `feedback` (or sub) | `feedback-smtp.resend.com` | `10` | **Return-Path / MX** (Bounce handling) |
| **TXT** | `@` / Root | `v=spf1 include:amazonses.com ~all` | None | **SPF** (Sender authorization) |
| **TXT** | `_dmarc` | `v=DMARC1; p=quarantine; rua=mailto:dmarc@armanobags.com` | None | **DMARC** (Anti-spoofing policy) |

---

## 6. Email Template Specifications

The notification template dispatched by `src/lib/server/email.js` includes:
- **Header**: ARMANO Deep Forest Green `#10352C` with Gold `#C5A059` reference badge.
- **Reference Number**: `RFQ-YYYYMMDD-XXXXXX` (clickable tracking ID).
- **Target Silhouette**: Official SKU, Resolved Master Name, Category, Order Scale.
- **Client Profile**: Company Name, Contact Executive, Verified Business Email, Phone.
- **Technical Scope**: Custom dimensions, fabric preferences, customisation notes.
- **Statutory Audit**: DPDP Act consent version, timestamp, and marketing consent state.
- **Plaintext Alternative**: Full structured ASCII text version included for mail clients with HTML rendering disabled.
