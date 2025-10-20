import { notFound } from 'next/navigation';
import Footer from '@/components/Footer';
import HeaderWrapper from '@/components/HeaderWrapper';
import ServiceHero from '@/components/services/ServiceHero';
import ServiceDetails from '@/components/services/ServiceDetails';
import ServiceProcess from '@/components/services/ServiceProcess';
import ServiceCTA from '@/components/services/ServiceCTA';
import RelatedServices from '@/components/services/RelatedServices';

interface ServicePageProps {
  params: Promise<{
    locale: string;
    slug: string;
  }>;
}

// Mock data for design purposes
const mockServiceData = {
  "residential-coating": {
    id: 1,
    title: "Residential Coating Services",
    subtitle: "Transform your home with premium Jotun paints",
    description: "Our residential coating services bring new life to your home with premium Jotun paints and professional application techniques. From color consultation to final touch-ups, we ensure your home looks beautiful and stays protected.",
    image: {
      url: "/images/residential-coating-hero.jpg",
      alternativeText: "Residential coating services"
    },
    features: [
      {
        title: "Interior Painting",
        description: "Complete interior painting services for all rooms, including walls, ceilings, and trim work.",
        icon: "🏠"
      },
      {
        title: "Exterior Painting",
        description: "Weather-resistant exterior coatings that protect and beautify your home's exterior surfaces.",
        icon: "🎨"
      },
      {
        title: "Color Consultation",
        description: "Professional color matching and consultation to help you choose the perfect palette.",
        icon: "🎯"
      },
      {
        title: "Surface Preparation",
        description: "Thorough surface preparation including cleaning, sanding, and priming for optimal results.",
        icon: "🔧"
      }
    ],
    process: [
      {
        step: 1,
        title: "Initial Consultation",
        description: "We visit your property to assess the scope of work and discuss your vision and requirements."
      },
      {
        step: 2,
        title: "Color Selection",
        description: "Our experts help you choose the perfect colors and finishes from Jotun's premium range."
      },
      {
        step: 3,
        title: "Surface Preparation",
        description: "We thoroughly prepare all surfaces, including cleaning, repairs, and priming as needed."
      },
      {
        step: 4,
        title: "Professional Application",
        description: "Our skilled painters apply the coatings using professional techniques for a flawless finish."
      },
      {
        step: 5,
        title: "Quality Inspection",
        description: "We conduct a thorough inspection and touch-up any areas to ensure perfect results."
      }
    ],
    benefits: [
      "Premium Jotun paint products",
      "Professional application techniques",
      "Color consultation included",
      "Surface preparation and priming",
      "Clean-up and disposal included",
      "Quality guarantee",
      "Competitive pricing",
      "Experienced team"
    ],
    gallery: [
      {
        url: "/images/residential-1.jpg",
        alternativeText: "Residential coating example 1"
      },
      {
        url: "/images/residential-2.jpg",
        alternativeText: "Residential coating example 2"
      },
      {
        url: "/images/residential-3.jpg",
        alternativeText: "Residential coating example 3"
      }
    ]
  }
  // Add more services as needed
};

const relatedServices = [
  {
    id: 2,
    title: "Commercial Painting",
    description: "Professional commercial painting services for offices and retail spaces.",
    image: { url: "/images/commercial-painting.jpg", alternativeText: "Commercial painting" },
    slug: "commercial-painting"
  },
  {
    id: 3,
    title: "Decorative Finishes",
    description: "Premium decorative coating solutions with unique aesthetic effects.",
    image: { url: "/images/decorative-finishes.jpg", alternativeText: "Decorative finishes" },
    slug: "decorative-finishes"
  },
  {
    id: 4,
    title: "Maintenance Services",
    description: "Ongoing maintenance to keep your coated surfaces looking fresh.",
    image: { url: "/images/maintenance-services.jpg", alternativeText: "Maintenance services" },
    slug: "maintenance-services"
  }
];

export default async function ServicePage({ params }: ServicePageProps) {
  const { locale, slug } = await params;

  // TODO: Replace with actual Strapi API call
  // const serviceData = await strapiAPI.getService(slug, locale);
  
  // For now, use mock data
  const serviceData = mockServiceData[slug as keyof typeof mockServiceData];

  if (!serviceData) {
    notFound();
  }

  const ctaData = {
    headline: "Ready to Get Started?",
    description: "Contact us today for a free consultation and quote for your residential coating project.",
    primaryButton: {
      label: "Get Free Quote",
      url: "/contact"
    },
    secondaryButton: {
      label: "Call Now",
      url: "tel:+1234567890"
    }
  };

  return (
    <main className="min-h-screen">
      <HeaderWrapper />
      
      {/* Service Hero */}
      <ServiceHero service={serviceData} />
      
      {/* Service Details */}
      <ServiceDetails service={serviceData} />
      
      {/* Service Process */}
      <ServiceProcess process={serviceData.process} />
      
      {/* Service CTA */}
      <ServiceCTA cta={ctaData} />
      
      {/* Related Services */}
      <RelatedServices services={relatedServices} />
      
      <Footer />
    </main>
  );
}
