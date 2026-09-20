import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Check, FileImage, Shirt, Type, Hash } from 'lucide-react';
import { siteConfig } from '@/lib/config';
import PageHero from '@/components/ui/PageHero';
import ProcessSection from '@/components/home/ProcessSection';
import PrintingServices from '@/components/home/PrintingServices';
import CustomisationShowcase from '@/components/home/CustomisationShowcase';
import Reveal from '@/components/ui/Reveal';

export const metadata: Metadata = {
  title: 'Customization — How Custom Kit Works',
  description:
    'How customization works at Sagar Sportz: choose your product, colours and pattern, add team name, player names, numbers and logos, approve the proof and we print.',
  alternates: { canonical: '/customization' },
};

const OPTIONS = [
  {
    Icon: Shirt,
    title: 'Colours & pattern',
    body: 'Two-colour kits in solid, stripes, sash, hoops, chevron or camo. Custom hex codes welcome.',
  },
  {
    Icon: Type,
    title: 'Team & player names',
    body: 'Team name across the chest, player name on the back — up to 16 characters each.',
  },
  {
    Icon: Hash,
    title: 'Numbers',
    body: 'Two-digit numbers front and back, outlined in your secondary colour for contrast.',
  },
  {
    Icon: FileImage,
    title: 'Crests & sponsors',
    body: 'Club crest on the chest and sponsor panels on chest, sleeve or back at no extra cost.',
  },
];

const ARTWORK = [
  'Vector files (SVG, AI, PDF, CDR) print sharpest at any size',
  'PNG works well with a transparent background',
  'Send the largest version you have — we can scale down, not up',
  'Photos of a printed crest are fine for a quote, not for printing',
];

export default function CustomizationPage() {
  return (
    <>
      <PageHero
        eyebrow="Customization"
        title="How custom"
        titleAccent="kit works."
        description="From an idea on WhatsApp to a boxed set of jerseys with every player's name on the back. Here's exactly what you can change and what we need from you."
        crumbs={[{ label: 'Customization' }]}
      >
        <Link href="/customize" className="btn btn-accent btn-lg">
          Open the configurator
          <ArrowRight className="h-4 w-4" />
        </Link>
      </PageHero>

      {/* What you can customise */}
      <section className="container-site py-14 sm:py-20">
        <h2 className="text-[clamp(1.8rem,4.5vw,2.8rem)]">
          What you can change
        </h2>
        <ul className="mt-7 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {OPTIONS.map(({ Icon, title, body }, i) => (
            <Reveal as="li" key={title} delay={i * 70}>
              <div className="h-full rounded-card border border-white/10 bg-ink-800 p-6">
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
      </section>

      <ProcessSection />

      {/* Artwork guidance */}
      <section className="border-y border-white/10 bg-ink-900/50 py-14 sm:py-20">
        <div className="container-site grid gap-10 lg:grid-cols-2 lg:gap-14">
          <div>
            <h2 className="text-[clamp(1.6rem,4vw,2.4rem)]">
              Sending us artwork
            </h2>
            <p className="mt-3 max-w-lg text-sm leading-relaxed text-bone-400">
              The print is only as good as the file it came from. Send your
              crest and sponsor logos straight into the WhatsApp chat along
              with your order.
            </p>
            <ul className="mt-6 space-y-2.5">
              {ARTWORK.map((a) => (
                <li
                  key={a}
                  className="flex items-start gap-2.5 text-sm text-bone"
                >
                  <Check
                    className="mt-0.5 h-4 w-4 shrink-0 text-accent"
                    strokeWidth={3}
                  />
                  {a}
                </li>
              ))}
            </ul>
            <p className="mt-5 text-xs text-bone-400">
              No usable artwork? Tell us what you want and we&apos;ll redraw or
              set the type for you before the proof.
            </p>
          </div>

          <div className="rounded-card border border-white/10 bg-ink-800 p-6 sm:p-7">
            <h3 className="font-display text-lg font-bold uppercase tracking-tight">
              Timelines
            </h3>
            <dl className="mt-4 divide-y divide-white/8">
              {[
                ['Design proof', 'Within 1 working day of your enquiry'],
                ['Print run starts', 'Once you approve the proof'],
                ['Custom kit delivery', siteConfig.customDeliveryEstimate],
                ['Stocked items', siteConfig.deliveryEstimate],
              ].map(([k, v]) => (
                <div key={k} className="flex justify-between gap-4 py-3">
                  <dt className="font-display text-sm font-bold uppercase tracking-wide text-bone-400">
                    {k}
                  </dt>
                  <dd className="text-right text-sm text-bone">{v}</dd>
                </div>
              ))}
            </dl>
            <p className="mt-4 rounded-lg bg-ink-900 p-3 text-xs text-bone-400">
              Working to a tournament date? Tell us the deadline before you
              order — we&apos;ll say honestly whether it&apos;s possible.
            </p>
          </div>
        </div>
      </section>

      <CustomisationShowcase />
      <PrintingServices />
    </>
  );
}
