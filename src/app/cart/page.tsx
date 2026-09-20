import type { Metadata } from 'next';
import PageHero from '@/components/ui/PageHero';
import CartView from '@/components/cart/CartView';

export const metadata: Metadata = {
  title: 'Your Bag',
  description:
    'Review your Sagar Sportz order — sizes, quantities and customization details — before sending it to us on WhatsApp.',
  robots: { index: false, follow: true },
};

export default function CartPage() {
  return (
    <>
      <PageHero
        eyebrow="Your bag"
        title="Check the"
        titleAccent="kit list."
        description="Quantities, sizes and every customization detail — review it here before you send the order."
        crumbs={[{ label: 'Cart' }]}
      />
      <CartView />
    </>
  );
}
