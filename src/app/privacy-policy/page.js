import Link from 'next/link';
import { Container } from '@/components/ui/Container';
import { Badge } from '@/components/ui/Badge';
import { AlertTriangle } from 'lucide-react';

export const metadata = {
  title: 'Privacy Policy (Draft Shell) | ARMANO Manufacturer Mumbai',
  description: 'Draft statutory privacy policy framework aligned with the Indian Digital Personal Data Protection Act (DPDP Act, 2023). Pending formal legal review.',
};

export default function PrivacyPolicyPage() {
  return (
    <div className="py-12 sm:py-20 bg-[#FBF9F5] text-[#121316]">
      <Container size="narrow">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="mb-8">
          <ol className="flex items-center space-x-2 text-xs font-mono text-[#5A5D64]">
            <li><Link href="/" className="hover:text-[#0A261D]">Home</Link></li>
            <li>/</li>
            <li className="text-[#C5A059] font-medium">Privacy Policy (Draft Shell)</li>
          </ol>
        </nav>

        {/* Mandatory Draft Disclaimer Banner */}
        <div className="mb-10 p-5 rounded-sm bg-amber-500/10 border-l-4 border-amber-600 text-amber-950 text-xs space-y-2">
          <div className="flex items-center gap-2 font-mono uppercase tracking-wider font-bold text-amber-800">
            <AlertTriangle className="w-4 h-4 text-amber-700 shrink-0" />
            <span>[PROPOSED SPECIFICATION / DRAFT SHELL — PENDING FORMAL LEGAL REVIEW & CLIENT SIGN-OFF]</span>
          </div>
          <p className="leading-relaxed">
            This document represents a technical and operational architecture draft prepared during website foundation planning. It is NOT a final published legal policy. It must not be relied upon as statutory legal counsel until formally reviewed, customized, and executed by qualified legal counsel retained by the business entity.
          </p>
        </div>

        {/* Document Content */}
        <div className="space-y-8 bg-white p-8 sm:p-12 rounded-sm border border-[#E8D5B5] shadow-sm">
          <div>
            <Badge variant="outline">Statutory Framework Draft</Badge>
            <h1 className="text-3xl font-serif text-[#0A261D] mt-2 mb-3">
              Data Privacy & Protection Policy (Draft Shell)
            </h1>
            <p className="text-xs text-[#5A5D64] font-mono">
              Governing Jurisdiction: Digital Personal Data Protection Act, 2023 (India) • Status: Pending Client Sign-Off
            </p>
          </div>

          <div className="space-y-6 text-sm text-[#5A5D64] leading-relaxed">
            <section className="space-y-2">
              <h2 className="text-base font-serif font-bold text-[#0A261D]">1. Purpose of Data Processing</h2>
              <p>
                ARMANO collects commercial contact information strictly for the purpose of communicating B2B manufacturing quotations, technical feasibility reviews, and sample dispatches. In Phase 1, no customer data is persistently stored in external production databases.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-base font-serif font-bold text-[#0A261D]">2. Categories of Information Collected</h2>
              <p>
                Proposed data fields include: Corporate business name, representative name, contact telephone, business email address, target product silhouette, and proprietary tech-pack specifications.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-base font-serif font-bold text-[#0A261D]">3. Data Fiduciary Obligations & Non-Disclosure</h2>
              <p>
                All proprietary design tech-packs, CAD sketches, and counter-sample specs submitted by buyers remain strictly confidential. ARMANO will not sell, lease, or monetize customer commercial data to third-party advertising networks.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-base font-serif font-bold text-[#0A261D]">4. Grievance Officer & Contact</h2>
              <p>
                A designated Data Grievance Officer will be published upon commercial domain launch in accordance with Rule 5 of the DPDP Rules. Interim inquiries may be submitted directly through the Factory RFQ Desk or by telephone (+91 8591897469).
              </p>
            </section>
          </div>
        </div>
      </Container>
    </div>
  );
}
