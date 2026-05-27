import type { Metadata } from 'next';
import { Playfair_Display, DM_Sans } from 'next/font/google';
import { PrismicPreview } from '@prismicio/next';
import { repositoryName } from '@/prismicio';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import './globals.css';

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-playfair',
  display: 'swap',
});

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-dm-sans',
  display: 'swap',
});

export const metadata: Metadata = {
  title: { template: '%s | Specchiami', default: 'Specchiami' },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="it" className={`${playfair.variable} ${dmSans.variable}`}>
      <body className="bg-surface text-on-surface font-body-md overflow-x-hidden">
        <Navigation />
        <main>{children}</main>
        <Footer />
        <PrismicPreview repositoryName={repositoryName} />
      </body>
    </html>
  );
}
