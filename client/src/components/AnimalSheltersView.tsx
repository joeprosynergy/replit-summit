/**
 * AnimalSheltersView - Animal Shelters View Component
 * Pure presentation component - NO admin code
 * SPECIAL LAYOUT - Has 3 sub-products with different sections
 */

import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Check, ArrowRight } from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import ProductHero from '@/components/ProductHero';
import { AnimalSheltersContent } from '@/pages/defaults/animalSheltersDefaults';
import { useGlobalColors } from '@/hooks/useGlobalColors';

const ColorSwatch = ({ color }: { color: { name: string; color: string; image?: string } }) => (
  <div className="flex flex-col items-center gap-2">
    {color.image ? (
      <div className="w-16 h-16 rounded-full border-4 border-card shadow-md overflow-hidden">
        <img src={color.image} alt={color.name} className="w-full h-full object-cover" />
      </div>
    ) : (
      <div
        className="w-16 h-16 rounded-full border-4 border-card shadow-md"
        style={{ backgroundColor: color.color }}
      />
    )}
    <span className="text-xs text-muted-foreground text-center leading-tight max-w-[70px]">
      {color.name}
    </span>
  </div>
);

interface AnimalSheltersViewProps {
  content: AnimalSheltersContent;
}

export function AnimalSheltersView({ content }: AnimalSheltersViewProps) {
  const location = useLocation();
  const { getColorsByCategory } = useGlobalColors();

  // Handle hash navigation
  useEffect(() => {
    if (location.hash) {
      const element = document.getElementById(location.hash.substring(1));
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    }
  }, [location]);

  return (
    <>
      <Helmet>
        <title>{content.metaTitle}</title>
        <meta name="description" content={content.metaDescription} />
        <meta property="og:title" content={content.metaTitle} />
        <meta property="og:description" content={content.metaDescription} />
        {content.canonicalUrl && <link rel="canonical" href={content.canonicalUrl} />}
      </Helmet>

      <div className="min-h-screen">
        <Header />

        <main>
          {/* Hero Section */}
          <ProductHero
            backPath={content.backPath}
            title={content.title || 'ANIMAL'}
            titleHighlight={content.titleHighlight || 'SHELTERS'}
            description={content.description}
            subtitle={content.subtitle}
            image={content.heroImage}
            imageAlt={content.heroImageAlt}
            isEditMode={false}
            onUpdateField={() => {}}
            ctaButtons={[
              {
                text: content.heroButton1Text || 'Design Your Shelter',
                href: content.heroButton1Link || 'https://summitbuildings.shedpro.co/',
                variant: 'hero',
                external: content.heroButton1OpenInNewTab ?? true,
              },
              {
                text: content.heroButton2Text || 'Browse Inventory',
                href: content.heroButton2Link || '/inventory',
                variant: 'heroOutline',
                external: content.heroButton2OpenInNewTab ?? false,
              },
            ]}
          />

          {/* Quick Nav */}
          <section className="py-8 bg-muted/50 border-b border-border">
            <div className="container-custom">
              <div className="flex flex-wrap justify-center gap-4">
                {content.shelters.map((shelter) => (
                  <a
                    key={shelter.id}
                    href={`#${shelter.id}`}
                    className="px-6 py-3 bg-card rounded-lg border border-border hover:border-secondary hover:bg-secondary/10 transition-all font-medium text-foreground"
                  >
                    {shelter.name}
                  </a>
                ))}
              </div>
            </div>
          </section>

          {/* Shelter Product Sections */}
          {content.shelters.map((shelter, index) => (
            <section
              key={shelter.id}
              id={shelter.id}
              className={`section-padding ${index % 2 === 0 ? 'bg-background' : 'bg-muted/30'}`}
            >
              <div className="container-custom">
                <div className="max-w-6xl mx-auto">
                  <div className={`grid lg:grid-cols-2 gap-12 items-center ${index % 2 === 1 ? '' : ''}`}>
                    <div className={index % 2 === 1 ? 'lg:order-2' : ''}>
                      <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-2">
                        {shelter.name}
                      </h2>
                      <p className="text-secondary font-heading text-lg mb-4">
                        {shelter.tagline}
                      </p>
                      <p className="text-muted-foreground mb-6">
                        {shelter.description}
                      </p>

                      <div className="bg-card rounded-xl p-6 border border-border shadow-sm mb-6">
                        <h3 className="font-heading text-xl font-bold text-foreground mb-4">
                          Standard Features
                        </h3>
                        <div className="space-y-2">
                          {shelter.features.map((feature, idx) => (
                            <div key={idx} className="flex items-center gap-3 text-foreground">
                              <Check className="w-5 h-5 text-secondary flex-shrink-0" />
                              <span>{feature}</span>
                            </div>
                          ))}
                        </div>
                        {shelter.note && (
                          <p className="text-xs text-muted-foreground italic mt-4">
                            {shelter.note}
                          </p>
                        )}
                      </div>

                      <a
                        href={shelter.buttonLink}
                        target={shelter.buttonOpenInNewTab ? '_blank' : undefined}
                        rel={shelter.buttonOpenInNewTab ? 'noopener noreferrer' : undefined}
                      >
                        <Button variant="hero">
                          {shelter.buttonText}
                          <ArrowRight className="w-4 h-4" />
                        </Button>
                      </a>
                    </div>

                    <div className={`grid grid-cols-2 gap-4 ${index % 2 === 1 ? 'lg:order-1' : ''}`}>
                      <img
                        src={shelter.image1}
                        alt={shelter.image1Alt}
                        className="rounded-xl shadow-lg w-full aspect-square object-cover"
                      />
                      <img
                        src={shelter.image2}
                        alt={shelter.image2Alt}
                        className="rounded-xl shadow-lg w-full aspect-square object-cover"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </section>
          ))}

          {/* Color & Material Options */}
          {content.sidingCategories.length > 0 && (
            <section className="section-padding bg-muted/30">
              <div className="container-custom">
                <h2 className="font-heading text-3xl md:text-4xl font-bold text-secondary mb-8">
                  {content.colorHeading}
                </h2>

                <div className="bg-card rounded-lg border border-border overflow-hidden">
                  <Accordion
                    type="single"
                    collapsible
                    defaultValue={content.sidingCategories[0]?.id}
                    className="w-full"
                  >
                    {content.sidingCategories.map((category, index) => (
                      <AccordionItem
                        key={category.id}
                        value={category.id}
                        className={
                          index < content.sidingCategories.length - 1
                            ? 'border-b border-border'
                            : 'border-none'
                        }
                      >
                        <AccordionTrigger className="px-6 py-4 hover:no-underline">
                          <span className="font-heading text-lg font-bold text-secondary uppercase">
                            {category.title}
                          </span>
                        </AccordionTrigger>
                        <AccordionContent className="px-6 pb-6">
                          <div className="flex flex-wrap gap-6 pt-4">
                            {getColorsByCategory(category.id).map((color) => (
                              <ColorSwatch key={color.id} color={color} />
                            ))}
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </div>
              </div>
            </section>
          )}

          {/* CTA Section */}
          <section className="section-padding bg-navy text-center">
            <div className="container-custom max-w-3xl">
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-primary-foreground mb-6">
                {content.ctaHeading || 'Ready to House Your Animals?'}
              </h2>
              <p className="text-primary-foreground/80 text-lg mb-8">
                {content.ctaDescription || 'Design your perfect animal shelter today or call us to discuss your needs.'}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href={content.ctaPrimaryButtonLink || 'https://summitbuildings.shedpro.co/'}
                  target={content.ctaPrimaryButtonOpenInNewTab ? '_blank' : undefined}
                  rel={content.ctaPrimaryButtonOpenInNewTab ? 'noopener noreferrer' : undefined}
                >
                  <Button variant="hero" size="xl">
                    {content.ctaPrimaryButton || 'Design Your Shelter'}
                    <ArrowRight className="w-5 h-5" />
                  </Button>
                </a>
                <a
                  href={content.ctaSecondaryButtonLink || 'tel:5737474700'}
                  target={content.ctaSecondaryButtonOpenInNewTab ? '_blank' : undefined}
                  rel={content.ctaSecondaryButtonOpenInNewTab ? 'noopener noreferrer' : undefined}
                >
                  <Button variant="heroOutline" size="xl">
                    {content.ctaSecondaryButton || 'Call (573) 747-4700'}
                  </Button>
                </a>
              </div>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
}

export default AnimalSheltersView;
