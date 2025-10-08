import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ContactHero from '@/components/contact/ContactHero';
import ContactInfo from '@/components/contact/ContactInfo';
import ContactForm from '@/components/contact/ContactForm';
import ContactMap from '@/components/contact/ContactMap';
import SalesTeam from '@/components/contact/SalesTeam';

export default function ContactPage() {
  return (
    <main className="font-sans text-gray-800">
      <Header />
      
      {/* Hero Section */}
      <ContactHero />
      
      {/* Contact Information & Form */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Contact Information */}
            <ContactInfo />
            
            {/* Contact Form */}
            <ContactForm />
          </div>
        </div>
      </section>

      {/* Sales Team */}
      <SalesTeam />

      {/* Map Section */}
      <ContactMap />
      
      <Footer />
    </main>
  );
}
