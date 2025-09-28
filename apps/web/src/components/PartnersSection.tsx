import Image from 'next/image';

interface Partner {
  id: number;
  url: string;
  alternativeText?: string;
  caption?: string;
}

interface PartnersSectionProps {
  partners: Partner[];
  title?: string;
}

export default function PartnersSection({ partners, title = "Our Partners & Projects" }: PartnersSectionProps) {
  if (!partners || partners.length === 0) {
    return null;
  }

  return (
    <section className="container mx-auto py-16 px-6">
      <h2 className="text-3xl font-semibold mb-12 text-center text-gray-800">
        {title}
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {partners.map((partner) => {
          const imageUrl = partner.url?.startsWith('http') 
            ? partner.url 
            : `${process.env.NEXT_PUBLIC_STRAPI_API_URL}${partner.url}`;

          return (
            <div key={partner.id} className="group">
              <div className="relative aspect-video overflow-hidden rounded-lg shadow-md group-hover:shadow-lg transition-shadow duration-300">
                <Image
                  src={imageUrl}
                  alt={partner.alternativeText || partner.caption || 'Partner project'}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              {partner.caption && (
                <p className="mt-2 text-sm text-gray-600 text-center">
                  {partner.caption}
                </p>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
