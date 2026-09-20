import Link from 'next/link';
import { ArrowRight, Sparkles } from 'lucide-react';
import { getByCategory, effectivePrice } from '@/lib/products';
import { formatPrice } from '@/lib/whatsapp';
import JerseyGraphic from '@/components/product/JerseyGraphic';
import SectionHeading from '@/components/ui/SectionHeading';
import Reveal from '@/components/ui/Reveal';

const SPORT_LABEL: Record<string, string> = {
  football: 'Football',
  cricket: 'Cricket',
  basketball: 'Basketball',
  volleyball: 'Volleyball',
  badminton: 'Badminton',
  multi: 'Custom Teamwear',
};

export default function CustomJerseyShowcase() {
  const kits = getByCategory('custom-jerseys', 6);

  return (
    <section
      className="container-site py-16 sm:py-24"
      aria-labelledby="kits-heading"
    >
      <SectionHeading
        eyebrow="Custom Jerseys"
        title="Create a kit"
        titleAccent="that’s yours."
        description="Pick a sport, choose your colours and pattern, then add your crest, player names and numbers. Printed end to end — no stickers, no peeling."
        href="/custom-jerseys"
        linkLabel="All jerseys"
      />

      <ul className="grid grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-3">
        {kits.map((kit, i) => (
          <Reveal as="li" key={kit.id} delay={i * 70}>
            <article className="group relative flex h-full flex-col overflow-hidden rounded-card border border-white/10 bg-gradient-to-b from-ink-700 to-ink-800 transition-all duration-300 hover:-translate-y-1 hover:border-accent/40 hover:shadow-lift">
              <div className="relative aspect-[4/5] overflow-hidden">
                <div
                  aria-hidden
                  className="absolute inset-0"
                  style={{
                    background: `radial-gradient(110% 80% at 50% 10%, ${kit.art.colors[0]}22 0%, transparent 60%)`,
                  }}
                />
                <div className="relative flex h-full items-center justify-center p-6">
                  <JerseyGraphic
                    uid={`kit-${kit.id}`}
                    primary={kit.art.colors[0]}
                    secondary={kit.art.colors[1]}
                    pattern={kit.art.pattern}
                    number="10"
                    className="h-full w-auto max-w-full drop-shadow-[0_20px_34px_rgba(0,0,0,.6)] transition-transform duration-[650ms] ease-[cubic-bezier(.22,1,.36,1)] group-hover:-translate-y-2 group-hover:scale-[1.04]"
                  />
                </div>

                <span className="absolute left-3 top-3 inline-flex items-center gap-1 rounded-full bg-accent px-2.5 py-1 font-display text-[10px] font-bold uppercase tracking-[0.14em] text-white">
                  <Sparkles className="h-3 w-3" />
                  Customizable
                </span>
              </div>

              <div className="flex flex-1 flex-col gap-1 border-t border-white/8 p-4">
                <p className="font-display text-[10px] font-bold uppercase tracking-[0.18em] text-bone-400">
                  {SPORT_LABEL[kit.sport] ?? kit.sport}
                </p>
                <h3 className="font-display text-base font-bold uppercase leading-tight sm:text-lg">
                  {kit.name}
                </h3>
                <p className="mt-1 text-sm text-bone-400">
                  Starting{' '}
                  <span className="font-display font-bold text-bone">
                    {formatPrice(effectivePrice(kit))}
                  </span>
                </p>

                <Link
                  href={`/customize?product=${kit.slug}`}
                  className="btn btn-outline btn-sm mt-3 w-full group-hover:border-accent group-hover:text-accent"
                >
                  Customize
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </article>
          </Reveal>
        ))}
      </ul>

      <Reveal className="mt-10 flex justify-center">
        <Link href="/customize" className="btn btn-accent btn-lg">
          Start customizing
          <ArrowRight className="h-4 w-4" />
        </Link>
      </Reveal>
    </section>
  );
}
