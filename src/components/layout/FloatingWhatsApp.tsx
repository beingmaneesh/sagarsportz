'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { MessageCircle } from 'lucide-react';
import { products } from '@/lib/products';
import { effectivePrice } from '@/lib/products';
import { generalEnquiry, productEnquiry, whatsappLink } from '@/lib/whatsapp';

/**
 * Site-wide WhatsApp button. On a product page it switches its label and
 * pre-fills the message with that product, which is the single highest-intent
 * action on the site.
 */
export default function FloatingWhatsApp() {
  const pathname = usePathname();
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setShown(true), 900);
    return () => clearTimeout(t);
  }, []);

  const slug = pathname.startsWith('/product/')
    ? pathname.split('/product/')[1]?.split('/')[0]
    : null;
  const product = slug ? products.find((p) => p.slug === slug) : null;

  const href = whatsappLink(
    product
      ? productEnquiry(product.name, effectivePrice(product))
      : generalEnquiry(),
  );
  const label = product ? 'Ask about this product' : 'Chat with us';

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className={`group fixed bottom-[calc(76px+env(safe-area-inset-bottom))] right-4 z-[60] flex items-center gap-0 overflow-hidden rounded-full bg-[#25D366] shadow-[0_10px_30px_-8px_rgba(37,211,102,.7)] transition-all duration-500 hover:gap-2 hover:pr-5 sm:bottom-6 ${
        shown ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
      }`}
    >
      <span className="grid h-14 w-14 shrink-0 place-items-center">
        <MessageCircle
          className="h-6 w-6 text-[#052E16]"
          strokeWidth={2.4}
          fill="currentColor"
          fillOpacity={0.15}
        />
      </span>
      <span className="max-w-0 whitespace-nowrap font-display text-sm font-bold uppercase tracking-wide text-[#052E16] opacity-0 transition-all duration-300 group-hover:max-w-[200px] group-hover:opacity-100">
        {label}
      </span>
      {/* Pulse ring */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 animate-ping rounded-full bg-[#25D366] opacity-20 [animation-duration:2.6s]"
      />
    </a>
  );
}
