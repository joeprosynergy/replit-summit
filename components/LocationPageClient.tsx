"use client";

/**
 * Location Page Client - Reusable for all location landing pages
 * Full inline CMS editing support matching homepage patterns.
 */

import React from 'react';
import Link from "next/link";
import { ArrowRight, Truck, CreditCard, Shield, Package, Home, Hammer, Heart, Monitor, Car, TrendingUp, Lock, Clock, Phone, MapPin, Check } from 'lucide-react';
import ContactForm from '@/components/ContactForm';
import { Button } from '@/components/ui/button';
import { cloudinaryImages, getMobileHeroImage, IMAGES } from '@/lib/cloudinary';
import { InlineEditable } from '@/components/admin/InlineEditable';
import InlineEditableButton from '@/components/admin/InlineEditableButton';
import InlineEditableImage from '@/components/admin/InlineEditableImage';
import InlineEditableLink from '@/components/admin/InlineEditableLink';
import { EditablePageWrapper } from '@/components/admin/EditablePageWrapper';
import { LocationContent } from '@/data/defaults/locationDefaults';

// Icon mapping for CMS content
const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  'truck': Truck,
  'credit-card': CreditCard,
  'shield': Shield,
  'package': Package,
  'home': Home,
  'hammer': Hammer,
  'heart': Heart,
  'monitor': Monitor,
  'car': Car,
  'trending-up': TrendingUp,
  'lock': Lock,
  'clock': Clock,
};

const getIcon = (iconName: string, fallback: React.ComponentType<{ className?: string }> = Package) => {
  return iconMap[iconName] || fallback;
};

const howItWorksIcons = [Monitor, Hammer, Truck];

interface LocationPageClientProps {
  slug: string;
  defaults: LocationContent;
}

export default function LocationPageClient({ slug, defaults }: LocationPageClientProps) {
  return (
    <EditablePageWrapper<LocationContent>
      slug={slug}
      defaultContent={defaults}
    >
      {({ content: c, isEditMode, updateField }) => (
        <>
          <div className="min-h-screen">
            <div>
              {/* HERO SECTION */}
              <section className="relative min-h-screen flex items-center overflow-hidden">
                <picture className="absolute inset-0">
                  <source media="(max-width: 768px)" srcSet={getMobileHeroImage(IMAGES.heroShed)} />
                  <img src={cloudinaryImages.heroShed} alt="Summit Portable Buildings storage shed" fetchPriority="high" loading="eager" decoding="async" width={1600} height={900} className="w-full h-full object-cover" />
                </picture>
                <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/80 to-black/60" />
                <div className="relative z-10 container-custom py-32 lg:py-40">
                  <div className="max-w-3xl">
                    <InlineEditable
                      value={c.heroTagline}
                      fieldName="heroTagline"
                      onChange={(v) => updateField('heroTagline', v)}
                      isEditMode={isEditMode}
                      className="text-secondary font-heading text-lg md:text-xl uppercase tracking-widest mb-4 animate-fade-in-up"
                      as="p"
                    />
                    <div className="mb-6 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
                      <InlineEditable
                        value={c.heroHeading}
                        fieldName="heroHeading"
                        onChange={(v) => updateField('heroHeading', v)}
                        isEditMode={isEditMode}
                        className="text-4xl md:text-5xl lg:text-6xl font-heading text-primary-foreground leading-tight"
                        as="h1"
                      />
                    </div>
                    <div className="mb-4 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                      <InlineEditable
                        value={c.heroSubheading}
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
                        value={c.heroCtaDescription}
                        fieldName="heroCtaDescription"
                        onChange={(v) => updateField('heroCtaDescription', v)}
                        isEditMode={isEditMode}
                        className="text-primary-foreground/70 max-w-2xl"
                        as="p"
                      />
                    </div>
                    <div className="flex flex-col sm:flex-row gap-4 mb-8 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
                      <InlineEditableButton
                        text={c.heroButton1Text}
                        href={c.heroButton1Link}
                        onTextChange={(v) => updateField('heroButton1Text', v)}
                        onHrefChange={(v) => updateField('heroButton1Link', v)}
                        isEditMode={isEditMode}
                        isExternal={c.heroButton1OpenInNewTab}
                        onExternalChange={(v) => updateField('heroButton1OpenInNewTab', v)}
                      >
                        <a
                          href={c.heroButton1Link}
                          target={c.heroButton1OpenInNewTab ? '_blank' : undefined}
                          rel={c.heroButton1OpenInNewTab ? 'noopener noreferrer' : undefined}
                        >
                          <Button variant="hero" size="xl">
                            {c.heroButton1Text}
                            <ArrowRight className="w-5 h-5" />
                          </Button>
                        </a>
                      </InlineEditableButton>
                      <InlineEditableButton
                        text={c.heroButton2Text}
                        href={c.heroButton2Link}
                        onTextChange={(v) => updateField('heroButton2Text', v)}
                        onHrefChange={(v) => updateField('heroButton2Link', v)}
                        isEditMode={isEditMode}
                        isExternal={c.heroButton2OpenInNewTab}
                        onExternalChange={(v) => updateField('heroButton2OpenInNewTab', v)}
                      >
                        <a
                          href={c.heroButton2Link}
                          target={c.heroButton2OpenInNewTab ? '_blank' : undefined}
                          rel={c.heroButton2OpenInNewTab ? 'noopener noreferrer' : undefined}
                        >
                          <Button variant="heroOutline" size="xl">{c.heroButton2Text}</Button>
                        </a>
                      </InlineEditableButton>
                    </div>
                    <div className="animate-fade-in-up" style={{ animationDelay: '0.35s' }}>
                      <InlineEditable
                        value={c.heroServiceText}
                        fieldName="heroServiceText"
                        onChange={(v) => updateField('heroServiceText', v)}
                        isEditMode={isEditMode}
                        className="text-primary-foreground/60 text-sm mb-6"
                        as="p"
                      />
                    </div>
                    <div className="flex flex-wrap gap-6 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
                      {c.heroBadges.map((badge, index) => {
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
                                const updated = [...c.heroBadges];
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

              {/* SERVICE AREA SECTION */}
              <section className="section-padding bg-navy text-primary-foreground">
                <div className="container-custom">
                  <div className="text-center mb-12">
                    <InlineEditable
                      value={c.serviceAreaTagline}
                      fieldName="serviceAreaTagline"
                      onChange={(v) => updateField('serviceAreaTagline', v)}
                      isEditMode={isEditMode}
                      className="text-secondary font-heading uppercase tracking-widest mb-4 font-semibold"
                      as="p"
                    />
                    <InlineEditable
                      value={c.serviceAreaHeading}
                      fieldName="serviceAreaHeading"
                      onChange={(v) => updateField('serviceAreaHeading', v)}
                      isEditMode={isEditMode}
                      className="text-3xl md:text-4xl lg:text-5xl font-heading mb-6"
                      as="h2"
                    />
                    <InlineEditable
                      value={c.serviceAreaSubheading}
                      fieldName="serviceAreaSubheading"
                      type="textarea"
                      onChange={(v) => updateField('serviceAreaSubheading', v)}
                      isEditMode={isEditMode}
                      className="text-lg text-primary-foreground/90 max-w-2xl mx-auto"
                      as="p"
                    />
                  </div>
                  <div className="grid lg:grid-cols-2 gap-12 items-start">
                    <div>
                      <InlineEditable
                        value={c.serviceAreaDescription}
                        fieldName="serviceAreaDescription"
                        type="textarea"
                        onChange={(v) => updateField('serviceAreaDescription', v)}
                        isEditMode={isEditMode}
                        className="text-primary-foreground/80 leading-relaxed mb-8 text-lg"
                        as="p"
                      />
                      <div className="flex items-center gap-3 mb-4">
                        <MapPin className="w-5 h-5 text-secondary flex-shrink-0" />
                        <InlineEditable
                          value={`Free delivery within ${c.serviceAreaRadius}`}
                          fieldName="serviceAreaRadius"
                          onChange={(v) => updateField('serviceAreaRadius', v.replace('Free delivery within ', ''))}
                          isEditMode={isEditMode}
                          className="text-primary-foreground/90 font-semibold"
                          as="span"
                        />
                      </div>
                      <InlineEditable
                        value={c.serviceAreaNote}
                        fieldName="serviceAreaNote"
                        onChange={(v) => updateField('serviceAreaNote', v)}
                        isEditMode={isEditMode}
                        className="text-primary-foreground/60 text-sm italic"
                        as="p"
                      />
                    </div>
                    <div className="bg-primary-foreground/5 rounded-2xl p-8">
                      <h3 className="font-heading text-xl font-bold mb-6 text-center">Cities We Serve</h3>
                      <div className="grid grid-cols-2 gap-3">
                        {c.serviceAreaCities.map((city, index) => (
                          <div key={index} className="flex items-center gap-2">
                            <Check className="w-4 h-4 text-secondary flex-shrink-0" />
                            <InlineEditable
                              value={city}
                              fieldName={`Service area city ${index + 1}`}
                              onChange={(v) => {
                                const updated = [...c.serviceAreaCities];
                                updated[index] = v;
                                updateField('serviceAreaCities', updated as unknown as string);
                              }}
                              isEditMode={isEditMode}
                              className="text-primary-foreground/80 text-sm"
                              as="span"
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* GUIDE SECTION */}
              <section className="section-padding bg-background">
                <div className="container-custom">
                  <div className="grid lg:grid-cols-2 gap-12 items-center">
                    <div>
                      <InlineEditable
                        value={c.guideTagline}
                        fieldName="guideTagline"
                        onChange={(v) => updateField('guideTagline', v)}
                        isEditMode={isEditMode}
                        className="text-secondary font-heading uppercase tracking-widest mb-4"
                        as="p"
                      />
                      <InlineEditable
                        value={c.guideHeading}
                        fieldName="guideHeading"
                        onChange={(v) => updateField('guideHeading', v)}
                        isEditMode={isEditMode}
                        className="text-3xl md:text-4xl lg:text-5xl font-heading text-foreground mb-6"
                        as="h2"
                      />
                      <InlineEditable
                        value={c.guideParagraph1}
                        fieldName="guideParagraph1"
                        onChange={(v) => updateField('guideParagraph1', v)}
                        isEditMode={isEditMode}
                        className="text-lg text-muted-foreground leading-relaxed mb-4"
                        as="p"
                      />
                      <InlineEditable
                        value={c.guideParagraph2}
                        fieldName="guideParagraph2"
                        type="textarea"
                        onChange={(v) => updateField('guideParagraph2', v)}
                        isEditMode={isEditMode}
                        className="text-muted-foreground leading-relaxed mb-4"
                        as="p"
                      />
                      <InlineEditable
                        value={c.guideParagraph3}
                        fieldName="guideParagraph3"
                        type="textarea"
                        onChange={(v) => updateField('guideParagraph3', v)}
                        isEditMode={isEditMode}
                        className="text-muted-foreground leading-relaxed mb-8"
                        as="p"
                      />
                      <div className="grid grid-cols-4 gap-4 mb-8">
                        {c.guideStats.map((stat, index) => (
                          <div key={index} className="text-center">
                            <InlineEditable
                              value={stat.value}
                              fieldName={`Stat ${index + 1} value`}
                              onChange={(v) => {
                                const updated = [...c.guideStats];
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
                                const updated = [...c.guideStats];
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
                      {c.guideCredentials.map((cred, index) => {
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
                                const updated = [...c.guideCredentials];
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
                                const updated = [...c.guideCredentials];
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
                      value={c.howItWorksTagline}
                      fieldName="howItWorksTagline"
                      onChange={(v) => updateField('howItWorksTagline', v)}
                      isEditMode={isEditMode}
                      className="text-secondary font-heading uppercase tracking-widest mb-4"
                      as="p"
                    />
                    <InlineEditable
                      value={c.howItWorksHeading}
                      fieldName="howItWorksHeading"
                      onChange={(v) => updateField('howItWorksHeading', v)}
                      isEditMode={isEditMode}
                      className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4"
                      as="h2"
                    />
                    <InlineEditable
                      value={c.howItWorksSubheading}
                      fieldName="howItWorksSubheading"
                      onChange={(v) => updateField('howItWorksSubheading', v)}
                      isEditMode={isEditMode}
                      className="text-lg text-muted-foreground max-w-2xl mx-auto"
                      as="p"
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 mb-12">
                    {c.howItWorksSteps.map((step, index) => {
                      const Icon = howItWorksIcons[index] || Monitor;
                      return (
                        <div key={index} className="relative">
                          {index < c.howItWorksSteps.length - 1 && (
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
                                const updated = [...c.howItWorksSteps];
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
                                const updated = [...c.howItWorksSteps];
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
                      text={c.howItWorksButtonText}
                      href={c.howItWorksButtonLink}
                      onTextChange={(v) => updateField('howItWorksButtonText', v)}
                      onHrefChange={(v) => updateField('howItWorksButtonLink', v)}
                      isEditMode={isEditMode}
                      isExternal={c.howItWorksButtonOpenInNewTab}
                      onExternalChange={(v) => updateField('howItWorksButtonOpenInNewTab', v)}
                    >
                      <a
                        href={c.howItWorksButtonLink}
                        target={c.howItWorksButtonOpenInNewTab ? '_blank' : undefined}
                        rel={c.howItWorksButtonOpenInNewTab ? 'noopener noreferrer' : undefined}
                      >
                        <Button variant="hero" size="lg" className="text-lg px-10">
                          {c.howItWorksButtonText}
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
                      value={c.productsTagline}
                      fieldName="productsTagline"
                      onChange={(v) => updateField('productsTagline', v)}
                      isEditMode={isEditMode}
                      className="text-secondary font-heading uppercase tracking-widest mb-3"
                      as="p"
                    />
                    <InlineEditable
                      value={c.productsHeading}
                      fieldName="productsHeading"
                      onChange={(v) => updateField('productsHeading', v)}
                      isEditMode={isEditMode}
                      className="text-3xl md:text-4xl lg:text-5xl font-heading text-foreground mb-6"
                      as="h2"
                    />
                    <InlineEditable
                      value={c.productsSubheading}
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
                        value={c.productsSectionTitle}
                        fieldName="productsSectionTitle"
                        onChange={(v) => updateField('productsSectionTitle', v)}
                        isEditMode={isEditMode}
                        className="text-2xl md:text-3xl font-heading font-bold text-primary-foreground text-center uppercase tracking-wide"
                        as="h3"
                      />
                    </div>
                    <div className="p-6 md:p-10">
                      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 max-w-5xl mx-auto">
                        {c.productsStyles.map((style, index) => (
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
                                  alt={`${style.name} storage building style - Summit Portable Buildings`}
                                  onImageChange={(url) => {
                                    const updated = [...c.productsStyles];
                                    updated[index] = { ...updated[index], image: url };
                                    updateField('productsStyles', updated as unknown as string);
                                  }}
                                  isEditMode={isEditMode}
                                  imageClassName="w-full h-full transition-transform duration-300 group-hover:scale-105 object-cover"
                                />
                              </div>
                            </Link>
                            {isEditMode ? (
                              <InlineEditableLink
                                text={style.name}
                                href={style.link}
                                onTextChange={(text) => {
                                  const updated = [...c.productsStyles];
                                  updated[index] = { ...updated[index], name: text };
                                  updateField('productsStyles', updated as unknown as string);
                                }}
                                onHrefChange={(href) => {
                                  const updated = [...c.productsStyles];
                                  updated[index] = { ...updated[index], link: href };
                                  updateField('productsStyles', updated as unknown as string);
                                }}
                                isEditMode={isEditMode}
                                isExternal={style.openInNewTab}
                                onExternalChange={(ext) => {
                                  const updated = [...c.productsStyles];
                                  updated[index] = { ...updated[index], openInNewTab: ext };
                                  updateField('productsStyles', updated as unknown as string);
                                }}
                              />
                            ) : (
                              <Link href={style.link} className="block">
                                <h3 className="font-heading font-bold text-foreground group-hover:text-primary transition-colors">
                                  {style.name}
                                </h3>
                              </Link>
                            )}
                            <InlineEditable
                              value={style.subtitle}
                              fieldName={`Product ${index + 1} subtitle`}
                              onChange={(v) => {
                                const updated = [...c.productsStyles];
                                updated[index] = { ...updated[index], subtitle: v };
                                updateField('productsStyles', updated as unknown as string);
                              }}
                              isEditMode={isEditMode}
                              className="text-sm text-muted-foreground mt-1"
                              as="p"
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* CTA BANNER SECTION */}
              <section className="section-padding bg-navy text-primary-foreground">
                <div className="container-custom text-center max-w-4xl mx-auto">
                  <InlineEditable
                    value={c.ctaBannerBadge}
                    fieldName="ctaBannerBadge"
                    onChange={(v) => updateField('ctaBannerBadge', v)}
                    isEditMode={isEditMode}
                    className="inline-block bg-secondary/20 text-secondary font-heading uppercase tracking-widest text-sm px-4 py-2 rounded-full mb-6"
                    as="span"
                  />
                  <InlineEditable
                    value={c.ctaBannerHeading}
                    fieldName="ctaBannerHeading"
                    onChange={(v) => updateField('ctaBannerHeading', v)}
                    isEditMode={isEditMode}
                    className="text-3xl md:text-4xl lg:text-5xl font-heading mb-8"
                    as="h2"
                  />
                  <InlineEditable
                    value={c.ctaBannerDescription1}
                    fieldName="ctaBannerDescription1"
                    type="textarea"
                    onChange={(v) => updateField('ctaBannerDescription1', v)}
                    isEditMode={isEditMode}
                    className="text-lg text-primary-foreground/80 mb-4 max-w-3xl mx-auto"
                    as="p"
                  />
                  <InlineEditable
                    value={c.ctaBannerDescription2}
                    fieldName="ctaBannerDescription2"
                    type="textarea"
                    onChange={(v) => updateField('ctaBannerDescription2', v)}
                    isEditMode={isEditMode}
                    className="text-lg text-primary-foreground/80 mb-10 max-w-3xl mx-auto"
                    as="p"
                  />
                  <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                    <InlineEditableButton
                      text={c.ctaBannerButton}
                      href={c.ctaBannerButtonLink}
                      onTextChange={(v) => updateField('ctaBannerButton', v)}
                      onHrefChange={(v) => updateField('ctaBannerButtonLink', v)}
                      isEditMode={isEditMode}
                      isExternal={c.ctaBannerButtonOpenInNewTab}
                      onExternalChange={(v) => updateField('ctaBannerButtonOpenInNewTab', v)}
                    >
                      <a
                        href={c.ctaBannerButtonLink}
                        target={c.ctaBannerButtonOpenInNewTab ? '_blank' : undefined}
                        rel={c.ctaBannerButtonOpenInNewTab ? 'noopener noreferrer' : undefined}
                      >
                        <Button variant="hero" size="xl">
                          {c.ctaBannerButton}
                          <ArrowRight className="w-5 h-5" />
                        </Button>
                      </a>
                    </InlineEditableButton>
                    <a href={`tel:${c.ctaBannerPhoneNumber.replace(/\D/g, '')}`} className="flex items-center gap-2 text-secondary hover:text-secondary/80 transition-colors">
                      <Phone className="w-5 h-5" />
                      <InlineEditable
                        value={c.ctaBannerPhoneNumber}
                        fieldName="ctaBannerPhoneNumber"
                        onChange={(v) => updateField('ctaBannerPhoneNumber', v)}
                        isEditMode={isEditMode}
                        className="text-lg font-semibold"
                        as="span"
                      />
                    </a>
                  </div>
                </div>
              </section>

              {/* CONTACT SECTION */}
              <section id="contact" className="section-padding bg-background">
                <div className="container-custom">
                  <div className="text-center mb-12">
                    <InlineEditable
                      value={c.contactTagline}
                      fieldName="contactTagline"
                      onChange={(v) => updateField('contactTagline', v)}
                      isEditMode={isEditMode}
                      className="text-secondary font-heading uppercase tracking-widest mb-4"
                      as="p"
                    />
                    <InlineEditable
                      value={c.contactHeading}
                      fieldName="contactHeading"
                      onChange={(v) => updateField('contactHeading', v)}
                      isEditMode={isEditMode}
                      className="text-3xl md:text-4xl lg:text-5xl font-heading text-foreground mb-4"
                      as="h2"
                    />
                    <InlineEditable
                      value={c.contactSubheading}
                      fieldName="contactSubheading"
                      type="textarea"
                      onChange={(v) => updateField('contactSubheading', v)}
                      isEditMode={isEditMode}
                      className="text-muted-foreground max-w-2xl mx-auto"
                      as="p"
                    />
                  </div>
                  <div className="grid lg:grid-cols-2 gap-12">
                    <ContactForm />
                    <div className="space-y-8">
                      <div className="bg-muted/30 rounded-2xl p-8">
                        <div className="flex items-center gap-3 mb-4">
                          <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
                            <Phone className="w-5 h-5 text-primary" />
                          </div>
                          <InlineEditable
                            value={c.contactCallTitle}
                            fieldName="contactCallTitle"
                            onChange={(v) => updateField('contactCallTitle', v)}
                            isEditMode={isEditMode}
                            className="font-heading text-lg font-bold text-foreground"
                            as="h3"
                          />
                        </div>
                        <a href={`tel:${c.contactPhoneNumber.replace(/\D/g, '')}`} className="text-2xl font-heading text-primary hover:text-primary/80 transition-colors">
                          <InlineEditable
                            value={c.contactPhoneNumber}
                            fieldName="contactPhoneNumber"
                            onChange={(v) => updateField('contactPhoneNumber', v)}
                            isEditMode={isEditMode}
                            className=""
                            as="span"
                          />
                        </a>
                      </div>
                      <div className="bg-muted/30 rounded-2xl p-8">
                        <div className="flex items-center gap-3 mb-4">
                          <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
                            <MapPin className="w-5 h-5 text-primary" />
                          </div>
                          <InlineEditable
                            value={c.contactLocationTitle}
                            fieldName="contactLocationTitle"
                            onChange={(v) => updateField('contactLocationTitle', v)}
                            isEditMode={isEditMode}
                            className="font-heading text-lg font-bold text-foreground"
                            as="h3"
                          />
                        </div>
                        <div>
                          <InlineEditable
                            value={c.contactAddress1}
                            fieldName="contactAddress1"
                            onChange={(v) => updateField('contactAddress1', v)}
                            isEditMode={isEditMode}
                            className="text-muted-foreground"
                            as="p"
                          />
                          <InlineEditable
                            value={c.contactAddress2}
                            fieldName="contactAddress2"
                            onChange={(v) => updateField('contactAddress2', v)}
                            isEditMode={isEditMode}
                            className="text-muted-foreground"
                            as="p"
                          />
                        </div>
                      </div>
                      <div className="bg-muted/30 rounded-2xl p-8">
                        <div className="flex items-center gap-3 mb-4">
                          <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
                            <Clock className="w-5 h-5 text-primary" />
                          </div>
                          <InlineEditable
                            value={c.contactHoursTitle}
                            fieldName="contactHoursTitle"
                            onChange={(v) => updateField('contactHoursTitle', v)}
                            isEditMode={isEditMode}
                            className="font-heading text-lg font-bold text-foreground"
                            as="h3"
                          />
                        </div>
                        <div>
                          <InlineEditable
                            value={c.contactHours1}
                            fieldName="contactHours1"
                            onChange={(v) => updateField('contactHours1', v)}
                            isEditMode={isEditMode}
                            className="text-muted-foreground"
                            as="p"
                          />
                          <InlineEditable
                            value={c.contactHours2}
                            fieldName="contactHours2"
                            onChange={(v) => updateField('contactHours2', v)}
                            isEditMode={isEditMode}
                            className="text-muted-foreground"
                            as="p"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </>
      )}
    </EditablePageWrapper>
  );
}
