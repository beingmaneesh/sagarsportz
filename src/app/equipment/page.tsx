import type { Metadata } from 'next';
import { products } from '@/lib/products';
import PageHero from '@/components/ui/PageHero';
import ShopBrowser from '@/components/product/ShopBrowser';

export const metadata: Metadata = {
  title: 'Sports Equipment — Cricket, Football, Basketball & Badminton',
  description:
    'Cricket bats, balls, gloves, pads and helmets. Footballs, goalkeeper gloves and shin guards. Basketballs, badminton rackets, shuttlecocks and nets.',
  alternates: { canonical: '/equipment' },
};

const GROUPS = [
  {
    sport: 'Cricket',
    items: [
      'Cricket bats',
      'Cricket balls',
      'Cricket gloves',
      'Cricket pads',
      'Cricket helmets',
    ],
  },
  {
    sport: 'Football',
    items: [
      'Footballs',
      'Goalkeeper gloves',
      'Shin guards',
      'Training equipment',
    ],
  },
  {
    sport: 'Basketball',
    items: ['Basketballs', 'Basketball accessories'],
  },
  {
    sport: 'Badminton',
    items: ['Badminton rackets', 'Shuttlecocks', 'Badminton nets', 'Grips'],
  },
];

export default function EquipmentPage() {
  // Equipment plus the protective gear that sits alongside it in store.
  const source = products.filter(
    (p) => p.category === 'equipment' || p.category === 'protection',
  );

  return (
    <>
      <PageHero
        eyebrow="Sports equipment"
        title="Gear that"
        titleAccent="takes a beating."
        description="Match and training equipment across four sports, stocked for clubs, academies and weekend players."
        crumbs={[{ label: 'Equipment' }]}
        accent="#FF9F1C"
      >
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {GROUPS.map((g) => (
            <div
              key={g.sport}
              className="rounded-card border border-white/10 bg-ink-800/70 p-4"
            >
              <h2 className="font-display text-sm font-bold uppercase tracking-[0.12em] text-accent">
                {g.sport}
              </h2>
              <ul className="mt-2 space-y-1 text-[13px] text-bone-400">
                {g.items.map((i) => (
                  <li key={i}>{i}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </PageHero>

      <div className="container-site py-10 sm:py-14">
        <ShopBrowser source={source} />
      </div>
    </>
  );
}
