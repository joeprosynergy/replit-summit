"use client";

/**
 * Homepage - Refactored for CMS-First Architecture
 * Simplified from multiple section hooks to single useCMSContent hook
 */

import React from 'react';
import Link from "next/link";
import { ArrowRight, Truck, CreditCard, Shield, Package, Frown, ThumbsDown, Home, Hammer, Heart, Monitor, Car, TrendingUp, Lock, Clock, AlertTriangle, Phone, Star, Quote, MapPin } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ContactForm from '@/components/ContactForm';
import { Button } from '@/components/ui/button';
import { cloudinaryImages, getMobileHeroImage, IMAGES } from '@/lib/cloudinary';
import { useOptionalAdminAuth } from '@/contexts/useOptionalAdminAuth';
import { useCMSContent } from '@/hooks/useCMSContent';
import { useEditableTestimonials } from '@/hooks/useEditableTestimonials';
import { InlineEditable } from '@/components/admin/InlineEditable';
import InlineEditableButton from '@/components/admin/InlineEditableButton';
import InlineEditableImage from '@/components/admin/InlineEditableImage';
import InlineEditableLink from '@/components/admin/InlineEditableLink';
import { EditablePageWrapper } from '@/components/admin/EditablePageWrapper';
import { homeDefaults, HomeContent } from '@/data/defaults/homeDefaults';

// Icon mapping for CMS content (maps string identifiers to Lucide icons)
const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  'truck': Truck,
  'credit-card': CreditCard,
  'shield': Shield,
  'package': Package,
  'frown': Frown,
  'thumbs-down': ThumbsDown,
  'home': Home,
  'hammer': Hammer,
  'heart': Heart,
  'monitor': Monitor,
  'car': Car,
  'trending-up': TrendingUp,
  'lock': Lock,
  'clock': Clock,
};

// Get icon component from string identifier
const getIcon = (iconName: string, fallback: React.ComponentType<{ className?: string }> = Package) => {
  return iconMap[iconName] || fallback;
};

// Stakes icons (fixed order for these specific items)
const stakesIcons = [Package, Frown, ThumbsDown];

// How it works icons (fixed order)
const howItWorksIcons = [Monitor, Hammer, Truck];

// Imagine icons (fixed order)
const imagineIcons = [Car, Shield, Hammer, TrendingUp, Lock, Clock];

export default function HomePageClient({ initialContent }: { initialContent: any }) {
  // Testimonials hook (separate as it has its own table)
  const {
    testimonials,
    hasChanges: hasTestimonialChanges,
    updateTestimonial,
    save: saveTestimonials,
    reset: resetTestimonials,
  } = useEditableTestimonials();

  return (
    <EditablePageWrapper<HomeContent>
      slug="home"
      defaultContent={homeDefaults}
    >
      {({ content: editableContent, isEditMode, updateField }) => (
        <>
          <div className="min-h-screen">
            <Header />

            <main>
              {/* HERO SECTION */}
              <section className="relative min-h-screen flex items-center overflow-hidden">
                <picture className="absolute inset-0">
                  <source media="(max-width: 768px)" srcSet={getMobileHeroImage(IMAGES.heroShed)} />
                  <img src={cloudinaryImages.heroShed} alt="Summit Portable Buildings quality storage shed" fetchPriority="high" loading="eager" decoding="async" width={1600} height={900} className="w-full h-full object-cover" />
                </picture>
                <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/80 to-black/60" />
                <div className="relative z-10 container-custom py-32 lg:py-40">
                  <div className="max-w-3xl">
                    <InlineEditable
                      value={editableContent.heroTagline}
                      fieldName="heroTagline"
                      onChange={(v) => updateField('heroTagline', v)}
                      isEditMode={isEditMode}
                      className="text-secondary font-heading text-lg md:text-xl uppercase tracking-widest mb-4 animate-fade-in-up"
                      as="p"
                    />
                    <div className="mb-6 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
                      <InlineEditable
                        value={editableContent.heroHeading}
                        fieldName="heroHeading"
                        onChange={(v) => updateField('heroHeading', v)}
                        isEditMode={isEditMode}
                        className="text-4xl md:text-5xl lg:text-6xl font-heading text-primary-foreground leading-tight"
                        as="h1"
                      />
                    </div>
                    <div className="mb-4 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                      <InlineEditable
                        value={editableContent.heroSubheading}
                        fieldName="heroSubheading"
                        type="textarea"
                        onChange={(v) => updateField('heroSubheading', v)}
                        isEditMode={isEditMode}
                        className="text-lg md:text-xl text-primary-foreground/80 max-w-2xl"
                        as="p"
                      />
                    </div>
                    <div className="mb-8 animate-fade-in-up" style={{ animationDelay: '0.25s' }}>
                      <InlineEditable
                        value={editableContent.heroCtaDescription}
                        fieldName="heroCtaDescription"
                        onChange={(v) => updateField('heroCtaDescription', v)}
                        isEditMode={isEditMode}
                        className="text-primary-foreground/70 max-w-2xl"
                        as="p"
                      />
                    </div>
                    <div className="flex flex-col sm:flex-row gap-4 mb-8 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
                      <InlineEditableButton
                        text={editableContent.heroButton1Text}
                        href={editableContent.heroButton1Link}
                        onTextChange={(v) => updateField('heroButton1Text', v)}
                        onHrefChange={(v) => updateField('heroButton1Link', v)}
                        isEditMode={isEditMode}
                        isExternal={editableContent.heroButton1OpenInNewTab}
                        onExternalChange={(v) => updateField('heroButton1OpenInNewTab', v)}
                      >
                        <a
                          href={editableContent.heroButton1Link}
                          target={editableContent.heroButton1OpenInNewTab ? '_blank' : undefined}
                          rel={editableContent.heroButton1OpenInNewTab ? 'noopener noreferrer' : undefined}
                        >
                          <Button variant="hero" size="xl">
                            {editableContent.heroButton1Text}
                            <ArrowRight className="w-5 h-5" />
                          </Button>
                        </a>
                      </InlineEditableButton>
                      <InlineEditableButton
                        text={editableContent.heroButton2Text}
                        href={editableContent.heroButton2Link}
                        onTextChange={(v) => updateField('heroButton2Text', v)}
                        onHrefChange={(v) => updateField('heroButton2Link', v)}
                        isEditMode={isEditMode}
                        isExternal={editableContent.heroButton2OpenInNewTab}
                        onExternalChange={(v) => updateField('heroButton2OpenInNewTab', v)}
                      >
                        <a
                          href={editableContent.heroButton2Link}
                          target={editableContent.heroButton2OpenInNewTab ? '_blank' : undefined}
                          rel={editableContent.heroButton2OpenInNewTab ? 'noopener noreferrer' : undefined}
                        >
                          <Button variant="heroOutline" size="xl">{editableContent.heroButton2Text}</Button>
                        </a>
                      </InlineEditableButton>
                    </div>
                    <div className="animate-fade-in-up" style={{ animationDelay: '0.35s' }}>
                      <InlineEditable
                        value={editableContent.heroServiceText}
                        fieldName="heroServiceText"
                        onChange={(v) => updateField('heroServiceText', v)}
                        isEditMode={isEditMode}
                        className="text-primary-foreground/60 text-sm mb-6"
                        as="p"
                      />
                    </div>
                    <div className="flex flex-wrap gap-6 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
                      {editableContent.heroBadges.map((badge, index) => {
                        const BadgeIcon = getIcon(badge.icon, Truck);
                        return (
                          <div key={index} className="flex items-center gap-2 text-primary-foreground/90">
                            <div className="w-8 h-8 rounded-full bg-secondary/20 flex items-center justify-center">
                              <BadgeIcon className="w-4 h-4 text-secondary" />
                            </div>
                            <InlineEditable
                              value={badge.label}
                              fieldName={`Hero badge ${index + 1}`}
                              onChange={(v) => {
                                const updated = [...editableContent.heroBadges];
                                updated[index] = { ...updated[index], label: v };
                                updateField('heroBadges', updated as unknown as string);
                              }}
                              isEditMode={isEditMode}
                              className="text-sm font-medium"
                              as="span"
                            />
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
                    <InlineEditable
                      value={editableContent.stakesTagline}
                      fieldName="stakesTagline"
                      onChange={(v) => updateField('stakesTagline', v)}
                      isEditMode={isEditMode}
                      className="text-secondary font-heading uppercase tracking-widest mb-4 font-semibold"
                      as="p"
                    />
                    <InlineEditable
                      value={editableContent.stakesHeading}
                      fieldName="stakesHeading"
                      onChange={(v) => updateField('stakesHeading', v)}
                      isEditMode={isEditMode}
                      className="text-3xl md:text-4xl lg:text-5xl font-heading mb-6"
                      as="h2"
                    />
                    <InlineEditable
                      value={editableContent.stakesSubheading}
                      fieldName="stakesSubheading"
                      onChange={(v) => updateField('stakesSubheading', v)}
                      isEditMode={isEditMode}
                      className="text-lg text-primary-foreground/90 max-w-2xl mx-auto"
                      as="p"
                    />
                  </div>
                  <div className="grid md:grid-cols-3 gap-8 mb-12">
                    {editableContent.stakesPainPoints.map((point, index) => {
                      const Icon = stakesIcons[index] || Package;
                      return (
                        <div key={index} className="bg-primary-foreground/5 rounded-2xl p-8 text-center">
                          <div className="w-16 h-16 mx-auto mb-6 bg-secondary/20 rounded-2xl flex items-center justify-center">
                            <Icon className="w-8 h-8 text-secondary" />
                          </div>
                          <InlineEditable
                            value={point.title}
                            fieldName={`Pain point ${index + 1} title`}
                            onChange={(v) => {
                              const updated = [...editableContent.stakesPainPoints];
                              updated[index] = { ...updated[index], title: v };
                              updateField('stakesPainPoints', updated as unknown as string);
                            }}
                            isEditMode={isEditMode}
                            className="font-heading text-xl font-bold mb-3"
                            as="h3"
                          />
                          <InlineEditable
                            value={point.description}
                            fieldName={`Pain point ${index + 1} description`}
                            type="textarea"
                            onChange={(v) => {
                              const updated = [...editableContent.stakesPainPoints];
                              updated[index] = { ...updated[index], description: v };
                              updateField('stakesPainPoints', updated as unknown as string);
                            }}
                            isEditMode={isEditMode}
                            className="text-primary-foreground/80 leading-relaxed"
                            as="p"
                          />
                        </div>
                      );
                    })}
                  </div>
                  <InlineEditable
                    value={editableContent.stakesClosingText}
                    fieldName="stakesClosingText"
                    onChange={(v) => updateField('stakesClosingText', v)}
                    isEditMode={isEditMode}
                    className="text-xl text-secondary font-semibold text-center"
                    as="p"
                  />
                </div>
              </section>

              {/* GUIDE SECTION */}
              <section className="section-padding bg-background">
                <div className="container-custom">
                  <div className="grid lg:grid-cols-2 gap-12 items-center">
                    <div>
                      <InlineEditable
                        value={editableContent.guideTagline}
                        fieldName="guideTagline"
                        onChange={(v) => updateField('guideTagline', v)}
                        isEditMode={isEditMode}
                        className="text-secondary font-heading uppercase tracking-widest mb-4"
                        as="p"
                      />
                      <InlineEditable
                        value={editableContent.guideHeading}
                        fieldName="guideHeading"
                        onChange={(v) => updateField('guideHeading', v)}
                        isEditMode={isEditMode}
                        className="text-3xl md:text-4xl lg:text-5xl font-heading text-foreground mb-6"
                        as="h2"
                      />
                      <InlineEditable
                        value={editableContent.guideParagraph1}
                        fieldName="guideParagraph1"
                        onChange={(v) => updateField('guideParagraph1', v)}
                        isEditMode={isEditMode}
                        className="text-lg text-muted-foreground leading-relaxed mb-4"
                        as="p"
                      />
                      <InlineEditable
                        value={editableContent.guideParagraph2}
                        fieldName="guideParagraph2"
                        type="textarea"
                        onChange={(v) => updateField('guideParagraph2', v)}
                        isEditMode={isEditMode}
                        className="text-muted-foreground leading-relaxed mb-4"
                        as="p"
                      />
                      <InlineEditable
                        value={editableContent.guideParagraph3}
                        fieldName="guideParagraph3"
                        type="textarea"
                        onChange={(v) => updateField('guideParagraph3', v)}
                        isEditMode={isEditMode}
                        className="text-muted-foreground leading-relaxed mb-6"
                        as="p"
                      />
                      <InlineEditable
                        value={editableContent.guideParagraph4}
                        fieldName="guideParagraph4"
                        type="textarea"
                        onChange={(v) => updateField('guideParagraph4', v)}
                        isEditMode={isEditMode}
                        className="text-muted-foreground leading-relaxed mb-8"
                        as="p"
                      />
                      <div className="grid grid-cols-4 gap-4 mb-8">
                        {editableContent.guideStats.map((stat, index) => (
                          <div key={index} className="text-center">
                            <InlineEditable
                              value={stat.value}
                              fieldName={`Stat ${index + 1} value`}
                              onChange={(v) => {
                                const updated = [...editableContent.guideStats];
                                updated[index] = { ...updated[index], value: v };
                                updateField('guideStats', updated as unknown as string);
                              }}
                              isEditMode={isEditMode}
                              className="text-3xl md:text-4xl font-heading text-primary font-bold"
                              as="p"
                            />
                            <InlineEditable
                              value={stat.label}
                              fieldName={`Stat ${index + 1} label`}
                              onChange={(v) => {
                                const updated = [...editableContent.guideStats];
                                updated[index] = { ...updated[index], label: v };
                                updateField('guideStats', updated as unknown as string);
                              }}
                              isEditMode={isEditMode}
                              className="text-xs text-muted-foreground"
                              as="p"
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      {editableContent.guideCredentials.map((cred, index) => {
                        const CredIcon = getIcon(cred.icon, Home);
                        return (
                          <div key={index} className="bg-gradient-to-br from-primary/5 to-secondary/5 rounded-2xl p-6 text-center">
                            <div className="w-12 h-12 mx-auto mb-4 bg-primary/10 rounded-xl flex items-center justify-center">
                              <CredIcon className="w-6 h-6 text-primary" />
                            </div>
                            <InlineEditable
                              value={cred.label}
                              fieldName={`Credential ${index + 1} label`}
                              onChange={(v) => {
                                const updated = [...editableContent.guideCredentials];
                                updated[index] = { ...updated[index], label: v };
                                updateField('guideCredentials', updated as unknown as string);
                              }}
                              isEditMode={isEditMode}
                              className="font-heading text-foreground font-bold mb-1"
                              as="h3"
                            />
                            <InlineEditable
                              value={cred.sublabel}
                              fieldName={`Credential ${index + 1} sublabel`}
                              onChange={(v) => {
                                const updated = [...editableContent.guideCredentials];
                                updated[index] = { ...updated[index], sublabel: v };
                                updateField('guideCredentials', updated as unknown as string);
                              }}
                              isEditMode={isEditMode}
                              className="text-sm text-muted-foreground"
                              as="p"
                            />
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </section>

              {/* HOW IT WORKS SECTION */}
              <section id="how-it-works" className="section-padding bg-muted/30">
                <div className="container-custom">
                  <div className="text-center mb-16">
                    <InlineEditable
                      value={editableContent.howItWorksTagline}
                      fieldName="howItWorksTagline"
                      onChange={(v) => updateField('howItWorksTagline', v)}
                      isEditMode={isEditMode}
                      className="text-secondary font-heading uppercase tracking-widest mb-4"
                      as="p"
                    />
                    <InlineEditable
                      value={editableContent.howItWorksHeading}
                      fieldName="howItWorksHeading"
                      onChange={(v) => updateField('howItWorksHeading', v)}
                      isEditMode={isEditMode}
                      className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4"
                      as="h2"
                    />
                    <InlineEditable
                      value={editableContent.howItWorksSubheading}
                      fieldName="howItWorksSubheading"
                      onChange={(v) => updateField('howItWorksSubheading', v)}
                      isEditMode={isEditMode}
                      className="text-lg text-muted-foreground max-w-2xl mx-auto"
                      as="p"
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 mb-12">
                    {editableContent.howItWorksSteps.map((step, index) => {
                      const Icon = howItWorksIcons[index] || Monitor;
                      return (
                        <div key={index} className="relative">
                          {index < editableContent.howItWorksSteps.length - 1 && (
                            <div className="hidden md:block absolute top-16 left-[60%] w-[80%] h-0.5 bg-gradient-to-r from-secondary/50 to-secondary/10" />
                          )}
                          <div className="relative bg-card rounded-2xl p-8 shadow-lg border border-border/50 text-center h-full">
                            <div className="absolute -top-5 left-1/2 -translate-x-1/2 w-10 h-10 bg-secondary text-secondary-foreground rounded-full flex items-center justify-center font-heading font-bold text-lg shadow-lg">
                              {index + 1}
                            </div>
                            <div className="w-20 h-20 mx-auto mb-6 mt-4 bg-primary/10 rounded-2xl flex items-center justify-center">
                              <Icon className="w-10 h-10 text-primary" />
                            </div>
                            <InlineEditable
                              value={step.title}
                              fieldName={`Step ${index + 1} title`}
                              onChange={(v) => {
                                const updated = [...editableContent.howItWorksSteps];
                                updated[index] = { ...updated[index], title: v };
                                updateField('howItWorksSteps', updated as unknown as string);
                              }}
                              isEditMode={isEditMode}
                              className="font-heading text-xl font-bold text-foreground mb-4"
                              as="h3"
                            />
                            <InlineEditable
                              value={step.description}
                              fieldName={`Step ${index + 1} description`}
                              type="textarea"
                              onChange={(v) => {
                                const updated = [...editableContent.howItWorksSteps];
                                updated[index] = { ...updated[index], description: v };
                                updateField('howItWorksSteps', updated as unknown as string);
                              }}
                              isEditMode={isEditMode}
                              className="text-muted-foreground leading-relaxed"
                              as="p"
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  <div className="text-center">
                    <InlineEditableButton
                      text={editableContent.howItWorksButtonText}
                      href={editableContent.howItWorksButtonLink}
                      onTextChange={(v) => updateField('howItWorksButtonText', v)}
                      onHrefChange={(v) => updateField('howItWorksButtonLink', v)}
                      isEditMode={isEditMode}
                      isExternal={editableContent.howItWorksButtonOpenInNewTab}
                      onExternalChange={(v) => updateField('howItWorksButtonOpenInNewTab', v)}
                    >
                      <a
                        href={editableContent.howItWorksButtonLink}
                        target={editableContent.howItWorksButtonOpenInNewTab ? '_blank' : undefined}
                        rel={editableContent.howItWorksButtonOpenInNewTab ? 'noopener noreferrer' : undefined}
                      >
                        <Button variant="hero" size="lg" className="text-lg px-10">
                          {editableContent.howItWorksButtonText}
                        </Button>
                      </a>
                    </InlineEditableButton>
                  </div>
                </div>
              </section>

              {/* PRODUCTS SECTION */}
              <section id="products" className="section-padding bg-background">
                <div className="container-custom">
                  <div className="text-center max-w-3xl mx-auto mb-16">
                    <InlineEditable
                      value={editableContent.productsTagline}
                      fieldName="productsTagline"
                      onChange={(v) => updateField('productsTagline', v)}
                      isEditMode={isEditMode}
                      className="text-secondary font-heading uppercase tracking-widest mb-3"
                      as="p"
                    />
                    <InlineEditable
                      value={editableContent.productsHeading}
                      fieldName="productsHeading"
                      onChange={(v) => updateField('productsHeading', v)}
                      isEditMode={isEditMode}
                      className="text-3xl md:text-4xl lg:text-5xl font-heading text-foreground mb-6"
                      as="h2"
                    />
                    <InlineEditable
                      value={editableContent.productsSubheading}
                      fieldName="productsSubheading"
                      onChange={(v) => updateField('productsSubheading', v)}
                      isEditMode={isEditMode}
                      className="text-muted-foreground text-lg"
                      as="p"
                    />
                  </div>
                  <div className="bg-card rounded-lg shadow-lg overflow-hidden">
                    <div className="bg-primary py-5 px-6">
                      <InlineEditable
                        value={editableContent.productsSectionTitle}
                        fieldName="productsSectionTitle"
                        onChange={(v) => updateField('productsSectionTitle', v)}
                        isEditMode={isEditMode}
                        className="text-2xl md:text-3xl font-heading font-bold text-primary-foreground text-center uppercase tracking-wide"
                        as="h3"
                      />
                    </div>
                    <div className="p-6 md:p-10">
                      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 max-w-5xl mx-auto">
                        {editableContent.productsStyles.map((style, index) => (
                          <div key={style.id} className="text-center group">
                            <Link
                              href={style.link}
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
                                  onImageChange={(url) => {
                                    const updated = [...editableContent.productsStyles];
                                    updated[index] = { ...updated[index], image: url };
                                    updateField('productsStyles', updated as unknown as string);
                                  }}
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
                                  onTextChange={(text) => {
                                    const updated = [...editableContent.productsStyles];
                                    updated[index] = { ...updated[index], name: text };
                                    updateField('productsStyles', updated as unknown as string);
                                  }}
                                  onHrefChange={(href) => {
                                    const updated = [...editableContent.productsStyles];
                                    updated[index] = { ...updated[index], link: href };
                                    updateField('productsStyles', updated as unknown as string);
                                  }}
                                  isEditMode={isEditMode}
                                  isExternal={style.openInNewTab}
                                  onExternalChange={(ext) => {
                                    const updated = [...editableContent.productsStyles];
                                    updated[index] = { ...updated[index], openInNewTab: ext };
                                    updateField('productsStyles', updated as unknown as string);
                                  }}
                                  className="font-heading font-bold text-lg text-foreground hover:text-secondary transition-colors uppercase tracking-wide"
                                />
                                <InlineEditable
                                  value={style.subtitle}
                                  fieldName={`${style.name} subtitle`}
                                  onChange={(v) => {
                                    const updated = [...editableContent.productsStyles];
                                    updated[index] = { ...updated[index], subtitle: v };
                                    updateField('productsStyles', updated as unknown as string);
                                  }}
                                  isEditMode={isEditMode}
                                  className="text-muted-foreground text-sm mt-1"
                                  as="p"
                                />
                              </>
                            ) : (
                              <Link 
                                href={style.link} 
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
                    <Link href="/styles" className="text-secondary hover:text-secondary/80 font-semibold transition-colors">
                      <InlineEditable
                        value={editableContent.productsLinkText}
                        fieldName="productsLinkText"
                        onChange={(v) => updateField('productsLinkText', v)}
                        isEditMode={isEditMode}
                        as="span"
                      />
                    </Link>
                  </div>
                </div>
              </section>

              {/* IMAGINE SECTION */}
              <section className="section-padding bg-muted/30">
                <div className="container-custom">
                  <div className="text-center mb-12">
                    <InlineEditable
                      value={editableContent.imagineTagline}
                      fieldName="imagineTagline"
                      onChange={(v) => updateField('imagineTagline', v)}
                      isEditMode={isEditMode}
                      className="text-secondary font-heading uppercase tracking-widest mb-4"
                      as="p"
                    />
                    <InlineEditable
                      value={editableContent.imagineHeading}
                      fieldName="imagineHeading"
                      onChange={(v) => updateField('imagineHeading', v)}
                      isEditMode={isEditMode}
                      className="text-3xl md:text-4xl lg:text-5xl font-heading text-foreground mb-6"
                      as="h2"
                    />
                    <InlineEditable
                      value={editableContent.imagineSubheading}
                      fieldName="imagineSubheading"
                      type="textarea"
                      onChange={(v) => updateField('imagineSubheading', v)}
                      isEditMode={isEditMode}
                      className="text-lg text-muted-foreground max-w-2xl mx-auto"
                      as="p"
                    />
                  </div>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {editableContent.imagineBenefits.map((benefit, index) => {
                      const Icon = imagineIcons[index] || Car;
                      return (
                        <div key={index} className="flex items-center gap-4 bg-card rounded-xl p-5 border border-border/50">
                          <div className="w-12 h-12 bg-secondary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                            <Icon className="w-6 h-6 text-secondary" />
                          </div>
                          <InlineEditable
                            value={benefit}
                            fieldName={`Benefit ${index + 1}`}
                            onChange={(v) => {
                              const updated = [...editableContent.imagineBenefits];
                              updated[index] = v;
                              updateField('imagineBenefits', updated as unknown as string);
                            }}
                            isEditMode={isEditMode}
                            className="text-foreground font-medium"
                            as="p"
                          />
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
                      <InlineEditable
                        value={editableContent.ctaBannerBadge}
                        fieldName="ctaBannerBadge"
                        onChange={(v) => updateField('ctaBannerBadge', v)}
                        isEditMode={isEditMode}
                        className="text-sm font-medium"
                        as="span"
                      />
                    </div>
                    <InlineEditable
                      value={editableContent.ctaBannerHeading}
                      fieldName="ctaBannerHeading"
                      onChange={(v) => updateField('ctaBannerHeading', v)}
                      isEditMode={isEditMode}
                      className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-primary-foreground mb-6"
                      as="h2"
                    />
                    <InlineEditable
                      value={editableContent.ctaBannerDescription1}
                      fieldName="ctaBannerDescription1"
                      type="textarea"
                      onChange={(v) => updateField('ctaBannerDescription1', v)}
                      isEditMode={isEditMode}
                      className="text-primary-foreground/90 text-lg md:text-xl mb-4 max-w-3xl mx-auto"
                      as="p"
                    />
                    <InlineEditable
                      value={editableContent.ctaBannerDescription2}
                      fieldName="ctaBannerDescription2"
                      onChange={(v) => updateField('ctaBannerDescription2', v)}
                      isEditMode={isEditMode}
                      className="text-primary-foreground/80 mb-4 max-w-2xl mx-auto"
                      as="p"
                    />
                    <InlineEditable
                      value={editableContent.ctaBannerClosingText}
                      fieldName="ctaBannerClosingText"
                      onChange={(v) => updateField('ctaBannerClosingText', v)}
                      isEditMode={isEditMode}
                      className="text-primary-foreground font-semibold text-xl mb-8"
                      as="p"
                    />
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                      <InlineEditableButton
                        text={editableContent.ctaBannerButton}
                        href={editableContent.ctaBannerButtonLink}
                        onTextChange={(v) => updateField('ctaBannerButton', v)}
                        onHrefChange={(v) => updateField('ctaBannerButtonLink', v)}
                        isEditMode={isEditMode}
                        isExternal={editableContent.ctaBannerButtonOpenInNewTab}
                        onExternalChange={(v) => updateField('ctaBannerButtonOpenInNewTab', v)}
                      >
                        <a
                          href={editableContent.ctaBannerButtonLink}
                          target={editableContent.ctaBannerButtonOpenInNewTab ? '_blank' : undefined}
                          rel={editableContent.ctaBannerButtonOpenInNewTab ? 'noopener noreferrer' : undefined}
                        >
                          <Button variant="heroOutline" size="xl" className="bg-primary-foreground text-foreground hover:bg-primary-foreground/90">
                            {editableContent.ctaBannerButton}
                            <ArrowRight className="w-5 h-5" />
                          </Button>
                        </a>
                      </InlineEditableButton>
                      <InlineEditableButton
                        text={`Call ${editableContent.ctaBannerPhoneNumber}`}
                        href={`tel:${editableContent.ctaBannerPhoneNumber.replace(/[^0-9]/g, '')}`}
                        onTextChange={(v) => {
                          // Extract phone number from "Call XXX-XXX-XXXX" format
                          const phone = v.replace(/^Call\s*/i, '');
                          updateField('ctaBannerPhoneNumber', phone);
                        }}
                        onHrefChange={() => {}} // href is derived from phone number
                        isEditMode={isEditMode}
                      >
                        <a href={`tel:${editableContent.ctaBannerPhoneNumber.replace(/[^0-9]/g, '')}`}>
                          <Button variant="heroOutline" size="xl">
                            <Phone className="w-5 h-5" />
                            Call {editableContent.ctaBannerPhoneNumber}
                          </Button>
                        </a>
                      </InlineEditableButton>
                    </div>
                  </div>
                </div>
              </section>

              {/* TESTIMONIALS SECTION */}
              <section className="section-padding bg-stone">
                <div className="container-custom">
                  <div className="text-center max-w-3xl mx-auto mb-16">
                    <InlineEditable
                      value={editableContent.testimonialsTagline}
                      fieldName="testimonialsTagline"
                      onChange={(v) => updateField('testimonialsTagline', v)}
                      isEditMode={isEditMode}
                      className="text-secondary font-heading uppercase tracking-widest mb-3"
                      as="p"
                    />
                    <InlineEditable
                      value={editableContent.testimonialsHeading}
                      fieldName="testimonialsHeading"
                      onChange={(v) => updateField('testimonialsHeading', v)}
                      isEditMode={isEditMode}
                      className="text-3xl md:text-4xl lg:text-5xl font-heading text-foreground mb-6"
                      as="h2"
                    />
                    <InlineEditable
                      value={editableContent.testimonialsSubheading}
                      fieldName="testimonialsSubheading"
                      type="textarea"
                      onChange={(v) => updateField('testimonialsSubheading', v)}
                      isEditMode={isEditMode}
                      className="text-lg text-foreground/70"
                      as="p"
                    />
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
                          <InlineEditable
                            value={`"${testimonial.text}"`}
                            fieldName={`${testimonial.name}'s testimonial`}
                            type="textarea"
                            onChange={(v) => updateTestimonial(testimonial.id, 'text', v.replace(/^"|"$/g, ''))}
                            isEditMode={isEditMode}
                            as="p"
                          />
                        </div>
                        <div>
                          <InlineEditable
                            value={testimonial.name}
                            fieldName="Name"
                            onChange={(v) => updateTestimonial(testimonial.id, 'name', v)}
                            isEditMode={isEditMode}
                            className="font-heading text-foreground font-semibold"
                            as="p"
                          />
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
                    <InlineEditable
                      value={editableContent.locationsTagline}
                      fieldName="locationsTagline"
                      onChange={(v) => updateField('locationsTagline', v)}
                      isEditMode={isEditMode}
                      className="text-secondary font-heading uppercase tracking-widest mb-3"
                      as="p"
                    />
                    <InlineEditable
                      value={editableContent.locationsHeading}
                      fieldName="locationsHeading"
                      onChange={(v) => updateField('locationsHeading', v)}
                      isEditMode={isEditMode}
                      className="text-3xl md:text-4xl lg:text-5xl font-heading text-foreground mb-6"
                      as="h2"
                    />
                    <InlineEditable
                      value={editableContent.locationsSubheading}
                      fieldName="locationsSubheading"
                      type="textarea"
                      onChange={(v) => updateField('locationsSubheading', v)}
                      isEditMode={isEditMode}
                      className="text-muted-foreground text-lg"
                      as="p"
                    />
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
                    {editableContent.locationsStates.map((state, stateIndex) => (
                      <div key={stateIndex} className="bg-card p-6 rounded-lg shadow-md border border-border">
                        <div className="flex items-center gap-3 mb-4">
                          <InlineEditable
                            value={state.abbrev}
                            fieldName={`State ${stateIndex + 1} abbrev`}
                            onChange={(v) => {
                              const updated = [...editableContent.locationsStates];
                              updated[stateIndex] = { ...updated[stateIndex], abbrev: v };
                              updateField('locationsStates', updated as unknown as string);
                            }}
                            isEditMode={isEditMode}
                            className="text-3xl font-heading font-bold text-primary"
                            as="span"
                          />
                          <InlineEditable
                            value={state.state}
                            fieldName={`State ${stateIndex + 1} name`}
                            onChange={(v) => {
                              const updated = [...editableContent.locationsStates];
                              updated[stateIndex] = { ...updated[stateIndex], state: v };
                              updateField('locationsStates', updated as unknown as string);
                            }}
                            isEditMode={isEditMode}
                            className="font-heading text-lg text-foreground"
                            as="h3"
                          />
                        </div>
                        <ul className="space-y-1">
                          {state.cities.map((city, cityIndex) => (
                            <li key={cityIndex} className="text-muted-foreground text-sm">
                              <InlineEditable
                                value={city}
                                fieldName={`${state.state} city ${cityIndex + 1}`}
                                onChange={(v) => {
                                  const updated = [...editableContent.locationsStates];
                                  const updatedCities = [...updated[stateIndex].cities];
                                  updatedCities[cityIndex] = v;
                                  updated[stateIndex] = { ...updated[stateIndex], cities: updatedCities };
                                  updateField('locationsStates', updated as unknown as string);
                                }}
                                isEditMode={isEditMode}
                                as="span"
                              />
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                  <InlineEditable
                    value={editableContent.locationsFooterNote}
                    fieldName="locationsFooterNote"
                    onChange={(v) => updateField('locationsFooterNote', v)}
                    isEditMode={isEditMode}
                    className="text-center text-muted-foreground mb-8"
                    as="p"
                  />
                  <div className="bg-primary rounded-2xl p-8 md:p-12 text-center">
                    <InlineEditable
                      value={editableContent.locationsCtaHeading}
                      fieldName="locationsCtaHeading"
                      onChange={(v) => updateField('locationsCtaHeading', v)}
                      isEditMode={isEditMode}
                      className="text-2xl md:text-3xl font-heading font-bold text-primary-foreground mb-4"
                      as="h3"
                    />
                    <InlineEditable
                      value={editableContent.locationsCtaDescription}
                      fieldName="locationsCtaDescription"
                      type="textarea"
                      onChange={(v) => updateField('locationsCtaDescription', v)}
                      isEditMode={isEditMode}
                      className="text-primary-foreground/80 mb-8 max-w-2xl mx-auto"
                      as="p"
                    />
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                      <InlineEditableButton
                        text={editableContent.locationsCtaButton}
                        href={editableContent.locationsCtaButtonLink}
                        onTextChange={(v) => updateField('locationsCtaButton', v)}
                        onHrefChange={(v) => updateField('locationsCtaButtonLink', v)}
                        isEditMode={isEditMode}
                        isExternal={editableContent.locationsCtaButtonOpenInNewTab}
                        onExternalChange={(v) => updateField('locationsCtaButtonOpenInNewTab', v)}
                      >
                        <a
                          href={editableContent.locationsCtaButtonLink}
                          target={editableContent.locationsCtaButtonOpenInNewTab ? '_blank' : undefined}
                          rel={editableContent.locationsCtaButtonOpenInNewTab ? 'noopener noreferrer' : undefined}
                        >
                          <Button variant="hero" size="lg">
                            {editableContent.locationsCtaButton}
                            <ArrowRight className="w-5 h-5" />
                          </Button>
                        </a>
                      </InlineEditableButton>
                      <InlineEditableButton
                        text={editableContent.locationsSecondaryButton}
                        href={editableContent.locationsSecondaryButtonLink}
                        onTextChange={(v) => updateField('locationsSecondaryButton', v)}
                        onHrefChange={(v) => updateField('locationsSecondaryButtonLink', v)}
                        isEditMode={isEditMode}
                        isExternal={editableContent.locationsSecondaryButtonOpenInNewTab}
                        onExternalChange={(v) => updateField('locationsSecondaryButtonOpenInNewTab', v)}
                      >
                        {editableContent.locationsSecondaryButtonOpenInNewTab ? (
                          <a
                            href={editableContent.locationsSecondaryButtonLink}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <Button variant="heroOutline" size="lg">
                              {editableContent.locationsSecondaryButton}
                            </Button>
                          </a>
                        ) : (
                          <Link href={editableContent.locationsSecondaryButtonLink}>
                            <Button variant="heroOutline" size="lg">
                              {editableContent.locationsSecondaryButton}
                            </Button>
                          </Link>
                        )}
                      </InlineEditableButton>
                    </div>
                    <p className="text-primary-foreground/60 text-sm mt-6">
                      <InlineEditable
                        value={editableContent.locationsPhoneText}
                        fieldName="locationsPhoneText"
                        onChange={(v) => updateField('locationsPhoneText', v)}
                        isEditMode={isEditMode}
                        as="span"
                      />{' '}
                      <a href="tel:5737474700" className="hover:text-secondary transition-colors underline">(573) 747-4700</a>
                    </p>
                  </div>
                </div>
              </section>

              {/* CONTACT SECTION */}
              <section id="contact" className="section-padding bg-primary">
                <div className="container-custom">
                  <div className="text-center mb-12">
                    <InlineEditable
                      value={editableContent.contactTagline}
                      fieldName="contactTagline"
                      onChange={(v) => updateField('contactTagline', v)}
                      isEditMode={isEditMode}
                      className="text-secondary font-heading uppercase tracking-widest mb-3"
                      as="p"
                    />
                    <InlineEditable
                      value={editableContent.contactHeading}
                      fieldName="contactHeading"
                      onChange={(v) => updateField('contactHeading', v)}
                      isEditMode={isEditMode}
                      className="text-3xl md:text-4xl lg:text-5xl font-heading text-primary-foreground mb-4"
                      as="h2"
                    />
                    <InlineEditable
                      value={editableContent.contactSubheading}
                      fieldName="contactSubheading"
                      type="textarea"
                      onChange={(v) => updateField('contactSubheading', v)}
                      isEditMode={isEditMode}
                      className="text-primary-foreground/70 text-lg max-w-2xl mx-auto"
                      as="p"
                    />
                  </div>
                  <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
                    <div className="lg:col-span-3 bg-card p-8 rounded-lg shadow-lg">
                      <ContactForm />
                    </div>
                    <div className="lg:col-span-2 space-y-8">
                      <div>
                        <InlineEditable
                          value={editableContent.contactCallTitle}
                          fieldName="contactCallTitle"
                          onChange={(v) => updateField('contactCallTitle', v)}
                          isEditMode={isEditMode}
                          className="font-heading text-xl text-primary-foreground mb-2"
                          as="h3"
                        />
                        <a href="tel:5737474700" className="flex items-center gap-3 text-secondary text-2xl font-bold hover:underline">
                          <Phone className="w-6 h-6" />
                          <InlineEditable
                            value={editableContent.contactPhoneNumber}
                            fieldName="contactPhoneNumber"
                            onChange={(v) => updateField('contactPhoneNumber', v)}
                            isEditMode={isEditMode}
                            as="span"
                          />
                        </a>
                      </div>
                      <div>
                        <InlineEditable
                          value={editableContent.contactLocationTitle}
                          fieldName="contactLocationTitle"
                          onChange={(v) => updateField('contactLocationTitle', v)}
                          isEditMode={isEditMode}
                          className="font-heading text-xl text-primary-foreground mb-2"
                          as="h3"
                        />
                        <div className="flex items-start gap-3 text-primary-foreground/70">
                          <MapPin className="w-5 h-5 text-secondary flex-shrink-0 mt-1" />
                          <div>
                            <InlineEditable
                              value={editableContent.contactAddress1}
                              fieldName="contactAddress1"
                              onChange={(v) => updateField('contactAddress1', v)}
                              isEditMode={isEditMode}
                              as="p"
                            />
                            <InlineEditable
                              value={editableContent.contactAddress2}
                              fieldName="contactAddress2"
                              onChange={(v) => updateField('contactAddress2', v)}
                              isEditMode={isEditMode}
                              as="p"
                            />
                          </div>
                        </div>
                      </div>
                      <div>
                        <InlineEditable
                          value={editableContent.contactHoursTitle}
                          fieldName="contactHoursTitle"
                          onChange={(v) => updateField('contactHoursTitle', v)}
                          isEditMode={isEditMode}
                          className="font-heading text-xl text-primary-foreground mb-2"
                          as="h3"
                        />
                        <div className="flex items-start gap-3 text-primary-foreground/70">
                          <Clock className="w-5 h-5 text-secondary flex-shrink-0 mt-1" />
                          <div>
                            <InlineEditable
                              value={editableContent.contactHours1}
                              fieldName="contactHours1"
                              onChange={(v) => updateField('contactHours1', v)}
                              isEditMode={isEditMode}
                              as="p"
                            />
                            <InlineEditable
                              value={editableContent.contactHours2}
                              fieldName="contactHours2"
                              onChange={(v) => updateField('contactHours2', v)}
                              isEditMode={isEditMode}
                              as="p"
                            />
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
      )}
    </EditablePageWrapper>
  );
}
