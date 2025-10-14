'use client';

import React from 'react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

const staticBenefits = [
  'Expert consultation and support',
  'Professional application guidance',
  'Quality assurance and warranty',
];

const staticDownloads = [
  {
    title: 'Product Catalog 2024',
    description: 'Complete overview of all Jotun products',
    fileSize: '12.5 MB',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
        />
      </svg>
    ),
  },
  {
    title: 'Technical Data Sheets',
    description: 'Detailed specifications and application guides',
    fileSize: '8.2 MB',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
        />
      </svg>
    ),
  },
  {
    title: 'Color Charts',
    description: 'Complete color selection guide',
    fileSize: '15.8 MB',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h4a2 2 0 002-2V9a2 2 0 00-2-2H7a2 2 0 00-2 2v6a2 2 0 002 2z"
        />
      </svg>
    ),
  },
];

export default function JotunCTA({ cta: _cta }: { cta?: any }) {
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
              Ready to Transform Your Project?
            </h2>
            <p
              className={`text-xl md:text-2xl text-blue-100 mb-12 max-w-3xl mx-auto transition-all duration-1000 ${isVisible ? 'animate-fadeInUp' : 'opacity-0 translate-y-8'}`}
              style={{ animationDelay: '200ms' }}
            >
              Partner with Totunik and Jotun for premium coatings that deliver exceptional results
            </p>

            {/* CTA Buttons */}
            <div
              className={`flex flex-col sm:flex-row gap-6 justify-center mb-16 transition-all duration-1000 ${isVisible ? 'animate-fadeInUp' : 'opacity-0 translate-y-8'}`}
              style={{ animationDelay: '400ms' }}
            >
              <button className="group inline-flex items-center px-8 py-4 bg-orange-500 hover:bg-orange-600 text-white font-semibold text-lg rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
                <span className="mr-2">Request Quote</span>
                <svg
                  className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300"
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
              </button>
              <button className="group inline-flex items-center px-8 py-4 bg-white/10 hover:bg-white/20 text-white font-semibold text-lg rounded-lg border-2 border-white/30 hover:border-white/50 backdrop-blur-sm transition-all duration-300">
                <span className="mr-2">Contact Us</span>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              </button>
            </div>
          </div>

          {/* Benefits and Downloads Grid */}
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Benefits */}
            <div
              className={`transition-all duration-1000 ${isVisible ? 'animate-fadeInLeft' : 'opacity-0 -translate-x-8'}`}
              style={{ animationDelay: '600ms' }}
            >
              <h3 className="text-2xl font-semibold text-white mb-6">
                Why Choose Our Partnership?
              </h3>
              <ul className="space-y-4">
                {staticBenefits.map((benefit, index) => (
                  <li key={index} className="flex items-center text-blue-100">
                    <svg
                      className="w-6 h-6 text-orange-400 mr-4 flex-shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span className="text-lg">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Downloads */}
            <div
              className={`transition-all duration-1000 ${isVisible ? 'animate-fadeInRight' : 'opacity-0 translate-x-8'}`}
              style={{ animationDelay: '800ms' }}
            >
              <h3 className="text-2xl font-semibold text-white mb-6">Technical Documentation</h3>
              <div className="space-y-4">
                {staticDownloads.map((download, index) => (
                  <div
                    key={index}
                    className="bg-white/10 backdrop-blur-sm rounded-lg p-4 hover:bg-white/20 transition-all duration-300 cursor-pointer group"
                  >
                    <div className="flex items-center">
                      <div className="text-orange-400 mr-4">{download.icon}</div>
                      <div className="flex-1">
                        <h4 className="text-white font-medium group-hover:text-orange-300 transition-colors duration-300">
                          {download.title}
                        </h4>
                        <p className="text-blue-200 text-sm">{download.description}</p>
                        <span className="text-blue-300 text-xs">{download.fileSize}</span>
                      </div>
                      <svg
                        className="w-5 h-5 text-blue-300 group-hover:text-white transition-colors duration-300"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                        />
                      </svg>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
