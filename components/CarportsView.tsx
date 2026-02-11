"use client";

/**
 * CarportsView - Carports & RV Covers View Component
 * Pure presentation component - NO admin code
 * SPECIAL LAYOUT - Has 2 sub-products (Carports, RV Covers)
 */

import { Button } from '@/components/ui/button';
import { Check, ArrowRight, Shield, Sun, Cloud, Wind } from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import GallerySection from '@/components/GallerySection';
import ProductHero from '@/components/ProductHero';
import { useBackPath } from '@/hooks/useBackPath';
import { CarportsContent, CarportProduct } from '@/data/defaults/carportsDefaults';
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

// Product section component
function ProductSection({ product, reversed = false }: { product: CarportProduct; reversed?: boolean }) {
  return (
    <section className="section-padding bg-muted/30">
      <div className="container-custom">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4 text-center">
            {product.heading}{' '}
            <span className="text-secondary">{product.highlight}</span>
          </h2>
          <p className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
            {product.description}
          </p>

          <div className={`grid md:grid-cols-2 gap-8 items-center ${reversed ? 'md:flex-row-reverse' : ''}`}>
            <div className={`relative ${reversed ? 'md:order-2' : ''}`}>
              <img
                src={product.image}
                alt={product.imageAlt}
                className="rounded-xl shadow-lg w-full"
              />
              <div className="absolute -bottom-3 -right-3 bg-secondary text-primary-foreground px-4 py-2 rounded-lg font-heading text-sm">
                {product.badge}
              </div>
            </div>

            <div className={`bg-card rounded-xl p-8 border border-border shadow-lg ${reversed ? 'md:order-1' : ''}`}>
              <h3 className="font-heading text-2xl font-bold text-foreground mb-6">
                {product.highlight} Features
              </h3>
              <div className="space-y-3">
                {product.features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-3 text-foreground">
                    <Check className="w-5 h-5 text-secondary flex-shrink-0" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

interface CarportsViewProps {
  content: CarportsContent;
}

export function CarportsView({ content }: CarportsViewProps) {
  const backPath = useBackPath(content.backPath);
  const { getColorsByCategory } = useGlobalColors();

  return (
    <>
      <div className="min-h-screen">
        <main>
          {/* Hero Section */}
          <ProductHero
            backPath={backPath}
            title={content.title}
            titleHighlight={content.titleHighlight}
            description={content.description}
            image={content.heroImage}
            imageAlt={content.heroImageAlt}
            isEditMode={false}
            onUpdateField={() => {}}
            extraContent={
              <div className="flex flex-wrap gap-4 mb-8">
                <div className="flex items-center gap-2 text-primary-foreground/80">
                  <Shield className="w-5 h-5 text-secondary" />
                  <span>Hurricane Rated</span>
                </div>
                <div className="flex items-center gap-2 text-primary-foreground/80">
                  <Sun className="w-5 h-5 text-secondary" />
                  <span>UV Protection</span>
                </div>
                <div className="flex items-center gap-2 text-primary-foreground/80">
                  <Cloud className="w-5 h-5 text-secondary" />
                  <span>Weather Resistant</span>
                </div>
                <div className="flex items-center gap-2 text-primary-foreground/80">
                  <Wind className="w-5 h-5 text-secondary" />
                  <span>Wind Certified</span>
                </div>
              </div>
            }
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

          {/* Gallery Section */}
          {content.galleryImages.length > 0 && (
            <section className="section-padding bg-background">
              <div className="container-custom">
                <GallerySection images={content.galleryImages} />
              </div>
            </section>
          )}

          {/* Carport Product Section */}
          <ProductSection product={content.carportProduct} />

          {/* RV Cover Product Section */}
          <section className="section-padding bg-background">
            <div className="container-custom">
              <div className="max-w-4xl mx-auto">
                <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4 text-center">
                  {content.rvProduct.heading}{' '}
                  <span className="text-secondary">{content.rvProduct.highlight}</span>
                </h2>
                <p className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
                  {content.rvProduct.description}
                </p>

                <div className="grid md:grid-cols-2 gap-8 items-center">
                  <div className="bg-card rounded-xl p-8 border border-border shadow-lg">
                    <h3 className="font-heading text-2xl font-bold text-foreground mb-6">
                      RV Cover Features
                    </h3>
                    <div className="space-y-3">
                      {content.rvProduct.features.map((feature, index) => (
                        <div key={index} className="flex items-center gap-3 text-foreground">
                          <Check className="w-5 h-5 text-secondary flex-shrink-0" />
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="relative">
                    <img
                      src={content.rvProduct.image}
                      alt={content.rvProduct.imageAlt}
                      className="rounded-xl shadow-lg w-full"
                    />
                    <div className="absolute -bottom-3 -left-3 bg-secondary text-primary-foreground px-4 py-2 rounded-lg font-heading text-sm">
                      {content.rvProduct.badge}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Uses Section */}
          <section className="section-padding bg-muted/30">
            <div className="container-custom">
              <div className="max-w-4xl mx-auto">
                <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground mb-6 text-center">
                  {content.usesHeading}
                </h2>
                <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
                  {content.uses.map((use, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-3 bg-card p-4 rounded-lg border border-border/50"
                    >
                      <Check className="w-5 h-5 text-secondary flex-shrink-0" />
                      <span className="text-foreground font-medium">{use}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Color Options Section */}
          {content.sidingCategories.length > 0 && (
            <section className="section-padding bg-background">
              <div className="container-custom">
                <h2 className="font-heading text-3xl md:text-4xl font-bold text-secondary mb-8">
                  {content.colorHeading}
                </h2>

                <div className="bg-card rounded-lg border border-border overflow-hidden">
                  <Accordion
                    type="single"
                    collapsible
                    defaultValue={content.sidingCategories[0]?.id}
                    className="w-full"
                  >
                    {content.sidingCategories.map((category, index) => (
                      <AccordionItem
                        key={category.id}
                        value={category.id}
                        className={
                          index < content.sidingCategories.length - 1
                            ? 'border-b border-border'
                            : 'border-none'
                        }
                      >
                        <AccordionTrigger className="px-6 py-4 hover:no-underline">
                          <span className="font-heading text-lg font-bold text-secondary uppercase">
                            {category.title}
                          </span>
                        </AccordionTrigger>
                        <AccordionContent className="px-6 pb-6">
                          <div className="flex flex-wrap gap-6 pt-4">
                            {getColorsByCategory(category.id).map((color) => (
                              <ColorSwatch key={color.id} color={color} />
                            ))}
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </div>
              </div>
            </section>
          )}

          {/* Important Notes */}
          {content.importantNote && (
            <section className="py-8 bg-muted/30">
              <div className="container-custom">
                <div className="max-w-3xl mx-auto text-center">
                  <p className="text-sm text-muted-foreground">{content.importantNote}</p>
                </div>
              </div>
            </section>
          )}

          {/* CTA Section */}
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
                  <Button
                    variant="heroOutline"
                    size="xl"
                    className="bg-primary-foreground text-foreground hover:bg-primary-foreground/90"
                  >
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

export default CarportsView;
