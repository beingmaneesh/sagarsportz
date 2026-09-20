'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import {
  Search,
  Heart,
  ShoppingBag,
  Menu,
  X,
  MessageCircle,
  ChevronRight,
} from 'lucide-react';
import { siteConfig } from '@/lib/config';
import { generalEnquiry, whatsappLink } from '@/lib/whatsapp';
import { useCart } from '@/store/cart';
import { useWishlist } from '@/store/wishlist';
import Logo from './Logo';
import SearchOverlay from './SearchOverlay';

const NAV = [
  { href: '/', label: 'Home' },
  { href: '/shop', label: 'Shop' },
  { href: '/custom-jerseys', label: 'Custom Jerseys' },
  { href: '/sportswear', label: 'Sportswear' }, 
  { href: '/bulk-orders', label: 'Bulk Orders' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
];

const MOBILE_EXTRA = [
  { href: '/custom-tshirts', label: 'Custom T-Shirts' },
  { href: '/customize', label: 'Jersey Customizer' },
  { href: '/printing', label: 'Printing' },
  { href: '/contact', label: 'Contact' },
  { href: '/faq', label: 'FAQ' },
];

export default function Navbar() {
  const pathname = usePathname();
  const cart = useCart();
  const wishlist = useWishlist();
  const [scrolled, setScrolled] = useState(false);
  const [menu, setMenu] = useState(false);
  const [search, setSearch] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close the mobile menu whenever the route changes.
  useEffect(() => setMenu(false), [pathname]);

  useEffect(() => {
    document.body.style.overflow = menu ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [menu]);

  // Cmd/Ctrl-K opens search, the way shoppers expect on desktop.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setSearch(true);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href);

  return (
    <>
      {/* Announcement rail */}
      <div className="relative z-50 overflow-hidden border-b border-white/10 bg-ink-900">
        <div className="flex whitespace-nowrap py-2 animate-marquee">
          {[0, 1].map((dup) => (
            <div key={dup} className="flex shrink-0 items-center gap-10 pr-10">
              {[
                'Custom jerseys  ',
                'Team pricing from 10 pieces',
                'DTF + sublimation printing in-house',
                'Order directly on WhatsApp',
                
              ].map((t) => (
                <span
                  key={t}
                  className="flex items-center gap-10 font-display text-[11px] font-bold uppercase tracking-[0.2em] text-bone-400"
                >
                  {t}
                  <span className="h-1 w-1 rounded-full bg-accent" aria-hidden />
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      <header
        className={`sticky top-0 z-50 border-b transition-all duration-300 ${
          scrolled
            ? 'border-white/10 bg-ink/85 backdrop-blur-xl'
            : 'border-transparent bg-ink'
        }`}
      >
        <div
          className={`container-site flex items-center justify-between gap-4 transition-all duration-300 ${
            scrolled ? 'h-[60px]' : 'h-[72px]'
          }`}
        >
          <Logo compact={scrolled} priority />

          {/* Desktop nav */}
          <nav
            className="hidden items-center gap-1 lg:flex"
            aria-label="Primary"
          >
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`relative rounded-full px-3.5 py-2 font-display text-[13px] font-bold uppercase tracking-[0.1em] transition-colors ${
                  isActive(item.href)
                    ? 'text-accent'
                    : 'text-bone/80 hover:text-bone'
                }`}
              >
                {item.label}
                {isActive(item.href) && (
                  <span className="absolute inset-x-3.5 -bottom-px h-0.5 rounded-full bg-accent" />
                )}
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={() => setSearch(true)}
              aria-label="Search"
              className="grid h-10 w-10 place-items-center rounded-full text-bone/80 transition-colors hover:bg-white/5 hover:text-bone"
            >
              <Search className="h-[18px] w-[18px]" />
            </button>

            <Link
              href="/wishlist"
              aria-label={`Wishlist, ${wishlist.count} items`}
              className="relative hidden h-10 w-10 place-items-center rounded-full text-bone/80 transition-colors hover:bg-white/5 hover:text-bone sm:grid"
            >
              <Heart className="h-[18px] w-[18px]" />
              {wishlist.count > 0 && (
                <span className="absolute right-1 top-1 grid h-4 min-w-4 place-items-center rounded-full bg-accent px-1 font-display text-[10px] font-bold text-white">
                  {wishlist.count}
                </span>
              )}
            </Link>

            <button
              type="button"
              onClick={cart.openDrawer}
              aria-label={`Cart, ${cart.count} items`}
              className="relative grid h-10 w-10 place-items-center rounded-full text-bone/80 transition-colors hover:bg-white/5 hover:text-bone"
            >
              <ShoppingBag className="h-[18px] w-[18px]" />
              {cart.count > 0 && (
                <span
                  key={cart.count}
                  className="absolute right-0.5 top-1 grid h-4 min-w-4 place-items-center rounded-full bg-accent px-1 font-display text-[10px] font-bold text-white animate-pop"
                >
                  {cart.count}
                </span>
              )}
            </button>

            <a
              href={whatsappLink(generalEnquiry())}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-wa btn-sm ml-1 hidden lg:inline-flex"
            >
              <MessageCircle className="h-4 w-4" />
              WhatsApp
            </a>

            <button
              type="button"
              onClick={() => setMenu(true)}
              aria-label="Open menu"
              className="grid h-10 w-10 place-items-center rounded-full text-bone transition-colors hover:bg-white/5 lg:hidden"
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu */}
      {menu && (
        <div
          className="fixed inset-0 z-[96] bg-ink/80 backdrop-blur-sm lg:hidden"
          onClick={() => setMenu(false)}
          role="dialog"
          aria-modal="true"
          aria-label="Menu"
        >
          <div
            className="absolute inset-y-0 right-0 flex w-[86%] max-w-sm flex-col bg-ink-800 animate-slide-in-right"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-white/10 p-4">
              <Logo />
              <button
                type="button"
                onClick={() => setMenu(false)}
                aria-label="Close menu"
                className="grid h-10 w-10 place-items-center rounded-full bg-ink-700 text-bone-400"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <nav
              className="flex-1 overflow-y-auto p-2"
              aria-label="Mobile primary"
            >
              {[...NAV, ...MOBILE_EXTRA].map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center justify-between rounded-xl px-4 py-3.5 font-display text-lg font-bold uppercase tracking-tight transition-colors ${
                    isActive(item.href)
                      ? 'bg-accent/10 text-accent'
                      : 'text-bone hover:bg-white/5'
                  }`}
                >
                  {item.label}
                  <ChevronRight className="h-4 w-4 opacity-40" />
                </Link>
              ))}
            </nav>

            <div className="space-y-2 border-t border-white/10 p-4">
              <Link href="/customize" className="btn btn-accent btn-md w-full">
                Design your jersey
              </Link>
              <a
                href={whatsappLink(generalEnquiry())}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-wa btn-md w-full"
              >
                <MessageCircle className="h-4 w-4" />
                Chat on WhatsApp
              </a>
              <p className="pt-1 text-center text-xs text-bone-400">
                {siteConfig.phoneDisplay} · {siteConfig.hours}
              </p>
            </div>
          </div>
        </div>
      )}

      <SearchOverlay open={search} onClose={() => setSearch(false)} />
    </>
  );
}
