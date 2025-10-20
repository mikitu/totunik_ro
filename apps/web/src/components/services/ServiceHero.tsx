'use client';

import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { StrapiServiceItem } from '@/lib/strapi';
import Image from 'next/image';

interface ServiceHeroProps {
  service:
    | StrapiServiceItem
    | {
        title: string;
        subtitle: string;
        description: string;
        image: {
          url: string;
          alternativeText?: string;
        };
      };
}

export default function ServiceHero({ service }: ServiceHeroProps) {
  const { ref, isVisible } = useScrollAnimation<HTMLElement>();

  // Get the image from either heroImage, featuredImage, or image field
  const heroImage = 'heroImage' in service ? service.heroImage : undefined;
  const featuredImage = 'featuredImage' in service ? service.featuredImage : undefined;
  const mockImage = 'image' in service ? service.image : undefined;

  const imageUrl = heroImage?.url || featuredImage?.url || mockImage?.url;
  const imageAlt =
    heroImage?.alternativeText ||
    featuredImage?.alternativeText ||
    mockImage?.alternativeText ||
    service.title;

  return (
    <section
      ref={ref}
      className="relative min-h-[70vh] flex items-center justify-center overflow-hidden bg-gray-900"
    >
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        {imageUrl && <Image src={imageUrl} alt={imageAlt} fill className="object-cover" priority />}
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/70" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center text-white">
        <div
          className={`transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          {/* Title */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            {service.title}
          </h1>

          {/* Subtitle */}
          <h2 className="text-xl md:text-2xl font-light mb-8 text-orange-300">
            {service.subtitle}
          </h2>

          {/* Description */}
          <p className="text-lg md:text-xl leading-relaxed max-w-3xl mx-auto">
            {service.description}
          </p>

          {/* Scroll Indicator */}
          <div className="mt-12 animate-bounce">
            <svg
              className="w-6 h-6 mx-auto text-white/70"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 14l-7 7m0 0l-7-7m7 7V3"
              />
            </svg>
          </div>
        </div>
      </div>

      {/* Bottom Wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z"
            fill="rgb(249 250 251)"
          />
        </svg>
      </div>
    </section>
  );
}
