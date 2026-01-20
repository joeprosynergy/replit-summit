/**
 * Summit Cabin Page Defaults
 * CMS-first architecture defaults for the Summit Cabin product page.
 * INDIVIDUAL TREATMENT - Has unique features structure
 */

import { cloudinaryImages } from '@/lib/cloudinary';
import {
  SidingCategory,
  UpgradeCategory,
  DEFAULT_METAL_SIDING,
  DEFAULT_URETHANE_SIDING,
  DEFAULT_VINYL_SIDING,
} from './productPageTypes';

// Cabin-specific siding (no paint option)
const CABIN_SIDING_CATEGORIES: SidingCategory[] = [
  { id: 'metal', title: 'Metal Siding Options', colors: DEFAULT_METAL_SIDING },
  { id: 'urethane', title: 'Urethane Siding Options', colors: DEFAULT_URETHANE_SIDING },
  { id: 'vinyl', title: 'Vinyl Siding Options', colors: DEFAULT_VINYL_SIDING },
];

// Cabin-specific upgrades
const CABIN_UPGRADES: UpgradeCategory[] = [
  {
    id: 'doors',
    category: 'Doors',
    items: [
      'Single 36" Wood Door',
      'Double 36" Wood Doors',
      'Single/Double 36" 6 Panel Fiberglass Door',
      'Single/Double 36" Solid Pre-Hung Door',
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
      '4\' Treated Wood Fold Up Lean To Porch',
      '6\' Treated Wood Fold Up Lean To Porch',
      'Porch Railing (per foot)',
      'Porch Steps',
    ],
  },
  {
    id: 'extras',
    category: 'Extras',
    items: [
      'D-Log Siding Upgrade',
      'Wainscott (metal siding) (per foot)',
      'Ridge Vent (per foot)',
      'Moisture Barrier / Single Bubble Insulation',
      'Electrical Package (100 Amp Box, 2 receptacles, 2 lights/switch)',
      'Additional Light or Receptacle (each)',
      'Build on Site Available',
    ],
  },
];

// Cabin-specific content interface
export interface CabinContent {
  // === META & SEO ===
  metaTitle: string;
  metaDescription: string;
  canonicalUrl: string;

  // === HERO SECTION ===
  title: string;
  titleHighlight: string;
  description: string;
  secondaryDescription: string;
  subtitle: string;
  heroImage: string;
  heroImageAlt: string;
  heroButton1Text: string;
  heroButton1Link: string;
  heroButton1OpenInNewTab: boolean;
  heroButton2Text: string;
  heroButton2Link: string;
  heroButton2OpenInNewTab: boolean;

  // === GALLERY SECTION ===
  galleryImages: Array<{ src: string; alt: string }>;

  // === FEATURES SECTION ===
  featuresHeading: string;
  featuresDescription: string;
  featuresCardTitle: string;
  featuresImage: string;
  featuresImageAlt: string;
  featuresBadge: string;
  features: string[];
  designButtonText: string;
  designButtonLink: string;
  designButtonOpenInNewTab: boolean;

  // === USES SECTION ===
  usesHeading: string;
  uses: string[];
  usesNote: string;

  // === COLOR/SIDING OPTIONS SECTION ===
  colorHeading: string;
  sidingCategories: SidingCategory[];

  // === UPGRADES SECTION ===
  upgradesHeading: string;
  upgradeCategories: UpgradeCategory[];

  // === IMPORTANT NOTES ===
  importantNote: string;

  // === CTA SECTION ===
  ctaHeading: string;
  ctaDescription: string;
  ctaPrimaryButton: string;
  ctaPrimaryButtonLink: string;
  ctaPrimaryButtonOpenInNewTab: boolean;
  ctaSecondaryButton: string;
  ctaSecondaryButtonLink: string;
  ctaSecondaryButtonOpenInNewTab: boolean;

  // === BACK PATH CONFIGURATION ===
  backPath: {
    defaultPath: string;
    defaultLabel: string;
    stylesPath?: string;
    stylesLabel?: string;
  };

  // Allow dynamic fields
  [key: string]: unknown;
}

export const cabinDefaults: CabinContent = {
  // === META & SEO ===
  metaTitle: 'Summit Cabin | Summit Portable Buildings',
  metaDescription: 'The Summit Cabin is perfect for your lake lot, hunting cabin, or tiny home. Features 7/12 pitch roof, 6\' treated wood porch, LED lighting, electrical package, and double pane windows. Starting at $29,717.89. Free delivery within 50 miles.',
  canonicalUrl: 'https://summitbuildings.com/types/deluxe-storage-cabins/cabin',

  // === HERO SECTION ===
  title: 'SUMMIT',
  titleHighlight: 'CABIN',
  description: 'The Summit Cabin is a great building for your lake lot, hunting cabin, or kid\'s play house! The windows let in extra light so that you don\'t need electricity during the daytime. The porch is the perfect place to sit and enjoy the sunset after a long day.',
  secondaryDescription: 'Rather than taking the time to build something permanent, consider this building because it can be moved if necessary. There are so many sizing and siding options that you can find something to fit your hunting property or back yard!',
  subtitle: 'Starting at $29,717.89',
  heroImage: cloudinaryImages.cabin1,
  heroImageAlt: 'Summit Cabin - Exterior view with porch',
  heroButton1Text: 'Build Your Own',
  heroButton1Link: 'https://summitbuildings.shedpro.co/',
  heroButton1OpenInNewTab: true,
  heroButton2Text: 'Browse Our Inventory',
  heroButton2Link: '/inventory',
  heroButton2OpenInNewTab: false,

  // === GALLERY SECTION ===
  galleryImages: [
    { src: cloudinaryImages.cabin1, alt: 'Summit Cabin - Exterior view with porch' },
    { src: cloudinaryImages.cabin2, alt: 'Summit Cabin - Interior finished view' },
    { src: cloudinaryImages.cabin3, alt: 'Summit Cabin - Side view' },
    { src: cloudinaryImages.cabin4, alt: 'Summit Cabin - Interior details' },
  ],

  // === FEATURES SECTION ===
  featuresHeading: 'Built for Living & Relaxation',
  featuresDescription: 'The possibilities are endless with a Summit Cabin. Whether it\'s a tiny home, hunting cabin, or lake retreat — every inch of space can be utilized to perfection. Fully customizable to your needs.',
  featuresCardTitle: 'Summit Cabin Features',
  featuresImage: cloudinaryImages.cabin2,
  featuresImageAlt: 'Summit Cabin - Interior',
  featuresBadge: 'Fully Customizable',
  features: [
    "14' X 32' Base Size",
    "7/12 Pitch Roof",
    "3/4 Advantec Floor",
    "6 Interior LED Lighting & Electrical Package",
    "7 Extra Receptacles + 200 Amp Box Upgrade",
    "2 x 6 Truss",
    "7/16 OSB & Housewrap on Walls",
    "Moisture Barrier and Drip Edge on Roof",
    "6' Treated Wood Fold Up Lean To Porch",
    "D-Log on One 32' Side",
    '36" 9 Lite Door',
    '6" Overhang',
    "6 x 36 x 48 Double Pane Windows",
    "Mesh Vented Ridge",
    "Metal Siding",
    'Wall Studs/Rafters 16" O.C.',
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
    'Kids Play House',
    'Home Office',
    'Art Studio',
    'She Shed / Man Cave',
    'Backyard Retreat',
  ],
  usesNote: 'The built-in porch provides the perfect spot to relax and enjoy the outdoors. Large windows bring in natural light, reducing the need for electricity during the day.',

  // === COLOR/SIDING OPTIONS SECTION ===
  colorHeading: 'COLOR AND MATERIAL OPTIONS',
  sidingCategories: CABIN_SIDING_CATEGORIES,

  // === UPGRADES SECTION ===
  upgradesHeading: 'Available Upgrades',
  upgradeCategories: CABIN_UPGRADES,

  // === IMPORTANT NOTES ===
  importantNote: '*Free delivery within 50 miles. Prices subject to change without warning. Base price shown is for standard configuration.',

  // === CTA SECTION ===
  ctaHeading: 'Ready to Get Started?',
  ctaDescription: 'Design your perfect cabin online or contact us for a free quote.',
  ctaPrimaryButton: 'Build Your Own',
  ctaPrimaryButtonLink: 'https://summitbuildings.shedpro.co/',
  ctaPrimaryButtonOpenInNewTab: true,
  ctaSecondaryButton: 'See More Models',
  ctaSecondaryButtonLink: '/types',
  ctaSecondaryButtonOpenInNewTab: false,

  // === BACK PATH CONFIGURATION ===
  backPath: {
    defaultPath: '/types/deluxe-storage-cabins#cabins-tiny-home',
    defaultLabel: '← Back to Deluxe Storage & Cabins',
    stylesPath: '/styles/utility',
    stylesLabel: '← Back to Styles',
  },
};
