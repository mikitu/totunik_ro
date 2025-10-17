'use client';

import React, { useState, useMemo } from 'react';
import { StrapiPortfolioProject } from '@/lib/strapi';
import { useScrollAnimation, useStaggeredScrollAnimation } from '@/hooks/useScrollAnimation';
import ProjectCard from './ProjectCard';

interface PortfolioGridProps {
  projects: StrapiPortfolioProject[];
}

const CATEGORIES = [
  { key: 'all', label: 'All Projects' },
  { key: 'residential', label: 'Residential' },
  { key: 'industrial', label: 'Industrial' },
  { key: 'medical-horeca', label: 'Medical & HoReCa' },
  { key: 'retail', label: 'Retail' },
  { key: 'other', label: 'Other Projects' },
] as const;

export default function PortfolioGrid({ projects }: PortfolioGridProps) {
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation<HTMLDivElement>();

  // Filter projects based on active filter
  const filteredProjects = useMemo(() => {
    if (activeFilter === 'all') {
      return projects;
    }
    return projects.filter(project => project.category === activeFilter);
  }, [projects, activeFilter]);

  const { ref: gridRef, visibleItems } = useStaggeredScrollAnimation<HTMLDivElement>(
    filteredProjects.length,
    { staggerDelay: 150 }
  );

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div
          ref={headerRef}
          className={`text-center mb-16 transition-all duration-800 ${
            headerVisible ? 'animate-fade-in-up' : 'opacity-0 translate-y-8'
          }`}
        >
          <h2 className="text-4xl lg:text-5xl font-bold mb-8 text-gray-900">
            Our Project Portfolio
          </h2>
          
          {/* Filter Buttons */}
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            {CATEGORIES.map((category) => (
              <button
                key={category.key}
                onClick={() => setActiveFilter(category.key)}
                className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                  activeFilter === category.key
                    ? 'bg-orange-500 text-white shadow-lg'
                    : 'bg-white text-gray-700 hover:bg-orange-100 hover:text-orange-600 shadow-md'
                }`}
              >
                {category.label}
              </button>
            ))}
          </div>
          
          {/* Results Count */}
          <p className="text-gray-600">
            Showing {filteredProjects.length} project{filteredProjects.length !== 1 ? 's' : ''}
            {activeFilter !== 'all' && (
              <span className="ml-1">
                in {CATEGORIES.find(cat => cat.key === activeFilter)?.label}
              </span>
            )}
          </p>
        </div>

        {/* Projects Grid */}
        <div ref={gridRef} className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-7xl mx-auto">
          {filteredProjects.map((project, index) => (
            <div
              key={project.id}
              className={`transition-all duration-800 ${
                visibleItems[index] ? 'animate-fade-in-up' : 'opacity-0 translate-y-8'
              }`}
            >
              <ProjectCard project={project} />
            </div>
          ))}
        </div>

        {/* No Results */}
        {filteredProjects.length === 0 && (
          <div className="text-center py-16">
            <div className="text-gray-400 text-6xl mb-4">🔍</div>
            <h3 className="text-2xl font-semibold text-gray-700 mb-2">No projects found</h3>
            <p className="text-gray-500">
              Try selecting a different category or check back later for new projects.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
