import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useAdminAuth } from '@/hooks/useAdminAuth';
import { useEditablePageContent, PageContent } from '@/hooks/useEditablePageContent';
import { useSectionContent } from '@/hooks/useSectionContent';
import { InlineEditable } from '@/components/admin/InlineEditable';
import InlineEditableLink from '@/components/admin/InlineEditableLink';
import InlineEditableImage from '@/components/admin/InlineEditableImage';
import InlineEditableButton from '@/components/admin/InlineEditableButton';
import { AdminEditMode } from '@/components/admin/AdminEditMode';
import { usePageManagement } from '@/hooks/usePageManagement';

import modernShed1 from '@/assets/modern-shed-1.jpg';
import garageImage from '@/assets/garage-1.jpg';

interface OptionItem {
  id: string;
  name: string;
  description: string;
  features: string[];
  image: string;
  link: string;
  openInNewTab: boolean;
}

interface OptionsContent {
  options: OptionItem[];
}

interface CtaSettings {
  buttonLink: string;
  buttonOpenInNewTab: boolean;
}

interface SectionHeaders {
  sectionTitle: string;
}

const defaultOptions: OptionsContent = {
  options: [
    {
      id: 'pro',
      name: 'Pro',
      description: 'Premium quality with single slope roof and contemporary design.',
      features: ['LP SmartSide siding', '2x6 floor joists 12" OC', '6" Overhangs', 'Single slope roof'],
      image: modernShed1,
      link: '/types/deluxe-storage-cabins/modern-shed',
      openInNewTab: false
    },
    {
      id: 'garage',
      name: 'Garage',
      description: 'Secure vehicle and equipment storage with easy access.',
      features: ['LP SmartSide siding', '2x6 floor joists 12" OC', 'Garage door included'],
      image: garageImage,
      link: '/types/garages-carports/garage',
      openInNewTab: false
    },
  ]
};

const defaultCtaSettings: CtaSettings = {
  buttonLink: 'https://summitbuildings.shedpro.co/',
  buttonOpenInNewTab: true,
};

const defaultSectionHeaders: SectionHeaders = {
  sectionTitle: "Choose Your Option",
};

const defaultContent: PageContent = {
  heading: "Modern Style",
  tagline: "← Back to Styles",
  subheading: "Single Slope Roof — Contemporary design with clean, sleek lines",
  ctaHeading: "Ready to Get Started?",
  ctaDescription: "Design your perfect modern building online in minutes",
  ctaButton: "Design Your Building",
  metaTitle: "Modern Style Buildings | Summit Portable Buildings",
  metaDescription: "Explore our Modern style buildings with single slope roofs. Choose from Pro or Garage options for a contemporary look.",
};

const StylesModern = () => {
  const { isAdmin } = useAdminAuth();
  const { showDuplicateDialog, showDeleteDialog, newSlug, isDuplicating, isDeleting, setNewSlug, setShowDuplicateDialog, setShowDeleteDialog, duplicatePage, deletePage } = usePageManagement('styles-modern');

  const {
    content,
    editedContent,
    isLoading: isPageLoading,
    isSaving: isPageSaving,
    isEditMode,
    hasChanges: hasPageChanges,
    updateField,
    save: savePage,
    reset: resetPage,
    startEditing,
  } = useEditablePageContent('styles-modern', defaultContent);

  const {
    content: optionsContent,
    isLoading: isOptionsLoading,
    isSaving: isOptionsSaving,
    hasChanges: hasOptionsChanges,
    updateField: updateOptionsField,
    save: saveOptions,
    reset: resetOptions,
  } = useSectionContent('styles-modern', 'options', defaultOptions as any) as {
    content: OptionsContent;
    originalContent: OptionsContent;
    isLoading: boolean;
    isSaving: boolean;
    hasChanges: boolean;
    updateField: <K extends keyof OptionsContent>(field: K, value: OptionsContent[K]) => void;
    save: () => Promise<boolean>;
    reset: () => void;
  };

  const {
    content: ctaSettings,
    isLoading: isCtaLoading,
    isSaving: isCtaSaving,
    hasChanges: hasCtaChanges,
    updateField: updateCtaField,
    save: saveCtaSettings,
    reset: resetCtaSettings,
  } = useSectionContent('styles-modern', 'cta-settings', defaultCtaSettings as any) as {
    content: CtaSettings;
    originalContent: CtaSettings;
    isLoading: boolean;
    isSaving: boolean;
    hasChanges: boolean;
    updateField: <K extends keyof CtaSettings>(field: K, value: CtaSettings[K]) => void;
    save: () => Promise<boolean>;
    reset: () => void;
  };

  const {
    content: sectionHeaders,
    isLoading: isHeadersLoading,
    isSaving: isHeadersSaving,
    hasChanges: hasHeadersChanges,
    updateField: updateHeadersField,
    save: saveSectionHeaders,
    reset: resetSectionHeaders,
  } = useSectionContent('styles-modern', 'section-headers', defaultSectionHeaders as any) as {
    content: SectionHeaders;
    originalContent: SectionHeaders;
    isLoading: boolean;
    isSaving: boolean;
    hasChanges: boolean;
    updateField: <K extends keyof SectionHeaders>(field: K, value: SectionHeaders[K]) => void;
    save: () => Promise<boolean>;
    reset: () => void;
  };

  const [localOptions, setLocalOptions] = useState<OptionItem[]>(defaultOptions.options);
  const [localCtaSettings, setLocalCtaSettings] = useState<CtaSettings>(defaultCtaSettings);
  const [localHeaders, setLocalHeaders] = useState<SectionHeaders>(defaultSectionHeaders);

  useEffect(() => {
    if (optionsContent?.options) {
      setLocalOptions(optionsContent.options);
    }
  }, [optionsContent]);

  useEffect(() => {
    if (ctaSettings) {
      setLocalCtaSettings(ctaSettings);
    }
  }, [ctaSettings]);

  useEffect(() => {
    if (sectionHeaders) {
      setLocalHeaders(sectionHeaders);
    }
  }, [sectionHeaders]);

  const updateOption = (index: number, field: keyof OptionItem, value: string | boolean | string[]) => {
    const updated = [...localOptions];
    updated[index] = { ...updated[index], [field]: value };
    setLocalOptions(updated);
    updateOptionsField('options', updated);
  };

  const updateOptionFeature = (optionIndex: number, featureIndex: number, value: string) => {
    const updated = [...localOptions];
    const features = [...updated[optionIndex].features];
    features[featureIndex] = value;
    updated[optionIndex] = { ...updated[optionIndex], features };
    setLocalOptions(updated);
    updateOptionsField('options', updated);
  };

  const handleSave = async () => {
    await Promise.all([
      savePage(),
      saveOptions(),
      saveCtaSettings(),
      saveSectionHeaders(),
    ]);
  };

  const handleReset = () => {
    resetPage();
    resetOptions();
    resetCtaSettings();
    resetSectionHeaders();
    if (optionsContent?.options) setLocalOptions(optionsContent.options);
    if (ctaSettings) setLocalCtaSettings(ctaSettings);
    if (sectionHeaders) setLocalHeaders(sectionHeaders);
  };

  const isLoading = isPageLoading || isOptionsLoading || isCtaLoading || isHeadersLoading;
  const isSaving = isPageSaving || isOptionsSaving || isCtaSaving || isHeadersSaving;
  const hasChanges = hasPageChanges || hasOptionsChanges || hasCtaChanges || hasHeadersChanges;

  if (isLoading) {
    return null;
  }

  return (
    <>
      <Helmet>
        <title>{content.metaTitle}</title>
        <meta name="description" content={content.metaDescription} />
        <link rel="canonical" href="https://summitbuildings.com/styles/modern" />
      </Helmet>

      <Header />

      <AdminEditMode
        isAdmin={isAdmin}
        isEditMode={isEditMode}
        hasChanges={hasChanges}
        isSaving={isSaving}
        onToggleEdit={startEditing}
        onSave={handleSave}
        onCancel={handleReset}
        pageSlug="styles-modern"
        showDuplicateDialog={showDuplicateDialog}
        showDeleteDialog={showDeleteDialog}
        newSlug={newSlug}
        isDuplicating={isDuplicating}
        isDeleting={isDeleting}
        onSetNewSlug={setNewSlug}
        onSetShowDuplicateDialog={setShowDuplicateDialog}
        onSetShowDeleteDialog={setShowDeleteDialog}
        onDuplicatePage={duplicatePage}
        onDeletePage={deletePage}
      />

      <main className="pt-20">
        {/* Hero Section */}
        <section className="bg-primary py-16 md:py-24">
          <div className="container-custom text-center">
            {isEditMode ? (
              <InlineEditable
                value={editedContent.tagline}
                fieldName="back link"
                onChange={(v) => updateField('tagline', v)}
                isEditMode={isEditMode}
                className="text-secondary font-semibold tracking-wider uppercase mb-4 inline-block"
                as="span"
              />
            ) : (
              <Link to="/styles" className="text-secondary font-semibold tracking-wider uppercase mb-4 hover:underline inline-block">
                {content.tagline}
              </Link>
            )}
            <div className="mb-6">
              <InlineEditable
                value={editedContent.heading}
                fieldName="heading"
                onChange={(v) => updateField('heading', v)}
                isEditMode={isEditMode}
                className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-primary-foreground"
                as="h1"
              />
            </div>
            <InlineEditable
              value={editedContent.subheading}
              fieldName="subheading"
              onChange={(v) => updateField('subheading', v)}
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
                  value={localHeaders.sectionTitle}
                  fieldName="section title"
                  onChange={(v) => { setLocalHeaders({ ...localHeaders, sectionTitle: v }); updateHeadersField('sectionTitle', v); }}
                  isEditMode={isEditMode}
                  className="text-2xl md:text-3xl font-heading font-bold text-primary-foreground text-center uppercase tracking-wide"
                  as="h2"
                />
              </div>

              <div className="p-6 md:p-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-2xl mx-auto">
                  {localOptions.map((option, index) => (
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
                          to={option.link}
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
              value={editedContent.ctaHeading}
              fieldName="CTA heading"
              onChange={(v) => updateField('ctaHeading', v)}
              isEditMode={isEditMode}
              className="text-3xl md:text-4xl font-heading font-bold text-primary-foreground mb-6"
              as="h2"
            />
            <InlineEditable
              value={editedContent.ctaDescription}
              fieldName="CTA description"
              onChange={(v) => updateField('ctaDescription', v)}
              isEditMode={isEditMode}
              className="text-primary-foreground/80 text-lg mb-8 max-w-2xl mx-auto"
              as="p"
            />
            <InlineEditableButton
              text={editedContent.ctaButton}
              href={localCtaSettings.buttonLink}
              onTextChange={(v) => updateField('ctaButton', v)}
              onHrefChange={(v) => { setLocalCtaSettings({ ...localCtaSettings, buttonLink: v }); updateCtaField('buttonLink', v); }}
              isEditMode={isEditMode}
              isExternal={localCtaSettings.buttonOpenInNewTab}
              onExternalChange={(v) => { setLocalCtaSettings({ ...localCtaSettings, buttonOpenInNewTab: v }); updateCtaField('buttonOpenInNewTab', v); }}
            >
              <a
                href={localCtaSettings.buttonLink}
                target={localCtaSettings.buttonOpenInNewTab ? '_blank' : undefined}
                rel={localCtaSettings.buttonOpenInNewTab ? 'noopener noreferrer' : undefined}
                className="inline-block bg-secondary text-secondary-foreground font-bold px-8 py-4 rounded-md hover:brightness-110 transition-all"
              >
                {content.ctaButton}
              </a>
            </InlineEditableButton>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
};

export default StylesModern;
