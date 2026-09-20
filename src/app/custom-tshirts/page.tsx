import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, MessageCircle } from 'lucide-react';
import { getByCategory } from '@/lib/products';
import { customJerseyEnquiry, whatsappLink } from '@/lib/whatsapp';
import PageHero from '@/components/ui/PageHero';
import ShopBrowser from '@/components/product/ShopBrowser';
import PrintingServices from '@/components/home/PrintingServices';

export const metadata: Metadata = {
  title: 'Custom T-Shirts — DTF & Sublimation Printing',
  description:
    'Custom sports T-shirts, corporate event tees and polos printed with DTF or sublimation. Add your logo, names and graphics. Bulk pricing from 10 pieces.',
  alternates: { canonical: '/custom-tshirts' },
};

const USE_CASES = [
  { title: 'Academies & camps', body: 'Practice tees in squad colours.' },
  { title: 'Corporate events', body: 'Company days, CSR runs and offsites.' },
  { title: 'College fests', body: 'Committee tees and volunteer kits.' },
  { title: 'Marathons & drives', body: 'Event tees printed to a deadline.' },
];

export default function CustomTshirtsPage() {
  const tees = getByCategory('custom-tshirts');

  return (
    <>
      <PageHero
        eyebrow="Custom T-shirts"
        title="Your logo."
        titleAccent="Our press."
        description="Dry-fit sports tees, cotton event tees and collared polos — printed in full colour with DTF or dyed right into the fabric with sublimation."
        crumbs={[{ label: 'Custom T-Shirts' }]}
        accent="#FF5A1F"
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

      <section className="border-b border-white/10 bg-ink-900/50">
        <div className="container-site grid gap-4 py-10 sm:grid-cols-2 lg:grid-cols-4">
          {USE_CASES.map((u) => (
            <div
              key={u.title}
              className="rounded-card border border-white/10 bg-ink-800 p-5"
            >
              <h2 className="font-display text-base font-bold uppercase tracking-tight">
                {u.title}
              </h2>
              <p className="mt-1.5 text-sm text-bone-400">{u.body}</p>
            </div>
          ))}
        </div>
      </section>

      <div className="container-site py-10 sm:py-14">
        <ShopBrowser source={tees} lockCategory />
      </div>

      <PrintingServices />
    </>
  );
}
