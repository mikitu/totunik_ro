'use client';

import React from 'react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

const categories = [
  {
    title: 'Interior Paints',
    description: 'Premium interior paints for residential and commercial spaces',
    gradient: 'from-blue-500 to-blue-700',
    features: ['Low VOC formulations', 'Excellent coverage', 'Easy application', 'Durable finish'],
    icon: (
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
    ),
  },
  {
    title: 'Exterior Paints',
    description: 'Weather-resistant exterior coatings for lasting protection',
    gradient: 'from-green-500 to-green-700',
    features: ['Weather resistance', 'UV protection', 'Color retention', 'Anti-fungal properties'],
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
        />
      </svg>
    ),
  },
  {
    title: 'Protective Coatings',
    description: 'Industrial-grade coatings for demanding environments',
    gradient: 'from-orange-500 to-orange-700',
    features: [
      'Corrosion protection',
      'Chemical resistance',
      'High durability',
      'Industrial standards',
    ],
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
        />
      </svg>
    ),
  },
  {
    title: 'Wood & Metal Finishes',
    description: 'Specialized finishes for wood and metal surfaces',
    gradient: 'from-purple-500 to-purple-700',
    features: [
      'Surface protection',
      'Enhanced appearance',
      'Long-lasting finish',
      'Easy maintenance',
    ],
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
        />
      </svg>
    ),
  },
];

export default function JotunProductCategoriesStatic() {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section id="product-categories" ref={ref} className="py-20 bg-white">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div
          className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'animate-fadeInUp' : 'opacity-0 translate-y-8'}`}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Product Categories</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Explore our comprehensive range of Jotun products designed for every application and
            environment
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {categories.map((category, index) => (
            <div
              key={index}
              className={`group bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:scale-105 overflow-hidden ${
                isVisible ? 'animate-fadeInUp' : 'opacity-0 translate-y-8'
              }`}
              style={{ animationDelay: `${index * 150}ms` }}
            >
              {/* Category Header */}
              <div className={`bg-gradient-to-r ${category.gradient} p-6 text-white`}>
                <div className="flex items-center justify-center w-16 h-16 bg-white/20 rounded-lg mb-4 mx-auto">
                  {category.icon}
                </div>
                <h3 className="text-xl font-semibold text-center mb-2">{category.title}</h3>
                <p className="text-sm text-center opacity-90">{category.description}</p>
              </div>

              {/* Category Content */}
              <div className="p-6">
                <ul className="space-y-3 mb-6">
                  {category.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center text-gray-700">
                      <svg
                        className="w-5 h-5 text-green-500 mr-3 flex-shrink-0"
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
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>

                <button className="w-full bg-gray-900 hover:bg-gray-800 text-white py-3 px-4 rounded-lg font-medium transition-colors duration-300 group-hover:bg-blue-600">
                  Learn More
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
