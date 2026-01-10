import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { X, Plus, Trash2 } from 'lucide-react';
import { useAdminAuth } from '@/hooks/useAdminAuth';
import { useEditablePageContent, PageContent } from '@/hooks/useEditablePageContent';
import { useSectionContent } from '@/hooks/useSectionContent';
import { InlineEditable } from '@/components/admin/InlineEditable';
import InlineEditableImage from '@/components/admin/InlineEditableImage';
import InlineEditableButton from '@/components/admin/InlineEditableButton';
import { AdminEditMode } from '@/components/admin/AdminEditMode';
import { usePageManagement } from '@/hooks/usePageManagement';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface GalleryImage {
  id: string;
  url: string;
  title: string;
  category: string;
}

interface GalleryContent {
  images: GalleryImage[];
  categories: string[];
}

interface HeroContent {
  heading: string;
  description: string;
}

interface CtaContent {
  heading: string;
  description: string;
  button1Text: string;
  button1Link: string;
  button1OpenInNewTab: boolean;
  button2Text: string;
  button2Link: string;
  button2OpenInNewTab: boolean;
}

const defaultGalleryImages: GalleryImage[] = [
  { id: '1', url: 'https://summitbuildings.com/wp-content/uploads/2024/11/Image-6.jpeg', title: 'Cabin 1', category: 'Cabins' },
  { id: '2', url: 'https://summitbuildings.com/wp-content/uploads/2024/11/P-Premium-Cabin.jpeg', title: 'Premium Cabin', category: 'Cabins' },
  { id: '3', url: 'https://summitbuildings.com/wp-content/uploads/2024/11/Image-8-1.jpg', title: 'Cabin 3', category: 'Cabins' },
  { id: '4', url: 'https://summitbuildings.com/wp-content/uploads/2024/11/PREMIUM-LBC-1.jpeg', title: 'Premium LBC', category: 'Cabins' },
  { id: '5', url: 'https://summitbuildings.com/wp-content/uploads/2024/11/deluxe-lofted-cabin.jpeg', title: 'Deluxe Lofted Cabin', category: 'Cabins' },
  { id: '6', url: 'https://summitbuildings.com/wp-content/uploads/2024/11/Deluxe-Cabin.jpeg', title: 'Deluxe Cabin', category: 'Cabins' },
  { id: '7', url: 'https://summitbuildings.com/wp-content/uploads/2024/11/side-lofted-barn-cabin.jpeg', title: 'Side Lofted Barn Cabin', category: 'Cabins' },
  { id: '8', url: 'https://summitbuildings.com/wp-content/uploads/2024/11/PREMIUM-LBC.jpeg', title: 'Premium LBC', category: 'Cabins' },
  { id: '9', url: 'https://summitbuildings.com/wp-content/uploads/2024/11/SUMMIT-CABIN-NEW-PHOTO-scaled.jpg', title: 'Summit Cabin', category: 'Cabins' },
  { id: '10', url: 'https://summitbuildings.com/wp-content/uploads/2024/11/Image-27.jpeg', title: 'Lofted Economy', category: 'Lofted Barns' },
  { id: '11', url: 'https://summitbuildings.com/wp-content/uploads/2024/11/Image-26.jpeg', title: 'Lofted Economy 2', category: 'Lofted Barns' },
  { id: '12', url: 'https://summitbuildings.com/wp-content/uploads/2024/11/Lofted-Barn-7.jpeg', title: 'Lofted Barn 7', category: 'Lofted Barns' },
  { id: '13', url: 'https://summitbuildings.com/wp-content/uploads/2024/11/side-lofted-barn-2-scaled.jpg', title: 'Side Lofted Barn', category: 'Lofted Barns' },
  { id: '14', url: 'https://summitbuildings.com/wp-content/uploads/2024/11/side-lofted-barn.jpg', title: 'Side Lofted Barn', category: 'Lofted Barns' },
  { id: '15', url: 'https://summitbuildings.com/wp-content/uploads/2024/11/Image-1.jpeg_-1.jpeg', title: 'Lofted Barn', category: 'Lofted Barns' },
  { id: '16', url: 'https://summitbuildings.com/wp-content/uploads/2024/11/IMG_3880-scaled.jpg', title: 'Garage 1', category: 'Garages' },
  { id: '17', url: 'https://summitbuildings.com/wp-content/uploads/2024/11/IMG_2007-scaled.jpg', title: 'Garage', category: 'Garages' },
  { id: '18', url: 'https://summitbuildings.com/wp-content/uploads/2024/11/Metal-Garage.jpg', title: 'Metal Garage', category: 'Garages' },
  { id: '19', url: 'https://summitbuildings.com/wp-content/uploads/2024/11/P-Lofted-Garage.jpeg', title: 'Lofted Garage', category: 'Garages' },
  { id: '20', url: 'https://summitbuildings.com/wp-content/uploads/2024/11/MLG-1.jpeg', title: 'MLG Garage', category: 'Garages' },
  { id: '21', url: 'https://summitbuildings.com/wp-content/uploads/2024/11/Image-14.jpeg', title: 'Utility Shed', category: 'Utility Sheds' },
  { id: '22', url: 'https://summitbuildings.com/wp-content/uploads/2024/11/Image-4.jpeg', title: 'Utility Shed', category: 'Utility Sheds' },
  { id: '23', url: 'https://summitbuildings.com/wp-content/uploads/2024/11/IMG_3909.jpg', title: 'Utility Shed', category: 'Utility Sheds' },
  { id: '24', url: 'https://summitbuildings.com/wp-content/uploads/2024/11/Image-8.jpg', title: 'Utility Shed', category: 'Utility Sheds' },
  { id: '25', url: 'https://summitbuildings.com/wp-content/uploads/2024/11/IMG_3458-scaled.jpg', title: 'Utility Shed', category: 'Utility Sheds' },
  { id: '26', url: 'https://summitbuildings.com/wp-content/uploads/2024/11/Economy-Metal.jpg', title: 'Economy Metal', category: 'Economy Sheds' },
  { id: '27', url: 'https://summitbuildings.com/wp-content/uploads/2024/11/IMG_0892.jpg', title: 'Economy Shed', category: 'Economy Sheds' },
  { id: '28', url: 'https://summitbuildings.com/wp-content/uploads/2024/11/10x16-O-Dormer-1.jpg', title: 'Dormer', category: 'Dormers' },
  { id: '29', url: 'https://summitbuildings.com/wp-content/uploads/2024/11/Dormer-2.jpeg', title: 'Dormer 2', category: 'Dormers' },
  { id: '30', url: 'https://summitbuildings.com/wp-content/uploads/2024/11/10x16-O-Dormer.jpg', title: 'Dormer', category: 'Dormers' },
  { id: '31', url: 'https://summitbuildings.com/wp-content/uploads/2024/11/Chicken-Coop-4.jpeg', title: 'Chicken Coop', category: 'Specialty' },
  { id: '32', url: 'https://summitbuildings.com/wp-content/uploads/2024/11/Chicken-Coop-2.jpg', title: 'Chicken Coop', category: 'Specialty' },
  { id: '33', url: 'https://summitbuildings.com/wp-content/uploads/2024/11/Chicken-Coops-1.jpeg', title: 'Chicken Coop', category: 'Specialty' },
  { id: '34', url: 'https://summitbuildings.com/wp-content/uploads/2024/11/greenhouse.jpg', title: 'Greenhouse', category: 'Specialty' },
  { id: '35', url: 'https://summitbuildings.com/wp-content/uploads/2024/11/Animal-Shelters-scaled.jpg', title: 'Animal Shelters', category: 'Specialty' },
  { id: '36', url: 'https://summitbuildings.com/wp-content/uploads/2024/11/ASHE.jpeg', title: 'Custom Build', category: 'Other' },
  { id: '37', url: 'https://summitbuildings.com/wp-content/uploads/2024/11/IMG_2520-scaled.jpg', title: 'Custom Build', category: 'Other' },
  { id: '38', url: 'https://summitbuildings.com/wp-content/uploads/2024/11/IMG_0931-scaled.jpg', title: 'Custom Build', category: 'Other' },
  { id: '39', url: 'https://summitbuildings.com/wp-content/uploads/2024/11/IMG_2393-1-scaled.jpg', title: 'Custom Build', category: 'Other' },
  { id: '40', url: 'https://summitbuildings.com/wp-content/uploads/2024/11/0FF8CAB3-41F7-40CF-B4D1-9DD34E02C11D.jpg', title: 'Custom Build', category: 'Other' },
];

const defaultCategories = ['All', 'Cabins', 'Lofted Barns', 'Garages', 'Utility Sheds', 'Economy Sheds', 'Dormers', 'Specialty', 'Other'];

const defaultGallery: GalleryContent = {
  images: defaultGalleryImages,
  categories: defaultCategories,
};

const defaultHero: HeroContent = {
  heading: 'Our Building Gallery',
  description: 'Explore our collection of custom storage buildings, cabins, garages, and more. Each building is crafted with quality materials and attention to detail.',
};

const defaultCta: CtaContent = {
  heading: 'Ready to Build Your Dream Storage Building?',
  description: 'Contact us today or use our 3D designer to customize your perfect building.',
  button1Text: 'Design Your Building',
  button1Link: 'https://summitbuildings.shedpro.co/',
  button1OpenInNewTab: true,
  button2Text: 'Contact Us',
  button2Link: '/contact-us',
  button2OpenInNewTab: false,
};

const defaultContent: PageContent = {
  heading: 'Gallery',
  tagline: '',
  subheading: '',
  ctaHeading: '',
  ctaDescription: '',
  ctaButton: '',
  metaTitle: 'Gallery | Summit Portable Buildings',
  metaDescription: 'Browse our gallery of custom storage buildings, cabins, garages, lofted barns, and more. See the quality craftsmanship of Summit Portable Buildings.',
};

const Gallery = () => {
  const { isAdmin } = useAdminAuth();
  const { showDuplicateDialog, showDeleteDialog, newSlug, isDuplicating, isDeleting, setNewSlug, setShowDuplicateDialog, setShowDeleteDialog, duplicatePage, deletePage } = usePageManagement('gallery');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);

  const {
    content,
    isLoading: isPageLoading,
    isSaving: isPageSaving,
    isEditMode,
    hasChanges: hasPageChanges,
    save: savePage,
    reset: resetPage,
    startEditing,
  } = useEditablePageContent('gallery', defaultContent);

  const { content: heroContent, isLoading: isHeroLoading, isSaving: isHeroSaving, hasChanges: hasHeroChanges, updateField: updateHeroField, save: saveHero, reset: resetHero } = useSectionContent('gallery', 'hero', defaultHero as any) as { content: HeroContent; isLoading: boolean; isSaving: boolean; hasChanges: boolean; updateField: any; save: () => Promise<boolean>; reset: () => void };
  const { content: galleryContent, isLoading: isGalleryLoading, isSaving: isGallerySaving, hasChanges: hasGalleryChanges, updateField: updateGalleryField, save: saveGallery, reset: resetGallery } = useSectionContent('gallery', 'images', defaultGallery as any) as { content: GalleryContent; isLoading: boolean; isSaving: boolean; hasChanges: boolean; updateField: any; save: () => Promise<boolean>; reset: () => void };
  const { content: ctaContent, isLoading: isCtaLoading, isSaving: isCtaSaving, hasChanges: hasCtaChanges, updateField: updateCtaField, save: saveCta, reset: resetCta } = useSectionContent('gallery', 'cta', defaultCta as any) as { content: CtaContent; isLoading: boolean; isSaving: boolean; hasChanges: boolean; updateField: any; save: () => Promise<boolean>; reset: () => void };

  const [localHero, setLocalHero] = useState<HeroContent>(defaultHero);
  const [localImages, setLocalImages] = useState<GalleryImage[]>(defaultGalleryImages);
  const [localCategories, setLocalCategories] = useState<string[]>(defaultCategories);
  const [localCta, setLocalCta] = useState<CtaContent>(defaultCta);

  useEffect(() => { if (heroContent) setLocalHero(heroContent); }, [heroContent]);
  useEffect(() => { if (galleryContent?.images) setLocalImages(galleryContent.images); }, [galleryContent]);
  useEffect(() => { if (galleryContent?.categories) setLocalCategories(galleryContent.categories); }, [galleryContent]);
  useEffect(() => { if (ctaContent) setLocalCta(ctaContent); }, [ctaContent]);

  const updateImage = (id: string, field: keyof GalleryImage, value: string) => {
    const updated = localImages.map(img => img.id === id ? { ...img, [field]: value } : img);
    setLocalImages(updated);
    updateGalleryField('images', updated);
  };

  const addImage = () => {
    const newId = String(Date.now());
    const newImage: GalleryImage = { id: newId, url: '/placeholder.svg', title: 'New Image', category: 'Other' };
    const updated = [...localImages, newImage];
    setLocalImages(updated);
    updateGalleryField('images', updated);
  };

  const deleteImage = (id: string) => {
    const updated = localImages.filter(img => img.id !== id);
    setLocalImages(updated);
    updateGalleryField('images', updated);
  };

  const handleSave = async () => {
    await Promise.all([savePage(), saveHero(), saveGallery(), saveCta()]);
  };

  const handleReset = () => {
    resetPage(); resetHero(); resetGallery(); resetCta();
    if (heroContent) setLocalHero(heroContent);
    if (galleryContent?.images) setLocalImages(galleryContent.images);
    if (galleryContent?.categories) setLocalCategories(galleryContent.categories);
    if (ctaContent) setLocalCta(ctaContent);
  };

  const isLoading = isPageLoading || isHeroLoading || isGalleryLoading || isCtaLoading;
  const isSaving = isPageSaving || isHeroSaving || isGallerySaving || isCtaSaving;
  const hasChanges = hasPageChanges || hasHeroChanges || hasGalleryChanges || hasCtaChanges;

  const filteredImages = selectedCategory === 'All' 
    ? localImages 
    : localImages.filter(img => img.category === selectedCategory);

  if (isLoading) return null;

  return (
    <>
      <Helmet>
        <title>{content.metaTitle}</title>
        <meta name="description" content={content.metaDescription} />
        <link rel="canonical" href="https://summitbuildings.com/gallery" />
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
        pageSlug="gallery"
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
            <InlineEditable value={localHero.heading} fieldName="Hero heading" onChange={(v) => { setLocalHero({ ...localHero, heading: v }); updateHeroField('heading', v); }} isEditMode={isEditMode} className="font-heading text-3xl md:text-5xl text-primary-foreground mb-4" as="h1" />
            <InlineEditable value={localHero.description} fieldName="Hero description" onChange={(v) => { setLocalHero({ ...localHero, description: v }); updateHeroField('description', v); }} isEditMode={isEditMode} className="text-primary-foreground/80 text-lg max-w-2xl mx-auto" as="p" />
          </div>
        </section>

        {/* Filter Tabs */}
        <section className="bg-muted py-6 sticky top-20 z-40 border-b border-border">
          <div className="container-custom">
            <div className="flex flex-wrap justify-center gap-2">
              {localCategories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                  className={selectedCategory === category ? 'bg-secondary text-secondary-foreground hover:bg-secondary/90' : ''}
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>
        </section>

        {/* Gallery Grid */}
        <section className="py-12 md:py-16 bg-background">
          <div className="container-custom">
            <p className="text-muted-foreground text-center mb-8">
              Showing {filteredImages.length} {filteredImages.length === 1 ? 'image' : 'images'}
              {selectedCategory !== 'All' && ` in ${selectedCategory}`}
            </p>

            {isEditMode && (
              <div className="flex justify-center mb-8">
                <Button onClick={addImage} variant="outline" className="gap-2">
                  <Plus className="w-4 h-4" /> Add New Image
                </Button>
              </div>
            )}
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {filteredImages.map((image) => (
                <div
                  key={image.id}
                  className="group relative aspect-[4/3] overflow-hidden rounded-lg bg-muted"
                >
                  {isEditMode ? (
                    <div className="relative w-full h-full">
                      <InlineEditableImage
                        src={image.url}
                        alt={image.title}
                        onImageChange={(url) => updateImage(image.id, 'url', url)}
                        isEditMode={isEditMode}
                        imageClassName="w-full h-full object-cover"
                      />
                      <button
                        onClick={() => deleteImage(image.id)}
                        className="absolute top-2 right-2 bg-destructive text-destructive-foreground rounded-full p-1.5 opacity-0 group-hover:opacity-100 transition-opacity z-10"
                        title="Delete image"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                      <div className="absolute bottom-0 left-0 right-0 p-3 bg-black/70 space-y-2">
                        <Input
                          value={image.title}
                          onChange={(e) => updateImage(image.id, 'title', e.target.value)}
                          placeholder="Image title"
                          className="h-8 text-sm bg-white/90 text-black"
                        />
                        <Select value={image.category} onValueChange={(v) => updateImage(image.id, 'category', v)}>
                          <SelectTrigger className="h-8 text-sm bg-white/90 text-black">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {localCategories.filter(c => c !== 'All').map((cat) => (
                              <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  ) : (
                    <>
                      <img
                        src={image.url}
                        alt={image.title}
                        loading="lazy"
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105 cursor-pointer"
                        onClick={() => setSelectedImage(image)}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <div className="absolute bottom-0 left-0 right-0 p-4 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                        <p className="font-medium">{image.title}</p>
                        <p className="text-sm text-white/80">{image.category}</p>
                      </div>
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-muted">
          <div className="container-custom text-center">
            <InlineEditable value={localCta.heading} fieldName="CTA heading" onChange={(v) => { setLocalCta({ ...localCta, heading: v }); updateCtaField('heading', v); }} isEditMode={isEditMode} className="font-heading text-2xl md:text-3xl text-foreground mb-4" as="h2" />
            <InlineEditable value={localCta.description} fieldName="CTA description" onChange={(v) => { setLocalCta({ ...localCta, description: v }); updateCtaField('description', v); }} isEditMode={isEditMode} className="text-muted-foreground mb-8 max-w-2xl mx-auto" as="p" />
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {isEditMode ? (
                <>
                  <InlineEditableButton
                    text={localCta.button1Text}
                    href={localCta.button1Link}
                    onTextChange={(v) => { setLocalCta({ ...localCta, button1Text: v }); updateCtaField('button1Text', v); }}
                    onHrefChange={(v) => { setLocalCta({ ...localCta, button1Link: v }); updateCtaField('button1Link', v); }}
                    isEditMode={isEditMode}
                    isExternal={localCta.button1OpenInNewTab}
                    onExternalChange={(v) => { setLocalCta({ ...localCta, button1OpenInNewTab: v }); updateCtaField('button1OpenInNewTab', v); }}
                  >
                    <Button variant="hero" size="lg">{localCta.button1Text}</Button>
                  </InlineEditableButton>
                  <InlineEditableButton
                    text={localCta.button2Text}
                    href={localCta.button2Link}
                    onTextChange={(v) => { setLocalCta({ ...localCta, button2Text: v }); updateCtaField('button2Text', v); }}
                    onHrefChange={(v) => { setLocalCta({ ...localCta, button2Link: v }); updateCtaField('button2Link', v); }}
                    isEditMode={isEditMode}
                    isExternal={localCta.button2OpenInNewTab}
                    onExternalChange={(v) => { setLocalCta({ ...localCta, button2OpenInNewTab: v }); updateCtaField('button2OpenInNewTab', v); }}
                  >
                    <Button variant="outline" size="lg">{localCta.button2Text}</Button>
                  </InlineEditableButton>
                </>
              ) : (
                <>
                  <Button variant="hero" size="lg" asChild>
                    <a href={localCta.button1Link} target={localCta.button1OpenInNewTab ? '_blank' : undefined} rel={localCta.button1OpenInNewTab ? 'noopener noreferrer' : undefined}>
                      {localCta.button1Text}
                    </a>
                  </Button>
                  <Button variant="outline" size="lg" asChild>
                    <a href={localCta.button2Link} target={localCta.button2OpenInNewTab ? '_blank' : undefined} rel={localCta.button2OpenInNewTab ? 'noopener noreferrer' : undefined}>
                      {localCta.button2Text}
                    </a>
                  </Button>
                </>
              )}
            </div>
          </div>
        </section>
      </main>

      {/* Lightbox Dialog */}
      <Dialog open={!!selectedImage} onOpenChange={() => setSelectedImage(null)}>
        <DialogContent className="max-w-4xl p-0 bg-black/95 border-none">
          <button
            onClick={() => setSelectedImage(null)}
            className="absolute right-4 top-4 z-50 rounded-full bg-white/10 p-2 hover:bg-white/20 transition-colors"
          >
            <X className="h-6 w-6 text-white" />
          </button>
          {selectedImage && (
            <div className="relative">
              <img
                src={selectedImage.url}
                alt={selectedImage.title}
                className="w-full h-auto max-h-[80vh] object-contain"
              />
              <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent">
                <p className="text-white font-medium text-lg">{selectedImage.title}</p>
                <p className="text-white/80">{selectedImage.category}</p>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      <Footer />
    </>
  );
};

export default Gallery;
