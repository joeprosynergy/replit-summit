/**
 * OurModels (Types) Page Defaults
 * CMS-first architecture defaults
 */

import { cloudinaryImages } from '@/lib/cloudinary';

export interface ModelItem {
  name: string;
  image: string;
  link: string;
  openInNewTab: boolean;
}

export interface CategoryItem {
  id: string;
  name: string;
  description: string;
  models: ModelItem[];
}

export interface OurModelsContent {
  // Meta
  metaTitle: string;
  metaDescription: string;

  // Hero section
  heroTagline: string;
  heroHeading: string;
  heroSubheading: string;

  // Categories
  categories: CategoryItem[];

  // CTA section
  ctaHeading: string;
  ctaDescription: string;
  ctaButtonText: string;
  ctaButtonLink: string;
  ctaButtonOpenInNewTab: boolean;

  // Allow dynamic fields
  [key: string]: unknown;
}

export const ourModelsDefaults: OurModelsContent = {
  // Meta
  metaTitle: 'Our Models | Summit Portable Buildings',
  metaDescription: 'Browse our complete selection of storage buildings. From basic storage sheds to deluxe cabins and garages, find the perfect structure for your needs.',

  // Hero section
  heroTagline: 'Hand-Built to Last',
  heroHeading: 'Structure Types',
  heroSubheading: 'Choose one of our popular models or customize your own',

  // Categories
  categories: [
    {
      id: 'basic-storage',
      name: 'Basic Storage',
      description: 'Affordable, practical sheds for everyday storage needs',
      models: [
        { name: 'Budget Pro - Utility', image: cloudinaryImages.budgetProUtility, link: '/types/basic-storage#budget-pro-utility', openInNewTab: false },
        { name: 'Budget Pro - Lofted Barn', image: cloudinaryImages.budgetProLoftedBarn, link: '/types/basic-storage#budget-pro-lofted-barn', openInNewTab: false },
        { name: 'Economy', image: cloudinaryImages.economy, link: '/types/basic-storage#economy', openInNewTab: false },
      ],
    },
    {
      id: 'deluxe-storage-cabins',
      name: 'Deluxe Storage & Cabins',
      description: 'Premium buildings with extra features and style',
      models: [
        { name: 'Pro - Utility', image: cloudinaryImages.proUtility, link: '/types/deluxe-storage-cabins#pro-utility', openInNewTab: false },
        { name: 'Pro - Lofted Barn', image: cloudinaryImages.proLoftedBarn, link: '/types/deluxe-storage-cabins#pro-lofted-barn', openInNewTab: false },
        { name: 'Cabins/Tiny Home', image: cloudinaryImages.cabinShed, link: '/types/deluxe-storage-cabins#cabins-tiny-home', openInNewTab: false },
      ],
    },
    {
      id: 'garages-carports',
      name: 'Garages & Carports',
      description: 'Secure vehicle and equipment storage',
      models: [
        { name: 'Garages', image: cloudinaryImages.garage, link: '/types/garages-carports#garages', openInNewTab: false },
        { name: 'Carports', image: cloudinaryImages.carport, link: '/types/garages-carports#carports', openInNewTab: false },
      ],
    },
    {
      id: 'outdoor-structures',
      name: 'Outdoor Structures',
      description: 'Greenhouses and animal housing solutions',
      models: [
        { name: 'Greenhouses', image: cloudinaryImages.greenhouse1, link: '/types/greenhouse', openInNewTab: false },
        { name: 'Animal Shelters', image: cloudinaryImages.animalShelter1, link: '/types/animal-shelters', openInNewTab: false },
      ],
    },
  ],

  // CTA section
  ctaHeading: 'Ready to Get Started?',
  ctaDescription: 'Design your perfect building online in minutes',
  ctaButtonText: 'Design Your Building',
  ctaButtonLink: 'https://summitbuildings.shedpro.co/',
  ctaButtonOpenInNewTab: true,
};
