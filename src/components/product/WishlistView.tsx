'use client';

import Link from 'next/link';
import { Heart } from 'lucide-react';
import { products } from '@/lib/products';
import { useWishlist } from '@/store/wishlist';
import ProductCard from './ProductCard';

export default function WishlistView() {
  const wishlist = useWishlist();

  if (!wishlist.ready) {
    return (
      <div className="container-site py-20 text-center text-sm text-bone-400">
        Loading your wishlist…
      </div>
    );
  }

  const saved = products.filter((p) => wishlist.ids.includes(p.id));

  if (saved.length === 0) {
    return (
      <div className="container-site py-20">
        <div className="mx-auto flex max-w-md flex-col items-center gap-5 text-center">
          <span className="grid h-20 w-20 place-items-center rounded-full bg-ink-800">
            <Heart className="h-8 w-8 text-bone-400" />
          </span>
          <div>
            <h2 className="text-3xl">Nothing saved yet</h2>
            <p className="mt-2 text-sm text-bone-400">
              Tap the heart on any product to keep it here for later.
            </p>
          </div>
          <Link href="/shop" className="btn btn-accent btn-lg">
            Browse products
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container-site py-10 sm:py-14">
      <p className="mb-6 text-sm text-bone-400">
        <span className="font-display font-bold text-bone">{saved.length}</span>{' '}
        {saved.length === 1 ? 'item' : 'items'} saved
      </p>
      <ul className="grid grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-4">
        {saved.map((p) => (
          <li key={p.id}>
            <ProductCard product={p} />
          </li>
        ))}
      </ul>
    </div>
  );
}
