'use client';

import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { StrapiCertificateImages, getStrapiMediaURL } from '@/lib/strapi';
import Image from 'next/image';

interface CertificateImagesProps {
  certificateImages: StrapiCertificateImages | null;
}

export default function CertificateImages({ certificateImages }: CertificateImagesProps) {
  const { ref, isVisible } = useScrollAnimation();

  // Return null if no data
  if (!certificateImages) {
    return null;
  }

  // Use dynamic certificates from Strapi or fallback to static data
  const certificates =
    certificateImages.certificates && certificateImages.certificates.length > 0
      ? certificateImages.certificates
      : [
          {
            id: 1,
            title: 'ISO 9001',
            subtitle: 'Quality Management',
            image: undefined,
          },
          {
            id: 2,
            title: 'ISO 14001',
            subtitle: 'Environmental Management',
            image: undefined,
          },
          {
            id: 3,
            title: 'ISO 45001',
            subtitle: 'Occupational Health & Safety',
            image: undefined,
          },
        ];

  return (
    <section ref={ref} className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Title */}
        <div
          className={`text-center mb-16 transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="w-16 h-1 bg-orange-500 mx-auto mb-6" />
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {certificateImages.title}
          </h2>
          {certificateImages.subtitle && (
            <p className="text-lg text-gray-600">{certificateImages.subtitle}</p>
          )}
        </div>

        {/* Certificates Grid */}
        <div
          className={`grid gap-8 ${
            certificates.length === 1
              ? 'grid-cols-1 max-w-md mx-auto'
              : certificates.length === 2
                ? 'grid-cols-1 md:grid-cols-2 max-w-4xl mx-auto'
                : certificates.length === 3
                  ? 'grid-cols-1 md:grid-cols-3'
                  : certificates.length === 4
                    ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4'
                    : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
          }`}
        >
          {certificates.map((certificate, index) => (
            <div
              key={certificate.id || certificate.title}
              className={`bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-500 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: `${index * 200}ms` }}
            >
              {/* Certificate Image */}
              {certificate.image && getStrapiMediaURL(certificate.image) ? (
                <div className="relative aspect-[3/4] mb-4 rounded-lg overflow-hidden">
                  <Image
                    src={getStrapiMediaURL(certificate.image) || ''}
                    alt={certificate.image.alternativeText || `${certificate.title} Certificate`}
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
              ) : (
                <div className="aspect-[3/4] mb-4 rounded-lg bg-gray-200 flex items-center justify-center">
                  <div className="text-center text-gray-500">
                    <div className="text-4xl mb-2">📜</div>
                    <p className="text-sm">Certificate Image</p>
                  </div>
                </div>
              )}

              {/* Certificate Info */}
              <div className="text-center">
                <h3 className="text-xl font-bold text-gray-900 mb-2">{certificate.title}</h3>
                <p className="text-orange-600 font-medium">{certificate.subtitle}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
