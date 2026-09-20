import type { Metadata } from 'next';
import { siteConfig } from '@/lib/config';
import LegalPage from '@/components/ui/LegalPage';

export const metadata: Metadata = {
  title: 'Returns Policy',
  description:
    'Returns, exchanges and replacements for Sagar Sportz orders, including what applies to custom printed kit.',
  alternates: { canonical: '/returns-policy' },
};

export default function ReturnsPolicyPage() {
  return (
    <LegalPage
      title="Returns"
      titleAccent="policy."
      intro="What can be returned, what can't, and how to raise a problem."
      updated="19 September 2026"
      sections={[
        {
          heading: 'Stocked items',
          paragraphs: [
            'Unused stocked items in original condition, with tags and packaging intact, can be returned or exchanged within 7 days of delivery.',
          ],
          bullets: [
            'Footwear must be unworn and returned in its box.',
            'Protective gear and innerwear cannot be returned once worn, for hygiene reasons.',
            'Return shipping is at your cost unless the item was faulty or incorrect.',
          ],
        },
        {
          heading: 'Custom printed items',
          paragraphs: [
            'Custom jerseys, printed T-shirts and personalised teamwear are made to your specification and cannot be returned for a change of mind, a wrong size choice, or a spelling that was approved on the proof.',
            'We will replace or refund a custom item where:',
          ],
          bullets: [
            'The item does not match the design proof you approved.',
            'There is a printing fault such as misalignment, cracking or colour failure.',
            'There is a manufacturing defect in the fabric or stitching.',
          ],
        },
        {
          heading: 'How to raise a return',
          bullets: [
            `Message us on WhatsApp at ${siteConfig.phoneDisplay} within the return window.`,
            'Send your order details and clear photos of the item and the issue.',
            'We respond with next steps, usually within one working day.',
          ],
        },
        {
          heading: 'Refunds',
          paragraphs: [
            'Approved refunds are issued to the original payment method once the returned item reaches us and passes inspection. Allow 5–7 working days for the amount to appear, depending on your bank.',
          ],
        },
        {
          heading: 'Exchanges',
          paragraphs: [
            'Size exchanges on stocked items are subject to availability. If the size you need is out of stock we will offer a refund or an alternative.',
          ],
        },
      ]}
    />
  );
}
