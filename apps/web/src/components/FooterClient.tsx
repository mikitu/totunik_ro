'use client';
import type { StrapiFooter } from '@/lib/strapi';
import { getStrapiMediaURL } from '@/lib/strapi';
import Image from 'next/image';
import { useState } from 'react';
import { SocialIcon } from './icons/SocialIcon';

export default function FooterClient({ footer }: { footer: StrapiFooter }) {
  const [email, setEmail] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    setSuccess(true);
  };

  if (!footer) return null;
  const logoUrl = footer.logo
    ? getStrapiMediaURL(footer.logo) || 'https://totunik.ro/wp-content/uploads/2019/10/logo.png'
    : 'https://totunik.ro/wp-content/uploads/2019/10/logo.png';
  return (
    <footer className="mt-16 bg-gray-50 border-t border-gray-200">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Column 1: Logo + About + Social */}
          <div className="flex flex-col items-start lg:col-span-1">
            <div className="mb-4">
              {footer.logo?.url ? (
                <Image src={logoUrl} alt="Logo" width={160} height={40} className="h-10 w-auto" />
              ) : (
                <Image
                  src="https://totunik.ro/wp-content/uploads/2019/10/logo.png"
                  alt="Totunik"
                  width={160}
                  height={40}
                  className="h-10 w-auto"
                />
              )}
            </div>
            {footer.description && (
              <p className="text-sm leading-6 text-gray-600 text-left">{footer.description}</p>
            )}
            <div className="flex items-center mt-6 space-x-4">
              {Array.isArray(footer.socials) &&
                footer.socials.map((s, i) => (
                  <div
                    className="mx-2 bg-white-500 rounded-full items-center justify-center flex p-2 shadow-md"
                    key={i}
                  >
                    <a
                      href={s.url || '#'}
                      aria-label={(s.icon || '').toString()}
                      className="text-[22px]"
                      style={{ color: '#FBA442' }}
                    >
                      <SocialIcon name={s.icon} className="w-[22px] h-[22px]" />
                    </a>
                  </div>
                ))}
            </div>
          </div>

          {/* Column 2..n: Navigation link groups */}
          {Array.isArray(footer.navigation) &&
            footer.navigation.map((group, idx) => (
              <div key={idx} className="flex flex-col items-start">
                <h4 className="text-[20px] font-bold mb-2" style={{ color: '#FBA442' }}>
                  {group.title}
                </h4>
                <ul className="space-y-1 text-gray-700">
                  {Array.isArray(group.links) &&
                    group.links.map((link, i) => (
                      <li key={i}>
                        <a href={link.url} className="hover:text-gray-900">
                          {link.label}
                        </a>
                      </li>
                    ))}
                </ul>
              </div>
            ))}

          {/* Newsletter column */}
          {footer.newsletter && (
            <div className="flex flex-col items-start">
              <h4 className="text-[20px] font-bold mb-2" style={{ color: '#FBA442' }}>
                {footer.newsletter.title}
              </h4>
              {footer.newsletter.subtitle && (
                <p className="text-gray-700 mb-4">{footer.newsletter.subtitle}</p>
              )}
              {!success ? (
                <form onSubmit={handleSubscribe} className="flex gap-2 w-full">
                  <input
                    type="email"
                    required
                    placeholder={footer.newsletter.placeholder}
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    className="px-3 py-2 rounded border border-gray-300 w-full focus:outline-none"
                  />
                  <button
                    type="submit"
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
                  >
                    {footer.newsletter.buttonLabel}
                  </button>
                </form>
              ) : (
                <p className="text-green-600 mt-2">{footer.newsletter.successMessage}</p>
              )}
            </div>
          )}
        </div>
      </div>

      <div className="mt-10 text-center text-gray-500 text-sm">{footer.copyright}</div>
    </footer>
  );
}
