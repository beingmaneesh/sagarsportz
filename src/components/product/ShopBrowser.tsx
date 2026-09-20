'use client';

import { useMemo, useState } from 'react';
import { SlidersHorizontal, X, Check, RotateCcw } from 'lucide-react';
import {
  products as allProducts,
  effectivePrice,
  allBrands,
  allSizes,
} from '@/lib/products';
import { shopCategories, sportFilters } from '@/lib/categories';
import { formatPrice } from '@/lib/whatsapp';
import type { Product } from '@/lib/types';
import ProductCard from './ProductCard';

const SORTS = [
  { id: 'featured', label: 'Featured' },
  { id: 'newest', label: 'Newest' },
  { id: 'price-asc', label: 'Price: Low → High' },
  { id: 'price-desc', label: 'Price: High → Low' },
] as const;

type SortId = (typeof SORTS)[number]['id'];

const GENDERS = ['men', 'women', 'unisex', 'kids'] as const;

export interface ShopBrowserProps {
  /** Restrict the browser to a subset — used by the category landing pages. */
  source?: Product[];
  initialCategory?: string;
  initialSport?: string;
  /** Hide the category filter when the page is already one category. */
  lockCategory?: boolean;
}

const PRICE_MAX = 2500;

export default function ShopBrowser({
  source = allProducts,
  initialCategory,
  initialSport,
  lockCategory = false,
}: ShopBrowserProps) {
  const [categories, setCategories] = useState<string[]>(
    initialCategory ? [initialCategory] : [],
  );
  const [sports, setSports] = useState<string[]>(
    initialSport ? [initialSport] : [],
  );
  const [sizes, setSizes] = useState<string[]>([]);
  const [brands, setBrands] = useState<string[]>([]);
  const [genders, setGenders] = useState<string[]>([]);
  const [maxPrice, setMaxPrice] = useState(PRICE_MAX);
  const [inStockOnly, setInStockOnly] = useState(false);
  const [customOnly, setCustomOnly] = useState(false);
  const [sort, setSort] = useState<SortId>('featured');
  const [drawer, setDrawer] = useState(false);

  const toggle =
    (setter: React.Dispatch<React.SetStateAction<string[]>>) =>
    (value: string) =>
      setter((prev) =>
        prev.includes(value)
          ? prev.filter((v) => v !== value)
          : [...prev, value],
      );

  const activeCount =
    categories.length +
    sports.length +
    sizes.length +
    brands.length +
    genders.length +
    (maxPrice < PRICE_MAX ? 1 : 0) +
    (inStockOnly ? 1 : 0) +
    (customOnly ? 1 : 0);

  const reset = () => {
    setCategories(initialCategory ? [initialCategory] : []);
    setSports(initialSport ? [initialSport] : []);
    setSizes([]);
    setBrands([]);
    setGenders([]);
    setMaxPrice(PRICE_MAX);
    setInStockOnly(false);
    setCustomOnly(false);
  };

  const results = useMemo(() => {
    const list = source.filter((p) => {
      if (categories.length && !categories.includes(p.category)) return false;
      if (sports.length && !sports.includes(p.sport)) return false;
      if (sizes.length && !p.sizes.some((s) => sizes.includes(s))) return false;
      if (brands.length && !brands.includes(p.brand)) return false;
      if (genders.length && !genders.includes(p.gender)) return false;
      if (effectivePrice(p) > maxPrice) return false;
      if (inStockOnly && p.stock === 0) return false;
      if (customOnly && !p.customizable) return false;
      return true;
    });

    const sorted = [...list];
    switch (sort) {
      case 'price-asc':
        sorted.sort((a, b) => effectivePrice(a) - effectivePrice(b));
        break;
      case 'price-desc':
        sorted.sort((a, b) => effectivePrice(b) - effectivePrice(a));
        break;
      case 'newest':
        sorted.sort((a, b) => Number(b.newArrival) - Number(a.newArrival));
        break;
      default:
        sorted.sort((a, b) => Number(b.featured) - Number(a.featured));
    }
    return sorted;
  }, [
    source,
    categories,
    sports,
    sizes,
    brands,
    genders,
    maxPrice,
    inStockOnly,
    customOnly,
    sort,
  ]);

  const FilterGroup = ({
    title,
    children,
  }: {
    title: string;
    children: React.ReactNode;
  }) => (
    <div className="border-b border-white/10 py-5 first:pt-0">
      <h3 className="label mb-3">{title}</h3>
      {children}
    </div>
  );

  const CheckRow = ({
    label,
    checked,
    onChange,
  }: {
    label: string;
    checked: boolean;
    onChange: () => void;
  }) => (
    <button
      type="button"
      onClick={onChange}
      className="flex w-full items-center gap-2.5 py-1.5 text-left text-sm text-bone-400 transition-colors hover:text-bone"
    >
      <span
        className={`grid h-4 w-4 shrink-0 place-items-center rounded border transition-colors ${
          checked ? 'border-accent bg-accent text-white' : 'border-white/25'
        }`}
      >
        {checked && <Check className="h-3 w-3" strokeWidth={3} />}
      </span>
      <span className={checked ? 'text-bone' : ''}>{label}</span>
    </button>
  );

  const filterPanel = (
    <>
      {!lockCategory && (
        <FilterGroup title="Category">
          {shopCategories.map((c) => (
            <CheckRow
              key={c.slug}
              label={c.name}
              checked={categories.includes(c.slug)}
              onChange={() => toggle(setCategories)(c.slug)}
            />
          ))}
        </FilterGroup>
      )}

      <FilterGroup title="Sport">
        {sportFilters.map((s) => (
          <CheckRow
            key={s.slug}
            label={s.name}
            checked={sports.includes(s.slug)}
            onChange={() => toggle(setSports)(s.slug)}
          />
        ))}
      </FilterGroup>

      <FilterGroup title={`Price — up to ${formatPrice(maxPrice)}`}>
        <input
          type="range"
          min={199}
          max={PRICE_MAX}
          step={100}
          value={maxPrice}
          onChange={(e) => setMaxPrice(Number(e.target.value))}
          aria-label="Maximum price"
          className="w-full accent-[#E31E24]"
        />
        <div className="mt-1 flex justify-between text-[11px] text-bone-400">
          <span>{formatPrice(199)}</span>
          <span>{formatPrice(PRICE_MAX)}+</span>
        </div>
      </FilterGroup>

      <FilterGroup title="Size">
        <div className="flex flex-wrap gap-1.5">
          {allSizes.map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => toggle(setSizes)(s)}
              className={`chip !px-2.5 !py-1 ${
                sizes.includes(s) ? 'chip-on' : ''
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </FilterGroup>

      <FilterGroup title="Brand">
        {allBrands.map((b) => (
          <CheckRow
            key={b}
            label={b}
            checked={brands.includes(b)}
            onChange={() => toggle(setBrands)(b)}
          />
        ))}
      </FilterGroup>

      <FilterGroup title="Gender">
        {GENDERS.map((g) => (
          <CheckRow
            key={g}
            label={g.charAt(0).toUpperCase() + g.slice(1)}
            checked={genders.includes(g)}
            onChange={() => toggle(setGenders)(g)}
          />
        ))}
      </FilterGroup>

      <FilterGroup title="Availability">
        <CheckRow
          label="In stock only"
          checked={inStockOnly}
          onChange={() => setInStockOnly((v) => !v)}
        />
        <CheckRow
          label="Customizable only"
          checked={customOnly}
          onChange={() => setCustomOnly((v) => !v)}
        />
      </FilterGroup>
    </>
  );

  return (
    <div className="grid gap-8 lg:grid-cols-[250px_1fr] lg:gap-10">
      {/* Desktop sidebar */}
      <aside className="hidden lg:block">
        <div className="sticky top-28">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-display text-lg font-bold uppercase tracking-tight">
              Filters
            </h2>
            {activeCount > 0 && (
              <button
                type="button"
                onClick={reset}
                className="flex items-center gap-1 text-xs text-bone-400 transition-colors hover:text-accent"
              >
                <RotateCcw className="h-3 w-3" />
                Reset
              </button>
            )}
          </div>
          <div className="max-h-[calc(100vh-180px)] overflow-y-auto pr-2">
            {filterPanel}
          </div>
        </div>
      </aside>

      {/* Results */}
      <div>
        {/* Wraps rather than overflowing: the sort control's widest option
            text ("Price: Low → High") is wider than a 375 px row allows. */}
        <div className="mb-6 flex flex-wrap items-center justify-between gap-x-3 gap-y-2">
          <p className="text-sm text-bone-400">
            <span className="font-display font-bold text-bone">
              {results.length}
            </span>{' '}
            {results.length === 1 ? 'product' : 'products'}
          </p>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setDrawer(true)}
              className="btn btn-outline btn-sm lg:hidden"
            >
              <SlidersHorizontal className="h-3.5 w-3.5" />
              Filters
              {activeCount > 0 && (
                <span className="ml-0.5 grid h-4 min-w-4 place-items-center rounded-full bg-accent px-1 text-[10px] text-white">
                  {activeCount}
                </span>
              )}
            </button>

            <label className="sr-only" htmlFor="sort">
              Sort products
            </label>
            <select
              id="sort"
              value={sort}
              onChange={(e) => setSort(e.target.value as SortId)}
              className="h-9 max-w-full rounded-full border border-white/15 bg-ink-800 px-3 pr-7 text-xs text-bone focus:border-accent focus:outline-none"
            >
              {SORTS.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {results.length === 0 ? (
          <div className="card grid place-items-center p-14 text-center">
            <p className="font-display text-xl uppercase">No products match</p>
            <p className="mt-2 text-sm text-bone-400">
              Try widening the price range or clearing a filter.
            </p>
            <button
              type="button"
              onClick={reset}
              className="btn btn-accent btn-md mt-5"
            >
              Reset filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-3 xl:grid-cols-4">
            {results.map((p, i) => (
              <ProductCard key={p.id} product={p} priority={i < 4} />
            ))}
          </div>
        )}
      </div>

      {/* Mobile filter drawer */}
      {drawer && (
        <div
          className="fixed inset-0 z-[95] bg-ink/80 backdrop-blur-sm lg:hidden"
          onClick={() => setDrawer(false)}
          role="dialog"
          aria-modal="true"
          aria-label="Filters"
        >
          <div
            className="absolute inset-y-0 right-0 flex w-[86%] max-w-sm flex-col bg-ink-800 animate-slide-in-right"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-white/10 p-4">
              <h2 className="font-display text-lg font-bold uppercase">
                Filters
              </h2>
              <button
                type="button"
                onClick={() => setDrawer(false)}
                aria-label="Close filters"
                className="grid h-9 w-9 place-items-center rounded-full bg-ink-700 text-bone-400"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4">{filterPanel}</div>

            <div className="flex gap-2 border-t border-white/10 p-4">
              <button
                type="button"
                onClick={reset}
                className="btn btn-outline btn-md flex-1"
              >
                Reset
              </button>
              <button
                type="button"
                onClick={() => setDrawer(false)}
                className="btn btn-accent btn-md flex-[2]"
              >
                Show {results.length} results
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
