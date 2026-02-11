"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const faqs = [
  {
    question: 'What is your warranty policy?',
    answer: 'Every building comes with our comprehensive lifetime warranty covering structural defects and workmanship. We stand behind our products because we know they\'re built to last.',
  },
  {
    question: 'How long does delivery take?',
    answer: 'Most buildings are ready for delivery within 2-4 weeks of order. We\'ll work with you to schedule a delivery date that fits your timeline.',
  },
  {
    question: 'Do you offer installation?',
    answer: 'Yes, we offer free professional installation services within our service area. Our experienced team will set up your building properly and ensure everything is level and secure.',
  },
  {
    question: 'What financing options are available?',
    answer: 'We offer flexible financing options including rent-to-own programs with no credit check required. Contact us to discuss the best payment plan for your budget.',
  },
  {
    question: 'Can I customize my building?',
    answer: 'Absolutely! We offer a wide range of customization options including colors, window placement, door configurations, shelving, lofts, and more. Work with our team to create your perfect building.',
  },
  {
    question: 'What areas do you serve?',
    answer: 'We proudly serve Missouri, Illinois, Kentucky, and Arkansas with free delivery within our service area. Contact us to confirm delivery availability for your location.',
  },
];

const FAQ = () => {
  return (
    <section id="faq" className="section-padding bg-background">
      <div className="container-custom">
        <div className="text-center mb-16">
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Find answers to common questions
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="bg-card border border-border/50 rounded-xl px-6 data-[state=open]:border-primary/30 data-[state=open]:shadow-lg transition-all"
              >
                <AccordionTrigger className="text-left font-heading font-semibold text-foreground hover:text-primary hover:no-underline py-6">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pb-6 leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
