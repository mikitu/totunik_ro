'use client';

import { Icon, type IconName } from '@/components/icons/Icon';
import { StrapiButton } from '@/components/ui/Button';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { StrapiJotunCTA } from '@/lib/strapi';

interface JotunCTAProps {
  cta: StrapiJotunCTA;
}

// Map Strapi download icons to our Icon component names
const mapDownloadIcon = (strapiIcon?: string): IconName => {
  const iconMap: Record<string, IconName> = {
    download: 'download',
    document: 'file',
    pdf: 'file',
    image: 'image',
    chart: 'image',
    catalog: 'folder',
    datasheet: 'file',
    guide: 'file',
  };
  return iconMap[strapiIcon || 'download'] || 'download';
};

export default function JotunCTA({ cta }: JotunCTAProps) {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section
      ref={ref}
      className="relative py-20 bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 overflow-hidden"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 right-20 w-64 h-64 bg-white rounded-full blur-3xl animate-pulse" />
        <div
          className="absolute bottom-20 left-20 w-96 h-96 bg-orange-500 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: '1s' }}
        />
        <div
          className="absolute top-1/2 right-1/4 w-32 h-32 bg-white rounded-lg rotate-45 blur-2xl animate-pulse"
          style={{ animationDelay: '2s' }}
        />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Main CTA Content */}
          <div className="text-center mb-16">
            <h2
              className={`text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight transition-all duration-1000 ${isVisible ? 'animate-fadeInUp' : 'opacity-0 translate-y-8'}`}
            >
              {cta.headline}
            </h2>
            <p
              className={`text-xl md:text-2xl text-blue-100 mb-12 max-w-3xl mx-auto transition-all duration-1000 ${isVisible ? 'animate-fadeInUp' : 'opacity-0 translate-y-8'}`}
              style={{ animationDelay: '200ms' }}
            >
              {cta.subtitle}
            </p>

            {/* CTA Buttons */}
            <div
              className={`flex flex-col sm:flex-row gap-6 justify-center mb-16 transition-all duration-1000 ${isVisible ? 'animate-fadeInUp' : 'opacity-0 translate-y-8'}`}
              style={{ animationDelay: '400ms' }}
            >
              <StrapiButton button={cta.primaryButton} />
              {cta.secondaryButton && <StrapiButton button={cta.secondaryButton} />}
            </div>
          </div>

          {/* Benefits and Downloads Grid */}
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Benefits */}
            {cta.benefitsSection && (
              <div
                className={`transition-all duration-1000 ${isVisible ? 'animate-fadeInLeft' : 'opacity-0 -translate-x-8'}`}
                style={{ animationDelay: '600ms' }}
              >
                <h3 className="text-2xl font-semibold text-white mb-6">
                  {cta.benefitsSection.title || 'Why Choose Our Partnership?'}
                </h3>
                {cta.benefitsSection.description && (
                  <p className="text-blue-100 mb-6">{cta.benefitsSection.description}</p>
                )}
                <ul className="space-y-4">
                  {cta.benefitsSection.benefits.map((benefit, index) => (
                    <li key={benefit.id || index} className="flex items-center text-blue-100">
                      <Icon name="check" className="w-6 h-6 text-orange-400 mr-4 flex-shrink-0" />
                      <div>
                        <span className="text-lg font-medium text-white">{benefit.title}</span>
                        {benefit.description && (
                          <p className="text-blue-200 text-sm mt-1">{benefit.description}</p>
                        )}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Downloads */}
            {cta.downloadSection && (
              <div
                className={`transition-all duration-1000 ${isVisible ? 'animate-fadeInRight' : 'opacity-0 translate-x-8'}`}
                style={{ animationDelay: '800ms' }}
              >
                <h3 className="text-2xl font-semibold text-white mb-6">
                  {cta.downloadSection.title}
                </h3>
                {cta.downloadSection.description && (
                  <p className="text-blue-100 mb-6">{cta.downloadSection.description}</p>
                )}
                <div className="space-y-4">
                  {cta.downloadSection.downloads.map((download, index) => {
                    const downloadUrl = download.file?.url || download.url;
                    const isClickable = !!downloadUrl;

                    return (
                      <div
                        key={download.id || index}
                        className={`bg-white/10 backdrop-blur-sm rounded-lg p-4 hover:bg-white/20 transition-all duration-300 group ${
                          isClickable ? 'cursor-pointer' : ''
                        }`}
                        onClick={isClickable ? () => window.open(downloadUrl, '_blank') : undefined}
                      >
                        <div className="flex items-center">
                          <div className="text-orange-400 mr-4">
                            <Icon name={mapDownloadIcon(download.icon)} className="w-6 h-6" />
                          </div>
                          <div className="flex-1">
                            <h4 className="text-white font-medium group-hover:text-orange-300 transition-colors duration-300">
                              {download.label}
                            </h4>
                            {download.description && (
                              <p className="text-blue-200 text-sm">{download.description}</p>
                            )}
                            {download.fileSize && (
                              <span className="text-blue-300 text-xs">{download.fileSize}</span>
                            )}
                          </div>
                          {isClickable && (
                            <Icon
                              name="download"
                              className="w-5 h-5 text-blue-300 group-hover:text-white transition-colors duration-300"
                            />
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
