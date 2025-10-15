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

  const certificates = [
    {
      title: 'ISO 9001',
      subtitle: 'Quality Management',
      image: certificateImages.iso9001Certificate,
    },
    {
      title: 'ISO 14001',
      subtitle: 'Environmental Management',
      image: certificateImages.iso14001Certificate,
    },
    {
      title: 'ISO 45001',
      subtitle: 'Occupational Health & Safety',
      image: certificateImages.iso45001Certificate,
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
        <div className="grid md:grid-cols-3 gap-8">
          {certificates.map((certificate, index) => (
            <div
              key={certificate.title}
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
