/**
 * BasicStorage Page Defaults
 * CMS-first architecture defaults
 */

import { cloudinaryImages } from '@/lib/cloudinary';

export interface ModelItem {
  id: string;
  name: string;
  tagline: string;
  features: string[];
  image: string;
  gallery: string[];
  detailLink: string;
  detailLinkOpenInNewTab: boolean;
  designLink: string;
  designLinkOpenInNewTab: boolean;
}

export interface QuickNavItem {
  id: string;
  name: string;
  image: string;
}

export interface BasicStorageContent {
  // Meta
  metaTitle: string;
  metaDescription: string;

  // Quick Nav
  quickNavTitle: string;
  quickNavItems: QuickNavItem[];

  // Models
  models: ModelItem[];

  // CTA section
  ctaHeading: string;
  ctaDescription: string;
  ctaPhoneText: string;
  ctaPhoneNumber: string;
  ctaSecondaryButtonText: string;
  ctaSecondaryButtonLink: string;
  ctaSecondaryButtonOpenInNewTab: boolean;

  // Allow dynamic fields
  [key: string]: unknown;
}

export const basicStorageDefaults: BasicStorageContent = {
  // Meta
  metaTitle: 'Basic Storage Sheds | Summit Portable Buildings',
  metaDescription: 'Explore our basic storage sheds including Utility Sheds, Side Utility, and Lofted Barns. Affordable, practical storage solutions built to last.',

  // Quick Nav
  quickNavTitle: 'Basic Storage',
  quickNavItems: [
    { id: 'budget-pro-utility', name: 'Budget Pro - Utility', image: cloudinaryImages.budgetProUtility },
    { id: 'budget-pro-lofted-barn', name: 'Budget Pro - Lofted Barn', image: cloudinaryImages.budgetProLoftedBarn },
    { id: 'economy', name: 'Economy', image: cloudinaryImages.economy },
  ],

  // Models
  models: [
    {
      id: 'budget-pro-utility',
      name: 'Budget Pro - Utility',
      tagline: 'Simple, versatile storage for any property.',
      features: [
        'Double doors for easy access',
        'A-frame roof design',
        '7\' 9" Wall Height',
      ],
      image: cloudinaryImages.budgetProUtility,
      gallery: [cloudinaryImages.budgetProUtility, cloudinaryImages.budgetProUtility2, cloudinaryImages.budgetProUtility3],
      detailLink: '/types/basic-storage/budget-pro-utility',
      detailLinkOpenInNewTab: false,
      designLink: 'https://summitbuildings.shedpro.co/',
      designLinkOpenInNewTab: true,
    },
    {
      id: 'budget-pro-lofted-barn',
      name: 'Budget Pro - Lofted Barn',
      tagline: 'Extra storage up top with classic barn styling.',
      features: [
        'Overhead loft for extra storage',
        'Gambrel roof design',
        '6\' 6" Wall Height',
      ],
      image: cloudinaryImages.budgetProLoftedBarn,
      gallery: [cloudinaryImages.budgetProLoftedBarn, cloudinaryImages.budgetProLoftedBarn2, cloudinaryImages.budgetProLoftedBarn3],
      detailLink: '/types/basic-storage/budget-pro-lofted-barn',
      detailLinkOpenInNewTab: false,
      designLink: 'https://summitbuildings.shedpro.co/',
      designLinkOpenInNewTab: true,
    },
    {
      id: 'economy',
      name: 'Economy',
      tagline: 'Affordable storage without compromise.',
      features: [
        'Budget-friendly option',
        'Practical design',
        'Quality construction',
      ],
      image: cloudinaryImages.economy,
      gallery: [cloudinaryImages.economy, cloudinaryImages.economyShed6, cloudinaryImages.economyShed7, cloudinaryImages.economyShed8, cloudinaryImages.economyShed9],
      detailLink: '/types/basic-storage/economy-shed',
      detailLinkOpenInNewTab: false,
      designLink: 'https://summitbuildings.shedpro.co/',
      designLinkOpenInNewTab: true,
    },
  ],

  // CTA section
  ctaHeading: "Can't Decide? We Can Help.",
  ctaDescription: "Call us and we'll help you choose the perfect building for your needs.",
  ctaPhoneText: 'Call 573-747-4700',
  ctaPhoneNumber: 'tel:5737474700',
  ctaSecondaryButtonText: 'View All Models',
  ctaSecondaryButtonLink: '/types',
  ctaSecondaryButtonOpenInNewTab: false,
};
