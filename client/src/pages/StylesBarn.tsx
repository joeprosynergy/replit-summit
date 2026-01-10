import { Helmet } from 'react-helmet-async';
import { Link, useLocation } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { cloudinaryImages } from '@/lib/cloudinary';
import barnCabin1 from '@/assets/barn-cabin-1.jpg';

// Storage options for Barn style
const storageOptions = [
  {
    id: 'economy',
    name: 'Economy',
    description: 'Our most economical storage building. Lowest cost per square foot.',
    features: ['Metal siding only', '5\' walls', '2 lofts & ladder included'],
    image: cloudinaryImages.economyShed3, // Barn style economy image (lofted)
    link: '/types/basic-storage/economy-shed'
  },
  {
    id: 'budget-pro-lofted-barn',
    name: 'Budget Pro',
    description: 'Classic barn styling at an affordable price.',
    features: ['6\'6" walls', '1 loft for storage', 'Double 36" doors w/ lock'],
    image: cloudinaryImages.budgetProLoftedBarn,
    link: '/types/basic-storage/budget-pro-lofted-barn'
  },
  {
    id: 'pro-lofted-barn',
    name: 'Pro',
    description: 'Our best seller — most versatile for all purposes.',
    features: ['6\'6" walls', '2 lofts & ladder', '3/4" Advantech flooring'],
    image: cloudinaryImages.proLoftedBarn,
    link: '/types/deluxe-storage-cabins/pro-lofted-barn'
  },
];

// Cabins & Tiny Homes for Barn style
const cabinOptions = [
  {
    id: 'barn-cabin',
    name: 'Lofted Cabin',
    description: 'Classic barn styling with dual lofts and covered porch.',
    features: ['Gambrel roof', '4\' deep porch with railing', 'Two lofts included'],
    image: barnCabin1,
    link: '/types/deluxe-storage-cabins/barn-cabin'
  },
];

// Garages & Carports for Barn style
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

// Other styles to show (excluding Barn since we're on that page)
const otherStyles = [
  {
    id: 'utility',
    name: 'Utility',
    subtitle: 'Traditional A-Frame Roof',
    image: cloudinaryImages.utilityShed3,
    link: '/styles/utility'
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

const StylesBarn = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <>
      <Helmet>
        <title>Barn Style Buildings | Summit Portable Buildings</title>
        <meta name="description" content="Explore our Barn style buildings with gambrel roofs. Choose from Economy, Budget Pro, Pro, Cabin, or Garage options." />
        <link rel="canonical" href="https://summitbuildings.com/styles/barn" />
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
              Barn Style
            </h1>
            <p className="text-xl text-primary-foreground/80 max-w-2xl mx-auto">
              Gambrel Roof — Maximum overhead storage with iconic barn appeal
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
              Design your perfect barn style building online in minutes
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

export default StylesBarn;
