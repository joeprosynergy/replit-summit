import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { 
  Heart, 
  Star, 
  Shield, 
  Users, 
  HandHeart,
  Hammer,
  CheckCircle,
  ArrowRight
} from 'lucide-react';

const values = [
  {
    icon: Heart,
    title: 'Faith Based',
    description: "We believe in Someone Greater than ourselves. We promise to do all to the best of our ability and in an ethical manner from the sale to the delivery of your product.",
  },
  {
    icon: Star,
    title: 'Excellence',
    description: "We strive to be the best at what we do, leading the way to excellence. Customer Service and taking care of the people we serve is the key to a successful business.",
  },
  {
    icon: Shield,
    title: 'Responsibility',
    description: "We desire to operate to the highest ethical & professional standards. We strive to earn your trust through honesty and integrity.",
  },
  {
    icon: Users,
    title: 'Community',
    description: "We believe in playing our part in the community where we operate. We believe in being an asset to our local community.",
  },
  {
    icon: HandHeart,
    title: 'Team Work',
    description: "Teamwork and Diversity are the foundations of our success. From Builder to Sales Member to Delivery Driver, each one is a special part of the puzzle.",
  },
];

const buildingFeatures = [
  "40/Yr. Metal Roof available in 11 attractive colors",
  "Vented Ridge standard on all Pro Series Buildings",
  "2″x6″ floor joists set into notched 4″ x 6″ ground skids for added strength",
  "5/8\" tongue-and-groove floors w/ 3/4\" Optional",
  "Commercial Truss Plated Rafters for maximum strength",
  "50 Year Limited Warranty on LP Smart Siding",
  "25 Year Limited Warranty Paint",
  "Heavy Duty Barrel Bolts and Keyed Door Locks",
  "Diamond Plated Thresholds on all openings",
];

const serviceAreas = {
  missouri: "Arnold, Fenton, Festus, Crystal City, Pevely, Herculaneum, Bloomsdale, High Ridge, House Springs, Cedar Hill, Saint Clair, Pacific, Eureka, Sullivan, Cuba, Rolla, Salem, Farmington, Cape Girardeau, Sikeston, and many more...",
  illinois: "Metropolis, Joppa, Vienna, Dongola, Anna, Jonesboro, Cobden, Carbondale, Murphysboro, Chester, Red Bud, and surrounding areas.",
  kentucky: "Mayfield, Murray, Benton, Paducah, and surrounding communities.",
};

const AboutUs = () => {
  return (
    <>
      <Helmet>
        <title>About Us | Summit Portable Buildings</title>
        <meta
          name="description"
          content="Learn about Summit Portable Buildings - a faith-based, family-owned business committed to excellence in building quality storage structures the old fashioned way."
        />
        <meta property="og:title" content="About Us | Summit Portable Buildings" />
        <meta
          property="og:description"
          content="A family-owned business building quality storage structures with skilled craftsmen and old-fashioned values."
        />
        <link rel="canonical" href="https://summitbuildings.com/about-us" />
      </Helmet>

      <div className="min-h-screen">
        <Header />
        
        <main>
          {/* Hero Section */}
          <section className="pt-32 pb-20 bg-gradient-to-br from-navy via-navy-dark to-navy">
            <div className="container-custom">
              <div className="max-w-3xl">
                <p className="text-secondary font-heading text-lg uppercase tracking-widest mb-4">
                  About Summit Buildings
                </p>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading text-primary-foreground leading-tight mb-6">
                  Building Quality Structures <span className="text-secondary">The Old Fashioned Way</span>
                </h1>
                <p className="text-lg text-primary-foreground/80 max-w-2xl">
                  A family owned business that continues to strive for excellence & customer satisfaction.
                </p>
              </div>
            </div>
          </section>

          {/* Mission Statement */}
          <section className="section-padding bg-background">
            <div className="container-custom">
              <div className="max-w-4xl mx-auto text-center">
                <p className="text-secondary font-heading uppercase tracking-widest mb-4">
                  Our Mission
                </p>
                <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-6">
                  To Build Storage Structures That Serve Our Neighbors
                </h2>
                <p className="text-xl text-muted-foreground leading-relaxed">
                  We do this by building quality structures in our own shop, with customizable, high quality craftsmanship. 
                  Every building is constructed from the ground up—unlike factory-built buildings.
                </p>
              </div>
            </div>
          </section>

          {/* Family Owned + Guide Section */}
          <section className="section-padding bg-muted/30">
            <div className="container-custom">
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div>
                  <p className="text-secondary font-heading uppercase tracking-widest mb-4">
                    Family Owned
                  </p>
                  <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-6">
                    We Understand Your Storage Challenges
                  </h2>
                  <p className="text-muted-foreground leading-relaxed mb-6">
                    With experience in Construction & Sales, we incorporate that expertise into each of our products. 
                    We've been helping customers with solutions to their needs by customizing Backyard Portable Offices, 
                    Storage Sheds, Portable Garages, Utility Buildings, Lofted Barns and Cabins, Tiny House Shells, and other styles.
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    We construct various attractive, affordable, quality, hand-crafted, and durable Storage Buildings 
                    the old fashioned way—built from the ground up with care and attention to detail.
                  </p>
                </div>
                <div className="bg-gradient-to-br from-primary/10 to-secondary/10 rounded-2xl p-8 lg:p-12">
                  <div className="flex items-center gap-4 mb-6">
                    <Hammer className="w-12 h-12 text-primary" />
                    <h3 className="font-heading text-2xl font-bold text-foreground">
                      The Old Fashioned Way
                    </h3>
                  </div>
                  <p className="text-muted-foreground leading-relaxed">
                    Unlike factory-built buildings, we construct each structure from the ground up with skilled craftsmen 
                    who take pride in their work. Quality you can trust, built to last.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Our Values */}
          <section className="section-padding bg-background">
            <div className="container-custom">
              <div className="text-center mb-16">
                <p className="text-secondary font-heading uppercase tracking-widest mb-4">
                  What We Stand For
                </p>
                <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
                  Our Values
                </h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  The principles that guide everything we do
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {values.map((value) => (
                  <div
                    key={value.title}
                    className="bg-card rounded-2xl p-8 shadow-lg border border-border/50 hover:border-primary/30 hover:shadow-xl transition-all duration-300"
                  >
                    <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mb-6">
                      <value.icon className="w-7 h-7 text-primary" />
                    </div>
                    <h3 className="font-heading text-xl font-bold text-foreground mb-3">
                      {value.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {value.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Craftsmen & Features */}
          <section className="section-padding bg-navy text-primary-foreground">
            <div className="container-custom">
              <div className="max-w-3xl mx-auto text-center mb-12">
                <p className="text-secondary font-heading uppercase tracking-widest mb-4">
                  Quality Materials
                </p>
                <h2 className="font-heading text-3xl md:text-4xl font-bold mb-6">
                  Skilled Craftsmen, Premium Products
                </h2>
                <p className="text-primary-foreground/80 leading-relaxed">
                  All of our buildings are built by skilled and experienced craftsmen. We are continually researching 
                  new and improved products to continue bringing our customers a quality building that is in fact 
                  the best money can buy: a Summit Building!
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {buildingFeatures.map((feature, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-3 bg-primary-foreground/5 rounded-lg p-4"
                  >
                    <CheckCircle className="w-5 h-5 text-secondary flex-shrink-0 mt-0.5" />
                    <span className="text-primary-foreground/90 text-sm leading-relaxed">
                      {feature}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Service Areas */}
          <section className="section-padding bg-background">
            <div className="container-custom">
              <div className="text-center mb-12">
                <p className="text-secondary font-heading uppercase tracking-widest mb-4">
                  Where We Serve
                </p>
                <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4">
                  Service Areas
                </h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  Proudly serving communities across Missouri, Illinois, and Kentucky
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-8">
                <div className="bg-card rounded-2xl p-6 border border-border/50">
                  <h3 className="font-heading text-xl font-bold text-foreground mb-4 flex items-center gap-2">
                    <span className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-sm font-bold text-primary">MO</span>
                    Missouri
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {serviceAreas.missouri}
                  </p>
                </div>
                <div className="bg-card rounded-2xl p-6 border border-border/50">
                  <h3 className="font-heading text-xl font-bold text-foreground mb-4 flex items-center gap-2">
                    <span className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-sm font-bold text-primary">IL</span>
                    Illinois
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {serviceAreas.illinois}
                  </p>
                </div>
                <div className="bg-card rounded-2xl p-6 border border-border/50">
                  <h3 className="font-heading text-xl font-bold text-foreground mb-4 flex items-center gap-2">
                    <span className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-sm font-bold text-primary">KY</span>
                    Kentucky
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {serviceAreas.kentucky}
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* CTA */}
          <section className="section-padding bg-gradient-to-r from-secondary to-primary">
            <div className="container-custom text-center">
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
                Ready to Get Started?
              </h2>
              <p className="text-primary-foreground/90 text-lg mb-8 max-w-2xl mx-auto">
                Contact us today for a free, no-obligation quote on your dream building.
              </p>
              <Link to="/contact-us">
                <Button variant="heroOutline" size="xl" className="bg-primary-foreground text-foreground hover:bg-primary-foreground/90">
                  Get Your Free Quote
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </Link>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default AboutUs;
