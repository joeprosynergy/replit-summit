/**
 * Animal Shelters Page Defaults
 * CMS-first architecture defaults for the Animal Shelters product page.
 * SPECIAL LAYOUT - Has 3 sub-products (Animal Shelter, Dog Kennel, Chicken Coop)
 */

import animalShelter1 from '@/assets/animal-shelter-1.jpg';
import animalShelter2 from '@/assets/animal-shelter-2.jpg';
import dogKennel1 from '@/assets/dog-kennel-1.jpg';
import dogKennel2 from '@/assets/dog-kennel-2.jpg';
import chickenCoop1 from '@/assets/chicken-coop-1.jpg';
import chickenCoop2 from '@/assets/chicken-coop-2.jpg';
import {
  SidingCategory,
  DEFAULT_PAINT_SIDING,
  DEFAULT_METAL_SIDING,
} from './productPageTypes';

// Animal Shelters siding (paint + metal only)
const ANIMAL_SHELTERS_SIDING: SidingCategory[] = [
  { id: 'paint', title: 'Paint Siding Options', colors: DEFAULT_PAINT_SIDING },
  { id: 'metal', title: 'Metal Siding / Roof Options', colors: DEFAULT_METAL_SIDING },
];

// Shelter sub-product type
export interface ShelterProduct {
  id: string;
  name: string;
  tagline: string;
  description: string;
  image1: string;
  image1Alt: string;
  image2: string;
  image2Alt: string;
  features: string[];
  note?: string;
  buttonText: string;
  buttonLink: string;
  buttonOpenInNewTab: boolean;
}

// Animal Shelters content interface
export interface AnimalSheltersContent {
  // === META & SEO ===
  metaTitle: string;
  metaDescription: string;
  canonicalUrl: string;

  // === HERO SECTION ===
  title: string;
  titleHighlight: string;
  description: string;
  subtitle: string;
  heroImage: string;
  heroImageAlt: string;
  heroButton1Text: string;
  heroButton1Link: string;
  heroButton1OpenInNewTab: boolean;
  heroButton2Text: string;
  heroButton2Link: string;
  heroButton2OpenInNewTab: boolean;

  // === SHELTER PRODUCTS (3) ===
  shelters: ShelterProduct[];

  // === COLOR/SIDING OPTIONS SECTION ===
  colorHeading: string;
  sidingCategories: SidingCategory[];

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
  };

  // Allow dynamic fields
  [key: string]: unknown;
}

export const animalSheltersDefaults: AnimalSheltersContent = {
  // === META & SEO ===
  metaTitle: 'Animal Shelters, Dog Kennels & Chicken Coops | Summit Portable Buildings',
  metaDescription: 'Quality animal housing solutions from Summit Buildings. Dog kennels, chicken coops, and animal shelters built with durable materials for comfort, safety, and security.',
  canonicalUrl: 'https://summitbuildings.com/types/animal-shelters',

  // === HERO SECTION ===
  title: 'ANIMAL',
  titleHighlight: 'SHELTERS',
  description: 'Quality housing solutions for your animals. From dog kennels to chicken coops to full animal shelters, we build durable, comfortable, and secure structures.',
  subtitle: 'Custom Sizes Available',
  heroImage: dogKennel1,
  heroImageAlt: 'Summit Dog Kennel',
  heroButton1Text: 'Design Your Shelter',
  heroButton1Link: 'https://summitbuildings.shedpro.co/',
  heroButton1OpenInNewTab: true,
  heroButton2Text: 'Browse Inventory',
  heroButton2Link: '/inventory',
  heroButton2OpenInNewTab: false,

  // === SHELTER PRODUCTS (3) ===
  shelters: [
    {
      id: 'animal-shelter',
      name: 'Animal Shelter',
      tagline: 'Safe & Comfortable Housing for Animals',
      description: 'The Animal Shelter from Summit Buildings is a well-designed, purpose-built facility dedicated to the care and housing of animals. This shelter focuses on providing a safe, comfortable environment for your animals with spacious areas and easy access. The structure incorporates durable, weather-resistant materials to minimize maintenance and maximize protection.',
      image1: animalShelter1,
      image1Alt: 'Animal Shelter exterior view',
      image2: animalShelter2,
      image2Alt: 'Animal Shelter interior view',
      features: [
        '11 Lite Walk-In Door',
        'Durable, weather-resistant construction',
        'Spacious interior design',
        'Easy-to-clean surfaces',
        'Secure fencing options',
        'Customizable layout',
      ],
      note: '*Please note that windows and moisture barriers are not available.',
      buttonText: 'Design Your Animal Shelter',
      buttonLink: 'https://summitbuildings.shedpro.co/',
      buttonOpenInNewTab: true,
    },
    {
      id: 'dog-kennel',
      name: 'Dog Kennel',
      tagline: 'Comfort, Safety & Security for Your Pets',
      description: 'The Dog Kennels from Summit Buildings are expertly crafted structures designed to provide comfort, safety, and security for pets. These kennels are built with high-quality, durable materials to withstand the elements, ensuring that dogs are protected from the weather while enjoying a spacious, well-ventilated environment.',
      image1: dogKennel1,
      image1Alt: 'Dog Kennel exterior view',
      image2: dogKennel2,
      image2Alt: 'Dog Kennel with runs',
      features: [
        "6' x 6' Walls",
        '2 Runs',
        '36" Wood Door',
        '(1) 2 x 3 Single Pane Window',
        'Composite Decking on Exterior Runs',
        'Gate Inside and Outside of Run',
        'Secure, predator-proof fencing',
        'Easy-to-clean surfaces',
      ],
      buttonText: 'Design Your Dog Kennel',
      buttonLink: 'https://summitbuildings.shedpro.co/',
      buttonOpenInNewTab: true,
    },
    {
      id: 'chicken-coop',
      name: 'Chicken Coop',
      tagline: 'Safe & Secure Housing for Your Flock',
      description: 'The Chicken Coops from Summit Buildings are thoughtfully designed to provide chickens with a safe, comfortable, and secure environment. Built with high-quality, weather-resistant materials, these coops offer excellent protection from the elements, predators, and harsh conditions.',
      image1: chickenCoop1,
      image1Alt: 'Chicken Coop exterior view',
      image2: chickenCoop2,
      image2Alt: 'Chicken Coop with nesting boxes',
      features: [
        '3\' 8" (44") Walls',
        '30" Wood Door w/ Keys',
        '2 - 18" x 27" Single Pane Windows',
        '1 - 12" x 16" Chicken Door',
        '4 Nesting boxes w/ outside access door',
        '1 box serves approximately 3-5 chickens',
      ],
      note: 'Additional nesting boxes may be added for additional cost.',
      buttonText: 'Design Your Chicken Coop',
      buttonLink: 'https://summitbuildings.shedpro.co/',
      buttonOpenInNewTab: true,
    },
  ],

  // === COLOR/SIDING OPTIONS SECTION ===
  colorHeading: 'COLOR AND MATERIAL OPTIONS',
  sidingCategories: ANIMAL_SHELTERS_SIDING,

  // === CTA SECTION ===
  ctaHeading: 'Ready to House Your Animals?',
  ctaDescription: 'Design your perfect animal shelter today or call us to discuss your needs.',
  ctaPrimaryButton: 'Design Your Shelter',
  ctaPrimaryButtonLink: 'https://summitbuildings.shedpro.co/',
  ctaPrimaryButtonOpenInNewTab: true,
  ctaSecondaryButton: 'Call (573) 747-4700',
  ctaSecondaryButtonLink: 'tel:5737474700',
  ctaSecondaryButtonOpenInNewTab: false,

  // === BACK PATH CONFIGURATION ===
  backPath: {
    defaultPath: '/types',
    defaultLabel: '← Back to All Models',
  },
};
