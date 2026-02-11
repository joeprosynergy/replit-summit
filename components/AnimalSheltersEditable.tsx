"use client";

/**
 * AnimalSheltersEditable - Animal Shelters Admin Component
 * ADMIN ONLY - Lazy-loaded for authenticated admins
 * SPECIAL LAYOUT - Has 3 sub-products (Animal Shelter, Dog Kennel, Chicken Coop)
 */

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Check, ArrowRight } from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import ProductHero from '@/components/ProductHero';

// Admin imports
import { EditablePageWrapper } from '@/components/admin/EditablePageWrapper';
import { InlineEditable } from '@/components/admin/InlineEditable';
import InlineEditableButton from '@/components/admin/InlineEditableButton';
import InlineEditableImage from '@/components/admin/InlineEditableImage';

import { AnimalSheltersContent } from '@/data/defaults/animalSheltersDefaults';
import { SimpleColorSwatch } from '@/components/ui/GlobalColorSwatch';

interface AnimalSheltersEditableProps {
  initialContent: AnimalSheltersContent;
}

export default function AnimalSheltersEditable({ initialContent }: AnimalSheltersEditableProps) {
  const pathname = usePathname();

  // Handle hash navigation
  useEffect(() => {
    const hash = typeof window !== 'undefined' ? window.location.hash : '';
    if (hash) {
      const element = document.getElementById(hash.substring(1));
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    }
  }, [pathname]);

  return (
    <EditablePageWrapper<AnimalSheltersContent>
      slug="animal-shelters"
      defaultContent={initialContent}
    >
      {({ content, isEditMode, updateField }) => (
        <>
          <div className="min-h-screen">
            <main>
              {/* Hero Section */}
              <div className="relative">
                <ProductHero
                  backPath={content.backPath}
                  title={content.title || 'ANIMAL'}
                  titleHighlight={content.titleHighlight || 'SHELTERS'}
                  description={content.description}
                  subtitle={content.subtitle}
                  image={content.heroImage}
                  imageAlt={content.heroImageAlt}
                  isEditMode={isEditMode}
                  onUpdateField={(field, value) => updateField(field as keyof AnimalSheltersContent, value as string)}
                  ctaButtons={[
                    {
                      text: content.heroButton1Text || 'Design Your Shelter',
                      href: content.heroButton1Link || 'https://summitbuildings.shedpro.co/',
                      variant: 'hero',
                      external: content.heroButton1OpenInNewTab ?? true,
                    },
                    {
                      text: content.heroButton2Text || 'Browse Inventory',
                      href: content.heroButton2Link || '/inventory',
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
                          text={content.heroButton1Text || 'Design Your Shelter'}
                          href={content.heroButton1Link || 'https://summitbuildings.shedpro.co/'}
                          isExternal={content.heroButton1OpenInNewTab ?? true}
                          onTextChange={(val) => updateField('heroButton1Text', val)}
                          onHrefChange={(val) => updateField('heroButton1Link', val)}
                          onExternalChange={(val) => updateField('heroButton1OpenInNewTab', val)}
                          isEditMode={isEditMode}
                        >
                          <Button variant="outline" size="sm" className="w-full justify-start">
                            {content.heroButton1Text || 'Design Your Shelter'}
                          </Button>
                        </InlineEditableButton>
                        <InlineEditableButton
                          text={content.heroButton2Text || 'Browse Inventory'}
                          href={content.heroButton2Link || '/inventory'}
                          isExternal={content.heroButton2OpenInNewTab ?? false}
                          onTextChange={(val) => updateField('heroButton2Text', val)}
                          onHrefChange={(val) => updateField('heroButton2Link', val)}
                          onExternalChange={(val) => updateField('heroButton2OpenInNewTab', val)}
                          isEditMode={isEditMode}
                        >
                          <Button variant="outline" size="sm" className="w-full justify-start">
                            {content.heroButton2Text || 'Browse Inventory'}
                          </Button>
                        </InlineEditableButton>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Quick Nav */}
              <section className="py-8 bg-muted/50 border-b border-border">
                <div className="container-custom">
                  <div className="flex flex-wrap justify-center gap-4">
                    {content.shelters.map((shelter) => (
                      <a
                        key={shelter.id}
                        href={`#${shelter.id}`}
                        className="px-6 py-3 bg-card rounded-lg border border-border hover:border-secondary hover:bg-secondary/10 transition-all font-medium text-foreground"
                      >
                        {shelter.name}
                      </a>
                    ))}
                  </div>
                </div>
              </section>

              {/* Shelter Product Sections */}
              {content.shelters.map((shelter, index) => {
                const updateShelter = (field: keyof typeof shelter, value: unknown) => {
                  const updatedShelters = [...content.shelters];
                  updatedShelters[index] = { ...updatedShelters[index], [field]: value };
                  updateField('shelters', updatedShelters as unknown as string);
                };

                const updateShelterFeature = (featureIndex: number, value: string) => {
                  const updatedFeatures = [...shelter.features];
                  updatedFeatures[featureIndex] = value;
                  updateShelter('features', updatedFeatures);
                };

                return (
                  <section
                    key={shelter.id}
                    id={shelter.id}
                    className={`section-padding ${index % 2 === 0 ? 'bg-background' : 'bg-muted/30'}`}
                  >
                    <div className="container-custom">
                      <div className="max-w-6xl mx-auto">
                        <div className={`grid lg:grid-cols-2 gap-12 items-center`}>
                          <div className={index % 2 === 1 ? 'lg:order-2' : ''}>
                            <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-2">
                              <InlineEditable
                                value={shelter.name}
                                fieldName={`shelter${index}Name`}
                                onChange={(val) => updateShelter('name', val)}
                                isEditMode={isEditMode}
                                as="span"
                              />
                            </h2>
                            <p className="text-secondary font-heading text-lg mb-4">
                              <InlineEditable
                                value={shelter.tagline}
                                fieldName={`shelter${index}Tagline`}
                                onChange={(val) => updateShelter('tagline', val)}
                                isEditMode={isEditMode}
                                as="span"
                              />
                            </p>
                            <p className="text-muted-foreground mb-6">
                              <InlineEditable
                                value={shelter.description}
                                fieldName={`shelter${index}Description`}
                                type="textarea"
                                onChange={(val) => updateShelter('description', val)}
                                isEditMode={isEditMode}
                                as="span"
                              />
                            </p>

                            <div className="bg-card rounded-xl p-6 border border-border shadow-sm mb-6">
                              <h3 className="font-heading text-xl font-bold text-foreground mb-4">
                                Standard Features
                              </h3>
                              <div className="space-y-2">
                                {shelter.features.map((feature, featureIdx) => (
                                  <div key={featureIdx} className="flex items-center gap-3 text-foreground">
                                    <Check className="w-5 h-5 text-secondary flex-shrink-0" />
                                    <span>
                                      <InlineEditable
                                        value={feature}
                                        fieldName={`shelter${index}Feature${featureIdx}`}
                                        onChange={(val) => updateShelterFeature(featureIdx, val)}
                                        isEditMode={isEditMode}
                                        as="span"
                                      />
                                    </span>
                                  </div>
                                ))}
                              </div>
                              {(shelter.note !== undefined || isEditMode) && (
                                <p className="text-xs text-muted-foreground italic mt-4">
                                  <InlineEditable
                                    value={shelter.note || ''}
                                    fieldName={`shelter${index}Note`}
                                    type="textarea"
                                    onChange={(val) => updateShelter('note', val)}
                                    isEditMode={isEditMode}
                                    as="span"
                                  />
                                </p>
                              )}
                            </div>

                            <InlineEditableButton
                              text={shelter.buttonText}
                              href={shelter.buttonLink}
                              isExternal={shelter.buttonOpenInNewTab}
                              onTextChange={(val) => updateShelter('buttonText', val)}
                              onHrefChange={(val) => updateShelter('buttonLink', val)}
                              onExternalChange={(val) => updateShelter('buttonOpenInNewTab', val)}
                              isEditMode={isEditMode}
                            >
                              <a
                                href={shelter.buttonLink}
                                target={shelter.buttonOpenInNewTab ? '_blank' : undefined}
                                rel={shelter.buttonOpenInNewTab ? 'noopener noreferrer' : undefined}
                              >
                                <Button variant="hero">
                                  {shelter.buttonText}
                                  <ArrowRight className="w-4 h-4" />
                                </Button>
                              </a>
                            </InlineEditableButton>
                          </div>

                          <div className={`grid grid-cols-2 gap-4 ${index % 2 === 1 ? 'lg:order-1' : ''}`}>
                            <div>
                              <InlineEditableImage
                                src={shelter.image1}
                                alt={shelter.image1Alt}
                                onImageChange={(url) => updateShelter('image1', url)}
                                isEditMode={isEditMode}
                                className="rounded-xl shadow-lg w-full aspect-square object-cover"
                              />
                              {isEditMode && (
                                <div className="mt-2">
                                  <InlineEditable
                                    value={shelter.image1Alt}
                                    fieldName={`shelter${index}Image1Alt`}
                                    onChange={(val) => updateShelter('image1Alt', val)}
                                    isEditMode={isEditMode}
                                    as="span"
                                    className="text-xs text-muted-foreground"
                                  />
                                </div>
                              )}
                            </div>
                            <div>
                              <InlineEditableImage
                                src={shelter.image2}
                                alt={shelter.image2Alt}
                                onImageChange={(url) => updateShelter('image2', url)}
                                isEditMode={isEditMode}
                                className="rounded-xl shadow-lg w-full aspect-square object-cover"
                              />
                              {isEditMode && (
                                <div className="mt-2">
                                  <InlineEditable
                                    value={shelter.image2Alt}
                                    fieldName={`shelter${index}Image2Alt`}
                                    onChange={(val) => updateShelter('image2Alt', val)}
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
                    </div>
                  </section>
                );
              })}

              {/* Color & Material Options */}
              {content.sidingCategories.length > 0 && (
                <section className="section-padding bg-muted/30">
                  <div className="container-custom">
                    <div className="flex items-center justify-between mb-8">
                      <h2 className="font-heading text-3xl md:text-4xl font-bold text-secondary">
                        <InlineEditable
                          value={content.colorHeading || 'COLOR AND MATERIAL OPTIONS'}
                          fieldName="colorHeading"
                          onChange={(val) => updateField('colorHeading', val)}
                          isEditMode={isEditMode}
                          as="span"
                        />
                      </h2>
                      {isEditMode && (
                        <span className="text-xs text-muted-foreground bg-muted px-3 py-1 rounded-full">
                          Siding colors edited via database
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

              {/* CTA Section */}
              <section className="section-padding bg-navy text-center">
                <div className="container-custom max-w-3xl">
                  <h2 className="font-heading text-3xl md:text-4xl font-bold text-primary-foreground mb-6">
                    <InlineEditable
                      value={content.ctaHeading || 'Ready to House Your Animals?'}
                      fieldName="ctaHeading"
                      onChange={(val) => updateField('ctaHeading', val)}
                      isEditMode={isEditMode}
                      as="span"
                    />
                  </h2>
                  <p className="text-primary-foreground/80 text-lg mb-8">
                    <InlineEditable
                      value={content.ctaDescription || 'Design your perfect animal shelter today or call us to discuss your needs.'}
                      fieldName="ctaDescription"
                      type="textarea"
                      onChange={(val) => updateField('ctaDescription', val)}
                      isEditMode={isEditMode}
                      as="span"
                    />
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <InlineEditableButton
                      text={content.ctaPrimaryButton || 'Design Your Shelter'}
                      href={content.ctaPrimaryButtonLink || 'https://summitbuildings.shedpro.co/'}
                      isExternal={content.ctaPrimaryButtonOpenInNewTab ?? true}
                      onTextChange={(val) => updateField('ctaPrimaryButton', val)}
                      onHrefChange={(val) => updateField('ctaPrimaryButtonLink', val)}
                      onExternalChange={(val) => updateField('ctaPrimaryButtonOpenInNewTab', val)}
                      isEditMode={isEditMode}
                    >
                      <a
                        href={content.ctaPrimaryButtonLink || 'https://summitbuildings.shedpro.co/'}
                        target={content.ctaPrimaryButtonOpenInNewTab ? '_blank' : undefined}
                        rel={content.ctaPrimaryButtonOpenInNewTab ? 'noopener noreferrer' : undefined}
                      >
                        <Button variant="hero" size="xl">
                          {content.ctaPrimaryButton || 'Design Your Shelter'}
                          <ArrowRight className="w-5 h-5" />
                        </Button>
                      </a>
                    </InlineEditableButton>
                    <InlineEditableButton
                      text={content.ctaSecondaryButton || 'Call (573) 747-4700'}
                      href={content.ctaSecondaryButtonLink || 'tel:5737474700'}
                      isExternal={content.ctaSecondaryButtonOpenInNewTab ?? false}
                      onTextChange={(val) => updateField('ctaSecondaryButton', val)}
                      onHrefChange={(val) => updateField('ctaSecondaryButtonLink', val)}
                      onExternalChange={(val) => updateField('ctaSecondaryButtonOpenInNewTab', val)}
                      isEditMode={isEditMode}
                    >
                      <a
                        href={content.ctaSecondaryButtonLink || 'tel:5737474700'}
                        target={content.ctaSecondaryButtonOpenInNewTab ? '_blank' : undefined}
                        rel={content.ctaSecondaryButtonOpenInNewTab ? 'noopener noreferrer' : undefined}
                      >
                        <Button variant="heroOutline" size="xl">
                          {content.ctaSecondaryButton || 'Call (573) 747-4700'}
                        </Button>
                      </a>
                    </InlineEditableButton>
                  </div>
                </div>
              </section>
            </main>
          </div>
        </>
      )}
    </EditablePageWrapper>
  );
}
