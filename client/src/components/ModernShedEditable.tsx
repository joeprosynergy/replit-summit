/**
 * ModernShedEditable - Modern Shed Admin Component
 * ADMIN ONLY - Lazy-loaded for authenticated admins
 * SPECIAL LAYOUT - Has unique "Why" cards and uses with descriptions
 */

import { Helmet } from 'react-helmet-async';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Check, Home, Wrench, Briefcase, Palette, ExternalLink, Plus, X } from 'lucide-react';
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

import { ModernShedContent, WhyReason } from '@/pages/defaults/modernShedDefaults';

const ColorSwatch = ({ name, color }: { name: string; color: string }) => (
  <div className="flex items-center gap-2">
    <div
      className="w-6 h-6 rounded-full border border-border shadow-sm"
      style={{ backgroundColor: color }}
    />
    <span className="text-sm text-muted-foreground">{name}</span>
  </div>
);

// Icon mapping for "Why" reasons
const WhyIcon = ({ type }: { type: WhyReason['iconType'] }) => {
  const iconProps = { className: 'w-6 h-6 text-secondary' };
  switch (type) {
    case 'home':
      return <Home {...iconProps} />;
    case 'wrench':
      return <Wrench {...iconProps} />;
    case 'briefcase':
      return <Briefcase {...iconProps} />;
    case 'palette':
      return <Palette {...iconProps} />;
    default:
      return <Check {...iconProps} />;
  }
};

interface ModernShedEditableProps {
  initialContent: ModernShedContent;
}

export default function ModernShedEditable({ initialContent }: ModernShedEditableProps) {
  const backPath = useBackPath(initialContent.backPath);

  return (
    <EditablePageWrapper<ModernShedContent>
      slug="modern-shed"
      defaultContent={initialContent}
    >
      {({ content, isEditMode, updateField }) => (
        <>
          <Helmet>
            <title>{content.metaTitle}</title>
            <meta name="description" content={content.metaDescription} />
            {content.canonicalUrl && <link rel="canonical" href={content.canonicalUrl} />}
          </Helmet>

          <Header />

          <main className="pt-20">
            {/* Hero Section */}
            <div className="relative">
              <ProductHero
                backPath={backPath}
                title={content.title || 'MODERN'}
                titleHighlight={content.titleHighlight || 'SHED'}
                description={content.description}
                image={content.heroImage}
                imageAlt={content.heroImageAlt}
                isEditMode={isEditMode}
                onUpdateField={(field, value) => updateField(field as keyof ModernShedContent, value as string)}
                ctaButtons={[
                  {
                    text: content.heroButton1Text || 'Design Your Building',
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
                        text={content.heroButton1Text || 'Design Your Building'}
                        href={content.heroButton1Link || 'https://summitbuildings.shedpro.co/'}
                        isExternal={content.heroButton1OpenInNewTab ?? true}
                        onTextChange={(val) => updateField('heroButton1Text', val)}
                        onHrefChange={(val) => updateField('heroButton1Link', val)}
                        onExternalChange={(val) => updateField('heroButton1OpenInNewTab', val)}
                        isEditMode={isEditMode}
                      >
                        <Button variant="outline" size="sm" className="w-full justify-start">
                          {content.heroButton1Text || 'Design Your Building'}
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

            {/* Gallery Section */}
            {content.galleryImages.length > 0 && (
              <section className="section-padding bg-background">
                <div className="container-custom">
                  {isEditMode ? (
                    <>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
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

            {/* Features Section */}
            <section className="section-padding bg-muted/30">
              <div className="container-custom">
                <div className="max-w-4xl mx-auto">
                  <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4 text-center">
                    <InlineEditable
                      value={content.featuresHeading}
                      fieldName="featuresHeading"
                      onChange={(val) => updateField('featuresHeading', val)}
                      isEditMode={isEditMode}
                      as="span"
                    />
                  </h2>
                  <p className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
                    <InlineEditable
                      value={content.featuresDescription}
                      fieldName="featuresDescription"
                      type="textarea"
                      onChange={(val) => updateField('featuresDescription', val)}
                      isEditMode={isEditMode}
                      as="span"
                    />
                  </p>

                  <div className="bg-card rounded-xl p-8 border border-border shadow-lg">
                    <div className="grid sm:grid-cols-2 gap-4">
                      {content.features.map((feature, index) => (
                        <div key={index} className="flex items-center gap-3 text-foreground">
                          <Check className="w-5 h-5 text-secondary flex-shrink-0" />
                          <span>
                            <InlineEditable
                              value={feature}
                              fieldName={`feature${index}`}
                              onChange={(val) => {
                                const updatedFeatures = [...content.features];
                                updatedFeatures[index] = val;
                                updateField('features', updatedFeatures as unknown as string);
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
            </section>

            {/* Why Modern Style Section */}
            <section className="section-padding bg-background">
              <div className="container-custom">
                <div className="flex items-center justify-between mb-12">
                  <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground text-center flex-1">
                    <InlineEditable
                      value={content.whyHeading}
                      fieldName="whyHeading"
                      onChange={(val) => updateField('whyHeading', val)}
                      isEditMode={isEditMode}
                      as="span"
                    />
                  </h2>
                  {isEditMode && (
                    <span className="text-xs text-muted-foreground bg-muted px-3 py-1 rounded-full">
                      Cards edited via database
                    </span>
                  )}
                </div>

                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
                  {content.whyReasons.map((reason) => (
                    <div
                      key={reason.id}
                      className="bg-card rounded-xl p-6 border border-border shadow-sm hover:shadow-md transition-shadow"
                    >
                      <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center mb-4">
                        <WhyIcon type={reason.iconType} />
                      </div>
                      <h3 className="font-heading text-lg font-bold text-foreground mb-2">
                        {reason.title}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {reason.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Ideal Uses Section */}
            <section className="section-padding bg-muted/30">
              <div className="container-custom">
                <div className="flex items-center justify-between mb-12">
                  <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground text-center flex-1">
                    <InlineEditable
                      value={content.usesHeading}
                      fieldName="usesHeading"
                      onChange={(val) => updateField('usesHeading', val)}
                      isEditMode={isEditMode}
                      as="span"
                    />
                  </h2>
                  {isEditMode && (
                    <span className="text-xs text-muted-foreground bg-muted px-3 py-1 rounded-full">
                      Use cases edited via database
                    </span>
                  )}
                </div>

                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
                  {content.useCases.map((useCase) => (
                    <div
                      key={useCase.id}
                      className="bg-card rounded-xl p-6 border border-border shadow-sm"
                    >
                      <h3 className="font-heading text-lg font-bold text-foreground mb-2">
                        {useCase.title}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {useCase.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Color & Material Options */}
            <section className="section-padding bg-background">
              <div className="container-custom">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground text-center flex-1">
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
                <p className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
                  <InlineEditable
                    value={content.colorDescription}
                    fieldName="colorDescription"
                    type="textarea"
                    onChange={(val) => updateField('colorDescription', val)}
                    isEditMode={isEditMode}
                    as="span"
                  />
                </p>

                <div className="bg-card rounded-lg border border-border overflow-hidden max-w-4xl mx-auto">
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
                          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 pt-4">
                            {category.colors.map((swatch) => (
                              <ColorSwatch
                                key={swatch.name}
                                name={swatch.name}
                                color={swatch.color}
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

            {/* Upgrades Section */}
            <section className="section-padding bg-muted/30">
              <div className="container-custom">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground text-center flex-1">
                    <InlineEditable
                      value={content.upgradeHeading}
                      fieldName="upgradeHeading"
                      onChange={(val) => updateField('upgradeHeading', val)}
                      isEditMode={isEditMode}
                      as="span"
                    />
                  </h2>
                  {isEditMode && (
                    <span className="text-xs text-muted-foreground bg-muted px-3 py-1 rounded-full">
                      Upgrades edited via database
                    </span>
                  )}
                </div>
                <p className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
                  <InlineEditable
                    value={content.upgradeDescription}
                    fieldName="upgradeDescription"
                    type="textarea"
                    onChange={(val) => updateField('upgradeDescription', val)}
                    isEditMode={isEditMode}
                    as="span"
                  />
                </p>

                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
                  {content.upgradeCategories.map((category) => (
                    <div
                      key={category.id}
                      className="bg-card rounded-xl p-6 border border-border/50"
                    >
                      <h3 className="font-heading text-lg font-bold text-foreground mb-4">
                        {category.category}
                      </h3>
                      <ul className="space-y-2">
                        {category.items.map((item, index) => (
                          <li
                            key={index}
                            className="text-sm text-muted-foreground flex items-start gap-2"
                          >
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

            {/* CTA Section */}
            <section className="section-padding bg-primary">
              <div className="container-custom text-center">
                <h2 className="font-heading text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
                  <InlineEditable
                    value={content.ctaHeading || 'Ready to Design Your Modern Shed?'}
                    fieldName="ctaHeading"
                    onChange={(val) => updateField('ctaHeading', val)}
                    isEditMode={isEditMode}
                    as="span"
                  />
                </h2>
                <p className="text-primary-foreground/80 text-lg mb-8 max-w-2xl mx-auto">
                  <InlineEditable
                    value={content.ctaDescription || 'Use our online configurator to customize your perfect Modern Shed.'}
                    fieldName="ctaDescription"
                    type="textarea"
                    onChange={(val) => updateField('ctaDescription', val)}
                    isEditMode={isEditMode}
                    as="span"
                  />
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <InlineEditableButton
                    text={content.ctaPrimaryButton || 'Design Your Building'}
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
                        {content.ctaPrimaryButton || 'Design Your Building'}
                        <ExternalLink className="w-5 h-5" />
                      </Button>
                    </a>
                  </InlineEditableButton>
                  <InlineEditableButton
                    text={content.ctaSecondaryButton || 'Contact Us'}
                    href={content.ctaSecondaryButtonLink || '/contact-us'}
                    isExternal={content.ctaSecondaryButtonOpenInNewTab ?? false}
                    onTextChange={(val) => updateField('ctaSecondaryButton', val)}
                    onHrefChange={(val) => updateField('ctaSecondaryButtonLink', val)}
                    onExternalChange={(val) => updateField('ctaSecondaryButtonOpenInNewTab', val)}
                    isEditMode={isEditMode}
                  >
                    <a
                      href={content.ctaSecondaryButtonLink || '/contact-us'}
                      target={content.ctaSecondaryButtonOpenInNewTab ? '_blank' : undefined}
                      rel={content.ctaSecondaryButtonOpenInNewTab ? 'noopener noreferrer' : undefined}
                    >
                      <Button variant="heroOutline" size="xl">
                        {content.ctaSecondaryButton || 'Contact Us'}
                      </Button>
                    </a>
                  </InlineEditableButton>
                </div>
              </div>
            </section>
          </main>

          <Footer />
        </>
      )}
    </EditablePageWrapper>
  );
}
