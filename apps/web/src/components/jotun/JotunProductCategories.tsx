'use client';

import React from 'react';
import { useScrollAnimation, useStaggeredScrollAnimation } from '@/hooks/useScrollAnimation';
import { StrapiJotunProductCategories } from '@/lib/strapi';

interface JotunProductCategoriesProps {
  productCategories: StrapiJotunProductCategories;
}

export default function JotunProductCategories({ productCategories }: JotunProductCategoriesProps) {
  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation<HTMLDivElement>();
  const { ref: gridRef, visibleItems } = useStaggeredScrollAnimation<HTMLDivElement>(productCategories.categories.length, { staggerDelay: 150 });

  const getIconForCategory = (icon: string) => {
    switch (icon) {
      case 'interior':
        return (
          <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 21l4-7 4 7" />
          </svg>
        );
      case 'exterior':
        return (
          <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
          </svg>
        );
      case 'protective':
        return (
          <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
          </svg>
        );
      case 'wood-metal':
        return (
          <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM21 5a2 2 0 00-2-2h-4a2 2 0 00-2 2v12a4 4 0 004 4 4 4 0 004-4V5z" />
          </svg>
        );
      default:
        return (
          <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4z" />
          </svg>
        );
    }
  };

  const getColorForCategory = (color: string) => {
    switch (color) {
      case 'blue': return 'from-blue-500 to-blue-600';
      case 'green': return 'from-green-500 to-green-600';
      case 'orange': return 'from-orange-500 to-orange-600';
      case 'purple': return 'from-purple-500 to-purple-600';
      case 'red': return 'from-red-500 to-red-600';
      case 'gray': return 'from-gray-500 to-gray-600';
      case 'teal': return 'from-teal-500 to-teal-600';
      case 'indigo': return 'from-indigo-500 to-indigo-600';
      default: return 'from-blue-500 to-blue-600';
    }
  };



  return (
    <section id="product-categories" className="py-20 bg-white">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div
          ref={headerRef}
          className={`text-center mb-16 transition-all duration-800 ${
            headerVisible ? 'animate-fade-in-up' : 'opacity-0 translate-y-8'
          }`}
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            {productCategories.title}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {productCategories.subtitle}
          </p>
        </div>

        {/* Categories Grid */}
        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {productCategories.categories.map((category, index) => (
            <div
              key={category.id}
              className={`group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100 ${
                visibleItems[index] ? 'animate-fade-in-up' : 'opacity-0 translate-y-8'
              }`}
            >
              {/* Category Header */}
              <div className={`bg-gradient-to-r ${getColorForCategory(category.color)} p-6 text-white`}>
                <div className="flex items-center justify-center w-16 h-16 bg-white/20 rounded-full mb-4 group-hover:scale-110 transition-transform duration-300">
                  {getIconForCategory(category.icon)}
                </div>
                <h3 className="text-xl font-bold mb-2">{category.title}</h3>
              </div>

              {/* Category Content */}
              <div className="p-6">
                <p className="text-gray-600 mb-6 leading-relaxed">
                  {category.description}
                </p>

                {/* Features List */}
                <ul className="space-y-2">
                  {category.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center text-sm text-gray-700">
                      <svg className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      {feature.text}
                    </li>
                  ))}
                </ul>

                {/* Learn More Button */}
                {category.ctaButton && (
                  <div className="mt-6">
                    <button className="w-full bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium py-2 px-4 rounded-lg transition-colors duration-200 group-hover:bg-gray-800 group-hover:text-white">
                      {category.ctaButton.label}
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
