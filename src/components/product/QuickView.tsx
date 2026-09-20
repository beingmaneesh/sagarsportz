'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { X, Star, Sparkles, ShoppingBag, MessageCircle } from 'lucide-react';
import type { Product } from '@/lib/types';
import { effectivePrice } from '@/lib/products';
import { formatPrice, productEnquiry, whatsappLink } from '@/lib/whatsapp';
import { useCart } from '@/store/cart';
import ProductMedia from './ProductMedia';
import QuantityStepper from './QuantityStepper';

export default function QuickView({
  product,
  onClose,
}: {
  product: Product;
  onClose: () => void;
}) {
  const { addItem } = useCart();
  const [size, setSize] = useState(product.sizes[0]);
  const [color, setColor] = useState(product.colors[0]?.name);
  const [qty, setQty] = useState(1);
  const price = effectivePrice(product);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-[90] flex items-end justify-center bg-ink/80 p-0 backdrop-blur-sm animate-fade-in sm:items-center sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-label={`${product.name} quick view`}
      onClick={onClose}
    >
      <div
        className="relative max-h-[92vh] w-full max-w-3xl overflow-y-auto rounded-t-2xl border border-white/12 bg-ink-800 sm:rounded-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close quick view"
          className="absolute right-3 top-3 z-10 grid h-9 w-9 place-items-center rounded-full bg-ink-900/80 text-bone-400 backdrop-blur transition-colors hover:text-bone"
        >
          <X className="h-4 w-4" />
        </button>

        <div className="grid gap-0 sm:grid-cols-2">
          <ProductMedia
            art={product.art}
            image={product.images[0]}
            alt={product.name}
            uid={`qv-${product.id}`}
            className="aspect-square w-full"
            sizes="(max-width:640px) 100vw, 40vw"
          />

          <div className="p-5 sm:p-7">
            <div className="mb-2 flex items-center gap-3">
              <span className="font-display text-[10px] font-bold uppercase tracking-[0.18em] text-bone-400">
                {product.sport === 'multi' ? 'All sports' : product.sport}
              </span>
              <span className="flex items-center gap-1 text-xs text-bone-400">
                <Star className="h-3 w-3 fill-accent text-accent" />
                {product.rating}
              </span>
            </div>

            <h2 className="text-2xl">{product.name}</h2>

            <div className="mt-3 flex items-baseline gap-2">
              <span className="font-display text-2xl font-bold text-accent">
                {formatPrice(price)}
              </span>
              {product.salePrice && (
                <span className="text-sm text-bone-400 line-through">
                  {formatPrice(product.price)}
                </span>
              )}
            </div>

            <p className="mt-3 text-sm leading-relaxed text-bone-400">
              {product.description}
            </p>

            {product.customizable ? (
              <div className="mt-5 rounded-lg border border-accent/30 bg-accent/5 p-4">
                <p className="flex items-center gap-2 font-display text-sm font-bold uppercase tracking-wide text-accent">
                  <Sparkles className="h-4 w-4" />
                  Made to order
                </p>
                <p className="mt-1 text-xs text-bone-400">
                  Set your colours, team name, player name and number in the
                  configurator.
                </p>
                <Link
                  href={`/customize?product=${product.slug}`}
                  className="btn btn-accent btn-md mt-3 w-full"
                >
                  Customize this product
                </Link>
              </div>
            ) : (
              <>
                <div className="mt-5">
                  <span className="label">Size</span>
                  <div className="flex flex-wrap gap-2">
                    {product.sizes.map((s) => (
                      <button
                        key={s}
                        type="button"
                        onClick={() => setSize(s)}
                        className={`chip ${size === s ? 'chip-on' : ''}`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>

                {product.colors.length > 1 && (
                  <div className="mt-4">
                    <span className="label">Colour — {color}</span>
                    <div className="flex flex-wrap gap-2">
                      {product.colors.map((c) => (
                        <button
                          key={c.name}
                          type="button"
                          onClick={() => setColor(c.name)}
                          aria-label={c.name}
                          className={`h-8 w-8 rounded-full border-2 transition-transform hover:scale-110 ${
                            color === c.name
                              ? 'border-accent'
                              : 'border-white/20'
                          }`}
                          style={{ background: c.hex }}
                        />
                      ))}
                    </div>
                  </div>
                )}

                <div className="mt-4">
                  <span className="label">Quantity</span>
                  <QuantityStepper value={qty} onChange={setQty} />
                </div>

                <button
                  type="button"
                  onClick={() => {
                    addItem({
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
                    onClose();
                  }}
                  className="btn btn-accent btn-lg mt-5 w-full"
                >
                  <ShoppingBag className="h-4 w-4" />
                  Add to cart
                </button>
              </>
            )}

            <div className="mt-2.5 grid grid-cols-2 gap-2">
              <a
                href={whatsappLink(productEnquiry(product.name, price))}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-wa btn-md"
              >
                <MessageCircle className="h-4 w-4" />
                WhatsApp
              </a>
              <Link
                href={`/product/${product.slug}`}
                className="btn btn-outline btn-md"
              >
                Full details
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
