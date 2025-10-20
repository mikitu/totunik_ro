'use client';

import Image from 'next/image';
import Link from 'next/link';

interface FooterSimpleProps {
  locale?: string;
}

export default function FooterSimple({ locale = 'en' }: FooterSimpleProps) {
  // Simple localized content for error/404 pages
  const content = {
    en: {
      company: 'Totunik SRL',
      description: 'Leading distributor of Jotun paints in Romania since 2009.',
      quickLinks: 'Quick Links',
      contact: 'Contact',
      followUs: 'Follow Us',
      copyright: '© 2024 Totunik SRL. All rights reserved.',
      links: {
        home: 'Home',
        services: 'Services',
        portfolio: 'Portfolio',
        contact: 'Contact',
        jotunProducts: 'Jotun Products'
      }
    },
    ro: {
      company: 'Totunik SRL',
      description: 'Distribuitor principal de vopsele Jotun în România din 2009.',
      quickLinks: 'Link-uri Rapide',
      contact: 'Contact',
      followUs: 'Urmărește-ne',
      copyright: '© 2024 Totunik SRL. Toate drepturile rezervate.',
      links: {
        home: 'Acasă',
        services: 'Servicii',
        portfolio: 'Portofoliu',
        contact: 'Contact',
        jotunProducts: 'Produse Jotun'
      }
    },
    tr: {
      company: 'Totunik SRL',
      description: '2009\'dan beri Romanya\'da Jotun boyalarının önde gelen distribütörü.',
      quickLinks: 'Hızlı Bağlantılar',
      contact: 'İletişim',
      followUs: 'Takip Et',
      copyright: '© 2024 Totunik SRL. Tüm hakları saklıdır.',
      links: {
        home: 'Ana Sayfa',
        services: 'Hizmetler',
        portfolio: 'Portföy',
        contact: 'İletişim',
        jotunProducts: 'Jotun Ürünleri'
      }
    }
  };

  const t = content[locale as keyof typeof content] || content.en;

  return (
    <footer className="mt-16 bg-gray-50 border-t border-gray-200">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Column 1: Logo + About */}
          <div className="flex flex-col items-start lg:col-span-1">
            <div className="mb-4">
              <Image 
                src="https://totunik.ro/wp-content/uploads/2019/10/logo.png" 
                alt="Totunik Logo" 
                width={160} 
                height={40} 
                className="h-10 w-auto" 
              />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">{t.company}</h3>
            <p className="text-gray-600 text-sm leading-relaxed mb-4">
              {t.description}
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div className="flex flex-col items-start">
            <h4 className="text-md font-semibold text-gray-900 mb-4">{t.quickLinks}</h4>
            <nav className="flex flex-col space-y-2">
              <Link 
                href={`/${locale}`} 
                className="text-gray-600 hover:text-orange-600 transition-colors text-sm"
              >
                {t.links.home}
              </Link>
              <Link 
                href={`/${locale}/services`} 
                className="text-gray-600 hover:text-orange-600 transition-colors text-sm"
              >
                {t.links.services}
              </Link>
              <Link 
                href={`/${locale}/projects-portfolio`} 
                className="text-gray-600 hover:text-orange-600 transition-colors text-sm"
              >
                {t.links.portfolio}
              </Link>
              <Link 
                href={`/${locale}/contact`} 
                className="text-gray-600 hover:text-orange-600 transition-colors text-sm"
              >
                {t.links.contact}
              </Link>
              <Link 
                href={`/${locale}/jotun-products`} 
                className="text-gray-600 hover:text-orange-600 transition-colors text-sm"
              >
                {t.links.jotunProducts}
              </Link>
            </nav>
          </div>

          {/* Column 3: Contact Info */}
          <div className="flex flex-col items-start">
            <h4 className="text-md font-semibold text-gray-900 mb-4">{t.contact}</h4>
            <div className="space-y-2 text-sm text-gray-600">
              <p>📍 Bucharest, Romania</p>
              <p>📞 +40 21 XXX XXXX</p>
              <p>✉️ office@totunik.ro</p>
            </div>
          </div>

          {/* Column 4: Social Media */}
          <div className="flex flex-col items-start">
            <h4 className="text-md font-semibold text-gray-900 mb-4">{t.followUs}</h4>
            <div className="flex space-x-4">
              <a 
                href="#" 
                className="text-gray-400 hover:text-orange-600 transition-colors"
                aria-label="Facebook"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              <a 
                href="#" 
                className="text-gray-400 hover:text-orange-600 transition-colors"
                aria-label="LinkedIn"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
              <a 
                href="#" 
                className="text-gray-400 hover:text-orange-600 transition-colors"
                aria-label="Instagram"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.618 5.367 11.986 11.988 11.986s11.987-5.368 11.987-11.986C24.014 5.367 18.635.001 12.017.001zM8.449 16.988c-1.297 0-2.448-.49-3.323-1.297C4.198 14.895 3.708 13.744 3.708 12.447s.49-2.448 1.297-3.323c.875-.807 2.026-1.297 3.323-1.297s2.448.49 3.323 1.297c.807.875 1.297 2.026 1.297 3.323s-.49 2.448-1.297 3.323c-.875.807-2.026 1.297-3.323 1.297zm7.718-1.297c-.875.807-2.026 1.297-3.323 1.297s-2.448-.49-3.323-1.297c-.807-.875-1.297-2.026-1.297-3.323s.49-2.448 1.297-3.323c.875-.807 2.026-1.297 3.323-1.297s2.448.49 3.323 1.297c.807.875 1.297 2.026 1.297 3.323s-.49 2.448-1.297 3.323z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-8 border-t border-gray-300">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-gray-600 mb-4 md:mb-0">
              {t.copyright}
            </p>
            <div className="flex space-x-6 text-sm text-gray-600">
              <Link href={`/${locale}/privacy-policy`} className="hover:text-orange-600 transition-colors">
                Privacy Policy
              </Link>
              <Link href={`/${locale}/terms-of-service`} className="hover:text-orange-600 transition-colors">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
