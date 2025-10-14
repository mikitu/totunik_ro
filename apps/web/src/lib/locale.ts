/**
 * Locale utility functions for managing user language preferences
 */

// Available locales in the application
// export const AVAILABLE_LOCALES = ['en', 'ro', 'fr', 'tr'] as const;
export const AVAILABLE_LOCALES = ['en', 'ro', 'tr'] as const;
export type Locale = (typeof AVAILABLE_LOCALES)[number];

// Default locale
export const DEFAULT_LOCALE: Locale = 'en';

// Storage keys
const LOCALE_COOKIE_KEY = 'locale';
const LOCALE_STORAGE_KEY = 'locale';

/**
 * Check if a locale is supported by the application
 */
export function isValidLocale(locale: string): locale is Locale {
  return AVAILABLE_LOCALES.includes(locale as Locale);
}

/**
 * Get the device/browser locale
 */
export function getDeviceLocale(): string | null {
  if (typeof window === 'undefined') return null;

  // Try navigator.language first, then navigator.languages
  const browserLocale = navigator.language || navigator.languages?.[0];
  if (!browserLocale) return null;

  // Extract language code (e.g., 'en-US' -> 'en', 'ro-RO' -> 'ro')
  return browserLocale.split('-')[0].toLowerCase();
}

/**
 * Get locale from localStorage
 */
export function getLocaleFromStorage(): string | null {
  if (typeof window === 'undefined') return null;

  try {
    return localStorage.getItem(LOCALE_STORAGE_KEY);
  } catch {
    return null;
  }
}

/**
 * Set locale in localStorage
 */
export function setLocaleInStorage(locale: Locale): void {
  if (typeof window === 'undefined') return;

  try {
    localStorage.setItem(LOCALE_STORAGE_KEY, locale);
  } catch {
    // Ignore localStorage errors (e.g., in private browsing)
  }
}

/**
 * Get locale from cookies (client-side)
 */
export function getLocaleFromCookies(): string | null {
  if (typeof window === 'undefined') return null;

  const cookies = document.cookie.split(';');
  for (const cookie of cookies) {
    const [name, value] = cookie.trim().split('=');
    if (name === LOCALE_COOKIE_KEY) {
      return decodeURIComponent(value);
    }
  }
  return null;
}

/**
 * Set locale in cookies (client-side)
 */
export function setLocaleInCookies(locale: Locale): void {
  if (typeof window === 'undefined') return;

  const maxAge = 60 * 60 * 24 * 365; // 1 year
  document.cookie = `${LOCALE_COOKIE_KEY}=${encodeURIComponent(locale)}; path=/; max-age=${maxAge}; SameSite=Lax`;
}

/**
 * Get the current locale with fallback logic:
 * 1. Check localStorage
 * 2. Check cookies
 * 3. Check device locale
 * 4. Default to English
 */
export function getLocale(): Locale {
  // 1. Try localStorage first
  const storedLocale = getLocaleFromStorage();
  if (storedLocale && isValidLocale(storedLocale)) {
    return storedLocale;
  }

  // 2. Try cookies
  const cookieLocale = getLocaleFromCookies();
  if (cookieLocale && isValidLocale(cookieLocale)) {
    return cookieLocale;
  }

  // 3. Try device locale
  const deviceLocale = getDeviceLocale();
  if (deviceLocale && isValidLocale(deviceLocale)) {
    return deviceLocale;
  }

  // 4. Default to English
  return DEFAULT_LOCALE;
}

/**
 * Set the current locale (saves to both localStorage and cookies)
 */
export function setLocale(locale: Locale): void {
  if (!isValidLocale(locale)) {
    console.warn(`Invalid locale: ${locale}. Using default: ${DEFAULT_LOCALE}`);
    locale = DEFAULT_LOCALE;
  }

  setLocaleInStorage(locale);
  setLocaleInCookies(locale);
}

/**
 * Server-side function to get locale from cookies
 * (for use in server components and API routes)
 */
export function getLocaleFromServerCookies(cookieStore: {
  get?: (key: string) => { value?: string } | undefined;
}): Locale {
  try {
    const locale = cookieStore.get?.(LOCALE_COOKIE_KEY)?.value;
    if (locale && isValidLocale(locale)) {
      return locale;
    }
  } catch {
    // Ignore errors
  }

  return DEFAULT_LOCALE;
}

/**
 * Initialize locale on app startup
 * This should be called once when the app loads
 */
export function initializeLocale(): Locale {
  const currentLocale = getLocale();

  // Ensure the locale is saved in both storage and cookies
  setLocale(currentLocale);

  return currentLocale;
}

/**
 * Get locale display information
 */
export function getLocaleInfo(locale: Locale) {
  const localeInfo = {
    en: { name: 'English', flag: '🇬🇧', nativeName: 'English' },
    ro: { name: 'Romanian', flag: '🇷🇴', nativeName: 'Română' },
    fr: { name: 'French', flag: '🇫🇷', nativeName: 'Français' },
    tr: { name: 'Turkish', flag: '🇹🇷', nativeName: 'Türkçe' },
  };

  return localeInfo[locale] || localeInfo[DEFAULT_LOCALE];
}
