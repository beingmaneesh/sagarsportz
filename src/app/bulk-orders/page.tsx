import type { Metadata } from 'next';
import {
  GraduationCap,
  Trophy,
  Flag,
  Dumbbell,
  Building2,
  Users,
  Check,
} from 'lucide-react';
import { siteConfig } from '@/lib/config';
import { formatPrice } from '@/lib/whatsapp';
import PageHero from '@/components/ui/PageHero';
import BulkQuoteForm from '@/components/bulk/BulkQuoteForm';
import PrintingServices from '@/components/home/PrintingServices';
import Reveal from '@/components/ui/Reveal';

export const metadata: Metadata = {
  title: 'Bulk & Team Orders — Custom Kit for Clubs, Schools & Companies',
  description:
    'Custom teamwear from 10 to 500 pieces for schools, football clubs, cricket teams, academies, corporate teams and tournaments. Squad pricing, one design approval, one delivery.',
  alternates: { canonical: '/bulk-orders' },
};

const SEGMENTS = [
  {
    Icon: GraduationCap,
    title: 'Schools',
    body: 'House kits, sports day tees and PE uniforms with school crests.',
  },
  {
    Icon: Flag,
    title: 'Football clubs',
    body: 'Home, away and keeper kits with numbers for the full squad.',
  },
  {
    Icon: Trophy,
    title: 'Cricket teams',
    body: 'Coloured kit and whites, plus matching trousers and caps.',
  },
  {
    Icon: Dumbbell,
    title: 'Sports academies',
    body: 'Training tees and tracksuits in academy colours, restocked each intake.',
  },
  {
    Icon: Building2,
    title: 'Corporate teams',
    body: 'Company sports days, CSR runs and branded event tees.',
  },
  {
    Icon: Users,
    title: 'Tournaments',
    body: 'Multiple teams, multiple colourways, delivered to one deadline.',
  },
];

/** TODO(client): confirm these slabs against real costing before launch. */
const TIERS = [
  {
    range: '10 – 24 pieces',
    note: 'Entry team pricing',
    perks: ['Free names & numbers', 'Design proof before print'],
  },
  {
    range: '25 – 99 pieces',
    note: 'Club pricing',
    perks: [
      'Free names & numbers',
      'Sponsor logos included',
      'Priority print slot',
    ],
    highlight: true,
  },
  {
    range: '100+ pieces',
    note: 'Academy & tournament pricing',
    perks: [
      'Best per-piece rate',
      'Packed per player',
      'Dedicated WhatsApp contact',
    ],
  },
];

export default function BulkOrdersPage() {
  return (
    <>
      <PageHero
        eyebrow="Team & bulk orders"
        title="Kit out"
        titleAccent="your team."
        description={`From ${siteConfig.bulkMinQuantity} players to 500 — create custom teamwear for schools, clubs, academies, tournaments and corporate events.`}
        crumbs={[{ label: 'Bulk Orders' }]}
        accent="#FF5A1F"
      />

      <div className="container-site grid gap-10 py-12 lg:grid-cols-[1fr_440px] lg:gap-14 sm:py-16">
        {/* Who we kit out */}
        <div>
          <h2 className="text-[clamp(1.6rem,4vw,2.4rem)]">Who we kit out</h2>
          <ul className="mt-6 grid gap-4 sm:grid-cols-2">
            {SEGMENTS.map(({ Icon, title, body }, i) => (
              <Reveal as="li" key={title} delay={i * 60}>
                <div className="h-full rounded-card border border-white/10 bg-ink-800 p-5 transition-colors hover:border-accent/40">
                  <span className="grid h-11 w-11 place-items-center rounded-xl bg-accent/10 text-accent">
                    <Icon className="h-5 w-5" />
                  </span>
                  <h3 className="mt-4 font-display text-lg font-bold uppercase tracking-tight">
                    {title}
                  </h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-bone-400">
                    {body}
                  </p>
                </div>
              </Reveal>
            ))}
          </ul>

          {/* Pricing tiers */}
          <h2 className="mt-14 text-[clamp(1.6rem,4vw,2.4rem)]">
            Squad pricing
          </h2>
          <p className="mt-2 max-w-xl text-sm text-bone-400">
            The more pieces in one run, the lower the per-piece cost — one
            print setup covers the whole order. Exact rates depend on fabric,
            print area and deadline, so we quote per team.
          </p>

          <ul className="mt-6 grid gap-4 sm:grid-cols-3">
            {TIERS.map((t) => (
              <li
                key={t.range}
                className={`rounded-card border p-5 ${
                  t.highlight
                    ? 'border-accent/50 bg-accent/5'
                    : 'border-white/10 bg-ink-800'
                }`}
              >
                <p
                  className={`font-display text-[11px] font-bold uppercase tracking-[0.16em] ${
                    t.highlight ? 'text-accent' : 'text-bone-400'
                  }`}
                >
                  {t.note}
                </p>
                <p className="mt-1 font-display text-xl font-bold uppercase">
                  {t.range}
                </p>
                <ul className="mt-3 space-y-1.5">
                  {t.perks.map((p) => (
                    <li
                      key={p}
                      className="flex items-start gap-2 text-[13px] text-bone-400"
                    >
                      <Check
                        className="mt-0.5 h-3.5 w-3.5 shrink-0 text-accent"
                        strokeWidth={3}
                      />
                      {p}
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>

          <p className="mt-4 text-xs text-bone-400">
            Free delivery on orders over {formatPrice(siteConfig.freeShippingOver)}.
            Custom kit ships {siteConfig.customDeliveryEstimate}.
          </p>
        </div>

        {/* Quote form */}
        <aside className="lg:sticky lg:top-28 lg:self-start">
          <BulkQuoteForm />
        </aside>
      </div>

      <PrintingServices />
    </>
  );
}
