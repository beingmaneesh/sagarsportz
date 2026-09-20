'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import {
  Star,
  ShoppingBag,
  MessageCircle,
  Sparkles,
  Heart,
  Truck,
  ShieldCheck,
  Ruler,
  Check,
} from 'lucide-react';
import type { Product } from '@/lib/types';
import { siteConfig } from '@/lib/config';
import { readableOn } from '@/lib/brand';
import { discountPercent, effectivePrice } from '@/lib/products';
import { formatPrice, productEnquiry, whatsappLink } from '@/lib/whatsapp';
import { useCart } from '@/store/cart';
import { useWishlist } from '@/store/wishlist';
import ProductMedia from './ProductMedia';
import QuantityStepper from './QuantityStepper';

const SIZE_CHART = [
  { size: 'XS', chest: '34"', length: '26"' },
  { size: 'S', chest: '36"', length: '27"' },
  { size: 'M', chest: '38"', length: '28"' },
  { size: 'L', chest: '40"', length: '29"' },
  { size: 'XL', chest: '42"', length: '30"' },
  { size: 'XXL', chest: '44"', length: '31"' },
];

type TabId = 'details' | 'specs' | 'sizing' | 'delivery';

export default function ProductDetail({ product }: { product: Product }) {
  const cart = useCart();
  const wishlist = useWishlist();
  const buyBoxRef = useRef<HTMLDivElement>(null);
  const [showStickyCta, setShowStickyCta] = useState(false);
  const touchStartX = useRef<number | null>(null);

  const [size, setSize] = useState(
    product.sizes[Math.min(2, product.sizes.length - 1)],
  );
  const [color, setColor] = useState(product.colors[0]?.name);
  const [qty, setQty] = useState(1);
  const [shot, setShot] = useState(0);
  const [tab, setTab] = useState<TabId>('details');
  const [added, setAdded] = useState(false);

  const price = effectivePrice(product);
  const off = discountPercent(product);
  const wished = wishlist.has(product.id);
  const soldOut = product.stock === 0;

  // Without real photography the gallery shows the kit from a few angles /
  // colourways so the viewer still has something to page through.
  const views = product.images.length
    ? product.images
    : ([0, 1, 2, 3] as const).map(() => undefined);

  const artForView = (i: number) => {
    if (i === 0) return product.art;
    const alt = product.colors[i % product.colors.length];
    return {
      ...product.art,
      colors: [alt?.hex ?? product.art.colors[0], product.art.colors[1]] as [
        string,
        string,
      ],
    };
  };

  /** Show the sticky mobile CTA once the real buy buttons scroll out of view. */
  useEffect(() => {
    const el = buyBoxRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => setShowStickyCta(!entry.isIntersecting),
      { rootMargin: '-80px 0px 0px 0px' },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  /** Swipe the main gallery image on touch devices. */
  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    const start = touchStartX.current;
    if (start === null) return;
    const delta = e.changedTouches[0].clientX - start;
    touchStartX.current = null;
    if (Math.abs(delta) < 40) return;
    setShot((i) =>
      delta < 0
        ? (i + 1) % views.length
        : (i - 1 + views.length) % views.length,
    );
  };

  const addToCart = () => {
    cart.addItem({
      productId: product.id,
      slug: product.slug,
      name: product.name,
      price,
      image: product.images[0],
      art: product.art,
      size,
      color,
      quantity: qty,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 1600);
  };

  const TABS: { id: TabId; label: string }[] = [
    { id: 'details', label: 'Details' },
    { id: 'specs', label: 'Specifications' },
    { id: 'sizing', label: 'Size chart' },
    { id: 'delivery', label: 'Delivery & care' },
  ];

  return (
    <div className="container-site py-8 sm:py-12">
      <div className="grid min-w-0 gap-8 lg:grid-cols-2 lg:gap-14">
        {/* ---------------- Gallery ---------------- */}
        <div className="min-w-0 lg:sticky lg:top-28 lg:self-start">
          <div
            className="relative overflow-hidden rounded-card border border-white/10"
            onTouchStart={onTouchStart}
            onTouchEnd={onTouchEnd}
          >
            <ProductMedia
              art={artForView(shot)}
              image={views[shot]}
              alt={`${product.name} — view ${shot + 1}`}
              uid={`pdp-${product.id}-${shot}`}
              priority
              className="aspect-square w-full"
              sizes="(max-width:1024px) 100vw, 46vw"
            />

            {/* Swipe affordance on touch screens */}
            <div className="pointer-events-none absolute inset-x-0 bottom-3 flex justify-center gap-1.5 lg:hidden">
              {views.map((_, i) => (
                <span
                  key={i}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    shot === i ? 'w-5 bg-accent' : 'w-1.5 bg-white/30'
                  }`}
                />
              ))}
            </div>
          </div>

          <div className="mt-3 flex gap-2.5 overflow-x-auto pb-1">
            {views.map((v, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setShot(i)}
                aria-label={`View ${i + 1}`}
                aria-current={shot === i}
                className={`shrink-0 overflow-hidden rounded-lg border transition-colors ${
                  shot === i
                    ? 'border-accent'
                    : 'border-white/12 hover:border-white/30'
                }`}
              >
                <ProductMedia
                  art={artForView(i)}
                  image={v}
                  alt=""
                  uid={`thumb-${product.id}-${i}`}
                  className="h-14 w-14 sm:h-20 sm:w-20"
                  sizes="80px"
                />
              </button>
            ))}
          </div>
        </div>

        {/* ---------------- Buy box ---------------- */}
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-display text-[11px] font-bold uppercase tracking-[0.18em] text-bone-400">
              {product.sport === 'multi' ? 'All sports' : product.sport} ·{' '}
              {product.brand}
            </span>
            {product.customizable && (
              <span className="inline-flex items-center gap-1 rounded-full bg-accent px-2.5 py-1 font-display text-[10px] font-bold uppercase tracking-[0.14em] text-white">
                <Sparkles className="h-3 w-3" />
                Customizable
              </span>
            )}
            {product.bestSeller && (
              <span className="rounded-full border border-white/15 px-2.5 py-1 font-display text-[10px] font-bold uppercase tracking-[0.14em] text-bone-400">
                Best seller
              </span>
            )}
          </div>

          <h1 className="mt-3 text-[clamp(2rem,5vw,3.2rem)]">{product.name}</h1>

          <div className="mt-3 flex flex-wrap items-center gap-4">
            <span
              className="flex items-center gap-1.5"
              aria-label={`Rated ${product.rating} out of 5`}
            >
              <span className="flex gap-0.5">
                {Array.from({ length: 5 }, (_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${
                      i < Math.round(product.rating)
                        ? 'fill-accent text-accent'
                        : 'text-white/15'
                    }`}
                  />
                ))}
              </span>
              <span className="text-sm text-bone-400">
                {product.rating} ({product.reviewCount})
              </span>
            </span>

            <span
              className={`text-sm ${soldOut ? 'text-flame' : 'text-accent'}`}
            >
              {soldOut
                ? 'Out of stock'
                : product.stock < 40
                  ? `Only ${product.stock} left`
                  : 'In stock'}
            </span>
          </div>

          <div className="mt-5 flex items-baseline gap-3">
            <span className="font-display text-[34px] font-extrabold leading-none">
              {formatPrice(price)}
            </span>
            {product.salePrice && (
              <>
                <span className="text-lg text-bone-400 line-through">
                  {formatPrice(product.price)}
                </span>
                <span className="rounded-full border border-accent/70 bg-accent/10 px-2.5 py-1 font-display text-[11px] font-bold uppercase tracking-wide text-accent">
                  Save {off}%
                </span>
              </>
            )}
          </div>
          <p className="mt-1 text-xs text-bone-400">
            Inclusive of all taxes · Team pricing from{' '}
            {siteConfig.bulkMinQuantity} pieces
          </p>

          <p className="mt-5 text-[15px] leading-relaxed text-bone-400 text-pretty">
            {product.description}
          </p>

          {/* Customisable products route to the configurator */}
          {product.customizable && (
            <div className="mt-6 rounded-card border border-accent/30 bg-accent/5 p-5">
              <h2 className="flex items-center gap-2 font-display text-base font-bold uppercase tracking-tight text-accent">
                <Sparkles className="h-4 w-4" />
                Made to order
              </h2>
              <p className="mt-1.5 text-sm text-bone-400">
                Set colours, pattern, team name, player names and numbers — then
                see a live preview before you order.
              </p>
              <Link
                href={`/customize?product=${product.slug}`}
                className="btn btn-accent btn-lg mt-4 w-full"
              >
                Customize this product
              </Link>
            </div>
          )}

          {/* Size */}
          <div className="mt-7">
            <div className="mb-2 flex items-center justify-between">
              <span className="label !mb-0">Size</span>
              <button
                type="button"
                onClick={() => {
                  setTab('sizing');
                  document
                    .getElementById('product-tabs')
                    ?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }}
                className="flex items-center gap-1 text-xs text-bone-400 transition-colors hover:text-accent"
              >
                <Ruler className="h-3.5 w-3.5" />
                Size chart
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {product.sizes.map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => setSize(s)}
                  className={`min-w-[3.25rem] rounded-lg border px-3 py-2.5 font-display text-sm font-bold uppercase transition-all ${
                    size === s
                      ? 'border-accent bg-accent text-white'
                      : 'border-white/15 text-bone hover:border-white/40'
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Colour */}
          {product.colors.length > 1 && (
            <div className="mt-6">
              <span className="label">
                Colour — <span className="text-bone">{color}</span>
              </span>
              <div className="flex flex-wrap gap-2.5">
                {product.colors.map((c) => (
                  <button
                    key={c.name}
                    type="button"
                    onClick={() => setColor(c.name)}
                    aria-label={c.name}
                    aria-pressed={color === c.name}
                    className={`grid h-10 w-10 place-items-center rounded-full border-2 transition-transform hover:scale-110 ${
                      color === c.name ? 'border-accent' : 'border-white/20'
                    }`}
                    style={{ background: c.hex }}
                  >
                    {color === c.name && (
                      <Check
                        className="h-4 w-4"
                        strokeWidth={3}
                        style={{ color: readableOn(c.hex) }}
                      />
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Quantity + actions */}
          <div className="mt-7 flex flex-wrap items-center gap-3">
            <QuantityStepper value={qty} onChange={setQty} />
            <span className="text-xs text-bone-400">
              {formatPrice(price * qty)} total
            </span>
          </div>

          <div ref={buyBoxRef} className="mt-4 flex flex-col gap-2.5">
            <div className="flex gap-2.5">
              <button
                type="button"
                onClick={addToCart}
                disabled={soldOut}
                className="btn btn-accent btn-lg flex-1"
              >
                {added ? (
                  <>
                    <Check className="h-4 w-4" /> Added to bag
                  </>
                ) : (
                  <>
                    <ShoppingBag className="h-4 w-4" /> Add to cart
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={() => wishlist.toggle(product.id)}
                aria-pressed={wished}
                aria-label={wished ? 'Remove from wishlist' : 'Add to wishlist'}
                className={`grid h-[52px] w-[52px] shrink-0 place-items-center rounded-full border transition-colors ${
                  wished
                    ? 'border-accent bg-accent text-white'
                    : 'border-white/20 text-bone-400 hover:border-white/40 hover:text-bone'
                }`}
              >
                <Heart className={`h-5 w-5 ${wished ? 'fill-current' : ''}`} />
              </button>
            </div>

            <a
              href={whatsappLink(productEnquiry(product.name, price))}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-wa btn-lg w-full"
            >
              <MessageCircle className="h-4 w-4" />
              Order on WhatsApp
            </a>
          </div>

          {/* Reassurance */}
          <ul className="mt-6 grid gap-2.5 border-t border-white/10 pt-5 sm:grid-cols-2">
            <li className="flex items-start gap-2.5 text-[13px] text-bone-400">
              <Truck className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
              Free delivery over {formatPrice(siteConfig.freeShippingOver)}
            </li>
            <li className="flex items-start gap-2.5 text-[13px] text-bone-400">
              <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
              Quality checked before dispatch
            </li>
            <li className="flex items-start gap-2.5 text-[13px] text-bone-400">
              <Sparkles className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
              In-house DTF &amp; sublimation printing
            </li>
            <li className="flex items-start gap-2.5 text-[13px] text-bone-400">
              <MessageCircle className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
              Direct support on WhatsApp
            </li>
          </ul>
        </div>
      </div>

      {/* ---------------- Tabs ---------------- */}
      <div id="product-tabs" className="mt-14 scroll-mt-28">
        <div
          role="tablist"
          aria-label="Product information"
          className="flex gap-1 overflow-x-auto border-b border-white/10"
        >
          {TABS.map((t) => (
            <button
              key={t.id}
              role="tab"
              type="button"
              aria-selected={tab === t.id}
              onClick={() => setTab(t.id)}
              className={`relative whitespace-nowrap px-4 py-3 font-display text-sm font-bold uppercase tracking-[0.1em] transition-colors ${
                tab === t.id ? 'text-accent' : 'text-bone-400 hover:text-bone'
              }`}
            >
              {t.label}
              {tab === t.id && (
                <span className="absolute inset-x-2 -bottom-px h-0.5 rounded-full bg-accent" />
              )}
            </button>
          ))}
        </div>

        <div className="py-7">
          {tab === 'details' && (
            <div className="max-w-3xl space-y-4 text-[15px] leading-relaxed text-bone-400">
              <p>{product.details ?? product.description}</p>
              {product.material && (
                <p>
                  <span className="font-display font-bold uppercase text-bone">
                    Material:{' '}
                  </span>
                  {product.material}
                </p>
              )}
              {product.customizable && (
                <p>
                  <span className="font-display font-bold uppercase text-bone">
                    Customization:{' '}
                  </span>
                  Team name, player name, number, club crest and sponsor logos
                  can all be added. Artwork is confirmed with you on WhatsApp
                  before anything goes to print.
                </p>
              )}
            </div>
          )}

          {tab === 'specs' && (
            <dl className="max-w-2xl divide-y divide-white/8">
              {product.specifications.map((s) => (
                <div
                  key={s.label}
                  className="flex flex-wrap justify-between gap-4 py-3"
                >
                  <dt className="font-display text-sm font-bold uppercase tracking-wide text-bone-400">
                    {s.label}
                  </dt>
                  <dd className="text-sm text-bone">{s.value}</dd>
                </div>
              ))}
            </dl>
          )}

          {tab === 'sizing' && (
            <div className="max-w-2xl">
              <div className="overflow-x-auto rounded-card border border-white/10">
                <table className="w-full text-sm">
                  <caption className="sr-only">
                    Size chart in inches for {product.name}
                  </caption>
                  <thead>
                    <tr className="border-b border-white/10 bg-ink-800">
                      {['Size', 'Chest', 'Length'].map((h) => (
                        <th
                          key={h}
                          scope="col"
                          className="px-4 py-3 text-left font-display text-xs font-bold uppercase tracking-[0.14em] text-bone-400"
                        >
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/8">
                    {SIZE_CHART.map((r) => (
                      <tr key={r.size}>
                        <th
                          scope="row"
                          className="px-4 py-2.5 text-left font-display font-bold"
                        >
                          {r.size}
                        </th>
                        <td className="px-4 py-2.5 text-bone-400">{r.chest}</td>
                        <td className="px-4 py-2.5 text-bone-400">
                          {r.length}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="mt-3 text-xs text-bone-400">
                Measurements are indicative for apparel and may vary by ±1 inch.
                For footwear and equipment, sizes follow standard Indian sizing.
                Unsure? Message us on WhatsApp and we&apos;ll help you pick.
              </p>
            </div>
          )}

          {tab === 'delivery' && (
            <div className="grid max-w-4xl gap-6 sm:grid-cols-2">
              <div>
                <h3 className="font-display text-base font-bold uppercase tracking-tight">
                  Delivery
                </h3>
                <ul className="mt-2 space-y-1.5 text-sm text-bone-400">
                  <li>
                    Stocked items: {siteConfig.deliveryEstimate} after
                    confirmation.
                  </li>
                  <li>Custom kit: {siteConfig.customDeliveryEstimate}.</li>
                  <li>
                    Free delivery on orders over{' '}
                    {formatPrice(siteConfig.freeShippingOver)}; otherwise{' '}
                    {formatPrice(siteConfig.flatShipping)} flat.
                  </li>
                  <li>Store pickup available during opening hours.</li>
                </ul>
              </div>
              <div>
                <h3 className="font-display text-base font-bold uppercase tracking-tight">
                  Care
                </h3>
                <p className="mt-2 text-sm text-bone-400">
                  {product.care ??
                    'Wipe clean after use and store dry, away from direct sunlight.'}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Sticky mobile CTA — keeps the primary action in thumb reach once the
          real buy buttons have scrolled away. */}
      <div
        className={`fixed inset-x-0 bottom-0 z-[56] border-t border-white/10 bg-ink-800/95 px-4 pb-[max(10px,env(safe-area-inset-bottom))] pt-2.5 backdrop-blur-xl transition-transform duration-300 sm:hidden ${
          showStickyCta ? 'translate-y-0' : 'translate-y-full'
        }`}
      >
        <div className="flex items-center gap-3">
          <div className="min-w-0 flex-1">
            <p className="truncate font-display text-[11px] font-bold uppercase tracking-[0.14em] text-bone-400">
              {product.name}
            </p>
            <p className="font-display text-lg font-bold leading-none">
              {formatPrice(price)}
              {size && (
                <span className="ml-1.5 text-xs font-medium text-bone-400">
                  Size {size}
                </span>
              )}
            </p>
          </div>

          {product.customizable ? (
            <Link
              href={`/customize?product=${product.slug}`}
              className="btn btn-accent btn-md shrink-0"
            >
              Customize
            </Link>
          ) : (
            <button
              type="button"
              onClick={addToCart}
              disabled={soldOut}
              className="btn btn-accent btn-md shrink-0"
            >
              {added ? <Check className="h-4 w-4" /> : null}
              {added ? 'Added' : 'Add to cart'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
