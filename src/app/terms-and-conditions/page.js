import Link from 'next/link';
import { Container } from '@/components/ui/Container';
import { Badge } from '@/components/ui/Badge';
import { AlertTriangle } from 'lucide-react';

export const metadata = {
  title: 'Terms & Conditions (Draft Shell) | ARMANO Manufacturer Mumbai',
  description: 'Draft commercial B2B terms and conditions for manufacturing orders, counter-sampling, and production tolerances. Pending formal legal review.',
};

export default function TermsAndConditionsPage() {
  return (
    <div className="py-12 sm:py-20 bg-[#FBF9F5] text-[#121316]">
      <Container size="narrow">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="mb-8">
          <ol className="flex items-center space-x-2 text-xs font-mono text-[#5A5D64]">
            <li><Link href="/" className="hover:text-[#0A261D]">Home</Link></li>
            <li>/</li>
            <li className="text-[#C5A059] font-medium">Terms & Conditions (Draft Shell)</li>
          </ol>
        </nav>

        {/* Mandatory Draft Disclaimer Banner */}
        <div className="mb-10 p-5 rounded-sm bg-amber-500/10 border-l-4 border-amber-600 text-amber-950 text-xs space-y-2">
          <div className="flex items-center gap-2 font-mono uppercase tracking-wider font-bold text-amber-800">
            <AlertTriangle className="w-4 h-4 text-amber-700 shrink-0" />
            <span>[PROPOSED SPECIFICATION / DRAFT SHELL — PENDING FORMAL LEGAL REVIEW & CLIENT SIGN-OFF]</span>
          </div>
          <p className="leading-relaxed">
            This document represents a technical and commercial terms draft prepared during website foundation planning. It is NOT a final published commercial contract. It must not be considered a binding warranty or legal commitment until formally reviewed, customized, and executed by qualified legal counsel.
          </p>
        </div>

        {/* Document Content */}
        <div className="space-y-8 bg-white p-8 sm:p-12 rounded-sm border border-[#E8D5B5] shadow-sm">
          <div>
            <Badge variant="outline">Commercial B2B Framework Draft</Badge>
            <h1 className="text-3xl font-serif text-[#0A261D] mt-2 mb-3">
              Commercial Terms & Conditions (Draft Shell)
            </h1>
            <p className="text-xs text-[#5A5D64] font-mono">
              Governing Jurisdiction: Courts of Mumbai, Maharashtra, India • Status: Pending Client Sign-Off
            </p>
          </div>

          <div className="space-y-6 text-sm text-[#5A5D64] leading-relaxed">
            <section className="space-y-2">
              <h2 className="text-base font-serif font-bold text-[#0A261D]">1. Nature of Engagement (B2B Contract Manufacturing)</h2>
              <p>
                ARMANO operates exclusively as a contract manufacturer for commercial buyers, brand owners, and procurement entities. Transactions are governed under business-to-business commercial contracting standards and the Sale of Goods Act, 1930.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-base font-serif font-bold text-[#0A261D]">2. Quotations & Provisional Order Quantities</h2>
              <p>
                References to order scales of 10,000, 20,000, and 50,000 units represent provisional RFQ selection choices based on preliminary verbal discussions. Binding MOQs, unit rates, tooling charges, and delivery schedules will be established strictly within formal written Proforma Invoices or Commercial Purchase Agreements.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-base font-serif font-bold text-[#0A261D]">3. Pre-Production Counter-Sampling Protocol</h2>
              <p>
                Production of mass assembly line units commences only after physical counter-sample inspection and formal written approval by the authorized buyer representative. Minor allowable industrial manufacturing tolerances (±3% dimensional, subtle dye-lot variance) apply to all custom fabrications.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-base font-serif font-bold text-[#0A261D]">4. Intellectual Property & Brand Indemnification</h2>
              <p>
                The buyer warrants that all artwork, trademarks, debossing dies, and logos provided for stamping on pouches are owned by or formally licensed to the buyer, and indemnifies ARMANO against any third-party trademark infringement claims.
              </p>
            </section>
          </div>
        </div>
      </Container>
    </div>
  );
}
