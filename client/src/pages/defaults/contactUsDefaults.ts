/**
 * Contact Us Page - Default Content
 * Source of truth for fallback content when CMS is unavailable
 */

export interface FaqItem {
  question: string;
  answer: string;
}

export interface ContactUsContent {
  // Meta
  metaTitle: string;
  metaDescription: string;
  
  // Hero Section
  heroHeading: string;
  heroHeadingHighlight: string;
  heroSubheading: string;
  
  // Contact Form
  formHeading: string;
  
  // Contact Info
  contactInfoHeading: string;
  phone: string;
  phoneDisplay: string;
  email: string;
  addressLine1: string;
  addressLine2: string;
  addressLine3: string;
  addressMapLink: string;
  hoursLine1: string;
  hoursLine2: string;
  hoursLine3: string;
  
  // Social
  socialHeading: string;
  facebookLink: string;
  facebookText: string;
  
  // FAQ Section
  faqHeading: string;
  faqHeadingHighlight: string;
  faqSubheading: string;
  
  // FAQ Items (dynamic array)
  faq1Question: string;
  faq1Answer: string;
  faq2Question: string;
  faq2Answer: string;
  faq3Question: string;
  faq3Answer: string;
  faq4Question: string;
  faq4Answer: string;
  faq5Question: string;
  faq5Answer: string;
  faq6Question: string;
  faq6Answer: string;
  faq7Question: string;
  faq7Answer: string;
  faq8Question: string;
  faq8Answer: string;
  faq9Question: string;
  faq9Answer: string;
  faq10Question: string;
  faq10Answer: string;
}

export const contactUsDefaults: ContactUsContent = {
  // Meta
  metaTitle: 'Contact Us | Summit Portable Buildings',
  metaDescription: 'Contact Summit Portable Buildings. Call us at 573-747-4700 or fill out our contact form. Serving Missouri, Illinois, Kentucky & Arkansas.',
  
  // Hero
  heroHeading: "We'd love",
  heroHeadingHighlight: 'to hear from you',
  heroSubheading: 'Fill out our form and someone from our team will get back to you promptly. Or give us a call and talk to someone today!',
  
  // Form
  formHeading: 'Send us a message',
  
  // Contact Info
  contactInfoHeading: 'Contact Information',
  phone: 'tel:5737474700',
  phoneDisplay: '(573) 747-4700',
  email: 'summitmainoffice@gmail.com',
  addressLine1: 'Summit Portable Buildings',
  addressLine2: '7336 State Highway 32',
  addressLine3: 'Farmington, MO 63640',
  addressMapLink: 'https://g.page/summitbuildingsfarmingtonmo?share',
  hoursLine1: 'Monday - Friday: 8am - 5pm',
  hoursLine2: 'Saturday: By Appointment',
  hoursLine3: 'Sunday: Closed',
  
  // Social
  socialHeading: 'Follow Us',
  facebookLink: 'https://www.facebook.com/summitportablebuildings/',
  facebookText: 'Facebook',
  
  // FAQ
  faqHeading: 'Frequently Asked',
  faqHeadingHighlight: 'Questions',
  faqSubheading: 'Find answers to common questions about our storage buildings, delivery, and more.',
  
  // FAQ Items
  faq1Question: 'What types of storage buildings do you offer?',
  faq1Answer: 'EVERYTHING! If you need some more specifics, here is a list of our storage building offerings: Sheds, Garden Shed, Utility Shed, Tool Shed, Backyard Building, Garage, Storage Shed, Portable Shed, Container, Outdoor Shed, Hunting Cabin, Lake Cabin, Portable Office, Portable Concession Stand, Snow Cone Building, Garden Tools Shed, Tiny House (can double as a man cave or "she shed"), Tool and Utility Shed, Lofted Storage Barn, Lofted Storage Shed, Side Lofted Barn, Lofted Garden Shed, and basically any other outdoor buildings you can think of!',
  
  faq2Question: 'How much are your buildings?',
  faq2Answer: 'We offer a wide range of standard storage building styles and sizes. Pricing varies by size and style. Contact your local dealer for details on pricing in your area, or request a brochure.',
  
  faq3Question: "Your brochure states 'Free Delivery', but I don't live in the area where I saw the buildings. How far is too far?",
  faq3Answer: 'We offer free delivery up to 50 miles from our closest dealer to the point of delivery. You do not have to order the building from the closest dealer to qualify for free delivery. If you are beyond the 50 mile radius, please contact the sales rep for the area in which you live to give you an accurate delivery cost. Setup is still Free.',
  
  faq4Question: 'I would like to add more windows to a building and change where the door is located. Can I customize the building?',
  faq4Answer: "Sure! Our storage buildings are completely customizable. We have a standard placement for doors and windows, but if you would like additional door(s), window(s), etc., we build to suit. We can add or delete just about anything you would want, as long as it doesn't compromise the integrity or strength of the building.",
  
  faq5Question: 'Do I need good credit for the Rent-to-Own option?',
  faq5Answer: 'NO! We offer an affordable (no strings attached) alternative to financing your storage building by signing a rent-to-own contract. NO EARLY PAYOFF PENALTIES. A small down payment is required to get a building delivered to you!',
  
  faq6Question: 'I ordered a building. When should I expect it to be delivered?',
  faq6Answer: 'Our Custom Ordered Storage Buildings are typically delivered within 10 to 30 business days from the date we receive your order. Weather conditions and the demand of the season may greatly affect delivery lead times. On Lot / In Stock buildings are normally delivered within 5-10 business days. Weather conditions and the demand of the season may greatly affect delivery lead times.',
  
  faq7Question: 'Do I need a specific foundation for my building?',
  faq7Answer: 'The only requirement is a general level location for your building to sit on (we will level the building up to 18″). Our buildings are designed to rest directly on their skids. Each Skid/Runner is treated for ground contact. In order to level the building we use treated wood blocks and shins. If you would like to have your building on concrete blocks, we require that you provide the blocks or arrange with one of our Team Members to bring blocks. We charge $3.00/block. We recommend Solid 4"x8"x16" and 8"x8"x16" Concrete Blocks. A Gravel Pad is recommended but not required. This will create a solid base and enhance the life of your building.',
  
  faq8Question: 'What if my new building will not fit through my gate or around my fence?',
  faq8Answer: 'Summit Portable Buildings, LLC requires that your site be ready for delivery, and is not responsible for making alterations to fences or other barriers. If you have questions about your site, contact your local dealer or sales rep.',
  
  faq9Question: 'How much space should be allowed to deliver a building?',
  faq9Answer: "A vertical space of 14′, measured from the ground to the top of the building when it is on the trailer, is required. Be sure to take any tree branches and utility wires into account. While our drivers are very skilled with delivery equipment, they will still need a minimum of 1′ of space to maneuver the building through an opening. That is, a building 12′ wide will require a 14-foot wide space (1 foot on each side).",
  
  faq10Question: 'Do I need to have permits for my building?',
  faq10Answer: 'You are responsible for contacting your local city and county agencies in regard to zoning, permits, setbacks, and covenants. Also, it is recommended that you contact your Home Owners Association (if applicable) to determine what rules and regulations may apply.',
};
