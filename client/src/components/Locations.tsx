import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const stateData = [
  {
    state: 'Missouri',
    abbrev: 'MO',
    cities: ['St. Louis Area', 'Farmington', 'Cape Girardeau', 'Rolla', 'Poplar Bluff', 'Sikeston'],
  },
  {
    state: 'Illinois',
    abbrev: 'IL',
    cities: ['Metropolis', 'Carbondale', 'Vienna', 'Anna', 'Chester', 'Red Bud'],
  },
  {
    state: 'Kentucky',
    abbrev: 'KY',
    cities: ['Paducah', 'Murray', 'Mayfield', 'Benton', 'Wickliffe', 'Bardwell'],
  },
  {
    state: 'Arkansas',
    abbrev: 'AR',
    cities: ['Northeast Arkansas', 'Jonesboro Area'],
  },
];

const Locations = () => {
  return (
    <section id="locations" className="section-padding bg-background">
      <div className="container-custom">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <p className="text-secondary font-heading uppercase tracking-widest mb-3">
            Service Areas
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading text-foreground mb-6">
            Proudly Serving 4 States
          </h2>
          <p className="text-muted-foreground text-lg">
            We deliver and set up buildings throughout Missouri, Illinois, Kentucky, and Arkansas. Free delivery within 50 miles.
          </p>
        </div>

        {/* States Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          {stateData.map((state) => (
            <div
              key={state.abbrev}
              className="bg-card p-6 rounded-lg shadow-md border border-border"
            >
              <div className="flex items-center gap-3 mb-4">
                <span className="text-3xl font-heading font-bold text-primary">{state.abbrev}</span>
                <h3 className="font-heading text-lg text-foreground">
                  {state.state}
                </h3>
              </div>
              
              <ul className="space-y-1">
                {state.cities.map((city) => (
                  <li key={city} className="text-muted-foreground text-sm">
                    {city}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <p className="text-center text-muted-foreground mb-8">
          Don't see your area listed? Contact us to check delivery availability.
        </p>

        {/* CTA */}
        <div className="bg-primary rounded-2xl p-8 md:p-12 text-center">
          <h3 className="text-2xl md:text-3xl font-heading font-bold text-primary-foreground mb-4">
            Ready to Get Organized?
          </h3>
          <p className="text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
            Stop letting clutter control your life. Design your custom shed in minutes and take the first step toward a more organized property.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="https://summitbuildings.shedpro.co/" target="_blank" rel="noopener noreferrer">
              <Button variant="hero" size="lg">
                Design Your Shed Now
                <ArrowRight className="w-5 h-5" />
              </Button>
            </a>
            <Link to="/buyers-guide">
              <Button variant="heroOutline" size="lg">
                Get Free Buying Guide
              </Button>
            </Link>
          </div>
          <p className="text-primary-foreground/60 text-sm mt-6">
            Questions? Call us at{' '}
            <a href="tel:5737474700" className="hover:text-secondary transition-colors underline">
              (573) 747-4700
            </a>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Locations;
