import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { cloudinaryImages } from '@/lib/cloudinary';
import { useAdminAuth } from '@/hooks/useAdminAuth';
import { useEditablePageContent, PageContent } from '@/hooks/useEditablePageContent';
import { useSectionContent } from '@/hooks/useSectionContent';
import { InlineEditable } from '@/components/admin/InlineEditable';
import { AdminEditMode } from '@/components/admin/AdminEditMode';
import { usePageManagement } from '@/hooks/usePageManagement';
import InlineEditableLink from '@/components/admin/InlineEditableLink';
import InlineEditableImage from '@/components/admin/InlineEditableImage';
import InlineEditableButton from '@/components/admin/InlineEditableButton';
import { useState, useEffect } from 'react';

interface ModelItem {
  name: string;
  image: string;
  link: string;
  openInNewTab: boolean;
}

interface CategoryItem {
  id: string;
  name: string;
  description: string;
  models: ModelItem[];
}

interface CategoriesContent {
  categories: CategoryItem[];
}

interface CtaSettings {
  buttonLink: string;
  buttonOpenInNewTab: boolean;
}

const defaultCtaSettings: CtaSettings = {
  buttonLink: 'https://summitbuildings.shedpro.co/',
  buttonOpenInNewTab: true,
};

const defaultCategories: CategoriesContent = {
  categories: [
    {
      id: 'basic-storage',
      name: 'Basic Storage',
      description: 'Affordable, practical sheds for everyday storage needs',
      models: [
        { name: 'Budget Pro - Utility', image: cloudinaryImages.budgetProUtility, link: '/types/basic-storage#budget-pro-utility', openInNewTab: false },
        { name: 'Budget Pro - Lofted Barn', image: cloudinaryImages.budgetProLoftedBarn, link: '/types/basic-storage#budget-pro-lofted-barn', openInNewTab: false },
        { name: 'Economy', image: cloudinaryImages.economy, link: '/types/basic-storage#economy', openInNewTab: false },
      ],
    },
    {
      id: 'deluxe-storage-cabins',
      name: 'Deluxe Storage & Cabins',
      description: 'Premium buildings with extra features and style',
      models: [
        { name: 'Pro - Utility', image: cloudinaryImages.proUtility, link: '/types/deluxe-storage-cabins#pro-utility', openInNewTab: false },
        { name: 'Pro - Lofted Barn', image: cloudinaryImages.proLoftedBarn, link: '/types/deluxe-storage-cabins#pro-lofted-barn', openInNewTab: false },
        { name: 'Cabins/Tiny Home', image: cloudinaryImages.cabinShed, link: '/types/deluxe-storage-cabins#cabins-tiny-home', openInNewTab: false },
      ],
    },
    {
      id: 'garages-carports',
      name: 'Garages & Carports',
      description: 'Secure vehicle and equipment storage',
      models: [
        { name: 'Garages', image: cloudinaryImages.garage, link: '/types/garages-carports#garages', openInNewTab: false },
        { name: 'Carports', image: cloudinaryImages.carport, link: '/types/garages-carports#carports', openInNewTab: false },
      ],
    },
    {
      id: 'outdoor-structures',
      name: 'Outdoor Structures',
      description: 'Greenhouses and animal housing solutions',
      models: [
        { name: 'Greenhouses', image: cloudinaryImages.greenhouse1, link: '/types/greenhouse', openInNewTab: false },
        { name: 'Animal Shelters', image: cloudinaryImages.animalShelter1, link: '/types/animal-shelters', openInNewTab: false },
      ],
    },
  ]
};

const defaultContent: PageContent = {
  heading: "Structure Types",
  tagline: "Hand-Built to Last",
  subheading: "Choose one of our popular models or customize your own",
  ctaHeading: "Ready to Get Started?",
  ctaDescription: "Design your perfect building online in minutes",
  ctaButton: "Design Your Building",
  metaTitle: "Our Models | Summit Portable Buildings",
  metaDescription: "Browse our complete selection of storage buildings. From basic storage sheds to deluxe cabins and garages, find the perfect structure for your needs.",
};

const OurModels = () => {
  const { isAdmin } = useAdminAuth();
  const { showDuplicateDialog, showDeleteDialog, newSlug, isDuplicating, isDeleting, setNewSlug, setShowDuplicateDialog, setShowDeleteDialog, duplicatePage, deletePage } = usePageManagement('types');
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
  } = useEditablePageContent('types', defaultContent);

  const {
    content: categoriesContent,
    isLoading: isCategoriesLoading,
    isSaving: isCategoriesSaving,
    hasChanges: hasCategoriesChanges,
    updateField: updateCategoriesField,
    save: saveCategories,
    reset: resetCategories,
  } = useSectionContent('types', 'categories', defaultCategories as any) as {
    content: CategoriesContent;
    originalContent: CategoriesContent;
    isLoading: boolean;
    isSaving: boolean;
    hasChanges: boolean;
    updateField: <K extends keyof CategoriesContent>(field: K, value: CategoriesContent[K]) => void;
    save: () => Promise<boolean>;
    reset: () => void;
  };

  const {
    content: ctaContent,
    isLoading: isCtaLoading,
    isSaving: isCtaSaving,
    hasChanges: hasCtaChanges,
    updateField: updateCtaField,
    save: saveCta,
    reset: resetCta,
  } = useSectionContent('types', 'cta-settings', defaultCtaSettings as any) as {
    content: CtaSettings;
    originalContent: CtaSettings;
    isLoading: boolean;
    isSaving: boolean;
    hasChanges: boolean;
    updateField: <K extends keyof CtaSettings>(field: K, value: CtaSettings[K]) => void;
    save: () => Promise<boolean>;
    reset: () => void;
  };

  const [localCategories, setLocalCategories] = useState<CategoryItem[]>(defaultCategories.categories);
  const [localCtaSettings, setLocalCtaSettings] = useState<CtaSettings>(defaultCtaSettings);

  useEffect(() => {
    if (categoriesContent?.categories) {
      setLocalCategories(categoriesContent.categories);
    }
  }, [categoriesContent]);

  useEffect(() => {
    if (ctaContent) {
      setLocalCtaSettings(ctaContent);
    }
  }, [ctaContent]);

  const updateCategory = (categoryIndex: number, field: keyof CategoryItem, value: string) => {
    const updated = [...localCategories];
    updated[categoryIndex] = { ...updated[categoryIndex], [field]: value };
    setLocalCategories(updated);
    updateCategoriesField('categories', updated);
  };

  const updateModel = (categoryIndex: number, modelIndex: number, field: keyof ModelItem, value: string | boolean) => {
    const updated = [...localCategories];
    updated[categoryIndex] = {
      ...updated[categoryIndex],
      models: updated[categoryIndex].models.map((m, i) =>
        i === modelIndex ? { ...m, [field]: value } : m
      ),
    };
    setLocalCategories(updated);
    updateCategoriesField('categories', updated);
  };

  const handleSave = async () => {
    await Promise.all([savePage(), saveCategories(), saveCta()]);
  };

  const handleReset = () => {
    resetPage();
    resetCategories();
    resetCta();
    if (categoriesContent?.categories) {
      setLocalCategories(categoriesContent.categories);
    }
    if (ctaContent) {
      setLocalCtaSettings(ctaContent);
    }
  };

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

  const isLoading = isPageLoading || isCategoriesLoading || isCtaLoading;
  const isSaving = isPageSaving || isCategoriesSaving || isCtaSaving;
  const hasChanges = hasPageChanges || hasCategoriesChanges || hasCtaChanges;

  if (isLoading) {
    return null;
  }

  return (
    <>
      <Helmet>
        <title>{content.metaTitle}</title>
        <meta name="description" content={content.metaDescription} />
        <link rel="canonical" href="https://summitbuildings.com/types" />
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
        pageSlug="types"
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

        {/* Categories */}
        <section className="bg-background">
          {localCategories.map((category, categoryIndex) => (
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
                        <div key={`${category.id}-${modelIndex}`} className="text-center">
                          {isEditMode ? (
                            <>
                              <div className="aspect-square mb-4 overflow-hidden rounded-lg shadow-sm bg-muted">
                                <InlineEditableImage
                                  src={model.image}
                                  alt={model.name}
                                  onImageChange={(url) => updateModel(categoryIndex, modelIndex, 'image', url)}
                                  isEditMode={isEditMode}
                                  imageClassName="w-full h-full transition-transform duration-300 hover:scale-105 object-cover"
                                />
                              </div>
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
                            </>
                          ) : (
                            <Link
                              to={model.link}
                              target={model.openInNewTab ? '_blank' : undefined}
                              rel={model.openInNewTab ? 'noopener noreferrer' : undefined}
                              className="block group cursor-pointer"
                            >
                              <div className="aspect-square mb-4 overflow-hidden rounded-lg shadow-sm bg-muted">
                                <img
                                  src={model.image}
                                  alt={model.name}
                                  className="w-full h-full transition-transform duration-300 group-hover:scale-105 object-cover"
                                />
                              </div>
                              <h3 className="font-heading font-bold text-foreground group-hover:text-secondary transition-colors uppercase tracking-wide">
                                {model.name}
                              </h3>
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

export default OurModels;
