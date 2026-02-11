"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Plus, Save, Trash2, GripVertical } from 'lucide-react';
import { FooterConfig, FooterSection, NavLink } from '@/shared/navigationSchema';
import InlineEditableNavLink from '@/components/admin/InlineEditableNavLink';
import { InlineEditable } from '@/components/admin/InlineEditable';
import InventoryLink from '@/components/InventoryLink';

interface FooterEditableProps {
  config: FooterConfig;
  onSave: (config: FooterConfig) => Promise<void>;
  isSaving: boolean;
}

const FooterEditable = ({ config, onSave, isSaving }: FooterEditableProps) => {
  const [editedConfig, setEditedConfig] = useState<FooterConfig>(config);
  const [hasChanges, setHasChanges] = useState(false);

  useEffect(() => {
    setEditedConfig(config);
    setHasChanges(false);
  }, [config]);

  const handleConfigChange = (updates: Partial<FooterConfig>) => {
    setEditedConfig(prev => ({ ...prev, ...updates }));
    setHasChanges(true);
  };

  const handleSectionUpdate = (index: number, updatedSection: FooterSection) => {
    const newSections = [...editedConfig.sections];
    newSections[index] = updatedSection;
    handleConfigChange({ sections: newSections });
  };

  const handleSectionDelete = (index: number) => {
    const newSections = editedConfig.sections.filter((_, i) => i !== index);
    handleConfigChange({ sections: newSections });
  };

  const handleAddSection = () => {
    const newSection: FooterSection = {
      id: `section-${Date.now()}`,
      title: 'New Section',
      links: [],
    };
    handleConfigChange({ sections: [...editedConfig.sections, newSection] });
  };

  const handleLinkUpdate = (sectionIndex: number, linkIndex: number, updatedLink: NavLink) => {
    const newSections = [...editedConfig.sections];
    newSections[sectionIndex].links[linkIndex] = updatedLink;
    handleConfigChange({ sections: newSections });
  };

  const handleLinkDelete = (sectionIndex: number, linkIndex: number) => {
    const newSections = [...editedConfig.sections];
    newSections[sectionIndex].links = newSections[sectionIndex].links.filter((_, i) => i !== linkIndex);
    handleConfigChange({ sections: newSections });
  };

  const handleAddLink = (sectionIndex: number) => {
    const newSections = [...editedConfig.sections];
    const newLink: NavLink = {
      id: `link-${Date.now()}`,
      label: 'New Link',
      href: '/new-page',
      isRoute: true,
    };
    newSections[sectionIndex].links.push(newLink);
    handleConfigChange({ sections: newSections });
  };

  const handleSave = async () => {
    await onSave(editedConfig);
    setHasChanges(false);
  };

  return (
    <>
      {/* Admin Edit Bar */}
      {hasChanges && (
        <div className="fixed bottom-0 left-0 right-0 z-[60] bg-primary text-primary-foreground py-3 px-4 shadow-lg">
          <div className="container-custom flex items-center justify-between">
            <span className="text-sm font-medium">You have unsaved changes to the footer</span>
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

      <footer className="bg-navy-dark relative">
        {/* Edit Mode Indicator */}
        <div className="absolute top-2 right-2 z-10 text-xs bg-muted px-3 py-1 rounded-full text-muted-foreground">
          Footer Edit Mode
        </div>

        {/* Header Banner */}
        <div className="container-custom pt-16 pb-12">
          <h2 className="font-heading text-2xl md:text-3xl text-primary-foreground text-center uppercase tracking-wide">
            <InlineEditable
              value={editedConfig.bannerHeading}
              fieldName="bannerHeading"
              onChange={(val) => handleConfigChange({ bannerHeading: val })}
              isEditMode={true}
              as="span"
            />
          </h2>
        </div>

        {/* Main Footer Links */}
        <div className="container-custom pb-16">
          <div className="flex flex-wrap justify-center gap-12 lg:gap-16">
            {editedConfig.sections.map((section, sectionIndex) => (
              <div key={section.id} className="relative group">
                <div className="flex items-center gap-2 mb-4">
                  <GripVertical className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                  <h3 className="font-heading text-secondary text-sm uppercase tracking-wide">
                    <InlineEditable
                      value={section.title}
                      fieldName={`section-${sectionIndex}-title`}
                      onChange={(val) => {
                        const newSection = { ...section, title: val };
                        handleSectionUpdate(sectionIndex, newSection);
                      }}
                      isEditMode={true}
                      as="span"
                    />
                  </h3>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleSectionDelete(sectionIndex)}
                    className="h-6 w-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <Trash2 className="w-3 h-3 text-destructive" />
                  </Button>
                </div>
                <ul className="space-y-2">
                  {section.links.map((link, linkIndex) => (
                    <li key={link.id}>
                      <InlineEditableNavLink
                        link={link}
                        onUpdate={(updatedLink) => handleLinkUpdate(sectionIndex, linkIndex, updatedLink)}
                        onDelete={() => handleLinkDelete(sectionIndex, linkIndex)}
                        isEditMode={true}
                        showDragHandle={false}
                      >
                        {link.disabled ? (
                          <span className="text-primary-foreground/40 text-sm cursor-not-allowed">
                            {link.label}
                          </span>
                        ) : (
                          <Link
                            href={link.href}
                            className="text-primary-foreground/70 hover:text-primary-foreground text-sm transition-colors"
                          >
                            {link.label}
                          </Link>
                        )}
                      </InlineEditableNavLink>
                    </li>
                  ))}
                  <li>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleAddLink(sectionIndex)}
                      className="h-7 text-xs mt-2"
                    >
                      <Plus className="w-3 h-3 mr-1" />
                      Add Link
                    </Button>
                  </li>
                </ul>
              </div>
            ))}
            <div className="flex items-center">
              <Button
                variant="outline"
                onClick={handleAddSection}
                className="h-10"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Section
              </Button>
            </div>
          </div>
        </div>

        {/* Bottom CTA Section */}
        <div className="container-custom pb-16">
          <div className="text-center space-y-6">
            <p className="text-primary-foreground text-lg">
              <InlineEditable
                value={editedConfig.ctaHeading}
                fieldName="ctaHeading"
                onChange={(val) => handleConfigChange({ ctaHeading: val })}
                isEditMode={true}
                as="span"
              />
            </p>
            <div className="flex flex-col items-center gap-2">
              <InlineEditable
                value={editedConfig.ctaPhoneDisplay}
                fieldName="ctaPhoneDisplay"
                onChange={(val) => handleConfigChange({ ctaPhoneDisplay: val })}
                isEditMode={true}
                as="span"
                className="text-2xl md:text-3xl font-heading text-primary-foreground"
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
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <div className="flex flex-col items-center gap-1">
                <Button
                  variant="outline"
                  className="bg-primary-foreground border-border text-foreground hover:bg-primary-foreground/90 px-8"
                  asChild
                >
                  <InventoryLink>{editedConfig.button1Text}</InventoryLink>
                </Button>
                <InlineEditable
                  value={editedConfig.button1Text}
                  fieldName="button1Text"
                  onChange={(val) => handleConfigChange({ button1Text: val })}
                  isEditMode={true}
                  as="span"
                  className="text-xs text-muted-foreground"
                />
              </div>
              <div className="flex flex-col items-center gap-1">
                <Button
                  className="bg-secondary hover:bg-secondary/90 text-secondary-foreground px-8"
                  asChild
                >
                  <a href={editedConfig.button2Link} target="_blank" rel="noopener noreferrer">
                    {editedConfig.button2Text}
                  </a>
                </Button>
                <InlineEditable
                  value={editedConfig.button2Text}
                  fieldName="button2Text"
                  onChange={(val) => handleConfigChange({ button2Text: val })}
                  isEditMode={true}
                  as="span"
                  className="text-xs text-muted-foreground"
                />
                <InlineEditable
                  value={editedConfig.button2Link}
                  fieldName="button2Link"
                  onChange={(val) => handleConfigChange({ button2Link: val })}
                  isEditMode={true}
                  as="span"
                  className="text-xs text-muted-foreground"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Copyright Bar */}
        <div className="border-t border-primary-foreground/10">
          <div className="container-custom py-6">
            <p className="text-primary-foreground/50 text-sm text-center">
              <InlineEditable
                value={editedConfig.copyrightText}
                fieldName="copyrightText"
                onChange={(val) => handleConfigChange({ copyrightText: val })}
                isEditMode={true}
                as="span"
              />
            </p>
          </div>
        </div>
      </footer>
    </>
  );
};

export default FooterEditable;
