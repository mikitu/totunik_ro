'use client';

import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import Image from 'next/image';
import Link from 'next/link';

interface ServicesCTAProps {
  cta: {
    headline: string;
    description: string;
    primaryButton?: {
      label: string;
      url: string;
    };
    secondaryButton?: {
      label: string;
      url: string;
    };
    backgroundImage?: {
      url: string;
      alternativeText?: string;
    };
  };
}

export default function ServicesCTA({ cta }: ServicesCTAProps) {
  const { ref, isVisible } = useScrollAnimation<HTMLElement>();

  return (
    <section
      ref={ref}
      className="relative py-20 bg-gradient-to-br from-orange-600 to-red-600 overflow-hidden"
    >
      {/* Background Image */}
      {cta.backgroundImage && (
        <div className="absolute inset-0 opacity-20">
          <Image
            src={cta.backgroundImage.url}
            alt={cta.backgroundImage.alternativeText || cta.headline}
            fill
            className="object-cover"
          />
        </div>
      )}

      {/* Background Pattern */}
      <div className="absolute inset-0 bg-black/40" />

      {/* Animated Background Elements */}
      <div className="absolute top-10 right-10 w-32 h-32 bg-white/10 rounded-full blur-xl animate-pulse" />
      <div
        className="absolute bottom-10 left-10 w-40 h-40 bg-orange-300/20 rounded-full blur-2xl animate-pulse"
        style={{ animationDelay: '1s' }}
      />

      {/* Content */}
      <div className="relative container mx-auto px-6">
        <div className="max-w-4xl mx-auto text-center text-white">
          {/* Headline */}
          <h2
            className={`text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight transition-all duration-1000 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            {cta.headline}
          </h2>

          {/* Description */}
          <p
            className={`text-xl md:text-2xl text-orange-100 leading-relaxed max-w-3xl mx-auto mb-10 transition-all duration-1000 delay-200 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            {cta.description}
          </p>

          {/* Buttons */}
          <div
            className={`flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-6 transition-all duration-1000 delay-400 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            {/* Primary Button */}
            {cta.primaryButton && (
              <Link
                href={cta.primaryButton.url}
                className="inline-flex items-center justify-center bg-white text-orange-600 font-bold py-4 px-8 rounded-lg hover:bg-gray-100 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                {cta.primaryButton.label}
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </Link>
            )}

            {/* Secondary Button */}
            {cta.secondaryButton && (
              <Link
                href={cta.secondaryButton.url}
                className="inline-flex items-center justify-center border-2 border-white text-white font-bold py-4 px-8 rounded-lg hover:bg-white hover:text-orange-600 transition-all duration-200 transform hover:scale-105"
              >
                {cta.secondaryButton.label}
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                  />
                </svg>
              </Link>
            )}
          </div>

          {/* Trust Indicators */}
          <div
            className={`mt-12 flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-8 text-orange-100 transition-all duration-1000 delay-600 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <div className="flex items-center space-x-2">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              <span>Free Consultation</span>
            </div>
            <div className="flex items-center space-x-2">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              <span>Quality Guarantee</span>
            </div>
            <div className="flex items-center space-x-2">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              <span>Expert Team</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
