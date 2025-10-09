import { strapiAPI } from '@/lib/strapi';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ContactHero from '@/components/contact/ContactHero';
import ContactInfo from '@/components/contact/ContactInfo';
import ContactForm from '@/components/contact/ContactForm';
import DynamicContactForm from '@/components/contact/DynamicContactForm';
import SalesTeam from '@/components/contact/SalesTeam';
import ContactMap from '@/components/contact/ContactMap';

interface ContactPageProps {
  params: {
    locale: string;
  };
}

export default async function ContactPage({ params }: ContactPageProps) {
  // Await params in Next.js 15+
  const { locale } = await params;

  // Fetch contact page data from Strapi (locale auto-detected)
  const contactData = await strapiAPI.getContactPage();

  // Fetch dynamic contact form configuration
  const formConfig = await strapiAPI.getContactFormConfig();

  if (!contactData) {
    console.error('Contact page data not found');
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Contact Page Not Available</h1>
          <p className="text-gray-600">The contact page content is not published yet.</p>
        </div>
      </div>
    );
  }

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
            {formConfig?.contactForm ? (
              <DynamicContactForm config={formConfig.contactForm} />
            ) : (
              <ContactForm />
            )}
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
  const { locale } = await params;
  
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
