# ARMANO — B2B RFQ Database Schema & Security Architecture

**Document Status**: Production-Ready Architectural Reference  
**Database Engine**: Supabase Managed PostgreSQL 15+  
**Security Model**: Row Level Security (RLS) with Total Anonymous Revocation (Least Privilege)  
**Migration Directory**: `supabase/migrations/`  
- `20261102_001_create_rfq_enquiries.sql`
- `20261102_002_create_rate_limiting.sql`

---

## 1. Schema Design Philosophy

The B2B quotation backend is architected on three core principles:
1. **Data Minimization**: Collect only what is strictly required to quote manufacturing volume and tech-packs.
2. **Master Catalogue Authority**: Product names and categories are resolved server-side from `src/data/products.js`. Client payloads cannot overwrite or corrupt product metadata.
3. **Defense-in-Depth RLS**: Direct table access is completely revoked from `anon`, `authenticated`, and `public` roles. Only the server-side Next.js route handler utilizing `SUPABASE_SERVICE_ROLE_KEY` can perform operations.

---

## 2. Table Specifications

### 2.1 Table: `public.rfq_enquiries`

Stores inbound commercial request for quotation records:

| Column Name | Data Type | Nullable | Default | Description & Constraint |
| :--- | :--- | :--- | :--- | :--- |
| `id` | `UUID` | No | `gen_random_uuid()` | Primary Key. |
| `created_at` | `TIMESTAMPTZ` | No | `now()` | Immutable creation audit timestamp. |
| `reference_number` | `VARCHAR(40)` | No | None | Unique quotation identifier (e.g. `RFQ-20261102-E8A1F3`). |
| `company_name` | `VARCHAR(150)` | No | None | Brand or business legal/operating name. |
| `contact_person` | `VARCHAR(100)` | No | None | Procurement executive or buyer contact. |
| `business_email` | `VARCHAR(255)` | No | None | Corporate email address (RFC 5322 validated). |
| `phone_number` | `VARCHAR(30)` | No | None | Telephone or WhatsApp number with country code. |
| `product_sku` | `VARCHAR(50)` | No | None | Validated SKU (`AR-001` through `AR-013` or `BESPOKE`). |
| `product_name` | `VARCHAR(150)` | No | None | Server-resolved title from trusted master catalogue. |
| `product_category`| `VARCHAR(100)` | No | None | Server-resolved category identifier. |
| `provisional_quantity`| `VARCHAR(50)`| No | None | Scale selection (`10000`, `20000`, `50000`, `custom`). |
| `custom_quantity` | `VARCHAR(50)` | Yes | `NULL` | Custom unit count or programme scope. |
| `customisation_requirements` | `TEXT` | Yes | `NULL` | Technical specifications, substrate notes, and tolerances. |
| `privacy_consent_at` | `TIMESTAMPTZ` | No | None | DPDP Act (2023) affirmative consent timestamp. |
| `privacy_policy_version` | `VARCHAR(30)` | No | None | Documented policy version agreed upon (e.g. `v1.0-pending-legal`). |
| `marketing_consent` | `BOOLEAN` | No | `false` | Segregated optional promotional updates consent. |
| `email_status` | `VARCHAR(30)` | No | `'pending'` | Lifecycle: `'pending'`, `'sent'`, `'disabled'`, `'failed'`. |
| `status` | `VARCHAR(30)` | No | `'submitted'` | Lifecycle: `'submitted'`, `'in_review'`, `'quoted'`, `'archived'`. |
| `updated_at` | `TIMESTAMPTZ` | No | `now()` | Record modification timestamp. |

#### Performance & Audit Indexes:
```sql
CREATE INDEX idx_rfq_enquiries_created_at ON public.rfq_enquiries(created_at DESC);
CREATE INDEX idx_rfq_enquiries_sku ON public.rfq_enquiries(product_sku);
CREATE INDEX idx_rfq_enquiries_ref ON public.rfq_enquiries(reference_number);
CREATE INDEX idx_rfq_enquiries_email ON public.rfq_enquiries(business_email);
CREATE INDEX idx_rfq_enquiries_status ON public.rfq_enquiries(status);
```

---

### 2.2 Table: `public.rfq_rate_limits`

Stores privacy-preserving, one-way SHA-256 hashes of client identities to enforce serverless rate limits without storing plaintext IP addresses:

| Column Name | Data Type | Nullable | Default | Description & Constraint |
| :--- | :--- | :--- | :--- | :--- |
| `client_hash` | `VARCHAR(64)` | No | None | Primary Key. HMAC-SHA-256 of IP with secret salt. |
| `request_count` | `INT` | No | `1` | Count of submissions within the sliding window. |
| `window_start` | `TIMESTAMPTZ` | No | `now()` | Start timestamp of current rate-limiting window. |
| `updated_at` | `TIMESTAMPTZ` | No | `now()` | Last increment timestamp. |

#### Atomic Stored Procedure:
```sql
CREATE OR REPLACE FUNCTION public.check_and_increment_rfq_rate_limit(
  p_client_hash VARCHAR(64),
  p_max_requests INT DEFAULT 5,
  p_window_seconds INT DEFAULT 600
)
RETURNS TABLE (
  allowed BOOLEAN,
  current_count INT,
  reset_in_seconds INT
)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
...
```

---

## 3. Row Level Security (RLS) & Permission Grants

### 3.1 Total Revocation from Untrusted Roles
Under default Supabase configurations, public tables are vulnerable if anon policies are improperly authored. We execute explicit revocations:

```sql
ALTER TABLE public.rfq_enquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.rfq_rate_limits ENABLE ROW LEVEL SECURITY;

REVOKE ALL ON public.rfq_enquiries FROM anon;
REVOKE ALL ON public.rfq_enquiries FROM authenticated;
REVOKE ALL ON public.rfq_enquiries FROM public;

REVOKE ALL ON public.rfq_rate_limits FROM anon;
REVOKE ALL ON public.rfq_rate_limits FROM authenticated;
REVOKE ALL ON public.rfq_rate_limits FROM public;
```

### 3.2 Service Role Privilege Matrix
The Next.js serverless route handler connects exclusively through the service role:

```sql
GRANT SELECT, INSERT, UPDATE ON public.rfq_enquiries TO service_role;
GRANT ALL ON public.rfq_rate_limits TO service_role;
GRANT EXECUTE ON FUNCTION public.check_and_increment_rfq_rate_limit TO service_role;

CREATE POLICY "Service role insert enquiry"
  ON public.rfq_enquiries FOR INSERT TO service_role WITH CHECK (true);

CREATE POLICY "Service role select enquiry"
  ON public.rfq_enquiries FOR SELECT TO service_role USING (true);

CREATE POLICY "Service role update enquiry"
  ON public.rfq_enquiries FOR UPDATE TO service_role USING (true);
```

---

## 4. Environment Variables & Key Segregation (2026 Supabase Architecture)

Supabase is deprecating legacy JWT-based API keys (`anon` / `service_role`) by the end of 2026 in favor of scoped API keys (`sb_pub_...` and `sb_secret_...`).

The ARMANO server-side client is architected to prioritize the modern `SUPABASE_SECRET_KEY` (`sb_secret_...`) while providing backwards compatibility with legacy `SUPABASE_SERVICE_ROLE_KEY`:

```
┌──────────────────────────────────────┬─────────────┬────────────────────────────────────────────┐
│ Variable Name                        │ Scope       │ Purpose                                    │
├──────────────────────────────────────┼─────────────┼────────────────────────────────────────────┤
│ SUPABASE_URL                         │ Server-only │ Supabase API project endpoint              │
│ SUPABASE_SECRET_KEY                  │ Server-only │ Modern scoped secret key (sb_secret_...)   │
│ SUPABASE_SERVICE_ROLE_KEY            │ Server-only │ Legacy fallback service role key           │
│ NEXT_PUBLIC_SUPABASE_URL             │ Browser/All │ Optional client URL (zero privileges)      │
│ RATE_LIMIT_SALT                      │ Server-only │ Secret salt for IP hash derivation         │
└──────────────────────────────────────┴─────────────┴────────────────────────────────────────────┘
```

> [!CAUTION]
> **ABSOLUTE RULE**: `SUPABASE_SECRET_KEY` and `SUPABASE_SERVICE_ROLE_KEY` must NEVER be prefixed with `NEXT_PUBLIC_` and must NEVER appear in client-side code bundles. All direct database operations are strictly mediated through server-side Next.js route handlers.

