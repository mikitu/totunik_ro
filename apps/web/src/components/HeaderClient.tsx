"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import type { StrapiNavigationItem, StrapiButton } from "@/lib/strapi";
import { SocialIcon } from "./icons/SocialIcon";
import { AVAILABLE_LOCALES, setLocale, getLocaleInfo, type Locale } from '@/lib/locale';

interface HeaderClientProps {
  logoUrl: string;
  logoAlt: string;
  navItems: StrapiNavigationItem[];
  cta?: StrapiButton | null;
  socials: { url: string; icon: string }[];
}

export default function HeaderClient({ logoUrl, logoAlt, navItems, cta, socials }: HeaderClientProps) {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const LOCALES = AVAILABLE_LOCALES.map(code => ({
    code,
    ...getLocaleInfo(code)
  }));

  const localeCodes = AVAILABLE_LOCALES;

  const activeLocale = (() => {
    const seg = pathname?.split("/")[1] || "";
    return (localeCodes as readonly string[]).includes(seg) ? seg : "en";
  })();

  const switchLocale = (newLocale: string) => {
    if (!pathname) return;

    // Save the selected locale using the helper function
    if (newLocale && AVAILABLE_LOCALES.includes(newLocale as Locale)) {
      setLocale(newLocale as Locale);
    }

    const segs = pathname.split("/");
    if ((localeCodes as readonly string[]).includes(segs[1])) {
      segs[1] = newLocale;
    } else {
      segs.splice(1, 0, newLocale);
    }
    const nextPath = segs.join("/");
    const qs = searchParams?.toString();
    router.push(qs ? `${nextPath}?${qs}` : nextPath);
  };

  const isExternalUrl = (url: string) => /^https?:\/\//i.test(url);

  const joinPaths = (...segs: (string | undefined)[]) => {
    const parts = segs
      .filter((s): s is string => !!s && s.length > 0)
      .map((s) => s.replace(/^\/+|\/+$/g, ""));
    const joined = parts.join("/");
    return joined ? `/${joined}` : "/";
  };

  const computeHrefFromItem = (item: StrapiNavigationItem): string => {
    if (item.externalPath) return item.externalPath;

    const hasChildren = Array.isArray(item.items) && item.items.length > 0;
    if (hasChildren && item.related?.slug) {
      if (item.path && item.path !== "/" && item.path !== "") {
        return joinPaths(item.path, item.related.slug);
      }
      return `/${item.related.slug}`;
    }

    if (item.path && item.path !== "/" && item.path !== "") return item.path;
    if (item.related?.slug) return `/${item.related.slug}`;
    if (item.title?.toLowerCase() === "home") return "/";
    return "#";
  };

  const computeChildHrefFromParent = (parent: StrapiNavigationItem, child: StrapiNavigationItem): string => {
    // Base from parent: prefer explicit path, else related slug
    const parentBase = (parent.path && parent.path !== "/" && parent.path !== "")
      ? parent.path
      : (parent.related?.slug ? `/${parent.related.slug}` : "/");

    // Child part: prefer related.slug; fallback to last segment of child.path
    const childSlug = child.related?.slug || (() => {
      if (child.path && child.path !== "/") {
        const trimmed = child.path.replace(/^\/+|\/+$/g, "");
        const parts = trimmed.split("/");
        return parts[parts.length - 1] || "";
      }
      return "";
    })();

    if (!childSlug) return parentBase;
    return joinPaths(parentBase, childSlug);
  };


  const withLocale = (url: string): string => {
    if (isExternalUrl(url) || !url.startsWith("/")) return url;
    const firstSeg = url.split("/")[1];
    if ((localeCodes as readonly string[]).includes(firstSeg)) return url;
    return `/${activeLocale}${url}`;
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <div className="relative">
        {/* Top bar: socials left, languages right */
        }
        <div className="bg-white">
          <div className="container mx-auto px-6 py-2 flex items-center justify-between text-sm">
            <div className="flex items-center gap-4" style={{ color: '#FBA442' }}>
              {Array.isArray(socials) && socials.map((s, i) => (
                <div className="mx-2 bg-white-500 rounded-full items-center justify-center flex p-2 shadow-md" key={i}><a href={s.url || "#"} aria-label={(s.icon || "").toString()} className="text-[22px]" style={{ color: '#FBA442' }}>
                  <SocialIcon name={s.icon} className="w-[22px] h-[22px]" />
                </a></div>
              ))}
            </div>            
            <div className="flex items-center gap-2 text-gray-700">
              {LOCALES.map((l) => (
                <button
                  key={l.code}
                  type="button"
                  onClick={() => switchLocale(l.code)}
                  title={l.name}
                  aria-label={`Switch to ${l.name}`}
                  className={`w-7 h-7 rounded-full flex items-center justify-center text-base leading-none hover:opacity-80 ${
                    activeLocale === l.code ? "ring-2 ring-orange-500" : ""
                  }`}
                >
                  <span aria-hidden="true">{l.flag}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Gradient background as requested */}
        <div
          className="absolute inset-0 -z-10"
          style={{
            background:
              "linear-gradient(360deg, rgba(0,0,0,0.75) 100%, #fafafa 100%)",
          }}
        />
        <div className="container mx-auto flex items-center justify-between px-6 py-4 uppercase">
          {/* Left - Logo */}
          <Link href="/" className="shrink-0">
            <Image src={logoUrl} alt={logoAlt} width={140} height={44} className="h-11 w-auto" />
          </Link>

          {/* Mobile toggle */}
          <button
            className="md:hidden inline-flex items-center justify-center p-2 rounded text-orange-500 hover:text-orange-600 focus:outline-none"
            aria-label="Toggle Menu"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? (
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                <path fillRule="evenodd" d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 11-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z" clipRule="evenodd" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                <path fillRule="evenodd" d="M3.75 5.25a.75.75 0 000 1.5h16.5a.75.75 0 000-1.5H3.75zm0 6a.75.75 0 000 1.5h16.5a.75.75 0 000-1.5H3.75zm0 6a.75.75 0 000 1.5h16.5a.75.75 0 000-1.5H3.75z" clipRule="evenodd" />
              </svg>
            )}
          </button>

          {/* Desktop nav */}
          <nav className="hidden md:flex flex-1 justify-center">
            <div className="flex gap-9 text-[13px] tracking-wider font-medium text-white">
              {navItems?.length ? (
                navItems.map((item) => {
                  const href = withLocale(computeHrefFromItem(item));

                  const hasChildren = Array.isArray(item.items) && item.items.length > 0;

                  return (
                    <div key={item.id} className="relative group">
                      <Link href={href} className="hover:text-orange-400 transition-colors inline-flex items-center gap-1">
                        <span>{item.title}</span>
                        {hasChildren && (
                          <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 opacity-90">
                            <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.146l3.71-3.916a.75.75 0 111.08 1.04l-4.24 4.48a.75.75 0 01-1.08 0l-4.24-4.48a.75.75 0 01.02-1.06z" clipRule="evenodd" />
                          </svg>
                        )}
                      </Link>

                      {hasChildren && (
                        <div className="absolute left-0 top-full w-56 bg-white text-gray-800 rounded-md shadow-lg opacity-0 translate-y-2 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto transition-all duration-200">
                          <ul className="py-2">
                            {item.items!.map((child) => {
                              const childHref = withLocale(computeChildHrefFromParent(item, child));
                              return (
                                <li key={child.id}>
                                  <Link href={childHref} className="block px-4 py-2 hover:bg-gray-100">
                                    {child.title}
                                  </Link>
                                </li>
                              );
                            })}
                          </ul>
                        </div>
                      )}
                    </div>
                  );
                })
              ) : (
                <>
                  <Link href={withLocale("/")} className="hover:text-orange-400">Home</Link>
                  <Link href={withLocale("/services")} className="hover:text-orange-400">Services</Link>
                  <Link href={withLocale("/contact")} className="hover:text-orange-400">Contact</Link>
                </>
              )}
            </div>
          </nav>

          {/* Right - CTA */}
          <div className="hidden md:flex items-center">
            {cta ? (
              <Link
                href={cta.url || "#"}
                target={cta.target || "_self"}
                className={`px-4 py-2 rounded-md font-semibold tracking-wide transition-colors ${
                  cta.variant === "outline"
                    ? "border border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white"
                    : "bg-orange-500 text-white hover:bg-orange-600"
                }`}
              >
                {cta.label}
              </Link>
            ) : (
              <Link href="/contact" className="bg-orange-500 text-white px-4 py-2 rounded-md font-semibold tracking-wide hover:bg-orange-600 transition-colors">
                Get Quote
              </Link>
            )}
          </div>
        </div>

        {/* Mobile dropdown */}
        <div className={`md:hidden overflow-hidden transition-[max-height] duration-300 ease-in-out ${open ? "max-h-96" : "max-h-0"}`}>
          <div className="px-6 pb-4 space-y-3 text-sm tracking-wider uppercase bg-white/80 backdrop-blur-sm">
            {navItems?.length ? (
              navItems.map((item) => {
                const href = withLocale(computeHrefFromItem(item));
                return (
                  <Link key={item.id} href={href} className="block py-2 hover:text-orange-500" onClick={() => setOpen(false)}>
                    {item.title}
                  </Link>
                );
              })
            ) : (
              <>
                <Link href={withLocale("/")} className="block py-2 hover:text-orange-500" onClick={() => setOpen(false)}>Home</Link>
                <Link href={withLocale("/services")} className="block py-2 hover:text-orange-500" onClick={() => setOpen(false)}>Services</Link>
                <Link href={withLocale("/contact")} className="block py-2 hover:text-orange-500" onClick={() => setOpen(false)}>Contact</Link>
              </>
            )}

            {/* Mobile CTA */}
            <div className="pt-2">
              {cta ? (
                <Link
                  href={cta.url || "#"}
                  target={cta.target || "_self"}
                  className={`inline-block px-4 py-2 rounded-md font-semibold tracking-wide transition-colors ${
                    cta.variant === "outline"
                      ? "border border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white"
                      : "bg-orange-500 text-white hover:bg-orange-600"
                  }`}
                >
                  {cta.label}
                </Link>
              ) : (
                <Link href="/contact" className="inline-block bg-orange-500 text-white px-4 py-2 rounded-md font-semibold tracking-wide hover:bg-orange-600 transition-colors">
                  Get Quote
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

