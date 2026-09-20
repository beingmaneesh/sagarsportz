import type { Metadata } from 'next';
import PageHero from '@/components/ui/PageHero';
import WhatsAppCheckout from '@/components/cart/WhatsAppCheckout';

export const metadata: Metadata = {
  title: 'WhatsApp Checkout',
  description:
    'Send your Sagar Sportz order straight to us on WhatsApp. We confirm stock, final pricing and delivery before any payment.',
  robots: { index: false, follow: true },
};

export default function CheckoutPage() {
  return (
    <>
      <PageHero
        eyebrow="Checkout"
        title="Send your"
        titleAccent="order."
        description="Fill in your details and we build the WhatsApp message for you — products, sizes, quantities and every customization detail included."
        crumbs={[{ href: '/cart', label: 'Cart' }, { label: 'Checkout' }]}
      />
      <WhatsAppCheckout />
    </>
  );
}
