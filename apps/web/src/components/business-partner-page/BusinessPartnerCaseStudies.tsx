'use client';

import Image from 'next/image';
import Link from 'next/link';
import AnimatedCounter from '@/components/ui/AnimatedCounter';
import { useScrollAnimation, useStaggeredScrollAnimation } from '@/hooks/useScrollAnimation';

interface CaseStudyStat {
  number: string;
  label: string;
  icon?: string;
}

interface CaseStudyItem {
  title: string;
  description: string;
  partnerName?: string;
  image?: {
    url: string;
    alternativeText?: string;
  };
  link?: {
    href: string;
    text: string;
    external?: boolean;
  };
  stats?: CaseStudyStat[];
}

interface BusinessPartnerCaseStudiesProps {
  caseStudies: {
    title: string;
    subtitle?: string;
    caseStudies: CaseStudyItem[];
  };
}

export default function BusinessPartnerCaseStudies({
  caseStudies,
}: BusinessPartnerCaseStudiesProps) {
  const { title, subtitle, caseStudies: studies } = caseStudies;

  // Initialize hooks before any early returns
  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation<HTMLDivElement>();
  const { ref: gridRef, visibleItems } = useStaggeredScrollAnimation<HTMLDivElement>(
    studies?.length || 0,
    { staggerDelay: 200 }
  );

  if (!studies || studies.length === 0) {
    return null;
  }

  return (
    <section className="py-16 lg:py-24 bg-gray-50">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div
          ref={headerRef}
          className={`text-center mb-16 transition-all duration-800 ${
            headerVisible ? 'animate-fade-in-up' : 'opacity-0 translate-y-8'
          }`}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{title}</h2>
          {subtitle && <p className="text-xl text-gray-600 max-w-3xl mx-auto">{subtitle}</p>}
        </div>

        {/* Case Studies Grid */}
        <div ref={gridRef} className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-7xl mx-auto">
          {studies.map((study, index) => (
            <div
              key={index}
              className={`bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group ${
                visibleItems[index] ? 'animate-fade-in-up' : 'opacity-0 translate-y-8'
              }`}
            >
              {/* Image */}
              {study.image && (
                <div className="relative h-64 overflow-hidden">
                  <Image
                    src={`${process.env.NEXT_PUBLIC_STRAPI_API_URL}${study.image.url}`}
                    alt={study.image.alternativeText || study.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 opacity-20 bg-gradient-to-t from-black/50 to-transparent" />
                  <div className="opacity-[1.2]" />
                </div>
              )}

              {/* Content */}
              <div className="p-8">
                {/* Partner Name */}
                {study.partnerName && (
                  <div className="text-sm font-semibold text-orange-600 mb-2">
                    {study.partnerName}
                  </div>
                )}

                {/* Title */}
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{study.title}</h3>

                {/* Description */}
                <p className="text-gray-600 mb-6 leading-relaxed">{study.description}</p>

                {/* Stats */}
                {study.stats && study.stats.length > 0 && (
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    {study.stats.map((stat, statIndex) => (
                      <div key={statIndex} className="text-center p-4 bg-gray-50 rounded-lg">
                        {stat.icon && !/\d/.test(stat.icon) && (
                          <div className="text-2xl mb-2">{stat.icon}</div>
                        )}
                        <div className="text-2xl font-bold text-orange-600">
                          {(() => {
                            // Special case for 24/7 - check this FIRST before any other processing
                            // Trim whitespace and check for 24/7 patterns
                            const trimmedNumber = stat.number?.trim();
                            if (
                              trimmedNumber === '247' ||
                              trimmedNumber === '24/7' ||
                              trimmedNumber === '24-7'
                            ) {
                              return <span className="text-orange-600">24/7</span>;
                            }

                            // If number is null/undefined, check if icon has a number
                            if (!stat.number) {
                              if (stat.icon && /\d/.test(stat.icon)) {
                                const numericValue =
                                  parseInt(stat.icon.replace(/[^0-9]/g, '')) || 0;
                                const suffix = stat.icon.replace(/[0-9]/g, '');
                                return (
                                  <AnimatedCounter
                                    end={numericValue}
                                    suffix={suffix}
                                    duration={2500}
                                  />
                                );
                              }
                              return '';
                            }

                            const hasDigits = /\d/.test(stat.number);

                            if (!hasDigits) {
                              return stat.number;
                            }

                            // Handle decimal numbers like "99.9%" correctly
                            let numericValue, suffix;

                            // Check if it's a decimal number with % (like "99.9%")
                            if (/^\d+\.\d+%$/.test(stat.number.trim())) {
                              // For decimal percentages, display as static text since AnimatedCounter uses Math.floor()
                              return <span className="text-orange-600">{stat.number.trim()}</span>;
                            } else {
                              // Original logic for other numbers
                              numericValue = parseInt(stat.number.replace(/[^0-9]/g, '')) || 0;
                              suffix = stat.number.replace(/[0-9]/g, '');
                            }

                            // If no suffix in number but label contains %, add % to suffix
                            if (!suffix && stat.label && stat.label.includes('%')) {
                              suffix = '%';
                            }

                            return (
                              <AnimatedCounter end={numericValue} suffix={suffix} duration={2500} />
                            );
                          })()}
                        </div>
                        <div className="text-sm text-gray-600">{stat.label}</div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Link */}
                {study.link && study.link.href && (
                  <Link
                    href={study.link.href}
                    className="inline-flex items-center text-orange-600 font-semibold hover:text-orange-700 transition-colors group/link"
                    {...(study.link.external && { target: '_blank', rel: 'noopener noreferrer' })}
                  >
                    {study.link.text}
                    <svg
                      className="w-4 h-4 ml-2 transform group-hover/link:translate-x-1 transition-transform"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 8l4 4m0 0l-4 4m4-4H3"
                      />
                    </svg>
                  </Link>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
