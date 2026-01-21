/**
 * Economy Shed Editable - ADMIN ONLY
 * This file is LAZY-LOADED only for authenticated admins.
 * Contains full inline editing functionality.
 * 
 * Bundle: admin-bundle.js (separate chunk)
 */

import { Helmet } from 'react-helmet-async';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { 
  Check,
  ArrowRight,
  Plus,
  X,
} from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import GallerySection from '@/components/GallerySection';
import ProductHero from '@/components/ProductHero';
import { useBackPath } from '@/hooks/useBackPath';

// ADMIN IMPORTS - Only loaded for admins
import { EditablePageWrapper } from '@/components/admin/EditablePageWrapper';
import { InlineEditable } from '@/components/admin/InlineEditable';
import InlineEditableButton from '@/components/admin/InlineEditableButton';
import InlineEditableImage from '@/components/admin/InlineEditableImage';

import { EconomyShedContent } from './defaults/economyShedDefaults';

const sidingOptions = {
  metal: [
    { name: 'Alamo White', color: '#E5E5DC' },
    { name: 'Ash Gray', color: '#8B8B8B' },
    { name: 'Brilliant White', color: '#FFFFFF' },
    { name: 'Black', color: '#1A1A1A' },
    { name: 'Brite Red', color: '#C41E3A' },
    { name: 'Brown', color: '#5C4033' },
    { name: 'Buckskin Desert', color: '#C4A76C' },
    { name: 'Burgundy', color: '#722F37' },
    { name: 'Burnished Slate', color: '#5A6165' },
    { name: 'Charcoal', color: '#36454F' },
    { name: 'Forest Green', color: '#228B22' },
    { name: 'Galvalume', color: '#B8B8B0' },
    { name: 'Gallery Blue', color: '#4169E1' },
    { name: 'Hunter Green', color: '#355E3B' },
    { name: 'Ivory', color: '#FFFFF0' },
    { name: 'Light Stone', color: '#D4CFC4' },
    { name: 'Ocean', color: '#006994' },
    { name: 'Rustic', color: '#8B4513' },
    { name: 'Pewter', color: '#96A8A1' },
    { name: 'Tan', color: '#D2B48C' },
    { name: 'Taupe', color: '#483C32' },
  ],
};

const ColorSwatch = ({ name, color }: { name: string; color: string }) => (
  <div className="flex flex-col items-center gap-2">
    <div 
      className="w-16 h-16 rounded-full border-4 border-card shadow-md"
      style={{ backgroundColor: color }}
    />
    <span className="text-xs text-muted-foreground text-center leading-tight max-w-[70px]">
      {name}
    </span>
  </div>
);

interface EconomyShedEditableProps {
  initialContent: EconomyShedContent;
}

export default function EconomyShedEditable({ initialContent }: EconomyShedEditableProps) {
  const backPath = useBackPath({
    defaultPath: '/types/basic-storage#economy',
    defaultLabel: '← Back to Basic Storage',
    stylesPath: '/styles/utility',
    stylesLabel: '← Back to Styles',
  });

  return (
    <EditablePageWrapper<EconomyShedContent> 
      slug="economy-shed" 
      defaultContent={initialContent}
    >
      {({ content, isEditMode, updateField, updateDynamicField }) => {
        const galleryImages: { src: string; alt: string }[] = [];
        let i = 1;
        while (content[`galleryImage${i}`]) {
          galleryImages.push({
            src: content[`galleryImage${i}`] as string,
            alt: content[`galleryImage${i}Alt`] as string || '',
          });
          i++;
        }

        const addGalleryImage = () => {
          const nextIndex = galleryImages.length + 1;
          updateDynamicField(`galleryImage${nextIndex}`, '/placeholder-shed.jpg');
          updateDynamicField(`galleryImage${nextIndex}Alt`, 'New gallery image');
        };

        const deleteGalleryImage = (indexToDelete: number) => {
          const totalImages = galleryImages.length;
          for (let i = indexToDelete; i < totalImages; i++) {
            const nextSrc = content[`galleryImage${i + 1}`] as string || '';
            const nextAlt = content[`galleryImage${i + 1}Alt`] as string || '';
            updateDynamicField(`galleryImage${i}`, nextSrc);
            updateDynamicField(`galleryImage${i}Alt`, nextAlt);
          }
          updateDynamicField(`galleryImage${totalImages}`, '');
          updateDynamicField(`galleryImage${totalImages}Alt`, '');
        };

        const card1Features = [
          content.card1Feature1 as string,
          content.card1Feature2 as string,
          content.card1Feature3 as string,
          content.card1Feature4 as string,
        ];

        const card2Features = [
          content.card2Feature1 as string,
          content.card2Feature2 as string,
          content.card2Feature3 as string,
          content.card2Feature4 as string,
        ];

        const benefits = [
          { key: 'valueBenefit1', value: content.valueBenefit1 as string },
          { key: 'valueBenefit2', value: content.valueBenefit2 as string },
          { key: 'valueBenefit3', value: content.valueBenefit3 as string },
          { key: 'valueBenefit4', value: content.valueBenefit4 as string },
          { key: 'valueBenefit5', value: content.valueBenefit5 as string },
          { key: 'valueBenefit6', value: content.valueBenefit6 as string },
          { key: 'valueBenefit7', value: content.valueBenefit7 as string },
          { key: 'valueBenefit8', value: content.valueBenefit8 as string },
          { key: 'valueBenefit9', value: content.valueBenefit9 as string },
        ];

        return (
        <>
          <Helmet>
            <title>{content.metaTitle}</title>
            <meta name="description" content={content.metaDescription as string} />
            <meta property="og:title" content={content.metaTitle as string} />
            <meta property="og:description" content={content.metaDescription as string} />
            <link rel="canonical" href="https://summitbuildings.com/types/basic-storage/economy-shed" />
          </Helmet>

          <div className="min-h-screen">
            <Header />
        
        <main>
          <div className="relative">
            <ProductHero
              backPath={backPath}
              title={content.title as string}
              titleHighlight={content.titleHighlight as string}
              titlePosition="before"
              description={content.description as string}
              subtitle={content.subtitle as string}
              image={content.heroImage as string}
              imageAlt={content.heroImageAlt as string}
              isEditMode={isEditMode}
              onUpdateField={(field, value) => updateField(field, value)}
              ctaButtons={[
                {
                  text: content.heroButton1Text as string,
                  href: content.heroButton1Link as string,
                  variant: 'hero',
                  external: content.heroButton1OpenInNewTab as boolean,
                },
                {
                  text: content.heroButton2Text as string,
                  href: content.heroButton2Link as string,
                  variant: 'heroOutline',
                  external: content.heroButton2OpenInNewTab as boolean,
                },
              ]}
            />
            {isEditMode && (
              <div className="absolute bottom-4 right-4 z-10 bg-card/90 backdrop-blur-sm p-4 rounded-lg border border-border shadow-lg max-w-xs space-y-4">
                <div>
                  <p className="text-sm font-medium text-foreground mb-2">Hero Image</p>
                  <InlineEditableImage
                    src={content.heroImage as string}
                    alt={content.heroImageAlt as string}
                    onImageChange={(url) => updateField('heroImage', url)}
                    isEditMode={isEditMode}
                    className="w-32 h-20 object-cover rounded"
                  />
                  <div className="mt-2">
                    <p className="text-xs text-muted-foreground mb-1">Alt Text:</p>
                    <InlineEditable
                      value={content.heroImageAlt as string}
                      fieldName="heroImageAlt"
                      onChange={(val) => updateField('heroImageAlt', val)}
                      isEditMode={isEditMode}
                      as="span"
                      className="text-xs"
                    />
                  </div>
                </div>
                <div className="border-t border-border pt-3">
                  <p className="text-sm font-medium text-foreground mb-2">Hero Buttons</p>
                  <div className="space-y-3">
                    <InlineEditableButton
                      text={content.heroButton1Text as string}
                      href={content.heroButton1Link as string}
                      isExternal={content.heroButton1OpenInNewTab as boolean}
                      onTextChange={(val) => updateField('heroButton1Text', val)}
                      onHrefChange={(val) => updateField('heroButton1Link', val)}
                      onExternalChange={(val) => updateField('heroButton1OpenInNewTab', val)}
                      isEditMode={isEditMode}
                    >
                      <Button variant="outline" size="sm" className="w-full justify-start">
                        {content.heroButton1Text}
                      </Button>
                    </InlineEditableButton>
                    <InlineEditableButton
                      text={content.heroButton2Text as string}
                      href={content.heroButton2Link as string}
                      isExternal={content.heroButton2OpenInNewTab as boolean}
                      onTextChange={(val) => updateField('heroButton2Text', val)}
                      onHrefChange={(val) => updateField('heroButton2Link', val)}
                      onExternalChange={(val) => updateField('heroButton2OpenInNewTab', val)}
                      isEditMode={isEditMode}
                    >
                      <Button variant="outline" size="sm" className="w-full justify-start">
                        {content.heroButton2Text}
                      </Button>
                    </InlineEditableButton>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Image Gallery */}
          <section className="section-padding bg-background">
            <div className="container-custom">
              {isEditMode ? (
                <>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                    {galleryImages.map((img, index) => (
                      <div key={index} className="relative group">
                        <InlineEditableImage
                          src={img.src}
                          alt={img.alt}
                          onImageChange={(url) => updateDynamicField(`galleryImage${index + 1}`, url)}
                          isEditMode={isEditMode}
                          className="w-full aspect-video object-cover rounded-lg"
                        />
                        <button
                          onClick={() => deleteGalleryImage(index + 1)}
                          className="absolute top-2 right-2 bg-destructive text-destructive-foreground rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                          title="Delete image"
                        >
                          <X className="w-4 h-4" />
                        </button>
                        <div className="mt-2">
                          <InlineEditable
                            value={img.alt}
                            fieldName={`galleryImage${index + 1}Alt`}
                            onChange={(val) => updateDynamicField(`galleryImage${index + 1}Alt`, val)}
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
                      onClick={addGalleryImage}
                      className="flex items-center gap-2"
                    >
                      <Plus className="w-4 h-4" />
                      Add Gallery Image
                    </Button>
                  </div>
                </>
              ) : (
                <GallerySection images={galleryImages} />
              )}
            </div>
          </section>

          {/* Two Style Options Section */}
          <section className="section-padding bg-muted/30">
            <div className="container-custom">
              <div className="max-w-5xl mx-auto">
                <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4 text-center">
                  <InlineEditable
                    value={content.sectionHeading as string}
                    fieldName="sectionHeading"
                    onChange={(val) => updateField('sectionHeading', val)}
                    isEditMode={isEditMode}
                    as="span"
                  />
                </h2>
                <p className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
                  <InlineEditable
                    value={content.sectionSubheading as string}
                    fieldName="sectionSubheading"
                    type="textarea"
                    onChange={(val) => updateField('sectionSubheading', val)}
                    isEditMode={isEditMode}
                    as="span"
                  />
                </p>
                
                <div className="grid md:grid-cols-2 gap-8">
                  {/* Economy Shed Card */}
                  <div className="bg-card rounded-xl overflow-hidden border border-border shadow-lg">
                    <div className="relative">
                      <InlineEditableImage
                        src={content.card1Image as string}
                        alt={content.card1ImageAlt as string}
                        onImageChange={(url) => updateField('card1Image', url)}
                        isEditMode={isEditMode}
                        className="w-full aspect-video object-cover"
                      />
                    </div>
                    <div className="p-6">
                      <h3 className="font-heading text-2xl font-bold text-foreground mb-4">
                        <InlineEditable
                          value={content.card1Title as string}
                          fieldName="card1Title"
                          onChange={(val) => updateField('card1Title', val)}
                          isEditMode={isEditMode}
                          as="span"
                        />
                      </h3>
                      <p className="text-muted-foreground text-sm mb-4">
                        <InlineEditable
                          value={content.card1Description as string}
                          fieldName="card1Description"
                          type="textarea"
                          onChange={(val) => updateField('card1Description', val)}
                          isEditMode={isEditMode}
                          as="span"
                        />
                      </p>
                      <div className="space-y-3">
                        {card1Features.map((feature, index) => (
                          <div key={index} className="flex items-center gap-3 text-foreground">
                            <Check className="w-5 h-5 text-secondary flex-shrink-0" />
                            <span className="text-sm">
                              <InlineEditable
                                value={feature}
                                fieldName={`card1Feature${index + 1}`}
                                onChange={(val) => updateField(`card1Feature${index + 1}`, val)}
                                isEditMode={isEditMode}
                                as="span"
                              />
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Lofted Economy Shed Card */}
                  <div className="bg-card rounded-xl overflow-hidden border border-border shadow-lg">
                    <div className="relative">
                      <InlineEditableImage
                        src={content.card2Image as string}
                        alt={content.card2ImageAlt as string}
                        onImageChange={(url) => updateField('card2Image', url)}
                        isEditMode={isEditMode}
                        className="w-full aspect-video object-cover"
                      />
                    </div>
                    <div className="p-6">
                      <h3 className="font-heading text-2xl font-bold text-foreground mb-4">
                        <InlineEditable
                          value={content.card2Title as string}
                          fieldName="card2Title"
                          onChange={(val) => updateField('card2Title', val)}
                          isEditMode={isEditMode}
                          as="span"
                        />
                      </h3>
                      <p className="text-muted-foreground text-sm mb-4">
                        <InlineEditable
                          value={content.card2Description as string}
                          fieldName="card2Description"
                          type="textarea"
                          onChange={(val) => updateField('card2Description', val)}
                          isEditMode={isEditMode}
                          as="span"
                        />
                      </p>
                      <div className="space-y-3">
                        {card2Features.map((feature, index) => (
                          <div key={index} className="flex items-center gap-3 text-foreground">
                            <Check className="w-5 h-5 text-secondary flex-shrink-0" />
                            <span className="text-sm">
                              <InlineEditable
                                value={feature}
                                fieldName={`card2Feature${index + 1}`}
                                onChange={(val) => updateField(`card2Feature${index + 1}`, val)}
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

                <div className="mt-8 text-center">
                  <InlineEditableButton
                    text={content.designButtonText as string}
                    href={content.designButtonLink as string}
                    onTextChange={(val) => updateField('designButtonText', val)}
                    onHrefChange={(val) => updateField('designButtonLink', val)}
                    isEditMode={isEditMode}
                    isExternal={content.designButtonOpenInNewTab as boolean}
                    onExternalChange={(val) => updateField('designButtonOpenInNewTab', val)}
                  >
                    <a
                      href={content.designButtonLink as string}
                      target={content.designButtonOpenInNewTab ? '_blank' : undefined}
                      rel={content.designButtonOpenInNewTab ? 'noopener noreferrer' : undefined}
                    >
                      <Button variant="hero" size="xl">
                        {content.designButtonText}
                        <ArrowRight className="w-5 h-5" />
                      </Button>
                    </a>
                  </InlineEditableButton>
                </div>
              </div>
            </div>
          </section>

          {/* Value Proposition Section */}
          <section className="section-padding bg-background">
            <div className="container-custom">
              <div className="max-w-4xl mx-auto">
                <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground mb-6 text-center">
                  <InlineEditable
                    value={content.valueHeading as string}
                    fieldName="valueHeading"
                    onChange={(val) => updateField('valueHeading', val)}
                    isEditMode={isEditMode}
                    as="span"
                  />
                </h2>
                <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
                  {benefits.map((benefit) => (
                    <div key={benefit.key} className="flex items-center gap-3 bg-card p-4 rounded-lg border border-border/50">
                      <Check className="w-5 h-5 text-secondary flex-shrink-0" />
                      <span className="text-foreground font-medium">
                        <InlineEditable
                          value={benefit.value}
                          fieldName={benefit.key}
                          onChange={(val) => updateField(benefit.key, val)}
                          isEditMode={isEditMode}
                          as="span"
                        />
                      </span>
                    </div>
                  ))}
                </div>
                <div className="mt-8 p-6 bg-secondary/10 rounded-xl border border-secondary/20">
                  <p className="text-center text-muted-foreground">
                    <InlineEditable
                      value={content.valueNote as string}
                      fieldName="valueNote"
                      type="textarea"
                      onChange={(val) => updateField('valueNote', val)}
                      isEditMode={isEditMode}
                      as="span"
                    />
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Color & Material Options */}
          <section className="section-padding bg-muted/30">
            <div className="container-custom">
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-secondary mb-8">
                <InlineEditable
                  value={content.colorHeading as string}
                  fieldName="colorHeading"
                  onChange={(val) => updateField('colorHeading', val)}
                  isEditMode={isEditMode}
                  as="span"
                />
              </h2>
              
              <div className="bg-card rounded-lg border border-border overflow-hidden">
                <Accordion type="single" collapsible defaultValue="metal" className="w-full">
                  <AccordionItem value="metal" className="border-none">
                    <AccordionTrigger className="px-6 py-4 hover:no-underline">
                      <span className="font-heading text-lg font-bold text-secondary uppercase">
                        <InlineEditable
                          value={content.colorAccordionTitle as string}
                          fieldName="colorAccordionTitle"
                          onChange={(val) => updateField('colorAccordionTitle', val)}
                          isEditMode={isEditMode}
                          as="span"
                        />
                      </span>
                    </AccordionTrigger>
                    <AccordionContent className="px-6 pb-6">
                      <div className="flex flex-wrap gap-6 pt-4">
                        {sidingOptions.metal.map((swatch) => (
                          <ColorSwatch key={swatch.name} name={swatch.name} color={swatch.color} />
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
                  <InlineEditable
                    value={content.importantNote as string}
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

          {/* CTA */}
          <section className="section-padding bg-gradient-to-r from-secondary to-primary">
            <div className="container-custom text-center">
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
                <InlineEditable
                  value={content.ctaHeading as string}
                  fieldName="ctaHeading"
                  onChange={(val) => updateField('ctaHeading', val)}
                  isEditMode={isEditMode}
                  as="span"
                />
              </h2>
              <p className="text-primary-foreground/90 text-lg mb-8 max-w-2xl mx-auto">
                <InlineEditable
                  value={content.ctaDescription as string}
                  fieldName="ctaDescription"
                  type="textarea"
                  onChange={(val) => updateField('ctaDescription', val)}
                  isEditMode={isEditMode}
                  as="span"
                />
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <InlineEditableButton
                  text={content.ctaPrimaryButton as string}
                  href={content.ctaPrimaryButtonLink as string}
                  onTextChange={(val) => updateField('ctaPrimaryButton', val)}
                  onHrefChange={(val) => updateField('ctaPrimaryButtonLink', val)}
                  isEditMode={isEditMode}
                  isExternal={content.ctaPrimaryButtonOpenInNewTab as boolean}
                  onExternalChange={(val) => updateField('ctaPrimaryButtonOpenInNewTab', val)}
                >
                  <a
                    href={content.ctaPrimaryButtonLink as string}
                    target={content.ctaPrimaryButtonOpenInNewTab ? '_blank' : undefined}
                    rel={content.ctaPrimaryButtonOpenInNewTab ? 'noopener noreferrer' : undefined}
                  >
                    <Button variant="heroOutline" size="xl" className="bg-primary-foreground text-foreground hover:bg-primary-foreground/90">
                      {content.ctaPrimaryButton}
                      <ArrowRight className="w-5 h-5" />
                    </Button>
                  </a>
                </InlineEditableButton>
                <InlineEditableButton
                  text={content.ctaSecondaryButton as string}
                  href={content.ctaSecondaryButtonLink as string}
                  onTextChange={(val) => updateField('ctaSecondaryButton', val)}
                  onHrefChange={(val) => updateField('ctaSecondaryButtonLink', val)}
                  isEditMode={isEditMode}
                  isExternal={content.ctaSecondaryButtonOpenInNewTab as boolean}
                  onExternalChange={(val) => updateField('ctaSecondaryButtonOpenInNewTab', val)}
                >
                  <a
                    href={content.ctaSecondaryButtonLink as string}
                    target={content.ctaSecondaryButtonOpenInNewTab ? '_blank' : undefined}
                    rel={content.ctaSecondaryButtonOpenInNewTab ? 'noopener noreferrer' : undefined}
                  >
                    <Button variant="heroOutline" size="xl">
                      {content.ctaSecondaryButton}
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
        );
      }}
    </EditablePageWrapper>
  );
}
