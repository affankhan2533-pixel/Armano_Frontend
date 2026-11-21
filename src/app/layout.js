import '@/styles/globals.css';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';

export const metadata = {
  title: {
    default: 'ARMANO — Direct B2B Manufacturer of Luxury Cosmetic Pouches & Bags',
    template: '%s | ARMANO Manufacturer Mumbai',
  },
  description: 'Direct manufacturer of cosmetic pouches, skincare packaging bags, bespoke totes, and corporate gifting collections. Fabricated at our Mumbai, India workshop facility.',
  metadataBase: new URL('https://www.armanobags.com'),
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport = {
  themeColor: '#0A261D',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col bg-[#F7F4EF] text-[#242424] font-sans antialiased selection:bg-[#C5A059] selection:text-[#10352C]">
        {/* Top Announcement Bar */}
        <div className="bg-[#10352C] text-[#E8DED0] text-[9.5px] sm:text-[11px] tracking-wider uppercase font-mono py-1 sm:py-1.5 px-2.5 sm:px-3 text-center border-b border-[#C5A059]/30 flex items-center justify-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-[#C5A059] shrink-0 animate-pulse" />
          <span className="inline sm:hidden">Direct B2B Manufacturer • Mumbai Atelier</span>
          <span className="hidden sm:inline">Direct B2B Manufacturer • Mumbai Facility • Master SKUs AR-001 – AR-013</span>
        </div>

        {/* Global Navigation Header */}
        <Header />

        {/* Main Content Landmark */}
        <main id="main-content" className="flex-1">
          {children}
        </main>

        {/* Global Footer */}
        <Footer />
      </body>
    </html>
  );
}
