/**
 * Shed Buying Guide — Top of Funnel Landing Page
 * Educational, helpful content for people just starting to think about
 * outdoor storage. Not salesy. Builds trust and captures early-stage interest.
 */

import { cloudinaryImages } from '@/lib/cloudinary';

export interface ShedGuideContent {
  metaTitle: string;
  metaDescription: string;

  // HERO
  heroTagline: string;
  heroHeading: string;
  heroSubheading: string;

  // INTRO — why a shed?
  introTagline: string;
  introHeading: string;
  introCards: Array<{
    icon: string;
    heading: string;
    description: string;
  }>;

  // CONSIDERATIONS — what to think about
  considerationsTagline: string;
  considerationsHeading: string;
  considerationsSubheading: string;
  considerations: Array<{
    number: string;
    heading: string;
    description: string;
  }>;

  // COMPARISON — shed vs alternatives
  comparisonTagline: string;
  comparisonHeading: string;
  comparisonSubheading: string;
  comparisonItems: Array<{
    option: string;
    monthlyCost: string;
    ownership: string;
    access: string;
    customizable: string;
    verdict: string;
  }>;

  // SIZE GUIDE
  sizeGuideTagline: string;
  sizeGuideHeading: string;
  sizeGuideSubheading: string;
  sizeGuideItems: Array<{
    size: string;
    sqft: string;
    bestFor: string;
    image: string;
  }>;

  // COMMON MISTAKES
  mistakesTagline: string;
  mistakesHeading: string;
  mistakesSubheading: string;
  mistakes: Array<{
    mistake: string;
    tip: string;
  }>;

  // FAQ
  faqTagline: string;
  faqHeading: string;
  faqItems: Array<{
    question: string;
    answer: string;
  }>;

  // GALLERY
  galleryTagline: string;
  galleryHeading: string;
  gallerySubheading: string;
  galleryImages: Array<{ src: string; alt: string }>;

  // SOFT CTA
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

  [key: string]: unknown;
}

export const shedGuideDefaults: ShedGuideContent = {
  metaTitle: 'Shed Buying Guide: Everything to Know Before You Buy | Summit Portable Buildings',
  metaDescription: 'Thinking about a storage shed? This guide covers what size you need, shed vs. storage unit costs, site prep, materials, financing, and common mistakes to avoid.',

  // HERO
  heroTagline: 'Shed Buying Guide',
  heroHeading: 'Everything You Need to Know Before Buying a Shed',
  heroSubheading: 'Whether you need more storage, a workshop, or just want your garage back — this guide will help you figure out what you actually need before you spend a dime.',

  // INTRO — why a shed?
  introTagline: 'Why a Shed?',
  introHeading: '5 Signs You Need a Storage Building',
  introCards: [
    {
      icon: 'package',
      heading: 'Your Garage Is Full',
      description: 'If you can\'t park in your garage anymore, a shed gives you dedicated storage so your garage goes back to being a garage.',
    },
    {
      icon: 'hammer',
      heading: 'You Need a Workspace',
      description: 'Woodworking, welding, mechanics, crafts — a shed gives you a dedicated space that doesn\'t take over the house.',
    },
    {
      icon: 'home',
      heading: 'You\'re Running Out of Room',
      description: 'Seasonal items, holiday decorations, lawn equipment, kids\' toys — it adds up fast. A shed gives you breathing room.',
    },
    {
      icon: 'credit-card',
      heading: 'You\'re Paying for Storage',
      description: 'A storage unit in Missouri runs $45-$150/month — forever. A rent-to-own shed costs more per month, but you own it when you\'re done paying.',
    },
    {
      icon: 'heart',
      heading: 'You Want Your Own Space',
      description: 'She-sheds, man caves, art studios, home offices — more people are using sheds as a personal retreat on their own property.',
    },
  ],

  // CONSIDERATIONS
  considerationsTagline: 'Before You Buy',
  considerationsHeading: '7 Things to Think About Before Buying a Shed',
  considerationsSubheading: 'These are the questions most people don\'t think about until it\'s too late. Save yourself the headache.',
  considerations: [
    {
      number: '01',
      heading: 'What Will You Use It For?',
      description: 'Storage only? Workshop? Home office? Your intended use affects the size, wall height, flooring, electrical, and insulation you\'ll need. Start here.',
    },
    {
      number: '02',
      heading: 'What Size Do You Actually Need?',
      description: 'Most people underestimate. A good rule: figure out what you need, then go one size up. You\'ll fill it. See our size guide below.',
    },
    {
      number: '03',
      heading: 'Where Will It Go?',
      description: 'You need a level spot with good drainage. Check your local zoning — most areas allow sheds under a certain size without a permit, but rules vary by county.',
    },
    {
      number: '04',
      heading: 'Site Prep and Access',
      description: 'The delivery truck needs a clear path at least 2 feet wider than your building. The site should be level (or close). Gravel pads work great. We can help you figure this out.',
    },
    {
      number: '05',
      heading: 'Materials Matter',
      description: 'Wood siding lasts longer and looks better. Metal siding costs less. Flooring matters too — Advantech won\'t warp or swell like OSB. Ask what\'s standard vs. upgrade.',
    },
    {
      number: '06',
      heading: 'How Will You Pay?',
      description: 'Cash, financing, or rent-to-own are the three main options. Rent-to-own requires no credit check. Financing often gets you a lower total cost. Know your options.',
    },
    {
      number: '07',
      heading: 'Warranty and Reputation',
      description: 'Ask about the roof warranty, siding warranty, and structural warranty. Read Google reviews. Visit the lot if you can. A shed should last 15-25+ years.',
    },
  ],

  // COMPARISON
  comparisonTagline: 'Compare Your Options',
  comparisonHeading: 'Storage Shed vs. Storage Unit vs. Garage Addition',
  comparisonSubheading: 'Here\'s how the three most common storage solutions stack up side by side.',
  comparisonItems: [
    {
      option: 'Storage Shed',
      monthlyCost: '$150-$500+ RTO',
      ownership: 'You own it',
      access: '24/7 — it\'s on your property',
      customizable: 'Fully — size, colors, doors, windows, electrical',
      verdict: 'Best long-term value. Pay it off, own it forever.',
    },
    {
      option: 'Storage Unit',
      monthlyCost: '$45-$150/mo',
      ownership: 'Never — you rent forever',
      access: 'Facility hours only',
      customizable: 'Not at all',
      verdict: 'Cheapest monthly, but you never own it and prices go up every year.',
    },
    {
      option: 'Garage Addition',
      monthlyCost: '$25K-$85K+ build',
      ownership: 'You own it',
      access: '24/7',
      customizable: 'Yes, but expensive',
      verdict: 'Great if you have the budget. Most people don\'t.',
    },
  ],

  // SIZE GUIDE
  sizeGuideTagline: 'Size Guide',
  sizeGuideHeading: 'What Size Shed Do You Need?',
  sizeGuideSubheading: 'Here\'s a quick guide to help you figure out what fits your stuff — and your property.',
  sizeGuideItems: [
    {
      size: '8×10',
      sqft: '80 sq ft',
      bestFor: 'Lawn mower, garden tools, a few bikes. Basic storage for a small yard.',
      image: cloudinaryImages.economyShed1,
    },
    {
      size: '10×16',
      sqft: '160 sq ft',
      bestFor: 'Everything above plus workbench space, power tools, and holiday storage.',
      image: cloudinaryImages.utilityShed1,
    },
    {
      size: '12×24',
      sqft: '288 sq ft',
      bestFor: 'Full workshop, riding mower, ATV, or small business inventory.',
      image: cloudinaryImages.utilityShed3,
    },
    {
      size: '14×32+',
      sqft: '448+ sq ft',
      bestFor: 'Garage alternative, tiny home shell, small equipment storage, serious workspace.',
      image: cloudinaryImages.loftedBarn1,
    },
  ],

  // COMMON MISTAKES
  mistakesTagline: 'Learn From Others',
  mistakesHeading: '5 Mistakes People Make When Buying a Shed',
  mistakesSubheading: 'We\'ve delivered over 1,000 buildings. Here\'s what we wish everyone knew upfront.',
  mistakes: [
    {
      mistake: 'Buying too small',
      tip: 'Go one size up from what you think you need. It costs a little more now but saves a lot of regret later.',
    },
    {
      mistake: 'Ignoring site prep',
      tip: 'A shed on uneven ground will settle unevenly, doors won\'t close right, and the floor will flex. Level the site first.',
    },
    {
      mistake: 'Only comparing price',
      tip: 'A $3,000 shed with OSB flooring and 24" stud spacing won\'t last like a $4,000 shed with Advantech and 16" studs. Ask what\'s behind the walls.',
    },
    {
      mistake: 'Forgetting about access',
      tip: 'Can a truck get to where you want the shed? Is there a fence, low-hanging branch, or narrow gate in the way? Measure the path.',
    },
    {
      mistake: 'Not checking local codes',
      tip: 'Most sheds under a certain size don\'t need a permit, but setback requirements (how far from property lines) still apply. Rules vary by county — call your local office.',
    },
  ],

  // FAQ
  faqTagline: 'Good Questions',
  faqHeading: 'Frequently Asked Questions',
  faqItems: [
    {
      question: 'Do I need a permit for a shed?',
      answer: 'In most areas, sheds under a certain size don\'t require a building permit — but the threshold varies by county. Setback rules (distance from property lines, easements) still apply regardless of size. Check with your county or city building department to be safe.',
    },
    {
      question: 'How long does a shed last?',
      answer: 'A well-built shed with quality materials should last 15-25+ years with minimal maintenance. The roof, siding material, and flooring are the biggest factors. Metal roofs last 40+ years. Wood siding needs occasional repainting.',
    },
    {
      question: 'Can I put a shed on dirt or grass?',
      answer: 'Technically yes, but we don\'t recommend it. Moisture will come up from the ground and shorten the life of your floor. A gravel pad is the best foundation — it drains well and keeps the building level.',
    },
    {
      question: 'What\'s the difference between rent-to-own and financing?',
      answer: 'Rent-to-own requires no credit check and you can return the building if your situation changes. Financing typically has a lower total cost but requires a credit application. Both let you pay monthly.',
    },
    {
      question: 'Can I add electrical later?',
      answer: 'Yes, but it\'s easier and cheaper to add it during the build. Running wiring after the walls are up means opening up and patching walls. If you think you might want electrical, get it upfront.',
    },
    {
      question: 'How is the shed delivered?',
      answer: 'We deliver on a specialized trailer and place it exactly where you want it on your property. We need a clear path at least 2 feet wider than the building and a relatively level site. Setup is included with delivery.',
    },
  ],

  // GALLERY
  galleryTagline: 'See What\'s Possible',
  galleryHeading: 'Real Buildings on Real Properties',
  gallerySubheading: 'Every building here was designed by the customer, built by our team, and delivered to their property.',
  galleryImages: [
    { src: cloudinaryImages.utilityShed1, alt: 'Traditional A-Frame shed — gray with white trim' },
    { src: cloudinaryImages.loftedBarn1, alt: 'Lofted barn — extra overhead storage' },
    { src: cloudinaryImages.sideUtility1, alt: 'Side entry utility shed' },
    { src: cloudinaryImages.budgetProUtility, alt: 'Budget Pro utility shed' },
    { src: cloudinaryImages.utilityShed2, alt: 'Traditional A-Frame — tan' },
    { src: cloudinaryImages.loftedBarn2, alt: 'Lofted barn — dark gray' },
  ],

  // SOFT CTA
  ctaHeading: 'Ready to Start Comparing?',
  ctaDescription: 'Now that you know what to look for, see how Summit builds differently — and why it matters 10 years from now.',
  ctaButtonText: 'See Why Summit Is Different',
  ctaButtonLink: '/why-summit',
  ctaSecondaryText: 'Or Jump Straight to the 3D Designer',
  ctaSecondaryLink: 'https://summitbuildings.shedpro.co/',

  // CONTACT
  contactPhoneNumber: '(573) 747-4700',
  contactAddress1: '7336 State Highway 32',
  contactAddress2: 'Farmington, MO 63640',
  contactHours1: 'Mon - Fri: 9am - 5pm',
  contactHours2: 'Sat: 9am - 2pm',
};
