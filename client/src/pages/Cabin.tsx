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
import { EditablePageWrapper } from '@/components/admin/EditablePageWrapper';
import { InlineEditable } from '@/components/admin/InlineEditable';
import InlineEditableButton from '@/components/admin/InlineEditableButton';
import InlineEditableImage from '@/components/admin/InlineEditableImage';

import { cloudinaryImages } from '@/lib/cloudinary';

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
  urethane: [
    { name: 'Barnwood', color: '#6B5B4F' },
    { name: 'Butternut', color: '#C49B5F' },
    { name: 'Charcoal', color: '#36454F' },
    { name: 'Chestnut Brown', color: '#5C3317' },
    { name: 'Golden Wheat', color: '#C9A86C' },
    { name: 'Mahogany', color: '#4A2C2A' },
    { name: 'Natural Cedar', color: '#A87B5B' },
    { name: 'Natural Teak', color: '#8B7355' },
    { name: 'Redwood', color: '#8B4513' },
    { name: 'Sage', color: '#87AE73' },
  ],
  vinyl: [
    { name: 'Beige', color: '#C8B89A' },
    { name: 'Cactus', color: '#5F7355' },
    { name: 'Champagne', color: '#E8DCC4' },
    { name: 'Cream', color: '#FFFDD0' },
    { name: 'Deep Water', color: '#354B5E' },
    { name: 'Fern', color: '#4F7942' },
    { name: 'Firebrick', color: '#B22222' },
    { name: 'Granite', color: '#676767' },
    { name: 'Graphite', color: '#383838' },
    { name: 'Khaki', color: '#C3B091' },
    { name: 'Maverick Brown', color: '#6B4423' },
    { name: 'Mocha', color: '#6F4E37' },
    { name: 'Myrtle', color: '#21421E' },
    { name: 'Olive', color: '#556B2F' },
    { name: 'Russet', color: '#80461B' },
    { name: 'Sandstone', color: '#786D5F' },
    { name: 'Seaport', color: '#3A5F7B' },
    { name: 'Sierra', color: '#A0785A' },
    { name: 'Silver', color: '#C0C0C0' },
    { name: 'Smoke', color: '#738276' },
    { name: 'Steel Blue', color: '#4682B4' },
    { name: 'Wheat', color: '#D4C4A8' },
    { name: 'White', color: '#F5F5F5' },
    { name: 'Yellow', color: '#F0D060' },
  ],
};

const upgradeOptions = [
  {
    category: 'Doors',
    items: [
      'Single 36" Wood Door',
      'Double 36" Wood Doors',
      'Single/Double 36" 6 Panel Fiberglass Door',
      'Single/Double 36" 6 Panel Fiberglass 11 Lite Door',
      'Single/Double 36" Solid Pre-Hung Door',
      'Single/Double 36" 9 Lite Pre-Hung Door',
      'Dead Bolt for Steel Door(s)',
    ],
  },
  {
    category: 'Windows',
    items: [
      '24"x36" Window (Single Pane)',
      '36"x36" Window (Single Pane)',
      '24"x36" Vinyl Insulated Window w/ grid',
      '36"x36" Vinyl Insulated Window w/ grid',
      '9" Vinyl Shutters (set)',
      '12" Vinyl Shutters (set)',
    ],
  },
  {
    category: 'Flooring & Ramps',
    items: [
      'Pressure Treated Floor',
      '12"x48" Adjustable Ramp (Aluminum)',
      'Brackets & 2 – 12"x48" Ramps',
      '6\'x5\' Treated Wood Ramp',
      '9\'x5\' Treated Wood Ramp',
    ],
  },
  {
    category: 'Porch Options',
    items: [
      '4\' Treated Wood Fold Up Lean To Porch',
      '6\' Treated Wood Fold Up Lean To Porch',
      'Porch Railing (per foot)',
      'Porch Steps',
    ],
  },
  {
    category: 'Extras',
    items: [
      'D-Log Siding Upgrade',
      'Wainscott (metal siding) (per foot)',
      'Ridge Vent (per foot)',
      'Moisture Barrier / Single Bubble Insulation',
      'Electrical Package (100 Amp Box, 2 receptacles, 2 lights/switch)',
      'Additional Light or Receptacle (each)',
      'Build on Site Available',
    ],
  },
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

interface CabinContent {
  metaTitle: string;
  metaDescription: string;
  title: string;
  titleHighlight: string;
  description: string;
  secondaryDescription: string;
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
  featuresDescription: string;
  featuresCardTitle: string;
  featuresImage: string;
  featuresImageAlt: string;
  featuresBadge: string;
  feature1: string;
  feature2: string;
  feature3: string;
  feature4: string;
  feature5: string;
  feature6: string;
  feature7: string;
  feature8: string;
  feature9: string;
  feature10: string;
  feature11: string;
  feature12: string;
  feature13: string;
  feature14: string;
  feature15: string;
  feature16: string;
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
  usesNote: string;
  colorHeading: string;
  metalAccordionTitle: string;
  urethaneAccordionTitle: string;
  vinylAccordionTitle: string;
  upgradesHeading: string;
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

export const defaultContent: CabinContent = {
  metaTitle: 'Summit Cabin | Summit Portable Buildings',
  metaDescription: 'The Summit Cabin is perfect for your lake lot, hunting cabin, or tiny home. Features 7/12 pitch roof, 6\' treated wood porch, LED lighting, electrical package, and double pane windows. Starting at $29,717.89. Free delivery within 50 miles.',
  title: 'SUMMIT',
  titleHighlight: 'CABIN',
  description: 'The Summit Cabin is a great building for your lake lot, hunting cabin, or kid\'s play house! The windows let in extra light so that you don\'t need electricity during the daytime. The porch is the perfect place to sit and enjoy the sunset after a long day.',
  secondaryDescription: 'Rather than taking the time to build something permanent, consider this building because it can be moved if necessary. There are so many sizing and siding options that you can find something to fit your hunting property or back yard!',
  subtitle: 'Starting at $29,717.89',
  heroImage: cloudinaryImages.cabin1,
  heroImageAlt: 'Summit Cabin - Exterior view with porch',
  heroButton1Text: 'Build Your Own',
  heroButton1Link: 'https://summitbuildings.shedpro.co/',
  heroButton1OpenInNewTab: true,
  heroButton2Text: 'Browse Our Inventory',
  heroButton2Link: '/inventory',
  heroButton2OpenInNewTab: false,
  galleryImage1: cloudinaryImages.cabin1,
  galleryImage1Alt: 'Summit Cabin - Exterior view with porch',
  galleryImage2: cloudinaryImages.cabin2,
  galleryImage2Alt: 'Summit Cabin - Interior finished view',
  galleryImage3: cloudinaryImages.cabin3,
  galleryImage3Alt: 'Summit Cabin - Side view',
  galleryImage4: cloudinaryImages.cabin4,
  galleryImage4Alt: 'Summit Cabin - Interior details',
  featuresHeading: 'Built for Living & Relaxation',
  featuresDescription: 'The possibilities are endless with a Summit Cabin. Whether it\'s a tiny home, hunting cabin, or lake retreat — every inch of space can be utilized to perfection. Fully customizable to your needs.',
  featuresCardTitle: 'Summit Cabin Features',
  featuresImage: cloudinaryImages.cabin2,
  featuresImageAlt: 'Summit Cabin - Interior',
  featuresBadge: 'Fully Customizable',
  feature1: "14' X 32' Base Size",
  feature2: "7/12 Pitch Roof",
  feature3: "3/4 Advantec Floor",
  feature4: "6 Interior LED Lighting & Electrical Package",
  feature5: "7 Extra Receptacles + 200 Amp Box Upgrade",
  feature6: "2 x 6 Truss",
  feature7: "7/16 OSB & Housewrap on Walls",
  feature8: "Moisture Barrier and Drip Edge on Roof",
  feature9: "6' Treated Wood Fold Up Lean To Porch",
  feature10: "D-Log on One 32' Side",
  feature11: '36" 9 Lite Door',
  feature12: '6" Overhang',
  feature13: "6 x 36 x 48 Double Pane Windows",
  feature14: "Mesh Vented Ridge",
  feature15: "Metal Siding",
  feature16: 'Wall Studs/Rafters 16" O.C.',
  designButtonText: 'Design Yours Now',
  designButtonLink: 'https://summitbuildings.shedpro.co/',
  designButtonOpenInNewTab: true,
  usesHeading: 'Perfect For',
  use1: 'Lake Lot Cabin',
  use2: 'Hunting Cabin',
  use3: 'Tiny Home',
  use4: 'Guest House',
  use5: 'Kids Play House',
  use6: 'Home Office',
  use7: 'Art Studio',
  use8: 'She Shed / Man Cave',
  use9: 'Backyard Retreat',
  usesNote: 'The built-in porch provides the perfect spot to relax and enjoy the outdoors. Large windows bring in natural light, reducing the need for electricity during the day.',
  colorHeading: 'COLOR AND MATERIAL OPTIONS',
  metalAccordionTitle: 'Metal Siding Options',
  urethaneAccordionTitle: 'Urethane Siding Options',
  vinylAccordionTitle: 'Vinyl Siding Options',
  upgradesHeading: 'Available Upgrades',
  importantNote: '*Free delivery within 50 miles. Prices subject to change without warning. Base price shown is for standard configuration.',
  ctaHeading: 'Ready to Get Started?',
  ctaDescription: 'Design your perfect cabin online or contact us for a free quote.',
  ctaPrimaryButton: 'Build Your Own',
  ctaPrimaryButtonLink: 'https://summitbuildings.shedpro.co/',
  ctaPrimaryButtonOpenInNewTab: true,
  ctaSecondaryButton: 'See More Models',
  ctaSecondaryButtonLink: '/types',
  ctaSecondaryButtonOpenInNewTab: false,
};

const Cabin = () => {
  const backPath = useBackPath({
    defaultPath: '/types/deluxe-storage-cabins#cabins-tiny-home',
    defaultLabel: '← Back to Deluxe Storage & Cabins',
    stylesPath: '/styles/utility',
    stylesLabel: '← Back to Styles',
  });

  return (
    <EditablePageWrapper slug="cabin" defaultContent={defaultContent}>
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
          { key: 'feature9', value: content.feature9 as string },
          { key: 'feature10', value: content.feature10 as string },
          { key: 'feature11', value: content.feature11 as string },
          { key: 'feature12', value: content.feature12 as string },
          { key: 'feature13', value: content.feature13 as string },
          { key: 'feature14', value: content.feature14 as string },
          { key: 'feature15', value: content.feature15 as string },
          { key: 'feature16', value: content.feature16 as string },
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
            <link rel="canonical" href="https://summitbuildings.com/types/deluxe-storage-cabins/cabin" />
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
              secondaryDescription={content.secondaryDescription as string}
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

          {/* Cabin Features */}
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
                  />
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
                    {isEditMode ? (
                      <InlineEditableImage
                        src={content.featuresImage as string}
                        alt={content.featuresImageAlt as string}
                        onImageChange={(url) => updateField('featuresImage', url)}
                        isEditMode={isEditMode}
                        className="rounded-xl shadow-lg w-full"
                      />
                    ) : (
                      <img
                        src={content.featuresImage as string}
                        alt={content.featuresImageAlt as string}
                        className="rounded-xl shadow-lg w-full"
                      />
                    )}
                    <div className="absolute -bottom-3 -right-3 bg-secondary text-primary-foreground px-4 py-2 rounded-lg font-heading text-sm">
                      <InlineEditable
                        value={content.featuresBadge as string}
                        fieldName="featuresBadge"
                        onChange={(val) => updateField('featuresBadge', val)}
                        isEditMode={isEditMode}
                        as="span"
                      />
                    </div>
                  </div>
                  
                  <div className="bg-card rounded-xl p-8 border border-border shadow-lg">
                    <h3 className="font-heading text-2xl font-bold text-foreground mb-6">
                      <InlineEditable
                        value={content.featuresCardTitle as string}
                        fieldName="featuresCardTitle"
                        onChange={(val) => updateField('featuresCardTitle', val)}
                        isEditMode={isEditMode}
                        as="span"
                      />
                    </h3>
                    <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2">
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
                <p className="text-center text-muted-foreground mt-8 text-sm">
                  <InlineEditable
                    value={content.usesNote as string}
                    fieldName="usesNote"
                    type="textarea"
                    onChange={(val) => updateField('usesNote', val)}
                    isEditMode={isEditMode}
                    as="span"
                  />
                </p>
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
                  <AccordionItem value="metal" className="border-b border-border">
                    <AccordionTrigger className="px-6 py-4 hover:no-underline">
                      <span className="font-heading text-lg font-bold text-secondary uppercase">
                        <InlineEditable
                          value={content.metalAccordionTitle as string}
                          fieldName="metalAccordionTitle"
                          onChange={(val) => updateField('metalAccordionTitle', val)}
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
                  
                  <AccordionItem value="urethane" className="border-b border-border">
                    <AccordionTrigger className="px-6 py-4 hover:no-underline">
                      <span className="font-heading text-lg font-bold text-secondary uppercase">
                        <InlineEditable
                          value={content.urethaneAccordionTitle as string}
                          fieldName="urethaneAccordionTitle"
                          onChange={(val) => updateField('urethaneAccordionTitle', val)}
                          isEditMode={isEditMode}
                          as="span"
                        />
                      </span>
                    </AccordionTrigger>
                    <AccordionContent className="px-6 pb-6">
                      <div className="flex flex-wrap gap-6 pt-4">
                        {sidingOptions.urethane.map((swatch) => (
                          <ColorSwatch key={swatch.name} name={swatch.name} color={swatch.color} />
                        ))}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="vinyl" className="border-none">
                    <AccordionTrigger className="px-6 py-4 hover:no-underline">
                      <span className="font-heading text-lg font-bold text-secondary uppercase">
                        <InlineEditable
                          value={content.vinylAccordionTitle as string}
                          fieldName="vinylAccordionTitle"
                          onChange={(val) => updateField('vinylAccordionTitle', val)}
                          isEditMode={isEditMode}
                          as="span"
                        />
                      </span>
                    </AccordionTrigger>
                    <AccordionContent className="px-6 pb-6">
                      <div className="flex flex-wrap gap-6 pt-4">
                        {sidingOptions.vinyl.map((swatch) => (
                          <ColorSwatch key={swatch.name} name={swatch.name} color={swatch.color} />
                        ))}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>
            </div>
          </section>

          {/* Upgrade Options */}
          <section className="section-padding bg-background">
            <div className="container-custom">
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-8">
                <InlineEditable
                  value={content.upgradesHeading as string}
                  fieldName="upgradesHeading"
                  onChange={(val) => updateField('upgradesHeading', val)}
                  isEditMode={isEditMode}
                  as="span"
                />
              </h2>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {upgradeOptions.map((group) => (
                  <div key={group.category} className="bg-card rounded-xl p-6 border border-border/50">
                    <h3 className="font-heading text-lg font-bold text-foreground mb-4">
                      {group.category}
                    </h3>
                    <ul className="space-y-2">
                      {group.items.map((item) => (
                        <li key={item} className="text-sm text-muted-foreground flex items-start gap-2">
                          <Check className="w-4 h-4 text-secondary flex-shrink-0 mt-0.5" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
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

export default Cabin;
