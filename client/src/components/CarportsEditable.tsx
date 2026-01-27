/**
 * CarportsEditable - Carports & RV Covers Admin Component
 * ADMIN ONLY - Lazy-loaded for authenticated admins
 * SPECIAL LAYOUT - Has 2 sub-products (Carports, RV Covers)
 */

import { Helmet } from 'react-helmet-async';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Check, ArrowRight, Shield, Sun, Cloud, Wind, Plus, X } from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import GallerySection from '@/components/GallerySection';
import ProductHero from '@/components/ProductHero';
import { useBackPath } from '@/hooks/useBackPath';

// Admin imports
import { EditablePageWrapper } from '@/components/admin/EditablePageWrapper';
import { InlineEditable } from '@/components/admin/InlineEditable';
import InlineEditableButton from '@/components/admin/InlineEditableButton';
import InlineEditableImage from '@/components/admin/InlineEditableImage';

import { CarportsContent } from '@/pages/defaults/carportsDefaults';
import { SimpleColorSwatch } from '@/components/ui/GlobalColorSwatch';

interface CarportsEditableProps {
  initialContent: CarportsContent;
}

export default function CarportsEditable({ initialContent }: CarportsEditableProps) {
  const backPath = useBackPath(initialContent.backPath);

  return (
    <EditablePageWrapper<CarportsContent>
      slug="carports"
      defaultContent={initialContent}
    >
      {({ content, isEditMode, updateField }) => (
        <>
          <Helmet>
            <title>{content.metaTitle}</title>
            <meta name="description" content={content.metaDescription} />
            <meta property="og:title" content={content.metaTitle} />
            <meta property="og:description" content={content.metaDescription} />
            {content.canonicalUrl && <link rel="canonical" href={content.canonicalUrl} />}
          </Helmet>

          <div className="min-h-screen">
            <Header />

            <main>
              {/* Hero Section */}
              <div className="relative">
                <ProductHero
                  backPath={backPath}
                  title={content.title || 'CARPORTS &'}
                  titleHighlight={content.titleHighlight || 'RV COVERS'}
                  description={content.description}
                  image={content.heroImage}
                  imageAlt={content.heroImageAlt}
                  isEditMode={isEditMode}
                  onUpdateField={(field, value) => updateField(field as keyof CarportsContent, value as string)}
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
                      text: content.heroButton1Text || 'Browse Our Inventory',
                      href: content.heroButton1Link || '/inventory',
                      variant: 'hero',
                      external: content.heroButton1OpenInNewTab ?? false,
                    },
                    {
                      text: content.heroButton2Text || 'View All Models',
                      href: content.heroButton2Link || '/types',
                      variant: 'heroOutline',
                      external: content.heroButton2OpenInNewTab ?? false,
                    },
                  ]}
                />
                {isEditMode && (
                  <div className="absolute bottom-4 right-4 z-10 bg-card/90 backdrop-blur-sm p-4 rounded-lg border border-border shadow-lg max-w-xs space-y-4">
                    <div>
                      <p className="text-sm font-medium text-foreground mb-2">Hero Image</p>
                      <InlineEditableImage
                        src={content.heroImage}
                        alt={content.heroImageAlt}
                        onImageChange={(url) => updateField('heroImage', url)}
                        isEditMode={isEditMode}
                        className="w-32 h-20 object-cover rounded"
                      />
                    </div>
                    <div className="border-t border-border pt-3">
                      <p className="text-sm font-medium text-foreground mb-2">Hero Buttons</p>
                      <div className="space-y-3">
                        <InlineEditableButton
                          text={content.heroButton1Text || 'Browse Our Inventory'}
                          href={content.heroButton1Link || '/inventory'}
                          isExternal={content.heroButton1OpenInNewTab ?? false}
                          onTextChange={(val) => updateField('heroButton1Text', val)}
                          onHrefChange={(val) => updateField('heroButton1Link', val)}
                          onExternalChange={(val) => updateField('heroButton1OpenInNewTab', val)}
                          isEditMode={isEditMode}
                        >
                          <Button variant="outline" size="sm" className="w-full justify-start">
                            {content.heroButton1Text || 'Browse Our Inventory'}
                          </Button>
                        </InlineEditableButton>
                        <InlineEditableButton
                          text={content.heroButton2Text || 'View All Models'}
                          href={content.heroButton2Link || '/types'}
                          isExternal={content.heroButton2OpenInNewTab ?? false}
                          onTextChange={(val) => updateField('heroButton2Text', val)}
                          onHrefChange={(val) => updateField('heroButton2Link', val)}
                          onExternalChange={(val) => updateField('heroButton2OpenInNewTab', val)}
                          isEditMode={isEditMode}
                        >
                          <Button variant="outline" size="sm" className="w-full justify-start">
                            {content.heroButton2Text || 'View All Models'}
                          </Button>
                        </InlineEditableButton>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Gallery Section */}
              {content.galleryImages.length > 0 && (
                <section className="section-padding bg-background">
                  <div className="container-custom">
                    {isEditMode ? (
                      <>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
                          {content.galleryImages.map((img, index) => (
                            <div key={index} className="relative group">
                              <InlineEditableImage
                                src={img.src}
                                alt={img.alt}
                                onImageChange={(url) => {
                                  const newImages = [...content.galleryImages];
                                  newImages[index] = { ...newImages[index], src: url };
                                  updateField('galleryImages', newImages as unknown as string);
                                }}
                                isEditMode={isEditMode}
                                className="w-full aspect-video object-cover rounded-lg"
                              />
                              <button
                                onClick={() => {
                                  const newImages = content.galleryImages.filter((_, i) => i !== index);
                                  updateField('galleryImages', newImages as unknown as string);
                                }}
                                className="absolute top-2 right-2 bg-destructive text-destructive-foreground rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                                title="Delete image"
                              >
                                <X className="w-4 h-4" />
                              </button>
                              <div className="mt-2">
                                <InlineEditable
                                  value={img.alt}
                                  fieldName={`galleryAlt${index}`}
                                  onChange={(val) => {
                                    const newImages = [...content.galleryImages];
                                    newImages[index] = { ...newImages[index], alt: val };
                                    updateField('galleryImages', newImages as unknown as string);
                                  }}
                                  isEditMode={isEditMode}
                                  as="span"
                                  className="text-xs text-muted-foreground"
                                />
                              </div>
                            </div>
                          ))}
                        </div>
                        <div className="flex justify-center">
                          <Button
                            variant="outline"
                            onClick={() => {
                              const newImages = [...content.galleryImages, { src: '/placeholder-shed.jpg', alt: 'New gallery image' }];
                              updateField('galleryImages', newImages as unknown as string);
                            }}
                            className="flex items-center gap-2"
                          >
                            <Plus className="w-4 h-4" />
                            Add Gallery Image
                          </Button>
                        </div>
                      </>
                    ) : (
                      <GallerySection images={content.galleryImages} />
                    )}
                  </div>
                </section>
              )}

              {/* Carport Product Section */}
              <section className="section-padding bg-muted/30">
                <div className="container-custom">
                  <div className="max-w-4xl mx-auto">
                    <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4 text-center">
                      <InlineEditable
                        value={content.carportProduct.heading}
                        fieldName="carportProduct.heading"
                        onChange={(val) => {
                          const updated = { ...content.carportProduct, heading: val };
                          updateField('carportProduct', updated as unknown as string);
                        }}
                        isEditMode={isEditMode}
                        as="span"
                      />
                      {' '}
                      <span className="text-secondary">
                        <InlineEditable
                          value={content.carportProduct.highlight}
                          fieldName="carportProduct.highlight"
                          onChange={(val) => {
                            const updated = { ...content.carportProduct, highlight: val };
                            updateField('carportProduct', updated as unknown as string);
                          }}
                          isEditMode={isEditMode}
                          as="span"
                        />
                      </span>
                    </h2>
                    <p className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
                      <InlineEditable
                        value={content.carportProduct.description}
                        fieldName="carportProduct.description"
                        type="textarea"
                        onChange={(val) => {
                          const updated = { ...content.carportProduct, description: val };
                          updateField('carportProduct', updated as unknown as string);
                        }}
                        isEditMode={isEditMode}
                        as="span"
                      />
                    </p>

                    <div className="grid md:grid-cols-2 gap-8 items-center">
                      <div className="relative">
                        <InlineEditableImage
                          src={content.carportProduct.image}
                          alt={content.carportProduct.imageAlt}
                          onImageChange={(url) => {
                            const updated = { ...content.carportProduct, image: url };
                            updateField('carportProduct', updated as unknown as string);
                          }}
                          isEditMode={isEditMode}
                          className="rounded-xl shadow-lg w-full"
                        />
                        <div className="absolute -bottom-3 -right-3 bg-secondary text-primary-foreground px-4 py-2 rounded-lg font-heading text-sm">
                          <InlineEditable
                            value={content.carportProduct.badge}
                            fieldName="carportProduct.badge"
                            onChange={(val) => {
                              const updated = { ...content.carportProduct, badge: val };
                              updateField('carportProduct', updated as unknown as string);
                            }}
                            isEditMode={isEditMode}
                            as="span"
                          />
                        </div>
                        {isEditMode && (
                          <div className="mt-4">
                            <InlineEditable
                              value={content.carportProduct.imageAlt}
                              fieldName="carportProduct.imageAlt"
                              onChange={(val) => {
                                const updated = { ...content.carportProduct, imageAlt: val };
                                updateField('carportProduct', updated as unknown as string);
                              }}
                              isEditMode={isEditMode}
                              as="span"
                              className="text-xs text-muted-foreground"
                            />
                          </div>
                        )}
                      </div>

                      <div className="bg-card rounded-xl p-8 border border-border shadow-lg">
                        <h3 className="font-heading text-2xl font-bold text-foreground mb-6">
                          {content.carportProduct.highlight} Features
                        </h3>
                        <div className="space-y-3">
                          {content.carportProduct.features.map((feature, index) => (
                            <div key={index} className="flex items-center gap-3 text-foreground">
                              <Check className="w-5 h-5 text-secondary flex-shrink-0" />
                              <span>
                                <InlineEditable
                                  value={feature}
                                  fieldName={`carportFeature${index}`}
                                  onChange={(val) => {
                                    const updatedFeatures = [...content.carportProduct.features];
                                    updatedFeatures[index] = val;
                                    const updated = { ...content.carportProduct, features: updatedFeatures };
                                    updateField('carportProduct', updated as unknown as string);
                                  }}
                                  isEditMode={isEditMode}
                                  as="span"
                                />
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* RV Cover Product Section */}
              <section className="section-padding bg-background">
                <div className="container-custom">
                  <div className="max-w-4xl mx-auto">
                    <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4 text-center">
                      <InlineEditable
                        value={content.rvProduct.heading}
                        fieldName="rvProduct.heading"
                        onChange={(val) => {
                          const updated = { ...content.rvProduct, heading: val };
                          updateField('rvProduct', updated as unknown as string);
                        }}
                        isEditMode={isEditMode}
                        as="span"
                      />
                      {' '}
                      <span className="text-secondary">
                        <InlineEditable
                          value={content.rvProduct.highlight}
                          fieldName="rvProduct.highlight"
                          onChange={(val) => {
                            const updated = { ...content.rvProduct, highlight: val };
                            updateField('rvProduct', updated as unknown as string);
                          }}
                          isEditMode={isEditMode}
                          as="span"
                        />
                      </span>
                    </h2>
                    <p className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
                      <InlineEditable
                        value={content.rvProduct.description}
                        fieldName="rvProduct.description"
                        type="textarea"
                        onChange={(val) => {
                          const updated = { ...content.rvProduct, description: val };
                          updateField('rvProduct', updated as unknown as string);
                        }}
                        isEditMode={isEditMode}
                        as="span"
                      />
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
                              <span>
                                <InlineEditable
                                  value={feature}
                                  fieldName={`rvFeature${index}`}
                                  onChange={(val) => {
                                    const updatedFeatures = [...content.rvProduct.features];
                                    updatedFeatures[index] = val;
                                    const updated = { ...content.rvProduct, features: updatedFeatures };
                                    updateField('rvProduct', updated as unknown as string);
                                  }}
                                  isEditMode={isEditMode}
                                  as="span"
                                />
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="relative">
                        <InlineEditableImage
                          src={content.rvProduct.image}
                          alt={content.rvProduct.imageAlt}
                          onImageChange={(url) => {
                            const updated = { ...content.rvProduct, image: url };
                            updateField('rvProduct', updated as unknown as string);
                          }}
                          isEditMode={isEditMode}
                          className="rounded-xl shadow-lg w-full"
                        />
                        <div className="absolute -bottom-3 -left-3 bg-secondary text-primary-foreground px-4 py-2 rounded-lg font-heading text-sm">
                          <InlineEditable
                            value={content.rvProduct.badge}
                            fieldName="rvProduct.badge"
                            onChange={(val) => {
                              const updated = { ...content.rvProduct, badge: val };
                              updateField('rvProduct', updated as unknown as string);
                            }}
                            isEditMode={isEditMode}
                            as="span"
                          />
                        </div>
                        {isEditMode && (
                          <div className="mt-4">
                            <InlineEditable
                              value={content.rvProduct.imageAlt}
                              fieldName="rvProduct.imageAlt"
                              onChange={(val) => {
                                const updated = { ...content.rvProduct, imageAlt: val };
                                updateField('rvProduct', updated as unknown as string);
                              }}
                              isEditMode={isEditMode}
                              as="span"
                              className="text-xs text-muted-foreground"
                            />
                          </div>
                        )}
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
                      <InlineEditable
                        value={content.usesHeading}
                        fieldName="usesHeading"
                        onChange={(val) => updateField('usesHeading', val)}
                        isEditMode={isEditMode}
                        as="span"
                      />
                    </h2>
                    <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
                      {content.uses.map((use, index) => (
                        <div
                          key={index}
                          className="flex items-center gap-3 bg-card p-4 rounded-lg border border-border/50"
                        >
                          <Check className="w-5 h-5 text-secondary flex-shrink-0" />
                          <span className="text-foreground font-medium">
                            <InlineEditable
                              value={use}
                              fieldName={`use${index}`}
                              onChange={(val) => {
                                const updatedUses = [...content.uses];
                                updatedUses[index] = val;
                                updateField('uses', updatedUses as unknown as string);
                              }}
                              isEditMode={isEditMode}
                              as="span"
                            />
                          </span>
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
                    <div className="flex items-center justify-between mb-8">
                      <h2 className="font-heading text-3xl md:text-4xl font-bold text-secondary">
                        <InlineEditable
                          value={content.colorHeading}
                          fieldName="colorHeading"
                          onChange={(val) => updateField('colorHeading', val)}
                          isEditMode={isEditMode}
                          as="span"
                        />
                      </h2>
                      {isEditMode && (
                        <span className="text-xs text-muted-foreground bg-muted px-3 py-1 rounded-full">
                          Colors edited via database
                        </span>
                      )}
                    </div>

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
                                {category.colors.map((swatch) => (
                                  <SimpleColorSwatch
                                    key={swatch.name}
                                    name={swatch.name}
                                    color={swatch.color}
                                    categoryId={category.id}
                                  />
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
                      <p className="text-sm text-muted-foreground">
                        <InlineEditable
                          value={content.importantNote}
                          fieldName="importantNote"
                          type="textarea"
                          onChange={(val) => updateField('importantNote', val)}
                          isEditMode={isEditMode}
                          as="span"
                        />
                      </p>
                    </div>
                  </div>
                </section>
              )}

              {/* CTA Section */}
              <section className="section-padding bg-gradient-to-r from-secondary to-primary">
                <div className="container-custom text-center">
                  <h2 className="font-heading text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
                    <InlineEditable
                      value={content.ctaHeading || 'Ready to Get Started?'}
                      fieldName="ctaHeading"
                      onChange={(val) => updateField('ctaHeading', val)}
                      isEditMode={isEditMode}
                      as="span"
                    />
                  </h2>
                  <p className="text-primary-foreground/90 text-lg mb-8 max-w-2xl mx-auto">
                    <InlineEditable
                      value={content.ctaDescription || 'Contact us today for a free quote.'}
                      fieldName="ctaDescription"
                      type="textarea"
                      onChange={(val) => updateField('ctaDescription', val)}
                      isEditMode={isEditMode}
                      as="span"
                    />
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <InlineEditableButton
                      text={content.ctaPrimaryButton || 'Browse Our Inventory'}
                      href={content.ctaPrimaryButtonLink || '/inventory'}
                      isExternal={content.ctaPrimaryButtonOpenInNewTab ?? false}
                      onTextChange={(val) => updateField('ctaPrimaryButton', val)}
                      onHrefChange={(val) => updateField('ctaPrimaryButtonLink', val)}
                      onExternalChange={(val) => updateField('ctaPrimaryButtonOpenInNewTab', val)}
                      isEditMode={isEditMode}
                    >
                      <a
                        href={content.ctaPrimaryButtonLink || '/inventory'}
                        target={content.ctaPrimaryButtonOpenInNewTab ? '_blank' : undefined}
                        rel={content.ctaPrimaryButtonOpenInNewTab ? 'noopener noreferrer' : undefined}
                      >
                        <Button
                          variant="heroOutline"
                          size="xl"
                          className="bg-primary-foreground text-foreground hover:bg-primary-foreground/90"
                        >
                          {content.ctaPrimaryButton || 'Browse Our Inventory'}
                          <ArrowRight className="w-5 h-5" />
                        </Button>
                      </a>
                    </InlineEditableButton>
                    <InlineEditableButton
                      text={content.ctaSecondaryButton || 'See More Models'}
                      href={content.ctaSecondaryButtonLink || '/types'}
                      isExternal={content.ctaSecondaryButtonOpenInNewTab ?? false}
                      onTextChange={(val) => updateField('ctaSecondaryButton', val)}
                      onHrefChange={(val) => updateField('ctaSecondaryButtonLink', val)}
                      onExternalChange={(val) => updateField('ctaSecondaryButtonOpenInNewTab', val)}
                      isEditMode={isEditMode}
                    >
                      <a
                        href={content.ctaSecondaryButtonLink || '/types'}
                        target={content.ctaSecondaryButtonOpenInNewTab ? '_blank' : undefined}
                        rel={content.ctaSecondaryButtonOpenInNewTab ? 'noopener noreferrer' : undefined}
                      >
                        <Button variant="heroOutline" size="xl">
                          {content.ctaSecondaryButton || 'See More Models'}
                        </Button>
                      </a>
                    </InlineEditableButton>
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
