import { Shield, Truck, Award, Clock } from 'lucide-react';
import { InlineEditable } from '@/components/admin/InlineEditable';

interface ValuePropsContent {
  values: Array<{
    title: string;
    description: string;
  }>;
}

interface ValuePropsProps {
  content?: ValuePropsContent;
  isEditMode?: boolean;
  onUpdateField?: <K extends keyof ValuePropsContent>(field: K, value: ValuePropsContent[K]) => void;
}

const defaultContent: ValuePropsContent = {
  values: [
    {
      title: 'Built to Last',
      description: 'Premium materials and skilled craftsmanship mean your building will stand strong for decades.',
    },
    {
      title: 'Free Delivery',
      description: 'We deliver and set up your building at no extra charge within our service area.',
    },
    {
      title: 'Lifetime Warranty',
      description: 'Our buildings are backed by a comprehensive warranty because we stand behind our work.',
    },
    {
      title: 'Quick Turnaround',
      description: 'Most buildings are ready in weeks, not months. Get your storage solution fast.',
    },
  ],
};

const icons = [Shield, Truck, Award, Clock];

const ValueProps = ({ content = defaultContent, isEditMode = false, onUpdateField }: ValuePropsProps) => {
  const updateValue = (index: number, field: 'title' | 'description', value: string) => {
    if (!onUpdateField) return;
    const newValues = [...content.values];
    newValues[index] = { ...newValues[index], [field]: value };
    onUpdateField('values', newValues);
  };

  return (
    <section className="section-padding bg-muted/30">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {content.values.map((value, index) => {
            const Icon = icons[index] || Shield;
            return (
              <div key={index} className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-primary/10 rounded-2xl flex items-center justify-center">
                  <Icon className="w-8 h-8 text-primary" />
                </div>
                <InlineEditable
                  value={value.title}
                  fieldName={`Value ${index + 1} title`}
                  onChange={(v) => updateValue(index, 'title', v)}
                  isEditMode={isEditMode}
                  className="font-heading text-lg font-bold text-foreground mb-2"
                  as="h3"
                />
                <InlineEditable
                  value={value.description}
                  fieldName={`Value ${index + 1} description`}
                  type="textarea"
                  onChange={(v) => updateValue(index, 'description', v)}
                  isEditMode={isEditMode}
                  className="text-muted-foreground text-sm"
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

export default ValueProps;
