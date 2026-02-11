"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle2, Calendar, DollarSign, Home, FileText, CreditCard, Key, Truck, ShieldCheck, Percent, Building } from "lucide-react";
import { financingDefaults, type FinancingContent } from "@/data/defaults/financingDefaults";

interface FinancingViewProps {
  content: FinancingContent;
}

export const FinancingView = ({ content }: FinancingViewProps) => {
  const stepIcons = [Home, FileText, CreditCard, Key];

  // Defensive fallbacks for nested content sections
  const hero = content.hero || financingDefaults.hero;
  const howItWorks = content.howItWorks || financingDefaults.howItWorks;
  const rentToOwn = content.rentToOwn || financingDefaults.rentToOwn;
  const financing = content.financing || financingDefaults.financing;
  const financingCards = content.financingCards || financingDefaults.financingCards;
  const cta = content.cta || financingDefaults.cta;

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
              {hero.badge}
            </span>
            <h1 className="font-heading text-3xl md:text-5xl lg:text-6xl text-primary-foreground mb-6">
              {hero.heading}
            </h1>
            <p className="text-primary-foreground/90 text-xl md:text-2xl mb-4">
              {hero.description}
            </p>
            <p className="text-secondary text-lg font-semibold mb-8">
              {hero.highlight}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-secondary text-secondary-foreground hover:bg-secondary/90 text-lg px-8 py-6" asChild>
                <a href={hero.button1Link} target={hero.button1OpenInNewTab ? '_blank' : undefined} rel={hero.button1OpenInNewTab ? 'noopener noreferrer' : undefined}>{hero.button1Text}</a>
              </Button>
              <Button size="lg" variant="outline" className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground/10 text-lg px-8 py-6" asChild>
                <a href={hero.button2Link} target={hero.button2OpenInNewTab ? '_blank' : undefined} rel={hero.button2OpenInNewTab ? 'noopener noreferrer' : undefined}>{hero.button2Text}</a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 bg-background">
        <div className="container-custom">
          <h2 className="font-heading text-3xl md:text-4xl text-center mb-12">
            {howItWorks.heading}
          </h2>
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
                    <h3 className="font-heading text-xl text-foreground mb-2">{item.title}</h3>
                    <p className="text-muted-foreground">{item.description}</p>
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
                {rentToOwn.badge}
              </span>
              <h2 className="font-heading text-3xl md:text-4xl text-foreground mb-4">
                {rentToOwn.heading}
              </h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                {rentToOwn.description}
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <Card className="border-2 border-secondary">
                <CardContent className="pt-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center">
                      <Percent className="w-6 h-6 text-secondary" />
                    </div>
                    <h3 className="font-heading text-xl text-foreground">{rentToOwn.card1Title}</h3>
                  </div>
                  <p className="text-muted-foreground">{rentToOwn.card1Description}</p>
                </CardContent>
              </Card>

              <Card className="border-2 border-secondary">
                <CardContent className="pt-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center">
                      <ShieldCheck className="w-6 h-6 text-secondary" />
                    </div>
                    <h3 className="font-heading text-xl text-foreground">{rentToOwn.card2Title}</h3>
                  </div>
                  <p className="text-muted-foreground">{rentToOwn.card2Description}</p>
                </CardContent>
              </Card>

              <Card className="border-2 border-secondary">
                <CardContent className="pt-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center">
                      <Truck className="w-6 h-6 text-secondary" />
                    </div>
                    <h3 className="font-heading text-xl text-foreground">{rentToOwn.card3Title}</h3>
                  </div>
                  <p className="text-muted-foreground">{rentToOwn.card3Description}</p>
                </CardContent>
              </Card>

              <Card className="border-2 border-secondary">
                <CardContent className="pt-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center">
                      <Building className="w-6 h-6 text-secondary" />
                    </div>
                    <h3 className="font-heading text-xl text-foreground">{rentToOwn.card4Title}</h3>
                  </div>
                  <p className="text-muted-foreground">{rentToOwn.card4Description}</p>
                </CardContent>
              </Card>
            </div>

            {/* Down Payment Info */}
            <div className="bg-card rounded-xl p-8 border border-border mb-12">
              <h3 className="font-heading text-2xl text-foreground mb-6 text-center">
                {rentToOwn.downPaymentHeading}
              </h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-muted rounded-lg p-6">
                  <h3 className="font-heading text-lg text-secondary mb-2">{rentToOwn.term24_36Title}</h3>
                  <p className="text-foreground">{rentToOwn.term24_36Description}</p>
                  <p className="text-sm text-muted-foreground mt-1">{rentToOwn.term24_36Note}</p>
                </div>
                <div className="bg-muted rounded-lg p-6">
                  <h3 className="font-heading text-lg text-secondary mb-2">{rentToOwn.term48_60Title}</h3>
                  <p className="text-foreground">{rentToOwn.term48_60Description}</p>
                  <p className="text-sm text-muted-foreground mt-1">{rentToOwn.term48_60Note}</p>
                </div>
              </div>
              <p className="text-center text-muted-foreground mt-6 text-sm">{rentToOwn.customNote}</p>
            </div>

            {/* All Benefits */}
            <h3 className="font-heading text-2xl text-foreground mb-6 text-center">
              {rentToOwn.benefitsHeading}
            </h3>
            <div className="grid sm:grid-cols-2 gap-4 mb-8">
              {(rentToOwn.benefits || []).map((benefit, index) => (
                <div key={index} className="flex items-start gap-3 bg-card rounded-lg p-4 border border-border">
                  <CheckCircle2 className="w-5 h-5 text-secondary flex-shrink-0 mt-0.5" />
                  <span className="text-foreground">{benefit}</span>
                </div>
              ))}
            </div>

            <div className="text-center">
              <Button size="lg" className="bg-secondary text-secondary-foreground hover:bg-secondary/90 text-lg px-8 py-6" asChild>
                <a href={rentToOwn.buttonLink} target={rentToOwn.buttonOpenInNewTab ? '_blank' : undefined} rel={rentToOwn.buttonOpenInNewTab ? 'noopener noreferrer' : undefined}>
                  {rentToOwn.buttonText}
                </a>
              </Button>
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
                {financing.badge}
              </span>
              <h2 className="font-heading text-3xl md:text-4xl text-primary-foreground mb-4">
                {financing.heading}
              </h2>
              <p className="text-lg text-primary-foreground/80 max-w-3xl mx-auto">
                {financing.description}
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 mb-12">
              <Card className="bg-primary-foreground/10 border-primary-foreground/20">
                <CardContent className="pt-6 text-center">
                  <div className="w-16 h-16 bg-secondary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Percent className="w-8 h-8 text-secondary" />
                  </div>
                  <h3 className="font-heading text-lg text-primary-foreground mb-2">{financingCards.card1Title}</h3>
                  <p className="text-3xl font-bold text-secondary">{financingCards.card1Value}</p>
                  <p className="text-primary-foreground/70 text-sm mt-1">{financingCards.card1Subtitle}</p>
                </CardContent>
              </Card>

              <Card className="bg-primary-foreground/10 border-primary-foreground/20">
                <CardContent className="pt-6 text-center">
                  <div className="w-16 h-16 bg-secondary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <DollarSign className="w-8 h-8 text-secondary" />
                  </div>
                  <h3 className="font-heading text-lg text-primary-foreground mb-2">{financingCards.card2Title}</h3>
                  <p className="text-3xl font-bold text-secondary">{financingCards.card2Value}</p>
                  <p className="text-primary-foreground/70 text-sm mt-1">{financingCards.card2Subtitle}</p>
                </CardContent>
              </Card>

              <Card className="bg-primary-foreground/10 border-primary-foreground/20">
                <CardContent className="pt-6 text-center">
                  <div className="w-16 h-16 bg-secondary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Calendar className="w-8 h-8 text-secondary" />
                  </div>
                  <h3 className="font-heading text-lg text-primary-foreground mb-2">{financingCards.card3Title}</h3>
                  <p className="text-3xl font-bold text-secondary">{financingCards.card3Value}</p>
                  <p className="text-primary-foreground/70 text-sm mt-1">{financingCards.card3Subtitle}</p>
                </CardContent>
              </Card>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
              {(financing.benefits || []).map((benefit, index) => (
                <div key={index} className="flex items-start gap-3 bg-primary-foreground/10 rounded-lg p-4">
                  <CheckCircle2 className="w-5 h-5 text-secondary flex-shrink-0 mt-0.5" />
                  <span className="text-primary-foreground">{benefit}</span>
                </div>
              ))}
            </div>

            <div className="text-center">
              <p className="text-primary-foreground/80 mb-6">{financing.applyText}</p>
              <Button size="lg" className="bg-secondary text-secondary-foreground hover:bg-secondary/90 text-lg px-8 py-6" asChild>
                <a href={financing.buttonLink} target={financing.buttonOpenInNewTab ? '_blank' : undefined} rel={financing.buttonOpenInNewTab ? 'noopener noreferrer' : undefined}>
                  {financing.buttonText}
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-muted">
        <div className="container-custom text-center">
          <h2 className="font-heading text-2xl md:text-3xl text-foreground mb-4">
            {cta.heading}
          </h2>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            {cta.description}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-secondary text-secondary-foreground hover:bg-secondary/90" asChild>
              <a href={cta.button1Link} target={cta.button1OpenInNewTab ? '_blank' : undefined} rel={cta.button1OpenInNewTab ? 'noopener noreferrer' : undefined}>
                {cta.button1Text}
              </a>
            </Button>
            <Button size="lg" className="bg-secondary text-secondary-foreground hover:bg-secondary/90" asChild>
              <a href={cta.button2Link} target={cta.button2OpenInNewTab ? '_blank' : undefined} rel={cta.button2OpenInNewTab ? 'noopener noreferrer' : undefined}>
                {cta.button2Text}
              </a>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <a href={cta.button3Link} target={cta.button3OpenInNewTab ? '_blank' : undefined} rel={cta.button3OpenInNewTab ? 'noopener noreferrer' : undefined}>
                {cta.button3Text}
              </a>
            </Button>
          </div>
        </div>
      </section>
    </main>
    </>
  );
};
