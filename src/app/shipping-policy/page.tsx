import type { Metadata } from 'next';
import { siteConfig } from '@/lib/config';
import { formatPrice } from '@/lib/whatsapp';
import LegalPage from '@/components/ui/LegalPage';

export const metadata: Metadata = {
  title: 'Shipping Policy',
  description:
    'Delivery timelines, charges, store pickup and tracking for Sagar Sportz orders.',
  alternates: { canonical: '/shipping-policy' },
};

export default function ShippingPolicyPage() {
  return (
    <LegalPage
      title="Shipping"
      titleAccent="policy."
      intro="When your order ships, what it costs and how to track it."
      updated="19 September 2026"
      sections={[
        {
          heading: 'Timelines',
          bullets: [
            `Stocked items: ${siteConfig.deliveryEstimate} from order confirmation.`,
            `Custom printed kit: ${siteConfig.customDeliveryEstimate}.`,
            'Large team orders may take longer during tournament season — we confirm a date before you commit.',
          ],
        },
        {
          heading: 'Charges',
          bullets: [
            `Free delivery on orders over ${formatPrice(siteConfig.freeShippingOver)}.`,
            `Flat ${formatPrice(siteConfig.flatShipping)} on orders below that.`,
            'Store pickup is free during opening hours.',
            'Remote pin codes may carry a courier surcharge, which we tell you about before dispatch.',
          ],
        },
        {
          heading: 'Store pickup',
          paragraphs: [
            `Collect from ${siteConfig.address.line1}, ${siteConfig.address.line2}, ${siteConfig.address.city} during ${siteConfig.hours}. We message you on WhatsApp when the order is ready.`,
          ],
        },
        {
          heading: 'Tracking',
          paragraphs: [
            'We share courier and tracking details on WhatsApp once your order is dispatched. If tracking has not moved for more than two working days, message us and we will chase it.',
          ],
        },
        {
          heading: 'Delivery problems',
          bullets: [
            'Check the parcel before signing where possible.',
            'Report visible damage or a missing item within 48 hours of delivery, with photos.',
            'If a parcel is returned to us because nobody was available, we will contact you to arrange redelivery. A second delivery charge may apply.',
          ],
        },
      ]}
    />
  );
}
