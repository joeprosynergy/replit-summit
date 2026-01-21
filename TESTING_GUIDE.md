# Testing Guide: CMS-First Architecture

Comprehensive testing strategy for validating the CMS-first migration.

## Testing Layers

### 1. Unit Tests
Test individual functions and components in isolation.

### 2. Integration Tests
Test how components work together.

### 3. End-to-End Tests
Test complete user workflows.

### 4. Visual Regression Tests
Ensure pages look identical after refactoring.

### 5. Performance Tests
Validate bundle sizes and load times.

## Test Categories

### A. CMS Content Loading Tests

**Test File:** `client/src/lib/__tests__/cmsFallback.test.ts`

```typescript
import { CMSFallbackManager } from '../cmsFallback';
import { getBackendClient } from '../backendClient';

jest.mock('../backendClient');

describe('CMSFallbackManager', () => {
  beforeEach(() => {
    CMSFallbackManager.clearCache();
    CMSFallbackManager.resetHealth();
  });

  test('returns CMS data when available', async () => {
    // Mock successful CMS response
    const mockData = { title: 'Test Page', content: 'Test content' };
    (getBackendClient as jest.Mock).mockReturnValue({
      from: jest.fn().mockReturnThis(),
      select: jest.fn().mockReturnThis(),
      eq: jest.fn().mockResolvedValue({
        data: mockData,
        error: null,
        status: 200,
      }),
    });

    const result = await CMSFallbackManager.getContent('test-page');
    
    expect(result.source).toBe('cms');
    expect(result.data).toEqual(expect.objectContaining(mockData));
  });

  test('falls back to cache when CMS unavailable', async () => {
    // Setup cache
    const cached Data = { title: 'Cached Page' };
    CMSFallbackManager.register('test-page', cachedData);
    localStorage.setItem('cms_content_test-page', JSON.stringify({
      data: cachedData,
      timestamp: Date.now(),
      slug: 'test-page',
    }));

    // Mock CMS failure
    (getBackendClient as jest.Mock).mockReturnValue(null);

    const result = await CMSFallbackManager.getContent('test-page');
    
    expect(result.source).toBe('cache');
    expect(result.data).toEqual(cachedData);
  });

  test('falls back to defaults when CMS and cache unavailable', async () => {
    const defaults = { title: 'Default Page' };
    CMSFallbackManager.register('test-page', defaults);

    // Mock CMS failure
    (getBackendClient as jest.Mock).mockReturnValue(null);
    // Clear cache
    localStorage.clear();

    const result = await CMSFallbackManager.getContent('test-page');
    
    expect(result.source).toBe('defaults');
    expect(result.data).toEqual(defaults);
  });

  test('tracks CMS health failures', async () => {
    (getBackendClient as jest.Mock).mockReturnValue(null);

    // Trigger multiple failures
    await CMSFallbackManager.getContent('test-1');
    await CMSFallbackManager.getContent('test-2');
    await CMSFallbackManager.getContent('test-3');

    const health = CMSFallbackManager.getHealth();
    expect(health.consecutiveFailures).toBe(3);
    expect(health.available).toBe(false);
  });
});
```

### B. Bundle Size Tests

**Test Script:** `scripts/test-bundle-size.js`

```javascript
const fs = require('fs');
const path = require('path');

const BUNDLE_LIMITS = {
  'index': 500 * 1024, // 500KB
  'vendor-react': 200 * 1024, // 200KB
  'vendor-ui': 150 * 1024, // 150KB
  'admin-bundle': 400 * 1024, // 400KB - ONLY for admins
  'cms-runtime': 75 * 1024, // 75KB
};

function getFileSize(filename) {
  const filePath = path.join(__dirname, '../dist/public/assets', filename);
  if (!fs.existsSync(filePath)) return 0;
  return fs.statSync(filePath).size;
}

function testBundleSizes() {
  const assetsDir = path.join(__dirname, '../dist/public/assets');
  const files = fs.readdirSync(assetsDir);
  
  let passed = true;
  const results = [];

  for (const [bundleName, limit] of Object.entries(BUNDLE_LIMITS)) {
    const matchingFile = files.find(f => f.startsWith(bundleName) && f.endsWith('.js'));
    
    if (!matchingFile) {
      results.push({
        bundle: bundleName,
        status: 'MISSING',
        size: 0,
        limit,
      });
      passed = false;
      continue;
    }

    const size = getFileSize(matchingFile);
    const status = size <= limit ? 'PASS' : 'FAIL';
    
    results.push({
      bundle: bundleName,
      file: matchingFile,
      status,
      size,
      limit,
      percentOfLimit: Math.round((size / limit) * 100),
    });

    if (status === 'FAIL') {
      passed = false;
    }
  }

  // Check that admin code is NOT in public bundle
  const indexFile = files.find(f => f.startsWith('index') && f.endsWith('.js'));
  if (indexFile) {
    const indexContent = fs.readFileSync(
      path.join(assetsDir, indexFile),
      'utf8'
    );
    
    const hasAdminCode = 
      indexContent.includes('EditablePageWrapper') ||
      indexContent.includes('InlineEditable') ||
      indexContent.includes('AdminEditMode');

    if (hasAdminCode) {
      results.push({
        bundle: 'index (contamination check)',
        status: 'FAIL',
        reason: 'Admin code found in public bundle!',
      });
      passed = false;
    } else {
      results.push({
        bundle: 'index (contamination check)',
        status: 'PASS',
        reason: 'No admin code in public bundle ✓',
      });
    }
  }

  // Print results
  console.log('\n=== Bundle Size Test Results ===\n');
  results.forEach(result => {
    const icon = result.status === 'PASS' ? '✓' : '✗';
    const color = result.status === 'PASS' ? '\x1b[32m' : '\x1b[31m';
    const reset = '\x1b[0m';
    
    console.log(`${color}${icon}${reset} ${result.bundle}`);
    if (result.file) {
      console.log(`  File: ${result.file}`);
    }
    if (result.size) {
      console.log(`  Size: ${Math.round(result.size / 1024)}KB / ${Math.round(result.limit / 1024)}KB (${result.percentOfLimit}%)`);
    }
    if (result.reason) {
      console.log(`  ${result.reason}`);
    }
    console.log('');
  });

  if (passed) {
    console.log('\x1b[32m✓ All bundle size tests passed!\x1b[0m\n');
    process.exit(0);
  } else {
    console.log('\x1b[31m✗ Bundle size tests failed!\x1b[0m\n');
    process.exit(1);
  }
}

testBundleSizes();
```

**Add to package.json:**
```json
{
  "scripts": {
    "test:bundle": "npm run build && node scripts/test-bundle-size.js"
  }
}
```

### C. Visual Regression Tests

**Using Playwright:**

```typescript
// tests/visual-regression.spec.ts
import { test, expect } from '@playwright/test';

const PAGES_TO_TEST = [
  { path: '/', name: 'home' },
  { path: '/about-us', name: 'about' },
  { path: '/types/basic-storage/economy-shed', name: 'economy-shed' },
  // ... all 37 pages
];

test.describe('Visual Regression Tests', () => {
  for (const page of PAGES_TO_TEST) {
    test(`${page.name} matches baseline`, async ({ page: browser }) => {
      await browser.goto(page.path);
      
      // Wait for content to load
      await browser.waitForLoadState('networkidle');
      
      // Take screenshot
      await expect(browser).toHaveScreenshot(`${page.name}.png`, {
        fullPage: true,
        maxDiffPixels: 100, // Allow small differences
      });
    });

    test(`${page.name} mobile matches baseline`, async ({ page: browser }) => {
      await browser.setViewportSize({ width: 375, height: 667 });
      await browser.goto(page.path);
      await browser.waitForLoadState('networkidle');
      
      await expect(browser).toHaveScreenshot(`${page.name}-mobile.png`, {
        fullPage: true,
        maxDiffPixels: 100,
      });
    });
  }
});
```

**Setup:**
```bash
npm install -D @playwright/test
npx playwright install
```

**Run:**
```bash
# Generate baseline screenshots
npx playwright test --update-snapshots

# Run visual regression tests
npx playwright test
```

### D. CMS Integration Tests

**Test File:** `tests/cms-integration.spec.ts`

```typescript
import { test, expect } from '@playwright/test';

test.describe('CMS Integration', () => {
  test('loads content from CMS when available', async ({ page }) => {
    await page.goto('/types/basic-storage/economy-shed');
    
    // Wait for CMS content to load
    await page.waitForSelector('h1');
    
    // Verify content loaded (not showing loading spinner)
    const loading = await page.locator('text=Loading...').count();
    expect(loading).toBe(0);
    
    // Verify actual content is present
    const title = await page.locator('h1').textContent();
    expect(title).toBeTruthy();
    expect(title).not.toBe('');
  });

  test('falls back to defaults when CMS unavailable', async ({ page }) => {
    // Block CMS requests
    await page.route('**/supabase.co/**', route => route.abort());
    
    await page.goto('/types/basic-storage/economy-shed');
    await page.waitForSelector('h1');
    
    // Should still show content (from defaults)
    const title = await page.locator('h1').textContent();
    expect(title).toContain('ECONOMY');
  });

  test('shows cache indicator when using cached content', async ({ page }) => {
    // Visit page normally first (loads to cache)
    await page.goto('/types/basic-storage/economy-shed');
    await page.waitForLoadState('networkidle');
    
    // Block CMS for second visit
    await page.route('**/supabase.co/**', route => route.abort());
    await page.goto('/types/basic-storage/economy-shed');
    
    // Should show cache warning
    const warning = await page.locator('text=/cached content/i').count();
    expect(warning).toBeGreaterThan(0);
  });
});
```

### E. Admin Functionality Tests

```typescript
// tests/admin.spec.ts
import { test, expect } from '@playwright/test';

test.describe('Admin Functionality', () => {
  test.beforeEach(async ({ page }) => {
    // Login as admin
    await page.goto('/admin/login');
    await page.fill('input[type="email"]', process.env.TEST_ADMIN_EMAIL);
    await page.fill('input[type="password"]', process.env.TEST_ADMIN_PASSWORD);
    await page.click('button[type="submit"]');
    await page.waitForURL('/admin');
  });

  test('admin bundle loads when visiting page', async ({ page }) => {
    await page.goto('/types/basic-storage/economy-shed');
    
    // Wait for admin UI to load
    await page.waitForSelector('button:has-text("Edit Page")');
    
    // Verify admin bundle was loaded
    const scripts = await page.evaluate(() => 
      Array.from(document.querySelectorAll('script[src]'))
        .map(s => s.getAttribute('src'))
    );
    
    const hasAdminBundle = scripts.some(src => 
      src && src.includes('admin')
    );
    expect(hasAdminBundle).toBe(true);
  });

  test('can edit page content inline', async ({ page }) => {
    await page.goto('/types/basic-storage/economy-shed');
    await page.waitForSelector('button:has-text("Edit Page")');
    
    // Enter edit mode
    await page.click('button:has-text("Edit Page")');
    await page.waitForSelector('button:has-text("Save Changes")');
    
    // Edit title
    const titleElement = await page.locator('h1').first();
    await titleElement.click();
    // Verify editable UI appears
    // (Implementation depends on InlineEditable component)
  });

  test('public users do not see admin UI', async ({ page, context }) => {
    // Create new context (not logged in)
    const publicPage = await context.newPage();
    await publicPage.goto('/types/basic-storage/economy-shed');
    
    // Verify NO admin UI
    const editButton = await publicPage.locator('button:has-text("Edit Page")').count();
    expect(editButton).toBe(0);
    
    // Verify admin bundle NOT loaded
    const scripts = await publicPage.evaluate(() => 
      Array.from(document.querySelectorAll('script[src]'))
        .map(s => s.getAttribute('src'))
    );
    
    const hasAdminBundle = scripts.some(src => 
      src && src.includes('admin')
    );
    expect(hasAdminBundle).toBe(false);
  });
});
```

## Running Tests

### Local Development

```bash
# Run all tests
npm test

# Run specific test suite
npm test -- cmsFallback.test.ts

# Run visual regression tests
npm run test:visual

# Run bundle size tests
npm run test:bundle

# Run E2E tests
npm run test:e2e
```

### CI/CD Pipeline

```yaml
# .github/workflows/test.yml
name: Tests

on: [push, pull_request]

jobs:
  unit-tests:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
      - run: npm ci
      - run: npm test

  bundle-size:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
      - run: npm ci
      - run: npm run build
      - run: npm run test:bundle

  visual-regression:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
      - run: npm ci
      - run: npx playwright install
      - run: npm run test:visual

  e2e:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
      - run: npm ci
      - run: npx playwright install
      - run: npm run test:e2e
    env:
      TEST_ADMIN_EMAIL: ${{ secrets.TEST_ADMIN_EMAIL }}
      TEST_ADMIN_PASSWORD: ${{ secrets.TEST_ADMIN_PASSWORD }}
```

## Test Coverage Goals

- **Unit Tests:** 80%+ coverage
- **Integration Tests:** All critical paths
- **E2E Tests:** All user workflows
- **Visual Regression:** All 37 pages
- **Performance Tests:** All builds

## Continuous Monitoring

### Production Monitoring

1. **Real User Monitoring (RUM):**
   - Track FCP, LCP, FID, CLS
   - Alert if > 10% regression

2. **Error Tracking:**
   - Sentry or similar
   - Alert on new error patterns

3. **Bundle Size Monitoring:**
   - Track size on every deployment
   - Alert if public bundle > 500KB

4. **CMS Health:**
   - Monitor uptime
   - Alert if downtime > 5 minutes

## Checklist: Before Declaring Tests Complete

- [ ] Unit tests written for all new utilities
- [ ] Bundle size tests passing
- [ ] Visual regression baselines created
- [ ] E2E tests cover admin workflows
- [ ] CI/CD pipeline configured
- [ ] Test documentation complete
- [ ] Team trained on running tests
- [ ] Monitoring dashboards set up

## Additional Resources

- [Playwright Documentation](https://playwright.dev)
- [Jest Documentation](https://jestjs.io)
- [Bundle Analyzer](https://github.com/btd/rollup-plugin-visualizer)
- [Web Vitals](https://web.dev/vitals/)
