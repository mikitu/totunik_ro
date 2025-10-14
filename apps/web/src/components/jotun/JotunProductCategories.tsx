'use client';

import React from 'react';
import { useScrollAnimation, useStaggeredScrollAnimation } from '@/hooks/useScrollAnimation';
import { StrapiJotunProductCategories } from '@/lib/strapi';

interface JotunProductCategoriesProps {
  productCategories: StrapiJotunProductCategories;
}

export default function JotunProductCategories({ productCategories }: JotunProductCategoriesProps) {
  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation<HTMLDivElement>();
  const { ref: gridRef, visibleItems } = useStaggeredScrollAnimation<HTMLDivElement>(
    productCategories.categories.length,
    { staggerDelay: 150 }
  );

  const getIconForCategory = (icon: string) => {
    switch (icon) {
      case 'interior':
        return (
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 5a2 2 0 012-2h4a2 2 0 012 2v6H8V5z"
            />
          </svg>
        );
      case 'exterior':
        return (
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
            />
          </svg>
        );
      case 'protective':
        return (
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
            />
          </svg>
        );
      case 'wood-metal':
        return (
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
            />
          </svg>
        );
      default:
        return (
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4z"
            />
          </svg>
        );
    }
  };

  const getColorForCategory = (color: string) => {
    switch (color) {
      case 'blue':
        return 'bg-blue-500';
      case 'green':
        return 'bg-green-500';
      case 'orange':
        return 'bg-orange-500';
      case 'purple':
        return 'bg-purple-500';
      case 'red':
        return 'bg-red-500';
      case 'gray':
        return 'bg-gray-500';
      case 'teal':
        return 'bg-teal-500';
      case 'indigo':
        return 'bg-indigo-500';
      default:
        return 'bg-blue-500';
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
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">{productCategories.subtitle}</p>
        </div>

        {/* Categories Grid */}
        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {productCategories.categories.map((category, index) => (
            <div
              key={category.id}
              className={`group bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden ${
                visibleItems[index] ? 'animate-fade-in-up' : 'opacity-0 translate-y-8'
              }`}
              style={{ animationDelay: `${index * 150}ms` }}
            >
              {/* Category Header */}
              <div className={`${getColorForCategory(category.color)} p-8 text-white text-center`}>
                <div className="flex items-center justify-center w-16 h-16 bg-white rounded-lg mb-4 mx-auto">
                  <div className="text-gray-700">{getIconForCategory(category.icon)}</div>
                </div>
                <h3 className="text-xl font-bold mb-3">{category.title}</h3>
                <p className="text-sm opacity-90 leading-relaxed">{category.description}</p>
              </div>

              {/* Category Content */}
              <div className="p-6">
                {/* Features List */}
                <ul className="space-y-3 mb-6">
                  {category.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center text-sm text-gray-700">
                      <svg
                        className="w-4 h-4 text-green-500 mr-3 flex-shrink-0"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      {feature.text}
                    </li>
                  ))}
                </ul>

                {/* Learn More Button */}
                {category.ctaButton && (
                  <button className="w-full bg-gray-800 hover:bg-gray-900 text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200">
                    {category.ctaButton.label}
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
