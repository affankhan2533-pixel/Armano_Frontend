/**
 * ARMANO Zero-Trust Brand Governance Registry
 * 
 * IMPORTANT LEGAL STANDARD:
 * All brand marks and logos observed on physical workshop sample photography
 * are internal workshop observations only. They DO NOT constitute documented
 * customer testimonials, approved case studies, or authorized public brand partnerships.
 * In accordance with the Indian Trade Marks Act (1999) and brand governance rules,
 * all brand logos and names remain strictly unpublished until formal written consent is filed.
 */

export const brandRegistry = [
  { id: 'cerave', name: 'CeraVe', approvalStatus: 'PENDING_APPROVAL', publicationPermissionDocumented: false },
  { id: 'mac', name: 'M·A·C', approvalStatus: 'PENDING_APPROVAL', publicationPermissionDocumented: false },
  { id: 'nykaa', name: 'Nykaa', approvalStatus: 'PENDING_APPROVAL', publicationPermissionDocumented: false },
  { id: 'pilgrim', name: 'Pilgrim', approvalStatus: 'PENDING_APPROVAL', publicationPermissionDocumented: false },
  { id: 'bobbi-brown', name: 'Bobbi Brown', approvalStatus: 'PENDING_APPROVAL', publicationPermissionDocumented: false },
  { id: 'smashbox', name: 'Smashbox', approvalStatus: 'PENDING_APPROVAL', publicationPermissionDocumented: false },
  { id: 'forest-essentials', name: 'Forest Essentials', approvalStatus: 'PENDING_APPROVAL', publicationPermissionDocumented: false },
  { id: 'paese', name: 'Paese', approvalStatus: 'PENDING_APPROVAL', publicationPermissionDocumented: false },
  { id: 'forever52', name: 'Forever52', approvalStatus: 'PENDING_APPROVAL', publicationPermissionDocumented: false },
  { id: 'artefan', name: 'Artefan', approvalStatus: 'PENDING_APPROVAL', publicationPermissionDocumented: false },
  { id: 'rays', name: 'Rays', approvalStatus: 'PENDING_APPROVAL', publicationPermissionDocumented: false },
];

/**
 * Filter returning only brands with formally documented written publication consent
 * In Phase 1, this strictly returns an empty array to prevent unauthorized trademark display.
 * @returns {Array} List of approved brand objects
 */
export function getApprovedBrands() {
  return brandRegistry.filter((brand) => brand.approvalStatus === 'APPROVED' && brand.publicationPermissionDocumented === true);
}
