'use client';

import { StrapiMedia, StrapiProjectsPortfolio } from '@/lib/strapi';
import PortfolioCTA from '../PortfolioCTA';
import PortfolioGrid from '../PortfolioGrid';
import PortfolioHero from '../PortfolioHero';

// Helper function to create mock StrapiMedia objects
const createMockImage = (id: number, url: string, alt: string): StrapiMedia => ({
  id,
  documentId: `image-${id}`,
  name: `image-${id}.jpg`,
  hash: `image_${id}_hash`,
  ext: '.jpg',
  mime: 'image/jpeg',
  size: 150.5,
  url,
  alternativeText: alt,
  caption: undefined,
  provider: 'local',
  width: 800,
  height: 600,
  createdAt: '2024-01-01T00:00:00.000Z',
  updatedAt: '2024-01-01T00:00:00.000Z',
});

// Static data for testing
const STATIC_PORTFOLIO_DATA: StrapiProjectsPortfolio = {
  id: 1,
  hero: {
    id: 1,
    headline: 'Projects Portfolio',
    subheadline: 'The results speak for themselves.',
    description:
      'Explore a selection of projects completed with Totunik & Jotun products and expertise. From modern residential complexes to large-scale industrial facilities, each project reflects our commitment to quality, durability, and aesthetic excellence.',
    backgroundImage: createMockImage(
      100,
      'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1920&h=1080&fit=crop',
      'Modern building facade with professional coating'
    ),
  },
  projects: [
    {
      id: 1,
      title: 'Green View Residential Complex, Bucharest',
      description:
        'Exterior façade restoration using Jotashield Ultra Clean for long-lasting UV protection and a fresh, elegant appearance. The project included plaster repairs, priming, and two final finishing coats.',
      category: 'residential',
      beforeImage: createMockImage(
        1,
        'https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=800&h=600&fit=crop',
        'Building before renovation'
      ),
      afterImage: createMockImage(
        2,
        'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&h=600&fit=crop',
        'Building after renovation'
      ),
      surfaceArea: '1,800 m²',
      projectType: 'Aesthetic renovation',
      duration: '2 months',
      productsUsed: 'Jotashield Ultra Clean, Majestic Primer',
      location: 'Bucharest, Romania',
      featured: true,
      ctaButton: {
        id: 1,
        label: 'Request a similar quote',
        url: '/contact',
      },
    },
    {
      id: 2,
      title: 'Industrial Warehouse Protection',
      description:
        'Complete anti-corrosion system application for steel structures in harsh industrial environment. Multi-layer protection system ensuring 15+ years durability.',
      category: 'industrial',
      beforeImage: createMockImage(
        3,
        'https://images.unsplash.com/photo-1586864387967-d02ef85d93e8?w=800&h=600&fit=crop',
        'Industrial facility before coating'
      ),
      afterImage: createMockImage(
        4,
        'https://images.unsplash.com/photo-1565043666747-69f6646db940?w=800&h=600&fit=crop',
        'Industrial facility after coating'
      ),
      surfaceArea: '3,500 m²',
      projectType: 'Anti-corrosion protection',
      duration: '4 months',
      productsUsed: 'Penguard Primer, Penguard Topcoat, Barrier Primer',
      location: 'Constanța, Romania',
      featured: false,
      ctaButton: {
        id: 2,
        label: 'Request a similar quote',
        url: '/contact',
      },
    },
    {
      id: 3,
      title: 'Medical Center Interior Renovation',
      description:
        'Hygienic coating system for medical facility interiors. Antimicrobial properties and easy-clean surfaces meeting healthcare standards.',
      category: 'medical-horeca',
      beforeImage: createMockImage(
        5,
        'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=800&h=600&fit=crop',
        'Medical center before renovation'
      ),
      afterImage: createMockImage(
        6,
        'https://images.unsplash.com/photo-1551190822-a9333d879b1f?w=800&h=600&fit=crop',
        'Medical center after renovation'
      ),
      surfaceArea: '1,200 m²',
      projectType: 'Hygienic interior coating',
      duration: '3 weeks',
      productsUsed: 'Jotashield Hygiene, Fenomastic Pure Colours',
      location: 'Cluj-Napoca, Romania',
      featured: false,
      ctaButton: {
        id: 3,
        label: 'Request a similar quote',
        url: '/contact',
      },
    },
    {
      id: 4,
      title: 'Retail Shopping Center Facade',
      description:
        'Modern facade coating with vibrant colors and weather resistance. Enhanced curb appeal and long-term protection against urban pollution.',
      category: 'retail',
      beforeImage: createMockImage(
        7,
        'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&h=600&fit=crop',
        'Shopping center before renovation'
      ),
      afterImage: createMockImage(
        8,
        'https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?w=800&h=600&fit=crop',
        'Shopping center after renovation'
      ),
      surfaceArea: '2,800 m²',
      projectType: 'Facade modernization',
      duration: '6 weeks',
      productsUsed: 'Jotashield ColourLast, Jotamastic Smart Pack',
      location: 'Timișoara, Romania',
      featured: true,
      ctaButton: {
        id: 4,
        label: 'Request a similar quote',
        url: '/contact',
      },
    },
  ],
  cta: {
    id: 1,
    headline: 'Have a project in progress?',
    description:
      'Our technical team can help you choose the right coating system for your surface, environment, and performance needs.',
    primaryButton: {
      id: 5,
      label: 'Request a similar quote',
      url: '/contact',
    },
    secondaryButton: {
      id: 6,
      label: 'Contact Our Team',
      url: '/contact',
    },
    backgroundImage: createMockImage(
      101,
      'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1920&h=1080&fit=crop',
      'Professional team working on coating project'
    ),
    showCounters: true,
    counters: [
      {
        id: 1,
        value: '15+',
        label: 'Years of Experience',
      },
      {
        id: 2,
        value: '500+',
        label: 'Projects Completed',
      },
      {
        id: 3,
        value: '100%',
        label: 'Quality Guarantee',
      },
    ],
  },
};

export default function ProjectsPortfolioStatic() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <PortfolioHero hero={STATIC_PORTFOLIO_DATA.hero} />

      {/* Projects Grid with Filtering */}
      <PortfolioGrid projects={STATIC_PORTFOLIO_DATA.projects} />

      {/* CTA Section */}
      <PortfolioCTA cta={STATIC_PORTFOLIO_DATA.cta} />
    </main>
  );
}
