import React from 'react';
import Image from 'next/image';
import { StrapiAbout } from '@/lib/strapi';

interface AboutSectionProps {
  about: StrapiAbout;
}

export default function AboutSection({ about }: AboutSectionProps) {
  if (!about) return null;

  const imageUrl = about.image?.url
    ? (about.image.url.startsWith("http") 
        ? about.image.url 
        : `${process.env.NEXT_PUBLIC_STRAPI_API_URL}${about.image.url}`)
    : null;

  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content Column */}
          <div className="flex flex-col justify-center">
            <h2 className="text-4xl lg:text-5xl font-normal uppercase mb-8 text-gray-900">
              {about.title}
            </h2>
            <div className="text-gray-700 text-lg leading-relaxed mb-8 space-y-4">
              {about.description.split('\n').map((paragraph, index) => (
                paragraph.trim() && (
                  <p key={index} className="mb-4">
                    {paragraph.trim()}
                  </p>
                )
              ))}
            </div>
            <div className="flex justify-start">
              <button className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-md font-medium transition-colors duration-200">
                Learn More
              </button>
            </div>
          </div>

          {/* Image Column */}
          <div className="flex justify-center lg:justify-end">
            {imageUrl && (
              <div className="relative w-full max-w-lg">
                <Image
                  src={imageUrl}
                  alt={about.image.alternativeText || about.title}
                  width={about.image.width || 500}
                  height={about.image.height || 500}
                  className="w-full h-auto rounded-lg shadow-lg"
                  priority={false}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
