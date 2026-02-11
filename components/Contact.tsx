"use client";

import { Phone, Clock, MapPin } from 'lucide-react';
import ContactForm from '@/components/ContactForm';

const Contact = () => {
  return (
    <section id="contact" className="section-padding bg-primary">
      <div className="container-custom">
        <div className="text-center mb-12">
          <p className="text-secondary font-heading uppercase tracking-widest mb-3">
            Get In Touch
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading text-primary-foreground mb-4">
            Request a Quote
          </h2>
          <p className="text-primary-foreground/70 text-lg max-w-2xl mx-auto">
            Have questions? Ready to get started? Fill out the form below and we'll get back to you promptly.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
          {/* Form */}
          <div className="lg:col-span-3 bg-card p-8 rounded-lg shadow-lg">
            <ContactForm />
          </div>

          {/* Contact Info */}
          <div className="lg:col-span-2 space-y-8">
            <div>
              <h3 className="font-heading text-xl text-primary-foreground mb-2">
                Call Us
              </h3>
              <a href="tel:5737474700" className="flex items-center gap-3 text-secondary text-2xl font-bold hover:underline">
                <Phone className="w-6 h-6" />
                (573) 747-4700
              </a>
            </div>

            <div>
              <h3 className="font-heading text-xl text-primary-foreground mb-2">
                Main Location
              </h3>
              <div className="flex items-start gap-3 text-primary-foreground/70">
                <MapPin className="w-5 h-5 text-secondary flex-shrink-0 mt-1" />
                <div>
                  <p>7336 State Highway 32</p>
                  <p>Farmington, MO 63640</p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-heading text-xl text-primary-foreground mb-2">
                Hours
              </h3>
              <div className="flex items-start gap-3 text-primary-foreground/70">
                <Clock className="w-5 h-5 text-secondary flex-shrink-0 mt-1" />
                <div>
                  <p>Mon - Fri: 8am - 5pm</p>
                  <p>Sat: 9am - 3pm</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
