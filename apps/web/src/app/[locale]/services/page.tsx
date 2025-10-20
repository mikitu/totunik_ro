import Footer from '@/components/Footer';
import HeaderWrapper from '@/components/HeaderWrapper';
import ServicesCTA from '@/components/services/ServicesCTA';
import ServicesGrid from '@/components/services/ServicesGrid';
import ServicesHero from '@/components/services/ServicesHero';
import { strapiAPI } from '@/lib/strapi';
import { notFound } from 'next/navigation';

interface ServicesPageProps {
  params: Promise<{
    locale: string;
  }>;
}

// Mock data for design purposes
const mockServicesData = {
  hero: {
    title: 'Our Professional Services',
    subtitle: 'Complete coating solutions for every project',
    description:
      'From residential buildings to industrial facilities, we provide comprehensive coating services using premium Jotun products. Our expert team ensures quality, durability, and aesthetic excellence in every project.',
    backgroundImage: {
      url: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=1920&h=1080&fit=crop&crop=center',
      alternativeText: 'Professional coating services',
    },
  },
  services: [
    {
      id: 1,
      title: 'Residential Coating',
      description:
        'Professional interior and exterior painting services for homes, apartments, and residential complexes using premium Jotun paints.',
      image: {
        url: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=600&h=400&fit=crop&crop=center',
        alternativeText: 'Residential coating services',
      },
      slug: 'residential-coating',
      features: [
        'Interior Painting',
        'Exterior Painting',
        'Color Consultation',
        'Surface Preparation',
      ],
    },
    {
      id: 2,
      title: 'Commercial Painting',
      description:
        'Large-scale commercial painting projects for offices, retail spaces, and commercial buildings with minimal disruption to business operations.',
      image: {
        url: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&h=400&fit=crop&crop=center',
        alternativeText: 'Commercial painting services',
      },
      slug: 'commercial-painting',
      features: ['Office Buildings', 'Retail Spaces', 'Warehouses', 'Quick Turnaround'],
    },
    {
      id: 3,
      title: 'Industrial Coatings',
      description:
        'Specialized protective coatings for industrial facilities, including anti-corrosive and fire-resistant solutions for harsh environments.',
      image: {
        url: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=600&h=400&fit=crop&crop=center',
        alternativeText: 'Industrial coating services',
      },
      slug: 'industrial-coatings',
      features: [
        'Anti-Corrosive Coatings',
        'Fire Protection',
        'Chemical Resistance',
        'Heavy-Duty Solutions',
      ],
    },
    {
      id: 4,
      title: 'Marine Coatings',
      description:
        'Marine-grade protective coatings for ships, offshore structures, and coastal facilities designed to withstand harsh marine environments.',
      image: {
        url: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=600&h=400&fit=crop&crop=center',
        alternativeText: 'Marine coating services',
      },
      slug: 'marine-coatings',
      features: [
        'Ship Coatings',
        'Offshore Structures',
        'Port Facilities',
        'Salt Water Protection',
      ],
    },
    {
      id: 5,
      title: 'Decorative Finishes',
      description:
        'Premium decorative coating solutions including textured finishes, metallic effects, and specialty coatings for unique aesthetic requirements.',
      image: {
        url: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=600&h=400&fit=crop&crop=center',
        alternativeText: 'Decorative coating finishes',
      },
      slug: 'decorative-finishes',
      features: ['Textured Finishes', 'Metallic Effects', 'Custom Colors', 'Artistic Coatings'],
    },
    {
      id: 6,
      title: 'Maintenance Services',
      description:
        'Ongoing maintenance and touch-up services to keep your coated surfaces looking fresh and protected year-round.',
      image: {
        url: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600&h=400&fit=crop&crop=center',
        alternativeText: 'Coating maintenance services',
      },
      slug: 'maintenance-services',
      features: [
        'Regular Inspections',
        'Touch-up Services',
        'Preventive Maintenance',
        'Emergency Repairs',
      ],
    },
  ],
  cta: {
    headline: 'Ready to Start Your Project?',
    description:
      'Get a free consultation and quote for your coating project. Our experts will help you choose the right solution for your specific needs.',
    primaryButton: {
      label: 'Get Free Quote',
      url: '/contact',
    },
    secondaryButton: {
      label: 'View Portfolio',
      url: '/projects-portfolio',
    },
    backgroundImage: {
      url: '/images/services-cta-bg.jpg',
      alternativeText: 'Contact us for services',
    },
  },
};

export default async function ServicesPage({ params }: ServicesPageProps) {
  const { locale } = await params;

  // Get real data from Strapi
  const [servicesPageData, servicesData] = await Promise.all([
    strapiAPI.getServicesPage(locale),
    strapiAPI.getServices(locale),
  ]);

  // Transform services data for the grid component
  const transformedData = {
    hero: servicesPageData?.hero || mockServicesData.hero,
    services: servicesData && servicesData.length > 0 ? servicesData : mockServicesData.services,
    cta: servicesPageData?.cta || mockServicesData.cta,
  };

  if (!transformedData) {
    notFound();
  }

  return (
    <main className="min-h-screen">
      <HeaderWrapper />

      {/* Services Hero */}
      <ServicesHero hero={transformedData.hero} />

      {/* Services Grid */}
      <ServicesGrid services={transformedData.services} />

      {/* Services CTA */}
      <ServicesCTA cta={transformedData.cta} />

      <Footer />
    </main>
  );
}
