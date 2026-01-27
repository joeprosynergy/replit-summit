/**
 * Utility Shed Page Defaults
 * CMS-first architecture defaults for the Pro - Utility Shed product page.
 */

import { cloudinaryImages } from '@/lib/cloudinary';
import {
  ProductPageContent,
  ProductPageConfig,
  createGlobalSidingCategories,
  DEFAULT_UPGRADE_CATEGORIES,
} from './productPageTypes';

export const utilityShedConfig: ProductPageConfig = {
  slug: 'utility-shed',
  productName: 'Pro - Utility Shed',
  showGallerySection: true,
  showFeaturesSection: true,
  showUsesSection: true,
  showSidingSection: true,
  showUpgradesSection: true,
  showImportantNote: true,
  galleryColumns: 3,
  ctaVariant: 'gradient',
  maxFeatures: 15,
  maxUses: 12,
  maxGalleryImages: 12,
};

export const utilityShedDefaults: ProductPageContent = {
  // === META & SEO ===
  metaTitle: 'Pro - Utility Shed | Summit Portable Buildings',
  metaDescription: 'The Pro Utility Shed is a classy, yet simple addition to your property. Perfect for outdoor power equipment, tack rooms, hay sheds, workshops, or even a lake cabin. Available with standard or side door entry. Sizes 8×8 to 14×40. Free delivery within 50 miles.',
  canonicalUrl: 'https://summitbuildings.com/types/deluxe-storage-cabins/pro-utility-shed',

  // === HERO SECTION ===
  title: 'PRO -',
  titleHighlight: 'UTILITY SHED',
  titlePosition: 'before',
  description: 'A classy, yet simple addition to your property. The superior workmanship makes it an aesthetically pleasing and obvious choice for your storage needs. Available in standard utility or side utility configurations.',
  subtitle: 'Sizes: 8×8 to 14×40',
  heroImage: cloudinaryImages.utilityShed1,
  heroImageAlt: 'Summit Pro Utility Shed',
  heroButton1Text: 'Build Your Own',
  heroButton1Link: 'https://summitbuildings.shedpro.co/',
  heroButton1OpenInNewTab: true,
  heroButton2Text: 'Browse Our Inventory',
  heroButton2Link: '/inventory',
  heroButton2OpenInNewTab: false,

  // === GALLERY SECTION ===
  galleryImages: [
    { src: cloudinaryImages.utilityShed1, alt: 'Summit Utility Shed - Gray with white trim' },
    { src: cloudinaryImages.utilityShed2, alt: 'Summit Utility Shed - Tan with brown trim' },
    { src: cloudinaryImages.utilityShed3, alt: 'Summit Utility Shed - White exterior' },
    { src: cloudinaryImages.utilityShed4, alt: 'Summit Utility Shed - Brown rustic style' },
    { src: cloudinaryImages.sideUtility1, alt: 'Summit Side Utility - Gray with side door' },
    { src: cloudinaryImages.sideUtility2, alt: 'Summit Side Utility - White with windows' },
    { src: cloudinaryImages.sideUtility3, alt: 'Summit Side Utility - Tan with shutters' },
    { src: cloudinaryImages.sideUtility4, alt: 'Summit Side Utility - Dark brown finish' },
    { src: cloudinaryImages.treatedGardenShed, alt: 'Treated garden shed with black shutters' },
  ],

  // === FEATURES SECTION ===
  featuresHeading: 'Built for Any Configuration',
  featuresDescription: 'The Pro - Utility Shed adapts to your needs. Whether you need front entry, side entry, windows for natural light, or a completely custom layout — design it exactly how you want with our 3D configurator.',
  featureImage: cloudinaryImages.sideUtility1,
  featureImageAlt: 'Pro Utility Shed - Customizable Configuration',
  featureBadge: 'Infinitely Customizable',
  featuresCardTitle: 'Pro - Utility Shed Features',
  features: [
    'Double 36" Doors w/ T-Handle Lock & Key',
    '3/4" T & G Advantech Flooring',
    'Mesh Vented Ridge',
    'Moisture Barrier & Drip Edge on Roof',
    '7\'9" (93") Wall Height',
    '16" O.C. Wall Studs',
    '16" O.C. Rafters',
    'Set of 2 Door Holders (Keep the Doors Open)',
    'Side or Front Door Entry Options',
    'Additional Doors & Windows Available',
    'Customizable Layout for Any Use',
  ],
  featureNote: '*8 foot wide models feature adjusted door sizing',
  designButtonText: 'Design Yours Now',
  designButtonLink: 'https://summitbuildings.shedpro.co/',
  designButtonOpenInNewTab: true,

  // === USES SECTION ===
  usesHeading: 'Perfect For Any Use',
  uses: [
    'Outdoor Power Equipment Storage',
    'Portable Tack Room',
    'Small Hay Shed',
    'Workshop (Mechanic/Woodworking)',
    'Lake or Hunting Cabin',
    'Garden Shed',
    'Tool Storage',
    'Hobby Space',
    'Home Office',
  ],
  usesNote: 'Add windows and a 36" 9 Lite Door to create the perfect shop. With so many sizes and styles available, you can find just the right fit for your property!',

  // === COLOR/SIDING OPTIONS SECTION ===
  colorHeading: 'COLOR AND MATERIAL OPTIONS',
  sidingCategories: createGlobalSidingCategories(),

  // === UPGRADES SECTION ===
  showUpgradesSection: true,
  upgradeHeading: 'Available Upgrades',
  upgradeCategories: DEFAULT_UPGRADE_CATEGORIES,

  // === IMPORTANT NOTES ===
  showImportantNote: true,
  importantNote: '*Free delivery within 50 miles. Transom windows come at an up-charge. Prices subject to change without warning.',

  // === CTA SECTION ===
  ctaHeading: 'Ready to Build Your Utility Shed?',
  ctaDescription: 'Design your perfect pro utility shed online in minutes, or browse our in-stock inventory for immediate availability.',
  ctaVariant: 'gradient',
  ctaPrimaryButton: 'Build Your Own',
  ctaPrimaryButtonLink: 'https://summitbuildings.shedpro.co/',
  ctaPrimaryButtonOpenInNewTab: true,
  ctaSecondaryButton: 'See More Models',
  ctaSecondaryButtonLink: '/types',
  ctaSecondaryButtonOpenInNewTab: false,

  // === BACK PATH CONFIGURATION ===
  backPath: {
    defaultPath: '/types/deluxe-storage-cabins#pro-utility',
    defaultLabel: '← Back to Deluxe Storage & Cabins',
    stylesPath: '/styles/utility',
    stylesLabel: '← Back to Styles',
  },
};
