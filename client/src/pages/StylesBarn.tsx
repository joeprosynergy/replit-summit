/**
 * StylesBarn Page - Refactored for CMS-First Architecture
 * Uses EditablePageWrapper with consolidated defaults
 */

import { Helmet } from 'react-helmet-async';
import { Link, useLocation } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { InlineEditable } from '@/components/admin/InlineEditable';
import InlineEditableLink from '@/components/admin/InlineEditableLink';
import InlineEditableImage from '@/components/admin/InlineEditableImage';
import InlineEditableButton from '@/components/admin/InlineEditableButton';
import { EditablePageWrapper } from '@/components/admin/EditablePageWrapper';
import { stylesBarnDefaults, StylesBarnContent, OptionItem } from './defaults/stylesBarnDefaults';

const StylesBarn = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  const renderOptionCard = (
    option: OptionItem,
    index: number,
    content: StylesBarnContent,
    isEditMode: boolean,
    updateField: <K extends keyof StylesBarnContent>(field: K, value: StylesBarnContent[K]) => void,
    fieldName: 'storageOptions' | 'cabinOptions'
  ) => {
    const updateOption = (field: keyof OptionItem, value: string | boolean | string[]) => {
      const options = [...(content[fieldName] as OptionItem[])];
      options[index] = { ...options[index], [field]: value };
      updateField(fieldName, options as unknown as StylesBarnContent[typeof fieldName]);
    };

    const updateFeature = (featureIndex: number, value: string) => {
      const options = [...(content[fieldName] as OptionItem[])];
      const features = [...options[index].features];
      features[featureIndex] = value;
      options[index] = { ...options[index], features };
      updateField(fieldName, options as unknown as StylesBarnContent[typeof fieldName]);
    };

    return (
      <div key={option.id} className="group bg-muted/30 rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
        {isEditMode ? (
          <>
            <div className="aspect-[4/3] overflow-hidden bg-muted">
              <InlineEditableImage
                src={option.image}
                alt={option.name}
                onImageChange={(url) => updateOption('image', url)}
                isEditMode={isEditMode}
                imageClassName="w-full h-full transition-transform duration-300 group-hover:scale-105 object-contain bg-muted"
              />
            </div>
            <div className="p-5">
              <InlineEditableLink
                text={option.name}
                href={option.link}
                onTextChange={(text) => updateOption('name', text)}
                onHrefChange={(href) => updateOption('link', href)}
                isEditMode={isEditMode}
                isExternal={option.openInNewTab}
                onExternalChange={(ext) => updateOption('openInNewTab', ext)}
                className="font-heading font-bold text-xl text-foreground group-hover:text-secondary transition-colors uppercase tracking-wide mb-2"
              />
              <InlineEditable
                value={option.description}
                fieldName={`${option.name} description`}
                onChange={(v) => updateOption('description', v)}
                isEditMode={isEditMode}
                className="text-muted-foreground text-sm mb-4"
                as="p"
              />
              <div className="space-y-1">
                <p className="text-xs font-semibold text-foreground uppercase tracking-wide">Standard Features:</p>
                <ul className="text-xs text-muted-foreground space-y-1">
                  {option.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <span className="w-1 h-1 bg-secondary rounded-full flex-shrink-0"></span>
                      <InlineEditable
                        value={feature}
                        fieldName={`${option.name} feature ${idx + 1}`}
                        onChange={(v) => updateFeature(idx, v)}
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
            to={option.link}
            state={{ from: currentPath }}
            target={option.openInNewTab ? '_blank' : undefined}
            rel={option.openInNewTab ? 'noopener noreferrer' : undefined}
            className="block"
          >
            <div className="aspect-[4/3] overflow-hidden bg-muted">
              <img
                src={option.image}
                alt={option.name}
                className="w-full h-full transition-transform duration-300 group-hover:scale-105 object-contain bg-muted"
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
                      <span className="w-1 h-1 bg-secondary rounded-full flex-shrink-0"></span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Link>
        )}
      </div>
    );
  };

  return (
    <EditablePageWrapper<StylesBarnContent>
      slug="styles-barn"
      defaultContent={stylesBarnDefaults}
    >
      {({ content, isEditMode, updateField }) => (
        <>
          <Helmet>
            <title>{content.metaTitle}</title>
            <meta name="description" content={content.metaDescription} />
            <link rel="canonical" href="https://summitbuildings.com/styles/barn" />
          </Helmet>

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
                  <Link to="/styles" className="text-secondary font-semibold tracking-wider uppercase mb-4 hover:underline inline-block">
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

            {/* Storage Section */}
            <section className="bg-background py-16 md:py-24">
              <div className="container-custom">
                <div className="bg-card rounded-lg shadow-lg overflow-hidden">
                  <div className="bg-primary py-5 px-6">
                    <InlineEditable
                      value={content.storageHeader}
                      fieldName="storageHeader"
                      onChange={(v) => updateField('storageHeader', v)}
                      isEditMode={isEditMode}
                      className="text-2xl md:text-3xl font-heading font-bold text-primary-foreground text-center uppercase tracking-wide"
                      as="h2"
                    />
                  </div>
                  <div className="p-6 md:p-10">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
                      {content.storageOptions.map((option, index) => 
                        renderOptionCard(option, index, content, isEditMode, updateField, 'storageOptions')
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Cabins & Tiny Homes Section */}
            <section className="bg-muted/30 py-16 md:py-24">
              <div className="container-custom">
                <div className="bg-card rounded-lg shadow-lg overflow-hidden">
                  <div className="bg-primary py-5 px-6">
                    <InlineEditable
                      value={content.cabinsHeader}
                      fieldName="cabinsHeader"
                      onChange={(v) => updateField('cabinsHeader', v)}
                      isEditMode={isEditMode}
                      className="text-2xl md:text-3xl font-heading font-bold text-primary-foreground text-center uppercase tracking-wide"
                      as="h2"
                    />
                  </div>
                  <div className="p-6 md:p-10">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-2xl mx-auto">
                      {content.cabinOptions.map((option, index) => 
                        renderOptionCard(option, index, content, isEditMode, updateField, 'cabinOptions')
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Looking for Something Different Section */}
            <section className="bg-muted/30 py-16 md:py-24">
              <div className="container-custom">
                <div className="bg-card rounded-lg shadow-lg overflow-hidden">
                  <div className="bg-primary py-5 px-6">
                    <InlineEditable
                      value={content.otherStylesHeader}
                      fieldName="otherStylesHeader"
                      onChange={(v) => updateField('otherStylesHeader', v)}
                      isEditMode={isEditMode}
                      className="text-2xl md:text-3xl font-heading font-bold text-primary-foreground text-center uppercase tracking-wide"
                      as="h2"
                    />
                  </div>
                  <div className="p-6 md:p-10">
                    <InlineEditable
                      value={content.otherStylesDescription}
                      fieldName="otherStylesDescription"
                      onChange={(v) => updateField('otherStylesDescription', v)}
                      isEditMode={isEditMode}
                      className="text-muted-foreground text-center mb-8 max-w-2xl mx-auto"
                      as="p"
                    />
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
                      {content.otherStyles.map((style, index) => (
                        <div key={style.id} className="text-center">
                          {isEditMode ? (
                            <>
                              <div className="aspect-square mb-4 overflow-hidden rounded-lg shadow-sm bg-muted">
                                <InlineEditableImage
                                  src={style.image}
                                  alt={style.name}
                                  onImageChange={(url) => {
                                    const updated = [...content.otherStyles];
                                    updated[index] = { ...updated[index], image: url };
                                    updateField('otherStyles', updated as unknown as string);
                                  }}
                                  isEditMode={isEditMode}
                                  imageClassName="w-full h-full transition-transform duration-300 hover:scale-105 object-contain bg-muted"
                                />
                              </div>
                              <InlineEditableLink
                                text={style.name}
                                href={style.link}
                                onTextChange={(text) => {
                                  const updated = [...content.otherStyles];
                                  updated[index] = { ...updated[index], name: text };
                                  updateField('otherStyles', updated as unknown as string);
                                }}
                                onHrefChange={(href) => {
                                  const updated = [...content.otherStyles];
                                  updated[index] = { ...updated[index], link: href };
                                  updateField('otherStyles', updated as unknown as string);
                                }}
                                isEditMode={isEditMode}
                                isExternal={style.openInNewTab}
                                onExternalChange={(ext) => {
                                  const updated = [...content.otherStyles];
                                  updated[index] = { ...updated[index], openInNewTab: ext };
                                  updateField('otherStyles', updated as unknown as string);
                                }}
                                className="font-heading font-bold text-lg text-foreground hover:text-secondary transition-colors uppercase tracking-wide"
                              />
                              <InlineEditable
                                value={style.subtitle}
                                fieldName={`${style.name} subtitle`}
                                onChange={(v) => {
                                  const updated = [...content.otherStyles];
                                  updated[index] = { ...updated[index], subtitle: v };
                                  updateField('otherStyles', updated as unknown as string);
                                }}
                                isEditMode={isEditMode}
                                className="text-muted-foreground text-sm mt-1"
                                as="p"
                              />
                            </>
                          ) : (
                            <Link
                              to={style.link}
                              target={style.openInNewTab ? '_blank' : undefined}
                              rel={style.openInNewTab ? 'noopener noreferrer' : undefined}
                              className="group block"
                            >
                              <div className="aspect-square mb-4 overflow-hidden rounded-lg shadow-sm bg-muted">
                                <img
                                  src={style.image}
                                  alt={style.name}
                                  className="w-full h-full transition-transform duration-300 group-hover:scale-105 object-contain bg-muted"
                                />
                              </div>
                              <h3 className="font-heading font-bold text-lg text-foreground group-hover:text-secondary transition-colors uppercase tracking-wide">
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
};

export default StylesBarn;
