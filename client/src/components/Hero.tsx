import { Button } from '@/components/ui/button';
import { ArrowRight, Truck, CreditCard, Shield } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { cloudinaryImages, getMobileHeroImage, IMAGES } from '@/lib/cloudinary';
import { InlineEditable } from '@/components/admin/InlineEditable';
import { PageContent } from '@/hooks/useEditablePageContent';

const badges = [
  { icon: Truck, label: 'Free Delivery (50mi)' },
  { icon: CreditCard, label: 'No Credit Check Financing' },
  { icon: Shield, label: '5-Year Warranty' },
];

interface HeroProps {
  content?: PageContent;
  isEditMode?: boolean;
  onUpdateField?: (field: keyof PageContent, value: string) => void;
}

const Hero = ({ content, isEditMode = false, onUpdateField }: HeroProps) => {
  const location = useLocation();
  
  // Default values if no content passed
  const heading = content?.heading ?? "Get the Storage Space You Need Without the Hassle";
  const tagline = content?.tagline ?? "Summit Portable Buildings";
  const subheading = content?.subheading ?? "Custom storage buildings designed for your property, built by craftsmen, delivered to your door.";
  const ctaHeading = content?.ctaHeading ?? "Stop living with clutter";
  const ctaDescription = content?.ctaDescription ?? "Design your perfect shed online in minutes and we'll handle the rest.";
  const ctaButton = content?.ctaButton ?? "Design Your Shed Now";

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background Image using picture element for responsive loading */}
      <picture className="absolute inset-0">
        <source
          media="(max-width: 768px)"
          srcSet={getMobileHeroImage(IMAGES.heroShed)}
        />
        <img
          src={cloudinaryImages.heroShed}
          alt="Summit Portable Buildings quality storage shed"
          loading="eager"
          decoding="async"
          width={1600}
          height={900}
          className="w-full h-full object-cover"
        />
      </picture>
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/80 to-black/60" />

      {/* Content */}
      <div className="relative z-10 container-custom py-32 lg:py-40">
        <div className="max-w-3xl">
          <InlineEditable
            value={tagline}
            fieldName="tagline"
            onChange={(v) => onUpdateField?.('tagline', v)}
            isEditMode={isEditMode}
            className="text-secondary font-heading text-lg md:text-xl uppercase tracking-widest mb-4 animate-fade-in-up"
            as="p"
          />
          <div className="mb-6 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
            <InlineEditable
              value={heading}
              fieldName="heading"
              onChange={(v) => onUpdateField?.('heading', v)}
              isEditMode={isEditMode}
              className="text-4xl md:text-5xl lg:text-6xl font-heading text-primary-foreground leading-tight"
              as="h1"
            />
          </div>
          <div className="mb-4 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            <InlineEditable
              value={subheading}
              fieldName="subheading"
              type="textarea"
              onChange={(v) => onUpdateField?.('subheading', v)}
              isEditMode={isEditMode}
              className="text-lg md:text-xl text-primary-foreground/80 max-w-2xl"
              as="p"
            />
          </div>
          <div className="mb-8 animate-fade-in-up" style={{ animationDelay: '0.25s' }}>
            <InlineEditable
              value={ctaDescription}
              fieldName="CTA description"
              onChange={(v) => onUpdateField?.('ctaDescription', v)}
              isEditMode={isEditMode}
              className="text-primary-foreground/70 max-w-2xl"
              as="p"
            />
          </div>
          <div className="flex flex-col sm:flex-row gap-4 mb-8 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
            <Link to="/3d-configurator" state={{ from: location.pathname }}>
              <Button variant="hero" size="xl">
                <InlineEditable
                  value={ctaButton}
                  fieldName="CTA button"
                  onChange={(v) => onUpdateField?.('ctaButton', v)}
                  isEditMode={isEditMode}
                  as="span"
                />
                <ArrowRight className="w-5 h-5" />
              </Button>
            </Link>
            <Link to="/buyers-guide">
              <Button variant="heroOutline" size="xl">
                Get Free Buying Guide
              </Button>
            </Link>
          </div>

          <p className="text-primary-foreground/60 text-sm mb-6 animate-fade-in-up" style={{ animationDelay: '0.35s' }}>
            Serving Missouri, Illinois, Kentucky & Arkansas since 2016
          </p>

          {/* Badges */}
          <div className="flex flex-wrap gap-6 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
            {badges.map((badge) => (
              <div
                key={badge.label}
                className="flex items-center gap-2 text-primary-foreground/90"
              >
                <div className="w-8 h-8 rounded-full bg-secondary/20 flex items-center justify-center">
                  <badge.icon className="w-4 h-4 text-secondary" />
                </div>
                <span className="text-sm font-medium">{badge.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-primary-foreground/40 rounded-full flex justify-center pt-2">
          <div className="w-1 h-2 bg-secondary rounded-full" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
