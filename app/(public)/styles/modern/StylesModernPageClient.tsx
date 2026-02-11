"use client";

/**
 * StylesModernPageClient - Next.js Client Component
 * Ported from Vite React page for CMS-First Architecture
 * Uses EditablePageWrapper with consolidated defaults
 */

import Link from "next/link";
import { usePathname } from "next/navigation";

/** Append ?from=styles to product links so breadcrumbs know the origin */
const withStylesFrom = (link: string) =>
  link.startsWith('/types/') ? `${link}?from=styles` : link;
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { InlineEditable } from '@/components/admin/InlineEditable';
import InlineEditableLink from '@/components/admin/InlineEditableLink';
import InlineEditableImage from '@/components/admin/InlineEditableImage';
import InlineEditableButton from '@/components/admin/InlineEditableButton';
import { EditablePageWrapper } from '@/components/admin/EditablePageWrapper';
import { stylesModernDefaults, StylesModernContent, OptionItem } from '@/data/defaults/stylesModernDefaults';

export default function StylesModernPageClient({ initialContent }: { initialContent: any }) {
  const currentPath = usePathname();

  return (
    <EditablePageWrapper<StylesModernContent>
      slug="styles-modern"
      defaultContent={stylesModernDefaults}
      initialContent={initialContent}
    >
      {({ content, isEditMode, updateField }) => {
        const updateOption = (index: number, field: keyof OptionItem, value: string | boolean | string[]) => {
          const updated = [...content.options];
          updated[index] = { ...updated[index], [field]: value };
          updateField('options', updated as unknown as string);
        };

        const updateOptionFeature = (optionIndex: number, featureIndex: number, value: string) => {
          const updated = [...content.options];
          const features = [...updated[optionIndex].features];
          features[featureIndex] = value;
          updated[optionIndex] = { ...updated[optionIndex], features };
          updateField('options', updated as unknown as string);
        };

        return (
          <>
            <Header />

            <main className="pt-20">
              {/* Hero Section */}
              <section className="bg-primary py-16 md:py-24">
                <div className="container-custom text-center">
                  {isEditMode ? (
                    <InlineEditable
                      value={content.heroTagline}
                      fieldName="heroTagline"
                      onChange={(v) => updateField('heroTagline', v)}
                      isEditMode={isEditMode}
                      className="text-secondary font-semibold tracking-wider uppercase mb-4 inline-block"
                      as="span"
                    />
                  ) : (
                    <Link href="/styles" className="text-secondary font-semibold tracking-wider uppercase mb-4 hover:underline inline-block">
                      {content.heroTagline}
                    </Link>
                  )}
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

              {/* Options Grid */}
              <section className="bg-background py-16 md:py-24">
                <div className="container-custom">
                  <div className="bg-card rounded-lg shadow-lg overflow-hidden">
                    <div className="bg-primary py-5 px-6">
                      <InlineEditable
                        value={content.sectionTitle}
                        fieldName="sectionTitle"
                        onChange={(v) => updateField('sectionTitle', v)}
                        isEditMode={isEditMode}
                        className="text-2xl md:text-3xl font-heading font-bold text-primary-foreground text-center uppercase tracking-wide"
                        as="h2"
                      />
                    </div>

                    <div className="p-6 md:p-10">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-2xl mx-auto">
                        {content.options.map((option, index) => (
                          <div key={option.id} className="group bg-muted/30 rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
                            {isEditMode ? (
                              <>
                                <div className="aspect-video overflow-hidden">
                                  <InlineEditableImage
                                    src={option.image}
                                    alt={option.name}
                                    onImageChange={(url) => updateOption(index, 'image', url)}
                                    isEditMode={isEditMode}
                                    imageClassName="w-full h-full transition-transform duration-300 group-hover:scale-105 object-cover"
                                  />
                                </div>
                                <div className="p-5">
                                  <InlineEditableLink
                                    text={option.name}
                                    href={option.link}
                                    onTextChange={(text) => updateOption(index, 'name', text)}
                                    onHrefChange={(href) => updateOption(index, 'link', href)}
                                    isEditMode={isEditMode}
                                    isExternal={option.openInNewTab}
                                    onExternalChange={(ext) => updateOption(index, 'openInNewTab', ext)}
                                    className="font-heading font-bold text-xl text-foreground group-hover:text-secondary transition-colors uppercase tracking-wide mb-2"
                                  />
                                  <InlineEditable
                                    value={option.description}
                                    fieldName={`${option.name} description`}
                                    onChange={(v) => updateOption(index, 'description', v)}
                                    isEditMode={isEditMode}
                                    className="text-muted-foreground text-sm mb-4"
                                    as="p"
                                  />
                                  <div className="space-y-1">
                                    <p className="text-xs font-semibold text-foreground uppercase tracking-wide">Standard Features:</p>
                                    <ul className="text-xs text-muted-foreground space-y-1">
                                      {option.features.map((feature, idx) => (
                                        <li key={idx} className="flex items-center gap-2">
                                          <span className="w-1 h-1 bg-secondary rounded-full"></span>
                                          <InlineEditable
                                            value={feature}
                                            fieldName={`${option.name} feature ${idx + 1}`}
                                            onChange={(v) => updateOptionFeature(index, idx, v)}
                                            isEditMode={isEditMode}
                                            as="span"
                                          />
                                        </li>
                                      ))}
                                    </ul>
                                  </div>
                                </div>
                              </>
                            ) : (
                              <Link
                                href={withStylesFrom(option.link)}
                                target={option.openInNewTab ? '_blank' : undefined}
                                rel={option.openInNewTab ? 'noopener noreferrer' : undefined}
                                className="block"
                              >
                                <div className="aspect-video overflow-hidden">
                                  <img
                                    src={option.image}
                                    alt={option.name}
                                    className="w-full h-full transition-transform duration-300 group-hover:scale-105 object-cover"
                                  />
                                </div>
                                <div className="p-5">
                                  <h3 className="font-heading font-bold text-xl text-foreground group-hover:text-secondary transition-colors uppercase tracking-wide mb-2">
                                    {option.name}
                                  </h3>
                                  <p className="text-muted-foreground text-sm mb-4">
                                    {option.description}
                                  </p>
                                  <div className="space-y-1">
                                    <p className="text-xs font-semibold text-foreground uppercase tracking-wide">Standard Features:</p>
                                    <ul className="text-xs text-muted-foreground space-y-1">
                                      {option.features.map((feature, idx) => (
                                        <li key={idx} className="flex items-center gap-2">
                                          <span className="w-1 h-1 bg-secondary rounded-full"></span>
                                          {feature}
                                        </li>
                                      ))}
                                    </ul>
                                  </div>
                                </div>
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
        );
      }}
    </EditablePageWrapper>
  );
}
