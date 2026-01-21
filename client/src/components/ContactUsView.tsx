/**
 * Contact Us View Component
 * Pure presentation - NO admin code
 * Used by both public users and as preview for admins
 */

import { Helmet } from 'react-helmet-async';
import { Phone, Mail, MapPin, Clock, Facebook } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ContactForm from '@/components/ContactForm';
import { ContactUsContent } from '@/pages/defaults/contactUsDefaults';

interface ContactUsViewProps {
  content: ContactUsContent;
}

export function ContactUsView({ content }: ContactUsViewProps) {
  // Build FAQ array from content
  const faqs = [];
  for (let i = 1; i <= 10; i++) {
    const question = content[`faq${i}Question` as keyof ContactUsContent];
    const answer = content[`faq${i}Answer` as keyof ContactUsContent];
    if (question && answer) {
      faqs.push({ question: String(question), answer: String(answer) });
    }
  }

  return (
    <>
      <Helmet>
        <title>{content.metaTitle}</title>
        <meta name="description" content={content.metaDescription} />
        <link rel="canonical" href="https://summitbuildings.com/contact-us" />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Header />

        {/* Hero Section */}
        <section className="pt-32 pb-16 bg-gradient-to-b from-primary/10 to-background">
          <div className="container-custom">
            <div className="text-center max-w-3xl mx-auto">
              <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
                {content.heroHeading} <span className="text-secondary">{content.heroHeadingHighlight}</span>
              </h1>
              <p className="text-lg text-muted-foreground">
                {content.heroSubheading}
              </p>
            </div>
          </div>
        </section>

        {/* Contact Form & Info Section */}
        <section className="py-16">
          <div className="container-custom">
            <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
              {/* Contact Form */}
              <div className="bg-card rounded-2xl p-8 shadow-lg border border-border/50">
                <h2 className="font-heading text-2xl font-bold text-foreground mb-6">
                  {content.formHeading}
                </h2>
                <ContactForm />
              </div>

              {/* Contact Info */}
              <div className="space-y-8">
                <div className="bg-card rounded-2xl p-8 shadow-lg border border-border/50">
                  <h2 className="font-heading text-2xl font-bold text-foreground mb-6">
                    {content.contactInfoHeading}
                  </h2>
                  <div className="space-y-6">
                    <a
                      href={content.phone}
                      className="flex items-start gap-4 group hover:text-secondary transition-colors"
                    >
                      <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-secondary/10 transition-colors">
                        <Phone className="w-6 h-6 text-primary group-hover:text-secondary" />
                      </div>
                      <div>
                        <p className="font-semibold text-foreground">Phone</p>
                        <p className="text-muted-foreground">{content.phoneDisplay}</p>
                      </div>
                    </a>
                    <a
                      href={`mailto:${content.email}`}
                      className="flex items-start gap-4 group hover:text-secondary transition-colors"
                    >
                      <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-secondary/10 transition-colors">
                        <Mail className="w-6 h-6 text-primary group-hover:text-secondary" />
                      </div>
                      <div>
                        <p className="font-semibold text-foreground">Email</p>
                        <p className="text-muted-foreground">{content.email}</p>
                      </div>
                    </a>
                    <a
                      href={content.addressMapLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-start gap-4 group hover:text-secondary transition-colors"
                    >
                      <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-secondary/10 transition-colors">
                        <MapPin className="w-6 h-6 text-primary group-hover:text-secondary" />
                      </div>
                      <div>
                        <p className="font-semibold text-foreground">Address</p>
                        <p className="text-muted-foreground">
                          {content.addressLine1}<br />
                          {content.addressLine2}<br />
                          {content.addressLine3}
                        </p>
                      </div>
                    </a>
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                        <Clock className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <p className="font-semibold text-foreground">Hours</p>
                        <p className="text-muted-foreground">
                          {content.hoursLine1}<br />
                          {content.hoursLine2}<br />
                          {content.hoursLine3}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Social Links */}
                <div className="bg-card rounded-2xl p-8 shadow-lg border border-border/50">
                  <h3 className="font-heading text-xl font-bold text-foreground mb-4">
                    {content.socialHeading}
                  </h3>
                  <a
                    href={content.facebookLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-3 text-muted-foreground hover:text-secondary transition-colors"
                  >
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center hover:bg-secondary/10 transition-colors">
                      <Facebook className="w-5 h-5" />
                    </div>
                    <span className="font-medium">{content.facebookText}</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section id="faq" className="py-16 bg-muted/30 scroll-mt-24">
          <div className="container-custom">
            <div className="text-center mb-12">
              <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
                {content.faqHeading} <span className="text-secondary">{content.faqHeadingHighlight}</span>
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                {content.faqSubheading}
              </p>
            </div>

            <div className="max-w-4xl mx-auto space-y-6">
              {faqs.map((faq, index) => (
                <div
                  key={index}
                  className="bg-card rounded-xl p-6 shadow-sm border border-border/50 hover:shadow-md transition-shadow"
                >
                  <h3 className="font-heading text-lg font-semibold text-foreground mb-3 flex items-start gap-3">
                    <span className="text-secondary font-bold">Q:</span>
                    {faq.question}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed pl-7">
                    <span className="text-primary font-semibold">A:</span> {faq.answer}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
}
