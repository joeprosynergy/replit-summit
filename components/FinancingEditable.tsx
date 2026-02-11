"use client";

/**
 * FinancingEditable - Admin Editing Component
 * Lazy-loaded ONLY for admins
 * Wraps Financing with inline editing capabilities
 */

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle2, Calendar, DollarSign, Home, FileText, CreditCard, Key, Truck, ShieldCheck, Percent, Building } from "lucide-react";
import { EditablePageWrapper } from "@/components/admin/EditablePageWrapper";
import { InlineEditable } from "@/components/admin/InlineEditable";
import InlineEditableButton from "@/components/admin/InlineEditableButton";
import { financingDefaults, type FinancingContent } from "@/data/defaults/financingDefaults";

interface FinancingEditableProps {
  initialContent: FinancingContent;
}

export default function FinancingEditable({ initialContent }: FinancingEditableProps) {
  const stepIcons = [Home, FileText, CreditCard, Key];

  return (
    <EditablePageWrapper<FinancingContent> slug="financing" defaultContent={initialContent}>
      {({ content, isEditMode, updateField }) => {
        // Defensive fallbacks for nested content sections
        const hero = content.hero || financingDefaults.hero;
        const howItWorks = content.howItWorks || financingDefaults.howItWorks;
        const rentToOwn = content.rentToOwn || financingDefaults.rentToOwn;
        const financing = content.financing || financingDefaults.financing;
        const financingCards = content.financingCards || financingDefaults.financingCards;
        const cta = content.cta || financingDefaults.cta;

        // Helper to update nested fields
        const updateNestedField = (section: string, field: string, value: any) => {
          const currentSection = (content as any)[section] || (financingDefaults as any)[section];
          const newSection = { ...currentSection, [field]: value };
          updateField(section as keyof FinancingContent, newSection as any);
        };

        const updateStep = (index: number, field: string, value: string) => {
          const steps = [...howItWorks.steps];
          steps[index] = { ...steps[index], [field]: value };
          updateNestedField('howItWorks', 'steps', steps);
        };

        const updateBenefit = (section: 'rentToOwn' | 'financing', index: number, value: string) => {
          const sectionData = section === 'rentToOwn' ? rentToOwn : financing;
          const benefits = [...sectionData.benefits];
          benefits[index] = value;
          updateNestedField(section, 'benefits', benefits);
        };

        return (
          <>
            <main className="pt-20">
              {/* Hero Section */}
              <section className="bg-primary py-16 md:py-24 relative overflow-hidden">
                <div className="absolute inset-0 opacity-10">
                  <div className="absolute inset-0 bg-gradient-to-br from-secondary/30 to-transparent" />
                </div>
                <div className="container-custom relative z-10">
                  <div className="max-w-4xl mx-auto text-center">
                    <span className="inline-block bg-secondary text-secondary-foreground px-4 py-2 rounded-full text-sm font-semibold mb-6">
                      <InlineEditable value={hero.badge} fieldName="Hero badge" onChange={(v) => updateNestedField('hero', 'badge', v)} isEditMode={isEditMode} as="span" />
                    </span>
                    <InlineEditable value={hero.heading} fieldName="Hero heading" onChange={(v) => updateNestedField('hero', 'heading', v)} isEditMode={isEditMode} className="font-heading text-3xl md:text-5xl lg:text-6xl text-primary-foreground mb-6" as="h1" />
                    <InlineEditable value={hero.description} fieldName="Hero description" onChange={(v) => updateNestedField('hero', 'description', v)} isEditMode={isEditMode} className="text-primary-foreground/90 text-xl md:text-2xl mb-4" as="p" />
                    <InlineEditable value={hero.highlight} fieldName="Hero highlight" onChange={(v) => updateNestedField('hero', 'highlight', v)} isEditMode={isEditMode} className="text-secondary text-lg font-semibold mb-8" as="p" />
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                      <InlineEditableButton
                        text={hero.button1Text}
                        href={hero.button1Link}
                        onTextChange={(v) => updateNestedField('hero', 'button1Text', v)}
                        onHrefChange={(v) => updateNestedField('hero', 'button1Link', v)}
                        isEditMode={isEditMode}
                        isExternal={hero.button1OpenInNewTab}
                        onExternalChange={(v) => updateNestedField('hero', 'button1OpenInNewTab', v)}
                      >
                        <Button size="lg" className="bg-secondary text-secondary-foreground hover:bg-secondary/90 text-lg px-8 py-6">{hero.button1Text}</Button>
                      </InlineEditableButton>
                      <InlineEditableButton
                        text={hero.button2Text}
                        href={hero.button2Link}
                        onTextChange={(v) => updateNestedField('hero', 'button2Text', v)}
                        onHrefChange={(v) => updateNestedField('hero', 'button2Link', v)}
                        isEditMode={isEditMode}
                        isExternal={hero.button2OpenInNewTab}
                        onExternalChange={(v) => updateNestedField('hero', 'button2OpenInNewTab', v)}
                      >
                        <Button size="lg" variant="outline" className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground/10 text-lg px-8 py-6">{hero.button2Text}</Button>
                      </InlineEditableButton>
                    </div>
                  </div>
                </div>
              </section>

              {/* How It Works Section */}
              <section className="py-16 bg-background">
                <div className="container-custom">
                  <InlineEditable value={howItWorks.heading} fieldName="How it works heading" onChange={(v) => updateNestedField('howItWorks', 'heading', v)} isEditMode={isEditMode} className="font-heading text-3xl md:text-4xl text-center mb-12" as="h2" />
                  <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
                    {howItWorks.steps.map((item, index) => {
                      const IconComponent = stepIcons[index] || Home;
                      return (
                        <div key={item.id} className="text-center relative">
                          {index < howItWorks.steps.length - 1 && (
                            <div className="hidden lg:block absolute top-10 left-[60%] w-[80%] h-0.5 bg-border" />
                          )}
                          <div className="relative z-10">
                            <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                              <IconComponent className="w-10 h-10 text-primary-foreground" />
                            </div>
                            <span className="inline-block bg-secondary text-secondary-foreground text-sm font-bold px-3 py-1 rounded-full mb-3">
                              Step {item.step}
                            </span>
                            <InlineEditable value={item.title} fieldName={`Step ${index + 1} title`} onChange={(v) => updateStep(index, 'title', v)} isEditMode={isEditMode} className="font-heading text-xl text-foreground mb-2" as="h3" />
                            <InlineEditable value={item.description} fieldName={`Step ${index + 1} description`} onChange={(v) => updateStep(index, 'description', v)} isEditMode={isEditMode} className="text-muted-foreground" as="p" />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </section>

              {/* Rent to Own Section */}
              <section id="rent-to-own" className="py-16 bg-muted scroll-mt-24">
                <div className="container-custom">
                  <div className="max-w-5xl mx-auto">
                    <div className="text-center mb-12">
                      <span className="inline-block bg-secondary text-secondary-foreground px-4 py-2 rounded-full text-sm font-semibold mb-4">
                        <InlineEditable value={rentToOwn.badge} fieldName="RTO badge" onChange={(v) => updateNestedField('rentToOwn', 'badge', v)} isEditMode={isEditMode} as="span" />
                      </span>
                      <InlineEditable value={rentToOwn.heading} fieldName="RTO heading" onChange={(v) => updateNestedField('rentToOwn', 'heading', v)} isEditMode={isEditMode} className="font-heading text-3xl md:text-4xl text-foreground mb-4" as="h2" />
                      <InlineEditable value={rentToOwn.description} fieldName="RTO description" onChange={(v) => updateNestedField('rentToOwn', 'description', v)} isEditMode={isEditMode} className="text-lg text-muted-foreground max-w-3xl mx-auto" as="p" />
                    </div>

                    <div className="grid md:grid-cols-2 gap-8 mb-12">
                      <Card className="border-2 border-secondary">
                        <CardContent className="pt-6">
                          <div className="flex items-center gap-3 mb-4">
                            <div className="w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center">
                              <Percent className="w-6 h-6 text-secondary" />
                            </div>
                            <InlineEditable value={rentToOwn.card1Title} fieldName="RTO card 1 title" onChange={(v) => updateNestedField('rentToOwn', 'card1Title', v)} isEditMode={isEditMode} className="font-heading text-xl text-foreground" as="h3" />
                          </div>
                          <InlineEditable value={rentToOwn.card1Description} fieldName="RTO card 1 desc" onChange={(v) => updateNestedField('rentToOwn', 'card1Description', v)} isEditMode={isEditMode} className="text-muted-foreground" as="p" />
                        </CardContent>
                      </Card>

                      <Card className="border-2 border-secondary">
                        <CardContent className="pt-6">
                          <div className="flex items-center gap-3 mb-4">
                            <div className="w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center">
                              <ShieldCheck className="w-6 h-6 text-secondary" />
                            </div>
                            <InlineEditable value={rentToOwn.card2Title} fieldName="RTO card 2 title" onChange={(v) => updateNestedField('rentToOwn', 'card2Title', v)} isEditMode={isEditMode} className="font-heading text-xl text-foreground" as="h3" />
                          </div>
                          <InlineEditable value={rentToOwn.card2Description} fieldName="RTO card 2 desc" onChange={(v) => updateNestedField('rentToOwn', 'card2Description', v)} isEditMode={isEditMode} className="text-muted-foreground" as="p" />
                        </CardContent>
                      </Card>

                      <Card className="border-2 border-secondary">
                        <CardContent className="pt-6">
                          <div className="flex items-center gap-3 mb-4">
                            <div className="w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center">
                              <Truck className="w-6 h-6 text-secondary" />
                            </div>
                            <InlineEditable value={rentToOwn.card3Title} fieldName="RTO card 3 title" onChange={(v) => updateNestedField('rentToOwn', 'card3Title', v)} isEditMode={isEditMode} className="font-heading text-xl text-foreground" as="h3" />
                          </div>
                          <InlineEditable value={rentToOwn.card3Description} fieldName="RTO card 3 desc" onChange={(v) => updateNestedField('rentToOwn', 'card3Description', v)} isEditMode={isEditMode} className="text-muted-foreground" as="p" />
                        </CardContent>
                      </Card>

                      <Card className="border-2 border-secondary">
                        <CardContent className="pt-6">
                          <div className="flex items-center gap-3 mb-4">
                            <div className="w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center">
                              <Building className="w-6 h-6 text-secondary" />
                            </div>
                            <InlineEditable value={rentToOwn.card4Title} fieldName="RTO card 4 title" onChange={(v) => updateNestedField('rentToOwn', 'card4Title', v)} isEditMode={isEditMode} className="font-heading text-xl text-foreground" as="h3" />
                          </div>
                          <InlineEditable value={rentToOwn.card4Description} fieldName="RTO card 4 desc" onChange={(v) => updateNestedField('rentToOwn', 'card4Description', v)} isEditMode={isEditMode} className="text-muted-foreground" as="p" />
                        </CardContent>
                      </Card>
                    </div>

                    {/* Down Payment Info */}
                    <div className="bg-card rounded-xl p-8 border border-border mb-12">
                      <InlineEditable value={rentToOwn.downPaymentHeading} fieldName="Down payment heading" onChange={(v) => updateNestedField('rentToOwn', 'downPaymentHeading', v)} isEditMode={isEditMode} className="font-heading text-2xl text-foreground mb-6 text-center" as="h3" />
                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="bg-muted rounded-lg p-6">
                          <InlineEditable value={rentToOwn.term24_36Title} fieldName="Term 24-36 title" onChange={(v) => updateNestedField('rentToOwn', 'term24_36Title', v)} isEditMode={isEditMode} className="font-heading text-lg text-secondary mb-2" as="h3" />
                          <InlineEditable value={rentToOwn.term24_36Description} fieldName="Term 24-36 desc" onChange={(v) => updateNestedField('rentToOwn', 'term24_36Description', v)} isEditMode={isEditMode} className="text-foreground" as="p" />
                          <InlineEditable value={rentToOwn.term24_36Note} fieldName="Term 24-36 note" onChange={(v) => updateNestedField('rentToOwn', 'term24_36Note', v)} isEditMode={isEditMode} className="text-sm text-muted-foreground mt-1" as="p" />
                        </div>
                        <div className="bg-muted rounded-lg p-6">
                          <InlineEditable value={rentToOwn.term48_60Title} fieldName="Term 48-60 title" onChange={(v) => updateNestedField('rentToOwn', 'term48_60Title', v)} isEditMode={isEditMode} className="font-heading text-lg text-secondary mb-2" as="h3" />
                          <InlineEditable value={rentToOwn.term48_60Description} fieldName="Term 48-60 desc" onChange={(v) => updateNestedField('rentToOwn', 'term48_60Description', v)} isEditMode={isEditMode} className="text-foreground" as="p" />
                          <InlineEditable value={rentToOwn.term48_60Note} fieldName="Term 48-60 note" onChange={(v) => updateNestedField('rentToOwn', 'term48_60Note', v)} isEditMode={isEditMode} className="text-sm text-muted-foreground mt-1" as="p" />
                        </div>
                      </div>
                      <InlineEditable value={rentToOwn.customNote} fieldName="Custom note" onChange={(v) => updateNestedField('rentToOwn', 'customNote', v)} isEditMode={isEditMode} className="text-center text-muted-foreground mt-6 text-sm" as="p" />
                    </div>

                    {/* All Benefits */}
                    <InlineEditable value={rentToOwn.benefitsHeading} fieldName="Benefits heading" onChange={(v) => updateNestedField('rentToOwn', 'benefitsHeading', v)} isEditMode={isEditMode} className="font-heading text-2xl text-foreground mb-6 text-center" as="h3" />
                    <div className="grid sm:grid-cols-2 gap-4 mb-8">
                      {(rentToOwn.benefits || []).map((benefit, index) => (
                        <div key={index} className="flex items-start gap-3 bg-card rounded-lg p-4 border border-border">
                          <CheckCircle2 className="w-5 h-5 text-secondary flex-shrink-0 mt-0.5" />
                          <InlineEditable value={benefit} fieldName={`RTO benefit ${index + 1}`} onChange={(v) => updateBenefit('rentToOwn', index, v)} isEditMode={isEditMode} className="text-foreground" as="span" />
                        </div>
                      ))}
                    </div>

                    <div className="text-center">
                      <InlineEditableButton
                        text={rentToOwn.buttonText}
                        href={rentToOwn.buttonLink}
                        onTextChange={(v) => updateNestedField('rentToOwn', 'buttonText', v)}
                        onHrefChange={(v) => updateNestedField('rentToOwn', 'buttonLink', v)}
                        isEditMode={isEditMode}
                        isExternal={rentToOwn.buttonOpenInNewTab}
                        onExternalChange={(v) => updateNestedField('rentToOwn', 'buttonOpenInNewTab', v)}
                      >
                        <Button size="lg" className="bg-secondary text-secondary-foreground hover:bg-secondary/90 text-lg px-8 py-6">{rentToOwn.buttonText}</Button>
                      </InlineEditableButton>
                    </div>
                  </div>
                </div>
              </section>

              {/* Financing Section */}
              <section id="financing" className="py-16 bg-primary scroll-mt-24">
                <div className="container-custom">
                  <div className="max-w-5xl mx-auto">
                    <div className="text-center mb-12">
                      <span className="inline-block bg-secondary text-secondary-foreground px-4 py-2 rounded-full text-sm font-semibold mb-4">
                        <InlineEditable value={financing.badge} fieldName="Financing badge" onChange={(v) => updateNestedField('financing', 'badge', v)} isEditMode={isEditMode} as="span" />
                      </span>
                      <InlineEditable value={financing.heading} fieldName="Financing heading" onChange={(v) => updateNestedField('financing', 'heading', v)} isEditMode={isEditMode} className="font-heading text-3xl md:text-4xl text-primary-foreground mb-4" as="h2" />
                      <InlineEditable value={financing.description} fieldName="Financing description" onChange={(v) => updateNestedField('financing', 'description', v)} isEditMode={isEditMode} className="text-lg text-primary-foreground/80 max-w-3xl mx-auto" as="p" />
                    </div>

                    <div className="grid md:grid-cols-3 gap-6 mb-12">
                      <Card className="bg-primary-foreground/10 border-primary-foreground/20">
                        <CardContent className="pt-6 text-center">
                          <div className="w-16 h-16 bg-secondary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Percent className="w-8 h-8 text-secondary" />
                          </div>
                          <InlineEditable value={financingCards.card1Title} fieldName="Fin card 1 title" onChange={(v) => updateNestedField('financingCards', 'card1Title', v)} isEditMode={isEditMode} className="font-heading text-lg text-primary-foreground mb-2" as="h3" />
                          <InlineEditable value={financingCards.card1Value} fieldName="Fin card 1 value" onChange={(v) => updateNestedField('financingCards', 'card1Value', v)} isEditMode={isEditMode} className="text-3xl font-bold text-secondary" as="p" />
                          <InlineEditable value={financingCards.card1Subtitle} fieldName="Fin card 1 subtitle" onChange={(v) => updateNestedField('financingCards', 'card1Subtitle', v)} isEditMode={isEditMode} className="text-primary-foreground/70 text-sm mt-1" as="p" />
                        </CardContent>
                      </Card>

                      <Card className="bg-primary-foreground/10 border-primary-foreground/20">
                        <CardContent className="pt-6 text-center">
                          <div className="w-16 h-16 bg-secondary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                            <DollarSign className="w-8 h-8 text-secondary" />
                          </div>
                          <InlineEditable value={financingCards.card2Title} fieldName="Fin card 2 title" onChange={(v) => updateNestedField('financingCards', 'card2Title', v)} isEditMode={isEditMode} className="font-heading text-lg text-primary-foreground mb-2" as="h3" />
                          <InlineEditable value={financingCards.card2Value} fieldName="Fin card 2 value" onChange={(v) => updateNestedField('financingCards', 'card2Value', v)} isEditMode={isEditMode} className="text-3xl font-bold text-secondary" as="p" />
                          <InlineEditable value={financingCards.card2Subtitle} fieldName="Fin card 2 subtitle" onChange={(v) => updateNestedField('financingCards', 'card2Subtitle', v)} isEditMode={isEditMode} className="text-primary-foreground/70 text-sm mt-1" as="p" />
                        </CardContent>
                      </Card>

                      <Card className="bg-primary-foreground/10 border-primary-foreground/20">
                        <CardContent className="pt-6 text-center">
                          <div className="w-16 h-16 bg-secondary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Calendar className="w-8 h-8 text-secondary" />
                          </div>
                          <InlineEditable value={financingCards.card3Title} fieldName="Fin card 3 title" onChange={(v) => updateNestedField('financingCards', 'card3Title', v)} isEditMode={isEditMode} className="font-heading text-lg text-primary-foreground mb-2" as="h3" />
                          <InlineEditable value={financingCards.card3Value} fieldName="Fin card 3 value" onChange={(v) => updateNestedField('financingCards', 'card3Value', v)} isEditMode={isEditMode} className="text-3xl font-bold text-secondary" as="p" />
                          <InlineEditable value={financingCards.card3Subtitle} fieldName="Fin card 3 subtitle" onChange={(v) => updateNestedField('financingCards', 'card3Subtitle', v)} isEditMode={isEditMode} className="text-primary-foreground/70 text-sm mt-1" as="p" />
                        </CardContent>
                      </Card>
                    </div>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
                      {(financing.benefits || []).map((benefit, index) => (
                        <div key={index} className="flex items-start gap-3 bg-primary-foreground/10 rounded-lg p-4">
                          <CheckCircle2 className="w-5 h-5 text-secondary flex-shrink-0 mt-0.5" />
                          <InlineEditable value={benefit} fieldName={`Financing benefit ${index + 1}`} onChange={(v) => updateBenefit('financing', index, v)} isEditMode={isEditMode} className="text-primary-foreground" as="span" />
                        </div>
                      ))}
                    </div>

                    <div className="text-center">
                      <InlineEditable value={financing.applyText} fieldName="Apply text" onChange={(v) => updateNestedField('financing', 'applyText', v)} isEditMode={isEditMode} className="text-primary-foreground/80 mb-6" as="p" />
                      <InlineEditableButton
                        text={financing.buttonText}
                        href={financing.buttonLink}
                        onTextChange={(v) => updateNestedField('financing', 'buttonText', v)}
                        onHrefChange={(v) => updateNestedField('financing', 'buttonLink', v)}
                        isEditMode={isEditMode}
                        isExternal={financing.buttonOpenInNewTab}
                        onExternalChange={(v) => updateNestedField('financing', 'buttonOpenInNewTab', v)}
                      >
                        <Button size="lg" className="bg-secondary text-secondary-foreground hover:bg-secondary/90 text-lg px-8 py-6">{financing.buttonText}</Button>
                      </InlineEditableButton>
                    </div>
                  </div>
                </div>
              </section>

              {/* CTA Section */}
              <section className="py-16 bg-muted">
                <div className="container-custom text-center">
                  <InlineEditable value={cta.heading} fieldName="CTA heading" onChange={(v) => updateNestedField('cta', 'heading', v)} isEditMode={isEditMode} className="font-heading text-2xl md:text-3xl text-foreground mb-4" as="h2" />
                  <InlineEditable value={cta.description} fieldName="CTA description" onChange={(v) => updateNestedField('cta', 'description', v)} isEditMode={isEditMode} className="text-muted-foreground mb-8 max-w-2xl mx-auto" as="p" />
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <InlineEditableButton
                      text={cta.button1Text}
                      href={cta.button1Link}
                      onTextChange={(v) => updateNestedField('cta', 'button1Text', v)}
                      onHrefChange={(v) => updateNestedField('cta', 'button1Link', v)}
                      isEditMode={isEditMode}
                      isExternal={cta.button1OpenInNewTab}
                      onExternalChange={(v) => updateNestedField('cta', 'button1OpenInNewTab', v)}
                    >
                      <Button size="lg" className="bg-secondary text-secondary-foreground hover:bg-secondary/90">{cta.button1Text}</Button>
                    </InlineEditableButton>
                    <InlineEditableButton
                      text={cta.button2Text}
                      href={cta.button2Link}
                      onTextChange={(v) => updateNestedField('cta', 'button2Text', v)}
                      onHrefChange={(v) => updateNestedField('cta', 'button2Link', v)}
                      isEditMode={isEditMode}
                      isExternal={cta.button2OpenInNewTab}
                      onExternalChange={(v) => updateNestedField('cta', 'button2OpenInNewTab', v)}
                    >
                      <Button size="lg" className="bg-secondary text-secondary-foreground hover:bg-secondary/90">{cta.button2Text}</Button>
                    </InlineEditableButton>
                    <InlineEditableButton
                      text={cta.button3Text}
                      href={cta.button3Link}
                      onTextChange={(v) => updateNestedField('cta', 'button3Text', v)}
                      onHrefChange={(v) => updateNestedField('cta', 'button3Link', v)}
                      isEditMode={isEditMode}
                      isExternal={cta.button3OpenInNewTab}
                      onExternalChange={(v) => updateNestedField('cta', 'button3OpenInNewTab', v)}
                    >
                      <Button variant="outline" size="lg">{cta.button3Text}</Button>
                    </InlineEditableButton>
                  </div>
                </div>
              </section>
            </main>
          </>
        );
      }}
    </EditablePageWrapper>
  );
}
