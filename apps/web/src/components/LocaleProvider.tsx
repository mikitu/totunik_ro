'use client';

import { useEffect } from 'react';
import { initializeLocale } from '@/lib/locale';

/**
 * LocaleProvider component that initializes the locale on app startup
 * This should be included in the root layout to ensure locale is properly set
 */
export default function LocaleProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Initialize locale on client-side mount
    initializeLocale();
  }, []);

  return <>{children}</>;
}
