/**
 * Product Page Types
 * Comprehensive types for the generic product page CMS system.
 * Supports all variations of product pages with CMS-editable content.
 */

// ============================================================================
// Siding & Color Options (CMS-Editable)
// ============================================================================

export interface ColorSwatch {
  // Option 1: Reference a global color by ID
  globalColorId?: string;
  
  // Option 2: Use custom local color (legacy/custom colors)
  name?: string;
  color?: string; // Hex color code
  image?: string; // Optional image URL
}

export interface SidingCategory {
  id: string;
  title: string; // e.g., "Paint Siding Options", "Metal Siding Options"
  colors: ColorSwatch[];
}

// ============================================================================
// Upgrade Options (CMS-Editable)
// ============================================================================

export interface UpgradeCategory {
  id: string;
  category: string; // e.g., "Doors", "Windows", "Flooring & Ramps"
  items: string[];
}

// ============================================================================
// Product Page Content Interface
// ============================================================================

export interface ProductPageContent {
  // === META & SEO ===
  metaTitle: string;
  metaDescription: string;
  canonicalUrl: string;

  // === HERO SECTION ===
  title: string; // e.g., "PRO -" or empty string
  titleHighlight: string; // e.g., "UTILITY SHED" or "GARAGE"
  titlePosition?: 'before' | 'after' | 'only'; // Position of highlight relative to title
  description: string;
  secondaryDescription?: string; // Some products have two paragraphs
  subtitle?: string; // e.g., "Sizes: 8×8 to 14×40" or "Starting at $29,717.89"
  heroImage: string;
  heroImageAlt: string;
  heroButton1Text: string;
  heroButton1Link: string;
  heroButton1OpenInNewTab: boolean;
  heroButton2Text: string;
  heroButton2Link: string;
  heroButton2OpenInNewTab: boolean;

  // === GALLERY SECTION ===
  // Dynamic gallery images (galleryImage1, galleryImage1Alt, galleryImage2, etc.)
  // These are accessed dynamically, not defined individually here
  galleryImages?: Array<{ src: string; alt: string }>;

  // === FEATURES SECTION ===
  featuresHeading: string; // e.g., "Built for" or "Built for Any Configuration"
  featuresHighlight?: string; // e.g., "Maximum Storage" (optional second part)
  featuresDescription: string;
  featureImage: string;
  featureImageAlt: string;
  featureBadge: string; // e.g., "Our Best Seller", "Infinitely Customizable"
  featuresCardTitle?: string; // e.g., "Summit Cabin Features" (defaults to product name + " Features")
  features: string[]; // Array of feature strings (dynamic length)
  featureNote?: string; // Optional note at bottom of features (e.g., "*8 foot wide models...")

  designButtonText: string;
  designButtonLink: string;
  designButtonOpenInNewTab: boolean;

  // === USES SECTION ===
  usesHeading: string; // e.g., "Perfect For Any Use"
  uses: string[]; // Array of use case strings
  usesNote?: string; // Optional note at bottom of uses section

  // === COLOR/SIDING OPTIONS SECTION ===
  colorHeading: string; // e.g., "COLOR AND MATERIAL OPTIONS"
  sidingCategories: SidingCategory[]; // CMS-editable siding/color options

  // === UPGRADES SECTION (Optional) ===
  showUpgradesSection: boolean;
  upgradeHeading?: string; // e.g., "Available Upgrades"
  upgradeCategories?: UpgradeCategory[]; // CMS-editable upgrade options

  // === IMPORTANT NOTES (Optional) ===
  showImportantNote: boolean;
  importantNote?: string;

  // === CTA SECTION ===
  ctaHeading: string;
  ctaDescription: string;
  ctaVariant?: 'gradient' | 'solid' | 'navy'; // Styling variant
  ctaPrimaryButton: string;
  ctaPrimaryButtonLink: string;
  ctaPrimaryButtonOpenInNewTab: boolean;
  ctaSecondaryButton: string;
  ctaSecondaryButtonLink: string;
  ctaSecondaryButtonOpenInNewTab: boolean;

  // === BACK PATH CONFIGURATION ===
  backPath: {
    defaultPath: string;
    defaultLabel: string;
    stylesPath?: string;
    stylesLabel?: string;
  };

  // Allow dynamic fields for gallery images (galleryImage1, galleryImage2, etc.)
  [key: string]: unknown;
}

// ============================================================================
// Product Page Configuration
// ============================================================================

export interface ProductPageConfig {
  slug: string; // CMS slug (e.g., "utility-shed", "pro-lofted-barn")
  productName: string; // Display name (e.g., "Pro - Utility Shed")
  
  // Section visibility
  showGallerySection: boolean;
  showFeaturesSection: boolean;
  showUsesSection: boolean;
  showSidingSection: boolean;
  showUpgradesSection: boolean;
  showImportantNote: boolean;
  
  // Layout options
  galleryColumns?: 2 | 3 | 4; // Number of columns in gallery grid
  featuresLayout?: 'side-by-side' | 'stacked'; // Layout of features section
  ctaVariant?: 'gradient' | 'solid' | 'navy';
  
  // Feature count range (for admin UI)
  maxFeatures?: number;
  maxUses?: number;
  maxGalleryImages?: number;
}

// ============================================================================
// Default Siding Options (can be overridden per product)
// ============================================================================

export const DEFAULT_PAINT_SIDING: ColorSwatch[] = [
  { name: 'Barn Red', color: '#6B2C2C' },
  { name: 'Black', color: '#2D2D2D' },
  { name: 'Buckskin', color: '#B89B6A' },
  { name: 'Burnished Slate', color: '#5A6165' },
  { name: 'Clay', color: '#A69B8C' },
  { name: 'Dark Brown', color: '#4A3728' },
  { name: 'GP Gray', color: '#8B8B8B' },
  { name: 'GP Tan', color: '#9B8B6B' },
  { name: 'Gray', color: '#7A7A7A' },
  { name: 'Shadow', color: '#C4BBA8' },
  { name: 'Martin Creme', color: '#D4C9A8' },
  { name: 'Mountain Red', color: '#8B3A3A' },
  { name: 'Navy Blue', color: '#2C4A6B' },
  { name: 'Quaker Tan', color: '#8B7355' },
  { name: 'Riehl Blue', color: '#4A6B7A' },
  { name: 'Riehl Green', color: '#3A5A3A' },
  { name: 'Wedgwood Blue', color: '#6A8A9A' },
  { name: 'White', color: '#E8E8E0' },
];

export const DEFAULT_METAL_SIDING: ColorSwatch[] = [
  { name: 'Alamo White', color: '#E5E5DC' },
  { name: 'Ash Gray', color: '#8B8B8B' },
  { name: 'Brilliant White', color: '#FFFFFF' },
  { name: 'Black', color: '#1A1A1A' },
  { name: 'Brite Red', color: '#C41E3A' },
  { name: 'Brown', color: '#5C4033' },
  { name: 'Buckskin Desert', color: '#C4A76C' },
  { name: 'Burgundy', color: '#722F37' },
  { name: 'Burnished Slate', color: '#5A6165' },
  { name: 'Charcoal', color: '#36454F' },
  { name: 'Forest Green', color: '#228B22' },
  { name: 'Galvalume', color: '#B8B8B0' },
  { name: 'Gallery Blue', color: '#4169E1' },
  { name: 'Hunter Green', color: '#355E3B' },
  { name: 'Ivory', color: '#FFFFF0' },
  { name: 'Light Stone', color: '#D4CFC4' },
  { name: 'Ocean', color: '#006994' },
  { name: 'Rustic', color: '#8B4513' },
  { name: 'Pewter', color: '#96A8A1' },
  { name: 'Tan', color: '#D2B48C' },
  { name: 'Taupe', color: '#483C32' },
];

export const DEFAULT_URETHANE_SIDING: ColorSwatch[] = [
  { name: 'Barnwood', color: '#6B5B4F' },
  { name: 'Butternut', color: '#C49B5F' },
  { name: 'Charcoal', color: '#36454F' },
  { name: 'Chestnut Brown', color: '#5C3317' },
  { name: 'Golden Wheat', color: '#C9A86C' },
  { name: 'Mahogany', color: '#4A2C2A' },
  { name: 'Natural Cedar', color: '#A87B5B' },
  { name: 'Natural Teak', color: '#8B7355' },
  { name: 'Redwood', color: '#8B4513' },
  { name: 'Sage', color: '#87AE73' },
];

export const DEFAULT_VINYL_SIDING: ColorSwatch[] = [
  { name: 'Beige', color: '#C8B89A' },
  { name: 'Cactus', color: '#5F7355' },
  { name: 'Champagne', color: '#E8DCC4' },
  { name: 'Cream', color: '#FFFDD0' },
  { name: 'Deep Water', color: '#354B5E' },
  { name: 'Fern', color: '#4F7942' },
  { name: 'Firebrick', color: '#B22222' },
  { name: 'Granite', color: '#676767' },
  { name: 'Graphite', color: '#383838' },
  { name: 'Khaki', color: '#C3B091' },
  { name: 'Maverick Brown', color: '#6B4423' },
  { name: 'Mocha', color: '#6F4E37' },
  { name: 'Myrtle', color: '#21421E' },
  { name: 'Olive', color: '#556B2F' },
  { name: 'Russet', color: '#80461B' },
  { name: 'Sandstone', color: '#786D5F' },
  { name: 'Seaport', color: '#3A5F7B' },
  { name: 'Sierra', color: '#A0785A' },
  { name: 'Silver', color: '#C0C0C0' },
  { name: 'Smoke', color: '#738276' },
  { name: 'Steel Blue', color: '#4682B4' },
  { name: 'Wheat', color: '#D4C4A8' },
  { name: 'White', color: '#F5F5F5' },
  { name: 'Yellow', color: '#F0D060' },
];

// ============================================================================
// Default Upgrade Options
// ============================================================================

export const DEFAULT_UPGRADE_CATEGORIES: UpgradeCategory[] = [
  {
    id: 'doors',
    category: 'Doors',
    items: [
      'Single 36" Wood Door',
      'Double 36" Wood Doors',
      'Single/Double 36" 6 Panel Fiberglass Door',
      'Single/Double 36" 6 Panel Fiberglass 11 Lite Door',
      'Single/Double 36" Solid Pre-Hung Door',
      'Single/Double 36" 9 Lite Pre-Hung Door',
      'Dead Bolt for Steel Door(s)',
      'Loft Door',
      '6\'x6\' Roll up Door',
      '6\'x7\' Roll up Door',
      '9\'x7\' Roll up Door',
      '9\'x7\' Insulated Garage Door (W/ T-Handle Lock/Key)',
    ],
  },
  {
    id: 'windows',
    category: 'Windows',
    items: [
      '24"x36" Window (Single Pane)',
      '36"x36" Window (Single Pane)',
      '24"x36" Vinyl Insulated Window w/ grid',
      '36"x36" Vinyl Insulated Window w/ grid',
      '9" Vinyl Shutters (set)',
      '12" Vinyl Shutters (set)',
    ],
  },
  {
    id: 'flooring-ramps',
    category: 'Flooring & Ramps',
    items: [
      'Pressure Treated Floor',
      '12"x48" Adjustable Ramp (Aluminum)',
      'Brackets & 2 – 12"x48" Ramps',
      'Additional 12"x48" Ramp',
      '6\'x5\' Treated Wood Ramp',
      '9\'x5\' Treated Wood Ramp',
    ],
  },
  {
    id: 'storage-interior',
    category: 'Storage & Interior',
    items: [
      '22" Workbench w/ 3/4" Top (per foot)',
      '22" Double Shelves w/ 1/2" Top (per foot)',
      'Extra Loft Area (sq. foot)',
      'Extra Loft Ladder',
      'Interior 2"x4" Framed Walls (16" o.c. per foot)',
    ],
  },
  {
    id: 'extras',
    category: 'Extras',
    items: [
      'Wainscott (metal siding) (per foot)',
      'Wainscott (wood siding) (per foot)',
      '16" Tall 2"x4" Loft Railing W/ 30" Opening',
      'Porch Railing (per foot)',
      'Anchors (each)',
      'Ridge Vent (per foot)',
      'Moisture Barrier / Single Bubble Insulation',
      'Electrical Package (100 Amp Box, 2 receptacles, 2 lights/switch)',
      'Additional Light or Receptacle (each)',
      'Build on Site Available',
    ],
  },
];

// ============================================================================
// Helper Functions
// ============================================================================

/**
 * Creates standard siding categories for products with all 4 options
 */
export function createStandardSidingCategories(): SidingCategory[] {
  return [
    { id: 'paint', title: 'Paint Siding Options', colors: DEFAULT_PAINT_SIDING },
    { id: 'metal', title: 'Metal Siding Options', colors: DEFAULT_METAL_SIDING },
    { id: 'urethane', title: 'Urethane Siding Options', colors: DEFAULT_URETHANE_SIDING },
    { id: 'vinyl', title: 'Vinyl Siding Options', colors: DEFAULT_VINYL_SIDING },
  ];
}

/**
 * Creates siding categories for products with only metal, urethane, vinyl (no paint)
 */
export function createMetalUrethaneVinylSiding(): SidingCategory[] {
  return [
    { id: 'metal', title: 'Metal Siding Options', colors: DEFAULT_METAL_SIDING },
    { id: 'urethane', title: 'Urethane Siding Options', colors: DEFAULT_URETHANE_SIDING },
    { id: 'vinyl', title: 'Vinyl Siding Options', colors: DEFAULT_VINYL_SIDING },
  ];
}

/**
 * Creates siding categories for products with only paint and metal
 */
export function createPaintMetalSiding(): SidingCategory[] {
  return [
    { id: 'paint', title: 'Paint Siding Options', colors: DEFAULT_PAINT_SIDING },
    { id: 'metal', title: 'Metal Siding / Roof Options', colors: DEFAULT_METAL_SIDING },
  ];
}

/**
 * Creates siding categories for metal-only products (like Economy Shed)
 */
export function createMetalOnlySiding(): SidingCategory[] {
  return [
    { id: 'metal', title: 'Metal Siding Options', colors: DEFAULT_METAL_SIDING },
  ];
}

/**
 * Extract gallery images from content object (handles dynamic galleryImage1, galleryImage2, etc.)
 */
export function extractGalleryImages(content: Record<string, unknown>): Array<{ src: string; alt: string }> {
  const images: Array<{ src: string; alt: string }> = [];
  let i = 1;
  while (content[`galleryImage${i}`]) {
    images.push({
      src: content[`galleryImage${i}`] as string,
      alt: (content[`galleryImage${i}Alt`] as string) || '',
    });
    i++;
  }
  return images;
}

/**
 * Extract features from content object (handles feature1, feature2, etc. OR features array)
 */
export function extractFeatures(content: Record<string, unknown>): string[] {
  // If content has a features array, use it directly
  if (Array.isArray(content.features)) {
    return content.features;
  }
  
  // Otherwise, extract from feature1, feature2, etc.
  const features: string[] = [];
  let i = 1;
  while (content[`feature${i}`]) {
    features.push(content[`feature${i}`] as string);
    i++;
  }
  return features;
}

/**
 * Extract uses from content object
 */
export function extractUses(content: Record<string, unknown>): string[] {
  // If content has a uses array, use it directly
  if (Array.isArray(content.uses)) {
    return content.uses;
  }
  
  // Otherwise, extract from use1, use2, etc.
  const uses: string[] = [];
  let i = 1;
  while (content[`use${i}`]) {
    uses.push(content[`use${i}`] as string);
    i++;
  }
  return uses;
}
