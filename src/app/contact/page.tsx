import type { Metadata } from 'next';
import {
  MessageCircle,
  Phone,
  Mail,
  MapPin,
  Clock,
  Instagram,
  Facebook,
  Youtube,
} from 'lucide-react';
import { siteConfig } from '@/lib/config';
import {
  generalEnquiry,
  customJerseyEnquiry,
  bulkOrderEnquiry,
  whatsappLink,
} from '@/lib/whatsapp';
import PageHero from '@/components/ui/PageHero';
import Reveal from '@/components/ui/Reveal';

export const metadata: Metadata = {
  title: 'Contact Sagar Sportz',
  description:
    'Talk to Sagar Sportz on WhatsApp, by phone or email — custom jersey enquiries, team quotes, stock checks and store directions.',
  alternates: { canonical: '/contact' },
};

const QUICK = [
  {
    title: 'General enquiry',
    body: 'Stock, sizes, prices or anything else.',
    message: generalEnquiry(),
  },
  {
    title: 'Custom jersey',
    body: 'Start a design for your team.',
    message: customJerseyEnquiry(),
  },
  {
    title: 'Team / bulk quote',
    body: 'Pricing for 10 pieces and up.',
    message: bulkOrderEnquiry(),
  },
];

export default function ContactPage() {
  const { address, social } = siteConfig;

  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Talk to"
        titleAccent="a human."
        description="WhatsApp is the fastest way to reach us — that's where orders, design proofs and delivery updates happen."
        crumbs={[{ label: 'Contact' }]}
      />

      <div className="container-site grid gap-8 py-12 lg:grid-cols-[1.1fr_1fr] lg:gap-12 sm:py-16">
        {/* Quick WhatsApp starts */}
        <div>
          <h2 className="text-[clamp(1.6rem,4vw,2.2rem)]">
            Start a conversation
          </h2>
          <p className="mt-2 text-sm text-bone-400">
            Pick the closest match and we&apos;ll open WhatsApp with a message
            ready to go.
          </p>

          <ul className="mt-6 space-y-3">
            {QUICK.map((q, i) => (
              <Reveal as="li" key={q.title} delay={i * 70}>
                <a
                  href={whatsappLink(q.message)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-4 rounded-card border border-white/10 bg-ink-800 p-5 transition-all hover:-translate-y-0.5 hover:border-[#25D366]/50"
                >
                  <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-[#25D366]/15 text-[#25D366]">
                    <MessageCircle className="h-5 w-5" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block font-display text-lg font-bold uppercase leading-tight tracking-tight">
                      {q.title}
                    </span>
                    <span className="block text-sm text-bone-400">
                      {q.body}
                    </span>
                  </span>
                  <span className="shrink-0 font-display text-xs font-bold uppercase tracking-[0.14em] text-[#25D366] opacity-0 transition-opacity group-hover:opacity-100">
                    Open
                  </span>
                </a>
              </Reveal>
            ))}
          </ul>

          <div className="mt-8 rounded-card border border-white/10 bg-ink-800 p-6">
            <h3 className="font-display text-lg font-bold uppercase tracking-tight">
              Sending artwork?
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-bone-400">
              Send crests and sponsor logos as PNG with a transparent
              background, or as SVG/AI if you have it. The bigger the file, the
              cleaner the print — send it straight into the WhatsApp chat.
            </p>
          </div>
        </div>

        {/* Details */}
        <aside>
          <div className="rounded-card border border-white/10 bg-ink-800 p-6">
            <h2 className="font-display text-lg font-bold uppercase tracking-tight">
              Store details
            </h2>

            <ul className="mt-5 space-y-4 text-sm">
              <li className="flex items-start gap-3">
                <Phone className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                <span>
                  <span className="label !mb-0.5">Phone</span>
                  <a
                    href={`tel:${siteConfig.phoneHref}`}
                    className="text-bone transition-colors hover:text-accent"
                  >
                    {siteConfig.phoneDisplay}
                  </a>
                </span>
              </li>

              <li className="flex items-start gap-3">
                <Mail className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                <span>
                  <span className="label !mb-0.5">Email</span>
                  <a
                    href={`mailto:${siteConfig.email}`}
                    className="break-all text-bone transition-colors hover:text-accent"
                  >
                    {siteConfig.email}
                  </a>
                </span>
              </li>

              <li className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                <span>
                  <span className="label !mb-0.5">Store</span>
                  <span className="text-bone">
                    {address.line1}
                    <br />
                    {address.line2}
                    <br />
                    {address.city}, {address.state} {address.pincode}
                  </span>
                  <a
                    href={siteConfig.mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-1.5 block text-xs text-accent link-underline w-fit"
                  >
                    Open in Maps
                  </a>
                </span>
              </li>

              <li className="flex items-start gap-3">
                <Clock className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                <span>
                  <span className="label !mb-0.5">Hours</span>
                  <span className="text-bone">{siteConfig.hours}</span>
                </span>
              </li>
            </ul>

            <div className="mt-6 border-t border-white/10 pt-5">
              <span className="label">Follow</span>
              <div className="flex gap-2">
                {[
                  { href: social.instagram, Icon: Instagram, label: 'Instagram' },
                  { href: social.facebook, Icon: Facebook, label: 'Facebook' },
                  { href: social.youtube, Icon: Youtube, label: 'YouTube' },
                ]
                  .filter((s) => s.href)
                  .map(({ href, Icon, label }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="grid h-10 w-10 place-items-center rounded-full border border-white/12 text-bone-400 transition-all hover:border-accent hover:text-accent"
                  >
                    <Icon className="h-[18px] w-[18px]" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </aside>
      </div>
    </>
  );
}
