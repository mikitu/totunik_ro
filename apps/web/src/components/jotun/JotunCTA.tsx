'use client';

import React from 'react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

export default function JotunCTA() {
  const { ref: headlineRef, isVisible: headlineVisible } = useScrollAnimation<HTMLHeadingElement>();
  const { ref: subtitleRef, isVisible: subtitleVisible } = useScrollAnimation<HTMLParagraphElement>({ delay: 200 });
  const { ref: buttonsRef, isVisible: buttonsVisible } = useScrollAnimation<HTMLDivElement>({ delay: 400 });

  return (
    <section className="relative py-20 bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-32 h-32 bg-white rounded-full blur-xl animate-pulse" />
        <div className="absolute bottom-10 right-10 w-48 h-48 bg-orange-500 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-white rounded-lg rotate-45 blur-lg animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center text-white">
          {/* Headline */}
          <h2
            ref={headlineRef}
            className={`text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight transition-all duration-800 ${
              headlineVisible ? 'animate-fade-in-up' : 'opacity-0 translate-y-8'
            }`}
          >
            Partner with Totunik for Certified Jotun Applications
          </h2>

          {/* Subtitle */}
          <p
            ref={subtitleRef}
            className={`text-xl md:text-2xl text-blue-100 mb-12 leading-relaxed max-w-3xl mx-auto transition-all duration-800 ${
              subtitleVisible ? 'animate-fade-in-up' : 'opacity-0 translate-y-8'
            }`}
          >
            Get professional consultation, certified application, and comprehensive support for your next project with premium Jotun products.
          </p>

          {/* CTA Buttons */}
          <div
            ref={buttonsRef}
            className={`flex flex-col sm:flex-row gap-4 justify-center items-center transition-all duration-800 ${
              buttonsVisible ? 'animate-fade-in-up' : 'opacity-0 translate-y-8'
            }`}
          >
            <button className="group inline-flex items-center px-8 py-4 bg-orange-500 hover:bg-orange-600 text-white font-semibold text-lg rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
              <span className="mr-2">Request a Quote</span>
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

            <button className="group inline-flex items-center px-8 py-4 bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white font-semibold text-lg rounded-lg border border-white/20 hover:border-white/30 transition-all duration-300">
              <svg 
                className="w-5 h-5 mr-2" 
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
              <span>Contact Us</span>
            </button>
          </div>

          {/* Additional Info */}
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="group">
              <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2">Certified Expertise</h3>
              <p className="text-blue-100 text-sm">Official Jotun partner with certified application specialists</p>
            </div>

            <div className="group">
              <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2">Fast Delivery</h3>
              <p className="text-blue-100 text-sm">Quick project turnaround with efficient logistics</p>
            </div>

            <div className="group">
              <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2">Full Support</h3>
              <p className="text-blue-100 text-sm">Comprehensive technical support and after-sales service</p>
            </div>
          </div>

          {/* Download Section */}
          <div className="mt-16 p-8 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10">
            <h3 className="text-2xl font-bold mb-4">Technical Documentation</h3>
            <p className="text-blue-100 mb-6">Download product datasheets, color charts, and application guides</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="inline-flex items-center px-6 py-3 bg-white/10 hover:bg-white/20 text-white font-medium rounded-lg border border-white/20 transition-all duration-300">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Product Catalog
              </button>
              <button className="inline-flex items-center px-6 py-3 bg-white/10 hover:bg-white/20 text-white font-medium rounded-lg border border-white/20 transition-all duration-300">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM21 5a2 2 0 00-2-2h-4a2 2 0 00-2 2v12a4 4 0 004 4 4 4 0 004-4V5z" />
                </svg>
                Color Charts
              </button>
              <button className="inline-flex items-center px-6 py-3 bg-white/10 hover:bg-white/20 text-white font-medium rounded-lg border border-white/20 transition-all duration-300">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Datasheets
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
