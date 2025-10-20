'use client';

import { AVAILABLE_LOCALES, getLocaleInfo, setLocale, type Locale } from '@/lib/locale';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';
import { LoadingLink } from './LoadingLink';

interface HeaderSimpleProps {
  locale?: string;
}

export default function HeaderSimple({ locale = 'en' }: HeaderSimpleProps) {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const currentLocale = locale as Locale;
  // const localeInfo = getLocaleInfo(currentLocale); // Unused for now

  const handleLocaleChange = (newLocale: Locale) => {
    setLocale(newLocale);

    // Replace the locale in the current path
    const pathSegments = pathname.split('/').filter(Boolean);
    if (AVAILABLE_LOCALES.includes(pathSegments[0] as Locale)) {
      pathSegments[0] = newLocale;
    } else {
      pathSegments.unshift(newLocale);
    }

    const newPath = '/' + pathSegments.join('/');
    router.push(newPath);
  };

  // Simple navigation items for error/404 pages
  const navItems = [
    { title: 'Home', url: `/${locale}`, id: 1 },
    { title: 'Services', url: `/${locale}/services`, id: 2 },
    { title: 'Portfolio', url: `/${locale}/projects-portfolio`, id: 3 },
    { title: 'Contact', url: `/${locale}/contact`, id: 4 },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <div className="relative">
        {/* Top bar */}
        <div className="bg-gray-900 text-white py-2">
          <div className="container mx-auto px-6">
            <div className="flex justify-between items-center text-sm">
              <div className="flex items-center space-x-4">
                <span>📧 info@totunik.ro</span>
                <span>📞 +40 123 456 789</span>
              </div>

              {/* Language Selector */}
              <div className="relative">
                <select
                  value={currentLocale}
                  onChange={e => handleLocaleChange(e.target.value as Locale)}
                  className="bg-transparent border border-gray-600 rounded px-2 py-1 text-white text-sm focus:outline-none focus:border-orange-500"
                >
                  {AVAILABLE_LOCALES.map(loc => {
                    const info = getLocaleInfo(loc);
                    return (
                      <option key={loc} value={loc} className="bg-gray-900">
                        {info.flag} {info.name}
                      </option>
                    );
                  })}
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Main navigation */}
        <nav className="bg-white shadow-lg">
          <div className="container mx-auto px-6">
            <div className="flex justify-between items-center py-4">
              {/* Logo */}
              <LoadingLink href={`/${locale}`} className="flex items-center">
                <Image
                  src="/next.svg" // Fallback logo
                  alt="Totunik"
                  width={120}
                  height={40}
                  className="h-10 w-auto"
                />
              </LoadingLink>

              {/* Desktop Navigation */}
              <div className="hidden md:flex items-center space-x-8">
                {navItems.map(item => (
                  <LoadingLink
                    key={item.id}
                    href={item.url}
                    className="text-gray-700 hover:text-orange-500 font-medium transition-colors"
                  >
                    {item.title}
                  </LoadingLink>
                ))}

                {/* CTA Button */}
                <LoadingLink
                  href={`/${locale}/contact`}
                  className="bg-orange-500 text-white px-6 py-2 rounded-lg hover:bg-orange-600 transition-colors"
                >
                  Get Quote
                </LoadingLink>
              </div>

              {/* Mobile menu button */}
              <button
                onClick={() => setOpen(!open)}
                className="md:hidden flex items-center px-3 py-2 border rounded text-gray-500 border-gray-600 hover:text-gray-900 hover:border-gray-900"
              >
                <svg className="fill-current h-3 w-3" viewBox="0 0 20 20">
                  <title>Menu</title>
                  <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
                </svg>
              </button>
            </div>

            {/* Mobile Navigation */}
            {open && (
              <div className="md:hidden">
                <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 border-t">
                  {navItems.map(item => (
                    <LoadingLink
                      key={item.id}
                      href={item.url}
                      className="block px-3 py-2 text-gray-700 hover:text-orange-500 font-medium"
                      onClick={() => setOpen(false)}
                    >
                      {item.title}
                    </LoadingLink>
                  ))}
                  <LoadingLink
                    href={`/${locale}/contact`}
                    className="block px-3 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors text-center"
                    onClick={() => setOpen(false)}
                  >
                    Get Quote
                  </LoadingLink>
                </div>
              </div>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
}
