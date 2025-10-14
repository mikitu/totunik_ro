import { strapiAPI } from '@/lib/strapi';
import Header from '@/components/Header';
import HeroSlider from '@/components/HeroSlider';
import HighlightsSection from '@/components/HighlightsSection';
import AboutSection from '@/components/AboutSection';
import ServicesSection from '@/components/ServicesSection';
import ProjectsSection from '@/components/ProjectsSection';
import TestimonialsSection from '@/components/TestimonialsSection';
import PartnersSection from '@/components/PartnersSection';
import ContactCTASection from '@/components/ContactCTASection';
import Footer from '@/components/Footer';

export default async function HomePage() {
  // Fetch homepage data from Strapi
  const homepage = await strapiAPI.getHomepage();

  return (
    <main className="font-sans text-gray-800">
      <Header />

      {/* Hero Slider */}
      {homepage?.Hero?.slides?.length ? <HeroSlider slides={homepage.Hero.slides} /> : null}

      {/* Highlights Section */}
      {homepage?.Highlights && <HighlightsSection highlights={homepage.Highlights} />}

      {/* About Section */}
      {homepage?.About && <AboutSection about={homepage.About} />}

      {/* Services Section */}
      {homepage?.Services && <ServicesSection services={homepage.Services} />}

      {/* Projects Section */}
      {homepage?.Projects && <ProjectsSection projects={homepage.Projects} />}

      {/* Testimonials Section */}
      {homepage?.Testimonials && <TestimonialsSection testimonials={homepage.Testimonials} />}

      {/* Partners Section */}
      {homepage?.Partners && <PartnersSection partners={homepage.Partners} />}

      {/* Contact CTA Section */}
      {homepage?.Contact && <ContactCTASection contact={homepage.Contact} />}

      <Footer />
    </main>
  );
}
