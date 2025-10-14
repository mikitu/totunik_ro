'use client';

import React from 'react';
import Image from 'next/image';

interface SplitImages {
  leftImage?: {
    url: string;
    alternativeText?: string;
  };
  leftImageAlt?: string;
  rightImage?: {
    url: string;
    alternativeText?: string;
  };
  rightImageAlt?: string;
}

interface Hero {
  title: string;
  subtitle: string;
  backgroundImage?: {
    url: string;
    alternativeText?: string;
  };
  splitImages?: SplitImages;
}

interface BusinessPartnersHeroProps {
  hero: Hero;
}

export default function BusinessPartnersHero({ hero }: BusinessPartnersHeroProps) {
  const { title, subtitle, backgroundImage, splitImages } = hero;

  return (
    <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        {splitImages?.leftImage && splitImages?.rightImage ? (
          // Split Images Layout
          <div className="flex h-full">
            <div className="w-1/2 relative">
              <Image
                src={`${process.env.NEXT_PUBLIC_STRAPI_API_URL}${splitImages.leftImage.url}`}
                alt={
                  splitImages.leftImage.alternativeText || splitImages.leftImageAlt || 'Residential'
                }
                fill
                className="object-cover"
                priority
              />
            </div>
            <div className="w-1/2 relative">
              <Image
                src={`${process.env.NEXT_PUBLIC_STRAPI_API_URL}${splitImages.rightImage.url}`}
                alt={
                  splitImages.rightImage.alternativeText ||
                  splitImages.rightImageAlt ||
                  'Commercial'
                }
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
        ) : backgroundImage ? (
          // Single Background Image
          <Image
            src={`${process.env.NEXT_PUBLIC_STRAPI_API_URL}${backgroundImage.url}`}
            alt={backgroundImage.alternativeText || 'Business Partners'}
            fill
            className="object-cover"
            priority
          />
        ) : (
          // Gradient Fallback
          <div className="bg-gradient-to-br from-blue-900 via-blue-800 to-orange-600" />
        )}

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/50" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center text-white">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">{title}</h1>
          <p className="text-xl md:text-2xl leading-relaxed opacity-90">{subtitle}</p>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white animate-bounce">
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 14l-7 7m0 0l-7-7m7 7V3"
          />
        </svg>
      </div>
    </section>
  );
}
