import Link from 'next/link';
import { MessageCircle, ArrowRight } from 'lucide-react';
import { customJerseyEnquiry, whatsappLink } from '@/lib/whatsapp';
import Reveal from '@/components/ui/Reveal';

const LINES = [
  'Custom jerseys.',
  'Custom T-shirts.',
  'Professional printing.',
  'Sports equipment.',
];

export default function FinalCTA() {
  return (
    <section className="relative overflow-hidden" aria-labelledby="cta-heading">
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(70% 90% at 50% 0%, rgba(227,30,36,.2) 0%, transparent 62%), linear-gradient(180deg,#0B0C0E 0%,#08090A 100%)',
        }}
      />
      <div
        aria-hidden
        className="absolute inset-0 slash-bg opacity-40"
        style={{
          maskImage:
            'radial-gradient(60% 70% at 50% 50%, #000 0%, transparent 75%)',
        }}
      />

      <div className="container-site relative py-20 text-center sm:py-28">
        <Reveal>
          <h2
            id="cta-heading"
            className="mx-auto max-w-4xl text-[clamp(2.2rem,7vw,5rem)] text-balance"
          >
            Ready to build
            <br />
            your <span className="text-accent">team kit?</span>
          </h2>
        </Reveal>

        <Reveal delay={90}>
          <ul className="mt-7 flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
            {LINES.map((l) => (
              <li
                key={l}
                className="font-display text-sm font-bold uppercase tracking-[0.14em] text-bone-400"
              >
                {l}
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={160}>
          <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a
              href={whatsappLink(customJerseyEnquiry())}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-accent btn-lg w-full sm:w-auto"
            >
              <MessageCircle className="h-4 w-4" />
              Start your order on WhatsApp
            </a>
            <Link
              href="/shop"
              className="btn btn-outline btn-lg w-full sm:w-auto"
            >
              Explore sports gear
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </Reveal>

        <Reveal delay={220}>
          <p className="mt-5 text-xs text-bone-400">
            Team pricing from 10 pieces  
          </p>
        </Reveal>
      </div>
    </section>
  );
}
