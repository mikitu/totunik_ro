import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { StrapiAPI } from '@/lib/strapi';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BusinessPartnerHero from '@/components/business-partner-page/BusinessPartnerHero';
import BusinessPartnerIntroduction from '@/components/business-partner-page/BusinessPartnerIntroduction';
import BusinessPartnerCaseStudies from '@/components/business-partner-page/BusinessPartnerCaseStudies';
import BusinessPartnerTestimonials from '@/components/business-partner-page/BusinessPartnerTestimonials';
import BusinessPartnerCTA from '@/components/business-partner-page/BusinessPartnerCTA';

interface BusinessPartnerPageProps {
  params: {
    locale: string;
    slug: string;
  };
}

export async function generateMetadata({ params }: BusinessPartnerPageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const strapi = new StrapiAPI(resolvedParams.locale);
  const pageData = await strapi.getBusinessPartnerPageBySlug(resolvedParams.slug);

  if (!pageData) {
    return {
      title: 'Page Not Found',
    };
  }

  return {
    title: `${pageData.title} | Totunik`,
    description: pageData.hero?.subtitle || pageData.introduction?.content || 'Business partner information',
  };
}

export default async function BusinessPartnerPage({ params }: BusinessPartnerPageProps) {
  const resolvedParams = await params;
  const strapi = new StrapiAPI(resolvedParams.locale);
  const pageData = await strapi.getBusinessPartnerPageBySlug(resolvedParams.slug);

  if (!pageData) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main>
        {/* Hero Section */}
        {pageData.hero && (
          <BusinessPartnerHero hero={pageData.hero} />
        )}

        {/* Introduction Section */}
        {pageData.introduction && (
          <BusinessPartnerIntroduction introduction={pageData.introduction} />
        )}

        {/* Case Studies Section */}
        {pageData.caseStudies && (
          <BusinessPartnerCaseStudies caseStudies={pageData.caseStudies} />
        )}

        {/* Testimonials Section */}
        {pageData.testimonials && (
          <BusinessPartnerTestimonials testimonials={pageData.testimonials} />
        )}

        {/* CTA Section */}
        {pageData.cta && (
          <BusinessPartnerCTA cta={pageData.cta} />
        )}
      </main>

      <Footer />
    </div>
  );
}
