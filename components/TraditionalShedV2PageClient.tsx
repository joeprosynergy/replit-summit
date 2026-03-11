"use client";

/**
 * Traditional A-Frame Shed Landing Page V2
 * Redesigned from first principles for maximum conversion.
 * Hero with side-by-side form, social proof bar, product tiers,
 * FAQ answers section addressing top lead questions, gallery, uses, final CTA.
 */

import React, { useState } from 'react';
import { ArrowRight, Truck, CreditCard, Shield, Package, Home, Hammer, Heart, Clock, Phone, MapPin, Check, ChevronDown, Star, Quote } from 'lucide-react';
import ContactForm from '@/components/ContactForm';
import QuickQuoteForm from '@/components/QuickQuoteForm';
import { Button } from '@/components/ui/button';
import { cloudinaryImages, getMobileHeroImage, IMAGES } from '@/lib/cloudinary';
import { InlineEditable } from '@/components/admin/InlineEditable';
import InlineEditableImage from '@/components/admin/InlineEditableImage';
import InlineEditableButton from '@/components/admin/InlineEditableButton';
import { EditablePageWrapper } from '@/components/admin/EditablePageWrapper';
import { TraditionalShedV2Content } from '@/data/defaults/traditionalShedV2Defaults';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  'truck': Truck, 'credit-card': CreditCard, 'shield': Shield, 'package': Package,
  'home': Home, 'hammer': Hammer, 'heart': Heart, 'clock': Clock,
};
const getIcon = (name: string) => iconMap[name] || Package;

interface TraditionalShedV2PageClientProps {
  slug: string;
  defaults: TraditionalShedV2Content;
}

function AnswerAccordion({ question, answer, icon, index, isEditMode, content, updateField }: {
  question: string;
  answer: string;
  icon: string;
  index: number;
  isEditMode: boolean;
  content: TraditionalShedV2Content;
  updateField: (field: string, value: unknown) => void;
}) {
  const [open, setOpen] = useState(false);
  const Icon = getIcon(icon);

  return (
    <div className="border border-border/50 rounded-xl overflow-hidden bg-card">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="w-full flex items-center gap-4 p-6 text-left hover:bg-muted/30 transition-colors"
      >
        <div className="w-10 h-10 rounded-xl bg-secondary/20 flex items-center justify-center flex-shrink-0">
          <Icon className="w-5 h-5 text-secondary" />
        </div>
        <InlineEditable
          value={question}
          fieldName={`Answer ${index + 1} question`}
          onChange={(v) => {
            const updated = [...content.answers];
            updated[index] = { ...updated[index], question: v };
            updateField('answers', updated as unknown as string);
          }}
          isEditMode={isEditMode}
          className="font-heading text-lg font-bold text-foreground flex-grow"
          as="span"
        />
        <ChevronDown className={`w-5 h-5 text-muted-foreground transition-transform flex-shrink-0 ${open ? 'rotate-180' : ''}`} />
      </button>
      {open && (
        <div className="px-6 pb-6 pl-20">
          <InlineEditable
            value={answer}
            fieldName={`Answer ${index + 1} answer`}
            type="textarea"
            onChange={(v) => {
              const updated = [...content.answers];
              updated[index] = { ...updated[index], answer: v };
              updateField('answers', updated as unknown as string);
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

export default function TraditionalShedV2PageClient({ slug, defaults }: TraditionalShedV2PageClientProps) {
  return (
    <EditablePageWrapper<TraditionalShedV2Content>
      slug={slug}
      defaultContent={defaults}
    >
      {({ content: c, isEditMode, updateField }) => (
        <div className="min-h-screen">

          {/* ===== HERO SECTION — Split layout: copy left, form right ===== */}
          <section className="relative flex items-center overflow-hidden lg:min-h-[90vh]">
            <picture className="absolute inset-0">
              <source media="(max-width: 768px)" srcSet={getMobileHeroImage(IMAGES.utilityShed3)} />
              <img
                src={cloudinaryImages.utilityShed3}
                alt="Traditional A-Frame storage shed"
                fetchPriority="high"
                loading="eager"
                decoding="async"
                width={1600}
                height={900}
                className="w-full h-full object-cover object-top"
              />
            </picture>
            <div className="absolute inset-0 bg-black/80" />

            <div className="relative z-10 container-custom py-20 pt-28 lg:py-32">
              <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
                {/* Left: Copy */}
                <div>
                  <InlineEditable
                    value={c.heroTagline}
                    fieldName="heroTagline"
                    onChange={(v) => updateField('heroTagline', v)}
                    isEditMode={isEditMode}
                    className="text-secondary font-heading text-sm md:text-base uppercase tracking-[0.2em] mb-4 animate-fade-in-up"
                    as="p"
                  />
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
                  <div className="mb-8 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                    <InlineEditable
                      value={c.heroSubheading}
                      fieldName="heroSubheading"
                      type="textarea"
                      onChange={(v) => updateField('heroSubheading', v)}
                      isEditMode={isEditMode}
                      className="text-lg md:text-xl text-primary-foreground/80 leading-relaxed"
                      as="p"
                    />
                  </div>
                  <div className="flex flex-wrap gap-6 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
                    {c.heroBadges.map((badge, index) => {
                      const BadgeIcon = getIcon(badge.icon);
                      return (
                        <div key={index} className="flex items-center gap-2 text-primary-foreground/90">
                          <div className="w-9 h-9 rounded-full bg-secondary/20 flex items-center justify-center">
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
                            className="text-sm font-semibold"
                            as="span"
                          />
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Right: Form Card */}
                <div className="animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                  <div className="bg-background rounded-2xl shadow-2xl p-8 lg:p-10">
                    <InlineEditable
                      value={c.heroFormHeading}
                      fieldName="heroFormHeading"
                      onChange={(v) => updateField('heroFormHeading', v)}
                      isEditMode={isEditMode}
                      className="font-heading text-2xl font-bold text-foreground mb-2"
                      as="h2"
                    />
                    <InlineEditable
                      value={c.heroFormSubheading}
                      fieldName="heroFormSubheading"
                      onChange={(v) => updateField('heroFormSubheading', v)}
                      isEditMode={isEditMode}
                      className="text-muted-foreground mb-6"
                      as="p"
                    />
                    <QuickQuoteForm />
                    {/* Trust badges below hero form */}
                    {c.trustBadges && c.trustBadges.length > 0 && (
                      <div className="mt-4 flex flex-wrap justify-center gap-x-4 gap-y-2">
                        {c.trustBadges.map((badge, i) => {
                          const TBIcon = getIcon(badge.icon);
                          return (
                            <div key={i} className="flex items-center gap-1.5 text-muted-foreground text-xs">
                              <TBIcon className="w-3.5 h-3.5" />
                              <span>{badge.label}</span>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* ===== SOCIAL PROOF BAR ===== */}
          <section className="bg-navy py-6">
            <div className="container-custom">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
                {c.proofStats.map((stat, index) => (
                  <div key={index}>
                    <InlineEditable
                      value={stat.value}
                      fieldName={`Proof stat ${index + 1} value`}
                      onChange={(v) => {
                        const updated = [...c.proofStats];
                        updated[index] = { ...updated[index], value: v };
                        updateField('proofStats', updated as unknown as string);
                      }}
                      isEditMode={isEditMode}
                      className="text-3xl md:text-4xl font-heading font-bold text-secondary"
                      as="div"
                    />
                    <InlineEditable
                      value={stat.label}
                      fieldName={`Proof stat ${index + 1} label`}
                      onChange={(v) => {
                        const updated = [...c.proofStats];
                        updated[index] = { ...updated[index], label: v };
                        updateField('proofStats', updated as unknown as string);
                      }}
                      isEditMode={isEditMode}
                      className="text-primary-foreground/70 text-sm uppercase tracking-wider mt-1"
                      as="div"
                    />
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* ===== PRODUCT TIERS ===== */}
          <section className="section-padding bg-background">
            <div className="container-custom">
              <div className="text-center mb-16">
                <InlineEditable
                  value={c.tiersTagline}
                  fieldName="tiersTagline"
                  onChange={(v) => updateField('tiersTagline', v)}
                  isEditMode={isEditMode}
                  className="text-secondary font-heading uppercase tracking-widest mb-4"
                  as="p"
                />
                <InlineEditable
                  value={c.tiersHeading}
                  fieldName="tiersHeading"
                  onChange={(v) => updateField('tiersHeading', v)}
                  isEditMode={isEditMode}
                  className="text-3xl md:text-4xl lg:text-5xl font-heading text-foreground mb-6"
                  as="h2"
                />
                <InlineEditable
                  value={c.tiersSubheading}
                  fieldName="tiersSubheading"
                  type="textarea"
                  onChange={(v) => updateField('tiersSubheading', v)}
                  isEditMode={isEditMode}
                  className="text-lg text-muted-foreground max-w-2xl mx-auto"
                  as="p"
                />
              </div>
              <div className="grid md:grid-cols-3 gap-8">
                {c.tiers.map((tier, index) => (
                  <div key={index} className="bg-card rounded-2xl shadow-lg border border-border/50 overflow-hidden flex flex-col">
                    <div className="relative">
                      <InlineEditableImage
                        src={tier.image}
                        alt={`${tier.name} traditional A-frame shed`}
                        onImageChange={(url) => {
                          const updated = [...c.tiers];
                          updated[index] = { ...updated[index], image: url };
                          updateField('tiers', updated as unknown as string);
                        }}
                        isEditMode={isEditMode}
                        imageClassName="w-full h-56 object-contain bg-muted/50 p-2"
                      />
                      {(tier.badge || isEditMode) && (
                        <span className="absolute top-4 right-4 bg-secondary text-secondary-foreground text-xs font-heading font-bold uppercase px-3 py-1 rounded-full">
                          <InlineEditable
                            value={tier.badge || '(add badge)'}
                            fieldName={`Tier ${index + 1} badge`}
                            onChange={(v) => {
                              const updated = [...c.tiers];
                              updated[index] = { ...updated[index], badge: v === '(add badge)' ? '' : v };
                              updateField('tiers', updated as unknown as string);
                            }}
                            isEditMode={isEditMode}
                            className=""
                            as="span"
                          />
                        </span>
                      )}
                    </div>
                    <div className="p-6 flex flex-col flex-grow">
                      <InlineEditable
                        value={tier.name}
                        fieldName={`Tier ${index + 1} name`}
                        onChange={(v) => {
                          const updated = [...c.tiers];
                          updated[index] = { ...updated[index], name: v };
                          updateField('tiers', updated as unknown as string);
                        }}
                        isEditMode={isEditMode}
                        className="font-heading text-2xl font-bold text-foreground mb-2"
                        as="h3"
                      />
                      {/* Wall height & sizes */}
                      <div className="flex gap-4 mb-4 text-sm">
                        <div className="flex items-center gap-1.5">
                          <span className="text-muted-foreground">Wall Height:</span>
                          <InlineEditable
                            value={tier.wallHeight}
                            fieldName={`Tier ${index + 1} wall height`}
                            onChange={(v) => {
                              const updated = [...c.tiers];
                              updated[index] = { ...updated[index], wallHeight: v };
                              updateField('tiers', updated as unknown as string);
                            }}
                            isEditMode={isEditMode}
                            className="font-semibold text-foreground"
                            as="span"
                          />
                        </div>
                        <div className="flex items-center gap-1.5">
                          <span className="text-muted-foreground">Sizes:</span>
                          <InlineEditable
                            value={tier.sizes}
                            fieldName={`Tier ${index + 1} sizes`}
                            onChange={(v) => {
                              const updated = [...c.tiers];
                              updated[index] = { ...updated[index], sizes: v };
                              updateField('tiers', updated as unknown as string);
                            }}
                            isEditMode={isEditMode}
                            className="font-semibold text-foreground"
                            as="span"
                          />
                        </div>
                      </div>
                      <InlineEditable
                        value={tier.description}
                        fieldName={`Tier ${index + 1} description`}
                        type="textarea"
                        onChange={(v) => {
                          const updated = [...c.tiers];
                          updated[index] = { ...updated[index], description: v };
                          updateField('tiers', updated as unknown as string);
                        }}
                        isEditMode={isEditMode}
                        className="text-muted-foreground mb-6 leading-relaxed"
                        as="p"
                      />
                      <ul className="space-y-3 mb-6 flex-grow">
                        {tier.features.map((feature, fIdx) => (
                          <li key={fIdx} className="flex items-start gap-2">
                            <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                            <InlineEditable
                              value={feature}
                              fieldName={`Tier ${index + 1} feature ${fIdx + 1}`}
                              onChange={(v) => {
                                const updated = [...c.tiers];
                                const features = [...updated[index].features];
                                features[fIdx] = v;
                                updated[index] = { ...updated[index], features };
                                updateField('tiers', updated as unknown as string);
                              }}
                              isEditMode={isEditMode}
                              className="text-sm text-foreground"
                              as="span"
                            />
                          </li>
                        ))}
                      </ul>
                      <InlineEditableButton
                        text={tier.buttonText}
                        href={tier.buttonLink}
                        onTextChange={(v) => {
                          const updated = [...c.tiers];
                          updated[index] = { ...updated[index], buttonText: v };
                          updateField('tiers', updated as unknown as string);
                        }}
                        onHrefChange={(v) => {
                          const updated = [...c.tiers];
                          updated[index] = { ...updated[index], buttonLink: v };
                          updateField('tiers', updated as unknown as string);
                        }}
                        isEditMode={isEditMode}
                        isExternal={tier.buttonOpenInNewTab}
                        onExternalChange={(v) => {
                          const updated = [...c.tiers];
                          updated[index] = { ...updated[index], buttonOpenInNewTab: v };
                          updateField('tiers', updated as unknown as string);
                        }}
                      >
                        <a
                          href={tier.buttonLink}
                          target={tier.buttonOpenInNewTab ? '_blank' : undefined}
                          rel={tier.buttonOpenInNewTab ? 'noopener noreferrer' : undefined}
                          className="block"
                        >
                          <Button variant="hero" size="lg" className="w-full">
                            {tier.buttonText}
                            <ArrowRight className="w-4 h-4" />
                          </Button>
                        </a>
                      </InlineEditableButton>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* ===== ANSWERS SECTION — FAQ accordion ===== */}
          <section className="section-padding bg-muted/30">
            <div className="container-custom max-w-4xl">
              <div className="text-center mb-12">
                <InlineEditable
                  value={c.answersTagline}
                  fieldName="answersTagline"
                  onChange={(v) => updateField('answersTagline', v)}
                  isEditMode={isEditMode}
                  className="text-secondary font-heading uppercase tracking-widest mb-4"
                  as="p"
                />
                <InlineEditable
                  value={c.answersHeading}
                  fieldName="answersHeading"
                  onChange={(v) => updateField('answersHeading', v)}
                  isEditMode={isEditMode}
                  className="text-3xl md:text-4xl lg:text-5xl font-heading text-foreground mb-6"
                  as="h2"
                />
                <InlineEditable
                  value={c.answersSubheading}
                  fieldName="answersSubheading"
                  type="textarea"
                  onChange={(v) => updateField('answersSubheading', v)}
                  isEditMode={isEditMode}
                  className="text-lg text-muted-foreground max-w-2xl mx-auto"
                  as="p"
                />
              </div>
              <div className="space-y-4">
                {c.answers.map((item, index) => (
                  <AnswerAccordion
                    key={index}
                    question={item.question}
                    answer={item.answer}
                    icon={item.icon}
                    index={index}
                    isEditMode={isEditMode}
                    content={c}
                    updateField={updateField}
                  />
                ))}
              </div>
              <div className="text-center mt-10">
                <a href="#final-cta" className="text-secondary hover:text-secondary/80 transition-colors font-medium underline underline-offset-4">
                  Still have questions? Get in touch below
                </a>
              </div>
            </div>
          </section>

          {/* ===== TESTIMONIALS ===== */}
          {c.testimonials && c.testimonials.length > 0 && (
            <section className="section-padding bg-background">
              <div className="container-custom">
                <div className="text-center mb-12">
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
                    className="text-3xl md:text-4xl lg:text-5xl font-heading text-foreground mb-6"
                    as="h2"
                  />
                </div>
                <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                  {c.testimonials.map((t, index) => (
                    <div key={index} className="bg-card rounded-2xl shadow-lg border border-border/50 p-8 flex flex-col">
                      <div className="flex gap-1 mb-4">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-5 h-5 fill-secondary text-secondary" />
                        ))}
                      </div>
                      <Quote className="w-8 h-8 text-secondary/30 mb-3 rotate-180" />
                      <InlineEditable
                        value={t.quote}
                        fieldName={`Testimonial ${index + 1} quote`}
                        type="textarea"
                        onChange={(v) => {
                          const updated = [...c.testimonials];
                          updated[index] = { ...updated[index], quote: v };
                          updateField('testimonials', updated as unknown as string);
                        }}
                        isEditMode={isEditMode}
                        className="text-muted-foreground leading-relaxed flex-grow mb-6"
                        as="p"
                      />
                      <div className="border-t border-border/50 pt-4">
                        <InlineEditable
                          value={t.name}
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
                          value={`${t.location} — ${t.detail}`}
                          fieldName={`Testimonial ${index + 1} location`}
                          onChange={(v) => {
                            const updated = [...c.testimonials];
                            const parts = v.split(' — ');
                            updated[index] = { ...updated[index], location: parts[0] || '', detail: parts[1] || '' };
                            updateField('testimonials', updated as unknown as string);
                          }}
                          isEditMode={isEditMode}
                          className="text-sm text-muted-foreground block mt-1"
                          as="span"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          )}

          {/* ===== GALLERY ===== */}
          <section className="section-padding bg-background">
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
                  className="text-3xl md:text-4xl lg:text-5xl font-heading text-foreground mb-6"
                  as="h2"
                />
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {c.galleryImages.map((img, index) => (
                  <div key={index} className="rounded-lg overflow-hidden shadow-md bg-muted/30">
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

          {/* ===== USES ===== */}
          <section className="section-padding bg-navy text-primary-foreground">
            <div className="container-custom">
              <div className="text-center mb-12">
                <InlineEditable
                  value={c.usesTagline}
                  fieldName="usesTagline"
                  onChange={(v) => updateField('usesTagline', v)}
                  isEditMode={isEditMode}
                  className="text-secondary font-heading uppercase tracking-widest mb-4"
                  as="p"
                />
                <InlineEditable
                  value={c.usesHeading}
                  fieldName="usesHeading"
                  onChange={(v) => updateField('usesHeading', v)}
                  isEditMode={isEditMode}
                  className="text-3xl md:text-4xl lg:text-5xl font-heading mb-8"
                  as="h2"
                />
              </div>
              <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-w-5xl mx-auto">
                {c.usesList.map((use, index) => (
                  <div key={index} className="flex items-center gap-3 bg-primary-foreground/5 p-4 rounded-lg">
                    <Check className="w-5 h-5 text-secondary flex-shrink-0" />
                    <InlineEditable
                      value={use}
                      fieldName={`Use ${index + 1}`}
                      onChange={(v) => {
                        const updated = [...c.usesList];
                        updated[index] = v;
                        updateField('usesList', updated as unknown as string);
                      }}
                      isEditMode={isEditMode}
                      className="text-primary-foreground text-sm font-medium"
                      as="span"
                    />
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* ===== FINAL CTA with Form + Contact Info ===== */}
          <section id="final-cta" className="section-padding bg-background">
            <div className="container-custom">
              <div className="text-center mb-12">
                <InlineEditable
                  value={c.finalCtaHeading}
                  fieldName="finalCtaHeading"
                  onChange={(v) => updateField('finalCtaHeading', v)}
                  isEditMode={isEditMode}
                  className="text-3xl md:text-4xl lg:text-5xl font-heading text-foreground mb-6"
                  as="h2"
                />
                <InlineEditable
                  value={c.finalCtaDescription}
                  fieldName="finalCtaDescription"
                  type="textarea"
                  onChange={(v) => updateField('finalCtaDescription', v)}
                  isEditMode={isEditMode}
                  className="text-lg text-muted-foreground max-w-2xl mx-auto"
                  as="p"
                />
                {/* Urgency text */}
                {c.urgencyText && (
                  <div className="mt-4 inline-flex items-center gap-2 bg-secondary/10 text-secondary font-medium text-sm px-4 py-2 rounded-full">
                    <Clock className="w-4 h-4" />
                    <InlineEditable
                      value={c.urgencyText}
                      fieldName="urgencyText"
                      onChange={(v) => updateField('urgencyText', v)}
                      isEditMode={isEditMode}
                      className=""
                      as="span"
                    />
                  </div>
                )}
              </div>
              <div className="grid lg:grid-cols-2 gap-12">
                <div>
                  <InlineEditable
                    value={c.finalCtaFormHeading}
                    fieldName="finalCtaFormHeading"
                    onChange={(v) => updateField('finalCtaFormHeading', v)}
                    isEditMode={isEditMode}
                    className="font-heading text-xl font-bold text-foreground mb-6"
                    as="h3"
                  />
                  <ContactForm />
                  {/* Trust badges below final CTA form */}
                  {c.trustBadges && c.trustBadges.length > 0 && (
                    <div className="mt-6 flex flex-wrap justify-center gap-x-5 gap-y-2">
                      {c.trustBadges.map((badge, i) => {
                        const TBIcon = getIcon(badge.icon);
                        return (
                          <div key={i} className="flex items-center gap-1.5 text-muted-foreground text-sm">
                            <TBIcon className="w-4 h-4" />
                            <span>{badge.label}</span>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
                <div className="space-y-8">
                  {/* Phone */}
                  <div className="bg-muted/30 rounded-2xl p-8">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
                        <Phone className="w-5 h-5 text-primary" />
                      </div>
                      <h3 className="font-heading text-lg font-bold text-foreground">Call Us</h3>
                    </div>
                    <a
                      href={`tel:${c.contactPhoneNumber.replace(/\D/g, '')}`}
                      className="text-2xl font-heading text-primary hover:text-primary/80 transition-colors"
                    >
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
                  {/* Location */}
                  <div className="bg-muted/30 rounded-2xl p-8">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
                        <MapPin className="w-5 h-5 text-primary" />
                      </div>
                      <h3 className="font-heading text-lg font-bold text-foreground">Visit Us</h3>
                    </div>
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
                  {/* Hours */}
                  <div className="bg-muted/30 rounded-2xl p-8">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
                        <Clock className="w-5 h-5 text-primary" />
                      </div>
                      <h3 className="font-heading text-lg font-bold text-foreground">Hours</h3>
                    </div>
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
          </section>

        </div>
      )}
    </EditablePageWrapper>
  );
}
