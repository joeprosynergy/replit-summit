/**
 * Budget Pro - Utility Shed Page Defaults
 * CMS-first architecture defaults for the Budget Pro Utility product page.
 */

import { cloudinaryImages } from '@/lib/cloudinary';
import {
  ProductPageContent,
  ProductPageConfig,
  createStandardSidingCategories,
  UpgradeCategory,
} from './productPageTypes';

// Budget Pro Utility has a simpler upgrade list (no lofts)
const BUDGET_PRO_UTILITY_UPGRADES: UpgradeCategory[] = [
  {
    id: 'doors',
    category: 'Doors',
    items: [
      'Single 36" Wood Door',
      'Double 36" Wood Doors',
      'Single/Double 36" 6 Panel Fiberglass Door',
      'Single/Double 36" 6 Panel Fiberglass 11 Lite Door',
      'Single/Double 36" Solid Pre-Hung Door',
      'Single/Double 36" 9 Lite Pre-Hung Door',
      'Dead Bolt for Steel Door(s)',
      '6\'x6\' Roll up Door',
      '6\'x7\' Roll up Door',
      '9\'x7\' Roll up Door',
      '9\'x7\' Insulated Garage Door (W/ T-Handle Lock/Key)',
    ],
  },
  {
    id: 'windows',
    category: 'Windows',
    items: [
      '24"x36" Window (Single Pane)',
      '36"x36" Window (Single Pane)',
      '24"x36" Vinyl Insulated Window w/ grid',
      '36"x36" Vinyl Insulated Window w/ grid',
      '9" Vinyl Shutters (set)',
      '12" Vinyl Shutters (set)',
    ],
  },
  {
    id: 'flooring-ramps',
    category: 'Flooring & Ramps',
    items: [
      'Pressure Treated Floor',
      '12"x48" Adjustable Ramp (Aluminum)',
      'Brackets & 2 – 12"x48" Ramps',
      'Additional 12"x48" Ramp',
      '6\'x5\' Treated Wood Ramp',
      '9\'x5\' Treated Wood Ramp',
    ],
  },
  {
    id: 'storage-interior',
    category: 'Storage & Interior',
    items: [
      '22" Workbench w/ 3/4" Top (per foot)',
      '22" Double Shelves w/ 1/2" Top (per foot)',
      'Interior 2"x4" Framed Walls (16" o.c. per foot)',
    ],
  },
  {
    id: 'extras',
    category: 'Extras',
    items: [
      'Wainscott (metal siding) (per foot)',
      'Wainscott (wood siding) (per foot)',
      'Porch Railing (per foot)',
      'Anchors (each)',
      'Ridge Vent (per foot)',
      'Moisture Barrier / Single Bubble Insulation',
      'Electrical Package (100 Amp Box, 2 receptacles, 2 lights/switch)',
      'Additional Light or Receptacle (each)',
      'Build on Site Available',
    ],
  },
];

export const budgetProUtilityConfig: ProductPageConfig = {
  slug: 'budget-pro-utility',
  productName: 'Budget Pro - Utility',
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

export const budgetProUtilityDefaults: ProductPageContent = {
  // === META & SEO ===
  metaTitle: 'Budget Pro - Utility Shed | Summit Portable Buildings',
  metaDescription: 'The Budget Pro Utility Shed offers maximum headroom with 7 foot 9 inch walls at an affordable price. Features double doors with T-handle lock. Sizes 8x8 to 14x40. Free delivery within 50 miles.',
  canonicalUrl: 'https://summitbuildings.com/types/basic-storage/budget-pro-utility',

  // === HERO SECTION ===
  title: 'BUDGET PRO -',
  titleHighlight: 'UTILITY',
  titlePosition: 'before',
  description: 'Get MAXIMUM HEADROOM at an affordable price. The Budget Pro Utility features tall 7\'9" walls with a classic A-frame roof design. Perfect for those who need space to stand and work comfortably without breaking the bank.',
  subtitle: 'Sizes: 8×8 to 14×40',
  heroImage: cloudinaryImages.budgetProUtility,
  heroImageAlt: 'Summit Budget Pro Utility',
  heroButton1Text: 'Build Your Own',
  heroButton1Link: 'https://summitbuildings.shedpro.co/',
  heroButton1OpenInNewTab: true,
  heroButton2Text: 'Browse Our Inventory',
  heroButton2Link: '/inventory',
  heroButton2OpenInNewTab: false,

  // === GALLERY SECTION ===
  galleryImages: [
    { src: cloudinaryImages.budgetProUtility, alt: 'Budget Pro Utility - Gray with red trim' },
    { src: cloudinaryImages.budgetProUtility2, alt: 'Budget Pro Utility - White with black trim' },
    { src: cloudinaryImages.budgetProUtility3, alt: 'Budget Pro Utility - Gray with red trim rear view' },
  ],

  // === FEATURES SECTION ===
  featuresHeading: 'Built for',
  featuresHighlight: 'Value & Versatility',
  featuresDescription: 'The Budget Pro - Utility is designed with tall walls for maximum headroom and versatility. Whether you need front entry, side entry, or a completely custom layout — design it exactly how you want.',
  featureImage: cloudinaryImages.budgetProUtility,
  featureImageAlt: 'Budget Pro Utility - Classic A-Frame Style',
  featureBadge: 'Great Value',
  featuresCardTitle: 'Budget Pro - Utility Features',
  features: [
    'Double 36" Doors w/ T-Handle Lock & Key',
    '5/8" Subfloor',
    '7\'9" (93") Wall Height',
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
    'General Storage',
    'Workshop Space',
    'Garden Shed',
    'Tool Storage',
    'Hobby Space',
    'Home Office',
    'Art Studio',
    'Man Cave / She Shed',
    'Backyard Retreat',
  ],
  usesNote: 'If you are on a budget and need a versatile utility shed with plenty of headroom, this is the perfect choice!',

  // === COLOR/SIDING OPTIONS SECTION ===
  colorHeading: 'COLOR AND MATERIAL OPTIONS',
  sidingCategories: createStandardSidingCategories(),

  // === UPGRADES SECTION ===
  showUpgradesSection: true,
  upgradeHeading: 'UPGRADE OPTIONS',
  upgradeCategories: BUDGET_PRO_UTILITY_UPGRADES,

  // === IMPORTANT NOTES ===
  showImportantNote: false,

  // === CTA SECTION ===
  ctaHeading: 'Ready to Get Started?',
  ctaDescription: 'Design your perfect Budget Pro - Utility online in minutes or give us a call',
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
    stylesPath: '/styles/utility',
    stylesLabel: '← Back to Styles',
  },
};
