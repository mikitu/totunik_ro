import { StrapiProjectsPortfolio } from '@/lib/strapi';
import Footer from '../Footer';
import HeaderWrapper from '../HeaderWrapper';
import PortfolioCTA from './PortfolioCTA';
import PortfolioGrid from './PortfolioGrid';
import PortfolioHero from './PortfolioHero';

interface ProjectsPortfolioPageProps {
  data: StrapiProjectsPortfolio;
}

export default function ProjectsPortfolioPage({ data }: ProjectsPortfolioPageProps) {
  return (
    <main className="min-h-screen">
      <HeaderWrapper />
      {/* Hero Section */}
      <PortfolioHero hero={data.hero} />

      {/* Projects Grid with Filtering */}
      <PortfolioGrid projects={data.projects} />

      {/* CTA Section */}
      <PortfolioCTA cta={data.cta} />
      <Footer />
    </main>
  );
}
