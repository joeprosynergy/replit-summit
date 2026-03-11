/**
 * Location Page Defaults
 * Reusable type and defaults for location-specific landing pages.
 * Each location gets its own defaults object with city-specific content.
 */

import { cloudinaryImages, IMAGES } from '@/lib/cloudinary';

export interface LocationContent {
  // === META & SEO ===
  metaTitle: string;
  metaDescription: string;

  // === HERO SECTION ===
  heroTagline: string;
  heroHeading: string;
  heroSubheading: string;
  heroCtaDescription: string;
  heroButton1Text: string;
  heroButton1Link: string;
  heroButton1OpenInNewTab: boolean;
  heroButton2Text: string;
  heroButton2Link: string;
  heroButton2OpenInNewTab: boolean;
  heroServiceText: string;
  heroBadges: Array<{ icon: string; label: string }>;

  // === SERVICE AREA SECTION ===
  serviceAreaTagline: string;
  serviceAreaHeading: string;
  serviceAreaSubheading: string;
  serviceAreaDescription: string;
  serviceAreaCities: string[];
  serviceAreaRadius: string;
  serviceAreaNote: string;

  // === GUIDE SECTION ===
  guideTagline: string;
  guideHeading: string;
  guideParagraph1: string;
  guideParagraph2: string;
  guideParagraph3: string;
  guideStats: Array<{ value: string; label: string }>;
  guideCredentials: Array<{ icon: string; label: string; sublabel: string }>;

  // === HOW IT WORKS SECTION ===
  howItWorksTagline: string;
  howItWorksHeading: string;
  howItWorksSubheading: string;
  howItWorksSteps: Array<{ title: string; description: string }>;
  howItWorksButtonText: string;
  howItWorksButtonLink: string;
  howItWorksButtonOpenInNewTab: boolean;

  // === PRODUCTS SECTION ===
  productsTagline: string;
  productsHeading: string;
  productsSubheading: string;
  productsSectionTitle: string;
  productsStyles: Array<{
    id: string;
    name: string;
    subtitle: string;
    image: string;
    link: string;
    openInNewTab: boolean;
  }>;

  // === CTA BANNER SECTION ===
  ctaBannerBadge: string;
  ctaBannerHeading: string;
  ctaBannerDescription1: string;
  ctaBannerDescription2: string;
  ctaBannerButton: string;
  ctaBannerButtonLink: string;
  ctaBannerButtonOpenInNewTab: boolean;
  ctaBannerPhoneNumber: string;

  // === CONTACT SECTION ===
  contactTagline: string;
  contactHeading: string;
  contactSubheading: string;
  contactCallTitle: string;
  contactPhoneNumber: string;
  contactLocationTitle: string;
  contactAddress1: string;
  contactAddress2: string;
  contactHoursTitle: string;
  contactHours1: string;
  contactHours2: string;

  // Allow dynamic fields
  [key: string]: unknown;
}

export const farmingtonDefaults: LocationContent = {
  // === META & SEO ===
  metaTitle: 'Storage Sheds & Portable Buildings in Farmington, MO | Summit',
  metaDescription: 'Looking for storage sheds, garages, and portable buildings in Farmington, Missouri? Summit Portable Buildings offers free delivery within 50 miles. Get a free quote today!',

  // === HERO SECTION ===
  heroTagline: 'Farmington, Missouri',
  heroHeading: 'Quality Storage Buildings in Farmington',
  heroSubheading: 'Hand-crafted storage sheds, barns, garages, and cabins — built to last and delivered free to your property.',
  heroCtaDescription: 'Design your perfect building online in minutes. We handle the rest — from build to delivery and setup.',
  heroButton1Text: 'Design Your Shed Now',
  heroButton1Link: '/3d-configurator',
  heroButton1OpenInNewTab: false,
  heroButton2Text: 'Get Free Buying Guide',
  heroButton2Link: '/buyers-guide',
  heroButton2OpenInNewTab: false,
  heroServiceText: 'Located in Farmington — serving St. Francois County and surrounding areas since 2016',
  heroBadges: [
    { icon: 'truck', label: 'Free Delivery (50mi)' },
    { icon: 'credit-card', label: 'No Credit Check Financing' },
    { icon: 'shield', label: '5-Year Warranty' },
  ],

  // === SERVICE AREA SECTION ===
  serviceAreaTagline: 'We\'re Local',
  serviceAreaHeading: 'Proudly Serving Farmington & Surrounding Areas',
  serviceAreaSubheading: 'Our home base is right here in Farmington. We know this community and we\'re proud to serve it.',
  serviceAreaDescription: 'Summit Portable Buildings is headquartered in Farmington, Missouri. That means fast delivery, easy site visits, and real people you can talk to — not a faraway call center.',
  serviceAreaCities: [
    'Farmington',
    'Park Hills',
    'Bonne Terre',
    'Desloge',
    'Leadwood',
    'Flat River',
    'Bismarck',
    'Fredericktown',
    'Ironton',
    'Potosi',
    'Ste. Genevieve',
    'Perryville',
  ],
  serviceAreaRadius: '50 miles',
  serviceAreaNote: 'Don\'t see your town? Give us a call — we likely deliver to your area.',

  // === GUIDE SECTION ===
  guideTagline: 'Your Neighbors',
  guideHeading: 'A Farmington Company You Can Trust',
  guideParagraph1: 'We\'re not a big-box retailer or an out-of-state franchise.',
  guideParagraph2: 'Summit Portable Buildings is a family-owned company right here in Farmington. We\'ve been building storage solutions the right way since 2016, helping over 1,000 families across four states get the space they need.',
  guideParagraph3: 'Every building is hand-crafted by skilled craftsmen using premium LP SmartSide materials — built to last for generations, not just a few years.',
  guideStats: [
    { value: '8+', label: 'Years in Farmington' },
    { value: '1000+', label: 'Buildings Delivered' },
    { value: '4', label: 'States Served' },
    { value: '5', label: 'Year Warranty' },
  ],
  guideCredentials: [
    { icon: 'home', label: 'Farmington Based', sublabel: 'Since 2016' },
    { icon: 'hammer', label: 'Hand-Crafted', sublabel: 'USA Built' },
    { icon: 'shield', label: '5-Year Warranty', sublabel: 'LP SmartSide' },
    { icon: 'heart', label: 'Faith Based', sublabel: 'Values Driven' },
  ],

  // === HOW IT WORKS SECTION ===
  howItWorksTagline: 'The Plan',
  howItWorksHeading: 'Getting Your Shed is Easy',
  howItWorksSubheading: 'We\'ve simplified the entire process into 3 simple steps.',
  howItWorksSteps: [
    {
      title: 'Design It Online',
      description: 'Use our 3D builder to pick your style, size, colors, and options. Get instant pricing. Takes about 5 minutes.',
    },
    {
      title: 'We Build It',
      description: 'Our craftsmen hand-build your shed using premium materials right here in Farmington. Every building is inspected for quality.',
    },
    {
      title: 'We Deliver & Setup',
      description: 'We deliver to your Farmington-area property and set it up, leveled and ready to use. Free within 50 miles.',
    },
  ],
  howItWorksButtonText: 'Start Designing Your Shed',
  howItWorksButtonLink: 'https://summitbuildings.shedpro.co/',
  howItWorksButtonOpenInNewTab: true,

  // === PRODUCTS SECTION ===
  productsTagline: 'Available in Farmington',
  productsHeading: 'Choose Your Style',
  productsSubheading: 'All of our building styles are available for delivery to Farmington and the surrounding area.',
  productsSectionTitle: 'Building Styles',
  productsStyles: [
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

  // === CTA BANNER SECTION ===
  ctaBannerBadge: 'Ready?',
  ctaBannerHeading: 'Get the Storage Space You Deserve',
  ctaBannerDescription1: 'Stop cramming things in the garage. Stop letting equipment rust outside. You work hard — your property should work for you.',
  ctaBannerDescription2: 'Design your custom building online in minutes or give us a call. We\'re right here in Farmington and happy to help.',
  ctaBannerButton: 'Design Your Shed',
  ctaBannerButtonLink: 'https://summitbuildings.shedpro.co/',
  ctaBannerButtonOpenInNewTab: true,
  ctaBannerPhoneNumber: '573-747-4700',

  // === CONTACT SECTION ===
  contactTagline: 'Get In Touch',
  contactHeading: 'Visit Us in Farmington',
  contactSubheading: 'Stop by our lot to see our buildings in person, or give us a call. We\'re happy to answer any questions.',
  contactCallTitle: 'Call Us',
  contactPhoneNumber: '(573) 747-4700',
  contactLocationTitle: 'Our Location',
  contactAddress1: '7336 State Highway 32',
  contactAddress2: 'Farmington, MO 63640',
  contactHoursTitle: 'Hours',
  contactHours1: 'Mon - Fri: 8am - 5pm',
  contactHours2: 'Sat: 9am - 3pm',
};
