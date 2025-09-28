import Link from 'next/link';
import Image from 'next/image';
import { strapiAPI, type StrapiHeader, type StrapiNavigationItem } from '@/lib/strapi';

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
    : 'https://totunik.ro/wp-content/uploads/2018/07/logo-Copy-1.png';

  const logoAlt = header?.logo?.alternativeText || 'Totunik logo';

  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto flex items-center justify-between p-6">
        {/* Left side - Logo */}
        <Link href="/">
          <Image
            src={logoUrl}
            alt={logoAlt}
            width={120}
            height={40}
            className="h-10 w-auto"
          />
        </Link>

        {/* Center - Navigation */}
        <nav className="flex-1 flex justify-center">
          <div className="space-x-6 text-sm font-medium">
            {apiNavigation && apiNavigation.length > 0 ? (
              apiNavigation.map((item) => {
                // Determine the correct path for the navigation item
                let href = '#';
                if (item.path && item.path !== '') {
                  href = item.path;
                } else if (item.related?.slug) {
                  href = `/${item.related.slug}`;
                } else if (item.title.toLowerCase() === 'home') {
                  href = '/';
                }

                return (
                  <Link
                    key={item.id}
                    href={href}
                    className="hover:text-blue-600"
                  >
                    {item.title}
                  </Link>
                );
              })
            ) : (
              // Fallback navigation
              <>
                <Link href="/" className="hover:text-blue-600">Home</Link>
                <Link href="/services" className="hover:text-blue-600">Services</Link>
                <Link href="/contact" className="hover:text-blue-600">Contact</Link>
              </>
            )}
          </div>
        </nav>

        {/* Right side - CTA Button */}
        <div className="flex items-center">
          {header?.CtaButton ? (
            <Link
              href={header.CtaButton.url || '#'}
              target={header.CtaButton.target || '_self'}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                header.CtaButton.variant === 'outline'
                  ? 'border border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white'
                  : 'bg-blue-600 text-white hover:bg-blue-700'
              }`}
            >
              {header.CtaButton.label}
            </Link>
          ) : (
            // Fallback CTA button
            <Link
              href="/contact"
              className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors"
            >
              Get Quote
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
