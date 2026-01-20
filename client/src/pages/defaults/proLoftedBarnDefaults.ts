/**
 * Pro Lofted Barn Page Defaults
 * CMS-first architecture defaults for the Pro - Lofted Barn product page.
 */

import { cloudinaryImages } from '@/lib/cloudinary';
import {
  ProductPageContent,
  ProductPageConfig,
  createStandardSidingCategories,
  DEFAULT_UPGRADE_CATEGORIES,
} from './productPageTypes';

export const proLoftedBarnConfig: ProductPageConfig = {
  slug: 'pro-lofted-barn',
  productName: 'Pro - Lofted Barn',
  showGallerySection: true,
  showFeaturesSection: true,
  showUsesSection: true,
  showSidingSection: true,
  showUpgradesSection: true,
  showImportantNote: false,
  galleryColumns: 4,
  ctaVariant: 'solid',
  maxFeatures: 15,
  maxUses: 12,
  maxGalleryImages: 10,
};

export const proLoftedBarnDefaults: ProductPageContent = {
  // === META & SEO ===
  metaTitle: 'Pro - Lofted Barn | Summit Portable Buildings',
  metaDescription: 'The Pro Lofted Barn is our best seller - the most versatile building for all purposes. Features 2 lofts for extra storage, windows for natural light, and classic barn styling. Sizes 8×8 to 14×40. Free delivery within 50 miles.',
  canonicalUrl: 'https://summitbuildings.com/types/deluxe-storage-cabins/pro-lofted-barn',

  // === HERO SECTION ===
  title: 'PRO -',
  titleHighlight: 'LOFTED BARN',
  titlePosition: 'before',
  description: 'Our BEST SELLER is the most versatile building for all purposes. The doors can be conveniently located on the front or side for great access. Features 2 lofts for extra storage, windows to add light, and classic country barn styling that fits any property.',
  subtitle: 'Sizes: 8×8 to 14×40',
  heroImage: cloudinaryImages.sideLoftedBarn1,
  heroImageAlt: 'Summit Pro Lofted Barn',
  heroButton1Text: 'Build Your Own',
  heroButton1Link: 'https://summitbuildings.shedpro.co/',
  heroButton1OpenInNewTab: true,
  heroButton2Text: 'Browse Our Inventory',
  heroButton2Link: '/inventory',
  heroButton2OpenInNewTab: false,

  // === GALLERY SECTION ===
  galleryImages: [
    { src: cloudinaryImages.loftedBarn1, alt: 'Summit Lofted Barn - Red with white trim' },
    { src: cloudinaryImages.loftedBarn2, alt: 'Summit Lofted Barn - Blue exterior' },
    { src: cloudinaryImages.loftedBarn3, alt: 'Summit Lofted Barn - Gray with shutters' },
    { src: cloudinaryImages.loftedBarn4, alt: 'Summit Lofted Barn - Classic style' },
    { src: cloudinaryImages.sideLoftedBarn1, alt: 'Summit Side Lofted Barn - Tan with side entry' },
    { src: cloudinaryImages.sideLoftedBarn2, alt: 'Summit Side Lofted Barn - With windows' },
    { src: cloudinaryImages.sideLoftedBarn3, alt: 'Summit Side Lofted Barn - Red exterior' },
    { src: cloudinaryImages.sideLoftedBarn4, alt: 'Summit Side Lofted Barn - Brown finish' },
  ],

  // === FEATURES SECTION ===
  featuresHeading: 'Built for',
  featuresHighlight: 'Maximum Storage',
  featuresDescription: 'The Pro - Lofted Barn is designed with 2 lofts to help keep items organized and up off the floor. Whether you need front entry, side entry, or a completely custom layout — design it exactly how you want.',
  featureImage: cloudinaryImages.loftedBarn1,
  featureImageAlt: 'Pro Lofted Barn - Classic Barn Style',
  featureBadge: 'Our Best Seller',
  featuresCardTitle: 'Pro - Lofted Barn Features',
  features: [
    'Double 36" Doors w/ T-Handle Lock & Key',
    '2 Lofts for Maximum Storage',
    'Loft Ladder Included',
    '3/4" T & G Advantech Flooring',
    'Mesh Vented Ridge',
    'Moisture Barrier & Drip Edge on Roof',
    '6\'6" (78") Wall Height',
    '16" O.C. Wall Studs',
    '16" O.C. Rafters',
    'Set of 2 Door Holders (Keep the Doors Open)',
    'Side or Front Door Entry Options',
    'Additional Doors & Windows Available',
    'Customizable Layout for Any Use',
  ],
  featureNote: '*8 foot wide models feature single 48" door & 1 window. Loft ladder not included with Painted Express Series.',
  designButtonText: 'Design Yours Now',
  designButtonLink: 'https://summitbuildings.shedpro.co/',
  designButtonOpenInNewTab: true,

  // === USES SECTION ===
  usesHeading: 'Perfect For Any Use',
  uses: [
    'Organized Storage with Lofts',
    'Workshop Space',
    'Tack Room',
    'Garden Shed',
    'Lake or Hunting Cabin',
    'Home Office',
    'Art Studio',
    'Man Cave / She Shed',
    'Hobby Space',
  ],
  usesNote: 'If you are on a budget and looking for a classy shed which you will feel proud to call your own, this is the place to start!',

  // === COLOR/SIDING OPTIONS SECTION ===
  colorHeading: 'COLOR AND MATERIAL OPTIONS',
  sidingCategories: createStandardSidingCategories(),

  // === UPGRADES SECTION ===
  showUpgradesSection: true,
  upgradeHeading: 'UPGRADE OPTIONS',
  upgradeCategories: DEFAULT_UPGRADE_CATEGORIES,

  // === IMPORTANT NOTES ===
  showImportantNote: false,

  // === CTA SECTION ===
  ctaHeading: 'Ready to Get Started?',
  ctaDescription: 'Design your perfect Pro - Lofted Barn online in minutes or give us a call',
  ctaVariant: 'solid',
  ctaPrimaryButton: 'Design Your Building',
  ctaPrimaryButtonLink: 'https://summitbuildings.shedpro.co/',
  ctaPrimaryButtonOpenInNewTab: true,
  ctaSecondaryButton: 'Call 573-747-4700',
  ctaSecondaryButtonLink: 'tel:5737474700',
  ctaSecondaryButtonOpenInNewTab: false,

  // === BACK PATH CONFIGURATION ===
  backPath: {
    defaultPath: '/types/deluxe-storage-cabins#pro-lofted-barn',
    defaultLabel: '← Back to Deluxe Storage & Cabins',
    stylesPath: '/styles/barn',
    stylesLabel: '← Back to Styles',
  },
};
