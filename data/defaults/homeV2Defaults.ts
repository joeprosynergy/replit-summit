/**
 * Homepage V2 Defaults — CMS-editable copy for the V2 homepage variant.
 *
 * Independent from V1 (slug "home-v2"). Reused copy (stakes / guide / imagine /
 * hero buttons) is seeded from homeDefaults so it matches V1 today, but is
 * stored separately once edited. V2-only sections use literal seeds.
 *
 * Scope: main copy blocks + hero + main buttons only. Card grids, the stats bar,
 * Summit Standard cards, How-It-Works steps, the Service Area section, and the
 * reused arrays (stakes pain points, guide stats/credentials, imagine benefits)
 * stay code-managed and are NOT represented here.
 */

import { homeDefaults } from './homeDefaults';

export interface HomeV2Content {
  // === HERO ===
  heroBadge: string;
  heroHeading: string; // multi-line (\n preserved via whitespace-pre-line)
  heroSubheading: string;
  heroButton1Text: string;
  heroButton1Link: string;
  heroButton1OpenInNewTab: boolean;
  heroButton2Text: string;
  heroButton2Link: string;
  heroButton2OpenInNewTab: boolean;

  // === WE UNDERSTAND (reused) ===
  stakesTagline: string;
  stakesHeading: string;
  stakesSubheading: string;
  stakesClosingText: string;

  // === FIND YOUR STYLE (V2-only) ===
  styleTagline: string;
  styleHeading: string;
  styleDescription: string;
  styleBottomLinkText: string;

  // === YOUR GUIDE (reused) ===
  guideTagline: string;
  guideHeading: string;
  guideParagraph1: string;
  guideParagraph2: string;
  guideParagraph3: string;
  guideParagraph4: string;

  // === THE SUMMIT STANDARD (V2-only) ===
  standardTagline: string;
  standardHeading: string;

  // === HOW IT WORKS (V2-only) ===
  processTagline: string;
  processHeading: string;
  processCtaText: string;
  processCtaLink: string;
  processCtaOpenInNewTab: boolean;

  // === STORIES (V2-only) ===
  storiesTagline: string;
  storiesHeading: string;
  storiesLinkText: string;

  // === IMAGINE THIS (reused) ===
  imagineTagline: string;
  imagineHeading: string;
  imagineSubheading: string;

  // === FINAL CTA (V2-only) ===
  finalCtaHeading: string;
  finalCtaSubheading: string;
  finalCtaPhoneText: string;
  finalCtaPhoneLink: string;
  finalCtaConfigText: string;
  finalCtaConfigLink: string;
  finalCtaConfigOpenInNewTab: boolean;
  finalCtaFinePrint: string;

  // Allow dynamic fields (matches other page content types)
  [key: string]: unknown;
}

export const homeV2Defaults: HomeV2Content = {
  // === HERO ===
  heroBadge: 'Handcrafted in Missouri since 2016',
  heroHeading: 'Built for\nyour land.\nBacked by\ncraftsmanship.',
  heroSubheading:
    'Premium portable buildings, delivered and set up across Missouri, Illinois, Kentucky & Arkansas.',
  heroButton1Text: homeDefaults.heroButton1Text,
  heroButton1Link: homeDefaults.heroButton1Link,
  heroButton1OpenInNewTab: homeDefaults.heroButton1OpenInNewTab,
  heroButton2Text: homeDefaults.heroButton2Text,
  heroButton2Link: homeDefaults.heroButton2Link,
  heroButton2OpenInNewTab: homeDefaults.heroButton2OpenInNewTab,

  // === WE UNDERSTAND (reused) ===
  stakesTagline: homeDefaults.stakesTagline,
  stakesHeading: homeDefaults.stakesHeading,
  stakesSubheading: homeDefaults.stakesSubheading,
  stakesClosingText: homeDefaults.stakesClosingText,

  // === FIND YOUR STYLE (V2-only) ===
  styleTagline: 'FIND YOUR STYLE',
  styleHeading: 'Choose the perfect building',
  styleDescription: 'Every style is fully customizable in our 3D configurator.',
  styleBottomLinkText: 'View the complete collection and all options →',

  // === YOUR GUIDE (reused) ===
  guideTagline: homeDefaults.guideTagline,
  guideHeading: homeDefaults.guideHeading,
  guideParagraph1: homeDefaults.guideParagraph1,
  guideParagraph2: homeDefaults.guideParagraph2,
  guideParagraph3: homeDefaults.guideParagraph3,
  guideParagraph4: homeDefaults.guideParagraph4,

  // === THE SUMMIT STANDARD (V2-only) ===
  standardTagline: 'The Summit Standard',
  standardHeading: 'We build buildings that last a lifetime.',

  // === HOW IT WORKS (V2-only) ===
  processTagline: 'THREE SIMPLE STEPS',
  processHeading: 'Getting your building is easy',
  processCtaText: 'Start Your 3D Design Now',
  processCtaLink: 'https://summitbuildings.shedpro.co/',
  processCtaOpenInNewTab: true,

  // === STORIES (V2-only) ===
  storiesTagline: 'REAL FAMILIES. REAL RESULTS.',
  storiesHeading: 'What our customers say',
  storiesLinkText: 'See more projects →',

  // === IMAGINE THIS (reused) ===
  imagineTagline: homeDefaults.imagineTagline,
  imagineHeading: homeDefaults.imagineHeading,
  imagineSubheading: homeDefaults.imagineSubheading,

  // === FINAL CTA (V2-only) ===
  finalCtaHeading: 'Ready to get the space you actually need?',
  finalCtaSubheading:
    'Talk to a real person who knows buildings. Or jump straight into the 3D builder.',
  finalCtaPhoneText: 'Call (573) 747-4700',
  finalCtaPhoneLink: 'tel:5737474700',
  finalCtaConfigText: 'Launch the 3D Configurator',
  finalCtaConfigLink: 'https://summitbuildings.shedpro.co/',
  finalCtaConfigOpenInNewTab: true,
  finalCtaFinePrint:
    'NO CREDIT CHECK FINANCING AVAILABLE • 5-YEAR WARRANTY • BUILT IN MISSOURI',
};
