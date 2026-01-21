/**
 * Garage Page Defaults
 * CMS-first architecture defaults for the Garage product page.
 */

import { cloudinaryImages } from '@/lib/cloudinary';
import {
  ProductPageContent,
  ProductPageConfig,
  createStandardSidingCategories,
  DEFAULT_UPGRADE_CATEGORIES,
} from './productPageTypes';

export const garageConfig: ProductPageConfig = {
  slug: 'garage',
  productName: 'Garage',
  showGallerySection: true,
  showFeaturesSection: true,
  showUsesSection: true,
  showSidingSection: true,
  showUpgradesSection: true,
  showImportantNote: true,
  galleryColumns: 4,
  ctaVariant: 'gradient',
  maxFeatures: 12,
  maxUses: 12,
  maxGalleryImages: 8,
};

export const garageDefaults: ProductPageContent = {
  // === META & SEO ===
  metaTitle: 'Garage | Summit Portable Buildings',
  metaDescription: 'Summit Garages are built to handle the weight of any average size vehicle or small tractor. Features 9\'x7\' insulated overhead door, steel walk-in door, and floor joists spaced 12 inches on center. Protect your vehicle from hail damage. Free delivery within 50 miles.',
  canonicalUrl: 'https://summitbuildings.com/types/garages-carports/garage',

  // === HERO SECTION ===
  title: '',
  titleHighlight: 'GARAGE',
  titlePosition: 'only',
  description: 'Built to handle the weight of any average size vehicle or small tractor. If you are tired of worrying about hail damage, but you just don\'t have the time to build a whole new addition to your home, the Garage is the obvious solution.',
  secondaryDescription: 'Not only can this building save you time, but it is a classy way to store and protect your mower, power tools, and extra projects. The floor joists spaced at 12" on center offer great strength and the large door makes this building the woodworker\'s delight!',
  heroImage: cloudinaryImages.garage1,
  heroImageAlt: 'Summit Garage',
  heroButton1Text: 'Build Your Own',
  heroButton1Link: 'https://summitbuildings.shedpro.co/',
  heroButton1OpenInNewTab: true,
  heroButton2Text: 'Browse Inventory',
  heroButton2Link: '/inventory',
  heroButton2OpenInNewTab: false,

  // === GALLERY SECTION ===
  galleryImages: [
    { src: cloudinaryImages.garage1, alt: 'Summit Garage - Red with white trim' },
    { src: cloudinaryImages.garage2, alt: 'Summit Garage - Gray metal exterior' },
    { src: cloudinaryImages.garage3, alt: 'Summit Garage - Tan with brown trim' },
    { src: cloudinaryImages.garage4, alt: 'Summit Garage - White with garage door' },
  ],

  // === FEATURES SECTION ===
  featuresHeading: 'Built for',
  featuresHighlight: 'Vehicles & More',
  featuresDescription: 'Our garages are built tough with floor joists spaced at 12" on center for maximum strength. Whether storing vehicles, mowers, power tools, or serving as your workshop — the garage is the perfect solution.',
  featureImage: cloudinaryImages.garage2,
  featureImageAlt: 'Summit Garage - Built for Vehicles',
  featureBadge: 'Vehicle Ready',
  featuresCardTitle: 'Garage Features',
  features: [
    '9\'x7\' Insulated Overhead Door',
    'T-handle Lock/Key',
    '36" Solid Steel Walk-in Door',
    '1 – 2\'x3\' Window',
    '7\' 9" Walls',
    'Floor Joists Spaced 12" on Center',
    'Built to Handle Vehicle Weight',
    'Ramps Available',
  ],
  designButtonText: 'Design Yours Now',
  designButtonLink: 'https://summitbuildings.shedpro.co/',
  designButtonOpenInNewTab: true,

  // === USES SECTION ===
  usesHeading: 'Perfect For',
  uses: [
    'Vehicle Storage',
    'Small Tractor Storage',
    'Hail Protection',
    'Mower & Equipment Storage',
    'Power Tools & Workshop',
    'Woodworking Shop',
    'Extra Project Space',
    'Motorcycle Storage',
    'ATV & UTV Storage',
  ],
  usesNote: 'The large insulated overhead door makes this building perfect for vehicles, while the steel walk-in door provides easy access for daily use.',

  // === COLOR/SIDING OPTIONS SECTION ===
  colorHeading: 'COLOR AND MATERIAL OPTIONS',
  sidingCategories: createStandardSidingCategories(),

  // === UPGRADES SECTION ===
  showUpgradesSection: true,
  upgradeHeading: 'Available Upgrades',
  upgradeCategories: DEFAULT_UPGRADE_CATEGORIES,

  // === IMPORTANT NOTES ===
  showImportantNote: true,
  importantNote: '*Free delivery within 50 miles. Ramps available at additional cost. Prices subject to change without warning.',

  // === CTA SECTION ===
  ctaHeading: 'Ready to Get Started?',
  ctaDescription: 'Design your perfect garage online or contact us for a free quote.',
  ctaVariant: 'gradient',
  ctaPrimaryButton: 'Build Your Own',
  ctaPrimaryButtonLink: 'https://summitbuildings.shedpro.co/',
  ctaPrimaryButtonOpenInNewTab: true,
  ctaSecondaryButton: 'See More Models',
  ctaSecondaryButtonLink: '/types',
  ctaSecondaryButtonOpenInNewTab: false,

  // === BACK PATH CONFIGURATION ===
  backPath: {
    defaultPath: '/types/garages-carports#garages',
    defaultLabel: '← Back to Garages & Carports',
    stylesPath: '/styles/utility',
    stylesLabel: '← Back to Styles',
  },
};
