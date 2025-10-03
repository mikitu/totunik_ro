import React from 'react';
import Image from 'next/image';
import { StrapiServices } from '@/lib/strapi';

interface ServicesSectionProps {
  services: StrapiServices;
}

export default function ServicesSection({ services }: ServicesSectionProps) {
  if (!services || !services.services?.length) return null;

  return (
    <section className="relative bg-orange-500 py-20">

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-1 gap-12 items-center">
          {/* Content Column */}
          <div className="lg:col-start-2 text-white">
            <h2 className="text-4xl lg:text-5xl font-extrabold uppercase mb-4">
              {services.title}
            </h2>
            <h3 className="text-xl lg:text-2xl font-normal mb-8">
              {services.subtitle}
            </h3>

            {/* Services Grid - Horizontal Layout */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {services.services.map((service) => {
                const imageUrl = service.image?.url
                  ? (service.image.url.startsWith("http")
                      ? service.image.url
                      : `${process.env.NEXT_PUBLIC_STRAPI_API_URL}${service.image.url}`)
                  : null;

                return (
                  <div key={service.id} className="bg-white/10 backdrop-blur-sm rounded-lg p-6 hover:bg-white/20 transition-all duration-300 text-center">
                    {/* Service Image */}
                    {imageUrl && (
                      <div className="mb-4 flex justify-center">
                        <Image
                          src={imageUrl}
                          alt={service.image.alternativeText || service.title}
                          width={120}
                          height={120}
                          className="w-24 h-24 object-contain"
                        />
                      </div>
                    )}

                    {/* Service Title */}
                    <h4 className="text-lg font-semibold mb-3 text-white">
                      {service.title}
                    </h4>

                    {/* Service Description - truncated to 2 lines */}
                    <p className="text-white/90 text-sm line-clamp-2 leading-relaxed">
                      {service.description}
                    </p>
                  </div>
                );
              })}
            </div>

            {/* CTA Button */}
            {services.CtaButton && (
              <div className="flex justify-start">
                <a
                  href={services.CtaButton.url || '#'}
                  className="bg-white text-orange-500 px-8 py-3 rounded-md font-semibold hover:bg-gray-100 transition-colors duration-200"
                >
                  {services.CtaButton.label}
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
