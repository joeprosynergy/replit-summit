import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Link } from 'react-router-dom';
import { cloudinaryImages } from '@/lib/cloudinary';
import { useAdminAuth } from '@/hooks/useAdminAuth';
import { useEditablePageContent, PageContent } from '@/hooks/useEditablePageContent';
import { useSectionContent } from '@/hooks/useSectionContent';
import { InlineEditable } from '@/components/admin/InlineEditable';
import InlineEditableLink from '@/components/admin/InlineEditableLink';
import InlineEditableImage from '@/components/admin/InlineEditableImage';
import InlineEditableButton from '@/components/admin/InlineEditableButton';
import { AdminEditMode } from '@/components/admin/AdminEditMode';
import { usePageManagement } from '@/hooks/usePageManagement';

interface StyleItem {
  id: string;
  name: string;
  subtitle: string;
  image: string;
  link: string;
  openInNewTab: boolean;
}

interface StylesContent {
  styles: StyleItem[];
}

interface CtaSettings {
  buttonLink: string;
  buttonOpenInNewTab: boolean;
}

interface SectionHeaders {
  roofStylesHeader: string;
  specialtyHeader: string;
}

const defaultRoofStyles: StylesContent = {
  styles: [
    {
      id: 'utility',
      name: 'Utility',
      subtitle: 'Traditional A-Frame Roof',
      image: cloudinaryImages.utilityShed3,
      link: '/styles/utility',
      openInNewTab: false
    },
    {
      id: 'barn',
      name: 'Barn',
      subtitle: 'Gambrel Roof',
      image: cloudinaryImages.sideLoftedBarn4,
      link: '/styles/barn',
      openInNewTab: false
    },
    {
      id: 'modern',
      name: 'Modern',
      subtitle: 'Single Slope Roof',
      image: cloudinaryImages.modernShed,
      link: '/styles/modern',
      openInNewTab: false
    },
  ]
};

const defaultSpecialtyStyles: StylesContent = {
  styles: [
    {
      id: 'greenhouse',
      name: 'Greenhouse',
      subtitle: 'Grow Year-Round',
      image: cloudinaryImages.greenhouse1,
      link: '/styles/greenhouse',
      openInNewTab: false
    },
    {
      id: 'animal-shelters',
      name: 'Animal Shelters',
      subtitle: 'Kennels & Coops',
      image: cloudinaryImages.animalShelter1,
      link: '/styles/animal-shelters',
      openInNewTab: false
    },
  ]
};

const defaultCtaSettings: CtaSettings = {
  buttonLink: 'https://summitbuildings.shedpro.co/',
  buttonOpenInNewTab: true,
};

const defaultSectionHeaders: SectionHeaders = {
  roofStylesHeader: 'Choose Your Style',
  specialtyHeader: 'Specialty Structures',
};

const defaultContent: PageContent = {
  heading: "Building Styles",
  tagline: "Find Your Perfect Style",
  subheading: "Select a roof style to explore available options",
  ctaHeading: "Ready to Get Started?",
  ctaDescription: "Design your perfect building online in minutes",
  ctaButton: "Design Your Building",
  metaTitle: "Building Styles | Summit Portable Buildings",
  metaDescription: "Choose your preferred building style - Utility with traditional A-frame roof, Barn with gambrel roof, Modern with single slope roof, plus Greenhouses and Animal Shelters.",
};

const Styles = () => {
  const { isAdmin } = useAdminAuth();
  const { showDuplicateDialog, showDeleteDialog, newSlug, isDuplicating, isDeleting, setNewSlug, setShowDuplicateDialog, setShowDeleteDialog, duplicatePage, deletePage } = usePageManagement('styles');
  
  // Page content hook for hero and CTA text
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
  } = useEditablePageContent('styles', defaultContent);

  // Section content hooks with type casting (same pattern as OurModels)
  const {
    content: roofStylesContent,
    isLoading: isRoofLoading,
    isSaving: isRoofSaving,
    hasChanges: hasRoofChanges,
    updateField: updateRoofField,
    save: saveRoofStyles,
    reset: resetRoofStyles,
  } = useSectionContent('styles', 'roof-styles', defaultRoofStyles as any) as {
    content: StylesContent;
    originalContent: StylesContent;
    isLoading: boolean;
    isSaving: boolean;
    hasChanges: boolean;
    updateField: <K extends keyof StylesContent>(field: K, value: StylesContent[K]) => void;
    save: () => Promise<boolean>;
    reset: () => void;
  };

  const {
    content: specialtyStylesContent,
    isLoading: isSpecialtyLoading,
    isSaving: isSpecialtySaving,
    hasChanges: hasSpecialtyChanges,
    updateField: updateSpecialtyField,
    save: saveSpecialtyStyles,
    reset: resetSpecialtyStyles,
  } = useSectionContent('styles', 'specialty-styles', defaultSpecialtyStyles as any) as {
    content: StylesContent;
    originalContent: StylesContent;
    isLoading: boolean;
    isSaving: boolean;
    hasChanges: boolean;
    updateField: <K extends keyof StylesContent>(field: K, value: StylesContent[K]) => void;
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
  } = useSectionContent('styles', 'cta-settings', defaultCtaSettings as any) as {
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
  } = useSectionContent('styles', 'section-headers', defaultSectionHeaders as any) as {
    content: SectionHeaders;
    originalContent: SectionHeaders;
    isLoading: boolean;
    isSaving: boolean;
    hasChanges: boolean;
    updateField: <K extends keyof SectionHeaders>(field: K, value: SectionHeaders[K]) => void;
    save: () => Promise<boolean>;
    reset: () => void;
  };

  // Local state for editing
  const [localRoofStyles, setLocalRoofStyles] = useState<StyleItem[]>(defaultRoofStyles.styles);
  const [localSpecialtyStyles, setLocalSpecialtyStyles] = useState<StyleItem[]>(defaultSpecialtyStyles.styles);
  const [localCtaSettings, setLocalCtaSettings] = useState<CtaSettings>(defaultCtaSettings);
  const [localSectionHeaders, setLocalSectionHeaders] = useState<SectionHeaders>(defaultSectionHeaders);

  // Sync local state with content from hooks
  useEffect(() => {
    if (roofStylesContent?.styles) {
      setLocalRoofStyles(roofStylesContent.styles);
    }
  }, [roofStylesContent]);

  useEffect(() => {
    if (specialtyStylesContent?.styles) {
      setLocalSpecialtyStyles(specialtyStylesContent.styles);
    }
  }, [specialtyStylesContent]);

  useEffect(() => {
    if (ctaSettings) {
      setLocalCtaSettings(ctaSettings);
    }
  }, [ctaSettings]);

  useEffect(() => {
    if (sectionHeaders) {
      setLocalSectionHeaders(sectionHeaders);
    }
  }, [sectionHeaders]);

  // Update functions for roof styles
  const updateRoofStyle = (index: number, field: keyof StyleItem, value: string | boolean) => {
    const updated = [...localRoofStyles];
    updated[index] = { ...updated[index], [field]: value };
    setLocalRoofStyles(updated);
    updateRoofField('styles', updated);
  };

  // Update functions for specialty styles
  const updateSpecialtyStyle = (index: number, field: keyof StyleItem, value: string | boolean) => {
    const updated = [...localSpecialtyStyles];
    updated[index] = { ...updated[index], [field]: value };
    setLocalSpecialtyStyles(updated);
    updateSpecialtyField('styles', updated);
  };

  // Update CTA settings
  const updateCtaButtonLink = (link: string) => {
    const updated = { ...localCtaSettings, buttonLink: link };
    setLocalCtaSettings(updated);
    updateCtaField('buttonLink', link);
  };

  const updateCtaButtonOpenInNewTab = (openInNewTab: boolean) => {
    const updated = { ...localCtaSettings, buttonOpenInNewTab: openInNewTab };
    setLocalCtaSettings(updated);
    updateCtaField('buttonOpenInNewTab', openInNewTab);
  };

  // Update section headers
  const updateSectionHeader = (field: keyof SectionHeaders, value: string) => {
    const updated = { ...localSectionHeaders, [field]: value };
    setLocalSectionHeaders(updated);
    updateHeadersField(field, value);
  };

  // Combined save/reset handlers
  const handleSave = async () => {
    await Promise.all([
      savePage(),
      saveRoofStyles(),
      saveSpecialtyStyles(),
      saveCtaSettings(),
      saveSectionHeaders(),
    ]);
  };

  const handleReset = () => {
    resetPage();
    resetRoofStyles();
    resetSpecialtyStyles();
    resetCtaSettings();
    resetSectionHeaders();
    // Reset local state
    if (roofStylesContent?.styles) setLocalRoofStyles(roofStylesContent.styles);
    if (specialtyStylesContent?.styles) setLocalSpecialtyStyles(specialtyStylesContent.styles);
    if (ctaSettings) setLocalCtaSettings(ctaSettings);
    if (sectionHeaders) setLocalSectionHeaders(sectionHeaders);
  };

  const isLoading = isPageLoading || isRoofLoading || isSpecialtyLoading || isCtaLoading || isHeadersLoading;
  const isSaving = isPageSaving || isRoofSaving || isSpecialtySaving || isCtaSaving || isHeadersSaving;
  const hasChanges = hasPageChanges || hasRoofChanges || hasSpecialtyChanges || hasCtaChanges || hasHeadersChanges;

  if (isLoading) {
    return null;
  }

  return (
    <>
      <Helmet>
        <title>{content.metaTitle}</title>
        <meta name="description" content={content.metaDescription} />
        <link rel="canonical" href="https://summitbuildings.com/styles" />
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
        pageSlug="styles"
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
            <InlineEditable
              value={editedContent.tagline}
              fieldName="tagline"
              onChange={(v) => updateField('tagline', v)}
              isEditMode={isEditMode}
              className="text-secondary font-semibold tracking-wider uppercase mb-4"
              as="p"
            />
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

        {/* Roof Styles Grid */}
        <section className="bg-background py-16 md:py-24">
          <div className="container-custom">
            <div className="bg-card rounded-lg shadow-lg overflow-hidden">
              <div className="bg-primary py-5 px-6 text-center">
                <InlineEditable
                  value={localSectionHeaders.roofStylesHeader}
                  fieldName="roof-styles-header"
                  onChange={(v) => updateSectionHeader('roofStylesHeader', v)}
                  isEditMode={isEditMode}
                  className="text-2xl md:text-3xl font-heading font-bold text-primary-foreground uppercase tracking-wide"
                  as="h2"
                />
              </div>

              <div className="p-6 md:p-10">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
                  {localRoofStyles.map((style, index) => (
                    <div key={style.id} className="text-center">
                      {isEditMode ? (
                        <>
                          <div className="aspect-square mb-4 overflow-hidden rounded-lg shadow-sm bg-muted">
                            <InlineEditableImage
                              src={style.image}
                              alt={style.name}
                              onImageChange={(url) => updateRoofStyle(index, 'image', url)}
                              isEditMode={isEditMode}
                              imageClassName="w-full h-full transition-transform duration-300 hover:scale-105 object-cover"
                            />
                          </div>
                          <InlineEditableLink
                            text={style.name}
                            href={style.link}
                            onTextChange={(text) => updateRoofStyle(index, 'name', text)}
                            onHrefChange={(href) => updateRoofStyle(index, 'link', href)}
                            isEditMode={isEditMode}
                            isExternal={style.openInNewTab}
                            onExternalChange={(ext) => updateRoofStyle(index, 'openInNewTab', ext)}
                            className="font-heading font-bold text-xl text-foreground hover:text-secondary transition-colors uppercase tracking-wide"
                          />
                          <InlineEditable
                            value={style.subtitle}
                            fieldName={`roof-style-${style.id}-subtitle`}
                            onChange={(v) => updateRoofStyle(index, 'subtitle', v)}
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
                          className="block group cursor-pointer"
                        >
                          <div className="aspect-square mb-4 overflow-hidden rounded-lg shadow-sm bg-muted">
                            <img
                              src={style.image}
                              alt={style.name}
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
                  value={localSectionHeaders.specialtyHeader}
                  fieldName="specialty-header"
                  onChange={(v) => updateSectionHeader('specialtyHeader', v)}
                  isEditMode={isEditMode}
                  className="text-2xl md:text-3xl font-heading font-bold text-primary-foreground uppercase tracking-wide"
                  as="h2"
                />
              </div>

              <div className="p-6 md:p-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-2xl mx-auto">
                  {localSpecialtyStyles.map((style, index) => (
                    <div key={style.id} className="text-center">
                      {isEditMode ? (
                        <>
                          <div className="aspect-[4/3] mb-4 overflow-hidden rounded-lg shadow-sm bg-muted">
                            <InlineEditableImage
                              src={style.image}
                              alt={style.name}
                              onImageChange={(url) => updateSpecialtyStyle(index, 'image', url)}
                              isEditMode={isEditMode}
                              imageClassName="w-full h-full transition-transform duration-300 hover:scale-105 object-contain"
                            />
                          </div>
                          <InlineEditableLink
                            text={style.name}
                            href={style.link}
                            onTextChange={(text) => updateSpecialtyStyle(index, 'name', text)}
                            onHrefChange={(href) => updateSpecialtyStyle(index, 'link', href)}
                            isEditMode={isEditMode}
                            isExternal={style.openInNewTab}
                            onExternalChange={(ext) => updateSpecialtyStyle(index, 'openInNewTab', ext)}
                            className="font-heading font-bold text-xl text-foreground hover:text-secondary transition-colors uppercase tracking-wide"
                          />
                          <InlineEditable
                            value={style.subtitle}
                            fieldName={`specialty-style-${style.id}-subtitle`}
                            onChange={(v) => updateSpecialtyStyle(index, 'subtitle', v)}
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
                          className="block group cursor-pointer"
                        >
                          <div className="aspect-[4/3] mb-4 overflow-hidden rounded-lg shadow-sm bg-muted">
                            <img
                              src={style.image}
                              alt={style.name}
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
              type="textarea"
              onChange={(v) => updateField('ctaDescription', v)}
              isEditMode={isEditMode}
              className="text-primary-foreground/80 text-lg mb-8 max-w-2xl mx-auto"
              as="p"
            />
            <InlineEditableButton
              text={editedContent.ctaButton}
              href={localCtaSettings.buttonLink}
              onTextChange={(v) => updateField('ctaButton', v)}
              onHrefChange={updateCtaButtonLink}
              isEditMode={isEditMode}
              isExternal={localCtaSettings.buttonOpenInNewTab}
              onExternalChange={updateCtaButtonOpenInNewTab}
            >
              <a
                href={localCtaSettings.buttonLink}
                target={localCtaSettings.buttonOpenInNewTab ? '_blank' : undefined}
                rel={localCtaSettings.buttonOpenInNewTab ? 'noopener noreferrer' : undefined}
                className="inline-block bg-secondary text-secondary-foreground font-bold px-8 py-4 rounded-md hover:brightness-110 transition-all"
              >
                {editedContent.ctaButton}
              </a>
            </InlineEditableButton>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
};

export default Styles;
