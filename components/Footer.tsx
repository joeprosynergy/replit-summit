"use client";

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import InventoryLink from '@/components/InventoryLink';
import { useOptionalAdminAuth } from '@/contexts/useOptionalAdminAuth';
import { useNavigationConfig } from '@/hooks/useNavigationConfig';
import type { FooterConfig } from '@/shared/navigationSchema';
import FooterEditable from '@/components/FooterEditable';

interface FooterProps {
  serverConfig?: FooterConfig | null;
}

const Footer = ({ serverConfig }: FooterProps = {}) => {
  const { isAdmin } = useOptionalAdminAuth();
  const { footerConfig, isLoading, saveFooterConfig, isSaving } = useNavigationConfig({
    initialFooterConfig: serverConfig,
  });

  // Show editable version for admins (only after config is loaded)
  if (isAdmin && !isLoading) {
    return (
      <FooterEditable
        config={footerConfig}
        onSave={saveFooterConfig}
        isSaving={isSaving}
      />
    );
  }

  return (
    <footer className="bg-navy-dark">
      {/* Header Banner */}
      <div className="container-custom pt-16 pb-12">
        <h2 className="font-heading text-2xl md:text-3xl text-primary-foreground text-center uppercase tracking-wide">
          {footerConfig.bannerHeading}
        </h2>
      </div>

      {/* Main Footer Links */}
      <div className="container-custom pb-16">
        <div className="flex flex-wrap justify-center gap-12 lg:gap-16">
          {footerConfig.sections.map((section) => (
            <div key={section.id}>
              <h3 className="font-heading text-secondary text-sm uppercase mb-4 tracking-wide">
                {section.title}
              </h3>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.id}>
                    {link.disabled ? (
                      <span className="text-primary-foreground/40 text-sm cursor-not-allowed">
                        {link.label}
                      </span>
                    ) : link.isExternal ? (
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
                        href={link.href}
                        className="text-primary-foreground/70 hover:text-primary-foreground text-sm transition-colors"
                      >
                        {link.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom CTA Section */}
      <div className="container-custom pb-16">
        <div className="text-center space-y-6">
          <p className="text-primary-foreground text-lg">
            {footerConfig.ctaHeading}
          </p>
          <a href={footerConfig.ctaPhone} className="text-primary-foreground text-2xl md:text-3xl font-heading hover:text-secondary transition-colors">
            {footerConfig.ctaPhoneDisplay}
          </a>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Button
              variant="outline"
              className="bg-primary-foreground border-border text-foreground hover:bg-primary-foreground/90 px-8"
              asChild
            >
              <InventoryLink>{footerConfig.button1Text}</InventoryLink>
            </Button>
            <Button
              className="bg-secondary hover:bg-secondary/90 text-secondary-foreground px-8"
              asChild
            >
              <a href={footerConfig.button2Link} target={footerConfig.button2IsExternal ? "_blank" : undefined} rel={footerConfig.button2IsExternal ? "noopener noreferrer" : undefined}>
                {footerConfig.button2Text}
              </a>
            </Button>
          </div>
        </div>
      </div>

      {/* Copyright Bar */}
      <div className="border-t border-primary-foreground/10">
        <div className="container-custom py-6">
          <p className="text-primary-foreground/50 text-sm text-center">
            {footerConfig.copyrightText}
            {' '}Website by <a href="https://plyntr.com" target="_blank" rel="noopener noreferrer" className="underline hover:text-primary-foreground/70 transition-colors">Plyntr, LLC</a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
