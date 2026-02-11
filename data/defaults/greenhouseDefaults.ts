/**
 * Greenhouse Page Defaults
 * CMS-first architecture defaults for the Greenhouse product page.
 */

const greenhouse1 = '/assets/greenhouse-1.jpg';
const greenhouse2 = '/assets/greenhouse-2.jpg';
const greenhouse3 = '/assets/greenhouse-3.jpg';
const greenhouse4 = '/assets/greenhouse-4.jpg';
import {
  ProductPageContent,
  ProductPageConfig,
  createGlobalPaintMetalSiding,
} from './productPageTypes';

export const greenhouseConfig: ProductPageConfig = {
  slug: 'greenhouse',
  productName: 'Greenhouse',
  showGallerySection: true,
  showFeaturesSection: true,
  showUsesSection: true,
  showSidingSection: true,
  showUpgradesSection: false, // Greenhouse doesn't have upgrades section
  showImportantNote: false,
  galleryColumns: 4,
  ctaVariant: 'navy',
  maxFeatures: 10,
  maxUses: 12,
  maxGalleryImages: 6,
};

export const greenhouseDefaults: ProductPageContent = {
  // === META & SEO ===
  metaTitle: 'Greenhouse | Summit Portable Buildings',
  metaDescription: 'Summit Buildings Greenhouses feature treated decking floors, exhaust fans, thermostat controllers, shelving, potting benches, and electrical packages. Perfect for year-round growing.',
  canonicalUrl: 'https://summitbuildings.com/types/greenhouse',

  // === HERO SECTION ===
  title: '',
  titleHighlight: 'GREENHOUSE',
  titlePosition: 'only',
  description: 'Purpose-built for serious gardeners. Our greenhouses come equipped with ventilation systems, electrical packages, and durable construction for year-round growing success.',
  subtitle: 'Custom Sizes Available',
  heroImage: greenhouse1,
  heroImageAlt: 'Summit Greenhouse',
  heroButton1Text: 'Design Your Greenhouse',
  heroButton1Link: 'https://summitbuildings.shedpro.co/',
  heroButton1OpenInNewTab: true,
  heroButton2Text: 'Browse Inventory',
  heroButton2Link: '/inventory',
  heroButton2OpenInNewTab: false,

  // === GALLERY SECTION ===
  galleryImages: [
    { src: greenhouse1, alt: 'Summit Greenhouse - Interior view with plants' },
    { src: greenhouse2, alt: 'Summit Greenhouse - Exterior front view' },
    { src: greenhouse3, alt: 'Summit Greenhouse - Side angle view' },
    { src: greenhouse4, alt: 'Summit Greenhouse - Full exterior view' },
  ],

  // === FEATURES SECTION ===
  featuresHeading: 'Built for',
  featuresHighlight: 'Year-Round Growing',
  featuresDescription: 'Our greenhouses come fully equipped with everything you need for successful growing, from ventilation systems to electrical packages and durable flooring.',
  featureImage: greenhouse2,
  featureImageAlt: 'Greenhouse Interior with Shelving',
  featureBadge: 'Fully Equipped',
  featuresCardTitle: 'Standard Features',
  features: [
    'Treated 5/4" Decking Floor',
    '12" Shutter w/ Exhaust Fan & Cord (Up to 300 sq. ft)',
    '12" Intake Shutter & Motor Kit for up to 300 sq. ft',
    'Shutter / Fan Thermostat Controller plus connection',
    '24" Wide Shelving w/ Wire Mesh',
    '24" Wide Potting Soil Bench',
    '36" x 72" Greenhouse Door w/ T Handle Lock',
    'Electrical Package (Includes 100 amp box w/ 2 outlets & two Standard Light Sockets w/ Switch)',
  ],
  designButtonText: 'Design Yours Now',
  designButtonLink: 'https://summitbuildings.shedpro.co/',
  designButtonOpenInNewTab: true,

  // === USES SECTION ===
  usesHeading: 'Perfect For Any Growing Need',
  uses: [
    'Year-Round Vegetable Growing',
    'Flower & Plant Nursery',
    'Seed Starting',
    'Tropical Plant Storage',
    'Herb Garden',
    'Hobby Greenhouse',
    'Commercial Growing',
    'Plant Propagation',
    'Winter Plant Protection',
  ],

  // === COLOR/SIDING OPTIONS SECTION ===
  colorHeading: 'COLOR AND MATERIAL OPTIONS',
  sidingCategories: createGlobalPaintMetalSiding(),

  // === UPGRADES SECTION ===
  showUpgradesSection: false,

  // === IMPORTANT NOTES ===
  showImportantNote: false,

  // === CTA SECTION ===
  ctaHeading: 'Ready to Start Growing?',
  ctaDescription: 'Design your perfect greenhouse today or call us to discuss your needs.',
  ctaVariant: 'navy',
  ctaPrimaryButton: 'Design Your Greenhouse',
  ctaPrimaryButtonLink: 'https://summitbuildings.shedpro.co/',
  ctaPrimaryButtonOpenInNewTab: true,
  ctaSecondaryButton: 'Call (573) 747-4700',
  ctaSecondaryButtonLink: 'tel:5737474700',
  ctaSecondaryButtonOpenInNewTab: false,

  // === BACK PATH CONFIGURATION ===
  backPath: {
    defaultPath: '/styles',
    defaultLabel: '← Back to Styles',
  },
};
