# Page Refactoring Guide: CMS-First with Lazy-Loaded Admin

This guide explains how to refactor existing pages to use the new CMS-first architecture with lazy-loaded inline editing.

## Architecture Overview

### Before (Old Pattern)
```typescript
// ❌ OLD: Admin code bundled with public code
import { EditablePageWrapper } from '@/components/admin/EditablePageWrapper';

export default function EconomyShed() {
  return (
    <EditablePageWrapper slug="economy-shed" defaultContent={defaultContent}>
      {({ content, isEditMode, updateField }) => (
        // Page content with inline edit controls
        <InlineEditable value={content.title} ... />
      )}
    </EditablePageWrapper>
  );
}
```

**Problem:** EditablePageWrapper and InlineEditable components are imported and bundled for ALL users, even though only admins need them.

### After (New Pattern)
```typescript
// ✅ NEW: Conditional lazy-loading of admin code
import { lazy, Suspense } from 'react';
import { useOptionalAdminAuth } from '@/contexts/useOptionalAdminAuth';
import { useCMSContent } from '@/hooks/useCMSContent';
import { economyShedDefaults } from './defaults/economyShedDefaults';

// Lazy-load admin variant ONLY when needed
const EconomyShedEditable = lazy(() => import('./EconomyShedEditable'));

export default function EconomyShed() {
  const { isAdmin } = useOptionalAdminAuth();
  const { content, isLoading } = useCMSContent('economy-shed', economyShedDefaults);
  
  if (isLoading) return <LoadingSpinner />;
  
  // Admin gets editable version (lazy-loaded)
  if (isAdmin) {
    return (
      <Suspense fallback={<EconomyShedView content={content} />}>
        <EconomyShedEditable initialContent={content} />
      </Suspense>
    );
  }
  
  // Public users get lightweight view (NO admin code)
  return <EconomyShedView content={content} />;
}

// Pure view component (used by both)
function EconomyShedView({ content }) {
  return (
    <>
      <Header />
      <ProductHero
        title={content.title}
        description={content.description}
        image={content.heroImage}
      />
      <Footer />
    </>
  );
}
```

**Benefits:**
- ✅ Public users: NO admin code in bundle (~400KB lighter)
- ✅ Admins: Full inline editing (loads ~300KB only when needed)
- ✅ CMS-first: Always fetch from database, fallback to defaults

## Step-by-Step Refactoring Process

### Step 1: Extract Defaults

Create a new file: `pages/defaults/[pageName]Defaults.ts`

```typescript
// pages/defaults/economyShedDefaults.ts
export interface EconomyShedContent {
  title: string;
  description: string;
  heroImage: string;
  // ... all content fields
}

export const economyShedDefaults: EconomyShedContent = {
  title: 'Economy Shed',
  description: '...',
  // ... all default values
};
```

### Step 2: Create Pure View Component

Extract the presentation logic into a pure component that receives content as props:

```typescript
// In EconomyShed.tsx
interface EconomyShedViewProps {
  content: EconomyShedContent;
}

function EconomyShedView({ content }: EconomyShedViewProps) {
  return (
    <>
      <Header />
      <main>
        <ProductHero
          title={content.title}
          description={content.description}
          image={content.heroImage}
        />
        {/* ... rest of page sections */}
      </main>
      <Footer />
    </>
  );
}
```

**Key points:**
- NO InlineEditable components
- NO admin-related imports
- Pure presentation logic
- Receives all data via props

### Step 3: Create Public Page Component

Replace the existing page component with a lightweight loader:

```typescript
// pages/EconomyShed.tsx
import { lazy, Suspense } from 'react';
import { useOptionalAdminAuth } from '@/contexts/useOptionalAdminAuth';
import { useCMSContent } from '@/hooks/useCMSContent';
import { economyShedDefaults } from './defaults/economyShedDefaults';

const EconomyShedEditable = lazy(() => import('./EconomyShedEditable'));

export default function EconomyShed() {
  const { isAdmin } = useOptionalAdminAuth();
  const { content, isLoading } = useCMSContent('economy-shed', economyShedDefaults);
  
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-muted-foreground">Loading...</div>
      </div>
    );
  }
  
  if (isAdmin) {
    return (
      <Suspense fallback={<EconomyShedView content={content} />}>
        <EconomyShedEditable initialContent={content} />
      </Suspense>
    );
  }
  
  return <EconomyShedView content={content} />;
}

// EconomyShedView component here (or import from separate file)
```

### Step 4: Create Admin Editable Variant

Create a separate file for the editable version:

```typescript
// pages/EconomyShedEditable.tsx
import { EditablePageWrapper } from '@/admin/components/LazyEditableComponents';
import { InlineEditable } from '@/admin/components/LazyEditableComponents';
import { InlineEditableImage } from '@/admin/components/LazyEditableComponents';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

interface EconomyShedEditableProps {
  initialContent: any;
}

export default function EconomyShedEditable({ initialContent }: EconomyShedEditableProps) {
  return (
    <EditablePageWrapper slug="economy-shed" defaultContent={initialContent}>
      {({ content, isEditMode, updateField }) => (
        <>
          <Header />
          <main>
            <section>
              <InlineEditable
                value={content.title}
                fieldName="title"
                onChange={updateField}
                isEditMode={isEditMode}
                as="h1"
              />
              <InlineEditableImage
                src={content.heroImage}
                alt={content.heroImageAlt}
                onImageChange={(url) => updateField('heroImage', url)}
                isEditMode={isEditMode}
              />
              {/* ... rest with inline edit controls */}
            </section>
          </main>
          <Footer />
        </>
      )}
    </EditablePageWrapper>
  );
}
```

**Key points:**
- This file is ONLY loaded for admins
- Uses lazy-loaded editable components from `@/admin/components/LazyEditableComponents`
- Maintains full inline editing functionality
- Separate chunk in production build

## Bundle Structure After Refactoring

```
dist/public/assets/
├── index-[hash].js          (~400KB - public pages, NO admin code)
├── vendor-react-[hash].js   (~150KB - React, React Router)
├── vendor-ui-[hash].js      (~100KB - Radix UI components)
├── cms-runtime-[hash].js    (~50KB - CMS fetching, fallback)
├── admin-bundle-[hash].js   (~300KB - LAZY LOADED for admins only)
│   ├── EditablePageWrapper
│   ├── InlineEditable*
│   ├── AdminEditMode
│   └── All *Editable.tsx variants
└── pages-public-[hash].js   (~200KB - Public page components)
```

## Validation Checklist

For each refactored page, verify:

- [ ] Public page has NO imports from `@/components/admin/`
- [ ] Public page has NO imports of `InlineEditable*` components
- [ ] Public page uses `useCMSContent` hook
- [ ] Defaults extracted to separate file
- [ ] View component is pure (no edit logic)
- [ ] Admin variant created as separate file (`*Editable.tsx`)
- [ ] Admin variant uses lazy-loaded components from `@/admin/components/`
- [ ] Page renders identically for admins and public users (view mode)
- [ ] Admin can edit all fields inline (edit mode)
- [ ] Changes save to CMS database
- [ ] Page works when CMS is unavailable (falls back to defaults)

## Testing

### Test Public Bundle
```bash
npm run build
npx vite-bundle-analyzer dist/public

# Verify:
# 1. admin-bundle.js is separate chunk
# 2. index.js does NOT include EditablePageWrapper
# 3. index.js does NOT include InlineEditable
```

### Test Functionality
1. **As public user:**
   - Page loads quickly
   - Content displays correctly
   - NO edit controls visible
   - Bundle size is small

2. **As admin user:**
   - Page loads
   - Click "Edit Page" button
   - Admin bundle loads (slight delay expected)
   - Inline edit controls appear
   - Can edit fields
   - Changes save to CMS
   - Refresh shows updated content

3. **CMS unavailable:**
   - Page still loads
   - Shows default content
   - Warning message displayed
   - No errors in console

## Common Patterns

### Gallery Images
```typescript
// View component
const galleryImages = [];
let i = 1;
while (content[`galleryImage${i}`]) {
  galleryImages.push({
    src: content[`galleryImage${i}`],
    alt: content[`galleryImage${i}Alt`] || '',
  });
  i++;
}

return <GallerySection images={galleryImages} />;
```

### Feature Lists
```typescript
// View component
const features = [
  content.feature1,
  content.feature2,
  content.feature3,
].filter(Boolean);

return (
  <ul>
    {features.map((feature, idx) => (
      <li key={idx}>{feature}</li>
    ))}
  </ul>
);
```

### Conditional Sections
```typescript
// View component
{content.sectionHeading && (
  <section>
    <h2>{content.sectionHeading}</h2>
    <p>{content.sectionSubheading}</p>
  </section>
)}
```

## Migration Order

Recommended order for migrating pages:

1. **Pilot Pages** (2-3 pages to validate pattern):
   - EconomyShed (product detail)
   - AboutUs (content page)
   - Gallery (media-heavy page)

2. **Product Detail Pages** (similar structure):
   - All basic storage products
   - All deluxe storage products
   - All garage/carport products

3. **Category Pages** (simpler):
   - Styles overview
   - Types overview
   - Storage categories

4. **Content Pages** (text-heavy):
   - Buyer's Guide
   - Financing
   - Privacy Policy
   - Contact Us

5. **Specialty Pages** (unique):
   - Home page
   - Gallery
   - Inventory
   - 3D Configurator

## Rollback Strategy

If issues arise during refactoring:

1. **Per-page rollback:** Keep old version in Git, revert if needed
2. **Feature flag:** Add environment variable to toggle old/new pattern
3. **Gradual rollout:** Refactor 5 pages at a time, test, then continue
4. **Monitoring:** Watch bundle sizes and load times after each deployment

## Questions?

If you encounter issues during refactoring:
- Check bundle analyzer to verify code splitting
- Use React DevTools to inspect lazy loading
- Check browser network tab to see which chunks load
- Verify admin functionality still works end-to-end
