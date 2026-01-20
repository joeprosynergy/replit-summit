import { CanonicalPageData } from './canonicalization';

/**
 * Page Defaults Extractor
 * Utility to convert existing page default content into canonical format
 * for database persistence.
 */

/**
 * Extract canonical page data from a standard page defaults object.
 * This handles the common pattern used across the site.
 */
export function extractPageDefaults(
  slug: string,
  defaults: Record<string, any>,
  templateType: string = 'standard'
): CanonicalPageData {
  // Extract main section content (most pages use 'main' section)
  const mainContent: Record<string, any> = {};
  const sectionSpecificContent: Record<string, Record<string, any>> = {};

  // Common fields that belong at page level
  const pageLevelFields = [
    'heading',
    'subheading',
    'tagline',
    'metaTitle',
    'metaDescription',
    'ctaHeading',
    'ctaDescription',
    'ctaButton',
  ];

  // Extract page-level data
  const pageData: any = {
    slug,
    templateType,
    heading: defaults.heading || defaults.title || '',
    subheading: defaults.subheading || defaults.subtitle || '',
    tagline: defaults.tagline || '',
    metaTitle: defaults.metaTitle || '',
    metaDescription: defaults.metaDescription || '',
    ctaHeading: defaults.ctaHeading || '',
    ctaDescription: defaults.ctaDescription || '',
    ctaButton: defaults.ctaButton || defaults.ctaPrimaryButton || '',
  };

  // Extract layout config if present
  if (defaults.layoutConfig) {
    pageData.layoutConfig = defaults.layoutConfig;
  } else {
    pageData.layoutConfig = {
      heroLayout: 'full-width',
      backgroundColor: '#f8f9fa',
      theme: 'default',
    };
  }

  // Extract SEO config
  pageData.seoConfig = {
    canonical: defaults.canonical || '',
    ogTitle: defaults.metaTitle || defaults.title || '',
    ogDescription: defaults.metaDescription || defaults.description || '',
    ogImage: defaults.heroImage || defaults.image || '',
  };

  // Separate remaining content into sections
  Object.entries(defaults).forEach(([key, value]) => {
    if (pageLevelFields.includes(key) || key === 'layoutConfig' || key === 'seoConfig') {
      return; // Skip page-level fields
    }

    // Check if this is a section-specific field (e.g., heroImage, ctaPrimaryButton)
    const sectionPrefixes = ['hero', 'cta', 'value', 'color', 'gallery', 'section', 'card'];
    let foundSection = false;

    for (const prefix of sectionPrefixes) {
      if (key.startsWith(prefix)) {
        if (!sectionSpecificContent[prefix]) {
          sectionSpecificContent[prefix] = {};
        }
        sectionSpecificContent[prefix][key] = value;
        foundSection = true;
        break;
      }
    }

    // If no section prefix found, add to main content
    if (!foundSection) {
      mainContent[key] = value;
    }
  });

  // Build sections array
  const sections: any[] = [];

  // Main section (if has content)
  if (Object.keys(mainContent).length > 0) {
    sections.push({
      sectionName: 'main',
      sectionType: 'content',
      orderIndex: 0,
      content: mainContent,
      isVisible: true,
    });
  }

  // Hero section
  if (Object.keys(sectionSpecificContent.hero || {}).length > 0) {
    sections.push({
      sectionName: 'hero',
      sectionType: 'hero',
      orderIndex: 1,
      content: sectionSpecificContent.hero,
      layoutConfig: {
        backgroundColor: 'hsl(var(--primary) / 0.1)',
        paddingTop: '4rem',
        paddingBottom: '4rem',
        textAlignment: 'center',
        layoutVariant: 'full-width',
      },
      isVisible: true,
    });
  }

  // Gallery section
  if (Object.keys(sectionSpecificContent.gallery || {}).length > 0) {
    sections.push({
      sectionName: 'gallery',
      sectionType: 'gallery',
      orderIndex: 2,
      content: sectionSpecificContent.gallery,
      isVisible: true,
    });
  }

  // Section heading/cards section
  if (Object.keys(sectionSpecificContent.section || {}).length > 0 ||
      Object.keys(sectionSpecificContent.card || {}).length > 0) {
    sections.push({
      sectionName: 'cards',
      sectionType: 'cards',
      orderIndex: 3,
      content: {
        ...sectionSpecificContent.section,
        ...sectionSpecificContent.card,
      },
      isVisible: true,
    });
  }

  // Value proposition section
  if (Object.keys(sectionSpecificContent.value || {}).length > 0) {
    sections.push({
      sectionName: 'value',
      sectionType: 'features',
      orderIndex: 4,
      content: sectionSpecificContent.value,
      isVisible: true,
    });
  }

  // Color options section
  if (Object.keys(sectionSpecificContent.color || {}).length > 0) {
    sections.push({
      sectionName: 'colors',
      sectionType: 'options',
      orderIndex: 5,
      content: sectionSpecificContent.color,
      isVisible: true,
    });
  }

  // CTA section
  if (Object.keys(sectionSpecificContent.cta || {}).length > 0) {
    sections.push({
      sectionName: 'cta',
      sectionType: 'cta',
      orderIndex: 6,
      content: sectionSpecificContent.cta,
      layoutConfig: {
        backgroundColor: 'hsl(var(--primary) / 0.1)',
        paddingTop: '4rem',
        paddingBottom: '4rem',
        textAlignment: 'center',
        layoutVariant: 'default',
      },
      isVisible: true,
    });
  }

  return {
    page: pageData,
    sections,
  };
}

/**
 * Extract defaults from Economy Shed style pages (most common pattern).
 */
export function extractEconomyShedStyleDefaults(
  slug: string,
  defaults: Record<string, any>
): CanonicalPageData {
  return {
    page: {
      slug,
      templateType: 'product-detail',
      heading: defaults.title || '',
      subheading: defaults.subtitle || '',
      tagline: defaults.description || '',
      metaTitle: defaults.metaTitle || '',
      metaDescription: defaults.metaDescription || '',
      layoutConfig: {
        heroLayout: 'split',
        backgroundColor: '#ffffff',
        theme: 'default',
      },
      seoConfig: {
        canonical: '',
        ogTitle: defaults.metaTitle || '',
        ogDescription: defaults.metaDescription || '',
        ogImage: defaults.heroImage || '',
      },
    },
    sections: [
      {
        sectionName: 'hero',
        sectionType: 'product-hero',
        orderIndex: 0,
        content: {
          title: defaults.title || '',
          titleHighlight: defaults.titleHighlight || '',
          description: defaults.description || '',
          subtitle: defaults.subtitle || '',
          heroImage: defaults.heroImage || '',
          heroImageAlt: defaults.heroImageAlt || '',
          heroButton1Text: defaults.heroButton1Text || '',
          heroButton1Link: defaults.heroButton1Link || '',
          heroButton1OpenInNewTab: defaults.heroButton1OpenInNewTab || false,
          heroButton2Text: defaults.heroButton2Text || '',
          heroButton2Link: defaults.heroButton2Link || '',
          heroButton2OpenInNewTab: defaults.heroButton2OpenInNewTab || false,
        },
        layoutConfig: {
          backgroundColor: 'transparent',
          layout: 'split',
        },
        isVisible: true,
      },
      {
        sectionName: 'gallery',
        sectionType: 'gallery',
        orderIndex: 1,
        content: extractGalleryImages(defaults),
        isVisible: true,
      },
      {
        sectionName: 'options',
        sectionType: 'product-options',
        orderIndex: 2,
        content: {
          sectionHeading: defaults.sectionHeading || '',
          sectionSubheading: defaults.sectionSubheading || '',
          card1Image: defaults.card1Image || '',
          card1ImageAlt: defaults.card1ImageAlt || '',
          card1Title: defaults.card1Title || '',
          card1Description: defaults.card1Description || '',
          card1Feature1: defaults.card1Feature1 || '',
          card1Feature2: defaults.card1Feature2 || '',
          card1Feature3: defaults.card1Feature3 || '',
          card1Feature4: defaults.card1Feature4 || '',
          card2Image: defaults.card2Image || '',
          card2ImageAlt: defaults.card2ImageAlt || '',
          card2Title: defaults.card2Title || '',
          card2Description: defaults.card2Description || '',
          card2Feature1: defaults.card2Feature1 || '',
          card2Feature2: defaults.card2Feature2 || '',
          card2Feature3: defaults.card2Feature3 || '',
          card2Feature4: defaults.card2Feature4 || '',
          designButtonText: defaults.designButtonText || '',
          designButtonLink: defaults.designButtonLink || '',
          designButtonOpenInNewTab: defaults.designButtonOpenInNewTab || false,
        },
        isVisible: true,
      },
      {
        sectionName: 'value',
        sectionType: 'benefits',
        orderIndex: 3,
        content: {
          valueHeading: defaults.valueHeading || '',
          ...extractValueBenefits(defaults),
          valueNote: defaults.valueNote || '',
        },
        isVisible: true,
      },
      {
        sectionName: 'colors',
        sectionType: 'color-options',
        orderIndex: 4,
        content: {
          colorHeading: defaults.colorHeading || '',
          colorAccordionTitle: defaults.colorAccordionTitle || '',
        },
        isVisible: true,
      },
      {
        sectionName: 'cta',
        sectionType: 'cta',
        orderIndex: 5,
        content: {
          ctaHeading: defaults.ctaHeading || '',
          ctaDescription: defaults.ctaDescription || '',
          ctaPrimaryButton: defaults.ctaPrimaryButton || '',
          ctaPrimaryButtonLink: defaults.ctaPrimaryButtonLink || '',
          ctaPrimaryButtonOpenInNewTab: defaults.ctaPrimaryButtonOpenInNewTab || false,
          ctaSecondaryButton: defaults.ctaSecondaryButton || '',
          ctaSecondaryButtonLink: defaults.ctaSecondaryButtonLink || '',
          ctaSecondaryButtonOpenInNewTab: defaults.ctaSecondaryButtonOpenInNewTab || false,
          importantNote: defaults.importantNote || '',
        },
        layoutConfig: {
          backgroundColor: 'hsl(var(--primary) / 0.1)',
          paddingTop: '4rem',
          paddingBottom: '4rem',
          textAlignment: 'center',
        },
        isVisible: true,
      },
    ],
  };
}

/**
 * Extract gallery images from defaults object.
 */
function extractGalleryImages(defaults: Record<string, any>): Record<string, any> {
  const galleryContent: Record<string, any> = {};
  let i = 1;

  while (defaults[`galleryImage${i}`]) {
    galleryContent[`galleryImage${i}`] = defaults[`galleryImage${i}`];
    galleryContent[`galleryImage${i}Alt`] = defaults[`galleryImage${i}Alt`] || '';
    i++;
  }

  return galleryContent;
}

/**
 * Extract value benefits from defaults object.
 */
function extractValueBenefits(defaults: Record<string, any>): Record<string, any> {
  const benefits: Record<string, any> = {};
  let i = 1;

  while (defaults[`valueBenefit${i}`]) {
    benefits[`valueBenefit${i}`] = defaults[`valueBenefit${i}`];
    i++;
  }

  return benefits;
}

/**
 * Extract defaults for simple content pages (AboutUs, PrivacyPolicy, etc.)
 * These pages store all content in a single 'main' section
 */
export function extractSimplePageDefaults(
  slug: string,
  defaults: Record<string, any>
): CanonicalPageData {
  return {
    page: {
      slug,
      templateType: 'simple-content',
      heading: defaults.heading || '',
      subheading: '',
      tagline: '',
      metaTitle: defaults.metaTitle || '',
      metaDescription: defaults.metaDescription || '',
      layoutConfig: {
        heroLayout: 'full-width',
        backgroundColor: '#ffffff',
        theme: 'default',
      },
      seoConfig: {
        canonical: '',
        ogTitle: defaults.metaTitle || '',
        ogDescription: defaults.metaDescription || '',
        ogImage: '',
      },
    },
    sections: [
      {
        sectionName: 'main',
        sectionType: 'content',
        orderIndex: 0,
        content: defaults, // Store ALL content in main section
        isVisible: true,
      },
    ],
  };
}
