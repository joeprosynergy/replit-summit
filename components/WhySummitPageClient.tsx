"use client";

/**
 * Why Summit — Mid-Funnel Landing Page
 * For people comparing dealers. Shows quality proof, building styles,
 * the $50 site visit offer, payment options, and testimonials.
 */

import React from 'react';
import { ArrowRight, Phone, MapPin, Clock, Check, Star, Truck, CreditCard, Shield, Hammer, Layers, Ruler, Users, Layout, Calendar, Percent, DollarSign, ChevronRight, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cloudinaryImages, getMobileHeroImage, IMAGES } from '@/lib/cloudinary';
import { InlineEditable } from '@/components/admin/InlineEditable';
import InlineEditableImage from '@/components/admin/InlineEditableImage';
import InlineEditableButton from '@/components/admin/InlineEditableButton';
import { EditablePageWrapper } from '@/components/admin/EditablePageWrapper';
import { WhySummitContent } from '@/data/defaults/whySummitDefaults';
import Link from 'next/link';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  'truck': Truck, 'credit-card': CreditCard, 'shield': Shield, 'hammer': Hammer,
  'layers': Layers, 'ruler': Ruler, 'users': Users, 'layout': Layout,
  'calendar': Calendar, 'percent': Percent, 'dollar-sign': DollarSign,
};
const getIcon = (name: string) => iconMap[name] || Shield;

interface WhySummitPageClientProps {
  slug: string;
  defaults: WhySummitContent;
}

export default function WhySummitPageClient({ slug, defaults }: WhySummitPageClientProps) {
  return (
    <EditablePageWrapper<WhySummitContent>
      slug={slug}
      defaultContent={defaults}
    >
      {({ content: c, isEditMode, updateField }) => (
        <div className="min-h-screen">

          {/* ===== HERO ===== */}
          <section className="relative flex items-center justify-center overflow-hidden min-h-[70vh] lg:min-h-[80vh]">
            <picture className="absolute inset-0">
              <source media="(max-width: 768px)" srcSet={getMobileHeroImage(IMAGES.loftedBarn1)} />
              <img
                src={cloudinaryImages.loftedBarn1}
                alt="Summit portable building on a customer's property"
                fetchPriority="high"
                loading="eager"
                decoding="async"
                width={1600}
                height={900}
                className="w-full h-full object-cover"
              />
            </picture>
            <div className="absolute inset-0 bg-gradient-to-b from-black/85 via-black/75 to-black/85" />

            <div className="relative z-10 container-custom py-20 pt-28 lg:py-32 text-center max-w-4xl mx-auto">
              <div className="inline-flex items-center gap-2 bg-secondary/20 text-secondary font-heading text-sm uppercase tracking-[0.2em] px-4 py-2 rounded-full mb-6 animate-fade-in-up">
                <Shield className="w-4 h-4" />
                <InlineEditable
                  value={c.heroTagline}
                  fieldName="heroTagline"
                  onChange={(v) => updateField('heroTagline', v)}
                  isEditMode={isEditMode}
                  className=""
                  as="span"
                />
              </div>
              <div className="mb-6 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
                <InlineEditable
                  value={c.heroHeading}
                  fieldName="heroHeading"
                  onChange={(v) => updateField('heroHeading', v)}
                  isEditMode={isEditMode}
                  className="text-4xl md:text-5xl lg:text-6xl font-heading text-primary-foreground leading-[1.1] font-bold"
                  as="h1"
                />
              </div>
              <div className="mb-10 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                <InlineEditable
                  value={c.heroSubheading}
                  fieldName="heroSubheading"
                  type="textarea"
                  onChange={(v) => updateField('heroSubheading', v)}
                  isEditMode={isEditMode}
                  className="text-lg md:text-xl text-primary-foreground/80 leading-relaxed max-w-3xl mx-auto"
                  as="p"
                />
              </div>
              <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
                <a href="#offer">
                  <Button variant="hero" size="xl">
                    Book a $50 Site Visit
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </a>
                <a href={c.ctaButtonLink} target="_blank" rel="noopener noreferrer">
                  <Button variant="heroOutline" size="xl">
                    Design Yours in 3D
                  </Button>
                </a>
              </div>
            </div>

            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
              <div className="w-6 h-10 border-2 border-primary-foreground/30 rounded-full flex justify-center pt-2">
                <div className="w-1.5 h-3 bg-primary-foreground/50 rounded-full" />
              </div>
            </div>
          </section>

          {/* ===== JOURNEY PROGRESS BAR ===== */}
          <section className="bg-card border-b border-border/50">
            <div className="container-custom py-4">
              <div className="flex items-center justify-center gap-2 md:gap-4 max-w-2xl mx-auto">
                {c.journeySteps.map((step, index) => (
                  <React.Fragment key={index}>
                    {index > 0 && (
                      <ChevronRight className="w-4 h-4 text-muted-foreground/40 flex-shrink-0" />
                    )}
                    <Link
                      href={step.link}
                      className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors text-sm md:text-base ${
                        step.active
                          ? 'bg-secondary/10 text-secondary font-semibold'
                          : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                      }`}
                    >
                      <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 ${
                        step.active
                          ? 'bg-secondary text-white'
                          : 'bg-muted text-muted-foreground'
                      }`}>
                        {index + 1}
                      </span>
                      <span className="hidden sm:inline">{step.description}</span>
                      <span className="sm:hidden">{step.label}</span>
                    </Link>
                  </React.Fragment>
                ))}
              </div>
            </div>
          </section>

          {/* ===== HOW IT WORKS — 3 Steps ===== */}
          <section className="section-padding bg-background">
            <div className="container-custom">
              <div className="text-center mb-16">
                <InlineEditable
                  value={c.processTagline}
                  fieldName="processTagline"
                  onChange={(v) => updateField('processTagline', v)}
                  isEditMode={isEditMode}
                  className="text-secondary font-heading uppercase tracking-widest mb-4"
                  as="p"
                />
                <InlineEditable
                  value={c.processHeading}
                  fieldName="processHeading"
                  onChange={(v) => updateField('processHeading', v)}
                  isEditMode={isEditMode}
                  className="text-3xl md:text-4xl lg:text-5xl font-heading text-foreground mb-6"
                  as="h2"
                />
                <InlineEditable
                  value={c.processSubheading}
                  fieldName="processSubheading"
                  type="textarea"
                  onChange={(v) => updateField('processSubheading', v)}
                  isEditMode={isEditMode}
                  className="text-lg text-muted-foreground max-w-2xl mx-auto"
                  as="p"
                />
              </div>
              <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                {c.processSteps.map((step, index) => {
                  const Icon = getIcon(step.icon);
                  return (
                    <div key={index} className="text-center relative">
                      {/* Connector line on desktop */}
                      {index < c.processSteps.length - 1 && (
                        <div className="hidden md:block absolute top-12 left-[60%] w-[80%] h-0.5 bg-gradient-to-r from-secondary/30 to-secondary/10" />
                      )}
                      <div className="w-24 h-24 rounded-2xl bg-secondary/10 flex items-center justify-center mx-auto mb-6 relative">
                        <Icon className="w-10 h-10 text-secondary" />
                        <span className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-secondary text-white font-heading font-bold text-sm flex items-center justify-center">
                          {step.number}
                        </span>
                      </div>
                      <InlineEditable
                        value={step.heading}
                        fieldName={`Process step ${index + 1} heading`}
                        onChange={(v) => {
                          const updated = [...c.processSteps];
                          updated[index] = { ...updated[index], heading: v };
                          updateField('processSteps', updated as unknown as string);
                        }}
                        isEditMode={isEditMode}
                        className="font-heading text-xl font-bold text-foreground mb-3"
                        as="h3"
                      />
                      <InlineEditable
                        value={step.description}
                        fieldName={`Process step ${index + 1} description`}
                        type="textarea"
                        onChange={(v) => {
                          const updated = [...c.processSteps];
                          updated[index] = { ...updated[index], description: v };
                          updateField('processSteps', updated as unknown as string);
                        }}
                        isEditMode={isEditMode}
                        className="text-muted-foreground leading-relaxed"
                        as="p"
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          </section>

          {/* ===== BUILDING STYLES ===== */}
          <section className="section-padding bg-muted/30">
            <div className="container-custom">
              <div className="text-center mb-16">
                <InlineEditable
                  value={c.stylesTagline}
                  fieldName="stylesTagline"
                  onChange={(v) => updateField('stylesTagline', v)}
                  isEditMode={isEditMode}
                  className="text-secondary font-heading uppercase tracking-widest mb-4"
                  as="p"
                />
                <InlineEditable
                  value={c.stylesHeading}
                  fieldName="stylesHeading"
                  onChange={(v) => updateField('stylesHeading', v)}
                  isEditMode={isEditMode}
                  className="text-3xl md:text-4xl lg:text-5xl font-heading text-foreground mb-6"
                  as="h2"
                />
                <InlineEditable
                  value={c.stylesSubheading}
                  fieldName="stylesSubheading"
                  type="textarea"
                  onChange={(v) => updateField('stylesSubheading', v)}
                  isEditMode={isEditMode}
                  className="text-lg text-muted-foreground max-w-2xl mx-auto"
                  as="p"
                />
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
                {c.styles.map((style, index) => (
                  <Link key={index} href={style.link} className="group">
                    <div className="bg-card rounded-2xl border border-border/50 overflow-hidden hover:shadow-xl transition-all hover:-translate-y-1">
                      <InlineEditableImage
                        src={style.image}
                        alt={style.name}
                        onImageChange={(url) => {
                          const updated = [...c.styles];
                          updated[index] = { ...updated[index], image: url };
                          updateField('styles', updated as unknown as string);
                        }}
                        isEditMode={isEditMode}
                        imageClassName="w-full h-48 object-contain bg-muted/50 p-2 group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="p-6">
                        <InlineEditable
                          value={style.name}
                          fieldName={`Style ${index + 1} name`}
                          onChange={(v) => {
                            const updated = [...c.styles];
                            updated[index] = { ...updated[index], name: v };
                            updateField('styles', updated as unknown as string);
                          }}
                          isEditMode={isEditMode}
                          className="font-heading text-xl font-bold text-foreground mb-1"
                          as="h3"
                        />
                        <InlineEditable
                          value={style.startingPrice}
                          fieldName={`Style ${index + 1} price`}
                          onChange={(v) => {
                            const updated = [...c.styles];
                            updated[index] = { ...updated[index], startingPrice: v };
                            updateField('styles', updated as unknown as string);
                          }}
                          isEditMode={isEditMode}
                          className="text-secondary font-semibold text-sm mb-3"
                          as="p"
                        />
                        <InlineEditable
                          value={style.description}
                          fieldName={`Style ${index + 1} description`}
                          type="textarea"
                          onChange={(v) => {
                            const updated = [...c.styles];
                            updated[index] = { ...updated[index], description: v };
                            updateField('styles', updated as unknown as string);
                          }}
                          isEditMode={isEditMode}
                          className="text-sm text-muted-foreground leading-relaxed"
                          as="p"
                        />
                        <div className="mt-4 flex items-center gap-1 text-secondary font-medium text-sm group-hover:gap-2 transition-all">
                          View Details <ArrowRight className="w-4 h-4" />
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>

          {/* ===== WHY SUMMIT — Differentiators ===== */}
          <section className="section-padding bg-navy text-primary-foreground">
            <div className="container-custom">
              <div className="text-center mb-16">
                <InlineEditable
                  value={c.whyTagline}
                  fieldName="whyTagline"
                  onChange={(v) => updateField('whyTagline', v)}
                  isEditMode={isEditMode}
                  className="text-secondary font-heading uppercase tracking-widest mb-4"
                  as="p"
                />
                <InlineEditable
                  value={c.whyHeading}
                  fieldName="whyHeading"
                  onChange={(v) => updateField('whyHeading', v)}
                  isEditMode={isEditMode}
                  className="text-3xl md:text-4xl lg:text-5xl font-heading mb-6"
                  as="h2"
                />
                <InlineEditable
                  value={c.whySubheading}
                  fieldName="whySubheading"
                  type="textarea"
                  onChange={(v) => updateField('whySubheading', v)}
                  isEditMode={isEditMode}
                  className="text-lg text-primary-foreground/70 max-w-3xl mx-auto"
                  as="p"
                />
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
                {c.differentiators.map((item, index) => {
                  const Icon = getIcon(item.icon);
                  return (
                    <div key={index} className="bg-primary-foreground/5 rounded-2xl p-8 border border-primary-foreground/10">
                      <div className="w-12 h-12 rounded-xl bg-secondary/20 flex items-center justify-center mb-5">
                        <Icon className="w-6 h-6 text-secondary" />
                      </div>
                      <InlineEditable
                        value={item.heading}
                        fieldName={`Differentiator ${index + 1} heading`}
                        onChange={(v) => {
                          const updated = [...c.differentiators];
                          updated[index] = { ...updated[index], heading: v };
                          updateField('differentiators', updated as unknown as string);
                        }}
                        isEditMode={isEditMode}
                        className="font-heading text-xl font-bold mb-3"
                        as="h3"
                      />
                      <InlineEditable
                        value={item.description}
                        fieldName={`Differentiator ${index + 1} description`}
                        type="textarea"
                        onChange={(v) => {
                          const updated = [...c.differentiators];
                          updated[index] = { ...updated[index], description: v };
                          updateField('differentiators', updated as unknown as string);
                        }}
                        isEditMode={isEditMode}
                        className="text-primary-foreground/70 leading-relaxed"
                        as="p"
                      />
                    </div>
                  );
                })}
              </div>
              <p className="text-center text-primary-foreground/40 text-sm mt-8 max-w-2xl mx-auto">
                {c.whyDisclaimer}
              </p>
            </div>
          </section>

          {/* ===== $50 SITE VISIT OFFER ===== */}
          <section id="offer" className="section-padding bg-background">
            <div className="container-custom">
              <div className="max-w-4xl mx-auto">
                <div className="bg-gradient-to-br from-secondary/5 via-secondary/10 to-secondary/5 rounded-3xl border-2 border-secondary/30 p-8 md:p-12 relative overflow-hidden">
                  {/* Background accent */}
                  <div className="absolute top-0 right-0 w-64 h-64 bg-secondary/5 rounded-full -translate-y-1/2 translate-x-1/2" />
                  <div className="absolute bottom-0 left-0 w-48 h-48 bg-secondary/5 rounded-full translate-y-1/2 -translate-x-1/2" />

                  <div className="relative z-10">
                    <InlineEditable
                      value={c.offerTagline}
                      fieldName="offerTagline"
                      onChange={(v) => updateField('offerTagline', v)}
                      isEditMode={isEditMode}
                      className="text-secondary font-heading uppercase tracking-widest mb-4"
                      as="p"
                    />
                    <InlineEditable
                      value={c.offerHeading}
                      fieldName="offerHeading"
                      onChange={(v) => updateField('offerHeading', v)}
                      isEditMode={isEditMode}
                      className="text-3xl md:text-4xl lg:text-5xl font-heading text-foreground mb-6 leading-tight"
                      as="h2"
                    />
                    <InlineEditable
                      value={c.offerDescription}
                      fieldName="offerDescription"
                      type="textarea"
                      onChange={(v) => updateField('offerDescription', v)}
                      isEditMode={isEditMode}
                      className="text-lg text-muted-foreground leading-relaxed mb-8 max-w-3xl"
                      as="p"
                    />

                    <div className="space-y-4 mb-10">
                      {c.offerDetails.map((detail, index) => (
                        <div key={index} className="flex items-start gap-3">
                          <div className="flex-shrink-0 w-6 h-6 rounded-full bg-secondary/20 flex items-center justify-center mt-0.5">
                            <Check className="w-4 h-4 text-secondary" />
                          </div>
                          <InlineEditable
                            value={detail.text}
                            fieldName={`Offer detail ${index + 1}`}
                            onChange={(v) => {
                              const updated = [...c.offerDetails];
                              updated[index] = { text: v };
                              updateField('offerDetails', updated as unknown as string);
                            }}
                            isEditMode={isEditMode}
                            className="text-foreground font-medium text-lg"
                            as="span"
                          />
                        </div>
                      ))}
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4 items-start">
                      <a href={c.offerCtaLink}>
                        <Button variant="hero" size="xl" className="text-lg px-10">
                          <Phone className="w-5 h-5" />
                          {c.offerCta}
                        </Button>
                      </a>
                      <span className="text-muted-foreground text-sm self-center">
                        Call {c.contactPhoneNumber} to schedule
                      </span>
                    </div>

                    <p className="text-xs text-muted-foreground/60 mt-6">
                      {c.offerFinePrint}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* ===== PAYMENT OPTIONS ===== */}
          <section className="section-padding bg-muted/30">
            <div className="container-custom">
              <div className="text-center mb-16">
                <InlineEditable
                  value={c.paymentTagline}
                  fieldName="paymentTagline"
                  onChange={(v) => updateField('paymentTagline', v)}
                  isEditMode={isEditMode}
                  className="text-secondary font-heading uppercase tracking-widest mb-4"
                  as="p"
                />
                <InlineEditable
                  value={c.paymentHeading}
                  fieldName="paymentHeading"
                  onChange={(v) => updateField('paymentHeading', v)}
                  isEditMode={isEditMode}
                  className="text-3xl md:text-4xl lg:text-5xl font-heading text-foreground mb-6"
                  as="h2"
                />
                <InlineEditable
                  value={c.paymentSubheading}
                  fieldName="paymentSubheading"
                  type="textarea"
                  onChange={(v) => updateField('paymentSubheading', v)}
                  isEditMode={isEditMode}
                  className="text-lg text-muted-foreground max-w-2xl mx-auto"
                  as="p"
                />
              </div>
              <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
                {c.paymentOptions.map((option, index) => {
                  const Icon = getIcon(option.icon);
                  return (
                    <div key={index} className={`bg-card rounded-2xl border p-8 relative ${
                      index === 0 ? 'border-secondary ring-1 ring-secondary/20' : 'border-border/50'
                    }`}>
                      {option.highlight && (
                        <span className={`absolute -top-3 left-6 px-3 py-1 text-xs font-heading font-bold uppercase tracking-wider rounded-full ${
                          index === 0
                            ? 'bg-secondary text-white'
                            : 'bg-muted text-muted-foreground'
                        }`}>
                          {option.highlight}
                        </span>
                      )}
                      <div className="w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center mb-5">
                        <Icon className="w-6 h-6 text-secondary" />
                      </div>
                      <InlineEditable
                        value={option.name}
                        fieldName={`Payment option ${index + 1} name`}
                        onChange={(v) => {
                          const updated = [...c.paymentOptions];
                          updated[index] = { ...updated[index], name: v };
                          updateField('paymentOptions', updated as unknown as string);
                        }}
                        isEditMode={isEditMode}
                        className="font-heading text-xl font-bold text-foreground mb-2"
                        as="h3"
                      />
                      <InlineEditable
                        value={option.description}
                        fieldName={`Payment option ${index + 1} description`}
                        onChange={(v) => {
                          const updated = [...c.paymentOptions];
                          updated[index] = { ...updated[index], description: v };
                          updateField('paymentOptions', updated as unknown as string);
                        }}
                        isEditMode={isEditMode}
                        className="text-secondary font-medium text-sm mb-4"
                        as="p"
                      />
                      <InlineEditable
                        value={option.details}
                        fieldName={`Payment option ${index + 1} details`}
                        type="textarea"
                        onChange={(v) => {
                          const updated = [...c.paymentOptions];
                          updated[index] = { ...updated[index], details: v };
                          updateField('paymentOptions', updated as unknown as string);
                        }}
                        isEditMode={isEditMode}
                        className="text-muted-foreground leading-relaxed text-sm"
                        as="p"
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          </section>

          {/* ===== TESTIMONIALS ===== */}
          <section className="section-padding bg-background">
            <div className="container-custom">
              <div className="text-center mb-16">
                <InlineEditable
                  value={c.testimonialsTagline}
                  fieldName="testimonialsTagline"
                  onChange={(v) => updateField('testimonialsTagline', v)}
                  isEditMode={isEditMode}
                  className="text-secondary font-heading uppercase tracking-widest mb-4"
                  as="p"
                />
                <InlineEditable
                  value={c.testimonialsHeading}
                  fieldName="testimonialsHeading"
                  onChange={(v) => updateField('testimonialsHeading', v)}
                  isEditMode={isEditMode}
                  className="text-3xl md:text-4xl lg:text-5xl font-heading text-foreground"
                  as="h2"
                />
              </div>
              <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
                {c.testimonials.map((testimonial, index) => (
                  <div key={index} className="bg-card rounded-2xl border border-border/50 p-8">
                    <div className="flex gap-1 mb-4">
                      {Array.from({ length: testimonial.stars }).map((_, i) => (
                        <Star key={i} className="w-5 h-5 fill-secondary text-secondary" />
                      ))}
                    </div>
                    <InlineEditable
                      value={testimonial.quote}
                      fieldName={`Testimonial ${index + 1} quote`}
                      type="textarea"
                      onChange={(v) => {
                        const updated = [...c.testimonials];
                        updated[index] = { ...updated[index], quote: v };
                        updateField('testimonials', updated as unknown as string);
                      }}
                      isEditMode={isEditMode}
                      className="text-foreground leading-relaxed mb-6 italic"
                      as="p"
                    />
                    <div>
                      <InlineEditable
                        value={testimonial.name}
                        fieldName={`Testimonial ${index + 1} name`}
                        onChange={(v) => {
                          const updated = [...c.testimonials];
                          updated[index] = { ...updated[index], name: v };
                          updateField('testimonials', updated as unknown as string);
                        }}
                        isEditMode={isEditMode}
                        className="font-heading font-bold text-foreground"
                        as="span"
                      />
                      <InlineEditable
                        value={testimonial.location}
                        fieldName={`Testimonial ${index + 1} location`}
                        onChange={(v) => {
                          const updated = [...c.testimonials];
                          updated[index] = { ...updated[index], location: v };
                          updateField('testimonials', updated as unknown as string);
                        }}
                        isEditMode={isEditMode}
                        className="text-muted-foreground text-sm ml-2"
                        as="span"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* ===== BRIDGE TO TOF ===== */}
          <section className="bg-muted/30 border-y border-border/50">
            <div className="container-custom py-6">
              <div className="flex items-center justify-center gap-3 text-muted-foreground">
                <BookOpen className="w-5 h-5" />
                <Link href={c.tofLinkHref} className="hover:text-secondary transition-colors font-medium">
                  {c.tofLinkText}
                  <ArrowRight className="w-4 h-4 inline ml-1" />
                </Link>
              </div>
            </div>
          </section>

          {/* ===== BOTTOM CTA — Push to BOF ===== */}
          <section className="section-padding bg-navy text-primary-foreground">
            <div className="container-custom text-center max-w-3xl mx-auto">
              <InlineEditable
                value={c.ctaHeading}
                fieldName="ctaHeading"
                onChange={(v) => updateField('ctaHeading', v)}
                isEditMode={isEditMode}
                className="text-3xl md:text-4xl lg:text-5xl font-heading mb-6"
                as="h2"
              />
              <InlineEditable
                value={c.ctaDescription}
                fieldName="ctaDescription"
                type="textarea"
                onChange={(v) => updateField('ctaDescription', v)}
                isEditMode={isEditMode}
                className="text-lg text-primary-foreground/80 leading-relaxed mb-10"
                as="p"
              />
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
                <InlineEditableButton
                  text={c.ctaButtonText}
                  href={c.ctaButtonLink}
                  onTextChange={(v) => updateField('ctaButtonText', v)}
                  onHrefChange={(v) => updateField('ctaButtonLink', v)}
                  isEditMode={isEditMode}
                  isExternal={true}
                >
                  <a href={c.ctaButtonLink} target="_blank" rel="noopener noreferrer">
                    <Button variant="hero" size="xl">
                      {c.ctaButtonText}
                      <ArrowRight className="w-4 h-4" />
                    </Button>
                  </a>
                </InlineEditableButton>
                <InlineEditableButton
                  text={c.ctaSecondaryText}
                  href={c.ctaSecondaryLink}
                  onTextChange={(v) => updateField('ctaSecondaryText', v)}
                  onHrefChange={(v) => updateField('ctaSecondaryLink', v)}
                  isEditMode={isEditMode}
                >
                  <a href={c.ctaSecondaryLink}>
                    <Button variant="heroOutline" size="xl">
                      <Phone className="w-4 h-4" />
                      {c.ctaSecondaryText}
                    </Button>
                  </a>
                </InlineEditableButton>
              </div>
              <div className="flex flex-wrap justify-center gap-6 text-primary-foreground/70 text-sm">
                <a href={`tel:${c.contactPhoneNumber.replace(/\D/g, '')}`} className="flex items-center gap-2 hover:text-primary-foreground transition-colors">
                  <Phone className="w-4 h-4" />
                  <span>{c.contactPhoneNumber}</span>
                </a>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  <span>{c.contactAddress1}, {c.contactAddress2}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span>{c.contactHours1} | {c.contactHours2}</span>
                </div>
              </div>
            </div>
          </section>

        </div>
      )}
    </EditablePageWrapper>
  );
}
