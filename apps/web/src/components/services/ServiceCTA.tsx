'use client';

import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import Link from 'next/link';

interface ServiceCTAProps {
  cta: {
    headline: string;
    description: string;
    primaryButton: {
      label: string;
      url: string;
    };
    secondaryButton: {
      label: string;
      url: string;
    };
  };
}

export default function ServiceCTA({ cta }: ServiceCTAProps) {
  const { ref, isVisible } = useScrollAnimation<HTMLElement>();

  return (
    <section 
      ref={ref}
      className="py-20 bg-gradient-to-br from-gray-900 via-gray-800 to-orange-900"
    >
      <div className="container mx-auto px-6">
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
            className={`text-xl md:text-2xl text-gray-300 leading-relaxed max-w-3xl mx-auto mb-10 transition-all duration-1000 delay-200 ${
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
            <Link
              href={cta.primaryButton.url}
              className="inline-flex items-center justify-center bg-orange-600 text-white font-bold py-4 px-8 rounded-lg hover:bg-orange-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              {cta.primaryButton.label}
              <svg 
                className="w-5 h-5 ml-2" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>

            {/* Secondary Button */}
            <Link
              href={cta.secondaryButton.url}
              className="inline-flex items-center justify-center border-2 border-orange-600 text-orange-600 font-bold py-4 px-8 rounded-lg hover:bg-orange-600 hover:text-white transition-all duration-200 transform hover:scale-105"
            >
              {cta.secondaryButton.label}
              <svg 
                className="w-5 h-5 ml-2" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
