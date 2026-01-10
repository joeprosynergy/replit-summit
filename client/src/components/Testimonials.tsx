import { Star, Quote } from 'lucide-react';
import { InlineEditable } from '@/components/admin/InlineEditable';
import { Testimonial } from '@/hooks/useEditableTestimonials';

interface TestimonialsProps {
  testimonials?: Testimonial[];
  isEditMode?: boolean;
  onUpdateTestimonial?: (id: string, field: keyof Testimonial, value: string | number) => void;
}

const defaultTestimonials = [
  {
    id: '1',
    name: 'Samantha Tevlin',
    rating: 5,
    text: "I requested a metal 14x32 shed. Let me just say, it turned out everything I pictured and more. They did an amazing job on the build. You can tell they truly put their best effort into it and took their time to make sure it was done right. I'm 10/10 extremely happy & thankful for it! Not only is the shed great but the customer service was on point. Always replied when needed to & answered every question. Even worked with me on last minutes changes the best they could! Highly recommend & will use them again for any future needs.",
    source: 'Google Review',
  },
  {
    id: '2',
    name: 'Dona Clapperton',
    rating: 5,
    text: "Gino was such a helpful salesman. He was patient and kind as we did this sale long distance. Delivery was a breeze. The team was friendly and knowledgeable. It was a joy to watch them set up the unit. I've recommended them to family and currently my daughter is in the process of buying her unit from Gino. Five stars isn't enough for the experience with Summit.",
    source: 'Google Review',
  },
  {
    id: '3',
    name: 'Gary Shrum',
    rating: 5,
    text: "I am quite pleased with the 12X32 building I purchased. The worker who delivered and set up the building was amazing and was very knowledgeable. I would recommend Summit Portable Buildings to anyone want a solid built and attractive building.",
    source: 'Google Review',
  },
];

const Testimonials = ({ 
  testimonials = defaultTestimonials as unknown as Testimonial[], 
  isEditMode = false, 
  onUpdateTestimonial 
}: TestimonialsProps) => {
  const displayTestimonials = testimonials.length > 0 ? testimonials : defaultTestimonials;

  return (
    <section className="section-padding bg-stone">
      <div className="container-custom">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <p className="text-secondary font-heading uppercase tracking-widest mb-3">
            Success Stories
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading text-foreground mb-6">
            Real Families. Real Results.
          </h2>
          <p className="text-lg text-foreground/70">
            See how Summit Buildings helped these homeowners solve their storage problems.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {displayTestimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="bg-card p-8 rounded-lg shadow-md relative"
            >
              <Quote className="w-10 h-10 text-secondary/20 absolute top-6 right-6" />
              
              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-5 h-5 text-secondary fill-secondary"
                  />
                ))}
              </div>
              
              {/* Text */}
              <div className="text-foreground/90 mb-6 leading-relaxed">
                <InlineEditable
                  value={`"${testimonial.text}"`}
                  fieldName={`${testimonial.name}'s testimonial`}
                  type="textarea"
                  onChange={(v) => onUpdateTestimonial?.(testimonial.id, 'text', v.replace(/^"|"$/g, ''))}
                  isEditMode={isEditMode}
                  as="p"
                />
              </div>
              
              {/* Author */}
              <div>
                <InlineEditable
                  value={testimonial.name}
                  fieldName="Name"
                  onChange={(v) => onUpdateTestimonial?.(testimonial.id, 'name', v)}
                  isEditMode={isEditMode}
                  className="font-heading text-foreground font-semibold"
                  as="p"
                />
                <p className="text-secondary text-sm font-medium mt-1">
                  {testimonial.source || 'Google Review'}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
