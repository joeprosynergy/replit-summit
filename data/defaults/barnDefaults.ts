/**
 * Barn & Lofted Barn Landing Page
 * Same conversion-optimized structure as /traditional.
 * Targets: barn shed, lofted barn, gambrel roof shed, barn storage building.
 */

import { cloudinaryImages } from '@/lib/cloudinary';

export interface BarnContent {
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

export const barnDefaults: BarnContent = {
  metaTitle: 'Barn & Lofted Barn Sheds For Sale | Free Delivery | Summit Portable Buildings',
  metaDescription: 'Barn-style storage buildings with gambrel roof and dual lofts for maximum overhead storage. Built in Farmington, MO. 40-year metal roof, free delivery within 50 miles. Financing & rent-to-own, no credit check. Get your free quote today.',

  // HERO
  heroImage: 'https://res.cloudinary.com/dwhwbbbev/image/upload/c_pad,w_1920,h_1080,g_south,b_gen_fill/f_auto,q_auto/summit-buildings/lofted-barn-1',
  heroImageId: 'lofted-barn-1',
  heroTagline: 'Barn & Lofted Barn Buildings',
  heroHeading: 'More Storage. More Style. Delivered Free to Your Property.',
  heroSubheading: 'Gambrel roof barn buildings built in Farmington, MO. Dual lofts for maximum overhead storage. 40-year metal roof standard. Free delivery within 50 miles. Financing & rent-to-own available.',
  heroFormHeading: 'Get Your Free Quote',
  heroFormSubheading: 'Tell us what you need and we\'ll get back to you fast.',
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
  tiersHeading: 'Three Options. One Iconic Roof.',
  tiersSubheading: 'Every barn-style building we build uses the same gambrel roof design with a 40-year metal roof standard. The difference is in the details.',
  tiers: [
    {
      name: 'Economy',
      badge: '',
      description: 'Our most economical storage building. Lowest cost per square foot. The gambrel roof gives you two lofts and a ladder included, so you get overhead storage even at the entry level.',
      image: cloudinaryImages.loftedBarn1,
      wallHeight: '5\'',
      sizes: 'Multiple configurations',
      features: [
        'Metal siding',
        '2 lofts & ladder included',
        '40-year metal roof',
      ],
      buttonText: 'Design Economy',
      buttonLink: 'https://summitbuildings.shedpro.co/',
      buttonOpenInNewTab: true,
    },
    {
      name: 'Pro',
      badge: 'Most Popular',
      description: 'Our best seller. The most versatile for all purposes. Built with the best materials we offer. Dual lofts, Advantech flooring, and the build quality to last decades.',
      image: cloudinaryImages.proLoftedBarn,
      wallHeight: '6\'6"',
      sizes: 'Multiple configurations',
      features: [
        '3/4" Advantech flooring',
        '2 lofts & ladder',
        '40-year metal roof',
      ],
      buttonText: 'Design Pro',
      buttonLink: 'https://summitbuildings.shedpro.co/',
      buttonOpenInNewTab: true,
    },
    {
      name: 'Budget Pro',
      badge: '',
      description: 'Classic barn styling at an affordable price. Taller walls give you room to work and move, plus a loft for overhead storage.',
      image: cloudinaryImages.budgetProLoftedBarn,
      wallHeight: '6\'6"',
      sizes: 'Multiple configurations',
      features: [
        '1 loft for storage',
        'Double 36" doors w/ lock',
        '40-year metal roof',
      ],
      buttonText: 'Design Budget Pro',
      buttonLink: 'https://summitbuildings.shedpro.co/',
      buttonOpenInNewTab: true,
    },
  ],

  // ANSWERS
  answersTagline: 'Your Questions, Answered',
  answersHeading: 'What Everyone Asks Before They Buy',
  answersSubheading: 'We\'ve talked to hundreds of buyers. Here\'s what they all want to know about barn-style buildings.',
  answers: [
    {
      question: 'What is the difference between a barn and a utility (A-frame)?',
      answer: 'The gambrel (barn) roof creates significantly more overhead storage with built-in lofts. The A-frame is a classic look with a simpler roofline. Both use the same quality construction, 40-year metal roof, and free delivery. If you want maximum storage space per square foot, the barn style wins.',
      icon: 'home',
    },
    {
      question: 'How much does a barn-style building cost?',
      answer: 'Pricing depends on size, tier (Economy, Budget Pro, or Pro), and any upgrades. Use our free 3D designer to configure exactly what you want and get instant pricing. No waiting, no sales calls.',
      icon: 'credit-card',
    },
    {
      question: 'Do you deliver for free?',
      answer: 'Free delivery and setup within 50 miles of Farmington, MO. We serve Missouri, Illinois, Kentucky, and Arkansas. Beyond 50 miles, we charge a small per-mile fee.',
      icon: 'truck',
    },
    {
      question: 'Do you offer financing or rent-to-own?',
      answer: 'Yes. We offer rent-to-own with no credit check required and no early payoff penalties. Monthly payments start under $200 for smaller buildings. You can also finance through traditional lending if you prefer.',
      icon: 'credit-card',
    },
    {
      question: 'How long until I get my building?',
      answer: 'In-stock buildings are ready for delivery now. Custom orders are typically built in 10-30 business days. We\'ll give you a timeline when you order and keep you updated along the way.',
      icon: 'clock',
    },
    {
      question: 'Can I use a lofted barn as a cabin or tiny home?',
      answer: 'Absolutely. Our lofted barn cabin model comes with a covered porch, dual sleeping lofts, and is a popular starting point for tiny home shells, hunting cabins, lake houses, and guest houses. We provide the shell and you can finish the interior however you want. We can add insulation, electrical, and windows to get you started.',
      icon: 'heart',
    },
  ],

  // GALLERY
  galleryTagline: 'Real Builds',
  galleryHeading: 'See What We\'ve Built',
  galleryImages: [
    { src: cloudinaryImages.loftedBarn1, alt: 'Lofted barn - gambrel roof storage building' },
    { src: cloudinaryImages.loftedBarn2, alt: 'Lofted barn - delivered to property' },
    { src: cloudinaryImages.budgetProLoftedBarn, alt: 'Budget Pro lofted barn' },
    { src: cloudinaryImages.loftedBarn3, alt: 'Lofted barn with dual lofts' },
    { src: cloudinaryImages.budgetProLoftedBarn2, alt: 'Budget Pro lofted barn - side view' },
    { src: cloudinaryImages.proLoftedBarn, alt: 'Pro lofted barn - premium quality' },
  ],

  // USES
  usesTagline: 'Built For Anything',
  usesHeading: 'What Will You Use Yours For?',
  usesList: [
    'Storage', 'Workshop', 'Home Office', 'Tool Storage',
    'Man Cave', 'She Shed', 'Hunting Cabin', 'Tiny Home Shell',
    'Guest House', 'Art Studio', 'Farm Storage', 'Hay Barn',
  ],

  // TESTIMONIALS
  testimonialsTagline: 'What Our Customers Say',
  testimonialsHeading: 'Real People. Real Buildings.',
  testimonials: [
    {
      quote: 'I requested a metal 14x32 shed. Let me just say, it turned out everything I pictured and more. They did an amazing job on the build. You can tell they truly put their best effort into it and took their time to make sure it was done right. I\'m 10/10 extremely happy & thankful for it!',
      name: 'Samantha Tevlin',
      location: 'Google Review',
      detail: '14x32 Metal Shed',
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
      detail: '12x32 Building',
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
  urgencyText: 'Spring is our busiest season. Order now to lock in your delivery date.',

  // FINAL CTA
  finalCtaHeading: 'Ready to Get Started?',
  finalCtaDescription: 'Fill out the form and we\'ll get back to you with a quote. Or just call us. We\'re real people, not a call center.',
  finalCtaFormHeading: 'Get Your Free Quote',
  contactPhoneNumber: '(573) 747-4700',
  contactAddress1: '7336 State Highway 32',
  contactAddress2: 'Farmington, MO 63640',
  contactHours1: 'Mon - Fri: 8am - 5pm',
  contactHours2: 'Sat: 9am - 3pm',
};
