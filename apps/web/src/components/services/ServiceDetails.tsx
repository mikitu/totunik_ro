'use client';

import Carousel from '@/components/ui/Carousel';
import { useScrollAnimation, useStaggeredScrollAnimation } from '@/hooks/useScrollAnimation';
import { StrapiMedia, StrapiServiceItem } from '@/lib/strapi';

interface ServiceDetailsProps {
  service:
    | StrapiServiceItem
    | {
        id: number;
        title: string;
        subtitle: string;
        description: string;
        image: {
          url: string;
          alternativeText: string;
        };
        features: {
          title: string;
          description: string;
          icon: string;
        }[];
        process: {
          step: number;
          title: string;
          description: string;
        }[];
        benefits: string[];
        gallery: {
          url: string;
          alternativeText: string;
        }[];
      };
}

export default function ServiceDetails({ service }: ServiceDetailsProps) {
  const { ref: featuresRef, visibleItems: featuresVisible } =
    useStaggeredScrollAnimation<HTMLDivElement>(service.features.length, { staggerDelay: 100 });
  const { ref: benefitsRef, isVisible: benefitsVisible } = useScrollAnimation<HTMLDivElement>();
  const { ref: galleryRef, isVisible: galleryVisible } = useScrollAnimation<HTMLDivElement>();

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        {/* Features Section */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">What We Offer</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive solutions tailored to your specific needs
            </p>
          </div>

          <div ref={featuresRef} className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {service.features.map((feature, index) => (
              <div
                key={index}
                className={`bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-500 ${
                  featuresVisible[index] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
              >
                <div className="flex items-start space-x-4">
                  <div className="text-4xl mb-4">{feature.icon}</div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Benefits Section */}
        <div className="mb-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div
              ref={benefitsRef}
              className={`transition-all duration-1000 ${
                benefitsVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'
              }`}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                {'benefitsSection' in service
                  ? service.benefitsSection?.title
                  : 'Why Choose Our Service?'}
              </h2>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                {'benefitsSection' in service
                  ? service.benefitsSection?.description
                  : 'We deliver exceptional results through our commitment to quality, professional expertise, and customer satisfaction.'}
              </p>

              {'benefitsSection' in service && service.benefitsSection ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {service.benefitsSection.benefits.map((benefit, index) => (
                    <div key={benefit.id || index} className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-orange-500 rounded-full flex-shrink-0" />
                      <span className="text-gray-700">{benefit.text}</span>
                    </div>
                  ))}
                </div>
              ) : 'benefits' in service && Array.isArray(service.benefits) ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {service.benefits.map((benefit, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-orange-500 rounded-full flex-shrink-0" />
                      <span className="text-gray-700">{benefit}</span>
                    </div>
                  ))}
                </div>
              ) : null}
            </div>

            <div
              className={`transition-all duration-1000 delay-300 ${
                benefitsVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
              }`}
            >
              <div className="bg-gradient-to-br from-orange-500 to-red-600 rounded-2xl p-8 text-white">
                <h3 className="text-2xl font-bold mb-4">
                  {'ctaSection' in service ? service.ctaSection?.title : 'Get Started Today'}
                </h3>
                <p className="text-orange-100 mb-6">
                  {'ctaSection' in service
                    ? service.ctaSection?.description
                    : 'Ready to transform your project with our professional services? Contact us for a free consultation and detailed quote.'}
                </p>
                <div className="space-y-3">
                  {'ctaSection' in service && service.ctaSection?.features ? (
                    service.ctaSection.features.map((feature, index) => (
                      <div key={feature.id || index} className="flex items-center space-x-3">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                          <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                            clipRule="evenodd"
                          />
                        </svg>
                        <span>{feature.text}</span>
                      </div>
                    ))
                  ) : (
                    <>
                      <div className="flex items-center space-x-3">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                          <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                            clipRule="evenodd"
                          />
                        </svg>
                        <span>Free consultation & quote</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                          <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                            clipRule="evenodd"
                          />
                        </svg>
                        <span>Professional team</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                          <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                            clipRule="evenodd"
                          />
                        </svg>
                        <span>Quality guarantee</span>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Gallery Section */}
        {(('gallerySection' in service &&
          service.gallerySection?.images &&
          service.gallerySection.images.length > 0) ||
          ('gallery' in service &&
            Array.isArray(service.gallery) &&
            service.gallery.length > 0)) && (
          <div>
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                {'gallerySection' in service ? service.gallerySection?.title : 'Our Work'}
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                {'gallerySection' in service
                  ? service.gallerySection?.description
                  : 'See examples of our professional work and the quality results we deliver.'}
              </p>
            </div>

            <div
              ref={galleryRef}
              className={`transition-all duration-1000 ${
                galleryVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            >
              <Carousel
                images={
                  ('gallerySection' in service && service.gallerySection?.images
                    ? service.gallerySection.images
                    : 'gallery' in service
                      ? service.gallery
                      : []) as StrapiMedia[] | { url: string; alternativeText: string }[]
                }
                className="max-w-4xl mx-auto"
              />
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
