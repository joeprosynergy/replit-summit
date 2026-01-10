import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { getBackendClient } from '@/lib/backendClient';
import { EditablePageWrapper } from '@/components/admin/EditablePageWrapper';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import NotFound from './NotFound';

interface PageContentData {
  heading?: string;
  tagline?: string;
  subheading?: string;
  cta_heading?: string;
  cta_description?: string;
  cta_button?: string;
  [key: string]: any;
}

interface SectionContentData {
  [key: string]: any;
}

const defaultContent: SectionContentData = {};

const DynamicPage = () => {
  const { '*': fullPath } = useParams();
  const slug = fullPath || '';
  const [exists, setExists] = useState<boolean | null>(null);
  const [pageData, setPageData] = useState<PageContentData | null>(null);

  useEffect(() => {
    const checkPageExists = async () => {
      const client = getBackendClient();
      
      if (!client || !slug) {
        setExists(false);
        return;
      }

      try {
        // Check page_content table and load content
        const { data: pageResult, error: pageError } = await (client as any)
          .from('page_content')
          .select('*')
          .eq('slug', slug)
          .limit(1);

        if (!pageError && pageResult && pageResult.length > 0) {
          setPageData(pageResult[0]);
          setExists(true);
          return;
        }

        // Also check section_content as fallback
        const { data: sectionData, error: sectionError } = await (client as any)
          .from('section_content')
          .select('id')
          .eq('page_slug', slug)
          .limit(1);

        if (!sectionError && sectionData && sectionData.length > 0) {
          setExists(true);
        } else {
          setExists(false);
        }
      } catch (err) {
        console.error('Error checking page:', err);
        setExists(false);
      }
    };

    checkPageExists();
  }, [slug]);

  if (exists === null) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-muted-foreground">Loading...</div>
      </div>
    );
  }

  if (!exists) {
    return <NotFound />;
  }

  return (
    <EditablePageWrapper slug={slug} defaultContent={defaultContent}>
      {({ content: sectionContent }) => (
        <div className="min-h-screen flex flex-col">
          <Header />
          <main className="flex-grow">
            <section className="py-16 bg-gradient-to-b from-primary/10 to-background">
              <div className="container mx-auto px-4 text-center">
                <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
                  {pageData?.heading || sectionContent.heading || sectionContent.title || 'Page Title'}
                </h1>
                {(pageData?.tagline || sectionContent.tagline || sectionContent.subtitle) && (
                  <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                    {pageData?.tagline || sectionContent.tagline || sectionContent.subtitle}
                  </p>
                )}
              </div>
            </section>
            
            {(pageData?.subheading || sectionContent.subheading || sectionContent.description) && (
              <section className="py-12">
                <div className="container mx-auto px-4">
                  <div className="prose prose-lg max-w-4xl mx-auto">
                    <p>{pageData?.subheading || sectionContent.subheading || sectionContent.description}</p>
                  </div>
                </div>
              </section>
            )}

            {(pageData?.cta_heading || sectionContent.cta_heading) && (
              <section className="py-12 bg-primary/5">
                <div className="container mx-auto px-4 text-center">
                  <h2 className="text-2xl font-bold mb-4">
                    {pageData?.cta_heading || sectionContent.cta_heading}
                  </h2>
                  {(pageData?.cta_description || sectionContent.cta_description) && (
                    <p className="text-muted-foreground mb-6">
                      {pageData?.cta_description || sectionContent.cta_description}
                    </p>
                  )}
                </div>
              </section>
            )}
          </main>
          <Footer />
        </div>
      )}
    </EditablePageWrapper>
  );
};

export default DynamicPage;
