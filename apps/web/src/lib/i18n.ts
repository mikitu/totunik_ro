export const LOCALES = [
  { code: 'en', name: 'English', flag: '🇬🇧' },
  { code: 'ro', name: 'Română', flag: '🇷🇴' },
  { code: 'tr', name: 'Türkçe', flag: '🇹🇷' },
] as const;

export type LocaleCode = (typeof LOCALES)[number]['code'];
export const DEFAULT_LOCALE: LocaleCode = 'en';
const STORAGE_KEY = 'locale';

export function isValidLocale(code: string | null | undefined): code is LocaleCode {
  if (!code) return false;
  return LOCALES.some(l => l.code === code);
}

export function getPreferredLocale(): LocaleCode {
  try {
    if (typeof window !== 'undefined') {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      if (isValidLocale(stored)) return stored;
    }
  } catch {}
  return DEFAULT_LOCALE;
}

export function setPreferredLocale(code: LocaleCode) {
  try {
    if (typeof window !== 'undefined') {
      window.localStorage.setItem(STORAGE_KEY, code);
    }
  } catch {}
}

export function extractLocaleFromPathSlug(slugParts: string[] | undefined): LocaleCode | null {
  if (!slugParts || slugParts.length === 0) return null;
  const first = slugParts[0];
  return isValidLocale(first) ? (first as LocaleCode) : null;
}
