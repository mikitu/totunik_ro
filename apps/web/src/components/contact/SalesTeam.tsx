import React from 'react';

const salesTeamMembers = [
  {
    id: 1,
    name: 'Cristina OLTEANU',
    role: 'Sales Director',
    phone: '+40 744 482 099',
    email: 'cristina@totunik.ro',
    avatar: '/api/placeholder/120/120'
  },
  {
    id: 2,
    name: 'Marian LEANCA',
    role: 'Area Sales Manager',
    phone: '+40 728 124 611',
    email: 'marian.leanca@totunik.ro',
    avatar: '/api/placeholder/120/120'
  },
  {
    id: 3,
    name: 'Bogdan CRISTEA',
    role: 'Area Sales Manager',
    phone: '+40 728 124 307',
    email: 'bogdan.cristea@totunik.ro',
    avatar: '/api/placeholder/120/120'
  },
  {
    id: 4,
    name: 'Alina Anghelus',
    role: 'Office Sales Support',
    phone: '+40 728 033 105',
    email: 'comenzi@totunik.ro',
    avatar: '/api/placeholder/120/120'
  }
];

export default function SalesTeam() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Meet Our Sales Team
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our experienced sales professionals are ready to help you find the perfect Jotun solutions for your project.
          </p>
        </div>

        {/* Sales Team Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {salesTeamMembers.map((member) => (
            <div 
              key={member.id} 
              className="bg-gray-50 rounded-lg p-6 text-center hover:shadow-lg transition-all duration-300 transform hover:scale-105"
            >
              {/* Avatar */}
              <div className="mb-6">
                <div className="w-24 h-24 mx-auto bg-gradient-to-br from-orange-400 to-orange-600 rounded-full flex items-center justify-center text-white text-2xl font-bold shadow-lg">
                  {member.name.split(' ').map(n => n[0]).join('')}
                </div>
              </div>

              {/* Name and Role */}
              <div className="mb-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-1">
                  {member.name}
                </h3>
                <p className="text-orange-600 font-medium">
                  {member.role}
                </p>
              </div>

              {/* Contact Information */}
              <div className="space-y-3">
                {/* Phone */}
                <a 
                  href={`tel:${member.phone.replace(/\s/g, '')}`}
                  className="flex items-center justify-center space-x-2 text-gray-600 hover:text-orange-600 transition-colors duration-200"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <span className="text-sm">{member.phone}</span>
                </a>

                {/* Email */}
                <a 
                  href={`mailto:${member.email}`}
                  className="flex items-center justify-center space-x-2 text-gray-600 hover:text-orange-600 transition-colors duration-200"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <span className="text-sm break-all">{member.email}</span>
                </a>
              </div>

              {/* Contact Button */}
              <div className="mt-6">
                <a
                  href={`mailto:${member.email}`}
                  className="inline-flex items-center px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white text-sm font-medium rounded-lg transition-colors duration-200"
                >
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  Contact
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Additional Contact Info */}
        <div className="mt-16 text-center">
          <div className="bg-orange-50 rounded-lg p-8 max-w-2xl mx-auto">
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">
              Need Immediate Assistance?
            </h3>
            <p className="text-gray-600 mb-6">
              For urgent inquiries or technical support, don't hesitate to call our main office line.
            </p>
            <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-6">
              <a 
                href="tel:+40744482099"
                className="flex items-center space-x-2 bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <span>Call Now</span>
              </a>
              <a 
                href="mailto:office@totunik.ro"
                className="flex items-center space-x-2 bg-white hover:bg-gray-50 text-orange-600 border-2 border-orange-500 px-6 py-3 rounded-lg font-medium transition-colors duration-200"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span>Send Email</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
