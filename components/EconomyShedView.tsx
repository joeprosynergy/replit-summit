"use client";

/**
 * Economy Shed View Component
 * Pure presentation component - NO admin code
 * Used by both public users and as preview for admins
 */

import { Button } from '@/components/ui/button';
import { Check, ArrowRight } from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import GallerySection from '@/components/GallerySection';
import ProductHero from '@/components/ProductHero';
import { useBackPath } from '@/hooks/useBackPath';
import { EconomyShedContent } from '@/data/defaults/economyShedDefaults';
import { useGlobalColors } from '@/hooks/useGlobalColors';

const ColorSwatch = ({ color }: { color: { name: string; color: string; image?: string } }) => (
  <div className="flex flex-col items-center gap-2">
    {color.image ? (
      <div className="w-16 h-16 rounded-full border-4 border-card shadow-md overflow-hidden">
        <img src={color.image} alt={color.name} className="w-full h-full object-cover" />
      </div>
    ) : (
      <div
        className="w-16 h-16 rounded-full border-4 border-card shadow-md"
        style={{ backgroundColor: color.color }}
      />
    )}
    <span className="text-xs text-muted-foreground text-center leading-tight max-w-[70px]">
      {color.name}
    </span>
  </div>
);

interface EconomyShedViewProps {
  content: EconomyShedContent;
}

export function EconomyShedView({ content }: EconomyShedViewProps) {
  const backPath = useBackPath({
    defaultPath: '/types/basic-storage#economy',
    defaultLabel: '← Back to Basic Storage',
    stylesPath: '/styles/utility',
    stylesLabel: '← Back to Styles',
  });
  const { getColorsByCategory } = useGlobalColors();

  // Build gallery images array
  const galleryImages: { src: string; alt: string }[] = [];
  let i = 1;
  while (content[`galleryImage${i}`]) {
    galleryImages.push({
      src: content[`galleryImage${i}`] as string,
      alt: content[`galleryImage${i}Alt`] as string || '',
    });
    i++;
  }

  const card1Features = [
    content.card1Feature1,
    content.card1Feature2,
    content.card1Feature3,
    content.card1Feature4,
  ].filter(Boolean);

  const card2Features = [
    content.card2Feature1,
    content.card2Feature2,
    content.card2Feature3,
    content.card2Feature4,
  ].filter(Boolean);

  const benefits = [
    content.valueBenefit1,
    content.valueBenefit2,
    content.valueBenefit3,
    content.valueBenefit4,
    content.valueBenefit5,
    content.valueBenefit6,
    content.valueBenefit7,
    content.valueBenefit8,
    content.valueBenefit9,
  ].filter(Boolean);

  return (
    <>
      <div className="min-h-screen">
        <main>
          <ProductHero
            backPath={backPath}
            title={content.title}
            titleHighlight={content.titleHighlight}
            titlePosition="before"
            description={content.description}
            subtitle={content.subtitle}
            image={content.heroImage}
            imageAlt={content.heroImageAlt}
            isEditMode={false}
            onUpdateField={() => {}}
            ctaButtons={[
              {
                text: content.heroButton1Text,
                href: content.heroButton1Link,
                variant: 'hero',
                external: content.heroButton1OpenInNewTab,
              },
              {
                text: content.heroButton2Text,
                href: content.heroButton2Link,
                variant: 'heroOutline',
                external: content.heroButton2OpenInNewTab,
              },
            ]}
          />

          {/* Image Gallery */}
          <section className="section-padding bg-background">
            <div className="container-custom">
              <GallerySection images={galleryImages} />
            </div>
          </section>

          {/* Two Style Options Section */}
          <section className="section-padding bg-muted/30">
            <div className="container-custom">
              <div className="max-w-5xl mx-auto">
                <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4 text-center">
                  {content.sectionHeading}
                </h2>
                <p className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
                  {content.sectionSubheading}
                </p>
                
                <div className="grid md:grid-cols-2 gap-8">
                  {/* Economy Shed Card */}
                  <div className="bg-card rounded-xl overflow-hidden border border-border shadow-lg">
                    <div className="relative">
                      <img
                        src={content.card1Image}
                        alt={content.card1ImageAlt}
                        className="w-full aspect-video object-cover"
                      />
                    </div>
                    <div className="p-6">
                      <h3 className="font-heading text-2xl font-bold text-foreground mb-4">
                        {content.card1Title}
                      </h3>
                      <p className="text-muted-foreground text-sm mb-4">
                        {content.card1Description}
                      </p>
                      <div className="space-y-3">
                        {card1Features.map((feature, index) => (
                          <div key={index} className="flex items-center gap-3 text-foreground">
                            <Check className="w-5 h-5 text-secondary flex-shrink-0" />
                            <span className="text-sm">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Lofted Economy Shed Card */}
                  <div className="bg-card rounded-xl overflow-hidden border border-border shadow-lg">
                    <div className="relative">
                      <img
                        src={content.card2Image}
                        alt={content.card2ImageAlt}
                        className="w-full aspect-video object-cover"
                      />
                    </div>
                    <div className="p-6">
                      <h3 className="font-heading text-2xl font-bold text-foreground mb-4">
                        {content.card2Title}
                      </h3>
                      <p className="text-muted-foreground text-sm mb-4">
                        {content.card2Description}
                      </p>
                      <div className="space-y-3">
                        {card2Features.map((feature, index) => (
                          <div key={index} className="flex items-center gap-3 text-foreground">
                            <Check className="w-5 h-5 text-secondary flex-shrink-0" />
                            <span className="text-sm">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-8 text-center">
                  <a
                    href={content.designButtonLink}
                    target={content.designButtonOpenInNewTab ? '_blank' : undefined}
                    rel={content.designButtonOpenInNewTab ? 'noopener noreferrer' : undefined}
                  >
                    <Button variant="hero" size="xl">
                      {content.designButtonText}
                      <ArrowRight className="w-5 h-5" />
                    </Button>
                  </a>
                </div>
              </div>
            </div>
          </section>

          {/* Value Proposition Section */}
          <section className="section-padding bg-background">
            <div className="container-custom">
              <div className="max-w-4xl mx-auto">
                <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground mb-6 text-center">
                  {content.valueHeading}
                </h2>
                <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
                  {benefits.map((benefit, index) => (
                    <div key={index} className="flex items-center gap-3 bg-card p-4 rounded-lg border border-border/50">
                      <Check className="w-5 h-5 text-secondary flex-shrink-0" />
                      <span className="text-foreground font-medium">{benefit}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-8 p-6 bg-secondary/10 rounded-xl border border-secondary/20">
                  <p className="text-center text-muted-foreground">
                    {content.valueNote}
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Color & Material Options */}
          <section className="section-padding bg-muted/30">
            <div className="container-custom">
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-secondary mb-8">
                {content.colorHeading}
              </h2>
              
              <div className="bg-card rounded-lg border border-border overflow-hidden">
                <Accordion type="single" collapsible defaultValue="metal" className="w-full">
                  <AccordionItem value="metal" className="border-none">
                    <AccordionTrigger className="px-6 py-4 hover:no-underline">
                      <span className="font-heading text-lg font-bold text-secondary uppercase">
                        {content.colorAccordionTitle}
                      </span>
                    </AccordionTrigger>
                    <AccordionContent className="px-6 pb-6">
                      <div className="flex flex-wrap gap-6 pt-4">
                        {getColorsByCategory('metal').map((color) => (
                          <ColorSwatch key={color.id} color={color} />
                        ))}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>
            </div>
          </section>

          {/* Important Notes */}
          <section className="py-8 bg-background">
            <div className="container-custom">
              <div className="max-w-3xl mx-auto text-center">
                <p className="text-sm text-muted-foreground">
                  {content.importantNote}
                </p>
              </div>
            </div>
          </section>

          {/* CTA */}
          <section className="section-padding bg-gradient-to-r from-secondary to-primary">
            <div className="container-custom text-center">
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
                {content.ctaHeading}
              </h2>
              <p className="text-primary-foreground/90 text-lg mb-8 max-w-2xl mx-auto">
                {content.ctaDescription}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href={content.ctaPrimaryButtonLink}
                  target={content.ctaPrimaryButtonOpenInNewTab ? '_blank' : undefined}
                  rel={content.ctaPrimaryButtonOpenInNewTab ? 'noopener noreferrer' : undefined}
                >
                  <Button variant="heroOutline" size="xl" className="bg-primary-foreground text-foreground hover:bg-primary-foreground/90">
                    {content.ctaPrimaryButton}
                    <ArrowRight className="w-5 h-5" />
                  </Button>
                </a>
                <a
                  href={content.ctaSecondaryButtonLink}
                  target={content.ctaSecondaryButtonOpenInNewTab ? '_blank' : undefined}
                  rel={content.ctaSecondaryButtonOpenInNewTab ? 'noopener noreferrer' : undefined}
                >
                  <Button variant="heroOutline" size="xl">
                    {content.ctaSecondaryButton}
                  </Button>
                </a>
              </div>
            </div>
          </section>
        </main>
      </div>
    </>
  );
}
