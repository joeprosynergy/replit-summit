import { Helmet } from 'react-helmet-async';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { 
  Check,
  ArrowRight,
  Shield,
  Sun,
  Cloud,
  Wind,
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
import { EditablePageWrapper } from '@/components/admin/EditablePageWrapper';
import { InlineEditable } from '@/components/admin/InlineEditable';
import InlineEditableButton from '@/components/admin/InlineEditableButton';
import InlineEditableImage from '@/components/admin/InlineEditableImage';

import { cloudinaryImages } from '@/lib/cloudinary';

const metalColors = [
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
];

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

interface CarportsContent {
  metaTitle: string;
  metaDescription: string;
  title: string;
  titleHighlight: string;
  description: string;
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
  galleryImage5: string;
  galleryImage5Alt: string;
  galleryImage6: string;
  galleryImage6Alt: string;
  carportHeading: string;
  carportHighlight: string;
  carportDescription: string;
  carportImage: string;
  carportImageAlt: string;
  carportBadge: string;
  carportFeature1: string;
  carportFeature2: string;
  carportFeature3: string;
  carportFeature4: string;
  carportFeature5: string;
  carportFeature6: string;
  carportFeature7: string;
  carportFeature8: string;
  rvHeading: string;
  rvHighlight: string;
  rvDescription: string;
  rvImage: string;
  rvImageAlt: string;
  rvBadge: string;
  rvFeature1: string;
  rvFeature2: string;
  rvFeature3: string;
  rvFeature4: string;
  rvFeature5: string;
  rvFeature6: string;
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
  importantNote: string;
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

const defaultContent: CarportsContent = {
  metaTitle: 'Carports & RV Covers | Summit Portable Buildings',
  metaDescription: 'Steel carports and RV covers provide the best protection against cold, rain, sun, and wind – even tornadoes and hurricanes. Available for commercial, industrial, or residential use.',
  title: 'CARPORTS &',
  titleHighlight: 'RV COVERS',
  description: 'Steel carports are the best option for protecting your vehicles against the cold, rain, sun, and wind – even tornadoes and hurricanes. As good if not better than traditional stick frame or concrete buildings for commercial, industrial, or residential use.',
  heroImage: cloudinaryImages.carport1,
  heroImageAlt: 'Steel Carport',
  heroButton1Text: 'Browse Our Inventory',
  heroButton1Link: '/inventory',
  heroButton1OpenInNewTab: false,
  heroButton2Text: 'View All Models',
  heroButton2Link: '/types',
  heroButton2OpenInNewTab: false,
  galleryImage1: cloudinaryImages.carport1,
  galleryImage1Alt: 'Steel carport with red and white roof',
  galleryImage2: cloudinaryImages.carport2,
  galleryImage2Alt: 'Steel carport structure - side view',
  galleryImage3: cloudinaryImages.carport3,
  galleryImage3Alt: 'Steel carport with gray finish',
  galleryImage4: cloudinaryImages.rvCover1,
  galleryImage4Alt: 'RV Cover protecting recreational vehicle',
  galleryImage5: cloudinaryImages.rvCover2,
  galleryImage5Alt: 'Metal RV carport with enclosed sides',
  galleryImage6: cloudinaryImages.rvCover3,
  galleryImage6Alt: 'Large RV cover structure',
  carportHeading: 'Built to',
  carportHighlight: 'Protect',
  carportDescription: 'Our steel carports provide superior protection for your vehicles, equipment, and outdoor spaces. Engineered to withstand extreme weather conditions.',
  carportImage: cloudinaryImages.carport2,
  carportImageAlt: 'Steel Carport Structure',
  carportBadge: 'Heavy-Duty Steel',
  carportFeature1: 'Heavy-duty steel frame construction',
  carportFeature2: 'Protection from sun, rain, wind, and snow',
  carportFeature3: 'Withstands tornadoes and hurricanes',
  carportFeature4: 'Multiple size options available',
  carportFeature5: 'Customizable roof styles',
  carportFeature6: 'Optional enclosed sides',
  carportFeature7: 'Commercial, industrial, or residential use',
  carportFeature8: 'Long-lasting galvanized steel',
  rvHeading: 'RV',
  rvHighlight: 'Covers',
  rvDescription: 'Owning a recreational vehicle requires a huge investment and it\'s one worth protecting. Our metal RV carports provide the best protection to keep your "get-away" vehicle in tip-top shape.',
  rvImage: cloudinaryImages.rvCover1,
  rvImageAlt: 'RV Cover protecting recreational vehicle',
  rvBadge: 'Protect Your Investment',
  rvFeature1: 'Extra tall clearance for RVs',
  rvFeature2: 'Protects your investment from the elements',
  rvFeature3: 'Keep your \'get-away\' vehicle in tip-top shape',
  rvFeature4: 'Available in various widths and lengths',
  rvFeature5: 'Optional full or partial enclosure',
  rvFeature6: 'Sturdy construction for all weather',
  usesHeading: 'Perfect For Any Application',
  use1: 'Vehicle Protection',
  use2: 'RV & Camper Storage',
  use3: 'Boat Covers',
  use4: 'Farm Equipment',
  use5: 'Outdoor Workspace',
  use6: 'Commercial Parking',
  use7: 'Event Shelters',
  use8: 'Industrial Storage',
  use9: 'Picnic Areas',
  colorHeading: 'COLOR OPTIONS',
  importantNote: '*Free delivery within 50 miles. Prices subject to change without warning. Custom sizes and configurations available upon request.',
  ctaHeading: 'Ready to Get Started?',
  ctaDescription: 'Contact us today for a free quote on your carport or RV cover.',
  ctaPrimaryButton: 'Browse Our Inventory',
  ctaPrimaryButtonLink: '/inventory',
  ctaPrimaryButtonOpenInNewTab: false,
  ctaSecondaryButton: 'See More Models',
  ctaSecondaryButtonLink: '/types',
  ctaSecondaryButtonOpenInNewTab: false,
};

const Carports = () => {
  const backPath = useBackPath({
    defaultPath: '/types/garages-carports#carports',
    defaultLabel: '← Back to Garages & Carports',
    stylesPath: '/styles/utility',
    stylesLabel: '← Back to Styles',
  });

  return (
    <EditablePageWrapper slug="carports" defaultContent={defaultContent}>
      {({ content, isEditMode, updateField }) => {
        const galleryImages = [
          { src: content.galleryImage1 as string, alt: content.galleryImage1Alt as string },
          { src: content.galleryImage2 as string, alt: content.galleryImage2Alt as string },
          { src: content.galleryImage3 as string, alt: content.galleryImage3Alt as string },
          { src: content.galleryImage4 as string, alt: content.galleryImage4Alt as string },
          { src: content.galleryImage5 as string, alt: content.galleryImage5Alt as string },
          { src: content.galleryImage6 as string, alt: content.galleryImage6Alt as string },
        ];

        const carportFeatures = [
          { key: 'carportFeature1', value: content.carportFeature1 as string },
          { key: 'carportFeature2', value: content.carportFeature2 as string },
          { key: 'carportFeature3', value: content.carportFeature3 as string },
          { key: 'carportFeature4', value: content.carportFeature4 as string },
          { key: 'carportFeature5', value: content.carportFeature5 as string },
          { key: 'carportFeature6', value: content.carportFeature6 as string },
          { key: 'carportFeature7', value: content.carportFeature7 as string },
          { key: 'carportFeature8', value: content.carportFeature8 as string },
        ];

        const rvFeatures = [
          { key: 'rvFeature1', value: content.rvFeature1 as string },
          { key: 'rvFeature2', value: content.rvFeature2 as string },
          { key: 'rvFeature3', value: content.rvFeature3 as string },
          { key: 'rvFeature4', value: content.rvFeature4 as string },
          { key: 'rvFeature5', value: content.rvFeature5 as string },
          { key: 'rvFeature6', value: content.rvFeature6 as string },
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
            <link rel="canonical" href="https://summitbuildings.com/types/garages-carports/carports" />
          </Helmet>

          <div className="min-h-screen">
            <Header />
        
        <main>
          <div className="relative">
            <ProductHero
              backPath={backPath}
              title={content.title as string}
              titleHighlight={content.titleHighlight as string}
              description={content.description as string}
              image={content.heroImage as string}
              imageAlt={content.heroImageAlt as string}
              isEditMode={isEditMode}
              onUpdateField={(field, value) => updateField(field, value)}
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
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
                  {galleryImages.map((img, index) => (
                    <div key={index} className="relative">
                      <InlineEditableImage
                        src={img.src}
                        alt={img.alt}
                        onImageChange={(url) => updateField(`galleryImage${index + 1}`, url)}
                        isEditMode={isEditMode}
                        className="w-full aspect-video object-cover rounded-lg"
                      />
                      <div className="mt-2">
                        <InlineEditable
                          value={img.alt}
                          fieldName={`galleryImage${index + 1}Alt`}
                          onChange={(val) => updateField(`galleryImage${index + 1}Alt`, val)}
                          isEditMode={isEditMode}
                          as="span"
                          className="text-xs text-muted-foreground"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <GallerySection images={galleryImages} />
              )}
            </div>
          </section>

          {/* Carport Features */}
          <section className="section-padding bg-muted/30">
            <div className="container-custom">
              <div className="max-w-4xl mx-auto">
                <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4 text-center">
                  <InlineEditable
                    value={content.carportHeading as string}
                    fieldName="carportHeading"
                    onChange={(val) => updateField('carportHeading', val)}
                    isEditMode={isEditMode}
                    as="span"
                  />{' '}
                  <span className="text-secondary">
                    <InlineEditable
                      value={content.carportHighlight as string}
                      fieldName="carportHighlight"
                      onChange={(val) => updateField('carportHighlight', val)}
                      isEditMode={isEditMode}
                      as="span"
                    />
                  </span>
                </h2>
                <p className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
                  <InlineEditable
                    value={content.carportDescription as string}
                    fieldName="carportDescription"
                    type="textarea"
                    onChange={(val) => updateField('carportDescription', val)}
                    isEditMode={isEditMode}
                    as="span"
                  />
                </p>
                
                <div className="grid md:grid-cols-2 gap-8 items-center">
                  <div className="relative">
                    <InlineEditableImage
                      src={content.carportImage as string}
                      alt={content.carportImageAlt as string}
                      onImageChange={(url) => updateField('carportImage', url)}
                      isEditMode={isEditMode}
                      className="rounded-xl shadow-lg w-full"
                    />
                    <div className="absolute -bottom-3 -right-3 bg-secondary text-primary-foreground px-4 py-2 rounded-lg font-heading text-sm">
                      <InlineEditable
                        value={content.carportBadge as string}
                        fieldName="carportBadge"
                        onChange={(val) => updateField('carportBadge', val)}
                        isEditMode={isEditMode}
                        as="span"
                      />
                    </div>
                    {isEditMode && (
                      <div className="mt-4">
                        <InlineEditable
                          value={content.carportImageAlt as string}
                          fieldName="carportImageAlt"
                          onChange={(val) => updateField('carportImageAlt', val)}
                          isEditMode={isEditMode}
                          as="span"
                          className="text-xs text-muted-foreground"
                        />
                      </div>
                    )}
                  </div>
                  
                  <div className="bg-card rounded-xl p-8 border border-border shadow-lg">
                    <h3 className="font-heading text-2xl font-bold text-foreground mb-6">
                      Carport Features
                    </h3>
                    <div className="space-y-3">
                      {carportFeatures.map((feature) => (
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
                </div>
              </div>
            </div>
          </section>

          {/* RV Covers Section */}
          <section className="section-padding bg-background">
            <div className="container-custom">
              <div className="max-w-4xl mx-auto">
                <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4 text-center">
                  <InlineEditable
                    value={content.rvHeading as string}
                    fieldName="rvHeading"
                    onChange={(val) => updateField('rvHeading', val)}
                    isEditMode={isEditMode}
                    as="span"
                  />{' '}
                  <span className="text-secondary">
                    <InlineEditable
                      value={content.rvHighlight as string}
                      fieldName="rvHighlight"
                      onChange={(val) => updateField('rvHighlight', val)}
                      isEditMode={isEditMode}
                      as="span"
                    />
                  </span>
                </h2>
                <p className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
                  <InlineEditable
                    value={content.rvDescription as string}
                    fieldName="rvDescription"
                    type="textarea"
                    onChange={(val) => updateField('rvDescription', val)}
                    isEditMode={isEditMode}
                    as="span"
                  />
                </p>
                
                <div className="grid md:grid-cols-2 gap-8 items-center">
                  <div className="bg-card rounded-xl p-8 border border-border shadow-lg order-2 md:order-1">
                    <h3 className="font-heading text-2xl font-bold text-foreground mb-6">
                      RV Cover Features
                    </h3>
                    <div className="space-y-3">
                      {rvFeatures.map((feature) => (
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
                  
                  <div className="relative order-1 md:order-2">
                    <InlineEditableImage
                      src={content.rvImage as string}
                      alt={content.rvImageAlt as string}
                      onImageChange={(url) => updateField('rvImage', url)}
                      isEditMode={isEditMode}
                      className="rounded-xl shadow-lg w-full"
                    />
                    <div className="absolute -bottom-3 -left-3 bg-secondary text-primary-foreground px-4 py-2 rounded-lg font-heading text-sm">
                      <InlineEditable
                        value={content.rvBadge as string}
                        fieldName="rvBadge"
                        onChange={(val) => updateField('rvBadge', val)}
                        isEditMode={isEditMode}
                        as="span"
                      />
                    </div>
                    {isEditMode && (
                      <div className="mt-4">
                        <InlineEditable
                          value={content.rvImageAlt as string}
                          fieldName="rvImageAlt"
                          onChange={(val) => updateField('rvImageAlt', val)}
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

          {/* Ideal Uses Section */}
          <section className="section-padding bg-muted/30">
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

          {/* Color Options */}
          <section className="section-padding bg-background">
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
                        Metal Color Options
                      </span>
                    </AccordionTrigger>
                    <AccordionContent className="px-6 pb-6">
                      <div className="flex flex-wrap gap-6 pt-4">
                        {metalColors.map((swatch) => (
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
          <section className="py-8 bg-muted/30">
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
};

export default Carports;
