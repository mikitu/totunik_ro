import { notFound } from 'next/navigation';
import { LOCALES, type LocaleCode } from '@/lib/i18n';
import HomePage from '../home-page';

interface PageProps {
  params: Promise<{
    locale: string;
  }>;
}

// Generate static params for all supported locales
export async function generateStaticParams() {
  return LOCALES.map((locale) => ({
    locale: locale.code,
  }));
}

export default async function LocalizedHomePage({ params }: PageProps) {
  const { locale } = await params;
  
  // Validate locale
  const isValidLocale = LOCALES.some(l => l.code === locale);
  if (!isValidLocale) {
    notFound();
  }

  // Render the same homepage component but with locale context
  return <HomePage />;
}

// Generate metadata for localized homepage
export async function generateMetadata({ params }: PageProps) {
  const { locale } = await params;
  
  const localeData = LOCALES.find(l => l.code === locale);
  if (!localeData) {
    return {
      title: 'Totunik - Premium Jotun Paints & Coatings',
      description: 'Leading distributor of Jotun paints in Romania. Premium decorative, industrial, and marine coatings for residential and commercial projects.',
    };
  }

  // You can customize metadata per locale here
  const titles = {
    en: 'Totunik - Premium Jotun Paints & Coatings',
    ro: 'Totunik - Vopsele și Acoperiri Premium Jotun',
    tr: 'Totunik - Premium Jotun Boyalar ve Kaplamalar',
  };

  const descriptions = {
    en: 'Leading distributor of Jotun paints in Romania. Premium decorative, industrial, and marine coatings for residential and commercial projects.',
    ro: 'Distribuitorul principal de vopsele Jotun în România. Acoperiri premium decorative, industriale și marine pentru proiecte rezidențiale și comerciale.',
    tr: 'Romanya\'da önde gelen Jotun boya distribütörü. Konut ve ticari projeler için premium dekoratif, endüstriyel ve denizcilik kaplamaları.',
  };

  return {
    title: titles[locale as LocaleCode] || titles.en,
    description: descriptions[locale as LocaleCode] || descriptions.en,
    alternates: {
      languages: {
        en: '/en',
        ro: '/ro',
        tr: '/tr',
        'x-default': '/',
      },
    },
  };
}
