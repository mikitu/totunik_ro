'use client';

import { LoadingLink } from '@/components/LoadingLink';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { StrapiPortfolioCTA, getStrapiMediaURL } from '@/lib/strapi';
import Image from 'next/image';

interface PortfolioCTAProps {
  cta: StrapiPortfolioCTA;
}

export default function PortfolioCTA({ cta }: PortfolioCTAProps) {
  const { ref, isVisible } = useScrollAnimation<HTMLElement>();

  const backgroundImageUrl = cta.backgroundImage ? getStrapiMediaURL(cta.backgroundImage) : null;

  return (
    <section
      ref={ref}
      className="relative py-20 bg-gradient-to-br from-orange-500 to-orange-600 overflow-hidden"
    >
      {/* Background Image */}
      {backgroundImageUrl && (
        <div className="absolute inset-0">
          <Image
            src={backgroundImageUrl}
            alt={cta.backgroundImage?.alternativeText || 'Contact us'}
            fill
            className="object-cover opacity-20"
          />
        </div>
      )}

      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 text-center">
        <div
          className={`max-w-4xl mx-auto transition-all duration-1000 ${
            isVisible ? 'animate-fade-in-up' : 'opacity-0 translate-y-8'
          }`}
        >
          {/* Headline */}
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">{cta.headline}</h2>

          {/* Description */}
          <p className="text-xl lg:text-2xl text-orange-100 leading-relaxed mb-10 max-w-3xl mx-auto">
            {cta.description}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            {/* Primary Button */}
            <LoadingLink
              href={cta.primaryButton?.url || '/contact'}
              className="inline-flex items-center justify-center bg-white text-orange-600 font-bold py-4 px-8 rounded-lg hover:bg-gray-100 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              {cta.primaryButton?.label || 'Request a similar quote'}
            </LoadingLink>

            {/* Secondary Button */}
            {cta.secondaryButton && (
              <LoadingLink
                href={cta.secondaryButton.url || '/contact'}
                className="inline-flex items-center justify-center border-2 border-white text-white font-semibold py-4 px-8 rounded-lg hover:bg-white hover:text-orange-600 transition-all duration-200"
              >
                {cta.secondaryButton.label || 'Contact Our Team'}
              </LoadingLink>
            )}
          </div>

          {/* Counters */}
          {cta.showCounters !== false && cta.counters && cta.counters.length > 0 && (
            <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 text-white">
              {cta.counters.map((counter, index) => (
                <div key={counter.id || index} className="text-center">
                  <div className="text-3xl font-bold mb-2">{counter.value}</div>
                  <div className="text-orange-200">{counter.label}</div>
                </div>
              ))}
            </div>
          )}

          {/* Fallback Counters (when no API data) */}
          {(!cta.counters || cta.counters.length === 0) && cta.showCounters !== false && (
            <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 text-white">
              <div className="text-center">
                <div className="text-3xl font-bold mb-2">15+</div>
                <div className="text-orange-200">Years of Experience</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold mb-2">500+</div>
                <div className="text-orange-200">Projects Completed</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold mb-2">100%</div>
                <div className="text-orange-200">Quality Guarantee</div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
