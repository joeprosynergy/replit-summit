export interface BuyersGuideNavContent {
  coverLabel: string;
  step1Label: string;
  step2Label: string;
  step3Label: string;
  step4Label: string;
  step5Label: string;
  downloadButtonText: string;
  generatingText: string;
}

export interface BuyersGuideContent {
  // Page metadata
  heading: string;
  tagline: string;
  subheading: string;
  ctaHeading: string;
  ctaDescription: string;
  ctaButton: string;
  metaTitle: string;
  metaDescription: string;
  
  // Navigation content
  navigation: BuyersGuideNavContent;
}

export const buyersGuideDefaults: BuyersGuideContent = {
  // Page metadata
  heading: "Summit Buyers Guide",
  tagline: "",
  subheading: "",
  ctaHeading: "",
  ctaDescription: "",
  ctaButton: "",
  metaTitle: "Summit Buyers Guide | Summit Portable Buildings",
  metaDescription: "Your 5-step roadmap to the perfect storage building. Learn how to choose the right size, materials, prepare your site, and more.",
  
  // Navigation content
  navigation: {
    coverLabel: "Cover",
    step1Label: "Step 1",
    step2Label: "Step 2",
    step3Label: "Step 3",
    step4Label: "Step 4",
    step5Label: "Step 5 & Contact",
    downloadButtonText: "Download PDF",
    generatingText: "Generating...",
  },
};
