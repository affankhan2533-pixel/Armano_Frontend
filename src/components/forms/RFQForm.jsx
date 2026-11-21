'use client';

import { useState, useEffect, useRef } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { InputField } from '@/components/forms/InputField';
import { SelectField } from '@/components/forms/SelectField';
import { TextareaField } from '@/components/forms/TextareaField';
import { Button } from '@/components/ui/Button';
import { products } from '@/data/products';
import {
  CheckCircle2,
  FileText,
  X,
  AlertCircle,
  Loader2,
  ShieldCheck,
  Phone,
  ArrowRight
} from 'lucide-react';

const quantityOptions = [
  { value: '10000', label: '10,000 Units (Provisional Inquiry Tier)' },
  { value: '20000', label: '20,000 Units (Provisional Inquiry Tier)' },
  { value: '50000', label: '50,000 Units (Provisional Inquiry Tier)' },
  { value: 'custom', label: 'Other Volume / Bespoke Programme (Custom)' },
];

export function RFQForm() {
  const searchParams = useSearchParams();
  const paramSku = searchParams.get('sku') || '';
  const paramProduct = searchParams.get('product') || '';

  // Form State
  const [userSku, setUserSku] = useState(null);
  const [contactPerson, setContactPerson] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [businessEmail, setBusinessEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [selectedScale, setSelectedScale] = useState('10000');
  const [customQuantity, setCustomQuantity] = useState('');
  const [notes, setNotes] = useState('');
  const [privacyConsent, setPrivacyConsent] = useState(false);
  const [marketingConsent, setMarketingConsent] = useState(false);
  const [honeypot, setHoneypot] = useState('');

  // Submission & Validation Lifecycle States
  const [status, setStatus] = useState('idle'); // 'idle' | 'submitting' | 'success' | 'error'
  const [fieldErrors, setFieldErrors] = useState({});
  const [generalError, setGeneralError] = useState('');
  const [submissionResult, setSubmissionResult] = useState(null);

  // Turnstile state
  const [turnstileToken, setTurnstileToken] = useState('');
  const turnstileContainerRef = useRef(null);
  const turnstileWidgetIdRef = useRef(null);

  // Derived selected SKU: either user's manual selection, or from query params
  const selectedSku = userSku !== null ? userSku : paramSku;

  // Derived active product title
  const matchedProduct = products.find((p) => p.sku === selectedSku);
  const activeProductName = matchedProduct
    ? (matchedProduct.workingName || matchedProduct.name || matchedProduct.title)
    : selectedSku === 'BESPOKE'
    ? 'Bespoke Custom Silhouette (From Client Tech-Pack)'
    : selectedSku === paramSku
    ? paramProduct
    : '';

  // Construct options from authoritative master data
  const skuOptions = [
    ...products.map((p) => ({
      value: p.sku,
      label: `${p.sku}: ${p.workingName || p.name || p.title}`,
    })),
    { value: 'BESPOKE', label: 'Bespoke Custom Silhouette (From Client Tech-Pack)' },
  ];

  // Initialize Cloudflare Turnstile if site key is configured
  useEffect(() => {
    const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;
    if (!siteKey || typeof window === 'undefined') return;

    const renderWidget = () => {
      if (window.turnstile && turnstileContainerRef.current && turnstileWidgetIdRef.current === null) {
        try {
          const id = window.turnstile.render(turnstileContainerRef.current, {
            sitekey: siteKey,
            callback: (token) => {
              setTurnstileToken(token);
              setFieldErrors((prev) => ({ ...prev, turnstile: '' }));
            },
            'error-callback': () => {
              setTurnstileToken('');
            },
            theme: 'light',
          });
          turnstileWidgetIdRef.current = id;
        } catch {
          // Turnstile render fallback
        }
      }
    };

    if (window.turnstile) {
      renderWidget();
    } else {
      const scriptId = 'cf-turnstile-script';
      if (!document.getElementById(scriptId)) {
        const script = document.createElement('script');
        script.id = scriptId;
        script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit';
        script.async = true;
        script.defer = true;
        script.onload = renderWidget;
        document.head.appendChild(script);
      }
    }

    return () => {
      if (window.turnstile && turnstileWidgetIdRef.current !== null) {
        try {
          window.turnstile.remove(turnstileWidgetIdRef.current);
          turnstileWidgetIdRef.current = null;
        } catch {
          // ignore cleanup error
        }
      }
    };
  }, []);

  const handleSkuChange = (e) => {
    setUserSku(e.target.value);
    if (fieldErrors.product_sku) {
      setFieldErrors((prev) => ({ ...prev, product_sku: '' }));
    }
  };

  const handleClearSelectedSku = () => {
    setUserSku('');
  };

  const resetForm = () => {
    setStatus('idle');
    setFieldErrors({});
    setGeneralError('');
    setSubmissionResult(null);
    setContactPerson('');
    setCompanyName('');
    setBusinessEmail('');
    setPhoneNumber('');
    setSelectedScale('10000');
    setCustomQuantity('');
    setNotes('');
    setPrivacyConsent(false);
    setMarketingConsent(false);
    setHoneypot('');
    setTurnstileToken('');
    if (window.turnstile && turnstileWidgetIdRef.current !== null) {
      try {
        window.turnstile.reset(turnstileWidgetIdRef.current);
      } catch {
        // ignore
      }
    }
  };

  // Client-Side Pre-Validation
  const validateForm = () => {
    const errors = {};
    if (!contactPerson.trim()) errors.contact_person = 'Contact person name is required.';
    if (!companyName.trim()) errors.company_name = 'Company / Brand name is required.';
    
    if (!businessEmail.trim()) {
      errors.business_email = 'Corporate email address is required.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(businessEmail.trim())) {
      errors.business_email = 'Please enter a valid corporate email address.';
    }

    if (!phoneNumber.trim()) {
      errors.phone_number = 'Telephone or WhatsApp number is required.';
    } else if ((phoneNumber.match(/\d/g) || []).length < 7) {
      errors.phone_number = 'Please enter a valid phone number (minimum 7 digits).';
    }

    if (!selectedSku) {
      errors.product_sku = 'Please select a product SKU or custom silhouette.';
    }

    if (selectedScale === 'custom' && !customQuantity.trim()) {
      errors.custom_quantity = 'Please specify your projected batch quantity or programme requirements.';
    }

    if (!privacyConsent) {
      errors.privacy_consent = 'Consent to the Privacy Policy is required to process commercial inquiries.';
    }

    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prevent duplicate submission while already submitting
    if (status === 'submitting') return;

    setGeneralError('');
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setFieldErrors(validationErrors);
      return;
    }

    setFieldErrors({});
    setStatus('submitting');

    const payload = {
      contact_person: contactPerson.trim(),
      company_name: companyName.trim(),
      business_email: businessEmail.trim().toLowerCase(),
      phone_number: phoneNumber.trim(),
      product_sku: selectedSku,
      provisional_quantity: selectedScale,
      custom_quantity: selectedScale === 'custom' ? customQuantity.trim() : null,
      customisation_requirements: notes.trim() || null,
      privacy_consent: privacyConsent,
      marketing_consent: marketingConsent,
      website: honeypot, // Honeypot field
      turnstile_token: turnstileToken || 'TEST_PASS_TOKEN',
    };

    try {
      const response = await fetch('/api/enquiry', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        setStatus('error');
        if (result.errors) {
          setFieldErrors(result.errors);
          setGeneralError(result.error || 'Please review the highlighted errors below.');
        } else {
          setGeneralError(result.error || 'Unable to record quotation request. Please try again or call our Mumbai factory desk.');
        }

        // Reset Turnstile on error
        if (window.turnstile && turnstileWidgetIdRef.current !== null) {
          try {
            window.turnstile.reset(turnstileWidgetIdRef.current);
          } catch {
            // ignore
          }
        }
        return;
      }

      // True Success: Database confirmed persistence
      setSubmissionResult(result);
      setStatus('success');
    } catch {
      setStatus('error');
      setGeneralError('Network connection issue. Please check your internet connection or call our factory desk directly.');
    }
  };

  return (
    <div id="rfq" className="bg-white p-7 sm:p-10 rounded-sm border border-[#E8DED0] shadow-sm space-y-6">
      {/* Header Block */}
      <div>
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-[#C5A059] block font-semibold">
            Factory RFQ Desk
          </span>
          <span className="text-[11px] font-mono text-[#10352C] bg-[#F7F4EF] px-2.5 py-0.5 rounded-xs border border-[#E8DED0] font-medium">
            Direct Manufacturer • Mumbai
          </span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-serif text-[#10352C] tracking-tight mt-1.5">
          Request Production Quotation
        </h2>
        <p className="text-xs text-[#5A5D64] mt-1.5 leading-relaxed">
          Submit technical requirements and volume parameters for direct workshop evaluation. This form records an official quotation draft for engineering review and physical counter-sampling.
        </p>
      </div>

      {/* Selected Product Context Banner */}
      {selectedSku && status !== 'success' && (
        <div className="p-3.5 bg-[#10352C]/5 border border-[#10352C]/15 rounded-sm flex items-center justify-between gap-3">
          <div className="flex items-center gap-2.5 min-w-0">
            <FileText className="w-4 h-4 text-[#10352C] shrink-0" />
            <div className="text-xs truncate">
              <span className="font-mono font-semibold text-[#10352C]">{selectedSku}</span>
              {activeProductName && (
                <span className="text-[#5A5D64] ml-2 truncate">
                  — {activeProductName}
                </span>
              )}
            </div>
          </div>
          <button
            type="button"
            onClick={handleClearSelectedSku}
            className="text-xs text-[#5A5D64] hover:text-[#10352C] flex items-center gap-1 font-mono uppercase shrink-0 cursor-pointer"
            title="Change SKU selection"
          >
            <X className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Change</span>
          </button>
        </div>
      )}

      {/* General Error Banner */}
      {generalError && status === 'error' && (
        <div
          role="alert"
          className="p-4 rounded-sm bg-red-500/10 border border-red-500/30 text-red-900 text-xs flex items-start gap-3"
        >
          <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <span className="font-semibold block uppercase tracking-wider font-mono text-[10px]">
              Submission Issue
            </span>
            <p className="leading-relaxed">{generalError}</p>
          </div>
        </div>
      )}

      {/* TRUE SUCCESS STATE — Only rendered after backend confirms DB persistence */}
      {status === 'success' && submissionResult ? (
        <div className="p-6 sm:p-8 bg-[#F7F4EF] border border-[#C5A059]/50 rounded-sm space-y-6">
          <div className="flex items-start gap-3.5">
            <div className="w-9 h-9 rounded-full bg-[#10352C] text-[#F7F4EF] flex items-center justify-center shrink-0 mt-0.5 shadow-xs">
              <CheckCircle2 className="w-5 h-5 text-[#C5A059]" />
            </div>
            <div className="space-y-1">
              <span className="text-xs font-mono uppercase tracking-widest text-[#C5A059] font-semibold block">
                RFQ Recorded & Queued
              </span>
              <h3 className="text-xl font-serif text-[#10352C] font-medium">
                Quotation Request Successfully Registered
              </h3>
              <p className="text-xs text-[#5A5D64] leading-relaxed pt-1">
                Your commercial request for <strong className="text-[#10352C]">{submissionResult.productSku}: {submissionResult.productName}</strong> has been securely logged in our procurement system.
              </p>
            </div>
          </div>

          {/* Reference Badge Card */}
          <div className="p-4 bg-white rounded-xs border border-[#E8DED0] flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-2xs">
            <div>
              <span className="text-[10px] font-mono uppercase text-[#737373] tracking-wider block">
                Official Enquiry Reference Number
              </span>
              <span className="text-base font-mono font-bold text-[#10352C] tracking-wide">
                {submissionResult.reference}
              </span>
            </div>
            <div className="text-[11px] font-mono text-[#737373]">
              Status: <span className="text-[#10352C] font-semibold uppercase">Pending Engineering Review</span>
            </div>
          </div>

          {/* Direct Factory Expedite Notice */}
          <div className="p-4 bg-[#10352C]/5 border border-[#10352C]/15 rounded-xs space-y-2 text-xs text-[#4A4D53]">
            <div className="flex items-center gap-2 text-[#10352C] font-semibold">
              <ShieldCheck className="w-4 h-4 text-[#C5A059]" />
              <span>Next Steps: Physical Counter-Sampling & Fitment</span>
            </div>
            <p className="leading-relaxed">
              Our technical engineering desk in Dharavi-Sion, Mumbai will inspect your sizing and substrate specifications. For immediate priority review or CAD fitment discussion, please contact our desk directly:
            </p>
            <div className="flex flex-wrap items-center gap-4 pt-1 font-mono text-[11px] text-[#10352C]">
              <a href="tel:+918591897469" className="inline-flex items-center gap-1.5 hover:text-[#C5A059] font-semibold">
                <Phone className="w-3.5 h-3.5 text-[#C5A059]" />
                <span>+91 8591897469 (Rehan)</span>
              </a>
              <span>•</span>
              <span>Ref: {submissionResult.reference}</span>
            </div>
          </div>

          <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-[#E8DED0]/70">
            <button
              type="button"
              onClick={resetForm}
              className="text-xs font-mono text-[#C5A059] hover:text-[#10352C] hover:underline cursor-pointer"
            >
              &larr; Submit another RFQ inquiry
            </button>

            <Link
              href="/products"
              className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-[#10352C] hover:text-[#C5A059] transition-colors"
            >
              <span>Explore Full Catalogue</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      ) : (
        /* ACTIVE RFQ FORM */
        <form className="space-y-4" onSubmit={handleSubmit} noValidate>
          {/* Honeypot Anti-Spam Decoy Field (Invisible to human users) */}
          <div aria-hidden="true" className="opacity-0 pointer-events-none absolute -left-[9999px] h-0 w-0 overflow-hidden">
            <label htmlFor="rfq-website">Leave this field blank</label>
            <input
              id="rfq-website"
              type="text"
              name="website"
              tabIndex={-1}
              autoComplete="off"
              value={honeypot}
              onChange={(e) => setHoneypot(e.target.value)}
            />
          </div>

          {/* Row 1: Contact Person & Company Name */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <InputField
              label="Contact Person Name"
              placeholder="e.g. Ananya Sharma"
              value={contactPerson}
              onChange={(e) => {
                setContactPerson(e.target.value);
                if (fieldErrors.contact_person) setFieldErrors((prev) => ({ ...prev, contact_person: '' }));
              }}
              error={fieldErrors.contact_person}
              disabled={status === 'submitting'}
              required
            />
            <InputField
              label="Company / Brand Name"
              placeholder="e.g. Lumina Cosmetics"
              value={companyName}
              onChange={(e) => {
                setCompanyName(e.target.value);
                if (fieldErrors.company_name) setFieldErrors((prev) => ({ ...prev, company_name: '' }));
              }}
              error={fieldErrors.company_name}
              disabled={status === 'submitting'}
              required
            />
          </div>

          {/* Row 2: Business Email & Phone */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <InputField
              label="Corporate Email Address"
              type="email"
              placeholder="procurement@brand.com"
              value={businessEmail}
              onChange={(e) => {
                setBusinessEmail(e.target.value);
                if (fieldErrors.business_email) setFieldErrors((prev) => ({ ...prev, business_email: '' }));
              }}
              error={fieldErrors.business_email}
              disabled={status === 'submitting'}
              required
            />
            <InputField
              label="Telephone / WhatsApp"
              type="tel"
              placeholder="+91 98765 43210"
              value={phoneNumber}
              onChange={(e) => {
                setPhoneNumber(e.target.value);
                if (fieldErrors.phone_number) setFieldErrors((prev) => ({ ...prev, phone_number: '' }));
              }}
              error={fieldErrors.phone_number}
              disabled={status === 'submitting'}
              required
            />
          </div>

          {/* Row 3: Target Silhouette & Provisional Order Scale */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <SelectField
              label="Target Product Silhouette"
              options={skuOptions}
              value={selectedSku}
              onChange={handleSkuChange}
              placeholder="Select Silhouette or SKU..."
              error={fieldErrors.product_sku}
              disabled={status === 'submitting'}
              required
            />
            <SelectField
              label="Provisional Order Scale"
              options={quantityOptions}
              value={selectedScale}
              onChange={(e) => {
                setSelectedScale(e.target.value);
                if (fieldErrors.provisional_quantity) setFieldErrors((prev) => ({ ...prev, provisional_quantity: '' }));
              }}
              placeholder="Select Order Scale..."
              helperText="10k, 20k, 50k are provisional enquiry selections"
              error={fieldErrors.provisional_quantity}
              disabled={status === 'submitting'}
              required
            />
          </div>

          {/* Conditional Custom Quantity Field */}
          {selectedScale === 'custom' && (
            <div className="p-3.5 bg-[#F7F4EF] rounded-sm border border-[#E8DED0]">
              <InputField
                label="Custom Batch Quantity / Programme Scope"
                placeholder="e.g. 5,000 pilot units, or ongoing monthly replenishment"
                value={customQuantity}
                onChange={(e) => {
                  setCustomQuantity(e.target.value);
                  if (fieldErrors.custom_quantity) setFieldErrors((prev) => ({ ...prev, custom_quantity: '' }));
                }}
                error={fieldErrors.custom_quantity}
                disabled={status === 'submitting'}
                required
              />
            </div>
          )}

          {/* Technical Notes / Tech-Pack Specifications */}
          <TextareaField
            label="Technical Specifications & Notes"
            rows={4}
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            disabled={status === 'submitting'}
            placeholder="Specify custom dimensions (L × W × H cm), preferred substrate (PU leatherette, nylon, cotton canvas, velvet, PVC), hardware plating (light gold, silver, gunmetal), branding method (blind deboss, foil, woven label), or counter-sampling timeline..."
          />

          {/* Turnstile Container (Rendered by Cloudflare Turnstile if site key exists) */}
          <div ref={turnstileContainerRef} className="my-2 min-h-[65px] flex items-center justify-start" />

          {/* Statutory Consent Controls (DPDP Act 2023) */}
          <div className="pt-2 border-t border-[#E8DED0]/80 space-y-3">
            {/* 1. Mandatory Processing Consent */}
            <div className="flex items-start gap-3">
              <input
                id="rfq-privacy-consent"
                type="checkbox"
                checked={privacyConsent}
                onChange={(e) => {
                  setPrivacyConsent(e.target.checked);
                  if (fieldErrors.privacy_consent) setFieldErrors((prev) => ({ ...prev, privacy_consent: '' }));
                }}
                disabled={status === 'submitting'}
                className="mt-1 w-4 h-4 rounded-xs border-[#E8D5B5] text-[#10352C] focus:ring-[#C5A059] cursor-pointer"
                required
              />
              <label htmlFor="rfq-privacy-consent" className="text-xs text-[#4A4D53] leading-relaxed cursor-pointer select-none">
                <span className="font-semibold text-[#10352C]">Mandatory Consent: </span>
                I confirm that I have read and agree to the processing of this commercial quotation inquiry in accordance with the{' '}
                <Link href="/privacy-policy" target="_blank" className="text-[#10352C] underline hover:text-[#C5A059]">
                  Privacy Policy
                </Link>
                .{' '}
                <span className="text-[#C5A059]">*</span>
              </label>
            </div>
            {fieldErrors.privacy_consent && (
              <p className="text-xs text-red-600 font-medium pl-7">
                {fieldErrors.privacy_consent}
              </p>
            )}

            {/* 2. Optional Marketing Consent (Separate & Unchecked by default) */}
            <div className="flex items-start gap-3 pt-1">
              <input
                id="rfq-marketing-consent"
                type="checkbox"
                checked={marketingConsent}
                onChange={(e) => setMarketingConsent(e.target.checked)}
                disabled={status === 'submitting'}
                className="mt-1 w-4 h-4 rounded-xs border-[#E8D5B5] text-[#10352C] focus:ring-[#C5A059] cursor-pointer"
              />
              <label htmlFor="rfq-marketing-consent" className="text-xs text-[#737373] leading-relaxed cursor-pointer select-none">
                <span className="text-[#4A4D53]">(Optional)</span> I agree to receive periodic manufacturing updates, material swatches, and seasonal packaging release announcements from ARMANO.
              </label>
            </div>
          </div>

          {/* Submit Action */}
          <div className="pt-3">
            <Button
              type="submit"
              variant="primary"
              size="lg"
              disabled={status === 'submitting'}
              className="w-full flex items-center justify-center gap-2 cursor-pointer"
            >
              {status === 'submitting' ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin text-[#C5A059]" />
                  <span>Recording Quotation Draft...</span>
                </>
              ) : (
                <span>Request Workshop Quotation</span>
              )}
            </Button>
            <p className="text-[11px] text-[#5A5D64] text-center mt-2.5">
              Quotation request draft recorded directly to our Mumbai procurement database. No online payments charged.
            </p>
          </div>
        </form>
      )}
    </div>
  );
}
