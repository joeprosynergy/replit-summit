/**
 * StylesBarn Page Defaults
 * CMS-first architecture defaults
 */

import { cloudinaryImages } from '@/lib/cloudinary';
import barnCabin1 from '@/assets/barn-cabin-1.jpg';

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

export interface StylesBarnContent {
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
  otherStylesHeader: string;
  otherStylesDescription: string;

  // Storage options
  storageOptions: OptionItem[];

  // Cabin options
  cabinOptions: OptionItem[];

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

export const stylesBarnDefaults: StylesBarnContent = {
  // Meta
  metaTitle: 'Barn Style Buildings | Summit Portable Buildings',
  metaDescription: 'Explore our Barn style buildings with gambrel roofs. Choose from Economy, Budget Pro, Pro, Cabin, or Garage options.',

  // Hero section
  heroTagline: '← Back to Styles',
  heroHeading: 'Barn Style',
  heroSubheading: 'Gambrel Roof — Maximum overhead storage with iconic barn appeal',

  // Section headers
  storageHeader: 'Storage',
  cabinsHeader: 'Cabins & Tiny Homes',
  otherStylesHeader: 'Looking for Something Different?',
  otherStylesDescription: 'Explore our other building styles to find the perfect fit for your needs.',

  // Storage options
  storageOptions: [
    {
      id: 'economy',
      name: 'Economy',
      description: 'Our most economical storage building. Lowest cost per square foot.',
      features: ['Metal siding only', '5\' walls', '2 lofts & ladder included'],
      image: cloudinaryImages.economyShed3,
      link: '/types/basic-storage/economy-shed',
      openInNewTab: false,
    },
    {
      id: 'budget-pro-lofted-barn',
      name: 'Budget Pro',
      description: 'Classic barn styling at an affordable price.',
      features: ['6\'6" walls', '1 loft for storage', 'Double 36" doors w/ lock'],
      image: cloudinaryImages.budgetProLoftedBarn,
      link: '/types/basic-storage/budget-pro-lofted-barn',
      openInNewTab: false,
    },
    {
      id: 'pro-lofted-barn',
      name: 'Pro',
      description: 'Our best seller — most versatile for all purposes.',
      features: ['6\'6" walls', '2 lofts & ladder', '3/4" Advantech flooring'],
      image: cloudinaryImages.proLoftedBarn,
      link: '/types/deluxe-storage-cabins/pro-lofted-barn',
      openInNewTab: false,
    },
  ],

  // Cabin options
  cabinOptions: [
    {
      id: 'barn-cabin',
      name: 'Lofted Cabin',
      description: 'Classic barn styling with dual lofts and covered porch.',
      features: ['Gambrel roof', '4\' deep porch with railing', 'Two lofts included'],
      image: barnCabin1,
      link: '/types/deluxe-storage-cabins/barn-cabin',
      openInNewTab: false,
    },
  ],

  // Other styles
  otherStyles: [
    { id: 'utility', name: 'Utility', subtitle: 'Traditional A-Frame Roof', image: cloudinaryImages.utilityShed3, link: '/styles/utility', openInNewTab: false },
    { id: 'modern', name: 'Modern', subtitle: 'Single Slope Roof', image: cloudinaryImages.modernShed, link: '/styles/modern', openInNewTab: false },
    { id: 'greenhouse', name: 'Greenhouse', subtitle: 'Grow Year-Round', image: cloudinaryImages.greenhouse1, link: '/styles/greenhouse', openInNewTab: false },
    { id: 'animal-shelters', name: 'Animal Shelters', subtitle: 'Kennels & Coops', image: cloudinaryImages.animalShelter1, link: '/styles/animal-shelters', openInNewTab: false },
  ],

  // CTA section
  ctaHeading: 'Ready to Get Started?',
  ctaDescription: 'Design your perfect barn style building online in minutes',
  ctaButtonText: 'Design Your Building',
  ctaButtonLink: 'https://summitbuildings.shedpro.co/',
  ctaButtonOpenInNewTab: true,
};
