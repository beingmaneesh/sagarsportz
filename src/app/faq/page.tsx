import type { Metadata } from 'next';
import Link from 'next/link';
import { MessageCircle } from 'lucide-react';
import { siteConfig } from '@/lib/config';
import { formatPrice, generalEnquiry, whatsappLink } from '@/lib/whatsapp';
import PageHero from '@/components/ui/PageHero';

export const metadata: Metadata = {
  title: 'FAQ — Orders, Customization, Delivery & Returns',
  description:
    'Answers about custom jersey orders, minimum quantities, printing methods, artwork files, delivery times, sizing and returns at Sagar Sportz.',
  alternates: { canonical: '/faq' },
};

const GROUPS = [
  {
    heading: 'Ordering',
    items: [
      {
        q: 'How do I place an order?',
        a: `Add what you want to your bag and choose "Order via WhatsApp" at checkout. The site builds a message containing your products, sizes, quantities and every customization detail. We reply to confirm stock, final pricing and delivery, and you pay once that's agreed.`,
      },
      {
        q: 'Do I have to pay online?',
        a: 'No. There is no online payment on this site. We confirm your order on WhatsApp first and share payment details once everything is agreed.',
      },
      {
        q: 'What is the minimum order?',
        a: `Stocked products have no minimum. Custom kit starts at one piece, and team pricing begins at ${siteConfig.bulkMinQuantity} pieces.`,
      },
      {
        q: 'Can I change my order after sending it?',
        a: 'Yes, as long as it has not gone to print. Custom orders are only sent to the press after you approve the design proof, so tell us on WhatsApp as soon as you know.',
      },
    ],
  },
  {
    heading: 'Customization & printing',
    items: [
      {
        q: 'What is the difference between DTF and sublimation?',
        a: 'Sublimation dyes the design into the fabric — edge-to-edge prints that never crack or peel, used for jerseys and full-print teamwear. DTF (direct to film) transfers a full-colour print onto the surface, which suits logos, names and graphics on cotton or blended T-shirts.',
      },
      {
        q: 'What artwork should I send?',
        a: 'PNG with a transparent background works well. Vector files (SVG, AI, PDF, CDR) are better — they scale to any size without going soft. Send the largest version you have.',
      },
      {
        q: 'Can every player have their own name and number?',
        a: 'Yes. Names and numbers are printed per player at no extra cost on custom jerseys. Send us the squad list on WhatsApp and we match each kit to a player.',
      },
      {
        q: 'Do I see the design before it prints?',
        a: 'Always. We send a design proof on WhatsApp and nothing goes to the press until you approve it.',
      },
      {
        q: 'Can you match our exact club colours?',
        a: 'In most cases, yes. Use the custom colour picker in the configurator, or send us a hex code or Pantone reference and we will match as closely as the fabric allows.',
      },
    ],
  },
  {
    heading: 'Sizing',
    items: [
      {
        q: 'How do I pick the right size?',
        a: 'Every product page has a size chart with chest and length measurements. Apparel runs true to size with an athletic regular fit; if you are between sizes or ordering for juniors, message us and we will advise.',
      },
      {
        q: 'Can I order a mix of sizes for my team?',
        a: 'Yes. Send us the size breakdown on WhatsApp and we will build the order accordingly — mixed sizes do not affect team pricing.',
      },
    ],
  },
  {
    heading: 'Delivery & returns',
    items: [
      {
        q: 'How long does delivery take?',
        a: `Stocked items ship in ${siteConfig.deliveryEstimate}. Custom kit takes ${siteConfig.customDeliveryEstimate}. Tight deadline? Tell us the date before you order and we will say honestly whether we can make it.`,
      },
      {
        q: 'What does delivery cost?',
        a: `Delivery is free on orders over ${formatPrice(siteConfig.freeShippingOver)}. Below that it is a flat ${formatPrice(siteConfig.flatShipping)}. Store pickup is free during opening hours.`,
      },
      {
        q: 'Can I return a custom jersey?',
        a: 'Custom-printed items are made to your specification, so they cannot be returned for a change of mind. If there is a printing fault, a fabric defect or the order does not match your approved proof, we will replace it. Unused stocked items in original condition can be returned within 7 days.',
      },
    ],
  },
];

export default function FaqPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: GROUPS.flatMap((g) =>
      g.items.map((i) => ({
        '@type': 'Question',
        name: i.q,
        acceptedAnswer: { '@type': 'Answer', text: i.a },
      })),
    ),
  };

  return (
    <>
      <PageHero
        eyebrow="FAQ"
        title="Questions,"
        titleAccent="answered."
        description="Ordering, printing, sizing and delivery — the things teams ask us most. Anything missing? Message us."
        crumbs={[{ label: 'FAQ' }]}
      />

      <div className="container-site grid gap-10 py-12 lg:grid-cols-[1fr_320px] lg:gap-14 sm:py-16">
        <div className="space-y-12">
          {GROUPS.map((group) => (
            <section key={group.heading}>
              <h2 className="text-[clamp(1.5rem,3.6vw,2.1rem)]">
                {group.heading}
              </h2>

              <div className="mt-5 divide-y divide-white/10 border-y border-white/10">
                {group.items.map((item) => (
                  <details key={item.q} className="group py-4">
                    <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-display text-base font-bold uppercase tracking-tight text-bone transition-colors hover:text-accent [&::-webkit-details-marker]:hidden">
                      {item.q}
                      <span
                        aria-hidden
                        className="relative grid h-6 w-6 shrink-0 place-items-center rounded-full border border-white/20 text-bone-400 transition-colors group-open:border-accent group-open:text-accent"
                      >
                        <span className="absolute h-2.5 w-px bg-current transition-transform duration-300 group-open:rotate-90 group-open:opacity-0" />
                        <span className="absolute h-px w-2.5 bg-current" />
                      </span>
                    </summary>
                    <p className="mt-3 max-w-3xl text-[15px] leading-relaxed text-bone-400">
                      {item.a}
                    </p>
                  </details>
                ))}
              </div>
            </section>
          ))}
        </div>

        <aside className="lg:sticky lg:top-28 lg:self-start">
          <div className="rounded-card border border-white/10 bg-ink-800 p-6">
            <h2 className="font-display text-lg font-bold uppercase tracking-tight">
              Still stuck?
            </h2>
            <p className="mt-2 text-sm text-bone-400">
              Message us and a person answers — usually within the hour during{' '}
              {siteConfig.hours.toLowerCase()}.
            </p>
            <a
              href={whatsappLink(generalEnquiry())}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-wa btn-md mt-4 w-full"
            >
              <MessageCircle className="h-4 w-4" />
              Ask on WhatsApp
            </a>
            <Link href="/contact" className="btn btn-outline btn-md mt-2 w-full">
              All contact details
            </Link>
          </div>
        </aside>
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </>
  );
}
