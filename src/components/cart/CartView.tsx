'use client';

import Link from 'next/link';
import {
  Trash2,
  Sparkles,
  ShoppingBag,
  ArrowRight,
  Truck,
  MessageCircle,
} from 'lucide-react';
import { siteConfig } from '@/lib/config';
import { formatPrice } from '@/lib/whatsapp';
import { useCart } from '@/store/cart';
import ProductMedia from '@/components/product/ProductMedia';
import QuantityStepper from '@/components/product/QuantityStepper';

export default function CartView() {
  const cart = useCart();

  if (!cart.ready) {
    return (
      <div className="container-site py-20 text-center text-sm text-bone-400">
        Loading your bag…
      </div>
    );
  }

  if (cart.items.length === 0) {
    return (
      <div className="container-site py-20">
        <div className="mx-auto flex max-w-md flex-col items-center gap-5 text-center">
          <span className="grid h-20 w-20 place-items-center rounded-full bg-ink-800">
            <ShoppingBag className="h-8 w-8 text-bone-400" />
          </span>
          <div>
            <h2 className="text-3xl">Your bag is empty</h2>
            <p className="mt-2 text-sm text-bone-400">
              Design a kit for your team, or browse the gear we keep in stock.
            </p>
          </div>
          <div className="flex w-full flex-col gap-2.5 sm:flex-row">
            <Link href="/customize" className="btn btn-accent btn-lg flex-1">
              Design your jersey
            </Link>
            <Link href="/shop" className="btn btn-outline btn-lg flex-1">
              Shop all products
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const hasCustom = cart.items.some((i) => i.customisation);

  return (
    <div className="container-site grid gap-8 py-10 lg:grid-cols-[1fr_380px] lg:gap-12 lg:py-14">
      {/* Lines */}
      <div>
        <ul className="divide-y divide-white/10 border-y border-white/10">
          {cart.items.map((item) => (
            <li key={item.key} className="flex gap-4 py-5">
              <Link href={`/product/${item.slug}`} className="shrink-0">
                <ProductMedia
                  art={item.art}
                  image={item.image}
                  alt={item.name}
                  uid={`cartpage-${item.key}`}
                  className="h-32 w-24 rounded-lg sm:h-36 sm:w-32"
                  sizes="128px"
                />
              </Link>

              <div className="min-w-0 flex-1">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <Link
                      href={`/product/${item.slug}`}
                      className="font-display text-lg font-bold uppercase leading-tight transition-colors hover:text-accent"
                    >
                      {item.name}
                    </Link>
                    <p className="mt-1 text-sm text-bone-400">
                      {[item.size && `Size ${item.size}`, item.color]
                        .filter(Boolean)
                        .join(' · ')}
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => cart.removeItem(item.key)}
                    aria-label={`Remove ${item.name}`}
                    className="flex shrink-0 items-center gap-1.5 text-xs text-bone-400 transition-colors hover:text-flame"
                  >
                    <Trash2 className="h-4 w-4" />
                    <span className="hidden sm:inline">Remove</span>
                  </button>
                </div>

                {item.customisation && (
                  <div className="mt-3 rounded-lg border border-accent/25 bg-accent/5 p-3">
                    <p className="mb-1.5 flex items-center gap-1.5 font-display text-[11px] font-bold uppercase tracking-[0.14em] text-accent">
                      <Sparkles className="h-3.5 w-3.5" />
                      Customization
                    </p>
                    <dl className="grid gap-x-5 gap-y-1 text-xs text-bone-400 sm:grid-cols-2">
                      {[
                        ['Sport', item.customisation.sport],
                        ['Jersey type', item.customisation.jerseyType],
                        ['Pattern', item.customisation.pattern],
                        ['Team name', item.customisation.teamName],
                        ['Player name', item.customisation.playerName],
                        ['Number', item.customisation.playerNumber],
                        ['Team logo', item.customisation.logoFileName],
                        ['Sponsor logo', item.customisation.sponsorFileName],
                        ['Notes', item.customisation.notes],
                      ]
                        .filter(([, v]) => Boolean(v))
                        .map(([k, v]) => (
                          <div key={k as string} className="flex gap-1.5">
                            <dt className="shrink-0">{k}:</dt>
                            <dd className="truncate text-bone">{v}</dd>
                          </div>
                        ))}

                      {item.customisation.primaryColor && (
                        <div className="flex items-center gap-1.5">
                          <dt className="shrink-0">Colours:</dt>
                          <dd className="flex items-center gap-1">
                            <span
                              className="inline-block h-3.5 w-3.5 rounded-full border border-white/25"
                              style={{
                                background: item.customisation.primaryColor,
                              }}
                            />
                            {item.customisation.secondaryColor && (
                              <span
                                className="inline-block h-3.5 w-3.5 rounded-full border border-white/25"
                                style={{
                                  background:
                                    item.customisation.secondaryColor,
                                }}
                              />
                            )}
                          </dd>
                        </div>
                      )}
                    </dl>
                  </div>
                )}

                <div className="mt-3.5 flex flex-wrap items-center justify-between gap-3">
                  <QuantityStepper
                    size="sm"
                    value={item.quantity}
                    onChange={(n) => cart.setQuantity(item.key, n)}
                  />
                  <div className="text-right">
                    <p className="font-display text-lg font-bold">
                      {formatPrice(item.price * item.quantity)}
                    </p>
                    {item.quantity > 1 && (
                      <p className="text-xs text-bone-400">
                        {formatPrice(item.price)} each
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>

        <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
          <Link href="/shop" className="btn btn-ghost btn-md">
            Continue shopping
          </Link>
          <button
            type="button"
            onClick={cart.clear}
            className="text-xs text-bone-400 transition-colors hover:text-flame"
          >
            Clear bag
          </button>
        </div>
      </div>

      {/* Summary */}
      <aside className="lg:sticky lg:top-28 lg:self-start">
        <div className="rounded-card border border-white/10 bg-ink-800 p-6">
          <h2 className="font-display text-lg font-bold uppercase tracking-tight">
            Order summary
          </h2>

          <dl className="mt-5 space-y-2.5 text-sm">
            <div className="flex justify-between text-bone-400">
              <dt>
                Subtotal ({cart.count}{' '}
                {cart.count === 1 ? 'item' : 'items'})
              </dt>
              <dd className="text-bone">{formatPrice(cart.subtotal)}</dd>
            </div>
            <div className="flex justify-between text-bone-400">
              <dt>Estimated delivery</dt>
              <dd className={cart.shipping === 0 ? 'text-accent' : 'text-bone'}>
                {cart.shipping === 0 ? 'Free' : formatPrice(cart.shipping)}
              </dd>
            </div>
            <div className="flex items-start justify-between gap-4 border-t border-white/10 pt-3">
              <dt className="font-display text-lg font-bold uppercase">
                Total
              </dt>
              <dd className="text-right">
                <span className="font-display text-2xl font-extrabold">
                  {formatPrice(cart.total)}
                </span>
                <span className="block text-[11px] text-bone-400">
                  Incl. of taxes
                </span>
              </dd>
            </div>
          </dl>

          <p className="mt-4 flex items-start gap-2 rounded-lg bg-ink-900 p-3 text-xs text-bone-400">
            <Truck className="mt-0.5 h-3.5 w-3.5 shrink-0 text-accent" />
            {hasCustom
              ? `Custom kit ships in ${siteConfig.customDeliveryEstimate}.`
              : `Stocked items ship in ${siteConfig.deliveryEstimate}.`}
          </p>

          <Link href="/checkout" className="btn btn-accent btn-lg mt-5 w-full">
            Order via WhatsApp
            <ArrowRight className="h-4 w-4" />
          </Link>

          <p className="mt-3 flex items-start gap-2 text-xs text-bone-400">
            <MessageCircle className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#25D366]" />
            No online payment needed. We confirm stock, final pricing and
            delivery with you on WhatsApp first.
          </p>
        </div>
      </aside>
    </div>
  );
}
