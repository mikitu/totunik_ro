'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useScrollAnimation, useStaggeredScrollAnimation } from '@/hooks/useScrollAnimation';

interface StoryCard {
  title: string;
  excerpt: string;
  image?: {
    url: string;
    alternativeText?: string;
  };
  link?: {
    url: string;
    label: string;
  };
  category: 'residential' | 'industrial' | 'medical' | 'retail';
  partnerName?: string;
}

interface Stories {
  title?: string;
  subtitle?: string;
  stories: StoryCard[];
}

interface SuccessStoriesProps {
  stories: Stories;
}

export default function SuccessStories({ stories }: SuccessStoriesProps) {
  const { title, subtitle, stories: storyItems } = stories;

  // Initialize hooks before any early returns
  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation<HTMLDivElement>();
  const { ref: gridRef, visibleItems } = useStaggeredScrollAnimation<HTMLDivElement>(storyItems?.length || 0, { staggerDelay: 150 });

  // Handle missing story items
  if (!storyItems || !Array.isArray(storyItems) || storyItems.length === 0) {
    return null;
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'residential': return '🏡';
      case 'industrial': return '🏭';
      case 'medical': return '🏥';
      case 'retail': return '🏢';
      default: return '📋';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'residential': return 'bg-green-100 text-green-800';
      case 'industrial': return 'bg-blue-100 text-blue-800';
      case 'medical': return 'bg-red-100 text-red-800';
      case 'retail': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Header */}
        {(title || subtitle) && (
          <div
            ref={headerRef}
            className={`text-center mb-16 transition-all duration-800 ${
              headerVisible ? 'animate-fade-in-up' : 'opacity-0 translate-y-8'
            }`}
          >
            {title && (
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                {title}
              </h2>
            )}
            {subtitle && (
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                {subtitle}
              </p>
            )}
          </div>
        )}

        {/* Stories Grid */}
        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {storyItems.map((story, index) => (
            <div
              key={index}
              className={`group bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden hover:-translate-y-2 ${
                visibleItems[index] ? 'animate-fade-in-up' : 'opacity-0 translate-y-8'
              }`}
            >
              {/* Image */}
              {story.image && (
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={`${process.env.NEXT_PUBLIC_STRAPI_API_URL}${story.image.url}`}
                    alt={story.image.alternativeText || story.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  
                  {/* Category Badge */}
                  <div className="absolute top-4 left-4">
                    <span className={`px-3 py-1 text-sm rounded-full font-medium ${getCategoryColor(story.category)}`}>
                      {getCategoryIcon(story.category)} {story.category.charAt(0).toUpperCase() + story.category.slice(1)}
                    </span>
                  </div>
                </div>
              )}

              {/* Content */}
              <div className="p-6">
                {/* Partner Name */}
                {story.partnerName && (
                  <p className="text-sm text-orange-600 font-semibold mb-2">
                    with {story.partnerName}
                  </p>
                )}

                {/* Title */}
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-orange-600 transition-colors">
                  {story.title}
                </h3>

                {/* Excerpt */}
                <p className="text-gray-600 mb-4 leading-relaxed">
                  {story.excerpt}
                </p>

                {/* Link */}
                {story.link && story.link.url && (
                  <Link
                    href={story.link.url}
                    className="inline-flex items-center text-orange-600 font-semibold hover:text-orange-700 transition-colors group/link"
                  >
                    {story.link.label}
                    <svg
                      className="w-4 h-4 ml-2 transform group-hover/link:translate-x-1 transition-transform"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </Link>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Message */}
        <div className="text-center mt-12">
          <p className="text-gray-600 italic max-w-2xl mx-auto">
            These success stories represent just a fraction of the collaborative achievements we&apos;ve accomplished with our trusted partners across various industries.
          </p>
        </div>
      </div>
    </section>
  );
}
