'use client';

import React from 'react';
import Image from 'next/image';
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
      badge: 'Eco-Friendly'
    }
  ];

  // Use Strapi data when available, fallback to static data
  const products = featuredProducts?.products || staticProducts;
  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation<HTMLDivElement>();
  const { ref: gridRef, visibleItems } = useStaggeredScrollAnimation<HTMLDivElement>(products.length, { staggerDelay: 200 });

  // Function to get button styling based on variant and color
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const getButtonStyles = (button: any) => {
    const variant = button?.variant || 'primary';
    const color = button?.color || 'blue';

    const styles = {
      primary: {
        blue: 'bg-blue-600 hover:bg-blue-700 text-white border-blue-600',
        black: 'bg-black hover:bg-gray-900 text-white border-black',
        gray: 'bg-gray-600 hover:bg-gray-700 text-white border-gray-600',
        white: 'bg-white hover:bg-gray-50 text-gray-900 border-white shadow-md',
      },
      secondary: {
        blue: 'bg-transparent hover:bg-blue-50 text-blue-600 border-blue-600 border-2',
        black: 'bg-transparent hover:bg-gray-50 text-black border-black border-2',
        gray: 'bg-transparent hover:bg-gray-50 text-gray-600 border-gray-600 border-2',
        white: 'bg-transparent hover:bg-white text-white border-white border-2',
      },
      outline: {
        blue: 'bg-white hover:bg-blue-600 text-blue-600 hover:text-white border-blue-600 border-2',
        black: 'bg-white hover:bg-black text-black hover:text-white border-black border-2',
        gray: 'bg-white hover:bg-gray-600 text-gray-600 hover:text-white border-gray-600 border-2',
        white: 'bg-transparent hover:bg-white text-white hover:text-gray-900 border-white border-2',
      }
    };

    return styles[variant]?.[color] || styles.primary.blue;
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const getBadgeColor = (product: any) => {
    // Use badgeColor from Strapi if available, otherwise fall back to badge-based colors
    if (product.badgeColor) {
      switch (product.badgeColor) {
        case 'orange': return 'bg-orange-500';
        case 'blue': return 'bg-blue-500';
        case 'gray': return 'bg-gray-700';
        case 'green': return 'bg-green-500';
        case 'red': return 'bg-red-500';
        case 'purple': return 'bg-purple-500';
        case 'teal': return 'bg-teal-500';
        case 'indigo': return 'bg-indigo-500';
        default: return 'bg-gray-500';
      }
    }

    // Fallback to badge-based colors for static data
    switch (product.badge) {
      case 'Best Seller': return 'bg-orange-500';
      case 'Premium': return 'bg-blue-500';
      case 'Industrial': return 'bg-gray-700';
      case 'Eco-Friendly': return 'bg-green-500';
      default: return 'bg-gray-500';
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
              className={`group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100 hover:border-blue-200 ${
                visibleItems[index] ? 'animate-fade-in-up' : 'opacity-0 translate-y-8'
              }`}
              style={{ animationDelay: `${index * 200}ms` }}
            >
              {/* Product Image */}
              <div className="relative h-48 bg-gradient-to-br from-gray-100 to-gray-200 overflow-hidden">
                {product.image?.url ? (
                  <Image
                    src={`http://localhost:1337${product.image.url}`}
                    alt={product.name}
                    fill
                    className="object-cover"
                    onError={(e) => {
                      // Hide broken image and show placeholder instead
                      e.currentTarget.style.display = 'none';
                      const placeholder = e.currentTarget.parentElement?.querySelector('.image-placeholder');
                      if (placeholder) {
                        (placeholder as HTMLElement).style.display = 'flex';
                      }
                    }}
                  />
                ) : null}

                {/* Placeholder for product image */}
                <div className={`image-placeholder absolute inset-0 flex items-center justify-center ${
                  product.image?.url ? 'hidden' : 'flex'
                }`}>
                  <div className="w-24 h-24 bg-blue-600 rounded-full flex items-center justify-center">
                    <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM21 5a2 2 0 00-2-2h-4a2 2 0 00-2 2v12a4 4 0 004 4 4 4 0 004-4V5z" />
                    </svg>
                  </div>
                </div>

                {/* Badge */}
                {product.badge && (
                  <div className={`absolute top-4 left-4 ${getBadgeColor(product)} text-white text-xs font-semibold px-3 py-1 rounded-full`}>
                    {product.badge}
                  </div>
                )}
              </div>

              {/* Product Content */}
              <div className="p-6">
                {/* Category */}
                <div className="text-sm text-blue-600 font-semibold mb-2 uppercase tracking-wide">
                  {product.category}
                </div>

                {/* Product Name */}
                <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors duration-200">
                  {product.name}
                </h3>

                {/* Description */}
                <p className="text-gray-600 text-sm mb-4 leading-relaxed min-h-[4rem] overflow-hidden">
                  {product.description.length > 120 ? `${product.description.substring(0, 120)}...` : product.description}
                </p>

                {/* Features */}
                <ul className="space-y-1 mb-6">
                  {product.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center text-xs text-gray-700">
                      <svg className="w-3 h-3 text-green-500 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      {typeof feature === 'string' ? feature : feature.text}
                    </li>
                  ))}
                </ul>

                {/* Action Buttons */}
                {(product.learnMoreButton || product.datasheetButton) && (
                  <div className="flex space-x-3 pt-2">
                    {product.learnMoreButton && (
                      <button className={`flex-1 text-sm font-semibold py-2.5 px-4 rounded-lg transition-all duration-200 hover:shadow-lg transform hover:scale-105 ${getButtonStyles(product.learnMoreButton)}`}>
                        {product.learnMoreButton.text || 'Learn More'}
                      </button>
                    )}
                    {product.datasheetButton && (
                      <button className={`flex-1 text-sm font-semibold py-2.5 px-4 rounded-lg transition-all duration-200 hover:shadow-lg transform hover:scale-105 ${getButtonStyles(product.datasheetButton)}`}>
                        {product.datasheetButton.text || 'Datasheet'}
                      </button>
                    )}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* View All Products Button */}
        {featuredProducts?.viewAllButton && (
          <div className="text-center mt-12">
            <button className={`inline-flex items-center px-8 py-3 font-semibold rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 ${getButtonStyles(featuredProducts.viewAllButton)}`}>
              <span className="mr-2">{featuredProducts.viewAllButton.text || 'View All Products'}</span>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
