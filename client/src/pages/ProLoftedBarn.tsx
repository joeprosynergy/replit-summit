import { Helmet } from 'react-helmet-async';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { 
  Check,
  ArrowRight,
  Plus,
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
      'Loft Door',
      '6\'x6\' Roll up Door',
      '6\'x7\' Roll up Door',
      '9\'x7\' Roll up Door',
      '9\'x7\' Insulated Garage Door (W/ T-Handle Lock/Key)',
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
      'Additional 12"x48" Ramp',
      '6\'x5\' Treated Wood Ramp',
      '9\'x5\' Treated Wood Ramp',
    ],
  },
  {
    category: 'Storage & Interior',
    items: [
      '22" Workbench w/ 3/4" Top (per foot)',
      '22" Double Shelves w/ 1/2" Top (per foot)',
      'Extra Loft Area (sq. foot)',
      'Extra Loft Ladder',
      'Interior 2"x4" Framed Walls (16" o.c. per foot)',
    ],
  },
  {
    category: 'Extras',
    items: [
      'Wainscott (metal siding) (per foot)',
      'Wainscott (wood siding) (per foot)',
      '16" Tall 2"x4" Loft Railing W/ 30" Opening',
      'Porch Railing (per foot)',
      'Anchors (each)',
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

interface ProLoftedBarnContent {
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
  galleryImage5: string;
  galleryImage5Alt: string;
  galleryImage6: string;
  galleryImage6Alt: string;
  galleryImage7: string;
  galleryImage7Alt: string;
  galleryImage8: string;
  galleryImage8Alt: string;
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
  feature9: string;
  feature10: string;
  feature11: string;
  feature12: string;
  feature13: string;
  featureNote: string;
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
  upgradeHeading: string;
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

const defaultContent: ProLoftedBarnContent = {
  metaTitle: 'Pro - Lofted Barn | Summit Portable Buildings',
  metaDescription: 'The Pro Lofted Barn is our best seller - the most versatile building for all purposes. Features 2 lofts for extra storage, windows for natural light, and classic barn styling. Sizes 8×8 to 14×40. Free delivery within 50 miles.',
  title: 'PRO -',
  titleHighlight: 'LOFTED BARN',
  description: 'Our BEST SELLER is the most versatile building for all purposes. The doors can be conveniently located on the front or side for great access. Features 2 lofts for extra storage, windows to add light, and classic country barn styling that fits any property.',
  subtitle: 'Sizes: 8×8 to 14×40',
  heroImage: cloudinaryImages.sideLoftedBarn1,
  heroImageAlt: 'Summit Pro Lofted Barn',
  heroButton1Text: 'Build Your Own',
  heroButton1Link: 'https://summitbuildings.shedpro.co/',
  heroButton1OpenInNewTab: true,
  heroButton2Text: 'Browse Our Inventory',
  heroButton2Link: '/inventory',
  heroButton2OpenInNewTab: false,
  galleryImage1: cloudinaryImages.loftedBarn1,
  galleryImage1Alt: 'Summit Lofted Barn - Red with white trim',
  galleryImage2: cloudinaryImages.loftedBarn2,
  galleryImage2Alt: 'Summit Lofted Barn - Blue exterior',
  galleryImage3: cloudinaryImages.loftedBarn3,
  galleryImage3Alt: 'Summit Lofted Barn - Gray with shutters',
  galleryImage4: cloudinaryImages.loftedBarn4,
  galleryImage4Alt: 'Summit Lofted Barn - Classic style',
  galleryImage5: cloudinaryImages.sideLoftedBarn1,
  galleryImage5Alt: 'Summit Side Lofted Barn - Tan with side entry',
  galleryImage6: cloudinaryImages.sideLoftedBarn2,
  galleryImage6Alt: 'Summit Side Lofted Barn - With windows',
  galleryImage7: cloudinaryImages.sideLoftedBarn3,
  galleryImage7Alt: 'Summit Side Lofted Barn - Red exterior',
  galleryImage8: cloudinaryImages.sideLoftedBarn4,
  galleryImage8Alt: 'Summit Side Lofted Barn - Brown finish',
  featuresHeading: 'Built for',
  featuresHighlight: 'Maximum Storage',
  featuresDescription: 'The Pro - Lofted Barn is designed with 2 lofts to help keep items organized and up off the floor. Whether you need front entry, side entry, or a completely custom layout — design it exactly how you want.',
  featureImage: cloudinaryImages.loftedBarn1,
  featureImageAlt: 'Pro Lofted Barn - Classic Barn Style',
  featureBadge: 'Our Best Seller',
  feature1: 'Double 36" Doors w/ T-Handle Lock & Key',
  feature2: '2 Lofts for Maximum Storage',
  feature3: 'Loft Ladder Included',
  feature4: '3/4" T & G Advantech Flooring',
  feature5: 'Mesh Vented Ridge',
  feature6: 'Moisture Barrier & Drip Edge on Roof',
  feature7: '6\'6" (78") Wall Height',
  feature8: '16" O.C. Wall Studs',
  feature9: '16" O.C. Rafters',
  feature10: 'Set of 2 Door Holders (Keep the Doors Open)',
  feature11: 'Side or Front Door Entry Options',
  feature12: 'Additional Doors & Windows Available',
  feature13: 'Customizable Layout for Any Use',
  featureNote: '*8 foot wide models feature single 48" door & 1 window. Loft ladder not included with Painted Express Series.',
  designButtonText: 'Design Yours Now',
  designButtonLink: 'https://summitbuildings.shedpro.co/',
  designButtonOpenInNewTab: true,
  usesHeading: 'Perfect For Any Use',
  use1: 'Organized Storage with Lofts',
  use2: 'Workshop Space',
  use3: 'Tack Room',
  use4: 'Garden Shed',
  use5: 'Lake or Hunting Cabin',
  use6: 'Home Office',
  use7: 'Art Studio',
  use8: 'Man Cave / She Shed',
  use9: 'Hobby Space',
  usesNote: 'If you are on a budget and looking for a classy shed which you will feel proud to call your own, this is the place to start!',
  colorHeading: 'COLOR AND MATERIAL OPTIONS',
  upgradeHeading: 'UPGRADE OPTIONS',
  ctaHeading: 'Ready to Get Started?',
  ctaDescription: 'Design your perfect Pro - Lofted Barn online in minutes or give us a call',
  ctaPrimaryButton: 'Design Your Building',
  ctaPrimaryButtonLink: 'https://summitbuildings.shedpro.co/',
  ctaPrimaryButtonOpenInNewTab: true,
  ctaSecondaryButton: 'Call 573-747-4700',
  ctaSecondaryButtonLink: 'tel:5737474700',
  ctaSecondaryButtonOpenInNewTab: false,
};

const ProLoftedBarn = () => {
  const backPath = useBackPath({ defaultPath: '/types/deluxe-storage-cabins#pro-lofted-barn', defaultLabel: '← Back to Deluxe Storage & Cabins', stylesPath: '/styles/barn', stylesLabel: '← Back to Styles' });

  return (
    <EditablePageWrapper slug="pro-lofted-barn" defaultContent={defaultContent}>
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
            <link rel="canonical" href="https://summitbuildings.com/types/deluxe-storage-cabins/pro-lofted-barn" />
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
                      <div key={index} className="relative">
                        <InlineEditableImage
                          src={img.src}
                          alt={img.alt}
                          onImageChange={(url) => updateDynamicField(`galleryImage${index + 1}`, url)}
                          isEditMode={isEditMode}
                          className="w-full aspect-video object-cover rounded-lg"
                        />
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

              {/* Pro - Lofted Barn Features */}
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
                      <InlineEditable
                        value={content.featuresHighlight as string}
                        fieldName="featuresHighlight"
                        onChange={(val) => updateField('featuresHighlight', val)}
                        isEditMode={isEditMode}
                        as="span"
                        className="text-secondary"
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
                  </div>
                  
                  <div className="bg-card rounded-xl p-8 border border-border shadow-lg">
                    <h3 className="font-heading text-2xl font-bold text-foreground mb-6">
                      Pro - Lofted Barn Features
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
                    <p className="text-xs text-muted-foreground italic mt-6">
                      <InlineEditable
                        value={content.featureNote as string}
                        fieldName="featureNote"
                        type="textarea"
                        onChange={(val) => updateField('featureNote', val)}
                        isEditMode={isEditMode}
                        as="span"
                      />
                    </p>
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
                          <ColorSwatch key={swatch.name} {...swatch} />
                        ))}
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="metal" className="border-b border-border">
                    <AccordionTrigger className="px-6 py-4 hover:no-underline">
                      <span className="font-heading text-lg font-bold text-secondary uppercase">
                        Metal Siding Options
                      </span>
                    </AccordionTrigger>
                    <AccordionContent className="px-6 pb-6">
                      <div className="flex flex-wrap gap-6 pt-4">
                        {sidingOptions.metal.map((swatch) => (
                          <ColorSwatch key={swatch.name} {...swatch} />
                        ))}
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="urethane" className="border-b border-border">
                    <AccordionTrigger className="px-6 py-4 hover:no-underline">
                      <span className="font-heading text-lg font-bold text-secondary uppercase">
                        Urethane Siding Options
                      </span>
                    </AccordionTrigger>
                    <AccordionContent className="px-6 pb-6">
                      <div className="flex flex-wrap gap-6 pt-4">
                        {sidingOptions.urethane.map((swatch) => (
                          <ColorSwatch key={swatch.name} {...swatch} />
                        ))}
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="vinyl" className="border-b-0">
                    <AccordionTrigger className="px-6 py-4 hover:no-underline">
                      <span className="font-heading text-lg font-bold text-secondary uppercase">
                        Vinyl Siding Options
                      </span>
                    </AccordionTrigger>
                    <AccordionContent className="px-6 pb-6">
                      <div className="flex flex-wrap gap-6 pt-4">
                        {sidingOptions.vinyl.map((swatch) => (
                          <ColorSwatch key={swatch.name} {...swatch} />
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
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-secondary mb-8">
                <InlineEditable
                  value={content.upgradeHeading as string}
                  fieldName="upgradeHeading"
                  onChange={(val) => updateField('upgradeHeading', val)}
                  isEditMode={isEditMode}
                  as="span"
                />
              </h2>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {upgradeOptions.map((category) => (
                  <div key={category.category} className="bg-card rounded-lg border border-border p-6">
                    <h3 className="font-heading text-lg font-bold text-foreground mb-4 uppercase">
                      {category.category}
                    </h3>
                    <ul className="space-y-2">
                      {category.items.map((item) => (
                        <li key={item} className="flex items-start gap-2 text-sm text-muted-foreground">
                          <Check className="w-4 h-4 text-secondary flex-shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </section>

              {/* CTA Section */}
              <section className="bg-primary py-16">
                <div className="container-custom text-center">
                  <h2 className="text-3xl md:text-4xl font-heading font-bold text-primary-foreground mb-6">
                    <InlineEditable
                      value={content.ctaHeading as string}
                      fieldName="ctaHeading"
                      onChange={(val) => updateField('ctaHeading', val)}
                      isEditMode={isEditMode}
                      as="span"
                    />
                  </h2>
                  <p className="text-primary-foreground/80 text-lg mb-8 max-w-2xl mx-auto">
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
                          <ArrowRight className="w-5 h-5" />
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

export default ProLoftedBarn;
