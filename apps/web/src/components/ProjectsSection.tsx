'use client';

import React from 'react';
import Image from 'next/image';
import { StrapiProjects } from '@/lib/strapi';
import { useScrollAnimation, useStaggeredScrollAnimation } from '@/hooks/useScrollAnimation';

interface ProjectsSectionProps {
  projects: StrapiProjects;
}

export default function ProjectsSection({ projects }: ProjectsSectionProps) {
  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation<HTMLDivElement>();
  const { ref: gridRef, visibleItems } = useStaggeredScrollAnimation<HTMLDivElement>(projects?.projects?.length || 0, { staggerDelay: 200 });

  if (!projects || !projects.projects?.length) return null;

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
          {projects.title && (
            <h2 className="text-4xl lg:text-5xl font-normal uppercase mb-4 text-gray-900">
              {projects.title}
            </h2>
          )}
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {projects.subtitle}
          </p>
        </div>

        {/* Projects Grid - 2 columns */}
        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {projects.projects.map((project, index) => {
            const imageUrl = project.image?.url
              ? (project.image.url.startsWith("http") 
                  ? project.image.url 
                  : `${process.env.NEXT_PUBLIC_STRAPI_API_URL}${project.image.url}`)
              : null;

            return (
              <div
                key={project.id}
                className={`bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 ${
                  visibleItems[index] ? 'animate-fade-in-up' : 'opacity-0 translate-y-8'
                }`}
              >
                {/* Square Image */}
                {imageUrl && (
                  <div className="relative w-full aspect-square">
                    <Image
                      src={imageUrl}
                      alt={project.image.alternativeText || project.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </div>
                )}
                
                {/* Project Content */}
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-3 text-gray-900">
                    {project.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {project.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA Button */}
        {projects.button && (
          <div className="text-center">
            <a
              href={projects.button.url || '#'}
              className="inline-block bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-md font-semibold transition-colors duration-200"
            >
              {projects.button.label}
            </a>
          </div>
        )}
      </div>
    </section>
  );
}
