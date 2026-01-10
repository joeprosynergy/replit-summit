import { Monitor, Hammer, Truck } from 'lucide-react';
import { Button } from '@/components/ui/button';

const steps = [
  {
    number: 1,
    title: 'Design It Online',
    description: 'Use our 3D builder to pick your style, size, colors, and options. Get instant pricing. Takes about 5 minutes.',
    icon: Monitor,
  },
  {
    number: 2,
    title: 'We Build It',
    description: 'Our craftsmen hand-build your shed using premium materials. Every building is inspected for quality.',
    icon: Hammer,
  },
  {
    number: 3,
    title: 'We Deliver & Setup',
    description: 'We deliver to your property and set it up, leveled and ready to use. Free within 50 miles.',
    icon: Truck,
  },
];

const HowItWorks = () => {
  return (
    <section id="how-it-works" className="section-padding bg-muted/30">
      <div className="container-custom">
        <div className="text-center mb-16">
          <p className="text-secondary font-heading uppercase tracking-widest mb-4">
            The Plan
          </p>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Getting Your Shed is Easy
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            We've simplified the entire process into 3 simple steps.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 mb-12">
          {steps.map((step, index) => (
            <div
              key={step.number}
              className="relative"
            >
              {/* Connector line */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-16 left-[60%] w-[80%] h-0.5 bg-gradient-to-r from-secondary/50 to-secondary/10" />
              )}
              
              <div className="relative bg-card rounded-2xl p-8 shadow-lg border border-border/50 text-center h-full">
                {/* Step number badge */}
                <div className="absolute -top-5 left-1/2 -translate-x-1/2 w-10 h-10 bg-secondary text-secondary-foreground rounded-full flex items-center justify-center font-heading font-bold text-lg shadow-lg">
                  {step.number}
                </div>
                
                {/* Icon */}
                <div className="w-20 h-20 mx-auto mb-6 mt-4 bg-primary/10 rounded-2xl flex items-center justify-center">
                  <step.icon className="w-10 h-10 text-primary" />
                </div>
                
                <h3 className="font-heading text-xl font-bold text-foreground mb-4">
                  {step.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Button variant="hero" size="lg" className="text-lg px-10">
            Start Designing Your Shed
          </Button>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
