'use client';

import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { StrapiCertificationsHero, getStrapiMediaURL } from '@/lib/strapi';
import Image from 'next/image';

interface CertificationsHeroProps {
  hero: StrapiCertificationsHero | null;
}

export default function CertificationsHero({ hero }: CertificationsHeroProps) {
  const { ref, isVisible } = useScrollAnimation();

  // Return null if no data
  if (!hero) {
    return null;
  }

  return (
    <section
      ref={ref}
      className="relative min-h-[60vh] flex items-center justify-center overflow-hidden bg-gray-900"
    >
      {/* Background Image */}
      {hero.backgroundImage ? (
        <div className="absolute inset-0 z-0">
          <Image
            src={getStrapiMediaURL(hero.backgroundImage) || ''}
            alt={hero.backgroundImage.alternativeText || hero.title}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/50" />
        </div>
      ) : (
        <div className="absolute inset-0 z-0 bg-gradient-to-r from-gray-800 to-gray-900" />
      )}

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center text-white">
        <div
          className={`transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-6">{hero.title}</h1>
          <h2 className="text-xl md:text-2xl font-light mb-8 text-orange-300">{hero.subtitle}</h2>
          <p className="text-lg md:text-xl leading-relaxed max-w-3xl mx-auto">{hero.description}</p>
        </div>
      </div>
    </section>
  );
}
