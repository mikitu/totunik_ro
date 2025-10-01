import { strapiAPI } from '@/lib/strapi';
import Header from '@/components/Header';
import CmsFooter from '@/components/CmsFooter';
import HeroSlider from '@/components/HeroSlider';
import HighlightsSection from '@/components/HighlightsSection';
import PartnersSection from '@/components/PartnersSection';
import Footer from '@/components/Footer';

export default async function HomePage() {
  // Fetch homepage data from Strapi
  const homepage = await strapiAPI.getHomepage();

  // Fallback data if Strapi is not available
  const fallbackHighlights = [
    {
      id: 1,
      icon: { url: "/icons/experience.svg", alternativeText: "Experience" },
      title: "+10 Years Experience",
      description: "Over a decade of expertise in turnkey projects and interior design"
    },
    {
      id: 2,
      icon: { url: "/icons/clients.svg", alternativeText: "Clients" },
      title: "1000+ Clients",
      description: "Trusted by thousands of satisfied customers across various industries"
    },
    {
      id: 3,
      icon: { url: "/icons/quality.svg", alternativeText: "Quality" },
      title: "Quality Certificates",
      description: "Certified quality and trust in all our construction and design projects"
    }
  ];

  return (
    <main className="font-sans text-gray-800">
      <Header />

      {/* Hero Slider */}
      {homepage?.Hero?.slides?.length ? (
        <HeroSlider slides={homepage.Hero.slides} />
      ) : null}

      {/* Highlights Section */}
      <HighlightsSection highlights={homepage?.Highlight || fallbackHighlights} />

      {/* Partners/Projects Section */}
      <PartnersSection
        partners={homepage?.Partners || [
          {
            id: 1,
            url: "https://totunik.ro/wp-content/uploads/2021/02/bank-credit-europe-bucharest.jpg",
            alternativeText: "Bank Credit Europe Bucharest"
          },
          {
            id: 2,
            url: "https://totunik.ro/wp-content/uploads/2021/02/magazin-colins-militari.jpg",
            alternativeText: "Magazin Colins Militari"
          },
          {
            id: 3,
            url: "https://totunik.ro/wp-content/uploads/2021/02/magazin-altinyildiz-sun-plaza.jpg",
            alternativeText: "Magazin Altinyildiz Sun Plaza"
          },
          {
            id: 4,
            url: "https://totunik.ro/wp-content/uploads/2021/02/garanti-bank-craiova.jpg",
            alternativeText: "Garanti Bank Craiova"
          }
        ]}
        title="Our Partners & Projects"
      />

      <Footer />
    </main>
  );
}