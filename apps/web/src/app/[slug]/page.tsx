import { notFound } from 'next/navigation';
import { strapiAPI, type StrapiPage } from '@/lib/strapi';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function DynamicPage({ params }: PageProps) {
  const { slug } = await params;
  
  // Fetch page data from Strapi
  const page: StrapiPage | null = await strapiAPI.getPageBySlug(slug);

  if (!page) {
    notFound();
  }

  return (
    <main className="font-sans text-gray-800">
      <Header />

      {/* Page Content */}
      <div className="container mx-auto py-16 px-6">
        <article className="max-w-4xl mx-auto">
          <header className="mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              {page.title}
            </h1>
            {page.publishedAt && (
              <time className="text-gray-500 text-sm">
                Published on {new Date(page.publishedAt).toLocaleDateString()}
              </time>
            )}
          </header>
          
          <div className="prose prose-lg max-w-none">
            {page.content ? (
              <div
                className="text-gray-700 leading-relaxed"
                dangerouslySetInnerHTML={{ __html: page.content }}
              />
            ) : (
              <div className="text-gray-700 leading-relaxed">
                <p>This page is currently being updated. Please check back later for content.</p>
              </div>
            )}
          </div>
        </article>
      </div>

      <Footer />
    </main>
  );
}

// Generate static params for known pages (optional, for better performance)
export async function generateStaticParams(): Promise<{ slug: string }[]> {
  try {
    const pages = await strapiAPI.getAllPages();
    return pages
      .filter((page) => page.slug && typeof page.slug === 'string')
      .map((page) => ({
        slug: page.slug,
      }));
  } catch (error) {
    console.error('Error generating static params:', error);
    return [];
  }
}
