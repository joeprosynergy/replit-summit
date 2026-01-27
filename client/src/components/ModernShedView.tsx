/**
 * ModernShedView - Modern Shed View Component
 * Pure presentation component - NO admin code
 * SPECIAL LAYOUT - Has unique "Why" cards and uses with descriptions
 */

import { Helmet } from 'react-helmet-async';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Check, Home, Wrench, Briefcase, Palette, ExternalLink } from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import GallerySection from '@/components/GallerySection';
import ProductHero from '@/components/ProductHero';
import { useBackPath } from '@/hooks/useBackPath';
import { ModernShedContent, WhyReason } from '@/pages/defaults/modernShedDefaults';
import { useGlobalColors } from '@/hooks/useGlobalColors';

const ColorSwatch = ({ color }: { color: { name: string; color: string; image?: string } }) => (
  <div className="flex flex-col items-center gap-2">
    {color.image ? (
      <div className="w-6 h-6 rounded-full border-2 border-card shadow-md overflow-hidden">
        <img src={color.image} alt={color.name} className="w-full h-full object-cover" />
      </div>
    ) : (
      <div
        className="w-6 h-6 rounded-full border-2 border-card shadow-md"
        style={{ backgroundColor: color.color }}
      />
    )}
    <span className="text-sm text-muted-foreground text-center leading-tight max-w-[70px]">
      {color.name}
    </span>
  </div>
);

// Icon mapping for "Why" reasons
const WhyIcon = ({ type }: { type: WhyReason['iconType'] }) => {
  const iconProps = { className: 'w-6 h-6 text-secondary' };
  switch (type) {
    case 'home':
      return <Home {...iconProps} />;
    case 'wrench':
      return <Wrench {...iconProps} />;
    case 'briefcase':
      return <Briefcase {...iconProps} />;
    case 'palette':
      return <Palette {...iconProps} />;
    default:
      return <Check {...iconProps} />;
  }
};

interface ModernShedViewProps {
  content: ModernShedContent;
}

export function ModernShedView({ content }: ModernShedViewProps) {
  const backPath = useBackPath(content.backPath);
  const { getColorsByCategory } = useGlobalColors();

  return (
    <>
      <Helmet>
        <title>{content.metaTitle}</title>
        <meta name="description" content={content.metaDescription} />
        {content.canonicalUrl && <link rel="canonical" href={content.canonicalUrl} />}
      </Helmet>

      <Header />

      <main className="pt-20">
        {/* Hero Section */}
        <ProductHero
          backPath={backPath}
          title={content.title || 'MODERN'}
          titleHighlight={content.titleHighlight || 'SHED'}
          description={content.description}
          image={content.heroImage}
          imageAlt={content.heroImageAlt}
          isEditMode={false}
          onUpdateField={() => {}}
          ctaButtons={[
            {
              text: content.heroButton1Text || 'Design Your Building',
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

        {/* Gallery Section */}
        {content.galleryImages.length > 0 && (
          <section className="section-padding bg-background">
            <div className="container-custom">
              <GallerySection images={content.galleryImages} />
            </div>
          </section>
        )}

        {/* Features Section */}
        <section className="section-padding bg-muted/30">
          <div className="container-custom">
            <div className="max-w-4xl mx-auto">
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4 text-center">
                {content.featuresHeading}
              </h2>
              <p className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
                {content.featuresDescription}
              </p>

              <div className="bg-card rounded-xl p-8 border border-border shadow-lg">
                <div className="grid sm:grid-cols-2 gap-4">
                  {content.features.map((feature, index) => (
                    <div key={index} className="flex items-center gap-3 text-foreground">
                      <Check className="w-5 h-5 text-secondary flex-shrink-0" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Why Modern Style Section */}
        <section className="section-padding bg-background">
          <div className="container-custom">
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-12 text-center">
              {content.whyHeading}
            </h2>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
              {content.whyReasons.map((reason) => (
                <div
                  key={reason.id}
                  className="bg-card rounded-xl p-6 border border-border shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center mb-4">
                    <WhyIcon type={reason.iconType} />
                  </div>
                  <h3 className="font-heading text-lg font-bold text-foreground mb-2">
                    {reason.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {reason.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Ideal Uses Section */}
        <section className="section-padding bg-muted/30">
          <div className="container-custom">
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-12 text-center">
              {content.usesHeading}
            </h2>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
              {content.useCases.map((useCase) => (
                <div
                  key={useCase.id}
                  className="bg-card rounded-xl p-6 border border-border shadow-sm"
                >
                  <h3 className="font-heading text-lg font-bold text-foreground mb-2">
                    {useCase.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {useCase.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Color & Material Options */}
        <section className="section-padding bg-background">
          <div className="container-custom">
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4 text-center">
              {content.colorHeading}
            </h2>
            <p className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
              {content.colorDescription}
            </p>

            <div className="bg-card rounded-lg border border-border overflow-hidden max-w-4xl mx-auto">
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
                      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 pt-4">
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

        {/* Upgrades Section */}
        <section className="section-padding bg-muted/30">
          <div className="container-custom">
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4 text-center">
              {content.upgradeHeading}
            </h2>
            <p className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
              {content.upgradeDescription}
            </p>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {content.upgradeCategories.map((category) => (
                <div
                  key={category.id}
                  className="bg-card rounded-xl p-6 border border-border/50"
                >
                  <h3 className="font-heading text-lg font-bold text-foreground mb-4">
                    {category.category}
                  </h3>
                  <ul className="space-y-2">
                    {category.items.map((item, index) => (
                      <li
                        key={index}
                        className="text-sm text-muted-foreground flex items-start gap-2"
                      >
                        <Check className="w-4 h-4 text-secondary flex-shrink-0 mt-0.5" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="section-padding bg-primary">
          <div className="container-custom text-center">
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
              {content.ctaHeading || 'Ready to Design Your Modern Shed?'}
            </h2>
            <p className="text-primary-foreground/80 text-lg mb-8 max-w-2xl mx-auto">
              {content.ctaDescription || 'Use our online configurator to customize your perfect Modern Shed, or contact us for personalized assistance.'}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href={content.ctaPrimaryButtonLink || 'https://summitbuildings.shedpro.co/'}
                target={content.ctaPrimaryButtonOpenInNewTab ? '_blank' : undefined}
                rel={content.ctaPrimaryButtonOpenInNewTab ? 'noopener noreferrer' : undefined}
              >
                <Button variant="hero" size="xl">
                  {content.ctaPrimaryButton || 'Design Your Building'}
                  <ExternalLink className="w-5 h-5" />
                </Button>
              </a>
              <a
                href={content.ctaSecondaryButtonLink || '/contact-us'}
                target={content.ctaSecondaryButtonOpenInNewTab ? '_blank' : undefined}
                rel={content.ctaSecondaryButtonOpenInNewTab ? 'noopener noreferrer' : undefined}
              >
                <Button variant="heroOutline" size="xl">
                  {content.ctaSecondaryButton || 'Contact Us'}
                </Button>
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}

export default ModernShedView;
