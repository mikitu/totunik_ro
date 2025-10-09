import { strapiAPI } from '@/lib/strapi';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ContactHero from '@/components/contact/ContactHero';
import ContactInfo from '@/components/contact/ContactInfo';
import ContactForm from '@/components/contact/ContactForm';
import SalesTeam from '@/components/contact/SalesTeam';
import ContactMap from '@/components/contact/ContactMap';

interface ContactPageProps {
  params: {
    locale: string;
  };
}

export default async function ContactPage({ params }: ContactPageProps) {
  // Fetch contact page data from Strapi (locale auto-detected)
  const contactData = await strapiAPI.getContactPage();

  return (
    <main className="font-sans text-gray-800">
      <Header />

      {/* Contact Hero */}
      {contactData?.Hero && (
        <ContactHero hero={contactData.Hero} />
      )}

      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Contact Information */}
            {contactData?.ContactInfo && (
              <ContactInfo contactInfo={contactData.ContactInfo} />
            )}

            {/* Contact Form */}
            <ContactForm />
          </div>
        </div>
      </section>
      {/* Sales Team */}
      {contactData?.SalesTeam && (
        <SalesTeam salesTeam={contactData.SalesTeam} />
      )}

      {/* Contact Map */}
      {contactData?.Map && (
        <ContactMap mapSection={contactData.Map} />
      )}
      <Footer />
    </main>
  );
}

// Generate static params for supported locales
export async function generateStaticParams() {
  return [
    { locale: 'en' },
    { locale: 'ro' },
    { locale: 'fr' },
  ];
}

// Generate metadata for SEO
export async function generateMetadata({ params }: ContactPageProps) {
  const { locale } = params;
  
  const titles = {
    en: 'Contact Us - Totunik',
    ro: 'Contactează-ne - Totunik', 
    fr: 'Contactez-nous - Totunik'
  };

  const descriptions = {
    en: 'Get in touch with Totunik for all your Jotun paint and coating needs. Our expert team is ready to help with your project.',
    ro: 'Contactează Totunik pentru toate nevoile tale de vopsele și acoperiri Jotun. Echipa noastră de experți este gata să te ajute cu proiectul tău.',
    fr: 'Contactez Totunik pour tous vos besoins en peintures et revêtements Jotun. Notre équipe d\'experts est prête à vous aider avec votre projet.'
  };

  return {
    title: titles[locale as keyof typeof titles] || titles.en,
    description: descriptions[locale as keyof typeof descriptions] || descriptions.en,
    alternates: {
      canonical: `/${locale}/contact`,
      languages: {
        'en': '/en/contact',
        'ro': '/ro/contact', 
        'fr': '/fr/contact'
      }
    }
  };
}
