/**
 * Barn Cabin (Lofted Cabin) Page Defaults
 * CMS-first architecture defaults for the Lofted Cabin product page.
 */

import barnCabin1 from '@/assets/barn-cabin-1.jpg';
import barnCabin2 from '@/assets/barn-cabin-2.jpg';
import barnCabin3 from '@/assets/barn-cabin-3.jpg';
import barnCabin4 from '@/assets/barn-cabin-4.jpg';
import barnCabin5 from '@/assets/barn-cabin-5.jpg';
import {
  ProductPageContent,
  ProductPageConfig,
  createMetalOnlySiding,
  UpgradeCategory,
} from './productPageTypes';

// Custom upgrades for Barn Cabin
const BARN_CABIN_UPGRADES: UpgradeCategory[] = [
  {
    id: 'doors',
    category: 'Doors',
    items: [
      'Single 36" Wood Door',
      'Double 36" Wood Doors',
      'Single/Double 36" 6 Panel Fiberglass Door',
      'Single/Double 36" 9 Lite Pre-Hung Door',
      'Dead Bolt for Steel Door(s)',
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
      '6\'x5\' Treated Wood Ramp',
      '9\'x5\' Treated Wood Ramp',
    ],
  },
  {
    id: 'porch',
    category: 'Porch Options',
    items: [
      '4\' Treated Wood Porch',
      '6\' Treated Wood Porch',
      'Porch Railing (per foot)',
      'Porch Steps',
    ],
  },
  {
    id: 'extras',
    category: 'Extras',
    items: [
      'Additional Lofts',
      'Wainscott (metal siding) (per foot)',
      'Ridge Vent (per foot)',
      'Moisture Barrier / Single Bubble Insulation',
      'Electrical Package (100 Amp Box, 2 receptacles, 2 lights/switch)',
      'Additional Light or Receptacle (each)',
      'Build on Site Available',
    ],
  },
];

export const barnCabinConfig: ProductPageConfig = {
  slug: 'barn-cabin',
  productName: 'Lofted Cabin',
  showGallerySection: true,
  showFeaturesSection: true,
  showUsesSection: true,
  showSidingSection: true,
  showUpgradesSection: true,
  showImportantNote: false,
  galleryColumns: 4,
  ctaVariant: 'gradient',
  maxFeatures: 16,
  maxUses: 12,
  maxGalleryImages: 8,
};

export const barnCabinDefaults: ProductPageContent = {
  // === META & SEO ===
  metaTitle: 'Lofted Cabin | Barn Style | Summit Portable Buildings',
  metaDescription: 'The Lofted Cabin features a classic gambrel roof design with two lofts for maximum storage. Perfect for lake lots, hunting cabins, or tiny homes. Free delivery within 50 miles.',
  canonicalUrl: 'https://summitbuildings.com/types/deluxe-storage-cabins/barn-cabin',

  // === HERO SECTION ===
  title: '',
  titleHighlight: 'LOFTED CABIN',
  titlePosition: 'only',
  description: 'The Lofted Cabin combines classic barn styling with cabin functionality. The iconic gambrel roof maximizes overhead space with two generous lofts, while the covered porch provides the perfect spot to relax and enjoy the outdoors.',
  secondaryDescription: 'Perfect for lake lots, hunting properties, or as a backyard guest house. The barn-style roofline gives you more usable space than traditional cabins, and the included porch adds charm and functionality.',
  heroImage: barnCabin1,
  heroImageAlt: 'Lofted Cabin',
  heroButton1Text: 'Build Your Own',
  heroButton1Link: 'https://summitbuildings.shedpro.co/',
  heroButton1OpenInNewTab: true,
  heroButton2Text: 'Browse Inventory',
  heroButton2Link: '/inventory',
  heroButton2OpenInNewTab: false,

  // === GALLERY SECTION ===
  galleryImages: [
    { src: barnCabin1, alt: 'Lofted Cabin - Exterior view with porch' },
    { src: barnCabin2, alt: 'Lofted Cabin - Blue exterior with porch' },
    { src: barnCabin3, alt: 'Lofted Cabin - Interior with loft space' },
    { src: barnCabin4, alt: 'Lofted Cabin - Interior view toward door' },
    { src: barnCabin5, alt: 'Lofted Cabin - Gray exterior front view' },
  ],

  // === FEATURES SECTION ===
  featuresHeading: 'Classic Barn Style',
  featuresHighlight: 'Living Space',
  featuresDescription: 'The gambrel roof design provides maximum overhead storage with two large lofts. The included porch with railing creates the perfect outdoor living space.',
  featureImage: barnCabin5,
  featureImageAlt: 'Lofted Cabin - Details',
  featureBadge: 'Two Lofts Included',
  featuresCardTitle: 'Lofted Cabin Features',
  features: [
    '36" 9-Lite Pre-Hung Door',
    "4' Deep Porch with Railing",
    '2 Lofts for Maximum Storage',
    'Loft Ladder Included',
    '3/4" T & G Advantech Flooring',
    'Mesh Vented Ridge',
    'Moisture Barrier & Drip Edge on Roof',
    '6\'6" (78") Wall Height',
    '16" O.C. Wall Studs',
    '16" O.C. Rafters',
    'Gambrel (Barn) Roof Style',
    'Metal Siding & Roofing',
    '50 Year Warranty on Siding',
    '40 Year Warranty on Roof',
  ],
  designButtonText: 'Design Yours Now',
  designButtonLink: 'https://summitbuildings.shedpro.co/',
  designButtonOpenInNewTab: true,

  // === USES SECTION ===
  usesHeading: 'Perfect For',
  uses: [
    'Lake Lot Cabin',
    'Hunting Cabin',
    'Tiny Home',
    'Guest House',
    'Home Office',
    'She Shed / Man Cave',
    'Backyard Retreat',
    'Art Studio',
    'Workshop with Storage',
  ],
  usesNote: 'The dual lofts provide excellent storage or sleeping space, while the covered porch is perfect for morning coffee or evening relaxation.',

  // === COLOR/SIDING OPTIONS SECTION ===
  colorHeading: 'COLOR OPTIONS',
  sidingCategories: createMetalOnlySiding(),

  // === UPGRADES SECTION ===
  showUpgradesSection: true,
  upgradeHeading: 'UPGRADE OPTIONS',
  upgradeCategories: BARN_CABIN_UPGRADES,

  // === IMPORTANT NOTES ===
  showImportantNote: false,

  // === CTA SECTION ===
  ctaHeading: 'Ready to Build Your Lofted Cabin?',
  ctaDescription: 'Design your perfect barn-style cabin online in minutes, or browse our in-stock inventory for immediate availability.',
  ctaVariant: 'gradient',
  ctaPrimaryButton: 'Build Your Own',
  ctaPrimaryButtonLink: 'https://summitbuildings.shedpro.co/',
  ctaPrimaryButtonOpenInNewTab: true,
  ctaSecondaryButton: 'Browse Inventory',
  ctaSecondaryButtonLink: '/inventory',
  ctaSecondaryButtonOpenInNewTab: false,

  // === BACK PATH CONFIGURATION ===
  backPath: {
    defaultPath: '/types/deluxe-storage-cabins#cabins-tiny-home',
    defaultLabel: '← Back to Deluxe Storage & Cabins',
    stylesPath: '/styles/barn',
    stylesLabel: '← Back to Barn Styles',
  },
};
