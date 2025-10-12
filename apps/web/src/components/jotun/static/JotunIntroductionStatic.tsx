'use client';

import React from 'react';
import MarkdownContent from '@/components/MarkdownContent';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

const introductionContent = `Totunik proudly partners with **Jotun**, a global leader in high-performance coatings and decorative paints. From residential to industrial projects, Jotun products deliver unmatched durability, colour stability, and environmental responsibility.

With over 100 years of expertise, Jotun has established itself as a trusted name in the coatings industry. Our partnership ensures that every Totunik project benefits from:

- **Premium Quality**: Industry-leading formulations for superior performance
- **Environmental Responsibility**: Low-VOC and eco-friendly solutions
- **Professional Support**: Expert guidance and technical assistance
- **Global Standards**: Products tested and proven worldwide`;

const highlights = [
  {
    title: "Certified Partner",
    description: "Official Jotun distributor with certified application expertise",
    icon: "certified",
    color: "blue"
  },
  {
    title: "Premium Performance",
    description: "High-performance coatings for demanding applications",
    icon: "performance",
    color: "orange"
  },
  {
    title: "Eco-Friendly",
    description: "Sustainable solutions with minimal environmental impact",
    icon: "eco-friendly",
    color: "green"
  }
];

const getIconForType = (iconType: string) => {
  switch (iconType) {
    case 'certified':
      return (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      );
    case 'performance':
      return (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      );
    case 'eco-friendly':
      return (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
        </svg>
      );
    default:
      return (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
      );
  }
};

const getColorClasses = (color: string) => {
  switch (color) {
    case 'blue':
      return 'bg-blue-600 text-white';
    case 'orange':
      return 'bg-orange-600 text-white';
    case 'green':
      return 'bg-green-600 text-white';
    default:
      return 'bg-gray-600 text-white';
  }
};

export default function JotunIntroductionStatic() {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section ref={ref} className={`py-20 bg-gray-50 transition-all duration-1000 ${isVisible ? 'animate-fadeInUp' : 'opacity-0 translate-y-8'}`}>
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          {/* Introduction Content */}
          <div className="prose prose-lg max-w-none mb-16">
            <MarkdownContent content={introductionContent} />
          </div>

          {/* Partnership Highlights */}
          <div className="grid md:grid-cols-3 gap-8">
            {highlights.map((highlight, index) => (
              <div
                key={index}
                className={`bg-white rounded-lg p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 ${
                  isVisible ? 'animate-fadeInUp' : 'opacity-0 translate-y-8'
                }`}
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <div className={`inline-flex items-center justify-center w-16 h-16 rounded-lg mb-4 ${getColorClasses(highlight.color)}`}>
                  {getIconForType(highlight.icon)}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {highlight.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {highlight.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
