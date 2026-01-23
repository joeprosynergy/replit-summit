import { useState, useEffect } from 'react';
import { Menu, X, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link, useLocation } from 'react-router-dom';
import { useOptionalAdminAuth } from '@/contexts/useOptionalAdminAuth';
import { useNavigationConfig } from '@/hooks/useNavigationConfig';
import HeaderEditable from '@/components/HeaderEditable';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const isHomePage = location.pathname === '/';
  const { isAdmin } = useOptionalAdminAuth();
  const { headerConfig, isLoading, saveHeaderConfig, isSaving } = useNavigationConfig();
  
  // Pages with dark hero sections (need light text when not scrolled)
  const hasDarkHero = isHomePage;
  
  // Determine if we should use light text (for dark backgrounds)
  const useLightText = hasDarkHero && !isScrolled;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Show editable version for admins
  if (isAdmin && !isLoading) {
    return (
      <HeaderEditable
        config={headerConfig}
        onSave={saveHeaderConfig}
        isSaving={isSaving}
      />
    );
  }

  // Show loading state
  if (isLoading) {
    return null; // or a loading skeleton
  }

  const navLinks = headerConfig.navLinks;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-card/95 backdrop-blur-md shadow-md'
          : hasDarkHero
            ? 'bg-transparent'
            : 'bg-card/95 backdrop-blur-md shadow-md'
      }`}
    >
      <div className="container-custom">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <img
              src={headerConfig.logoImage}
              alt={headerConfig.logoAlt}
              width={129}
              height={98}
              className={`h-14 w-auto transition-all duration-300 ${
                useLightText ? 'brightness-0 invert' : ''
              }`}
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                state={link.href === '/inventory' ? { from: location.pathname } : undefined}
                className={`font-medium transition-colors duration-200 ${
                  useLightText
                    ? 'text-primary-foreground/90 hover:text-secondary-foreground'
                    : 'text-foreground/80 hover:text-secondary'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* CTA Buttons */}
          <div className="hidden lg:flex items-center gap-4">
            <a
              href={headerConfig.ctaPhone}
              className={`flex items-center gap-2 font-semibold ${
                useLightText ? 'text-primary-foreground' : 'text-foreground'
              }`}
            >
              <Phone className="w-4 h-4" />
              <span>{headerConfig.ctaPhoneDisplay}</span>
            </a>
            <Link to={headerConfig.ctaButtonLink} state={{ from: location.pathname }}>
              <Button variant="hero" size="lg">
                {headerConfig.ctaButtonText}
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <X className={`w-6 h-6 ${useLightText ? 'text-primary-foreground' : 'text-foreground'}`} />
            ) : (
              <Menu className={`w-6 h-6 ${useLightText ? 'text-primary-foreground' : 'text-foreground'}`} />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden bg-card border-t border-border animate-fade-in">
            <nav className="flex flex-col py-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  state={link.href === '/inventory' ? { from: location.pathname } : undefined}
                  className="px-4 py-3 text-foreground/80 hover:text-secondary hover:bg-muted transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <div className="px-4 pt-4 border-t border-border mt-4">
                <Link to={headerConfig.ctaButtonLink} state={{ from: location.pathname }}>
                  <Button variant="hero" size="lg" className="w-full">
                    {headerConfig.ctaButtonText}
                  </Button>
                </Link>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
