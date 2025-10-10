'use client';

import React from 'react';

interface PillarItem {
  icon: string;
  title: string;
  description: string;
}

interface Pillars {
  title: string;
  subtitle?: string;
  pillars: PillarItem[];
}

interface PartnershipPillarsProps {
  pillars: Pillars;
}

export default function PartnershipPillars({ pillars }: PartnershipPillarsProps) {
  const { title, subtitle, pillars: pillarItems } = pillars;

  // Handle missing pillar items
  if (!pillarItems || !Array.isArray(pillarItems) || pillarItems.length === 0) {
    return null;
  }

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {title}
          </h2>
          {subtitle && (
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              {subtitle}
            </p>
          )}
        </div>

        {/* Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {pillarItems.map((pillar, index) => (
            <div
              key={index}
              className="group text-center p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-2"
            >
              {/* Icon */}
              <div className="text-5xl mb-6 group-hover:scale-110 transition-transform duration-300">
                {pillar.icon}
              </div>

              {/* Title */}
              <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-orange-600 transition-colors">
                {pillar.title}
              </h3>

              {/* Description */}
              <p className="text-gray-600 leading-relaxed">
                {pillar.description}
              </p>

              {/* Decorative Element */}
              <div className="mt-6 w-12 h-1 bg-gradient-to-r from-orange-500 to-blue-500 mx-auto rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
