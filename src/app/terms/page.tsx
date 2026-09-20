import type { Metadata } from 'next';
import { siteConfig } from '@/lib/config';
import LegalPage from '@/components/ui/LegalPage';

export const metadata: Metadata = {
  title: 'Terms of Service',
  description:
    'The terms that apply when you order custom jerseys, sportswear or sports equipment from Sagar Sportz.',
  alternates: { canonical: '/terms' },
};

export default function TermsPage() {
  return (
    <LegalPage
      title="Terms of"
      titleAccent="service."
      intro="The ground rules for ordering from Sagar Sportz."
      updated="19 September 2026"
      sections={[
        {
          heading: 'Orders',
          paragraphs: [
            'Prices and products shown on this site are an invitation to enquire, not a binding offer. An order is confirmed only once we have agreed the final specification, price and delivery date with you on WhatsApp.',
            'We may decline or cancel an order where a product is unavailable, where a price has been listed in error, or where the artwork supplied cannot lawfully be printed.',
          ],
        },
        {
          heading: 'Pricing',
          paragraphs: [
            'Listed prices are indicative and inclusive of applicable taxes unless stated otherwise. Custom and bulk pricing depends on fabric, print area, quantity and deadline, and is confirmed per order.',
          ],
        },
        {
          heading: 'Payment',
          paragraphs: [
            'This site does not take online payments. Payment terms are agreed when we confirm your order. Custom orders may require an advance before the print run begins.',
          ],
        },
        {
          heading: 'Custom orders and artwork',
          bullets: [
            'You confirm that you own, or have permission to use, any crest, sponsor logo, name or design you send us.',
            'We will not print artwork that infringes a third party’s trademark or copyright, or that is unlawful or offensive.',
            'You are responsible for checking spellings, numbers and colours on the design proof. Once you approve a proof, it goes to print as approved.',
          ],
        },
        {
          heading: 'Colour and sizing tolerance',
          paragraphs: [
            'Screens vary, and printed colour can differ slightly from what you see on your device. Apparel measurements may vary by roughly ±1 inch. These variations are normal and are not defects.',
          ],
        },
        {
          heading: 'Delivery',
          paragraphs: [
            `Delivery estimates (${siteConfig.deliveryEstimate} for stocked items, ${siteConfig.customDeliveryEstimate} for custom kit) are estimates, not guarantees. We will tell you before you order if a deadline is at risk.`,
          ],
        },
        {
          heading: 'Liability',
          paragraphs: [
            'Our liability for any order is limited to the value of that order. We are not liable for indirect losses such as missed fixtures or events, except where the law does not allow that limitation.',
          ],
        },
        {
          heading: 'Contact',
          paragraphs: [
            `${siteConfig.legalName}, ${siteConfig.address.line1}, ${siteConfig.address.line2}, ${siteConfig.address.city}. Email ${siteConfig.email}, phone ${siteConfig.phoneDisplay}.`,
          ],
        },
      ]}
    />
  );
}
