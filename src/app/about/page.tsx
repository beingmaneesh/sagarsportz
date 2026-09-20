import type { Metadata } from 'next';
import Link from 'next/link';
import {
  Scissors,
  Printer,
  Users,
  ShoppingBag,
  MessageCircle,
  ArrowRight,
  MapPin,
} from 'lucide-react';
import { siteConfig } from '@/lib/config';
import { generalEnquiry, whatsappLink } from '@/lib/whatsapp';
import PageHero from '@/components/ui/PageHero';
import Reveal from '@/components/ui/Reveal';
import JerseyGraphic from '@/components/product/JerseyGraphic';

export const metadata: Metadata = {
  title: 'About Sagar Sportz',
  description:
    'Sagar Sportz is a sports shop and customization studio: custom jerseys, team uniforms, DTF and sublimation printing, sportswear and sports equipment under one roof.',
  alternates: { canonical: '/about' },
};

const WHAT_WE_DO = [
  {
    Icon: Scissors,
    title: 'Custom jerseys & teamwear',
    body: 'Football, cricket, basketball, volleyball and badminton kit, built to your colours with names and numbers for every player.',
  },
  {
    Icon: Printer,
    title: 'DTF & sublimation printing',
    body: 'Both presses run in-house, so quality control and turnaround stay with us instead of a third-party printer.',
  },
  {
    Icon: Users,
    title: 'Team & bulk orders',
    body: 'Schools, clubs, academies, corporate teams and tournaments — from ten pieces to several hundred.',
  },
  {
    Icon: ShoppingBag,
    title: 'Sportswear & equipment',
    body: 'Tracksuits, lowers, tees and caps alongside bats, balls, rackets, footwear and protective gear.',
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About us"
        title="A sports shop"
        titleAccent="and a print studio."
        description="Sagar Sportz started with a simple problem: teams could buy gear locally or get kit printed somewhere else — rarely both, rarely well. We do both, in one place."
        crumbs={[{ label: 'About' }]}
      />

      {/* What we do */}
      <section className="container-site py-14 sm:py-20">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_1fr] lg:gap-14">
          <div>
            <h2 className="text-[clamp(1.8rem,4.5vw,2.8rem)]">What we do</h2>
            <ul className="mt-7 grid gap-5 sm:grid-cols-2">
              {WHAT_WE_DO.map(({ Icon, title, body }, i) => (
                <Reveal as="li" key={title} delay={i * 70}>
                  <div className="h-full rounded-card border border-white/10 bg-ink-800 p-5">
                    <span className="grid h-11 w-11 place-items-center rounded-xl bg-accent/10 text-accent">
                      <Icon className="h-5 w-5" />
                    </span>
                    <h3 className="mt-4 font-display text-lg font-bold uppercase tracking-tight">
                      {title}
                    </h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-bone-400">
                      {body}
                    </p>
                  </div>
                </Reveal>
              ))}
            </ul>
          </div>

          <Reveal delay={120}>
            <div className="relative overflow-hidden rounded-card border border-white/10 bg-gradient-to-b from-ink-700 to-ink-900 p-8">
              <div
                aria-hidden
                className="absolute inset-0"
                style={{
                  background:
                    'radial-gradient(90% 70% at 50% 5%, rgba(227,30,36,.18) 0%, transparent 62%)',
                }}
              />
              <div className="relative">
                <JerseyGraphic
                  uid="about-kit"
                  primary="#E31E24"
                  secondary="#111315"
                  pattern="chevron"
                  teamName="Sagar Sportz"
                  number="01"
                  className="mx-auto w-full max-w-[300px] drop-shadow-[0_28px_44px_rgba(0,0,0,.6)]"
                />
                <p className="mt-6 text-center font-display text-xl font-bold uppercase tracking-tight">
                  {siteConfig.tagline}
                </p>
                <p className="mt-2 text-center text-sm text-bone-400">
                  {siteConfig.description}
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* How we work */}
      <section className="border-y border-white/10 bg-ink-900/50 py-14 sm:py-20">
        <div className="container-site">
          <h2 className="text-[clamp(1.8rem,4.5vw,2.8rem)]">How we work</h2>
          <div className="mt-7 grid gap-5 sm:grid-cols-3">
            {[
              {
                t: 'You talk to a person',
                b: 'Orders and design approvals happen on WhatsApp — no ticket queue, no call centre. You see a proof before anything prints.',
              },
              {
                t: 'We print it ourselves',
                b: 'Running our own DTF and sublimation presses means we can catch a colour problem before it becomes forty wrong jerseys.',
              },
              {
                t: 'We quote per team',
                b: 'Fabric, print area, squad size and deadline all move the number, so we price your run rather than hiding behind a list rate.',
              },
            ].map((c, i) => (
              <Reveal key={c.t} delay={i * 80}>
                <div className="h-full rounded-card border border-white/10 bg-ink-800 p-6">
                  <h3 className="font-display text-lg font-bold uppercase tracking-tight">
                    {c.t}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-bone-400">
                    {c.b}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Visit + CTA */}
      <section className="container-site py-14 sm:py-20">
        <div className="grid items-center gap-8 rounded-card border border-white/10 bg-ink-800 p-8 lg:grid-cols-[1fr_auto] sm:p-10">
          <div>
            <span className="eyebrow mb-3">
              <MapPin className="h-3.5 w-3.5" />
              Visit the store
            </span>
            <h2 className="text-[clamp(1.6rem,4vw,2.4rem)]">
              Come see the fabric in person.
            </h2>
            <p className="mt-3 max-w-lg text-sm leading-relaxed text-bone-400">
              {siteConfig.address.line1}, {siteConfig.address.line2},{' '}
              {siteConfig.address.city}, {siteConfig.address.state}{' '}
              {siteConfig.address.pincode}
              <br />
              {siteConfig.hours}
            </p>
          </div>

          <div className="flex flex-col gap-2.5 sm:flex-row lg:flex-col">
            <a
              href={whatsappLink(generalEnquiry())}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-wa btn-lg"
            >
              <MessageCircle className="h-4 w-4" />
              Chat with us
            </a>
            <Link href="/contact" className="btn btn-outline btn-lg">
              Contact details
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
