import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { getProducts, getProductBySlug, getRelatedProducts } from '@/lib/data';
import { ProductGallery } from '@/components/product/ProductGallery';
import { ArrowLeft, ArrowRight, Phone, ShieldCheck, Sliders, AlertTriangle } from 'lucide-react';

/**
 * Pre-generate static routes for all 13 verified SKUs (AR-001 through AR-013)
 */
export async function generateStaticParams() {
  const products = getProducts();
  return products.map((product) => ({
    slug: product.slug,
  }));
}

/**
 * Generate SEO metadata and canonical tags per product
 */
export async function generateMetadata({ params }) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    return {
      title: 'Product Not Found | ARMANO Manufacturer',
      description: 'The requested product silhouette could not be located in our verified catalogue.',
    };
  }

  const displayName = product.workingName || product.name || product.title;

  return {
    title: product.seo?.title || `${displayName} (${product.sku}) | ARMANO Mumbai`,
    description: product.seo?.description || product.shortDescription || product.description,
    keywords: product.seo?.keywords,
    alternates: {
      canonical: `/products/${product.slug}`,
    },
    openGraph: {
      title: `${displayName} (${product.sku}) | ARMANO B2B Bags & Pouches`,
      description: product.shortDescription || product.description,
      url: `/products/${product.slug}`,
      images: [
        {
          url: product.heroImage,
          width: 800,
          height: 800,
          alt: `${displayName} — ${product.sku}`,
        },
      ],
    },
  };
}

export default async function ProductDetailPage({ params }) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const displayName = product.workingName || product.name || product.title;
  const relatedProducts = getRelatedProducts(product.sku, product.category, 3);

  // Factual Structured Data (JSON-LD) — Zero Speculative Prices, Reviews, or InStock Claims
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: displayName,
    sku: product.sku,
    description: product.shortDescription || product.description,
    image: product.heroImage,
    category: 'Cosmetic & Skincare Pouches',
    brand: {
      '@type': 'Brand',
      name: 'ARMANO',
    },
    manufacturer: {
      '@type': 'Organization',
      name: 'ARMANO',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Mumbai',
        addressRegion: 'Maharashtra',
        addressCountry: 'IN',
      },
    },
  };

  return (
    <div className="bg-[#F7F4EF] text-[#242424] min-h-screen py-8 sm:py-14">
      {/* Factual JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" className="flex items-center justify-between">
          <ol className="flex items-center space-x-2 text-xs font-mono text-[#737373] overflow-x-auto no-scrollbar py-1">
            <li>
              <Link href="/" className="hover:text-[#10352C] transition-colors">
                Home
              </Link>
            </li>
            <li>/</li>
            <li>
              <Link href="/products" className="hover:text-[#10352C] transition-colors">
                Master Catalogue
              </Link>
            </li>
            <li>/</li>
            <li>
              <Link href="/cosmetic-pouches" className="hover:text-[#10352C] transition-colors">
                Cosmetic & Skincare Pouches
              </Link>
            </li>
            <li>/</li>
            <li className="text-[#10352C] font-semibold" aria-current="page">
              {product.sku}
            </li>
          </ol>

          <Link
            href="/products"
            className="hidden sm:inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-[#737373] hover:text-[#10352C] transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Catalogue</span>
          </Link>
        </nav>

        {/* Product Hero 2-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* Left Column: Authentic Image Gallery */}
          <div className="lg:col-span-6 lg:sticky lg:top-24">
            <ProductGallery
              images={product.gallery || [product.heroImage]}
              title={displayName}
              sku={product.sku}
              is3DEnabled={product.is3DEnabled}
              isPendingPhotoApproval={product.isPendingPhotoApproval}
            />
          </div>

          {/* Right Column: 5-Tier Data Governance & RFQ */}
          <div className="lg:col-span-6 space-y-8">
            {/* Header Block: Official SKU, Source Provenance, Working Display Name */}
            <div className="space-y-3 pb-6 border-b border-[#E8DED0]">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs font-mono uppercase tracking-widest px-3 py-1 rounded-full bg-[#10352C] text-[#F7F4EF] font-semibold">
                  Official SKU: {product.sku}
                </span>
                <span className="text-xs font-mono uppercase tracking-wider px-3 py-1 rounded-full bg-white border border-[#E8DED0] text-[#4A4D53]">
                  {product.categoryName}
                </span>
                <span className="text-[11px] font-mono tracking-wider px-2.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-900">
                  Source: {product.sourceDocument} ({product.sourcePage})
                </span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-[2.6rem] font-serif text-[#10352C] font-normal leading-[1.15] tracking-tight">
                {displayName}
              </h1>

              {product.isPendingPhotoApproval && (
                <div className="p-4 rounded-sm bg-[#FFFBF0] border border-[#C5A059]/40 space-y-1.5 my-3">
                  <div className="flex items-center gap-2 text-xs font-mono font-semibold text-[#8C6F34] uppercase tracking-wider">
                    <AlertTriangle className="w-4 h-4 text-[#C5A059]" />
                    <span>AR-002 — Product Photography Pending Client Approval</span>
                  </div>
                  <p className="text-xs text-[#737373] leading-relaxed">
                    {product.trademarkGovernanceNote}
                  </p>
                </div>
              )}

              <div className="flex flex-wrap items-center gap-2 pt-1 text-xs font-mono uppercase tracking-wider text-[#C5A059]">
                <span>Silhouette Family: {product.silhouetteFamily || product.silhouette}</span>
                {product.threeDStatus && (
                  <>
                    <span>•</span>
                    <span className="text-[#10352C] font-semibold">{product.threeDStatus}</span>
                  </>
                )}
              </div>

              <p className="text-sm sm:text-base text-[#4A4D53] font-light leading-relaxed pt-2">
                {product.description}
              </p>
            </div>

            {/* Tier 3 & 4: Observed Prototype Characteristics Card */}
            <div className="p-6 rounded-sm bg-white border border-[#E8DED0] shadow-2xs space-y-5">
              <div className="flex items-center justify-between border-b border-[#F0ECE1] pb-3">
                <h2 className="text-base font-serif text-[#10352C] flex items-center gap-2">
                  <Sliders className="w-4 h-4 text-[#C5A059]" />
                  <span>Observed Prototype Characteristics</span>
                </h2>
                <span className="text-[10px] font-mono uppercase text-[#737373]">
                  Physical Evidence Only
                </span>
              </div>

              {/* Visual Observation */}
              <div className="p-3.5 rounded-xs bg-[#F7F4EF] border border-[#E8DED0] space-y-1">
                <span className="font-mono uppercase text-[#737373] text-[10px] tracking-wider block font-semibold">
                  Visual Observation (From Workshop Packshot)
                </span>
                <p className="text-xs text-[#242424] leading-relaxed">
                  {product.visualObservation}
                </p>
              </div>

              {/* Photographic & Sourcing Governance Note */}
              {(product.trademarkGovernanceNote || product.contextualPhotographNote || product.catalogueDiscrepancyNote || product.stagingGovernanceNote) && (
                <div className="p-3.5 rounded-xs bg-white border border-[#E8DED0] space-y-1">
                  <span className="font-mono uppercase text-[#10352C] text-[10px] tracking-wider block font-semibold flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#C5A059]" />
                    Photographic & Sourcing Governance
                  </span>
                  <p className="text-xs text-[#4A4D53] leading-relaxed">
                    {product.trademarkGovernanceNote || product.contextualPhotographNote || product.catalogueDiscrepancyNote || product.stagingGovernanceNote}
                  </p>
                </div>
              )}

              <dl className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="space-y-1 p-3 rounded-xs bg-[#F7F4EF]/70 border border-[#E8DED0]/60">
                  <dt className="font-mono uppercase text-[#737373] text-[10px] tracking-wider font-semibold">
                    Observed Appearance
                  </dt>
                  <dd className="font-medium text-[#242424]">
                    {(product.observedAppearance || product.observedFinishes || []).join(' • ')}
                  </dd>
                </div>

                <div className="space-y-1 p-3 rounded-xs bg-[#F7F4EF]/70 border border-[#E8DED0]/60">
                  <dt className="font-mono uppercase text-[#737373] text-[10px] tracking-wider font-semibold">
                    Observed Hardware & Closure
                  </dt>
                  <dd className="font-medium text-[#242424]">
                    {product.observedHardware || product.hardware}
                  </dd>
                </div>

                <div className="space-y-1 p-3 rounded-xs bg-[#F7F4EF]/70 border border-[#E8DED0]/60 sm:col-span-2">
                  <dt className="font-mono uppercase text-[#737373] text-[10px] tracking-wider font-semibold">
                    Client-Confirmed Prototype Features
                  </dt>
                  <dd className="font-medium text-[#242424]">
                    {(product.clientConfirmedSpecs || []).join(' • ') || 'Top zip closure, reinforced seams'}
                  </dd>
                </div>

                <div className="space-y-1 p-3 rounded-xs bg-[#F7F4EF]/70 border border-[#E8DED0]/60 sm:col-span-2">
                  <dt className="font-mono uppercase text-[#737373] text-[10px] tracking-wider font-semibold">
                    Supported Custom Branding Formats
                  </dt>
                  <dd className="font-medium text-[#242424]">
                    {(product.brandingOptions || []).join(', ')}
                  </dd>
                </div>
              </dl>
            </div>

            {/* Tier 5: Missing Specifications Notice */}
            <div className="p-5 rounded-sm bg-amber-500/5 border border-amber-500/25 space-y-2">
              <div className="flex items-center gap-2 text-amber-900">
                <AlertTriangle className="w-4 h-4 shrink-0 text-amber-700" />
                <span className="text-xs font-mono uppercase tracking-wider font-bold">
                  Missing Specifications — Client Tech-Pack Required
                </span>
              </div>
              <p className="text-xs text-[#5A5D64] leading-relaxed">
                {product.missingSpecs}
              </p>
              <div className="pt-1 flex items-center gap-1.5 text-[11px] font-mono text-amber-800">
                <ShieldCheck className="w-3.5 h-3.5 text-amber-700" />
                <span>Physical counter-sampling executed from client CAD/tech-packs prior to volume production.</span>
              </div>
            </div>

            {/* Provisional Procurement & RFQ Actions */}
            <div className="p-6 rounded-sm bg-white border border-[#E8DED0] shadow-2xs space-y-4">
              <div>
                <span className="text-[11px] font-mono uppercase tracking-widest text-[#737373] block mb-1">
                  Provisional Inquiry Scale (Client Verbal Discussion)
                </span>
                <div className="flex items-center gap-2">
                  <span className="text-lg font-serif text-[#10352C] font-semibold">
                    10,000 / 20,000 / 50,000 Units
                  </span>
                  <span className="text-[10px] font-mono uppercase text-[#737373]">
                    (Provisional Tiers)
                  </span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
                <Link
                  href={`/contact?sku=${product.sku}&product=${encodeURIComponent(displayName)}#rfq`}
                  className="flex-1 inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xs bg-[#10352C] text-[#F7F4EF] hover:bg-[#164E3D] transition-colors text-sm font-medium tracking-wide shadow-sm hover:shadow-md text-center"
                >
                  <span>Request RFQ for {product.sku}</span>
                  <ArrowRight className="w-4 h-4 text-[#C5A059]" />
                </Link>

                <a
                  href="tel:+918591897469"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xs bg-white text-[#10352C] border border-[#E8DED0] hover:border-[#10352C] transition-colors text-sm font-medium tracking-wide text-center"
                  title="Direct Factory Call (Rehan)"
                >
                  <Phone className="w-4 h-4 text-[#C5A059]" />
                  <span>Call Factory Desk</span>
                </a>
              </div>

              <p className="text-[11px] text-[#737373] text-center sm:text-left">
                Direct Mumbai factory quotation draft. Physical counter-sampling scheduled upon commercial inquiry.
              </p>
            </div>
          </div>
        </div>

        {/* Related Products: Sourced from actual verified catalogue */}
        {relatedProducts.length > 0 && (
          <section className="pt-12 border-t border-[#E8DED0] space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div>
                <span className="text-xs font-mono uppercase tracking-widest text-[#C5A059] block mb-1">
                  Catalogue Silhouettes
                </span>
                <h2 className="text-2xl sm:text-3xl font-serif text-[#10352C] font-normal">
                  Related Pouch Models from Source Catalogue
                </h2>
              </div>

              <Link
                href="/products"
                className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-[#10352C] hover:text-[#C5A059] transition-colors"
              >
                <span>View All 13 SKUs</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedProducts.map((rel) => {
                const relName = rel.workingName || rel.name || rel.title;
                return (
                  <Link
                    key={rel.sku}
                    href={`/products/${rel.slug}`}
                    className="group block bg-white rounded-sm border border-[#E8DED0] hover:border-[#10352C]/40 transition-all duration-300 overflow-hidden shadow-2xs hover:shadow-md"
                  >
                    <div className="relative aspect-[4/3] w-full bg-[#F7F4EF]/60 p-6 flex items-center justify-center border-b border-[#E8DED0]">
                      <div className="absolute top-3 left-3 z-10">
                        <span className="text-[10px] font-mono uppercase tracking-widest px-2.5 py-1 rounded-full bg-white/95 text-[#10352C] border border-[#E8DED0] font-semibold">
                          {rel.sku}
                        </span>
                      </div>
                      <div className="relative w-full h-full">
                        <Image
                          src={rel.heroImage}
                          alt={`${relName} — ${rel.sku}`}
                          fill
                          sizes="(max-width: 768px) 100vw, 33vw"
                          className="object-contain p-2 group-hover:scale-104 transition-transform duration-500"
                        />
                      </div>
                    </div>

                    <div className="p-5 space-y-2">
                      <span className="text-[10px] font-mono uppercase tracking-widest text-[#737373]">
                        {rel.silhouetteFamily || rel.silhouette}
                      </span>
                      <h3 className="text-lg font-serif text-[#10352C] group-hover:text-[#164E3D] transition-colors line-clamp-1">
                        {relName}
                      </h3>
                      <p className="text-xs text-[#4A4D53] font-light line-clamp-2">
                        {rel.shortDescription || rel.description}
                      </p>
                    </div>
                  </Link>
                );
              })}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
