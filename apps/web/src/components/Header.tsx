import { strapiAPI, type StrapiHeader, type StrapiNavigationItem } from '@/lib/strapi';
import HeaderClient from './HeaderClient';
import React, { Suspense } from 'react';

interface HeaderProps {
  headerData?: StrapiHeader | null;
  navigationData?: StrapiNavigationItem[];
}

export default async function Header({ headerData, navigationData }: HeaderProps = {}) {
  // Fetch data if not provided as props
  const header = headerData || await strapiAPI.getHeader();
  const apiNavigation = navigationData || await strapiAPI.getNavigation();

  // Fallback logo URL
  const logoUrl = header?.logo?.url
    ? `${process.env.NEXT_PUBLIC_STRAPI_API_URL || 'http://localhost:1337'}${header.logo.url}`
    : 'https://totunik.ro/wp-content/uploads/2019/10/logo.png';

  const logoAlt = header?.logo?.alternativeText || 'Totunik logo';

  return (
    <Suspense fallback={<div className="fixed top-0 left-0 right-0 z-50 bg-white shadow-sm h-16" />}>
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
