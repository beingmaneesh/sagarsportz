import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import JerseyGraphic from '@/components/product/JerseyGraphic';
import SectionHeading from '@/components/ui/SectionHeading';
import Reveal from '@/components/ui/Reveal';

/**
 * Editorial wall of finished designs. These are rendered from the same
 * configurator engine the shopper uses, so what they see is what they get.
 */
const DESIGNS = [
  {
    id: 'thunder',
    team: 'Thunder FC',
    sport: 'Football · Chevron',
    primary: '#E31E24',
    secondary: '#111315',
    pattern: 'chevron',
    neck: 'Round Neck',
    number: '10',
  },
  {
    id: 'royals',
    team: 'City Royals',
    sport: 'Cricket · Sash',
    primary: '#1D4ED8',
    secondary: '#FACC15',
    pattern: 'sash',
    neck: 'Polo',
    number: '7',
  },
  {
    id: 'blaze',
    team: 'Blaze BC',
    sport: 'Basketball · Stripes',
    primary: '#FF5A1F',
    secondary: '#111315',
    pattern: 'stripes',
    neck: 'V Neck',
    number: '23',
  },
  {
    id: 'united',
    team: 'Academy United',
    sport: 'Football · Hoops',
    primary: '#7A1226',
    secondary: '#F5F6F7',
    pattern: 'hoops',
    neck: 'Round Neck',
    number: '4',
  },
  {
    id: 'strikers',
    team: 'Night Strikers',
    sport: 'Teamwear · Camo',
    primary: '#0F5132',
    secondary: '#E31E24',
    pattern: 'camo',
    neck: 'Full Sleeve',
    number: '99',
  },
];

export default function CustomisationShowcase() {
  return (
    <section
      className="container-site py-16 sm:py-24"
      aria-labelledby="showcase-heading"
    >
      <SectionHeading
        eyebrow="Design gallery"
        title="Your colors."
        titleAccent="Your identity."
        description="A few kits built in our configurator. Yours starts as a blank canvas — pattern, colours, crest, names and numbers are all yours to set."
      />

      <ul className="rail lg:grid lg:grid-cols-5 lg:gap-4 lg:overflow-visible lg:pb-0">
        {DESIGNS.map((d, i) => (
          <Reveal
            as="li"
            key={d.id}
            delay={i * 70}
            className="w-[60vw] shrink-0 sm:w-[260px] lg:w-auto"
          >
            <article className="group relative h-full overflow-hidden rounded-card border border-white/10 bg-gradient-to-b from-ink-700 to-ink-900">
              <div className="relative aspect-[4/5] p-5">
                <div
                  aria-hidden
                  className="absolute inset-0"
                  style={{
                    background: `radial-gradient(100% 75% at 50% 8%, ${d.primary}26 0%, transparent 62%)`,
                  }}
                />
                <JerseyGraphic
                  uid={`show-${d.id}`}
                  primary={d.primary}
                  secondary={d.secondary}
                  pattern={d.pattern}
                  neck={d.neck}
                  teamName={d.team}
                  number={d.number}
                  className="relative h-full w-full drop-shadow-[0_22px_36px_rgba(0,0,0,.6)] transition-transform duration-[700ms] ease-[cubic-bezier(.22,1,.36,1)] group-hover:-translate-y-2 group-hover:scale-[1.05]"
                />
              </div>

              <div className="border-t border-white/8 p-4">
                <h3 className="font-display text-base font-bold uppercase leading-tight">
                  {d.team}
                </h3>
                <p className="mt-0.5 text-[11px] uppercase tracking-[0.12em] text-bone-400">
                  {d.sport}
                </p>
              </div>
            </article>
          </Reveal>
        ))}
      </ul>

      <Reveal className="mt-10 flex justify-center">
        <Link href="/customize" className="btn btn-accent btn-lg">
          Start your design
          <ArrowRight className="h-4 w-4" />
        </Link>
      </Reveal>
    </section>
  );
}
