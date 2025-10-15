import { LoadingProvider } from '@/components/LoadingProvider';
import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import 'swiper/css';
import 'swiper/css/effect-fade';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Totunik - Turnkey Projects & Interior Design',
  description:
    'We are a company specialized in turnkey projects (including interior design) for retail shops and bank offices. More than 10 years of experience in construction, painting, and interior decorations.',
  keywords:
    'turnkey projects, interior design, retail shops, bank offices, construction, painting, furniture, Romania',
  authors: [{ name: 'Totunik' }],
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <LoadingProvider>{children}</LoadingProvider>
      </body>
    </html>
  );
}
