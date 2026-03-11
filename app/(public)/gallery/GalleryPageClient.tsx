"use client";

/**
 * Gallery Page - Refactored for CMS-First Architecture
 * Uses EditablePageWrapper with consolidated defaults
 */

import { useState } from 'react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { X, Plus, Trash2 } from 'lucide-react';
import { InlineEditable } from '@/components/admin/InlineEditable';
import InlineEditableImage from '@/components/admin/InlineEditableImage';
import InlineEditableButton from '@/components/admin/InlineEditableButton';
import { EditablePageWrapper } from '@/components/admin/EditablePageWrapper';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { galleryDefaults, GalleryContent, GalleryImage } from '@/data/defaults/galleryDefaults';

export default function GalleryPageClient({ initialContent }: { initialContent: any }) {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);

  return (
    <EditablePageWrapper<GalleryContent>
      slug="gallery"
      defaultContent={galleryDefaults}
    >
      {({ content, isEditMode, updateField }) => {
        const updateImage = (id: string, field: keyof GalleryImage, value: string) => {
          const updated = content.images.map(img => img.id === id ? { ...img, [field]: value } : img);
          updateField('images', updated as unknown as string);
        };

        const addImage = () => {
          const newId = String(Date.now());
          const newImage: GalleryImage = { id: newId, url: '/placeholder.svg', title: 'New Image', category: 'Other' };
          const updated = [...content.images, newImage];
          updateField('images', updated as unknown as string);
        };

        const deleteImage = (id: string) => {
          const updated = content.images.filter(img => img.id !== id);
          updateField('images', updated as unknown as string);
        };

        const filteredImages = selectedCategory === 'All' 
          ? content.images 
          : content.images.filter(img => img.category === selectedCategory);

        return (
          <>
            <main className="pt-20">
              {/* Hero Section */}
              <section className="bg-primary py-16 md:py-24">
                <div className="container-custom text-center">
                  <InlineEditable
                    value={content.heroHeading}
                    fieldName="heroHeading"
                    onChange={(v) => updateField('heroHeading', v)}
                    isEditMode={isEditMode}
                    className="font-heading text-3xl md:text-5xl text-primary-foreground mb-4"
                    as="h1"
                  />
                  <InlineEditable
                    value={content.heroDescription}
                    fieldName="heroDescription"
                    onChange={(v) => updateField('heroDescription', v)}
                    isEditMode={isEditMode}
                    className="text-primary-foreground/80 text-lg max-w-2xl mx-auto"
                    as="p"
                  />
                </div>
              </section>

              {/* Filter Tabs */}
              <section className="bg-muted py-6 sticky top-20 z-40 border-b border-border">
                <div className="container-custom">
                  <div className="flex flex-wrap justify-center gap-2">
                    {content.categories.map((category) => (
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
                                  {content.categories.filter(c => c !== 'All').map((cat) => (
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
                  <InlineEditable
                    value={content.ctaHeading}
                    fieldName="ctaHeading"
                    onChange={(v) => updateField('ctaHeading', v)}
                    isEditMode={isEditMode}
                    className="font-heading text-2xl md:text-3xl text-foreground mb-4"
                    as="h2"
                  />
                  <InlineEditable
                    value={content.ctaDescription}
                    fieldName="ctaDescription"
                    onChange={(v) => updateField('ctaDescription', v)}
                    isEditMode={isEditMode}
                    className="text-muted-foreground mb-8 max-w-2xl mx-auto"
                    as="p"
                  />
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    {isEditMode ? (
                      <>
                        <InlineEditableButton
                          text={content.ctaButton1Text}
                          href={content.ctaButton1Link}
                          onTextChange={(v) => updateField('ctaButton1Text', v)}
                          onHrefChange={(v) => updateField('ctaButton1Link', v)}
                          isEditMode={isEditMode}
                          isExternal={content.ctaButton1OpenInNewTab}
                          onExternalChange={(v) => updateField('ctaButton1OpenInNewTab', v)}
                        >
                          <Button variant="hero" size="lg">{content.ctaButton1Text}</Button>
                        </InlineEditableButton>
                        <InlineEditableButton
                          text={content.ctaButton2Text}
                          href={content.ctaButton2Link}
                          onTextChange={(v) => updateField('ctaButton2Text', v)}
                          onHrefChange={(v) => updateField('ctaButton2Link', v)}
                          isEditMode={isEditMode}
                          isExternal={content.ctaButton2OpenInNewTab}
                          onExternalChange={(v) => updateField('ctaButton2OpenInNewTab', v)}
                        >
                          <Button variant="outline" size="lg">{content.ctaButton2Text}</Button>
                        </InlineEditableButton>
                      </>
                    ) : (
                      <>
                        <Button variant="hero" size="lg" asChild>
                          <a href={content.ctaButton1Link} target={content.ctaButton1OpenInNewTab ? '_blank' : undefined} rel={content.ctaButton1OpenInNewTab ? 'noopener noreferrer' : undefined}>
                            {content.ctaButton1Text}
                          </a>
                        </Button>
                        <Button variant="outline" size="lg" asChild>
                          <a href={content.ctaButton2Link} target={content.ctaButton2OpenInNewTab ? '_blank' : undefined} rel={content.ctaButton2OpenInNewTab ? 'noopener noreferrer' : undefined}>
                            {content.ctaButton2Text}
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

          </>
        );
      }}
    </EditablePageWrapper>
  );
}
