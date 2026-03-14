"use client";

/**
 * Shed Buying Guide — Top of Funnel Landing Page
 * Educational, helpful, non-salesy. Builds trust with people
 * just starting to think about outdoor storage.
 */

import React, { useState } from 'react';
import { ArrowRight, Package, Home, Hammer, Heart, CreditCard, Shield, Truck, Clock, Check, ChevronDown, Phone, MapPin, BookOpen, AlertTriangle, BarChart3 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cloudinaryImages, getMobileHeroImage, IMAGES } from '@/lib/cloudinary';
import { InlineEditable } from '@/components/admin/InlineEditable';
import InlineEditableImage from '@/components/admin/InlineEditableImage';
import InlineEditableButton from '@/components/admin/InlineEditableButton';
import { EditablePageWrapper } from '@/components/admin/EditablePageWrapper';
import { ShedGuideContent } from '@/data/defaults/shedGuideDefaults';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  'truck': Truck, 'credit-card': CreditCard, 'shield': Shield, 'package': Package,
  'home': Home, 'hammer': Hammer, 'heart': Heart, 'clock': Clock,
};
const getIcon = (name: string) => iconMap[name] || Package;

interface ShedGuidePageClientProps {
  slug: string;
  defaults: ShedGuideContent;
}

function FAQAccordion({ question, answer, index, isEditMode, content, updateField }: {
  question: string;
  answer: string;
  index: number;
  isEditMode: boolean;
  content: ShedGuideContent;
  updateField: (field: string, value: unknown) => void;
}) {
  const [open, setOpen] = useState(index === 0);

  return (
    <div className="border border-border/50 rounded-xl overflow-hidden bg-card">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="w-full flex items-center gap-4 p-6 text-left hover:bg-muted/30 transition-colors"
      >
        <InlineEditable
          value={question}
          fieldName={`FAQ ${index + 1} question`}
          onChange={(v) => {
            const updated = [...content.faqItems];
            updated[index] = { ...updated[index], question: v };
            updateField('faqItems', updated as unknown as string);
          }}
          isEditMode={isEditMode}
          className="font-heading text-lg font-bold text-foreground flex-grow"
          as="span"
        />
        <ChevronDown className={`w-5 h-5 text-muted-foreground transition-transform flex-shrink-0 ${open ? 'rotate-180' : ''}`} />
      </button>
      {open && (
        <div className="px-6 pb-6">
          <InlineEditable
            value={answer}
            fieldName={`FAQ ${index + 1} answer`}
            type="textarea"
            onChange={(v) => {
              const updated = [...content.faqItems];
              updated[index] = { ...updated[index], answer: v };
              updateField('faqItems', updated as unknown as string);
            }}
            isEditMode={isEditMode}
            className="text-muted-foreground leading-relaxed"
            as="p"
          />
        </div>
      )}
    </div>
  );
}

export default function ShedGuidePageClient({ slug, defaults }: ShedGuidePageClientProps) {
  return (
    <EditablePageWrapper<ShedGuideContent>
      slug={slug}
      defaultContent={defaults}
    >
      {({ content: c, isEditMode, updateField }) => (
        <div className="min-h-screen">

          {/* ===== HERO — Full-width, centered, educational tone ===== */}
          <section className="relative flex items-center justify-center overflow-hidden min-h-[70vh] lg:min-h-[80vh]">
            <picture className="absolute inset-0">
              <source media="(max-width: 768px)" srcSet={getMobileHeroImage(IMAGES.utilityShed1)} />
              <img
                src={cloudinaryImages.utilityShed1}
                alt="Storage shed on a residential property"
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
                <BookOpen className="w-4 h-4" />
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
                <a href="#signs">
                  <Button variant="hero" size="xl">
                    Read the Guide
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </a>
                <a href={c.ctaButtonLink} target="_blank" rel="noopener noreferrer">
                  <Button variant="heroOutline" size="xl">
                    Or Jump to the 3D Designer
                  </Button>
                </a>
              </div>
            </div>

            {/* Scroll indicator */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
              <div className="w-6 h-10 border-2 border-primary-foreground/30 rounded-full flex justify-center pt-2">
                <div className="w-1.5 h-3 bg-primary-foreground/50 rounded-full" />
              </div>
            </div>
          </section>

          {/* ===== SIGNS YOU NEED A SHED ===== */}
          <section id="signs" className="section-padding bg-background">
            <div className="container-custom">
              <div className="text-center mb-16">
                <InlineEditable
                  value={c.introTagline}
                  fieldName="introTagline"
                  onChange={(v) => updateField('introTagline', v)}
                  isEditMode={isEditMode}
                  className="text-secondary font-heading uppercase tracking-widest mb-4"
                  as="p"
                />
                <InlineEditable
                  value={c.introHeading}
                  fieldName="introHeading"
                  onChange={(v) => updateField('introHeading', v)}
                  isEditMode={isEditMode}
                  className="text-3xl md:text-4xl lg:text-5xl font-heading text-foreground"
                  as="h2"
                />
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
                {c.introCards.map((card, index) => {
                  const Icon = getIcon(card.icon);
                  return (
                    <div key={index} className="bg-card rounded-2xl border border-border/50 p-8 hover:shadow-lg transition-shadow">
                      <div className="w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center mb-5">
                        <Icon className="w-6 h-6 text-secondary" />
                      </div>
                      <InlineEditable
                        value={card.heading}
                        fieldName={`Intro card ${index + 1} heading`}
                        onChange={(v) => {
                          const updated = [...c.introCards];
                          updated[index] = { ...updated[index], heading: v };
                          updateField('introCards', updated as unknown as string);
                        }}
                        isEditMode={isEditMode}
                        className="font-heading text-xl font-bold text-foreground mb-3"
                        as="h3"
                      />
                      <InlineEditable
                        value={card.description}
                        fieldName={`Intro card ${index + 1} description`}
                        type="textarea"
                        onChange={(v) => {
                          const updated = [...c.introCards];
                          updated[index] = { ...updated[index], description: v };
                          updateField('introCards', updated as unknown as string);
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

          {/* ===== 7 THINGS TO THINK ABOUT ===== */}
          <section className="section-padding bg-navy text-primary-foreground">
            <div className="container-custom">
              <div className="text-center mb-16">
                <InlineEditable
                  value={c.considerationsTagline}
                  fieldName="considerationsTagline"
                  onChange={(v) => updateField('considerationsTagline', v)}
                  isEditMode={isEditMode}
                  className="text-secondary font-heading uppercase tracking-widest mb-4"
                  as="p"
                />
                <InlineEditable
                  value={c.considerationsHeading}
                  fieldName="considerationsHeading"
                  onChange={(v) => updateField('considerationsHeading', v)}
                  isEditMode={isEditMode}
                  className="text-3xl md:text-4xl lg:text-5xl font-heading mb-6"
                  as="h2"
                />
                <InlineEditable
                  value={c.considerationsSubheading}
                  fieldName="considerationsSubheading"
                  type="textarea"
                  onChange={(v) => updateField('considerationsSubheading', v)}
                  isEditMode={isEditMode}
                  className="text-lg text-primary-foreground/70 max-w-2xl mx-auto"
                  as="p"
                />
              </div>
              <div className="max-w-4xl mx-auto space-y-6">
                {c.considerations.map((item, index) => (
                  <div key={index} className="flex gap-6 items-start bg-primary-foreground/5 rounded-xl p-6 md:p-8">
                    <div className="flex-shrink-0 w-14 h-14 rounded-xl bg-secondary/20 flex items-center justify-center">
                      <InlineEditable
                        value={item.number}
                        fieldName={`Consideration ${index + 1} number`}
                        onChange={(v) => {
                          const updated = [...c.considerations];
                          updated[index] = { ...updated[index], number: v };
                          updateField('considerations', updated as unknown as string);
                        }}
                        isEditMode={isEditMode}
                        className="text-secondary font-heading text-lg font-bold"
                        as="span"
                      />
                    </div>
                    <div>
                      <InlineEditable
                        value={item.heading}
                        fieldName={`Consideration ${index + 1} heading`}
                        onChange={(v) => {
                          const updated = [...c.considerations];
                          updated[index] = { ...updated[index], heading: v };
                          updateField('considerations', updated as unknown as string);
                        }}
                        isEditMode={isEditMode}
                        className="font-heading text-xl font-bold mb-2"
                        as="h3"
                      />
                      <InlineEditable
                        value={item.description}
                        fieldName={`Consideration ${index + 1} description`}
                        type="textarea"
                        onChange={(v) => {
                          const updated = [...c.considerations];
                          updated[index] = { ...updated[index], description: v };
                          updateField('considerations', updated as unknown as string);
                        }}
                        isEditMode={isEditMode}
                        className="text-primary-foreground/70 leading-relaxed"
                        as="p"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* ===== COMPARISON TABLE ===== */}
          <section className="section-padding bg-background">
            <div className="container-custom">
              <div className="text-center mb-16">
                <InlineEditable
                  value={c.comparisonTagline}
                  fieldName="comparisonTagline"
                  onChange={(v) => updateField('comparisonTagline', v)}
                  isEditMode={isEditMode}
                  className="text-secondary font-heading uppercase tracking-widest mb-4"
                  as="p"
                />
                <InlineEditable
                  value={c.comparisonHeading}
                  fieldName="comparisonHeading"
                  onChange={(v) => updateField('comparisonHeading', v)}
                  isEditMode={isEditMode}
                  className="text-3xl md:text-4xl lg:text-5xl font-heading text-foreground mb-6"
                  as="h2"
                />
                <InlineEditable
                  value={c.comparisonSubheading}
                  fieldName="comparisonSubheading"
                  type="textarea"
                  onChange={(v) => updateField('comparisonSubheading', v)}
                  isEditMode={isEditMode}
                  className="text-lg text-muted-foreground max-w-2xl mx-auto"
                  as="p"
                />
              </div>
              {/* Mobile: cards / Desktop: table */}
              <div className="max-w-5xl mx-auto">
                {/* Desktop table */}
                <div className="hidden md:block overflow-x-auto">
                  <table className="w-full text-left">
                    <thead>
                      <tr className="border-b-2 border-border">
                        <th className="py-4 px-4 font-heading text-foreground uppercase tracking-wider text-sm"></th>
                        <th className="py-4 px-4 font-heading text-foreground uppercase tracking-wider text-sm">Monthly Cost</th>
                        <th className="py-4 px-4 font-heading text-foreground uppercase tracking-wider text-sm">Ownership</th>
                        <th className="py-4 px-4 font-heading text-foreground uppercase tracking-wider text-sm">Access</th>
                        <th className="py-4 px-4 font-heading text-foreground uppercase tracking-wider text-sm">Customizable</th>
                      </tr>
                    </thead>
                    <tbody>
                      {c.comparisonItems.map((item, index) => (
                        <tr key={index} className={`border-b border-border/50 ${index === 0 ? 'bg-secondary/5' : ''}`}>
                          <td className="py-5 px-4">
                            <span className="font-heading font-bold text-foreground text-lg">{item.option}</span>
                          </td>
                          <td className="py-5 px-4 text-muted-foreground">{item.monthlyCost}</td>
                          <td className="py-5 px-4 text-muted-foreground">{item.ownership}</td>
                          <td className="py-5 px-4 text-muted-foreground">{item.access}</td>
                          <td className="py-5 px-4 text-muted-foreground">{item.customizable}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                {/* Mobile cards */}
                <div className="md:hidden space-y-6">
                  {c.comparisonItems.map((item, index) => (
                    <div key={index} className={`bg-card rounded-2xl border p-6 ${index === 0 ? 'border-secondary ring-1 ring-secondary/20' : 'border-border/50'}`}>
                      <h3 className="font-heading text-xl font-bold text-foreground mb-4">{item.option}</h3>
                      <div className="space-y-3 text-sm">
                        <div className="flex justify-between"><span className="text-muted-foreground">Monthly Cost</span><span className="font-medium text-foreground">{item.monthlyCost}</span></div>
                        <div className="flex justify-between"><span className="text-muted-foreground">Ownership</span><span className="font-medium text-foreground">{item.ownership}</span></div>
                        <div className="flex justify-between"><span className="text-muted-foreground">Access</span><span className="font-medium text-foreground">{item.access}</span></div>
                        <div className="flex justify-between"><span className="text-muted-foreground">Customizable</span><span className="font-medium text-foreground">{item.customizable}</span></div>
                      </div>
                      <p className="mt-4 text-sm text-secondary font-medium">{item.verdict}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* ===== SIZE GUIDE ===== */}
          <section className="section-padding bg-muted/30">
            <div className="container-custom">
              <div className="text-center mb-16">
                <InlineEditable
                  value={c.sizeGuideTagline}
                  fieldName="sizeGuideTagline"
                  onChange={(v) => updateField('sizeGuideTagline', v)}
                  isEditMode={isEditMode}
                  className="text-secondary font-heading uppercase tracking-widest mb-4"
                  as="p"
                />
                <InlineEditable
                  value={c.sizeGuideHeading}
                  fieldName="sizeGuideHeading"
                  onChange={(v) => updateField('sizeGuideHeading', v)}
                  isEditMode={isEditMode}
                  className="text-3xl md:text-4xl lg:text-5xl font-heading text-foreground mb-6"
                  as="h2"
                />
                <InlineEditable
                  value={c.sizeGuideSubheading}
                  fieldName="sizeGuideSubheading"
                  type="textarea"
                  onChange={(v) => updateField('sizeGuideSubheading', v)}
                  isEditMode={isEditMode}
                  className="text-lg text-muted-foreground max-w-2xl mx-auto"
                  as="p"
                />
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
                {c.sizeGuideItems.map((item, index) => (
                  <div key={index} className="bg-card rounded-2xl border border-border/50 overflow-hidden hover:shadow-lg transition-shadow">
                    <InlineEditableImage
                      src={item.image}
                      alt={`${item.size} shed`}
                      onImageChange={(url) => {
                        const updated = [...c.sizeGuideItems];
                        updated[index] = { ...updated[index], image: url };
                        updateField('sizeGuideItems', updated as unknown as string);
                      }}
                      isEditMode={isEditMode}
                      imageClassName="w-full h-44 object-contain bg-muted/50 p-2"
                    />
                    <div className="p-6">
                      <div className="flex items-baseline gap-3 mb-2">
                        <InlineEditable
                          value={item.size}
                          fieldName={`Size guide ${index + 1} size`}
                          onChange={(v) => {
                            const updated = [...c.sizeGuideItems];
                            updated[index] = { ...updated[index], size: v };
                            updateField('sizeGuideItems', updated as unknown as string);
                          }}
                          isEditMode={isEditMode}
                          className="font-heading text-2xl font-bold text-foreground"
                          as="span"
                        />
                        <span className="text-sm text-muted-foreground">{item.sqft}</span>
                      </div>
                      <InlineEditable
                        value={item.bestFor}
                        fieldName={`Size guide ${index + 1} bestFor`}
                        type="textarea"
                        onChange={(v) => {
                          const updated = [...c.sizeGuideItems];
                          updated[index] = { ...updated[index], bestFor: v };
                          updateField('sizeGuideItems', updated as unknown as string);
                        }}
                        isEditMode={isEditMode}
                        className="text-sm text-muted-foreground leading-relaxed"
                        as="p"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* ===== COMMON MISTAKES ===== */}
          <section className="section-padding bg-background">
            <div className="container-custom">
              <div className="text-center mb-16">
                <InlineEditable
                  value={c.mistakesTagline}
                  fieldName="mistakesTagline"
                  onChange={(v) => updateField('mistakesTagline', v)}
                  isEditMode={isEditMode}
                  className="text-secondary font-heading uppercase tracking-widest mb-4"
                  as="p"
                />
                <InlineEditable
                  value={c.mistakesHeading}
                  fieldName="mistakesHeading"
                  onChange={(v) => updateField('mistakesHeading', v)}
                  isEditMode={isEditMode}
                  className="text-3xl md:text-4xl lg:text-5xl font-heading text-foreground mb-6"
                  as="h2"
                />
                <InlineEditable
                  value={c.mistakesSubheading}
                  fieldName="mistakesSubheading"
                  type="textarea"
                  onChange={(v) => updateField('mistakesSubheading', v)}
                  isEditMode={isEditMode}
                  className="text-lg text-muted-foreground max-w-2xl mx-auto"
                  as="p"
                />
              </div>
              <div className="max-w-3xl mx-auto space-y-6">
                {c.mistakes.map((item, index) => (
                  <div key={index} className="bg-card rounded-2xl border border-border/50 p-6 md:p-8">
                    <div className="flex gap-4 items-start">
                      <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-red-500/10 flex items-center justify-center">
                        <AlertTriangle className="w-5 h-5 text-red-500" />
                      </div>
                      <div>
                        <InlineEditable
                          value={item.mistake}
                          fieldName={`Mistake ${index + 1}`}
                          onChange={(v) => {
                            const updated = [...c.mistakes];
                            updated[index] = { ...updated[index], mistake: v };
                            updateField('mistakes', updated as unknown as string);
                          }}
                          isEditMode={isEditMode}
                          className="font-heading text-lg font-bold text-foreground mb-2"
                          as="h3"
                        />
                        <div className="flex gap-2 items-start">
                          <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                          <InlineEditable
                            value={item.tip}
                            fieldName={`Mistake ${index + 1} tip`}
                            type="textarea"
                            onChange={(v) => {
                              const updated = [...c.mistakes];
                              updated[index] = { ...updated[index], tip: v };
                              updateField('mistakes', updated as unknown as string);
                            }}
                            isEditMode={isEditMode}
                            className="text-muted-foreground leading-relaxed"
                            as="p"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* ===== GALLERY ===== */}
          <section className="section-padding bg-muted/30">
            <div className="container-custom">
              <div className="text-center mb-12">
                <InlineEditable
                  value={c.galleryTagline}
                  fieldName="galleryTagline"
                  onChange={(v) => updateField('galleryTagline', v)}
                  isEditMode={isEditMode}
                  className="text-secondary font-heading uppercase tracking-widest mb-4"
                  as="p"
                />
                <InlineEditable
                  value={c.galleryHeading}
                  fieldName="galleryHeading"
                  onChange={(v) => updateField('galleryHeading', v)}
                  isEditMode={isEditMode}
                  className="text-3xl md:text-4xl lg:text-5xl font-heading text-foreground mb-4"
                  as="h2"
                />
                <InlineEditable
                  value={c.gallerySubheading}
                  fieldName="gallerySubheading"
                  type="textarea"
                  onChange={(v) => updateField('gallerySubheading', v)}
                  isEditMode={isEditMode}
                  className="text-lg text-muted-foreground max-w-2xl mx-auto"
                  as="p"
                />
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-5xl mx-auto">
                {c.galleryImages.map((img, index) => (
                  <div key={index} className="rounded-xl overflow-hidden shadow-md bg-card">
                    <InlineEditableImage
                      src={img.src}
                      alt={img.alt}
                      onImageChange={(url) => {
                        const updated = [...c.galleryImages];
                        updated[index] = { ...updated[index], src: url };
                        updateField('galleryImages', updated as unknown as string);
                      }}
                      isEditMode={isEditMode}
                      imageClassName="w-full h-48 md:h-64 object-contain p-2 hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* ===== FAQ ===== */}
          <section className="section-padding bg-background">
            <div className="container-custom max-w-4xl">
              <div className="text-center mb-12">
                <InlineEditable
                  value={c.faqTagline}
                  fieldName="faqTagline"
                  onChange={(v) => updateField('faqTagline', v)}
                  isEditMode={isEditMode}
                  className="text-secondary font-heading uppercase tracking-widest mb-4"
                  as="p"
                />
                <InlineEditable
                  value={c.faqHeading}
                  fieldName="faqHeading"
                  onChange={(v) => updateField('faqHeading', v)}
                  isEditMode={isEditMode}
                  className="text-3xl md:text-4xl lg:text-5xl font-heading text-foreground mb-6"
                  as="h2"
                />
              </div>
              <div className="space-y-4">
                {c.faqItems.map((item, index) => (
                  <FAQAccordion
                    key={index}
                    question={item.question}
                    answer={item.answer}
                    index={index}
                    isEditMode={isEditMode}
                    content={c}
                    updateField={updateField}
                  />
                ))}
              </div>
            </div>
          </section>

          {/* ===== SOFT CTA — Not pushy ===== */}
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
                      {c.ctaSecondaryText}
                    </Button>
                  </a>
                </InlineEditableButton>
              </div>
              {/* Contact info inline */}
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
