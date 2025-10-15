'use client';

import { Icon } from '@/components/icons/Icon';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { StrapiGuaranteesSection } from '@/lib/strapi';

interface GuaranteesSectionProps {
  guaranteesSection: StrapiGuaranteesSection | null;
}

export default function GuaranteesSection({ guaranteesSection }: GuaranteesSectionProps) {
  const { ref, isVisible } = useScrollAnimation();

  // Return null if no data
  if (!guaranteesSection) {
    return null;
  }

  return (
    <section ref={ref} className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Title */}
        <div
          className={`text-center mb-16 transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="w-16 h-1 bg-orange-500 mx-auto mb-6" />
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {guaranteesSection.title}
          </h2>
        </div>

        {/* Guarantee Content */}
        <div className="max-w-4xl mx-auto">
          <div
            className={`bg-gray-50 rounded-2xl p-8 md:p-12 transition-all duration-1000 delay-300 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            {/* Guarantee Title */}
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
              {guaranteesSection.guaranteeTitle}
            </h3>

            {/* Guarantee Description */}
            <p className="text-lg text-gray-700 mb-8 leading-relaxed">
              {guaranteesSection.guaranteeDescription}
            </p>

            {/* Guarantee Features */}
            <div className="space-y-4 mb-8">
              {guaranteesSection.guaranteeFeatures.map((feature, index) => (
                <div
                  key={feature.id}
                  className={`flex items-center transition-all duration-500 ${
                    isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'
                  }`}
                  style={{ transitionDelay: `${600 + index * 150}ms` }}
                >
                  <div className="text-orange-500 mr-4">
                    <Icon name="check" className="w-6 h-6" />
                  </div>
                  <span className="text-lg text-gray-700">{feature.text}</span>
                </div>
              ))}
            </div>

            {/* Additional Info */}
            {guaranteesSection.additionalInfo && (
              <div
                className={`border-t border-gray-200 pt-6 transition-all duration-1000 delay-700 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                }`}
              >
                <p className="text-gray-600 leading-relaxed">{guaranteesSection.additionalInfo}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
