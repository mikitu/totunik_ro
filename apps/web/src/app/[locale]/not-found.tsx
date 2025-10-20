'use client';

import FooterSimple from '@/components/FooterSimple';
import HeaderSimple from '@/components/HeaderSimple';
import Link from 'next/link';
import { useParams } from 'next/navigation';

export default function LocalizedNotFound() {
  const params = useParams();
  const locale = (params?.locale as string) || 'en';

  // Localized content
  const content = {
    en: {
      title: 'Oops! Page Not Found',
      description:
        "The page you're looking for seems to have wandered off. Don't worry though, our professional coating services are still here to help transform your project.",
      returnHome: 'Return to Home',
      viewServices: 'View Our Services',
      helpText: 'Looking for something specific? Try these popular pages:',
      links: {
        services: 'Our Services',
        portfolio: 'Portfolio',
        contact: 'Contact Us',
        products: 'Jotun Products',
      },
    },
    ro: {
      title: 'Oops! Pagina nu a fost găsită',
      description:
        'Pagina pe care o căutați pare să fi dispărut. Nu vă faceți griji, serviciile noastre profesionale de acoperire sunt încă aici pentru a vă ajuta să vă transformați proiectul.',
      returnHome: 'Înapoi la Pagina Principală',
      viewServices: 'Vezi Serviciile Noastre',
      helpText: 'Căutați ceva specific? Încercați aceste pagini populare:',
      links: {
        services: 'Serviciile Noastre',
        portfolio: 'Portofoliu',
        contact: 'Contactează-ne',
        products: 'Produse Jotun',
      },
    },
    tr: {
      title: 'Oops! Sayfa Bulunamadı',
      description:
        'Aradığınız sayfa kaybolmuş gibi görünüyor. Endişelenmeyin, profesyonel kaplama hizmetlerimiz projenizi dönüştürmenize yardımcı olmak için hala burada.',
      returnHome: 'Ana Sayfaya Dön',
      viewServices: 'Hizmetlerimizi Görüntüle',
      helpText: 'Belirli bir şey mi arıyorsunuz? Bu popüler sayfaları deneyin:',
      links: {
        services: 'Hizmetlerimiz',
        portfolio: 'Portföy',
        contact: 'İletişim',
        products: 'Jotun Ürünleri',
      },
    },
  };

  const t = content[locale as keyof typeof content] || content.en;

  return (
    <main className="font-sans text-gray-800">
      <HeaderSimple locale={locale} />

      {/* 404 Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <div
            className="w-full h-full bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: `url('https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=1920&h=1080&fit=crop&crop=center')`,
            }}
          />
          {/* Dark overlay */}
          <div className="absolute inset-0 bg-black/60" />
        </div>

        {/* Content */}
        <div className="relative z-10 text-center text-white px-6 max-w-4xl mx-auto">
          {/* 404 Number */}
          <div className="mb-8">
            <h1 className="text-8xl md:text-9xl font-bold text-white/90 mb-4 tracking-tight">
              404
            </h1>
            <div className="w-24 h-1 bg-orange-500 mx-auto mb-6"></div>
          </div>

          {/* Main Content */}
          <div className="space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">{t.title}</h2>
            <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto leading-relaxed">
              {t.description}
            </p>
          </div>

          {/* Action Buttons */}
          <div className="mt-12 flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              href={`/${locale}`}
              className="inline-flex items-center px-8 py-4 bg-orange-500 text-white font-semibold rounded-lg hover:bg-orange-600 transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                />
              </svg>
              {t.returnHome}
            </Link>

            <Link
              href={`/${locale}/services`}
              className="inline-flex items-center px-8 py-4 bg-transparent border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-gray-900 transition-all duration-300 transform hover:scale-105"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                />
              </svg>
              {t.viewServices}
            </Link>
          </div>

          {/* Additional Help */}
          <div className="mt-16 pt-8 border-t border-white/20">
            <p className="text-white/80 mb-4">{t.helpText}</p>
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <Link
                href={`/${locale}/services`}
                className="text-orange-400 hover:text-orange-300 transition-colors"
              >
                {t.links.services}
              </Link>
              <span className="text-white/40">•</span>
              <Link
                href={`/${locale}/projects-portfolio`}
                className="text-orange-400 hover:text-orange-300 transition-colors"
              >
                {t.links.portfolio}
              </Link>
              <span className="text-white/40">•</span>
              <Link
                href={`/${locale}/contact`}
                className="text-orange-400 hover:text-orange-300 transition-colors"
              >
                {t.links.contact}
              </Link>
              <span className="text-white/40">•</span>
              <Link
                href={`/${locale}/jotun-products`}
                className="text-orange-400 hover:text-orange-300 transition-colors"
              >
                {t.links.products}
              </Link>
            </div>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-black/40 to-transparent z-5"></div>
      </section>

      <FooterSimple locale={locale} />
    </main>
  );
}
