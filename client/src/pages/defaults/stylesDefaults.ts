/**
 * Styles Page Defaults
 * CMS-first architecture defaults
 */

import { cloudinaryImages } from '@/lib/cloudinary';

export interface StyleItem {
  id: string;
  name: string;
  subtitle: string;
  image: string;
  link: string;
  openInNewTab: boolean;
}

export interface StylesContent {
  // Meta
  metaTitle: string;
  metaDescription: string;

  // Hero section
  heroTagline: string;
  heroHeading: string;
  heroSubheading: string;

  // Section headers
  roofStylesHeader: string;
  specialtyHeader: string;

  // Roof styles
  roofStyles: StyleItem[];

  // Specialty styles
  specialtyStyles: StyleItem[];

  // CTA section
  ctaHeading: string;
  ctaDescription: string;
  ctaButtonText: string;
  ctaButtonLink: string;
  ctaButtonOpenInNewTab: boolean;

  // Allow dynamic fields
  [key: string]: unknown;
}

export const stylesDefaults: StylesContent = {
  // Meta
  metaTitle: 'Building Styles | Summit Portable Buildings',
  metaDescription: 'Choose your preferred building style - Utility with traditional A-frame roof, Barn with gambrel roof, Modern with single slope roof, plus Greenhouses and Animal Shelters.',

  // Hero section
  heroTagline: 'Find Your Perfect Style',
  heroHeading: 'Building Styles',
  heroSubheading: 'Select a roof style to explore available options',

  // Section headers
  roofStylesHeader: 'Choose Your Style',
  specialtyHeader: 'Specialty Structures',

  // Roof styles
  roofStyles: [
    {
      id: 'utility',
      name: 'Utility',
      subtitle: 'Traditional A-Frame Roof',
      image: cloudinaryImages.utilityShed3,
      link: '/styles/utility',
      openInNewTab: false,
    },
    {
      id: 'barn',
      name: 'Barn',
      subtitle: 'Gambrel Roof',
      image: cloudinaryImages.sideLoftedBarn4,
      link: '/styles/barn',
      openInNewTab: false,
    },
    {
      id: 'modern',
      name: 'Modern',
      subtitle: 'Single Slope Roof',
      image: cloudinaryImages.modernShed,
      link: '/styles/modern',
      openInNewTab: false,
    },
  ],

  // Specialty styles
  specialtyStyles: [
    {
      id: 'greenhouse',
      name: 'Greenhouse',
      subtitle: 'Grow Year-Round',
      image: cloudinaryImages.greenhouse1,
      link: '/styles/greenhouse',
      openInNewTab: false,
    },
    {
      id: 'animal-shelters',
      name: 'Animal Shelters',
      subtitle: 'Kennels & Coops',
      image: cloudinaryImages.animalShelter1,
      link: '/styles/animal-shelters',
      openInNewTab: false,
    },
  ],

  // CTA section
  ctaHeading: 'Ready to Get Started?',
  ctaDescription: 'Design your perfect building online in minutes',
  ctaButtonText: 'Design Your Building',
  ctaButtonLink: 'https://summitbuildings.shedpro.co/',
  ctaButtonOpenInNewTab: true,
};
