export interface HowItWorksStep {
  id: string;
  step: string;
  title: string;
  description: string;
}

export interface FinancingContent {
  // Page metadata
  metaTitle: string;
  metaDescription: string;
  
  // Hero section
  hero: {
    badge: string;
    heading: string;
    description: string;
    highlight: string;
    button1Text: string;
    button1Link: string;
    button1OpenInNewTab: boolean;
    button2Text: string;
    button2Link: string;
    button2OpenInNewTab: boolean;
  };
  
  // How it works section
  howItWorks: {
    heading: string;
    steps: HowItWorksStep[];
  };
  
  // Rent to own section
  rentToOwn: {
    badge: string;
    heading: string;
    description: string;
    benefits: string[];
    card1Title: string;
    card1Description: string;
    card2Title: string;
    card2Description: string;
    card3Title: string;
    card3Description: string;
    card4Title: string;
    card4Description: string;
    downPaymentHeading: string;
    term24_36Title: string;
    term24_36Description: string;
    term24_36Note: string;
    term48_60Title: string;
    term48_60Description: string;
    term48_60Note: string;
    customNote: string;
    benefitsHeading: string;
    buttonText: string;
    buttonLink: string;
    buttonOpenInNewTab: boolean;
  };
  
  // Financing cards section
  financingCards: {
    card1Title: string;
    card1Value: string;
    card1Subtitle: string;
    card2Title: string;
    card2Value: string;
    card2Subtitle: string;
    card3Title: string;
    card3Value: string;
    card3Subtitle: string;
  };
  
  // Financing section
  financing: {
    badge: string;
    heading: string;
    description: string;
    benefits: string[];
    applyText: string;
    buttonText: string;
    buttonLink: string;
    buttonOpenInNewTab: boolean;
  };
  
  // CTA section
  cta: {
    heading: string;
    description: string;
    button1Text: string;
    button1Link: string;
    button1OpenInNewTab: boolean;
    button2Text: string;
    button2Link: string;
    button2OpenInNewTab: boolean;
    button3Text: string;
    button3Link: string;
    button3OpenInNewTab: boolean;
  };
}

export const financingDefaults: FinancingContent = {
  // Page metadata
  metaTitle: 'Financing & Rent to Own | Summit Portable Buildings',
  metaDescription: 'Flexible payment options for your storage building. Rent to Own with no credit check or financing with rates as low as 9.99%. Apply today!',
  
  // Hero section
  hero: {
    badge: 'Flexible Payment Options',
    heading: 'Rent to Own or Finance Your Building',
    description: 'No credit check required for Rent to Own. Financing available with approved credit.',
    highlight: 'No Early Payoff Penalties on Either Option!',
    button1Text: 'Rent to Own',
    button1Link: '#rent-to-own',
    button1OpenInNewTab: false,
    button2Text: 'Apply for Financing',
    button2Link: '#financing',
    button2OpenInNewTab: false,
  },
  
  // How it works section
  howItWorks: {
    heading: 'How It Works',
    steps: [
      { id: '1', step: '01', title: 'Select A Building', description: 'Select what you want to buy from our wide range of storage buildings, cabins, and garages.' },
      { id: '2', step: '02', title: 'Choose Your Option', description: 'Select Rent to Own (no credit check) or Financing (with approved credit).' },
      { id: '3', step: '03', title: 'Easy Approval', description: 'Rent to Own requires no credit check. Financing gets quick approval with Upgrade.' },
      { id: '4', step: '04', title: 'You Own It', description: 'Own it at the end of your term with flexible payments that fit your budget.' },
    ],
  },
  
  // Rent to own section
  rentToOwn: {
    badge: 'No Credit Check Required',
    heading: 'Rent to Own',
    description: 'Rent to Own is simply a rent payment each month that allows you to have a storage shed, garage, cabin, animal shelter, dog kennel or swing set for your backyard or business, when and where you need it. Once you make the last payment, ownership transfers to you!',
    benefits: [
      '90 Days Same as Cash',
      'No Credit Check - We Do Not Report to Credit Agencies',
      'Choose a monthly term and payment that works for you',
      'Pay a small down payment to have your building delivered',
      'Free Delivery and Setup of your building',
      'No early pay-off penalties',
      'Financial Hardship? Just call and we will pick up the building with no effect on your credit',
      'Own the structure at the end of the rental contract',
      'Save time & fuel - have storage in your own backyard',
      'Own it for life after the Contract is fulfilled',
      'Adds value to your home and property',
      'Portable - can be moved',
      '24, 36, 48, and 60 month terms available',
      'Pay Online - Set up automatic ACH, Debit Card or Credit Card payments',
    ],
    card1Title: '90 Days Same as Cash',
    card1Description: 'Pay off your building within 90 days and pay no additional rental fees - just the cash price!',
    card2Title: 'No Credit Check',
    card2Description: 'We do not run credit checks and do not report to credit agencies. Your credit score is not affected.',
    card3Title: 'Free Delivery & Setup',
    card3Description: 'Your building is delivered and set up at no extra charge within our delivery area.',
    card4Title: 'No Questions Asked Return',
    card4Description: 'Financial hardship? Just call and we will pick up the building at anytime with no effect on your credit score.',
    downPaymentHeading: 'Down Payment Requirements',
    term24_36Title: '24 & 36 Month Terms',
    term24_36Description: 'Only require first month\'s rent at time of sale',
    term24_36Note: '(For buildings up to $14,999)',
    term48_60Title: '48 & 60 Month Terms',
    term48_60Description: 'Require 2 months\' rent at time of sale',
    term48_60Note: '(For buildings up to $14,999)',
    customNote: 'Custom down payment required for buildings over $15,000. Contact a Sales Rep for more info.',
    benefitsHeading: 'Key Benefits',
    buttonText: 'Contact Us About Rent to Own',
    buttonLink: '/contact-us',
    buttonOpenInNewTab: false,
  },
  
  // Financing cards section
  financingCards: {
    card1Title: 'Rates as Low as',
    card1Value: '9.99%',
    card1Subtitle: 'with approved credit',
    card2Title: '100% Financing',
    card2Value: 'Available',
    card2Subtitle: 'with approved credit',
    card3Title: 'Term Options',
    card3Value: '12-48',
    card3Subtitle: 'month terms available',
  },
  
  // Financing section
  financing: {
    badge: 'With Approved Credit',
    heading: 'Financing Through Upgrade',
    description: 'Summit Portable Buildings also offers financing provided by Upgrade. This is a standard installment loan agreement with approved credit - get 100% financing with rates as low as 9.99%.',
    benefits: [
      '100% financing available with approved credit',
      'Rates as low as 9.99% with approved credit',
      'Choose from 12, 24, 36, & 48 month terms',
      '5 easy payment options: online, phone, auto draft, mail, or call a rep',
      'No early pay-off penalties',
      'Quick Approval process',
    ],
    applyText: 'Find out if you\'re approved NOW by clicking the button below!',
    buttonText: 'Apply for Financing Now',
    buttonLink: 'https://upgrade.com/h/6lFlFMgaJZ',
    buttonOpenInNewTab: true,
  },
  
  // CTA section
  cta: {
    heading: 'Ready to Get Started?',
    description: 'Whether you choose Rent to Own or Financing, we\'re here to help you get the perfect storage building for your needs.',
    button1Text: 'Build Your Own',
    button1Link: 'https://summitbuildings.shedpro.co/',
    button1OpenInNewTab: true,
    button2Text: 'Browse Our Inventory',
    button2Link: '/inventory',
    button2OpenInNewTab: false,
    button3Text: 'Contact Us',
    button3Link: '/contact-us',
    button3OpenInNewTab: false,
  },
};
