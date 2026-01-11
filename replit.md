# Summit Portable Buildings

## Overview
A full-stack web application for Summit Portable Buildings, a company specializing in the manufacture and sale of custom sheds, barns, garages, cabins, and storage buildings. The application aims to provide a robust online presence, serving customers across Missouri, Illinois, Kentucky, and Arkansas, with a focus on showcasing customizable building options and facilitating customer engagement.

## User Preferences
- Using TypeScript throughout the project
- TailwindCSS for styling
- Shadcn UI components for UI elements

## System Architecture
The application is structured into a client-side React application and a server-side Express.js application, with shared types and schemas.

**Frontend**:
- Built with React 18 and TypeScript.
- Uses Vite for fast development and building.
- Styling is managed with TailwindCSS.
- UI components are sourced from Shadcn UI.
- React Router DOM handles client-side routing.
- State management is implemented using TanStack React Query.
- The UI/UX emphasizes a clean, modern design, utilizing Shadcn UI components for consistency and a polished look.

**Backend**:
- Developed using Express.js with TypeScript.
- Provides API endpoints for content management and asset uploads.

**Content Management System (CMS)**:
- A lightweight, secure CMS stores content in Supabase.
- **Admin Access**: Login via `/admin/login` using email-based OTP through Supabase Auth. Admin privileges are verified using a `has_role` RPC function.
- **Content Editing**: Provides inline editing capabilities for various content types (text, links, images, buttons) directly on the live pages.
- **CMS Components**: Utilizes `useEditablePageContent` and `useSectionContent` hooks for managing structured and flexible content, respectively. `InlineEditable` components (Text, Link, Image, Button) facilitate direct content manipulation.
- **Dynamic Content**: Supports dynamic addition and deletion of gallery images on product pages, with changes persisting in the database.

**Database**:
- Supabase (PostgreSQL) is used as the primary database, storing application content, user information, and CMS data.
- Row-Level Security (RLS) policies are applied for secure public read and authenticated write access to content tables.
- **Key Tables**:
  - `page_content`: Stores page metadata (slug, heading, meta fields), `layout_config` (JSONB for hero/background styles), and `is_canonical` flag.
  - `section_content`: Stores section-level content with `page_id` (UUID FK to page_content) as primary relationship, `page_slug` for backward compatibility.
- **Data Flow**: Sections are fetched/linked by `page_id` when available, falling back to `page_slug` for legacy compatibility.
- **Canonicalization**: Before duplication or advanced editing, pages are canonicalized (`is_canonical=true`) with all layout defaults persisted to `layout_config`.

## External Dependencies
- **Supabase**: Used for database services (PostgreSQL), authentication, and potentially storage.
- **Cloudinary**: Integrated for image upload and management, requiring API keys for full functionality.