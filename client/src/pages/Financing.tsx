import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle2, Calendar, DollarSign, Home, FileText, CreditCard, Key, Truck, ShieldCheck, Percent, Building } from 'lucide-react';
import InventoryLink from '@/components/InventoryLink';
import { useAdminAuth } from '@/hooks/useAdminAuth';
import { useEditablePageContent, PageContent } from '@/hooks/useEditablePageContent';
import { useSectionContent } from '@/hooks/useSectionContent';
import { InlineEditable } from '@/components/admin/InlineEditable';
import InlineEditableButton from '@/components/admin/InlineEditableButton';
import { AdminEditMode } from '@/components/admin/AdminEditMode';

interface HeroContent {
  badge: string;
  heading: string;
  description: string;
  highlight: string;
  button1Text: string;
  button1Link: string;
  button2Text: string;
  button2Link: string;
}

interface HowItWorksStep {
  id: string;
  step: string;
  title: string;
  description: string;
}

interface HowItWorksContent {
  heading: string;
  steps: HowItWorksStep[];
}

interface RentToOwnContent {
  badge: string;
  heading: string;
  description: string;
  benefits: string[];
  card1Title: string;
  card1Description: string;
  card2Title: string;
  card2Description: string;
  card3Title: string;
  card3Description: string;
  card4Title: string;
  card4Description: string;
  downPaymentHeading: string;
  term24_36Title: string;
  term24_36Description: string;
  term24_36Note: string;
  term48_60Title: string;
  term48_60Description: string;
  term48_60Note: string;
  customNote: string;
  benefitsHeading: string;
  buttonText: string;
  buttonLink: string;
}

interface FinancingContent {
  badge: string;
  heading: string;
  description: string;
  benefits: string[];
  applyText: string;
  buttonText: string;
  buttonLink: string;
}

interface CtaContent {
  heading: string;
  description: string;
  button1Text: string;
  button1Link: string;
  button1OpenInNewTab: boolean;
  button3Text: string;
  button3Link: string;
}

const defaultHero: HeroContent = {
  badge: 'Flexible Payment Options',
  heading: 'Rent to Own or Finance Your Building',
  description: 'No credit check required for Rent to Own. Financing available with approved credit.',
  highlight: 'No Early Payoff Penalties on Either Option!',
  button1Text: 'Rent to Own',
  button1Link: '#rent-to-own',
  button2Text: 'Apply for Financing',
  button2Link: '#financing',
};

const defaultHowItWorks: HowItWorksContent = {
  heading: 'How It Works',
  steps: [
    { id: '1', step: '01', title: 'Select A Building', description: 'Select what you want to buy from our wide range of storage buildings, cabins, and garages.' },
    { id: '2', step: '02', title: 'Choose Your Option', description: 'Select Rent to Own (no credit check) or Financing (with approved credit).' },
    { id: '3', step: '03', title: 'Easy Approval', description: 'Rent to Own requires no credit check. Financing gets quick approval with Upgrade.' },
    { id: '4', step: '04', title: 'You Own It', description: 'Own it at the end of your term with flexible payments that fit your budget.' },
  ],
};

const defaultRentToOwn: RentToOwnContent = {
  badge: 'No Credit Check Required',
  heading: 'Rent to Own',
  description: 'Rent to Own is simply a rent payment each month that allows you to have a storage shed, garage, cabin, animal shelter, dog kennel or swing set for your backyard or business, when and where you need it. Once you make the last payment, ownership transfers to you!',
  benefits: [
    '90 Days Same as Cash',
    'No Credit Check - We Do Not Report to Credit Agencies',
    'Choose a monthly term and payment that works for you',
    'Pay a small down payment to have your building delivered',
    'Free Delivery and Setup of your building',
    'No early pay-off penalties',
    'Financial Hardship? Just call and we will pick up the building with no effect on your credit',
    'Own the structure at the end of the rental contract',
    'Save time & fuel - have storage in your own backyard',
    'Own it for life after the Contract is fulfilled',
    'Adds value to your home and property',
    'Portable - can be moved',
    '24, 36, 48, and 60 month terms available',
    'Pay Online - Set up automatic ACH, Debit Card or Credit Card payments',
  ],
  card1Title: '90 Days Same as Cash',
  card1Description: 'Pay off your building within 90 days and pay no additional rental fees - just the cash price!',
  card2Title: 'No Credit Check',
  card2Description: 'We do not run credit checks and do not report to credit agencies. Your credit score is not affected.',
  card3Title: 'Free Delivery & Setup',
  card3Description: 'Your building is delivered and set up at no extra charge within our delivery area.',
  card4Title: 'No Questions Asked Return',
  card4Description: 'Financial hardship? Just call and we will pick up the building at anytime with no effect on your credit score.',
  downPaymentHeading: 'Down Payment Requirements',
  term24_36Title: '24 & 36 Month Terms',
  term24_36Description: 'Only require first month\'s rent at time of sale',
  term24_36Note: '(For buildings up to $14,999)',
  term48_60Title: '48 & 60 Month Terms',
  term48_60Description: 'Require 2 months\' rent at time of sale',
  term48_60Note: '(For buildings up to $14,999)',
  customNote: 'Custom down payment required for buildings over $15,000. Contact a Sales Rep for more info.',
  benefitsHeading: 'Key Benefits',
  buttonText: 'Contact Us About Rent to Own',
  buttonLink: '/contact-us',
};

const defaultFinancing: FinancingContent = {
  badge: 'With Approved Credit',
  heading: 'Financing Through Upgrade',
  description: 'Summit Portable Buildings also offers financing provided by Upgrade. This is a standard installment loan agreement with approved credit - get 100% financing with rates as low as 9.99%.',
  benefits: [
    '100% financing available with approved credit',
    'Rates as low as 9.99% with approved credit',
    'Choose from 12, 24, 36, & 48 month terms',
    '5 easy payment options: online, phone, auto draft, mail, or call a rep',
    'No early pay-off penalties',
    'Quick Approval process',
  ],
  applyText: 'Find out if you\'re approved NOW by clicking the button below!',
  buttonText: 'Apply for Financing Now',
  buttonLink: 'https://upgrade.com/h/6lFlFMgaJZ',
};

const defaultCta: CtaContent = {
  heading: 'Ready to Get Started?',
  description: 'Whether you choose Rent to Own or Financing, we\'re here to help you get the perfect storage building for your needs.',
  button1Text: 'Build Your Own',
  button1Link: 'https://summitbuildings.shedpro.co/',
  button1OpenInNewTab: true,
  button3Text: 'Contact Us',
  button3Link: '/contact-us',
};

const defaultContent: PageContent = {
  heading: 'Financing',
  tagline: '',
  subheading: '',
  ctaHeading: '',
  ctaDescription: '',
  ctaButton: '',
  metaTitle: 'Financing & Rent to Own | Summit Portable Buildings',
  metaDescription: 'Flexible payment options for your storage building. Rent to Own with no credit check or financing with rates as low as 9.99%. Apply today!',
};

const iconComponents = { Home, FileText, CreditCard, Key };

const Financing = () => {
  const { isAdmin } = useAdminAuth();

  const { content, isLoading: isPageLoading, isSaving: isPageSaving, isEditMode, hasChanges: hasPageChanges, save: savePage, reset: resetPage, startEditing } = useEditablePageContent('financing', defaultContent);
  const { content: heroContent, isLoading: isHeroLoading, isSaving: isHeroSaving, hasChanges: hasHeroChanges, updateField: updateHeroField, save: saveHero, reset: resetHero } = useSectionContent('financing', 'hero', defaultHero as any) as { content: HeroContent; isLoading: boolean; isSaving: boolean; hasChanges: boolean; updateField: any; save: () => Promise<boolean>; reset: () => void };
  const { content: howItWorksContent, isLoading: isHowLoading, isSaving: isHowSaving, hasChanges: hasHowChanges, updateField: updateHowField, save: saveHow, reset: resetHow } = useSectionContent('financing', 'how-it-works', defaultHowItWorks as any) as { content: HowItWorksContent; isLoading: boolean; isSaving: boolean; hasChanges: boolean; updateField: any; save: () => Promise<boolean>; reset: () => void };
  const { content: rentToOwnContent, isLoading: isRtoLoading, isSaving: isRtoSaving, hasChanges: hasRtoChanges, updateField: updateRtoField, save: saveRto, reset: resetRto } = useSectionContent('financing', 'rent-to-own', defaultRentToOwn as any) as { content: RentToOwnContent; isLoading: boolean; isSaving: boolean; hasChanges: boolean; updateField: any; save: () => Promise<boolean>; reset: () => void };
  const { content: financingContent, isLoading: isFinLoading, isSaving: isFinSaving, hasChanges: hasFinChanges, updateField: updateFinField, save: saveFin, reset: resetFin } = useSectionContent('financing', 'financing', defaultFinancing as any) as { content: FinancingContent; isLoading: boolean; isSaving: boolean; hasChanges: boolean; updateField: any; save: () => Promise<boolean>; reset: () => void };
  const { content: ctaContent, isLoading: isCtaLoading, isSaving: isCtaSaving, hasChanges: hasCtaChanges, updateField: updateCtaField, save: saveCta, reset: resetCta } = useSectionContent('financing', 'cta', defaultCta as any) as { content: CtaContent; isLoading: boolean; isSaving: boolean; hasChanges: boolean; updateField: any; save: () => Promise<boolean>; reset: () => void };

  const [localHero, setLocalHero] = useState<HeroContent>(defaultHero);
  const [localHow, setLocalHow] = useState<HowItWorksContent>(defaultHowItWorks);
  const [localRto, setLocalRto] = useState<RentToOwnContent>(defaultRentToOwn);
  const [localFin, setLocalFin] = useState<FinancingContent>(defaultFinancing);
  const [localCta, setLocalCta] = useState<CtaContent>(defaultCta);

  useEffect(() => { if (heroContent) setLocalHero(heroContent); }, [heroContent]);
  useEffect(() => { if (howItWorksContent) setLocalHow(howItWorksContent); }, [howItWorksContent]);
  useEffect(() => { if (rentToOwnContent) setLocalRto(rentToOwnContent); }, [rentToOwnContent]);
  useEffect(() => { if (financingContent) setLocalFin(financingContent); }, [financingContent]);
  useEffect(() => { if (ctaContent) setLocalCta(ctaContent); }, [ctaContent]);

  const updateStep = (index: number, field: keyof HowItWorksStep, value: string) => {
    const updated = { ...localHow, steps: [...localHow.steps] };
    updated.steps[index] = { ...updated.steps[index], [field]: value };
    setLocalHow(updated);
    updateHowField('steps', updated.steps);
  };

  const updateRtoBenefit = (index: number, value: string) => {
    const updated = [...localRto.benefits];
    updated[index] = value;
    setLocalRto({ ...localRto, benefits: updated });
    updateRtoField('benefits', updated);
  };

  const updateFinBenefit = (index: number, value: string) => {
    const updated = [...localFin.benefits];
    updated[index] = value;
    setLocalFin({ ...localFin, benefits: updated });
    updateFinField('benefits', updated);
  };

  const handleSave = async () => {
    await Promise.all([savePage(), saveHero(), saveHow(), saveRto(), saveFin(), saveCta()]);
  };

  const handleReset = () => {
    resetPage(); resetHero(); resetHow(); resetRto(); resetFin(); resetCta();
    if (heroContent) setLocalHero(heroContent);
    if (howItWorksContent) setLocalHow(howItWorksContent);
    if (rentToOwnContent) setLocalRto(rentToOwnContent);
    if (financingContent) setLocalFin(financingContent);
    if (ctaContent) setLocalCta(ctaContent);
  };

  const isLoading = isPageLoading || isHeroLoading || isHowLoading || isRtoLoading || isFinLoading || isCtaLoading;
  const isSaving = isPageSaving || isHeroSaving || isHowSaving || isRtoSaving || isFinSaving || isCtaSaving;
  const hasChanges = hasPageChanges || hasHeroChanges || hasHowChanges || hasRtoChanges || hasFinChanges || hasCtaChanges;

  if (isLoading) return null;

  const stepIcons = [Home, FileText, CreditCard, Key];

  return (
    <>
      <Helmet>
        <title>{content.metaTitle}</title>
        <meta name="description" content={content.metaDescription} />
        <link rel="canonical" href="https://summitbuildings.com/financing" />
      </Helmet>
      
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
      
      <main className="pt-20">
        {/* Hero Section */}
        <section className="bg-primary py-16 md:py-24 relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0 bg-gradient-to-br from-secondary/30 to-transparent" />
          </div>
          <div className="container-custom relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <span className="inline-block bg-secondary text-secondary-foreground px-4 py-2 rounded-full text-sm font-semibold mb-6">
                <InlineEditable value={localHero.badge} fieldName="Hero badge" onChange={(v) => { setLocalHero({ ...localHero, badge: v }); updateHeroField('badge', v); }} isEditMode={isEditMode} as="span" />
              </span>
              <InlineEditable value={localHero.heading} fieldName="Hero heading" onChange={(v) => { setLocalHero({ ...localHero, heading: v }); updateHeroField('heading', v); }} isEditMode={isEditMode} className="font-heading text-3xl md:text-5xl lg:text-6xl text-primary-foreground mb-6" as="h1" />
              <InlineEditable value={localHero.description} fieldName="Hero description" onChange={(v) => { setLocalHero({ ...localHero, description: v }); updateHeroField('description', v); }} isEditMode={isEditMode} className="text-primary-foreground/90 text-xl md:text-2xl mb-4" as="p" />
              <InlineEditable value={localHero.highlight} fieldName="Hero highlight" onChange={(v) => { setLocalHero({ ...localHero, highlight: v }); updateHeroField('highlight', v); }} isEditMode={isEditMode} className="text-secondary text-lg font-semibold mb-8" as="p" />
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-secondary text-secondary-foreground hover:bg-secondary/90 text-lg px-8 py-6" asChild>
                  <a href={localHero.button1Link}>{localHero.button1Text}</a>
                </Button>
                <Button size="lg" variant="outline" className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground/10 text-lg px-8 py-6" asChild>
                  <a href={localHero.button2Link}>{localHero.button2Text}</a>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="py-16 bg-background">
          <div className="container-custom">
            <InlineEditable value={localHow.heading} fieldName="How it works heading" onChange={(v) => { setLocalHow({ ...localHow, heading: v }); updateHowField('heading', v); }} isEditMode={isEditMode} className="font-heading text-3xl md:text-4xl text-center mb-12" as="h2" />
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
              {localHow.steps.map((item, index) => {
                const IconComponent = stepIcons[index] || Home;
                return (
                  <div key={item.id} className="text-center relative">
                    {index < localHow.steps.length - 1 && (
                      <div className="hidden lg:block absolute top-10 left-[60%] w-[80%] h-0.5 bg-border" />
                    )}
                    <div className="relative z-10">
                      <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                        <IconComponent className="w-10 h-10 text-primary-foreground" />
                      </div>
                      <span className="inline-block bg-secondary text-secondary-foreground text-sm font-bold px-3 py-1 rounded-full mb-3">
                        Step {item.step}
                      </span>
                      <InlineEditable value={item.title} fieldName={`Step ${index + 1} title`} onChange={(v) => updateStep(index, 'title', v)} isEditMode={isEditMode} className="font-heading text-xl text-foreground mb-2" as="h3" />
                      <InlineEditable value={item.description} fieldName={`Step ${index + 1} description`} onChange={(v) => updateStep(index, 'description', v)} isEditMode={isEditMode} className="text-muted-foreground" as="p" />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Rent to Own Section */}
        <section id="rent-to-own" className="py-16 bg-muted scroll-mt-24">
          <div className="container-custom">
            <div className="max-w-5xl mx-auto">
              <div className="text-center mb-12">
                <span className="inline-block bg-secondary text-secondary-foreground px-4 py-2 rounded-full text-sm font-semibold mb-4">
                  <InlineEditable value={localRto.badge} fieldName="RTO badge" onChange={(v) => { setLocalRto({ ...localRto, badge: v }); updateRtoField('badge', v); }} isEditMode={isEditMode} as="span" />
                </span>
                <InlineEditable value={localRto.heading} fieldName="RTO heading" onChange={(v) => { setLocalRto({ ...localRto, heading: v }); updateRtoField('heading', v); }} isEditMode={isEditMode} className="font-heading text-3xl md:text-4xl text-foreground mb-4" as="h2" />
                <InlineEditable value={localRto.description} fieldName="RTO description" onChange={(v) => { setLocalRto({ ...localRto, description: v }); updateRtoField('description', v); }} isEditMode={isEditMode} className="text-lg text-muted-foreground max-w-3xl mx-auto" as="p" />
              </div>

              <div className="grid md:grid-cols-2 gap-8 mb-12">
                <Card className="border-2 border-secondary">
                  <CardContent className="pt-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center">
                        <Percent className="w-6 h-6 text-secondary" />
                      </div>
                      <InlineEditable value={localRto.card1Title} fieldName="RTO card 1 title" onChange={(v) => { setLocalRto({ ...localRto, card1Title: v }); updateRtoField('card1Title', v); }} isEditMode={isEditMode} className="font-heading text-xl text-foreground" as="h3" />
                    </div>
                    <InlineEditable value={localRto.card1Description} fieldName="RTO card 1 desc" onChange={(v) => { setLocalRto({ ...localRto, card1Description: v }); updateRtoField('card1Description', v); }} isEditMode={isEditMode} className="text-muted-foreground" as="p" />
                  </CardContent>
                </Card>

                <Card className="border-2 border-secondary">
                  <CardContent className="pt-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center">
                        <ShieldCheck className="w-6 h-6 text-secondary" />
                      </div>
                      <InlineEditable value={localRto.card2Title} fieldName="RTO card 2 title" onChange={(v) => { setLocalRto({ ...localRto, card2Title: v }); updateRtoField('card2Title', v); }} isEditMode={isEditMode} className="font-heading text-xl text-foreground" as="h3" />
                    </div>
                    <InlineEditable value={localRto.card2Description} fieldName="RTO card 2 desc" onChange={(v) => { setLocalRto({ ...localRto, card2Description: v }); updateRtoField('card2Description', v); }} isEditMode={isEditMode} className="text-muted-foreground" as="p" />
                  </CardContent>
                </Card>

                <Card className="border-2 border-secondary">
                  <CardContent className="pt-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center">
                        <Truck className="w-6 h-6 text-secondary" />
                      </div>
                      <InlineEditable value={localRto.card3Title} fieldName="RTO card 3 title" onChange={(v) => { setLocalRto({ ...localRto, card3Title: v }); updateRtoField('card3Title', v); }} isEditMode={isEditMode} className="font-heading text-xl text-foreground" as="h3" />
                    </div>
                    <InlineEditable value={localRto.card3Description} fieldName="RTO card 3 desc" onChange={(v) => { setLocalRto({ ...localRto, card3Description: v }); updateRtoField('card3Description', v); }} isEditMode={isEditMode} className="text-muted-foreground" as="p" />
                  </CardContent>
                </Card>

                <Card className="border-2 border-secondary">
                  <CardContent className="pt-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center">
                        <Building className="w-6 h-6 text-secondary" />
                      </div>
                      <InlineEditable value={localRto.card4Title} fieldName="RTO card 4 title" onChange={(v) => { setLocalRto({ ...localRto, card4Title: v }); updateRtoField('card4Title', v); }} isEditMode={isEditMode} className="font-heading text-xl text-foreground" as="h3" />
                    </div>
                    <InlineEditable value={localRto.card4Description} fieldName="RTO card 4 desc" onChange={(v) => { setLocalRto({ ...localRto, card4Description: v }); updateRtoField('card4Description', v); }} isEditMode={isEditMode} className="text-muted-foreground" as="p" />
                  </CardContent>
                </Card>
              </div>

              {/* Down Payment Info */}
              <div className="bg-card rounded-xl p-8 border border-border mb-12">
                <InlineEditable value={localRto.downPaymentHeading} fieldName="Down payment heading" onChange={(v) => { setLocalRto({ ...localRto, downPaymentHeading: v }); updateRtoField('downPaymentHeading', v); }} isEditMode={isEditMode} className="font-heading text-2xl text-foreground mb-6 text-center" as="h3" />
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-muted rounded-lg p-6">
                    <InlineEditable value={localRto.term24_36Title} fieldName="Term 24-36 title" onChange={(v) => { setLocalRto({ ...localRto, term24_36Title: v }); updateRtoField('term24_36Title', v); }} isEditMode={isEditMode} className="font-heading text-lg text-secondary mb-2" as="h4" />
                    <InlineEditable value={localRto.term24_36Description} fieldName="Term 24-36 desc" onChange={(v) => { setLocalRto({ ...localRto, term24_36Description: v }); updateRtoField('term24_36Description', v); }} isEditMode={isEditMode} className="text-foreground" as="p" />
                    <InlineEditable value={localRto.term24_36Note} fieldName="Term 24-36 note" onChange={(v) => { setLocalRto({ ...localRto, term24_36Note: v }); updateRtoField('term24_36Note', v); }} isEditMode={isEditMode} className="text-sm text-muted-foreground mt-1" as="p" />
                  </div>
                  <div className="bg-muted rounded-lg p-6">
                    <InlineEditable value={localRto.term48_60Title} fieldName="Term 48-60 title" onChange={(v) => { setLocalRto({ ...localRto, term48_60Title: v }); updateRtoField('term48_60Title', v); }} isEditMode={isEditMode} className="font-heading text-lg text-secondary mb-2" as="h4" />
                    <InlineEditable value={localRto.term48_60Description} fieldName="Term 48-60 desc" onChange={(v) => { setLocalRto({ ...localRto, term48_60Description: v }); updateRtoField('term48_60Description', v); }} isEditMode={isEditMode} className="text-foreground" as="p" />
                    <InlineEditable value={localRto.term48_60Note} fieldName="Term 48-60 note" onChange={(v) => { setLocalRto({ ...localRto, term48_60Note: v }); updateRtoField('term48_60Note', v); }} isEditMode={isEditMode} className="text-sm text-muted-foreground mt-1" as="p" />
                  </div>
                </div>
                <InlineEditable value={localRto.customNote} fieldName="Custom note" onChange={(v) => { setLocalRto({ ...localRto, customNote: v }); updateRtoField('customNote', v); }} isEditMode={isEditMode} className="text-center text-muted-foreground mt-6 text-sm" as="p" />
              </div>

              {/* All Benefits */}
              <InlineEditable value={localRto.benefitsHeading} fieldName="Benefits heading" onChange={(v) => { setLocalRto({ ...localRto, benefitsHeading: v }); updateRtoField('benefitsHeading', v); }} isEditMode={isEditMode} className="font-heading text-2xl text-foreground mb-6 text-center" as="h3" />
              <div className="grid sm:grid-cols-2 gap-4 mb-8">
                {localRto.benefits.map((benefit, index) => (
                  <div key={index} className="flex items-start gap-3 bg-card rounded-lg p-4 border border-border">
                    <CheckCircle2 className="w-5 h-5 text-secondary flex-shrink-0 mt-0.5" />
                    <InlineEditable value={benefit} fieldName={`RTO benefit ${index + 1}`} onChange={(v) => updateRtoBenefit(index, v)} isEditMode={isEditMode} className="text-foreground" as="span" />
                  </div>
                ))}
              </div>

              <div className="text-center">
                <Button size="lg" className="bg-secondary text-secondary-foreground hover:bg-secondary/90 text-lg px-8 py-6" asChild>
                  <a href={localRto.buttonLink}>{localRto.buttonText}</a>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Financing Section */}
        <section id="financing" className="py-16 bg-primary scroll-mt-24">
          <div className="container-custom">
            <div className="max-w-5xl mx-auto">
              <div className="text-center mb-12">
                <span className="inline-block bg-secondary text-secondary-foreground px-4 py-2 rounded-full text-sm font-semibold mb-4">
                  <InlineEditable value={localFin.badge} fieldName="Financing badge" onChange={(v) => { setLocalFin({ ...localFin, badge: v }); updateFinField('badge', v); }} isEditMode={isEditMode} as="span" />
                </span>
                <InlineEditable value={localFin.heading} fieldName="Financing heading" onChange={(v) => { setLocalFin({ ...localFin, heading: v }); updateFinField('heading', v); }} isEditMode={isEditMode} className="font-heading text-3xl md:text-4xl text-primary-foreground mb-4" as="h2" />
                <InlineEditable value={localFin.description} fieldName="Financing description" onChange={(v) => { setLocalFin({ ...localFin, description: v }); updateFinField('description', v); }} isEditMode={isEditMode} className="text-lg text-primary-foreground/80 max-w-3xl mx-auto" as="p" />
              </div>

              <div className="grid md:grid-cols-3 gap-6 mb-12">
                <Card className="bg-primary-foreground/10 border-primary-foreground/20">
                  <CardContent className="pt-6 text-center">
                    <div className="w-16 h-16 bg-secondary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Percent className="w-8 h-8 text-secondary" />
                    </div>
                    <h3 className="font-heading text-lg text-primary-foreground mb-2">Rates as Low as</h3>
                    <p className="text-3xl font-bold text-secondary">9.99%</p>
                    <p className="text-primary-foreground/70 text-sm mt-1">with approved credit</p>
                  </CardContent>
                </Card>

                <Card className="bg-primary-foreground/10 border-primary-foreground/20">
                  <CardContent className="pt-6 text-center">
                    <div className="w-16 h-16 bg-secondary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                      <DollarSign className="w-8 h-8 text-secondary" />
                    </div>
                    <h3 className="font-heading text-lg text-primary-foreground mb-2">100% Financing</h3>
                    <p className="text-3xl font-bold text-secondary">Available</p>
                    <p className="text-primary-foreground/70 text-sm mt-1">with approved credit</p>
                  </CardContent>
                </Card>

                <Card className="bg-primary-foreground/10 border-primary-foreground/20">
                  <CardContent className="pt-6 text-center">
                    <div className="w-16 h-16 bg-secondary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Calendar className="w-8 h-8 text-secondary" />
                    </div>
                    <h3 className="font-heading text-lg text-primary-foreground mb-2">Term Options</h3>
                    <p className="text-3xl font-bold text-secondary">12-48</p>
                    <p className="text-primary-foreground/70 text-sm mt-1">month terms available</p>
                  </CardContent>
                </Card>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
                {localFin.benefits.map((benefit, index) => (
                  <div key={index} className="flex items-start gap-3 bg-primary-foreground/10 rounded-lg p-4">
                    <CheckCircle2 className="w-5 h-5 text-secondary flex-shrink-0 mt-0.5" />
                    <InlineEditable value={benefit} fieldName={`Financing benefit ${index + 1}`} onChange={(v) => updateFinBenefit(index, v)} isEditMode={isEditMode} className="text-primary-foreground" as="span" />
                  </div>
                ))}
              </div>

              <div className="text-center">
                <InlineEditable value={localFin.applyText} fieldName="Apply text" onChange={(v) => { setLocalFin({ ...localFin, applyText: v }); updateFinField('applyText', v); }} isEditMode={isEditMode} className="text-primary-foreground/80 mb-6" as="p" />
                <Button size="lg" className="bg-secondary text-secondary-foreground hover:bg-secondary/90 text-lg px-8 py-6" asChild>
                  <a href={localFin.buttonLink} target="_blank" rel="noopener noreferrer">
                    {localFin.buttonText}
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-muted">
          <div className="container-custom text-center">
            <InlineEditable value={localCta.heading} fieldName="CTA heading" onChange={(v) => { setLocalCta({ ...localCta, heading: v }); updateCtaField('heading', v); }} isEditMode={isEditMode} className="font-heading text-2xl md:text-3xl text-foreground mb-4" as="h2" />
            <InlineEditable value={localCta.description} fieldName="CTA description" onChange={(v) => { setLocalCta({ ...localCta, description: v }); updateCtaField('description', v); }} isEditMode={isEditMode} className="text-muted-foreground mb-8 max-w-2xl mx-auto" as="p" />
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {isEditMode ? (
                <>
                  <InlineEditableButton
                    text={localCta.button1Text}
                    href={localCta.button1Link}
                    onTextChange={(v) => { setLocalCta({ ...localCta, button1Text: v }); updateCtaField('button1Text', v); }}
                    onHrefChange={(v) => { setLocalCta({ ...localCta, button1Link: v }); updateCtaField('button1Link', v); }}
                    isEditMode={isEditMode}
                    isExternal={localCta.button1OpenInNewTab}
                    onExternalChange={(v) => { setLocalCta({ ...localCta, button1OpenInNewTab: v }); updateCtaField('button1OpenInNewTab', v); }}
                  >
                    <Button size="lg" className="bg-secondary text-secondary-foreground hover:bg-secondary/90">{localCta.button1Text}</Button>
                  </InlineEditableButton>
                </>
              ) : (
                <>
                  <Button size="lg" className="bg-secondary text-secondary-foreground hover:bg-secondary/90" asChild>
                    <a href={localCta.button1Link} target={localCta.button1OpenInNewTab ? '_blank' : undefined} rel={localCta.button1OpenInNewTab ? 'noopener noreferrer' : undefined}>
                      {localCta.button1Text}
                    </a>
                  </Button>
                </>
              )}
              <Button size="lg" className="bg-secondary text-secondary-foreground hover:bg-secondary/90" asChild>
                <InventoryLink>Browse Our Inventory</InventoryLink>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <a href={localCta.button3Link}>{localCta.button3Text}</a>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
};

export default Financing;
