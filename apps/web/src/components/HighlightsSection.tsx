import Image from 'next/image';

interface Highlight {
  id: number;
  icon: {
    url: string;
    alternativeText?: string;
  };
  title: string;
  description: string;
}

interface HighlightsSectionProps {
  highlights: Highlight[];
}

export default function HighlightsSection({ highlights }: HighlightsSectionProps) {
  if (!highlights || highlights.length === 0) {
    return null;
  }

  return (
    <section className="bg-gray-50 py-16">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {highlights.map((highlight) => {
            const iconUrl = highlight.icon?.url?.startsWith('http') 
              ? highlight.icon.url 
              : `${process.env.NEXT_PUBLIC_STRAPI_API_URL}${highlight.icon?.url}`;

            return (
              <div key={highlight.id} className="text-center group">
                {highlight.icon && (
                  <div className="mb-4 flex justify-center">
                    <div className="w-16 h-16 relative group-hover:scale-110 transition-transform duration-300">
                      <Image
                        src={iconUrl}
                        alt={highlight.icon.alternativeText || highlight.title}
                        fill
                        className="object-contain"
                      />
                    </div>
                  </div>
                )}
                <h3 className="text-xl font-semibold mb-3 text-gray-800">
                  {highlight.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {highlight.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
