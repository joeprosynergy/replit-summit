// Cloudinary configuration for Summit Portable Buildings
// IMPORTANT: All images must be pre-uploaded via /cloudinary-upload
// Images are served from Cloudinary CDN for optimal performance and Core Web Vitals
//
// NOTE: CLOUDINARY_CLOUD_NAME is safe to expose client-side - it's only used
// to construct public CDN URLs for reading images. Upload credentials are
// kept server-side in the edge function.

const CLOUDINARY_CLOUD_NAME = 'dwhwbbbev';
const CLOUDINARY_FOLDER = 'summit-buildings';

// Helper function to construct Cloudinary URL with transformations
export const getCloudinaryUrl = (publicId: string, options?: {
  width?: number;
  height?: number;
  quality?: string;
  format?: string;
}) => {
  const { width, height, quality = 'auto', format = 'auto' } = options || {};
  
  let transforms = `f_${format},q_${quality}`;
  if (width) transforms += `,w_${width}`;
  if (height) transforms += `,h_${height}`;
  
  return `https://res.cloudinary.com/${CLOUDINARY_CLOUD_NAME}/image/upload/${transforms}/${CLOUDINARY_FOLDER}/${publicId}`;
};

// Responsive image presets for better Core Web Vitals
// Use these in components for optimal image sizing

/** Hero images - full width, high quality (1600px) */
export const getHeroImage = (publicId: string) => 
  getCloudinaryUrl(publicId, { width: 1600 });

/** Mobile hero images - optimized for small screens (800px) */
export const getMobileHeroImage = (publicId: string) => 
  getCloudinaryUrl(publicId, { width: 800 });

/** Card images - medium size for grids (600px) */
export const getCardImage = (publicId: string) => 
  getCloudinaryUrl(publicId, { width: 600 });

/** Thumbnail images - small size for galleries (300px) */
export const getThumbnail = (publicId: string) => 
  getCloudinaryUrl(publicId, { width: 300 });

/** Social share images - optimized for OG/Twitter (1200px) */
export const getSocialImage = (publicId: string) => 
  getCloudinaryUrl(publicId, { width: 1200 });

// Check if image exists in Cloudinary (used by admin upload page)
export const checkCloudinaryImage = async (publicId: string): Promise<boolean> => {
  try {
    const url = getCloudinaryUrl(publicId);
    const response = await fetch(url, { method: 'HEAD' });
    return response.ok;
  } catch {
    return false;
  }
};

// All image public IDs used in the site
// When adding new images:
// 1. Add the image file to src/assets/
// 2. Add the public ID here
// 3. Add to cloudinaryImages below
// 4. Go to /admin/cloudinary-upload to upload the new image
export const IMAGES = {
  // Logo
  summitLogo: 'summit-logo',
  
  // Hero
  heroShed: 'hero-shed',
  
  // Social/OG Images
  socialShare: 'social-share',
  favicon: 'favicon',
  
  // Budget Pro - Utility
  budgetProUtility: 'budget-pro-utility',
  budgetProUtility2: 'budget-pro-utility-2',
  budgetProUtility3: 'budget-pro-utility-3',
  
  // Budget Pro - Lofted Barn
  budgetProLoftedBarn: 'budget-pro-lofted-barn',
  budgetProLoftedBarn2: 'budget-pro-lofted-barn-2',
  budgetProLoftedBarn3: 'budget-pro-lofted-barn-3',
  
  // Economy
  economy: 'economy',
  economyShed1: 'economy-shed-1',
  economyShed2: 'economy-shed-2',
  economyShed3: 'economy-shed-3',
  economyShed4: 'economy-shed-4',
  economyShed6: 'economy-shed-6',
  economyShed7: 'economy-shed-7',
  economyShed8: 'economy-shed-8',
  economyShed9: 'economy-shed-9',
  
  // Utility Shed
  utilityShed: 'utility-shed',
  utilityShed1: 'utility-shed-1',
  utilityShed2: 'utility-shed-2',
  utilityShed3: 'utility-shed-3',
  utilityShed4: 'utility-shed-4',
  
  // Side Utility
  sideUtilityShed: 'side-utility-shed',
  sideUtility1: 'side-utility-1',
  sideUtility2: 'side-utility-2',
  sideUtility3: 'side-utility-3',
  sideUtility4: 'side-utility-4',
  
  // Lofted Barn
  loftedBarn: 'lofted-barn',
  loftedBarn1: 'lofted-barn-1',
  loftedBarn2: 'lofted-barn-2',
  loftedBarn3: 'lofted-barn-3',
  loftedBarn4: 'lofted-barn-4',
  
  // Side Lofted Barn
  sideLoftedBarn1: 'side-lofted-barn-1',
  sideLoftedBarn2: 'side-lofted-barn-2',
  sideLoftedBarn3: 'side-lofted-barn-3',
  sideLoftedBarn4: 'side-lofted-barn-4',
  
  // Pro Utility
  proUtility: 'pro-utility',
  
  // Pro Lofted Barn
  proLoftedBarn: 'pro-lofted-barn',
  
  // Cabin
  cabinShed: 'cabin-shed',
  cabin1: 'cabin-1',
  cabin2: 'cabin-2',
  cabin3: 'cabin-3',
  cabin4: 'cabin-4',
  
  // Garage
  garage: 'garage',
  garageShed: 'garage-shed',
  garage1: 'garage-1',
  garage2: 'garage-2',
  garage3: 'garage-3',
  garage4: 'garage-4',
  
  // Carport
  carport: 'carport',
  carport1: 'carport-1',
  carport2: 'carport-2',
  carport3: 'carport-3',
  
  // RV Cover
  rvCover1: 'rv-cover-1',
  rvCover2: 'rv-cover-2',
  rvCover3: 'rv-cover-3',
  
  // Other
  dormer: 'dormer',
  treatedGardenShed: 'treated-garden-shed',
  miniBarn: 'mini-barn',
  modernShed: 'modern-shed',
  
  // Style Images
  utilityStyle: 'utility-style',
  barnStyle: 'barn-style',
  modernStyle: 'modern-style',
  
  // Modern Style Options
  proModern: 'pro-modern',
  garageModern: 'garage-modern',
  
  // Greenhouse
  greenhouse1: 'greenhouse-1',
  greenhouse2: 'greenhouse-2',
  greenhouse3: 'greenhouse-3',
  greenhouse4: 'greenhouse-4',
  
  // Animal Shelters
  animalShelter1: 'animal-shelter-1',
  animalShelter2: 'animal-shelter-2',
  dogKennel1: 'dog-kennel-1',
  dogKennel2: 'dog-kennel-2',
  chickenCoop1: 'chicken-coop-1',
  chickenCoop2: 'chicken-coop-2',
} as const;

// Pre-built URLs for convenience - use these in components
// OPTIMIZED: Using sized presets for better Core Web Vitals (LCP, CLS)
export const cloudinaryImages = {
  // Logo - small size for header
  summitLogo: getCloudinaryUrl(IMAGES.summitLogo, { width: 200 }),
  
  // Hero - full width, high priority
  heroShed: getHeroImage(IMAGES.heroShed),
  
  // Social/OG Images
  socialShare: getSocialImage(IMAGES.socialShare),
  favicon: getCloudinaryUrl(IMAGES.favicon),
  
  // Budget Pro - Utility (card size for grids)
  budgetProUtility: getCardImage(IMAGES.budgetProUtility),
  budgetProUtility2: getCardImage(IMAGES.budgetProUtility2),
  budgetProUtility3: getCardImage(IMAGES.budgetProUtility3),
  
  // Budget Pro - Lofted Barn
  budgetProLoftedBarn: getCardImage(IMAGES.budgetProLoftedBarn),
  budgetProLoftedBarn2: getCardImage(IMAGES.budgetProLoftedBarn2),
  budgetProLoftedBarn3: getCardImage(IMAGES.budgetProLoftedBarn3),
  
  // Economy
  economy: getCardImage(IMAGES.economy),
  economyShed1: getCardImage(IMAGES.economyShed1),
  economyShed2: getCardImage(IMAGES.economyShed2),
  economyShed3: getCardImage(IMAGES.economyShed3),
  economyShed4: getCardImage(IMAGES.economyShed4),
  economyShed6: getCardImage(IMAGES.economyShed6),
  economyShed7: getCardImage(IMAGES.economyShed7),
  economyShed8: getCardImage(IMAGES.economyShed8),
  economyShed9: getCardImage(IMAGES.economyShed9),
  
  // Utility Shed
  utilityShed: getCardImage(IMAGES.utilityShed),
  utilityShed1: getCardImage(IMAGES.utilityShed1),
  utilityShed2: getCardImage(IMAGES.utilityShed2),
  utilityShed3: getCardImage(IMAGES.utilityShed3),
  utilityShed4: getCardImage(IMAGES.utilityShed4),
  
  // Side Utility
  sideUtilityShed: getCardImage(IMAGES.sideUtilityShed),
  sideUtility1: getCardImage(IMAGES.sideUtility1),
  sideUtility2: getCardImage(IMAGES.sideUtility2),
  sideUtility3: getCardImage(IMAGES.sideUtility3),
  sideUtility4: getCardImage(IMAGES.sideUtility4),
  
  // Lofted Barn
  loftedBarn: getCardImage(IMAGES.loftedBarn),
  loftedBarn1: getCardImage(IMAGES.loftedBarn1),
  loftedBarn2: getCardImage(IMAGES.loftedBarn2),
  loftedBarn3: getCardImage(IMAGES.loftedBarn3),
  loftedBarn4: getCardImage(IMAGES.loftedBarn4),
  
  // Side Lofted Barn
  sideLoftedBarn1: getCardImage(IMAGES.sideLoftedBarn1),
  sideLoftedBarn2: getCardImage(IMAGES.sideLoftedBarn2),
  sideLoftedBarn3: getCardImage(IMAGES.sideLoftedBarn3),
  sideLoftedBarn4: getCardImage(IMAGES.sideLoftedBarn4),
  
  // Pro Utility
  proUtility: getCardImage(IMAGES.proUtility),
  
  // Pro Lofted Barn
  proLoftedBarn: getCardImage(IMAGES.proLoftedBarn),
  
  // Cabin
  cabinShed: getCardImage(IMAGES.cabinShed),
  cabin1: getCardImage(IMAGES.cabin1),
  cabin2: getCardImage(IMAGES.cabin2),
  cabin3: getCardImage(IMAGES.cabin3),
  cabin4: getCardImage(IMAGES.cabin4),
  
  // Garage
  garage: getCardImage(IMAGES.garage),
  garageShed: getCardImage(IMAGES.garageShed),
  garage1: getCardImage(IMAGES.garage1),
  garage2: getCardImage(IMAGES.garage2),
  garage3: getCardImage(IMAGES.garage3),
  garage4: getCardImage(IMAGES.garage4),
  
  // Carport
  carport: getCardImage(IMAGES.carport),
  carport1: getCardImage(IMAGES.carport1),
  carport2: getCardImage(IMAGES.carport2),
  carport3: getCardImage(IMAGES.carport3),
  
  // RV Cover
  rvCover1: getCardImage(IMAGES.rvCover1),
  rvCover2: getCardImage(IMAGES.rvCover2),
  rvCover3: getCardImage(IMAGES.rvCover3),
  
  // Other
  dormer: getCardImage(IMAGES.dormer),
  treatedGardenShed: getCardImage(IMAGES.treatedGardenShed),
  miniBarn: getCardImage(IMAGES.miniBarn),
  modernShed: getCardImage(IMAGES.modernShed),
  
  // Style Images (used in style pages - slightly larger)
  utilityStyle: getCloudinaryUrl(IMAGES.utilityStyle, { width: 800 }),
  barnStyle: getCloudinaryUrl(IMAGES.barnStyle, { width: 800 }),
  modernStyle: getCloudinaryUrl(IMAGES.modernStyle, { width: 800 }),
  
  // Modern Style Options
  proModern: getCardImage(IMAGES.proModern),
  garageModern: getCardImage(IMAGES.garageModern),
  
  // Greenhouse
  greenhouse1: getCardImage(IMAGES.greenhouse1),
  greenhouse2: getCardImage(IMAGES.greenhouse2),
  greenhouse3: getCardImage(IMAGES.greenhouse3),
  greenhouse4: getCardImage(IMAGES.greenhouse4),
  
  // Animal Shelters
  animalShelter1: getCardImage(IMAGES.animalShelter1),
  animalShelter2: getCardImage(IMAGES.animalShelter2),
  dogKennel1: getCardImage(IMAGES.dogKennel1),
  dogKennel2: getCardImage(IMAGES.dogKennel2),
  chickenCoop1: getCardImage(IMAGES.chickenCoop1),
  chickenCoop2: getCardImage(IMAGES.chickenCoop2),
};
