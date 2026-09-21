"use client";

import { useState, useEffect } from 'react';
import { Menu, X, Save } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { HeaderConfig } from '@/shared/navigationSchema';
import { resolveHeaderConfig } from '@/shared/resolveHeaderConfig';
import HeaderNavLinks from '@/components/HeaderNavLinks';
import { InlineEditable } from '@/components/admin/InlineEditable';
import InlineEditableImage from '@/components/admin/InlineEditableImage';

interface HeaderEditableProps {
  config: HeaderConfig;
  onSave: (config: HeaderConfig) => Promise<void>;
  isSaving: boolean;
}

const HeaderEditable = ({ config, onSave, isSaving }: HeaderEditableProps) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [editedConfig, setEditedConfig] = useState<HeaderConfig>(resolveHeaderConfig(config));
  const [hasChanges, setHasChanges] = useState(false);
  const pathname = usePathname();
  const isHomePage = pathname === '/';
  
  const hasDarkHero = isHomePage;
  const useLightText = hasDarkHero && !isScrolled;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setEditedConfig(resolveHeaderConfig(config));
    setHasChanges(false);
  }, [config]);

  const handleConfigChange = (updates: Partial<HeaderConfig>) => {
    setEditedConfig(prev => ({ ...prev, ...updates }));
    setHasChanges(true);
  };

  const navLinks = resolveHeaderConfig(editedConfig).navLinks;

  const handleSave = async () => {
    await onSave(editedConfig);
    setHasChanges(false);
  };

  return (
    <>
      {/* Admin Edit Bar */}
      {hasChanges && (
        <div className="fixed top-0 left-0 right-0 z-[60] bg-primary text-primary-foreground py-2 px-4 shadow-lg">
          <div className="container-custom flex items-center justify-between">
            <span className="text-sm font-medium">You have unsaved changes to the header</span>
            <Button
              size="sm"
              variant="secondary"
              onClick={handleSave}
              disabled={isSaving}
            >
              <Save className="w-4 h-4 mr-2" />
              {isSaving ? 'Saving...' : 'Save Changes'}
            </Button>
          </div>
        </div>
      )}

      <header
        className={`fixed ${hasChanges ? 'top-10' : 'top-0'} left-0 right-0 z-50 transition-all duration-300 ${
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
            <div className="flex items-center gap-2">
              <Link href="/" className="flex items-center">
                <InlineEditableImage
                  src={editedConfig.logoImage}
                  alt={editedConfig.logoAlt}
                  onImageChange={(url) => handleConfigChange({ logoImage: url })}
                  isEditMode={true}
                  imageClassName={`h-12 w-auto transition-all duration-300 ${
                    useLightText ? 'brightness-0 invert' : ''
                  }`}
                />
              </Link>
              <div className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded">
                Edit Mode
              </div>
            </div>

            {/* Desktop Navigation — structure v2 (code defaults); logo/CTA editable below */}
            <nav className="hidden lg:flex items-center gap-6">
              <HeaderNavLinks navLinks={navLinks} useLightText={useLightText} variant="desktop" />
            </nav>

            {/* CTA Buttons */}
            <div className="hidden lg:flex items-center gap-4">
              <div className="flex flex-col items-end gap-1">
                <InlineEditable
                  value={editedConfig.ctaPhoneDisplay}
                  fieldName="ctaPhoneDisplay"
                  onChange={(val) => handleConfigChange({ ctaPhoneDisplay: val })}
                  isEditMode={true}
                  as="span"
                  className={`text-sm font-semibold ${
                    useLightText ? 'text-primary-foreground' : 'text-foreground'
                  }`}
                />
                <InlineEditable
                  value={editedConfig.ctaPhone}
                  fieldName="ctaPhone"
                  onChange={(val) => handleConfigChange({ ctaPhone: val })}
                  isEditMode={true}
                  as="span"
                  className="text-xs text-muted-foreground"
                />
              </div>
              <div className="flex flex-col items-center gap-1">
                <InlineEditable
                  value={editedConfig.ctaButtonText}
                  fieldName="ctaButtonText"
                  onChange={(val) => handleConfigChange({ ctaButtonText: val })}
                  isEditMode={true}
                  as="span"
                  className="text-xs"
                />
                <InlineEditable
                  value={editedConfig.ctaButtonLink}
                  fieldName="ctaButtonLink"
                  onChange={(val) => handleConfigChange({ ctaButtonLink: val })}
                  isEditMode={true}
                  as="span"
                  className="text-xs text-muted-foreground"
                />
              </div>
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
              <nav className="flex flex-col py-2">
                <HeaderNavLinks
                  navLinks={navLinks}
                  useLightText={false}
                  variant="mobile"
                  onNavigate={() => setIsMobileMenuOpen(false)}
                />
              </nav>
            </div>
          )}
        </div>
      </header>
    </>
  );
};

export default HeaderEditable;
