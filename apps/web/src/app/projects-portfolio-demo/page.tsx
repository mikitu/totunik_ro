import { Metadata } from 'next';
import ProjectsPortfolioStatic from '@/components/projects-portfolio/static/ProjectsPortfolioStatic';

export const metadata: Metadata = {
  title: 'Projects Portfolio Demo - Totunik',
  description: 'Demo of the Projects Portfolio section with static data',
};

export default function ProjectsPortfolioDemoPage() {
  return <ProjectsPortfolioStatic />;
}
