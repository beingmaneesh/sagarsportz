import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { products } from '@/lib/products';
import ProductCard from '@/components/product/ProductCard';
import GearGraphic from '@/components/product/GearGraphic';
import SectionHeading from '@/components/ui/SectionHeading';
import Reveal from '@/components/ui/Reveal';

const PICKS = [
  'sports-lower',
  'tracksuit-set',
  'custom-sports-t-shirt',
  'sports-cap',
];

export default function SportswearSection() {
  const picks = PICKS.map((slug) =>
    products.find((p) => p.slug === slug),
  ).filter(Boolean) as typeof products;

  return (
    <section
      className="container-site py-16 sm:py-24"
      aria-labelledby="sportswear-heading"
    >
      <SectionHeading
        eyebrow="Sportswear"
        title="Train hard."
        titleAccent="Look the part."
        description="Tracksuits, lowers, tees, shorts and caps — built for training days and branded with your club if you want it."
        href="/sportswear"
        linkLabel="All sportswear"
      />

      <div className="grid gap-5 lg:grid-cols-[1.1fr_2fr]">
        {/* Editorial panel */}
        <Reveal>
          <div className="group relative flex h-full min-h-[320px] flex-col justify-end overflow-hidden rounded-card border border-white/10 bg-gradient-to-br from-ink-600 via-ink-800 to-ink p-7">
            <div
              aria-hidden
              className="absolute inset-0"
              style={{
                background:
                  'radial-gradient(90% 70% at 78% 12%, rgba(227,30,36,.18) 0%, transparent 62%)',
              }}
            />
            <div className="pointer-events-none absolute -right-10 -top-6 h-64 w-64 opacity-95 transition-transform duration-[700ms] group-hover:-translate-y-2 group-hover:rotate-3">
              <GearGraphic
                uid="sw-hero"
                kind="tracksuit"
                primary="#16224A"
                secondary="#E31E24"
                className="h-full w-full drop-shadow-[0_24px_40px_rgba(0,0,0,.65)]"
              />
            </div>

            <div className="relative">
              <span className="eyebrow mb-3">Club teamwear</span>
              <h3 className="text-[clamp(1.8rem,4vw,2.6rem)]">
                Kit the squad
                <br />
                on and off the pitch.
              </h3>
              <p className="mt-3 max-w-sm text-sm leading-relaxed text-bone-400">
                Match-day jerseys, travel tracksuits and training tees — all in
                the same colours, printed together so nothing looks off.
              </p>
              <Link
                href="/bulk-orders"
                className="btn btn-accent btn-md mt-5 w-fit"
              >
                Get a team quote
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </Reveal>

        <ul className="grid grid-cols-2 gap-4 sm:gap-5">
          {picks.map((p, i) => (
            <Reveal as="li" key={p.id} delay={i * 70}>
              <ProductCard product={p} />
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
