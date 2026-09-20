'use client';

import Link from 'next/link';
import { X, ShoppingBag, Trash2, Sparkles, Truck } from 'lucide-react';
import { siteConfig } from '@/lib/config';
import { formatPrice } from '@/lib/whatsapp';
import { useCart } from '@/store/cart';
import ProductMedia from '@/components/product/ProductMedia';
import QuantityStepper from '@/components/product/QuantityStepper';

export default function CartDrawer() {
  const cart = useCart();
  if (!cart.drawerOpen) return null;

  const remaining = siteConfig.freeShippingOver - cart.subtotal;
  const progress = Math.min(
    100,
    (cart.subtotal / siteConfig.freeShippingOver) * 100,
  );

  return (
    <div
      className="fixed inset-0 z-[97] bg-ink/80 backdrop-blur-sm"
      onClick={cart.closeDrawer}
      role="dialog"
      aria-modal="true"
      aria-label="Shopping cart"
    >
      <div
        className="absolute inset-y-0 right-0 flex w-full max-w-md flex-col bg-ink-800 animate-slide-in-right"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-white/10 p-4">
          <h2 className="flex items-center gap-2 font-display text-lg font-bold uppercase tracking-tight">
            <ShoppingBag className="h-5 w-5 text-accent" />
            Your bag
            {cart.count > 0 && (
              <span className="rounded-full bg-white/10 px-2 py-0.5 text-xs">
                {cart.count}
              </span>
            )}
          </h2>
          <button
            type="button"
            onClick={cart.closeDrawer}
            aria-label="Close cart"
            className="grid h-9 w-9 place-items-center rounded-full bg-ink-700 text-bone-400 transition-colors hover:text-bone"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {cart.items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 p-8 text-center">
            <span className="grid h-16 w-16 place-items-center rounded-full bg-ink-700">
              <ShoppingBag className="h-7 w-7 text-bone-400" />
            </span>
            <div>
              <p className="font-display text-xl uppercase">Your bag is empty</p>
              <p className="mt-1 text-sm text-bone-400">
                Start with a custom kit or grab some game-day gear.
              </p>
            </div>
            <div className="mt-2 flex w-full flex-col gap-2">
              <Link
                href="/customize"
                onClick={cart.closeDrawer}
                className="btn btn-accent btn-md w-full"
              >
                Design your jersey
              </Link>
              <Link
                href="/shop"
                onClick={cart.closeDrawer}
                className="btn btn-outline btn-md w-full"
              >
                Shop all products
              </Link>
            </div>
          </div>
        ) : (
          <>
            {/* Free-shipping progress */}
            <div className="border-b border-white/10 px-4 py-3">
              <p className="mb-2 flex items-center gap-1.5 text-xs text-bone-400">
                <Truck className="h-3.5 w-3.5" />
                {remaining > 0 ? (
                  <>
                    Add{' '}
                    <span className="font-bold text-accent">
                      {formatPrice(remaining)}
                    </span>{' '}
                    more for free delivery
                  </>
                ) : (
                  <span className="font-bold text-accent">
                    You’ve unlocked free delivery
                  </span>
                )}
              </p>
              <div className="h-1 overflow-hidden rounded-full bg-white/10">
                <div
                  className="h-full rounded-full bg-accent transition-all duration-500"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>

            <ul className="flex-1 divide-y divide-white/8 overflow-y-auto">
              {cart.items.map((item) => (
                <li key={item.key} className="flex gap-3 p-4">
                  <Link
                    href={`/product/${item.slug}`}
                    onClick={cart.closeDrawer}
                    className="shrink-0"
                  >
                    <ProductMedia
                      art={item.art}
                      image={item.image}
                      alt={item.name}
                      uid={`cart-${item.key}`}
                      className="h-24 w-20 rounded-lg"
                      sizes="80px"
                    />
                  </Link>

                  <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between gap-2">
                      <Link
                        href={`/product/${item.slug}`}
                        onClick={cart.closeDrawer}
                        className="font-display text-sm font-bold uppercase leading-tight hover:text-accent"
                      >
                        {item.name}
                      </Link>
                      <button
                        type="button"
                        onClick={() => cart.removeItem(item.key)}
                        aria-label={`Remove ${item.name}`}
                        className="shrink-0 text-bone-400 transition-colors hover:text-flame"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>

                    <p className="mt-0.5 text-xs text-bone-400">
                      {[item.size && `Size ${item.size}`, item.color]
                        .filter(Boolean)
                        .join(' · ')}
                    </p>

                    {item.customisation && (
                      <div className="mt-2 rounded-lg border border-accent/25 bg-accent/5 p-2">
                        <p className="mb-1 flex items-center gap-1 font-display text-[10px] font-bold uppercase tracking-wider text-accent">
                          <Sparkles className="h-3 w-3" />
                          Customised
                        </p>
                        <dl className="space-y-0.5 text-[11px] text-bone-400">
                          {item.customisation.teamName && (
                            <div>Team: {item.customisation.teamName}</div>
                          )}
                          {item.customisation.playerName && (
                            <div>Player: {item.customisation.playerName}</div>
                          )}
                          {item.customisation.playerNumber && (
                            <div>Number: {item.customisation.playerNumber}</div>
                          )}
                          {item.customisation.jerseyType && (
                            <div>Type: {item.customisation.jerseyType}</div>
                          )}
                          {item.customisation.pattern && (
                            <div>Pattern: {item.customisation.pattern}</div>
                          )}
                          {item.customisation.primaryColor && (
                            <div className="flex items-center gap-1.5">
                              Colours:
                              <span
                                className="inline-block h-3 w-3 rounded-full border border-white/20"
                                style={{
                                  background: item.customisation.primaryColor,
                                }}
                              />
                              {item.customisation.secondaryColor && (
                                <span
                                  className="inline-block h-3 w-3 rounded-full border border-white/20"
                                  style={{
                                    background:
                                      item.customisation.secondaryColor,
                                  }}
                                />
                              )}
                            </div>
                          )}
                          {item.customisation.logoFileName && (
                            <div>Logo: {item.customisation.logoFileName}</div>
                          )}
                          {item.customisation.sponsorFileName && (
                            <div>
                              Sponsor: {item.customisation.sponsorFileName}
                            </div>
                          )}
                        </dl>
                      </div>
                    )}

                    <div className="mt-2.5 flex items-center justify-between">
                      <QuantityStepper
                        size="sm"
                        value={item.quantity}
                        onChange={(n) => cart.setQuantity(item.key, n)}
                      />
                      <span className="font-display font-bold">
                        {formatPrice(item.price * item.quantity)}
                      </span>
                    </div>
                  </div>
                </li>
              ))}
            </ul>

            <div className="border-t border-white/10 p-4">
              <dl className="mb-3 space-y-1.5 text-sm">
                <div className="flex justify-between text-bone-400">
                  <dt>Subtotal</dt>
                  <dd>{formatPrice(cart.subtotal)}</dd>
                </div>
                <div className="flex justify-between text-bone-400">
                  <dt>Delivery</dt>
                  <dd>
                    {cart.shipping === 0 ? (
                      <span className="text-accent">Free</span>
                    ) : (
                      formatPrice(cart.shipping)
                    )}
                  </dd>
                </div>
                <div className="flex justify-between border-t border-white/10 pt-2 font-display text-lg font-bold">
                  <dt>Total</dt>
                  <dd>{formatPrice(cart.total)}</dd>
                </div>
              </dl>

              <Link
                href="/checkout"
                onClick={cart.closeDrawer}
                className="btn btn-accent btn-lg w-full"
              >
                Checkout on WhatsApp
              </Link>
              <Link
                href="/cart"
                onClick={cart.closeDrawer}
                className="btn btn-ghost btn-md mt-1 w-full"
              >
                View full cart
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
