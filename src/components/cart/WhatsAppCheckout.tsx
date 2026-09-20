'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';
import {
  MessageCircle,
  ShoppingBag,
  Eye,
  EyeOff,
  Check,
  AlertCircle,
} from 'lucide-react';
import { siteConfig } from '@/lib/config';
import {
  buildOrderMessage,
  formatPrice,
  whatsappLink,
  type CustomerDetails,
} from '@/lib/whatsapp';
import { useCart } from '@/store/cart';
import ProductMedia from '@/components/product/ProductMedia';

const EMPTY: CustomerDetails = {
  name: '',
  phone: '',
  address: '',
  city: '',
  pincode: '',
  notes: '',
};

/**
 * Defined at module scope on purpose: a component declared inside the render
 * body gets a new identity every keystroke, which remounts the input and
 * steals focus mid-typing.
 */
function Field({
  id,
  label,
  value,
  onChange,
  placeholder,
  error,
  type = 'text',
  required = false,
  area = false,
  inputMode,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
  placeholder: string;
  error?: string;
  type?: string;
  required?: boolean;
  area?: boolean;
  inputMode?: 'text' | 'tel' | 'numeric';
}) {
  return (
    <div>
      <label className="label" htmlFor={id}>
        {label}
        {required && <span className="ml-1 text-accent">*</span>}
      </label>
      {area ? (
        <textarea
          id={id}
          rows={3}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          aria-invalid={Boolean(error)}
          className={`field resize-none ${error ? '!border-flame' : ''}`}
        />
      ) : (
        <input
          id={id}
          type={type}
          inputMode={inputMode}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          aria-invalid={Boolean(error)}
          className={`field ${error ? '!border-flame' : ''}`}
        />
      )}
      {error && (
        <p
          role="alert"
          className="mt-1.5 flex items-center gap-1 text-xs text-flame"
        >
          <AlertCircle className="h-3 w-3" />
          {error}
        </p>
      )}
    </div>
  );
}

export default function WhatsAppCheckout() {
  const cart = useCart();
  const [details, setDetails] = useState<CustomerDetails>(EMPTY);
  const [touched, setTouched] = useState(false);
  const [showPreview, setShowPreview] = useState(false);

  const set =
    (field: keyof CustomerDetails) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setDetails((d) => ({ ...d, [field]: e.target.value }));

  const errors = useMemo(() => {
    const e: Partial<Record<keyof CustomerDetails, string>> = {};
    if (!details.name.trim()) e.name = 'Please enter your name.';
    const digits = details.phone.replace(/\D/g, '');
    if (!digits) e.phone = 'Please enter a phone number.';
    else if (digits.length < 10) e.phone = 'That number looks too short.';
    if (!details.address.trim()) e.address = 'Please enter a delivery address.';
    return e;
  }, [details]);

  const valid = Object.keys(errors).length === 0;

  const message = useMemo(
    () =>
      buildOrderMessage(
        cart.items,
        {
          subtotal: cart.subtotal,
          shipping: cart.shipping,
          total: cart.total,
        },
        details,
      ),
    [cart.items, cart.subtotal, cart.shipping, cart.total, details],
  );

  if (!cart.ready) {
    return (
      <div className="container-site py-20 text-center text-sm text-bone-400">
        Loading your order…
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
          <h2 className="text-3xl">Nothing to order yet</h2>
          <p className="text-sm text-bone-400">
            Add something to your bag and come back to send the order.
          </p>
          <Link href="/shop" className="btn btn-accent btn-lg">
            Start shopping
          </Link>
        </div>
      </div>
    );
  }

  const errorFor = (field: keyof CustomerDetails) =>
    touched ? errors[field] : undefined;

  return (
    <div className="container-site grid gap-8 py-10 lg:grid-cols-[1fr_400px] lg:gap-12 lg:py-14">
      {/* Details form */}
      <div>
        <div className="rounded-card border border-white/10 bg-ink-800 p-6">
          <h2 className="font-display text-lg font-bold uppercase tracking-tight">
            Your details
          </h2>
          <p className="mt-1 text-sm text-bone-400">
            These go into the WhatsApp message so we can confirm and dispatch
            without a dozen follow-up questions.
          </p>

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <Field
                id="cust-name"
                label="Full name"
                value={details.name}
                onChange={set('name')}
                error={errorFor('name')}
                placeholder="Your name"
                required
              />
            </div>

            <Field
              id="cust-phone"
              label="Phone number"
              value={details.phone}
              onChange={set('phone')}
              error={errorFor('phone')}
              placeholder="98765 43210"
              type="tel"
              inputMode="tel"
              required
            />

            <Field
              id="cust-pincode"
              label="Pincode"
              value={details.pincode ?? ''}
              onChange={set('pincode')}
              placeholder="000000"
              inputMode="numeric"
            />

            <div className="sm:col-span-2">
              <Field
                id="cust-address"
                label="Delivery address"
                value={details.address}
                onChange={set('address')}
                error={errorFor('address')}
                placeholder="House / street / area"
                area
                required
              />
            </div>

            <Field
              id="cust-city"
              label="City"
              value={details.city ?? ''}
              onChange={set('city')}
              placeholder="City"
            />

            <div className="sm:col-span-2">
              <Field
                id="cust-notes"
                label="Order notes"
                value={details.notes ?? ''}
                onChange={set('notes')}
                placeholder="Required date, squad list, colour references…"
                area
              />
            </div>
          </div>
        </div>

        {/* How it works */}
        <ol className="mt-6 grid gap-3 sm:grid-cols-3">
          {[
            {
              n: '1',
              t: 'Send the order',
              b: 'WhatsApp opens with everything filled in.',
            },
            {
              n: '2',
              t: 'We confirm',
              b: 'Stock, final pricing and delivery date.',
            },
            {
              n: '3',
              t: 'Pay & play',
              b: 'Pay on confirmation. We print and ship.',
            },
          ].map((s) => (
            <li
              key={s.n}
              className="rounded-card border border-white/10 bg-ink-800/60 p-4"
            >
              <span className="grid h-7 w-7 place-items-center rounded-full border border-accent/40 font-display text-[11px] font-bold text-accent">
                {s.n}
              </span>
              <p className="mt-2.5 font-display text-sm font-bold uppercase tracking-tight">
                {s.t}
              </p>
              <p className="mt-0.5 text-xs text-bone-400">{s.b}</p>
            </li>
          ))}
        </ol>
      </div>

      {/* Order + send */}
      <aside className="lg:sticky lg:top-28 lg:self-start">
        <div className="rounded-card border border-white/10 bg-ink-800 p-6">
          <h2 className="font-display text-lg font-bold uppercase tracking-tight">
            Your order
          </h2>

          <ul className="mt-4 max-h-64 space-y-3 overflow-y-auto pr-1">
            {cart.items.map((item) => (
              <li key={item.key} className="flex gap-3">
                <ProductMedia
                  art={item.art}
                  image={item.image}
                  alt={item.name}
                  uid={`co-${item.key}`}
                  className="h-14 w-12 shrink-0 rounded"
                  sizes="48px"
                />
                <div className="min-w-0 flex-1">
                  <p className="truncate font-display text-sm font-bold uppercase">
                    {item.name}
                  </p>
                  <p className="text-xs text-bone-400">
                    {[item.size && `Size ${item.size}`, `Qty ${item.quantity}`]
                      .filter(Boolean)
                      .join(' · ')}
                  </p>
                  {item.customisation?.teamName && (
                    <p className="truncate text-xs text-accent">
                      {item.customisation.teamName}
                      {item.customisation.playerNumber &&
                        ` · #${item.customisation.playerNumber}`}
                    </p>
                  )}
                </div>
                <span className="shrink-0 font-display text-sm font-bold">
                  {formatPrice(item.price * item.quantity)}
                </span>
              </li>
            ))}
          </ul>

          <dl className="mt-4 space-y-2 border-t border-white/10 pt-4 text-sm">
            <div className="flex justify-between text-bone-400">
              <dt>Subtotal</dt>
              <dd className="text-bone">{formatPrice(cart.subtotal)}</dd>
            </div>
            <div className="flex justify-between text-bone-400">
              <dt>Delivery</dt>
              <dd className={cart.shipping === 0 ? 'text-accent' : 'text-bone'}>
                {cart.shipping === 0 ? 'Free' : formatPrice(cart.shipping)}
              </dd>
            </div>
            <div className="flex items-center justify-between border-t border-white/10 pt-2.5">
              <dt className="font-display text-lg font-bold uppercase">Total</dt>
              <dd className="font-display text-2xl font-extrabold">
                {formatPrice(cart.total)}
              </dd>
            </div>
          </dl>

          {/* Primary action */}
          {valid ? (
            <a
              href={whatsappLink(message)}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-wa btn-lg mt-5 w-full"
            >
              <MessageCircle className="h-4 w-4" />
              Place order on WhatsApp
            </a>
          ) : (
            <button
              type="button"
              onClick={() => setTouched(true)}
              className="btn btn-wa btn-lg mt-5 w-full"
            >
              <MessageCircle className="h-4 w-4" />
              Place order on WhatsApp
            </button>
          )}

          {touched && !valid && (
            <p role="alert" className="mt-2 text-xs text-flame">
              Add your name, phone number and address above first.
            </p>
          )}

          <button
            type="button"
            onClick={() => setShowPreview((v) => !v)}
            className="btn btn-ghost btn-sm mt-2 w-full"
          >
            {showPreview ? (
              <>
                <EyeOff className="h-3.5 w-3.5" /> Hide message
              </>
            ) : (
              <>
                <Eye className="h-3.5 w-3.5" /> Preview the message
              </>
            )}
          </button>

          {showPreview && (
            <pre className="mt-3 max-h-72 overflow-auto whitespace-pre-wrap rounded-lg bg-ink-900 p-3 font-sans text-[11px] leading-relaxed text-bone-400">
              {message}
            </pre>
          )}

          <ul className="mt-4 space-y-1.5 border-t border-white/10 pt-4 text-xs text-bone-400">
            <li className="flex items-start gap-2">
              <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-accent" />
              No online payment — we confirm everything first.
            </li>
            <li className="flex items-start gap-2">
              <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-accent" />
              Send logo files in the same chat for custom kit.
            </li>
            <li className="flex items-start gap-2">
              <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-accent" />
              Replies during {siteConfig.hours}.
            </li>
          </ul>

          <Link href="/cart" className="btn btn-ghost btn-sm mt-3 w-full">
            Edit your bag
          </Link>
        </div>
      </aside>
    </div>
  );
}
