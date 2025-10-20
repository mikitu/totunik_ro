'use client';

import { useScrollAnimation, useStaggeredScrollAnimation } from '@/hooks/useScrollAnimation';
import { StrapiServiceItem } from '@/lib/strapi';
import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';

interface RelatedService {
  id: number;
  title: string;
  description: string;
  image: {
    url: string;
    alternativeText?: string;
  };
  slug: string;
}

interface RelatedServicesProps {
  services: (RelatedService | StrapiServiceItem)[];
}

export default function RelatedServices({ services }: RelatedServicesProps) {
  const params = useParams();
  const locale = (params?.locale as string) || 'en';

  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation<HTMLDivElement>();
  const { ref: gridRef, visibleItems } = useStaggeredScrollAnimation<HTMLDivElement>(
    services.length,
    { staggerDelay: 150 }
  );

  // Localized text
  const localizedText = {
    en: {
      title: 'Related Services',
      subtitle: 'Explore our other professional coating services',
      learnMore: 'Learn More',
      viewAllServices: 'View All Services',
    },
    ro: {
      title: 'Servicii Conexe',
      subtitle: 'Explorează celelalte servicii profesionale de acoperire',
      learnMore: 'Află Mai Mult',
      viewAllServices: 'Vezi Toate Serviciile',
    },
    tr: {
      title: 'İlgili Hizmetler',
      subtitle: 'Diğer profesyonel kaplama hizmetlerimizi keşfedin',
      learnMore: 'Daha Fazla Bilgi',
      viewAllServices: 'Tüm Hizmetleri Görüntüle',
    },
  };

  const text = localizedText[locale as keyof typeof localizedText] || localizedText.en;

  if (!services || services.length === 0) return null;

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div
          ref={headerRef}
          className={`text-center mb-16 transition-all duration-1000 ${
            headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            {text.title}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">{text.subtitle}</p>
        </div>

        {/* Services Grid */}
        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={service.id}
              className={`bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-500 overflow-hidden group ${
                visibleItems[index] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            >
              {/* Service Image */}
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={
                    ('featuredImage' in service
                      ? service.featuredImage?.url
                      : service.image?.url) || '/images/placeholder.jpg'
                  }
                  alt={
                    ('featuredImage' in service
                      ? service.featuredImage?.alternativeText
                      : service.image?.alternativeText) || service.title
                  }
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              </div>

              {/* Service Content */}
              <div className="p-6">
                {/* Title */}
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-orange-600 transition-colors duration-300">
                  {service.title}
                </h3>

                {/* Description */}
                <p className="text-gray-600 mb-6 leading-relaxed line-clamp-3">
                  {'shortDescription' in service ? service.shortDescription : service.description}
                </p>

                {/* Learn More Button */}
                <Link
                  href={`/${locale}/services/${service.slug}`}
                  className="inline-flex items-center justify-center w-full bg-orange-600 text-white font-semibold py-3 px-6 rounded-lg hover:bg-orange-700 transition-colors duration-300 group"
                >
                  {text.learnMore}
                  <svg
                    className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* View All Services Button */}
        <div
          className={`text-center mt-12 transition-all duration-1000 delay-600 ${
            headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <Link
            href={`/${locale}/services`}
            className="inline-flex items-center justify-center border-2 border-orange-600 text-orange-600 font-bold py-4 px-8 rounded-lg hover:bg-orange-600 hover:text-white transition-all duration-200 transform hover:scale-105"
          >
            {text.viewAllServices}
            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
