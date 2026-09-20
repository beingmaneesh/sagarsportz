import type { Metadata } from 'next';
import { Suspense } from 'react';
import PageHero from '@/components/ui/PageHero';
import JerseyCustomizer from '@/components/customizer/JerseyCustomizer';

export const metadata: Metadata = {
  title: 'Jersey Customizer — Design Your Own Kit',
  description:
    'Design your own jersey: choose sport, neck type, pattern and colours, add your team name, player name, number and logos, and see a live preview before you order.',
  alternates: { canonical: '/customize' },
};

interface Props {
  searchParams: Promise<{ product?: string }>;
}

export default async function CustomizePage({ searchParams }: Props) {
  const { product } = await searchParams;

  return (
    <>
      <PageHero
        eyebrow="Jersey customizer"
        title="Build your kit."
        description="Everything updates live as you go. When you’re happy, add it to your bag or send the design straight to us on WhatsApp."
        crumbs={[{ label: 'Customize' }]}
      />

      <Suspense
        fallback={
          <div className="container-site py-20 text-center text-sm text-bone-400">
            Loading the configurator…
          </div>
        }
      >
        <JerseyCustomizer initialSlug={product} />
      </Suspense>
    </>
  );
}
