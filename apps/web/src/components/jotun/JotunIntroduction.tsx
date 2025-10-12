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
          <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
      case 'performance':
        return (
          <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        );
      case 'eco-friendly':
        return (
          <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
        );
      default:
        return (
          <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        );
    }
  };

  const getColorForHighlight = (color: string) => {
    switch (color) {
      case 'blue': return 'bg-blue-600';
      case 'orange': return 'bg-orange-500';
      case 'green': return 'bg-green-600';
      case 'purple': return 'bg-purple-600';
      case 'red': return 'bg-red-600';
      default: return 'bg-gray-600';
    }
  };

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <div
            ref={contentRef}
            className={`transition-all duration-800 ${
              contentVisible ? 'animate-fade-in-up' : 'opacity-0 translate-y-8'
            }`}
          >
            <MarkdownContent
              content={introduction.content}
              variant="large"
              className="text-center"
            />
          </div>

          {/* Partnership Highlights */}
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
            {introduction.highlights.map((highlight, index) => (
              <div key={highlight.id} className="text-center group">
                <div className={`w-16 h-16 ${getColorForHighlight(highlight.color)} rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  {getIconForHighlight(highlight.icon)}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{highlight.title}</h3>
                <p className="text-gray-600">{highlight.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
