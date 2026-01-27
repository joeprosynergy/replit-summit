/**
 * ProductPageEditable - Generic Product Page Admin Component
 * ADMIN ONLY - This component is lazy-loaded only for authenticated admins.
 * Contains full inline editing functionality.
 */

import { Helmet } from 'react-helmet-async';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Check, ArrowRight, Plus, X } from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import GallerySection from '@/components/GallerySection';
import ProductHero from '@/components/ProductHero';
import { useBackPath } from '@/hooks/useBackPath';

// Admin imports - only loaded for admins
import { EditablePageWrapper } from '@/components/admin/EditablePageWrapper';
import { InlineEditable } from '@/components/admin/InlineEditable';
import InlineEditableButton from '@/components/admin/InlineEditableButton';
import InlineEditableImage from '@/components/admin/InlineEditableImage';
import InlineEditableSidingCategory from '@/components/admin/InlineEditableSidingCategory';
import InlineEditableUpgradeCategory from '@/components/admin/InlineEditableUpgradeCategory';

import {
  ProductPageContent,
  ProductPageConfig,
  extractGalleryImages,
  extractFeatures,
  extractUses,
  SidingCategory,
  UpgradeCategory,
} from '@/pages/defaults/productPageTypes';
import { SimpleColorSwatch } from '@/components/ui/GlobalColorSwatch';

// ============================================================================
// Main Component
// ============================================================================

interface ProductPageEditableProps {
  initialContent: ProductPageContent;
  config: ProductPageConfig;
}

export default function ProductPageEditable({
  initialContent,
  config,
}: ProductPageEditableProps) {
  const backPath = useBackPath(initialContent.backPath);

  return (
    <EditablePageWrapper<ProductPageContent>
      slug={config.slug}
      defaultContent={initialContent}
    >
      {({ content, isEditMode, updateField, updateDynamicField }) => {
        // Extract dynamic content - support both array format and dynamic fields
        const galleryImages = content.galleryImages?.length 
          ? content.galleryImages 
          : extractGalleryImages(content as Record<string, unknown>);
        const features = content.features?.length ? content.features : extractFeatures(content as Record<string, unknown>);
        const uses = content.uses?.length ? content.uses : extractUses(content as Record<string, unknown>);

        // Gallery management functions - update the galleryImages array directly
        const updateGalleryImage = (index: number, src: string) => {
          const newImages = [...galleryImages];
          if (newImages[index]) {
            newImages[index] = { ...newImages[index], src };
          }
          updateField('galleryImages', newImages as unknown as string);
        };

        const updateGalleryImageAlt = (index: number, alt: string) => {
          const newImages = [...galleryImages];
          if (newImages[index]) {
            newImages[index] = { ...newImages[index], alt };
          }
          updateField('galleryImages', newImages as unknown as string);
        };

        const addGalleryImage = () => {
          const newImages = [...galleryImages, { src: '/placeholder-shed.jpg', alt: 'New gallery image' }];
          updateField('galleryImages', newImages as unknown as string);
        };

        const deleteGalleryImage = (indexToDelete: number) => {
          const newImages = galleryImages.filter((_, i) => i !== indexToDelete);
          updateField('galleryImages', newImages as unknown as string);
        };

        return (
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
                    title={content.title}
                    titleHighlight={content.titleHighlight}
                    titlePosition={content.titlePosition}
                    description={content.description}
                    secondaryDescription={content.secondaryDescription}
                    subtitle={content.subtitle}
                    image={content.heroImage}
                    imageAlt={content.heroImageAlt}
                    isEditMode={isEditMode}
                    onUpdateField={(field, value) => updateField(field as keyof ProductPageContent, value as string | boolean)}
                    ctaButtons={[
                      {
                        text: content.heroButton1Text,
                        href: content.heroButton1Link,
                        variant: 'hero',
                        external: content.heroButton1OpenInNewTab,
                      },
                      {
                        text: content.heroButton2Text,
                        href: content.heroButton2Link,
                        variant: 'heroOutline',
                        external: content.heroButton2OpenInNewTab,
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
                        <div className="mt-2">
                          <p className="text-xs text-muted-foreground mb-1">Alt Text:</p>
                          <InlineEditable
                            value={content.heroImageAlt}
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
                            text={content.heroButton1Text}
                            href={content.heroButton1Link}
                            isExternal={content.heroButton1OpenInNewTab}
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
                            text={content.heroButton2Text}
                            href={content.heroButton2Link}
                            isExternal={content.heroButton2OpenInNewTab}
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
                {config.showGallerySection && galleryImages.length > 0 && (
                  <section className="section-padding bg-background">
                    <div className="container-custom">
                      {isEditMode ? (
                        <>
                          <div className={`grid grid-cols-2 md:grid-cols-${config.galleryColumns || 3} gap-4 mb-8`}>
                            {galleryImages.map((img, index) => (
                              <div key={index} className="relative group">
                                <InlineEditableImage
                                  src={img.src}
                                  alt={img.alt}
                                  onImageChange={(url) => updateGalleryImage(index, url)}
                                  isEditMode={isEditMode}
                                  className="w-full aspect-video object-cover rounded-lg"
                                />
                                <button
                                  onClick={() => deleteGalleryImage(index)}
                                  className="absolute top-2 right-2 bg-destructive text-destructive-foreground rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                                  title="Delete image"
                                >
                                  <X className="w-4 h-4" />
                                </button>
                                <div className="mt-2">
                                  <InlineEditable
                                    value={img.alt}
                                    fieldName={`galleryAlt${index}`}
                                    onChange={(val) => updateGalleryImageAlt(index, val)}
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
                )}

                {/* Features Section */}
                {config.showFeaturesSection && (
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
                          {content.featuresHighlight && (
                            <>
                              {' '}
                              <span className="text-secondary">
                                <InlineEditable
                                  value={content.featuresHighlight}
                                  fieldName="featuresHighlight"
                                  onChange={(val) => updateField('featuresHighlight', val)}
                                  isEditMode={isEditMode}
                                  as="span"
                                />
                              </span>
                            </>
                          )}
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

                        <div className="grid md:grid-cols-2 gap-8 items-center">
                          <div className="relative">
                            <InlineEditableImage
                              src={content.featureImage}
                              alt={content.featureImageAlt}
                              onImageChange={(url) => updateField('featureImage', url)}
                              isEditMode={isEditMode}
                              className="rounded-xl shadow-lg w-full"
                            />
                            <div className="absolute -bottom-3 -right-3 bg-secondary text-primary-foreground px-4 py-2 rounded-lg font-heading text-sm">
                              <InlineEditable
                                value={content.featureBadge}
                                fieldName="featureBadge"
                                onChange={(val) => updateField('featureBadge', val)}
                                isEditMode={isEditMode}
                                as="span"
                              />
                            </div>
                            {isEditMode && (
                              <div className="mt-4">
                                <InlineEditable
                                  value={content.featureImageAlt}
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
                              {content.featuresCardTitle || `${config.productName} Features`}
                            </h3>
                            <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2">
                              {features.map((feature, index) => (
                                <div key={index} className="flex items-center gap-3 text-foreground">
                                  <Check className="w-5 h-5 text-secondary flex-shrink-0" />
                                  <span>
                                    <InlineEditable
                                      value={feature}
                                      fieldName={`feature${index + 1}`}
                                      onChange={(val) => updateDynamicField(`feature${index + 1}`, val)}
                                      isEditMode={isEditMode}
                                      as="span"
                                    />
                                  </span>
                                </div>
                              ))}
                            </div>
                            {content.featureNote !== undefined && (
                              <p className="text-xs text-muted-foreground italic mt-6">
                                <InlineEditable
                                  value={content.featureNote || ''}
                                  fieldName="featureNote"
                                  type="textarea"
                                  onChange={(val) => updateField('featureNote', val)}
                                  isEditMode={isEditMode}
                                  as="span"
                                />
                              </p>
                            )}
                            <div className="mt-6">
                              <InlineEditableButton
                                text={content.designButtonText}
                                href={content.designButtonLink}
                                isExternal={content.designButtonOpenInNewTab}
                                onTextChange={(val) => updateField('designButtonText', val)}
                                onHrefChange={(val) => updateField('designButtonLink', val)}
                                onExternalChange={(val) => updateField('designButtonOpenInNewTab', val)}
                                isEditMode={isEditMode}
                              >
                                <a
                                  href={content.designButtonLink}
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
                )}

                {/* Uses Section */}
                {config.showUsesSection && uses.length > 0 && (
                  <section className="section-padding bg-background">
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
                          {uses.map((use, index) => (
                            <div
                              key={index}
                              className="flex items-center gap-3 bg-card p-4 rounded-lg border border-border/50"
                            >
                              <Check className="w-5 h-5 text-secondary flex-shrink-0" />
                              <span className="text-foreground font-medium">
                                <InlineEditable
                                  value={use}
                                  fieldName={`use${index + 1}`}
                                  onChange={(val) => updateDynamicField(`use${index + 1}`, val)}
                                  isEditMode={isEditMode}
                                  as="span"
                                />
                              </span>
                            </div>
                          ))}
                        </div>
                        {content.usesNote !== undefined && (
                          <p className="text-center text-muted-foreground mt-8 text-sm">
                            <InlineEditable
                              value={content.usesNote || ''}
                              fieldName="usesNote"
                              type="textarea"
                              onChange={(val) => updateField('usesNote', val)}
                              isEditMode={isEditMode}
                              as="span"
                            />
                          </p>
                        )}
                      </div>
                    </div>
                  </section>
                )}

                {/* Color & Siding Options Section */}
                {config.showSidingSection && content.sidingCategories?.length > 0 && (
                  <section className="section-padding bg-muted/30">
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
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => {
                              const newCategory: SidingCategory = {
                                id: `category-${Date.now()}`,
                                title: 'New Category',
                                colors: [],
                              };
                              updateField('sidingCategories', [...content.sidingCategories, newCategory] as any);
                            }}
                          >
                            <Plus className="w-4 h-4 mr-2" />
                            Add Category
                          </Button>
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
                            <InlineEditableSidingCategory
                              key={category.id}
                              id={category.id}
                              title={category.title}
                              colors={category.colors}
                              onTitleChange={(title) => {
                                const newCategories = [...content.sidingCategories];
                                newCategories[index] = { ...newCategories[index], title };
                                updateField('sidingCategories', newCategories as any);
                              }}
                              onColorsChange={(colors) => {
                                console.log('[ProductPageEditable] onColorsChange called:', {
                                  categoryIndex: index,
                                  newColors: colors,
                                  currentCategories: content.sidingCategories
                                });
                                const newCategories = [...content.sidingCategories];
                                newCategories[index] = { ...newCategories[index], colors };
                                console.log('[ProductPageEditable] Calling updateField with:', newCategories);
                                updateField('sidingCategories', newCategories as any);
                              }}
                              onDelete={() => {
                                const newCategories = content.sidingCategories.filter((_, i) => i !== index);
                                updateField('sidingCategories', newCategories as any);
                              }}
                              isEditMode={isEditMode}
                            />
                          ))}
                        </Accordion>
                      </div>
                    </div>
                  </section>
                )}

                {/* Upgrades Section */}
                {config.showUpgradesSection && content.showUpgradesSection && content.upgradeCategories?.length > 0 && (
                  <section className="section-padding bg-background">
                    <div className="container-custom">
                      <div className="flex items-center justify-between mb-8">
                        <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground">
                          <InlineEditable
                            value={content.upgradeHeading || 'Available Upgrades'}
                            fieldName="upgradeHeading"
                            onChange={(val) => updateField('upgradeHeading', val)}
                            isEditMode={isEditMode}
                            as="span"
                          />
                        </h2>
                        {isEditMode && (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => {
                              const newCategory: UpgradeCategory = {
                                id: `upgrade-${Date.now()}`,
                                category: 'New Upgrade Category',
                                items: [],
                              };
                              updateField('upgradeCategories', [...content.upgradeCategories, newCategory] as any);
                            }}
                          >
                            <Plus className="w-4 h-4 mr-2" />
                            Add Category
                          </Button>
                        )}
                      </div>

                      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {content.upgradeCategories.map((category, index) => (
                          <InlineEditableUpgradeCategory
                            key={category.id}
                            id={category.id}
                            category={category.category}
                            items={category.items}
                            onCategoryChange={(categoryName) => {
                              const newCategories = [...content.upgradeCategories];
                              newCategories[index] = { ...newCategories[index], category: categoryName };
                              updateField('upgradeCategories', newCategories as any);
                            }}
                            onItemsChange={(items) => {
                              const newCategories = [...content.upgradeCategories];
                              newCategories[index] = { ...newCategories[index], items };
                              updateField('upgradeCategories', newCategories as any);
                            }}
                            onDelete={() => {
                              const newCategories = content.upgradeCategories.filter((_, i) => i !== index);
                              updateField('upgradeCategories', newCategories as any);
                            }}
                            isEditMode={isEditMode}
                          />
                        ))}
                      </div>
                    </div>
                  </section>
                )}

                {/* Important Notes Section */}
                {content.showImportantNote && (
                  <section className="py-8 bg-muted/30">
                    <div className="container-custom">
                      <div className="max-w-3xl mx-auto text-center">
                        <p className="text-sm text-muted-foreground">
                          <InlineEditable
                            value={content.importantNote || ''}
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
                <section
                  className={`section-padding ${
                    content.ctaVariant === 'navy'
                      ? 'bg-navy'
                      : content.ctaVariant === 'solid'
                      ? 'bg-primary'
                      : 'bg-gradient-to-r from-secondary to-primary'
                  }`}
                >
                  <div className="container-custom text-center">
                    <h2 className="font-heading text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
                      <InlineEditable
                        value={content.ctaHeading}
                        fieldName="ctaHeading"
                        onChange={(val) => updateField('ctaHeading', val)}
                        isEditMode={isEditMode}
                        as="span"
                      />
                    </h2>
                    <p className="text-primary-foreground/90 text-lg mb-8 max-w-2xl mx-auto">
                      <InlineEditable
                        value={content.ctaDescription}
                        fieldName="ctaDescription"
                        type="textarea"
                        onChange={(val) => updateField('ctaDescription', val)}
                        isEditMode={isEditMode}
                        as="span"
                      />
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                      <InlineEditableButton
                        text={content.ctaPrimaryButton}
                        href={content.ctaPrimaryButtonLink}
                        onTextChange={(val) => updateField('ctaPrimaryButton', val)}
                        onHrefChange={(val) => updateField('ctaPrimaryButtonLink', val)}
                        isEditMode={isEditMode}
                        isExternal={content.ctaPrimaryButtonOpenInNewTab}
                        onExternalChange={(val) => updateField('ctaPrimaryButtonOpenInNewTab', val)}
                      >
                        <a
                          href={content.ctaPrimaryButtonLink}
                          target={content.ctaPrimaryButtonOpenInNewTab ? '_blank' : undefined}
                          rel={content.ctaPrimaryButtonOpenInNewTab ? 'noopener noreferrer' : undefined}
                        >
                          <Button
                            variant="heroOutline"
                            size="xl"
                            className="bg-primary-foreground text-foreground hover:bg-primary-foreground/90"
                          >
                            {content.ctaPrimaryButton}
                            <ArrowRight className="w-5 h-5" />
                          </Button>
                        </a>
                      </InlineEditableButton>
                      <InlineEditableButton
                        text={content.ctaSecondaryButton}
                        href={content.ctaSecondaryButtonLink}
                        onTextChange={(val) => updateField('ctaSecondaryButton', val)}
                        onHrefChange={(val) => updateField('ctaSecondaryButtonLink', val)}
                        isEditMode={isEditMode}
                        isExternal={content.ctaSecondaryButtonOpenInNewTab}
                        onExternalChange={(val) => updateField('ctaSecondaryButtonOpenInNewTab', val)}
                      >
                        <a
                          href={content.ctaSecondaryButtonLink}
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
