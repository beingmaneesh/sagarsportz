'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ShoppingBag, ArrowRight } from 'lucide-react';
import { formatPrice } from '@/lib/whatsapp';
import { useCart } from '@/store/cart';

/**
 * Sticky bottom bar on mobile — appears only once the bag has something in it,
 * so checkout is always one thumb-reach away.
 */
export default function MobileCartBar() {
  const cart = useCart();
  const pathname = usePathname();

  // Pages with their own sticky primary action take precedence.
  const hidden =
    cart.count === 0 ||
    pathname === '/cart' ||
    pathname === '/checkout' ||
    pathname.startsWith('/product/');

  if (hidden) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-[55] border-t border-white/10 bg-ink-800/95 px-4 pb-[max(10px,env(safe-area-inset-bottom))] pt-2.5 backdrop-blur-xl sm:hidden">
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={cart.openDrawer}
          className="flex shrink-0 items-center gap-2 rounded-full bg-ink-700 px-3 py-2"
          aria-label={`View bag, ${cart.count} items`}
        >
          <ShoppingBag className="h-4 w-4 text-accent" />
          <span className="font-display text-sm font-bold">{cart.count}</span>
        </button>

        <div className="min-w-0 flex-1">
          <p className="font-display text-[10px] font-bold uppercase tracking-[0.16em] text-bone-400">
            Total
          </p>
          <p className="font-display text-lg font-bold leading-none">
            {formatPrice(cart.total)}
          </p>
        </div>

        <Link href="/checkout" className="btn btn-accent btn-md shrink-0">
          Checkout
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </div>
  );
}
