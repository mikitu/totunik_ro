'use client';

import { useScrollAnimation, useStaggeredScrollAnimation } from '@/hooks/useScrollAnimation';
import { StrapiProcessCta } from '@/lib/strapi';

interface ProcessStep {
  step: number;
  title: string;
  description: string;
}

interface ServiceProcessProps {
  process: ProcessStep[];
  processCta?: StrapiProcessCta;
}

export default function ServiceProcess({ process, processCta }: ServiceProcessProps) {
  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation<HTMLDivElement>();
  const { ref: stepsRef, visibleItems } = useStaggeredScrollAnimation<HTMLDivElement>(
    process.length,
    { staggerDelay: 200 }
  );

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div
          ref={headerRef}
          className={`text-center mb-16 transition-all duration-1000 ${
            headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Our Process
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            We follow a proven methodology to ensure exceptional results for every project
          </p>
        </div>

        {/* Process Steps */}
        <div ref={stepsRef} className="relative">
          {/* Connection Line */}
          <div className="hidden lg:block absolute left-1/2 transform -translate-x-1/2 w-1 bg-gradient-to-b from-orange-500 to-red-600 h-full top-0" />

          <div className="space-y-12 lg:space-y-16">
            {process.map((step, index) => (
              <div
                key={step.step}
                className={`relative transition-all duration-1000 ${
                  visibleItems[index] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
              >
                <div
                  className={`flex flex-col lg:flex-row items-center ${
                    index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
                  }`}
                >
                  {/* Step Content */}
                  <div className={`w-full lg:w-5/12 ${index % 2 === 0 ? 'lg:pr-12' : 'lg:pl-12'}`}>
                    <div className="bg-gray-50 rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
                      <div className="flex items-center mb-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-600 rounded-full flex items-center justify-center text-white font-bold text-lg mr-4">
                          {step.step}
                        </div>
                        <h3 className="text-xl md:text-2xl font-bold text-gray-900">
                          {step.title}
                        </h3>
                      </div>
                      <p className="text-gray-600 leading-relaxed">{step.description}</p>
                    </div>
                  </div>

                  {/* Step Number Circle (Desktop) */}
                  <div className="hidden lg:flex w-2/12 justify-center">
                    <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-600 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg z-10">
                      {step.step}
                    </div>
                  </div>

                  {/* Spacer */}
                  <div className="w-full lg:w-5/12" />
                </div>

                {/* Mobile Step Connector */}
                {index < process.length - 1 && (
                  <div className="lg:hidden flex justify-center my-8">
                    <div className="w-1 h-12 bg-gradient-to-b from-orange-500 to-red-600 rounded-full" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        {processCta && (
          <div
            className={`text-center mt-16 transition-all duration-1000 delay-500 ${
              headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <div className="bg-gradient-to-r from-orange-500 to-red-600 rounded-2xl p-8 text-white">
              <h3 className="text-2xl md:text-3xl font-bold mb-4">{processCta.title}</h3>
              <p className="text-xl text-orange-100 mb-6 max-w-2xl mx-auto">
                {processCta.description}
              </p>
              <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4">
                {processCta.primaryButton && (
                  <a
                    href={processCta.primaryButton.url}
                    className="inline-flex items-center justify-center bg-white text-orange-600 font-bold py-3 px-8 rounded-lg hover:bg-gray-100 transition-colors duration-200"
                  >
                    {processCta.primaryButton.label}
                    <svg
                      className="w-5 h-5 ml-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </a>
                )}
                {processCta.secondaryButton && (
                  <a
                    href={processCta.secondaryButton.url}
                    className="inline-flex items-center justify-center border-2 border-white text-white font-bold py-3 px-8 rounded-lg hover:bg-white hover:text-orange-600 transition-colors duration-200"
                  >
                    {processCta.secondaryButton.label}
                    <svg
                      className="w-5 h-5 ml-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                      />
                    </svg>
                  </a>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
