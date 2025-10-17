import ProjectsPortfolioPage from '@/components/projects-portfolio/ProjectsPortfolioPage';
import { LOCALES } from '@/lib/i18n';
import { strapiAPI } from '@/lib/strapi';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

interface PageProps {
  params: Promise<{ locale: string }>;
}

export async function generateStaticParams() {
  return LOCALES.map(locale => ({ locale: locale.code }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;

  const portfolioData = await strapiAPI.getProjectsPortfolio(locale);

  const title = portfolioData?.seo?.metaTitle || 'Projects Portfolio - Totunik';
  const description =
    portfolioData?.seo?.metaDescription ||
    'Explore our portfolio of completed projects using Totunik & Jotun products. From residential to industrial applications.';

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'website',
    },
    alternates: {
      languages: {
        en: '/en/projects-portfolio',
        ro: '/ro/projects-portfolio',
        tr: '/tr/projects-portfolio',
      },
    },
  };
}

export default async function ProjectsPortfolioPageRoute({ params }: PageProps) {
  const { locale } = await params;

  // Validate locale
  const isValidLocale = LOCALES.some(l => l.code === locale);
  if (!isValidLocale) {
    notFound();
  }

  // Fetch portfolio data with fallback
  const portfolioData = await strapiAPI.getProjectsPortfolio(locale);

  // If API fails, use static fallback
  if (!portfolioData) {
    console.log('Portfolio API failed, returning 404');
    notFound();
  }

  return <ProjectsPortfolioPage data={portfolioData} />;
}
