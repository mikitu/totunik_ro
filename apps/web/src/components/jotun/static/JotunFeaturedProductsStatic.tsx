'use client';

import React from 'react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

const products = [
  {
    name: 'Majestic Design',
    category: 'Interior Paint',
    badge: 'Best Seller',
    badgeColor: 'bg-blue-500',
    features: ['Premium finish', 'Easy application', 'Low odor', 'Washable surface'],
    image: '/api/placeholder/300/200',
  },
  {
    name: 'Jotashield Ultra Clean',
    category: 'Exterior Paint',
    badge: 'Premium',
    badgeColor: 'bg-green-500',
    features: ['Self-cleaning technology', 'Weather resistant', 'Color retention', 'Anti-fungal'],
    image: '/api/placeholder/300/200',
  },
  {
    name: 'Penguard Topcoat',
    category: 'Protective Coating',
    badge: 'Industrial',
    badgeColor: 'bg-orange-500',
    features: ['Corrosion protection', 'Chemical resistant', 'High durability', 'Marine grade'],
    image: '/api/placeholder/300/200',
  },
  {
    name: 'Hardtop AX',
    category: 'Metal Finish',
    badge: 'Eco-Friendly',
    badgeColor: 'bg-purple-500',
    features: ['Low VOC', 'Fast drying', 'Excellent adhesion', 'Smooth finish'],
    image: '/api/placeholder/300/200',
  },
];

export default function JotunFeaturedProductsStatic() {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section ref={ref} className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div
          className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'animate-fadeInUp' : 'opacity-0 translate-y-8'}`}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Featured Products</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover our flagship Jotun products that deliver exceptional performance and quality
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {products.map((product, index) => (
            <div
              key={index}
              className={`bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:scale-105 overflow-hidden group ${
                isVisible ? 'animate-fadeInUp' : 'opacity-0 translate-y-8'
              }`}
              style={{ animationDelay: `${index * 200}ms` }}
            >
              {/* Product Image */}
              <div className="relative h-48 bg-gradient-to-br from-gray-100 to-gray-200 overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-24 h-24 bg-gray-300 rounded-lg flex items-center justify-center">
                    <svg
                      className="w-12 h-12 text-gray-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                      />
                    </svg>
                  </div>
                </div>

                {/* Badge */}
                <div
                  className={`absolute top-4 left-4 ${product.badgeColor} text-white px-3 py-1 rounded-full text-sm font-medium`}
                >
                  {product.badge}
                </div>
              </div>

              {/* Product Content */}
              <div className="p-6">
                <div className="mb-4">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{product.name}</h3>
                  <p className="text-sm text-gray-500 uppercase tracking-wide">
                    {product.category}
                  </p>
                </div>

                {/* Features */}
                <ul className="space-y-2 mb-6">
                  {product.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center text-gray-700">
                      <svg
                        className="w-4 h-4 text-green-500 mr-2 flex-shrink-0"
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

                {/* Action Buttons */}
                <div className="space-y-3">
                  <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg font-medium transition-colors duration-300">
                    Learn More
                  </button>
                  <button className="w-full border border-gray-300 hover:border-gray-400 text-gray-700 hover:text-gray-900 py-2 px-4 rounded-lg font-medium transition-colors duration-300">
                    Download Datasheet
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div
          className={`text-center transition-all duration-1000 ${isVisible ? 'animate-fadeInUp' : 'opacity-0 translate-y-8'}`}
          style={{ animationDelay: '800ms' }}
        >
          <button className="inline-flex items-center px-8 py-4 bg-gray-900 hover:bg-gray-800 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
            <span className="mr-2">View All Products</span>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}
