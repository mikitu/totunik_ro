import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import JotunHero from '@/components/jotun/JotunHero';
import JotunIntroduction from '@/components/jotun/JotunIntroduction';
import JotunProductCategories from '@/components/jotun/JotunProductCategories';
import JotunFeaturedProducts from '@/components/jotun/JotunFeaturedProducts';
import JotunCTA from '@/components/jotun/JotunCTA';
import { strapiAPI } from '@/lib/strapi';

// Generate metadata dynamically from Strapi
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const jotunPage = await strapiAPI.getJotunPage();

  if (!jotunPage) {
    return {
      title: 'Jotun Products - Premium Coatings & Paints | Totunik',
      description: 'Discover Jotun\'s premium coatings and decorative paints. Totunik proudly partners with Jotun to deliver high-performance solutions for residential and industrial projects.',
    };
  }

  return {
    title: jotunPage.seo?.metaTitle || 'Jotun Products - Premium Coatings & Paints | Totunik',
    description: jotunPage.seo?.metaDescription || 'Discover Jotun\'s premium coatings and decorative paints. Totunik proudly partners with Jotun to deliver high-performance solutions for residential and industrial projects.',
    keywords: jotunPage.seo?.keywords || 'Jotun products, premium paints, coatings, interior paints, exterior paints, protective coatings, wood finishes, metal finishes, Totunik',
    openGraph: jotunPage.seo?.metaImage ? {
      images: [jotunPage.seo.metaImage.url],
    } : undefined,
  };
}

interface PageProps {
  params: Promise<{
    locale: string;
  }>;
}

export default async function JotunProductsPage({ params }: PageProps) {
  const { locale } = await params;

  // Fetch Jotun page data from Strapi
  const jotunPage = await strapiAPI.getJotunPage();

  if (!jotunPage) {
    notFound();
  }

  return (
    <main className="font-sans text-gray-800">
      <Header />

      {/* Hero Section */}
      {jotunPage.Hero && <JotunHero hero={jotunPage.Hero} />}

      {/* Introduction Section */}
      {jotunPage.Introduction && <JotunIntroduction introduction={jotunPage.Introduction} />}

      {/* Product Categories Section */}
      {jotunPage.ProductCategories && <JotunProductCategories productCategories={jotunPage.ProductCategories} />}

      {/* Featured Products Section */}
      {jotunPage.FeaturedProducts && <JotunFeaturedProducts featuredProducts={jotunPage.FeaturedProducts} />}

      {/* CTA Section */}
      {jotunPage.CTA && <JotunCTA cta={jotunPage.CTA} />}

      <Footer />
    </main>
  );
}
