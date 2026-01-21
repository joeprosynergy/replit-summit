import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import InventoryLink from '@/components/InventoryLink';

const Footer = () => {
  const links = {
    exploreByUse: [
      { label: 'Basic Storage', href: '/types/basic-storage' },
      { label: 'Deluxe & Cabins', href: '/types/deluxe-storage-cabins' },
      { label: 'Garages & Carports', href: '/types/garages-carports' },
      { label: 'Greenhouse', href: '/styles/greenhouse' },
      { label: 'Animal Shelters', href: '/styles/animal-shelters' },
    ],
    exploreByStyle: [
      { label: 'Utility (Traditional A-Frame)', href: '/styles/utility' },
      { label: 'Barn (Gambrel Roof)', href: '/styles/barn' },
      { label: 'Modern (Single Slope)', href: '/styles/modern' },
      { label: 'Custom Sheds', href: '#', disabled: true },
      { label: 'Wooden Sheds', href: '#', disabled: true },
      { label: 'Metal Sheds', href: '#', disabled: true },
      { label: 'Backyard Sheds', href: '#', disabled: true },
    ],
    resources: [
      { label: "FAQ's", href: '/contact-us#faq' },
      { label: 'Buyers Guide', href: '/buyers-guide' },
      { label: 'Gallery', href: '/gallery' },
      { label: 'Financing', href: '/financing' },
      { label: 'Rent-to-Own', href: '/financing#rent-to-own' },
      { label: 'Warranty Info', href: '#', disabled: true },
    ],
    about: [
      { label: 'Home', href: '/' },
      { label: 'About Us', href: '/about-us' },
      { label: 'Blog', href: 'https://summitbuildings.superblog.click', external: true },
      { label: 'Contact', href: '/contact-us' },
      { label: 'Privacy Policy', href: '/privacy-policy' },
    ],
    locations: [
      { label: 'Missouri', href: '/#locations' },
      { label: 'Illinois', href: '/#locations' },
      { label: 'Kentucky', href: '/#locations' },
      { label: 'Arkansas', href: '/#locations' },
    ],
  };

  return (
    <footer className="bg-navy-dark">
      {/* Header Banner */}
      <div className="container-custom pt-16 pb-12">
        <h2 className="font-heading text-2xl md:text-3xl text-primary-foreground text-center uppercase tracking-wide">
          Find Your Perfect Portable Building Today
        </h2>
      </div>

      {/* Main Footer Links */}
      <div className="container-custom pb-16">
        <div className="flex flex-wrap justify-center gap-12 lg:gap-16">
          {/* Explore by Use */}
          <div>
            <h3 className="font-heading text-secondary text-sm uppercase mb-4 tracking-wide">
              Explore by Use
            </h3>
            <ul className="space-y-2">
              {links.exploreByUse.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.href}
                    className="text-primary-foreground/70 hover:text-primary-foreground text-sm transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Explore by Style */}
          <div>
            <h3 className="font-heading text-secondary text-sm uppercase mb-4 tracking-wide">
              Explore by Style
            </h3>
            <ul className="space-y-2">
              {links.exploreByStyle.map((link) => (
                <li key={link.label}>
                  {link.disabled ? (
                    <span className="text-primary-foreground/40 text-sm cursor-not-allowed">
                      {link.label}
                    </span>
                  ) : (
                    <Link
                      to={link.href}
                      className="text-primary-foreground/70 hover:text-primary-foreground text-sm transition-colors"
                    >
                      {link.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="font-heading text-secondary text-sm uppercase mb-4 tracking-wide">
              Resources
            </h3>
            <ul className="space-y-2">
              {links.resources.map((link) => (
                <li key={link.label}>
                  {link.disabled ? (
                    <span className="text-primary-foreground/40 text-sm cursor-not-allowed">
                      {link.label}
                    </span>
                  ) : (
                    <Link
                      to={link.href}
                      className="text-primary-foreground/70 hover:text-primary-foreground text-sm transition-colors"
                    >
                      {link.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* About */}
          <div>
            <h3 className="font-heading text-secondary text-sm uppercase mb-4 tracking-wide">
              About
            </h3>
            <ul className="space-y-2">
              {links.about.map((link) => (
                <li key={link.label}>
                  {link.external ? (
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary-foreground/70 hover:text-primary-foreground text-sm transition-colors"
                    >
                      {link.label}
                    </a>
                  ) : (
                    <Link
                      to={link.href}
                      className="text-primary-foreground/70 hover:text-primary-foreground text-sm transition-colors"
                    >
                      {link.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Where We Deliver */}
          <div>
            <h3 className="font-heading text-secondary text-sm uppercase mb-4 tracking-wide">
              Where We Deliver
            </h3>
            <ul className="space-y-2">
              {links.locations.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.href}
                    className="text-primary-foreground/70 hover:text-primary-foreground text-sm transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom CTA Section */}
      <div className="container-custom pb-16">
        <div className="text-center space-y-6">
          <p className="text-primary-foreground text-lg">
            Get the building of your dreams
          </p>
          <a href="tel:5737474700" className="text-primary-foreground text-2xl md:text-3xl font-heading hover:text-secondary transition-colors">
            (573) 747-4700
          </a>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Button
              variant="outline"
              className="bg-primary-foreground border-border text-foreground hover:bg-primary-foreground/90 px-8"
              asChild
            >
              <InventoryLink>Browse Inventory</InventoryLink>
            </Button>
            <Button
              className="bg-secondary hover:bg-secondary/90 text-secondary-foreground px-8"
              asChild
            >
              <a href="https://summitbuildings.shedpro.co/" target="_blank" rel="noopener noreferrer">Design Now</a>
            </Button>
          </div>
        </div>
      </div>

      {/* Copyright Bar */}
      <div className="border-t border-primary-foreground/10">
        <div className="container-custom py-6">
          <p className="text-primary-foreground/50 text-sm text-center">
            © {new Date().getFullYear()} Summit Portable Buildings. All rights reserved. Built in the USA with pride.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
