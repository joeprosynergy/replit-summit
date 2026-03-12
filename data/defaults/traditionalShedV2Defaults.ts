/**
 * Traditional A-Frame Shed Landing Page V2
 * Redesigned from first principles for maximum conversion.
 * Addresses top lead questions directly on the page.
 */

import { cloudinaryImages } from '@/lib/cloudinary';

export interface TraditionalShedV2Content {
  metaTitle: string;
  metaDescription: string;

  // HERO
  heroTagline: string;
  heroHeading: string;
  heroSubheading: string;
  heroFormHeading: string;
  heroFormSubheading: string;
  heroBadges: Array<{ icon: string; label: string }>;

  // SOCIAL PROOF BAR
  proofStats: Array<{ value: string; label: string }>;

  // PRODUCT TIERS
  tiersTagline: string;
  tiersHeading: string;
  tiersSubheading: string;
  tiers: Array<{
    name: string;
    badge: string;
    description: string;
    image: string;
    wallHeight: string;
    sizes: string;
    features: string[];
    buttonText: string;
    buttonLink: string;
    buttonOpenInNewTab: boolean;
  }>;

  // ANSWERS (FAQ-style addressing top lead questions)
  answersTagline: string;
  answersHeading: string;
  answersSubheading: string;
  answers: Array<{
    question: string;
    answer: string;
    icon: string;
  }>;

  // GALLERY
  galleryTagline: string;
  galleryHeading: string;
  galleryImages: Array<{ src: string; alt: string }>;

  // USES
  usesTagline: string;
  usesHeading: string;
  usesList: string[];

  // TESTIMONIALS
  testimonialsTagline: string;
  testimonialsHeading: string;
  testimonials: Array<{
    quote: string;
    name: string;
    location: string;
    detail: string;
  }>;

  // TRUST BADGES (shown near forms)
  trustBadges: Array<{ label: string; icon: string }>;

  // URGENCY
  urgencyText: string;

  // FINAL CTA
  finalCtaHeading: string;
  finalCtaDescription: string;
  finalCtaFormHeading: string;
  contactPhoneNumber: string;
  contactAddress1: string;
  contactAddress2: string;
  contactHours1: string;
  contactHours2: string;

  [key: string]: unknown;
}

export const traditionalShedV2Defaults: TraditionalShedV2Content = {
  metaTitle: 'Traditional A-Frame Sheds For Sale | Free Delivery | Summit Portable Buildings',
  metaDescription: 'Traditional A-frame storage sheds for sale. Built in Farmington, MO. 40-year metal roof, free delivery within 50 miles. Financing & rent-to-own, no credit check. Get your free quote today.',

  // HERO
  heroTagline: 'Traditional A-Frame Sheds',
  heroHeading: 'Storage Sheds, Delivered Free to Your Property',
  heroSubheading: 'Built in Farmington, MO. 40-year metal roof & up to 50-year siding warranty. Free delivery within 50 miles. Financing & rent-to-own available.',
  heroFormHeading: 'Get Your Free Quote',
  heroFormSubheading: 'Tell us what you need — we\'ll get back to you fast.',
  heroBadges: [
    { icon: 'truck', label: 'Free Delivery Within 50 Mi' },
    { icon: 'credit-card', label: 'Financing & Rent-to-Own' },
    { icon: 'shield', label: 'Up to 5-Year Warranty' },
  ],

  // SOCIAL PROOF BAR
  proofStats: [
    { value: '1,000+', label: 'Buildings Delivered' },
    { value: '4', label: 'States Served' },
    { value: '8+', label: 'Years Family-Owned' },
    { value: '40yr', label: 'Metal Roof Warranty' },
  ],

  // PRODUCT TIERS
  tiersTagline: 'Pick Your Level',
  tiersHeading: 'Three Options. One Timeless Style.',
  tiersSubheading: 'Every traditional A-frame we build uses the same classic roof design with a 40-year metal roof standard. The difference is in the details.',
  tiers: [
    {
      name: 'Budget Pro',
      badge: '',
      description: 'Tall walls so you can actually stand and work inside. Subfloor included. A solid building at a great price.',
      image: cloudinaryImages.budgetProUtility,
      wallHeight: '7\'9"',
      sizes: '6×8 to 12×24',
      features: [
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
      badge: 'Most Popular — Best Value',
      description: 'The best materials we offer. Advantech flooring, moisture barrier, tighter stud spacing. Built to outlast everything else on your property. The difference in price is small — the difference in quality is not.',
      image: cloudinaryImages.utilityShed1,
      wallHeight: '7\'9"',
      sizes: '8×8 to 16×48',
      features: [
        '3/4" Advantech flooring',
        'Moisture barrier & drip edge',
        '16" O.C. studs & rafters',
      ],
      buttonText: 'Design Pro',
      buttonLink: 'https://summitbuildings.shedpro.co/',
      buttonOpenInNewTab: true,
    },
    {
      name: 'Economy',
      badge: '',
      description: 'For buyers shopping on price alone. Basic metal siding, shorter walls, no subfloor. Gets the job done if you just need a place to store things.',
      image: cloudinaryImages.economyShed1,
      wallHeight: '6\'6"',
      sizes: '4×8 to 14×24',
      features: [
        'Metal siding',
        'Double 36" or single 48" door',
        'A-frame roof',
      ],
      buttonText: 'Design Economy',
      buttonLink: 'https://summitbuildings.shedpro.co/',
      buttonOpenInNewTab: true,
    },
  ],

  // ANSWERS — directly from top lead questions
  answersTagline: 'Your Questions, Answered',
  answersHeading: 'What Everyone Asks Before They Buy',
  answersSubheading: 'We\'ve talked to hundreds of buyers. Here\'s what they all want to know.',
  answers: [
    {
      question: 'How much does it cost?',
      answer: 'It depends on size, style, and options — but you can get instant pricing right now using our 3D designer. No waiting, no sales calls. Design yours online, pick your size, colors, and features, and see pricing instantly.',
      icon: 'credit-card',
    },
    {
      question: 'Do you offer financing or rent-to-own?',
      answer: 'Yes. We offer rent-to-own with no credit check required and no early payoff penalties. Monthly payments start under $200 for smaller buildings. You can also finance through traditional lending if you prefer.',
      icon: 'home',
    },
    {
      question: 'How far do you deliver? Is it free?',
      answer: 'Free delivery and setup within 50 miles of Farmington, MO. We serve Missouri, Illinois, Kentucky, and Arkansas. Beyond 50 miles, we charge a small per-mile fee.',
      icon: 'truck',
    },
    {
      question: 'How long until I get my building?',
      answer: 'In-stock buildings are ready for delivery now. Custom orders are typically built in 10-30 business days. We\'ll give you a timeline when you order and keep you updated along the way.',
      icon: 'clock',
    },
    {
      question: 'Can I customize my building?',
      answer: 'Fully customizable. Choose from 11 roof colors, custom doors and windows, electrical packages (100 amp box, receptacles, lights), workbenches, shelving, ramps, and more. Design it exactly how you want it in our free 3D builder.',
      icon: 'hammer',
    },
    {
      question: 'Can I live in it or use it as a tiny home?',
      answer: 'Many customers use our cabins and larger sheds as tiny home shells, hunting cabins, or guest houses. We provide the shell — you can finish the interior however you want. We can add insulation, electrical, and windows to get you started.',
      icon: 'heart',
    },
  ],

  // GALLERY
  galleryTagline: 'Real Builds',
  galleryHeading: 'See What We\'ve Built',
  galleryImages: [
    { src: cloudinaryImages.utilityShed1, alt: 'Traditional A-Frame - gray with white trim' },
    { src: cloudinaryImages.budgetProUtility, alt: 'Budget Pro - gray with red trim' },
    { src: cloudinaryImages.sideUtility1, alt: 'Side entry traditional shed' },
    { src: cloudinaryImages.utilityShed2, alt: 'Traditional A-Frame - tan' },
    { src: cloudinaryImages.utilityShed3, alt: 'Traditional A-Frame - white' },
    { src: cloudinaryImages.sideUtility2, alt: 'Side entry - white with windows' },
  ],

  // USES
  usesTagline: 'Built For Anything',
  usesHeading: 'What Will You Use Yours For?',
  usesList: [
    'Storage', 'Workshop', 'Home Office', 'Garden Shed', 'Tool Storage',
    'Art Studio', 'Man Cave', 'She Shed', 'Hunting Cabin', 'Tiny Home Shell',
    'Guest House', 'Hay Shed',
  ],

  // TESTIMONIALS
  testimonialsTagline: 'What Our Customers Say',
  testimonialsHeading: 'Real People. Real Buildings.',
  testimonials: [
    {
      quote: 'I requested a metal 14x32 shed. Let me just say, it turned out everything I pictured and more. They did an amazing job on the build. You can tell they truly put their best effort into it and took their time to make sure it was done right. I\'m 10/10 extremely happy & thankful for it!',
      name: 'Samantha Tevlin',
      location: 'Google Review',
      detail: '14×32 Metal Shed',
    },
    {
      quote: 'Gino was such a helpful salesman. He was patient and kind as we did this sale long distance. Delivery was a breeze. The team was friendly and knowledgeable. It was a joy to watch them set up the unit. Five stars isn\'t enough for the experience with Summit.',
      name: 'Dona Clapperton',
      location: 'Google Review',
      detail: 'Long Distance Purchase',
    },
    {
      quote: 'I am quite pleased with the 12X32 building I purchased. The worker who delivered and set up the building was amazing and was very knowledgeable. I would recommend Summit Portable Buildings to anyone wanting a solid built and attractive building.',
      name: 'Gary Shrum',
      location: 'Google Review',
      detail: '12×32 Building',
    },
  ],

  // TRUST BADGES
  trustBadges: [
    { label: '40-Year Metal Roof', icon: 'shield' },
    { label: 'Free Delivery & Setup', icon: 'truck' },
    { label: 'No Credit Check RTO', icon: 'credit-card' },
    { label: 'Made in the USA', icon: 'package' },
  ],

  // URGENCY
  urgencyText: 'Spring is our busiest season — order now to lock in your delivery date.',

  // FINAL CTA
  finalCtaHeading: 'Ready to Get Started?',
  finalCtaDescription: 'Fill out the form and we\'ll get back to you with a quote. Or just call us — we\'re real people, not a call center.',
  finalCtaFormHeading: 'Get Your Free Quote',
  contactPhoneNumber: '(573) 747-4700',
  contactAddress1: '7336 State Highway 32',
  contactAddress2: 'Farmington, MO 63640',
  contactHours1: 'Mon - Fri: 8am - 5pm',
  contactHours2: 'Sat: 9am - 3pm',
};
