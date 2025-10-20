'use client';

import Image from 'next/image';

interface BusinessPartnerHeroProps {
  hero: {
    title: string;
    subtitle: string;
    backgroundImage?: {
      url: string;
      alternativeText?: string;
    };
    icon?: string;
  };
}

export default function BusinessPartnerHero({ hero }: BusinessPartnerHeroProps) {
  const { title, subtitle, backgroundImage, icon } = hero;

  return (
    <section className="relative bg-gradient-to-br from-blue-900 via-blue-800 to-orange-600 text-white overflow-hidden">
      {/* Background Image */}
      {backgroundImage && (
        <div className="absolute inset-0 opacity-20" style={{ opacity: 1.2 }}>
          <Image
            src={`${process.env.NEXT_PUBLIC_STRAPI_API_URL}${backgroundImage.url}`}
            alt={backgroundImage.alternativeText || title}
            fill
            className="object-cover"
            priority
          />
        </div>
      )}

      {/* Background Pattern */}
      <div
        className="absolute inset-0 "
        style={{
          background: 'linear-gradient(to bottom right, rgba(0,0,0,0.75), rgba(234,88,12,0.2))',
        }}
      />

      {/* Animated Geometric Shapes */}
      <div className="absolute top-20 right-20 w-32 h-32 bg-white/10 rounded-full blur-xl animate-pulse" />
      <div
        className="absolute bottom-20 left-20 w-48 h-48 bg-orange-500/20 rounded-full blur-2xl animate-pulse"
        style={{ animationDelay: '1s' }}
      />
      <div
        className="absolute top-1/3 left-1/4 w-24 h-24 bg-white/5 rounded-lg rotate-45 blur-lg animate-pulse"
        style={{ animationDelay: '2s' }}
      />

      {/* Content */}
      <div className="relative container mx-auto px-6 pt-32 pb-24 md:pt-36 lg:pt-40 lg:pb-32">
        <div className="max-w-4xl mx-auto text-center">
          {/* Icon */}
          {icon && <div className="text-6xl mb-8 animate-fade-in">{icon}</div>}

          {/* Title */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight animate-fade-in">
            {title}
          </h1>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-blue-100 leading-relaxed max-w-3xl mx-auto animate-fade-in-delay">
            {subtitle}
          </p>

          {/* Decorative Line */}
          <div className="mt-12 flex justify-center animate-fade-in-delay-2">
            <div className="w-24 h-1 bg-gradient-to-r from-orange-400 to-orange-600 rounded-full" />
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
