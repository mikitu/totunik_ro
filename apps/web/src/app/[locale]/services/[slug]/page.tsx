import Footer from '@/components/Footer';
import HeaderWrapper from '@/components/HeaderWrapper';
import RelatedServices from '@/components/services/RelatedServices';
import ServiceCTA from '@/components/services/ServiceCTA';
import ServiceDetails from '@/components/services/ServiceDetails';
import ServiceHero from '@/components/services/ServiceHero';
import ServiceProcess from '@/components/services/ServiceProcess';
import { strapiAPI } from '@/lib/strapi';
import { notFound } from 'next/navigation';

interface ServicePageProps {
  params: Promise<{
    locale: string;
    slug: string;
  }>;
}

// Mock data for design purposes
const mockServiceData = {
  'residential-coating': {
    id: 1,
    title: 'Residential Coating Services',
    subtitle: 'Transform your home with premium Jotun paints',
    description:
      'Our residential coating services bring new life to your home with premium Jotun paints and professional application techniques. From color consultation to final touch-ups, we ensure your home looks beautiful and stays protected.',
    image: {
      url: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1200&h=800&fit=crop&crop=center',
      alternativeText: 'Residential coating services',
    },
    features: [
      {
        title: 'Interior Painting',
        description:
          'Complete interior painting services for all rooms, including walls, ceilings, and trim work.',
        icon: '🏠',
      },
      {
        title: 'Exterior Painting',
        description:
          "Weather-resistant exterior coatings that protect and beautify your home's exterior surfaces.",
        icon: '🎨',
      },
      {
        title: 'Color Consultation',
        description:
          'Professional color matching and consultation to help you choose the perfect palette.',
        icon: '🎯',
      },
      {
        title: 'Surface Preparation',
        description:
          'Thorough surface preparation including cleaning, sanding, and priming for optimal results.',
        icon: '🔧',
      },
    ],
    process: [
      {
        step: 1,
        title: 'Initial Consultation',
        description:
          'We visit your property to assess the scope of work and discuss your vision and requirements.',
      },
      {
        step: 2,
        title: 'Color Selection',
        description:
          "Our experts help you choose the perfect colors and finishes from Jotun's premium range.",
      },
      {
        step: 3,
        title: 'Surface Preparation',
        description:
          'We thoroughly prepare all surfaces, including cleaning, repairs, and priming as needed.',
      },
      {
        step: 4,
        title: 'Professional Application',
        description:
          'Our skilled painters apply the coatings using professional techniques for a flawless finish.',
      },
      {
        step: 5,
        title: 'Quality Inspection',
        description:
          'We conduct a thorough inspection and touch-up any areas to ensure perfect results.',
      },
    ],
    benefits: [
      'Premium Jotun paint products',
      'Professional application techniques',
      'Color consultation included',
      'Surface preparation and priming',
      'Clean-up and disposal included',
      'Quality guarantee',
      'Competitive pricing',
      'Experienced team',
    ],
    gallery: [
      {
        url: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&h=600&fit=crop&crop=center',
        alternativeText: 'Modern residential exterior painting',
      },
      {
        url: 'https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800&h=600&fit=crop&crop=center',
        alternativeText: 'Beautiful residential interior painting',
      },
      {
        url: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=600&fit=crop&crop=center',
        alternativeText: 'Professional residential coating work',
      },
    ],
  },
  'commercial-painting': {
    id: 2,
    title: 'Commercial Painting Services',
    subtitle: 'Professional coating solutions for businesses',
    description:
      'Our commercial painting services provide durable, professional-grade coatings for offices, retail spaces, warehouses, and industrial facilities. We work efficiently to minimize business disruption while delivering exceptional results.',
    image: {
      url: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&h=800&fit=crop&crop=center',
      alternativeText: 'Commercial painting services',
    },
    features: [
      {
        title: 'Office Buildings',
        description:
          'Professional interior and exterior painting for office complexes and corporate buildings.',
        icon: '🏢',
      },
      {
        title: 'Retail Spaces',
        description:
          'Attractive, durable coatings for retail stores, restaurants, and customer-facing businesses.',
        icon: '🏪',
      },
      {
        title: 'Industrial Facilities',
        description:
          'Heavy-duty protective coatings for warehouses, manufacturing facilities, and industrial buildings.',
        icon: '🏭',
      },
      {
        title: 'Scheduled Maintenance',
        description:
          'Planned maintenance programs to keep your commercial property looking professional.',
        icon: '📅',
      },
    ],
    process: [
      {
        step: 1,
        title: 'Site Assessment',
        description:
          'We conduct a thorough assessment of your commercial property and discuss your specific requirements.',
      },
      {
        step: 2,
        title: 'Project Planning',
        description:
          'We create a detailed project plan that minimizes disruption to your business operations.',
      },
      {
        step: 3,
        title: 'Surface Preparation',
        description:
          'Professional preparation of all surfaces including power washing, repairs, and priming.',
      },
      {
        step: 4,
        title: 'Coating Application',
        description:
          'Application of high-quality commercial-grade coatings using professional equipment and techniques.',
      },
      {
        step: 5,
        title: 'Final Inspection',
        description:
          'Comprehensive quality inspection and any necessary touch-ups to ensure perfect results.',
      },
    ],
    benefits: [
      'Commercial-grade Jotun products',
      'Minimal business disruption',
      'Professional project management',
      'Flexible scheduling options',
      'Comprehensive insurance coverage',
      'Extended warranty coverage',
      'Maintenance programs available',
      'Experienced commercial team',
    ],
    gallery: [
      {
        url: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=600&fit=crop&crop=center',
        alternativeText: 'Modern office building exterior',
      },
      {
        url: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=800&h=600&fit=crop&crop=center',
        alternativeText: 'Commercial office interior',
      },
      {
        url: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&h=600&fit=crop&crop=center',
        alternativeText: 'Professional commercial building',
      },
    ],
  },
  'decorative-finishes': {
    id: 3,
    title: 'Decorative Finishes',
    subtitle: 'Premium aesthetic coating solutions',
    description:
      'Transform your space with our premium decorative finishes. From textured walls to metallic effects, we offer a wide range of specialty coatings that add character and sophistication to any interior or exterior surface.',
    image: {
      url: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1200&h=800&fit=crop&crop=center',
      alternativeText: 'Decorative finishes services',
    },
    features: [
      {
        title: 'Textured Finishes',
        description:
          'Create depth and visual interest with various textured coating techniques and patterns.',
        icon: '🎨',
      },
      {
        title: 'Metallic Effects',
        description: 'Stunning metallic finishes that add luxury and sophistication to any space.',
        icon: '✨',
      },
      {
        title: 'Faux Finishes',
        description:
          'Achieve the look of marble, wood, or stone with our expert faux finishing techniques.',
        icon: '🎭',
      },
      {
        title: 'Custom Designs',
        description:
          'Bespoke decorative solutions tailored to your unique vision and design requirements.',
        icon: '🎯',
      },
    ],
    process: [
      {
        step: 1,
        title: 'Design Consultation',
        description:
          'We work with you to understand your vision and recommend the best decorative techniques.',
      },
      {
        step: 2,
        title: 'Sample Creation',
        description:
          'We create samples of the proposed finishes for your approval before starting the project.',
      },
      {
        step: 3,
        title: 'Surface Preparation',
        description:
          'Meticulous preparation to ensure the decorative finish adheres properly and looks perfect.',
      },
      {
        step: 4,
        title: 'Artistic Application',
        description:
          'Our skilled artisans apply the decorative finishes using specialized techniques and tools.',
      },
      {
        step: 5,
        title: 'Protective Coating',
        description:
          'Application of protective topcoats to ensure the longevity of your decorative finish.',
      },
    ],
    benefits: [
      'Unique aesthetic effects',
      'Premium Jotun specialty products',
      'Skilled artisan application',
      'Custom design consultation',
      'Durable protective coatings',
      'Interior and exterior options',
      'Maintenance guidance included',
      'Portfolio of completed projects',
    ],
    gallery: [
      {
        url: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=800&h=600&fit=crop&crop=center',
        alternativeText: 'Elegant decorative wall finish',
      },
      {
        url: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=600&fit=crop&crop=center',
        alternativeText: 'Textured decorative coating',
      },
      {
        url: 'https://images.unsplash.com/photo-1615873968403-89e068629265?w=800&h=600&fit=crop&crop=center',
        alternativeText: 'Luxury decorative finish work',
      },
    ],
  },
};

const relatedServices = [
  {
    id: 2,
    title: 'Commercial Painting',
    description: 'Professional commercial painting services for offices and retail spaces.',
    image: { url: '/images/commercial-painting.jpg', alternativeText: 'Commercial painting' },
    slug: 'commercial-painting',
  },
  {
    id: 3,
    title: 'Decorative Finishes',
    description: 'Premium decorative coating solutions with unique aesthetic effects.',
    image: { url: '/images/decorative-finishes.jpg', alternativeText: 'Decorative finishes' },
    slug: 'decorative-finishes',
  },
  {
    id: 4,
    title: 'Maintenance Services',
    description: 'Ongoing maintenance to keep your coated surfaces looking fresh.',
    image: { url: '/images/maintenance-services.jpg', alternativeText: 'Maintenance services' },
    slug: 'maintenance-services',
  },
];

export default async function ServicePage({ params }: ServicePageProps) {
  const { locale, slug } = await params;

  // Get real data from Strapi
  const [serviceData, allServices] = await Promise.all([
    strapiAPI.getService(slug, locale),
    strapiAPI.getServices(locale),
  ]);

  // Fallback to mock data if service not found
  const finalServiceData = serviceData || mockServiceData[slug as keyof typeof mockServiceData];

  if (!finalServiceData) {
    notFound();
  }

  // Get related services (exclude current service)
  const relatedServicesData =
    allServices?.filter(s => s.slug !== slug).slice(0, 3) || relatedServices;

  const ctaData = {
    headline: 'Ready to Get Started?',
    description: 'Contact us today for a free consultation and quote for your coating project.',
    primaryButton: {
      label: 'Get Free Quote',
      url: '/contact',
    },
    secondaryButton: {
      label: 'Call Now',
      url: 'tel:+1234567890',
    },
  };

  // Get process CTA data - either from Strapi or fallback
  const processCta = 'processCta' in finalServiceData ? finalServiceData.processCta : undefined;

  return (
    <main className="min-h-screen">
      <HeaderWrapper />

      {/* Service Hero */}
      <ServiceHero service={finalServiceData} />

      {/* Service Details */}
      <ServiceDetails service={finalServiceData} />

      {/* Service Process */}
      <ServiceProcess process={finalServiceData.process} processCta={processCta} />

      {/* Service CTA */}
      <ServiceCTA cta={ctaData} />

      {/* Related Services */}
      <RelatedServices services={relatedServicesData} />

      <Footer />
    </main>
  );
}
