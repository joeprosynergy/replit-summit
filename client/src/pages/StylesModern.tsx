import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

import modernShed1 from '@/assets/modern-shed-1.jpg';
import garageImage from '@/assets/garage-1.jpg';

const options = [
  {
    id: 'pro',
    name: 'Pro',
    description: 'Premium quality with single slope roof and contemporary design.',
    features: ['LP SmartSide siding', '2x6 floor joists 12" OC', '6" Overhangs', 'Single slope roof'],
    image: modernShed1,
    link: '/types/deluxe-storage-cabins/modern-shed'
  },
  {
    id: 'garage',
    name: 'Garage',
    description: 'Secure vehicle and equipment storage with easy access.',
    features: ['LP SmartSide siding', '2x6 floor joists 12" OC', 'Garage door included'],
    image: garageImage,
    link: '/types/garages-carports/garage'
  },
];

const StylesModern = () => {
  return (
    <>
      <Helmet>
        <title>Modern Style Buildings | Summit Portable Buildings</title>
        <meta name="description" content="Explore our Modern style buildings with single slope roofs. Choose from Pro or Garage options for a contemporary look." />
        <link rel="canonical" href="https://summitbuildings.com/styles/modern" />
      </Helmet>

      <Header />

      <main className="pt-20">
        {/* Hero Section */}
        <section className="bg-primary py-16 md:py-24">
          <div className="container-custom text-center">
            <Link to="/styles" className="text-secondary font-semibold tracking-wider uppercase mb-4 hover:underline inline-block">
              ← Back to Styles
            </Link>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-primary-foreground mb-6">
              Modern Style
            </h1>
            <p className="text-xl text-primary-foreground/80 max-w-2xl mx-auto">
              Single Slope Roof — Contemporary design with clean, sleek lines
            </p>
          </div>
        </section>

        {/* Options Grid */}
        <section className="bg-background py-16 md:py-24">
          <div className="container-custom">
            <div className="bg-card rounded-lg shadow-lg overflow-hidden">
              <div className="bg-primary py-5 px-6">
                <h2 className="text-2xl md:text-3xl font-heading font-bold text-primary-foreground text-center uppercase tracking-wide">
                  Choose Your Option
                </h2>
              </div>

              <div className="p-6 md:p-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-2xl mx-auto">
                  {options.map((option) => (
                    <Link
                      key={option.id}
                      to={option.link}
                      className="group bg-muted/30 rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
                    >
                      <div className="aspect-video overflow-hidden">
                        <img
                          src={option.image}
                          alt={option.name}
                          className="w-full h-full transition-transform duration-300 group-hover:scale-105 object-cover"
                        />
                      </div>
                      <div className="p-5">
                        <h3 className="font-heading font-bold text-xl text-foreground group-hover:text-secondary transition-colors uppercase tracking-wide mb-2">
                          {option.name}
                        </h3>
                        <p className="text-muted-foreground text-sm mb-4">
                          {option.description}
                        </p>
                        <div className="space-y-1">
                          <p className="text-xs font-semibold text-foreground uppercase tracking-wide">Standard Features:</p>
                          <ul className="text-xs text-muted-foreground space-y-1">
                            {option.features.map((feature, idx) => (
                              <li key={idx} className="flex items-center gap-2">
                                <span className="w-1 h-1 bg-secondary rounded-full"></span>
                                {feature}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-primary py-16">
          <div className="container-custom text-center">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-primary-foreground mb-6">
              Ready to Get Started?
            </h2>
            <p className="text-primary-foreground/80 text-lg mb-8 max-w-2xl mx-auto">
              Design your perfect modern building online in minutes
            </p>
            <a
              href="https://summitbuildings.shedpro.co/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-secondary text-secondary-foreground font-bold px-8 py-4 rounded-md hover:brightness-110 transition-all"
            >
              Design Your Building
            </a>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
};

export default StylesModern;
