/**
 * AboutUsView - Pure Presentation Component
 * NO admin code - lightweight for public users
 */

import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { 
  Heart, 
  Star, 
  Shield, 
  Users, 
  HandHeart,
  Hammer,
  CheckCircle,
  ArrowRight
} from 'lucide-react';
import { AboutUsContent } from '@/pages/defaults/aboutUsDefaults';

const iconMap: Record<string, any> = { Heart, Star, Shield, Users, HandHeart };

interface AboutUsViewProps {
  content: AboutUsContent;
}

export function AboutUsView({ content }: AboutUsViewProps) {
  return (
    <>
      <Helmet>
        <title>{content.metaTitle}</title>
        <meta name="description" content={content.metaDescription} />
        <meta property="og:title" content={content.metaTitle} />
        <meta property="og:description" content={content.metaDescription} />
        <link rel="canonical" href="https://summitbuildings.com/about-us" />
      </Helmet>

      <div className="min-h-screen">
        <Header />

        <main>
          {/* Hero Section */}
          <section className="pt-32 pb-20 bg-gradient-to-br from-navy via-navy-dark to-navy">
            <div className="container-custom">
              <div className="max-w-3xl">
                <p className="text-secondary font-heading text-lg uppercase tracking-widest mb-4">{content.heroTagline}</p>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading text-primary-foreground leading-tight mb-6">
                  {content.heroHeading} <span className="text-secondary">{content.heroHeadingHighlight}</span>
                </h1>
                <p className="text-lg text-primary-foreground/80 max-w-2xl">{content.heroSubheading}</p>
              </div>
            </div>
          </section>

          {/* Mission Statement */}
          <section className="section-padding bg-background">
            <div className="container-custom">
              <div className="max-w-4xl mx-auto text-center">
                <p className="text-secondary font-heading uppercase tracking-widest mb-4">{content.missionTagline}</p>
                <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-6">{content.missionHeading}</h2>
                <p className="text-xl text-muted-foreground leading-relaxed">{content.missionDescription}</p>
              </div>
            </div>
          </section>

          {/* Family Owned + Guide Section */}
          <section className="section-padding bg-muted/30">
            <div className="container-custom">
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div>
                  <p className="text-secondary font-heading uppercase tracking-widest mb-4">{content.familyTagline}</p>
                  <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-6">{content.familyHeading}</h2>
                  <p className="text-muted-foreground leading-relaxed mb-6">{content.familyParagraph1}</p>
                  <p className="text-muted-foreground leading-relaxed">{content.familyParagraph2}</p>
                </div>
                <div className="bg-gradient-to-br from-primary/10 to-secondary/10 rounded-2xl p-8 lg:p-12">
                  <div className="flex items-center gap-4 mb-6">
                    <Hammer className="w-12 h-12 text-primary" />
                    <h3 className="font-heading text-2xl font-bold text-foreground">{content.familyBoxTitle}</h3>
                  </div>
                  <p className="text-muted-foreground leading-relaxed">{content.familyBoxDescription}</p>
                </div>
              </div>
            </div>
          </section>

          {/* Our Values */}
          <section className="section-padding bg-background">
            <div className="container-custom">
              <div className="text-center mb-16">
                <p className="text-secondary font-heading uppercase tracking-widest mb-4">{content.valuesTagline}</p>
                <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">{content.valuesHeading}</h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">{content.valuesSubheading}</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {(content.values || []).map((value) => {
                  const IconComponent = iconMap[value.icon] || Heart;
                  return (
                    <div key={value.id} className="bg-card rounded-2xl p-8 shadow-lg border border-border/50 hover:border-primary/30 hover:shadow-xl transition-all duration-300">
                      <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mb-6">
                        <IconComponent className="w-7 h-7 text-primary" />
                      </div>
                      <h3 className="font-heading text-xl font-bold text-foreground mb-3">{value.title}</h3>
                      <p className="text-muted-foreground leading-relaxed">{value.description}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>

          {/* Craftsmen & Features */}
          <section className="section-padding bg-navy text-primary-foreground">
            <div className="container-custom">
              <div className="max-w-3xl mx-auto text-center mb-12">
                <p className="text-secondary font-heading uppercase tracking-widest mb-4">{content.craftsmenTagline}</p>
                <h2 className="font-heading text-3xl md:text-4xl font-bold mb-6">{content.craftsmenHeading}</h2>
                <p className="text-primary-foreground/80 leading-relaxed">{content.craftsmenDescription}</p>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {(content.features || []).map((feature, index) => (
                  <div key={index} className="flex items-start gap-3 bg-primary-foreground/5 rounded-lg p-4">
                    <CheckCircle className="w-5 h-5 text-secondary flex-shrink-0 mt-0.5" />
                    <span className="text-primary-foreground/90 text-sm leading-relaxed">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Service Areas */}
          <section className="section-padding bg-background">
            <div className="container-custom">
              <div className="text-center mb-12">
                <p className="text-secondary font-heading uppercase tracking-widest mb-4">{content.serviceAreasTagline}</p>
                <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4">{content.serviceAreasHeading}</h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">{content.serviceAreasSubheading}</p>
              </div>
              <div className="grid md:grid-cols-3 gap-8">
                <div className="bg-card rounded-2xl p-6 border border-border/50">
                  <h3 className="font-heading text-xl font-bold text-foreground mb-4 flex items-center gap-2">
                    <span className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-sm font-bold text-primary">MO</span>
                    Missouri
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{content.missouriAreas}</p>
                </div>
                <div className="bg-card rounded-2xl p-6 border border-border/50">
                  <h3 className="font-heading text-xl font-bold text-foreground mb-4 flex items-center gap-2">
                    <span className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-sm font-bold text-primary">IL</span>
                    Illinois
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{content.illinoisAreas}</p>
                </div>
                <div className="bg-card rounded-2xl p-6 border border-border/50">
                  <h3 className="font-heading text-xl font-bold text-foreground mb-4 flex items-center gap-2">
                    <span className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-sm font-bold text-primary">KY</span>
                    Kentucky
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{content.kentuckyAreas}</p>
                </div>
              </div>
            </div>
          </section>

          {/* CTA */}
          <section className="section-padding bg-gradient-to-r from-secondary to-primary">
            <div className="container-custom text-center">
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-primary-foreground mb-4">{content.ctaHeading}</h2>
              <p className="text-primary-foreground/90 text-lg mb-8 max-w-2xl mx-auto">{content.ctaDescription}</p>
              <Link to={content.ctaButtonLink} target={content.ctaButtonOpenInNewTab ? '_blank' : undefined} rel={content.ctaButtonOpenInNewTab ? 'noopener noreferrer' : undefined}>
                <Button variant="heroOutline" size="xl" className="bg-primary-foreground text-foreground hover:bg-primary-foreground/90">
                  {content.ctaButtonText}
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </Link>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
}
