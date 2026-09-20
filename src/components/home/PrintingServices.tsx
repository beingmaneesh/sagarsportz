import Link from 'next/link';
import { ArrowRight, Check } from 'lucide-react';
import SectionHeading from '@/components/ui/SectionHeading';
import Reveal from '@/components/ui/Reveal';
import PrintProcess from '@/components/print/PrintProcess';

const SERVICES = [
  {
    title: 'DTF Printing',
    tag: 'Direct to film',
    body: 'Full-colour transfers that sit soft on the fabric — ideal for logos, names, graphics and one-off pieces.',
    points: ['T-shirts', 'Logos', 'Names', 'Graphics', 'Custom apparel'],
    accent: '#FF7A1A',
  },
  {
    title: 'Sublimation Printing',
    tag: 'Dye into fabric',
    body: 'Edge-to-edge prints that become part of the fabric. No cracking, no peeling, no weight — the professional kit standard.',
    points: [
      'Sports jerseys',
      'Teamwear',
      'Full-print designs',
      'Custom sports uniforms',
    ],
    accent: '#E31E24',
  },
];

export default function PrintingServices() {
  return (
    <section
      className="border-y border-white/10 bg-ink-900/50 py-16 sm:py-24"
      aria-labelledby="printing-heading"
    >
      <div className="container-site">
        <SectionHeading
          eyebrow="Printing services"
          title="From design"
          titleAccent="to print."
          description="Both print methods run in-house, so we control quality and turnaround instead of waiting on a third party."
        />

        {/* Pipeline */}
        <PrintProcess className="mb-10" />

        {/* The two services */}
        <div className="grid gap-5 lg:grid-cols-2">
          {SERVICES.map((s, i) => (
            <Reveal key={s.title} delay={i * 90}>
              <article className="group relative h-full overflow-hidden rounded-card border border-white/10 bg-ink-800 p-7 transition-all duration-300 hover:-translate-y-1 hover:border-white/25">
                <div
                  aria-hidden
                  className="absolute inset-0 opacity-70"
                  style={{
                    background: `radial-gradient(85% 60% at 90% 0%, ${s.accent}1f 0%, transparent 60%)`,
                  }}
                />
                {/* Ink-pass stripe */}
                <div
                  aria-hidden
                  className="absolute inset-x-0 top-0 h-1 transition-all duration-500 group-hover:h-1.5"
                  style={{ background: s.accent }}
                />

                <div className="relative">
                  <p
                    className="font-display text-[11px] font-bold uppercase tracking-[0.2em]"
                    style={{ color: s.accent }}
                  >
                    {s.tag}
                  </p>
                  <h3 className="mt-2 text-[clamp(1.6rem,3.4vw,2.2rem)]">
                    {s.title}
                  </h3>
                  <p className="mt-3 max-w-md text-sm leading-relaxed text-bone-400">
                    {s.body}
                  </p>

                  <ul className="mt-5 grid grid-cols-2 gap-x-4 gap-y-2">
                    {s.points.map((p) => (
                      <li
                        key={p}
                        className="flex items-center gap-2 text-[13px] text-bone"
                      >
                        <Check
                          className="h-3.5 w-3.5 shrink-0"
                          style={{ color: s.accent }}
                          strokeWidth={3}
                        />
                        {p}
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link href="/customize" className="btn btn-accent btn-lg">
            Customize your teamwear
            <ArrowRight className="h-4 w-4" />
          </Link>
          <Link href="/printing" className="btn btn-outline btn-lg">
            How our printing works
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
