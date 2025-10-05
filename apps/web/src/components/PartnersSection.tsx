import { StrapiPartners } from '@/lib/strapi';
import Image from 'next/image';

interface PartnersSectionProps {
  partners: StrapiPartners;
}

export default function PartnersSection({ partners }: PartnersSectionProps) {
  if (!partners?.logos || partners.logos.length === 0) {
    return null;
  }

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        {(partners.title || partners.subtitle) && (
          <div className="text-center mb-12">
            {partners.title && (
              <h2 className="text-4xl lg:text-5xl font-normal uppercase mb-4 text-gray-900">
                {partners.title}
              </h2>
            )}
            {partners.subtitle && (
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                {partners.subtitle}
              </p>
            )}
          </div>
        )}
      </div>

      {/* Full-width scrolling logos */}
      <div className="relative overflow-hidden">
        <div className="flex animate-scroll-continuous space-x-12 py-8" style={{ width: 'max-content' }}>
          {/* First set of logos */}
          {partners.logos.map((logo) => {
            const imageUrl = logo.url?.startsWith('http')
              ? logo.url
              : `${process.env.NEXT_PUBLIC_STRAPI_API_URL}${logo.url}`;

            return (
              <div key={`first-${logo.id}`} className="flex-shrink-0">
                <div className="w-32 h-20 relative grayscale hover:grayscale-0 transition-all duration-300">
                  <Image
                    src={imageUrl}
                    alt={logo.alternativeText || logo.caption || 'Partner logo'}
                    fill
                    className="object-contain"
                  />
                </div>
              </div>
            );
          })}

          {/* Duplicate set for seamless loop */}
          {partners.logos.map((logo) => {
            const imageUrl = logo.url?.startsWith('http')
              ? logo.url
              : `${process.env.NEXT_PUBLIC_STRAPI_API_URL}${logo.url}`;

            return (
              <div key={`second-${logo.id}`} className="flex-shrink-0">
                <div className="w-32 h-20 relative grayscale hover:grayscale-0 transition-all duration-300">
                  <Image
                    src={imageUrl}
                    alt={logo.alternativeText || logo.caption || 'Partner logo'}
                    fill
                    className="object-contain"
                  />
                </div>
              </div>
            );
          })}

          {/* Third set for extra smoothness */}
          {partners.logos.map((logo) => {
            const imageUrl = logo.url?.startsWith('http')
              ? logo.url
              : `${process.env.NEXT_PUBLIC_STRAPI_API_URL}${logo.url}`;

            return (
              <div key={`third-${logo.id}`} className="flex-shrink-0">
                <div className="w-32 h-20 relative grayscale hover:grayscale-0 transition-all duration-300">
                  <Image
                    src={imageUrl}
                    alt={logo.alternativeText || logo.caption || 'Partner logo'}
                    fill
                    className="object-contain"
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* CTA Button */}
      {partners.button && (
        <div className="container mx-auto px-6 text-center mt-12">
          <a
            href={partners.button.url || '#'}
            className="inline-block bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-md font-semibold transition-colors duration-200"
          >
            {partners.button.label}
          </a>
        </div>
      )}
    </section>
  );
}
