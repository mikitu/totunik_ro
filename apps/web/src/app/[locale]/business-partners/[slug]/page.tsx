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
  params: Promise<{
    locale: string;
    slug: string;
  }>;
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
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    title: `${(pageData as any).title} | Totunik`,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    description: (pageData as any).hero?.subtitle || (pageData as any).introduction?.content || 'Business partner information',
  };
}

/* eslint-disable @typescript-eslint/no-explicit-any */
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
        {(pageData as any).hero && (
          <BusinessPartnerHero hero={(pageData as any).hero} />
        )}

        {/* Introduction Section */}
        {(pageData as any).introduction && (
          <BusinessPartnerIntroduction introduction={(pageData as any).introduction} />
        )}

        {/* Case Studies Section */}
        {(pageData as any).caseStudies && (
          <BusinessPartnerCaseStudies caseStudies={(pageData as any).caseStudies} />
        )}

        {/* Testimonials Section */}
        {(pageData as any).testimonials && (
          <BusinessPartnerTestimonials testimonials={(pageData as any).testimonials} />
        )}

        {/* CTA Section */}
        {(pageData as any).cta && (
          <BusinessPartnerCTA cta={(pageData as any).cta} />
        )}
      </main>

      <Footer />
    </div>
  );
}
