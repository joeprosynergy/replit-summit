"use client";

import { useState, useEffect } from 'react';
import { Menu, X, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useOptionalAdminAuth } from '@/contexts/useOptionalAdminAuth';
import { useNavigationConfig } from '@/hooks/useNavigationConfig';
import HeaderEditable from '@/components/HeaderEditable';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const isHomePage = pathname === '/';
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

  // Show editable version for admins (only after config is loaded)
  if (isAdmin && !isLoading) {
    return (
      <HeaderEditable
        config={headerConfig}
        onSave={saveHeaderConfig}
        isSaving={isSaving}
      />
    );
  }

  // While CMS is loading, render a transparent placeholder that matches
  // the exact header dimensions. This prevents CLS (no layout shift)
  // and avoids showing a default header that might differ from the CMS version.
  if (isLoading) {
    return (
      <header
        className={`fixed top-0 left-0 right-0 z-50 ${
          hasDarkHero ? 'bg-transparent' : 'bg-card/95 backdrop-blur-md shadow-md'
        }`}
      >
        <div className="container-custom">
          <div className="flex items-center justify-between h-20" />
        </div>
      </header>
    );
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
          <Link href="/" className="flex items-center">
            <img
              src={headerConfig.logoImage}
              alt={headerConfig.logoAlt}
              width={129}
              height={98}
              fetchPriority="high"
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
                href={link.href}
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
            <Link href={headerConfig.ctaButtonLink}>
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
                  href={link.href}
                  className="px-4 py-3 text-foreground/80 hover:text-secondary hover:bg-muted transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <div className="px-4 pt-4 border-t border-border mt-4">
                <Link href={headerConfig.ctaButtonLink}>
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
