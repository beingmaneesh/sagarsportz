import Link from 'next/link';
import {
  ArrowRight,
  Palette,
  Users,
  ShieldCheck,
  MessageCircle,
} from 'lucide-react';
import JerseyGraphic from '@/components/product/JerseyGraphic';
import GearGraphic from '@/components/product/GearGraphic';
import Image from 'next/image';

const TRUST = [
  { Icon: Palette, label: 'Custom Printing' },
  { Icon: Users, label: 'Team Orders' },
  { Icon: ShieldCheck, label: 'Quality Sportswear' },
  { Icon: MessageCircle, label: 'WhatsApp Ordering' },
];

/**
 * Hero background photograph, served from `public/hero/`.
 * Set to `null` to fall back to the gradient-only backdrop.
 */
const HERO_IMAGE: string | null = '/hero/athletes-banner1.png';

export default function Hero() {
  const hasHeroImage = Boolean(HERO_IMAGE);

  return (
    <section
      className="relative overflow-hidden border-b border-white/10 bg-ink"
      aria-labelledby="hero-heading"



    >



      {hasHeroImage ? (
        <>
          <Image
            src={HERO_IMAGE as string}
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover object-[72%_center] lg:object-center"
          />
          {/* Scrim: the headline and CTAs have to stay readable over the photo */}
          <div
            aria-hidden
            className="absolute inset-0 bg-[linear-gradient(90deg,#08090A_0%,rgba(8,9,10,.92)_38%,rgba(8,9,10,.55)_65%,rgba(8,9,10,.75)_100%)]"
          />
        </>
      ) : (
          <div
            aria-hidden
            className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_70%_20%,rgba(120,120,130,0.28),transparent_70%),radial-gradient(ellipse_50%_40%_at_20%_80%,rgba(225,6,0,0.12),transparent_70%)]"
          />
        )}
              {/* Backdrop: stadium-light wash + pitch grid */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(120% 80% at 78% 0%, rgba(227,30,36,.16) 0%, transparent 55%), radial-gradient(90% 70% at 8% 100%, rgba(255,90,31,.12) 0%, transparent 60%)',
          }}
        />
        <div
          className="absolute inset-0 opacity-60"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,.025) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.025) 1px,transparent 1px)',
            backgroundSize: '64px 64px',
            maskImage:
              'radial-gradient(90% 80% at 50% 30%, #000 30%, transparent 78%)',
          }}
        />
        {/* Oversized outline word */}
        <p
          className="absolute -right-6 top-6 hidden select-none font-display font-extrabold uppercase leading-[0.8] tracking-tightest text-transparent lg:block"
          style={{
            fontSize: 'clamp(6rem,14vw,15rem)',
            WebkitTextStroke: '1px rgba(246,247,248,.055)',
          }}
        >
          Custom
        </p>
      </div>

      <div className="container-site relative grid items-center gap-12 py-14 sm:py-20 lg:grid-cols-[1.05fr_1fr] lg:gap-8 lg:py-24">
        {/* Copy */}
        <div className="max-w-2xl">
          <span className="eyebrow mb-5 animate-fade-up">
            <span className="h-px w-7 bg-accent" aria-hidden />
            Custom Sportswear · Sports Equipment
          </span>

          <h1
            id="hero-heading"
            className="text-[clamp(2.7rem,8.4vw,6.2rem)] text-balance"
          >
            <span
              className="block animate-fade-up"
              style={{ animationDelay: '60ms' }}
            >
              Your Team.
            </span>
            <span
              className="block animate-fade-up  text-accent"
              style={{ animationDelay: '150ms' }}
            >
            
              Your Jersey.
 
            </span>
            <span
              className="block animate-fade-up "
              style={{ animationDelay: '240ms' }}
            >
           Your Identity.
            </span>
          </h1>

          <p
            className="mt-6 max-w-lg animate-fade-up text-[15px] leading-relaxed text-bone-400 text-pretty sm:text-base"
            style={{ animationDelay: '330ms' }}
          >
            Custom jerseys, sportswear and equipment for teams, schools, clubs,
            academies and athletes. Designed with you, printed in-house,
            delivered ready to play.
          </p>

          <div
            className="mt-8 flex animate-fade-up flex-col gap-3 sm:flex-row"
            style={{ animationDelay: '420ms' }}
          >
            <Link href="/customize" className="btn btn-accent btn-lg">
              Design your jersey
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link href="/shop" className="btn btn-outline btn-lg">
              Shop sports gear
            </Link>
          </div>

          <ul
            className="mt-9 grid animate-fade-up grid-cols-2 gap-x-4 gap-y-3 sm:flex sm:flex-wrap sm:gap-x-6"
            style={{ animationDelay: '510ms' }}
          >
            {TRUST.map(({ Icon, label }) => (
              <li
                key={label}
                className="flex items-center gap-2 text-[13px] text-bone-400"
              >
                <Icon className="h-4 w-4 shrink-0 text-accent" />
                {label}
              </li>
            ))}
          </ul>
        </div>

        {/* Kit composition */}
  
      </div>

      {/* Stat strip — TODO(client): replace with real figures before launch. */}
      <div className="relative border-t border-white/10 bg-ink-900/60">
        <div className="container-site grid grid-cols-2 divide-x divide-white/8 sm:grid-cols-4">
          {[
            { n: '10+', l: 'Sports covered' },
            { n: '500+', l: 'Kits printed' },
            { n: '10', l: 'Min. team order' },
            { n: '7 days', l: 'Typical turnaround' },
          ].map((s, i) => (
            <div
              key={s.l}
              className={`px-2 py-5 text-center ${i % 2 === 0 ? 'border-l-0' : ''}`}
            >
              <p className="font-display text-2xl font-extrabold text-accent sm:text-3xl">
                {s.n}
              </p>
              <p className="mt-0.5 text-[11px] uppercase tracking-[0.14em] text-bone-400">
                {s.l}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
