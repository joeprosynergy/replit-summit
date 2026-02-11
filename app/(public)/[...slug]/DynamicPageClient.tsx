"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { EditablePageWrapper } from "@/components/admin/EditablePageWrapper";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ArrowRight, Check } from "lucide-react";
import GallerySection from "@/components/GallerySection";

interface DynamicContent {
  [key: string]: any;
}

interface DynamicPageClientProps {
  slug: string;
  initialContent: DynamicContent;
}

const defaultContent: DynamicContent = {};

export default function DynamicPageClient({ slug, initialContent }: DynamicPageClientProps) {
  const router = useRouter();

  return (
    <EditablePageWrapper slug={slug} defaultContent={defaultContent}>
      {({ content }) => {
        const galleryImages: { src: string; alt: string }[] = [];
        let i = 1;
        while (content[`galleryImage${i}`]) {
          galleryImages.push({
            src: content[`galleryImage${i}`] as string,
            alt: (content[`galleryImage${i}Alt`] as string) || "",
          });
          i++;
        }

        const title =
          content.title || content.heading || "Page Title";
        const titleHighlight = content.titleHighlight || "";
        const description =
          content.description ||
          content.subheading ||
          "";
        const subtitle =
          content.subtitle || content.tagline || "";
        const heroImage = content.heroImage || "";
        const heroImageAlt = content.heroImageAlt || "";

        const benefits: string[] = [];
        for (let j = 1; j <= 10; j++) {
          const benefit = content[`valueBenefit${j}`];
          if (benefit) benefits.push(benefit as string);
        }

        return (
          <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-grow">
              {heroImage ? (
                <section className="relative bg-gradient-to-b from-primary/10 to-background">
                  <div className="container mx-auto px-4 py-16 md:py-24">
                    <div className="grid md:grid-cols-2 gap-8 items-center">
                      <div className="space-y-6">
                        <h1 className="text-4xl md:text-5xl font-bold text-foreground">
                          {titleHighlight && (
                            <span className="text-primary">
                              {titleHighlight}{" "}
                            </span>
                          )}
                          {title}
                        </h1>
                        {subtitle && (
                          <p className="text-lg text-muted-foreground">
                            {subtitle}
                          </p>
                        )}
                        {description && (
                          <p className="text-muted-foreground">{description}</p>
                        )}
                        <div className="flex flex-wrap gap-4">
                          {content.heroButton1Text && (
                            <Button asChild>
                              <a
                                href={
                                  (content.heroButton1Link as string) || "#"
                                }
                                target={
                                  content.heroButton1OpenInNewTab
                                    ? "_blank"
                                    : undefined
                                }
                                rel={
                                  content.heroButton1OpenInNewTab
                                    ? "noopener noreferrer"
                                    : undefined
                                }
                              >
                                {content.heroButton1Text}
                                <ArrowRight className="ml-2 h-4 w-4" />
                              </a>
                            </Button>
                          )}
                          {content.heroButton2Text && (
                            <Button variant="outline" asChild>
                              <a
                                href={
                                  (content.heroButton2Link as string) || "#"
                                }
                                target={
                                  content.heroButton2OpenInNewTab
                                    ? "_blank"
                                    : undefined
                                }
                                rel={
                                  content.heroButton2OpenInNewTab
                                    ? "noopener noreferrer"
                                    : undefined
                                }
                              >
                                {content.heroButton2Text}
                              </a>
                            </Button>
                          )}
                        </div>
                      </div>
                      <div className="relative">
                        <img
                          src={heroImage}
                          alt={heroImageAlt || title}
                          className="rounded-lg shadow-xl w-full object-cover"
                        />
                      </div>
                    </div>
                  </div>
                </section>
              ) : (
                <section className="py-16 bg-gradient-to-b from-primary/10 to-background">
                  <div className="container mx-auto px-4 text-center">
                    <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
                      {titleHighlight && (
                        <span className="text-primary">{titleHighlight} </span>
                      )}
                      {title}
                    </h1>
                    {subtitle && (
                      <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-4">
                        {subtitle}
                      </p>
                    )}
                    {description && (
                      <p className="text-muted-foreground max-w-3xl mx-auto">
                        {description}
                      </p>
                    )}
                  </div>
                </section>
              )}

              {galleryImages.length > 0 && (
                <GallerySection images={galleryImages} />
              )}

              {(content.sectionHeading || content.card1Title) && (
                <section className="py-16 bg-background">
                  <div className="container mx-auto px-4">
                    {content.sectionHeading && (
                      <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold mb-4">
                          {content.sectionHeading}
                        </h2>
                        {content.sectionSubheading && (
                          <p className="text-muted-foreground max-w-2xl mx-auto">
                            {content.sectionSubheading}
                          </p>
                        )}
                      </div>
                    )}
                    <div className="grid md:grid-cols-2 gap-8">
                      {content.card1Title && (
                        <div className="bg-card rounded-lg overflow-hidden shadow-lg">
                          {content.card1Image && (
                            <img
                              src={content.card1Image as string}
                              alt={
                                (content.card1ImageAlt as string) ||
                                (content.card1Title as string)
                              }
                              className="w-full h-48 object-cover"
                            />
                          )}
                          <div className="p-6">
                            <h3 className="text-xl font-bold mb-2">
                              {content.card1Title}
                            </h3>
                            {content.card1Description && (
                              <p className="text-muted-foreground mb-4">
                                {content.card1Description}
                              </p>
                            )}
                            <ul className="space-y-2">
                              {[1, 2, 3, 4].map((n) => {
                                const feature = content[`card1Feature${n}`];
                                return feature ? (
                                  <li
                                    key={n}
                                    className="flex items-center gap-2"
                                  >
                                    <Check className="h-4 w-4 text-primary" />
                                    <span className="text-sm">{feature}</span>
                                  </li>
                                ) : null;
                              })}
                            </ul>
                          </div>
                        </div>
                      )}
                      {content.card2Title && (
                        <div className="bg-card rounded-lg overflow-hidden shadow-lg">
                          {content.card2Image && (
                            <img
                              src={content.card2Image as string}
                              alt={
                                (content.card2ImageAlt as string) ||
                                (content.card2Title as string)
                              }
                              className="w-full h-48 object-cover"
                            />
                          )}
                          <div className="p-6">
                            <h3 className="text-xl font-bold mb-2">
                              {content.card2Title}
                            </h3>
                            {content.card2Description && (
                              <p className="text-muted-foreground mb-4">
                                {content.card2Description}
                              </p>
                            )}
                            <ul className="space-y-2">
                              {[1, 2, 3, 4].map((n) => {
                                const feature = content[`card2Feature${n}`];
                                return feature ? (
                                  <li
                                    key={n}
                                    className="flex items-center gap-2"
                                  >
                                    <Check className="h-4 w-4 text-primary" />
                                    <span className="text-sm">{feature}</span>
                                  </li>
                                ) : null;
                              })}
                            </ul>
                          </div>
                        </div>
                      )}
                    </div>
                    {content.designButtonText && (
                      <div className="text-center mt-8">
                        <Button asChild size="lg">
                          <a
                            href={(content.designButtonLink as string) || "#"}
                            target={
                              content.designButtonOpenInNewTab
                                ? "_blank"
                                : undefined
                            }
                            rel={
                              content.designButtonOpenInNewTab
                                ? "noopener noreferrer"
                                : undefined
                            }
                          >
                            {content.designButtonText}
                            <ArrowRight className="ml-2 h-4 w-4" />
                          </a>
                        </Button>
                      </div>
                    )}
                  </div>
                </section>
              )}

              {(content.valueHeading || benefits.length > 0) && (
                <section className="py-16 bg-muted/50">
                  <div className="container mx-auto px-4">
                    {content.valueHeading && (
                      <h2 className="text-3xl font-bold text-center mb-8">
                        {content.valueHeading}
                      </h2>
                    )}
                    {benefits.length > 0 && (
                      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 max-w-4xl mx-auto">
                        {benefits.map((benefit, idx) => (
                          <div
                            key={idx}
                            className="flex items-center gap-3 bg-background p-4 rounded-lg"
                          >
                            <Check className="h-5 w-5 text-primary flex-shrink-0" />
                            <span>{benefit}</span>
                          </div>
                        ))}
                      </div>
                    )}
                    {content.valueNote && (
                      <p className="text-sm text-muted-foreground text-center mt-8 max-w-2xl mx-auto">
                        {content.valueNote}
                      </p>
                    )}
                  </div>
                </section>
              )}

              {(content.ctaHeading ||
                content.cta_heading) && (
                <section className="py-16 bg-primary/10">
                  <div className="container mx-auto px-4 text-center">
                    <h2 className="text-3xl font-bold mb-4">
                      {content.ctaHeading ||
                        content.cta_heading}
                    </h2>
                    {(content.ctaDescription ||
                      content.cta_description) && (
                      <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
                        {content.ctaDescription ||
                          content.cta_description}
                      </p>
                    )}
                    <div className="flex flex-wrap justify-center gap-4">
                      {content.ctaPrimaryButton && (
                        <Button asChild size="lg">
                          <a
                            href={
                              (content.ctaPrimaryButtonLink as string) || "#"
                            }
                            target={
                              content.ctaPrimaryButtonOpenInNewTab
                                ? "_blank"
                                : undefined
                            }
                            rel={
                              content.ctaPrimaryButtonOpenInNewTab
                                ? "noopener noreferrer"
                                : undefined
                            }
                          >
                            {content.ctaPrimaryButton}
                            <ArrowRight className="ml-2 h-4 w-4" />
                          </a>
                        </Button>
                      )}
                      {content.ctaSecondaryButton && (
                        <Button variant="outline" asChild size="lg">
                          <a
                            href={
                              (content.ctaSecondaryButtonLink as string) || "#"
                            }
                            target={
                              content.ctaSecondaryButtonOpenInNewTab
                                ? "_blank"
                                : undefined
                            }
                            rel={
                              content.ctaSecondaryButtonOpenInNewTab
                                ? "noopener noreferrer"
                                : undefined
                            }
                          >
                            {content.ctaSecondaryButton}
                          </a>
                        </Button>
                      )}
                    </div>
                  </div>
                </section>
              )}

              {content.importantNote && (
                <section className="py-8 bg-background">
                  <div className="container mx-auto px-4">
                    <p className="text-sm text-muted-foreground text-center">
                      {content.importantNote}
                    </p>
                  </div>
                </section>
              )}
            </main>
            <Footer />
          </div>
        );
      }}
    </EditablePageWrapper>
  );
}
