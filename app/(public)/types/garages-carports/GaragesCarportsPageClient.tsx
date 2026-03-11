"use client";

/**
 * GaragesCarports Page Client - Ported to Next.js Client Component
 * Uses EditablePageWrapper with consolidated defaults
 */

import { useEffect } from 'react';
import Link from "next/link";
import { Check, X, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import InventoryLink from '@/components/InventoryLink';
import { InlineEditable } from '@/components/admin/InlineEditable';
import InlineEditableImage from '@/components/admin/InlineEditableImage';
import InlineEditableButton from '@/components/admin/InlineEditableButton';
import { EditablePageWrapper } from '@/components/admin/EditablePageWrapper';
import { garagesCarportsDefaults, GaragesCarportsContent, ModelItem, QuickNavItem } from '@/data/defaults/garagesCarportsDefaults';

export default function GaragesCarportsPageClient({ initialContent }: { initialContent: any }) {
  useEffect(() => {
    if (window.location.hash) {
      const element = document.getElementById(window.location.hash.slice(1));
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100);
      }
    }
  }, []);

  return (
    <EditablePageWrapper<GaragesCarportsContent>
      slug="garages-carports"
      defaultContent={garagesCarportsDefaults}
    >
      {({ content, isEditMode, updateField }) => {
        const updateModel = (index: number, field: keyof ModelItem, value: string | boolean | string[]) => {
          const updated = [...content.models];
          updated[index] = { ...updated[index], [field]: value };
          updateField('models', updated as unknown as string);
        };

        const updateModelFeature = (modelIndex: number, featureIndex: number, value: string) => {
          const updated = [...content.models];
          const features = [...updated[modelIndex].features];
          features[featureIndex] = value;
          updated[modelIndex] = { ...updated[modelIndex], features };
          updateField('models', updated as unknown as string);
        };

        const updateModelGallery = (modelIndex: number, galleryIndex: number, value: string) => {
          const updated = [...content.models];
          const gallery = [...updated[modelIndex].gallery];
          gallery[galleryIndex] = value;
          updated[modelIndex] = { ...updated[modelIndex], gallery };
          updateField('models', updated as unknown as string);
        };

        const addModelGalleryImage = (modelIndex: number) => {
          const updated = [...content.models];
          const gallery = [...updated[modelIndex].gallery];
          if (gallery.length < 6) {
            gallery.push('/placeholder.svg');
            updated[modelIndex] = { ...updated[modelIndex], gallery };
            updateField('models', updated as unknown as string);
          }
        };

        const deleteModelGalleryImage = (modelIndex: number, galleryIndex: number) => {
          const updated = [...content.models];
          const gallery = [...updated[modelIndex].gallery];
          gallery.splice(galleryIndex, 1);
          updated[modelIndex] = { ...updated[modelIndex], gallery };
          updateField('models', updated as unknown as string);
        };

        const updateQuickNavItem = (index: number, field: keyof QuickNavItem, value: string) => {
          const updated = [...content.quickNavItems];
          updated[index] = { ...updated[index], [field]: value };
          updateField('quickNavItems', updated as unknown as string);
        };

        return (
          <>
            <main className="pt-20">
              {/* Quick Nav */}
              <section className="bg-primary py-8">
                <div className="container-custom">
                  <div className="bg-card rounded-lg shadow-lg p-6 md:p-8">
                    <InlineEditable
                      value={content.quickNavTitle}
                      fieldName="quickNavTitle"
                      onChange={(v) => updateField('quickNavTitle', v)}
                      isEditMode={isEditMode}
                      className="text-2xl md:text-3xl font-heading font-bold text-center text-primary mb-8 uppercase tracking-wide"
                      as="h2"
                    />
                    <div className="grid grid-cols-3 gap-4 md:gap-6 max-w-3xl mx-auto">
                      {content.quickNavItems.map((item, index) => (
                        <div key={item.id} className="group text-center">
                          {isEditMode ? (
                            <>
                              <div className="aspect-square mb-3 overflow-hidden rounded-lg bg-muted">
                                <InlineEditableImage
                                  src={item.image}
                                  alt={`${item.name} garage or carport - Summit Portable Buildings`}
                                  onImageChange={(url) => updateQuickNavItem(index, 'image', url)}
                                  isEditMode={isEditMode}
                                  imageClassName="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                                />
                              </div>
                              <InlineEditable
                                value={item.name}
                                fieldName={`${item.name} quick nav name`}
                                onChange={(v) => updateQuickNavItem(index, 'name', v)}
                                isEditMode={isEditMode}
                                className="font-heading font-bold text-foreground group-hover:text-secondary transition-colors uppercase text-sm md:text-base tracking-wide"
                                as="h3"
                              />
                            </>
                          ) : (
                            <a href={`#${item.id}`} className="block">
                              <div className="aspect-square mb-3 overflow-hidden rounded-lg bg-muted">
                                <img
                                  src={item.image}
                                  alt={`${item.name} garage or carport - Summit Portable Buildings`}
                                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                                />
                              </div>
                              <h3 className="font-heading font-bold text-foreground group-hover:text-secondary transition-colors uppercase text-sm md:text-base tracking-wide">
                                {item.name}
                              </h3>
                            </a>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </section>

              {/* Models Detail Sections */}
              <section className="bg-background">
                {content.models.map((model, index) => (
                  <div
                    key={model.id}
                    id={model.id}
                    className={`py-16 md:py-24 scroll-mt-24 ${index % 2 === 1 ? 'bg-muted/50' : ''}`}
                  >
                    <div className="container-custom">
                      {/* Section Header */}
                      <div className="bg-primary rounded-t-lg py-4 px-6 mb-0">
                        <InlineEditable
                          value={model.name}
                          fieldName={`${model.name} header`}
                          onChange={(v) => updateModel(index, 'name', v)}
                          isEditMode={isEditMode}
                          className="text-2xl md:text-3xl font-heading font-bold text-primary-foreground uppercase tracking-wide"
                          as="h2"
                        />
                      </div>

                      {/* Content */}
                      <div className="bg-card rounded-b-lg shadow-md p-6 md:p-10">
                        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
                          {/* Text Content */}
                          <div className={index % 2 === 1 ? 'md:order-2' : ''}>
                            <InlineEditable
                              value={model.tagline}
                              fieldName={`${model.name} tagline`}
                              onChange={(v) => updateModel(index, 'tagline', v)}
                              isEditMode={isEditMode}
                              className="text-xl md:text-2xl font-heading font-bold text-foreground mb-4 uppercase"
                              as="h3"
                            />
                            <ul className="space-y-3 mb-8">
                              {model.features.map((feature, i) => (
                                <li key={i} className="flex items-center gap-3">
                                  <Check className="w-5 h-5 text-secondary flex-shrink-0" />
                                  <InlineEditable
                                    value={feature}
                                    fieldName={`${model.name} feature ${i + 1}`}
                                    onChange={(v) => updateModelFeature(index, i, v)}
                                    isEditMode={isEditMode}
                                    className="text-muted-foreground"
                                    as="span"
                                  />
                                </li>
                              ))}
                            </ul>
                            <div className="flex flex-col sm:flex-row gap-4">
                              {isEditMode ? (
                                <>
                                  <InlineEditableButton
                                    text="View Details"
                                    href={model.detailLink}
                                    onTextChange={() => {}}
                                    onHrefChange={(v) => updateModel(index, 'detailLink', v)}
                                    isEditMode={isEditMode}
                                    isExternal={model.detailLinkOpenInNewTab}
                                    onExternalChange={(v) => updateModel(index, 'detailLinkOpenInNewTab', v)}
                                  >
                                    <Button variant="hero" size="lg">View Details</Button>
                                  </InlineEditableButton>
                                  <InlineEditableButton
                                    text={model.inventoryButtonText}
                                    href={model.inventoryLink}
                                    onTextChange={(v) => updateModel(index, 'inventoryButtonText', v)}
                                    onHrefChange={(v) => updateModel(index, 'inventoryLink', v)}
                                    isEditMode={isEditMode}
                                    isExternal={model.inventoryLinkOpenInNewTab}
                                    onExternalChange={(v) => updateModel(index, 'inventoryLinkOpenInNewTab', v)}
                                  >
                                    <Button variant="outline" size="lg">{model.inventoryButtonText}</Button>
                                  </InlineEditableButton>
                                </>
                              ) : (
                                <>
                                  <Link
                                    href={model.detailLink}
                                    target={model.detailLinkOpenInNewTab ? '_blank' : undefined}
                                    rel={model.detailLinkOpenInNewTab ? 'noopener noreferrer' : undefined}
                                  >
                                    <Button variant="hero" size="lg">View Details</Button>
                                  </Link>
                                  {model.inventoryLink ? (
                                    <a
                                      href={model.inventoryLink}
                                      target={model.inventoryLinkOpenInNewTab ? '_blank' : undefined}
                                      rel={model.inventoryLinkOpenInNewTab ? 'noopener noreferrer' : undefined}
                                    >
                                      <Button variant="outline" size="lg">
                                        {model.inventoryButtonText}
                                      </Button>
                                    </a>
                                  ) : (
                                    <InventoryLink>
                                      <Button variant="outline" size="lg">
                                        {model.inventoryButtonText}
                                      </Button>
                                    </InventoryLink>
                                  )}
                                </>
                              )}
                            </div>
                          </div>

                          {/* Image and Gallery */}
                          <div className={index % 2 === 1 ? 'md:order-1' : ''}>
                            <div className="aspect-[4/3] rounded-lg overflow-hidden shadow-lg mb-4">
                              {isEditMode ? (
                                <InlineEditableImage
                                  src={model.image}
                                  alt={`${model.name} portable garage - Summit Portable Buildings`}
                                  onImageChange={(url) => updateModel(index, 'image', url)}
                                  isEditMode={isEditMode}
                                  imageClassName="w-full h-full object-cover"
                                />
                              ) : (
                                <img
                                  src={model.image}
                                  alt={`${model.name} portable garage - Summit Portable Buildings`}
                                  className="w-full h-full object-cover"
                                />
                              )}
                            </div>
                            {/* Gallery thumbnails - up to 6 small images */}
                            <div className="grid grid-cols-6 gap-2">
                              {model.gallery.slice(0, 6).map((img, i) => (
                                <div key={i} className="aspect-square rounded overflow-hidden bg-muted relative group">
                                  {isEditMode ? (
                                    <>
                                      <InlineEditableImage
                                        src={img}
                                        alt={`${model.name} gallery ${i + 1}`}
                                        onImageChange={(url) => updateModelGallery(index, i, url)}
                                        isEditMode={isEditMode}
                                        imageClassName="w-full h-full object-cover hover:scale-105 transition-transform cursor-pointer"
                                      />
                                      <button
                                        onClick={() => deleteModelGalleryImage(index, i)}
                                        className="absolute top-1 right-1 bg-destructive text-destructive-foreground rounded-full p-0.5 opacity-0 group-hover:opacity-100 transition-opacity"
                                        title="Delete image"
                                      >
                                        <X className="w-3 h-3" />
                                      </button>
                                    </>
                                  ) : (
                                    <img src={img} alt="" className="w-full h-full object-cover hover:scale-105 transition-transform cursor-pointer" />
                                  )}
                                </div>
                              ))}
                              {isEditMode && model.gallery.length < 6 && (
                                <button
                                  onClick={() => addModelGalleryImage(index)}
                                  className="aspect-square rounded overflow-hidden bg-muted flex items-center justify-center border-2 border-dashed border-muted-foreground/30 hover:border-muted-foreground/50 transition-colors"
                                  title="Add gallery image"
                                >
                                  <Plus className="w-6 h-6 text-muted-foreground/50" />
                                </button>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </section>

              {/* CTA Section */}
              <section className="bg-primary py-16">
                <div className="container-custom text-center">
                  <InlineEditable
                    value={content.ctaHeading}
                    fieldName="ctaHeading"
                    onChange={(v) => updateField('ctaHeading', v)}
                    isEditMode={isEditMode}
                    className="text-3xl md:text-4xl font-heading font-bold text-primary-foreground mb-6"
                    as="h2"
                  />
                  <InlineEditable
                    value={content.ctaDescription}
                    fieldName="ctaDescription"
                    onChange={(v) => updateField('ctaDescription', v)}
                    isEditMode={isEditMode}
                    className="text-primary-foreground/80 text-lg mb-8 max-w-2xl mx-auto"
                    as="p"
                  />
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    {isEditMode ? (
                      <>
                        <InlineEditableButton
                          text={content.ctaPhoneText}
                          href={content.ctaPhoneNumber}
                          onTextChange={(v) => updateField('ctaPhoneText', v)}
                          onHrefChange={(v) => updateField('ctaPhoneNumber', v)}
                          isEditMode={isEditMode}
                          isExternal={false}
                          onExternalChange={() => {}}
                        >
                          <span className="inline-block bg-secondary text-secondary-foreground font-bold px-8 py-4 rounded-md hover:brightness-110 transition-all">
                            {content.ctaPhoneText}
                          </span>
                        </InlineEditableButton>
                        <InlineEditableButton
                          text={content.ctaSecondaryButtonText}
                          href={content.ctaSecondaryButtonLink}
                          onTextChange={(v) => updateField('ctaSecondaryButtonText', v)}
                          onHrefChange={(v) => updateField('ctaSecondaryButtonLink', v)}
                          isEditMode={isEditMode}
                          isExternal={content.ctaSecondaryButtonOpenInNewTab}
                          onExternalChange={(v) => updateField('ctaSecondaryButtonOpenInNewTab', v)}
                        >
                          <span className="inline-block border-2 border-primary-foreground/30 text-primary-foreground font-bold px-8 py-4 rounded-md hover:bg-primary-foreground hover:text-primary transition-all">
                            {content.ctaSecondaryButtonText}
                          </span>
                        </InlineEditableButton>
                      </>
                    ) : (
                      <>
                        <a
                          href={content.ctaPhoneNumber}
                          className="inline-block bg-secondary text-secondary-foreground font-bold px-8 py-4 rounded-md hover:brightness-110 transition-all"
                        >
                          {content.ctaPhoneText}
                        </a>
                        <Link
                          href={content.ctaSecondaryButtonLink}
                          target={content.ctaSecondaryButtonOpenInNewTab ? '_blank' : undefined}
                          rel={content.ctaSecondaryButtonOpenInNewTab ? 'noopener noreferrer' : undefined}
                          className="inline-block border-2 border-primary-foreground/30 text-primary-foreground font-bold px-8 py-4 rounded-md hover:bg-primary-foreground hover:text-primary transition-all"
                        >
                          {content.ctaSecondaryButtonText}
                        </Link>
                      </>
                    )}
                  </div>
                </div>
              </section>
            </main>

          </>
        );
      }}
    </EditablePageWrapper>
  );
}
