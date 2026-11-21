# ARMANO — B2B RFQ Data Retention & Subject Rights Plan

**Document Status**: Proposed Policy Blueprint — **`[AWAITING FORMAL CLIENT LEGAL COUNSEL APPROVAL]`**  
**Compliance Context**: Digital Personal Data Protection Act (DPDP Act, 2023 - India), Information Technology Act (2000), General Data Protection Regulation (GDPR - EU cross-border commercial inquiries).  
**Data Controller**: ARMANO (Manufacturing Division, Sion-Dharavi Industrial Belt, Mumbai, Maharashtra, India).  
**Application Scope**: B2B Request For Quotation (RFQ) Gateway (`/contact`, `/api/enquiry`) and Supabase PostgreSQL Database (`rfq_enquiries`).

---

## 1. Statutory Notice & Client Authority Disclaimer

> [!IMPORTANT]
> **LEGAL RETENTION SCHEDULE DISCLAIMER**:
> This data retention schedule represents an engineering and application security proposal prepared for client governance review. In accordance with strict development standards, **neither the development team nor technical documentation invents or legally certifies the client's statutory retention period**. Formal commercial retention windows, archival durations, and tax/accounting compliance schedules must be reviewed and countersigned by the authorized legal counsel of ARMANO prior to public commercial deployment.

---

## 2. Minimal Data Collection Architecture

Under Section 6(1) of the Indian DPDP Act (2023), personal data collection must be limited to what is strictly necessary for the specified commercial purpose.

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                       COLLECTED DATA FIELDS & PURPOSES                      │
├─────────────────────┬──────────────┬────────────────────────────────────────┤
│ Field               │ Storage Type │ Commercial Purpose & Justification     │
├─────────────────────┼──────────────┼────────────────────────────────────────┤
│ company_name        │ Plaintext    │ Entity identification for B2B pricing  │
│ contact_person      │ Plaintext    │ Addressing technical quotation drafts  │
│ business_email      │ Plaintext    │ Quotation draft delivery & feedback    │
│ phone_number        │ Plaintext    │ Factory follow-up / WhatsApp fitment   │
│ product_sku         │ Plaintext    │ Silhouette identification from master  │
│ provisional_scale   │ Plaintext    │ Factory capacity & unit tiering        │
│ tech_spec_notes     │ Plaintext    │ Substrate, dimension & branding notes  │
│ privacy_consent_at  │ ISO 8601     │ Statutory consent audit record (DPDP)  │
│ marketing_consent   │ Boolean      │ Segregated optional communication log  │
│ client_hash         │ SHA-256 Hex  │ Privacy-preserving rate limit tracking │
└─────────────────────┴──────────────┴────────────────────────────────────────┘
```

### 2.1 Non-Collection Affirmation
The platform explicitly enforces the **non-collection** of extraneous or sensitive data:
- **No IP Addresses in Plaintext**: Client IP addresses are NEVER stored in `rfq_enquiries` or server logs. Only a salted, one-way SHA-256 hash (`client_hash`) is temporarily stored in `rfq_rate_limits` for 10-minute rate limiting windows, auto-purged after 1 hour.
- **No User-Agent Fingerprinting**: Full browser user-agent strings are omitted from enquiry storage.
- **No Passwords or Financial Details**: Zero credit card numbers, bank accounts, or payment tokens are accepted.
- **No Unverified Tax Records**: Tax identification numbers (GSTIN/IEC) are not collected in this initial quotation drafting stage.

---

## 3. Proposed Retention Windows (For Client Approval)

```
[Inbound B2B RFQ Submitted]
          │
          ▼
┌─────────────────────────────────────────────────────────┐
│ ACTIVE ENQUIRY PHASE (Months 1–6)                       │
│ - Technical counter-sampling, sizing & CAD fitment      │
│ - Status: submitted -> in_review -> sampled -> quoted   │
└─────────────────────────────────────────────────────────┘
          │
          ├── If commercial contract executed:
          │     └── Transition to Official Client Accounting System (7 Years statutory)
          │
          └── If commercial inquiry remains dormant / uncontracted:
                │
                ▼
┌─────────────────────────────────────────────────────────┐
│ PROPOSED DORMANT ARCHIVAL PHASE (Months 7–24)           │
│ - Retained in restricted database for quotation history │
│ - Client review recommended for purge threshold         │
└─────────────────────────────────────────────────────────┘
                │
                ▼
┌─────────────────────────────────────────────────────────┐
│ AUTOMATED / MANUAL PURGE PHASE (Month 24+)              │
│ - Hard deletion of personal identifying fields          │
│ - Anonymization of SKU & volume data for factory stats  │
└─────────────────────────────────────────────────────────┘
```

| Lifecycle Category | Proposed Retention Duration | Justification & Governance Action |
| :--- | :--- | :--- |
| **Active Quotation Inquiries** | **6 Months** | Period required for physical counter-sampling, material swatch dispatch, and price negotiation. |
| **Dormant / Uncontracted Inquiries** | **18–24 Months** `[PROPOSED]` | Allows returning brand buyers to reference historical quotation estimates across seasonal buying cycles. |
| **Executed Manufacturing Orders** | **7 Years (84 Months)** | Governed by Section 128 of the Companies Act (2013) and statutory GST commercial record-keeping rules. |
| **Rate-Limiter Security Hashes** | **1 Hour** | Auto-purged via `check_and_increment_rfq_rate_limit` stored procedure. |
| **Transactional Email Server Logs** | **30 Days** | Standard Resend delivery diagnostic retention window. |

---

## 4. Data Subject Rights & Deletion Protocol

Under the DPDP Act (2023) and international privacy frameworks, commercial buyers retain specific rights regarding their personal contact data:

### 4.1 Right to Withdraw Consent & Request Erasure
A prospective buyer may at any time request the permanent deletion of their contact record from ARMANO's database:
1. **Intake Channel**: Formal request transmitted to `privacy@armanobags.com` or directly communicated to the factory desk (`+91 8591897469`).
2. **Identity Verification**: The request must originate from the matching `business_email` recorded on the RFQ.
3. **Execution**: The database administrator executes an atomic deletion:
   ```sql
   DELETE FROM public.rfq_enquiries 
   WHERE business_email = 'procurement@brand.com'
     AND status != 'contracted_order';
   ```
4. **Resolution SLA**: Completed within **7 business days** of verified receipt, with written confirmation dispatched to the data subject.

### 4.2 Segregation of Marketing Consent
- **Opt-In Requirement**: Marketing communications are strictly gated behind an unselected, affirmative checkbox on the RFQ form.
- **Zero Cross-Contamination**: Declining marketing consent has zero impact on the processing or fulfillment of the commercial RFQ.
- **Immediate Opt-Out**: Every subsequent catalogue or material release email must include an automated one-click unsubscribe mechanism.

---

## 5. Next Steps for Client Formalization

Before deploying the platform into commercial production:
1. Provide a copy of this Data Retention Plan to ARMANO's corporate legal counsel.
2. Confirm whether the proposed 24-month dormant retention period satisfies the company's internal risk tolerances.
3. Designate an official Data Protection Officer / Privacy Point of Contact and establish a dedicated mailbox for data subject privacy requests.
4. Execute formal countersignature on the public Privacy Policy (`/privacy-policy`) to transition status from `v1.0-pending-legal` to active certified policy.
