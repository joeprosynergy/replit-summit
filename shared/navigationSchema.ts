/**
 * Navigation Schema
 * TypeScript interfaces for header and footer navigation structure
 * Stored in CMS as 'global-header' and 'global-footer' slugs
 */

export interface NavLink {
  id: string;
  label: string;
  href: string;
  isExternal?: boolean;
  isRoute?: boolean;
  disabled?: boolean;
}

export interface FooterSection {
  id: string;
  title: string;
  links: NavLink[];
}

export interface HeaderConfig {
  logoImage: string;
  logoAlt: string;
  navLinks: NavLink[];
  ctaPhone: string;
  ctaPhoneDisplay: string; // formatted for display
  ctaButtonText: string;
  ctaButtonLink: string;
  ctaButtonIsRoute?: boolean;
}

export interface FooterConfig {
  bannerHeading: string;
  sections: FooterSection[];
  ctaHeading: string;
  ctaPhone: string;
  ctaPhoneDisplay: string; // formatted for display
  button1Text: string;
  button1Link: string;
  button1IsExternal?: boolean;
  button2Text: string;
  button2Link: string;
  button2IsExternal?: boolean;
  copyrightText: string;
}

// Default header configuration (extracted from current Header.tsx)
export const defaultHeaderConfig: HeaderConfig = {
  logoImage: 'https://res.cloudinary.com/dmbzcxslt/image/upload/v1734462395/summit-logo_qfbfod.png',
  logoAlt: 'Summit Portable Buildings',
  navLinks: [
    { id: 'about-us', label: 'About Us', href: '/about-us', isRoute: true },
    { id: 'building-styles', label: 'Building Styles', href: '/styles', isRoute: true },
    { id: 'inventory', label: 'See Inventory', href: '/inventory', isRoute: true },
    { id: 'contact-us', label: 'Contact Us', href: '/contact-us', isRoute: true },
  ],
  ctaPhone: 'tel:5737474700',
  ctaPhoneDisplay: '573-747-4700',
  ctaButtonText: 'Design Your Shed',
  ctaButtonLink: '/3d-configurator',
  ctaButtonIsRoute: true,
};

// Default footer configuration (extracted from current Footer.tsx)
export const defaultFooterConfig: FooterConfig = {
  bannerHeading: 'Find Your Perfect Portable Building Today',
  sections: [
    {
      id: 'explore-by-use',
      title: 'Explore by Use',
      links: [
        { id: 'basic-storage', label: 'Basic Storage', href: '/types/basic-storage', isRoute: true },
        { id: 'deluxe-cabins', label: 'Deluxe & Cabins', href: '/types/deluxe-storage-cabins', isRoute: true },
        { id: 'garages-carports', label: 'Garages & Carports', href: '/types/garages-carports', isRoute: true },
        { id: 'greenhouse', label: 'Greenhouse', href: '/styles/greenhouse', isRoute: true },
        { id: 'animal-shelters', label: 'Animal Shelters', href: '/styles/animal-shelters', isRoute: true },
      ],
    },
    {
      id: 'explore-by-style',
      title: 'Explore by Style',
      links: [
        { id: 'traditional', label: 'Traditional A-Frame Sheds', href: '/traditional-sheds', isRoute: true },
        { id: 'utility', label: 'Utility (Traditional A-Frame)', href: '/styles/utility', isRoute: true },
        { id: 'barn', label: 'Barn (Gambrel Roof)', href: '/styles/barn', isRoute: true },
        { id: 'modern', label: 'Modern (Single Slope)', href: '/styles/modern', isRoute: true },
        { id: 'custom-sheds', label: 'Custom Sheds', href: '#', disabled: true },
        { id: 'wooden-sheds', label: 'Wooden Sheds', href: '#', disabled: true },
        { id: 'metal-sheds', label: 'Metal Sheds', href: '#', disabled: true },
        { id: 'backyard-sheds', label: 'Backyard Sheds', href: '#', disabled: true },
      ],
    },
    {
      id: 'resources',
      title: 'Resources',
      links: [
        { id: 'faqs', label: "FAQ's", href: '/contact-us#faq', isRoute: true },
        { id: 'buyers-guide', label: 'Buyers Guide', href: '/buyers-guide', isRoute: true },
        { id: 'gallery', label: 'Gallery', href: '/gallery', isRoute: true },
        { id: 'financing', label: 'Financing', href: '/financing', isRoute: true },
        { id: 'rent-to-own', label: 'Rent-to-Own', href: '/financing#rent-to-own', isRoute: true },
        { id: 'warranty', label: 'Warranty Info', href: '#', disabled: true },
      ],
    },
    {
      id: 'about',
      title: 'About',
      links: [
        { id: 'home', label: 'Home', href: '/', isRoute: true },
        { id: 'about', label: 'About Us', href: '/about-us', isRoute: true },
        { id: 'blog', label: 'Blog', href: 'https://summitbuildings.superblog.click', isExternal: true },
        { id: 'contact', label: 'Contact', href: '/contact-us', isRoute: true },
        { id: 'privacy', label: 'Privacy Policy', href: '/privacy-policy', isRoute: true },
      ],
    },
    {
      id: 'locations',
      title: 'Where We Deliver',
      links: [
        { id: 'missouri', label: 'Missouri', href: '/#locations', isRoute: true },
        { id: 'illinois', label: 'Illinois', href: '/#locations', isRoute: true },
        { id: 'kentucky', label: 'Kentucky', href: '/#locations', isRoute: true },
        { id: 'arkansas', label: 'Arkansas', href: '/#locations', isRoute: true },
      ],
    },
  ],
  ctaHeading: 'Get the building of your dreams',
  ctaPhone: 'tel:5737474700',
  ctaPhoneDisplay: '(573) 747-4700',
  button1Text: 'Browse Inventory',
  button1Link: '/inventory',
  button1IsExternal: false,
  button2Text: 'Design Now',
  button2Link: 'https://summitbuildings.shedpro.co/',
  button2IsExternal: true,
  copyrightText: `© ${new Date().getFullYear()} Summit Portable Buildings. All rights reserved. Built in the USA with pride.`,
};
