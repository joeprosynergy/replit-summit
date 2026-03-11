"use client";

/**
 * Traditional A-Frame Shed Landing Page
 * High-converting product landing page with full inline CMS editing.
 */

import React from 'react';
import Link from "next/link";
import { ArrowRight, Truck, CreditCard, Shield, Package, Home, Hammer, Heart, Monitor, Car, TrendingUp, Lock, Clock, Phone, MapPin, Check, Frown, ThumbsDown, Star } from 'lucide-react';
import ContactForm from '@/components/ContactForm';
import { Button } from '@/components/ui/button';
import { cloudinaryImages, getMobileHeroImage, IMAGES } from '@/lib/cloudinary';
import { InlineEditable } from '@/components/admin/InlineEditable';
import InlineEditableButton from '@/components/admin/InlineEditableButton';
import InlineEditableImage from '@/components/admin/InlineEditableImage';
import { EditablePageWrapper } from '@/components/admin/EditablePageWrapper';
import { TraditionalShedContent } from '@/data/defaults/traditionalShedDefaults';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  'truck': Truck, 'credit-card': CreditCard, 'shield': Shield, 'package': Package,
  'home': Home, 'hammer': Hammer, 'heart': Heart, 'monitor': Monitor,
  'car': Car, 'trending-up': TrendingUp, 'lock': Lock, 'clock': Clock,
};
const getIcon = (name: string, fallback: React.ComponentType<{ className?: string }> = Package) => iconMap[name] || fallback;
const stakesIcons = [ThumbsDown, Package, Star];
const howItWorksIcons = [Monitor, Hammer, Truck];

interface TraditionalShedPageClientProps {
  slug: string;
  defaults: TraditionalShedContent;
}

export default function TraditionalShedPageClient({ slug, defaults }: TraditionalShedPageClientProps) {
  return (
    <EditablePageWrapper<TraditionalShedContent>
      slug={slug}
      defaultContent={defaults}
    >
      {({ content: c, isEditMode, updateField }) => (
        <div className="min-h-screen">
          <div>
            {/* HERO SECTION */}
            <section className="relative min-h-screen flex items-center overflow-hidden">
              <picture className="absolute inset-0">
                <source media="(max-width: 768px)" srcSet={getMobileHeroImage(IMAGES.utilityShed3)} />
                <img src={cloudinaryImages.utilityShed3} alt="Traditional A-Frame storage shed" fetchPriority="high" loading="eager" decoding="async" width={1600} height={900} className="w-full h-full object-cover object-top" />
              </picture>
              <div className="absolute inset-0 bg-black/85" />
              <div className="relative z-10 container-custom py-32 lg:py-40">
                <div className="max-w-3xl mx-auto text-center">
                  <InlineEditable value={c.heroTagline} fieldName="heroTagline" onChange={(v) => updateField('heroTagline', v)} isEditMode={isEditMode} className="text-secondary font-heading text-lg md:text-xl uppercase tracking-widest mb-4 animate-fade-in-up" as="p" />
                  <div className="mb-6 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
                    <InlineEditable value={c.heroHeading} fieldName="heroHeading" onChange={(v) => updateField('heroHeading', v)} isEditMode={isEditMode} className="text-4xl md:text-5xl lg:text-6xl font-heading text-primary-foreground leading-tight" as="h1" />
                  </div>
                  <div className="mb-4 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                    <InlineEditable value={c.heroSubheading} fieldName="heroSubheading" type="textarea" onChange={(v) => updateField('heroSubheading', v)} isEditMode={isEditMode} className="text-lg md:text-xl text-primary-foreground/80 max-w-2xl mx-auto" as="p" />
                  </div>
                  <div className="mb-8 animate-fade-in-up" style={{ animationDelay: '0.25s' }}>
                    <InlineEditable value={c.heroCtaDescription} fieldName="heroCtaDescription" type="textarea" onChange={(v) => updateField('heroCtaDescription', v)} isEditMode={isEditMode} className="text-primary-foreground/70 max-w-2xl mx-auto" as="p" />
                  </div>
                  <div className="flex flex-col sm:flex-row gap-4 mb-4 justify-center animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
                    <InlineEditableButton text={c.heroButton1Text} href={c.heroButton1Link} onTextChange={(v) => updateField('heroButton1Text', v)} onHrefChange={(v) => updateField('heroButton1Link', v)} isEditMode={isEditMode} isExternal={c.heroButton1OpenInNewTab} onExternalChange={(v) => updateField('heroButton1OpenInNewTab', v)}>
                      <a href={c.heroButton1Link} target={c.heroButton1OpenInNewTab ? '_blank' : undefined} rel={c.heroButton1OpenInNewTab ? 'noopener noreferrer' : undefined}>
                        <Button variant="hero" size="xl">{c.heroButton1Text}<ArrowRight className="w-5 h-5" /></Button>
                      </a>
                    </InlineEditableButton>
                    <InlineEditableButton text={c.heroButton2Text} href={c.heroButton2Link} onTextChange={(v) => updateField('heroButton2Text', v)} onHrefChange={(v) => updateField('heroButton2Link', v)} isEditMode={isEditMode} isExternal={c.heroButton2OpenInNewTab} onExternalChange={(v) => updateField('heroButton2OpenInNewTab', v)}>
                      <a href={c.heroButton2Link} target={c.heroButton2OpenInNewTab ? '_blank' : undefined} rel={c.heroButton2OpenInNewTab ? 'noopener noreferrer' : undefined}>
                        <Button variant="heroOutline" size="xl">{c.heroButton2Text}</Button>
                      </a>
                    </InlineEditableButton>
                  </div>
                  <div className="mb-8 animate-fade-in-up" style={{ animationDelay: '0.32s' }}>
                    <a href="#contact" className="text-secondary hover:text-secondary/80 transition-colors text-sm font-medium underline underline-offset-4">
                      Or get a free quote — jump to the form below
                    </a>
                  </div>
                  <div className="animate-fade-in-up" style={{ animationDelay: '0.35s' }}>
                    <InlineEditable value={c.heroServiceText} fieldName="heroServiceText" onChange={(v) => updateField('heroServiceText', v)} isEditMode={isEditMode} className="text-primary-foreground/60 text-sm mb-6" as="p" />
                  </div>
                  <div className="flex flex-wrap gap-6 justify-center animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
                    {c.heroBadges.map((badge, index) => {
                      const BadgeIcon = getIcon(badge.icon, Truck);
                      return (
                        <div key={index} className="flex items-center gap-2 text-primary-foreground/90">
                          <div className="w-8 h-8 rounded-full bg-secondary/20 flex items-center justify-center">
                            <BadgeIcon className="w-4 h-4 text-secondary" />
                          </div>
                          <InlineEditable value={badge.label} fieldName={`Hero badge ${index + 1}`} onChange={(v) => { const updated = [...c.heroBadges]; updated[index] = { ...updated[index], label: v }; updateField('heroBadges', updated as unknown as string); }} isEditMode={isEditMode} className="text-sm font-medium" as="span" />
                        </div>
                      );
                    })}
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
                  <InlineEditable value={c.stakesTagline} fieldName="stakesTagline" onChange={(v) => updateField('stakesTagline', v)} isEditMode={isEditMode} className="text-secondary font-heading uppercase tracking-widest mb-4 font-semibold" as="p" />
                  <InlineEditable value={c.stakesHeading} fieldName="stakesHeading" onChange={(v) => updateField('stakesHeading', v)} isEditMode={isEditMode} className="text-3xl md:text-4xl lg:text-5xl font-heading mb-6" as="h2" />
                  <InlineEditable value={c.stakesSubheading} fieldName="stakesSubheading" type="textarea" onChange={(v) => updateField('stakesSubheading', v)} isEditMode={isEditMode} className="text-lg text-primary-foreground/90 max-w-2xl mx-auto" as="p" />
                </div>
                <div className="grid md:grid-cols-3 gap-8 mb-12">
                  {c.stakesPainPoints.map((point, index) => {
                    const Icon = stakesIcons[index] || Package;
                    return (
                      <div key={index} className="bg-primary-foreground/5 rounded-2xl p-8 text-center">
                        <div className="w-16 h-16 mx-auto mb-6 bg-secondary/20 rounded-2xl flex items-center justify-center">
                          <Icon className="w-8 h-8 text-secondary" />
                        </div>
                        <InlineEditable value={point.title} fieldName={`Pain point ${index + 1} title`} onChange={(v) => { const updated = [...c.stakesPainPoints]; updated[index] = { ...updated[index], title: v }; updateField('stakesPainPoints', updated as unknown as string); }} isEditMode={isEditMode} className="font-heading text-xl font-bold mb-3" as="h3" />
                        <InlineEditable value={point.description} fieldName={`Pain point ${index + 1} description`} type="textarea" onChange={(v) => { const updated = [...c.stakesPainPoints]; updated[index] = { ...updated[index], description: v }; updateField('stakesPainPoints', updated as unknown as string); }} isEditMode={isEditMode} className="text-primary-foreground/80 leading-relaxed" as="p" />
                      </div>
                    );
                  })}
                </div>
                <InlineEditable value={c.stakesClosingText} fieldName="stakesClosingText" onChange={(v) => updateField('stakesClosingText', v)} isEditMode={isEditMode} className="text-xl text-secondary font-semibold text-center" as="p" />
              </div>
            </section>

            {/* PRODUCT TIERS SECTION */}
            <section className="section-padding bg-background">
              <div className="container-custom">
                <div className="text-center mb-16">
                  <InlineEditable value={c.tiersTagline} fieldName="tiersTagline" onChange={(v) => updateField('tiersTagline', v)} isEditMode={isEditMode} className="text-secondary font-heading uppercase tracking-widest mb-4" as="p" />
                  <InlineEditable value={c.tiersHeading} fieldName="tiersHeading" onChange={(v) => updateField('tiersHeading', v)} isEditMode={isEditMode} className="text-3xl md:text-4xl lg:text-5xl font-heading text-foreground mb-6" as="h2" />
                  <InlineEditable value={c.tiersSubheading} fieldName="tiersSubheading" type="textarea" onChange={(v) => updateField('tiersSubheading', v)} isEditMode={isEditMode} className="text-lg text-muted-foreground max-w-2xl mx-auto" as="p" />
                </div>
                <div className="grid md:grid-cols-3 gap-8">
                  {c.tiers.map((tier, index) => (
                    <div key={index} className="bg-card rounded-2xl shadow-lg border border-border/50 overflow-hidden flex flex-col">
                      <div className="relative">
                        <InlineEditableImage
                          src={tier.image}
                          alt={`${tier.name} traditional A-frame shed`}
                          onImageChange={(url) => { const updated = [...c.tiers]; updated[index] = { ...updated[index], image: url }; updateField('tiers', updated as unknown as string); }}
                          isEditMode={isEditMode}
                          imageClassName="w-full h-56 object-contain bg-muted/50 p-2"
                        />
                        {(tier.badge || isEditMode) && (
                          <span className="absolute top-4 right-4 bg-secondary text-secondary-foreground text-xs font-heading font-bold uppercase px-3 py-1 rounded-full">
                            <InlineEditable value={tier.badge || '(add badge)'} fieldName={`Tier ${index + 1} badge`} onChange={(v) => { const updated = [...c.tiers]; updated[index] = { ...updated[index], badge: v === '(add badge)' ? '' : v }; updateField('tiers', updated as unknown as string); }} isEditMode={isEditMode} className="" as="span" />
                          </span>
                        )}
                      </div>
                      <div className="p-6 flex flex-col flex-grow">
                        <InlineEditable value={tier.name} fieldName={`Tier ${index + 1} name`} onChange={(v) => { const updated = [...c.tiers]; updated[index] = { ...updated[index], name: v }; updateField('tiers', updated as unknown as string); }} isEditMode={isEditMode} className="font-heading text-2xl font-bold text-foreground mb-3" as="h3" />
                        <InlineEditable value={tier.description} fieldName={`Tier ${index + 1} description`} type="textarea" onChange={(v) => { const updated = [...c.tiers]; updated[index] = { ...updated[index], description: v }; updateField('tiers', updated as unknown as string); }} isEditMode={isEditMode} className="text-muted-foreground mb-6 leading-relaxed" as="p" />
                        <ul className="space-y-3 mb-6 flex-grow">
                          {tier.features.map((feature, fIdx) => (
                            <li key={fIdx} className="flex items-start gap-2">
                              <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                              <InlineEditable value={feature} fieldName={`Tier ${index + 1} feature ${fIdx + 1}`} onChange={(v) => { const updated = [...c.tiers]; const features = [...updated[index].features]; features[fIdx] = v; updated[index] = { ...updated[index], features }; updateField('tiers', updated as unknown as string); }} isEditMode={isEditMode} className="text-sm text-foreground" as="span" />
                            </li>
                          ))}
                        </ul>
                        <InlineEditableButton text={tier.buttonText} href={tier.buttonLink} onTextChange={(v) => { const updated = [...c.tiers]; updated[index] = { ...updated[index], buttonText: v }; updateField('tiers', updated as unknown as string); }} onHrefChange={(v) => { const updated = [...c.tiers]; updated[index] = { ...updated[index], buttonLink: v }; updateField('tiers', updated as unknown as string); }} isEditMode={isEditMode} isExternal={tier.buttonOpenInNewTab} onExternalChange={(v) => { const updated = [...c.tiers]; updated[index] = { ...updated[index], buttonOpenInNewTab: v }; updateField('tiers', updated as unknown as string); }}>
                          <a href={tier.buttonLink} target={tier.buttonOpenInNewTab ? '_blank' : undefined} rel={tier.buttonOpenInNewTab ? 'noopener noreferrer' : undefined} className="block">
                            <Button variant="hero" size="lg" className="w-full">{tier.buttonText}<ArrowRight className="w-4 h-4" /></Button>
                          </a>
                        </InlineEditableButton>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* FEATURES SECTION */}
            <section className="section-padding bg-muted/30">
              <div className="container-custom">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                  <div>
                    <InlineEditable value={c.featuresTagline} fieldName="featuresTagline" onChange={(v) => updateField('featuresTagline', v)} isEditMode={isEditMode} className="text-secondary font-heading uppercase tracking-widest mb-4" as="p" />
                    <InlineEditable value={c.featuresHeading} fieldName="featuresHeading" onChange={(v) => updateField('featuresHeading', v)} isEditMode={isEditMode} className="text-3xl md:text-4xl lg:text-5xl font-heading text-foreground mb-6" as="h2" />
                    <InlineEditable value={c.featuresDescription} fieldName="featuresDescription" type="textarea" onChange={(v) => updateField('featuresDescription', v)} isEditMode={isEditMode} className="text-muted-foreground leading-relaxed mb-8" as="p" />
                    <ul className="space-y-4 mb-6">
                      {c.featuresList.map((feature, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                          <InlineEditable value={feature} fieldName={`Feature ${index + 1}`} onChange={(v) => { const updated = [...c.featuresList]; updated[index] = v; updateField('featuresList', updated as unknown as string); }} isEditMode={isEditMode} className="text-foreground" as="span" />
                        </li>
                      ))}
                    </ul>
                    <InlineEditable value={c.featuresNote} fieldName="featuresNote" onChange={(v) => updateField('featuresNote', v)} isEditMode={isEditMode} className="text-sm text-muted-foreground italic" as="p" />
                  </div>
                  <div className="relative">
                    <InlineEditableImage
                      src={c.featuresImage}
                      alt={c.featuresImageAlt}
                      onImageChange={(url) => updateField('featuresImage', url)}
                      isEditMode={isEditMode}
                      imageClassName="rounded-2xl shadow-xl w-full object-contain bg-muted/30 p-2"
                    />
                  </div>
                </div>
              </div>
            </section>

            {/* GALLERY SECTION */}
            <section className="section-padding bg-background">
              <div className="container-custom">
                <div className="text-center mb-12">
                  <InlineEditable value={c.galleryTagline} fieldName="galleryTagline" onChange={(v) => updateField('galleryTagline', v)} isEditMode={isEditMode} className="text-secondary font-heading uppercase tracking-widest mb-4" as="p" />
                  <InlineEditable value={c.galleryHeading} fieldName="galleryHeading" onChange={(v) => updateField('galleryHeading', v)} isEditMode={isEditMode} className="text-3xl md:text-4xl lg:text-5xl font-heading text-foreground mb-6" as="h2" />
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {c.galleryImages.map((img, index) => (
                    <div key={index} className="rounded-lg overflow-hidden shadow-md bg-muted/30">
                      <InlineEditableImage
                        src={img.src}
                        alt={img.alt}
                        onImageChange={(url) => { const updated = [...c.galleryImages]; updated[index] = { ...updated[index], src: url }; updateField('galleryImages', updated as unknown as string); }}
                        isEditMode={isEditMode}
                        imageClassName="w-full h-48 md:h-64 object-contain p-2 hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* USES SECTION */}
            <section className="section-padding bg-muted/30">
              <div className="container-custom">
                <div className="text-center mb-12">
                  <InlineEditable value={c.usesTagline} fieldName="usesTagline" onChange={(v) => updateField('usesTagline', v)} isEditMode={isEditMode} className="text-secondary font-heading uppercase tracking-widest mb-4" as="p" />
                  <InlineEditable value={c.usesHeading} fieldName="usesHeading" onChange={(v) => updateField('usesHeading', v)} isEditMode={isEditMode} className="text-3xl md:text-4xl lg:text-5xl font-heading text-foreground mb-6" as="h2" />
                  <InlineEditable value={c.usesSubheading} fieldName="usesSubheading" type="textarea" onChange={(v) => updateField('usesSubheading', v)} isEditMode={isEditMode} className="text-lg text-muted-foreground max-w-2xl mx-auto" as="p" />
                </div>
                <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-w-5xl mx-auto mb-8">
                  {c.usesList.map((use, index) => (
                    <div key={index} className="flex items-center gap-3 bg-background p-4 rounded-lg shadow-sm">
                      <Check className="w-5 h-5 text-primary flex-shrink-0" />
                      <InlineEditable value={use} fieldName={`Use ${index + 1}`} onChange={(v) => { const updated = [...c.usesList]; updated[index] = v; updateField('usesList', updated as unknown as string); }} isEditMode={isEditMode} className="text-foreground text-sm font-medium" as="span" />
                    </div>
                  ))}
                </div>
                <InlineEditable value={c.usesNote} fieldName="usesNote" type="textarea" onChange={(v) => updateField('usesNote', v)} isEditMode={isEditMode} className="text-muted-foreground text-center max-w-2xl mx-auto" as="p" />
              </div>
            </section>

            {/* HOW IT WORKS SECTION */}
            <section className="section-padding bg-background">
              <div className="container-custom">
                <div className="text-center mb-16">
                  <InlineEditable value={c.howItWorksTagline} fieldName="howItWorksTagline" onChange={(v) => updateField('howItWorksTagline', v)} isEditMode={isEditMode} className="text-secondary font-heading uppercase tracking-widest mb-4" as="p" />
                  <InlineEditable value={c.howItWorksHeading} fieldName="howItWorksHeading" onChange={(v) => updateField('howItWorksHeading', v)} isEditMode={isEditMode} className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4" as="h2" />
                  <InlineEditable value={c.howItWorksSubheading} fieldName="howItWorksSubheading" type="textarea" onChange={(v) => updateField('howItWorksSubheading', v)} isEditMode={isEditMode} className="text-lg text-muted-foreground max-w-2xl mx-auto" as="p" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
                  {c.howItWorksSteps.map((step, index) => {
                    const Icon = howItWorksIcons[index] || Monitor;
                    return (
                      <div key={index} className="relative">
                        {index < c.howItWorksSteps.length - 1 && (
                          <div className="hidden md:block absolute top-16 left-[60%] w-[80%] h-0.5 bg-gradient-to-r from-secondary/50 to-secondary/10" />
                        )}
                        <div className="relative bg-card rounded-2xl p-8 shadow-lg border border-border/50 text-center h-full">
                          <div className="absolute -top-5 left-1/2 -translate-x-1/2 w-10 h-10 bg-secondary text-secondary-foreground rounded-full flex items-center justify-center font-heading font-bold text-lg shadow-lg">{index + 1}</div>
                          <div className="w-20 h-20 mx-auto mb-6 mt-4 bg-primary/10 rounded-2xl flex items-center justify-center">
                            <Icon className="w-10 h-10 text-primary" />
                          </div>
                          <InlineEditable value={step.title} fieldName={`Step ${index + 1} title`} onChange={(v) => { const updated = [...c.howItWorksSteps]; updated[index] = { ...updated[index], title: v }; updateField('howItWorksSteps', updated as unknown as string); }} isEditMode={isEditMode} className="font-heading text-xl font-bold text-foreground mb-4" as="h3" />
                          <InlineEditable value={step.description} fieldName={`Step ${index + 1} description`} type="textarea" onChange={(v) => { const updated = [...c.howItWorksSteps]; updated[index] = { ...updated[index], description: v }; updateField('howItWorksSteps', updated as unknown as string); }} isEditMode={isEditMode} className="text-muted-foreground leading-relaxed" as="p" />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </section>

            {/* CTA BANNER SECTION */}
            <section className="section-padding bg-navy text-primary-foreground">
              <div className="container-custom text-center max-w-4xl mx-auto">
                <InlineEditable value={c.ctaBannerBadge} fieldName="ctaBannerBadge" onChange={(v) => updateField('ctaBannerBadge', v)} isEditMode={isEditMode} className="inline-block bg-secondary/20 text-secondary font-heading uppercase tracking-widest text-sm px-4 py-2 rounded-full mb-6" as="span" />
                <InlineEditable value={c.ctaBannerHeading} fieldName="ctaBannerHeading" onChange={(v) => updateField('ctaBannerHeading', v)} isEditMode={isEditMode} className="text-3xl md:text-4xl lg:text-5xl font-heading mb-8" as="h2" />
                <InlineEditable value={c.ctaBannerDescription1} fieldName="ctaBannerDescription1" type="textarea" onChange={(v) => updateField('ctaBannerDescription1', v)} isEditMode={isEditMode} className="text-lg text-primary-foreground/80 mb-4 max-w-3xl mx-auto" as="p" />
                <InlineEditable value={c.ctaBannerDescription2} fieldName="ctaBannerDescription2" type="textarea" onChange={(v) => updateField('ctaBannerDescription2', v)} isEditMode={isEditMode} className="text-lg text-primary-foreground/80 mb-10 max-w-3xl mx-auto" as="p" />
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                  <InlineEditableButton text={c.ctaBannerButton} href={c.ctaBannerButtonLink} onTextChange={(v) => updateField('ctaBannerButton', v)} onHrefChange={(v) => updateField('ctaBannerButtonLink', v)} isEditMode={isEditMode} isExternal={c.ctaBannerButtonOpenInNewTab} onExternalChange={(v) => updateField('ctaBannerButtonOpenInNewTab', v)}>
                    <a href={c.ctaBannerButtonLink} target={c.ctaBannerButtonOpenInNewTab ? '_blank' : undefined} rel={c.ctaBannerButtonOpenInNewTab ? 'noopener noreferrer' : undefined}>
                      <Button variant="hero" size="xl">{c.ctaBannerButton}<ArrowRight className="w-5 h-5" /></Button>
                    </a>
                  </InlineEditableButton>
                  <a href={`tel:${c.ctaBannerPhoneNumber.replace(/\D/g, '')}`} className="flex items-center gap-2 text-secondary hover:text-secondary/80 transition-colors">
                    <Phone className="w-5 h-5" />
                    <InlineEditable value={c.ctaBannerPhoneNumber} fieldName="ctaBannerPhoneNumber" onChange={(v) => updateField('ctaBannerPhoneNumber', v)} isEditMode={isEditMode} className="text-lg font-semibold" as="span" />
                  </a>
                </div>
              </div>
            </section>

            {/* CONTACT SECTION */}
            <section id="contact" className="section-padding bg-background">
              <div className="container-custom">
                <div className="text-center mb-12">
                  <InlineEditable value={c.contactTagline} fieldName="contactTagline" onChange={(v) => updateField('contactTagline', v)} isEditMode={isEditMode} className="text-secondary font-heading uppercase tracking-widest mb-4" as="p" />
                  <InlineEditable value={c.contactHeading} fieldName="contactHeading" onChange={(v) => updateField('contactHeading', v)} isEditMode={isEditMode} className="text-3xl md:text-4xl lg:text-5xl font-heading text-foreground mb-4" as="h2" />
                  <InlineEditable value={c.contactSubheading} fieldName="contactSubheading" type="textarea" onChange={(v) => updateField('contactSubheading', v)} isEditMode={isEditMode} className="text-muted-foreground max-w-2xl mx-auto" as="p" />
                </div>
                <div className="grid lg:grid-cols-2 gap-12">
                  <ContactForm />
                  <div className="space-y-8">
                    <div className="bg-muted/30 rounded-2xl p-8">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center"><Phone className="w-5 h-5 text-primary" /></div>
                        <InlineEditable value={c.contactCallTitle} fieldName="contactCallTitle" onChange={(v) => updateField('contactCallTitle', v)} isEditMode={isEditMode} className="font-heading text-lg font-bold text-foreground" as="h3" />
                      </div>
                      <a href={`tel:${c.contactPhoneNumber.replace(/\D/g, '')}`} className="text-2xl font-heading text-primary hover:text-primary/80 transition-colors">
                        <InlineEditable value={c.contactPhoneNumber} fieldName="contactPhoneNumber" onChange={(v) => updateField('contactPhoneNumber', v)} isEditMode={isEditMode} className="" as="span" />
                      </a>
                    </div>
                    <div className="bg-muted/30 rounded-2xl p-8">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center"><MapPin className="w-5 h-5 text-primary" /></div>
                        <InlineEditable value={c.contactLocationTitle} fieldName="contactLocationTitle" onChange={(v) => updateField('contactLocationTitle', v)} isEditMode={isEditMode} className="font-heading text-lg font-bold text-foreground" as="h3" />
                      </div>
                      <InlineEditable value={c.contactAddress1} fieldName="contactAddress1" onChange={(v) => updateField('contactAddress1', v)} isEditMode={isEditMode} className="text-muted-foreground" as="p" />
                      <InlineEditable value={c.contactAddress2} fieldName="contactAddress2" onChange={(v) => updateField('contactAddress2', v)} isEditMode={isEditMode} className="text-muted-foreground" as="p" />
                    </div>
                    <div className="bg-muted/30 rounded-2xl p-8">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center"><Clock className="w-5 h-5 text-primary" /></div>
                        <InlineEditable value={c.contactHoursTitle} fieldName="contactHoursTitle" onChange={(v) => updateField('contactHoursTitle', v)} isEditMode={isEditMode} className="font-heading text-lg font-bold text-foreground" as="h3" />
                      </div>
                      <InlineEditable value={c.contactHours1} fieldName="contactHours1" onChange={(v) => updateField('contactHours1', v)} isEditMode={isEditMode} className="text-muted-foreground" as="p" />
                      <InlineEditable value={c.contactHours2} fieldName="contactHours2" onChange={(v) => updateField('contactHours2', v)} isEditMode={isEditMode} className="text-muted-foreground" as="p" />
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      )}
    </EditablePageWrapper>
  );
}
