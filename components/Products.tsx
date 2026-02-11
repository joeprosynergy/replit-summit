"use client";

import Link from 'next/link';
import { cloudinaryImages } from '@/lib/cloudinary';

const styles = [
  {
    id: 'utility',
    name: 'Utility',
    subtitle: 'Traditional A-Frame Roof',
    image: cloudinaryImages.utilityShed3,
    link: '/styles/utility'
  },
  {
    id: 'barn',
    name: 'Barn',
    subtitle: 'Gambrel Roof',
    image: cloudinaryImages.sideLoftedBarn4,
    link: '/styles/barn'
  },
  {
    id: 'modern',
    name: 'Modern',
    subtitle: 'Single Slope Roof',
    image: cloudinaryImages.modernShed,
    link: '/styles/modern'
  },
  {
    id: 'greenhouse',
    name: 'Greenhouse',
    subtitle: 'Grow Year-Round',
    image: cloudinaryImages.greenhouse1,
    link: '/styles/greenhouse'
  },
  {
    id: 'animal-shelters',
    name: 'Animal Shelters',
    subtitle: 'Kennels & Coops',
    image: cloudinaryImages.animalShelter1,
    link: '/styles/animal-shelters'
  },
];

const Products = () => {
  return (
    <section id="products" className="section-padding bg-background">
      <div className="container-custom">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <p className="text-secondary font-heading uppercase tracking-widest mb-3">
            Find Your Perfect Style
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading text-foreground mb-6">
            Choose Your Style
          </h2>
          <p className="text-muted-foreground text-lg">
            Select a roof style to explore available options
          </p>
        </div>

        {/* Styles Grid */}
        <div className="bg-card rounded-lg shadow-lg overflow-hidden">
          <div className="bg-primary py-5 px-6">
            <h3 className="text-2xl md:text-3xl font-heading font-bold text-primary-foreground text-center uppercase tracking-wide">
              Building Styles
            </h3>
          </div>

          <div className="p-6 md:p-10">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 max-w-5xl mx-auto">
              {styles.map((style) => (
                <Link
                  key={style.id}
                  href={style.link}
                  className="group text-center"
                >
                  <div className="aspect-square mb-4 overflow-hidden rounded-lg shadow-sm bg-muted">
                    <img
                      src={style.image}
                      alt={style.name}
                      loading="lazy"
                      className="w-full h-full transition-transform duration-300 group-hover:scale-105 object-cover"
                    />
                  </div>
                  <h4 className="font-heading font-bold text-lg text-foreground group-hover:text-secondary transition-colors uppercase tracking-wide">
                    {style.name}
                  </h4>
                  <p className="text-muted-foreground text-sm mt-1">
                    {style.subtitle}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <Link href="/styles" className="text-secondary hover:text-secondary/80 font-semibold transition-colors">
            View All Building Styles →
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Products;
