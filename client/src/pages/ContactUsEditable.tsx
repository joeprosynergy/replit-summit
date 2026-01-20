/**
 * Contact Us Editable - ADMIN ONLY
 * Lazy-loaded only for authenticated admins
 * Contains full inline editing functionality
 * 
 * Bundle: admin-bundle.js (separate chunk)
 */

import { Helmet } from 'react-helmet-async';
import { Phone, Mail, MapPin, Clock, Facebook } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ContactForm from '@/components/ContactForm';

// ADMIN IMPORTS - Only loaded for admins
import { EditablePageWrapper } from '@/components/admin/EditablePageWrapper';
import { InlineEditable } from '@/components/admin/InlineEditable';
import { ContactUsContent } from './defaults/contactUsDefaults';

interface ContactUsEditableProps {
  initialContent: ContactUsContent;
}

export default function ContactUsEditable({ initialContent }: ContactUsEditableProps) {
  return (
    <EditablePageWrapper<ContactUsContent>
      slug="contact-us"
      defaultContent={initialContent}
    >
      {({ content, isEditMode, updateField }) => {
        // Build FAQ array from content
        const faqs = [];
        for (let i = 1; i <= 10; i++) {
          const question = content[`faq${i}Question` as keyof ContactUsContent];
          const answer = content[`faq${i}Answer` as keyof ContactUsContent];
          if (question && answer) {
            faqs.push({ 
              question: String(question), 
              answer: String(answer),
              index: i 
            });
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
                      <InlineEditable
                        value={content.heroHeading}
                        fieldName="heroHeading"
                        onChange={(value) => updateField('heroHeading', value)}
                        isEditMode={isEditMode}
                        as="span"
                      />{' '}
                      <span className="text-secondary">
                        <InlineEditable
                          value={content.heroHeadingHighlight}
                          fieldName="heroHeadingHighlight"
                          onChange={(value) => updateField('heroHeadingHighlight', value)}
                          isEditMode={isEditMode}
                          as="span"
                        />
                      </span>
                    </h1>
                    <InlineEditable
                      value={content.heroSubheading}
                      fieldName="heroSubheading"
                      type="textarea"
                      onChange={(value) => updateField('heroSubheading', value)}
                      isEditMode={isEditMode}
                      as="p"
                      className="text-lg text-muted-foreground"
                    />
                  </div>
                </div>
              </section>

              {/* Contact Form & Info Section */}
              <section className="py-16">
                <div className="container-custom">
                  <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
                    {/* Contact Form */}
                    <div className="bg-card rounded-2xl p-8 shadow-lg border border-border/50">
                      <InlineEditable
                        value={content.formHeading}
                        fieldName="formHeading"
                        onChange={(value) => updateField('formHeading', value)}
                        isEditMode={isEditMode}
                        as="h2"
                        className="font-heading text-2xl font-bold text-foreground mb-6"
                      />
                      <ContactForm />
                    </div>

                    {/* Contact Info */}
                    <div className="space-y-8">
                      <div className="bg-card rounded-2xl p-8 shadow-lg border border-border/50">
                        <InlineEditable
                          value={content.contactInfoHeading}
                          fieldName="contactInfoHeading"
                          onChange={(value) => updateField('contactInfoHeading', value)}
                          isEditMode={isEditMode}
                          as="h2"
                          className="font-heading text-2xl font-bold text-foreground mb-6"
                        />
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
                              <InlineEditable
                                value={content.phoneDisplay}
                                fieldName="phoneDisplay"
                                onChange={(value) => updateField('phoneDisplay', value)}
                                isEditMode={isEditMode}
                                as="p"
                                className="text-muted-foreground"
                              />
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
                              <InlineEditable
                                value={content.email}
                                fieldName="email"
                                onChange={(value) => updateField('email', value)}
                                isEditMode={isEditMode}
                                as="p"
                                className="text-muted-foreground"
                              />
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
                                <InlineEditable
                                  value={content.addressLine1}
                                  fieldName="addressLine1"
                                  onChange={(value) => updateField('addressLine1', value)}
                                  isEditMode={isEditMode}
                                  as="span"
                                /><br />
                                <InlineEditable
                                  value={content.addressLine2}
                                  fieldName="addressLine2"
                                  onChange={(value) => updateField('addressLine2', value)}
                                  isEditMode={isEditMode}
                                  as="span"
                                /><br />
                                <InlineEditable
                                  value={content.addressLine3}
                                  fieldName="addressLine3"
                                  onChange={(value) => updateField('addressLine3', value)}
                                  isEditMode={isEditMode}
                                  as="span"
                                />
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
                                <InlineEditable
                                  value={content.hoursLine1}
                                  fieldName="hoursLine1"
                                  onChange={(value) => updateField('hoursLine1', value)}
                                  isEditMode={isEditMode}
                                  as="span"
                                /><br />
                                <InlineEditable
                                  value={content.hoursLine2}
                                  fieldName="hoursLine2"
                                  onChange={(value) => updateField('hoursLine2', value)}
                                  isEditMode={isEditMode}
                                  as="span"
                                /><br />
                                <InlineEditable
                                  value={content.hoursLine3}
                                  fieldName="hoursLine3"
                                  onChange={(value) => updateField('hoursLine3', value)}
                                  isEditMode={isEditMode}
                                  as="span"
                                />
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Social Links */}
                      <div className="bg-card rounded-2xl p-8 shadow-lg border border-border/50">
                        <InlineEditable
                          value={content.socialHeading}
                          fieldName="socialHeading"
                          onChange={(value) => updateField('socialHeading', value)}
                          isEditMode={isEditMode}
                          as="h3"
                          className="font-heading text-xl font-bold text-foreground mb-4"
                        />
                        <a
                          href={content.facebookLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-3 text-muted-foreground hover:text-secondary transition-colors"
                        >
                          <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center hover:bg-secondary/10 transition-colors">
                            <Facebook className="w-5 h-5" />
                          </div>
                          <InlineEditable
                            value={content.facebookText}
                            fieldName="facebookText"
                            onChange={(value) => updateField('facebookText', value)}
                            isEditMode={isEditMode}
                            as="span"
                            className="font-medium"
                          />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* FAQ Section */}
              <section className="py-16 bg-muted/30">
                <div className="container-custom">
                  <div className="text-center mb-12">
                    <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
                      <InlineEditable
                        value={content.faqHeading}
                        fieldName="faqHeading"
                        onChange={(value) => updateField('faqHeading', value)}
                        isEditMode={isEditMode}
                        as="span"
                      />{' '}
                      <span className="text-secondary">
                        <InlineEditable
                          value={content.faqHeadingHighlight}
                          fieldName="faqHeadingHighlight"
                          onChange={(value) => updateField('faqHeadingHighlight', value)}
                          isEditMode={isEditMode}
                          as="span"
                        />
                      </span>
                    </h2>
                    <InlineEditable
                      value={content.faqSubheading}
                      fieldName="faqSubheading"
                      type="textarea"
                      onChange={(value) => updateField('faqSubheading', value)}
                      isEditMode={isEditMode}
                      as="p"
                      className="text-lg text-muted-foreground max-w-2xl mx-auto"
                    />
                  </div>

                  <div className="max-w-4xl mx-auto space-y-6">
                    {faqs.map((faq) => (
                      <div
                        key={faq.index}
                        className="bg-card rounded-xl p-6 shadow-sm border border-border/50 hover:shadow-md transition-shadow"
                      >
                        <h3 className="font-heading text-lg font-semibold text-foreground mb-3 flex items-start gap-3">
                          <span className="text-secondary font-bold">Q:</span>
                          <InlineEditable
                            value={faq.question}
                            fieldName={`faq${faq.index}Question`}
                            onChange={(value) => updateField(`faq${faq.index}Question` as keyof ContactUsContent, value)}
                            isEditMode={isEditMode}
                            as="span"
                          />
                        </h3>
                        <div className="text-muted-foreground leading-relaxed pl-7">
                          <span className="text-primary font-semibold">A:</span>{' '}
                          <InlineEditable
                            value={faq.answer}
                            fieldName={`faq${faq.index}Answer`}
                            type="textarea"
                            onChange={(value) => updateField(`faq${faq.index}Answer` as keyof ContactUsContent, value)}
                            isEditMode={isEditMode}
                            as="span"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </section>

              <Footer />
            </div>
          </>
        );
      }}
    </EditablePageWrapper>
  );
}
