/**
 * Budget Pro - Lofted Barn Page Defaults
 * CMS-first architecture defaults for the Budget Pro Lofted Barn product page.
 */

import { cloudinaryImages } from '@/lib/cloudinary';
import {
  ProductPageContent,
  ProductPageConfig,
  createGlobalSidingCategories,
  DEFAULT_UPGRADE_CATEGORIES,
} from './productPageTypes';

export const budgetProLoftedBarnConfig: ProductPageConfig = {
  slug: 'budget-pro-lofted-barn',
  productName: 'Budget Pro - Lofted Barn',
  showGallerySection: true,
  showFeaturesSection: true,
  showUsesSection: true,
  showSidingSection: true,
  showUpgradesSection: true,
  showImportantNote: false,
  galleryColumns: 3,
  ctaVariant: 'solid',
  maxFeatures: 12,
  maxUses: 12,
  maxGalleryImages: 6,
};

export const budgetProLoftedBarnDefaults: ProductPageContent = {
  // === META & SEO ===
  metaTitle: 'Budget Pro - Lofted Barn | Summit Portable Buildings',
  metaDescription: 'The Budget Pro Lofted Barn offers classic barn styling at an affordable price. Features 1 loft for extra storage, double doors with T-handle lock. Sizes 8×8 to 14×40. Free delivery within 50 miles.',
  canonicalUrl: 'https://summitbuildings.com/types/basic-storage/budget-pro-lofted-barn',

  // === HERO SECTION ===
  title: 'BUDGET PRO -',
  titleHighlight: 'LOFTED BARN',
  titlePosition: 'before',
  description: 'Get CLASSIC BARN STYLING at an affordable price. The Budget Pro Lofted Barn features the timeless gambrel roof design with 1 loft for extra storage space. Perfect for those who want quality and style without breaking the bank.',
  subtitle: 'Sizes: 8×8 to 14×40',
  heroImage: cloudinaryImages.budgetProLoftedBarn,
  heroImageAlt: 'Summit Budget Pro Lofted Barn',
  heroButton1Text: 'Build Your Own',
  heroButton1Link: 'https://summitbuildings.shedpro.co/',
  heroButton1OpenInNewTab: true,
  heroButton2Text: 'Browse Our Inventory',
  heroButton2Link: '/inventory',
  heroButton2OpenInNewTab: false,

  // === GALLERY SECTION ===
  galleryImages: [
    { src: cloudinaryImages.budgetProLoftedBarn, alt: 'Budget Pro Lofted Barn - Main image' },
    { src: cloudinaryImages.budgetProLoftedBarn2, alt: 'Budget Pro Lofted Barn - Tan with black trim' },
    { src: cloudinaryImages.budgetProLoftedBarn3, alt: 'Budget Pro Lofted Barn - Green exterior' },
  ],

  // === FEATURES SECTION ===
  featuresHeading: 'Built for',
  featuresHighlight: 'Value & Storage',
  featuresDescription: 'The Budget Pro - Lofted Barn is designed with 1 loft to help keep items organized and up off the floor. Whether you need front entry, side entry, or a completely custom layout — design it exactly how you want.',
  featureImage: cloudinaryImages.budgetProLoftedBarn,
  featureImageAlt: 'Budget Pro Lofted Barn - Classic Barn Style',
  featureBadge: 'Great Value',
  featuresCardTitle: 'Budget Pro - Lofted Barn Features',
  features: [
    'Double 36" Doors w/ T-Handle Lock & Key',
    '1 Loft for Extra Storage',
    '5/8" Subfloor',
    '6\'6" (78") Wall Height',
    '24" O.C. Wall Studs',
    '48" O.C. Rafters w/ 2x4 Lathing',
    'Side or Front Door Entry Options',
    'Additional Doors & Windows Available',
    'Customizable Layout for Any Use',
  ],
  featureNote: '*8 foot wide models feature single 48" door.',
  designButtonText: 'Design Yours Now',
  designButtonLink: 'https://summitbuildings.shedpro.co/',
  designButtonOpenInNewTab: true,

  // === USES SECTION ===
  usesHeading: 'Perfect For Any Use',
  uses: [
    'Organized Storage with Loft',
    'Workshop Space',
    'Garden Shed',
    'Tool Storage',
    'Hobby Space',
    'Home Office',
    'Art Studio',
    'Man Cave / She Shed',
    'Backyard Retreat',
  ],
  usesNote: 'If you are on a budget and looking for classic barn styling with a loft, this is the perfect choice!',

  // === COLOR/SIDING OPTIONS SECTION ===
  colorHeading: 'COLOR AND MATERIAL OPTIONS',
  sidingCategories: createGlobalSidingCategories(),

  // === UPGRADES SECTION ===
  showUpgradesSection: true,
  upgradeHeading: 'UPGRADE OPTIONS',
  upgradeCategories: DEFAULT_UPGRADE_CATEGORIES,

  // === IMPORTANT NOTES ===
  showImportantNote: false,

  // === CTA SECTION ===
  ctaHeading: 'Ready to Get Started?',
  ctaDescription: 'Design your perfect Budget Pro - Lofted Barn online in minutes or give us a call',
  ctaVariant: 'solid',
  ctaPrimaryButton: 'Design Your Building',
  ctaPrimaryButtonLink: 'https://summitbuildings.shedpro.co/',
  ctaPrimaryButtonOpenInNewTab: true,
  ctaSecondaryButton: 'Call 573-747-4700',
  ctaSecondaryButtonLink: 'tel:5737474700',
  ctaSecondaryButtonOpenInNewTab: false,

  // === BACK PATH CONFIGURATION ===
  backPath: {
    defaultPath: '/types/basic-storage#budget-pro',
    defaultLabel: '← Back to Basic Storage',
    stylesPath: '/styles/barn',
    stylesLabel: '← Back to Styles',
  },
};
