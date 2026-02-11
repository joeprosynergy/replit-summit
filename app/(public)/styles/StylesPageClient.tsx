"use client";

/**
 * Styles Page - Refactored for CMS-First Architecture
 * Uses EditablePageWrapper with consolidated defaults
 */

import Link from "next/link";
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { InlineEditable } from '@/components/admin/InlineEditable';
import InlineEditableLink from '@/components/admin/InlineEditableLink';
import InlineEditableImage from '@/components/admin/InlineEditableImage';
import InlineEditableButton from '@/components/admin/InlineEditableButton';
import { EditablePageWrapper } from '@/components/admin/EditablePageWrapper';
import { stylesDefaults, StylesContent, StyleItem } from '@/data/defaults/stylesDefaults';

export default function StylesPageClient({ initialContent }: { initialContent: any }) {
  return (
    <EditablePageWrapper<StylesContent>
      slug="styles"
      defaultContent={stylesDefaults}
    >
      {({ content, isEditMode, updateField }) => (
        <>
          <Header />

          <main className="pt-20">
            {/* Hero Section */}
            <section className="bg-primary py-16 md:py-24">
              <div className="container-custom text-center">
                <InlineEditable
                  value={content.heroTagline}
                  fieldName="heroTagline"
                  onChange={(v) => updateField('heroTagline', v)}
                  isEditMode={isEditMode}
                  className="text-secondary font-semibold tracking-wider uppercase mb-4"
                  as="p"
                />
                <div className="mb-6">
                  <InlineEditable
                    value={content.heroHeading}
                    fieldName="heroHeading"
                    onChange={(v) => updateField('heroHeading', v)}
                    isEditMode={isEditMode}
                    className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-primary-foreground"
                    as="h1"
                  />
                </div>
                <InlineEditable
                  value={content.heroSubheading}
                  fieldName="heroSubheading"
                  onChange={(v) => updateField('heroSubheading', v)}
                  isEditMode={isEditMode}
                  className="text-xl text-primary-foreground/80 max-w-2xl mx-auto"
                  as="p"
                />
              </div>
            </section>

            {/* Roof Styles Grid */}
            <section className="bg-background py-16 md:py-24">
              <div className="container-custom">
                <div className="bg-card rounded-lg shadow-lg overflow-hidden">
                  <div className="bg-primary py-5 px-6 text-center">
                    <InlineEditable
                      value={content.roofStylesHeader}
                      fieldName="roofStylesHeader"
                      onChange={(v) => updateField('roofStylesHeader', v)}
                      isEditMode={isEditMode}
                      className="text-2xl md:text-3xl font-heading font-bold text-primary-foreground uppercase tracking-wide"
                      as="h2"
                    />
                  </div>

                  <div className="p-6 md:p-10">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
                      {content.roofStyles.map((style, index) => (
                        <div key={style.id} className="text-center">
                          {isEditMode ? (
                            <>
                              <div className="aspect-square mb-4 overflow-hidden rounded-lg shadow-sm bg-muted">
                                <InlineEditableImage
                                  src={style.image}
                                  alt={`${style.name} storage building - Summit Portable Buildings`}
                                  onImageChange={(url) => {
                                    const updated = [...content.roofStyles];
                                    updated[index] = { ...updated[index], image: url };
                                    updateField('roofStyles', updated as unknown as string);
                                  }}
                                  isEditMode={isEditMode}
                                  imageClassName="w-full h-full transition-transform duration-300 hover:scale-105 object-cover"
                                />
                              </div>
                              <InlineEditableLink
                                text={style.name}
                                href={style.link}
                                onTextChange={(text) => {
                                  const updated = [...content.roofStyles];
                                  updated[index] = { ...updated[index], name: text };
                                  updateField('roofStyles', updated as unknown as string);
                                }}
                                onHrefChange={(href) => {
                                  const updated = [...content.roofStyles];
                                  updated[index] = { ...updated[index], link: href };
                                  updateField('roofStyles', updated as unknown as string);
                                }}
                                isEditMode={isEditMode}
                                isExternal={style.openInNewTab}
                                onExternalChange={(ext) => {
                                  const updated = [...content.roofStyles];
                                  updated[index] = { ...updated[index], openInNewTab: ext };
                                  updateField('roofStyles', updated as unknown as string);
                                }}
                                className="font-heading font-bold text-xl text-foreground hover:text-secondary transition-colors uppercase tracking-wide"
                              />
                              <InlineEditable
                                value={style.subtitle}
                                fieldName={`roof-style-${style.id}-subtitle`}
                                onChange={(v) => {
                                  const updated = [...content.roofStyles];
                                  updated[index] = { ...updated[index], subtitle: v };
                                  updateField('roofStyles', updated as unknown as string);
                                }}
                                isEditMode={isEditMode}
                                className="text-muted-foreground text-sm mt-1"
                                as="p"
                              />
                            </>
                          ) : (
                            <Link
                              href={style.link}
                              target={style.openInNewTab ? '_blank' : undefined}
                              rel={style.openInNewTab ? 'noopener noreferrer' : undefined}
                              className="block group cursor-pointer"
                            >
                              <div className="aspect-square mb-4 overflow-hidden rounded-lg shadow-sm bg-muted">
                                <img
                                  src={style.image}
                                  alt={`${style.name} storage building - Summit Portable Buildings`}
                                  className="w-full h-full transition-transform duration-300 group-hover:scale-105 object-cover"
                                />
                              </div>
                              <h3 className="font-heading font-bold text-xl text-foreground group-hover:text-secondary transition-colors uppercase tracking-wide">
                                {style.name}
                              </h3>
                              <p className="text-muted-foreground text-sm mt-1">
                                {style.subtitle}
                              </p>
                            </Link>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Specialty Structures Grid */}
            <section className="bg-muted/30 py-16 md:py-24">
              <div className="container-custom">
                <div className="bg-card rounded-lg shadow-lg overflow-hidden">
                  <div className="bg-primary py-5 px-6 text-center">
                    <InlineEditable
                      value={content.specialtyHeader}
                      fieldName="specialtyHeader"
                      onChange={(v) => updateField('specialtyHeader', v)}
                      isEditMode={isEditMode}
                      className="text-2xl md:text-3xl font-heading font-bold text-primary-foreground uppercase tracking-wide"
                      as="h2"
                    />
                  </div>

                  <div className="p-6 md:p-10">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-2xl mx-auto">
                      {content.specialtyStyles.map((style, index) => (
                        <div key={style.id} className="text-center">
                          {isEditMode ? (
                            <>
                              <div className="aspect-[4/3] mb-4 overflow-hidden rounded-lg shadow-sm bg-muted">
                                <InlineEditableImage
                                  src={style.image}
                                  alt={`${style.name} storage building - Summit Portable Buildings`}
                                  onImageChange={(url) => {
                                    const updated = [...content.specialtyStyles];
                                    updated[index] = { ...updated[index], image: url };
                                    updateField('specialtyStyles', updated as unknown as string);
                                  }}
                                  isEditMode={isEditMode}
                                  imageClassName="w-full h-full transition-transform duration-300 hover:scale-105 object-contain"
                                />
                              </div>
                              <InlineEditableLink
                                text={style.name}
                                href={style.link}
                                onTextChange={(text) => {
                                  const updated = [...content.specialtyStyles];
                                  updated[index] = { ...updated[index], name: text };
                                  updateField('specialtyStyles', updated as unknown as string);
                                }}
                                onHrefChange={(href) => {
                                  const updated = [...content.specialtyStyles];
                                  updated[index] = { ...updated[index], link: href };
                                  updateField('specialtyStyles', updated as unknown as string);
                                }}
                                isEditMode={isEditMode}
                                isExternal={style.openInNewTab}
                                onExternalChange={(ext) => {
                                  const updated = [...content.specialtyStyles];
                                  updated[index] = { ...updated[index], openInNewTab: ext };
                                  updateField('specialtyStyles', updated as unknown as string);
                                }}
                                className="font-heading font-bold text-xl text-foreground hover:text-secondary transition-colors uppercase tracking-wide"
                              />
                              <InlineEditable
                                value={style.subtitle}
                                fieldName={`specialty-style-${style.id}-subtitle`}
                                onChange={(v) => {
                                  const updated = [...content.specialtyStyles];
                                  updated[index] = { ...updated[index], subtitle: v };
                                  updateField('specialtyStyles', updated as unknown as string);
                                }}
                                isEditMode={isEditMode}
                                className="text-muted-foreground text-sm mt-1"
                                as="p"
                              />
                            </>
                          ) : (
                            <Link
                              href={style.link}
                              target={style.openInNewTab ? '_blank' : undefined}
                              rel={style.openInNewTab ? 'noopener noreferrer' : undefined}
                              className="block group cursor-pointer"
                            >
                              <div className="aspect-[4/3] mb-4 overflow-hidden rounded-lg shadow-sm bg-muted">
                                <img
                                  src={style.image}
                                  alt={`${style.name} storage building - Summit Portable Buildings`}
                                  className="w-full h-full transition-transform duration-300 group-hover:scale-105 object-contain"
                                />
                              </div>
                              <h3 className="font-heading font-bold text-xl text-foreground group-hover:text-secondary transition-colors uppercase tracking-wide">
                                {style.name}
                              </h3>
                              <p className="text-muted-foreground text-sm mt-1">
                                {style.subtitle}
                              </p>
                            </Link>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
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
                  type="textarea"
                  onChange={(v) => updateField('ctaDescription', v)}
                  isEditMode={isEditMode}
                  className="text-primary-foreground/80 text-lg mb-8 max-w-2xl mx-auto"
                  as="p"
                />
                <InlineEditableButton
                  text={content.ctaButtonText}
                  href={content.ctaButtonLink}
                  onTextChange={(v) => updateField('ctaButtonText', v)}
                  onHrefChange={(v) => updateField('ctaButtonLink', v)}
                  isEditMode={isEditMode}
                  isExternal={content.ctaButtonOpenInNewTab}
                  onExternalChange={(v) => updateField('ctaButtonOpenInNewTab', v)}
                >
                  <a
                    href={content.ctaButtonLink}
                    target={content.ctaButtonOpenInNewTab ? '_blank' : undefined}
                    rel={content.ctaButtonOpenInNewTab ? 'noopener noreferrer' : undefined}
                    className="inline-block bg-secondary text-secondary-foreground font-bold px-8 py-4 rounded-md hover:brightness-110 transition-all"
                  >
                    {content.ctaButtonText}
                  </a>
                </InlineEditableButton>
              </div>
            </section>
          </main>

          <Footer />
        </>
      )}
    </EditablePageWrapper>
  );
}
