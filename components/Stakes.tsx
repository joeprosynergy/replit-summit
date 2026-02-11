"use client";

import { Package, Frown, ThumbsDown } from 'lucide-react';
import { InlineEditable } from '@/components/admin/InlineEditable';

interface StakesContent {
  tagline: string;
  heading: string;
  subheading: string;
  painPoints: Array<{
    title: string;
    description: string;
  }>;
  closingText: string;
}

interface StakesProps {
  content?: StakesContent;
  isEditMode?: boolean;
  onUpdateField?: <K extends keyof StakesContent>(field: K, value: StakesContent[K]) => void;
}

const defaultContent: StakesContent = {
  tagline: 'We Understand',
  heading: 'Running Out of Space is Frustrating',
  subheading: "You've got equipment, tools, and belongings piling up with nowhere to put them.",
  painPoints: [
    {
      title: 'Stuff Everywhere',
      description: "Your garage is packed. The basement is full. Expensive equipment sits outside getting damaged by weather.",
    },
    {
      title: 'Feeling Overwhelmed',
      description: "You're stressed about the clutter. Every time you look at the mess, you feel like you're falling behind.",
    },
    {
      title: 'Cheap Sheds Fall Apart',
      description: "You shouldn't have to choose between affordable and quality. Cookie-cutter box store sheds just don't last.",
    },
  ],
  closingText: 'You deserve a storage solution that actually works.',
};

const icons = [Package, Frown, ThumbsDown];

const Stakes = ({ content = defaultContent, isEditMode = false, onUpdateField }: StakesProps) => {
  const updatePainPoint = (index: number, field: 'title' | 'description', value: string) => {
    if (!onUpdateField) return;
    const newPainPoints = [...content.painPoints];
    newPainPoints[index] = { ...newPainPoints[index], [field]: value };
    onUpdateField('painPoints', newPainPoints);
  };

  return (
    <section className="section-padding bg-navy text-primary-foreground">
      <div className="container-custom">
        <div className="text-center mb-12">
          <InlineEditable
            value={content.tagline}
            fieldName="tagline"
            onChange={(v) => onUpdateField?.('tagline', v)}
            isEditMode={isEditMode}
            className="text-secondary font-heading uppercase tracking-widest mb-4 font-semibold"
            as="p"
          />
          <InlineEditable
            value={content.heading}
            fieldName="heading"
            onChange={(v) => onUpdateField?.('heading', v)}
            isEditMode={isEditMode}
            className="text-3xl md:text-4xl lg:text-5xl font-heading mb-6"
            as="h2"
          />
          <InlineEditable
            value={content.subheading}
            fieldName="subheading"
            onChange={(v) => onUpdateField?.('subheading', v)}
            isEditMode={isEditMode}
            className="text-lg text-primary-foreground/90 max-w-2xl mx-auto"
            as="p"
          />
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {content.painPoints.map((point, index) => {
            const Icon = icons[index] || Package;
            return (
              <div
                key={index}
                className="bg-primary-foreground/5 rounded-2xl p-8 text-center"
              >
                <div className="w-16 h-16 mx-auto mb-6 bg-secondary/20 rounded-2xl flex items-center justify-center">
                  <Icon className="w-8 h-8 text-secondary" />
                </div>
                <InlineEditable
                  value={point.title}
                  fieldName={`Pain point ${index + 1} title`}
                  onChange={(v) => updatePainPoint(index, 'title', v)}
                  isEditMode={isEditMode}
                  className="font-heading text-xl font-bold mb-3"
                  as="h3"
                />
                <InlineEditable
                  value={point.description}
                  fieldName={`Pain point ${index + 1} description`}
                  type="textarea"
                  onChange={(v) => updatePainPoint(index, 'description', v)}
                  isEditMode={isEditMode}
                  className="text-primary-foreground/80 leading-relaxed"
                  as="p"
                />
              </div>
            );
          })}
        </div>

        <InlineEditable
          value={content.closingText}
          fieldName="closing text"
          onChange={(v) => onUpdateField?.('closingText', v)}
          isEditMode={isEditMode}
          className="text-xl text-secondary font-semibold text-center"
          as="p"
        />
      </div>
    </section>
  );
};

export default Stakes;
