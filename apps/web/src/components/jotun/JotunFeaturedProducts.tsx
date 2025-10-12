'use client';

import React from 'react';
import { useScrollAnimation, useStaggeredScrollAnimation } from '@/hooks/useScrollAnimation';
import { StrapiJotunFeaturedProducts } from '@/lib/strapi';

interface JotunFeaturedProductsProps {
  featuredProducts?: StrapiJotunFeaturedProducts;
}

export default function JotunFeaturedProducts({ featuredProducts }: JotunFeaturedProductsProps) {
  // Fallback static data if no Strapi data is provided
  const staticProducts = [
    {
      id: 1,
      name: 'Majestic Design',
      category: 'Interior Paint',
      description: 'Premium interior emulsion with exceptional coverage and elegant matt finish.',
      features: [
        'Long-lasting color retention',
        'Easy application and cleaning',
        'Low odor formulation',
        'Excellent hiding power'
      ],
      image: '/api/placeholder/400/300',
      badge: 'Best Seller'
    },
    {
      id: 2,
      name: 'Jotashield Ultra Clean',
      category: 'Exterior Paint',
      description: 'Advanced exterior paint with self-cleaning technology and superior weather protection.',
      features: [
        'UV and weather resistance',
        'Self-cleaning technology',
        'Fade resistance',
        'Crack bridging properties'
      ],
      image: '/api/placeholder/400/300',
      badge: 'Premium'
    },
    {
      id: 3,
      name: 'Penguard Topcoat',
      category: 'Protective Coating',
      description: 'High-performance protective coating for industrial and marine applications.',
      features: [
        'Corrosion protection',
        'Chemical resistance',
        'High durability',
        'Marine grade quality'
      ],
      image: '/api/placeholder/400/300',
      badge: 'Industrial'
    },
    {
      id: 4,
      name: 'Hardtop AX',
      category: 'Metal Finish',
      description: 'Advanced acrylic finish for metal surfaces with excellent adhesion and durability.',
      features: [
        'Superior adhesion',
        'Fast drying',
        'Smooth finish',
        'Corrosion resistance'
      ],
      image: '/api/placeholder/400/300',
      badge: 'Eco-Friendly'
    }
  ];

  const products = featuredProducts?.products || staticProducts;
  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation<HTMLDivElement>();
  const { ref: gridRef, visibleItems } = useStaggeredScrollAnimation<HTMLDivElement>(products.length, { staggerDelay: 200 });

  const getBadgeColor = (badge: string) => {
    switch (badge) {
      case 'Best Seller':
        return 'bg-orange-500';
      case 'Premium':
        return 'bg-blue-500';
      case 'Industrial':
        return 'bg-gray-700';
      case 'Eco-Friendly':
        return 'bg-green-500';
      default:
        return 'bg-gray-500';
    }
  };

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div
          ref={headerRef}
          className={`text-center mb-16 transition-all duration-800 ${
            headerVisible ? 'animate-fade-in-up' : 'opacity-0 translate-y-8'
          }`}
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Featured Products
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover our flagship Jotun products, each engineered for specific applications and proven performance
          </p>
        </div>

        {/* Products Grid */}
        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product, index) => (
            <div
              key={product.id}
              className={`group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden ${
                visibleItems[index] ? 'animate-fade-in-up' : 'opacity-0 translate-y-8'
              }`}
            >
              {/* Product Image */}
              <div className="relative h-48 bg-gradient-to-br from-gray-100 to-gray-200 overflow-hidden">
                {/* Placeholder for product image */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-24 h-24 bg-blue-600 rounded-full flex items-center justify-center">
                    <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM21 5a2 2 0 00-2-2h-4a2 2 0 00-2 2v12a4 4 0 004 4 4 4 0 004-4V5z" />
                    </svg>
                  </div>
                </div>
                
                {/* Badge */}
                <div className={`absolute top-4 left-4 ${getBadgeColor(product.badge)} text-white text-xs font-semibold px-3 py-1 rounded-full`}>
                  {product.badge}
                </div>
              </div>

              {/* Product Content */}
              <div className="p-6">
                {/* Category */}
                <div className="text-sm text-blue-600 font-medium mb-2">
                  {product.category}
                </div>

                {/* Product Name */}
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors duration-200">
                  {product.name}
                </h3>

                {/* Description */}
                <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                  {product.description}
                </p>

                {/* Features */}
                <ul className="space-y-1 mb-6">
                  {product.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center text-xs text-gray-700">
                      <svg className="w-3 h-3 text-green-500 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>

                {/* Action Buttons */}
                <div className="flex space-x-2">
                  <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium py-2 px-3 rounded-lg transition-colors duration-200">
                    Learn More
                  </button>
                  <button className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-800 text-sm font-medium py-2 px-3 rounded-lg transition-colors duration-200">
                    Datasheet
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All Products Button */}
        <div className="text-center mt-12">
          <button className="inline-flex items-center px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
            <span className="mr-2">View All Products</span>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}
