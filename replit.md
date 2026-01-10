# Summit Portable Buildings

## Overview
A full-stack web application for Summit Portable Buildings, a company that manufactures and sells custom sheds, barns, garages, cabins, and storage buildings. The application serves customers in Missouri, Illinois, Kentucky, and Arkansas.

## Tech Stack
- **Frontend**: React 18 with TypeScript, Vite, TailwindCSS, Shadcn UI components
- **Backend**: Express.js with TypeScript
- **Database**: Supabase (PostgreSQL)
- **Routing**: React Router DOM
- **State Management**: TanStack React Query

## Project Structure
```
├── client/           # Frontend React application
│   ├── src/
│   │   ├── components/   # React components
│   │   ├── hooks/        # Custom hooks
│   │   ├── lib/          # Utility functions
│   │   ├── pages/        # Page components
│   │   └── contexts/     # React contexts
│   └── index.html
├── server/           # Backend Express application
│   ├── index.ts      # Server entry point
│   ├── routes.ts     # API routes
│   ├── storage.ts    # Data storage layer
│   └── vite.ts       # Vite middleware setup
├── shared/           # Shared types and schemas
│   └── schema.ts     # Drizzle schema and Zod schemas
└── package.json
```

## Available Scripts
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run db:push` - Push database schema changes

## API Endpoints
- `GET /api/page-content/:slug` - Get page content by slug
- `POST /api/page-content` - Create/update page content
- `POST /api/cloudinary/upload` - Upload image to Cloudinary
- `POST /api/cloudinary/asset-audit` - Audit assets in Cloudinary

## Environment Variables
The following environment variables are configured:
- `VITE_SUPABASE_URL` - Supabase project URL
- `VITE_SUPABASE_PUBLISHABLE_KEY` - Supabase anon/public key
- `CLOUDINARY_CLOUD_NAME` - Cloudinary cloud name (optional)
- `CLOUDINARY_API_KEY` - Cloudinary API key (optional)
- `CLOUDINARY_API_SECRET` - Cloudinary API secret (optional)

## CMS System
The application includes a lightweight, secure CMS that stores content in Supabase.

### Admin Access
- Login: Navigate to `/admin/login` and enter your admin email
- Authentication: Email-based OTP via Supabase Auth
- Role check: Uses `has_role` RPC function to verify admin privileges

### Editing Content
1. Log in as admin at `/admin/login`
2. Navigate to any page (e.g., `/styles`)
3. Click "Edit Page" button in bottom-right corner
4. Click on text elements to edit them inline
5. Click "Save Changes" when done

### CMS Components
- `useEditablePageContent` hook - Manages `page_content` table (structured fields)
- `useSectionContent` hook - Manages `section_content` table (JSONB for flexible content)
- `InlineEditable` component - Inline text editing with visual feedback
- `InlineEditableLink` component - Edit link text, URL, and "open in new tab" setting
- `InlineEditableImage` component - Edit images with Cloudinary upload support
- `InlineEditableButton` component - Edit button text, link, and "open in new tab" setting
- `AdminEditMode` component - Edit/Save/Cancel controls (visible to admins only)

### Supabase Tables
- `page_content` - Stores page-level content (heading, tagline, meta fields)
- `section_content` - Stores section-level content (flexible JSONB)
- Both tables have RLS policies for public read, authenticated write

## Recent Changes
- **2026-01-10**: Made BasicStorage, DeluxeStorageCabins, and GaragesCarports overview pages fully editable
  - All three pages follow same CMS editing pattern as other overview pages
  - Uses useEditablePageContent for page-level meta content
  - Uses useSectionContent for models, quick-nav, and CTA sections
  - Quick Nav section with editable title and items (name, image)
  - Model sections with editable headers, taglines, features, main image, gallery images
  - Model buttons with editable links (View Details, Design This Shed / Browse Inventory)
  - CTA section with editable heading, description, phone button, secondary button
  - View mode shows clickable links; edit mode shows inline editable components
  - Local state management with useEffect syncing from content hooks
- **2026-01-10**: Made StylesModern, StylesUtility, and StylesBarn pages fully editable
  - All three pages follow same CMS editing pattern as Styles.tsx reference page
  - Uses useEditablePageContent for page-level content (heading, tagline, subheading, CTA, meta)
  - Uses useSectionContent for section-specific content (options, other styles, section headers, CTA settings)
  - Hero section with editable heading, tagline, subheading
  - Option cards with editable images, names/links (with new tab), descriptions, and individual features
  - Section headers stored in separate section content for each category (Storage, Cabins, Garages, etc.)
  - "Other Styles" section with editable images, names/links (with new tab), and subtitles
  - CTA section with editable heading, description, and button (text/link/new tab via InlineEditableButton)
  - View mode shows clickable links; edit mode shows inline editable components
  - Local state management with useEffect syncing from content hooks
- **2026-01-10**: Added "Delete Gallery Image" functionality to all product pages
  - Delete button (X icon) appears in top-right corner of each gallery image on hover in edit mode
  - Uses destructive styling (red background) with smooth opacity transition
  - Deleting an image shifts all subsequent images down to maintain sequential numbering
  - Deletion persists after saving - removed images are fully deleted from content
  - 11 product pages updated: EconomyShed, BudgetProUtility, BudgetProLoftedBarn, ProLoftedBarn, UtilityShed, Cabin, BarnCabin, ModernShed, Garage, Carports, Greenhouse
- **2026-01-10**: Added "Add Gallery Image" functionality to all product pages
  - New `updateDynamicField` function in useSectionContent hook for dynamic field persistence
  - EditablePageWrapper exposes `updateDynamicField` for pages that need to add fields at runtime
  - 11 product pages updated: EconomyShed, BudgetProUtility, BudgetProLoftedBarn, ProLoftedBarn, UtilityShed, Cabin, BarnCabin, ModernShed, Garage, Carports, Greenhouse
  - Gallery images now constructed dynamically from content fields (galleryImage1, galleryImage2, etc.)
  - "Add Gallery Image" button visible in edit mode below gallery grid
  - New images get placeholder values and can be customized/replaced before saving
  - All gallery edits (image replacement, alt text) use updateDynamicField for proper persistence
- **2026-01-10**: Made Summit Cabin page (/types/deluxe-storage-cabins/cabin) fully editable
  - Hero section with editable image, alt text, title, description, subtitle, and 2 CTA buttons (text/link/new tab)
  - 4 gallery images with editable images and alt text
  - Features section with editable heading, description, image, alt text, badge, card title, and 16 individual features
  - "Design Yours Now" button with text/link/new tab
  - Uses section with editable heading, 9 individual uses, and note text
  - Color section with editable heading and 3 accordion titles
  - Upgrades section with editable heading
  - Important notes text editable
  - CTA section with heading, description, and 2 buttons (text/link/new tab)
- **2026-01-09**: Fixed admin Edit button stability across page navigation
  - Created AdminAuthContext to centralize admin auth state at App level
  - Added caching logic to persist verified admin status during auth revalidation
  - AdminEditMode now shows disabled "Verifying..." state during revalidation
  - Prevents Edit button from flashing/disappearing when navigating between pages
  - Security maintained: button only appears after initial auth verification, resets on logout
- **2026-01-09**: Made 6 remaining product pages fully editable (AnimalShelters, BarnCabin, Carports, Garage, Greenhouse, ModernShed)
  - Each page uses EditablePageWrapper with flat field content interface
  - Hero section with editable image, alt text, title, description, and 2 CTA buttons (text/link/new tab)
  - Gallery images conditionally render: static images in view mode, InlineEditableImage in edit mode
  - Features section with editable heading, description, badge, feature list, and note
  - Uses section with editable heading and individual use items
  - Design buttons with InlineEditableButton (text/link/new tab)
  - CTA section with heading, description, and 2 buttons (text/link/new tab)
  - AnimalShelters has unique structure: 3 shelter types with 2 images each (not traditional gallery)
- **2026-01-09**: Made 4 additional product pages fully editable (Budget Pro Utility, Budget Pro Lofted Barn, Pro Utility, Pro Lofted Barn)
  - Hero section with image, alt text, title, description, subtitle, and 2 CTA buttons (text/link/new tab)
  - Gallery images (3-9 images per page) with editable images and alt text
  - Features section with editable heading, description, badge, feature list (8-13 items), and note
  - Feature image with alt text
  - Design button with text/link/new tab
  - Uses section with heading, 9 editable uses, and note
  - Color options and upgrade options sections with editable headings
  - CTA section with heading, description, and 2 buttons (text/link/new tab)
- **2026-01-09**: Made Economy Shed page (/types/basic-storage/economy-shed) fully editable
  - Hero section (title, titleHighlight, description, subtitle, image with alt text)
  - 8 gallery images with editable images and alt text
  - 2 style option cards (Economy Shed, Lofted Economy Shed) with:
    - Editable card images and alt text
    - Editable card titles and descriptions
    - 4 editable features per card
  - "Design Yours Now" button with text/link/new tab toggle
  - Value proposition section (heading, 9 editable benefits, note text)
  - Color options section (heading, accordion title)
  - Important notes text
  - CTA section (heading, description, 2 buttons with text/link/new tab)
- **2026-01-09**: Added InlineEditableButton to product page CTA sections
  - Greenhouse.tsx - CTA buttons with text/link/new tab settings
  - AnimalShelters.tsx - CTA buttons with text/link/new tab settings
  - BudgetProUtility.tsx - CTA buttons with text/link/new tab settings
  - BudgetProLoftedBarn.tsx - CTA buttons with text/link/new tab settings
  - BarnCabin.tsx - CTA buttons with text/link/new tab settings
  - Carports.tsx - CTA buttons with text/link/new tab settings
- **2026-01-09**: Made Home page (/) fully editable (all sections inline, same pattern as Types/Styles)
  - Hero section (tagline, heading, subheading, CTA description, 2 buttons with text/link/new tab settings)
  - Stakes section (tagline, heading, subheading, 3 pain points with titles/descriptions, closing text)
  - Guide section (tagline, heading, 4 paragraphs)
  - How It Works section (tagline, heading, subheading, 3 steps with titles/descriptions, button text)
  - Products section (tagline, heading, subheading, section title, link text, 5 styles with editable images/names/subtitles/links with new tab)
  - Imagine section (tagline, heading, subheading, 6 benefits)
  - CTA Banner section (badge, heading, 2 descriptions, closing text, button with link/new tab, phone number)
  - Testimonials header (tagline, heading, subheading) + individual testimonials (name, text)
  - Locations section (tagline, heading, subheading, footer note, CTA heading/description/buttons with links)
  - Contact section (tagline, heading, subheading, call title, phone, location title, address, hours)
- **2026-01-09**: Made Styles page (/styles) fully editable
  - Hero section (tagline, heading, subheading)
  - Section headers ("Choose Your Style", "Specialty Structures")
  - Roof style names, subtitles, images, and links with new tab option
  - Specialty structure names, subtitles, images, and links with new tab option
  - CTA button with editable text, link, and new tab setting
- **2026-01-09**: Made Types page (/types) fully editable
  - Hero section (tagline, heading, subheading)
  - Category names and descriptions
  - Model names, images, and links with new tab option
  - CTA button with editable text, link, and new tab setting
- **2026-01-09**: Set up CMS infrastructure
  - Created page_content and section_content tables in Supabase
  - Fixed admin routing issue (absolute script path)
  - Verified inline editing functionality on Styles page
- **2026-01-09**: Migrated from Lovable/Supabase to Replit environment
  - Moved frontend from `src/` to `client/src/`
  - Created Express backend with API routes
  - Configured Vite for new project structure

## User Preferences
- Using TypeScript throughout the project
- TailwindCSS for styling
- Shadcn UI components for UI elements

## Notes
- Admin authentication uses Supabase Auth with role-based access control
- Cloudinary integration requires API keys to be configured for image uploads
- The app uses react-router-dom for frontend routing
- Supabase credentials are configured as environment secrets
