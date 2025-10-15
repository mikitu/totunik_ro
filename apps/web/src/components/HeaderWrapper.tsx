import { Suspense } from 'react';
import {
  getStrapiMediaURL,
  strapiAPI,
  type StrapiHeader,
  type StrapiNavigationItem,
} from '@/lib/strapi';
import HeaderClient from './HeaderClient';

interface HeaderWrapperProps {
  headerData?: StrapiHeader | null;
  navigationData?: StrapiNavigationItem[];
}

// Loading fallback component
function HeaderFallback() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <div className="relative">
        {/* Top bar placeholder */}
        <div className="bg-white">
          <div className="container mx-auto px-6 py-2 flex items-center justify-between text-sm">
            <div className="flex items-center gap-4">
              {/* Social icons placeholder */}
              <div className="flex gap-2">
                {[1, 2, 3].map(i => (
                  <div key={i} className="w-8 h-8 bg-gray-200 rounded-full animate-pulse" />
                ))}
              </div>
            </div>
            <div className="flex items-center gap-2">
              {/* Language selector placeholder */}
              {[1, 2, 3].map(i => (
                <div key={i} className="w-7 h-7 bg-gray-200 rounded-full animate-pulse" />
              ))}
            </div>
          </div>
        </div>

        {/* Main header placeholder */}
        <div className="bg-gray-900/75">
          <div className="container mx-auto flex items-center justify-between px-6 py-4">
            {/* Logo placeholder */}
            <div className="w-32 h-11 bg-gray-200 rounded animate-pulse" />
            
            {/* Navigation placeholder */}
            <div className="hidden md:flex gap-8">
              {[1, 2, 3, 4].map(i => (
                <div key={i} className="w-16 h-4 bg-gray-200 rounded animate-pulse" />
              ))}
            </div>
            
            {/* CTA placeholder */}
            <div className="hidden md:block w-24 h-10 bg-gray-200 rounded animate-pulse" />
            
            {/* Mobile menu button placeholder */}
            <div className="md:hidden w-6 h-6 bg-gray-200 rounded animate-pulse" />
          </div>
        </div>
      </div>
    </header>
  );
}

export default async function HeaderWrapper({ headerData, navigationData }: HeaderWrapperProps = {}) {
  // Fetch data if not provided as props
  const header = headerData || (await strapiAPI.getHeader());
  const apiNavigation = navigationData || (await strapiAPI.getNavigation());

  // Fallback logo URL
  const logoUrl = header?.logo
    ? getStrapiMediaURL(header.logo) || 'https://totunik.ro/wp-content/uploads/2019/10/logo.png'
    : 'https://totunik.ro/wp-content/uploads/2019/10/logo.png';

  const logoAlt = header?.logo?.alternativeText || 'Totunik logo';

  return (
    <Suspense fallback={<HeaderFallback />}>
      <HeaderClient
        logoUrl={logoUrl}
        logoAlt={logoAlt}
        navItems={apiNavigation || []}
        cta={header?.CtaButton || null}
        socials={header?.socials || []}
      />
    </Suspense>
  );
}
