'use client';

import React from 'react';

interface Philosophy {
  title?: string;
  content: string;
}

interface PartnershipPhilosophyProps {
  philosophy: Philosophy;
}

export default function PartnershipPhilosophy({ philosophy }: PartnershipPhilosophyProps) {
  const { title, content } = philosophy;

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          {title && (
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">
              {title}
            </h2>
          )}
          
          <div 
            className="text-lg md:text-xl text-gray-700 leading-relaxed prose prose-lg mx-auto"
            dangerouslySetInnerHTML={{ __html: content }}
          />
        </div>
      </div>
    </section>
  );
}
