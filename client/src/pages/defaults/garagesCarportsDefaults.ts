/**
 * GaragesCarports Page Defaults
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
  inventoryButtonText: string;
  inventoryLink: string;
  inventoryLinkOpenInNewTab: boolean;
}

export interface QuickNavItem {
  id: string;
  name: string;
  image: string;
}

export interface GaragesCarportsContent {
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

export const garagesCarportsDefaults: GaragesCarportsContent = {
  // Meta
  metaTitle: 'Garages & Carports | Summit Portable Buildings',
  metaDescription: 'Explore our garages, carports, and RV covers. Heavy-duty steel construction provides superior protection for your vehicles and equipment.',

  // Quick Nav
  quickNavTitle: 'Garages & Carports',
  quickNavItems: [
    { id: 'garage', name: 'Garage', image: cloudinaryImages.garage1 },
    { id: 'carports', name: 'Carports', image: cloudinaryImages.carport1 },
    { id: 'rv-covers', name: 'RV Covers', image: cloudinaryImages.rvCover1 },
  ],

  // Models
  models: [
    {
      id: 'garage',
      name: 'Garage',
      tagline: 'Secure vehicle storage with full enclosure.',
      features: [
        'Roll-up garage door included',
        'Fully enclosed for security',
        'Multiple size options available',
        'Perfect for vehicles & equipment',
      ],
      image: cloudinaryImages.garage1,
      gallery: [cloudinaryImages.garage1, cloudinaryImages.garage2, cloudinaryImages.garage3, cloudinaryImages.garage4],
      detailLink: '/types/garages-carports/garage',
      detailLinkOpenInNewTab: false,
      inventoryButtonText: 'Browse Our Inventory',
      inventoryLink: '',
      inventoryLinkOpenInNewTab: false,
    },
    {
      id: 'carports',
      name: 'Carports',
      tagline: 'Heavy-duty steel protection for your vehicles.',
      features: [
        'Hurricane & tornado rated',
        'Protection from sun, rain & wind',
        'Commercial or residential use',
        'Multiple roof styles available',
      ],
      image: cloudinaryImages.carport1,
      gallery: [cloudinaryImages.carport1, cloudinaryImages.carport2, cloudinaryImages.carport3],
      detailLink: '/types/garages-carports/carports',
      detailLinkOpenInNewTab: false,
      inventoryButtonText: 'Browse Our Inventory',
      inventoryLink: '',
      inventoryLinkOpenInNewTab: false,
    },
    {
      id: 'rv-covers',
      name: 'RV Covers',
      tagline: 'Protect your recreational vehicle investment.',
      features: [
        'Extra tall clearance for RVs',
        'Keep your vehicle in tip-top shape',
        'Optional full or partial enclosure',
        'Various widths and lengths available',
      ],
      image: cloudinaryImages.rvCover1,
      gallery: [cloudinaryImages.rvCover1, cloudinaryImages.rvCover2, cloudinaryImages.rvCover3],
      detailLink: '/types/garages-carports/carports',
      detailLinkOpenInNewTab: false,
      inventoryButtonText: 'Browse Our Inventory',
      inventoryLink: '',
      inventoryLinkOpenInNewTab: false,
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
