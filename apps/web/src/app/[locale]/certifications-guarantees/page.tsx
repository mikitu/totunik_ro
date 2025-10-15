import CertificateImages from '@/components/certifications/CertificateImages';
import CertificationsHero from '@/components/certifications/CertificationsHero';
import CertificationsSection from '@/components/certifications/CertificationsSection';
import GuaranteesSection from '@/components/certifications/GuaranteesSection';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import { strapiAPI } from '@/lib/strapi';
import { Metadata } from 'next';

interface PageProps {
  params: Promise<{
    locale: string;
  }>;
}

// Static data for development until Strapi is populated
const staticData = {
  id: 1,
  documentId: 'static-certifications',
  hero: {
    id: 1,
    title: 'Certifications & Guarantees',
    subtitle: 'Our Commitment to Quality and Safety',
    description:
      'At Totunik, we believe that long-lasting partnerships are built on trust, performance, and accountability. Every project we deliver meets the highest international standards for quality, environmental care, and workplace safety — certified by globally recognized ISO systems.',
    backgroundImage: {
      id: 1,
      documentId: 'static-hero-bg',
      name: 'certifications-hero-bg.jpg',
      alternativeText: 'Professional construction and quality assurance background',
      width: 1926,
      height: 1284,
      hash: 'certifications_hero_bg',
      ext: '.jpg',
      mime: 'image/jpeg',
      size: 245.6,
      url: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?q=80&w=1926&auto=format&fit=crop&ixlib=rb-4.0.3',
      provider: 'unsplash',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  },
  certificationsSection: {
    id: 1,
    title: 'Our Certifications',
    certifications: [
      {
        id: 1,
        title: 'ISO 9001',
        subtitle: 'Quality Management',
        description:
          'Demonstrates our commitment to consistent quality in every aspect of our work — from materials and processes to client satisfaction and continuous improvement.',
        icon: 'check-circle' as const,
        iconColor: 'green' as const,
      },
      {
        id: 2,
        title: 'ISO 14001',
        subtitle: 'Environmental Management',
        description:
          'Confirms our dedication to reducing environmental impact through efficient use of resources, responsible waste management, and sustainable business practices.',
        icon: 'leaf' as const,
        iconColor: 'green' as const,
      },
      {
        id: 3,
        title: 'ISO 45001',
        subtitle: 'Occupational Health & Safety',
        description:
          'Ensures a safe, healthy, and well-managed working environment for our teams and partners across all project stages.',
        icon: 'shield-check' as const,
        iconColor: 'blue' as const,
      },
    ],
  },
  guaranteesSection: {
    id: 1,
    title: 'Guarantees',
    guaranteeTitle: 'Totunik + Jotun Guarantee',
    guaranteeDescription:
      'Each coating system applied under the Totunik–Jotun partnership is covered by an official guarantee that includes:',
    guaranteeFeatures: [
      { id: 1, text: 'Colour retention' },
      { id: 2, text: 'Anti-corrosion protection' },
      { id: 3, text: 'Durability of the finishing layer' },
    ],
    additionalInfo:
      'Guarantee periods are adapted to the type of project, ensuring tailored protection for residential, industrial, medical, and retail applications.',
  },
  certificateImages: {
    id: 1,
    title: 'Our Certifications',
    subtitle: 'Certified under international standards',
    certificates: [
      {
        id: 1,
        title: 'ISO 9001',
        subtitle: 'Quality Management',
        image: undefined,
      },
      {
        id: 2,
        title: 'ISO 14001',
        subtitle: 'Environmental Management',
        image: undefined,
      },
      {
        id: 3,
        title: 'ISO 45001',
        subtitle: 'Occupational Health & Safety',
        image: undefined,
      },
    ],
  },
  seo: {
    id: 1,
    metaTitle: 'Certifications & Guarantees | Totunik - Quality Assurance',
    metaDescription:
      "Discover Totunik's ISO certifications and comprehensive guarantees. We deliver projects meeting the highest international standards for quality, environmental care, and workplace safety.",
    keywords:
      'ISO 9001, ISO 14001, ISO 45001, quality management, environmental management, occupational health safety, Jotun guarantee, coating warranty',
  },
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  publishedAt: new Date().toISOString(),
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  await params; // Consume params to avoid unused variable warning

  // Try to fetch from Strapi, fallback to static data
  const certificationsPage = await strapiAPI.getCertificationsGuaranteesPage();
  const seo = certificationsPage?.seo || staticData.seo;

  return {
    title: seo.metaTitle,
    description: seo.metaDescription,
    keywords: seo.keywords,
    openGraph: {
      title: seo.metaTitle,
      description: seo.metaDescription,
      images: 'metaImage' in seo && seo.metaImage ? [seo.metaImage.url] : [],
    },
  };
}

export default async function CertificationsGuaranteesPage({ params }: PageProps) {
  await params; // Consume params to avoid unused variable warning

  // Try to fetch from Strapi, fallback to static data
  let certificationsPage;
  try {
    certificationsPage = await strapiAPI.getCertificationsGuaranteesPage();
  } catch (error) {
    console.error('Error fetching certifications page:', error);
    certificationsPage = null;
  }
  // Use static data if Strapi data is not available or incomplete
  const pageData = {
    hero: certificationsPage?.hero || staticData.hero,
    certificationsSection:
      certificationsPage?.certificationsSection || staticData.certificationsSection,
    guaranteesSection: certificationsPage?.guaranteesSection || staticData.guaranteesSection,
    certificateImages: certificationsPage?.certificateImages || staticData.certificateImages,
  };

  return (
    <main className="font-sans text-gray-800">
      <Header />

      {/* Hero Section */}
      <CertificationsHero hero={pageData.hero} />

      {/* Certifications Section */}
      <CertificationsSection certificationsSection={pageData.certificationsSection} />

      {/* Guarantees Section */}
      <GuaranteesSection guaranteesSection={pageData.guaranteesSection} />

      {/* Certificate Images Section */}
      <CertificateImages certificateImages={pageData.certificateImages} />

      <Footer />
    </main>
  );
}
