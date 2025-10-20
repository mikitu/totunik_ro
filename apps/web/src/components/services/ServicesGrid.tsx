'use client';

import { useScrollAnimation, useStaggeredScrollAnimation } from '@/hooks/useScrollAnimation';
import { StrapiServiceItem } from '@/lib/strapi';
import Image from 'next/image';
import Link from 'next/link';

interface Service {
  id: number;
  title: string;
  description: string;
  image: {
    url: string;
    alternativeText?: string;
  };
  slug: string;
  features: string[];
}

interface ServicesGridProps {
  services: (Service | StrapiServiceItem)[];
}

export default function ServicesGrid({ services }: ServicesGridProps) {
  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation<HTMLDivElement>();
  const { ref: gridRef, visibleItems } = useStaggeredScrollAnimation<HTMLDivElement>(
    services.length,
    { staggerDelay: 150 }
  );

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
            Our Services
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Comprehensive coating solutions for every project type and industry requirement
          </p>
        </div>

        {/* Services Grid */}
        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={service.id}
              className={`bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-500 overflow-hidden group ${
                visibleItems[index] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            >
              {/* Service Image */}
              <div className="relative h-64 overflow-hidden">
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
                <p className="text-gray-600 mb-4 leading-relaxed">
                  {'shortDescription' in service ? service.shortDescription : service.description}
                </p>

                {/* Features */}
                <div className="mb-6">
                  <h4 className="text-sm font-semibold text-gray-900 mb-2 uppercase tracking-wide">
                    Key Features:
                  </h4>
                  <ul className="space-y-1">
                    {'features' in service && Array.isArray(service.features)
                      ? service.features.slice(0, 3).map((feature, featureIndex) => (
                          <li
                            key={featureIndex}
                            className="text-sm text-gray-600 flex items-center"
                          >
                            <span className="w-1.5 h-1.5 bg-orange-500 rounded-full mr-2 flex-shrink-0" />
                            {typeof feature === 'string' ? feature : feature.title}
                          </li>
                        ))
                      : Array.isArray(service.features)
                        ? service.features.slice(0, 3).map((feature, featureIndex) => (
                            <li
                              key={featureIndex}
                              className="text-sm text-gray-600 flex items-center"
                            >
                              <span className="w-1.5 h-1.5 bg-orange-500 rounded-full mr-2 flex-shrink-0" />
                              {typeof feature === 'string' ? feature : feature.title}
                            </li>
                          ))
                        : null}
                    {'features' in service &&
                      Array.isArray(service.features) &&
                      service.features.length > 3 && (
                        <li className="text-sm text-gray-500 italic">
                          +{service.features.length - 3} more features
                        </li>
                      )}
                  </ul>
                </div>

                {/* Learn More Button */}
                <Link
                  href={`/en/services/${service.slug}`}
                  className="inline-flex items-center justify-center w-full bg-orange-600 text-white font-semibold py-3 px-6 rounded-lg hover:bg-orange-700 transition-colors duration-300 group"
                >
                  Learn More
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
      </div>
    </section>
  );
}
