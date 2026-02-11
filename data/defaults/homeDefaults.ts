/**
 * Homepage Defaults
 * CMS-first architecture defaults for the homepage.
 * Consolidated from multiple section hooks into single source of truth.
 */

import { cloudinaryImages, IMAGES } from '@/lib/cloudinary';

export interface HomeContent {
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

  // === GUIDE SECTION ===
  guideTagline: string;
  guideHeading: string;
  guideParagraph1: string;
  guideParagraph2: string;
  guideParagraph3: string;
  guideParagraph4: string;
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
  productsLinkText: string;
  productsStyles: Array<{
    id: string;
    name: string;
    subtitle: string;
    image: string;
    link: string;
    openInNewTab: boolean;
  }>;

  // === IMAGINE SECTION ===
  imagineTagline: string;
  imagineHeading: string;
  imagineSubheading: string;
  imagineBenefits: string[];

  // === CTA BANNER SECTION ===
  ctaBannerBadge: string;
  ctaBannerHeading: string;
  ctaBannerDescription1: string;
  ctaBannerDescription2: string;
  ctaBannerClosingText: string;
  ctaBannerButton: string;
  ctaBannerButtonLink: string;
  ctaBannerButtonOpenInNewTab: boolean;
  ctaBannerPhoneNumber: string;

  // === TESTIMONIALS SECTION ===
  testimonialsTagline: string;
  testimonialsHeading: string;
  testimonialsSubheading: string;

  // === LOCATIONS SECTION ===
  locationsTagline: string;
  locationsHeading: string;
  locationsSubheading: string;
  locationsStates: Array<{ state: string; abbrev: string; cities: string[] }>;
  locationsFooterNote: string;
  locationsCtaHeading: string;
  locationsCtaDescription: string;
  locationsCtaButton: string;
  locationsCtaButtonLink: string;
  locationsCtaButtonOpenInNewTab: boolean;
  locationsSecondaryButton: string;
  locationsSecondaryButtonLink: string;
  locationsSecondaryButtonOpenInNewTab: boolean;
  locationsPhoneText: string;

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

export const homeDefaults: HomeContent = {
  // === META & SEO ===
  metaTitle: 'Summit Portable Buildings | Built The Old Fashioned Way',
  metaDescription: 'Affordable, high quality, hand crafted, storage buildings built in the USA. Serving Missouri, Illinois, Kentucky, and Arkansas.',

  // === HERO SECTION ===
  heroTagline: 'Summit Portable Buildings',
  heroHeading: 'Get the Storage Space You Need Without the Hassle',
  heroSubheading: 'Custom storage buildings designed for your property, built by craftsmen, delivered to your door.',
  heroCtaDescription: 'Design your perfect shed online in minutes and we\'ll handle the rest.',
  heroButton1Text: 'Design Your Shed Now',
  heroButton1Link: '/3d-configurator',
  heroButton1OpenInNewTab: false,
  heroButton2Text: 'Get Free Buying Guide',
  heroButton2Link: '/buyers-guide',
  heroButton2OpenInNewTab: false,
  heroServiceText: 'Serving Missouri, Illinois, Kentucky & Arkansas since 2016',
  heroBadges: [
    { icon: 'truck', label: 'Free Delivery (50mi)' },
    { icon: 'credit-card', label: 'No Credit Check Financing' },
    { icon: 'shield', label: '5-Year Warranty' },
  ],

  // === STAKES SECTION ===
  stakesTagline: 'We Understand',
  stakesHeading: 'Running Out of Space is Frustrating',
  stakesSubheading: 'You\'ve got equipment, tools, and belongings piling up with nowhere to put them.',
  stakesPainPoints: [
    {
      title: 'Stuff Everywhere',
      description: 'Your garage is packed. The basement is full. Expensive equipment sits outside getting damaged by weather.',
    },
    {
      title: 'Feeling Overwhelmed',
      description: 'You\'re stressed about the clutter. Every time you look at the mess, you feel like you\'re falling behind.',
    },
    {
      title: 'Cheap Sheds Fall Apart',
      description: 'You shouldn\'t have to choose between affordable and quality. Cookie-cutter box store sheds just don\'t last.',
    },
  ],
  stakesClosingText: 'You deserve a storage solution that actually works.',

  // === GUIDE SECTION ===
  guideTagline: 'Your Guide',
  guideHeading: 'We\'ve Helped Hundreds of Families Get Organized',
  guideParagraph1: 'We get it.',
  guideParagraph2: 'Finding quality storage that fits your property and budget feels impossible. Big box stores sell junk that falls apart. Custom builds cost a fortune.',
  guideParagraph3: 'We\'re Summit Portable Buildings, a family-owned company that\'s been building storage solutions the right way since 2016. We\'ve helped over 1,000 families across four states get the space they need without the headaches.',
  guideParagraph4: 'Every building is hand-crafted by skilled craftsmen right here in the USA using premium materials that last for generations, not years.',
  guideStats: [
    { value: '8+', label: 'Years Experience' },
    { value: '4', label: 'States Served' },
    { value: '1000+', label: 'Buildings Delivered' },
    { value: '5', label: 'Year Warranty' },
  ],
  guideCredentials: [
    { icon: 'home', label: 'Family Owned', sublabel: 'Since 2016' },
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
      description: 'Our craftsmen hand-build your shed using premium materials. Every building is inspected for quality.',
    },
    {
      title: 'We Deliver & Setup',
      description: 'We deliver to your property and set it up, leveled and ready to use. Free within 50 miles.',
    },
  ],
  howItWorksButtonText: 'Start Designing Your Shed',
  howItWorksButtonLink: 'https://summitbuildings.shedpro.co/',
  howItWorksButtonOpenInNewTab: true,

  // === PRODUCTS SECTION ===
  productsTagline: 'Find Your Perfect Style',
  productsHeading: 'Choose Your Style',
  productsSubheading: 'Select a roof style to explore available options',
  productsSectionTitle: 'Building Styles',
  productsLinkText: 'View All Building Styles →',
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

  // === IMAGINE SECTION ===
  imagineTagline: 'Imagine This',
  imagineHeading: 'What Life Looks Like With the Right Storage',
  imagineSubheading: 'Picture walking into your garage and actually having room. Your lawn equipment has a home. Your tools are organized. Everything has its place.',
  imagineBenefits: [
    'A clean, organized garage you can actually park in',
    'Expensive tools and equipment protected from weather',
    'A dedicated workshop or hobby space of your own',
    'Increased property value with an attractive building',
    'Peace of mind knowing your belongings are secure',
    'A building that will last for decades, not years',
  ],

  // === CTA BANNER SECTION ===
  ctaBannerBadge: 'Don\'t Wait',
  ctaBannerHeading: 'Don\'t Let Clutter Take Over Your Property',
  ctaBannerDescription1: 'Every month you wait, the problem gets worse. Equipment rusts in the rain. The garage gets more packed. The stress builds.',
  ctaBannerDescription2: 'That cheap shed from the box store? It\'ll be falling apart in 5 years while you wish you\'d invested in quality.',
  ctaBannerClosingText: 'You\'ve worked too hard to settle for less than you deserve.',
  ctaBannerButton: 'Design Your Shed',
  ctaBannerButtonLink: 'https://summitbuildings.shedpro.co/',
  ctaBannerButtonOpenInNewTab: true,
  ctaBannerPhoneNumber: '573-747-4700',

  // === TESTIMONIALS SECTION ===
  testimonialsTagline: 'Success Stories',
  testimonialsHeading: 'Real Families. Real Results.',
  testimonialsSubheading: 'See how Summit Buildings helped these homeowners solve their storage problems.',

  // === LOCATIONS SECTION ===
  locationsTagline: 'Service Areas',
  locationsHeading: 'Proudly Serving 4 States',
  locationsSubheading: 'We deliver and set up buildings throughout Missouri, Illinois, Kentucky, and Arkansas. Free delivery within 50 miles.',
  locationsStates: [
    { state: 'Missouri', abbrev: 'MO', cities: ['St. Louis Area', 'Farmington', 'Cape Girardeau', 'Rolla', 'Poplar Bluff', 'Sikeston'] },
    { state: 'Illinois', abbrev: 'IL', cities: ['Metropolis', 'Carbondale', 'Vienna', 'Anna', 'Chester', 'Red Bud'] },
    { state: 'Kentucky', abbrev: 'KY', cities: ['Paducah', 'Murray', 'Mayfield', 'Benton', 'Wickliffe', 'Bardwell'] },
    { state: 'Arkansas', abbrev: 'AR', cities: ['Northeast Arkansas', 'Jonesboro Area'] },
  ],
  locationsFooterNote: 'Don\'t see your area listed? Contact us to check delivery availability.',
  locationsCtaHeading: 'Ready to Get Organized?',
  locationsCtaDescription: 'Stop letting clutter control your life. Design your custom shed in minutes and take the first step toward a more organized property.',
  locationsCtaButton: 'Design Your Shed Now',
  locationsCtaButtonLink: 'https://summitbuildings.shedpro.co/',
  locationsCtaButtonOpenInNewTab: true,
  locationsSecondaryButton: 'Get Free Buying Guide',
  locationsSecondaryButtonLink: '/buyers-guide',
  locationsSecondaryButtonOpenInNewTab: false,
  locationsPhoneText: 'Questions? Call us at',

  // === CONTACT SECTION ===
  contactTagline: 'Get In Touch',
  contactHeading: 'Request a Quote',
  contactSubheading: 'Have questions? Ready to get started? Fill out the form below and we\'ll get back to you promptly.',
  contactCallTitle: 'Call Us',
  contactPhoneNumber: '(573) 747-4700',
  contactLocationTitle: 'Main Location',
  contactAddress1: '7336 State Highway 32',
  contactAddress2: 'Farmington, MO 63640',
  contactHoursTitle: 'Hours',
  contactHours1: 'Mon - Fri: 8am - 5pm',
  contactHours2: 'Sat: 9am - 3pm',
};
