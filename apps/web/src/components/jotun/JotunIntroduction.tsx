'use client';

import React from 'react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import MarkdownContent from '../MarkdownContent';
import { StrapiJotunIntroduction } from '@/lib/strapi';

interface JotunIntroductionProps {
  introduction: StrapiJotunIntroduction;
}

export default function JotunIntroduction({ introduction }: JotunIntroductionProps) {
  const { ref: contentRef, isVisible: contentVisible } = useScrollAnimation<HTMLDivElement>();

  const getIconForHighlight = (icon: string) => {
    switch (icon) {
      case 'certified':
        return (
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        );
      case 'performance':
        return (
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13 10V3L4 14h7v7l9-11h-7z"
            />
          </svg>
        );
      case 'eco-friendly':
        return (
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
            />
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
      case 'purple':
        return 'bg-purple-600 text-white';
      case 'red':
        return 'bg-red-600 text-white';
      default:
        return 'bg-gray-600 text-white';
    }
  };

  return (
    <section
      ref={contentRef}
      className={`py-20 bg-gray-50 transition-all duration-1000 ${
        contentVisible ? 'animate-fade-in-up' : 'opacity-0 translate-y-8'
      }`}
    >
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          {/* Introduction Content */}
          <div className="prose prose-lg max-w-none mb-16">
            <MarkdownContent content={introduction.content} />
          </div>

          {/* Partnership Highlights */}
          <div className="grid md:grid-cols-3 gap-8">
            {introduction.highlights.map((highlight, index) => (
              <div
                key={highlight.id}
                className={`bg-white rounded-lg p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 ${
                  contentVisible ? 'animate-fade-in-up' : 'opacity-0 translate-y-8'
                }`}
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <div
                  className={`inline-flex items-center justify-center w-16 h-16 rounded-lg mb-4 ${getColorClasses(highlight.color)}`}
                >
                  {getIconForHighlight(highlight.icon)}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{highlight.title}</h3>
                <p className="text-gray-600 leading-relaxed">{highlight.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
