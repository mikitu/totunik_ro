'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

interface BusinessPartnerCTAProps {
  cta: {
    title: string;
    subtitle?: string;
    primaryButton?: {
      href: string;
      text: string;
      external?: boolean;
    };
    secondaryButton?: {
      href: string;
      text: string;
      external?: boolean;
    };
    backgroundImage?: {
      url: string;
      alternativeText?: string;
    };
  };
}

export default function BusinessPartnerCTA({ cta }: BusinessPartnerCTAProps) {
  const { title, subtitle, primaryButton, secondaryButton, backgroundImage } = cta;
  const { ref: titleRef, isVisible: titleVisible } = useScrollAnimation<HTMLHeadingElement>();
  const { ref: subtitleRef, isVisible: subtitleVisible } = useScrollAnimation<HTMLParagraphElement>(
    { delay: 200 }
  );
  const { ref: buttonsRef, isVisible: buttonsVisible } = useScrollAnimation<HTMLDivElement>({
    delay: 400,
  });

  return (
    <section
      className="relative py-16 lg:py-24 text-white overflow-hidden"
      style={{
        background: 'linear-gradient(to bottom right, rgba(0,0,0,0.75), rgba(234,88,12,0.3))',
      }}
    >
      {/* Background Image */}
      {backgroundImage && (
        <div className="absolute inset-0 opacity-20" style={{ opacity: 1.2 }}>
          <Image
            src={`${process.env.NEXT_PUBLIC_STRAPI_API_URL}${backgroundImage.url}`}
            alt={backgroundImage.alternativeText || title}
            fill
            className="object-cover"
          />
        </div>
      )}

      {/* Background Pattern */}
      <div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(to bottom right, rgba(0,0,0,0.75), rgba(234,88,12,0.2))',
        }}
      />

      {/* Geometric Shapes */}
      <div className="absolute top-10 right-10 w-32 h-32 bg-white/10 rounded-full blur-xl" />
      <div className="absolute bottom-10 left-10 w-48 h-48 bg-orange-500/20 rounded-full blur-2xl" />

      {/* Content */}
      <div className="relative container mx-auto px-6">
        <div className="max-w-4xl mx-auto text-center">
          {/* Title */}
          <h2
            ref={titleRef}
            className={`text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight transition-all duration-800 ${
              titleVisible ? 'animate-fade-in-up' : 'opacity-0 translate-y-8'
            }`}
          >
            {title}
          </h2>

          {/* Subtitle */}
          {subtitle && (
            <p
              ref={subtitleRef}
              className={`text-xl md:text-2xl text-blue-100 leading-relaxed mb-12 max-w-3xl mx-auto transition-all duration-800 ${
                subtitleVisible ? 'animate-fade-in-up' : 'opacity-0 translate-y-8'
              }`}
            >
              {subtitle}
            </p>
          )}

          {/* Buttons */}
          <div
            ref={buttonsRef}
            className={`flex flex-col sm:flex-row gap-6 justify-center items-center transition-all duration-800 ${
              buttonsVisible ? 'animate-fade-in-up' : 'opacity-0 translate-y-8'
            }`}
          >
            {primaryButton && primaryButton.href && (
              <Link
                href={primaryButton.href}
                className="group bg-orange-500 hover:bg-orange-600 text-white font-semibold py-4 px-8 rounded-lg transition-all duration-200 transform hover:scale-105 hover:shadow-lg flex items-center space-x-2"
                {...(primaryButton.external && { target: '_blank', rel: 'noopener noreferrer' })}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                <span>{primaryButton.text}</span>
              </Link>
            )}

            {secondaryButton && secondaryButton.href && (
              <Link
                href={secondaryButton.href}
                className="group bg-transparent border-2 border-white text-white hover:bg-white hover:text-gray-900 font-semibold py-4 px-8 rounded-lg transition-all duration-200 transform hover:scale-105 flex items-center space-x-2"
                {...(secondaryButton.external && { target: '_blank', rel: 'noopener noreferrer' })}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
                <span>{secondaryButton.text}</span>
              </Link>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
