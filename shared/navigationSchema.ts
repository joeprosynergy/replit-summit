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
  /** Non-clickable label row inside a dropdown */
  isGroupLabel?: boolean;
  children?: NavLink[];
}

export const NAV_CONFIG_VERSION = 2;

export interface FooterSection {
  id: string;
  title: string;
  links: NavLink[];
}

export interface HeaderConfig {
  logoImage: string;
  logoAlt: string;
  navLinks: NavLink[];
  /** Bump when header structure changes; CMS below this uses code defaults */
  navVersion?: number;
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
  logoImage: 'https://res.cloudinary.com/dwhwbbbev/image/upload/f_auto,q_auto,w_200/summit-buildings/summit-logo',
  logoAlt: 'Summit Portable Buildings',
  navVersion: NAV_CONFIG_VERSION,
  navLinks: [
    {
      id: 'building-styles',
      label: 'Building Styles',
      href: '/styles',
      isRoute: true,
      children: [
        { id: 'all-styles', label: 'All Building Styles', href: '/styles', isRoute: true },
        { id: 'group-roof', label: 'Roof styles', href: '#', isGroupLabel: true },
        { id: 'utility', label: 'Utility (A-Frame)', href: '/styles/utility', isRoute: true },
        { id: 'barn', label: 'Barn (Gambrel)', href: '/styles/barn', isRoute: true },
        { id: 'modern', label: 'Modern (Single Slope)', href: '/styles/modern', isRoute: true },
        { id: 'group-specialty', label: 'Specialty', href: '#', isGroupLabel: true },
        { id: 'greenhouse', label: 'Greenhouse', href: '/styles/greenhouse', isRoute: true },
        { id: 'animal-shelters', label: 'Animal Shelters', href: '/styles/animal-shelters', isRoute: true },
      ],
    },
    { id: 'rent-to-own', label: 'Rent to Own', href: '/rent-to-own', isRoute: true },
    {
      id: 'inventory',
      label: 'See Inventory',
      href: 'https://summitportablebuildings.shedsuite.com',
      isExternal: true,
    },
    {
      id: 'about',
      label: 'About',
      href: '/about-us',
      isRoute: true,
      children: [
        { id: 'about-us', label: 'About Us', href: '/about-us', isRoute: true },
        { id: 'buyers-guide', label: 'Buyers Guide', href: '/buyers-guide', isRoute: true },
        { id: 'gallery', label: 'Gallery', href: '/gallery', isRoute: true },
        { id: 'contact-us', label: 'Contact Us', href: '/contact-us', isRoute: true },
      ],
    },
  ],
  ctaPhone: 'tel:5737474700',
  ctaPhoneDisplay: '573-747-4700',
  ctaButtonText: 'Design Your Shed',
  ctaButtonLink: 'https://summitbuildings.shedpro.co/',
  ctaButtonIsRoute: false,
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
        { id: 'rent-to-own', label: 'Rent-to-Own', href: '/rent-to-own', isRoute: true },
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
  ctaPhoneDisplay: '573-747-4700',
  button1Text: 'Browse Inventory',
  button1Link: 'https://lotline-rose.vercel.app/t/summit/inventory',
  button1IsExternal: true,
  button2Text: 'Design Now',
  button2Link: 'https://summitbuildings.shedpro.co/',
  button2IsExternal: true,
  copyrightText: `© ${new Date().getFullYear()} Summit Portable Buildings. All rights reserved.`,
};

/** Hash URLs are not indexable. Point Rent to Own at the dedicated page. */
export function canonicalNavHref(href: string): string {
  if (typeof href !== "string") return href;
  const path = href.replace(/^https?:\/\/(www\.)?summitbuildings\.com/i, "");
  if (path === "/financing#rent-to-own" || path.startsWith("/financing#rent-to-own?")) {
    return "/rent-to-own";
  }
  return href;
}

export function remapNavLinks(links: NavLink[] | undefined): NavLink[] {
  if (!Array.isArray(links)) return [];
  return links.map((link) => ({
    ...link,
    href: canonicalNavHref(link.href),
    children: link.children ? remapNavLinks(link.children) : undefined,
  }));
}

export function resolveFooterConfig(
  cmsConfig: FooterConfig | null | undefined
): FooterConfig {
  const base =
    cmsConfig && Array.isArray(cmsConfig.sections) && cmsConfig.sections.length > 0
      ? { ...defaultFooterConfig, ...cmsConfig }
      : defaultFooterConfig;
  return {
    ...base,
    sections: (base.sections || []).map((section) => ({
      ...section,
      links: remapNavLinks(section.links),
    })),
  };
}
