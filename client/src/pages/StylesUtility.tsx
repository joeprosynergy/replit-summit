import { Helmet } from 'react-helmet-async';
import { Link, useLocation } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { cloudinaryImages } from '@/lib/cloudinary';

// Storage options for Utility style
const storageOptions = [
  {
    id: 'economy',
    name: 'Economy',
    description: 'Our most economical storage building. Lowest cost per square foot.',
    features: ['Metal siding only', '6\'6" walls', 'Double 36" or single 48" door'],
    image: cloudinaryImages.economy,
    link: '/types/basic-storage/economy-shed'
  },
  {
    id: 'budget-pro-utility',
    name: 'Budget Pro',
    description: 'Maximum headroom at an affordable price.',
    features: ['7\'9" walls', 'Double 36" doors w/ lock', '5/8" subfloor'],
    image: cloudinaryImages.budgetProUtility,
    link: '/types/basic-storage/budget-pro-utility'
  },
  {
    id: 'pro-utility',
    name: 'Pro',
    description: 'Premium quality with superior workmanship.',
    features: ['7\'9" walls', '3/4" Advantech flooring', 'Moisture barrier & drip edge'],
    image: cloudinaryImages.proUtility,
    link: '/types/deluxe-storage-cabins/pro-utility-shed'
  },
];

// Cabins & Tiny Homes for Utility style
const cabinOptions = [
  {
    id: 'cabin',
    name: 'Cabin',
    description: 'Perfect for lake lots, hunting cabins, or tiny homes.',
    features: ['7/12 pitch roof', '6\' treated wood porch', 'LED lighting & electrical'],
    image: cloudinaryImages.cabinShed,
    link: '/types/deluxe-storage-cabins/cabin'
  },
];

// Garages & Carports for Utility style
const garageOptions = [
  {
    id: 'garage',
    name: 'Garage',
    description: 'Built to handle vehicle weight with easy access.',
    features: ['9\'x7\' insulated overhead door', '7\'9" walls', 'Floor joists 12" OC'],
    image: cloudinaryImages.garage,
    link: '/types/garages-carports/garage'
  },
  {
    id: 'carport',
    name: 'Carport',
    description: 'Steel protection from sun, rain, and wind.',
    features: ['Heavy-duty steel frame', 'Multiple size options', 'Hurricane rated'],
    image: cloudinaryImages.carport,
    link: '/types/garages-carports/carports'
  },
];

// Other styles to show (excluding Utility since we're on that page)
const otherStyles = [
  {
    id: 'barn',
    name: 'Barn',
    subtitle: 'Gambrel Roof',
    image: cloudinaryImages.sideLoftedBarn4,
    link: '/styles/barn'
  },
  {
    id: 'modern',
    name: 'Modern',
    subtitle: 'Single Slope Roof',
    image: cloudinaryImages.modernShed,
    link: '/styles/modern'
  },
  {
    id: 'greenhouse',
    name: 'Greenhouse',
    subtitle: 'Grow Year-Round',
    image: cloudinaryImages.greenhouse1,
    link: '/styles/greenhouse'
  },
  {
    id: 'animal-shelters',
    name: 'Animal Shelters',
    subtitle: 'Kennels & Coops',
    image: cloudinaryImages.animalShelter1,
    link: '/styles/animal-shelters'
  },
];

interface OptionCardProps {
  option: {
    id: string;
    name: string;
    description: string;
    features: string[];
    image: string;
    link: string;
  };
  currentPath: string;
}

const OptionCard = ({ option, currentPath }: OptionCardProps) => (
  <Link
    to={option.link}
    state={{ from: currentPath }}
    className="group bg-muted/30 rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
  >
    <div className="aspect-[4/3] overflow-hidden bg-muted">
      <img
        src={option.image}
        alt={option.name}
        className="w-full h-full transition-transform duration-300 group-hover:scale-105 object-contain bg-muted"
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
              <span className="w-1 h-1 bg-secondary rounded-full flex-shrink-0"></span>
              {feature}
            </li>
          ))}
        </ul>
      </div>
    </div>
  </Link>
);

const StylesUtility = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <>
      <Helmet>
        <title>Utility Style Buildings | Summit Portable Buildings</title>
        <meta name="description" content="Explore our Utility style buildings with traditional A-frame roofs. Choose from Economy, Budget Pro, Pro, Cabin, Garage, or Carport options." />
        <link rel="canonical" href="https://summitbuildings.com/styles/utility" />
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
              Utility Style
            </h1>
            <p className="text-xl text-primary-foreground/80 max-w-2xl mx-auto">
              Traditional A-Frame Roof — Classic design with timeless appeal
            </p>
          </div>
        </section>

        {/* Storage Section */}
        <section className="bg-background py-16 md:py-24">
          <div className="container-custom">
            <div className="bg-card rounded-lg shadow-lg overflow-hidden">
              <div className="bg-primary py-5 px-6">
                <h2 className="text-2xl md:text-3xl font-heading font-bold text-primary-foreground text-center uppercase tracking-wide">
                  Storage
                </h2>
              </div>
              <div className="p-6 md:p-10">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
                  {storageOptions.map((option) => (
                    <OptionCard key={option.id} option={option} currentPath={currentPath} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Cabins & Tiny Homes Section */}
        <section className="bg-muted/30 py-16 md:py-24">
          <div className="container-custom">
            <div className="bg-card rounded-lg shadow-lg overflow-hidden">
              <div className="bg-primary py-5 px-6">
                <h2 className="text-2xl md:text-3xl font-heading font-bold text-primary-foreground text-center uppercase tracking-wide">
                  Cabins & Tiny Homes
                </h2>
              </div>
              <div className="p-6 md:p-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-2xl mx-auto">
                  {cabinOptions.map((option) => (
                    <OptionCard key={option.id} option={option} currentPath={currentPath} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Garages & Carports Section */}
        <section className="bg-background py-16 md:py-24">
          <div className="container-custom">
            <div className="bg-card rounded-lg shadow-lg overflow-hidden">
              <div className="bg-primary py-5 px-6">
                <h2 className="text-2xl md:text-3xl font-heading font-bold text-primary-foreground text-center uppercase tracking-wide">
                  Garages & Carports
                </h2>
              </div>
              <div className="p-6 md:p-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-2xl mx-auto">
                  {garageOptions.map((option) => (
                    <OptionCard key={option.id} option={option} currentPath={currentPath} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Looking for Something Different Section */}
        <section className="bg-muted/30 py-16 md:py-24">
          <div className="container-custom">
            <div className="bg-card rounded-lg shadow-lg overflow-hidden">
              <div className="bg-primary py-5 px-6">
                <h2 className="text-2xl md:text-3xl font-heading font-bold text-primary-foreground text-center uppercase tracking-wide">
                  Looking for Something Different?
                </h2>
              </div>
              <div className="p-6 md:p-10">
                <p className="text-muted-foreground text-center mb-8 max-w-2xl mx-auto">
                  Explore our other building styles to find the perfect fit for your needs.
                </p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
                  {otherStyles.map((style) => (
                    <Link
                      key={style.id}
                      to={style.link}
                      className="group text-center"
                    >
                      <div className="aspect-square mb-4 overflow-hidden rounded-lg shadow-sm bg-muted">
                        <img
                          src={style.image}
                          alt={style.name}
                          className="w-full h-full transition-transform duration-300 group-hover:scale-105 object-contain bg-muted"
                        />
                      </div>
                      <h3 className="font-heading font-bold text-lg text-foreground group-hover:text-secondary transition-colors uppercase tracking-wide">
                        {style.name}
                      </h3>
                      <p className="text-muted-foreground text-sm mt-1">
                        {style.subtitle}
                      </p>
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
              Design your perfect utility building online in minutes
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

export default StylesUtility;
