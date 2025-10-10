import Image from 'next/image';

interface TestimonialItem {
  quote: string;
  author: string;
  position?: string;
  company?: string;
  avatar?: {
    url: string;
    alternativeText?: string;
  };
  rating?: number;
}

interface BusinessPartnerTestimonialsProps {
  testimonials: {
    title: string;
    subtitle?: string;
    testimonials: TestimonialItem[];
  };
}

export default function BusinessPartnerTestimonials({ testimonials }: BusinessPartnerTestimonialsProps) {
  const { title, subtitle, testimonials: items } = testimonials;

  if (!items || items.length === 0) {
    return null;
  }

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <svg
        key={i}
        className={`w-5 h-5 ${i < rating ? 'text-yellow-400' : 'text-gray-300'}`}
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ));
  };

  return (
    <section className="py-16 lg:py-24 bg-white">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {title}
          </h2>
          {subtitle && (
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {subtitle}
            </p>
          )}
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {items.map((testimonial, index) => (
            <div
              key={index}
              className="bg-gray-50 rounded-2xl p-8 relative group hover:shadow-lg transition-all duration-300"
            >
              {/* Quote Icon */}
              <div className="absolute top-6 right-6 text-orange-200 group-hover:text-orange-300 transition-colors">
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h4v10h-10z" />
                </svg>
              </div>

              {/* Quote */}
              <blockquote className="text-lg text-gray-700 mb-6 mr-8 leading-relaxed italic">
                "{testimonial.quote}"
              </blockquote>

              {/* Rating */}
              {testimonial.rating && (
                <div className="flex items-center mb-4">
                  {renderStars(testimonial.rating)}
                </div>
              )}

              {/* Author Info */}
              <div className="flex items-center">
                {/* Avatar */}
                {testimonial.avatar ? (
                  <div className="relative w-12 h-12 mr-4">
                    <Image
                      src={`${process.env.NEXT_PUBLIC_STRAPI_API_URL}${testimonial.avatar.url}`}
                      alt={testimonial.avatar.alternativeText || testimonial.author}
                      fill
                      className="object-cover rounded-full"
                    />
                  </div>
                ) : (
                  <div className="w-12 h-12 mr-4 bg-orange-100 rounded-full flex items-center justify-center">
                    <span className="text-orange-600 font-semibold text-lg">
                      {testimonial.author.charAt(0)}
                    </span>
                  </div>
                )}

                {/* Author Details */}
                <div>
                  <div className="font-semibold text-gray-900">
                    {testimonial.author}
                  </div>
                  {(testimonial.position || testimonial.company) && (
                    <div className="text-sm text-gray-600">
                      {testimonial.position}
                      {testimonial.position && testimonial.company && ', '}
                      {testimonial.company}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
