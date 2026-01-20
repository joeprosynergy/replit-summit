/**
 * Economy Shed Page Defaults
 * Extracted from page component for use with CMS-first architecture.
 */

import { cloudinaryImages } from '@/lib/cloudinary';

export interface EconomyShedContent {
  metaTitle: string;
  metaDescription: string;
  title: string;
  titleHighlight: string;
  description: string;
  subtitle: string;
  heroImage: string;
  heroImageAlt: string;
  galleryImage1: string;
  galleryImage1Alt: string;
  galleryImage2: string;
  galleryImage2Alt: string;
  galleryImage3: string;
  galleryImage3Alt: string;
  galleryImage4: string;
  galleryImage4Alt: string;
  galleryImage5: string;
  galleryImage5Alt: string;
  galleryImage6: string;
  galleryImage6Alt: string;
  galleryImage7: string;
  galleryImage7Alt: string;
  galleryImage8: string;
  galleryImage8Alt: string;
  sectionHeading: string;
  sectionSubheading: string;
  card1Image: string;
  card1ImageAlt: string;
  card1Title: string;
  card1Description: string;
  card1Feature1: string;
  card1Feature2: string;
  card1Feature3: string;
  card1Feature4: string;
  card2Image: string;
  card2ImageAlt: string;
  card2Title: string;
  card2Description: string;
  card2Feature1: string;
  card2Feature2: string;
  card2Feature3: string;
  card2Feature4: string;
  designButtonText: string;
  designButtonLink: string;
  designButtonOpenInNewTab: boolean;
  valueHeading: string;
  valueBenefit1: string;
  valueBenefit2: string;
  valueBenefit3: string;
  valueBenefit4: string;
  valueBenefit5: string;
  valueBenefit6: string;
  valueBenefit7: string;
  valueBenefit8: string;
  valueBenefit9: string;
  valueNote: string;
  colorHeading: string;
  colorAccordionTitle: string;
  importantNote: string;
  heroButton1Text: string;
  heroButton1Link: string;
  heroButton1OpenInNewTab: boolean;
  heroButton2Text: string;
  heroButton2Link: string;
  heroButton2OpenInNewTab: boolean;
  ctaHeading: string;
  ctaDescription: string;
  ctaPrimaryButton: string;
  ctaPrimaryButtonLink: string;
  ctaPrimaryButtonOpenInNewTab: boolean;
  ctaSecondaryButton: string;
  ctaSecondaryButtonLink: string;
  ctaSecondaryButtonOpenInNewTab: boolean;
  [key: string]: string | boolean;
}

export const economyShedDefaults: EconomyShedContent = {
  metaTitle: 'Economy Shed | Summit Portable Buildings',
  metaDescription: 'The Economy Shed is our most economical storage building available. Lowest cost per square foot of floor space. Available in standard or lofted configurations with metal siding. Free delivery within 50 miles.',
  title: 'SHED',
  titleHighlight: 'ECONOMY',
  description: 'Our most economical storage building available. It is the lowest cost per square foot of floor space. Built simply for storage purposes. This series is only available with the metal siding option.',
  subtitle: 'Available in Utility or Lofted Barn Styles',
  heroImage: cloudinaryImages.economyShed1,
  heroImageAlt: 'Summit Economy Shed',
  galleryImage1: cloudinaryImages.economyShed1,
  galleryImage1Alt: 'Economy Shed - Red with white trim',
  galleryImage2: cloudinaryImages.economyShed2,
  galleryImage2Alt: 'Economy Shed - Dark brown metal siding',
  galleryImage3: cloudinaryImages.economyShed3,
  galleryImage3Alt: 'Lofted Economy Shed - Gray metal siding',
  galleryImage4: cloudinaryImages.economyShed4,
  galleryImage4Alt: 'Lofted Economy Shed - Light gray with white trim',
  galleryImage5: cloudinaryImages.economyShed6,
  galleryImage5Alt: 'Economy Shed - Gray with dark trim',
  galleryImage6: cloudinaryImages.economyShed7,
  galleryImage6Alt: 'Economy Shed - Tan with white trim',
  galleryImage7: cloudinaryImages.economyShed8,
  galleryImage7Alt: 'Economy Shed - Tan side view',
  galleryImage8: cloudinaryImages.economyShed9,
  galleryImage8Alt: 'Economy Shed - Blue with white trim',
  sectionHeading: 'Two Style Options',
  sectionSubheading: 'The Economy Shed is available in both utility and lofted barn styles, giving you flexibility to choose the configuration that best fits your storage needs.',
  card1Image: cloudinaryImages.economyShed1,
  card1ImageAlt: 'Economy Shed - Utility Style',
  card1Title: 'Economy Shed',
  card1Description: 'Simple and efficient utility-style design for straightforward storage needs.',
  card1Feature1: "6' 6\" Walls",
  card1Feature2: 'Double 36" Doors or Single 48" Door',
  card1Feature3: 'Metal Siding Only',
  card1Feature4: 'Budget-Friendly Storage Solution',
  card2Image: cloudinaryImages.economyShed3,
  card2ImageAlt: 'Lofted Economy Shed - Barn Style',
  card2Title: 'Lofted Economy Shed',
  card2Description: 'Barn-style design with added loft space for maximized storage capacity.',
  card2Feature1: "5' Walls",
  card2Feature2: 'Double 36" Doors',
  card2Feature3: '2 Lofts for Extra Storage',
  card2Feature4: 'Loft Ladder Included',
  designButtonText: 'Design Yours Now',
  designButtonLink: 'https://summitbuildings.shedpro.co/',
  designButtonOpenInNewTab: true,
  valueHeading: 'Maximum Value, Minimum Cost',
  valueBenefit1: 'Lowest Cost Per Square Foot',
  valueBenefit2: 'Durable Metal Siding',
  valueBenefit3: 'Weather-Resistant Construction',
  valueBenefit4: 'Simple Storage Solution',
  valueBenefit5: 'Quick Delivery Available',
  valueBenefit6: 'Multiple Size Options',
  valueBenefit7: 'Budget-Friendly Pricing',
  valueBenefit8: 'Quality Construction',
  valueBenefit9: 'Easy Access Doors',
  valueNote: '*Please note: Windows and moisture barriers are not available on Economy Shed models. This series is only available with metal siding.',
  colorHeading: 'COLOR OPTIONS',
  colorAccordionTitle: 'Metal Siding Options',
  importantNote: '*Free delivery within 50 miles. Economy Sheds are available with metal siding only. Windows and moisture barriers are not available on this series. Prices subject to change without warning.',
  heroButton1Text: 'Build Your Own',
  heroButton1Link: 'https://summitbuildings.shedpro.co/',
  heroButton1OpenInNewTab: true,
  heroButton2Text: 'Browse Our Inventory',
  heroButton2Link: '/inventory',
  heroButton2OpenInNewTab: false,
  ctaHeading: 'Ready to Get Started?',
  ctaDescription: 'Design your perfect economy shed online or contact us for a free quote.',
  ctaPrimaryButton: 'Build Your Own',
  ctaPrimaryButtonLink: 'https://summitbuildings.shedpro.co/',
  ctaPrimaryButtonOpenInNewTab: true,
  ctaSecondaryButton: 'See More Models',
  ctaSecondaryButtonLink: '/types',
  ctaSecondaryButtonOpenInNewTab: false,
};
