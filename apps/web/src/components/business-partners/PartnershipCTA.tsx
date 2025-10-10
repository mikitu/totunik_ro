'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface Button {
  label: string;
  url: string;
  variant?: string;
}

interface CTA {
  title: string;
  subtitle?: string;
  contactButton?: Button;
  exploreButton?: Button;
  backgroundImage?: {
    url: string;
    alternativeText?: string;
  };
}

interface PartnershipCTAProps {
  cta: CTA;
}

export default function PartnershipCTA({ cta }: PartnershipCTAProps) {
  const { title, subtitle, contactButton, exploreButton, backgroundImage } = cta;

  return (
    <section className="relative py-20 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        {backgroundImage ? (
          <Image
            src={`${process.env.NEXT_PUBLIC_STRAPI_API_URL}${backgroundImage.url}`}
            alt={backgroundImage.alternativeText || 'Partnership CTA'}
            fill
            className="object-cover"
          />
        ) : (
          <div className="bg-gradient-to-br from-blue-900 via-blue-800 to-orange-600" />
        )}
        
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/60" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center text-white">
        <div className="max-w-4xl mx-auto">
          {/* Title */}
          <h2 className="text-3xl md:text-5xl font-bold mb-6 leading-tight">
            {title}
          </h2>

          {/* Subtitle */}
          {subtitle && (
            <p className="text-xl md:text-2xl mb-12 opacity-90 leading-relaxed">
              {subtitle}
            </p>
          )}

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            {contactButton && contactButton.url && (
              <Link
                href={contactButton.url}
                className="group bg-orange-500 hover:bg-orange-600 text-white font-semibold py-4 px-8 rounded-lg transition-all duration-200 transform hover:scale-105 hover:shadow-lg flex items-center space-x-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span>{contactButton.label}</span>
              </Link>
            )}

            {exploreButton && exploreButton.url && (
              <Link
                href={exploreButton.url}
                className="group bg-transparent border-2 border-white text-white hover:bg-white hover:text-gray-900 font-semibold py-4 px-8 rounded-lg transition-all duration-200 transform hover:scale-105 flex items-center space-x-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <span>{exploreButton.label}</span>
              </Link>
            )}
          </div>

          {/* Additional Message */}
          <div className="mt-12 text-center">
            <p className="text-lg opacity-80">
              We're always looking to collaborate with companies that share our values and vision.
            </p>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-10 left-10 w-20 h-20 bg-white/10 rounded-full blur-xl" />
      <div className="absolute bottom-10 right-10 w-32 h-32 bg-orange-500/20 rounded-full blur-xl" />
      <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-blue-500/20 rounded-full blur-xl" />
    </section>
  );
}
