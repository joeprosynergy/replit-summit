/**
 * Why Summit — Mid-Funnel Landing Page
 * For people who've decided they need a shed and are now comparing
 * dealers. Positions Summit as the clear choice with quality proof,
 * transparent pricing, and the $50 site visit offer.
 */

import { cloudinaryImages } from '@/lib/cloudinary';

export interface WhySummitContent {
  metaTitle: string;
  metaDescription: string;

  // HERO
  heroTagline: string;
  heroHeading: string;
  heroSubheading: string;

  // FUNNEL NAV — where they are in the journey
  journeySteps: Array<{
    label: string;
    description: string;
    link: string;
    active: boolean;
  }>;

  // HOW IT WORKS — 3-step process
  processTagline: string;
  processHeading: string;
  processSubheading: string;
  processSteps: Array<{
    number: string;
    heading: string;
    description: string;
    icon: string;
  }>;

  // BUILDING STYLES — what Summit offers
  stylesTagline: string;
  stylesHeading: string;
  stylesSubheading: string;
  styles: Array<{
    name: string;
    startingPrice: string;
    description: string;
    image: string;
    link: string;
  }>;

  // WHY SUMMIT — differentiators
  whyTagline: string;
  whyHeading: string;
  whySubheading: string;
  differentiators: Array<{
    heading: string;
    description: string;
    icon: string;
  }>;
  whyDisclaimer: string;

  // SITE VISIT OFFER
  offerTagline: string;
  offerHeading: string;
  offerDescription: string;
  offerDetails: Array<{
    text: string;
  }>;
  offerCta: string;
  offerCtaLink: string;
  offerFinePrint: string;

  // PAYMENT OPTIONS
  paymentTagline: string;
  paymentHeading: string;
  paymentSubheading: string;
  paymentOptions: Array<{
    name: string;
    description: string;
    details: string;
    highlight: string;
    icon: string;
  }>;

  // TESTIMONIALS
  testimonialsTagline: string;
  testimonialsHeading: string;
  testimonials: Array<{
    quote: string;
    name: string;
    location: string;
    stars: number;
  }>;

  // BOTTOM CTA — drives to BOF
  ctaHeading: string;
  ctaDescription: string;
  ctaButtonText: string;
  ctaButtonLink: string;
  ctaSecondaryText: string;
  ctaSecondaryLink: string;

  // CONTACT
  contactPhoneNumber: string;
  contactAddress1: string;
  contactAddress2: string;
  contactHours1: string;
  contactHours2: string;

  // BRIDGE LINKS
  tofLinkText: string;
  tofLinkHref: string;

  [key: string]: unknown;
}

export const whySummitDefaults: WhySummitContent = {
  metaTitle: 'Why Summit Portable Buildings | Quality Sheds in Farmington, MO',
  metaDescription: 'See how Summit builds differently — Advantech flooring, 16" stud spacing, metal roofs, and local delivery. Compare styles, see pricing, and book a $50 site visit.',

  // HERO
  heroTagline: 'Compare Before You Buy',
  heroHeading: 'Not All Sheds Are Built the Same',
  heroSubheading: 'You\'ve decided you need a shed. Now the question is: who builds it right? Here\'s how Summit is different — and how to get started without any pressure.',

  // JOURNEY STEPS
  journeySteps: [
    {
      label: 'Learn',
      description: 'Shed Buying Guide',
      link: '/shed-buying-guide',
      active: false,
    },
    {
      label: 'Compare',
      description: 'Why Summit',
      link: '/why-summit',
      active: true,
    },
    {
      label: 'Build',
      description: 'Design Yours',
      link: 'https://summitbuildings.shedpro.co/',
      active: false,
    },
  ],

  // HOW IT WORKS
  processTagline: 'How It Works',
  processHeading: 'From Idea to Delivery in 3 Steps',
  processSubheading: 'No surprises. No hidden fees. Here\'s exactly how buying a shed from Summit works.',
  processSteps: [
    {
      number: '1',
      heading: 'Pick Your Style & Size',
      description: 'Browse our building styles or use the free 3D designer to configure exactly what you want — size, colors, doors, windows, upgrades. Get an instant price.',
      icon: 'layout',
    },
    {
      number: '2',
      heading: 'Choose How to Pay',
      description: 'Cash, financing, or rent-to-own. No credit check required for RTO. We\'ll walk you through the options and find what works for your budget.',
      icon: 'credit-card',
    },
    {
      number: '3',
      heading: 'We Build & Deliver',
      description: 'Your building is built to order and delivered to your property. We place it exactly where you want it. Setup is included — you don\'t lift a finger.',
      icon: 'truck',
    },
  ],

  // BUILDING STYLES
  stylesTagline: 'Building Styles',
  stylesHeading: 'Find the Right Fit',
  stylesSubheading: 'Every building is built to order. Pick a style, choose your size, and customize it to match your property.',
  styles: [
    {
      name: 'Utility Shed',
      startingPrice: 'Starting at $2,850',
      description: 'The classic A-frame. Clean lines, maximum interior space. Our most popular style for storage and workshops.',
      image: cloudinaryImages.utilityShed1,
      link: '/styles',
    },
    {
      name: 'Lofted Barn',
      startingPrice: 'Starting at $3,450',
      description: 'Gambrel roof with built-in loft storage overhead. Great for maximizing space in a smaller footprint.',
      image: cloudinaryImages.loftedBarn1,
      link: '/styles',
    },
    {
      name: 'Garage',
      startingPrice: 'Starting at $6,950',
      description: 'Drive-in access with roll-up door. Perfect for vehicles, ATVs, riding mowers, or a serious workshop.',
      image: cloudinaryImages.garage1,
      link: '/styles',
    },
    {
      name: 'Cabin',
      startingPrice: 'Starting at $5,450',
      description: 'Finished interior shell for home offices, she-sheds, man caves, or guest quarters. Add electrical and insulation.',
      image: cloudinaryImages.cabin1,
      link: '/styles',
    },
  ],

  // WHY SUMMIT
  whyTagline: 'Built Different',
  whyHeading: 'What Sets Summit Apart',
  whySubheading: 'Every dealer will tell you they\'re the best. Here\'s what we actually do differently — and why it matters 10 years from now.',
  differentiators: [
    {
      heading: 'Advantech Flooring Standard',
      description: 'Our standard floor is Advantech — a moisture-resistant, high-performance subfloor that won\'t swell or warp when it gets wet. The cheaper alternative is OSB, which absorbs moisture and breaks down in a few years. Every Summit building comes with Advantech.',
      icon: 'layers',
    },
    {
      heading: '16" Stud Spacing',
      description: 'Industry standard is 24" studs to save money. We frame at 16" on center — the same as your house. Stronger walls, better for hanging shelves, and the building holds up longer.',
      icon: 'ruler',
    },
    {
      heading: 'Metal Roof — 40-Year Warranty',
      description: 'Every Summit building comes with a metal roof rated for 40+ years. No shingle replacements. No leaks. No maintenance.',
      icon: 'shield',
    },
    {
      heading: 'Delivery & Setup Included',
      description: 'Your building is delivered and placed exactly where you want it on your property. Setup is included — you don\'t lift a finger.',
      icon: 'truck',
    },
    {
      heading: 'Built to Order',
      description: 'Your building is built for you — not pulled from a lot. Pick your size, colors, door placement, windows, and upgrades. It\'s yours from the start.',
      icon: 'hammer',
    },
    {
      heading: 'Real People, Real Lot',
      description: 'Come to our lot in Farmington and walk through actual buildings. Talk to real people. No call centers, no pressure, no scripts.',
      icon: 'users',
    },
  ],
  whyDisclaimer: 'Features listed above are based on our Pro Series buildings. Budget and Economy lines may vary — ask us for details.',

  // SITE VISIT OFFER
  offerTagline: 'Limited Offer',
  offerHeading: 'Book a $50 Site Visit — And Get $100 Back When You Buy',
  offerDescription: 'Not sure if your site is ready? We\'ll come to your property, check the ground, measure the access path, and help you figure out exactly what size and placement works best.',
  offerDetails: [
    { text: 'We visit your property and assess the site for $50' },
    { text: 'If you buy within 30 days, that $50 is applied to your purchase' },
    { text: 'Plus an additional $50 off — so you save $100 total' },
    { text: 'No pressure. If it\'s not the right time, you still get a professional site assessment' },
  ],
  offerCta: 'Book Your Site Visit',
  offerCtaLink: 'tel:5737474700',
  offerFinePrint: 'Site visit covers the Farmington, MO area and surrounding counties. $50 fee collected at time of visit. $100 discount applied at purchase if order is placed within 30 days of site visit.',

  // PAYMENT OPTIONS
  paymentTagline: 'Payment Options',
  paymentHeading: 'Flexible Ways to Pay',
  paymentSubheading: 'We don\'t believe in one-size-fits-all pricing. Pick the option that works for your situation.',
  paymentOptions: [
    {
      name: 'Rent-to-Own',
      description: 'No credit check. Low monthly payments. Own it when you\'re done.',
      details: 'Put down one month\'s payment and take delivery. Pay monthly for 36-60 months. Return anytime if your situation changes.',
      highlight: 'Most Popular',
      icon: 'calendar',
    },
    {
      name: 'Financing',
      description: 'Lower total cost with approved credit.',
      details: 'Apply online in minutes. Competitive rates, fixed monthly payments. Often the lowest total cost option.',
      highlight: 'Lowest Total Cost',
      icon: 'percent',
    },
    {
      name: 'Cash / Check',
      description: 'Pay upfront and get the best price.',
      details: 'No monthly payments, no interest, no paperwork. Just the building at the best possible price.',
      highlight: 'Best Price',
      icon: 'dollar-sign',
    },
  ],

  // TESTIMONIALS
  testimonialsTagline: 'What Customers Say',
  testimonialsHeading: 'Don\'t Take Our Word for It',
  testimonials: [
    {
      quote: 'I requested a metal 14x32 shed. Let me just say, it turned out everything I pictured and more. They did an amazing job on the build. You can tell they truly put their best effort into it and took their time to make sure it was done right. I\'m 10/10 extremely happy & thankful for it!',
      name: 'Samantha Tevlin',
      location: 'Google Review',
      stars: 5,
    },
    {
      quote: 'Gino was such a helpful salesman. He was patient and kind as we did this sale long distance. Delivery was a breeze. The team was friendly and knowledgeable. It was a joy to watch them set up the unit. Five stars isn\'t enough for the experience with Summit.',
      name: 'Dona Clapperton',
      location: 'Google Review',
      stars: 5,
    },
    {
      quote: 'I am quite pleased with the 12X32 building I purchased. The worker who delivered and set up the building was amazing and was very knowledgeable. I would recommend Summit Portable Buildings to anyone want a solid built and attractive building.',
      name: 'Gary Shrum',
      location: 'Google Review',
      stars: 5,
    },
  ],

  // BOTTOM CTA
  ctaHeading: 'Ready to See What Yours Would Look Like?',
  ctaDescription: 'Design your building in our free 3D tool — pick the style, size, colors, and upgrades. Get an instant price. No account required, no commitment.',
  ctaButtonText: 'Design Yours in 3D',
  ctaButtonLink: 'https://summitbuildings.shedpro.co/',
  ctaSecondaryText: 'Or Call Us — We\'ll Walk You Through It',
  ctaSecondaryLink: 'tel:5737474700',

  // CONTACT
  contactPhoneNumber: '(573) 747-4700',
  contactAddress1: '7336 State Highway 32',
  contactAddress2: 'Farmington, MO 63640',
  contactHours1: 'Mon - Fri: 9am - 5pm',
  contactHours2: 'Sat: 9am - 2pm',

  // BRIDGE LINKS
  tofLinkText: 'New to sheds? Start with our Buying Guide',
  tofLinkHref: '/shed-buying-guide',
};
