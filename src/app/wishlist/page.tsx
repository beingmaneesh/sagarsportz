import type { Metadata } from 'next';
import PageHero from '@/components/ui/PageHero';
import WishlistView from '@/components/product/WishlistView';

export const metadata: Metadata = {
  title: 'Wishlist',
  description: 'Products you have saved at Sagar Sportz.',
  robots: { index: false, follow: true },
};

export default function WishlistPage() {
  return (
    <>
      <PageHero
        eyebrow="Wishlist"
        title="Saved"
        titleAccent="for later."
        description="Everything you have starred, ready when you are."
        crumbs={[{ label: 'Wishlist' }]}
      />
      <WishlistView />
    </>
  );
}
