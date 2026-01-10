import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { getBackendClient } from '@/lib/backendClient';
import { EditablePageWrapper } from '@/components/admin/EditablePageWrapper';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import NotFound from './NotFound';

interface PageContent {
  title?: string;
  subtitle?: string;
  description?: string;
  [key: string]: any;
}

const defaultContent: PageContent = {
  title: 'Page Title',
  subtitle: 'Page Subtitle',
  description: 'Page description goes here.',
};

const DynamicPage = () => {
  const { '*': fullPath } = useParams();
  const slug = fullPath || '';
  const [exists, setExists] = useState<boolean | null>(null);

  useEffect(() => {
    const checkPageExists = async () => {
      const client = getBackendClient();
      if (!client || !slug) {
        setExists(false);
        return;
      }

      try {
        const { data, error } = await (client as any)
          .from('section_content')
          .select('id')
          .eq('slug', slug)
          .limit(1);

        if (error || !data || data.length === 0) {
          setExists(false);
        } else {
          setExists(true);
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
      {({ content: pageContent }) => (
        <div className="min-h-screen flex flex-col">
          <Header />
          <main className="flex-grow">
            <section className="py-16 bg-gradient-to-b from-primary/10 to-background">
              <div className="container mx-auto px-4 text-center">
                <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
                  {pageContent.title}
                </h1>
                {pageContent.subtitle && (
                  <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                    {pageContent.subtitle}
                  </p>
                )}
              </div>
            </section>
            
            <section className="py-12">
              <div className="container mx-auto px-4">
                <div className="prose prose-lg max-w-4xl mx-auto">
                  <p>{pageContent.description}</p>
                </div>
              </div>
            </section>
          </main>
          <Footer />
        </div>
      )}
    </EditablePageWrapper>
  );
};

export default DynamicPage;
