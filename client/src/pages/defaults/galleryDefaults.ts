/**
 * Gallery Page Defaults
 * CMS-first architecture defaults
 */

export interface GalleryImage {
  id: string;
  url: string;
  title: string;
  category: string;
}

export interface GalleryContent {
  // Meta
  metaTitle: string;
  metaDescription: string;

  // Hero section
  heroHeading: string;
  heroDescription: string;

  // Categories
  categories: string[];

  // Gallery images
  images: GalleryImage[];

  // CTA section
  ctaHeading: string;
  ctaDescription: string;
  ctaButton1Text: string;
  ctaButton1Link: string;
  ctaButton1OpenInNewTab: boolean;
  ctaButton2Text: string;
  ctaButton2Link: string;
  ctaButton2OpenInNewTab: boolean;

  // Allow dynamic fields
  [key: string]: unknown;
}

export const galleryDefaults: GalleryContent = {
  // Meta
  metaTitle: 'Gallery | Summit Portable Buildings',
  metaDescription: 'Browse our gallery of custom storage buildings, cabins, garages, lofted barns, and more. See the quality craftsmanship of Summit Portable Buildings.',

  // Hero section
  heroHeading: 'Our Building Gallery',
  heroDescription: 'Explore our collection of custom storage buildings, cabins, garages, and more. Each building is crafted with quality materials and attention to detail.',

  // Categories
  categories: ['All', 'Cabins', 'Lofted Barns', 'Garages', 'Utility Sheds', 'Economy Sheds', 'Dormers', 'Specialty', 'Other'],

  // Gallery images
  images: [
    { id: '1', url: 'https://summitbuildings.com/wp-content/uploads/2024/11/Image-6.jpeg', title: 'Cabin 1', category: 'Cabins' },
    { id: '2', url: 'https://summitbuildings.com/wp-content/uploads/2024/11/P-Premium-Cabin.jpeg', title: 'Premium Cabin', category: 'Cabins' },
    { id: '3', url: 'https://summitbuildings.com/wp-content/uploads/2024/11/Image-8-1.jpg', title: 'Cabin 3', category: 'Cabins' },
    { id: '4', url: 'https://summitbuildings.com/wp-content/uploads/2024/11/PREMIUM-LBC-1.jpeg', title: 'Premium LBC', category: 'Cabins' },
    { id: '5', url: 'https://summitbuildings.com/wp-content/uploads/2024/11/deluxe-lofted-cabin.jpeg', title: 'Deluxe Lofted Cabin', category: 'Cabins' },
    { id: '6', url: 'https://summitbuildings.com/wp-content/uploads/2024/11/Deluxe-Cabin.jpeg', title: 'Deluxe Cabin', category: 'Cabins' },
    { id: '7', url: 'https://summitbuildings.com/wp-content/uploads/2024/11/side-lofted-barn-cabin.jpeg', title: 'Side Lofted Barn Cabin', category: 'Cabins' },
    { id: '8', url: 'https://summitbuildings.com/wp-content/uploads/2024/11/PREMIUM-LBC.jpeg', title: 'Premium LBC', category: 'Cabins' },
    { id: '9', url: 'https://summitbuildings.com/wp-content/uploads/2024/11/SUMMIT-CABIN-NEW-PHOTO-scaled.jpg', title: 'Summit Cabin', category: 'Cabins' },
    { id: '10', url: 'https://summitbuildings.com/wp-content/uploads/2024/11/Image-27.jpeg', title: 'Lofted Economy', category: 'Lofted Barns' },
    { id: '11', url: 'https://summitbuildings.com/wp-content/uploads/2024/11/Image-26.jpeg', title: 'Lofted Economy 2', category: 'Lofted Barns' },
    { id: '12', url: 'https://summitbuildings.com/wp-content/uploads/2024/11/Lofted-Barn-7.jpeg', title: 'Lofted Barn 7', category: 'Lofted Barns' },
    { id: '13', url: 'https://summitbuildings.com/wp-content/uploads/2024/11/side-lofted-barn-2-scaled.jpg', title: 'Side Lofted Barn', category: 'Lofted Barns' },
    { id: '14', url: 'https://summitbuildings.com/wp-content/uploads/2024/11/side-lofted-barn.jpg', title: 'Side Lofted Barn', category: 'Lofted Barns' },
    { id: '15', url: 'https://summitbuildings.com/wp-content/uploads/2024/11/Image-1.jpeg_-1.jpeg', title: 'Lofted Barn', category: 'Lofted Barns' },
    { id: '16', url: 'https://summitbuildings.com/wp-content/uploads/2024/11/IMG_3880-scaled.jpg', title: 'Garage 1', category: 'Garages' },
    { id: '17', url: 'https://summitbuildings.com/wp-content/uploads/2024/11/IMG_2007-scaled.jpg', title: 'Garage', category: 'Garages' },
    { id: '18', url: 'https://summitbuildings.com/wp-content/uploads/2024/11/Metal-Garage.jpg', title: 'Metal Garage', category: 'Garages' },
    { id: '19', url: 'https://summitbuildings.com/wp-content/uploads/2024/11/P-Lofted-Garage.jpeg', title: 'Lofted Garage', category: 'Garages' },
    { id: '20', url: 'https://summitbuildings.com/wp-content/uploads/2024/11/MLG-1.jpeg', title: 'MLG Garage', category: 'Garages' },
    { id: '21', url: 'https://summitbuildings.com/wp-content/uploads/2024/11/Image-14.jpeg', title: 'Utility Shed', category: 'Utility Sheds' },
    { id: '22', url: 'https://summitbuildings.com/wp-content/uploads/2024/11/Image-4.jpeg', title: 'Utility Shed', category: 'Utility Sheds' },
    { id: '23', url: 'https://summitbuildings.com/wp-content/uploads/2024/11/IMG_3909.jpg', title: 'Utility Shed', category: 'Utility Sheds' },
    { id: '24', url: 'https://summitbuildings.com/wp-content/uploads/2024/11/Image-8.jpg', title: 'Utility Shed', category: 'Utility Sheds' },
    { id: '25', url: 'https://summitbuildings.com/wp-content/uploads/2024/11/IMG_3458-scaled.jpg', title: 'Utility Shed', category: 'Utility Sheds' },
    { id: '26', url: 'https://summitbuildings.com/wp-content/uploads/2024/11/Economy-Metal.jpg', title: 'Economy Metal', category: 'Economy Sheds' },
    { id: '27', url: 'https://summitbuildings.com/wp-content/uploads/2024/11/IMG_0892.jpg', title: 'Economy Shed', category: 'Economy Sheds' },
    { id: '28', url: 'https://summitbuildings.com/wp-content/uploads/2024/11/10x16-O-Dormer-1.jpg', title: 'Dormer', category: 'Dormers' },
    { id: '29', url: 'https://summitbuildings.com/wp-content/uploads/2024/11/Dormer-2.jpeg', title: 'Dormer 2', category: 'Dormers' },
    { id: '30', url: 'https://summitbuildings.com/wp-content/uploads/2024/11/10x16-O-Dormer.jpg', title: 'Dormer', category: 'Dormers' },
    { id: '31', url: 'https://summitbuildings.com/wp-content/uploads/2024/11/Chicken-Coop-4.jpeg', title: 'Chicken Coop', category: 'Specialty' },
    { id: '32', url: 'https://summitbuildings.com/wp-content/uploads/2024/11/Chicken-Coop-2.jpg', title: 'Chicken Coop', category: 'Specialty' },
    { id: '33', url: 'https://summitbuildings.com/wp-content/uploads/2024/11/Chicken-Coops-1.jpeg', title: 'Chicken Coop', category: 'Specialty' },
    { id: '34', url: 'https://summitbuildings.com/wp-content/uploads/2024/11/greenhouse.jpg', title: 'Greenhouse', category: 'Specialty' },
    { id: '35', url: 'https://summitbuildings.com/wp-content/uploads/2024/11/Animal-Shelters-scaled.jpg', title: 'Animal Shelters', category: 'Specialty' },
    { id: '36', url: 'https://summitbuildings.com/wp-content/uploads/2024/11/ASHE.jpeg', title: 'Custom Build', category: 'Other' },
    { id: '37', url: 'https://summitbuildings.com/wp-content/uploads/2024/11/IMG_2520-scaled.jpg', title: 'Custom Build', category: 'Other' },
    { id: '38', url: 'https://summitbuildings.com/wp-content/uploads/2024/11/IMG_0931-scaled.jpg', title: 'Custom Build', category: 'Other' },
    { id: '39', url: 'https://summitbuildings.com/wp-content/uploads/2024/11/IMG_2393-1-scaled.jpg', title: 'Custom Build', category: 'Other' },
    { id: '40', url: 'https://summitbuildings.com/wp-content/uploads/2024/11/0FF8CAB3-41F7-40CF-B4D1-9DD34E02C11D.jpg', title: 'Custom Build', category: 'Other' },
  ],

  // CTA section
  ctaHeading: 'Ready to Build Your Dream Storage Building?',
  ctaDescription: 'Contact us today or use our 3D designer to customize your perfect building.',
  ctaButton1Text: 'Design Your Building',
  ctaButton1Link: 'https://summitbuildings.shedpro.co/',
  ctaButton1OpenInNewTab: true,
  ctaButton2Text: 'Contact Us',
  ctaButton2Link: '/contact-us',
  ctaButton2OpenInNewTab: false,
};
