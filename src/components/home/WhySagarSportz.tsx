import {
  Scissors,
  Printer,
  Users,
  ShoppingBag,
  MessageCircle,
} from 'lucide-react';
import SectionHeading from '@/components/ui/SectionHeading';
import Reveal from '@/components/ui/Reveal';

const REASONS = [
  {
    Icon: Scissors,
    title: 'Custom Made',
    body: 'Sportswear designed around your team.',
  },
  {
    Icon: Printer,
    title: 'Quality Printing',
    body: 'Professional DTF and sublimation printing.',
  },
  {
    Icon: Users,
    title: 'Team Orders',
    body: 'Small teams to large bulk orders.',
  },
  {
    Icon: ShoppingBag,
    title: 'Sports Essentials',
    body: 'Sportswear and equipment under one roof.',
  },
  {
    Icon: MessageCircle,
    title: 'Direct Support',
    body: 'Order and communicate directly through WhatsApp.',
  },
];

export default function WhySagarSportz() {
  return (
    <section
      className="container-site py-16 sm:py-24"
      aria-labelledby="why-heading"
    >
      <SectionHeading
        eyebrow="Why us"
        title="Why"
        titleAccent="Sagar Sportz?"
        description="A print studio and a sports shop in one place — which means fewer people between your idea and your kit."
        align="center"
      />

      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {REASONS.map(({ Icon, title, body }, i) => (
          <Reveal as="li" key={title} delay={i * 70}>
            <div className="group relative h-full overflow-hidden rounded-card border border-white/10 bg-ink-800 p-6 transition-all duration-300 hover:-translate-y-1.5 hover:border-accent/40 hover:bg-ink-700">
              <span className="grid h-12 w-12 place-items-center rounded-xl bg-accent/10 text-accent transition-colors duration-300 group-hover:bg-accent group-hover:text-white">
                <Icon className="h-5 w-5" />
              </span>
              <h3 className="mt-5 text-xl">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-bone-400">
                {body}
              </p>

              <span
                aria-hidden
                className="pointer-events-none absolute -bottom-6 -right-4 select-none font-display text-[84px] font-extrabold leading-none text-transparent transition-all duration-500 group-hover:-translate-y-1"
                style={{ WebkitTextStroke: '1px rgba(246,247,248,.05)' }}
              >
                {String(i + 1).padStart(2, '0')}
              </span>
            </div>
          </Reveal>
        ))}
      </ul>
    </section>
  );
}
