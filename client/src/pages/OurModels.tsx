/**
 * OurModels (Types) Page - Refactored for CMS-First Architecture
 * Uses EditablePageWrapper with consolidated defaults
 */

import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { InlineEditable } from '@/components/admin/InlineEditable';
import InlineEditableLink from '@/components/admin/InlineEditableLink';
import InlineEditableImage from '@/components/admin/InlineEditableImage';
import InlineEditableButton from '@/components/admin/InlineEditableButton';
import { EditablePageWrapper } from '@/components/admin/EditablePageWrapper';
import { ourModelsDefaults, OurModelsContent, CategoryItem, ModelItem } from './defaults/ourModelsDefaults';

const OurModels = () => {
  return (
    <EditablePageWrapper<OurModelsContent>
      slug="types"
      defaultContent={ourModelsDefaults}
    >
      {({ content, isEditMode, updateField }) => {
        const updateCategory = (categoryIndex: number, field: keyof CategoryItem, value: string) => {
          const updated = [...content.categories];
          updated[categoryIndex] = { ...updated[categoryIndex], [field]: value };
          updateField('categories', updated as unknown as string);
        };

        const updateModel = (categoryIndex: number, modelIndex: number, field: keyof ModelItem, value: string | boolean) => {
          const updated = [...content.categories];
          updated[categoryIndex] = {
            ...updated[categoryIndex],
            models: updated[categoryIndex].models.map((m, i) =>
              i === modelIndex ? { ...m, [field]: value } : m
            ),
          };
          updateField('categories', updated as unknown as string);
        };

        return (
          <>
            <Helmet>
              <title>{content.metaTitle}</title>
              <meta name="description" content={content.metaDescription} />
              <link rel="canonical" href="https://summitbuildings.com/types" />
            </Helmet>

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

              {/* Categories */}
              <section className="bg-background">
                {content.categories.map((category, categoryIndex) => (
                  <div 
                    key={category.id} 
                    className={`py-16 md:py-24 ${categoryIndex % 2 === 1 ? 'bg-muted/30' : ''}`}
                  >
                    <div className="container-custom">
                      {/* Unified Card Container */}
                      <div className="bg-card rounded-lg shadow-lg overflow-hidden">
                        {/* Category Header - directly connected */}
                        <div className="bg-primary py-5 px-6 text-center">
                          <InlineEditable
                            value={category.name}
                            fieldName={`category-${category.id}-name`}
                            onChange={(v) => updateCategory(categoryIndex, 'name', v)}
                            isEditMode={isEditMode}
                            className="text-2xl md:text-3xl font-heading font-bold text-primary-foreground uppercase tracking-wide"
                            as="h2"
                          />
                          <InlineEditable
                            value={category.description}
                            fieldName={`category-${category.id}-description`}
                            onChange={(v) => updateCategory(categoryIndex, 'description', v)}
                            isEditMode={isEditMode}
                            className="text-primary-foreground/80 mt-2"
                            as="p"
                          />
                        </div>

                        {/* Models Grid - no gap from header */}
                        <div className="p-6 md:p-10">
                          <div className={`grid gap-6 md:gap-8 ${
                            category.models.length <= 2 
                              ? 'grid-cols-2 max-w-md mx-auto' 
                              : category.models.length === 3 
                                ? 'grid-cols-3 max-w-2xl mx-auto' 
                                : 'grid-cols-2 md:grid-cols-4 max-w-4xl mx-auto'
                          }`}>
                            {category.models.map((model, modelIndex) => (
                              <div key={`${category.id}-${modelIndex}`} className="text-center group">
                                <Link
                                  to={model.link}
                                  target={model.openInNewTab ? '_blank' : undefined}
                                  rel={model.openInNewTab ? 'noopener noreferrer' : undefined}
                                  className="block"
                                  tabIndex={isEditMode ? -1 : 0}
                                  aria-hidden={isEditMode}
                                  onClick={isEditMode ? (e) => e.preventDefault() : undefined}
                                >
                                  <div className="aspect-square mb-4 overflow-hidden rounded-lg shadow-sm bg-muted">
                                    <InlineEditableImage
                                      src={model.image}
                                      alt={model.name}
                                      onImageChange={(url) => updateModel(categoryIndex, modelIndex, 'image', url)}
                                      isEditMode={isEditMode}
                                      imageClassName="w-full h-full transition-transform duration-300 group-hover:scale-105 object-cover"
                                    />
                                  </div>
                                </Link>
                                {isEditMode ? (
                                  <InlineEditableLink
                                    text={model.name}
                                    href={model.link}
                                    onTextChange={(text) => updateModel(categoryIndex, modelIndex, 'name', text)}
                                    onHrefChange={(href) => updateModel(categoryIndex, modelIndex, 'link', href)}
                                    isEditMode={isEditMode}
                                    isExternal={model.openInNewTab}
                                    onExternalChange={(ext) => updateModel(categoryIndex, modelIndex, 'openInNewTab', ext)}
                                    className="font-heading font-bold text-foreground hover:text-secondary transition-colors uppercase tracking-wide"
                                  />
                                ) : (
                                  <Link
                                    to={model.link}
                                    target={model.openInNewTab ? '_blank' : undefined}
                                    rel={model.openInNewTab ? 'noopener noreferrer' : undefined}
                                    className="font-heading font-bold text-foreground group-hover:text-secondary transition-colors uppercase tracking-wide"
                                  >
                                    {model.name}
                                  </Link>
                                )}
                              </div>
                            ))}
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
        );
      }}
    </EditablePageWrapper>
  );
};

export default OurModels;
