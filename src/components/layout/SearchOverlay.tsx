'use client';

import Link from 'next/link';
import { useEffect, useMemo, useRef, useState } from 'react';
import { Search, X, ArrowRight, TrendingUp } from 'lucide-react';
import { products, effectivePrice } from '@/lib/products';
import { formatPrice } from '@/lib/whatsapp';
import ProductMedia from '@/components/product/ProductMedia';

const SUGGESTIONS = [
  'football jersey',
  'cricket bat',
  'badminton racket',
  'running shoes',
  'custom jersey',
  'tracksuit',
];

const escapeRe = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

/**
 * Scores a product against the query; higher is a better match.
 *
 * Whole-word term matching matters more than raw substring matching here:
 * a plain "includes" search ranks "Cricket Batting Pads" above "Cricket Bat"
 * for the query "cricket bat", because "bat" hides inside "batting".
 */
function score(p: (typeof products)[number], q: string): number {
  const name = p.name.toLowerCase();
  const tags = p.tags.map((t) => t.toLowerCase());
  const haystack = [p.category, p.sport, p.brand, ...p.tags, p.description]
    .join(' ')
    .toLowerCase();

  let total = 0;

  // Whole-phrase match on the product name.
  if (name === q) total += 100;
  else if (name.startsWith(q)) total += 40;
  else if (name.includes(q)) total += 30;

  // Per-term match, strongest when the term is a tag we curated.
  for (const term of q.split(/\s+/).filter(Boolean)) {
    const word = new RegExp(`\\b${escapeRe(term)}\\b`);
    if (tags.includes(term)) total += 25;
    else if (word.test(name)) total += 18;
    else if (word.test(haystack)) total += 10;
    else if (name.includes(term) || haystack.includes(term)) total += 3;
  }

  return total;
}

export default function SearchOverlay({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [query, setQuery] = useState('');
  const [active, setActive] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) {
      setQuery('');
      setActive(0);
      document.body.style.overflow = 'hidden';
      // Wait for the overlay to paint before focusing, or iOS skips it.
      requestAnimationFrame(() => inputRef.current?.focus());
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return products
      .map((p) => ({ p, s: score(p, q) }))
      .filter((x) => x.s > 0)
      .sort((a, b) => b.s - a.s)
      .slice(0, 6)
      .map((x) => x.p);
  }, [query]);

  useEffect(() => setActive(0), [query]);

  if (!open) return null;

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') return onClose();
    if (!results.length) return;
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActive((i) => (i + 1) % results.length);
    }
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActive((i) => (i - 1 + results.length) % results.length);
    }
    if (e.key === 'Enter') {
      const target = results[active];
      if (target) {
        window.location.href = `/product/${target.slug}`;
      }
    }
  };

  return (
    <div
      className="fixed inset-0 z-[100] bg-ink/90 backdrop-blur-md animate-fade-in"
      role="dialog"
      aria-modal="true"
      aria-label="Search products"
      onClick={onClose}
    >
      <div
        className="mx-auto mt-0 w-full max-w-2xl px-4 pt-[max(16px,env(safe-area-inset-top))] sm:mt-[12vh] sm:px-0"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="overflow-hidden rounded-2xl border border-white/12 bg-ink-800 shadow-lift">
          <div className="flex items-center gap-3 border-b border-white/10 px-4">
            <Search className="h-5 w-5 shrink-0 text-bone-400" />
            <input
              ref={inputRef}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={onKeyDown}
              placeholder="Search jerseys, bats, rackets, shoes…"
              aria-label="Search products"
              className="h-16 w-full border-0 bg-transparent text-base text-bone placeholder:text-bone-400/70 focus:outline-none"
            />
            <button
              type="button"
              onClick={onClose}
              aria-label="Close search"
              className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-ink-700 text-bone-400 transition-colors hover:text-bone"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          <div className="max-h-[60vh] overflow-y-auto p-2">
            {!query && (
              <div className="p-3">
                <p className="mb-3 flex items-center gap-1.5 font-display text-[11px] font-bold uppercase tracking-[0.18em] text-bone-400">
                  <TrendingUp className="h-3.5 w-3.5" />
                  Popular searches
                </p>
                <div className="flex flex-wrap gap-2">
                  {SUGGESTIONS.map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => setQuery(s)}
                      className="chip"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {query && results.length === 0 && (
              <p className="p-8 text-center text-sm text-bone-400">
                No products matched “{query}”. Try “jersey”, “bat” or “shoes”.
              </p>
            )}

            {results.map((p, i) => (
              <Link
                key={p.id}
                href={`/product/${p.slug}`}
                onClick={onClose}
                onMouseEnter={() => setActive(i)}
                className={`flex items-center gap-3 rounded-xl p-2.5 transition-colors ${
                  i === active ? 'bg-white/8' : 'hover:bg-white/5'
                }`}
              >
                <ProductMedia
                  art={p.art}
                  image={p.images[0]}
                  alt={p.name}
                  uid={`search-${p.id}`}
                  className="h-14 w-14 shrink-0 rounded-lg"
                  sizes="56px"
                />
                <span className="min-w-0 flex-1">
                  <span className="block truncate font-display text-sm font-bold uppercase">
                    {p.name}
                  </span>
                  <span className="block text-xs capitalize text-bone-400">
                    {p.sport === 'multi' ? 'All sports' : p.sport} ·{' '}
                    {formatPrice(effectivePrice(p))}
                  </span>
                </span>
                <ArrowRight className="h-4 w-4 shrink-0 text-bone-400" />
              </Link>
            ))}

            {query && results.length > 0 && (
              <Link
                href="/shop"
                onClick={onClose}
                className="mt-1 flex items-center justify-center gap-2 rounded-xl p-3 text-xs font-medium text-accent hover:bg-white/5"
              >
                Browse the full catalogue
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
