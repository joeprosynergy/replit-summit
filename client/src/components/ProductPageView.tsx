/**
 * ProductPageView - Generic Product Page View Component
 * Pure presentation component - NO admin code
 * Used by public users and as preview/fallback for admins
 */

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
import GallerySection from '@/components/GallerySection';
import ProductHero from '@/components/ProductHero';
import { useBackPath } from '@/hooks/useBackPath';
import { useGlobalColors } from '@/hooks/useGlobalColors';
import {
  ProductPageContent,
  ProductPageConfig,
  SidingCategory,
  UpgradeCategory,
  extractGalleryImages,
  extractFeatures,
  extractUses,
} from '@/pages/defaults/productPageTypes';

// Simple color swatch that displays a global color
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

// ============================================================================
// Main Component
// ============================================================================

interface ProductPageViewProps {
  content: ProductPageContent;
  config: ProductPageConfig;
}

export function ProductPageView({ content, config }: ProductPageViewProps) {
  const backPath = useBackPath(content.backPath);
  const { getColorsByCategory } = useGlobalColors();

  // Extract dynamic content
  const galleryImages = content.galleryImages || extractGalleryImages(content as Record<string, unknown>);
  const features = content.features?.length ? content.features : extractFeatures(content as Record<string, unknown>);
  const uses = content.uses?.length ? content.uses : extractUses(content as Record<string, unknown>);
  
  // Get global colors for each siding category
  // The sidingCategories from content tells us WHICH categories to show
  // But the actual colors come from the global palette
  const getSidingColors = (categoryId: string) => {
    return getColorsByCategory(categoryId);
  };

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
            backPath={backPath}
            title={content.title}
            titleHighlight={content.titleHighlight}
            titlePosition={content.titlePosition}
            description={content.description}
            secondaryDescription={content.secondaryDescription}
            subtitle={content.subtitle}
            image={content.heroImage}
            imageAlt={content.heroImageAlt}
            isEditMode={false}
            onUpdateField={() => {}}
            ctaButtons={[
              {
                text: content.heroButton1Text || 'Build Your Own',
                href: content.heroButton1Link || 'https://summitbuildings.shedpro.co/',
                variant: 'hero',
                external: content.heroButton1OpenInNewTab ?? true,
              },
              {
                text: content.heroButton2Text || 'Browse Our Inventory',
                href: content.heroButton2Link || '/inventory',
                variant: 'heroOutline',
                external: content.heroButton2OpenInNewTab ?? false,
              },
            ]}
          />

          {/* Gallery Section */}
          {config.showGallerySection && galleryImages.length > 0 && (
            <section className="section-padding bg-background">
              <div className="container-custom">
                <GallerySection images={galleryImages} />
              </div>
            </section>
          )}

          {/* Features Section */}
          {config.showFeaturesSection && (
            <section className="section-padding bg-muted/30">
              <div className="container-custom">
                <div className="max-w-4xl mx-auto">
                  <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4 text-center">
                    {content.featuresHeading}
                    {content.featuresHighlight && (
                      <>
                        {' '}
                        <span className="text-secondary">{content.featuresHighlight}</span>
                      </>
                    )}
                  </h2>
                  <p className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
                    {content.featuresDescription}
                  </p>

                  <div className="grid md:grid-cols-2 gap-8 items-center">
                    <div className="relative">
                      <img
                        src={content.featureImage}
                        alt={content.featureImageAlt}
                        className="rounded-xl shadow-lg w-full"
                      />
                      <div className="absolute -bottom-3 -right-3 bg-secondary text-primary-foreground px-4 py-2 rounded-lg font-heading text-sm">
                        {content.featureBadge}
                      </div>
                    </div>

                    <div className="bg-card rounded-xl p-8 border border-border shadow-lg">
                      <h3 className="font-heading text-2xl font-bold text-foreground mb-6">
                        {content.featuresCardTitle || `${config.productName} Features`}
                      </h3>
                      <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2">
                        {features.map((feature, index) => (
                          <div key={index} className="flex items-center gap-3 text-foreground">
                            <Check className="w-5 h-5 text-secondary flex-shrink-0" />
                            <span>{feature}</span>
                          </div>
                        ))}
                      </div>
                      {content.featureNote && (
                        <p className="text-xs text-muted-foreground italic mt-6">
                          {content.featureNote}
                        </p>
                      )}
                      <div className="mt-6">
                        <a
                          href={content.designButtonLink}
                          target={content.designButtonOpenInNewTab ? '_blank' : undefined}
                          rel={content.designButtonOpenInNewTab ? 'noopener noreferrer' : undefined}
                        >
                          <Button variant="hero" className="w-full">
                            {content.designButtonText}
                            <ArrowRight className="w-4 h-4" />
                          </Button>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* Uses Section */}
          {config.showUsesSection && uses.length > 0 && (
            <section className="section-padding bg-background">
              <div className="container-custom">
                <div className="max-w-4xl mx-auto">
                  <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground mb-6 text-center">
                    {content.usesHeading}
                  </h2>
                  <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {uses.map((use, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-3 bg-card p-4 rounded-lg border border-border/50"
                      >
                        <Check className="w-5 h-5 text-secondary flex-shrink-0" />
                        <span className="text-foreground font-medium">{use}</span>
                      </div>
                    ))}
                  </div>
                  {content.usesNote && (
                    <p className="text-center text-muted-foreground mt-8 text-sm">
                      {content.usesNote}
                    </p>
                  )}
                </div>
              </div>
            </section>
          )}

          {/* Color & Siding Options Section */}
          {config.showSidingSection && content.sidingCategories?.length > 0 && (
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
                            {getSidingColors(category.id).map((color) => (
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

          {/* Upgrades Section */}
          {config.showUpgradesSection && content.showUpgradesSection && content.upgradeCategories?.length > 0 && (
            <section className="section-padding bg-background">
              <div className="container-custom">
                <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-8">
                  {content.upgradeHeading || 'Available Upgrades'}
                </h2>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
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
          )}

          {/* Important Notes Section */}
          {content.showImportantNote && content.importantNote && (
            <section className="py-8 bg-muted/30">
              <div className="container-custom">
                <div className="max-w-3xl mx-auto text-center">
                  <p className="text-sm text-muted-foreground">{content.importantNote}</p>
                </div>
              </div>
            </section>
          )}

          {/* CTA Section */}
          <section
            className={`section-padding ${
              content.ctaVariant === 'navy'
                ? 'bg-navy'
                : content.ctaVariant === 'solid'
                ? 'bg-primary'
                : 'bg-gradient-to-r from-secondary to-primary'
            }`}
          >
            <div className="container-custom text-center">
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
                {content.ctaHeading}
              </h2>
              <p className="text-primary-foreground/90 text-lg mb-8 max-w-2xl mx-auto">
                {content.ctaDescription}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href={content.ctaPrimaryButtonLink}
                  target={content.ctaPrimaryButtonOpenInNewTab ? '_blank' : undefined}
                  rel={content.ctaPrimaryButtonOpenInNewTab ? 'noopener noreferrer' : undefined}
                >
                  <Button
                    variant="heroOutline"
                    size="xl"
                    className="bg-primary-foreground text-foreground hover:bg-primary-foreground/90"
                  >
                    {content.ctaPrimaryButton}
                    <ArrowRight className="w-5 h-5" />
                  </Button>
                </a>
                <a
                  href={content.ctaSecondaryButtonLink}
                  target={content.ctaSecondaryButtonOpenInNewTab ? '_blank' : undefined}
                  rel={content.ctaSecondaryButtonOpenInNewTab ? 'noopener noreferrer' : undefined}
                >
                  <Button variant="heroOutline" size="xl">
                    {content.ctaSecondaryButton}
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

export default ProductPageView;
