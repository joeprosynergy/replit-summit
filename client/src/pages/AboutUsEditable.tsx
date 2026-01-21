/**
 * AboutUsEditable - Admin Editing Component
 * Lazy-loaded ONLY for admins
 * Wraps AboutUsView with inline editing capabilities
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
import { EditablePageWrapper } from '@/components/admin/EditablePageWrapper';
import { InlineEditable } from '@/components/admin/InlineEditable';
import InlineEditableButton from '@/components/admin/InlineEditableButton';
import { AboutUsContent } from '@/pages/defaults/aboutUsDefaults';

const iconMap: Record<string, any> = { Heart, Star, Shield, Users, HandHeart };

interface AboutUsEditableProps {
  initialContent: AboutUsContent;
}

export default function AboutUsEditable({ initialContent }: AboutUsEditableProps) {
  return (
    <EditablePageWrapper<AboutUsContent> slug="about-us" defaultContent={initialContent}>
      {({ content, isEditMode, updateField }) => {
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
                      <InlineEditable
                        value={content.heroTagline}
                        fieldName="Hero tagline"
                        onChange={(v) => updateField('heroTagline', v)}
                        isEditMode={isEditMode}
                        className="text-secondary font-heading text-lg uppercase tracking-widest mb-4"
                        as="p"
                      />
                      <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading text-primary-foreground leading-tight mb-6">
                        <InlineEditable
                          value={content.heroHeading}
                          fieldName="Hero heading"
                          onChange={(v) => updateField('heroHeading', v)}
                          isEditMode={isEditMode}
                          as="span"
                        />{' '}
                        <InlineEditable
                          value={content.heroHeadingHighlight}
                          fieldName="Hero heading highlight"
                          onChange={(v) => updateField('heroHeadingHighlight', v)}
                          isEditMode={isEditMode}
                          className="text-secondary"
                          as="span"
                        />
                      </h1>
                      <InlineEditable
                        value={content.heroSubheading}
                        fieldName="Hero subheading"
                        onChange={(v) => updateField('heroSubheading', v)}
                        isEditMode={isEditMode}
                        className="text-lg text-primary-foreground/80 max-w-2xl"
                        as="p"
                      />
                    </div>
                  </div>
                </section>

                {/* Mission Statement */}
                <section className="section-padding bg-background">
                  <div className="container-custom">
                    <div className="max-w-4xl mx-auto text-center">
                      <InlineEditable
                        value={content.missionTagline}
                        fieldName="Mission tagline"
                        onChange={(v) => updateField('missionTagline', v)}
                        isEditMode={isEditMode}
                        className="text-secondary font-heading uppercase tracking-widest mb-4"
                        as="p"
                      />
                      <InlineEditable
                        value={content.missionHeading}
                        fieldName="Mission heading"
                        onChange={(v) => updateField('missionHeading', v)}
                        isEditMode={isEditMode}
                        className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-6"
                        as="h2"
                      />
                      <InlineEditable
                        value={content.missionDescription}
                        fieldName="Mission description"
                        onChange={(v) => updateField('missionDescription', v)}
                        isEditMode={isEditMode}
                        className="text-xl text-muted-foreground leading-relaxed"
                        as="p"
                      />
                    </div>
                  </div>
                </section>

                {/* Family Owned + Guide Section */}
                <section className="section-padding bg-muted/30">
                  <div className="container-custom">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                      <div>
                        <InlineEditable
                          value={content.familyTagline}
                          fieldName="Family tagline"
                          onChange={(v) => updateField('familyTagline', v)}
                          isEditMode={isEditMode}
                          className="text-secondary font-heading uppercase tracking-widest mb-4"
                          as="p"
                        />
                        <InlineEditable
                          value={content.familyHeading}
                          fieldName="Family heading"
                          onChange={(v) => updateField('familyHeading', v)}
                          isEditMode={isEditMode}
                          className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-6"
                          as="h2"
                        />
                        <InlineEditable
                          value={content.familyParagraph1}
                          fieldName="Family paragraph 1"
                          onChange={(v) => updateField('familyParagraph1', v)}
                          isEditMode={isEditMode}
                          className="text-muted-foreground leading-relaxed mb-6"
                          as="p"
                        />
                        <InlineEditable
                          value={content.familyParagraph2}
                          fieldName="Family paragraph 2"
                          onChange={(v) => updateField('familyParagraph2', v)}
                          isEditMode={isEditMode}
                          className="text-muted-foreground leading-relaxed"
                          as="p"
                        />
                      </div>
                      <div className="bg-gradient-to-br from-primary/10 to-secondary/10 rounded-2xl p-8 lg:p-12">
                        <div className="flex items-center gap-4 mb-6">
                          <Hammer className="w-12 h-12 text-primary" />
                          <InlineEditable
                            value={content.familyBoxTitle}
                            fieldName="Box title"
                            onChange={(v) => updateField('familyBoxTitle', v)}
                            isEditMode={isEditMode}
                            className="font-heading text-2xl font-bold text-foreground"
                            as="h3"
                          />
                        </div>
                        <InlineEditable
                          value={content.familyBoxDescription}
                          fieldName="Box description"
                          onChange={(v) => updateField('familyBoxDescription', v)}
                          isEditMode={isEditMode}
                          className="text-muted-foreground leading-relaxed"
                          as="p"
                        />
                      </div>
                    </div>
                  </div>
                </section>

                {/* Our Values */}
                <section className="section-padding bg-background">
                  <div className="container-custom">
                    <div className="text-center mb-16">
                      <InlineEditable
                        value={content.valuesTagline}
                        fieldName="Values tagline"
                        onChange={(v) => updateField('valuesTagline', v)}
                        isEditMode={isEditMode}
                        className="text-secondary font-heading uppercase tracking-widest mb-4"
                        as="p"
                      />
                      <InlineEditable
                        value={content.valuesHeading}
                        fieldName="Values heading"
                        onChange={(v) => updateField('valuesHeading', v)}
                        isEditMode={isEditMode}
                        className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4"
                        as="h2"
                      />
                      <InlineEditable
                        value={content.valuesSubheading}
                        fieldName="Values subheading"
                        onChange={(v) => updateField('valuesSubheading', v)}
                        isEditMode={isEditMode}
                        className="text-lg text-muted-foreground max-w-2xl mx-auto"
                        as="p"
                      />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                      {(content.values || []).map((value, index) => {
                        const IconComponent = iconMap[value.icon] || Heart;
                        return (
                          <div key={value.id} className="bg-card rounded-2xl p-8 shadow-lg border border-border/50 hover:border-primary/30 hover:shadow-xl transition-all duration-300">
                            <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mb-6">
                              <IconComponent className="w-7 h-7 text-primary" />
                            </div>
                            <InlineEditable
                              value={value.title}
                              fieldName={`Value ${index + 1} title`}
                              onChange={(v) => {
                                const newValues = [...content.values];
                                newValues[index] = { ...newValues[index], title: v };
                                updateField('values', newValues);
                              }}
                              isEditMode={isEditMode}
                              className="font-heading text-xl font-bold text-foreground mb-3"
                              as="h3"
                            />
                            <InlineEditable
                              value={value.description}
                              fieldName={`Value ${index + 1} description`}
                              onChange={(v) => {
                                const newValues = [...content.values];
                                newValues[index] = { ...newValues[index], description: v };
                                updateField('values', newValues);
                              }}
                              isEditMode={isEditMode}
                              className="text-muted-foreground leading-relaxed"
                              as="p"
                            />
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
                      <InlineEditable
                        value={content.craftsmenTagline}
                        fieldName="Craftsmen tagline"
                        onChange={(v) => updateField('craftsmenTagline', v)}
                        isEditMode={isEditMode}
                        className="text-secondary font-heading uppercase tracking-widest mb-4"
                        as="p"
                      />
                      <InlineEditable
                        value={content.craftsmenHeading}
                        fieldName="Craftsmen heading"
                        onChange={(v) => updateField('craftsmenHeading', v)}
                        isEditMode={isEditMode}
                        className="font-heading text-3xl md:text-4xl font-bold mb-6"
                        as="h2"
                      />
                      <InlineEditable
                        value={content.craftsmenDescription}
                        fieldName="Craftsmen description"
                        onChange={(v) => updateField('craftsmenDescription', v)}
                        isEditMode={isEditMode}
                        className="text-primary-foreground/80 leading-relaxed"
                        as="p"
                      />
                    </div>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {(content.features || []).map((feature, index) => (
                        <div key={index} className="flex items-start gap-3 bg-primary-foreground/5 rounded-lg p-4">
                          <CheckCircle className="w-5 h-5 text-secondary flex-shrink-0 mt-0.5" />
                          <InlineEditable
                            value={feature}
                            fieldName={`Feature ${index + 1}`}
                            onChange={(v) => {
                              const newFeatures = [...content.features];
                              newFeatures[index] = v;
                              updateField('features', newFeatures);
                            }}
                            isEditMode={isEditMode}
                            className="text-primary-foreground/90 text-sm leading-relaxed"
                            as="span"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </section>

                {/* Service Areas */}
                <section className="section-padding bg-background">
                  <div className="container-custom">
                    <div className="text-center mb-12">
                      <InlineEditable
                        value={content.serviceAreasTagline}
                        fieldName="Service areas tagline"
                        onChange={(v) => updateField('serviceAreasTagline', v)}
                        isEditMode={isEditMode}
                        className="text-secondary font-heading uppercase tracking-widest mb-4"
                        as="p"
                      />
                      <InlineEditable
                        value={content.serviceAreasHeading}
                        fieldName="Service areas heading"
                        onChange={(v) => updateField('serviceAreasHeading', v)}
                        isEditMode={isEditMode}
                        className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4"
                        as="h2"
                      />
                      <InlineEditable
                        value={content.serviceAreasSubheading}
                        fieldName="Service areas subheading"
                        onChange={(v) => updateField('serviceAreasSubheading', v)}
                        isEditMode={isEditMode}
                        className="text-lg text-muted-foreground max-w-2xl mx-auto"
                        as="p"
                      />
                    </div>
                    <div className="grid md:grid-cols-3 gap-8">
                      <div className="bg-card rounded-2xl p-6 border border-border/50">
                        <h3 className="font-heading text-xl font-bold text-foreground mb-4 flex items-center gap-2">
                          <span className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-sm font-bold text-primary">MO</span>
                          Missouri
                        </h3>
                        <InlineEditable
                          value={content.missouriAreas}
                          fieldName="Missouri areas"
                          onChange={(v) => updateField('missouriAreas', v)}
                          isEditMode={isEditMode}
                          className="text-muted-foreground text-sm leading-relaxed"
                          as="p"
                        />
                      </div>
                      <div className="bg-card rounded-2xl p-6 border border-border/50">
                        <h3 className="font-heading text-xl font-bold text-foreground mb-4 flex items-center gap-2">
                          <span className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-sm font-bold text-primary">IL</span>
                          Illinois
                        </h3>
                        <InlineEditable
                          value={content.illinoisAreas}
                          fieldName="Illinois areas"
                          onChange={(v) => updateField('illinoisAreas', v)}
                          isEditMode={isEditMode}
                          className="text-muted-foreground text-sm leading-relaxed"
                          as="p"
                        />
                      </div>
                      <div className="bg-card rounded-2xl p-6 border border-border/50">
                        <h3 className="font-heading text-xl font-bold text-foreground mb-4 flex items-center gap-2">
                          <span className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-sm font-bold text-primary">KY</span>
                          Kentucky
                        </h3>
                        <InlineEditable
                          value={content.kentuckyAreas}
                          fieldName="Kentucky areas"
                          onChange={(v) => updateField('kentuckyAreas', v)}
                          isEditMode={isEditMode}
                          className="text-muted-foreground text-sm leading-relaxed"
                          as="p"
                        />
                      </div>
                    </div>
                  </div>
                </section>

                {/* CTA */}
                <section className="section-padding bg-gradient-to-r from-secondary to-primary">
                  <div className="container-custom text-center">
                    <InlineEditable
                      value={content.ctaHeading}
                      fieldName="CTA heading"
                      onChange={(v) => updateField('ctaHeading', v)}
                      isEditMode={isEditMode}
                      className="font-heading text-3xl md:text-4xl font-bold text-primary-foreground mb-4"
                      as="h2"
                    />
                    <InlineEditable
                      value={content.ctaDescription}
                      fieldName="CTA description"
                      onChange={(v) => updateField('ctaDescription', v)}
                      isEditMode={isEditMode}
                      className="text-primary-foreground/90 text-lg mb-8 max-w-2xl mx-auto"
                      as="p"
                    />
                    {isEditMode ? (
                      <InlineEditableButton
                        text={content.ctaButtonText}
                        href={content.ctaButtonLink}
                        onTextChange={(v) => updateField('ctaButtonText', v)}
                        onHrefChange={(v) => updateField('ctaButtonLink', v)}
                        isEditMode={isEditMode}
                        isExternal={content.ctaButtonOpenInNewTab}
                        onExternalChange={(v) => updateField('ctaButtonOpenInNewTab', v)}
                      >
                        <Button variant="heroOutline" size="xl" className="bg-primary-foreground text-foreground hover:bg-primary-foreground/90">
                          {content.ctaButtonText}
                          <ArrowRight className="w-5 h-5" />
                        </Button>
                      </InlineEditableButton>
                    ) : (
                      <Link to={content.ctaButtonLink} target={content.ctaButtonOpenInNewTab ? '_blank' : undefined} rel={content.ctaButtonOpenInNewTab ? 'noopener noreferrer' : undefined}>
                        <Button variant="heroOutline" size="xl" className="bg-primary-foreground text-foreground hover:bg-primary-foreground/90">
                          {content.ctaButtonText}
                          <ArrowRight className="w-5 h-5" />
                        </Button>
                      </Link>
                    )}
                  </div>
                </section>
              </main>

              <Footer />
            </div>
          </>
        );
      }}
    </EditablePageWrapper>
  );
}
