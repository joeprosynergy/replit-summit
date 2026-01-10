import { Button } from '@/components/ui/button';
import { ArrowRight, Phone, AlertTriangle } from 'lucide-react';
import { InlineEditable } from '@/components/admin/InlineEditable';

interface CTABannerContent {
  badge: string;
  heading: string;
  description1: string;
  description2: string;
  closingText: string;
  ctaButton: string;
  phoneNumber: string;
}

interface CTABannerProps {
  content?: CTABannerContent;
  isEditMode?: boolean;
  onUpdateField?: <K extends keyof CTABannerContent>(field: K, value: string) => void;
}

const defaultContent: CTABannerContent = {
  badge: "Don't Wait",
  heading: "Don't Let Clutter Take Over Your Property",
  description1: "Every month you wait, the problem gets worse. Equipment rusts in the rain. The garage gets more packed. The stress builds.",
  description2: "That cheap shed from the box store? It'll be falling apart in 5 years while you wish you'd invested in quality.",
  closingText: "You've worked too hard to settle for less than you deserve.",
  ctaButton: "Design Your Shed",
  phoneNumber: "573-747-4700",
};

const CTABanner = ({ content = defaultContent, isEditMode = false, onUpdateField }: CTABannerProps) => {
  return (
    <section className="section-padding bg-gradient-to-r from-secondary to-primary">
      <div className="container-custom">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-primary-foreground/10 text-primary-foreground px-4 py-2 rounded-full mb-6">
            <AlertTriangle className="w-4 h-4" />
            <InlineEditable
              value={content.badge}
              fieldName="badge"
              onChange={(v) => onUpdateField?.('badge', v)}
              isEditMode={isEditMode}
              className="text-sm font-medium"
              as="span"
            />
          </div>
          
          <InlineEditable
            value={content.heading}
            fieldName="heading"
            onChange={(v) => onUpdateField?.('heading', v)}
            isEditMode={isEditMode}
            className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-primary-foreground mb-6"
            as="h2"
          />
          
          <InlineEditable
            value={content.description1}
            fieldName="description 1"
            type="textarea"
            onChange={(v) => onUpdateField?.('description1', v)}
            isEditMode={isEditMode}
            className="text-primary-foreground/90 text-lg md:text-xl mb-4 max-w-3xl mx-auto"
            as="p"
          />
          
          <InlineEditable
            value={content.description2}
            fieldName="description 2"
            onChange={(v) => onUpdateField?.('description2', v)}
            isEditMode={isEditMode}
            className="text-primary-foreground/80 mb-4 max-w-2xl mx-auto"
            as="p"
          />
          
          <InlineEditable
            value={content.closingText}
            fieldName="closing text"
            onChange={(v) => onUpdateField?.('closingText', v)}
            isEditMode={isEditMode}
            className="text-primary-foreground font-semibold text-xl mb-8"
            as="p"
          />
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="https://summitbuildings.shedpro.co/" target="_blank" rel="noopener noreferrer">
              <Button variant="heroOutline" size="xl" className="bg-primary-foreground text-foreground hover:bg-primary-foreground/90">
                <InlineEditable
                  value={content.ctaButton}
                  fieldName="CTA button"
                  onChange={(v) => onUpdateField?.('ctaButton', v)}
                  isEditMode={isEditMode}
                  as="span"
                />
                <ArrowRight className="w-5 h-5" />
              </Button>
            </a>
            <a href={`tel:${content.phoneNumber.replace(/-/g, '')}`}>
              <Button variant="heroOutline" size="xl">
                <Phone className="w-5 h-5" />
                Call {content.phoneNumber}
              </Button>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTABanner;
