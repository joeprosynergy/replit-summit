"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { toast } from 'sonner';
import {
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Database,
  Loader2,
  Play,
  RefreshCw,
} from 'lucide-react';
import { canonicalizePage, validateCanonicalPage, canonicalizePages, type CanonicalizeResult } from '@/lib/canonicalization';
import { extractEconomyShedStyleDefaults, extractSimplePageDefaults } from '@/lib/pageDefaultsExtractor';

/**
 * Page Migration Utility
 * Admin tool to batch-process pages and migrate them to canonical CMS format.
 */

interface MigrationStatus {
  slug: string;
  status: 'pending' | 'processing' | 'success' | 'error' | 'warning';
  message: string;
  pageId?: string;
  missingFields?: string[];
  errors?: string[];
}

// List of all pages to migrate (37 total)
const PAGES_TO_MIGRATE = [
  { slug: 'home', name: 'Home Page', type: 'landing' },
  { slug: 'about-us', name: 'About Us', type: 'content' },
  { slug: 'contact-us', name: 'Contact Us', type: 'content' },
  { slug: 'buyers-guide', name: 'Buyer\'s Guide', type: 'content' },
  { slug: 'gallery', name: 'Gallery', type: 'content' },
  { slug: 'financing', name: 'Financing', type: 'content' },
  { slug: 'privacy-policy', name: 'Privacy Policy', type: 'content' },
  { slug: 'inventory', name: 'Inventory', type: 'listing' },
  { slug: '3d-configurator', name: '3D Configurator', type: 'tool' },
  
  // Styles pages
  { slug: 'styles', name: 'Styles Overview', type: 'category' },
  { slug: 'styles-utility', name: 'Utility Style', type: 'style-detail' },
  { slug: 'styles-barn', name: 'Barn Style', type: 'style-detail' },
  { slug: 'styles-modern', name: 'Modern Style', type: 'style-detail' },
  { slug: 'greenhouse', name: 'Greenhouse Style', type: 'style-detail' },
  { slug: 'animal-shelters', name: 'Animal Shelters Style', type: 'style-detail' },
  
  // Types pages
  { slug: 'types', name: 'Types Overview', type: 'category' },
  { slug: 'basic-storage', name: 'Basic Storage', type: 'category' },
  { slug: 'deluxe-storage-cabins', name: 'Deluxe Storage & Cabins', type: 'category' },
  { slug: 'garages-carports', name: 'Garages & Carports', type: 'category' },
  
  // Product detail pages - Basic Storage
  { slug: 'economy-shed', name: 'Economy Shed', type: 'product-detail' },
  { slug: 'budget-pro-utility', name: 'Budget Pro - Utility', type: 'product-detail' },
  { slug: 'budget-pro-lofted-barn', name: 'Budget Pro - Lofted Barn', type: 'product-detail' },
  
  // Product detail pages - Deluxe Storage
  { slug: 'utility-shed', name: 'Pro Utility Shed', type: 'product-detail' },
  { slug: 'pro-lofted-barn', name: 'Pro Lofted Barn', type: 'product-detail' },
  { slug: 'cabin', name: 'Summit Cabin', type: 'product-detail' },
  { slug: 'barn-cabin', name: 'Barn Cabin', type: 'product-detail' },
  { slug: 'modern-shed', name: 'Modern Shed', type: 'product-detail' },
  
  // Product detail pages - Garages & Carports
  { slug: 'garage', name: 'Garage', type: 'product-detail' },
  { slug: 'carports', name: 'Carports', type: 'product-detail' },
];

export function PageMigrationUtility() {
  const [migrationStatuses, setMigrationStatuses] = useState<MigrationStatus[]>([]);
  const [isMigrating, setIsMigrating] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [selectedPages, setSelectedPages] = useState<string[]>([]);
  const [validationMode, setValidationMode] = useState(false);

  const successCount = migrationStatuses.filter(s => s.status === 'success').length;
  const errorCount = migrationStatuses.filter(s => s.status === 'error').length;
  const warningCount = migrationStatuses.filter(s => s.status === 'warning').length;

  const progress = totalPages > 0 ? (currentPage / totalPages) * 100 : 0;

  const handleMigrateAll = async () => {
    const pagesToMigrate = selectedPages.length > 0 
      ? PAGES_TO_MIGRATE.filter(p => selectedPages.includes(p.slug))
      : PAGES_TO_MIGRATE;

    await runMigration(pagesToMigrate);
  };

  const handleValidateAll = async () => {
    setValidationMode(true);
    const pagesToValidate = selectedPages.length > 0
      ? PAGES_TO_MIGRATE.filter(p => selectedPages.includes(p.slug))
      : PAGES_TO_MIGRATE;

    await runValidation(pagesToValidate);
  };

  const runMigration = async (pages: typeof PAGES_TO_MIGRATE) => {
    setIsMigrating(true);
    setValidationMode(false);
    setTotalPages(pages.length);
    setCurrentPage(0);
    setMigrationStatuses([]);

    const statuses: MigrationStatus[] = [];

    for (let i = 0; i < pages.length; i++) {
      const page = pages[i];
      setCurrentPage(i + 1);

      const status: MigrationStatus = {
        slug: page.slug,
        status: 'processing',
        message: 'Processing...',
      };
      statuses.push(status);
      setMigrationStatuses([...statuses]);

      try {
        // Import the page defaults dynamically
        const pageModule = await importPageDefaults(page.slug);
        
        if (!pageModule || !pageModule.defaults) {
          status.status = 'error';
          status.message = 'No defaults found for this page';
          setMigrationStatuses([...statuses]);
          continue;
        }

        // Extract canonical data
        // Use appropriate extractor based on page type
        const isSimpleContentPage = ['about-us', 'privacy-policy', 'contact-us', 'buyers-guide', 'financing'].includes(page.slug);
        const canonicalData = isSimpleContentPage
          ? extractSimplePageDefaults(page.slug, pageModule.defaults)
          : extractEconomyShedStyleDefaults(page.slug, pageModule.defaults);

        // Canonicalize page (allow overwrite to fix incorrectly migrated pages)
        const result = await canonicalizePage(page.slug, canonicalData, { overwrite: true });

        if (result.success) {
          status.status = 'success';
          status.message = result.message;
          status.pageId = result.pageId;

          // Skip validation for simple content pages (they use a different structure)
          if (!isSimpleContentPage) {
            // Validate after migration
            const validation = await validateCanonicalPage(page.slug, canonicalData);
            if (!validation.valid) {
              status.status = 'warning';
              status.message = 'Migrated with warnings';
              status.missingFields = validation.missingFields;
              status.errors = validation.errors;
            }
          }
        } else {
          status.status = 'error';
          status.message = result.message;
        }
      } catch (error) {
        status.status = 'error';
        status.message = error instanceof Error ? error.message : 'Unknown error during migration';
      }

      setMigrationStatuses([...statuses]);
      
      // Small delay to avoid overwhelming the database
      await new Promise(resolve => setTimeout(resolve, 200));
    }

    setIsMigrating(false);
    toast.success(`Migration complete: ${successCount} success, ${errorCount} errors`);
  };

  const runValidation = async (pages: typeof PAGES_TO_MIGRATE) => {
    setIsMigrating(true);
    setTotalPages(pages.length);
    setCurrentPage(0);
    setMigrationStatuses([]);

    const statuses: MigrationStatus[] = [];

    for (let i = 0; i < pages.length; i++) {
      const page = pages[i];
      setCurrentPage(i + 1);

      const status: MigrationStatus = {
        slug: page.slug,
        status: 'processing',
        message: 'Validating...',
      };
      statuses.push(status);
      setMigrationStatuses([...statuses]);

      try {
        // Import the page defaults dynamically
        const pageModule = await importPageDefaults(page.slug);
        
        if (!pageModule || !pageModule.defaults) {
          status.status = 'error';
          status.message = 'No defaults found for validation';
          setMigrationStatuses([...statuses]);
          continue;
        }

        // Extract canonical data
        // Use appropriate extractor based on page type
        const isSimpleContentPage = ['about-us', 'privacy-policy', 'contact-us', 'buyers-guide', 'financing'].includes(page.slug);
        const canonicalData = isSimpleContentPage
          ? extractSimplePageDefaults(page.slug, pageModule.defaults)
          : extractEconomyShedStyleDefaults(page.slug, pageModule.defaults);

        // Validate
        const validation = await validateCanonicalPage(page.slug, canonicalData);

        if (validation.valid) {
          status.status = 'success';
          status.message = '✓ Page is fully canonical';
        } else if (validation.errors.length > 0) {
          status.status = 'error';
          status.message = validation.errors.join(', ');
          status.errors = validation.errors;
        } else {
          status.status = 'warning';
          status.message = `Missing fields: ${validation.missingFields.length}`;
          status.missingFields = validation.missingFields;
        }
      } catch (error) {
        status.status = 'error';
        status.message = error instanceof Error ? error.message : 'Validation failed';
      }

      setMigrationStatuses([...statuses]);
      
      await new Promise(resolve => setTimeout(resolve, 100));
    }

    setIsMigrating(false);
    toast.success(`Validation complete`);
  };

  const togglePageSelection = (slug: string) => {
    setSelectedPages(prev =>
      prev.includes(slug) ? prev.filter(s => s !== slug) : [...prev, slug]
    );
  };

  const selectAll = () => {
    setSelectedPages(PAGES_TO_MIGRATE.map(p => p.slug));
  };

  const deselectAll = () => {
    setSelectedPages([]);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Database className="w-5 h-5" />
          Page Migration Utility
        </CardTitle>
        <CardDescription>
          Batch-process pages to migrate them from code-based defaults to canonical CMS format.
          {selectedPages.length > 0 && ` (${selectedPages.length} selected)`}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Controls */}
        <div className="flex flex-wrap gap-3">
          <Button
            onClick={handleMigrateAll}
            disabled={isMigrating}
            variant="default"
          >
            {isMigrating && !validationMode ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Play className="mr-2 h-4 w-4" />
            )}
            {selectedPages.length > 0 ? `Migrate ${selectedPages.length} Pages` : 'Migrate All Pages'}
          </Button>

          <Button
            onClick={handleValidateAll}
            disabled={isMigrating}
            variant="secondary"
          >
            {isMigrating && validationMode ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <CheckCircle2 className="mr-2 h-4 w-4" />
            )}
            Validate Pages
          </Button>

          <Button
            onClick={selectAll}
            disabled={isMigrating}
            variant="outline"
            size="sm"
          >
            Select All
          </Button>

          <Button
            onClick={deselectAll}
            disabled={isMigrating}
            variant="outline"
            size="sm"
          >
            Deselect All
          </Button>
        </div>

        {/* Progress */}
        {isMigrating && (
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span>
                {validationMode ? 'Validating' : 'Migrating'} page {currentPage} of {totalPages}
              </span>
              <span>{Math.round(progress)}%</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
        )}

        {/* Summary */}
        {migrationStatuses.length > 0 && (
          <div className="flex gap-4">
            <Badge variant="default" className="gap-1">
              <CheckCircle2 className="w-3 h-3" />
              {successCount} Success
            </Badge>
            {warningCount > 0 && (
              <Badge variant="secondary" className="gap-1">
                <AlertTriangle className="w-3 h-3" />
                {warningCount} Warnings
              </Badge>
            )}
            {errorCount > 0 && (
              <Badge variant="destructive" className="gap-1">
                <XCircle className="w-3 h-3" />
                {errorCount} Errors
              </Badge>
            )}
          </div>
        )}

        {/* Page List */}
        <ScrollArea className="h-[400px] border rounded-lg p-4">
          <div className="space-y-2">
            {PAGES_TO_MIGRATE.map((page) => {
              const status = migrationStatuses.find(s => s.slug === page.slug);
              const isSelected = selectedPages.includes(page.slug);

              return (
                <div
                  key={page.slug}
                  className={`flex items-start justify-between p-3 rounded-lg border transition-colors cursor-pointer hover:bg-muted/50 ${
                    isSelected ? 'bg-muted border-primary' : 'bg-background'
                  }`}
                  onClick={() => !isMigrating && togglePageSelection(page.slug)}
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h4 className="font-medium">{page.name}</h4>
                      <Badge variant="outline" className="text-xs">
                        {page.type}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">{page.slug}</p>
                    
                    {status && (
                      <div className="mt-2">
                        <p className="text-sm">{status.message}</p>
                        {status.missingFields && status.missingFields.length > 0 && (
                          <p className="text-xs text-yellow-600 mt-1">
                            Missing: {status.missingFields.slice(0, 3).join(', ')}
                            {status.missingFields.length > 3 && ` +${status.missingFields.length - 3} more`}
                          </p>
                        )}
                        {status.errors && status.errors.length > 0 && (
                          <p className="text-xs text-destructive mt-1">
                            {status.errors[0]}
                          </p>
                        )}
                      </div>
                    )}
                  </div>

                  {status && (
                    <div className="ml-4">
                      {status.status === 'success' && (
                        <CheckCircle2 className="w-5 h-5 text-green-500" />
                      )}
                      {status.status === 'error' && (
                        <XCircle className="w-5 h-5 text-destructive" />
                      )}
                      {status.status === 'warning' && (
                        <AlertTriangle className="w-5 h-5 text-yellow-500" />
                      )}
                      {status.status === 'processing' && (
                        <Loader2 className="w-5 h-5 animate-spin text-primary" />
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </ScrollArea>

        {/* Help Text */}
        <div className="text-sm text-muted-foreground space-y-2 border-t pt-4">
          <p><strong>Migration:</strong> Extracts default content from code and persists to CMS database.</p>
          <p><strong>Validation:</strong> Checks if CMS data is complete and matches expected structure.</p>
          <p><strong>Note:</strong> Migration is non-destructive and skips pages that are already canonical.</p>
        </div>
      </CardContent>
    </Card>
  );
}

/**
 * Dynamic import helper for page defaults.
 * Attempts to import extracted defaults for the given page slug.
 */
async function importPageDefaults(slug: string): Promise<{ defaults: Record<string, unknown> } | null> {
  try {
    console.log(`[Migration] Attempting to import defaults for: ${slug}`);
    
    // Import defaults for refactored pages
    if (slug === 'economy-shed') {
      const { economyShedDefaults } = await import('@/data/defaults/economyShedDefaults');
      console.log(`[Migration] Successfully imported economy-shed defaults`);
      return { defaults: economyShedDefaults as unknown as Record<string, unknown> };
    }
    
    if (slug === 'contact-us') {
      const { contactUsDefaults } = await import('@/data/defaults/contactUsDefaults');
      console.log(`[Migration] Successfully imported contact-us defaults`);
      return { defaults: contactUsDefaults as unknown as Record<string, unknown> };
    }
    
    if (slug === 'about-us') {
      const { aboutUsDefaults } = await import('@/data/defaults/aboutUsDefaults');
      console.log(`[Migration] Successfully imported about-us defaults`);
      return { defaults: aboutUsDefaults as unknown as Record<string, unknown> };
    }
    
    if (slug === 'privacy-policy') {
      const { privacyPolicyDefaults } = await import('@/data/defaults/privacyPolicyDefaults');
      console.log(`[Migration] Successfully imported privacy-policy defaults`);
      return { defaults: privacyPolicyDefaults as unknown as Record<string, unknown> };
    }
    
    if (slug === 'buyers-guide') {
      const { buyersGuideDefaults } = await import('@/data/defaults/buyersGuideDefaults');
      console.log(`[Migration] Successfully imported buyers-guide defaults`);
      return { defaults: buyersGuideDefaults as unknown as Record<string, unknown> };
    }
    
    if (slug === 'financing') {
      const { financingDefaults } = await import('@/data/defaults/financingDefaults');
      console.log(`[Migration] Successfully imported financing defaults`);
      return { defaults: financingDefaults as unknown as Record<string, unknown> };
    }
    
    // For all other pages, return null (not yet refactored)
    console.warn(`[Migration] No defaults file found for ${slug}. This page needs to be refactored first.`);
    return null;
  } catch (error) {
    console.error(`[Migration] Failed to import defaults for ${slug}:`, error);
    return null;
  }
}
