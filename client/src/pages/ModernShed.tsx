import { Helmet } from 'react-helmet-async';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Check, Home, Wrench, Briefcase, Palette, ExternalLink, Plus, X } from 'lucide-react';
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
import { Button } from '@/components/ui/button';

import modernShed1 from '@/assets/modern-shed-1.jpg';
import modernShed2 from '@/assets/modern-shed-2.jpg';
import modernShed3 from '@/assets/modern-shed-3.jpg';
import modernShed4 from '@/assets/modern-shed-4.jpg';
import modernShed5 from '@/assets/modern-shed-5.jpg';
import modernShed6 from '@/assets/modern-shed-6.jpg';
import modernShed7 from '@/assets/modern-shed-7.jpg';
import modernShed8 from '@/assets/modern-shed-8.jpg';
import modernShed9 from '@/assets/modern-shed-9.jpg';
import modernShed10 from '@/assets/modern-shed-10.jpg';

const sidingOptions = {
  paint: [
    { name: 'White', color: '#FFFFFF' },
    { name: 'Navajo White', color: '#FAEBD7' },
    { name: 'Light Gray', color: '#D3D3D3' },
    { name: 'GP Gray', color: '#A9A9A9' },
    { name: 'Clay', color: '#B8860B' },
    { name: 'Buckskin', color: '#C19A6B' },
    { name: 'Beige', color: '#F5F5DC' },
    { name: 'Sandstone', color: '#786D5F' },
    { name: 'Taupe', color: '#483C32' },
    { name: 'Brown', color: '#8B4513' },
    { name: 'Burnished Slate', color: '#5A5A5A' },
    { name: 'Black', color: '#222222' },
    { name: 'Red', color: '#B22222' },
    { name: 'Barn Red', color: '#7C0A02' },
    { name: 'Forest Green', color: '#228B22' },
    { name: 'Light Blue', color: '#ADD8E6' },
    { name: 'Blue', color: '#4169E1' },
  ],
  metal: [
    { name: 'White', color: '#FFFFFF' },
    { name: 'Light Gray', color: '#D3D3D3' },
    { name: 'Clay', color: '#B8860B' },
    { name: 'Tan', color: '#D2B48C' },
    { name: 'Brown', color: '#8B4513' },
    { name: 'Burnished Slate', color: '#5A5A5A' },
    { name: 'Charcoal', color: '#36454F' },
    { name: 'Black', color: '#222222' },
    { name: 'Red', color: '#B22222' },
    { name: 'Barn Red', color: '#7C0A02' },
    { name: 'Forest Green', color: '#228B22' },
    { name: 'Blue', color: '#4169E1' },
    { name: 'Galvalume', color: '#C0C0C0' },
  ],
};

const upgradeOptions = [
  {
    category: 'Doors',
    items: ['Additional 36" 9-Lite doors', '15-Lite French doors', 'Sliding glass door', 'Roll-up garage door'],
  },
  {
    category: 'Windows',
    items: ['Additional 24x36 windows', 'Clerestory windows', '30x36 windows', '36x36 windows'],
  },
  {
    category: 'Flooring & Ramps',
    items: ['Pressure treated flooring', 'Ramp', 'Concrete anchors'],
  },
  {
    category: 'Storage & Interior',
    items: ['Workbench', 'Shelving', 'Loft', 'Electrical package'],
  },
  {
    category: 'Extras',
    items: ['Shutters', 'Flower boxes', 'Vents', 'Additional colors'],
  },
];

const ColorSwatch = ({ name, color }: { name: string; color: string }) => (
  <div className="flex items-center gap-2">
    <div
      className="w-6 h-6 rounded-full border border-border shadow-sm"
      style={{ backgroundColor: color }}
    />
    <span className="text-sm text-muted-foreground">{name}</span>
  </div>
);

interface ModernShedContent {
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
  galleryImage7: string;
  galleryImage7Alt: string;
  galleryImage8: string;
  galleryImage8Alt: string;
  galleryImage9: string;
  galleryImage9Alt: string;
  galleryImage10: string;
  galleryImage10Alt: string;
  featuresHeading: string;
  featuresDescription: string;
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
  whyHeading: string;
  why1Title: string;
  why1Description: string;
  why2Title: string;
  why2Description: string;
  why3Title: string;
  why3Description: string;
  why4Title: string;
  why4Description: string;
  usesHeading: string;
  use1Title: string;
  use1Description: string;
  use2Title: string;
  use2Description: string;
  use3Title: string;
  use3Description: string;
  use4Title: string;
  use4Description: string;
  colorHeading: string;
  colorDescription: string;
  upgradeHeading: string;
  upgradeDescription: string;
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

export const defaultContent: ModernShedContent = {
  metaTitle: 'Modern Shed | Summit Portable Buildings',
  metaDescription: 'Discover our Modern Shed with single slope roof design. Features LP SmartSide siding, 6-inch overhangs, and contemporary aesthetics. Perfect for offices, studios, or storage.',
  title: 'MODERN',
  titleHighlight: 'SHED',
  description: 'Contemporary design with clean lines and a distinctive single slope roof. Perfect for modern home offices, art studios, or stylish storage solutions.',
  heroImage: modernShed1,
  heroImageAlt: 'Modern Shed',
  heroButton1Text: 'Design Your Building',
  heroButton1Link: 'https://summitbuildings.shedpro.co/',
  heroButton1OpenInNewTab: true,
  heroButton2Text: 'Browse Inventory',
  heroButton2Link: '/inventory',
  heroButton2OpenInNewTab: false,
  galleryImage1: modernShed1,
  galleryImage1Alt: 'Modern Shed exterior front view',
  galleryImage2: modernShed2,
  galleryImage2Alt: 'Modern Shed exterior with clerestory windows',
  galleryImage3: modernShed3,
  galleryImage3Alt: 'Modern Shed exterior side angle',
  galleryImage4: modernShed4,
  galleryImage4Alt: 'Modern Shed exterior corner view',
  galleryImage5: modernShed5,
  galleryImage5Alt: 'Modern Shed interior with natural light',
  galleryImage6: modernShed6,
  galleryImage6Alt: 'Modern Shed exterior with door',
  galleryImage7: modernShed7,
  galleryImage7Alt: 'Modern Shed interior framing',
  galleryImage8: modernShed8,
  galleryImage8Alt: 'Modern Shed interior floor view',
  galleryImage9: modernShed9,
  galleryImage9Alt: 'Modern Shed interior windows and door',
  galleryImage10: modernShed10,
  galleryImage10Alt: 'Modern Shed interior open space',
  featuresHeading: 'Standard Features',
  featuresDescription: 'Every Modern Shed includes premium Pro Series construction with contemporary design elements that set it apart from traditional sheds.',
  feature1: 'LP SmartSide siding',
  feature2: '2x6 Floor joists 12" OC',
  feature3: '4x6 Treated skids',
  feature4: 'AdvanTech flooring',
  feature5: 'House wrap',
  feature6: 'Single slope roof',
  feature7: '6" Overhangs',
  feature8: 'Moisture barrier & drip edge on roof',
  feature9: 'Wall studs 16" OC',
  feature10: '36" 9-Lite pre-hung door',
  whyHeading: 'Why Choose Modern Style?',
  why1Title: 'Contemporary Aesthetics',
  why1Description: 'Clean lines and single slope roof complement modern home architecture.',
  why2Title: 'Pro Series Quality',
  why2Description: 'LP SmartSide siding, 2x6 floor joists, and AdvanTech flooring for durability.',
  why3Title: 'Versatile Use',
  why3Description: 'Perfect for home offices, studios, workshops, or stylish storage.',
  why4Title: 'Natural Light',
  why4Description: 'Clerestory window options bring in abundant natural light.',
  usesHeading: 'Ideal Uses',
  use1Title: 'Home Office',
  use1Description: 'A quiet, professional workspace separate from your home.',
  use2Title: 'Art Studio',
  use2Description: 'Natural light and open space for creative work.',
  use3Title: 'Guest Suite',
  use3Description: 'Add finishing touches for comfortable guest accommodations.',
  use4Title: 'Modern Storage',
  use4Description: 'Stylish storage that complements contemporary homes.',
  colorHeading: 'Color & Material Options',
  colorDescription: 'Customize your Modern Shed with a wide range of colors for siding, trim, and roofing.',
  upgradeHeading: 'Available Upgrades',
  upgradeDescription: 'Enhance your Modern Shed with these popular upgrades.',
  ctaHeading: 'Ready to Design Your Modern Shed?',
  ctaDescription: 'Use our online configurator to customize your perfect Modern Shed, or contact us for personalized assistance.',
  ctaPrimaryButton: 'Design Your Building',
  ctaPrimaryButtonLink: 'https://summitbuildings.shedpro.co/',
  ctaPrimaryButtonOpenInNewTab: true,
  ctaSecondaryButton: 'Contact Us',
  ctaSecondaryButtonLink: '/contact-us',
  ctaSecondaryButtonOpenInNewTab: false,
};

const ModernShed = () => {
  const backPath = useBackPath({
    defaultPath: '/types/deluxe-storage-cabins',
    defaultLabel: '← Back to Deluxe Storage & Cabins',
    stylesPath: '/styles/modern',
    stylesLabel: '← Back to Modern Style',
  });

  return (
    <EditablePageWrapper slug="modern-shed" defaultContent={defaultContent}>
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
        ];

        const whyReasons = [
          { titleKey: 'why1Title', title: content.why1Title as string, descKey: 'why1Description', desc: content.why1Description as string, Icon: Home },
          { titleKey: 'why2Title', title: content.why2Title as string, descKey: 'why2Description', desc: content.why2Description as string, Icon: Wrench },
          { titleKey: 'why3Title', title: content.why3Title as string, descKey: 'why3Description', desc: content.why3Description as string, Icon: Briefcase },
          { titleKey: 'why4Title', title: content.why4Title as string, descKey: 'why4Description', desc: content.why4Description as string, Icon: Palette },
        ];

        const uses = [
          { titleKey: 'use1Title', title: content.use1Title as string, descKey: 'use1Description', desc: content.use1Description as string },
          { titleKey: 'use2Title', title: content.use2Title as string, descKey: 'use2Description', desc: content.use2Description as string },
          { titleKey: 'use3Title', title: content.use3Title as string, descKey: 'use3Description', desc: content.use3Description as string },
          { titleKey: 'use4Title', title: content.use4Title as string, descKey: 'use4Description', desc: content.use4Description as string },
        ];

        return (
        <>
          <Helmet>
            <title>{content.metaTitle}</title>
            <meta name="description" content={content.metaDescription as string} />
            <link rel="canonical" href="https://summitbuildings.com/types/deluxe-storage-cabins/modern-shed" />
          </Helmet>

          <Header />

          <main className="pt-20">
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

        {/* Gallery Section */}
        <section className="bg-muted/30 py-16">
          <div className="container-custom">
            {isEditMode ? (
              <>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
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

        {/* Features Section */}
        <section className="bg-background py-16 md:py-24">
          <div className="container-custom">
            <div className="grid lg:grid-cols-2 gap-12 items-start">
              <div>
                <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-6">
                  <InlineEditable
                    value={content.featuresHeading as string}
                    fieldName="featuresHeading"
                    onChange={(val) => updateField('featuresHeading', val)}
                    isEditMode={isEditMode}
                    as="span"
                  />
                </h2>
                <p className="text-muted-foreground mb-8">
                  <InlineEditable
                    value={content.featuresDescription as string}
                    fieldName="featuresDescription"
                    type="textarea"
                    onChange={(val) => updateField('featuresDescription', val)}
                    isEditMode={isEditMode}
                    as="span"
                  />
                </p>
                <ul className="space-y-3">
                  {features.map((feature) => (
                    <li key={feature.key} className="flex items-center gap-3">
                      <div className="flex-shrink-0 w-6 h-6 rounded-full bg-secondary/20 flex items-center justify-center">
                        <Check className="h-4 w-4 text-secondary" />
                      </div>
                      <span className="text-foreground">
                        <InlineEditable
                          value={feature.value}
                          fieldName={feature.key}
                          onChange={(val) => updateField(feature.key, val)}
                          isEditMode={isEditMode}
                          as="span"
                        />
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-card rounded-lg p-8 shadow-lg">
                <h3 className="text-xl font-heading font-bold text-foreground mb-6">
                  <InlineEditable
                    value={content.whyHeading as string}
                    fieldName="whyHeading"
                    onChange={(val) => updateField('whyHeading', val)}
                    isEditMode={isEditMode}
                    as="span"
                  />
                </h3>
                <div className="space-y-6">
                  {whyReasons.map((reason) => (
                    <div key={reason.titleKey} className="flex gap-4">
                      <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-secondary/20 flex items-center justify-center">
                        <reason.Icon className="h-6 w-6 text-secondary" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-foreground mb-1">
                          <InlineEditable
                            value={reason.title}
                            fieldName={reason.titleKey}
                            onChange={(val) => updateField(reason.titleKey, val)}
                            isEditMode={isEditMode}
                            as="span"
                          />
                        </h4>
                        <p className="text-sm text-muted-foreground">
                          <InlineEditable
                            value={reason.desc}
                            fieldName={reason.descKey}
                            type="textarea"
                            onChange={(val) => updateField(reason.descKey, val)}
                            isEditMode={isEditMode}
                            as="span"
                          />
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Ideal Uses Section */}
        <section className="bg-muted/50 py-16">
          <div className="container-custom">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-8 text-center">
              <InlineEditable
                value={content.usesHeading as string}
                fieldName="usesHeading"
                onChange={(val) => updateField('usesHeading', val)}
                isEditMode={isEditMode}
                as="span"
              />
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
              {uses.map((use) => (
                <div key={use.titleKey} className="bg-card rounded-lg p-6 text-center shadow-md">
                  <h3 className="font-heading font-bold text-foreground mb-2">
                    <InlineEditable
                      value={use.title}
                      fieldName={use.titleKey}
                      onChange={(val) => updateField(use.titleKey, val)}
                      isEditMode={isEditMode}
                      as="span"
                    />
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    <InlineEditable
                      value={use.desc}
                      fieldName={use.descKey}
                      type="textarea"
                      onChange={(val) => updateField(use.descKey, val)}
                      isEditMode={isEditMode}
                      as="span"
                    />
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Color Options Section */}
        <section className="bg-background py-16 md:py-24">
          <div className="container-custom">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-4 text-center">
              <InlineEditable
                value={content.colorHeading as string}
                fieldName="colorHeading"
                onChange={(val) => updateField('colorHeading', val)}
                isEditMode={isEditMode}
                as="span"
              />
            </h2>
            <p className="text-muted-foreground text-center mb-10 max-w-2xl mx-auto">
              <InlineEditable
                value={content.colorDescription as string}
                fieldName="colorDescription"
                type="textarea"
                onChange={(val) => updateField('colorDescription', val)}
                isEditMode={isEditMode}
                as="span"
              />
            </p>

            <div className="max-w-3xl mx-auto">
              <Accordion type="single" collapsible className="w-full space-y-4">
                <AccordionItem value="paint" className="bg-card rounded-lg border-none shadow">
                  <AccordionTrigger className="px-6 py-4 hover:no-underline">
                    <span className="font-heading font-semibold text-foreground">Paint Colors (LP SmartSide)</span>
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pb-6">
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                      {sidingOptions.paint.map((color) => (
                        <ColorSwatch key={color.name} name={color.name} color={color.color} />
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="metal" className="bg-card rounded-lg border-none shadow">
                  <AccordionTrigger className="px-6 py-4 hover:no-underline">
                    <span className="font-heading font-semibold text-foreground">Metal Roof Colors</span>
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pb-6">
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                      {sidingOptions.metal.map((color) => (
                        <ColorSwatch key={color.name} name={color.name} color={color.color} />
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </div>
        </section>

        {/* Upgrades Section */}
        <section className="bg-muted/30 py-16 md:py-24">
          <div className="container-custom">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-4 text-center">
              <InlineEditable
                value={content.upgradeHeading as string}
                fieldName="upgradeHeading"
                onChange={(val) => updateField('upgradeHeading', val)}
                isEditMode={isEditMode}
                as="span"
              />
            </h2>
            <p className="text-muted-foreground text-center mb-10 max-w-2xl mx-auto">
              <InlineEditable
                value={content.upgradeDescription as string}
                fieldName="upgradeDescription"
                type="textarea"
                onChange={(val) => updateField('upgradeDescription', val)}
                isEditMode={isEditMode}
                as="span"
              />
            </p>

            <div className="max-w-3xl mx-auto">
              <Accordion type="single" collapsible className="w-full space-y-4">
                {upgradeOptions.map((category, index) => (
                  <AccordionItem key={index} value={`upgrade-${index}`} className="bg-card rounded-lg border-none shadow">
                    <AccordionTrigger className="px-6 py-4 hover:no-underline">
                      <span className="font-heading font-semibold text-foreground">{category.category}</span>
                    </AccordionTrigger>
                    <AccordionContent className="px-6 pb-6">
                      <ul className="grid sm:grid-cols-2 gap-2">
                        {category.items.map((item, idx) => (
                          <li key={idx} className="flex items-center gap-2 text-muted-foreground">
                            <Check className="h-4 w-4 text-secondary flex-shrink-0" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
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
                  className="inline-flex items-center justify-center gap-2 bg-secondary text-secondary-foreground font-bold px-8 py-4 rounded-md hover:brightness-110 transition-all"
                >
                  {content.ctaPrimaryButton}
                  <ExternalLink className="h-4 w-4" />
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
                  className="inline-flex items-center justify-center gap-2 bg-primary-foreground/10 text-primary-foreground font-bold px-8 py-4 rounded-md hover:bg-primary-foreground/20 transition-all border border-primary-foreground/30"
                >
                  {content.ctaSecondaryButton}
                </a>
              </InlineEditableButton>
            </div>
          </div>
        </section>
      </main>

          <Footer />
        </>
      );
      }}
    </EditablePageWrapper>
  );
};

export default ModernShed;
