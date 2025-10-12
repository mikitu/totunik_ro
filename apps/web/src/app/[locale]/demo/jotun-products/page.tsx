import { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import JotunHeroStatic from '@/components/jotun/static/JotunHeroStatic';
import JotunIntroductionStatic from '@/components/jotun/static/JotunIntroductionStatic';
import JotunProductCategoriesStatic from '@/components/jotun/static/JotunProductCategoriesStatic';
import JotunFeaturedProductsStatic from '@/components/jotun/static/JotunFeaturedProductsStatic';
import JotunCTAStatic from '@/components/jotun/static/JotunCTAStatic';

interface PageProps {
  params: Promise<{
    locale: string;
  }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  
  return {
    title: 'Jotun Products Demo - Premium Coatings & Paints | Totunik',
    description: 'Discover Jotun\'s premium coatings and finishes trusted by professionals worldwide. Totunik proudly partners with Jotun to deliver high-performance paints for residential, commercial, and industrial projects.',
    keywords: 'Jotun, premium paints, coatings, finishes, professional paints, interior paints, exterior paints, protective coatings, wood finishes, metal finishes, Totunik partnership',
    openGraph: {
      title: 'Jotun Products Demo - Premium Coatings & Paints | Totunik',
      description: 'Discover Jotun\'s premium coatings and finishes trusted by professionals worldwide.',
      type: 'website',
      locale: locale,
    },
  };
}

export default async function JotunProductsDemoPage({ params }: PageProps) {
  const { locale } = await params;
  
  return (
    <main className="font-sans text-gray-800">
      <Header />
      <JotunHeroStatic />
      <JotunIntroductionStatic />
      <JotunProductCategoriesStatic />
      <JotunFeaturedProductsStatic />
      <JotunCTAStatic />
      <Footer />
    </main>
  );
}
