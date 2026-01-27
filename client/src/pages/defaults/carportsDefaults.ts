/**
 * Carports & RV Covers Page Defaults
 * CMS-first architecture defaults for the Carports product page.
 * SPECIAL LAYOUT - Has 2 sub-products (Carports, RV Covers)
 */

import { cloudinaryImages } from '@/lib/cloudinary';
import {
  SidingCategory,
  getGlobalMetalSwatches,
} from './productPageTypes';

// Carports only use metal - uses global colors
const CARPORTS_SIDING: SidingCategory[] = [
  { id: 'metal', title: 'Metal Color Options', colors: getGlobalMetalSwatches() },
];

// Carport sub-product type
export interface CarportProduct {
  id: string;
  heading: string;
  highlight: string;
  description: string;
  image: string;
  imageAlt: string;
  badge: string;
  features: string[];
}

// Carports content interface
export interface CarportsContent {
  // === META & SEO ===
  metaTitle: string;
  metaDescription: string;
  canonicalUrl: string;

  // === HERO SECTION ===
  title: string;
  titleHighlight: string;
  description: string;
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

  // === CARPORT PRODUCTS (2) ===
  carportProduct: CarportProduct;
  rvProduct: CarportProduct;

  // === USES SECTION ===
  usesHeading: string;
  uses: string[];

  // === COLOR OPTIONS SECTION ===
  colorHeading: string;
  sidingCategories: SidingCategory[];

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

export const carportsDefaults: CarportsContent = {
  // === META & SEO ===
  metaTitle: 'Carports & RV Covers | Summit Portable Buildings',
  metaDescription: 'Steel carports and RV covers provide the best protection against cold, rain, sun, and wind – even tornadoes and hurricanes. Available for commercial, industrial, or residential use.',
  canonicalUrl: 'https://summitbuildings.com/types/garages-carports/carports',

  // === HERO SECTION ===
  title: 'CARPORTS &',
  titleHighlight: 'RV COVERS',
  description: 'Steel carports are the best option for protecting your vehicles against the cold, rain, sun, and wind – even tornadoes and hurricanes. As good if not better than traditional stick frame or concrete buildings for commercial, industrial, or residential use.',
  heroImage: cloudinaryImages.carport1,
  heroImageAlt: 'Steel Carport',
  heroButton1Text: 'Browse Our Inventory',
  heroButton1Link: '/inventory',
  heroButton1OpenInNewTab: false,
  heroButton2Text: 'View All Models',
  heroButton2Link: '/types',
  heroButton2OpenInNewTab: false,

  // === GALLERY SECTION ===
  galleryImages: [
    { src: cloudinaryImages.carport1, alt: 'Steel carport with red and white roof' },
    { src: cloudinaryImages.carport2, alt: 'Steel carport structure - side view' },
    { src: cloudinaryImages.carport3, alt: 'Steel carport with gray finish' },
    { src: cloudinaryImages.rvCover1, alt: 'RV Cover protecting recreational vehicle' },
    { src: cloudinaryImages.rvCover2, alt: 'Metal RV carport with enclosed sides' },
    { src: cloudinaryImages.rvCover3, alt: 'Large RV cover structure' },
  ],

  // === CARPORT PRODUCTS (2) ===
  carportProduct: {
    id: 'carports',
    heading: 'Built to',
    highlight: 'Protect',
    description: 'Our steel carports provide superior protection for your vehicles, equipment, and outdoor spaces. Engineered to withstand extreme weather conditions.',
    image: cloudinaryImages.carport2,
    imageAlt: 'Steel Carport Structure',
    badge: 'Heavy-Duty Steel',
    features: [
      'Heavy-duty steel frame construction',
      'Protection from sun, rain, wind, and snow',
      'Withstands tornadoes and hurricanes',
      'Multiple size options available',
      'Customizable roof styles',
      'Optional enclosed sides',
      'Commercial, industrial, or residential use',
      'Long-lasting galvanized steel',
    ],
  },
  rvProduct: {
    id: 'rv-covers',
    heading: 'RV',
    highlight: 'Covers',
    description: 'Owning a recreational vehicle requires a huge investment and it\'s one worth protecting. Our metal RV carports provide the best protection to keep your "get-away" vehicle in tip-top shape.',
    image: cloudinaryImages.rvCover1,
    imageAlt: 'RV Cover protecting recreational vehicle',
    badge: 'Protect Your Investment',
    features: [
      'Extra tall clearance for RVs',
      'Protects your investment from the elements',
      'Keep your \'get-away\' vehicle in tip-top shape',
      'Available in various widths and lengths',
      'Optional full or partial enclosure',
      'Sturdy construction for all weather',
    ],
  },

  // === USES SECTION ===
  usesHeading: 'Perfect For Any Application',
  uses: [
    'Vehicle Protection',
    'RV & Camper Storage',
    'Boat Covers',
    'Farm Equipment',
    'Outdoor Workspace',
    'Commercial Parking',
    'Event Shelters',
    'Industrial Storage',
    'Picnic Areas',
  ],

  // === COLOR OPTIONS SECTION ===
  colorHeading: 'COLOR OPTIONS',
  sidingCategories: CARPORTS_SIDING,

  // === IMPORTANT NOTES ===
  importantNote: '*Free delivery within 50 miles. Prices subject to change without warning. Custom sizes and configurations available upon request.',

  // === CTA SECTION ===
  ctaHeading: 'Ready to Get Started?',
  ctaDescription: 'Contact us today for a free quote on your carport or RV cover.',
  ctaPrimaryButton: 'Browse Our Inventory',
  ctaPrimaryButtonLink: '/inventory',
  ctaPrimaryButtonOpenInNewTab: false,
  ctaSecondaryButton: 'See More Models',
  ctaSecondaryButtonLink: '/types',
  ctaSecondaryButtonOpenInNewTab: false,

  // === BACK PATH CONFIGURATION ===
  backPath: {
    defaultPath: '/types/garages-carports#carports',
    defaultLabel: '← Back to Garages & Carports',
    stylesPath: '/styles/utility',
    stylesLabel: '← Back to Styles',
  },
};
