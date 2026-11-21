import Link from 'next/link';
import { Container } from '@/components/ui/Container';
import { Badge } from '@/components/ui/Badge';
import { AlertTriangle } from 'lucide-react';

export const metadata = {
  title: 'Returns & Inspection Policy (Draft Shell) | ARMANO Manufacturer Mumbai',
  description: 'Draft commercial policy governing custom counter-sampling, batch quality control, and manufacturing defect claims. Pending formal legal review.',
};

export default function ReturnsAndRefundsPage() {
  return (
    <div className="py-12 sm:py-20 bg-[#FBF9F5] text-[#121316]">
      <Container size="narrow">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="mb-8">
          <ol className="flex items-center space-x-2 text-xs font-mono text-[#5A5D64]">
            <li><Link href="/" className="hover:text-[#0A261D]">Home</Link></li>
            <li>/</li>
            <li className="text-[#C5A059] font-medium">Returns & Inspection (Draft Shell)</li>
          </ol>
        </nav>

        {/* Mandatory Draft Disclaimer Banner */}
        <div className="mb-10 p-5 rounded-sm bg-amber-500/10 border-l-4 border-amber-600 text-amber-950 text-xs space-y-2">
          <div className="flex items-center gap-2 font-mono uppercase tracking-wider font-bold text-amber-800">
            <AlertTriangle className="w-4 h-4 text-amber-700 shrink-0" />
            <span>[PROPOSED SPECIFICATION / DRAFT SHELL — PENDING FORMAL LEGAL REVIEW & CLIENT SIGN-OFF]</span>
          </div>
          <p className="leading-relaxed">
            This document represents a commercial returns and inspection protocol draft prepared during website foundation planning. It is NOT a final published policy. It outlines industrial B2B counter-sample inspection standards pending client operational sign-off.
          </p>
        </div>

        {/* Document Content */}
        <div className="space-y-8 bg-white p-8 sm:p-12 rounded-sm border border-[#E8D5B5] shadow-sm">
          <div>
            <Badge variant="outline">Quality Control Protocol Draft</Badge>
            <h1 className="text-3xl font-serif text-[#0A261D] mt-2 mb-3">
              Batch Inspection & Defect Protocol (Draft Shell)
            </h1>
            <p className="text-xs text-[#5A5D64] font-mono">
              Industrial Standard: AQL 2.5 Sampling Inspection Protocol
            </p>
          </div>

          <div className="space-y-6 text-sm text-[#5A5D64] leading-relaxed">
            <section className="space-y-2">
              <h2 className="text-base font-serif font-bold text-[#0A261D]">1. Custom Made-to-Order Nature</h2>
              <p>
                All products manufactured by ARMANO are custom-fabricated based on approved tech-packs and pre-production counter-samples. Because materials are dyed, cut, and branded specifically for the buyer, standard consumer return privileges do not apply to commercial production runs.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-base font-serif font-bold text-[#0A261D]">2. Pre-Shipment Inspection</h2>
              <p>
                Buyers or their appointed third-party quality inspection agencies (e.g. SGS, Bureau Veritas) are entitled to conduct pre-shipment factory audits at our Mumbai facility prior to final cargo handover and balance remittance.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-base font-serif font-bold text-[#0A261D]">3. Manufacturing Defect Protocol</h2>
              <p>
                In the event that delivered units deviate demonstrably from the approved physical counter-sample beyond accepted industrial tolerances, formal written notification must be submitted within seven (7) business days of shipment arrival.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-base font-serif font-bold text-[#0A261D]">4. Remediation Procedure</h2>
              <p>
                Verified manufacturing defects will be rectified promptly via factory rework, priority remake of non-conforming quantities, or issuance of commercial credit notes as agreed between parties.
              </p>
            </section>
          </div>
        </div>
      </Container>
    </div>
  );
}
