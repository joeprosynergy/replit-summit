import { useState } from 'react';
import { Grid } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

interface GallerySectionProps {
  images: { src: string; alt: string }[];
  title?: string;
}

const GallerySection = ({ images, title = "Photo Gallery" }: GallerySectionProps) => {
  const [showAll, setShowAll] = useState(false);

  return (
    <div className="space-y-6">
      <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground mb-8 text-center">
        {title}
      </h2>
      
      {/* Carousel for main view */}
      <Carousel className="w-full max-w-5xl mx-auto">
        <CarouselContent>
          {images.map((image, index) => (
            <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
              <div className="p-2">
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full aspect-square object-cover rounded-lg shadow-md hover:shadow-lg transition-shadow"
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="hidden md:flex" />
        <CarouselNext className="hidden md:flex" />
      </Carousel>

      {/* View All Photos Button */}
      <div className="text-center">
        <Button
          variant="outline"
          onClick={() => setShowAll(!showAll)}
          className="gap-2"
        >
          <Grid className="h-4 w-4" />
          {showAll ? 'Hide Photos' : `View All ${images.length} Photos`}
        </Button>
      </div>

      {/* Expanded Grid View */}
      {showAll && (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {images.map((image, index) => (
            <div key={index} className="aspect-square overflow-hidden rounded-lg">
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default GallerySection;
