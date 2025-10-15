'use client';

import { LoadingLink } from '@/components/LoadingLink';
import { Autoplay, EffectFade } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

interface SlideData {
  id: number;
  headline: string;
  subheadline?: string;
  image?: { url?: string; alternativeText?: string };
  cta?: { label: string; url: string };
}

interface HeroSliderProps {
  slides: SlideData[];
  height?: string | number;
}

function fullUrl(url?: string): string {
  if (!url) return '';
  return url.startsWith('http') ? url : `${process.env.NEXT_PUBLIC_STRAPI_API_URL}${url}`;
}

export default function HeroSlider({ slides, height = '100vh' }: HeroSliderProps) {
  if (!slides || slides.length === 0) return null;

  const heightStyle = typeof height === 'number' ? `${height}px` : height;

  return (
    <div className="relative w-full" style={{ height: heightStyle }}>
      <Swiper
        modules={[Autoplay, EffectFade]}
        effect="fade"
        loop
        slidesPerView={1}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        speed={600}
        allowTouchMove
        className="w-full h-full"
      >
        {slides.map(s => (
          <SwiperSlide key={s.id}>
            <div className="relative w-full h-full overflow-hidden">
              <div
                className="absolute inset-0 bg-center bg-cover"
                style={{ backgroundImage: `url('${fullUrl(s.image?.url)}')` }}
              />
              {/* dark overlay */}
              <div className="absolute inset-0 bg-black/40" />
              {/* bottom gradient for readability */}
              <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />
              {/* content bottom-left */}
              <div className="absolute left-6 bottom-8 md:left-10 md:bottom-12 max-w-2xl text-left z-10">
                {s?.headline && (
                  <h1 className="text-3xl md:text-5xl font-bold text-white mb-3">{s.headline}</h1>
                )}
                {s?.subheadline && (
                  <p className="text-base md:text-xl text-white/90 mb-5">{s.subheadline}</p>
                )}
                {s?.cta?.label && s?.cta?.url && (
                  <LoadingLink
                    href={s.cta.url}
                    className="inline-block px-6 py-2.5 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition-colors"
                  >
                    {s.cta.label}
                  </LoadingLink>
                )}
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
