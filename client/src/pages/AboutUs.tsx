import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { 
  Heart, 
  Star, 
  Shield, 
  Users, 
  HandHeart,
  Hammer,
  CheckCircle,
  ArrowRight
} from 'lucide-react';
import { useAdminAuth } from '@/hooks/useAdminAuth';
import { useEditablePageContent, PageContent } from '@/hooks/useEditablePageContent';
import { useSectionContent } from '@/hooks/useSectionContent';
import { InlineEditable } from '@/components/admin/InlineEditable';
import InlineEditableButton from '@/components/admin/InlineEditableButton';
import { AdminEditMode } from '@/components/admin/AdminEditMode';

const iconMap: Record<string, any> = { Heart, Star, Shield, Users, HandHeart };

interface ValueItem {
  id: string;
  icon: string;
  title: string;
  description: string;
}

interface ValuesContent {
  values: ValueItem[];
}

interface FeaturesContent {
  features: string[];
}

interface ServiceAreasContent {
  missouri: string;
  illinois: string;
  kentucky: string;
}

interface HeroContent {
  tagline: string;
  heading: string;
  headingHighlight: string;
  subheading: string;
}

interface MissionContent {
  tagline: string;
  heading: string;
  description: string;
}

interface FamilyOwnedContent {
  tagline: string;
  heading: string;
  paragraph1: string;
  paragraph2: string;
  boxTitle: string;
  boxDescription: string;
}

interface CraftsmenContent {
  tagline: string;
  heading: string;
  description: string;
}

interface ServiceAreasSectionContent {
  tagline: string;
  heading: string;
  subheading: string;
}

interface CtaContent {
  heading: string;
  description: string;
  buttonText: string;
  buttonLink: string;
  buttonOpenInNewTab: boolean;
}

const defaultValues: ValuesContent = {
  values: [
    { id: 'faith', icon: 'Heart', title: 'Faith Based', description: "We believe in Someone Greater than ourselves. We promise to do all to the best of our ability and in an ethical manner from the sale to the delivery of your product." },
    { id: 'excellence', icon: 'Star', title: 'Excellence', description: "We strive to be the best at what we do, leading the way to excellence. Customer Service and taking care of the people we serve is the key to a successful business." },
    { id: 'responsibility', icon: 'Shield', title: 'Responsibility', description: "We desire to operate to the highest ethical & professional standards. We strive to earn your trust through honesty and integrity." },
    { id: 'community', icon: 'Users', title: 'Community', description: "We believe in playing our part in the community where we operate. We believe in being an asset to our local community." },
    { id: 'teamwork', icon: 'HandHeart', title: 'Team Work', description: "Teamwork and Diversity are the foundations of our success. From Builder to Sales Member to Delivery Driver, each one is a special part of the puzzle." },
  ]
};

const defaultFeatures: FeaturesContent = {
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
  ]
};

const defaultServiceAreas: ServiceAreasContent = {
  missouri: "Arnold, Fenton, Festus, Crystal City, Pevely, Herculaneum, Bloomsdale, High Ridge, House Springs, Cedar Hill, Saint Clair, Pacific, Eureka, Sullivan, Cuba, Rolla, Salem, Farmington, Cape Girardeau, Sikeston, and many more...",
  illinois: "Metropolis, Joppa, Vienna, Dongola, Anna, Jonesboro, Cobden, Carbondale, Murphysboro, Chester, Red Bud, and surrounding areas.",
  kentucky: "Mayfield, Murray, Benton, Paducah, and surrounding communities.",
};

const defaultHero: HeroContent = {
  tagline: "About Summit Buildings",
  heading: "Building Quality Structures",
  headingHighlight: "The Old Fashioned Way",
  subheading: "A family owned business that continues to strive for excellence & customer satisfaction.",
};

const defaultMission: MissionContent = {
  tagline: "Our Mission",
  heading: "To Build Storage Structures That Serve Our Neighbors",
  description: "We do this by building quality structures in our own shop, with customizable, high quality craftsmanship. Every building is constructed from the ground up—unlike factory-built buildings.",
};

const defaultFamilyOwned: FamilyOwnedContent = {
  tagline: "Family Owned",
  heading: "We Understand Your Storage Challenges",
  paragraph1: "With experience in Construction & Sales, we incorporate that expertise into each of our products. We've been helping customers with solutions to their needs by customizing Backyard Portable Offices, Storage Sheds, Portable Garages, Utility Buildings, Lofted Barns and Cabins, Tiny House Shells, and other styles.",
  paragraph2: "We construct various attractive, affordable, quality, hand-crafted, and durable Storage Buildings the old fashioned way—built from the ground up with care and attention to detail.",
  boxTitle: "The Old Fashioned Way",
  boxDescription: "Unlike factory-built buildings, we construct each structure from the ground up with skilled craftsmen who take pride in their work. Quality you can trust, built to last.",
};

const defaultCraftsmen: CraftsmenContent = {
  tagline: "Quality Materials",
  heading: "Skilled Craftsmen, Premium Products",
  description: "All of our buildings are built by skilled and experienced craftsmen. We are continually researching new and improved products to continue bringing our customers a quality building that is in fact the best money can buy: a Summit Building!",
};

const defaultServiceAreasSection: ServiceAreasSectionContent = {
  tagline: "Where We Serve",
  heading: "Service Areas",
  subheading: "Proudly serving communities across Missouri, Illinois, and Kentucky",
};

const defaultCta: CtaContent = {
  heading: "Ready to Get Started?",
  description: "Contact us today for a free, no-obligation quote on your dream building.",
  buttonText: "Get Your Free Quote",
  buttonLink: "/contact-us",
  buttonOpenInNewTab: false,
};

const defaultContent: PageContent = {
  heading: "About Us",
  tagline: "",
  subheading: "",
  ctaHeading: "",
  ctaDescription: "",
  ctaButton: "",
  metaTitle: "About Us | Summit Portable Buildings",
  metaDescription: "Learn about Summit Portable Buildings - a faith-based, family-owned business committed to excellence in building quality storage structures the old fashioned way.",
};

const AboutUs = () => {
  const { isAdmin } = useAdminAuth();

  const {
    content,
    isLoading: isPageLoading,
    isSaving: isPageSaving,
    isEditMode,
    hasChanges: hasPageChanges,
    save: savePage,
    reset: resetPage,
    startEditing,
  } = useEditablePageContent('about-us', defaultContent);

  const { content: heroContent, isLoading: isHeroLoading, isSaving: isHeroSaving, hasChanges: hasHeroChanges, updateField: updateHeroField, save: saveHero, reset: resetHero } = useSectionContent('about-us', 'hero', defaultHero as any) as { content: HeroContent; isLoading: boolean; isSaving: boolean; hasChanges: boolean; updateField: any; save: () => Promise<boolean>; reset: () => void };
  const { content: missionContent, isLoading: isMissionLoading, isSaving: isMissionSaving, hasChanges: hasMissionChanges, updateField: updateMissionField, save: saveMission, reset: resetMission } = useSectionContent('about-us', 'mission', defaultMission as any) as { content: MissionContent; isLoading: boolean; isSaving: boolean; hasChanges: boolean; updateField: any; save: () => Promise<boolean>; reset: () => void };
  const { content: familyOwnedContent, isLoading: isFamilyOwnedLoading, isSaving: isFamilyOwnedSaving, hasChanges: hasFamilyOwnedChanges, updateField: updateFamilyOwnedField, save: saveFamilyOwned, reset: resetFamilyOwned } = useSectionContent('about-us', 'family-owned', defaultFamilyOwned as any) as { content: FamilyOwnedContent; isLoading: boolean; isSaving: boolean; hasChanges: boolean; updateField: any; save: () => Promise<boolean>; reset: () => void };
  const { content: valuesContent, isLoading: isValuesLoading, isSaving: isValuesSaving, hasChanges: hasValuesChanges, updateField: updateValuesField, save: saveValues, reset: resetValues } = useSectionContent('about-us', 'values', defaultValues as any) as { content: ValuesContent; isLoading: boolean; isSaving: boolean; hasChanges: boolean; updateField: any; save: () => Promise<boolean>; reset: () => void };
  const { content: craftsmenContent, isLoading: isCraftsmenLoading, isSaving: isCraftsmenSaving, hasChanges: hasCraftsmenChanges, updateField: updateCraftsmenField, save: saveCraftsmen, reset: resetCraftsmen } = useSectionContent('about-us', 'craftsmen', defaultCraftsmen as any) as { content: CraftsmenContent; isLoading: boolean; isSaving: boolean; hasChanges: boolean; updateField: any; save: () => Promise<boolean>; reset: () => void };
  const { content: featuresContent, isLoading: isFeaturesLoading, isSaving: isFeaturesSaving, hasChanges: hasFeaturesChanges, updateField: updateFeaturesField, save: saveFeatures, reset: resetFeatures } = useSectionContent('about-us', 'features', defaultFeatures as any) as { content: FeaturesContent; isLoading: boolean; isSaving: boolean; hasChanges: boolean; updateField: any; save: () => Promise<boolean>; reset: () => void };
  const { content: serviceAreasSectionContent, isLoading: isServiceAreasSectionLoading, isSaving: isServiceAreasSectionSaving, hasChanges: hasServiceAreasSectionChanges, updateField: updateServiceAreasSectionField, save: saveServiceAreasSection, reset: resetServiceAreasSection } = useSectionContent('about-us', 'service-areas-section', defaultServiceAreasSection as any) as { content: ServiceAreasSectionContent; isLoading: boolean; isSaving: boolean; hasChanges: boolean; updateField: any; save: () => Promise<boolean>; reset: () => void };
  const { content: serviceAreasContent, isLoading: isServiceAreasLoading, isSaving: isServiceAreasSaving, hasChanges: hasServiceAreasChanges, updateField: updateServiceAreasField, save: saveServiceAreas, reset: resetServiceAreas } = useSectionContent('about-us', 'service-areas', defaultServiceAreas as any) as { content: ServiceAreasContent; isLoading: boolean; isSaving: boolean; hasChanges: boolean; updateField: any; save: () => Promise<boolean>; reset: () => void };
  const { content: ctaContent, isLoading: isCtaLoading, isSaving: isCtaSaving, hasChanges: hasCtaChanges, updateField: updateCtaField, save: saveCta, reset: resetCta } = useSectionContent('about-us', 'cta', defaultCta as any) as { content: CtaContent; isLoading: boolean; isSaving: boolean; hasChanges: boolean; updateField: any; save: () => Promise<boolean>; reset: () => void };

  const [localHero, setLocalHero] = useState<HeroContent>(defaultHero);
  const [localMission, setLocalMission] = useState<MissionContent>(defaultMission);
  const [localFamilyOwned, setLocalFamilyOwned] = useState<FamilyOwnedContent>(defaultFamilyOwned);
  const [localValues, setLocalValues] = useState<ValueItem[]>(defaultValues.values);
  const [localCraftsmen, setLocalCraftsmen] = useState<CraftsmenContent>(defaultCraftsmen);
  const [localFeatures, setLocalFeatures] = useState<string[]>(defaultFeatures.features);
  const [localServiceAreasSection, setLocalServiceAreasSection] = useState<ServiceAreasSectionContent>(defaultServiceAreasSection);
  const [localServiceAreas, setLocalServiceAreas] = useState<ServiceAreasContent>(defaultServiceAreas);
  const [localCta, setLocalCta] = useState<CtaContent>(defaultCta);

  useEffect(() => { if (heroContent) setLocalHero(heroContent); }, [heroContent]);
  useEffect(() => { if (missionContent) setLocalMission(missionContent); }, [missionContent]);
  useEffect(() => { if (familyOwnedContent) setLocalFamilyOwned(familyOwnedContent); }, [familyOwnedContent]);
  useEffect(() => { if (valuesContent?.values) setLocalValues(valuesContent.values); }, [valuesContent]);
  useEffect(() => { if (craftsmenContent) setLocalCraftsmen(craftsmenContent); }, [craftsmenContent]);
  useEffect(() => { if (featuresContent?.features) setLocalFeatures(featuresContent.features); }, [featuresContent]);
  useEffect(() => { if (serviceAreasSectionContent) setLocalServiceAreasSection(serviceAreasSectionContent); }, [serviceAreasSectionContent]);
  useEffect(() => { if (serviceAreasContent) setLocalServiceAreas(serviceAreasContent); }, [serviceAreasContent]);
  useEffect(() => { if (ctaContent) setLocalCta(ctaContent); }, [ctaContent]);

  const updateValue = (index: number, field: keyof ValueItem, value: string) => {
    const updated = [...localValues];
    updated[index] = { ...updated[index], [field]: value };
    setLocalValues(updated);
    updateValuesField('values', updated);
  };

  const updateFeature = (index: number, value: string) => {
    const updated = [...localFeatures];
    updated[index] = value;
    setLocalFeatures(updated);
    updateFeaturesField('features', updated);
  };

  const handleSave = async () => {
    await Promise.all([
      savePage(), saveHero(), saveMission(), saveFamilyOwned(), saveValues(),
      saveCraftsmen(), saveFeatures(), saveServiceAreasSection(), saveServiceAreas(), saveCta()
    ]);
  };

  const handleReset = () => {
    resetPage(); resetHero(); resetMission(); resetFamilyOwned(); resetValues();
    resetCraftsmen(); resetFeatures(); resetServiceAreasSection(); resetServiceAreas(); resetCta();
    if (heroContent) setLocalHero(heroContent);
    if (missionContent) setLocalMission(missionContent);
    if (familyOwnedContent) setLocalFamilyOwned(familyOwnedContent);
    if (valuesContent?.values) setLocalValues(valuesContent.values);
    if (craftsmenContent) setLocalCraftsmen(craftsmenContent);
    if (featuresContent?.features) setLocalFeatures(featuresContent.features);
    if (serviceAreasSectionContent) setLocalServiceAreasSection(serviceAreasSectionContent);
    if (serviceAreasContent) setLocalServiceAreas(serviceAreasContent);
    if (ctaContent) setLocalCta(ctaContent);
  };

  const isLoading = isPageLoading || isHeroLoading || isMissionLoading || isFamilyOwnedLoading || isValuesLoading || isCraftsmenLoading || isFeaturesLoading || isServiceAreasSectionLoading || isServiceAreasLoading || isCtaLoading;
  const isSaving = isPageSaving || isHeroSaving || isMissionSaving || isFamilyOwnedSaving || isValuesSaving || isCraftsmenSaving || isFeaturesSaving || isServiceAreasSectionSaving || isServiceAreasSaving || isCtaSaving;
  const hasChanges = hasPageChanges || hasHeroChanges || hasMissionChanges || hasFamilyOwnedChanges || hasValuesChanges || hasCraftsmenChanges || hasFeaturesChanges || hasServiceAreasSectionChanges || hasServiceAreasChanges || hasCtaChanges;

  if (isLoading) return null;

  return (
    <>
      <Helmet>
        <title>{content.metaTitle}</title>
        <meta name="description" content={content.metaDescription} />
        <meta property="og:title" content={content.metaTitle} />
        <meta property="og:description" content={content.metaDescription} />
        <link rel="canonical" href="https://summitbuildings.com/about-us" />
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
        />
        
        <main>
          {/* Hero Section */}
          <section className="pt-32 pb-20 bg-gradient-to-br from-navy via-navy-dark to-navy">
            <div className="container-custom">
              <div className="max-w-3xl">
                <InlineEditable value={localHero.tagline} fieldName="Hero tagline" onChange={(v) => { setLocalHero({ ...localHero, tagline: v }); updateHeroField('tagline', v); }} isEditMode={isEditMode} className="text-secondary font-heading text-lg uppercase tracking-widest mb-4" as="p" />
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading text-primary-foreground leading-tight mb-6">
                  <InlineEditable value={localHero.heading} fieldName="Hero heading" onChange={(v) => { setLocalHero({ ...localHero, heading: v }); updateHeroField('heading', v); }} isEditMode={isEditMode} as="span" /> <InlineEditable value={localHero.headingHighlight} fieldName="Hero heading highlight" onChange={(v) => { setLocalHero({ ...localHero, headingHighlight: v }); updateHeroField('headingHighlight', v); }} isEditMode={isEditMode} className="text-secondary" as="span" />
                </h1>
                <InlineEditable value={localHero.subheading} fieldName="Hero subheading" onChange={(v) => { setLocalHero({ ...localHero, subheading: v }); updateHeroField('subheading', v); }} isEditMode={isEditMode} className="text-lg text-primary-foreground/80 max-w-2xl" as="p" />
              </div>
            </div>
          </section>

          {/* Mission Statement */}
          <section className="section-padding bg-background">
            <div className="container-custom">
              <div className="max-w-4xl mx-auto text-center">
                <InlineEditable value={localMission.tagline} fieldName="Mission tagline" onChange={(v) => { setLocalMission({ ...localMission, tagline: v }); updateMissionField('tagline', v); }} isEditMode={isEditMode} className="text-secondary font-heading uppercase tracking-widest mb-4" as="p" />
                <InlineEditable value={localMission.heading} fieldName="Mission heading" onChange={(v) => { setLocalMission({ ...localMission, heading: v }); updateMissionField('heading', v); }} isEditMode={isEditMode} className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-6" as="h2" />
                <InlineEditable value={localMission.description} fieldName="Mission description" onChange={(v) => { setLocalMission({ ...localMission, description: v }); updateMissionField('description', v); }} isEditMode={isEditMode} className="text-xl text-muted-foreground leading-relaxed" as="p" />
              </div>
            </div>
          </section>

          {/* Family Owned + Guide Section */}
          <section className="section-padding bg-muted/30">
            <div className="container-custom">
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div>
                  <InlineEditable value={localFamilyOwned.tagline} fieldName="Family owned tagline" onChange={(v) => { setLocalFamilyOwned({ ...localFamilyOwned, tagline: v }); updateFamilyOwnedField('tagline', v); }} isEditMode={isEditMode} className="text-secondary font-heading uppercase tracking-widest mb-4" as="p" />
                  <InlineEditable value={localFamilyOwned.heading} fieldName="Family owned heading" onChange={(v) => { setLocalFamilyOwned({ ...localFamilyOwned, heading: v }); updateFamilyOwnedField('heading', v); }} isEditMode={isEditMode} className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-6" as="h2" />
                  <InlineEditable value={localFamilyOwned.paragraph1} fieldName="Family owned paragraph 1" onChange={(v) => { setLocalFamilyOwned({ ...localFamilyOwned, paragraph1: v }); updateFamilyOwnedField('paragraph1', v); }} isEditMode={isEditMode} className="text-muted-foreground leading-relaxed mb-6" as="p" />
                  <InlineEditable value={localFamilyOwned.paragraph2} fieldName="Family owned paragraph 2" onChange={(v) => { setLocalFamilyOwned({ ...localFamilyOwned, paragraph2: v }); updateFamilyOwnedField('paragraph2', v); }} isEditMode={isEditMode} className="text-muted-foreground leading-relaxed" as="p" />
                </div>
                <div className="bg-gradient-to-br from-primary/10 to-secondary/10 rounded-2xl p-8 lg:p-12">
                  <div className="flex items-center gap-4 mb-6">
                    <Hammer className="w-12 h-12 text-primary" />
                    <InlineEditable value={localFamilyOwned.boxTitle} fieldName="Box title" onChange={(v) => { setLocalFamilyOwned({ ...localFamilyOwned, boxTitle: v }); updateFamilyOwnedField('boxTitle', v); }} isEditMode={isEditMode} className="font-heading text-2xl font-bold text-foreground" as="h3" />
                  </div>
                  <InlineEditable value={localFamilyOwned.boxDescription} fieldName="Box description" onChange={(v) => { setLocalFamilyOwned({ ...localFamilyOwned, boxDescription: v }); updateFamilyOwnedField('boxDescription', v); }} isEditMode={isEditMode} className="text-muted-foreground leading-relaxed" as="p" />
                </div>
              </div>
            </div>
          </section>

          {/* Our Values */}
          <section className="section-padding bg-background">
            <div className="container-custom">
              <div className="text-center mb-16">
                <p className="text-secondary font-heading uppercase tracking-widest mb-4">What We Stand For</p>
                <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">Our Values</h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">The principles that guide everything we do</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {localValues.map((value, index) => {
                  const IconComponent = iconMap[value.icon] || Heart;
                  return (
                    <div key={value.id} className="bg-card rounded-2xl p-8 shadow-lg border border-border/50 hover:border-primary/30 hover:shadow-xl transition-all duration-300">
                      <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mb-6">
                        <IconComponent className="w-7 h-7 text-primary" />
                      </div>
                      <InlineEditable value={value.title} fieldName={`Value ${index + 1} title`} onChange={(v) => updateValue(index, 'title', v)} isEditMode={isEditMode} className="font-heading text-xl font-bold text-foreground mb-3" as="h3" />
                      <InlineEditable value={value.description} fieldName={`Value ${index + 1} description`} onChange={(v) => updateValue(index, 'description', v)} isEditMode={isEditMode} className="text-muted-foreground leading-relaxed" as="p" />
                    </div>
                  );
                })}
              </div>
            </div>
          </section>

          {/* Craftsmen & Features */}
          <section className="section-padding bg-navy text-primary-foreground">
            <div className="container-custom">
              <div className="max-w-3xl mx-auto text-center mb-12">
                <InlineEditable value={localCraftsmen.tagline} fieldName="Craftsmen tagline" onChange={(v) => { setLocalCraftsmen({ ...localCraftsmen, tagline: v }); updateCraftsmenField('tagline', v); }} isEditMode={isEditMode} className="text-secondary font-heading uppercase tracking-widest mb-4" as="p" />
                <InlineEditable value={localCraftsmen.heading} fieldName="Craftsmen heading" onChange={(v) => { setLocalCraftsmen({ ...localCraftsmen, heading: v }); updateCraftsmenField('heading', v); }} isEditMode={isEditMode} className="font-heading text-3xl md:text-4xl font-bold mb-6" as="h2" />
                <InlineEditable value={localCraftsmen.description} fieldName="Craftsmen description" onChange={(v) => { setLocalCraftsmen({ ...localCraftsmen, description: v }); updateCraftsmenField('description', v); }} isEditMode={isEditMode} className="text-primary-foreground/80 leading-relaxed" as="p" />
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {localFeatures.map((feature, index) => (
                  <div key={index} className="flex items-start gap-3 bg-primary-foreground/5 rounded-lg p-4">
                    <CheckCircle className="w-5 h-5 text-secondary flex-shrink-0 mt-0.5" />
                    <InlineEditable value={feature} fieldName={`Feature ${index + 1}`} onChange={(v) => updateFeature(index, v)} isEditMode={isEditMode} className="text-primary-foreground/90 text-sm leading-relaxed" as="span" />
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Service Areas */}
          <section className="section-padding bg-background">
            <div className="container-custom">
              <div className="text-center mb-12">
                <InlineEditable value={localServiceAreasSection.tagline} fieldName="Service areas tagline" onChange={(v) => { setLocalServiceAreasSection({ ...localServiceAreasSection, tagline: v }); updateServiceAreasSectionField('tagline', v); }} isEditMode={isEditMode} className="text-secondary font-heading uppercase tracking-widest mb-4" as="p" />
                <InlineEditable value={localServiceAreasSection.heading} fieldName="Service areas heading" onChange={(v) => { setLocalServiceAreasSection({ ...localServiceAreasSection, heading: v }); updateServiceAreasSectionField('heading', v); }} isEditMode={isEditMode} className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4" as="h2" />
                <InlineEditable value={localServiceAreasSection.subheading} fieldName="Service areas subheading" onChange={(v) => { setLocalServiceAreasSection({ ...localServiceAreasSection, subheading: v }); updateServiceAreasSectionField('subheading', v); }} isEditMode={isEditMode} className="text-lg text-muted-foreground max-w-2xl mx-auto" as="p" />
              </div>
              <div className="grid md:grid-cols-3 gap-8">
                <div className="bg-card rounded-2xl p-6 border border-border/50">
                  <h3 className="font-heading text-xl font-bold text-foreground mb-4 flex items-center gap-2">
                    <span className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-sm font-bold text-primary">MO</span>
                    Missouri
                  </h3>
                  <InlineEditable value={localServiceAreas.missouri} fieldName="Missouri areas" onChange={(v) => { setLocalServiceAreas({ ...localServiceAreas, missouri: v }); updateServiceAreasField('missouri', v); }} isEditMode={isEditMode} className="text-muted-foreground text-sm leading-relaxed" as="p" />
                </div>
                <div className="bg-card rounded-2xl p-6 border border-border/50">
                  <h3 className="font-heading text-xl font-bold text-foreground mb-4 flex items-center gap-2">
                    <span className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-sm font-bold text-primary">IL</span>
                    Illinois
                  </h3>
                  <InlineEditable value={localServiceAreas.illinois} fieldName="Illinois areas" onChange={(v) => { setLocalServiceAreas({ ...localServiceAreas, illinois: v }); updateServiceAreasField('illinois', v); }} isEditMode={isEditMode} className="text-muted-foreground text-sm leading-relaxed" as="p" />
                </div>
                <div className="bg-card rounded-2xl p-6 border border-border/50">
                  <h3 className="font-heading text-xl font-bold text-foreground mb-4 flex items-center gap-2">
                    <span className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-sm font-bold text-primary">KY</span>
                    Kentucky
                  </h3>
                  <InlineEditable value={localServiceAreas.kentucky} fieldName="Kentucky areas" onChange={(v) => { setLocalServiceAreas({ ...localServiceAreas, kentucky: v }); updateServiceAreasField('kentucky', v); }} isEditMode={isEditMode} className="text-muted-foreground text-sm leading-relaxed" as="p" />
                </div>
              </div>
            </div>
          </section>

          {/* CTA */}
          <section className="section-padding bg-gradient-to-r from-secondary to-primary">
            <div className="container-custom text-center">
              <InlineEditable value={localCta.heading} fieldName="CTA heading" onChange={(v) => { setLocalCta({ ...localCta, heading: v }); updateCtaField('heading', v); }} isEditMode={isEditMode} className="font-heading text-3xl md:text-4xl font-bold text-primary-foreground mb-4" as="h2" />
              <InlineEditable value={localCta.description} fieldName="CTA description" onChange={(v) => { setLocalCta({ ...localCta, description: v }); updateCtaField('description', v); }} isEditMode={isEditMode} className="text-primary-foreground/90 text-lg mb-8 max-w-2xl mx-auto" as="p" />
              {isEditMode ? (
                <InlineEditableButton
                  text={localCta.buttonText}
                  href={localCta.buttonLink}
                  onTextChange={(v) => { setLocalCta({ ...localCta, buttonText: v }); updateCtaField('buttonText', v); }}
                  onHrefChange={(v) => { setLocalCta({ ...localCta, buttonLink: v }); updateCtaField('buttonLink', v); }}
                  isEditMode={isEditMode}
                  isExternal={localCta.buttonOpenInNewTab}
                  onExternalChange={(v) => { setLocalCta({ ...localCta, buttonOpenInNewTab: v }); updateCtaField('buttonOpenInNewTab', v); }}
                >
                  <Button variant="heroOutline" size="xl" className="bg-primary-foreground text-foreground hover:bg-primary-foreground/90">
                    {localCta.buttonText}
                    <ArrowRight className="w-5 h-5" />
                  </Button>
                </InlineEditableButton>
              ) : (
                <Link to={localCta.buttonLink} target={localCta.buttonOpenInNewTab ? '_blank' : undefined} rel={localCta.buttonOpenInNewTab ? 'noopener noreferrer' : undefined}>
                  <Button variant="heroOutline" size="xl" className="bg-primary-foreground text-foreground hover:bg-primary-foreground/90">
                    {localCta.buttonText}
                    <ArrowRight className="w-5 h-5" />
                  </Button>
                </Link>
              )}
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default AboutUs;
