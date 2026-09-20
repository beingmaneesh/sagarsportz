import type { Metadata } from 'next';
import { products } from '@/lib/products';
import PageHero from '@/components/ui/PageHero';
import ShopBrowser from '@/components/product/ShopBrowser';
import BulkOrders from '@/components/home/BulkOrders';

export const metadata: Metadata = {
  title: 'Sportswear — Tracksuits, Lowers, Tees, Shorts & Caps',
  description:
    'Sports T-shirts, custom T-shirts, jerseys, sports lowers, tracksuits, shorts, caps and sports socks. Training wear built for the session, brandable for your club.',
  alternates: { canonical: '/sportswear' },
};

export default function SportswearPage() {
  // Everything you wear that isn't a match kit or footwear.
  const source = products.filter(
    (p) =>
      p.category === 'sportswear' ||
      p.category === 'accessories' ||
      p.category === 'custom-tshirts',
  );

  return (
    <>
      <PageHero
        eyebrow="Sportswear"
        title="Train hard."
        titleAccent="Look the part."
        description="Sports T-shirts, custom tees, jerseys, lowers, tracksuits, shorts, caps and socks — the everyday layer between match days."
        crumbs={[{ label: 'Sportswear' }]}
      />

      <div className="container-site py-10 sm:py-14">
        <ShopBrowser source={source} />
      </div>

      <BulkOrders />
    </>
  );
}
