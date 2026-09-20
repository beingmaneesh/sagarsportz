import type { Metadata } from 'next';
import { siteConfig } from '@/lib/config';
import LegalPage from '@/components/ui/LegalPage';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description:
    'How Sagar Sportz collects, uses and protects the information you share when you order custom kit or sports equipment.',
  alternates: { canonical: '/privacy-policy' },
};

export default function PrivacyPolicyPage() {
  return (
    <LegalPage
      title="Privacy"
      titleAccent="policy."
      intro="What we collect, why we collect it and what we do with it."
      updated="19 September 2026"
      sections={[
        {
          heading: 'What we collect',
          paragraphs: [
            'We only collect what we need to fulfil an order and answer your questions.',
          ],
          bullets: [
            'Contact details you type into the checkout or enquiry forms — name, phone number, delivery address and any notes.',
            'Order details — products, sizes, quantities and customization instructions.',
            'Artwork you send us, such as club crests and sponsor logos.',
            'Basic technical data your browser sends to our hosting provider, such as IP address and page requests.',
          ],
        },
        {
          heading: 'What stays on your device',
          paragraphs: [
            'Your shopping bag and wishlist are stored in your browser using local storage. They never reach our servers unless you choose to send your order to us on WhatsApp.',
            'Logo files you upload in the jersey configurator are previewed in your browser only. They are not uploaded anywhere — you send the file yourself in the WhatsApp chat.',
          ],
        },
        {
          heading: 'How we use your information',
          bullets: [
            'To prepare, confirm and deliver your order.',
            'To send you a design proof and get your approval before printing.',
            'To answer questions about stock, pricing and delivery.',
            'To keep records required for tax and accounting.',
          ],
        },
        {
          heading: 'WhatsApp',
          paragraphs: [
            'Orders and enquiries are handled over WhatsApp. When you tap an order or enquiry button, your message is composed in WhatsApp and sent from your own account. Your use of WhatsApp is governed by WhatsApp’s own terms and privacy policy, which we do not control.',
          ],
        },
        {
          heading: 'Sharing',
          paragraphs: [
            'We do not sell your personal information. We share it only where necessary to complete your order — for example with a courier for delivery — or where the law requires it.',
          ],
        },
        {
          heading: 'Retention',
          paragraphs: [
            'We keep order records for as long as needed to support the order and to meet accounting obligations. Artwork is retained so repeat orders match your previous kit; tell us if you would like it deleted.',
          ],
        },
        {
          heading: 'Your choices',
          paragraphs: [
            `You can ask us what information we hold about you, ask for corrections, or ask us to delete it. Contact us at ${siteConfig.email} or on WhatsApp and we will respond within a reasonable period.`,
          ],
        },
        {
          heading: 'Contact',
          paragraphs: [
            `Questions about this policy: ${siteConfig.email} or ${siteConfig.phoneDisplay}.`,
          ],
        },
      ]}
    />
  );
}
