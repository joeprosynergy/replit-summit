/**
 * AboutUs Page - Default Content
 * Extracted from original AboutUs.tsx for CMS-first architecture
 */

export interface ValueItem {
  id: string;
  icon: string;
  title: string;
  description: string;
}

export interface AboutUsContent {
  // Meta
  metaTitle: string;
  metaDescription: string;
  
  // Hero Section
  heroTagline: string;
  heroHeading: string;
  heroHeadingHighlight: string;
  heroSubheading: string;
  
  // Mission Section
  missionTagline: string;
  missionHeading: string;
  missionDescription: string;
  
  // Family Owned Section
  familyTagline: string;
  familyHeading: string;
  familyParagraph1: string;
  familyParagraph2: string;
  familyBoxTitle: string;
  familyBoxDescription: string;
  
  // Values Section
  valuesTagline: string;
  valuesHeading: string;
  valuesSubheading: string;
  values: ValueItem[];
  
  // Craftsmen Section
  craftsmenTagline: string;
  craftsmenHeading: string;
  craftsmenDescription: string;
  features: string[];
  
  // Service Areas Section
  serviceAreasTagline: string;
  serviceAreasHeading: string;
  serviceAreasSubheading: string;
  missouriAreas: string;
  illinoisAreas: string;
  kentuckyAreas: string;
  
  // CTA Section
  ctaHeading: string;
  ctaDescription: string;
  ctaButtonText: string;
  ctaButtonLink: string;
  ctaButtonOpenInNewTab: boolean;
}

export const aboutUsDefaults: AboutUsContent = {
  // Meta
  metaTitle: "About Us | Summit Portable Buildings",
  metaDescription: "Learn about Summit Portable Buildings - a faith-based, family-owned business committed to excellence in building quality storage structures the old fashioned way.",
  
  // Hero Section
  heroTagline: "About Summit Buildings",
  heroHeading: "Building Quality Structures",
  heroHeadingHighlight: "The Old Fashioned Way",
  heroSubheading: "A family owned business that continues to strive for excellence & customer satisfaction.",
  
  // Mission Section
  missionTagline: "Our Mission",
  missionHeading: "To Build Storage Structures That Serve Our Neighbors",
  missionDescription: "We do this by building quality structures in our own shop, with customizable, high quality craftsmanship. Every building is constructed from the ground up—unlike factory-built buildings.",
  
  // Family Owned Section
  familyTagline: "Family Owned",
  familyHeading: "We Understand Your Storage Challenges",
  familyParagraph1: "With experience in Construction & Sales, we incorporate that expertise into each of our products. We've been helping customers with solutions to their needs by customizing Backyard Portable Offices, Storage Sheds, Portable Garages, Utility Buildings, Lofted Barns and Cabins, Tiny House Shells, and other styles.",
  familyParagraph2: "We construct various attractive, affordable, quality, hand-crafted, and durable Storage Buildings the old fashioned way—built from the ground up with care and attention to detail.",
  familyBoxTitle: "The Old Fashioned Way",
  familyBoxDescription: "Unlike factory-built buildings, we construct each structure from the ground up with skilled craftsmen who take pride in their work. Quality you can trust, built to last.",
  
  // Values Section
  valuesTagline: "What We Stand For",
  valuesHeading: "Our Values",
  valuesSubheading: "The principles that guide everything we do",
  values: [
    { id: 'faith', icon: 'Heart', title: 'Faith Based', description: "We believe in Someone Greater than ourselves. We promise to do all to the best of our ability and in an ethical manner from the sale to the delivery of your product." },
    { id: 'excellence', icon: 'Star', title: 'Excellence', description: "We strive to be the best at what we do, leading the way to excellence. Customer Service and taking care of the people we serve is the key to a successful business." },
    { id: 'responsibility', icon: 'Shield', title: 'Responsibility', description: "We desire to operate to the highest ethical & professional standards. We strive to earn your trust through honesty and integrity." },
    { id: 'community', icon: 'Users', title: 'Community', description: "We believe in playing our part in the community where we operate. We believe in being an asset to our local community." },
    { id: 'teamwork', icon: 'HandHeart', title: 'Team Work', description: "Teamwork and Diversity are the foundations of our success. From Builder to Sales Member to Delivery Driver, each one is a special part of the puzzle." },
  ],
  
  // Craftsmen Section
  craftsmenTagline: "Quality Materials",
  craftsmenHeading: "Skilled Craftsmen, Premium Products",
  craftsmenDescription: "All of our buildings are built by skilled and experienced craftsmen. We are continually researching new and improved products to continue bringing our customers a quality building that is in fact the best money can buy: a Summit Building!",
  features: [
    "40/Yr. Metal Roof available in 11 attractive colors",
    "Vented Ridge standard on all Pro Series Buildings",
    "2″x6″ floor joists set into notched 4″ x 6″ ground skids for added strength",
    "5/8\" tongue-and-groove floors w/ 3/4\" Optional",
    "Commercial Truss Plated Rafters for maximum strength",
    "50 Year Limited Warranty on LP Smart Siding",
    "25 Year Limited Warranty Paint",
    "Heavy Duty Barrel Bolts and Keyed Door Locks",
    "Diamond Plated Thresholds on all openings",
  ],
  
  // Service Areas Section
  serviceAreasTagline: "Where We Serve",
  serviceAreasHeading: "Service Areas",
  serviceAreasSubheading: "Proudly serving communities across Missouri, Illinois, and Kentucky",
  missouriAreas: "Arnold, Fenton, Festus, Crystal City, Pevely, Herculaneum, Bloomsdale, High Ridge, House Springs, Cedar Hill, Saint Clair, Pacific, Eureka, Sullivan, Cuba, Rolla, Salem, Farmington, Cape Girardeau, Sikeston, and many more...",
  illinoisAreas: "Metropolis, Joppa, Vienna, Dongola, Anna, Jonesboro, Cobden, Carbondale, Murphysboro, Chester, Red Bud, and surrounding areas.",
  kentuckyAreas: "Mayfield, Murray, Benton, Paducah, and surrounding communities.",
  
  // CTA Section
  ctaHeading: "Ready to Get Started?",
  ctaDescription: "Contact us today for a free, no-obligation quote on your dream building.",
  ctaButtonText: "Get Your Free Quote",
  ctaButtonLink: "/contact-us",
  ctaButtonOpenInNewTab: false,
};
