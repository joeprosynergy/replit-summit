/**
 * DeluxeStorageCabins Page Defaults
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

export interface DeluxeStorageCabinsContent {
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

export const deluxeStorageCabinsDefaults: DeluxeStorageCabinsContent = {
  // Meta
  metaTitle: 'Deluxe Storage & Cabins | Summit Portable Buildings',
  metaDescription: 'Explore our premium deluxe storage buildings and cabins including Pro Utility, Pro Lofted Barn, Cabins, and Dormers. Superior quality with extra features.',

  // Quick Nav
  quickNavTitle: 'Deluxe Storage & Cabins',
  quickNavItems: [
    { id: 'pro-utility', name: 'Pro - Utility', image: cloudinaryImages.proUtility },
    { id: 'pro-lofted-barn', name: 'Pro - Lofted Barn', image: cloudinaryImages.proLoftedBarn },
    { id: 'cabins-tiny-home', name: 'Cabins / Tiny Home', image: cloudinaryImages.cabinShed },
  ],

  // Models
  models: [
    {
      id: 'pro-utility',
      name: 'Pro - Utility',
      tagline: 'Superior workmanship for any storage need.',
      features: [
        'Double 36" Doors w/ T-Handle Lock',
        '7\' 9" Wall Height',
        'Ridge Vent Standard',
        '3/4" T & G Flooring',
      ],
      image: cloudinaryImages.proUtility,
      gallery: [cloudinaryImages.proUtility, cloudinaryImages.utilityShed1, cloudinaryImages.utilityShed2, cloudinaryImages.utilityShed3, cloudinaryImages.utilityShed4],
      detailLink: '/types/deluxe-storage-cabins/pro-utility-shed',
      detailLinkOpenInNewTab: false,
      designLink: 'https://summitbuildings.shedpro.co/',
      designLinkOpenInNewTab: true,
    },
    {
      id: 'pro-lofted-barn',
      name: 'Pro - Lofted Barn',
      tagline: 'Our best seller with maximum storage.',
      features: [
        '2 Lofts for Extra Storage',
        'Loft Ladder Included',
        '6\' 6" Wall Height',
        'Classic Barn Styling',
      ],
      image: cloudinaryImages.proLoftedBarn,
      gallery: [cloudinaryImages.proLoftedBarn, cloudinaryImages.loftedBarn1, cloudinaryImages.loftedBarn2, cloudinaryImages.loftedBarn3, cloudinaryImages.loftedBarn4],
      detailLink: '/types/deluxe-storage-cabins/pro-lofted-barn',
      detailLinkOpenInNewTab: false,
      designLink: 'https://summitbuildings.shedpro.co/',
      designLinkOpenInNewTab: true,
    },
    {
      id: 'cabins-tiny-home',
      name: 'Cabins / Tiny Home',
      tagline: 'Comfortable living in a compact space.',
      features: [
        'Finished Interior Options',
        'Electrical Package Available',
        'Custom Layouts',
        'Perfect for Guest Houses',
      ],
      image: cloudinaryImages.cabinShed,
      gallery: [cloudinaryImages.cabinShed, cloudinaryImages.cabin1, cloudinaryImages.cabin2, cloudinaryImages.cabin3, cloudinaryImages.cabin4],
      detailLink: '/types/deluxe-storage-cabins/cabin',
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
