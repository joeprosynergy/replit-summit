import { Helmet } from 'react-helmet-async';
import { Phone, Mail, MapPin, Clock, Facebook } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ContactForm from '@/components/ContactForm';

const faqs = [
  {
    question: 'What types of storage buildings do you offer?',
    answer: 'EVERYTHING! If you need some more specifics, here is a list of our storage building offerings: Sheds, Garden Shed, Utility Shed, Tool Shed, Backyard Building, Garage, Storage Shed, Portable Shed, Container, Outdoor Shed, Hunting Cabin, Lake Cabin, Portable Office, Portable Concession Stand, Snow Cone Building, Garden Tools Shed, Tiny House (can double as a man cave or "she shed"), Tool and Utility Shed, Lofted Storage Barn, Lofted Storage Shed, Side Lofted Barn, Lofted Garden Shed, and basically any other outdoor buildings you can think of!',
  },
  {
    question: 'How much are your buildings?',
    answer: 'We offer a wide range of standard storage building styles and sizes. Pricing varies by size and style. Contact your local dealer for details on pricing in your area, or request a brochure.',
  },
  {
    question: "Your brochure states 'Free Delivery', but I don't live in the area where I saw the buildings. How far is too far?",
    answer: 'We offer free delivery up to 50 miles from our closest dealer to the point of delivery. You do not have to order the building from the closest dealer to qualify for free delivery. If you are beyond the 50 mile radius, please contact the sales rep for the area in which you live to give you an accurate delivery cost. Setup is still Free.',
  },
  {
    question: 'I would like to add more windows to a building and change where the door is located. Can I customize the building?',
    answer: "Sure! Our storage buildings are completely customizable. We have a standard placement for doors and windows, but if you would like additional door(s), window(s), etc., we build to suit. We can add or delete just about anything you would want, as long as it doesn't compromise the integrity or strength of the building.",
  },
  {
    question: 'Do I need good credit for the Rent-to-Own option?',
    answer: 'NO! We offer an affordable (no strings attached) alternative to financing your storage building by signing a rent-to-own contract. NO EARLY PAYOFF PENALTIES. A small down payment is required to get a building delivered to you!',
  },
  {
    question: 'I ordered a building. When should I expect it to be delivered?',
    answer: 'Our Custom Ordered Storage Buildings are typically delivered within 10 to 30 business days from the date we receive your order. Weather conditions and the demand of the season may greatly affect delivery lead times. On Lot / In Stock buildings are normally delivered within 5-10 business days. Weather conditions and the demand of the season may greatly affect delivery lead times.',
  },
  {
    question: 'Do I need a specific foundation for my building?',
    answer: 'The only requirement is a general level location for your building to sit on (we will level the building up to 18″). Our buildings are designed to rest directly on their skids. Each Skid/Runner is treated for ground contact. In order to level the building we use treated wood blocks and shins. If you would like to have your building on concrete blocks, we require that you provide the blocks or arrange with one of our Team Members to bring blocks. We charge $3.00/block. We recommend Solid 4"x8"x16" and 8"x8"x16" Concrete Blocks. A Gravel Pad is recommended but not required. This will create a solid base and enhance the life of your building.',
  },
  {
    question: 'What if my new building will not fit through my gate or around my fence?',
    answer: 'Summit Portable Buildings, LLC requires that your site be ready for delivery, and is not responsible for making alterations to fences or other barriers. If you have questions about your site, contact your local dealer or sales rep.',
  },
  {
    question: 'How much space should be allowed to deliver a building?',
    answer: "A vertical space of 14′, measured from the ground to the top of the building when it is on the trailer, is required. Be sure to take any tree branches and utility wires into account. While our drivers are very skilled with delivery equipment, they will still need a minimum of 1′ of space to maneuver the building through an opening. That is, a building 12′ wide will require a 14-foot wide space (1 foot on each side).",
  },
  {
    question: 'Do I need to have permits for my building?',
    answer: 'You are responsible for contacting your local city and county agencies in regard to zoning, permits, setbacks, and covenants. Also, it is recommended that you contact your Home Owners Association (if applicable) to determine what rules and regulations may apply.',
  },
];

const ContactUs = () => {
  return (
    <>
      <Helmet>
        <title>Contact Us | Summit Portable Buildings</title>
        <meta
          name="description"
          content="Contact Summit Portable Buildings. Call us at 573-747-4700 or fill out our contact form. Serving Missouri, Illinois, Kentucky & Arkansas."
        />
        <link rel="canonical" href="https://summitbuildings.com/contact-us" />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Header />

        {/* Hero Section */}
        <section className="pt-32 pb-16 bg-gradient-to-b from-primary/10 to-background">
          <div className="container-custom">
            <div className="text-center max-w-3xl mx-auto">
              <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
                We'd love <span className="text-secondary">to hear from you</span>
              </h1>
              <p className="text-lg text-muted-foreground">
                Fill out our form and someone from our team will get back to you promptly. Or give us a call and talk to someone today!
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
                  Send us a message
                </h2>
                <ContactForm />
              </div>

              {/* Contact Info */}
              <div className="space-y-8">
                <div className="bg-card rounded-2xl p-8 shadow-lg border border-border/50">
                  <h2 className="font-heading text-2xl font-bold text-foreground mb-6">
                    Contact Information
                  </h2>
                  <div className="space-y-6">
                    <a
                      href="tel:5737474700"
                      className="flex items-start gap-4 group hover:text-secondary transition-colors"
                    >
                      <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-secondary/10 transition-colors">
                        <Phone className="w-6 h-6 text-primary group-hover:text-secondary" />
                      </div>
                      <div>
                        <p className="font-semibold text-foreground">Phone</p>
                        <p className="text-muted-foreground">(573) 747-4700</p>
                      </div>
                    </a>
                    <a
                      href="mailto:summitmainoffice@gmail.com"
                      className="flex items-start gap-4 group hover:text-secondary transition-colors"
                    >
                      <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-secondary/10 transition-colors">
                        <Mail className="w-6 h-6 text-primary group-hover:text-secondary" />
                      </div>
                      <div>
                        <p className="font-semibold text-foreground">Email</p>
                        <p className="text-muted-foreground">summitmainoffice@gmail.com</p>
                      </div>
                    </a>
                    <a
                      href="https://g.page/summitbuildingsfarmingtonmo?share"
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
                          Summit Portable Buildings<br />
                          7336 State Highway 32<br />
                          Farmington, MO 63640
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
                          Monday - Friday: 8am - 5pm<br />
                          Saturday: By Appointment<br />
                          Sunday: Closed
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Social Links */}
                <div className="bg-card rounded-2xl p-8 shadow-lg border border-border/50">
                  <h3 className="font-heading text-xl font-bold text-foreground mb-4">
                    Follow Us
                  </h3>
                  <a
                    href="https://www.facebook.com/summitportablebuildings/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-3 text-muted-foreground hover:text-secondary transition-colors"
                  >
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center hover:bg-secondary/10 transition-colors">
                      <Facebook className="w-5 h-5" />
                    </div>
                    <span className="font-medium">Facebook</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section - Always Open */}
        <section className="py-16 bg-muted/30">
          <div className="container-custom">
            <div className="text-center mb-12">
              <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
                Frequently Asked <span className="text-secondary">Questions</span>
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Find answers to common questions about our storage buildings, delivery, and more.
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
};

export default ContactUs;
