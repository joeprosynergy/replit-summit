import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link, useLocation } from 'react-router-dom';
import { Check, X, Plus } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { cloudinaryImages } from '@/lib/cloudinary';
import { useAdminAuth } from '@/hooks/useAdminAuth';
import { useEditablePageContent, PageContent } from '@/hooks/useEditablePageContent';
import { useSectionContent } from '@/hooks/useSectionContent';
import { InlineEditable } from '@/components/admin/InlineEditable';
import InlineEditableImage from '@/components/admin/InlineEditableImage';
import InlineEditableButton from '@/components/admin/InlineEditableButton';
import { AdminEditMode } from '@/components/admin/AdminEditMode';
import { usePageManagement } from '@/hooks/usePageManagement';

interface ModelItem {
  id: string;
  name: string;
  tagline: string;
  features: string[];
  image: string;
  gallery: string[];
  detailLink: string;
  detailLinkOpenInNewTab: boolean;
  designLink: string;
  designLinkOpenInNewTab: boolean;
}

interface ModelsContent {
  models: ModelItem[];
}

interface QuickNavItem {
  id: string;
  name: string;
  image: string;
}

interface QuickNavContent {
  title: string;
  items: QuickNavItem[];
}

interface CtaContent {
  heading: string;
  description: string;
  phoneText: string;
  phoneNumber: string;
  secondaryButtonText: string;
  secondaryButtonLink: string;
  secondaryButtonOpenInNewTab: boolean;
}

const defaultModels: ModelsContent = {
  models: [
    {
      id: 'pro-utility',
      name: 'Pro - Utility',
      tagline: 'Superior workmanship for any storage need.',
      features: [
        'Double 36" Doors w/ T-Handle Lock',
        '7\' 9" Wall Height',
        'Ridge Vent Standard',
        '3/4" T & G Flooring',
      ],
      image: cloudinaryImages.proUtility,
      gallery: [cloudinaryImages.proUtility, cloudinaryImages.utilityShed1, cloudinaryImages.utilityShed2, cloudinaryImages.utilityShed3, cloudinaryImages.utilityShed4],
      detailLink: '/types/deluxe-storage-cabins/pro-utility-shed',
      detailLinkOpenInNewTab: false,
      designLink: 'https://summitbuildings.shedpro.co/',
      designLinkOpenInNewTab: true,
    },
    {
      id: 'pro-lofted-barn',
      name: 'Pro - Lofted Barn',
      tagline: 'Our best seller with maximum storage.',
      features: [
        '2 Lofts for Extra Storage',
        'Loft Ladder Included',
        '6\' 6" Wall Height',
        'Classic Barn Styling',
      ],
      image: cloudinaryImages.proLoftedBarn,
      gallery: [cloudinaryImages.proLoftedBarn, cloudinaryImages.loftedBarn1, cloudinaryImages.loftedBarn2, cloudinaryImages.loftedBarn3, cloudinaryImages.loftedBarn4],
      detailLink: '/types/deluxe-storage-cabins/pro-lofted-barn',
      detailLinkOpenInNewTab: false,
      designLink: 'https://summitbuildings.shedpro.co/',
      designLinkOpenInNewTab: true,
    },
    {
      id: 'cabins-tiny-home',
      name: 'Cabins / Tiny Home',
      tagline: 'Comfortable living in a compact space.',
      features: [
        'Finished Interior Options',
        'Electrical Package Available',
        'Custom Layouts',
        'Perfect for Guest Houses',
      ],
      image: cloudinaryImages.cabinShed,
      gallery: [cloudinaryImages.cabinShed, cloudinaryImages.cabin1, cloudinaryImages.cabin2, cloudinaryImages.cabin3, cloudinaryImages.cabin4],
      detailLink: '/types/deluxe-storage-cabins/cabin',
      detailLinkOpenInNewTab: false,
      designLink: 'https://summitbuildings.shedpro.co/',
      designLinkOpenInNewTab: true,
    },
  ]
};

const defaultQuickNav: QuickNavContent = {
  title: 'Deluxe Storage & Cabins',
  items: [
    { id: 'pro-utility', name: 'Pro - Utility', image: cloudinaryImages.proUtility },
    { id: 'pro-lofted-barn', name: 'Pro - Lofted Barn', image: cloudinaryImages.proLoftedBarn },
    { id: 'cabins-tiny-home', name: 'Cabins / Tiny Home', image: cloudinaryImages.cabinShed },
  ]
};

const defaultCta: CtaContent = {
  heading: "Can't Decide? We Can Help.",
  description: "Call us and we'll help you choose the perfect building for your needs.",
  phoneText: "Call 573-747-4700",
  phoneNumber: "tel:5737474700",
  secondaryButtonText: "View All Models",
  secondaryButtonLink: "/types",
  secondaryButtonOpenInNewTab: false,
};

export const defaultContent: PageContent = {
  heading: "Deluxe Storage & Cabins",
  tagline: "",
  subheading: "",
  ctaHeading: "",
  ctaDescription: "",
  ctaButton: "",
  metaTitle: "Deluxe Storage & Cabins | Summit Portable Buildings",
  metaDescription: "Explore our premium deluxe storage buildings and cabins including Pro Utility, Pro Lofted Barn, Cabins, and Dormers. Superior quality with extra features.",
};

const DeluxeStorageCabins = () => {
  const location = useLocation();
  const { isAdmin } = useAdminAuth();
  const { showDuplicateDialog, showDeleteDialog, newSlug, isDuplicating, isDeleting, setNewSlug, setShowDuplicateDialog, setShowDeleteDialog, duplicatePage, deletePage } = usePageManagement('deluxe-storage-cabins');

  useEffect(() => {
    if (location.hash) {
      const element = document.getElementById(location.hash.slice(1));
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100);
      }
    }
  }, [location.hash]);

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
  } = useEditablePageContent('deluxe-storage-cabins', defaultContent);

  const {
    content: modelsContent,
    isLoading: isModelsLoading,
    isSaving: isModelsSaving,
    hasChanges: hasModelsChanges,
    updateField: updateModelsField,
    save: saveModels,
    reset: resetModels,
  } = useSectionContent('deluxe-storage-cabins', 'models', defaultModels as any) as {
    content: ModelsContent;
    originalContent: ModelsContent;
    isLoading: boolean;
    isSaving: boolean;
    hasChanges: boolean;
    updateField: <K extends keyof ModelsContent>(field: K, value: ModelsContent[K]) => void;
    save: () => Promise<boolean>;
    reset: () => void;
  };

  const {
    content: quickNavContent,
    isLoading: isQuickNavLoading,
    isSaving: isQuickNavSaving,
    hasChanges: hasQuickNavChanges,
    updateField: updateQuickNavField,
    save: saveQuickNav,
    reset: resetQuickNav,
  } = useSectionContent('deluxe-storage-cabins', 'quick-nav', defaultQuickNav as any) as {
    content: QuickNavContent;
    originalContent: QuickNavContent;
    isLoading: boolean;
    isSaving: boolean;
    hasChanges: boolean;
    updateField: <K extends keyof QuickNavContent>(field: K, value: QuickNavContent[K]) => void;
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
  } = useSectionContent('deluxe-storage-cabins', 'cta', defaultCta as any) as {
    content: CtaContent;
    originalContent: CtaContent;
    isLoading: boolean;
    isSaving: boolean;
    hasChanges: boolean;
    updateField: <K extends keyof CtaContent>(field: K, value: CtaContent[K]) => void;
    save: () => Promise<boolean>;
    reset: () => void;
  };

  const [localModels, setLocalModels] = useState<ModelItem[]>(defaultModels.models);
  const [localQuickNav, setLocalQuickNav] = useState<QuickNavContent>(defaultQuickNav);
  const [localCta, setLocalCta] = useState<CtaContent>(defaultCta);

  useEffect(() => { if (modelsContent?.models) setLocalModels(modelsContent.models); }, [modelsContent]);
  useEffect(() => { if (quickNavContent) setLocalQuickNav(quickNavContent); }, [quickNavContent]);
  useEffect(() => { if (ctaContent) setLocalCta(ctaContent); }, [ctaContent]);

  const updateModel = (index: number, field: keyof ModelItem, value: string | boolean | string[]) => {
    const updated = [...localModels];
    updated[index] = { ...updated[index], [field]: value };
    setLocalModels(updated);
    updateModelsField('models', updated);
  };

  const updateModelFeature = (modelIndex: number, featureIndex: number, value: string) => {
    const updated = [...localModels];
    const features = [...updated[modelIndex].features];
    features[featureIndex] = value;
    updated[modelIndex] = { ...updated[modelIndex], features };
    setLocalModels(updated);
    updateModelsField('models', updated);
  };

  const updateModelGallery = (modelIndex: number, galleryIndex: number, value: string) => {
    const updated = [...localModels];
    const gallery = [...updated[modelIndex].gallery];
    gallery[galleryIndex] = value;
    updated[modelIndex] = { ...updated[modelIndex], gallery };
    setLocalModels(updated);
    updateModelsField('models', updated);
  };

  const addModelGalleryImage = (modelIndex: number) => {
    const updated = [...localModels];
    const gallery = [...updated[modelIndex].gallery];
    if (gallery.length < 6) {
      gallery.push('/placeholder.svg');
      updated[modelIndex] = { ...updated[modelIndex], gallery };
      setLocalModels(updated);
      updateModelsField('models', updated);
    }
  };

  const deleteModelGalleryImage = (modelIndex: number, galleryIndex: number) => {
    const updated = [...localModels];
    const gallery = [...updated[modelIndex].gallery];
    gallery.splice(galleryIndex, 1);
    updated[modelIndex] = { ...updated[modelIndex], gallery };
    setLocalModels(updated);
    updateModelsField('models', updated);
  };

  const updateQuickNavItem = (index: number, field: keyof QuickNavItem, value: string) => {
    const updated = { ...localQuickNav, items: [...localQuickNav.items] };
    updated.items[index] = { ...updated.items[index], [field]: value };
    setLocalQuickNav(updated);
    updateQuickNavField('items', updated.items);
  };

  const handleSave = async () => {
    await Promise.all([
      savePage(),
      saveModels(),
      saveQuickNav(),
      saveCta(),
    ]);
  };

  const handleReset = () => {
    resetPage();
    resetModels();
    resetQuickNav();
    resetCta();
    if (modelsContent?.models) setLocalModels(modelsContent.models);
    if (quickNavContent) setLocalQuickNav(quickNavContent);
    if (ctaContent) setLocalCta(ctaContent);
  };

  const isLoading = isPageLoading || isModelsLoading || isQuickNavLoading || isCtaLoading;
  const isSaving = isPageSaving || isModelsSaving || isQuickNavSaving || isCtaSaving;
  const hasChanges = hasPageChanges || hasModelsChanges || hasQuickNavChanges || hasCtaChanges;

  if (isLoading) {
    return null;
  }

  return (
    <>
      <Helmet>
        <title>{content.metaTitle}</title>
        <meta name="description" content={content.metaDescription} />
        <link rel="canonical" href="https://summitbuildings.com/types/deluxe-storage-cabins" />
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
        pageSlug="deluxe-storage-cabins"
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
        {/* Quick Nav */}
        <section className="bg-primary py-8">
          <div className="container-custom">
            <div className="bg-card rounded-lg shadow-lg p-6 md:p-8">
              <InlineEditable
                value={localQuickNav.title}
                fieldName="quick nav title"
                onChange={(v) => { setLocalQuickNav({ ...localQuickNav, title: v }); updateQuickNavField('title', v); }}
                isEditMode={isEditMode}
                className="text-2xl md:text-3xl font-heading font-bold text-center text-primary mb-8 uppercase tracking-wide"
                as="h2"
              />
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 max-w-4xl mx-auto">
                {localQuickNav.items.map((item, index) => (
                  <div key={item.id} className="group text-center">
                    {isEditMode ? (
                      <>
                        <div className="aspect-square mb-3 overflow-hidden rounded-lg bg-muted">
                          <InlineEditableImage
                            src={item.image}
                            alt={item.name}
                            onImageChange={(url) => updateQuickNavItem(index, 'image', url)}
                            isEditMode={isEditMode}
                            imageClassName="w-full h-full transition-transform duration-300 group-hover:scale-105 object-cover"
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
                            alt={item.name}
                            className="w-full h-full transition-transform duration-300 group-hover:scale-105 object-cover"
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
          {localModels.map((model, index) => (
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
                              text="Design This Shed"
                              href={model.designLink}
                              onTextChange={() => {}}
                              onHrefChange={(v) => updateModel(index, 'designLink', v)}
                              isEditMode={isEditMode}
                              isExternal={model.designLinkOpenInNewTab}
                              onExternalChange={(v) => updateModel(index, 'designLinkOpenInNewTab', v)}
                            >
                              <Button variant="outline" size="lg">Design This Shed</Button>
                            </InlineEditableButton>
                          </>
                        ) : (
                          <>
                            <Link
                              to={model.detailLink}
                              target={model.detailLinkOpenInNewTab ? '_blank' : undefined}
                              rel={model.detailLinkOpenInNewTab ? 'noopener noreferrer' : undefined}
                            >
                              <Button variant="hero" size="lg">View Details</Button>
                            </Link>
                            <a
                              href={model.designLink}
                              target={model.designLinkOpenInNewTab ? '_blank' : undefined}
                              rel={model.designLinkOpenInNewTab ? 'noopener noreferrer' : undefined}
                            >
                              <Button variant="outline" size="lg">Design This Shed</Button>
                            </a>
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
                            alt={model.name}
                            onImageChange={(url) => updateModel(index, 'image', url)}
                            isEditMode={isEditMode}
                            imageClassName="w-full h-full object-cover"
                          />
                        ) : (
                          <img
                            src={model.image}
                            alt={model.name}
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
                                  imageClassName="w-full h-full hover:scale-105 transition-transform cursor-pointer object-cover"
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
                              <img src={img} alt="" className="w-full h-full hover:scale-105 transition-transform cursor-pointer object-cover" />
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
              value={localCta.heading}
              fieldName="CTA heading"
              onChange={(v) => { setLocalCta({ ...localCta, heading: v }); updateCtaField('heading', v); }}
              isEditMode={isEditMode}
              className="text-3xl md:text-4xl font-heading font-bold text-primary-foreground mb-6"
              as="h2"
            />
            <InlineEditable
              value={localCta.description}
              fieldName="CTA description"
              onChange={(v) => { setLocalCta({ ...localCta, description: v }); updateCtaField('description', v); }}
              isEditMode={isEditMode}
              className="text-primary-foreground/80 text-lg mb-8 max-w-2xl mx-auto"
              as="p"
            />
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {isEditMode ? (
                <>
                  <InlineEditableButton
                    text={localCta.phoneText}
                    href={localCta.phoneNumber}
                    onTextChange={(v) => { setLocalCta({ ...localCta, phoneText: v }); updateCtaField('phoneText', v); }}
                    onHrefChange={(v) => { setLocalCta({ ...localCta, phoneNumber: v }); updateCtaField('phoneNumber', v); }}
                    isEditMode={isEditMode}
                    isExternal={false}
                    onExternalChange={() => {}}
                  >
                    <span className="inline-block bg-secondary text-secondary-foreground font-bold px-8 py-4 rounded-md hover:brightness-110 transition-all">
                      {localCta.phoneText}
                    </span>
                  </InlineEditableButton>
                  <InlineEditableButton
                    text={localCta.secondaryButtonText}
                    href={localCta.secondaryButtonLink}
                    onTextChange={(v) => { setLocalCta({ ...localCta, secondaryButtonText: v }); updateCtaField('secondaryButtonText', v); }}
                    onHrefChange={(v) => { setLocalCta({ ...localCta, secondaryButtonLink: v }); updateCtaField('secondaryButtonLink', v); }}
                    isEditMode={isEditMode}
                    isExternal={localCta.secondaryButtonOpenInNewTab}
                    onExternalChange={(v) => { setLocalCta({ ...localCta, secondaryButtonOpenInNewTab: v }); updateCtaField('secondaryButtonOpenInNewTab', v); }}
                  >
                    <span className="inline-block border-2 border-primary-foreground/30 text-primary-foreground font-bold px-8 py-4 rounded-md hover:bg-primary-foreground hover:text-primary transition-all">
                      {localCta.secondaryButtonText}
                    </span>
                  </InlineEditableButton>
                </>
              ) : (
                <>
                  <a
                    href={localCta.phoneNumber}
                    className="inline-block bg-secondary text-secondary-foreground font-bold px-8 py-4 rounded-md hover:brightness-110 transition-all"
                  >
                    {localCta.phoneText}
                  </a>
                  <Link
                    to={localCta.secondaryButtonLink}
                    target={localCta.secondaryButtonOpenInNewTab ? '_blank' : undefined}
                    rel={localCta.secondaryButtonOpenInNewTab ? 'noopener noreferrer' : undefined}
                    className="inline-block border-2 border-primary-foreground/30 text-primary-foreground font-bold px-8 py-4 rounded-md hover:bg-primary-foreground hover:text-primary transition-all"
                  >
                    {localCta.secondaryButtonText}
                  </Link>
                </>
              )}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
};

export default DeluxeStorageCabins;
