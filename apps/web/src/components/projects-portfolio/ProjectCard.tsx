'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { StrapiPortfolioProject, getStrapiMediaURL } from '@/lib/strapi';
import { LoadingLink } from '@/components/LoadingLink';

interface ProjectCardProps {
  project: StrapiPortfolioProject;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const [showAfter, setShowAfter] = useState(false);

  const beforeImageUrl = getStrapiMediaURL(project.beforeImage);
  const afterImageUrl = getStrapiMediaURL(project.afterImage);

  const categoryLabels = {
    'residential': 'Residential',
    'industrial': 'Industrial',
    'medical-horeca': 'Medical & HoReCa',
    'retail': 'Retail',
    'other': 'Other'
  };

  const categoryColors = {
    'residential': 'bg-blue-100 text-blue-800',
    'industrial': 'bg-gray-100 text-gray-800',
    'medical-horeca': 'bg-green-100 text-green-800',
    'retail': 'bg-purple-100 text-purple-800',
    'other': 'bg-orange-100 text-orange-800'
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group">
      {/* Before/After Image Section */}
      <div className="relative h-80 overflow-hidden">
        {/* Before Image */}
        {beforeImageUrl && (
          <div className={`absolute inset-0 transition-opacity duration-500 ${showAfter ? 'opacity-0' : 'opacity-100'}`}>
            <Image
              src={beforeImageUrl}
              alt={`${project.title} - Before`}
              fill
              className="object-cover"
            />
            <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-medium">
              Before
            </div>
          </div>
        )}

        {/* After Image */}
        {afterImageUrl && (
          <div className={`absolute inset-0 transition-opacity duration-500 ${showAfter ? 'opacity-100' : 'opacity-0'}`}>
            <Image
              src={afterImageUrl}
              alt={`${project.title} - After`}
              fill
              className="object-cover"
            />
            <div className="absolute top-4 left-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium">
              After
            </div>
          </div>
        )}

        {/* Toggle Button */}
        <button
          onClick={() => setShowAfter(!showAfter)}
          className="absolute bottom-4 right-4 bg-white/90 hover:bg-white text-gray-800 px-4 py-2 rounded-full font-medium transition-all duration-200 shadow-lg"
        >
          {showAfter ? 'Show Before' : 'Show After'}
        </button>

        {/* Category Badge */}
        <div className="absolute top-4 right-4">
          <span className={`px-3 py-1 rounded-full text-sm font-medium ${categoryColors[project.category]}`}>
            {categoryLabels[project.category]}
          </span>
        </div>

        {/* Featured Badge */}
        {project.featured && (
          <div className="absolute top-16 right-4">
            <span className="bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-medium">
              Featured
            </span>
          </div>
        )}
      </div>

      {/* Content Section */}
      <div className="p-8">
        {/* Title and Location */}
        <div className="mb-4">
          <h3 className="text-2xl font-bold text-gray-900 mb-2">{project.title}</h3>
          {project.location && (
            <p className="text-gray-500 text-sm">📍 {project.location}</p>
          )}
        </div>

        {/* Description */}
        <p className="text-gray-600 leading-relaxed mb-6">{project.description}</p>

        {/* Technical Specs */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="font-semibold text-gray-900 mb-2">Surface Area</h4>
            <p className="text-gray-600">{project.surfaceArea}</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="font-semibold text-gray-900 mb-2">Duration</h4>
            <p className="text-gray-600">{project.duration}</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg col-span-2">
            <h4 className="font-semibold text-gray-900 mb-2">Project Type</h4>
            <p className="text-gray-600">{project.projectType}</p>
          </div>
        </div>

        {/* Products Used */}
        <div className="mb-6">
          <h4 className="font-semibold text-gray-900 mb-2">Products Used</h4>
          <p className="text-gray-600 text-sm leading-relaxed">{project.productsUsed}</p>
        </div>

        {/* CTA Button */}
        {project.ctaButton && (
          <div className="pt-4 border-t border-gray-100">
            <LoadingLink
              href={project.ctaButton.url || '/contact'}
              className="inline-flex items-center justify-center w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200"
            >
              {project.ctaButton.label || 'Request a similar quote'}
            </LoadingLink>
          </div>
        )}
      </div>
    </div>
  );
}
