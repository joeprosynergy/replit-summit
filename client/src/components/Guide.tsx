import { Home, Hammer, Shield, Heart } from 'lucide-react';

const stats = [
  { value: '8+', label: 'Years Experience' },
  { value: '4', label: 'States Served' },
  { value: '1000+', label: 'Buildings Delivered' },
  { value: '5', label: 'Year Warranty' },
];

const credentials = [
  { icon: Home, label: 'Family Owned', sublabel: 'Since 2016' },
  { icon: Hammer, label: 'Hand-Crafted', sublabel: 'USA Built' },
  { icon: Shield, label: '5-Year Warranty', sublabel: 'LP SmartSide' },
  { icon: Heart, label: 'Faith Based', sublabel: 'Values Driven' },
];

const Guide = () => {
  return (
    <section className="section-padding bg-background">
      <div className="container-custom">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-secondary font-heading uppercase tracking-widest mb-4">
              Your Guide
            </p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading text-foreground mb-6">
              We've Helped Hundreds of Families Get Organized
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-4">
              <strong className="text-foreground">We get it.</strong>
            </p>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Finding quality storage that fits your property and budget feels impossible. Big box stores sell junk that falls apart. Custom builds cost a fortune.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-6">
              We're <strong className="text-foreground">Summit Portable Buildings</strong>, a family-owned company that's been building storage solutions the right way since 2016. We've helped over 1,000 families across four states get the space they need without the headaches.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-8">
              Every building is hand-crafted by skilled craftsmen right here in the USA using premium materials that last for generations, not years.
            </p>
            
            {/* Stats */}
            <div className="grid grid-cols-4 gap-4 mb-8">
              {stats.map((stat) => (
                <div key={stat.label} className="text-center">
                  <p className="text-3xl md:text-4xl font-heading text-primary font-bold">{stat.value}</p>
                  <p className="text-xs text-muted-foreground">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
          
          {/* Credentials */}
          <div className="grid grid-cols-2 gap-4">
            {credentials.map((cred) => (
              <div 
                key={cred.label} 
                className="bg-gradient-to-br from-primary/5 to-secondary/5 rounded-2xl p-6 text-center"
              >
                <div className="w-12 h-12 mx-auto mb-4 bg-primary/10 rounded-xl flex items-center justify-center">
                  <cred.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-heading text-foreground font-bold mb-1">{cred.label}</h3>
                <p className="text-sm text-muted-foreground">{cred.sublabel}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Guide;
