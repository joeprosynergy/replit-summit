import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link, useLocation } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { cloudinaryImages } from '@/lib/cloudinary';
import barnCabin1 from '@/assets/barn-cabin-1.jpg';
import { useAdminAuth } from '@/hooks/useAdminAuth';
import { useEditablePageContent, PageContent } from '@/hooks/useEditablePageContent';
import { useSectionContent } from '@/hooks/useSectionContent';
import { InlineEditable } from '@/components/admin/InlineEditable';
import InlineEditableLink from '@/components/admin/InlineEditableLink';
import InlineEditableImage from '@/components/admin/InlineEditableImage';
import InlineEditableButton from '@/components/admin/InlineEditableButton';
import { AdminEditMode } from '@/components/admin/AdminEditMode';

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

interface OtherStyleItem {
  id: string;
  name: string;
  subtitle: string;
  image: string;
  link: string;
  openInNewTab: boolean;
}

interface OtherStylesContent {
  styles: OtherStyleItem[];
  description: string;
}

interface SectionHeaders {
  storageHeader: string;
  cabinsHeader: string;
  otherStylesHeader: string;
}

interface CtaSettings {
  buttonLink: string;
  buttonOpenInNewTab: boolean;
}

const defaultStorageOptions: OptionsContent = {
  options: [
    {
      id: 'economy',
      name: 'Economy',
      description: 'Our most economical storage building. Lowest cost per square foot.',
      features: ['Metal siding only', '5\' walls', '2 lofts & ladder included'],
      image: cloudinaryImages.economyShed3,
      link: '/types/basic-storage/economy-shed',
      openInNewTab: false
    },
    {
      id: 'budget-pro-lofted-barn',
      name: 'Budget Pro',
      description: 'Classic barn styling at an affordable price.',
      features: ['6\'6" walls', '1 loft for storage', 'Double 36" doors w/ lock'],
      image: cloudinaryImages.budgetProLoftedBarn,
      link: '/types/basic-storage/budget-pro-lofted-barn',
      openInNewTab: false
    },
    {
      id: 'pro-lofted-barn',
      name: 'Pro',
      description: 'Our best seller — most versatile for all purposes.',
      features: ['6\'6" walls', '2 lofts & ladder', '3/4" Advantech flooring'],
      image: cloudinaryImages.proLoftedBarn,
      link: '/types/deluxe-storage-cabins/pro-lofted-barn',
      openInNewTab: false
    },
  ]
};

const defaultCabinOptions: OptionsContent = {
  options: [
    {
      id: 'barn-cabin',
      name: 'Lofted Cabin',
      description: 'Classic barn styling with dual lofts and covered porch.',
      features: ['Gambrel roof', '4\' deep porch with railing', 'Two lofts included'],
      image: barnCabin1,
      link: '/types/deluxe-storage-cabins/barn-cabin',
      openInNewTab: false
    },
  ]
};

const defaultOtherStyles: OtherStylesContent = {
  description: 'Explore our other building styles to find the perfect fit for your needs.',
  styles: [
    { id: 'utility', name: 'Utility', subtitle: 'Traditional A-Frame Roof', image: cloudinaryImages.utilityShed3, link: '/styles/utility', openInNewTab: false },
    { id: 'modern', name: 'Modern', subtitle: 'Single Slope Roof', image: cloudinaryImages.modernShed, link: '/styles/modern', openInNewTab: false },
    { id: 'greenhouse', name: 'Greenhouse', subtitle: 'Grow Year-Round', image: cloudinaryImages.greenhouse1, link: '/styles/greenhouse', openInNewTab: false },
    { id: 'animal-shelters', name: 'Animal Shelters', subtitle: 'Kennels & Coops', image: cloudinaryImages.animalShelter1, link: '/styles/animal-shelters', openInNewTab: false },
  ]
};

const defaultSectionHeaders: SectionHeaders = {
  storageHeader: 'Storage',
  cabinsHeader: 'Cabins & Tiny Homes',
  otherStylesHeader: 'Looking for Something Different?',
};

const defaultCtaSettings: CtaSettings = {
  buttonLink: 'https://summitbuildings.shedpro.co/',
  buttonOpenInNewTab: true,
};

const defaultContent: PageContent = {
  heading: "Barn Style",
  tagline: "← Back to Styles",
  subheading: "Gambrel Roof — Maximum overhead storage with iconic barn appeal",
  ctaHeading: "Ready to Get Started?",
  ctaDescription: "Design your perfect barn style building online in minutes",
  ctaButton: "Design Your Building",
  metaTitle: "Barn Style Buildings | Summit Portable Buildings",
  metaDescription: "Explore our Barn style buildings with gambrel roofs. Choose from Economy, Budget Pro, Pro, Cabin, or Garage options.",
};

const StylesBarn = () => {
  const location = useLocation();
  const currentPath = location.pathname;
  const { isAdmin } = useAdminAuth();

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
  } = useEditablePageContent('styles-barn', defaultContent);

  const {
    content: storageContent,
    isLoading: isStorageLoading,
    isSaving: isStorageSaving,
    hasChanges: hasStorageChanges,
    updateField: updateStorageField,
    save: saveStorage,
    reset: resetStorage,
  } = useSectionContent('styles-barn', 'storage', defaultStorageOptions as any) as {
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
    content: cabinsContent,
    isLoading: isCabinsLoading,
    isSaving: isCabinsSaving,
    hasChanges: hasCabinsChanges,
    updateField: updateCabinsField,
    save: saveCabins,
    reset: resetCabins,
  } = useSectionContent('styles-barn', 'cabins', defaultCabinOptions as any) as {
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
    content: otherStylesContent,
    isLoading: isOtherLoading,
    isSaving: isOtherSaving,
    hasChanges: hasOtherChanges,
    updateField: updateOtherField,
    save: saveOtherStyles,
    reset: resetOtherStyles,
  } = useSectionContent('styles-barn', 'other-styles', defaultOtherStyles as any) as {
    content: OtherStylesContent;
    originalContent: OtherStylesContent;
    isLoading: boolean;
    isSaving: boolean;
    hasChanges: boolean;
    updateField: <K extends keyof OtherStylesContent>(field: K, value: OtherStylesContent[K]) => void;
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
  } = useSectionContent('styles-barn', 'section-headers', defaultSectionHeaders as any) as {
    content: SectionHeaders;
    originalContent: SectionHeaders;
    isLoading: boolean;
    isSaving: boolean;
    hasChanges: boolean;
    updateField: <K extends keyof SectionHeaders>(field: K, value: SectionHeaders[K]) => void;
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
  } = useSectionContent('styles-barn', 'cta-settings', defaultCtaSettings as any) as {
    content: CtaSettings;
    originalContent: CtaSettings;
    isLoading: boolean;
    isSaving: boolean;
    hasChanges: boolean;
    updateField: <K extends keyof CtaSettings>(field: K, value: CtaSettings[K]) => void;
    save: () => Promise<boolean>;
    reset: () => void;
  };

  const [localStorageOpts, setLocalStorageOpts] = useState<OptionItem[]>(defaultStorageOptions.options);
  const [localCabins, setLocalCabins] = useState<OptionItem[]>(defaultCabinOptions.options);
  const [localOtherStyles, setLocalOtherStyles] = useState<OtherStylesContent>(defaultOtherStyles);
  const [localHeaders, setLocalHeaders] = useState<SectionHeaders>(defaultSectionHeaders);
  const [localCtaSettings, setLocalCtaSettings] = useState<CtaSettings>(defaultCtaSettings);

  useEffect(() => { if (storageContent?.options) setLocalStorageOpts(storageContent.options); }, [storageContent]);
  useEffect(() => { if (cabinsContent?.options) setLocalCabins(cabinsContent.options); }, [cabinsContent]);
  useEffect(() => { if (otherStylesContent) setLocalOtherStyles(otherStylesContent); }, [otherStylesContent]);
  useEffect(() => { if (sectionHeaders) setLocalHeaders(sectionHeaders); }, [sectionHeaders]);
  useEffect(() => { if (ctaSettings) setLocalCtaSettings(ctaSettings); }, [ctaSettings]);

  const updateStorageOption = (index: number, field: keyof OptionItem, value: string | boolean | string[]) => {
    const updated = [...localStorageOpts];
    updated[index] = { ...updated[index], [field]: value };
    setLocalStorageOpts(updated);
    updateStorageField('options', updated);
  };

  const updateStorageFeature = (optionIndex: number, featureIndex: number, value: string) => {
    const updated = [...localStorageOpts];
    const features = [...updated[optionIndex].features];
    features[featureIndex] = value;
    updated[optionIndex] = { ...updated[optionIndex], features };
    setLocalStorageOpts(updated);
    updateStorageField('options', updated);
  };

  const updateCabinOption = (index: number, field: keyof OptionItem, value: string | boolean | string[]) => {
    const updated = [...localCabins];
    updated[index] = { ...updated[index], [field]: value };
    setLocalCabins(updated);
    updateCabinsField('options', updated);
  };

  const updateCabinFeature = (optionIndex: number, featureIndex: number, value: string) => {
    const updated = [...localCabins];
    const features = [...updated[optionIndex].features];
    features[featureIndex] = value;
    updated[optionIndex] = { ...updated[optionIndex], features };
    setLocalCabins(updated);
    updateCabinsField('options', updated);
  };

  const updateOtherStyle = (index: number, field: keyof OtherStyleItem, value: string | boolean) => {
    const updated = { ...localOtherStyles, styles: [...localOtherStyles.styles] };
    updated.styles[index] = { ...updated.styles[index], [field]: value };
    setLocalOtherStyles(updated);
    updateOtherField('styles', updated.styles);
  };

  const handleSave = async () => {
    await Promise.all([
      savePage(),
      saveStorage(),
      saveCabins(),
      saveOtherStyles(),
      saveSectionHeaders(),
      saveCtaSettings(),
    ]);
  };

  const handleReset = () => {
    resetPage();
    resetStorage();
    resetCabins();
    resetOtherStyles();
    resetSectionHeaders();
    resetCtaSettings();
    if (storageContent?.options) setLocalStorageOpts(storageContent.options);
    if (cabinsContent?.options) setLocalCabins(cabinsContent.options);
    if (otherStylesContent) setLocalOtherStyles(otherStylesContent);
    if (sectionHeaders) setLocalHeaders(sectionHeaders);
    if (ctaSettings) setLocalCtaSettings(ctaSettings);
  };

  const isLoading = isPageLoading || isStorageLoading || isCabinsLoading || isOtherLoading || isHeadersLoading || isCtaLoading;
  const isSaving = isPageSaving || isStorageSaving || isCabinsSaving || isOtherSaving || isHeadersSaving || isCtaSaving;
  const hasChanges = hasPageChanges || hasStorageChanges || hasCabinsChanges || hasOtherChanges || hasHeadersChanges || hasCtaChanges;

  if (isLoading) {
    return null;
  }

  const renderOptionCard = (
    option: OptionItem,
    index: number,
    updateOption: (index: number, field: keyof OptionItem, value: string | boolean | string[]) => void,
    updateFeature: (optionIndex: number, featureIndex: number, value: string) => void
  ) => (
    <div key={option.id} className="group bg-muted/30 rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
      {isEditMode ? (
        <>
          <div className="aspect-[4/3] overflow-hidden bg-muted">
            <InlineEditableImage
              src={option.image}
              alt={option.name}
              onImageChange={(url) => updateOption(index, 'image', url)}
              isEditMode={isEditMode}
              imageClassName="w-full h-full transition-transform duration-300 group-hover:scale-105 object-contain bg-muted"
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
                    <span className="w-1 h-1 bg-secondary rounded-full flex-shrink-0"></span>
                    <InlineEditable
                      value={feature}
                      fieldName={`${option.name} feature ${idx + 1}`}
                      onChange={(v) => updateFeature(index, idx, v)}
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

  return (
    <>
      <Helmet>
        <title>{content.metaTitle}</title>
        <meta name="description" content={content.metaDescription} />
        <link rel="canonical" href="https://summitbuildings.com/styles/barn" />
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

        {/* Storage Section */}
        <section className="bg-background py-16 md:py-24">
          <div className="container-custom">
            <div className="bg-card rounded-lg shadow-lg overflow-hidden">
              <div className="bg-primary py-5 px-6">
                <InlineEditable
                  value={localHeaders.storageHeader}
                  fieldName="storage header"
                  onChange={(v) => { setLocalHeaders({ ...localHeaders, storageHeader: v }); updateHeadersField('storageHeader', v); }}
                  isEditMode={isEditMode}
                  className="text-2xl md:text-3xl font-heading font-bold text-primary-foreground text-center uppercase tracking-wide"
                  as="h2"
                />
              </div>
              <div className="p-6 md:p-10">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
                  {localStorageOpts.map((option, index) => renderOptionCard(option, index, updateStorageOption, updateStorageFeature))}
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
                  value={localHeaders.cabinsHeader}
                  fieldName="cabins header"
                  onChange={(v) => { setLocalHeaders({ ...localHeaders, cabinsHeader: v }); updateHeadersField('cabinsHeader', v); }}
                  isEditMode={isEditMode}
                  className="text-2xl md:text-3xl font-heading font-bold text-primary-foreground text-center uppercase tracking-wide"
                  as="h2"
                />
              </div>
              <div className="p-6 md:p-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-2xl mx-auto">
                  {localCabins.map((option, index) => renderOptionCard(option, index, updateCabinOption, updateCabinFeature))}
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
                  value={localHeaders.otherStylesHeader}
                  fieldName="other styles header"
                  onChange={(v) => { setLocalHeaders({ ...localHeaders, otherStylesHeader: v }); updateHeadersField('otherStylesHeader', v); }}
                  isEditMode={isEditMode}
                  className="text-2xl md:text-3xl font-heading font-bold text-primary-foreground text-center uppercase tracking-wide"
                  as="h2"
                />
              </div>
              <div className="p-6 md:p-10">
                <InlineEditable
                  value={localOtherStyles.description}
                  fieldName="other styles description"
                  onChange={(v) => { setLocalOtherStyles({ ...localOtherStyles, description: v }); updateOtherField('description', v); }}
                  isEditMode={isEditMode}
                  className="text-muted-foreground text-center mb-8 max-w-2xl mx-auto"
                  as="p"
                />
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
                  {localOtherStyles.styles.map((style, index) => (
                    <div key={style.id} className="text-center">
                      {isEditMode ? (
                        <>
                          <div className="aspect-square mb-4 overflow-hidden rounded-lg shadow-sm bg-muted">
                            <InlineEditableImage
                              src={style.image}
                              alt={style.name}
                              onImageChange={(url) => updateOtherStyle(index, 'image', url)}
                              isEditMode={isEditMode}
                              imageClassName="w-full h-full transition-transform duration-300 hover:scale-105 object-contain bg-muted"
                            />
                          </div>
                          <InlineEditableLink
                            text={style.name}
                            href={style.link}
                            onTextChange={(text) => updateOtherStyle(index, 'name', text)}
                            onHrefChange={(href) => updateOtherStyle(index, 'link', href)}
                            isEditMode={isEditMode}
                            isExternal={style.openInNewTab}
                            onExternalChange={(ext) => updateOtherStyle(index, 'openInNewTab', ext)}
                            className="font-heading font-bold text-lg text-foreground hover:text-secondary transition-colors uppercase tracking-wide"
                          />
                          <InlineEditable
                            value={style.subtitle}
                            fieldName={`${style.name} subtitle`}
                            onChange={(v) => updateOtherStyle(index, 'subtitle', v)}
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

export default StylesBarn;
