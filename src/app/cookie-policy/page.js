import Link from 'next/link';
import { Container } from '@/components/ui/Container';
import { Badge } from '@/components/ui/Badge';
import { AlertTriangle, CheckCircle } from 'lucide-react';

export const metadata = {
  title: 'Cookie Policy (Zero-Tracker Disclosure) | ARMANO Manufacturer Mumbai',
  description: 'Cookie policy and zero-tracking disclosure for ARMANO digital flagship. Privacy-first architecture without intrusive third-party ad pixels.',
};

export default function CookiePolicyPage() {
  return (
    <div className="py-12 sm:py-20 bg-[#FBF9F5] text-[#121316]">
      <Container size="narrow">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="mb-8">
          <ol className="flex items-center space-x-2 text-xs font-mono text-[#5A5D64]">
            <li><Link href="/" className="hover:text-[#0A261D]">Home</Link></li>
            <li>/</li>
            <li className="text-[#C5A059] font-medium">Cookie Policy (Draft Shell)</li>
          </ol>
        </nav>

        {/* Mandatory Draft Disclaimer Banner */}
        <div className="mb-10 p-5 rounded-sm bg-amber-500/10 border-l-4 border-amber-600 text-amber-950 text-xs space-y-2">
          <div className="flex items-center gap-2 font-mono uppercase tracking-wider font-bold text-amber-800">
            <AlertTriangle className="w-4 h-4 text-amber-700 shrink-0" />
            <span>[PROPOSED SPECIFICATION / DRAFT SHELL — PENDING FORMAL LEGAL REVIEW & CLIENT SIGN-OFF]</span>
          </div>
          <p className="leading-relaxed">
            This document represents a technical disclosure draft prepared during website foundation planning. It is NOT a final published policy. It outlines our zero-tracking architectural stance pending client operational sign-off.
          </p>
        </div>

        {/* Document Content */}
        <div className="space-y-8 bg-white p-8 sm:p-12 rounded-sm border border-[#E8D5B5] shadow-sm">
          <div>
            <Badge variant="outline">Privacy Architecture Disclosure</Badge>
            <h1 className="text-3xl font-serif text-[#0A261D] mt-2 mb-3">
              Cookie Policy & Tracking Architecture (Draft Shell)
            </h1>
            <p className="text-xs text-[#5A5D64] font-mono">
              Status: Zero Active Third-Party Ad Cookies Deployed
            </p>
          </div>

          <div className="space-y-6 text-sm text-[#5A5D64] leading-relaxed">
            <div className="p-4 rounded-sm bg-[#0A261D]/5 border border-[#0A261D]/15 flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-[#0A261D] shrink-0 mt-0.5" />
              <div className="text-xs text-[#0A261D] leading-relaxed">
                <strong className="block font-medium mb-1">Zero Third-Party Advertising Pixels:</strong>
                ARMANO does not deploy invasive cross-site tracking pixels (e.g. Meta Pixel, TikTok Pixel, Google Ads remarketing) in Phase 1.
              </div>
            </div>

            <section className="space-y-2">
              <h2 className="text-base font-serif font-bold text-[#0A261D]">1. Essential Technical Cookies Only</h2>
              <p>
                The platform utilizes only strictly necessary first-party cookies and session state required for HTTP request routing, CSRF protection, and user interface preferences (such as mobile drawer state).
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-base font-serif font-bold text-[#0A261D]">2. Cloudflare Security Tokens</h2>
              <p>
                When Cloudflare Turnstile anti-bot verification is integrated in Phase 3, standard ephemeral security challenge tokens may be set to block automated spam submissions to the RFQ desk.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-base font-serif font-bold text-[#0A261D]">3. Browser Control</h2>
              <p>
                Users may disable cookies entirely through their browser settings without degrading access to catalogue specifications or static content.
              </p>
            </section>
          </div>
        </div>
      </Container>
    </div>
  );
}
