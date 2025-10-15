import Footer from '@/components/Footer';
import Header from '@/components/Header';
import { strapiAPI, type StrapiPage } from '@/lib/strapi';
import { notFound, redirect } from 'next/navigation';

interface PageProps {
  params: Promise<{ slug?: string[] }>; // catch-all slug
}

export default async function DynamicPage({ params }: PageProps) {
  const slugParts = (await params).slug || []; // e.g. [] for homepage, ["en", "about"], ["en","parent","child"]

  let pageSlug: string | undefined;
  // let locale = detectLocale() || "en";
  let locale: string = 'en';
  // Handle locale-prefixed URLs using LOCALES
  const { LOCALES, extractLocaleFromPathSlug } = await import('@/lib/i18n');
  const localeCodes = LOCALES.map(l => l.code) as string[];
  const foundLocale = extractLocaleFromPathSlug(slugParts);
  if (foundLocale) {
    pageSlug = slugParts[slugParts.length - 1];
    locale = foundLocale;
  } else {
    pageSlug = slugParts[slugParts.length - 1];
  }
  if (pageSlug && pageSlug.length === 2 && localeCodes.includes(pageSlug)) {
    locale = pageSlug;
    pageSlug = undefined;
  }

  // If we have only a locale (like /en, /ro) and no page slug,
  // this should be handled by [locale]/page.tsx, not this catch-all route
  if (!pageSlug) {
    // If we have a locale but no page slug, redirect to the locale homepage
    if (foundLocale && slugParts.length === 1) {
      return redirect(`/${foundLocale}`);
    }
    // Otherwise redirect to root homepage
    return redirect('/');
  }

  // Fetch page data from Strapi (locale auto-detected)
  const page: StrapiPage | null = await strapiAPI.getPageBySlug(pageSlug);

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
            <h1 className="text-4xl font-bold text-gray-900 mb-4">{page.title}</h1>
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
                dangerouslySetInnerHTML={{ __html: page.content ?? '' }}
              />
            ) : (
              <p className="text-gray-700 leading-relaxed">
                This page is currently being updated. Please check back later.
              </p>
            )}
          </div>
        </article>
      </div>

      <Footer />
    </main>
  );
}

// Optional: pre-generate known slugs
export async function generateStaticParams() {
  try {
    const pages = await strapiAPI.getAllPages();

    return pages
      .filter(page => page.slug && typeof page.slug === 'string')
      .map(page => ({
        slug: [page.slug], // must be an array for [...slug]
      }));
  } catch (error) {
    console.error('Error generating static params:', error);
    return [];
  }
}
