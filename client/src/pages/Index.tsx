import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link, useLocation } from 'react-router-dom';
import { ArrowRight, Truck, CreditCard, Shield, Package, Frown, ThumbsDown, Home, Hammer, Heart, Monitor, Car, TrendingUp, Lock, Clock, AlertTriangle, Phone, Star, Quote, MapPin } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ContactForm from '@/components/ContactForm';
import { Button } from '@/components/ui/button';
import { cloudinaryImages, getMobileHeroImage, IMAGES } from '@/lib/cloudinary';
import { useAdminAuth } from '@/hooks/useAdminAuth';
import { useEditablePageContent, PageContent } from '@/hooks/useEditablePageContent';
import { useSectionContent } from '@/hooks/useSectionContent';
import { useEditableTestimonials } from '@/hooks/useEditableTestimonials';
import { InlineEditable } from '@/components/admin/InlineEditable';
import InlineEditableButton from '@/components/admin/InlineEditableButton';
import InlineEditableImage from '@/components/admin/InlineEditableImage';
import InlineEditableLink from '@/components/admin/InlineEditableLink';
import { AdminEditMode } from '@/components/admin/AdminEditMode';
import { usePageManagement } from '@/hooks/usePageManagement';

// Hero badges
const heroBadges = [
  { icon: Truck, label: 'Free Delivery (50mi)' },
  { icon: CreditCard, label: 'No Credit Check Financing' },
  { icon: Shield, label: '5-Year Warranty' },
];

// Stakes icons
const stakesIcons = [Package, Frown, ThumbsDown];

// Guide stats and credentials
const guideStats = [
  { value: '8+', label: 'Years Experience' },
  { value: '4', label: 'States Served' },
  { value: '1000+', label: 'Buildings Delivered' },
  { value: '5', label: 'Year Warranty' },
];

const guideCredentials = [
  { icon: Home, label: 'Family Owned', sublabel: 'Since 2016' },
  { icon: Hammer, label: 'Hand-Crafted', sublabel: 'USA Built' },
  { icon: Shield, label: '5-Year Warranty', sublabel: 'LP SmartSide' },
  { icon: Heart, label: 'Faith Based', sublabel: 'Values Driven' },
];

// How it works icons
const howItWorksIcons = [Monitor, Hammer, Truck];

// Imagine icons
const imagineIcons = [Car, Shield, Hammer, TrendingUp, Lock, Clock];

// Locations data
const stateData = [
  { state: 'Missouri', abbrev: 'MO', cities: ['St. Louis Area', 'Farmington', 'Cape Girardeau', 'Rolla', 'Poplar Bluff', 'Sikeston'] },
  { state: 'Illinois', abbrev: 'IL', cities: ['Metropolis', 'Carbondale', 'Vienna', 'Anna', 'Chester', 'Red Bud'] },
  { state: 'Kentucky', abbrev: 'KY', cities: ['Paducah', 'Murray', 'Mayfield', 'Benton', 'Wickliffe', 'Bardwell'] },
  { state: 'Arkansas', abbrev: 'AR', cities: ['Northeast Arkansas', 'Jonesboro Area'] },
];

// Content interfaces
interface StakesContent {
  tagline: string;
  heading: string;
  subheading: string;
  painPoints: Array<{ title: string; description: string }>;
  closingText: string;
}

interface GuideContent {
  tagline: string;
  heading: string;
  paragraph1: string;
  paragraph2: string;
  paragraph3: string;
  paragraph4: string;
}

interface HowItWorksContent {
  tagline: string;
  heading: string;
  subheading: string;
  steps: Array<{ title: string; description: string }>;
  buttonText: string;
}

interface ProductsContent {
  tagline: string;
  heading: string;
  subheading: string;
  sectionTitle: string;
  linkText: string;
  styles: Array<{
    id: string;
    name: string;
    subtitle: string;
    image: string;
    link: string;
    openInNewTab: boolean;
  }>;
}

interface HeroButtonsContent {
  primaryButton: string;
  primaryButtonLink: string;
  primaryButtonOpenInNewTab: boolean;
  secondaryButton: string;
  secondaryButtonLink: string;
  secondaryButtonOpenInNewTab: boolean;
}

interface TestimonialsHeaderContent {
  tagline: string;
  heading: string;
  subheading: string;
}

interface ImagineContent {
  tagline: string;
  heading: string;
  subheading: string;
  benefits: string[];
}

interface CTABannerContent {
  badge: string;
  heading: string;
  description1: string;
  description2: string;
  closingText: string;
  ctaButton: string;
  phoneNumber: string;
  buttonLink: string;
  buttonOpenInNewTab: boolean;
}

interface LocationsContent {
  tagline: string;
  heading: string;
  subheading: string;
  footerNote: string;
  ctaHeading: string;
  ctaDescription: string;
  ctaButton: string;
  ctaButtonLink: string;
  ctaButtonOpenInNewTab: boolean;
  secondaryButton: string;
  phoneText: string;
}

interface ContactContent {
  tagline: string;
  heading: string;
  subheading: string;
  callTitle: string;
  phoneNumber: string;
  locationTitle: string;
  address1: string;
  address2: string;
  hoursTitle: string;
  hours1: string;
  hours2: string;
}

// Default content
export const defaultContent: PageContent = {
  heading: "Get the Storage Space You Need Without the Hassle",
  tagline: "Summit Portable Buildings",
  subheading: "Custom storage buildings designed for your property, built by craftsmen, delivered to your door.",
  ctaHeading: "Stop living with clutter",
  ctaDescription: "Design your perfect shed online in minutes and we'll handle the rest.",
  ctaButton: "Design Your Shed Now",
  metaTitle: "Summit Portable Buildings | Built The Old Fashioned Way",
  metaDescription: "Affordable, high quality, hand crafted, storage buildings built in the USA. Serving Missouri, Illinois, Kentucky, and Arkansas.",
};

const defaultStakesContent: StakesContent = {
  tagline: 'We Understand',
  heading: 'Running Out of Space is Frustrating',
  subheading: "You've got equipment, tools, and belongings piling up with nowhere to put them.",
  painPoints: [
    { title: 'Stuff Everywhere', description: "Your garage is packed. The basement is full. Expensive equipment sits outside getting damaged by weather." },
    { title: 'Feeling Overwhelmed', description: "You're stressed about the clutter. Every time you look at the mess, you feel like you're falling behind." },
    { title: 'Cheap Sheds Fall Apart', description: "You shouldn't have to choose between affordable and quality. Cookie-cutter box store sheds just don't last." },
  ],
  closingText: 'You deserve a storage solution that actually works.',
};

const defaultGuideContent: GuideContent = {
  tagline: 'Your Guide',
  heading: "We've Helped Hundreds of Families Get Organized",
  paragraph1: 'We get it.',
  paragraph2: "Finding quality storage that fits your property and budget feels impossible. Big box stores sell junk that falls apart. Custom builds cost a fortune.",
  paragraph3: "We're Summit Portable Buildings, a family-owned company that's been building storage solutions the right way since 2016. We've helped over 1,000 families across four states get the space they need without the headaches.",
  paragraph4: "Every building is hand-crafted by skilled craftsmen right here in the USA using premium materials that last for generations, not years.",
};

const defaultHowItWorksContent: HowItWorksContent = {
  tagline: 'The Plan',
  heading: 'Getting Your Shed is Easy',
  subheading: "We've simplified the entire process into 3 simple steps.",
  steps: [
    { title: 'Design It Online', description: 'Use our 3D builder to pick your style, size, colors, and options. Get instant pricing. Takes about 5 minutes.' },
    { title: 'We Build It', description: 'Our craftsmen hand-build your shed using premium materials. Every building is inspected for quality.' },
    { title: 'We Deliver & Setup', description: 'We deliver to your property and set it up, leveled and ready to use. Free within 50 miles.' },
  ],
  buttonText: 'Start Designing Your Shed',
};

const defaultProductsContent: ProductsContent = {
  tagline: 'Find Your Perfect Style',
  heading: 'Choose Your Style',
  subheading: 'Select a roof style to explore available options',
  sectionTitle: 'Building Styles',
  linkText: 'View All Building Styles →',
  styles: [
    { id: 'utility', name: 'Utility', subtitle: 'Traditional A-Frame Roof', image: cloudinaryImages.utilityShed3, link: '/styles/utility', openInNewTab: false },
    { id: 'barn', name: 'Barn', subtitle: 'Gambrel Roof', image: cloudinaryImages.sideLoftedBarn4, link: '/styles/barn', openInNewTab: false },
    { id: 'modern', name: 'Modern', subtitle: 'Single Slope Roof', image: cloudinaryImages.modernShed, link: '/styles/modern', openInNewTab: false },
    { id: 'greenhouse', name: 'Greenhouse', subtitle: 'Grow Year-Round', image: cloudinaryImages.greenhouse1, link: '/styles/greenhouse', openInNewTab: false },
    { id: 'animal-shelters', name: 'Animal Shelters', subtitle: 'Kennels & Coops', image: cloudinaryImages.animalShelter1, link: '/styles/animal-shelters', openInNewTab: false },
  ],
};

const defaultHeroButtonsContent: HeroButtonsContent = {
  primaryButton: 'Design Your Shed Now',
  primaryButtonLink: '/3d-configurator',
  primaryButtonOpenInNewTab: false,
  secondaryButton: 'Get Free Buying Guide',
  secondaryButtonLink: '/buyers-guide',
  secondaryButtonOpenInNewTab: false,
};

const defaultTestimonialsHeaderContent: TestimonialsHeaderContent = {
  tagline: 'Success Stories',
  heading: 'Real Families. Real Results.',
  subheading: 'See how Summit Buildings helped these homeowners solve their storage problems.',
};

const defaultImagineContent: ImagineContent = {
  tagline: 'Imagine This',
  heading: 'What Life Looks Like With the Right Storage',
  subheading: "Picture walking into your garage and actually having room. Your lawn equipment has a home. Your tools are organized. Everything has its place.",
  benefits: [
    'A clean, organized garage you can actually park in',
    'Expensive tools and equipment protected from weather',
    'A dedicated workshop or hobby space of your own',
    'Increased property value with an attractive building',
    'Peace of mind knowing your belongings are secure',
    'A building that will last for decades, not years',
  ],
};

const defaultCTABannerContent: CTABannerContent = {
  badge: "Don't Wait",
  heading: "Don't Let Clutter Take Over Your Property",
  description1: "Every month you wait, the problem gets worse. Equipment rusts in the rain. The garage gets more packed. The stress builds.",
  description2: "That cheap shed from the box store? It'll be falling apart in 5 years while you wish you'd invested in quality.",
  closingText: "You've worked too hard to settle for less than you deserve.",
  ctaButton: "Design Your Shed",
  phoneNumber: "573-747-4700",
  buttonLink: "https://summitbuildings.shedpro.co/",
  buttonOpenInNewTab: true,
};

const defaultLocationsContent: LocationsContent = {
  tagline: 'Service Areas',
  heading: 'Proudly Serving 4 States',
  subheading: 'We deliver and set up buildings throughout Missouri, Illinois, Kentucky, and Arkansas. Free delivery within 50 miles.',
  footerNote: "Don't see your area listed? Contact us to check delivery availability.",
  ctaHeading: 'Ready to Get Organized?',
  ctaDescription: 'Stop letting clutter control your life. Design your custom shed in minutes and take the first step toward a more organized property.',
  ctaButton: 'Design Your Shed Now',
  ctaButtonLink: 'https://summitbuildings.shedpro.co/',
  ctaButtonOpenInNewTab: true,
  secondaryButton: 'Get Free Buying Guide',
  phoneText: 'Questions? Call us at',
};

const defaultContactContent: ContactContent = {
  tagline: 'Get In Touch',
  heading: 'Request a Quote',
  subheading: "Have questions? Ready to get started? Fill out the form below and we'll get back to you promptly.",
  callTitle: 'Call Us',
  phoneNumber: '(573) 747-4700',
  locationTitle: 'Main Location',
  address1: '7336 State Highway 32',
  address2: 'Farmington, MO 63640',
  hoursTitle: 'Hours',
  hours1: 'Mon - Fri: 8am - 5pm',
  hours2: 'Sat: 9am - 3pm',
};

const Index = () => {
  const location = useLocation();
  const { isAdmin } = useAdminAuth();
  const { showDuplicateDialog, showDeleteDialog, newSlug, isDuplicating, isDeleting, setNewSlug, setShowDuplicateDialog, setShowDeleteDialog, duplicatePage, deletePage } = usePageManagement('home');

  // Page content hook for hero section
  const {
    content,
    editedContent,
    isLoading: isPageLoading,
    isSaving: isPageSaving,
    isEditMode,
    hasChanges: hasPageChanges,
    updateField,
    save: savePage,
    reset: resetPage,
    startEditing,
  } = useEditablePageContent('home', defaultContent);

  // Section content hooks
  const {
    content: stakesContent,
    isLoading: isStakesLoading,
    isSaving: isStakesSaving,
    hasChanges: hasStakesChanges,
    updateField: updateStakesField,
    save: saveStakes,
    reset: resetStakes,
  } = useSectionContent('home', 'stakes', defaultStakesContent as any) as {
    content: StakesContent;
    originalContent: StakesContent;
    isLoading: boolean;
    isSaving: boolean;
    hasChanges: boolean;
    updateField: <K extends keyof StakesContent>(field: K, value: StakesContent[K]) => void;
    save: () => Promise<boolean>;
    reset: () => void;
  };

  const {
    content: guideContent,
    isLoading: isGuideLoading,
    isSaving: isGuideSaving,
    hasChanges: hasGuideChanges,
    updateField: updateGuideField,
    save: saveGuide,
    reset: resetGuide,
  } = useSectionContent('home', 'guide', defaultGuideContent as any) as {
    content: GuideContent;
    originalContent: GuideContent;
    isLoading: boolean;
    isSaving: boolean;
    hasChanges: boolean;
    updateField: <K extends keyof GuideContent>(field: K, value: GuideContent[K]) => void;
    save: () => Promise<boolean>;
    reset: () => void;
  };

  const {
    content: howItWorksContent,
    isLoading: isHowItWorksLoading,
    isSaving: isHowItWorksSaving,
    hasChanges: hasHowItWorksChanges,
    updateField: updateHowItWorksField,
    save: saveHowItWorks,
    reset: resetHowItWorks,
  } = useSectionContent('home', 'how-it-works', defaultHowItWorksContent as any) as {
    content: HowItWorksContent;
    originalContent: HowItWorksContent;
    isLoading: boolean;
    isSaving: boolean;
    hasChanges: boolean;
    updateField: <K extends keyof HowItWorksContent>(field: K, value: HowItWorksContent[K]) => void;
    save: () => Promise<boolean>;
    reset: () => void;
  };

  const {
    content: productsContent,
    isLoading: isProductsLoading,
    isSaving: isProductsSaving,
    hasChanges: hasProductsChanges,
    updateField: updateProductsField,
    save: saveProducts,
    reset: resetProducts,
  } = useSectionContent('home', 'products', defaultProductsContent as any) as {
    content: ProductsContent;
    originalContent: ProductsContent;
    isLoading: boolean;
    isSaving: boolean;
    hasChanges: boolean;
    updateField: <K extends keyof ProductsContent>(field: K, value: ProductsContent[K]) => void;
    save: () => Promise<boolean>;
    reset: () => void;
  };

  const {
    content: heroButtonsContent,
    isLoading: isHeroButtonsLoading,
    isSaving: isHeroButtonsSaving,
    hasChanges: hasHeroButtonsChanges,
    updateField: updateHeroButtonsField,
    save: saveHeroButtons,
    reset: resetHeroButtons,
  } = useSectionContent('home', 'hero-buttons', defaultHeroButtonsContent as any) as {
    content: HeroButtonsContent;
    originalContent: HeroButtonsContent;
    isLoading: boolean;
    isSaving: boolean;
    hasChanges: boolean;
    updateField: <K extends keyof HeroButtonsContent>(field: K, value: HeroButtonsContent[K]) => void;
    save: () => Promise<boolean>;
    reset: () => void;
  };

  const {
    content: testimonialsHeaderContent,
    isLoading: isTestimonialsHeaderLoading,
    isSaving: isTestimonialsHeaderSaving,
    hasChanges: hasTestimonialsHeaderChanges,
    updateField: updateTestimonialsHeaderField,
    save: saveTestimonialsHeader,
    reset: resetTestimonialsHeader,
  } = useSectionContent('home', 'testimonials-header', defaultTestimonialsHeaderContent as any) as {
    content: TestimonialsHeaderContent;
    originalContent: TestimonialsHeaderContent;
    isLoading: boolean;
    isSaving: boolean;
    hasChanges: boolean;
    updateField: <K extends keyof TestimonialsHeaderContent>(field: K, value: TestimonialsHeaderContent[K]) => void;
    save: () => Promise<boolean>;
    reset: () => void;
  };

  const {
    content: imagineContent,
    isLoading: isImagineLoading,
    isSaving: isImagineSaving,
    hasChanges: hasImagineChanges,
    updateField: updateImagineField,
    save: saveImagine,
    reset: resetImagine,
  } = useSectionContent('home', 'imagine', defaultImagineContent as any) as {
    content: ImagineContent;
    originalContent: ImagineContent;
    isLoading: boolean;
    isSaving: boolean;
    hasChanges: boolean;
    updateField: <K extends keyof ImagineContent>(field: K, value: ImagineContent[K]) => void;
    save: () => Promise<boolean>;
    reset: () => void;
  };

  const {
    content: ctaBannerContent,
    isLoading: isCTALoading,
    isSaving: isCTASaving,
    hasChanges: hasCTAChanges,
    updateField: updateCTAField,
    save: saveCTABanner,
    reset: resetCTABanner,
  } = useSectionContent('home', 'cta-banner', defaultCTABannerContent as any) as {
    content: CTABannerContent;
    originalContent: CTABannerContent;
    isLoading: boolean;
    isSaving: boolean;
    hasChanges: boolean;
    updateField: <K extends keyof CTABannerContent>(field: K, value: CTABannerContent[K]) => void;
    save: () => Promise<boolean>;
    reset: () => void;
  };

  const {
    content: locationsContent,
    isLoading: isLocationsLoading,
    isSaving: isLocationsSaving,
    hasChanges: hasLocationsChanges,
    updateField: updateLocationsField,
    save: saveLocations,
    reset: resetLocations,
  } = useSectionContent('home', 'locations', defaultLocationsContent as any) as {
    content: LocationsContent;
    originalContent: LocationsContent;
    isLoading: boolean;
    isSaving: boolean;
    hasChanges: boolean;
    updateField: <K extends keyof LocationsContent>(field: K, value: LocationsContent[K]) => void;
    save: () => Promise<boolean>;
    reset: () => void;
  };

  const {
    content: contactContent,
    isLoading: isContactLoading,
    isSaving: isContactSaving,
    hasChanges: hasContactChanges,
    updateField: updateContactField,
    save: saveContact,
    reset: resetContact,
  } = useSectionContent('home', 'contact', defaultContactContent as any) as {
    content: ContactContent;
    originalContent: ContactContent;
    isLoading: boolean;
    isSaving: boolean;
    hasChanges: boolean;
    updateField: <K extends keyof ContactContent>(field: K, value: ContactContent[K]) => void;
    save: () => Promise<boolean>;
    reset: () => void;
  };

  // Testimonials hook
  const {
    testimonials,
    hasChanges: hasTestimonialChanges,
    updateTestimonial,
    save: saveTestimonials,
    reset: resetTestimonials,
  } = useEditableTestimonials();

  // Local state for arrays
  const [localStakes, setLocalStakes] = useState<StakesContent>(defaultStakesContent);
  const [localHowItWorks, setLocalHowItWorks] = useState<HowItWorksContent>(defaultHowItWorksContent);
  const [localImagine, setLocalImagine] = useState<ImagineContent>(defaultImagineContent);
  const [localCTABanner, setLocalCTABanner] = useState<CTABannerContent>(defaultCTABannerContent);
  const [localLocations, setLocalLocations] = useState<LocationsContent>(defaultLocationsContent);
  const [localProducts, setLocalProducts] = useState<ProductsContent>(defaultProductsContent);
  const [localHeroButtons, setLocalHeroButtons] = useState<HeroButtonsContent>(defaultHeroButtonsContent);
  const [localTestimonialsHeader, setLocalTestimonialsHeader] = useState<TestimonialsHeaderContent>(defaultTestimonialsHeaderContent);

  // Sync local state
  useEffect(() => { if (stakesContent) setLocalStakes(stakesContent); }, [stakesContent]);
  useEffect(() => { if (howItWorksContent) setLocalHowItWorks(howItWorksContent); }, [howItWorksContent]);
  useEffect(() => { if (imagineContent) setLocalImagine(imagineContent); }, [imagineContent]);
  useEffect(() => { if (ctaBannerContent) setLocalCTABanner(ctaBannerContent); }, [ctaBannerContent]);
  useEffect(() => { if (locationsContent) setLocalLocations(locationsContent); }, [locationsContent]);
  useEffect(() => { if (productsContent) setLocalProducts(productsContent); }, [productsContent]);
  useEffect(() => { if (heroButtonsContent) setLocalHeroButtons(heroButtonsContent); }, [heroButtonsContent]);
  useEffect(() => { if (testimonialsHeaderContent) setLocalTestimonialsHeader(testimonialsHeaderContent); }, [testimonialsHeaderContent]);

  // Update functions for arrays
  const updatePainPoint = (index: number, field: 'title' | 'description', value: string) => {
    const newPainPoints = [...localStakes.painPoints];
    newPainPoints[index] = { ...newPainPoints[index], [field]: value };
    setLocalStakes({ ...localStakes, painPoints: newPainPoints });
    updateStakesField('painPoints', newPainPoints);
  };

  const updateStep = (index: number, field: 'title' | 'description', value: string) => {
    const newSteps = [...localHowItWorks.steps];
    newSteps[index] = { ...newSteps[index], [field]: value };
    setLocalHowItWorks({ ...localHowItWorks, steps: newSteps });
    updateHowItWorksField('steps', newSteps);
  };

  const updateBenefit = (index: number, value: string) => {
    const newBenefits = [...localImagine.benefits];
    newBenefits[index] = value;
    setLocalImagine({ ...localImagine, benefits: newBenefits });
    updateImagineField('benefits', newBenefits);
  };

  const updateProductStyle = (index: number, field: keyof ProductsContent['styles'][0], value: string | boolean) => {
    const newStyles = [...localProducts.styles];
    newStyles[index] = { ...newStyles[index], [field]: value };
    setLocalProducts({ ...localProducts, styles: newStyles });
    updateProductsField('styles', newStyles);
  };

  // Combined save/reset handlers
  const handleSave = async () => {
    await Promise.all([
      savePage(),
      saveStakes(),
      saveGuide(),
      saveHowItWorks(),
      saveProducts(),
      saveImagine(),
      saveCTABanner(),
      saveLocations(),
      saveContact(),
      saveTestimonials(),
      saveHeroButtons(),
      saveTestimonialsHeader(),
    ]);
  };

  const handleReset = () => {
    resetPage();
    resetStakes();
    resetGuide();
    resetHowItWorks();
    resetProducts();
    resetImagine();
    resetCTABanner();
    resetLocations();
    resetContact();
    resetTestimonials();
    resetHeroButtons();
    resetTestimonialsHeader();
    if (stakesContent) setLocalStakes(stakesContent);
    if (howItWorksContent) setLocalHowItWorks(howItWorksContent);
    if (imagineContent) setLocalImagine(imagineContent);
    if (ctaBannerContent) setLocalCTABanner(ctaBannerContent);
    if (locationsContent) setLocalLocations(locationsContent);
    if (productsContent) setLocalProducts(productsContent);
    if (heroButtonsContent) setLocalHeroButtons(heroButtonsContent);
    if (testimonialsHeaderContent) setLocalTestimonialsHeader(testimonialsHeaderContent);
  };

  const isLoading = isPageLoading || isStakesLoading || isGuideLoading || isHowItWorksLoading || isProductsLoading || isImagineLoading || isCTALoading || isLocationsLoading || isContactLoading || isHeroButtonsLoading || isTestimonialsHeaderLoading;
  const isSaving = isPageSaving || isStakesSaving || isGuideSaving || isHowItWorksSaving || isProductsSaving || isImagineSaving || isCTASaving || isLocationsSaving || isContactSaving || isHeroButtonsSaving || isTestimonialsHeaderSaving;
  const hasChanges = hasPageChanges || hasStakesChanges || hasGuideChanges || hasHowItWorksChanges || hasProductsChanges || hasImagineChanges || hasCTAChanges || hasLocationsChanges || hasContactChanges || hasTestimonialChanges || hasHeroButtonsChanges || hasTestimonialsHeaderChanges;

  if (isLoading) {
    return null;
  }

  return (
    <>
      <Helmet>
        <title>{content.metaTitle}</title>
        <meta name="description" content={content.metaDescription} />
        <meta property="og:title" content={content.metaTitle} />
        <meta property="og:description" content={content.metaDescription} />
        <meta name="twitter:title" content={content.metaTitle} />
        <meta name="twitter:description" content={content.metaDescription} />
      </Helmet>

      <div className="min-h-screen">
        <Header />

        <AdminEditMode
          isAdmin={isAdmin}
          isEditMode={isEditMode}
          hasChanges={hasChanges}
          isSaving={isSaving}
          onToggleEdit={startEditing}
          onSave={handleSave}
          onCancel={handleReset}
          pageSlug="home"
          showDuplicateDialog={showDuplicateDialog}
          showDeleteDialog={showDeleteDialog}
          newSlug={newSlug}
          isDuplicating={isDuplicating}
          isDeleting={isDeleting}
          onSetNewSlug={setNewSlug}
          onSetShowDuplicateDialog={setShowDuplicateDialog}
          onSetShowDeleteDialog={setShowDeleteDialog}
          onDuplicatePage={duplicatePage}
          onDeletePage={deletePage}
        />

        <main>
          {/* HERO SECTION */}
          <section className="relative min-h-screen flex items-center overflow-hidden">
            <picture className="absolute inset-0">
              <source media="(max-width: 768px)" srcSet={getMobileHeroImage(IMAGES.heroShed)} />
              <img src={cloudinaryImages.heroShed} alt="Summit Portable Buildings quality storage shed" loading="eager" decoding="async" width={1600} height={900} className="w-full h-full object-cover" />
            </picture>
            <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/80 to-black/60" />
            <div className="relative z-10 container-custom py-32 lg:py-40">
              <div className="max-w-3xl">
                <InlineEditable value={editedContent.tagline} fieldName="tagline" onChange={(v) => updateField('tagline', v)} isEditMode={isEditMode} className="text-secondary font-heading text-lg md:text-xl uppercase tracking-widest mb-4 animate-fade-in-up" as="p" />
                <div className="mb-6 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
                  <InlineEditable value={editedContent.heading} fieldName="heading" onChange={(v) => updateField('heading', v)} isEditMode={isEditMode} className="text-4xl md:text-5xl lg:text-6xl font-heading text-primary-foreground leading-tight" as="h1" />
                </div>
                <div className="mb-4 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                  <InlineEditable value={editedContent.subheading} fieldName="subheading" type="textarea" onChange={(v) => updateField('subheading', v)} isEditMode={isEditMode} className="text-lg md:text-xl text-primary-foreground/80 max-w-2xl" as="p" />
                </div>
                <div className="mb-8 animate-fade-in-up" style={{ animationDelay: '0.25s' }}>
                  <InlineEditable value={editedContent.ctaDescription} fieldName="CTA description" onChange={(v) => updateField('ctaDescription', v)} isEditMode={isEditMode} className="text-primary-foreground/70 max-w-2xl" as="p" />
                </div>
                <div className="flex flex-col sm:flex-row gap-4 mb-8 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
                  <InlineEditableButton
                    text={localHeroButtons.primaryButton}
                    href={localHeroButtons.primaryButtonLink}
                    onTextChange={(v) => { setLocalHeroButtons({ ...localHeroButtons, primaryButton: v }); updateHeroButtonsField('primaryButton', v); }}
                    onHrefChange={(v) => { setLocalHeroButtons({ ...localHeroButtons, primaryButtonLink: v }); updateHeroButtonsField('primaryButtonLink', v); }}
                    isEditMode={isEditMode}
                    isExternal={localHeroButtons.primaryButtonOpenInNewTab}
                    onExternalChange={(v) => { setLocalHeroButtons({ ...localHeroButtons, primaryButtonOpenInNewTab: v }); updateHeroButtonsField('primaryButtonOpenInNewTab', v); }}
                  >
                    <a
                      href={localHeroButtons.primaryButtonLink}
                      target={localHeroButtons.primaryButtonOpenInNewTab ? '_blank' : undefined}
                      rel={localHeroButtons.primaryButtonOpenInNewTab ? 'noopener noreferrer' : undefined}
                    >
                      <Button variant="hero" size="xl">
                        {localHeroButtons.primaryButton}
                        <ArrowRight className="w-5 h-5" />
                      </Button>
                    </a>
                  </InlineEditableButton>
                  <InlineEditableButton
                    text={localHeroButtons.secondaryButton}
                    href={localHeroButtons.secondaryButtonLink}
                    onTextChange={(v) => { setLocalHeroButtons({ ...localHeroButtons, secondaryButton: v }); updateHeroButtonsField('secondaryButton', v); }}
                    onHrefChange={(v) => { setLocalHeroButtons({ ...localHeroButtons, secondaryButtonLink: v }); updateHeroButtonsField('secondaryButtonLink', v); }}
                    isEditMode={isEditMode}
                    isExternal={localHeroButtons.secondaryButtonOpenInNewTab}
                    onExternalChange={(v) => { setLocalHeroButtons({ ...localHeroButtons, secondaryButtonOpenInNewTab: v }); updateHeroButtonsField('secondaryButtonOpenInNewTab', v); }}
                  >
                    <a
                      href={localHeroButtons.secondaryButtonLink}
                      target={localHeroButtons.secondaryButtonOpenInNewTab ? '_blank' : undefined}
                      rel={localHeroButtons.secondaryButtonOpenInNewTab ? 'noopener noreferrer' : undefined}
                    >
                      <Button variant="heroOutline" size="xl">{localHeroButtons.secondaryButton}</Button>
                    </a>
                  </InlineEditableButton>
                </div>
                <p className="text-primary-foreground/60 text-sm mb-6 animate-fade-in-up" style={{ animationDelay: '0.35s' }}>
                  Serving Missouri, Illinois, Kentucky & Arkansas since 2016
                </p>
                <div className="flex flex-wrap gap-6 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
                  {heroBadges.map((badge) => (
                    <div key={badge.label} className="flex items-center gap-2 text-primary-foreground/90">
                      <div className="w-8 h-8 rounded-full bg-secondary/20 flex items-center justify-center">
                        <badge.icon className="w-4 h-4 text-secondary" />
                      </div>
                      <span className="text-sm font-medium">{badge.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
              <div className="w-6 h-10 border-2 border-primary-foreground/40 rounded-full flex justify-center pt-2">
                <div className="w-1 h-2 bg-secondary rounded-full" />
              </div>
            </div>
          </section>

          {/* STAKES SECTION */}
          <section className="section-padding bg-navy text-primary-foreground">
            <div className="container-custom">
              <div className="text-center mb-12">
                <InlineEditable value={localStakes.tagline} fieldName="stakes tagline" onChange={(v) => { setLocalStakes({ ...localStakes, tagline: v }); updateStakesField('tagline', v); }} isEditMode={isEditMode} className="text-secondary font-heading uppercase tracking-widest mb-4 font-semibold" as="p" />
                <InlineEditable value={localStakes.heading} fieldName="stakes heading" onChange={(v) => { setLocalStakes({ ...localStakes, heading: v }); updateStakesField('heading', v); }} isEditMode={isEditMode} className="text-3xl md:text-4xl lg:text-5xl font-heading mb-6" as="h2" />
                <InlineEditable value={localStakes.subheading} fieldName="stakes subheading" onChange={(v) => { setLocalStakes({ ...localStakes, subheading: v }); updateStakesField('subheading', v); }} isEditMode={isEditMode} className="text-lg text-primary-foreground/90 max-w-2xl mx-auto" as="p" />
              </div>
              <div className="grid md:grid-cols-3 gap-8 mb-12">
                {localStakes.painPoints.map((point, index) => {
                  const Icon = stakesIcons[index] || Package;
                  return (
                    <div key={index} className="bg-primary-foreground/5 rounded-2xl p-8 text-center">
                      <div className="w-16 h-16 mx-auto mb-6 bg-secondary/20 rounded-2xl flex items-center justify-center">
                        <Icon className="w-8 h-8 text-secondary" />
                      </div>
                      <InlineEditable value={point.title} fieldName={`Pain point ${index + 1} title`} onChange={(v) => updatePainPoint(index, 'title', v)} isEditMode={isEditMode} className="font-heading text-xl font-bold mb-3" as="h3" />
                      <InlineEditable value={point.description} fieldName={`Pain point ${index + 1} description`} type="textarea" onChange={(v) => updatePainPoint(index, 'description', v)} isEditMode={isEditMode} className="text-primary-foreground/80 leading-relaxed" as="p" />
                    </div>
                  );
                })}
              </div>
              <InlineEditable value={localStakes.closingText} fieldName="stakes closing" onChange={(v) => { setLocalStakes({ ...localStakes, closingText: v }); updateStakesField('closingText', v); }} isEditMode={isEditMode} className="text-xl text-secondary font-semibold text-center" as="p" />
            </div>
          </section>

          {/* GUIDE SECTION */}
          <section className="section-padding bg-background">
            <div className="container-custom">
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div>
                  <InlineEditable value={guideContent.tagline} fieldName="guide tagline" onChange={(v) => updateGuideField('tagline', v)} isEditMode={isEditMode} className="text-secondary font-heading uppercase tracking-widest mb-4" as="p" />
                  <InlineEditable value={guideContent.heading} fieldName="guide heading" onChange={(v) => updateGuideField('heading', v)} isEditMode={isEditMode} className="text-3xl md:text-4xl lg:text-5xl font-heading text-foreground mb-6" as="h2" />
                  <InlineEditable value={guideContent.paragraph1} fieldName="guide paragraph 1" onChange={(v) => updateGuideField('paragraph1', v)} isEditMode={isEditMode} className="text-lg text-muted-foreground leading-relaxed mb-4" as="p" />
                  <InlineEditable value={guideContent.paragraph2} fieldName="guide paragraph 2" type="textarea" onChange={(v) => updateGuideField('paragraph2', v)} isEditMode={isEditMode} className="text-muted-foreground leading-relaxed mb-4" as="p" />
                  <InlineEditable value={guideContent.paragraph3} fieldName="guide paragraph 3" type="textarea" onChange={(v) => updateGuideField('paragraph3', v)} isEditMode={isEditMode} className="text-muted-foreground leading-relaxed mb-6" as="p" />
                  <InlineEditable value={guideContent.paragraph4} fieldName="guide paragraph 4" type="textarea" onChange={(v) => updateGuideField('paragraph4', v)} isEditMode={isEditMode} className="text-muted-foreground leading-relaxed mb-8" as="p" />
                  <div className="grid grid-cols-4 gap-4 mb-8">
                    {guideStats.map((stat) => (
                      <div key={stat.label} className="text-center">
                        <p className="text-3xl md:text-4xl font-heading text-primary font-bold">{stat.value}</p>
                        <p className="text-xs text-muted-foreground">{stat.label}</p>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  {guideCredentials.map((cred) => (
                    <div key={cred.label} className="bg-gradient-to-br from-primary/5 to-secondary/5 rounded-2xl p-6 text-center">
                      <div className="w-12 h-12 mx-auto mb-4 bg-primary/10 rounded-xl flex items-center justify-center">
                        <cred.icon className="w-6 h-6 text-primary" />
                      </div>
                      <h3 className="font-heading text-foreground font-bold mb-1">{cred.label}</h3>
                      <p className="text-sm text-muted-foreground">{cred.sublabel}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* HOW IT WORKS SECTION */}
          <section id="how-it-works" className="section-padding bg-muted/30">
            <div className="container-custom">
              <div className="text-center mb-16">
                <InlineEditable value={localHowItWorks.tagline} fieldName="how it works tagline" onChange={(v) => { setLocalHowItWorks({ ...localHowItWorks, tagline: v }); updateHowItWorksField('tagline', v); }} isEditMode={isEditMode} className="text-secondary font-heading uppercase tracking-widest mb-4" as="p" />
                <InlineEditable value={localHowItWorks.heading} fieldName="how it works heading" onChange={(v) => { setLocalHowItWorks({ ...localHowItWorks, heading: v }); updateHowItWorksField('heading', v); }} isEditMode={isEditMode} className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4" as="h2" />
                <InlineEditable value={localHowItWorks.subheading} fieldName="how it works subheading" onChange={(v) => { setLocalHowItWorks({ ...localHowItWorks, subheading: v }); updateHowItWorksField('subheading', v); }} isEditMode={isEditMode} className="text-lg text-muted-foreground max-w-2xl mx-auto" as="p" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 mb-12">
                {localHowItWorks.steps.map((step, index) => {
                  const Icon = howItWorksIcons[index] || Monitor;
                  return (
                    <div key={index} className="relative">
                      {index < localHowItWorks.steps.length - 1 && (
                        <div className="hidden md:block absolute top-16 left-[60%] w-[80%] h-0.5 bg-gradient-to-r from-secondary/50 to-secondary/10" />
                      )}
                      <div className="relative bg-card rounded-2xl p-8 shadow-lg border border-border/50 text-center h-full">
                        <div className="absolute -top-5 left-1/2 -translate-x-1/2 w-10 h-10 bg-secondary text-secondary-foreground rounded-full flex items-center justify-center font-heading font-bold text-lg shadow-lg">
                          {index + 1}
                        </div>
                        <div className="w-20 h-20 mx-auto mb-6 mt-4 bg-primary/10 rounded-2xl flex items-center justify-center">
                          <Icon className="w-10 h-10 text-primary" />
                        </div>
                        <InlineEditable value={step.title} fieldName={`Step ${index + 1} title`} onChange={(v) => updateStep(index, 'title', v)} isEditMode={isEditMode} className="font-heading text-xl font-bold text-foreground mb-4" as="h3" />
                        <InlineEditable value={step.description} fieldName={`Step ${index + 1} description`} type="textarea" onChange={(v) => updateStep(index, 'description', v)} isEditMode={isEditMode} className="text-muted-foreground leading-relaxed" as="p" />
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="text-center">
                <Button variant="hero" size="lg" className="text-lg px-10">
                  <InlineEditable value={localHowItWorks.buttonText} fieldName="how it works button" onChange={(v) => { setLocalHowItWorks({ ...localHowItWorks, buttonText: v }); updateHowItWorksField('buttonText', v); }} isEditMode={isEditMode} as="span" />
                </Button>
              </div>
            </div>
          </section>

          {/* PRODUCTS SECTION */}
          <section id="products" className="section-padding bg-background">
            <div className="container-custom">
              <div className="text-center max-w-3xl mx-auto mb-16">
                <InlineEditable value={productsContent.tagline} fieldName="products tagline" onChange={(v) => updateProductsField('tagline', v)} isEditMode={isEditMode} className="text-secondary font-heading uppercase tracking-widest mb-3" as="p" />
                <InlineEditable value={productsContent.heading} fieldName="products heading" onChange={(v) => updateProductsField('heading', v)} isEditMode={isEditMode} className="text-3xl md:text-4xl lg:text-5xl font-heading text-foreground mb-6" as="h2" />
                <InlineEditable value={productsContent.subheading} fieldName="products subheading" onChange={(v) => updateProductsField('subheading', v)} isEditMode={isEditMode} className="text-muted-foreground text-lg" as="p" />
              </div>
              <div className="bg-card rounded-lg shadow-lg overflow-hidden">
                <div className="bg-primary py-5 px-6">
                  <InlineEditable value={productsContent.sectionTitle} fieldName="products section title" onChange={(v) => updateProductsField('sectionTitle', v)} isEditMode={isEditMode} className="text-2xl md:text-3xl font-heading font-bold text-primary-foreground text-center uppercase tracking-wide" as="h3" />
                </div>
                <div className="p-6 md:p-10">
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 max-w-5xl mx-auto">
                    {localProducts.styles.map((style, index) => (
                      <div key={style.id} className="text-center group">
                        <Link
                          to={style.link}
                          target={style.openInNewTab ? '_blank' : undefined}
                          rel={style.openInNewTab ? 'noopener noreferrer' : undefined}
                          className="block"
                          tabIndex={isEditMode ? -1 : 0}
                          aria-hidden={isEditMode}
                          onClick={isEditMode ? (e) => e.preventDefault() : undefined}
                        >
                          <div className="aspect-square mb-4 overflow-hidden rounded-lg shadow-sm bg-muted">
                            <InlineEditableImage
                              src={style.image}
                              alt={style.name}
                              onImageChange={(url) => updateProductStyle(index, 'image', url)}
                              isEditMode={isEditMode}
                              imageClassName="w-full h-full transition-transform duration-300 group-hover:scale-105 object-cover"
                            />
                          </div>
                        </Link>
                        {isEditMode ? (
                          <>
                            <InlineEditableLink
                              text={style.name}
                              href={style.link}
                              onTextChange={(text) => updateProductStyle(index, 'name', text)}
                              onHrefChange={(href) => updateProductStyle(index, 'link', href)}
                              isEditMode={isEditMode}
                              isExternal={style.openInNewTab}
                              onExternalChange={(ext) => updateProductStyle(index, 'openInNewTab', ext)}
                              className="font-heading font-bold text-lg text-foreground hover:text-secondary transition-colors uppercase tracking-wide"
                            />
                            <InlineEditable
                              value={style.subtitle}
                              fieldName={`${style.name} subtitle`}
                              onChange={(v) => updateProductStyle(index, 'subtitle', v)}
                              isEditMode={isEditMode}
                              className="text-muted-foreground text-sm mt-1"
                              as="p"
                            />
                          </>
                        ) : (
                          <Link 
                            to={style.link} 
                            target={style.openInNewTab ? '_blank' : undefined}
                            rel={style.openInNewTab ? 'noopener noreferrer' : undefined}
                            className="block"
                          >
                            <h4 className="font-heading font-bold text-lg text-foreground group-hover:text-secondary transition-colors uppercase tracking-wide">
                              {style.name}
                            </h4>
                            <p className="text-muted-foreground text-sm mt-1">
                              {style.subtitle}
                            </p>
                          </Link>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="text-center mt-12">
                <Link to="/styles" className="text-secondary hover:text-secondary/80 font-semibold transition-colors">
                  <InlineEditable value={productsContent.linkText} fieldName="products link text" onChange={(v) => updateProductsField('linkText', v)} isEditMode={isEditMode} as="span" />
                </Link>
              </div>
            </div>
          </section>

          {/* IMAGINE SECTION */}
          <section className="section-padding bg-muted/30">
            <div className="container-custom">
              <div className="text-center mb-12">
                <InlineEditable value={localImagine.tagline} fieldName="imagine tagline" onChange={(v) => { setLocalImagine({ ...localImagine, tagline: v }); updateImagineField('tagline', v); }} isEditMode={isEditMode} className="text-secondary font-heading uppercase tracking-widest mb-4" as="p" />
                <InlineEditable value={localImagine.heading} fieldName="imagine heading" onChange={(v) => { setLocalImagine({ ...localImagine, heading: v }); updateImagineField('heading', v); }} isEditMode={isEditMode} className="text-3xl md:text-4xl lg:text-5xl font-heading text-foreground mb-6" as="h2" />
                <InlineEditable value={localImagine.subheading} fieldName="imagine subheading" type="textarea" onChange={(v) => { setLocalImagine({ ...localImagine, subheading: v }); updateImagineField('subheading', v); }} isEditMode={isEditMode} className="text-lg text-muted-foreground max-w-2xl mx-auto" as="p" />
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {localImagine.benefits.map((benefit, index) => {
                  const Icon = imagineIcons[index] || Car;
                  return (
                    <div key={index} className="flex items-center gap-4 bg-card rounded-xl p-5 border border-border/50">
                      <div className="w-12 h-12 bg-secondary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                        <Icon className="w-6 h-6 text-secondary" />
                      </div>
                      <InlineEditable value={benefit} fieldName={`Benefit ${index + 1}`} onChange={(v) => updateBenefit(index, v)} isEditMode={isEditMode} className="text-foreground font-medium" as="p" />
                    </div>
                  );
                })}
              </div>
            </div>
          </section>

          {/* CTA BANNER SECTION */}
          <section className="section-padding bg-gradient-to-r from-secondary to-primary">
            <div className="container-custom">
              <div className="max-w-4xl mx-auto text-center">
                <div className="inline-flex items-center gap-2 bg-primary-foreground/10 text-primary-foreground px-4 py-2 rounded-full mb-6">
                  <AlertTriangle className="w-4 h-4" />
                  <InlineEditable value={localCTABanner.badge} fieldName="cta badge" onChange={(v) => { setLocalCTABanner({ ...localCTABanner, badge: v }); updateCTAField('badge', v); }} isEditMode={isEditMode} className="text-sm font-medium" as="span" />
                </div>
                <InlineEditable value={localCTABanner.heading} fieldName="cta heading" onChange={(v) => { setLocalCTABanner({ ...localCTABanner, heading: v }); updateCTAField('heading', v); }} isEditMode={isEditMode} className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-primary-foreground mb-6" as="h2" />
                <InlineEditable value={localCTABanner.description1} fieldName="cta description 1" type="textarea" onChange={(v) => { setLocalCTABanner({ ...localCTABanner, description1: v }); updateCTAField('description1', v); }} isEditMode={isEditMode} className="text-primary-foreground/90 text-lg md:text-xl mb-4 max-w-3xl mx-auto" as="p" />
                <InlineEditable value={localCTABanner.description2} fieldName="cta description 2" onChange={(v) => { setLocalCTABanner({ ...localCTABanner, description2: v }); updateCTAField('description2', v); }} isEditMode={isEditMode} className="text-primary-foreground/80 mb-4 max-w-2xl mx-auto" as="p" />
                <InlineEditable value={localCTABanner.closingText} fieldName="cta closing" onChange={(v) => { setLocalCTABanner({ ...localCTABanner, closingText: v }); updateCTAField('closingText', v); }} isEditMode={isEditMode} className="text-primary-foreground font-semibold text-xl mb-8" as="p" />
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <InlineEditableButton
                    text={localCTABanner.ctaButton}
                    href={localCTABanner.buttonLink}
                    onTextChange={(v) => { setLocalCTABanner({ ...localCTABanner, ctaButton: v }); updateCTAField('ctaButton', v); }}
                    onHrefChange={(v) => { setLocalCTABanner({ ...localCTABanner, buttonLink: v }); updateCTAField('buttonLink', v); }}
                    isEditMode={isEditMode}
                    isExternal={localCTABanner.buttonOpenInNewTab}
                    onExternalChange={(v) => { setLocalCTABanner({ ...localCTABanner, buttonOpenInNewTab: v }); updateCTAField('buttonOpenInNewTab', v); }}
                  >
                    <a href={localCTABanner.buttonLink} target={localCTABanner.buttonOpenInNewTab ? '_blank' : undefined} rel={localCTABanner.buttonOpenInNewTab ? 'noopener noreferrer' : undefined}>
                      <Button variant="heroOutline" size="xl" className="bg-primary-foreground text-foreground hover:bg-primary-foreground/90">
                        {localCTABanner.ctaButton}
                        <ArrowRight className="w-5 h-5" />
                      </Button>
                    </a>
                  </InlineEditableButton>
                  <a href={`tel:${localCTABanner.phoneNumber.replace(/-/g, '')}`}>
                    <Button variant="heroOutline" size="xl">
                      <Phone className="w-5 h-5" />
                      Call {localCTABanner.phoneNumber}
                    </Button>
                  </a>
                </div>
              </div>
            </div>
          </section>

          {/* TESTIMONIALS SECTION */}
          <section className="section-padding bg-stone">
            <div className="container-custom">
              <div className="text-center max-w-3xl mx-auto mb-16">
                <InlineEditable value={localTestimonialsHeader.tagline} fieldName="testimonials tagline" onChange={(v) => { setLocalTestimonialsHeader({ ...localTestimonialsHeader, tagline: v }); updateTestimonialsHeaderField('tagline', v); }} isEditMode={isEditMode} className="text-secondary font-heading uppercase tracking-widest mb-3" as="p" />
                <InlineEditable value={localTestimonialsHeader.heading} fieldName="testimonials heading" onChange={(v) => { setLocalTestimonialsHeader({ ...localTestimonialsHeader, heading: v }); updateTestimonialsHeaderField('heading', v); }} isEditMode={isEditMode} className="text-3xl md:text-4xl lg:text-5xl font-heading text-foreground mb-6" as="h2" />
                <InlineEditable value={localTestimonialsHeader.subheading} fieldName="testimonials subheading" type="textarea" onChange={(v) => { setLocalTestimonialsHeader({ ...localTestimonialsHeader, subheading: v }); updateTestimonialsHeaderField('subheading', v); }} isEditMode={isEditMode} className="text-lg text-foreground/70" as="p" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {testimonials.map((testimonial) => (
                  <div key={testimonial.id} className="bg-card p-8 rounded-lg shadow-md relative">
                    <Quote className="w-10 h-10 text-secondary/20 absolute top-6 right-6" />
                    <div className="flex gap-1 mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 text-secondary fill-secondary" />
                      ))}
                    </div>
                    <div className="text-foreground/90 mb-6 leading-relaxed">
                      <InlineEditable value={`"${testimonial.text}"`} fieldName={`${testimonial.name}'s testimonial`} type="textarea" onChange={(v) => updateTestimonial(testimonial.id, 'text', v.replace(/^"|"$/g, ''))} isEditMode={isEditMode} as="p" />
                    </div>
                    <div>
                      <InlineEditable value={testimonial.name} fieldName="Name" onChange={(v) => updateTestimonial(testimonial.id, 'name', v)} isEditMode={isEditMode} className="font-heading text-foreground font-semibold" as="p" />
                      <p className="text-secondary text-sm font-medium mt-1">{testimonial.source || 'Google Review'}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* LOCATIONS SECTION */}
          <section id="locations" className="section-padding bg-background">
            <div className="container-custom">
              <div className="text-center max-w-3xl mx-auto mb-12">
                <InlineEditable value={localLocations.tagline} fieldName="locations tagline" onChange={(v) => { setLocalLocations({ ...localLocations, tagline: v }); updateLocationsField('tagline', v); }} isEditMode={isEditMode} className="text-secondary font-heading uppercase tracking-widest mb-3" as="p" />
                <InlineEditable value={localLocations.heading} fieldName="locations heading" onChange={(v) => { setLocalLocations({ ...localLocations, heading: v }); updateLocationsField('heading', v); }} isEditMode={isEditMode} className="text-3xl md:text-4xl lg:text-5xl font-heading text-foreground mb-6" as="h2" />
                <InlineEditable value={localLocations.subheading} fieldName="locations subheading" type="textarea" onChange={(v) => { setLocalLocations({ ...localLocations, subheading: v }); updateLocationsField('subheading', v); }} isEditMode={isEditMode} className="text-muted-foreground text-lg" as="p" />
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
                {stateData.map((state) => (
                  <div key={state.abbrev} className="bg-card p-6 rounded-lg shadow-md border border-border">
                    <div className="flex items-center gap-3 mb-4">
                      <span className="text-3xl font-heading font-bold text-primary">{state.abbrev}</span>
                      <h3 className="font-heading text-lg text-foreground">{state.state}</h3>
                    </div>
                    <ul className="space-y-1">
                      {state.cities.map((city) => (
                        <li key={city} className="text-muted-foreground text-sm">{city}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
              <InlineEditable value={localLocations.footerNote} fieldName="locations footer note" onChange={(v) => { setLocalLocations({ ...localLocations, footerNote: v }); updateLocationsField('footerNote', v); }} isEditMode={isEditMode} className="text-center text-muted-foreground mb-8" as="p" />
              <div className="bg-primary rounded-2xl p-8 md:p-12 text-center">
                <InlineEditable value={localLocations.ctaHeading} fieldName="locations cta heading" onChange={(v) => { setLocalLocations({ ...localLocations, ctaHeading: v }); updateLocationsField('ctaHeading', v); }} isEditMode={isEditMode} className="text-2xl md:text-3xl font-heading font-bold text-primary-foreground mb-4" as="h3" />
                <InlineEditable value={localLocations.ctaDescription} fieldName="locations cta description" type="textarea" onChange={(v) => { setLocalLocations({ ...localLocations, ctaDescription: v }); updateLocationsField('ctaDescription', v); }} isEditMode={isEditMode} className="text-primary-foreground/80 mb-8 max-w-2xl mx-auto" as="p" />
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <InlineEditableButton
                    text={localLocations.ctaButton}
                    href={localLocations.ctaButtonLink}
                    onTextChange={(v) => { setLocalLocations({ ...localLocations, ctaButton: v }); updateLocationsField('ctaButton', v); }}
                    onHrefChange={(v) => { setLocalLocations({ ...localLocations, ctaButtonLink: v }); updateLocationsField('ctaButtonLink', v); }}
                    isEditMode={isEditMode}
                    isExternal={localLocations.ctaButtonOpenInNewTab}
                    onExternalChange={(v) => { setLocalLocations({ ...localLocations, ctaButtonOpenInNewTab: v }); updateLocationsField('ctaButtonOpenInNewTab', v); }}
                  >
                    <a href={localLocations.ctaButtonLink} target={localLocations.ctaButtonOpenInNewTab ? '_blank' : undefined} rel={localLocations.ctaButtonOpenInNewTab ? 'noopener noreferrer' : undefined}>
                      <Button variant="hero" size="lg">
                        {localLocations.ctaButton}
                        <ArrowRight className="w-5 h-5" />
                      </Button>
                    </a>
                  </InlineEditableButton>
                  <Link to="/buyers-guide">
                    <Button variant="heroOutline" size="lg">
                      <InlineEditable value={localLocations.secondaryButton} fieldName="locations secondary button" onChange={(v) => { setLocalLocations({ ...localLocations, secondaryButton: v }); updateLocationsField('secondaryButton', v); }} isEditMode={isEditMode} as="span" />
                    </Button>
                  </Link>
                </div>
                <p className="text-primary-foreground/60 text-sm mt-6">
                  <InlineEditable value={localLocations.phoneText} fieldName="locations phone text" onChange={(v) => { setLocalLocations({ ...localLocations, phoneText: v }); updateLocationsField('phoneText', v); }} isEditMode={isEditMode} as="span" />{' '}
                  <a href="tel:5737474700" className="hover:text-secondary transition-colors underline">(573) 747-4700</a>
                </p>
              </div>
            </div>
          </section>

          {/* CONTACT SECTION */}
          <section id="contact" className="section-padding bg-primary">
            <div className="container-custom">
              <div className="text-center mb-12">
                <InlineEditable value={contactContent.tagline} fieldName="contact tagline" onChange={(v) => updateContactField('tagline', v)} isEditMode={isEditMode} className="text-secondary font-heading uppercase tracking-widest mb-3" as="p" />
                <InlineEditable value={contactContent.heading} fieldName="contact heading" onChange={(v) => updateContactField('heading', v)} isEditMode={isEditMode} className="text-3xl md:text-4xl lg:text-5xl font-heading text-primary-foreground mb-4" as="h2" />
                <InlineEditable value={contactContent.subheading} fieldName="contact subheading" type="textarea" onChange={(v) => updateContactField('subheading', v)} isEditMode={isEditMode} className="text-primary-foreground/70 text-lg max-w-2xl mx-auto" as="p" />
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
                <div className="lg:col-span-3 bg-card p-8 rounded-lg shadow-lg">
                  <ContactForm />
                </div>
                <div className="lg:col-span-2 space-y-8">
                  <div>
                    <InlineEditable value={contactContent.callTitle} fieldName="contact call title" onChange={(v) => updateContactField('callTitle', v)} isEditMode={isEditMode} className="font-heading text-xl text-primary-foreground mb-2" as="h3" />
                    <a href="tel:5737474700" className="flex items-center gap-3 text-secondary text-2xl font-bold hover:underline">
                      <Phone className="w-6 h-6" />
                      <InlineEditable value={contactContent.phoneNumber} fieldName="contact phone" onChange={(v) => updateContactField('phoneNumber', v)} isEditMode={isEditMode} as="span" />
                    </a>
                  </div>
                  <div>
                    <InlineEditable value={contactContent.locationTitle} fieldName="contact location title" onChange={(v) => updateContactField('locationTitle', v)} isEditMode={isEditMode} className="font-heading text-xl text-primary-foreground mb-2" as="h3" />
                    <div className="flex items-start gap-3 text-primary-foreground/70">
                      <MapPin className="w-5 h-5 text-secondary flex-shrink-0 mt-1" />
                      <div>
                        <InlineEditable value={contactContent.address1} fieldName="contact address 1" onChange={(v) => updateContactField('address1', v)} isEditMode={isEditMode} as="p" />
                        <InlineEditable value={contactContent.address2} fieldName="contact address 2" onChange={(v) => updateContactField('address2', v)} isEditMode={isEditMode} as="p" />
                      </div>
                    </div>
                  </div>
                  <div>
                    <InlineEditable value={contactContent.hoursTitle} fieldName="contact hours title" onChange={(v) => updateContactField('hoursTitle', v)} isEditMode={isEditMode} className="font-heading text-xl text-primary-foreground mb-2" as="h3" />
                    <div className="flex items-start gap-3 text-primary-foreground/70">
                      <Clock className="w-5 h-5 text-secondary flex-shrink-0 mt-1" />
                      <div>
                        <InlineEditable value={contactContent.hours1} fieldName="contact hours 1" onChange={(v) => updateContactField('hours1', v)} isEditMode={isEditMode} as="p" />
                        <InlineEditable value={contactContent.hours2} fieldName="contact hours 2" onChange={(v) => updateContactField('hours2', v)} isEditMode={isEditMode} as="p" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default Index;
