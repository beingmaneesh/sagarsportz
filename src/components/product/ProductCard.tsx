'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Heart, Eye, Plus, Sparkles, Check } from 'lucide-react';
import type { Product } from '@/lib/types';
import { discountPercent, effectivePrice } from '@/lib/products';
import { formatPrice } from '@/lib/whatsapp';
import { useCart } from '@/store/cart';
import { useWishlist } from '@/store/wishlist';
import ProductMedia from './ProductMedia';
import QuickView from './QuickView';

interface Props {
  product: Product;
  priority?: boolean;
  /** Fixed width for horizontal rails. */
  rail?: boolean;
}

export default function ProductCard({ product, priority, rail }: Props) {
  const { addItem } = useCart();
  const wishlist = useWishlist();
  const [quickView, setQuickView] = useState(false);
  const [added, setAdded] = useState(false);

  const price = effectivePrice(product);
  const off = discountPercent(product);
  const wished = wishlist.has(product.id);
  const soldOut = product.stock === 0;

  const quickAdd = () => {
    // Customisable kits must go through the configurator, so send the
    // shopper there instead of dropping a blank jersey into the cart.
    addItem({
      productId: product.id,
      slug: product.slug,
      name: product.name,
      price,
      image: product.images[0],
      art: product.art,
      size: product.sizes[Math.min(2, product.sizes.length - 1)],
      color: product.colors[0]?.name,
      quantity: 1,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 1400);
  };

  return (
    <>
      <article
        className={`group relative flex flex-col overflow-hidden rounded-card border border-white/10 bg-ink-800 transition-all duration-300 hover:-translate-y-1 hover:border-white/25 hover:shadow-lift ${
          rail ? 'w-[74vw] shrink-0 sm:w-[300px]' : ''
        }`}
      >
        {/* Media */}
        <div className="relative aspect-[4/5] overflow-hidden">
          <ProductMedia
            art={product.art}
            image={product.images[0]}
            alt={product.name}
            uid={product.id}
            priority={priority}
            className="h-full w-full transition-transform duration-[650ms] ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-[1.07]"
            sizes="(max-width:640px) 74vw, (max-width:1024px) 33vw, 25vw"
          />

          {/* Badges */}
          <div className="pointer-events-none absolute left-3 top-3 flex flex-col items-start gap-1.5">
            {product.customizable && (
              <span className="inline-flex items-center gap-1 rounded-full bg-accent px-2.5 py-1 font-display text-[10px] font-bold uppercase tracking-[0.14em] text-white">
                <Sparkles className="h-3 w-3" />
                Customizable
              </span>
            )}
            {product.newArrival && (
              <span className="rounded-full bg-bone px-2.5 py-1 font-display text-[10px] font-bold uppercase tracking-[0.14em] text-ink">
                New
              </span>
            )}
            {/* Outlined rather than solid: a second filled red pill under the
                "Customizable" badge turns the corner into a red smear. */}
            {off > 0 && (
              <span className="rounded-full border border-accent/70 bg-ink-900/85 px-2.5 py-1 font-display text-[10px] font-bold uppercase tracking-[0.14em] text-accent backdrop-blur">
                {off}% Off
              </span>
            )}
            {soldOut && (
              <span className="rounded-full bg-ink-900/90 px-2.5 py-1 font-display text-[10px] font-bold uppercase tracking-[0.14em] text-bone-400">
                Sold out
              </span>
            )}
          </div>

          {/* Hover actions (desktop). Kept above the card-wide title link. */}
          <div className="absolute inset-x-3 bottom-3 z-10 hidden translate-y-3 gap-2 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 md:flex">
            <button
              type="button"
              onClick={() => setQuickView(true)}
              className="btn btn-light btn-sm flex-1 backdrop-blur"
            >
              <Eye className="h-3.5 w-3.5" />
              Quick view
            </button>
            {product.customizable ? (
              <Link
                href={`/customize?product=${product.slug}`}
                className="btn btn-accent btn-sm flex-1"
              >
                Customize
              </Link>
            ) : (
              <button
                type="button"
                onClick={quickAdd}
                disabled={soldOut}
                className="btn btn-accent btn-sm flex-1"
              >
                {added ? (
                  <>
                    <Check className="h-3.5 w-3.5" /> Added
                  </>
                ) : (
                  <>
                    <Plus className="h-3.5 w-3.5" /> Add
                  </>
                )}
              </button>
            )}
          </div>
        </div>

        {/* Wishlist */}
        <button
          type="button"
          onClick={() => wishlist.toggle(product.id)}
          aria-pressed={wished}
          aria-label={wished ? 'Remove from wishlist' : 'Add to wishlist'}
          className={`absolute right-3 top-3 z-20 grid h-9 w-9 place-items-center rounded-full border backdrop-blur transition-colors ${
            wished
              ? 'border-accent bg-accent text-white'
              : 'border-white/15 bg-ink-900/60 text-bone-400 hover:border-white/40 hover:text-bone'
          }`}
        >
          <Heart className={`h-4 w-4 ${wished ? 'fill-current' : ''}`} />
        </button>

        {/* Body */}
        <div className="flex flex-1 flex-col p-4">
          <p className="mb-1 font-display text-[10px] font-bold uppercase tracking-[0.18em] text-bone-400">
            {product.sport === 'multi' ? 'All sports' : product.sport}
          </p>

          <h3 className="font-display text-[17px] font-bold uppercase leading-tight tracking-tight">
            <Link
              href={`/product/${product.slug}`}
              className="after:absolute after:inset-0 after:content-['']"
            >
              {product.name}
            </Link>
          </h3>

          <div className="mt-2 flex flex-wrap items-center gap-1">
            {product.sizes.slice(0, 5).map((s) => (
              <span
                key={s}
                className="rounded border border-white/10 px-1.5 py-0.5 text-[10px] text-bone-400"
              >
                {s}
              </span>
            ))}
            {product.sizes.length > 5 && (
              <span className="text-[10px] text-bone-400">
                +{product.sizes.length - 5}
              </span>
            )}
          </div>

          <div className="mt-auto flex items-end justify-between pt-3">
            <div>
              <span className="font-display text-xl font-bold">
                {formatPrice(price)}
              </span>
              {product.salePrice && (
                <span className="ml-2 text-xs text-bone-400 line-through">
                  {formatPrice(product.price)}
                </span>
              )}
            </div>

            {/* Mobile add — hover actions aren't reachable on touch */}
            <button
              type="button"
              onClick={() => (soldOut ? null : quickAdd())}
              disabled={soldOut}
              aria-label={`Add ${product.name} to cart`}
              className="relative z-10 grid h-9 w-9 place-items-center rounded-full bg-accent text-white transition-transform active:scale-90 disabled:opacity-40 md:hidden"
            >
              {added ? <Check className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
            </button>
          </div>
        </div>
      </article>

      {quickView && (
        <QuickView product={product} onClose={() => setQuickView(false)} />
      )}
    </>
  );
}
