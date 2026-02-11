"use client";

import { 
  Car, 
  Shield, 
  Wrench, 
  TrendingUp, 
  Lock,
  Clock
} from 'lucide-react';
import { InlineEditable } from '@/components/admin/InlineEditable';

interface ImagineContent {
  tagline: string;
  heading: string;
  subheading: string;
  benefits: string[];
}

interface ImagineProps {
  content?: ImagineContent;
  isEditMode?: boolean;
  onUpdateField?: <K extends keyof ImagineContent>(field: K, value: ImagineContent[K]) => void;
}

const defaultContent: ImagineContent = {
  tagline: 'Imagine This',
  heading: 'What Life Looks Like With the Right Storage',
  subheading: "Picture walking into your garage and actually having room. Your lawn equipment has a home. Your tools are organized. Everything has its place.",
  benefits: [
    'A clean, organized garage you can actually park in',
    'Expensive tools and equipment protected from weather',
    'A dedicated workshop or hobby space of your own',
    'Increased property value with an attractive building',
    'Peace of mind knowing your belongings are secure',
    'A building that will last for decades, not years',
  ],
};

const icons = [Car, Shield, Wrench, TrendingUp, Lock, Clock];

const Imagine = ({ content = defaultContent, isEditMode = false, onUpdateField }: ImagineProps) => {
  const updateBenefit = (index: number, value: string) => {
    if (!onUpdateField) return;
    const newBenefits = [...content.benefits];
    newBenefits[index] = value;
    onUpdateField('benefits', newBenefits);
  };

  return (
    <section className="section-padding bg-muted/30">
      <div className="container-custom">
        <div className="text-center mb-12">
          <InlineEditable
            value={content.tagline}
            fieldName="tagline"
            onChange={(v) => onUpdateField?.('tagline', v)}
            isEditMode={isEditMode}
            className="text-secondary font-heading uppercase tracking-widest mb-4"
            as="p"
          />
          <InlineEditable
            value={content.heading}
            fieldName="heading"
            onChange={(v) => onUpdateField?.('heading', v)}
            isEditMode={isEditMode}
            className="text-3xl md:text-4xl lg:text-5xl font-heading text-foreground mb-6"
            as="h2"
          />
          <InlineEditable
            value={content.subheading}
            fieldName="subheading"
            type="textarea"
            onChange={(v) => onUpdateField?.('subheading', v)}
            isEditMode={isEditMode}
            className="text-lg text-muted-foreground max-w-2xl mx-auto"
            as="p"
          />
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {content.benefits.map((benefit, index) => {
            const Icon = icons[index] || Car;
            return (
              <div
                key={index}
                className="flex items-center gap-4 bg-card rounded-xl p-5 border border-border/50"
              >
                <div className="w-12 h-12 bg-secondary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Icon className="w-6 h-6 text-secondary" />
                </div>
                <InlineEditable
                  value={benefit}
                  fieldName={`Benefit ${index + 1}`}
                  onChange={(v) => updateBenefit(index, v)}
                  isEditMode={isEditMode}
                  className="text-foreground font-medium"
                  as="p"
                />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Imagine;
