/**
 * StylesUtility Page Defaults
 * CMS-first architecture defaults
 */

import { cloudinaryImages } from '@/lib/cloudinary';

export interface OptionItem {
  id: string;
  name: string;
  description: string;
  features: string[];
  image: string;
  link: string;
  openInNewTab: boolean;
}

export interface OtherStyleItem {
  id: string;
  name: string;
  subtitle: string;
  image: string;
  link: string;
  openInNewTab: boolean;
}

export interface StylesUtilityContent {
  // Meta
  metaTitle: string;
  metaDescription: string;

  // Hero section
  heroTagline: string;
  heroHeading: string;
  heroSubheading: string;

  // Section headers
  storageHeader: string;
  cabinsHeader: string;
  garagesHeader: string;
  otherStylesHeader: string;
  otherStylesDescription: string;

  // Storage options
  storageOptions: OptionItem[];

  // Cabin options
  cabinOptions: OptionItem[];

  // Garage options
  garageOptions: OptionItem[];

  // Other styles
  otherStyles: OtherStyleItem[];

  // CTA section
  ctaHeading: string;
  ctaDescription: string;
  ctaButtonText: string;
  ctaButtonLink: string;
  ctaButtonOpenInNewTab: boolean;

  // Allow dynamic fields
  [key: string]: unknown;
}

export const stylesUtilityDefaults: StylesUtilityContent = {
  // Meta
  metaTitle: 'Utility Style Buildings | Summit Portable Buildings',
  metaDescription: 'Explore our Utility style buildings with traditional A-frame roofs. Choose from Economy, Budget Pro, Pro, Cabin, Garage, or Carport options.',

  // Hero section
  heroTagline: '← Back to Styles',
  heroHeading: 'Utility Style',
  heroSubheading: 'Traditional A-Frame Roof — Classic design with timeless appeal',

  // Section headers
  storageHeader: 'Storage',
  cabinsHeader: 'Cabins & Tiny Homes',
  garagesHeader: 'Garages & Carports',
  otherStylesHeader: 'Looking for Something Different?',
  otherStylesDescription: 'Explore our other building styles to find the perfect fit for your needs.',

  // Storage options
  storageOptions: [
    {
      id: 'economy',
      name: 'Economy',
      description: 'Our most economical storage building. Lowest cost per square foot.',
      features: ['Metal siding only', '6\'6" walls', 'Double 36" or single 48" door'],
      image: cloudinaryImages.economy,
      link: '/types/basic-storage/economy-shed',
      openInNewTab: false,
    },
    {
      id: 'budget-pro-utility',
      name: 'Budget Pro',
      description: 'Maximum headroom at an affordable price.',
      features: ['7\'9" walls', 'Double 36" doors w/ lock', '5/8" subfloor'],
      image: cloudinaryImages.budgetProUtility,
      link: '/types/basic-storage/budget-pro-utility',
      openInNewTab: false,
    },
    {
      id: 'pro-utility',
      name: 'Pro',
      description: 'Premium quality with superior workmanship.',
      features: ['7\'9" walls', '3/4" Advantech flooring', 'Moisture barrier & drip edge'],
      image: cloudinaryImages.proUtility,
      link: '/types/deluxe-storage-cabins/pro-utility-shed',
      openInNewTab: false,
    },
  ],

  // Cabin options
  cabinOptions: [
    {
      id: 'cabin',
      name: 'Cabin',
      description: 'Perfect for lake lots, hunting cabins, or tiny homes.',
      features: ['7/12 pitch roof', '6\' treated wood porch', 'LED lighting & electrical'],
      image: cloudinaryImages.cabinShed,
      link: '/types/deluxe-storage-cabins/cabin',
      openInNewTab: false,
    },
  ],

  // Garage options
  garageOptions: [
    {
      id: 'garage',
      name: 'Garage',
      description: 'Built to handle vehicle weight with easy access.',
      features: ['9\'x7\' insulated overhead door', '7\'9" walls', 'Floor joists 12" OC'],
      image: cloudinaryImages.garage,
      link: '/types/garages-carports/garage',
      openInNewTab: false,
    },
    {
      id: 'carport',
      name: 'Carport',
      description: 'Steel protection from sun, rain, and wind.',
      features: ['Heavy-duty steel frame', 'Multiple size options', 'Hurricane rated'],
      image: cloudinaryImages.carport,
      link: '/types/garages-carports/carports',
      openInNewTab: false,
    },
  ],

  // Other styles
  otherStyles: [
    { id: 'barn', name: 'Barn', subtitle: 'Gambrel Roof', image: cloudinaryImages.sideLoftedBarn4, link: '/styles/barn', openInNewTab: false },
    { id: 'modern', name: 'Modern', subtitle: 'Single Slope Roof', image: cloudinaryImages.modernShed, link: '/styles/modern', openInNewTab: false },
    { id: 'greenhouse', name: 'Greenhouse', subtitle: 'Grow Year-Round', image: cloudinaryImages.greenhouse1, link: '/styles/greenhouse', openInNewTab: false },
    { id: 'animal-shelters', name: 'Animal Shelters', subtitle: 'Kennels & Coops', image: cloudinaryImages.animalShelter1, link: '/styles/animal-shelters', openInNewTab: false },
  ],

  // CTA section
  ctaHeading: 'Ready to Get Started?',
  ctaDescription: 'Design your perfect utility building online in minutes',
  ctaButtonText: 'Design Your Building',
  ctaButtonLink: 'https://summitbuildings.shedpro.co/',
  ctaButtonOpenInNewTab: true,
};
