import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import { getLocaleFromServerCookies } from '@/lib/locale';

export default async function ContactPage() {
  // Get the stored locale using the helper function
  const cookieStore = await cookies();
  const locale = getLocaleFromServerCookies(cookieStore);

  // Redirect to the locale-specific contact page
  redirect(`/${locale}/contact`);
}
