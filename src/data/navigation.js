/**
 * ARMANO Site Navigation Schemas
 * Header mega-menu, mobile navigation drawer, and multi-column B2B footer links.
 */

export const navigationLinks = [
  {
    name: 'Cosmetic Pouches',
    href: '/cosmetic-pouches',
    description: 'Boxy, dome, barrel & novelty silhouettes for beauty brands',
  },
  {
    name: 'Tote Bags',
    href: '/tote-bags',
    description: 'Structured tote bags and carry-all silhouettes',
  },
  {
    name: 'Corporate Gifting',
    href: '/corporate-gifting',
    description: 'Quilted velvet, metallic & evening packaging collections',
  },
  {
    name: 'Custom Manufacturing',
    href: '/custom-manufacturing',
    description: 'Bespoke OEM/ODM manufacturing directly from client tech-packs',
  },
  {
    name: 'About Factory',
    href: '/about',
    description: 'Facility profile and Mumbai manufacturing infrastructure',
  },
  {
    name: 'Master Catalogue',
    href: '/products',
    description: 'Complete verified collection (AR-001 through AR-013)',
  },
  {
    name: 'Contact & RFQ',
    href: '/contact',
    description: 'Direct procurement desk & factory sample requests',
  },
];

export const footerLinks = {
  divisions: [
    { name: 'Cosmetic & Skincare Pouches', href: '/cosmetic-pouches' },
    { name: 'Premium Tote Bags', href: '/tote-bags' },
    { name: 'Luxury Corporate Gifting', href: '/corporate-gifting' },
    { name: 'Bespoke OEM / ODM Tooling', href: '/custom-manufacturing' },
    { name: 'Full Catalog (AR-001 – AR-013)', href: '/products' },
  ],
  company: [
    { name: 'Factory Heritage & Craftsmanship', href: '/about' },
    { name: 'Direct Procurement Desk', href: '/contact' },
    { name: 'Provisional Order Volumes (10k/20k/50k)', href: '/contact#rfq' },
  ],
  legal: [
    { name: 'Privacy Policy (Draft — Awaiting Client/Legal Approval)', href: '/privacy-policy' },
    { name: 'Terms & Conditions (Draft — Awaiting Legal Review)', href: '/terms-and-conditions' },
    { name: 'Cookie Policy (Draft — Zero Trackers)', href: '/cookie-policy' },
    { name: 'Returns & Inspection Policy (Draft Terms)', href: '/returns-and-refunds' },
  ],
  factoryContact: {
    address: 'Sion-Dharavi Industrial Facility, Mumbai, Maharashtra, India',
    phone: '+91 8591897469',
    contactPerson: 'Rehan',
  },
};
