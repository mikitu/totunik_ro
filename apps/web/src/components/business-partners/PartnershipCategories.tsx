'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useScrollAnimation, useStaggeredScrollAnimation } from '@/hooks/useScrollAnimation';

interface CategoryCard {
  icon: string;
  title: string;
  description: string;
  link?: {
    href: string;
    text: string;
    external?: boolean;
  };
  image?: {
    url: string;
    alternativeText?: string;
  };
}

interface Categories {
  title?: string;
  subtitle?: string;
  residentialCard: CategoryCard;
  industrialCard: CategoryCard;
  medicalCard: CategoryCard;
  retailCard: CategoryCard;
}

interface PartnershipCategoriesProps {
  categories: Categories;
}

export default function PartnershipCategories({ categories }: PartnershipCategoriesProps) {
  const { title, subtitle, residentialCard, industrialCard, medicalCard, retailCard } = categories;

  const cards = [
    { ...residentialCard, id: 'residential' },
    { ...industrialCard, id: 'industrial' },
    { ...medicalCard, id: 'medical' },
    { ...retailCard, id: 'retail' }
  ];

  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation<HTMLDivElement>();
  const { ref: gridRef, visibleItems } = useStaggeredScrollAnimation<HTMLDivElement>(cards.length, { staggerDelay: 150 });

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

        {/* Categories Grid */}
        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {cards.map((card, index) => {
            const CardWrapper = ({ children }: { children: React.ReactNode }) => {
              if (card.link && card.link.href) {
                return (
                  <Link
                    href={card.link.href}
                    className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-orange-200 block cursor-pointer"
                  >
                    {children}
                  </Link>
                );
              }
              return (
                <div className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-orange-200">
                  {children}
                </div>
              );
            };

            return (
              <div
                key={card.id}
                className={`transition-all duration-800 ${
                  visibleItems[index] ? 'animate-fade-in-up' : 'opacity-0 translate-y-8'
                }`}
              >
                <CardWrapper>
                  <div className="flex h-full">
                  {/* Left Side - Image */}
                  {card.image && (
                    <div className="w-1/3 relative">
                      <Image
                        src={`${process.env.NEXT_PUBLIC_STRAPI_API_URL}${card.image.url}`}
                        alt={card.image.alternativeText || card.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}

                  {/* Right Side - Content */}
                  <div className={`${card.image ? 'w-2/3' : 'w-full'} p-6 flex flex-col justify-between`}>
                    <div>
                      {/* Icon */}
                      <div className="text-3xl mb-3">
                        {card.icon}
                      </div>

                      {/* Title */}
                      <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-orange-600 transition-colors">
                        {card.title}
                      </h3>

                      {/* Description */}
                      <p className="text-gray-600 mb-4 leading-relaxed text-sm">
                        {card.description}
                      </p>
                    </div>

                    {/* Link Text (if exists) */}
                    {card.link && card.link.text && (
                      <div className="inline-flex items-center text-orange-600 font-semibold group-hover:text-orange-700 transition-colors self-start">
                        {card.link.text}
                        <svg
                          className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </div>
                    )}
                  </div>
                </div>

                {/* Hover Effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
              </CardWrapper>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
