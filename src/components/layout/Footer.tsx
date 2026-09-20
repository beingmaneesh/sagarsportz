import Link from 'next/link';
import {
  Instagram,
  Facebook,
  Youtube,
  MessageCircle,
  Phone,
  Mail,
  MapPin,
  Clock,
} from 'lucide-react';
import { siteConfig } from '@/lib/config';
import { generalEnquiry, whatsappLink } from '@/lib/whatsapp';
import Logo from './Logo';

const SHOP_LINKS = [
  { href: '/', label: 'Home' },
  { href: '/shop', label: 'Shop' },
  { href: '/custom-jerseys', label: 'Custom Jerseys' },
  { href: '/custom-tshirts', label: 'Custom T-Shirts' },
  { href: '/sportswear', label: 'Sportswear' },
  { href: '/equipment', label: 'Equipment' },
  { href: '/printing', label: 'Printing' },
  { href: '/bulk-orders', label: 'Bulk Orders' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
];

const LEGAL_LINKS = [
  { href: '/privacy-policy', label: 'Privacy Policy' },
  { href: '/terms', label: 'Terms' },
  { href: '/shipping-policy', label: 'Shipping Policy' },
  { href: '/returns-policy', label: 'Returns Policy' },
  { href: '/faq', label: 'FAQ' },
];

export default function Footer() {
  const { address, social } = siteConfig;

  return (
    <footer className="relative mt-24 border-t border-white/10 bg-ink-900">
      {/* Oversized brand watermark */}
      <div
        aria-hidden
        className="pointer-events-none select-none overflow-hidden border-b border-white/8"
      >
        <p
          className="whitespace-nowrap py-4 text-center font-display font-extrabold uppercase leading-none tracking-tightest text-transparent"
          style={{
            fontSize: 'clamp(3.5rem,13vw,11rem)',
            WebkitTextStroke: '1px rgba(246,247,248,.09)',
          }}
        >
          Sagar Sportz
        </p>
      </div>

      <div className="container-site grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
        {/* Brand */}
        <div>
          <Logo />
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-bone-400">
            Custom sportswear &amp; sports equipment. We design, print and
            deliver kits for clubs, schools, academies and athletes.
          </p>

          <div className="mt-5 flex gap-2">
            {[
              { href: social.instagram, Icon: Instagram, label: 'Instagram' },
              { href: social.facebook, Icon: Facebook, label: 'Facebook' },
              { href: social.youtube, Icon: Youtube, label: 'YouTube' },
            ]
              // Only profiles that exist — an empty entry in config is hidden
              // rather than linking to a page that isn't there.
              .filter((s) => s.href)
              .map(({ href, Icon, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="grid h-10 w-10 place-items-center rounded-full border border-white/12 text-bone-400 transition-all hover:border-accent hover:text-accent"
              >
                <Icon className="h-[18px] w-[18px]" />
              </a>
            ))}
          </div>
        </div>

        {/* Shop */}
        <nav aria-label="Footer shop links">
          <h3 className="label">Shop</h3>
          <ul className="space-y-2.5">
            {SHOP_LINKS.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className="text-sm text-bone-400 transition-colors hover:text-accent"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Legal */}
        <nav aria-label="Footer policy links">
          <h3 className="label">Information</h3>
          <ul className="space-y-2.5">
            {LEGAL_LINKS.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className="text-sm text-bone-400 transition-colors hover:text-accent"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Support */}
        <div>
          <h3 className="label">Customer support</h3>
          <ul className="space-y-3 text-sm text-bone-400">
            <li>
              <a
                href={whatsappLink(generalEnquiry())}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-2.5 transition-colors hover:text-accent"
              >
                <MessageCircle className="mt-0.5 h-4 w-4 shrink-0 text-[#25D366]" />
                WhatsApp us — fastest reply
              </a>
            </li>
            <li>
              <a
                href={`tel:${siteConfig.phoneHref}`}
                className="flex items-start gap-2.5 transition-colors hover:text-accent"
              >
                <Phone className="mt-0.5 h-4 w-4 shrink-0" />
                {siteConfig.phoneDisplay}
              </a>
            </li>
            <li>
              <a
                href={`mailto:${siteConfig.email}`}
                className="flex items-start gap-2.5 transition-colors hover:text-accent"
              >
                <Mail className="mt-0.5 h-4 w-4 shrink-0" />
                {siteConfig.email}
              </a>
            </li>
            <li className="flex items-start gap-2.5">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0" />
              <span>
                {address.line1}, {address.line2}
                <br />
                {address.city}, {address.state} {address.pincode}
                <a
                  href={siteConfig.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-1 block w-fit text-xs text-accent link-underline"
                >
                  Open in Maps
                </a>
              </span>
            </li>
            <li className="flex items-start gap-2.5">
              <Clock className="mt-0.5 h-4 w-4 shrink-0" />
              {siteConfig.hours}
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/8">
        <div className="container-site flex flex-col items-center justify-between gap-3 py-5 text-center sm:flex-row sm:text-left">
          <p className="text-xs text-bone-400">
            © {new Date().getFullYear()} {siteConfig.legalName}. All rights
            reserved.
          </p>
          <p className="font-display text-xs font-bold uppercase tracking-[0.2em] text-bone-400">
            {siteConfig.tagline}
          </p>
        </div>
      </div>
    </footer>
  );
}
