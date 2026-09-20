import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { sportCategories } from '@/lib/categories';
import SectionHeading from '@/components/ui/SectionHeading';
import Reveal from '@/components/ui/Reveal';

const SPORT_IMAGES: Record<string, string> = {
  football: "/sports/football.png",
  cricket: "/sports/cricket.png",
  basketball: "/sports/basketball.png",
  badminton: "/sports/badminton.png",
  running: "/sports/running.png",
  sportswear: "/sports/sportswear.png",
  protection: "/sports/protection.png",
};

export default function ShopBySport() {
  return (
    <section
      className="border-y border-white/10 bg-ink-900/50 py-16 sm:py-24"
      aria-labelledby="sports-heading"
    >
      <div className="container-site">
        <SectionHeading
          eyebrow="Shop by sport"
          title="Every game."
          titleAccent="One store."
          description="Kit, gear and accessories organised the way you actually shop — by the sport you play."
          href="/shop"
          linkLabel="Shop all"
        />

        {/* Mobile: horizontal rail. Desktop: bento grid. */}
        <ul className="rail lg:grid lg:grid-cols-4 lg:gap-5 lg:overflow-visible lg:pb-0">
          {sportCategories.map((cat, i) => {
            // First two tiles run double-width on desktop for rhythm.
            const wide = i < 2;
            return (
              <Reveal
                as="li"
                key={cat.slug}
                delay={i * 60}
                className={`w-[68vw] shrink-0 sm:w-[300px] lg:w-auto ${
                  wide ? 'lg:col-span-2' : ''
                }`}
              >
                <Link
                  href={`/shop/${cat.slug}`}
                  className="group relative flex h-full min-h-[240px] flex-col justify-between overflow-hidden rounded-card border border-white/10 bg-ink-800 p-5 transition-all duration-300 hover:-translate-y-1 hover:border-white/25 hover:shadow-lift sm:min-h-[260px]"
                >
                  <div
                    aria-hidden
                    className="absolute inset-0 transition-opacity duration-500 group-hover:opacity-100"
                    style={{
                      background: `radial-gradient(90% 70% at 85% 15%, ${cat.accent}1f 0%, transparent 62%)`,
                    }}
                  />

                  {/* Product silhouette, bleeding off the corner */}
                  <div
                    className={`pointer-events-none absolute -bottom-6 -right-6 opacity-[0.9] transition-transform duration-[650ms] ease-[cubic-bezier(.22,1,.36,1)] group-hover:-translate-y-2 group-hover:rotate-[6deg] ${
                      wide ? 'h-44 w-44' : 'h-36 w-36'
                    }`}
                  >
                    <Image
                      src={SPORT_IMAGES[cat.slug] ?? SPORT_IMAGES.football}
                      alt=""
                      fill
                      sizes="(max-width: 1024px) 176px, 200px"
                      className="object-contain drop-shadow-[0_16px_28px_rgba(0,0,0,.6)]"
                    />
                  </div>

                  <div className="relative">
                    <h3 className="text-2xl sm:text-[28px]">{cat.name}</h3>
                    <p className="mt-1.5 max-w-[60%] text-[13px] leading-snug text-bone-400">
                      {cat.blurb}
                    </p>
                  </div>

                  <div className="relative mt-6">
                    <ul className="mb-3 flex max-w-[70%] flex-wrap gap-1.5">
                      {cat.items.slice(0, wide ? 4 : 3).map((item) => (
                        <li
                          key={item}
                          className="rounded-full border border-white/10 px-2 py-0.5 text-[10px] text-bone-400"
                        >
                          {item}
                        </li>
                      ))}
                    </ul>
                    <span className="inline-flex items-center gap-1.5 font-display text-xs font-bold uppercase tracking-[0.14em] text-accent">
                      Shop {cat.name}
                      <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </span>
                  </div>
                </Link>
              </Reveal>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
