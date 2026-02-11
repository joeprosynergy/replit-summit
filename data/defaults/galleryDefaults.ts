/**
 * Gallery Page Defaults
 * CMS-first architecture defaults
 */

import { cloudinaryImages } from '@/lib/cloudinary';

export interface GalleryImage {
  id: string;
  url: string;
  title: string;
  category: string;
}

export interface GalleryContent {
  // Meta
  metaTitle: string;
  metaDescription: string;

  // Hero section
  heroHeading: string;
  heroDescription: string;

  // Categories
  categories: string[];

  // Gallery images
  images: GalleryImage[];

  // CTA section
  ctaHeading: string;
  ctaDescription: string;
  ctaButton1Text: string;
  ctaButton1Link: string;
  ctaButton1OpenInNewTab: boolean;
  ctaButton2Text: string;
  ctaButton2Link: string;
  ctaButton2OpenInNewTab: boolean;

  // Allow dynamic fields
  [key: string]: unknown;
}

export const galleryDefaults: GalleryContent = {
  // Meta
  metaTitle: 'Gallery | Summit Portable Buildings',
  metaDescription: 'Browse our gallery of custom storage buildings, cabins, garages, lofted barns, and more. See the quality craftsmanship of Summit Portable Buildings.',

  // Hero section
  heroHeading: 'Our Building Gallery',
  heroDescription: 'Explore our collection of custom storage buildings, cabins, garages, and more. Each building is crafted with quality materials and attention to detail.',

  // Categories
  categories: ['All', 'Cabins', 'Lofted Barns', 'Garages', 'Utility Sheds', 'Economy Sheds', 'Specialty'],

  // Gallery images - using Cloudinary
  images: [
    // Cabins
    { id: '1', url: cloudinaryImages.cabin1, title: 'Summit Cabin', category: 'Cabins' },
    { id: '2', url: cloudinaryImages.cabin2, title: 'Cabin Interior', category: 'Cabins' },
    { id: '3', url: cloudinaryImages.cabin3, title: 'Cabin Side View', category: 'Cabins' },
    { id: '4', url: cloudinaryImages.cabin4, title: 'Cabin Details', category: 'Cabins' },
    { id: '5', url: cloudinaryImages.cabinShed, title: 'Cabin Shed', category: 'Cabins' },
    // Lofted Barns
    { id: '6', url: cloudinaryImages.loftedBarn1, title: 'Lofted Barn - Red', category: 'Lofted Barns' },
    { id: '7', url: cloudinaryImages.loftedBarn2, title: 'Lofted Barn - Blue', category: 'Lofted Barns' },
    { id: '8', url: cloudinaryImages.loftedBarn3, title: 'Lofted Barn - Gray', category: 'Lofted Barns' },
    { id: '9', url: cloudinaryImages.loftedBarn4, title: 'Lofted Barn - Classic', category: 'Lofted Barns' },
    { id: '10', url: cloudinaryImages.sideLoftedBarn1, title: 'Side Lofted Barn - Tan', category: 'Lofted Barns' },
    { id: '11', url: cloudinaryImages.sideLoftedBarn2, title: 'Side Lofted Barn - Windows', category: 'Lofted Barns' },
    { id: '12', url: cloudinaryImages.sideLoftedBarn3, title: 'Side Lofted Barn - Red', category: 'Lofted Barns' },
    { id: '13', url: cloudinaryImages.sideLoftedBarn4, title: 'Side Lofted Barn - Brown', category: 'Lofted Barns' },
    { id: '14', url: cloudinaryImages.proLoftedBarn, title: 'Pro Lofted Barn', category: 'Lofted Barns' },
    { id: '15', url: cloudinaryImages.budgetProLoftedBarn, title: 'Budget Pro Lofted Barn', category: 'Lofted Barns' },
    { id: '16', url: cloudinaryImages.budgetProLoftedBarn2, title: 'Budget Pro Lofted Barn 2', category: 'Lofted Barns' },
    { id: '17', url: cloudinaryImages.budgetProLoftedBarn3, title: 'Budget Pro Lofted Barn 3', category: 'Lofted Barns' },
    // Garages
    { id: '18', url: cloudinaryImages.garage1, title: 'Garage - Red', category: 'Garages' },
    { id: '19', url: cloudinaryImages.garage2, title: 'Garage - Metal', category: 'Garages' },
    { id: '20', url: cloudinaryImages.garage3, title: 'Garage - Tan', category: 'Garages' },
    { id: '21', url: cloudinaryImages.garage4, title: 'Garage - White', category: 'Garages' },
    { id: '22', url: cloudinaryImages.carport1, title: 'Carport', category: 'Garages' },
    { id: '23', url: cloudinaryImages.carport2, title: 'Carport - Side View', category: 'Garages' },
    { id: '24', url: cloudinaryImages.carport3, title: 'Carport - Gray', category: 'Garages' },
    { id: '25', url: cloudinaryImages.rvCover1, title: 'RV Cover', category: 'Garages' },
    { id: '26', url: cloudinaryImages.rvCover2, title: 'RV Cover - Enclosed', category: 'Garages' },
    // Utility Sheds
    { id: '27', url: cloudinaryImages.utilityShed1, title: 'Utility Shed - Gray', category: 'Utility Sheds' },
    { id: '28', url: cloudinaryImages.utilityShed2, title: 'Utility Shed - Tan', category: 'Utility Sheds' },
    { id: '29', url: cloudinaryImages.utilityShed3, title: 'Utility Shed - White', category: 'Utility Sheds' },
    { id: '30', url: cloudinaryImages.utilityShed4, title: 'Utility Shed - Brown', category: 'Utility Sheds' },
    { id: '31', url: cloudinaryImages.sideUtility1, title: 'Side Utility - Gray', category: 'Utility Sheds' },
    { id: '32', url: cloudinaryImages.sideUtility2, title: 'Side Utility - White', category: 'Utility Sheds' },
    { id: '33', url: cloudinaryImages.sideUtility3, title: 'Side Utility - Tan', category: 'Utility Sheds' },
    { id: '34', url: cloudinaryImages.sideUtility4, title: 'Side Utility - Dark Brown', category: 'Utility Sheds' },
    { id: '35', url: cloudinaryImages.proUtility, title: 'Pro Utility', category: 'Utility Sheds' },
    { id: '36', url: cloudinaryImages.budgetProUtility, title: 'Budget Pro Utility', category: 'Utility Sheds' },
    { id: '37', url: cloudinaryImages.budgetProUtility2, title: 'Budget Pro Utility 2', category: 'Utility Sheds' },
    { id: '38', url: cloudinaryImages.treatedGardenShed, title: 'Treated Garden Shed', category: 'Utility Sheds' },
    // Economy Sheds
    { id: '39', url: cloudinaryImages.economy, title: 'Economy Shed', category: 'Economy Sheds' },
    { id: '40', url: cloudinaryImages.economyShed1, title: 'Economy Shed 1', category: 'Economy Sheds' },
    { id: '41', url: cloudinaryImages.economyShed2, title: 'Economy Shed 2', category: 'Economy Sheds' },
    { id: '42', url: cloudinaryImages.economyShed3, title: 'Economy Shed 3', category: 'Economy Sheds' },
    { id: '43', url: cloudinaryImages.economyShed4, title: 'Economy Shed 4', category: 'Economy Sheds' },
    // Specialty
    { id: '44', url: cloudinaryImages.greenhouse1, title: 'Greenhouse', category: 'Specialty' },
    { id: '45', url: cloudinaryImages.greenhouse2, title: 'Greenhouse 2', category: 'Specialty' },
    { id: '46', url: cloudinaryImages.animalShelter1, title: 'Animal Shelter', category: 'Specialty' },
    { id: '47', url: cloudinaryImages.animalShelter2, title: 'Animal Shelter 2', category: 'Specialty' },
    { id: '48', url: cloudinaryImages.dogKennel1, title: 'Dog Kennel', category: 'Specialty' },
    { id: '49', url: cloudinaryImages.chickenCoop1, title: 'Chicken Coop', category: 'Specialty' },
    { id: '50', url: cloudinaryImages.chickenCoop2, title: 'Chicken Coop 2', category: 'Specialty' },
    { id: '51', url: cloudinaryImages.modernShed, title: 'Modern Shed', category: 'Specialty' },
    { id: '52', url: cloudinaryImages.dormer, title: 'Dormer', category: 'Specialty' },
  ],

  // CTA section
  ctaHeading: 'Ready to Build Your Dream Storage Building?',
  ctaDescription: 'Contact us today or use our 3D designer to customize your perfect building.',
  ctaButton1Text: 'Design Your Building',
  ctaButton1Link: 'https://summitbuildings.shedpro.co/',
  ctaButton1OpenInNewTab: true,
  ctaButton2Text: 'Contact Us',
  ctaButton2Link: '/contact-us',
  ctaButton2OpenInNewTab: false,
};
