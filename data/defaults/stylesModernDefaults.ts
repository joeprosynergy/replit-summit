/**
 * StylesModern Page Defaults
 * CMS-first architecture defaults
 */

const modernShed1 = '/assets/modern-shed-1.jpg';
const garageImage = '/assets/garage-1.jpg';

export interface OptionItem {
  id: string;
  name: string;
  description: string;
  features: string[];
  image: string;
  link: string;
  openInNewTab: boolean;
}

export interface StylesModernContent {
  // Meta
  metaTitle: string;
  metaDescription: string;

  // Hero section
  heroTagline: string;
  heroHeading: string;
  heroSubheading: string;

  // Section header
  sectionTitle: string;

  // Options
  options: OptionItem[];

  // CTA section
  ctaHeading: string;
  ctaDescription: string;
  ctaButtonText: string;
  ctaButtonLink: string;
  ctaButtonOpenInNewTab: boolean;

  // Allow dynamic fields
  [key: string]: unknown;
}

export const stylesModernDefaults: StylesModernContent = {
  // Meta
  metaTitle: 'Modern Style Buildings | Summit Portable Buildings',
  metaDescription: 'Explore our Modern style buildings with single slope roofs. Choose from Pro or Garage options for a contemporary look.',

  // Hero section
  heroTagline: '← Back to Styles',
  heroHeading: 'Modern Style',
  heroSubheading: 'Single Slope Roof — Contemporary design with clean, sleek lines',

  // Section header
  sectionTitle: 'Choose Your Option',

  // Options
  options: [
    {
      id: 'pro',
      name: 'Pro',
      description: 'Premium quality with single slope roof and contemporary design.',
      features: ['LP SmartSide siding', '2x6 floor joists 12" OC', '6" Overhangs', 'Single slope roof'],
      image: modernShed1,
      link: '/types/deluxe-storage-cabins/modern-shed',
      openInNewTab: false,
    },
    {
      id: 'garage',
      name: 'Garage',
      description: 'Secure vehicle and equipment storage with easy access.',
      features: ['LP SmartSide siding', '2x6 floor joists 12" OC', 'Garage door included'],
      image: garageImage,
      link: '/types/garages-carports/garage',
      openInNewTab: false,
    },
  ],

  // CTA section
  ctaHeading: 'Ready to Get Started?',
  ctaDescription: 'Design your perfect modern building online in minutes',
  ctaButtonText: 'Design Your Building',
  ctaButtonLink: 'https://summitbuildings.shedpro.co/',
  ctaButtonOpenInNewTab: true,
};
