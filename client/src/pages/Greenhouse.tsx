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
import { EditablePageWrapper } from '@/components/admin/EditablePageWrapper';
import { InlineEditable } from '@/components/admin/InlineEditable';
import InlineEditableButton from '@/components/admin/InlineEditableButton';
import InlineEditableImage from '@/components/admin/InlineEditableImage';

import greenhouse1 from '@/assets/greenhouse-1.jpg';
import greenhouse2 from '@/assets/greenhouse-2.jpg';
import greenhouse3 from '@/assets/greenhouse-3.jpg';
import greenhouse4 from '@/assets/greenhouse-4.jpg';

const sidingOptions = {
  paint: [
    { name: 'Barn Red', color: '#6B2C2C' },
    { name: 'Black', color: '#2D2D2D' },
    { name: 'Buckskin', color: '#B89B6A' },
    { name: 'Burnished Slate', color: '#5A6165' },
    { name: 'Clay', color: '#A69B8C' },
    { name: 'Dark Brown', color: '#4A3728' },
    { name: 'GP Gray', color: '#8B8B8B' },
    { name: 'GP Tan', color: '#9B8B6B' },
    { name: 'Gray', color: '#7A7A7A' },
    { name: 'Shadow', color: '#C4BBA8' },
    { name: 'Martin Creme', color: '#D4C9A8' },
    { name: 'Mountain Red', color: '#8B3A3A' },
    { name: 'Navy Blue', color: '#2C4A6B' },
    { name: 'Quaker Tan', color: '#8B7355' },
    { name: 'Riehl Blue', color: '#4A6B7A' },
    { name: 'Riehl Green', color: '#3A5A3A' },
    { name: 'Wedgwood Blue', color: '#6A8A9A' },
    { name: 'White', color: '#E8E8E0' },
  ],
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

interface GreenhouseContent {
  metaTitle: string;
  metaDescription: string;
  title: string;
  titleHighlight: string;
  description: string;
  subtitle: string;
  heroImage: string;
  heroImageAlt: string;
  heroButton1Text: string;
  heroButton1Link: string;
  heroButton1OpenInNewTab: boolean;
  heroButton2Text: string;
  heroButton2Link: string;
  heroButton2OpenInNewTab: boolean;
  galleryImage1: string;
  galleryImage1Alt: string;
  galleryImage2: string;
  galleryImage2Alt: string;
  galleryImage3: string;
  galleryImage3Alt: string;
  galleryImage4: string;
  galleryImage4Alt: string;
  featuresHeading: string;
  featuresHighlight: string;
  featuresDescription: string;
  featureImage: string;
  featureImageAlt: string;
  featureBadge: string;
  feature1: string;
  feature2: string;
  feature3: string;
  feature4: string;
  feature5: string;
  feature6: string;
  feature7: string;
  feature8: string;
  designButtonText: string;
  designButtonLink: string;
  designButtonOpenInNewTab: boolean;
  usesHeading: string;
  use1: string;
  use2: string;
  use3: string;
  use4: string;
  use5: string;
  use6: string;
  use7: string;
  use8: string;
  use9: string;
  colorHeading: string;
  ctaHeading: string;
  ctaDescription: string;
  ctaPrimaryButton: string;
  ctaPrimaryButtonLink: string;
  ctaPrimaryButtonOpenInNewTab: boolean;
  ctaSecondaryButton: string;
  ctaSecondaryButtonLink: string;
  ctaSecondaryButtonOpenInNewTab: boolean;
  [key: string]: string | boolean;
}

export const defaultContent: GreenhouseContent = {
  metaTitle: 'Greenhouse | Summit Portable Buildings',
  metaDescription: 'Summit Buildings Greenhouses feature treated decking floors, exhaust fans, thermostat controllers, shelving, potting benches, and electrical packages. Perfect for year-round growing.',
  title: '',
  titleHighlight: 'GREENHOUSE',
  description: 'Purpose-built for serious gardeners. Our greenhouses come equipped with ventilation systems, electrical packages, and durable construction for year-round growing success.',
  subtitle: 'Custom Sizes Available',
  heroImage: greenhouse1,
  heroImageAlt: 'Summit Greenhouse',
  heroButton1Text: 'Design Your Greenhouse',
  heroButton1Link: 'https://summitbuildings.shedpro.co/',
  heroButton1OpenInNewTab: true,
  heroButton2Text: 'Browse Inventory',
  heroButton2Link: '/inventory',
  heroButton2OpenInNewTab: false,
  galleryImage1: greenhouse1,
  galleryImage1Alt: 'Summit Greenhouse - Interior view with plants',
  galleryImage2: greenhouse2,
  galleryImage2Alt: 'Summit Greenhouse - Exterior front view',
  galleryImage3: greenhouse3,
  galleryImage3Alt: 'Summit Greenhouse - Side angle view',
  galleryImage4: greenhouse4,
  galleryImage4Alt: 'Summit Greenhouse - Full exterior view',
  featuresHeading: 'Built for',
  featuresHighlight: 'Year-Round Growing',
  featuresDescription: 'Our greenhouses come fully equipped with everything you need for successful growing, from ventilation systems to electrical packages and durable flooring.',
  featureImage: greenhouse2,
  featureImageAlt: 'Greenhouse Interior with Shelving',
  featureBadge: 'Fully Equipped',
  feature1: 'Treated 5/4" Decking Floor',
  feature2: '12" Shutter w/ Exhaust Fan & Cord (Up to 300 sq. ft)',
  feature3: '12" Intake Shutter & Motor Kit for up to 300 sq. ft',
  feature4: 'Shutter / Fan Thermostat Controller plus connection',
  feature5: '24" Wide Shelving w/ Wire Mesh',
  feature6: '24" Wide Potting Soil Bench',
  feature7: '36" x 72" Greenhouse Door w/ T Handle Lock',
  feature8: 'Electrical Package (Includes 100 amp box w/ 2 outlets & two Standard Light Sockets w/ Switch)',
  designButtonText: 'Design Yours Now',
  designButtonLink: 'https://summitbuildings.shedpro.co/',
  designButtonOpenInNewTab: true,
  usesHeading: 'Perfect For Any Growing Need',
  use1: 'Year-Round Vegetable Growing',
  use2: 'Flower & Plant Nursery',
  use3: 'Seed Starting',
  use4: 'Tropical Plant Storage',
  use5: 'Herb Garden',
  use6: 'Hobby Greenhouse',
  use7: 'Commercial Growing',
  use8: 'Plant Propagation',
  use9: 'Winter Plant Protection',
  colorHeading: 'COLOR AND MATERIAL OPTIONS',
  ctaHeading: 'Ready to Start Growing?',
  ctaDescription: 'Design your perfect greenhouse today or call us to discuss your needs.',
  ctaPrimaryButton: 'Design Your Greenhouse',
  ctaPrimaryButtonLink: 'https://summitbuildings.shedpro.co/',
  ctaPrimaryButtonOpenInNewTab: true,
  ctaSecondaryButton: 'Call (573) 747-4700',
  ctaSecondaryButtonLink: 'tel:5737474700',
  ctaSecondaryButtonOpenInNewTab: false,
};

const Greenhouse = () => {
  return (
    <EditablePageWrapper slug="greenhouse" defaultContent={defaultContent}>
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

        const features = [
          { key: 'feature1', value: content.feature1 as string },
          { key: 'feature2', value: content.feature2 as string },
          { key: 'feature3', value: content.feature3 as string },
          { key: 'feature4', value: content.feature4 as string },
          { key: 'feature5', value: content.feature5 as string },
          { key: 'feature6', value: content.feature6 as string },
          { key: 'feature7', value: content.feature7 as string },
          { key: 'feature8', value: content.feature8 as string },
        ];

        const uses = [
          { key: 'use1', value: content.use1 as string },
          { key: 'use2', value: content.use2 as string },
          { key: 'use3', value: content.use3 as string },
          { key: 'use4', value: content.use4 as string },
          { key: 'use5', value: content.use5 as string },
          { key: 'use6', value: content.use6 as string },
          { key: 'use7', value: content.use7 as string },
          { key: 'use8', value: content.use8 as string },
          { key: 'use9', value: content.use9 as string },
        ];

        return (
        <>
          <Helmet>
            <title>{content.metaTitle}</title>
            <meta name="description" content={content.metaDescription as string} />
            <meta property="og:title" content={content.metaTitle as string} />
            <meta property="og:description" content={content.metaDescription as string} />
            <link rel="canonical" href="https://summitbuildings.com/types/greenhouse" />
          </Helmet>

          <div className="min-h-screen">
            <Header />
        
        <main>
          <div className="relative">
            <ProductHero
              backPath={{ 
                defaultPath: '/types', 
                defaultLabel: '← Back to All Models' 
              }}
              title={content.title as string}
              titleHighlight={content.titleHighlight as string}
              titlePosition="only"
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

          {/* Greenhouse Features */}
          <section className="section-padding bg-muted/30">
            <div className="container-custom">
              <div className="max-w-4xl mx-auto">
                <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4 text-center">
                  <InlineEditable
                    value={content.featuresHeading as string}
                    fieldName="featuresHeading"
                    onChange={(val) => updateField('featuresHeading', val)}
                    isEditMode={isEditMode}
                    as="span"
                  />{' '}
                  <span className="text-secondary">
                    <InlineEditable
                      value={content.featuresHighlight as string}
                      fieldName="featuresHighlight"
                      onChange={(val) => updateField('featuresHighlight', val)}
                      isEditMode={isEditMode}
                      as="span"
                    />
                  </span>
                </h2>
                <p className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
                  <InlineEditable
                    value={content.featuresDescription as string}
                    fieldName="featuresDescription"
                    type="textarea"
                    onChange={(val) => updateField('featuresDescription', val)}
                    isEditMode={isEditMode}
                    as="span"
                  />
                </p>
                
                <div className="grid md:grid-cols-2 gap-8 items-center">
                  <div className="relative">
                    <InlineEditableImage
                      src={content.featureImage as string}
                      alt={content.featureImageAlt as string}
                      onImageChange={(url) => updateField('featureImage', url)}
                      isEditMode={isEditMode}
                      className="rounded-xl shadow-lg w-full"
                    />
                    <div className="absolute -bottom-3 -right-3 bg-secondary text-primary-foreground px-4 py-2 rounded-lg font-heading text-sm">
                      <InlineEditable
                        value={content.featureBadge as string}
                        fieldName="featureBadge"
                        onChange={(val) => updateField('featureBadge', val)}
                        isEditMode={isEditMode}
                        as="span"
                      />
                    </div>
                    {isEditMode && (
                      <div className="mt-4">
                        <InlineEditable
                          value={content.featureImageAlt as string}
                          fieldName="featureImageAlt"
                          onChange={(val) => updateField('featureImageAlt', val)}
                          isEditMode={isEditMode}
                          as="span"
                          className="text-xs text-muted-foreground"
                        />
                      </div>
                    )}
                  </div>
                  
                  <div className="bg-card rounded-xl p-8 border border-border shadow-lg">
                    <h3 className="font-heading text-2xl font-bold text-foreground mb-6">
                      Standard Features
                    </h3>
                    <div className="space-y-3">
                      {features.map((feature) => (
                        <div key={feature.key} className="flex items-center gap-3 text-foreground">
                          <Check className="w-5 h-5 text-secondary flex-shrink-0" />
                          <span>
                            <InlineEditable
                              value={feature.value}
                              fieldName={feature.key}
                              onChange={(val) => updateField(feature.key, val)}
                              isEditMode={isEditMode}
                              as="span"
                            />
                          </span>
                        </div>
                      ))}
                    </div>
                    <div className="mt-6">
                      <InlineEditableButton
                        text={content.designButtonText as string}
                        href={content.designButtonLink as string}
                        isExternal={content.designButtonOpenInNewTab as boolean}
                        onTextChange={(val) => updateField('designButtonText', val)}
                        onHrefChange={(val) => updateField('designButtonLink', val)}
                        onExternalChange={(val) => updateField('designButtonOpenInNewTab', val)}
                        isEditMode={isEditMode}
                      >
                        <a
                          href={content.designButtonLink as string}
                          target={content.designButtonOpenInNewTab ? '_blank' : undefined}
                          rel={content.designButtonOpenInNewTab ? 'noopener noreferrer' : undefined}
                        >
                          <Button variant="hero" className="w-full">
                            {content.designButtonText}
                            <ArrowRight className="w-4 h-4" />
                          </Button>
                        </a>
                      </InlineEditableButton>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Ideal Uses Section */}
          <section className="section-padding bg-background">
            <div className="container-custom">
              <div className="max-w-4xl mx-auto">
                <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground mb-6 text-center">
                  <InlineEditable
                    value={content.usesHeading as string}
                    fieldName="usesHeading"
                    onChange={(val) => updateField('usesHeading', val)}
                    isEditMode={isEditMode}
                    as="span"
                  />
                </h2>
                <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
                  {uses.map((use) => (
                    <div key={use.key} className="flex items-center gap-3 bg-card p-4 rounded-lg border border-border/50">
                      <Check className="w-5 h-5 text-secondary flex-shrink-0" />
                      <span className="text-foreground font-medium">
                        <InlineEditable
                          value={use.value}
                          fieldName={use.key}
                          onChange={(val) => updateField(use.key, val)}
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
                <Accordion type="single" collapsible defaultValue="paint" className="w-full">
                  <AccordionItem value="paint" className="border-b border-border">
                    <AccordionTrigger className="px-6 py-4 hover:no-underline">
                      <span className="font-heading text-lg font-bold text-secondary uppercase">
                        Paint Siding Options
                      </span>
                    </AccordionTrigger>
                    <AccordionContent className="px-6 pb-6">
                      <div className="flex flex-wrap gap-6 pt-4">
                        {sidingOptions.paint.map((swatch) => (
                          <ColorSwatch key={swatch.name} name={swatch.name} color={swatch.color} />
                        ))}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="metal" className="border-b-0">
                    <AccordionTrigger className="px-6 py-4 hover:no-underline">
                      <span className="font-heading text-lg font-bold text-secondary uppercase">
                        Metal Siding / Roof Options
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

          {/* Final CTA */}
          <section className="section-padding bg-navy text-center">
            <div className="container-custom max-w-3xl">
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-primary-foreground mb-6">
                <InlineEditable
                  value={content.ctaHeading as string}
                  fieldName="ctaHeading"
                  onChange={(val) => updateField('ctaHeading', val)}
                  isEditMode={isEditMode}
                  as="span"
                />
              </h2>
              <p className="text-primary-foreground/80 text-lg mb-8">
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
                    <Button variant="hero" size="xl">
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
};

export default Greenhouse;
