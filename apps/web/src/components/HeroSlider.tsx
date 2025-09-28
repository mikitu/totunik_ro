'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface Slide {
  id: number;
  headline: string;
  subheadline: string;
  image: {
    url: string;
    alternativeText?: string;
  };
  cta: {
    label: string;
    url: string;
  };
}

interface HeroSliderProps {
  title?: string;
  slides: Slide[];
}

export default function HeroSlider({ title, slides }: HeroSliderProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Auto-advance slides
  useEffect(() => {
    if (!isAutoPlaying || slides.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval);
  }, [isAutoPlaying, slides.length]);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    setIsAutoPlaying(false); // Stop auto-play when user manually navigates
    
    // Resume auto-play after 10 seconds
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  if (!slides || slides.length === 0) {
    return (
      <section className="relative h-[600px] bg-gray-200 flex items-center justify-center">
        <p className="text-gray-500">No slides available</p>
      </section>
    );
  }

  const currentSlideData = slides[currentSlide];
  const imageUrl = currentSlideData?.image?.url?.startsWith('http')
    ? currentSlideData.image.url
    : `${process.env.NEXT_PUBLIC_STRAPI_API_URL}${currentSlideData?.image?.url}`;

  return (
    <section className="relative h-[600px] overflow-hidden">
      {/* Background Images */}
      <div className="absolute inset-0">
        {slides.map((slide, index) => {
          const slideImageUrl = slide.image?.url?.startsWith('http')
            ? slide.image.url
            : `${process.env.NEXT_PUBLIC_STRAPI_API_URL}${slide.image?.url}`;

          return (
            <div
              key={slide.id}
              className={`absolute inset-0 transition-opacity duration-1000 ${
                index === currentSlide ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <Image
                src={slideImageUrl}
                alt={slide.image?.alternativeText || slide.headline}
                fill
                className="object-cover"
                priority={index === 0}
              />
              {/* Overlay */}
              <div className="absolute inset-0 bg-black bg-opacity-40" />
            </div>
          );
        })}
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex items-center justify-center">
        <div className="text-center text-white px-4 max-w-4xl">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 animate-fade-in">
            {currentSlideData.headline}
          </h1>
          {currentSlideData.subheadline && (
            <p className="text-xl md:text-2xl mb-8 animate-fade-in-delay">
              {currentSlideData.subheadline}
            </p>
          )}
          {currentSlideData.cta && (
            <Link
              href={currentSlideData.cta.url}
              className="inline-block px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors duration-300 animate-fade-in-delay-2"
            >
              {currentSlideData.cta.label}
            </Link>
          )}
        </div>
      </div>

      {/* Navigation Arrows */}
      {slides.length > 1 && (
        <>
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 z-20 bg-white bg-opacity-20 hover:bg-opacity-30 text-white p-3 rounded-full transition-all duration-300"
            aria-label="Previous slide"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 z-20 bg-white bg-opacity-20 hover:bg-opacity-30 text-white p-3 rounded-full transition-all duration-300"
            aria-label="Next slide"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </>
      )}

      {/* Dots Indicator */}
      {slides.length > 1 && (
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-20 flex space-x-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentSlide
                  ? 'bg-white scale-125'
                  : 'bg-white bg-opacity-50 hover:bg-opacity-75'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}

      {/* Progress Bar */}
      {slides.length > 1 && isAutoPlaying && (
        <div className="absolute bottom-0 left-0 w-full h-1 bg-white bg-opacity-20 z-20">
          <div 
            className="h-full bg-white transition-all duration-100 ease-linear"
            style={{
              width: `${((currentSlide + 1) / slides.length) * 100}%`
            }}
          />
        </div>
      )}
    </section>
  );
}
