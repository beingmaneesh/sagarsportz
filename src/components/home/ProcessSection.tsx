import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import SectionHeading from '@/components/ui/SectionHeading';
import Reveal from '@/components/ui/Reveal';

const STEPS = [
  {
    n: '01',
    title: 'Choose',
    body: 'Choose your sport and product.',
  },
  {
    n: '02',
    title: 'Customize',
    body: 'Add colours, logo, name and number.',
  },
  {
    n: '03',
    title: 'Confirm',
    body: 'Review your design and order details.',
  },
  {
    n: '04',
    title: 'Play',
    body: 'We print, prepare and deliver your kit.',
  },
];

export default function ProcessSection() {
  return (
    <section
      className="container-site py-16 sm:py-24"
      aria-labelledby="process-heading"
    >
      <SectionHeading
        eyebrow="How it works"
        title="Four steps"
        titleAccent="to game day."
        description="No design software, no minimum fuss. Tell us what you want and we handle the rest."
      />

      <ol className="relative grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {/* Connecting rail on desktop */}
        <span
          aria-hidden
          className="absolute left-0 right-0 top-[54px] hidden h-px bg-gradient-to-r from-accent/50 via-white/15 to-transparent lg:block"
        />

        {STEPS.map((step, i) => (
          <Reveal as="li" key={step.n} delay={i * 90}>
            <div className="group relative h-full rounded-card border border-white/10 bg-ink-800 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-accent/40">
              <span className="relative z-10 grid h-12 w-12 place-items-center rounded-full border border-accent/40 bg-ink font-display text-base font-extrabold text-accent transition-colors duration-300 group-hover:bg-accent group-hover:text-white">
                {step.n}
              </span>

              <h3 className="mt-5 text-2xl">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-bone-400">
                {step.body}
              </p>

              {/* Ghost numeral */}
              <span
                aria-hidden
                className="pointer-events-none absolute bottom-2 right-3 select-none font-display text-[70px] font-extrabold leading-none text-transparent"
                style={{ WebkitTextStroke: '1px rgba(246,247,248,.06)' }}
              >
                {step.n}
              </span>
            </div>
          </Reveal>
        ))}
      </ol>

      <Reveal className="mt-10 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
        <Link href="/customize" className="btn btn-accent btn-lg">
          Start your design
          <ArrowRight className="h-4 w-4" />
        </Link>
        <Link href="/customization" className="btn btn-outline btn-lg">
          How customization works
        </Link>
      </Reveal>
    </section>
  );
}
