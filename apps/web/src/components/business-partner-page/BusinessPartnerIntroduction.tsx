'use client';

import { useScrollAnimation } from '@/hooks/useScrollAnimation';

interface BusinessPartnerIntroductionProps {
  introduction: {
    content: string;
  };
}

export default function BusinessPartnerIntroduction({ introduction }: BusinessPartnerIntroductionProps) {
  const { content } = introduction;
  const { ref: contentRef, isVisible: contentVisible } = useScrollAnimation<HTMLDivElement>();

  return (
    <section className="py-16 lg:py-24 bg-white">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          {/* Content */}
          <div
            ref={contentRef}
            className={`prose prose-lg prose-gray max-w-none text-center transition-all duration-800 ${
              contentVisible ? 'animate-fade-in-up' : 'opacity-0 translate-y-8'
            }`}
            dangerouslySetInnerHTML={{ __html: content }}
          />
        </div>
      </div>
    </section>
  );
}
