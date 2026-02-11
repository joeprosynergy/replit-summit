"use client";

import { Award, Truck, Shield, Users, Wrench, DollarSign } from 'lucide-react';

const features = [
  {
    icon: Award,
    title: 'Quality Craftsmanship',
    description: 'Every building is hand-crafted by skilled craftsmen using premium materials that last for decades.',
  },
  {
    icon: Truck,
    title: 'Free Delivery',
    description: 'We deliver and set up your building at no extra cost within our service area.',
  },
  {
    icon: Shield,
    title: 'Built to Last',
    description: 'Durable construction with treated lumber, quality hardware, and weather-resistant finishes.',
  },
  {
    icon: Users,
    title: 'Family Owned',
    description: 'A family owned business that continues to strive for excellence & customer satisfaction.',
  },
  {
    icon: Wrench,
    title: 'Customizable',
    description: 'Choose your size, colors, doors, windows, and add-ons to create your perfect building.',
  },
  {
    icon: DollarSign,
    title: 'Rent-to-Own',
    description: 'Flexible payment options including rent-to-own with no credit check required.',
  },
];

const Features = () => {
  return (
    <section id="features" className="section-padding bg-navy">
      <div className="container-custom">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <p className="text-secondary font-heading uppercase tracking-widest mb-3">
            At The Summit
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading text-primary-foreground mb-6">
            WHY CHOOSE US
          </h2>
          <p className="text-primary-foreground/70 text-lg">
            We take pride in delivering the highest quality portable buildings with exceptional customer service.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className="group p-8 bg-navy-light/50 rounded-lg border border-primary-foreground/10 hover:border-secondary/50 transition-all duration-300"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="w-14 h-14 bg-secondary/20 rounded-lg flex items-center justify-center mb-6 group-hover:bg-secondary/30 transition-colors">
                <feature.icon className="w-7 h-7 text-secondary" />
              </div>
              <h3 className="text-xl font-heading text-primary-foreground mb-3 uppercase">
                {feature.title}
              </h3>
              <p className="text-primary-foreground/70">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
