import { Suspense } from 'react';
import Link from 'next/link';
import { Container } from '@/components/ui/Container';
import { Badge } from '@/components/ui/Badge';
import { RFQForm } from '@/components/forms/RFQForm';
import { MapPin, Phone, Mail, Clock, Info } from 'lucide-react';

export const metadata = {
  title: 'Direct Factory Quotation & Technical RFQ Desk | ARMANO Mumbai',
  description: 'Submit technical inquiries or schedule physical counter-sampling with ARMANO’s Mumbai manufacturing desk. Direct B2B quotations for volume orders.',
};

export default function ContactPage() {
  return (
    <div className="py-12 sm:py-20 bg-[#F7F4EF] text-[#242424]">
      <Container>
        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" className="mb-8">
          <ol className="flex items-center space-x-2 text-xs font-mono text-[#5A5D64]">
            <li>
              <Link href="/" className="hover:text-[#10352C] transition-colors">
                Home
              </Link>
            </li>
            <li className="text-[#C5A059]">/</li>
            <li>
              <Link href="/products" className="hover:text-[#10352C] transition-colors">
                Catalogue
              </Link>
            </li>
            <li className="text-[#C5A059]">/</li>
            <li className="text-[#10352C] font-semibold">RFQ & Technical Procurement Desk</li>
          </ol>
        </nav>

        {/* B2B Procurement Desk Notice */}
        <div className="mb-10 p-4 rounded-sm bg-[#10352C]/5 border border-[#10352C]/15 text-[#242424] text-xs flex items-start gap-3">
          <Info className="w-5 h-5 text-[#C5A059] shrink-0 mt-0.5" />
          <div className="space-y-1">
            <span className="font-semibold block uppercase tracking-wider font-mono text-[10px] text-[#10352C]">
              B2B Procurement & Technical RFQ Desk
            </span>
            <p className="leading-relaxed text-[#4A4D53]">
              This RFQ gateway securely records quotation drafts directly to our Mumbai manufacturing database for engineering review. Submissions are B2B requests for quotation and physical counter-sampling, not consumer retail checkouts. For immediate priority bids or factory floor visits in Sion-Dharavi, contact our desk directly at <strong className="font-mono text-[#10352C]">+91 8591897469</strong>.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Workshop Information */}
          <div className="lg:col-span-5 space-y-8">
            <div>
              <Badge variant="primary">Workshop Procurement</Badge>
              <h1 className="text-3xl sm:text-4xl font-serif text-[#10352C] tracking-tight mt-3 mb-4">
                Factory Direct Communication
              </h1>
              <p className="text-sm text-[#5A5D64] leading-relaxed">
                Connect directly with our manufacturing desk in Mumbai. We provide rapid quotation feedback, material counter-swatches, and CAD fitment guidance for brand programmes.
              </p>
            </div>

            {/* Contact Details Card */}
            <div className="p-6 bg-white rounded-sm border border-[#E8DED0] shadow-sm space-y-5">
              <div className="flex items-start gap-3.5">
                <MapPin className="w-5 h-5 text-[#C5A059] shrink-0 mt-0.5" />
                <div className="text-xs">
                  <strong className="block text-sm font-serif text-[#10352C] mb-0.5">Manufacturing Facility</strong>
                  <span className="text-[#5A5D64] leading-relaxed">Sion-Dharavi Industrial Belt, Mumbai, Maharashtra, India</span>
                </div>
              </div>

              <div className="flex items-start gap-3.5 pt-4 border-t border-[#F0ECE1]">
                <Phone className="w-5 h-5 text-[#C5A059] shrink-0 mt-0.5" />
                <div className="text-xs">
                  <strong className="block text-sm font-serif text-[#10352C] mb-0.5">Direct Factory Line</strong>
                  <a
                    href="tel:+918591897469"
                    className="text-[#10352C] font-mono hover:text-[#C5A059] transition-colors block font-semibold text-sm"
                  >
                    +91 8591897469
                  </a>
                  <span className="text-[#5A5D64]">Contact Executive: Rehan</span>
                </div>
              </div>

              <div className="flex items-start gap-3.5 pt-4 border-t border-[#F0ECE1]">
                <Mail className="w-5 h-5 text-[#C5A059] shrink-0 mt-0.5" />
                <div className="text-xs">
                  <strong className="block text-sm font-serif text-[#10352C] mb-0.5">Commercial Dispatch</strong>
                  <span className="text-[#10352C] break-all font-mono font-medium">Factory RFQ Desk Below</span>
                  <span className="text-[10px] text-[#5A5D64] block mt-0.5">
                    Direct dispatch to Mumbai manufacturing engineering queue
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-3.5 pt-4 border-t border-[#F0ECE1]">
                <Clock className="w-5 h-5 text-[#C5A059] shrink-0 mt-0.5" />
                <div className="text-xs">
                  <strong className="block text-sm font-serif text-[#10352C] mb-0.5">Operating Hours</strong>
                  <span className="text-[#5A5D64]">Monday – Saturday: 09:30 AM – 06:30 PM IST</span>
                </div>
              </div>
            </div>

            {/* Statutory Compliance Note */}
            <div className="p-4 bg-[#F0ECE1] rounded-sm border border-[#E8DED0] text-xs text-[#5A5D64] space-y-1">
              <strong className="text-[#10352C] block">Statutory Registration Notice:</strong>
              <p>
                GSTIN 27EOGPM4521C1Z6 is provisionally recorded from catalogue documentation, pending statutory portal verification.
              </p>
            </div>
          </div>

          {/* Right Column: RFQ Form Scaffold */}
          <div className="lg:col-span-7">
            <Suspense
              fallback={
                <div className="p-12 text-center text-xs font-mono text-[#5A5D64] bg-white border border-[#E8DED0] rounded-sm">
                  Loading factory quotation desk...
                </div>
              }
            >
              <RFQForm />
            </Suspense>
          </div>
        </div>
      </Container>
    </div>
  );
}
