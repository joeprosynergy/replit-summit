import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';

interface GalleryImage {
  url: string;
  title: string;
  category: string;
}

const galleryImages: GalleryImage[] = [
  // Cabins
  { url: 'https://summitbuildings.com/wp-content/uploads/2024/11/Image-6.jpeg', title: 'Cabin 1', category: 'Cabins' },
  { url: 'https://summitbuildings.com/wp-content/uploads/2024/11/P-Premium-Cabin.jpeg', title: 'Premium Cabin', category: 'Cabins' },
  { url: 'https://summitbuildings.com/wp-content/uploads/2024/11/Image-8-1.jpg', title: 'Cabin 3', category: 'Cabins' },
  { url: 'https://summitbuildings.com/wp-content/uploads/2024/11/PREMIUM-LBC-1.jpeg', title: 'Premium LBC', category: 'Cabins' },
  { url: 'https://summitbuildings.com/wp-content/uploads/2024/11/deluxe-lofted-cabin.jpeg', title: 'Deluxe Lofted Cabin', category: 'Cabins' },
  { url: 'https://summitbuildings.com/wp-content/uploads/2024/11/Deluxe-Cabin.jpeg', title: 'Deluxe Cabin', category: 'Cabins' },
  { url: 'https://summitbuildings.com/wp-content/uploads/2024/11/side-lofted-barn-cabin.jpeg', title: 'Side Lofted Barn Cabin', category: 'Cabins' },
  { url: 'https://summitbuildings.com/wp-content/uploads/2024/11/PREMIUM-LBC.jpeg', title: 'Premium LBC', category: 'Cabins' },
  { url: 'https://summitbuildings.com/wp-content/uploads/2024/11/SUMMIT-CABIN-NEW-PHOTO-scaled.jpg', title: 'Summit Cabin', category: 'Cabins' },
  
  // Lofted Barns
  { url: 'https://summitbuildings.com/wp-content/uploads/2024/11/Image-27.jpeg', title: 'Lofted Economy', category: 'Lofted Barns' },
  { url: 'https://summitbuildings.com/wp-content/uploads/2024/11/Image-26.jpeg', title: 'Lofted Economy 2', category: 'Lofted Barns' },
  { url: 'https://summitbuildings.com/wp-content/uploads/2024/11/Lofted-Barn-7.jpeg', title: 'Lofted Barn 7', category: 'Lofted Barns' },
  { url: 'https://summitbuildings.com/wp-content/uploads/2024/11/side-lofted-barn-2-scaled.jpg', title: 'Side Lofted Barn', category: 'Lofted Barns' },
  { url: 'https://summitbuildings.com/wp-content/uploads/2024/11/side-lofted-barn.jpg', title: 'Side Lofted Barn', category: 'Lofted Barns' },
  { url: 'https://summitbuildings.com/wp-content/uploads/2024/11/Image-1.jpeg_-1.jpeg', title: 'Lofted Barn', category: 'Lofted Barns' },
  
  // Garages
  { url: 'https://summitbuildings.com/wp-content/uploads/2024/11/IMG_3880-scaled.jpg', title: 'Garage 1', category: 'Garages' },
  { url: 'https://summitbuildings.com/wp-content/uploads/2024/11/IMG_2007-scaled.jpg', title: 'Garage', category: 'Garages' },
  { url: 'https://summitbuildings.com/wp-content/uploads/2024/11/Metal-Garage.jpg', title: 'Metal Garage', category: 'Garages' },
  { url: 'https://summitbuildings.com/wp-content/uploads/2024/11/P-Lofted-Garage.jpeg', title: 'Lofted Garage', category: 'Garages' },
  { url: 'https://summitbuildings.com/wp-content/uploads/2024/11/MLG-1.jpeg', title: 'MLG Garage', category: 'Garages' },
  
  // Utility Sheds
  { url: 'https://summitbuildings.com/wp-content/uploads/2024/11/Image-14.jpeg', title: 'Utility Shed', category: 'Utility Sheds' },
  { url: 'https://summitbuildings.com/wp-content/uploads/2024/11/Image-4.jpeg', title: 'Utility Shed', category: 'Utility Sheds' },
  { url: 'https://summitbuildings.com/wp-content/uploads/2024/11/IMG_3909.jpg', title: 'Utility Shed', category: 'Utility Sheds' },
  { url: 'https://summitbuildings.com/wp-content/uploads/2024/11/Image-8.jpg', title: 'Utility Shed', category: 'Utility Sheds' },
  { url: 'https://summitbuildings.com/wp-content/uploads/2024/11/IMG_3458-scaled.jpg', title: 'Utility Shed', category: 'Utility Sheds' },
  
  // Economy Sheds
  { url: 'https://summitbuildings.com/wp-content/uploads/2024/11/Economy-Metal.jpg', title: 'Economy Metal', category: 'Economy Sheds' },
  { url: 'https://summitbuildings.com/wp-content/uploads/2024/11/IMG_0892.jpg', title: 'Economy Shed', category: 'Economy Sheds' },
  
  // Dormers
  { url: 'https://summitbuildings.com/wp-content/uploads/2024/11/10x16-O-Dormer-1.jpg', title: 'Dormer', category: 'Dormers' },
  { url: 'https://summitbuildings.com/wp-content/uploads/2024/11/Dormer-2.jpeg', title: 'Dormer 2', category: 'Dormers' },
  { url: 'https://summitbuildings.com/wp-content/uploads/2024/11/10x16-O-Dormer.jpg', title: 'Dormer', category: 'Dormers' },
  
  // Specialty
  { url: 'https://summitbuildings.com/wp-content/uploads/2024/11/Chicken-Coop-4.jpeg', title: 'Chicken Coop', category: 'Specialty' },
  { url: 'https://summitbuildings.com/wp-content/uploads/2024/11/Chicken-Coop-2.jpg', title: 'Chicken Coop', category: 'Specialty' },
  { url: 'https://summitbuildings.com/wp-content/uploads/2024/11/Chicken-Coops-1.jpeg', title: 'Chicken Coop', category: 'Specialty' },
  { url: 'https://summitbuildings.com/wp-content/uploads/2024/11/greenhouse.jpg', title: 'Greenhouse', category: 'Specialty' },
  { url: 'https://summitbuildings.com/wp-content/uploads/2024/11/Animal-Shelters-scaled.jpg', title: 'Animal Shelters', category: 'Specialty' },
  
  // Other
  { url: 'https://summitbuildings.com/wp-content/uploads/2024/11/ASHE.jpeg', title: 'Custom Build', category: 'Other' },
  { url: 'https://summitbuildings.com/wp-content/uploads/2024/11/IMG_2520-scaled.jpg', title: 'Custom Build', category: 'Other' },
  { url: 'https://summitbuildings.com/wp-content/uploads/2024/11/IMG_0931-scaled.jpg', title: 'Custom Build', category: 'Other' },
  { url: 'https://summitbuildings.com/wp-content/uploads/2024/11/IMG_2393-1-scaled.jpg', title: 'Custom Build', category: 'Other' },
  { url: 'https://summitbuildings.com/wp-content/uploads/2024/11/0FF8CAB3-41F7-40CF-B4D1-9DD34E02C11D.jpg', title: 'Custom Build', category: 'Other' },
];

const categories = ['All', 'Cabins', 'Lofted Barns', 'Garages', 'Utility Sheds', 'Economy Sheds', 'Dormers', 'Specialty', 'Other'];

const Gallery = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);

  const filteredImages = selectedCategory === 'All' 
    ? galleryImages 
    : galleryImages.filter(img => img.category === selectedCategory);

  return (
    <>
      <Helmet>
        <title>Gallery | Summit Portable Buildings</title>
        <meta name="description" content="Browse our gallery of custom storage buildings, cabins, garages, lofted barns, and more. See the quality craftsmanship of Summit Portable Buildings." />
        <link rel="canonical" href="https://summitbuildings.com/gallery" />
      </Helmet>
      
      <Header />
      
      <main className="pt-20">
        {/* Hero Section */}
        <section className="bg-primary py-16 md:py-24">
          <div className="container-custom text-center">
            <h1 className="font-heading text-3xl md:text-5xl text-primary-foreground mb-4">
              Our Building Gallery
            </h1>
            <p className="text-primary-foreground/80 text-lg max-w-2xl mx-auto">
              Explore our collection of custom storage buildings, cabins, garages, and more. Each building is crafted with quality materials and attention to detail.
            </p>
          </div>
        </section>

        {/* Filter Tabs */}
        <section className="bg-muted py-6 sticky top-20 z-40 border-b border-border">
          <div className="container-custom">
            <div className="flex flex-wrap justify-center gap-2">
              {categories.map((category) => (
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
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {filteredImages.map((image, index) => (
                <div
                  key={index}
                  className="group relative aspect-[4/3] overflow-hidden rounded-lg cursor-pointer bg-muted"
                  onClick={() => setSelectedImage(image)}
                >
                  <img
                    src={image.url}
                    alt={image.title}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute bottom-0 left-0 right-0 p-4 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                    <p className="font-medium">{image.title}</p>
                    <p className="text-sm text-white/80">{image.category}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-muted">
          <div className="container-custom text-center">
            <h2 className="font-heading text-2xl md:text-3xl text-foreground mb-4">
              Ready to Build Your Dream Storage Building?
            </h2>
            <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
              Contact us today or use our 3D designer to customize your perfect building.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="hero" size="lg" asChild>
                <a href="https://summitbuildings.shedpro.co/" target="_blank" rel="noopener noreferrer">
                  Design Your Building
                </a>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <a href="/contact-us">Contact Us</a>
              </Button>
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
