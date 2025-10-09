import React from 'react';

import { StrapiContactInfo } from '@/lib/strapi';

interface ContactInfoProps {
  contactInfo: StrapiContactInfo;
}

export default function ContactInfo({ contactInfo }: ContactInfoProps) {
  return (
    <div className="space-y-8">
      {/* Section Title */}
      <div>
        <h2 className="text-4xl font-bold text-gray-900 mb-4">{contactInfo.title}</h2>
        {contactInfo.subtitle && (
          <p className="text-xl text-gray-600">
            {contactInfo.subtitle}
          </p>
        )}
      </div>

      {/* Contact Cards */}
      <div className="space-y-6">
        {/* Office Address */}
        {contactInfo.officeAddress && (
          <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
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
                  {contactInfo.officeAddress.street}<br />
                  {contactInfo.officeAddress.district && `${contactInfo.officeAddress.district}, `}
                  {contactInfo.officeAddress.city}<br />
                  {contactInfo.officeAddress.country}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Contact Methods */}
        {contactInfo.contactMethods && contactInfo.contactMethods.map((method) => (
          <div key={method.id} className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">
                {method.type === 'email' && (
                  <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                )}
                {method.type === 'phone' && (
                  <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                )}
                {method.type === 'fax' && (
                  <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 4V2a1 1 0 011-1h8a1 1 0 011 1v2M7 4h10M7 4l-2 14h14l-2-14M11 9h2M9 12h6M10 15h4" />
                  </svg>
                )}
                {method.type === 'website' && (
                  <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                  </svg>
                )}
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{method.label}</h3>
                {method.url ? (
                  <a
                    href={method.url}
                    className="text-orange-600 hover:text-orange-700 transition-colors duration-200 text-lg"
                  >
                    {method.value}
                  </a>
                ) : (
                  <span className="text-gray-600 text-lg">{method.value}</span>
                )}
              </div>
            </div>
          </div>
        ))}

        {/* Business Hours */}
        {contactInfo.businessHours && (
          <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{contactInfo.businessHours.title}</h3>
                <div className="text-gray-600 space-y-1">
                  <p>{contactInfo.businessHours.weekdayHours}</p>
                  {contactInfo.businessHours.saturdayHours && <p>{contactInfo.businessHours.saturdayHours}</p>}
                  {contactInfo.businessHours.sundayHours && <p>{contactInfo.businessHours.sundayHours}</p>}
                  {contactInfo.businessHours.holidayNote && (
                    <p className="text-sm text-gray-500 mt-2">{contactInfo.businessHours.holidayNote}</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Company Info */}
      {contactInfo.companyDetails && (
        <div className="bg-gray-100 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-3">Company Details</h3>
          <div className="text-gray-600 space-y-1">
            <p><strong>{contactInfo.companyDetails.companyName}</strong></p>
            {contactInfo.companyDetails.taxCode && <p>Tax Code: {contactInfo.companyDetails.taxCode}</p>}
            {contactInfo.companyDetails.registrationNumber && <p>Registration: {contactInfo.companyDetails.registrationNumber}</p>}
            {contactInfo.companyDetails.vatNumber && <p>VAT: {contactInfo.companyDetails.vatNumber}</p>}
            {contactInfo.companyDetails.additionalInfo && (
              <p className="text-sm mt-2">{contactInfo.companyDetails.additionalInfo}</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
