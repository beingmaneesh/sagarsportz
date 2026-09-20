import type { Metadata } from 'next';
import Link from 'next/link';
import { Check, ArrowRight, MessageCircle, Layers, Droplets } from 'lucide-react';
import { siteConfig } from '@/lib/config';
import { customJerseyEnquiry, whatsappLink } from '@/lib/whatsapp';
import PageHero from '@/components/ui/PageHero';
import Reveal from '@/components/ui/Reveal';
import PrintProcess from '@/components/print/PrintProcess';
import PrintDiagram from '@/components/print/PrintDiagram';

export const metadata: Metadata = {
  title: 'Printing — DTF & Sublimation for Jerseys, T-Shirts & Teamwear',
  description:
    'DTF and sublimation printing at Sagar Sportz. Direct-to-film transfers for cotton and blends, dye sublimation for all-over polyester team jerseys — sharp, durable and built to last.',
  alternates: { canonical: '/printing' },
};

const METHODS = [
  {
    id: 'dtf' as const,
    eyebrow: 'Detailed. Vibrant. Durable.',
    title: 'DTF Printing',
    Icon: Layers,
    accent: '#FF7A1A',
    body: 'Direct-to-Film printing transfers high-detail, full-colour designs onto almost any fabric. Perfect for logos, artwork and small-to-large batch printing on cotton and blends.',
    features: [
      'Sharp detail and vibrant colour',
      'Strong wash durability',
      'Works on cotton, poly and blends',
      'Great for logos and small runs',
    ],
    idealFor: [
      'T-shirts',
      'Jerseys',
      'Sportswear',
      'Cotton garments',
      'Blended garments',
      'Caps',
      'Bags',
    ],
  },
  {
    id: 'sublimation' as const,
    eyebrow: 'Full-Colour. Seamless. Professional.',
    title: 'Sublimation Printing',
    Icon: Droplets,
    accent: '#E31E24',
    body: 'Sublimation infuses ink directly into polyester fabric, producing seamless all-over designs that never crack or peel — the standard for professional team jerseys.',
    features: [
      'Edge-to-edge, all-over printing',
      'Zero cracking or peeling',
      'Breathable — no print feel on fabric',
      'Unlimited colours and gradients',
    ],
    idealFor: [
      'Football jerseys',
      'Cricket jerseys',
      'Teamwear',
      'Polyester sportswear',
      'All-over designs',
    ],
  },
];

/** Side-by-side answer to the question every customer actually asks. */
const COMPARISON: { label: string; dtf: string; sub: string }[] = [
  { label: 'Fabric', dtf: 'Cotton, polyester and blends', sub: 'Polyester only' },
  { label: 'Coverage', dtf: 'Placed prints and panels', sub: 'Edge-to-edge, all-over' },
  { label: 'Feel on fabric', dtf: 'Light film you can feel', sub: 'None — dyed into the fibre' },
  { label: 'Colour range', dtf: 'Full colour, sharp fine detail', sub: 'Unlimited colours and gradients' },
  { label: 'Durability', dtf: 'Strong wash durability', sub: 'Will not crack or peel' },
  { label: 'Best for', dtf: 'Logos, names, small runs', sub: 'Full team kit' },
];

export default function PrintingPage() {
  return (
    <>
      <PageHero
        eyebrow="Printing"
        title="Modern printing"
        titleAccent="technology."
        description="DTF and sublimation printing for jerseys, T-shirts, teamwear and branded apparel — sharp, durable and built to last."
        crumbs={[{ label: 'Printing' }]}
      >
        <div className="flex flex-col gap-3 sm:flex-row">
          <Link href="/customize" className="btn btn-accent btn-lg">
            Start a design
            <ArrowRight className="h-4 w-4" />
          </Link>
          <a
            href={whatsappLink(customJerseyEnquiry())}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-wa btn-lg"
          >
            <MessageCircle className="h-4 w-4" />
            Send us your artwork
          </a>
        </div>
      </PageHero>

      {/* ---------------- The two methods ---------------- */}
      <div className="container-site space-y-16 py-14 sm:space-y-24 sm:py-20">
        {METHODS.map((m, i) => (
          <section
            key={m.id}
            aria-labelledby={`${m.id}-heading`}
            className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14"
          >
            {/* Diagram — alternates side on desktop so the page has rhythm */}
            <Reveal className={i % 2 === 1 ? 'lg:order-2' : ''}>
              <div className="relative overflow-hidden rounded-card border border-white/10 bg-ink-800 p-6 sm:p-8">
                <div
                  aria-hidden
                  className="absolute inset-0"
                  style={{
                    background: `radial-gradient(90% 70% at 70% 0%, ${m.accent}1f 0%, transparent 62%)`,
                  }}
                />
                <p
                  className="relative mb-5 font-display text-[11px] font-bold uppercase tracking-[0.2em]"
                  style={{ color: m.accent }}
                >
                  How it sits on the fabric
                </p>
                {/* Capped: the SVG scales its own type with the viewBox, so a
                    full-width diagram blows the callout label out of scale. */}
                <PrintDiagram
                  method={m.id}
                  accent={m.accent}
                  className="relative mx-auto w-full max-w-[420px]"
                />
              </div>
            </Reveal>

            {/* Copy */}
            <Reveal delay={90} className={i % 2 === 1 ? 'lg:order-1' : ''}>
              <span
                className="font-display text-[11px] font-bold uppercase tracking-[0.2em]"
                style={{ color: m.accent }}
              >
                {m.eyebrow}
              </span>

              <h2
                id={`${m.id}-heading`}
                className="mt-2.5 flex items-center gap-3 text-[clamp(1.9rem,4.6vw,3rem)]"
              >
                <span
                  className="grid h-11 w-11 shrink-0 place-items-center rounded-xl"
                  style={{ background: `${m.accent}1f`, color: m.accent }}
                >
                  <m.Icon className="h-5 w-5" />
                </span>
                {m.title}
              </h2>

              <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-bone-400 text-pretty sm:text-base">
                {m.body}
              </p>

              <ul className="mt-6 grid gap-2.5 sm:grid-cols-2">
                {m.features.map((f) => (
                  <li
                    key={f}
                    className="flex items-start gap-2.5 text-[14px] text-bone"
                  >
                    <Check
                      className="mt-0.5 h-4 w-4 shrink-0"
                      strokeWidth={3}
                      style={{ color: m.accent }}
                    />
                    {f}
                  </li>
                ))}
              </ul>

              <div className="mt-7">
                <h3 className="label">Ideal for</h3>
                <ul className="flex flex-wrap gap-2">
                  {m.idealFor.map((item) => (
                    <li
                      key={item}
                      className="rounded-full border px-3 py-1.5 text-xs font-medium"
                      style={{
                        borderColor: `${m.accent}59`,
                        color: m.accent,
                        background: `${m.accent}14`,
                      }}
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </section>
        ))}
      </div>

      {/* ---------------- Which one? ---------------- */}
      <section
        className="border-y border-white/10 bg-ink-900/50 py-14 sm:py-20"
        aria-labelledby="compare-heading"
      >
        <div className="container-site">
          <Reveal>
            <span className="eyebrow mb-3">
              <span className="h-px w-6 bg-accent" aria-hidden />
              Side by side
            </span>
            <h2
              id="compare-heading"
              className="text-[clamp(1.8rem,4.5vw,2.8rem)]"
            >
              Which one do you{' '}
              <span
                className="text-transparent"
                style={{ WebkitTextStroke: '1.5px rgba(246,247,248,.42)' }}
              >
                need?
              </span>
            </h2>
            <p className="mt-3 max-w-xl text-sm leading-relaxed text-bone-400">
              Not sure? Tell us the garment and the design and we&apos;ll
              recommend the method — it costs you nothing and saves a reprint.
            </p>
          </Reveal>

          <Reveal delay={90}>
            <div className="mt-8 overflow-x-auto rounded-card border border-white/10">
              <table className="w-full min-w-[520px] text-left text-sm">
                <caption className="sr-only">
                  DTF printing compared with sublimation printing
                </caption>
                <thead>
                  <tr className="border-b border-white/10 bg-ink-800">
                    <th
                      scope="col"
                      className="px-4 py-3.5 font-display text-[11px] font-bold uppercase tracking-[0.16em] text-bone-400"
                    >
                      &nbsp;
                    </th>
                    <th
                      scope="col"
                      className="px-4 py-3.5 font-display text-[11px] font-bold uppercase tracking-[0.16em] text-[#FF7A1A]"
                    >
                      DTF
                    </th>
                    <th
                      scope="col"
                      className="px-4 py-3.5 font-display text-[11px] font-bold uppercase tracking-[0.16em] text-accent"
                    >
                      Sublimation
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/8">
                  {COMPARISON.map((row) => (
                    <tr key={row.label}>
                      <th
                        scope="row"
                        className="px-4 py-3 text-left font-display text-xs font-bold uppercase tracking-wide text-bone-400"
                      >
                        {row.label}
                      </th>
                      <td className="px-4 py-3 text-bone">{row.dtf}</td>
                      <td className="px-4 py-3 text-bone">{row.sub}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ---------------- Process ---------------- */}
      <section
        className="container-site py-14 sm:py-20"
        aria-labelledby="print-process-heading"
      >
        <Reveal>
          <span className="eyebrow mb-3">
            <span className="h-px w-6 bg-accent" aria-hidden />
            The process
          </span>
          <h2
            id="print-process-heading"
            className="mb-8 text-[clamp(1.8rem,4.5vw,2.8rem)]"
          >
            From design{' '}
            <span
              className="text-transparent"
              style={{ WebkitTextStroke: '1.5px rgba(246,247,248,.42)' }}
            >
              to delivery.
            </span>
          </h2>
        </Reveal>

        <PrintProcess />

        <Reveal delay={80}>
          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {[
              {
                t: 'Artwork',
                b: 'Vector files (SVG, AI, PDF, CDR) print sharpest. PNG works well with a transparent background.',
              },
              {
                t: 'Proof first',
                b: 'You approve a design proof on WhatsApp before anything reaches the press.',
              },
              {
                t: 'Turnaround',
                b: `Custom printed kit ships ${siteConfig.customDeliveryEstimate.toLowerCase()}.`,
              },
            ].map((c) => (
              <div
                key={c.t}
                className="rounded-card border border-white/10 bg-ink-800 p-5"
              >
                <h3 className="font-display text-base font-bold uppercase tracking-tight">
                  {c.t}
                </h3>
                <p className="mt-1.5 text-sm leading-relaxed text-bone-400">
                  {c.b}
                </p>
              </div>
            ))}
          </div>
        </Reveal>
      </section>

      {/* ---------------- CTA ---------------- */}
      <section className="container-site pb-16 sm:pb-24">
        <Reveal>
          <div className="relative overflow-hidden rounded-card border border-white/10 bg-ink-800 p-8 text-center sm:p-12">
            <div
              aria-hidden
              className="absolute inset-0"
              style={{
                background:
                  'radial-gradient(70% 80% at 50% 0%, rgba(227,30,36,.18) 0%, transparent 62%)',
              }}
            />
            <div className="relative">
              <h2 className="text-[clamp(1.8rem,5vw,3rem)]">
                Ready to print your{' '}
                <span className="text-accent">teamwear?</span>
              </h2>
              <p className="mx-auto mt-3 max-w-lg text-sm leading-relaxed text-bone-400">
                Send us your crest, your colours or just an idea. We&apos;ll come
                back with a proof and a price.
              </p>
              <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <a
                  href={whatsappLink(customJerseyEnquiry())}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-accent btn-lg w-full sm:w-auto"
                >
                  <MessageCircle className="h-4 w-4" />
                  Get a printing quote
                </a>
                <Link
                  href="/bulk-orders"
                  className="btn btn-outline btn-lg w-full sm:w-auto"
                >
                  Team &amp; bulk orders
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}
