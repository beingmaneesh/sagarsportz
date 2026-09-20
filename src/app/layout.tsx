import type { Metadata, Viewport } from 'next';
import { Barlow_Condensed, Inter } from 'next/font/google';
import './globals.css';
import { siteConfig } from '@/lib/config';
import { CartProvider } from '@/store/cart';
import { WishlistProvider } from '@/store/wishlist';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import CartDrawer from '@/components/layout/CartDrawer';
import FloatingWhatsApp from '@/components/layout/FloatingWhatsApp';
import MobileCartBar from '@/components/layout/MobileCartBar';

const display = Barlow_Condensed({
  subsets: ['latin'],
  weight: ['600', '700', '800'],
  style: ['normal', 'italic'],
  variable: '--font-display',
  display: 'swap',
});

const sans = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default:
      'Sagar Sportz | Custom Jerseys, Sportswear & Sports Equipment',
    template: '%s | Sagar Sportz',
  },
  description:
    'Shop custom jerseys, sportswear and sports equipment from Sagar Sportz. Customize team jerseys, T-shirts and sportswear for clubs, schools, academies and athletes.',
  keywords: [
    'custom jerseys',
    'custom football jersey',
    'custom cricket jersey',
    'sublimation printing',
    'DTF printing',
    'team uniforms',
    'sports equipment',
    'sportswear',
    'bulk team orders',
    'Sagar Sportz',
  ],
  applicationName: siteConfig.name,
  authors: [{ name: siteConfig.name }],
  openGraph: {
    type: 'website',
    siteName: siteConfig.name,
    title: 'Sagar Sportz | Custom Jerseys, Sportswear & Sports Equipment',
    description:
      'Custom jerseys, sportswear and sports equipment for teams, schools, clubs, academies and athletes. Order directly on WhatsApp.',
    url: siteConfig.url,
    locale: 'en_IN',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sagar Sportz | Custom Jerseys, Sportswear & Sports Equipment',
    description:
      'Custom jerseys, sportswear and sports equipment. Built for the game.',
  },
  robots: { index: true, follow: true },
  icons: {
    icon: [{ url: '/icon.svg', type: 'image/svg+xml' }],
    apple: '/icon.svg',
  },
};

export const viewport: Viewport = {
  themeColor: '#08090A',
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
};

/** Organisation + store data for rich results. */
const orgJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'SportingGoodsStore',
  name: siteConfig.name,
  description: siteConfig.description,
  url: siteConfig.url,
  telephone: siteConfig.phoneHref,
  email: siteConfig.email,
  hasMap: siteConfig.mapsUrl,
  address: {
    '@type': 'PostalAddress',
    streetAddress: `${siteConfig.address.line1}, ${siteConfig.address.line2}`,
    addressLocality: siteConfig.address.city,
    addressRegion: siteConfig.address.state,
    postalCode: siteConfig.address.pincode,
    addressCountry: siteConfig.address.country,
  },
  // Empty entries are dropped: listing a profile that doesn't exist is worse
  // than listing none.
  sameAs: [
    siteConfig.social.instagram,
    siteConfig.social.facebook,
    siteConfig.social.youtube,
  ].filter(Boolean),
  openingHours: siteConfig.openingHours,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${display.variable} ${sans.variable}`}>
      <body>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[200] focus:rounded-full focus:bg-accent focus:px-4 focus:py-2 focus:font-display focus:text-sm focus:font-bold focus:uppercase focus:text-white"
        >
          Skip to content
        </a>

        <WishlistProvider>
          <CartProvider>
            <Navbar />
            <main id="main">{children}</main>
            <Footer />
            <CartDrawer />
            <FloatingWhatsApp />
            <MobileCartBar />
          </CartProvider>
        </WishlistProvider>

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
        />
      </body>
    </html>
  );
}
