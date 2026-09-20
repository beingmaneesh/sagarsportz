import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Sparkles, Check } from 'lucide-react';
import { getByCategory } from '@/lib/products';
import PageHero from '@/components/ui/PageHero';
import ShopBrowser from '@/components/product/ShopBrowser';
import ProcessSection from '@/components/home/ProcessSection';
import CustomisationShowcase from '@/components/home/CustomisationShowcase';

export const metadata: Metadata = {
  title: 'Custom Jerseys — Football, Cricket, Basketball & More',
  description:
    'Design custom jerseys for football, cricket, basketball, volleyball and badminton. Full sublimation printing with your team name, player names, numbers and sponsor logos.',
  alternates: { canonical: '/custom-jerseys' },
};

const INCLUDED = [
  'Your choice of colours and pattern',
  'Team name across the chest',
  'Player name and number per kit',
  'Club crest and sponsor logos',
  'Round neck, V neck or polo collar',
  'Half or full sleeve',
];

export default function CustomJerseysPage() {
  const kits = getByCategory('custom-jerseys');

  return (
    <>
      <PageHero
        eyebrow="Custom jerseys"
        title="Create a kit"
        titleAccent="that’s yours."
        description="Full-sublimation kits for clubs, schools and academies. Pick a sport, set your colours and we print names and numbers for every player."
        crumbs={[{ label: 'Custom Jerseys' }]}
      >
        <div className="flex flex-col gap-3 sm:flex-row">
          <Link href="/customize" className="btn btn-accent btn-lg">
            <Sparkles className="h-4 w-4" />
            Open the configurator
          </Link>
          <Link href="/bulk-orders" className="btn btn-outline btn-lg">
            Team pricing
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </PageHero>

      {/* What's included */}
      <section className="border-b border-white/10 bg-ink-900/50">
        <div className="container-site py-10">
          <h2 className="sr-only">What every custom jersey includes</h2>
          <ul className="grid gap-x-6 gap-y-3 sm:grid-cols-2 lg:grid-cols-3">
            {INCLUDED.map((item) => (
              <li
                key={item}
                className="flex items-center gap-2.5 text-sm text-bone"
              >
                <Check className="h-4 w-4 shrink-0 text-accent" strokeWidth={3} />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <div className="container-site py-10 sm:py-14">
        <ShopBrowser source={kits} lockCategory />
      </div>

      <CustomisationShowcase />
      <ProcessSection />
    </>
  );
}
