/**
 * Traditional A-Frame Shed Landing Page Defaults
 * High-converting landing page combining content from Budget Pro, Pro Utility, and Cabin series.
 * Rebranded from "Utility" to "Traditional" — focused on the classic A-frame roof style.
 */

import { cloudinaryImages } from '@/lib/cloudinary';

export interface TraditionalShedContent {
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

  // === STAKES SECTION ===
  stakesTagline: string;
  stakesHeading: string;
  stakesSubheading: string;
  stakesPainPoints: Array<{ title: string; description: string }>;
  stakesClosingText: string;

  // === PRODUCT TIERS SECTION ===
  tiersTagline: string;
  tiersHeading: string;
  tiersSubheading: string;
  tiers: Array<{
    name: string;
    badge: string;
    description: string;
    image: string;
    features: string[];
    buttonText: string;
    buttonLink: string;
    buttonOpenInNewTab: boolean;
  }>;

  // === FEATURES SECTION ===
  featuresTagline: string;
  featuresHeading: string;
  featuresDescription: string;
  featuresList: string[];
  featuresNote: string;
  featuresImage: string;
  featuresImageAlt: string;

  // === GALLERY SECTION ===
  galleryTagline: string;
  galleryHeading: string;
  galleryImages: Array<{ src: string; alt: string }>;

  // === USES SECTION ===
  usesTagline: string;
  usesHeading: string;
  usesSubheading: string;
  usesList: string[];
  usesNote: string;

  // === HOW IT WORKS SECTION ===
  howItWorksTagline: string;
  howItWorksHeading: string;
  howItWorksSubheading: string;
  howItWorksSteps: Array<{ title: string; description: string }>;

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

export const traditionalShedDefaults: TraditionalShedContent = {
  // === META & SEO ===
  metaTitle: 'Traditional A-Frame Sheds & Storage Buildings | Summit Portable Buildings',
  metaDescription: 'Explore our traditional A-frame storage sheds — the classic roof style that never goes out of style. Economy, Budget Pro, and Pro options. Hand-crafted in the USA with free delivery within 50 miles.',

  // === HERO SECTION ===
  heroTagline: 'Classic A-Frame Roof Style',
  heroHeading: 'Traditional Sheds Built to Last Generations',
  heroSubheading: 'The timeless A-frame roof design — proven, practical, and built with premium materials by skilled craftsmen right here in the USA.',
  heroCtaDescription: 'From basic storage to workshops, home offices, and cabins — our traditional sheds do it all. Design yours online in minutes.',
  heroButton1Text: 'Design Your Shed Now',
  heroButton1Link: 'https://summitbuildings.shedpro.co/',
  heroButton1OpenInNewTab: true,
  heroButton2Text: 'Get Free Buying Guide',
  heroButton2Link: '/buyers-guide',
  heroButton2OpenInNewTab: false,
  heroServiceText: 'Hand-crafted in Farmington, MO — Free delivery within 50 miles across MO, IL, KY & AR',
  heroBadges: [
    { icon: 'truck', label: 'Free Delivery (50mi)' },
    { icon: 'credit-card', label: 'No Credit Check Financing' },
    { icon: 'shield', label: '5-Year Warranty' },
  ],

  // === STAKES SECTION ===
  stakesTagline: 'Sound Familiar?',
  stakesHeading: 'You Need More Space — But Not Just Any Shed',
  stakesSubheading: 'You\'ve looked at the big box stores. The cheap sheds that warp, leak, and fall apart in a few years. You deserve better.',
  stakesPainPoints: [
    {
      title: 'Cheap Sheds Don\'t Last',
      description: 'That $1,500 kit from the hardware store? It\'ll be sagging and leaking within 3 years. You\'ll spend more fixing it than you paid for it.',
    },
    {
      title: 'One Size Doesn\'t Fit All',
      description: 'You need the right size, the right door placement, the right features for YOUR property. Cookie-cutter doesn\'t cut it.',
    },
    {
      title: 'You Want It Done Right',
      description: 'You want a building that looks good, holds up to weather, and adds value to your property — not an eyesore.',
    },
  ],
  stakesClosingText: 'That\'s exactly why we build traditional A-frame sheds the way we do.',

  // === PRODUCT TIERS SECTION ===
  tiersTagline: 'Find Your Fit',
  tiersHeading: 'Three Options — One Classic Style',
  tiersSubheading: 'Whether you need simple storage or a fully-loaded workshop, we\'ve got a traditional A-frame that fits your needs and budget.',
  tiers: [
    {
      name: 'Economy',
      badge: '',
      description: 'Our most affordable storage building. Lowest cost per square foot with metal siding and a classic A-frame roof. Perfect for straightforward storage needs.',
      image: cloudinaryImages.economyShed1,
      features: [
        'Metal siding',
        '6\'6" wall height',
        'Double 36" or single 48" door',
        'Sizes 8×8 to 14×40',
      ],
      buttonText: 'Design Economy',
      buttonLink: 'https://summitbuildings.shedpro.co/',
      buttonOpenInNewTab: true,
    },
    {
      name: 'Budget Pro',
      badge: '',
      description: 'Maximum headroom at an affordable price. The Budget Pro gives you tall 7\'9" walls so you can actually stand and work inside. Great for workshops and hobby spaces.',
      image: cloudinaryImages.budgetProUtility,
      features: [
        '7\'9" wall height',
        'Double 36" doors w/ lock',
        '5/8" subfloor',
        'Side or front entry options',
      ],
      buttonText: 'Design Budget Pro',
      buttonLink: 'https://summitbuildings.shedpro.co/',
      buttonOpenInNewTab: true,
    },
    {
      name: 'Pro',
      badge: 'Premium Quality',
      description: 'Superior workmanship with premium materials throughout. 3/4" Advantech flooring, moisture barrier, drip edge, and 16" O.C. wall studs. Built to last a lifetime.',
      image: cloudinaryImages.utilityShed1,
      features: [
        '7\'9" wall height',
        '3/4" Advantech flooring',
        'Moisture barrier & drip edge',
        '16" O.C. wall studs & rafters',
      ],
      buttonText: 'Design Pro',
      buttonLink: 'https://summitbuildings.shedpro.co/',
      buttonOpenInNewTab: true,
    },
  ],

  // === FEATURES SECTION ===
  featuresTagline: 'What Sets Us Apart',
  featuresHeading: 'Built Different — Every Detail Matters',
  featuresDescription: 'Every traditional A-frame shed we build is hand-crafted with attention to detail. Whether you choose Economy, Budget Pro, or Pro — you\'re getting a building that\'s built to last.',
  featuresList: [
    'Double 36" doors with T-handle lock & key',
    'Side or front door entry options',
    'Multiple siding choices — metal, urethane, or vinyl',
    'Customizable layout for any use',
    'Additional doors & windows available',
    'LP SmartSide materials with 5-year warranty',
    'Sizes from 8×8 all the way up to 14×40',
    'Fully customizable with our 3D online designer',
  ],
  featuresNote: '*Features vary by model. 8-foot wide models may feature adjusted door sizing.',
  featuresImage: cloudinaryImages.sideUtility1,
  featuresImageAlt: 'Traditional A-Frame shed with side door entry',

  // === GALLERY SECTION ===
  galleryTagline: 'See Our Work',
  galleryHeading: 'Traditional Sheds We\'ve Built',
  galleryImages: [
    { src: cloudinaryImages.utilityShed1, alt: 'Traditional A-Frame shed - gray with white trim' },
    { src: cloudinaryImages.utilityShed2, alt: 'Traditional A-Frame shed - tan with brown trim' },
    { src: cloudinaryImages.budgetProUtility, alt: 'Budget Pro traditional shed - gray with red trim' },
    { src: cloudinaryImages.sideUtility1, alt: 'Traditional shed with side door entry' },
    { src: cloudinaryImages.utilityShed3, alt: 'Traditional A-Frame shed - white exterior' },
    { src: cloudinaryImages.sideUtility2, alt: 'Side entry traditional shed - white with windows' },
    { src: cloudinaryImages.economyShed1, alt: 'Economy traditional shed - red with white trim' },
    { src: cloudinaryImages.utilityShed4, alt: 'Traditional A-Frame shed - brown rustic style' },
    { src: cloudinaryImages.budgetProUtility2, alt: 'Budget Pro traditional shed - white with black trim' },
  ],

  // === USES SECTION ===
  usesTagline: 'Endless Possibilities',
  usesHeading: 'One Shed Style — Dozens of Uses',
  usesSubheading: 'The traditional A-frame isn\'t just for storage. Families across four states use our sheds for everything from workshops to home offices to hunting cabins.',
  usesList: [
    'General Storage',
    'Workshop Space',
    'Home Office',
    'Garden Shed',
    'Tool Storage',
    'Hobby Space',
    'Art Studio',
    'Man Cave / She Shed',
    'Hunting Cabin',
    'Lake Lot Cabin',
    'Backyard Retreat',
    'Small Hay Shed',
  ],
  usesNote: 'Add windows, extra doors, electrical packages, and more to turn your traditional shed into exactly what you need.',

  // === HOW IT WORKS SECTION ===
  howItWorksTagline: 'Simple Process',
  howItWorksHeading: 'Getting Your Shed is Easy',
  howItWorksSubheading: 'Three steps. That\'s it. No contractors, no permits headaches, no months of waiting.',
  howItWorksSteps: [
    {
      title: 'Design It Online',
      description: 'Use our 3D builder to pick your size, colors, doors, windows, and options. Get instant pricing. Takes about 5 minutes.',
    },
    {
      title: 'We Build It',
      description: 'Our craftsmen hand-build your traditional A-frame shed using premium materials. Every building is inspected for quality before delivery.',
    },
    {
      title: 'We Deliver & Setup',
      description: 'We deliver to your property, level it, and set it up — ready to use. Free delivery within 50 miles.',
    },
  ],

  // === CTA BANNER SECTION ===
  ctaBannerBadge: 'Don\'t Wait',
  ctaBannerHeading: 'Your Property Deserves a Traditional Shed That Lasts',
  ctaBannerDescription1: 'Every month you wait, the clutter gets worse. Equipment rusts. The garage gets more packed. That cheap shed from the big box store? It\'ll be falling apart while ours is still standing strong.',
  ctaBannerDescription2: 'Design your traditional A-frame shed online right now — or give us a call. We\'re happy to help you find the perfect fit.',
  ctaBannerButton: 'Design Your Shed Now',
  ctaBannerButtonLink: 'https://summitbuildings.shedpro.co/',
  ctaBannerButtonOpenInNewTab: true,
  ctaBannerPhoneNumber: '573-747-4700',

  // === CONTACT SECTION ===
  contactTagline: 'Get a Free Quote',
  contactHeading: 'Ready to Talk Traditional Sheds?',
  contactSubheading: 'Fill out the form below and we\'ll get back to you with a quote. Or just give us a call — we\'re real people, not a call center.',
  contactCallTitle: 'Call Us',
  contactPhoneNumber: '(573) 747-4700',
  contactLocationTitle: 'Visit Our Lot',
  contactAddress1: '7336 State Highway 32',
  contactAddress2: 'Farmington, MO 63640',
  contactHoursTitle: 'Hours',
  contactHours1: 'Mon - Fri: 8am - 5pm',
  contactHours2: 'Sat: 9am - 3pm',
};
