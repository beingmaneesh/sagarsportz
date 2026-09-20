import {
  GraduationCap,
  Trophy,
  Users,
  Building2,
  Flag,
  Dumbbell,
  MessageCircle,
  ArrowRight,
} from 'lucide-react';
import Link from 'next/link';
import { bulkOrderEnquiry, whatsappLink } from '@/lib/whatsapp';
import JerseyGraphic from '@/components/product/JerseyGraphic';
import Reveal from '@/components/ui/Reveal';

const SEGMENTS = [
  { Icon: GraduationCap, label: 'Schools' },
  { Icon: Flag, label: 'Football clubs' },
  { Icon: Trophy, label: 'Cricket teams' },
  { Icon: Dumbbell, label: 'Sports academies' },
  { Icon: Building2, label: 'Corporate teams' },
  { Icon: Users, label: 'Tournaments' },
];

export default function BulkOrders() {
  return (
    <section
      className="relative overflow-hidden py-16 sm:py-24"
      aria-labelledby="bulk-heading"
    >
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(80% 60% at 15% 10%, rgba(255,90,31,.14) 0%, transparent 58%), radial-gradient(70% 60% at 90% 90%, rgba(227,30,36,.12) 0%, transparent 60%)',
        }}
      />

      <div className="container-site relative grid items-center gap-12 lg:grid-cols-[1.1fr_1fr]">
        <div>
          <Reveal>
            <span className="eyebrow mb-4">
              <span className="h-px w-6 bg-accent" aria-hidden />
              Team &amp; bulk orders
            </span>
            <h2
              id="bulk-heading"
              className="text-[clamp(2.2rem,6vw,4.4rem)] text-balance"
            >
              Kit out
              <br />
              your team.
            </h2>
            <p className="mt-5 max-w-lg text-[15px] leading-relaxed text-bone-400 text-pretty sm:text-base">
              From 10 players to 500 — create custom teamwear for schools,
              clubs, academies, tournaments and corporate events. Squad pricing,
              one design approval, one delivery.
            </p>
          </Reveal>

          <Reveal delay={100}>
            <ul className="mt-8 grid grid-cols-2 gap-2.5 sm:grid-cols-3">
              {SEGMENTS.map(({ Icon, label }) => (
                <li
                  key={label}
                  className="flex items-center gap-2.5 rounded-xl border border-white/10 bg-ink-800/70 px-3 py-2.5 text-[13px] text-bone transition-colors hover:border-accent/40"
                >
                  <Icon className="h-4 w-4 shrink-0 text-accent" />
                  {label}
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={180}>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href={whatsappLink(bulkOrderEnquiry())}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-accent btn-lg"
              >
                <MessageCircle className="h-4 w-4" />
                Get a team quote
              </a>
              <Link href="/bulk-orders" className="btn btn-outline btn-lg">
                Bulk order details
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <p className="mt-3 text-xs text-bone-400">
              Opens WhatsApp with a ready-made enquiry — just fill in your team
              details.
            </p>
          </Reveal>
        </div>

        {/* Squad wall */}
        <Reveal delay={120}>
          <div className="relative rounded-card border border-white/10 bg-ink-800/60 p-6 backdrop-blur-sm">
            <p className="mb-5 font-display text-[11px] font-bold uppercase tracking-[0.2em] text-bone-400">
              One design · Every player
            </p>
            <ul className="grid grid-cols-3 gap-3">
              {[
                { n: '7', name: 'Arjun' },
                { n: '9', name: 'Ravi' },
                { n: '10', name: 'Sagar' },
                { n: '11', name: 'Imran' },
                { n: '14', name: 'Neha' },
                { n: '21', name: 'Dev' },
              ].map((p, i) => (
                <li
                  key={p.n}
                  className="rounded-lg bg-ink-900/60 p-2 transition-transform duration-300 hover:-translate-y-1"
                  style={{ transitionDelay: `${i * 20}ms` }}
                >
                  <JerseyGraphic
                    uid={`squad-${p.n}`}
                    primary="#E31E24"
                    secondary="#111315"
                    pattern="chevron"
                    playerName={p.name}
                    number={p.n}
                    back
                    className="w-full"
                  />
                </li>
              ))}
            </ul>
            <p className="mt-4 text-center text-xs text-bone-400">
              Names and numbers printed per player at no extra charge.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
