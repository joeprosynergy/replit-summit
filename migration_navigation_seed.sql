-- Migration: Seed global navigation configuration
-- Seeds the 'section_content' table with global-header and global-footer configurations
-- These are used by the Header and Footer components for dynamic navigation

-- Delete existing navigation configs if they exist
DELETE FROM section_content WHERE page_slug = 'global-navigation' AND section_name = 'header';
DELETE FROM section_content WHERE page_slug = 'global-navigation' AND section_name = 'footer';

-- Insert global-header configuration
INSERT INTO section_content (page_slug, section_name, content, created_at, updated_at)
VALUES (
  'global-navigation',
  'header',
  '{
    "logoImage": "https://res.cloudinary.com/dmbzcxslt/image/upload/v1734462395/summit-logo_qfbfod.png",
    "logoAlt": "Summit Portable Buildings",
    "navLinks": [
      {
        "id": "about-us",
        "label": "About Us",
        "href": "/about-us",
        "isRoute": true
      },
      {
        "id": "building-styles",
        "label": "Building Styles",
        "href": "/styles",
        "isRoute": true
      },
      {
        "id": "inventory",
        "label": "See Inventory",
        "href": "/inventory",
        "isRoute": true
      },
      {
        "id": "contact-us",
        "label": "Contact Us",
        "href": "/contact-us",
        "isRoute": true
      }
    ],
    "ctaPhone": "tel:5737474700",
    "ctaPhoneDisplay": "573-747-4700",
    "ctaButtonText": "Design Your Shed",
    "ctaButtonLink": "/3d-configurator",
    "ctaButtonIsRoute": true
  }'::jsonb,
  NOW(),
  NOW()
);

-- Insert global-footer configuration
INSERT INTO section_content (page_slug, section_name, content, created_at, updated_at)
VALUES (
  'global-navigation',
  'footer',
  '{
    "bannerHeading": "Find Your Perfect Portable Building Today",
    "sections": [
      {
        "id": "explore-by-use",
        "title": "Explore by Use",
        "links": [
          {
            "id": "basic-storage",
            "label": "Basic Storage",
            "href": "/types/basic-storage",
            "isRoute": true
          },
          {
            "id": "deluxe-cabins",
            "label": "Deluxe & Cabins",
            "href": "/types/deluxe-storage-cabins",
            "isRoute": true
          },
          {
            "id": "garages-carports",
            "label": "Garages & Carports",
            "href": "/types/garages-carports",
            "isRoute": true
          },
          {
            "id": "greenhouse",
            "label": "Greenhouse",
            "href": "/styles/greenhouse",
            "isRoute": true
          },
          {
            "id": "animal-shelters",
            "label": "Animal Shelters",
            "href": "/styles/animal-shelters",
            "isRoute": true
          }
        ]
      },
      {
        "id": "explore-by-style",
        "title": "Explore by Style",
        "links": [
          {
            "id": "utility",
            "label": "Utility (Traditional A-Frame)",
            "href": "/styles/utility",
            "isRoute": true
          },
          {
            "id": "barn",
            "label": "Barn (Gambrel Roof)",
            "href": "/styles/barn",
            "isRoute": true
          },
          {
            "id": "modern",
            "label": "Modern (Single Slope)",
            "href": "/styles/modern",
            "isRoute": true
          },
          {
            "id": "custom-sheds",
            "label": "Custom Sheds",
            "href": "#",
            "disabled": true
          },
          {
            "id": "wooden-sheds",
            "label": "Wooden Sheds",
            "href": "#",
            "disabled": true
          },
          {
            "id": "metal-sheds",
            "label": "Metal Sheds",
            "href": "#",
            "disabled": true
          },
          {
            "id": "backyard-sheds",
            "label": "Backyard Sheds",
            "href": "#",
            "disabled": true
          }
        ]
      },
      {
        "id": "resources",
        "title": "Resources",
        "links": [
          {
            "id": "faqs",
            "label": "FAQs",
            "href": "/contact-us#faq",
            "isRoute": true
          },
          {
            "id": "buyers-guide",
            "label": "Buyers Guide",
            "href": "/buyers-guide",
            "isRoute": true
          },
          {
            "id": "gallery",
            "label": "Gallery",
            "href": "/gallery",
            "isRoute": true
          },
          {
            "id": "financing",
            "label": "Financing",
            "href": "/financing",
            "isRoute": true
          },
          {
            "id": "rent-to-own",
            "label": "Rent-to-Own",
            "href": "/financing#rent-to-own",
            "isRoute": true
          },
          {
            "id": "warranty",
            "label": "Warranty Info",
            "href": "#",
            "disabled": true
          }
        ]
      },
      {
        "id": "about",
        "title": "About",
        "links": [
          {
            "id": "home",
            "label": "Home",
            "href": "/",
            "isRoute": true
          },
          {
            "id": "about",
            "label": "About Us",
            "href": "/about-us",
            "isRoute": true
          },
          {
            "id": "blog",
            "label": "Blog",
            "href": "https://summitbuildings.superblog.click",
            "isExternal": true
          },
          {
            "id": "contact",
            "label": "Contact",
            "href": "/contact-us",
            "isRoute": true
          },
          {
            "id": "privacy",
            "label": "Privacy Policy",
            "href": "/privacy-policy",
            "isRoute": true
          }
        ]
      },
      {
        "id": "locations",
        "title": "Where We Deliver",
        "links": [
          {
            "id": "missouri",
            "label": "Missouri",
            "href": "/#locations",
            "isRoute": true
          },
          {
            "id": "illinois",
            "label": "Illinois",
            "href": "/#locations",
            "isRoute": true
          },
          {
            "id": "kentucky",
            "label": "Kentucky",
            "href": "/#locations",
            "isRoute": true
          },
          {
            "id": "arkansas",
            "label": "Arkansas",
            "href": "/#locations",
            "isRoute": true
          }
        ]
      }
    ],
    "ctaHeading": "Get the building of your dreams",
    "ctaPhone": "tel:5737474700",
    "ctaPhoneDisplay": "(573) 747-4700",
    "button1Text": "Browse Inventory",
    "button1Link": "/inventory",
    "button1IsExternal": false,
    "button2Text": "Design Now",
    "button2Link": "https://summitbuildings.shedpro.co/",
    "button2IsExternal": true,
    "copyrightText": "© 2026 Summit Portable Buildings. All rights reserved. Built in the USA with pride."
  }'::jsonb,
  NOW(),
  NOW()
);
