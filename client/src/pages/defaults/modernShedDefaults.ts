/**
 * Modern Shed Page Defaults
 * CMS-first architecture defaults for the Modern Shed product page.
 * SPECIAL LAYOUT - Has unique "Why" cards and uses with descriptions
 */

import modernShed1 from '@/assets/modern-shed-1.jpg';
import modernShed2 from '@/assets/modern-shed-2.jpg';
import modernShed3 from '@/assets/modern-shed-3.jpg';
import modernShed4 from '@/assets/modern-shed-4.jpg';
import modernShed5 from '@/assets/modern-shed-5.jpg';
import modernShed6 from '@/assets/modern-shed-6.jpg';
import modernShed7 from '@/assets/modern-shed-7.jpg';
import modernShed8 from '@/assets/modern-shed-8.jpg';
import modernShed9 from '@/assets/modern-shed-9.jpg';
import modernShed10 from '@/assets/modern-shed-10.jpg';
import {
  SidingCategory,
  UpgradeCategory,
  getGlobalPaintSwatches,
  getGlobalMetalSwatches,
} from './productPageTypes';

// Modern Shed siding - uses global colors from admin palette
const MODERN_SHED_SIDING: SidingCategory[] = [
  { id: 'paint', title: 'Paint Siding Options', colors: getGlobalPaintSwatches() },
  { id: 'metal', title: 'Metal Siding Options', colors: getGlobalMetalSwatches() },
];

// Modern Shed specific upgrades
const MODERN_SHED_UPGRADES: UpgradeCategory[] = [
  {
    id: 'doors',
    category: 'Doors',
    items: ['Additional 36" 9-Lite doors', '15-Lite French doors', 'Sliding glass door', 'Roll-up garage door'],
  },
  {
    id: 'windows',
    category: 'Windows',
    items: ['Additional 24x36 windows', 'Clerestory windows', '30x36 windows', '36x36 windows'],
  },
  {
    id: 'flooring-ramps',
    category: 'Flooring & Ramps',
    items: ['Pressure treated flooring', 'Ramp', 'Concrete anchors'],
  },
  {
    id: 'storage-interior',
    category: 'Storage & Interior',
    items: ['Workbench', 'Shelving', 'Loft', 'Electrical package'],
  },
  {
    id: 'extras',
    category: 'Extras',
    items: ['Shutters', 'Flower boxes', 'Vents', 'Additional colors'],
  },
];

// Why reason type
export interface WhyReason {
  id: string;
  title: string;
  description: string;
  iconType: 'home' | 'wrench' | 'briefcase' | 'palette';
}

// Use case with description type
export interface UseCase {
  id: string;
  title: string;
  description: string;
}

// Modern Shed content interface
export interface ModernShedContent {
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

  // === FEATURES SECTION ===
  featuresHeading: string;
  featuresDescription: string;
  features: string[];

  // === WHY SECTION ===
  whyHeading: string;
  whyReasons: WhyReason[];

  // === USES SECTION ===
  usesHeading: string;
  useCases: UseCase[];

  // === COLOR OPTIONS SECTION ===
  colorHeading: string;
  colorDescription: string;
  sidingCategories: SidingCategory[];

  // === UPGRADES SECTION ===
  upgradeHeading: string;
  upgradeDescription: string;
  upgradeCategories: UpgradeCategory[];

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

export const modernShedDefaults: ModernShedContent = {
  // === META & SEO ===
  metaTitle: 'Modern Shed | Summit Portable Buildings',
  metaDescription: 'Discover our Modern Shed with single slope roof design. Features LP SmartSide siding, 6-inch overhangs, and contemporary aesthetics. Perfect for offices, studios, or storage.',
  canonicalUrl: 'https://summitbuildings.com/types/deluxe-storage-cabins/modern-shed',

  // === HERO SECTION ===
  title: 'MODERN',
  titleHighlight: 'SHED',
  description: 'Contemporary design with clean lines and a distinctive single slope roof. Perfect for modern home offices, art studios, or stylish storage solutions.',
  heroImage: modernShed1,
  heroImageAlt: 'Modern Shed',
  heroButton1Text: 'Design Your Building',
  heroButton1Link: 'https://summitbuildings.shedpro.co/',
  heroButton1OpenInNewTab: true,
  heroButton2Text: 'Browse Inventory',
  heroButton2Link: '/inventory',
  heroButton2OpenInNewTab: false,

  // === GALLERY SECTION ===
  galleryImages: [
    { src: modernShed1, alt: 'Modern Shed exterior front view' },
    { src: modernShed2, alt: 'Modern Shed exterior with clerestory windows' },
    { src: modernShed3, alt: 'Modern Shed exterior side angle' },
    { src: modernShed4, alt: 'Modern Shed exterior corner view' },
    { src: modernShed5, alt: 'Modern Shed interior with natural light' },
    { src: modernShed6, alt: 'Modern Shed exterior with door' },
    { src: modernShed7, alt: 'Modern Shed interior framing' },
    { src: modernShed8, alt: 'Modern Shed interior floor view' },
    { src: modernShed9, alt: 'Modern Shed interior windows and door' },
    { src: modernShed10, alt: 'Modern Shed interior open space' },
  ],

  // === FEATURES SECTION ===
  featuresHeading: 'Standard Features',
  featuresDescription: 'Every Modern Shed includes premium Pro Series construction with contemporary design elements that set it apart from traditional sheds.',
  features: [
    'LP SmartSide siding',
    '2x6 Floor joists 12" OC',
    '4x6 Treated skids',
    'AdvanTech flooring',
    'House wrap',
    'Single slope roof',
    '6" Overhangs',
    'Moisture barrier & drip edge on roof',
    'Wall studs 16" OC',
    '36" 9-Lite pre-hung door',
  ],

  // === WHY SECTION ===
  whyHeading: 'Why Choose Modern Style?',
  whyReasons: [
    {
      id: 'aesthetics',
      title: 'Contemporary Aesthetics',
      description: 'Clean lines and single slope roof complement modern home architecture.',
      iconType: 'home',
    },
    {
      id: 'quality',
      title: 'Pro Series Quality',
      description: 'LP SmartSide siding, 2x6 floor joists, and AdvanTech flooring for durability.',
      iconType: 'wrench',
    },
    {
      id: 'versatile',
      title: 'Versatile Use',
      description: 'Perfect for home offices, studios, workshops, or stylish storage.',
      iconType: 'briefcase',
    },
    {
      id: 'light',
      title: 'Natural Light',
      description: 'Clerestory window options bring in abundant natural light.',
      iconType: 'palette',
    },
  ],

  // === USES SECTION ===
  usesHeading: 'Ideal Uses',
  useCases: [
    {
      id: 'office',
      title: 'Home Office',
      description: 'A quiet, professional workspace separate from your home.',
    },
    {
      id: 'studio',
      title: 'Art Studio',
      description: 'Natural light and open space for creative work.',
    },
    {
      id: 'guest',
      title: 'Guest Suite',
      description: 'Add finishing touches for comfortable guest accommodations.',
    },
    {
      id: 'storage',
      title: 'Modern Storage',
      description: 'Stylish storage that complements contemporary homes.',
    },
  ],

  // === COLOR OPTIONS SECTION ===
  colorHeading: 'Color & Material Options',
  colorDescription: 'Customize your Modern Shed with a wide range of colors for siding, trim, and roofing.',
  sidingCategories: MODERN_SHED_SIDING,

  // === UPGRADES SECTION ===
  upgradeHeading: 'Available Upgrades',
  upgradeDescription: 'Enhance your Modern Shed with these popular upgrades.',
  upgradeCategories: MODERN_SHED_UPGRADES,

  // === CTA SECTION ===
  ctaHeading: 'Ready to Design Your Modern Shed?',
  ctaDescription: 'Use our online configurator to customize your perfect Modern Shed, or contact us for personalized assistance.',
  ctaPrimaryButton: 'Design Your Building',
  ctaPrimaryButtonLink: 'https://summitbuildings.shedpro.co/',
  ctaPrimaryButtonOpenInNewTab: true,
  ctaSecondaryButton: 'Contact Us',
  ctaSecondaryButtonLink: '/contact-us',
  ctaSecondaryButtonOpenInNewTab: false,

  // === BACK PATH CONFIGURATION ===
  backPath: {
    defaultPath: '/types/deluxe-storage-cabins',
    defaultLabel: '← Back to Deluxe Storage & Cabins',
    stylesPath: '/styles/modern',
    stylesLabel: '← Back to Modern Style',
  },
};
