import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { strapiAPI } from '@/lib/strapi';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BusinessPartnersHero from '@/components/business-partners/BusinessPartnersHero';
import PartnershipPhilosophy from '@/components/business-partners/PartnershipPhilosophy';
import PartnershipCategories from '@/components/business-partners/PartnershipCategories';
import PartnershipPillars from '@/components/business-partners/PartnershipPillars';
import PartnerShowcase from '@/components/business-partners/PartnerShowcase';
import SuccessStories from '@/components/business-partners/SuccessStories';
import PartnershipCTA from '@/components/business-partners/PartnershipCTA';

interface BusinessPartnersPageProps {
  params: Promise<{ locale: string }>;
}

export default async function BusinessPartnersPage({ params }: BusinessPartnersPageProps) {
  // Await params in Next.js 15+
  const { locale } = await params;

  // Fetch business partners data from Strapi
  const businessPartnersData = await strapiAPI.getBusinessPartners();

  // Show fallback content if data is not available (e.g., API permissions not set)
  if (!businessPartnersData) {
    console.error('Business partners data not found - showing fallback content');
  }

  return (
    <>
      <Header />

      {businessPartnersData ? (
        <>
          {/* Hero Section */}
          {businessPartnersData.hero && (businessPartnersData.hero as any).title && (
            <BusinessPartnersHero hero={businessPartnersData.hero as any} />
          )}

          {/* Philosophy Section */}
          {businessPartnersData.philosophy && (businessPartnersData.philosophy as any).content && (
            <PartnershipPhilosophy philosophy={businessPartnersData.philosophy as any} />
          )}

          {/* Categories Section */}
          {businessPartnersData.categories &&
            (businessPartnersData.categories as any).residentialCard && (
              <PartnershipCategories categories={businessPartnersData.categories as any} />
            )}

          {/* Pillars Section */}
          {businessPartnersData.pillars && (businessPartnersData.pillars as any).title && (
            <PartnershipPillars pillars={businessPartnersData.pillars as any} />
          )}

          {/* Partner Showcase */}
          {businessPartnersData.showcase && (businessPartnersData.showcase as any).title && (
            <PartnerShowcase showcase={businessPartnersData.showcase as any} />
          )}

          {/* Success Stories */}
          {businessPartnersData.successStories &&
            (businessPartnersData.successStories as any).title && (
              <SuccessStories stories={businessPartnersData.successStories as any} />
            )}

          {/* Call to Action */}
          {businessPartnersData.cta && (businessPartnersData.cta as any).title && (
            <PartnershipCTA cta={businessPartnersData.cta as any} />
          )}
        </>
      ) : (
        /* Fallback Content */
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <div className="max-w-2xl mx-auto text-center p-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-6">Business Partners</h1>
            <p className="text-lg text-gray-600">
              This page is currently being configured. Please check back soon to see our partnership
              information.
            </p>
          </div>
        </div>
      )}

      <Footer />
    </>
  );
}

// Generate metadata for SEO
export async function generateMetadata({ params }: BusinessPartnersPageProps): Promise<Metadata> {
  const { locale } = await params;

  const titles = {
    en: 'Business Partners - Totunik',
    ro: 'Parteneri de Afaceri - Totunik',
    tr: 'İş Ortakları - Totunik',
  };

  const descriptions = {
    en: 'Building strong partnerships across residential, industrial, medical, and retail sectors. Join our network of trusted suppliers and contractors.',
    ro: 'Construim parteneriate puternice în sectoarele rezidențial, industrial, medical și retail. Alătură-te rețelei noastre de furnizori și contractori de încredere.',
    tr: 'Konut, endüstriyel, tıbbi ve perakende sektörlerinde güçlü ortaklıklar kuruyoruz. Güvenilir tedarikçi ve müteahhit ağımıza katılın.',
  };

  return {
    title: titles[locale as keyof typeof titles] || titles.en,
    description: descriptions[locale as keyof typeof descriptions] || descriptions.en,
    openGraph: {
      title: titles[locale as keyof typeof titles] || titles.en,
      description: descriptions[locale as keyof typeof descriptions] || descriptions.en,
      type: 'website',
    },
  };
}
