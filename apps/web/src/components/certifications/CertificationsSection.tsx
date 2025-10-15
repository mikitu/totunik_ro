'use client';

import { Icon } from '@/components/icons/Icon';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { StrapiCertificationsSection } from '@/lib/strapi';

interface CertificationsSectionProps {
  certificationsSection: StrapiCertificationsSection | null;
}

// Map certification icons to our Icon component names
const mapCertificationIcon = (icon: string) => {
  const iconMap: Record<string, string> = {
    'check-circle': 'check',
    'shield-check': 'shield',
    leaf: 'leaf',
    'hard-hat': 'shield',
    award: 'star',
    certificate: 'file',
    star: 'star',
    badge: 'star',
  };
  return iconMap[icon] || 'check';
};

// Map icon colors to Tailwind classes
const getIconColorClass = (color: string) => {
  const colorMap: Record<string, string> = {
    green: 'text-green-500',
    blue: 'text-blue-500',
    orange: 'text-orange-500',
    purple: 'text-purple-500',
    red: 'text-red-500',
    yellow: 'text-yellow-500',
  };
  return colorMap[color] || 'text-green-500';
};

export default function CertificationsSection({
  certificationsSection,
}: CertificationsSectionProps) {
  const { ref, isVisible } = useScrollAnimation();

  // Return null if no data
  if (!certificationsSection) {
    return null;
  }

  return (
    <section ref={ref} className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Title */}
        <div
          className={`text-center mb-16 transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="w-16 h-1 bg-orange-500 mx-auto mb-6" />
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {certificationsSection.title}
          </h2>
        </div>

        {/* Certifications Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {certificationsSection.certifications.map((certification, index) => (
            <div
              key={certification.id}
              className={`bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-500 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: `${index * 200}ms` }}
            >
              {/* Icon */}
              <div className={`mb-6 ${getIconColorClass(certification.iconColor)}`}>
                <Icon
                  name={mapCertificationIcon(certification.icon) as any}
                  className="w-12 h-12"
                />
              </div>

              {/* Content */}
              <h3 className="text-xl font-bold text-gray-900 mb-2">{certification.title}</h3>
              <h4 className="text-lg font-semibold text-orange-600 mb-4">
                {certification.subtitle}
              </h4>
              <p className="text-gray-600 leading-relaxed">{certification.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
