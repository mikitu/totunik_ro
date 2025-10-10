'use client';

import React from 'react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

interface Philosophy {
  title?: string;
  content: string;
}

interface PartnershipPhilosophyProps {
  philosophy: Philosophy;
}

export default function PartnershipPhilosophy({ philosophy }: PartnershipPhilosophyProps) {
  const { title, content } = philosophy;
  const { ref: titleRef, isVisible: titleVisible } = useScrollAnimation<HTMLHeadingElement>();
  const { ref: contentRef, isVisible: contentVisible } = useScrollAnimation<HTMLDivElement>({ delay: 200 });

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          {title && (
            <h2
              ref={titleRef}
              className={`text-3xl md:text-4xl font-bold text-gray-900 mb-8 transition-all duration-800 ${
                titleVisible ? 'animate-fade-in-up' : 'opacity-0 translate-y-8'
              }`}
            >
              {title}
            </h2>
          )}

          <div
            ref={contentRef}
            className={`text-lg md:text-xl text-gray-700 leading-relaxed prose prose-lg mx-auto transition-all duration-800 ${
              contentVisible ? 'animate-fade-in-up' : 'opacity-0 translate-y-8'
            }`}
            dangerouslySetInnerHTML={{ __html: content }}
          />
        </div>
      </div>
    </section>
  );
}
