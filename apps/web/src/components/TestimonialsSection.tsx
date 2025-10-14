'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { StrapiTestimonials } from '@/lib/strapi';

interface TestimonialsSectionProps {
  testimonials: StrapiTestimonials;
}

export default function TestimonialsSection({ testimonials }: TestimonialsSectionProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-advance testimonials every 5 seconds
  useEffect(() => {
    if (!testimonials?.items || testimonials.items.length === 0) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        (prevIndex + 1) % testimonials.items.length
      );
    }, 5000);

    return () => clearInterval(interval);
  }, [testimonials?.items?.length]);

  if (!testimonials?.items || testimonials.items.length === 0) return null;

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? testimonials.items.length - 1 : prevIndex - 1
    );
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) => 
      (prevIndex + 1) % testimonials.items.length
    );
  };

  const currentTestimonial = testimonials.items[currentIndex];

  return (
    <section className="py-20 bg-gray-100">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        {(testimonials.title || testimonials.subtitle) && (
          <div className="text-center mb-16">
            {testimonials.title && (
              <h2 className="text-4xl lg:text-5xl font-normal uppercase mb-4 text-gray-900">
                {testimonials.title}
              </h2>
            )}
            {testimonials.subtitle && (
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                {testimonials.subtitle}
              </p>
            )}
          </div>
        )}

        {/* Testimonial Carousel */}
        <div className="relative max-w-4xl mx-auto">
          {/* Navigation Arrows with Enhanced Animations */}
          <button
            onClick={goToPrevious}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-12 bg-white rounded-full p-3 shadow-lg hover:shadow-xl hover:scale-110 hover:bg-orange-50 transition-all duration-300 z-10 group"
            aria-label="Previous testimonial"
          >
            <svg className="w-6 h-6 text-gray-600 group-hover:text-orange-500 transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <button
            onClick={goToNext}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-12 bg-white rounded-full p-3 shadow-lg hover:shadow-xl hover:scale-110 hover:bg-orange-50 transition-all duration-300 z-10 group"
            aria-label="Next testimonial"
          >
            <svg className="w-6 h-6 text-gray-600 group-hover:text-orange-500 transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Testimonial Card with Fade Transition */}
          <div className="bg-white rounded-lg shadow-lg p-8 md:p-12 text-center transition-all duration-500 ease-in-out transform hover:shadow-xl hover:scale-[1.02]">
            {/* Avatar with Scale Animation */}
            {currentTestimonial.image?.url && (
              <div className="mb-6 animate-fade-in">
                <div className="w-20 h-20 mx-auto relative transition-transform duration-300 hover:scale-110">
                  <Image
                    src={
                      currentTestimonial.image.url.startsWith('http')
                        ? currentTestimonial.image.url
                        : `${process.env.NEXT_PUBLIC_STRAPI_API_URL}${currentTestimonial.image.url}`
                    }
                    alt={currentTestimonial.image.alternativeText || currentTestimonial.name}
                    fill
                    className="rounded-full object-cover transition-all duration-300"
                  />
                </div>
              </div>
            )}

            {/* Quote with Slide Up Animation */}
            <blockquote
              key={`quote-${currentIndex}`}
              className="text-xl md:text-2xl text-gray-700 italic mb-6 leading-relaxed animate-slide-up"
            >
              "              &ldquo;{currentTestimonial.quote}&rdquo;"
            </blockquote>

            {/* Name and Role with Delayed Animation */}
            <div
              key={`author-${currentIndex}`}
              className="text-center animate-fade-in-delay"
            >
              <h4 className="text-lg font-semibold text-gray-900 mb-1 transition-colors duration-200 hover:text-orange-500">
                {currentTestimonial.name}
              </h4>
              <p className="text-gray-600 transition-colors duration-200">
                {currentTestimonial.role}
              </p>
            </div>
          </div>

          {/* Dots Indicator with Enhanced Animations */}
          <div className="flex justify-center mt-8 space-x-3">
            {testimonials.items.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`relative transition-all duration-300 transform hover:scale-125 ${
                  index === currentIndex
                    ? 'w-8 h-3 bg-orange-500 rounded-full'
                    : 'w-3 h-3 bg-gray-300 hover:bg-orange-300 rounded-full'
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              >
                {/* Active indicator glow effect */}
                {index === currentIndex && (
                  <div className="absolute inset-0 bg-orange-500 rounded-full animate-pulse opacity-50"></div>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
