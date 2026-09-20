import type { Metadata } from 'next';
import PageHero from '@/components/ui/PageHero';
import ShopBrowser from '@/components/product/ShopBrowser';
import { sportCategories } from '@/lib/categories';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Shop All — Jerseys, Sportswear & Equipment',
  description:
    'Browse the full Sagar Sportz catalogue: custom jerseys, custom T-shirts, sportswear, footwear, sports equipment and protection. Filter by sport, size, price and brand.',
  alternates: { canonical: '/shop' },
};

export default function ShopPage() {
  return (
    <>
      <PageHero
        eyebrow="Catalogue"
        title="Shop"
        titleAccent="everything."
        description="Custom kit, sportswear and equipment across football, cricket, basketball, badminton and running — all in one place."
        crumbs={[{ label: 'Shop' }]}
      >
        <ul className="rail sm:flex-wrap sm:overflow-visible">
          {sportCategories.map((c) => (
            <li key={c.slug}>
              <Link href={`/shop/${c.slug}`} className="chip whitespace-nowrap">
                {c.name}
              </Link>
            </li>
          ))}
        </ul>
      </PageHero>

      <div className="container-site py-10 sm:py-14">
        <ShopBrowser />
      </div>
    </>
  );
}
