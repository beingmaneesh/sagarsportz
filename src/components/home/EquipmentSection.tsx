import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { products, effectivePrice } from '@/lib/products';
import { formatPrice } from '@/lib/whatsapp';
import GearGraphic from '@/components/product/GearGraphic';
import SectionHeading from '@/components/ui/SectionHeading';
import Reveal from '@/components/ui/Reveal';

/** Curated line-up across the four equipment sports. */
const PICKS = [
  'english-willow-cricket-bat',
  'match-football',
  'badminton-racket',
  'basketball',
  'leather-cricket-ball',
  'feather-shuttlecock',
  'goalkeeper-gloves',
  'cricket-helmet',
];

export default function EquipmentSection() {
  const picks = PICKS.map((s) => products.find((p) => p.slug === s)).filter(
    Boolean,
  ) as typeof products;

  return (
    <section
      className="border-y border-white/10 bg-ink-900/50 py-16 sm:py-24"
      aria-labelledby="equipment-heading"
    >
      <div className="container-site">
        <SectionHeading
          eyebrow="Sports equipment"
          title="Gear that"
          titleAccent="takes a beating."
          description="Bats, balls, rackets, gloves and protection — stocked for club cricket, weekend football and everything in between."
          href="/equipment"
          linkLabel="All equipment"
        />

        <ul className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
          {picks.map((p, i) => (
            <Reveal as="li" key={p.id} delay={(i % 4) * 60}>
              <Link
                href={`/product/${p.slug}`}
                className="group relative flex h-full flex-col overflow-hidden rounded-card border border-white/10 bg-ink-800 transition-all duration-300 hover:-translate-y-1 hover:border-white/25 hover:shadow-lift"
              >
                <div className="relative aspect-square overflow-hidden">
                  <div
                    aria-hidden
                    className="absolute inset-0"
                    style={{
                      background: `radial-gradient(100% 75% at 50% 12%, ${p.art.colors[0]}1c 0%, transparent 62%)`,
                    }}
                  />
                  <div className="relative flex h-full items-center justify-center p-7">
                    <GearGraphic
                      uid={`eq-${p.id}`}
                      kind={p.art.kind}
                      primary={p.art.colors[0]}
                      secondary={p.art.colors[1]}
                      className="h-full w-full drop-shadow-[0_16px_28px_rgba(0,0,0,.55)] transition-transform duration-[650ms] ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-110 group-hover:-rotate-3"
                    />
                  </div>
                </div>

                <div className="flex flex-1 flex-col border-t border-white/8 p-3.5">
                  <p className="font-display text-[10px] font-bold uppercase tracking-[0.16em] text-bone-400">
                    {p.sport}
                  </p>
                  <h3 className="mt-0.5 font-display text-sm font-bold uppercase leading-tight sm:text-[15px]">
                    {p.name}
                  </h3>
                  <div className="mt-auto flex items-center justify-between pt-2.5">
                    <span className="font-display font-bold">
                      {formatPrice(effectivePrice(p))}
                    </span>
                    <ArrowUpRight className="h-4 w-4 text-bone-400 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-accent" />
                  </div>
                </div>
              </Link>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
