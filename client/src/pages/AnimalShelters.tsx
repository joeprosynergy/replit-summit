import { Helmet } from 'react-helmet-async';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ProductHero from '@/components/ProductHero';
import { Button } from '@/components/ui/button';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { 
  Check,
  ArrowRight,
} from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { EditablePageWrapper } from '@/components/admin/EditablePageWrapper';
import { InlineEditable } from '@/components/admin/InlineEditable';
import InlineEditableButton from '@/components/admin/InlineEditableButton';
import InlineEditableImage from '@/components/admin/InlineEditableImage';

import animalShelter1 from '@/assets/animal-shelter-1.jpg';
import animalShelter2 from '@/assets/animal-shelter-2.jpg';
import dogKennel1 from '@/assets/dog-kennel-1.jpg';
import dogKennel2 from '@/assets/dog-kennel-2.jpg';
import chickenCoop1 from '@/assets/chicken-coop-1.jpg';
import chickenCoop2 from '@/assets/chicken-coop-2.jpg';

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

interface AnimalSheltersContent {
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
  shelter1Name: string;
  shelter1Tagline: string;
  shelter1Description: string;
  shelter1Image1: string;
  shelter1Image1Alt: string;
  shelter1Image2: string;
  shelter1Image2Alt: string;
  shelter1Feature1: string;
  shelter1Feature2: string;
  shelter1Feature3: string;
  shelter1Feature4: string;
  shelter1Feature5: string;
  shelter1Feature6: string;
  shelter1Note: string;
  shelter1ButtonText: string;
  shelter1ButtonLink: string;
  shelter1ButtonOpenInNewTab: boolean;
  shelter2Name: string;
  shelter2Tagline: string;
  shelter2Description: string;
  shelter2Image1: string;
  shelter2Image1Alt: string;
  shelter2Image2: string;
  shelter2Image2Alt: string;
  shelter2Feature1: string;
  shelter2Feature2: string;
  shelter2Feature3: string;
  shelter2Feature4: string;
  shelter2Feature5: string;
  shelter2Feature6: string;
  shelter2Feature7: string;
  shelter2Feature8: string;
  shelter2ButtonText: string;
  shelter2ButtonLink: string;
  shelter2ButtonOpenInNewTab: boolean;
  shelter3Name: string;
  shelter3Tagline: string;
  shelter3Description: string;
  shelter3Image1: string;
  shelter3Image1Alt: string;
  shelter3Image2: string;
  shelter3Image2Alt: string;
  shelter3Feature1: string;
  shelter3Feature2: string;
  shelter3Feature3: string;
  shelter3Feature4: string;
  shelter3Feature5: string;
  shelter3Feature6: string;
  shelter3Note: string;
  shelter3ButtonText: string;
  shelter3ButtonLink: string;
  shelter3ButtonOpenInNewTab: boolean;
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

const defaultContent: AnimalSheltersContent = {
  metaTitle: 'Animal Shelters, Dog Kennels & Chicken Coops | Summit Portable Buildings',
  metaDescription: 'Quality animal housing solutions from Summit Buildings. Dog kennels, chicken coops, and animal shelters built with durable materials for comfort, safety, and security.',
  title: 'ANIMAL',
  titleHighlight: 'SHELTERS',
  description: 'Quality housing solutions for your animals. From dog kennels to chicken coops to full animal shelters, we build durable, comfortable, and secure structures.',
  subtitle: 'Custom Sizes Available',
  heroImage: dogKennel1,
  heroImageAlt: 'Summit Dog Kennel',
  heroButton1Text: 'Design Your Shelter',
  heroButton1Link: 'https://summitbuildings.shedpro.co/',
  heroButton1OpenInNewTab: true,
  heroButton2Text: 'Browse Inventory',
  heroButton2Link: '/inventory',
  heroButton2OpenInNewTab: false,
  shelter1Name: 'Animal Shelter',
  shelter1Tagline: 'Safe & Comfortable Housing for Animals',
  shelter1Description: 'The Animal Shelter from Summit Buildings is a well-designed, purpose-built facility dedicated to the care and housing of animals. This shelter focuses on providing a safe, comfortable environment for your animals with spacious areas and easy access. The structure incorporates durable, weather-resistant materials to minimize maintenance and maximize protection.',
  shelter1Image1: animalShelter1,
  shelter1Image1Alt: 'Animal Shelter exterior view',
  shelter1Image2: animalShelter2,
  shelter1Image2Alt: 'Animal Shelter interior view',
  shelter1Feature1: '11 Lite Walk-In Door',
  shelter1Feature2: 'Durable, weather-resistant construction',
  shelter1Feature3: 'Spacious interior design',
  shelter1Feature4: 'Easy-to-clean surfaces',
  shelter1Feature5: 'Secure fencing options',
  shelter1Feature6: 'Customizable layout',
  shelter1Note: '*Please note that windows and moisture barriers are not available.',
  shelter1ButtonText: 'Design Your Animal Shelter',
  shelter1ButtonLink: 'https://summitbuildings.shedpro.co/',
  shelter1ButtonOpenInNewTab: true,
  shelter2Name: 'Dog Kennel',
  shelter2Tagline: 'Comfort, Safety & Security for Your Pets',
  shelter2Description: 'The Dog Kennels from Summit Buildings are expertly crafted structures designed to provide comfort, safety, and security for pets. These kennels are built with high-quality, durable materials to withstand the elements, ensuring that dogs are protected from the weather while enjoying a spacious, well-ventilated environment.',
  shelter2Image1: dogKennel1,
  shelter2Image1Alt: 'Dog Kennel exterior view',
  shelter2Image2: dogKennel2,
  shelter2Image2Alt: 'Dog Kennel with runs',
  shelter2Feature1: "6' x 6' Walls",
  shelter2Feature2: '2 Runs',
  shelter2Feature3: '36" Wood Door',
  shelter2Feature4: '(1) 2 x 3 Single Pane Window',
  shelter2Feature5: 'Composite Decking on Exterior Runs',
  shelter2Feature6: 'Gate Inside and Outside of Run',
  shelter2Feature7: 'Secure, predator-proof fencing',
  shelter2Feature8: 'Easy-to-clean surfaces',
  shelter2ButtonText: 'Design Your Dog Kennel',
  shelter2ButtonLink: 'https://summitbuildings.shedpro.co/',
  shelter2ButtonOpenInNewTab: true,
  shelter3Name: 'Chicken Coop',
  shelter3Tagline: 'Safe & Secure Housing for Your Flock',
  shelter3Description: 'The Chicken Coops from Summit Buildings are thoughtfully designed to provide chickens with a safe, comfortable, and secure environment. Built with high-quality, weather-resistant materials, these coops offer excellent protection from the elements, predators, and harsh conditions.',
  shelter3Image1: chickenCoop1,
  shelter3Image1Alt: 'Chicken Coop exterior view',
  shelter3Image2: chickenCoop2,
  shelter3Image2Alt: 'Chicken Coop with nesting boxes',
  shelter3Feature1: '3\' 8" (44") Walls',
  shelter3Feature2: '30" Wood Door w/ Keys',
  shelter3Feature3: '2 - 18" x 27" Single Pane Windows',
  shelter3Feature4: '1 - 12" x 16" Chicken Door',
  shelter3Feature5: '4 Nesting boxes w/ outside access door',
  shelter3Feature6: '1 box serves approximately 3-5 chickens',
  shelter3Note: 'Additional nesting boxes may be added for additional cost.',
  shelter3ButtonText: 'Design Your Chicken Coop',
  shelter3ButtonLink: 'https://summitbuildings.shedpro.co/',
  shelter3ButtonOpenInNewTab: true,
  colorHeading: 'COLOR AND MATERIAL OPTIONS',
  ctaHeading: 'Ready to House Your Animals?',
  ctaDescription: 'Design your perfect animal shelter today or call us to discuss your needs.',
  ctaPrimaryButton: 'Design Your Shelter',
  ctaPrimaryButtonLink: 'https://summitbuildings.shedpro.co/',
  ctaPrimaryButtonOpenInNewTab: true,
  ctaSecondaryButton: 'Call (573) 747-4700',
  ctaSecondaryButtonLink: 'tel:5737474700',
  ctaSecondaryButtonOpenInNewTab: false,
};

const AnimalShelters = () => {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const element = document.getElementById(location.hash.substring(1));
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    }
  }, [location]);

  return (
    <EditablePageWrapper slug="animal-shelters" defaultContent={defaultContent}>
      {({ content, isEditMode, updateField }) => {
        const shelter1Features = [
          { key: 'shelter1Feature1', value: content.shelter1Feature1 as string },
          { key: 'shelter1Feature2', value: content.shelter1Feature2 as string },
          { key: 'shelter1Feature3', value: content.shelter1Feature3 as string },
          { key: 'shelter1Feature4', value: content.shelter1Feature4 as string },
          { key: 'shelter1Feature5', value: content.shelter1Feature5 as string },
          { key: 'shelter1Feature6', value: content.shelter1Feature6 as string },
        ];

        const shelter2Features = [
          { key: 'shelter2Feature1', value: content.shelter2Feature1 as string },
          { key: 'shelter2Feature2', value: content.shelter2Feature2 as string },
          { key: 'shelter2Feature3', value: content.shelter2Feature3 as string },
          { key: 'shelter2Feature4', value: content.shelter2Feature4 as string },
          { key: 'shelter2Feature5', value: content.shelter2Feature5 as string },
          { key: 'shelter2Feature6', value: content.shelter2Feature6 as string },
          { key: 'shelter2Feature7', value: content.shelter2Feature7 as string },
          { key: 'shelter2Feature8', value: content.shelter2Feature8 as string },
        ];

        const shelter3Features = [
          { key: 'shelter3Feature1', value: content.shelter3Feature1 as string },
          { key: 'shelter3Feature2', value: content.shelter3Feature2 as string },
          { key: 'shelter3Feature3', value: content.shelter3Feature3 as string },
          { key: 'shelter3Feature4', value: content.shelter3Feature4 as string },
          { key: 'shelter3Feature5', value: content.shelter3Feature5 as string },
          { key: 'shelter3Feature6', value: content.shelter3Feature6 as string },
        ];

        return (
        <>
          <Helmet>
            <title>{content.metaTitle}</title>
            <meta name="description" content={content.metaDescription as string} />
            <meta property="og:title" content={content.metaTitle as string} />
            <meta property="og:description" content={content.metaDescription as string} />
            <link rel="canonical" href="https://summitbuildings.com/types/animal-shelters" />
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

          {/* Quick Nav */}
          <section className="py-8 bg-muted/50 border-b border-border">
            <div className="container-custom">
              <div className="flex flex-wrap justify-center gap-4">
                <a
                  href="#animal-shelter"
                  className="px-6 py-3 bg-card rounded-lg border border-border hover:border-secondary hover:bg-secondary/10 transition-all font-medium text-foreground"
                >
                  <InlineEditable
                    value={content.shelter1Name as string}
                    fieldName="shelter1Name"
                    onChange={(val) => updateField('shelter1Name', val)}
                    isEditMode={isEditMode}
                    as="span"
                  />
                </a>
                <a
                  href="#dog-kennel"
                  className="px-6 py-3 bg-card rounded-lg border border-border hover:border-secondary hover:bg-secondary/10 transition-all font-medium text-foreground"
                >
                  <InlineEditable
                    value={content.shelter2Name as string}
                    fieldName="shelter2Name"
                    onChange={(val) => updateField('shelter2Name', val)}
                    isEditMode={isEditMode}
                    as="span"
                  />
                </a>
                <a
                  href="#chicken-coop"
                  className="px-6 py-3 bg-card rounded-lg border border-border hover:border-secondary hover:bg-secondary/10 transition-all font-medium text-foreground"
                >
                  <InlineEditable
                    value={content.shelter3Name as string}
                    fieldName="shelter3Name"
                    onChange={(val) => updateField('shelter3Name', val)}
                    isEditMode={isEditMode}
                    as="span"
                  />
                </a>
              </div>
            </div>
          </section>

          {/* Animal Shelter Section */}
          <section id="animal-shelter" className="section-padding bg-background">
            <div className="container-custom">
              <div className="max-w-6xl mx-auto">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                  <div>
                    <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-2">
                      <InlineEditable
                        value={content.shelter1Name as string}
                        fieldName="shelter1Name"
                        onChange={(val) => updateField('shelter1Name', val)}
                        isEditMode={isEditMode}
                        as="span"
                      />
                    </h2>
                    <p className="text-secondary font-heading text-lg mb-4">
                      <InlineEditable
                        value={content.shelter1Tagline as string}
                        fieldName="shelter1Tagline"
                        onChange={(val) => updateField('shelter1Tagline', val)}
                        isEditMode={isEditMode}
                        as="span"
                      />
                    </p>
                    <p className="text-muted-foreground mb-6">
                      <InlineEditable
                        value={content.shelter1Description as string}
                        fieldName="shelter1Description"
                        type="textarea"
                        onChange={(val) => updateField('shelter1Description', val)}
                        isEditMode={isEditMode}
                        as="span"
                      />
                    </p>
                    
                    <div className="bg-card rounded-xl p-6 border border-border shadow-sm mb-6">
                      <h3 className="font-heading text-xl font-bold text-foreground mb-4">
                        Standard Features
                      </h3>
                      <div className="space-y-2">
                        {shelter1Features.map((feature) => (
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
                      <p className="text-xs text-muted-foreground italic mt-4">
                        <InlineEditable
                          value={content.shelter1Note as string}
                          fieldName="shelter1Note"
                          onChange={(val) => updateField('shelter1Note', val)}
                          isEditMode={isEditMode}
                          as="span"
                        />
                      </p>
                    </div>
                    
                    <InlineEditableButton
                      text={content.shelter1ButtonText as string}
                      href={content.shelter1ButtonLink as string}
                      isExternal={content.shelter1ButtonOpenInNewTab as boolean}
                      onTextChange={(val) => updateField('shelter1ButtonText', val)}
                      onHrefChange={(val) => updateField('shelter1ButtonLink', val)}
                      onExternalChange={(val) => updateField('shelter1ButtonOpenInNewTab', val)}
                      isEditMode={isEditMode}
                    >
                      <a
                        href={content.shelter1ButtonLink as string}
                        target={content.shelter1ButtonOpenInNewTab ? '_blank' : undefined}
                        rel={content.shelter1ButtonOpenInNewTab ? 'noopener noreferrer' : undefined}
                      >
                        <Button variant="hero">
                          {content.shelter1ButtonText}
                          <ArrowRight className="w-4 h-4" />
                        </Button>
                      </a>
                    </InlineEditableButton>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="relative">
                      {isEditMode ? (
                        <>
                          <InlineEditableImage
                            src={content.shelter1Image1 as string}
                            alt={content.shelter1Image1Alt as string}
                            onImageChange={(url) => updateField('shelter1Image1', url)}
                            isEditMode={isEditMode}
                            className="rounded-xl shadow-lg w-full aspect-square object-cover"
                          />
                          <div className="mt-2">
                            <InlineEditable
                              value={content.shelter1Image1Alt as string}
                              fieldName="shelter1Image1Alt"
                              onChange={(val) => updateField('shelter1Image1Alt', val)}
                              isEditMode={isEditMode}
                              as="span"
                              className="text-xs text-muted-foreground"
                            />
                          </div>
                        </>
                      ) : (
                        <img
                          src={content.shelter1Image1 as string}
                          alt={content.shelter1Image1Alt as string}
                          className="rounded-xl shadow-lg w-full aspect-square object-cover"
                        />
                      )}
                    </div>
                    <div className="relative">
                      {isEditMode ? (
                        <>
                          <InlineEditableImage
                            src={content.shelter1Image2 as string}
                            alt={content.shelter1Image2Alt as string}
                            onImageChange={(url) => updateField('shelter1Image2', url)}
                            isEditMode={isEditMode}
                            className="rounded-xl shadow-lg w-full aspect-square object-cover"
                          />
                          <div className="mt-2">
                            <InlineEditable
                              value={content.shelter1Image2Alt as string}
                              fieldName="shelter1Image2Alt"
                              onChange={(val) => updateField('shelter1Image2Alt', val)}
                              isEditMode={isEditMode}
                              as="span"
                              className="text-xs text-muted-foreground"
                            />
                          </div>
                        </>
                      ) : (
                        <img
                          src={content.shelter1Image2 as string}
                          alt={content.shelter1Image2Alt as string}
                          className="rounded-xl shadow-lg w-full aspect-square object-cover"
                        />
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Dog Kennel Section */}
          <section id="dog-kennel" className="section-padding bg-muted/30">
            <div className="container-custom">
              <div className="max-w-6xl mx-auto">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                  <div className="lg:order-2">
                    <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-2">
                      <InlineEditable
                        value={content.shelter2Name as string}
                        fieldName="shelter2Name"
                        onChange={(val) => updateField('shelter2Name', val)}
                        isEditMode={isEditMode}
                        as="span"
                      />
                    </h2>
                    <p className="text-secondary font-heading text-lg mb-4">
                      <InlineEditable
                        value={content.shelter2Tagline as string}
                        fieldName="shelter2Tagline"
                        onChange={(val) => updateField('shelter2Tagline', val)}
                        isEditMode={isEditMode}
                        as="span"
                      />
                    </p>
                    <p className="text-muted-foreground mb-6">
                      <InlineEditable
                        value={content.shelter2Description as string}
                        fieldName="shelter2Description"
                        type="textarea"
                        onChange={(val) => updateField('shelter2Description', val)}
                        isEditMode={isEditMode}
                        as="span"
                      />
                    </p>
                    
                    <div className="bg-card rounded-xl p-6 border border-border shadow-sm mb-6">
                      <h3 className="font-heading text-xl font-bold text-foreground mb-4">
                        Standard Features
                      </h3>
                      <div className="space-y-2">
                        {shelter2Features.map((feature) => (
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
                    </div>
                    
                    <InlineEditableButton
                      text={content.shelter2ButtonText as string}
                      href={content.shelter2ButtonLink as string}
                      isExternal={content.shelter2ButtonOpenInNewTab as boolean}
                      onTextChange={(val) => updateField('shelter2ButtonText', val)}
                      onHrefChange={(val) => updateField('shelter2ButtonLink', val)}
                      onExternalChange={(val) => updateField('shelter2ButtonOpenInNewTab', val)}
                      isEditMode={isEditMode}
                    >
                      <a
                        href={content.shelter2ButtonLink as string}
                        target={content.shelter2ButtonOpenInNewTab ? '_blank' : undefined}
                        rel={content.shelter2ButtonOpenInNewTab ? 'noopener noreferrer' : undefined}
                      >
                        <Button variant="hero">
                          {content.shelter2ButtonText}
                          <ArrowRight className="w-4 h-4" />
                        </Button>
                      </a>
                    </InlineEditableButton>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 lg:order-1">
                    <div className="relative">
                      {isEditMode ? (
                        <>
                          <InlineEditableImage
                            src={content.shelter2Image1 as string}
                            alt={content.shelter2Image1Alt as string}
                            onImageChange={(url) => updateField('shelter2Image1', url)}
                            isEditMode={isEditMode}
                            className="rounded-xl shadow-lg w-full aspect-square object-cover"
                          />
                          <div className="mt-2">
                            <InlineEditable
                              value={content.shelter2Image1Alt as string}
                              fieldName="shelter2Image1Alt"
                              onChange={(val) => updateField('shelter2Image1Alt', val)}
                              isEditMode={isEditMode}
                              as="span"
                              className="text-xs text-muted-foreground"
                            />
                          </div>
                        </>
                      ) : (
                        <img
                          src={content.shelter2Image1 as string}
                          alt={content.shelter2Image1Alt as string}
                          className="rounded-xl shadow-lg w-full aspect-square object-cover"
                        />
                      )}
                    </div>
                    <div className="relative">
                      {isEditMode ? (
                        <>
                          <InlineEditableImage
                            src={content.shelter2Image2 as string}
                            alt={content.shelter2Image2Alt as string}
                            onImageChange={(url) => updateField('shelter2Image2', url)}
                            isEditMode={isEditMode}
                            className="rounded-xl shadow-lg w-full aspect-square object-cover"
                          />
                          <div className="mt-2">
                            <InlineEditable
                              value={content.shelter2Image2Alt as string}
                              fieldName="shelter2Image2Alt"
                              onChange={(val) => updateField('shelter2Image2Alt', val)}
                              isEditMode={isEditMode}
                              as="span"
                              className="text-xs text-muted-foreground"
                            />
                          </div>
                        </>
                      ) : (
                        <img
                          src={content.shelter2Image2 as string}
                          alt={content.shelter2Image2Alt as string}
                          className="rounded-xl shadow-lg w-full aspect-square object-cover"
                        />
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Chicken Coop Section */}
          <section id="chicken-coop" className="section-padding bg-background">
            <div className="container-custom">
              <div className="max-w-6xl mx-auto">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                  <div>
                    <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-2">
                      <InlineEditable
                        value={content.shelter3Name as string}
                        fieldName="shelter3Name"
                        onChange={(val) => updateField('shelter3Name', val)}
                        isEditMode={isEditMode}
                        as="span"
                      />
                    </h2>
                    <p className="text-secondary font-heading text-lg mb-4">
                      <InlineEditable
                        value={content.shelter3Tagline as string}
                        fieldName="shelter3Tagline"
                        onChange={(val) => updateField('shelter3Tagline', val)}
                        isEditMode={isEditMode}
                        as="span"
                      />
                    </p>
                    <p className="text-muted-foreground mb-6">
                      <InlineEditable
                        value={content.shelter3Description as string}
                        fieldName="shelter3Description"
                        type="textarea"
                        onChange={(val) => updateField('shelter3Description', val)}
                        isEditMode={isEditMode}
                        as="span"
                      />
                    </p>
                    
                    <div className="bg-card rounded-xl p-6 border border-border shadow-sm mb-6">
                      <h3 className="font-heading text-xl font-bold text-foreground mb-4">
                        Standard Features
                      </h3>
                      <div className="space-y-2">
                        {shelter3Features.map((feature) => (
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
                      <p className="text-xs text-muted-foreground italic mt-4">
                        <InlineEditable
                          value={content.shelter3Note as string}
                          fieldName="shelter3Note"
                          onChange={(val) => updateField('shelter3Note', val)}
                          isEditMode={isEditMode}
                          as="span"
                        />
                      </p>
                    </div>
                    
                    <InlineEditableButton
                      text={content.shelter3ButtonText as string}
                      href={content.shelter3ButtonLink as string}
                      isExternal={content.shelter3ButtonOpenInNewTab as boolean}
                      onTextChange={(val) => updateField('shelter3ButtonText', val)}
                      onHrefChange={(val) => updateField('shelter3ButtonLink', val)}
                      onExternalChange={(val) => updateField('shelter3ButtonOpenInNewTab', val)}
                      isEditMode={isEditMode}
                    >
                      <a
                        href={content.shelter3ButtonLink as string}
                        target={content.shelter3ButtonOpenInNewTab ? '_blank' : undefined}
                        rel={content.shelter3ButtonOpenInNewTab ? 'noopener noreferrer' : undefined}
                      >
                        <Button variant="hero">
                          {content.shelter3ButtonText}
                          <ArrowRight className="w-4 h-4" />
                        </Button>
                      </a>
                    </InlineEditableButton>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="relative">
                      {isEditMode ? (
                        <>
                          <InlineEditableImage
                            src={content.shelter3Image1 as string}
                            alt={content.shelter3Image1Alt as string}
                            onImageChange={(url) => updateField('shelter3Image1', url)}
                            isEditMode={isEditMode}
                            className="rounded-xl shadow-lg w-full aspect-square object-cover"
                          />
                          <div className="mt-2">
                            <InlineEditable
                              value={content.shelter3Image1Alt as string}
                              fieldName="shelter3Image1Alt"
                              onChange={(val) => updateField('shelter3Image1Alt', val)}
                              isEditMode={isEditMode}
                              as="span"
                              className="text-xs text-muted-foreground"
                            />
                          </div>
                        </>
                      ) : (
                        <img
                          src={content.shelter3Image1 as string}
                          alt={content.shelter3Image1Alt as string}
                          className="rounded-xl shadow-lg w-full aspect-square object-cover"
                        />
                      )}
                    </div>
                    <div className="relative">
                      {isEditMode ? (
                        <>
                          <InlineEditableImage
                            src={content.shelter3Image2 as string}
                            alt={content.shelter3Image2Alt as string}
                            onImageChange={(url) => updateField('shelter3Image2', url)}
                            isEditMode={isEditMode}
                            className="rounded-xl shadow-lg w-full aspect-square object-cover"
                          />
                          <div className="mt-2">
                            <InlineEditable
                              value={content.shelter3Image2Alt as string}
                              fieldName="shelter3Image2Alt"
                              onChange={(val) => updateField('shelter3Image2Alt', val)}
                              isEditMode={isEditMode}
                              as="span"
                              className="text-xs text-muted-foreground"
                            />
                          </div>
                        </>
                      ) : (
                        <img
                          src={content.shelter3Image2 as string}
                          alt={content.shelter3Image2Alt as string}
                          className="rounded-xl shadow-lg w-full aspect-square object-cover"
                        />
                      )}
                    </div>
                  </div>
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

export default AnimalShelters;
