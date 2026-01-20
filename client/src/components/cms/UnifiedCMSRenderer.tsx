import { useState, useEffect } from 'react';
import { CMSFallbackManager } from '@/lib/cmsFallback';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useOptionalAdminAuth } from '@/contexts/useOptionalAdminAuth';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

/**
 * Unified CMS Renderer
 * Dynamically renders pages from CMS database with section-based rendering.
 * Supports fallback to defaults when CMS is unavailable.
 */

interface PageData {
  id: string;
  slug: string;
  heading?: string;
  subheading?: string;
  tagline?: string;
  meta_title?: string;
  meta_description?: string;
  cta_heading?: string;
  cta_description?: string;
  cta_button?: string;
  layout_config?: Record<string, unknown>;
  is_canonical?: boolean;
  template_type?: string;
  status?: string;
  seo_config?: Record<string, unknown>;
}

interface SectionData {
  id: string;
  page_id: string;
  page_slug: string;
  section_name: string;
  section_type?: string;
  order_index: number;
  content: Record<string, unknown>;
  layout_config?: Record<string, unknown>;
  is_visible?: boolean;
}

interface UnifiedCMSRendererProps {
  pageSlug: string;
  fallbackContent?: Record<string, unknown>;
  mode?: 'view' | 'edit';
}

export function UnifiedCMSRenderer({ 
  pageSlug, 
  fallbackContent,
  mode = 'view' 
}: UnifiedCMSRendererProps) {
  const [page, setPage] = useState<PageData | null>(null);
  const [sections, setSections] = useState<SectionData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [source, setSource] = useState<'cms' | 'cache' | 'defaults'>('cms');
  
  const { isAdmin } = useOptionalAdminAuth();

  useEffect(() => {
    fetchPageContent();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageSlug]);

  async function fetchPageContent() {
    setIsLoading(true);
    setError(null);

    try {
      // Try CMS with fallback strategy
      const result = await CMSFallbackManager.getContent(pageSlug);

      if (result.data) {
        // Extract page and sections from result
        const pageData = result.data._page || null;
        const sectionsData = result.data._sections || [];

        setPage(pageData);
        setSections(sectionsData);
        setSource(result.source);
      } else if (fallbackContent) {
        // Use provided fallback
        setPage({
          id: '',
          slug: pageSlug,
          heading: fallbackContent.heading || fallbackContent.title || '',
          subheading: fallbackContent.subheading || fallbackContent.subtitle || '',
          tagline: fallbackContent.tagline || fallbackContent.description || '',
        });
        setSections([{
          id: '',
          page_id: '',
          page_slug: pageSlug,
          section_name: 'main',
          section_type: 'content',
          order_index: 0,
          content: fallbackContent,
          is_visible: true,
        }]);
        setSource('defaults');
      } else {
        setError('Page not found');
      }
    } catch (err: any) {
      console.error('[UnifiedCMSRenderer] Error fetching page:', err);
      setError(err.message || 'Failed to load page');
      
      // Last resort fallback
      if (fallbackContent) {
        setPage({
          id: '',
          slug: pageSlug,
          heading: fallbackContent.heading || fallbackContent.title || '',
        });
        setSections([{
          id: '',
          page_id: '',
          page_slug: pageSlug,
          section_name: 'main',
          section_type: 'content',
          order_index: 0,
          content: fallbackContent,
          is_visible: true,
        }]);
        setSource('defaults');
      }
    } finally {
      setIsLoading(false);
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow flex items-center justify-center">
          <div className="text-center space-y-4">
            <div className="animate-pulse text-lg text-muted-foreground">Loading content...</div>
            {source === 'cache' && (
              <div className="text-sm text-muted-foreground">Using cached content</div>
            )}
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (error && !page) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow flex items-center justify-center">
          <div className="text-center space-y-4 max-w-md px-4">
            <h1 className="text-2xl font-bold text-foreground">Page Not Found</h1>
            <p className="text-muted-foreground">{error}</p>
            <Button asChild>
              <a href="/">
                <ArrowRight className="mr-2 h-4 w-4" />
                Return Home
              </a>
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!page) {
    return null;
  }

  // Render based on template type
  const templateType = page.template_type || 'default';

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      {source !== 'cms' && (
        <div className="bg-yellow-50 border-b border-yellow-200 py-2 px-4 text-center">
          <p className="text-sm text-yellow-800">
            {source === 'cache' && '⚠️ Showing cached content (CMS connection issue)'}
            {source === 'defaults' && '⚠️ Showing default content (CMS unavailable)'}
          </p>
        </div>
      )}

      <main className="flex-grow">
        {sections
          .filter(section => section.is_visible !== false)
          .sort((a, b) => a.order_index - b.order_index)
          .map((section) => (
            <SectionRenderer
              key={section.id || section.section_name}
              section={section}
              editable={mode === 'edit' && isAdmin}
            />
          ))}
      </main>
      
      <Footer />
    </div>
  );
}

/**
 * Section Renderer
 * Renders individual sections based on section type.
 */
interface SectionRendererProps {
  section: SectionData;
  editable?: boolean;
}

function SectionRenderer({ section, editable }: SectionRendererProps) {
  const { section_type, content, layout_config } = section;

  // Build section style from layout_config
  const sectionStyle: React.CSSProperties = {
    backgroundColor: layout_config?.backgroundColor || 'transparent',
    paddingTop: layout_config?.paddingTop || '4rem',
    paddingBottom: layout_config?.paddingBottom || '4rem',
  };

  const alignmentClass =
    layout_config?.textAlignment === 'left'
      ? 'text-left'
      : layout_config?.textAlignment === 'right'
        ? 'text-right'
        : 'text-center';

  switch (section_type) {
    case 'hero':
    case 'product-hero':
      return (
        <section style={sectionStyle} className="relative">
          <div className={`container mx-auto px-4 ${alignmentClass}`}>
            {content.titleHighlight && (
              <span className="text-primary text-lg font-semibold">
                {content.titleHighlight}
              </span>
            )}
            {content.title && (
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
                {content.title}
              </h1>
            )}
            {content.heading && (
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
                {content.heading}
              </h1>
            )}
            {content.subtitle && (
              <p className="text-xl text-muted-foreground mb-4">
                {content.subtitle}
              </p>
            )}
            {content.description && (
              <p className="text-muted-foreground max-w-3xl mx-auto mb-6">
                {content.description}
              </p>
            )}
            {content.heroImage && (
              <div className="mt-8">
                <img
                  src={content.heroImage}
                  alt={content.heroImageAlt || content.title || 'Hero image'}
                  className="rounded-lg shadow-xl max-w-full"
                />
              </div>
            )}
          </div>
        </section>
      );

    case 'cta':
      return (
        <section style={sectionStyle}>
          <div className={`container mx-auto px-4 ${alignmentClass}`}>
            {content.heading && (
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                {content.heading}
              </h2>
            )}
            {content.ctaHeading && (
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                {content.ctaHeading}
              </h2>
            )}
            {content.description && (
              <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
                {content.description}
              </p>
            )}
            {content.ctaDescription && (
              <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
                {content.ctaDescription}
              </p>
            )}
            {content.button && (
              <Button asChild size="lg">
                <a
                  href={content.buttonLink || '#'}
                  target={content.buttonTarget === '_blank' ? '_blank' : undefined}
                  rel={content.buttonTarget === '_blank' ? 'noopener noreferrer' : undefined}
                >
                  {content.button}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </a>
              </Button>
            )}
            {content.ctaPrimaryButton && (
              <Button asChild size="lg">
                <a
                  href={content.ctaPrimaryButtonLink || '#'}
                  target={content.ctaPrimaryButtonOpenInNewTab ? '_blank' : undefined}
                  rel={content.ctaPrimaryButtonOpenInNewTab ? 'noopener noreferrer' : undefined}
                >
                  {content.ctaPrimaryButton}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </a>
              </Button>
            )}
          </div>
        </section>
      );

    case 'gallery':
      return (
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {Object.entries(content)
                .filter(([key]) => key.startsWith('galleryImage') && !key.endsWith('Alt'))
                .map(([key, src]) => {
                  const altKey = `${key}Alt`;
                  const alt = content[altKey] || 'Gallery image';
                  return (
                    <img
                      key={key}
                      src={src as string}
                      alt={alt}
                      className="w-full aspect-video object-cover rounded-lg"
                    />
                  );
                })}
            </div>
          </div>
        </section>
      );

    case 'content':
    case 'default':
    default:
      return (
        <section style={sectionStyle}>
          <div className={`container mx-auto px-4 ${alignmentClass}`}>
            <div className="prose prose-lg max-w-none">
              {Object.entries(content).map(([key, value]) => {
                if (typeof value === 'string') {
                  return (
                    <div key={key} className="mb-4">
                      <p>{value}</p>
                    </div>
                  );
                }
                return null;
              })}
            </div>
          </div>
        </section>
      );
  }
}

// Hook exported from separate file to avoid react-refresh warnings
export { useCMSPage } from '@/hooks/useCMSPage';
