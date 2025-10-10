'use client';

import React from 'react';
import Image from 'next/image';
import { useScrollAnimation, useStaggeredScrollAnimation } from '@/hooks/useScrollAnimation';

interface PartnerLogo {
  name: string;
  logo: {
    url: string;
    alternativeText?: string;
  };
  website?: string;
  description?: string;
  category: 'residential' | 'industrial' | 'medical' | 'retail' | 'multiple';
}

interface Showcase {
  title?: string;
  subtitle?: string;
  displayType: 'carousel' | 'grid' | 'grouped';
  allPartners: PartnerLogo[];
}

interface PartnerShowcaseProps {
  showcase: Showcase;
}

export default function PartnerShowcase({ showcase }: PartnerShowcaseProps) {
  const { title, subtitle, displayType, allPartners } = showcase;

  // Handle missing partner data
  if (!allPartners || !Array.isArray(allPartners) || allPartners.length === 0) {
    return null;
  }

  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation<HTMLDivElement>();
  const { ref: gridRef, visibleItems } = useStaggeredScrollAnimation<HTMLDivElement>(allPartners.length, { staggerDelay: 50 });

  const renderPartnerLogo = (partner: PartnerLogo, index: number) => (
    <div
      key={index}
      className={`group bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1 ${
        visibleItems[index] ? 'animate-fade-in-up' : 'opacity-0 translate-y-8'
      }`}
    >
      <div className="relative h-20 mb-4">
        <Image
          src={`${process.env.NEXT_PUBLIC_STRAPI_API_URL}${partner.logo.url}`}
          alt={partner.logo.alternativeText || partner.name}
          fill
          className="object-contain filter grayscale group-hover:grayscale-0 transition-all duration-300"
        />
      </div>
      
      <h4 className="text-sm font-semibold text-gray-900 text-center mb-2">
        {partner.name}
      </h4>
      
      {partner.description && (
        <p className="text-xs text-gray-600 text-center line-clamp-2">
          {partner.description}
        </p>
      )}
      
      {/* Category Badge */}
      <div className="mt-3 flex justify-center">
        <span className={`px-2 py-1 text-xs rounded-full ${getCategoryColor(partner.category)}`}>
          {getCategoryLabel(partner.category)}
        </span>
      </div>
    </div>
  );

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'residential': return 'bg-green-100 text-green-800';
      case 'industrial': return 'bg-blue-100 text-blue-800';
      case 'medical': return 'bg-red-100 text-red-800';
      case 'retail': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getCategoryLabel = (category: string) => {
    switch (category) {
      case 'residential': return 'Residential';
      case 'industrial': return 'Industrial';
      case 'medical': return 'Medical';
      case 'retail': return 'Retail';
      default: return 'Multiple';
    }
  };

  const renderGrid = () => (
    <div ref={gridRef} className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
      {allPartners.map((partner, index) => renderPartnerLogo(partner, index))}
    </div>
  );

  const renderGrouped = () => {
    const categories = ['residential', 'industrial', 'medical', 'retail'] as const;
    
    return (
      <div className="space-y-12">
        {categories.map(category => {
          const categoryPartners = allPartners.filter(p => p.category === category);
          if (categoryPartners.length === 0) return null;
          
          return (
            <div key={category}>
              <h3 className="text-xl font-bold text-gray-900 mb-6 text-center">
                {getCategoryLabel(category)} Partners
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {categoryPartners.map((partner, index) => renderPartnerLogo(partner, index))}
              </div>
            </div>
          );
        })}
        
        {/* Multiple category partners */}
        {allPartners.filter(p => p.category === 'multiple').length > 0 && (
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-6 text-center">
              Multi-Sector Partners
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {allPartners
                .filter(p => p.category === 'multiple')
                .map((partner, index) => renderPartnerLogo(partner, index))}
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <section className="py-20 bg-white">
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

        {/* Partners Display */}
        <div className="max-w-7xl mx-auto">
          {displayType === 'grouped' ? renderGrouped() : renderGrid()}
        </div>

        {/* Trust Message */}
        <div className="text-center mt-12">
          <p className="text-gray-600 italic">
            Trusted names across industries — proof that we carefully select and nurture partnerships that benefit our clients.
          </p>
        </div>
      </div>
    </section>
  );
}
