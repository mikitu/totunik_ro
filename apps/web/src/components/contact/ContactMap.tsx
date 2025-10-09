'use client';

import React, { useState } from 'react';
import { StrapiMapSection } from '@/lib/strapi';

interface ContactMapProps {
  mapSection: StrapiMapSection;
}

export default function ContactMap({ mapSection }: ContactMapProps) {
  const [mapLoaded, setMapLoaded] = useState(false);

  const handleLoadMap = () => {
    setMapLoaded(true);
  };

  // Get location data from Strapi or use defaults
  const officeLocation = mapSection.location || {
    street: "Street Barbu Vacarescu nr. 3, Parter",
    city: "Bucharest",
    district: "District 2",
    country: "ROMANIA",
    latitude: 44.4804,
    longitude: 26.1089
  };

  const fullAddress = `${officeLocation.street}, ${officeLocation.district ? officeLocation.district + ', ' : ''}${officeLocation.city}, ${officeLocation.country}`;

  return (
    <section className="py-20 bg-gray-100">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            {mapSection.title}
          </h2>
          {mapSection.subtitle && (
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {mapSection.subtitle}
            </p>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Map */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              {!mapLoaded ? (
                <div className="relative h-96 bg-gray-200 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-16 h-16 mx-auto mb-4 bg-orange-100 rounded-full flex items-center justify-center">
                      <svg className="w-8 h-8 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Interactive Map</h3>
                    <p className="text-gray-600 mb-4">Click to load the interactive map and get directions</p>
                    <button
                      onClick={handleLoadMap}
                      className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200"
                    >
                      Load Map
                    </button>
                  </div>
                </div>
              ) : (
                <div className="h-96">
                  <iframe
                    src={`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2847.8!2d26.1089!3d44.4804!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40b201c0b3b3b3b3%3A0x1234567890abcdef!2sBarbu%20Vacarescu%203%2C%20Bucharest%2C%20Romania!5e0!3m2!1sen!2sro!4v1234567890123!5m2!1sen!2sro`}
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="TOTUNIK Office Location"
                  />
                </div>
              )}
            </div>
          </div>

          {/* Location Details */}
          <div className="space-y-6">
            {/* Address Card */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Office Address</h3>
                  <p className="text-gray-600 leading-relaxed">
                    {fullAddress}
                  </p>
                </div>
              </div>
            </div>

            {/* Directions */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Getting Here</h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">By Metro</h4>
                    <p className="text-sm text-gray-600">Aurel Vlaicu Metro Station (5 min walk)</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">By Car</h4>
                    <p className="text-sm text-gray-600">Parking available on-site</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-4 h-4 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">Business Hours</h4>
                    <p className="text-sm text-gray-600">Mon-Fri: 8:00-18:00<br />Sat: 9:00-14:00</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <a
                  href={`https://www.google.com/maps/dir/?api=1&destination=${officeLocation.latitude},${officeLocation.longitude}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-3 w-full p-3 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors duration-200"
                >
                  <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                  </svg>
                  <span className="text-blue-700 font-medium">Get Directions</span>
                </a>

                <a
                  href="tel:+40744482099"
                  className="flex items-center space-x-3 w-full p-3 bg-green-50 hover:bg-green-100 rounded-lg transition-colors duration-200"
                >
                  <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <span className="text-green-700 font-medium">Call Office</span>
                </a>

                <button
                  onClick={() => navigator.clipboard.writeText(fullAddress)}
                  className="flex items-center space-x-3 w-full p-3 bg-orange-50 hover:bg-orange-100 rounded-lg transition-colors duration-200"
                >
                  <svg className="w-5 h-5 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                  <span className="text-orange-700 font-medium">Copy Address</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
