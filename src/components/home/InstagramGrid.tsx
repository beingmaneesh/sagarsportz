import { Instagram, ArrowUpRight } from 'lucide-react';
import { siteConfig } from '@/lib/config';
import JerseyGraphic from '@/components/product/JerseyGraphic';
import GearGraphic from '@/components/product/GearGraphic';
import SectionHeading from '@/components/ui/SectionHeading';
import Reveal from '@/components/ui/Reveal';
import type { ArtKind } from '@/lib/types';

/**
 * PLACEHOLDER FEED — generated tiles standing in for real Instagram posts.
 * TODO(client): connect the Instagram Basic Display/Graph API, or drop real
 * post images into /public/social and map them here.
 */
const TILES: {
  kind: 'kit' | ArtKind;
  primary: string;
  secondary: string;
  pattern?: string;
  caption: string;
}[] = [
  {
    kind: 'kit',
    primary: '#E31E24',
    secondary: '#111315',
    pattern: 'chevron',
    caption: 'Match-day drop',
  },
  {
    kind: 'bat',
    primary: '#E8D3A9',
    secondary: '#DC2626',
    caption: 'Fresh willow in',
  },
  {
    kind: 'kit',
    primary: '#1D4ED8',
    secondary: '#FACC15',
    pattern: 'sash',
    caption: 'Club kit delivered',
  },
  {
    kind: 'shoe',
    primary: '#111315',
    secondary: '#E31E24',
    caption: 'New trainers',
  },
  {
    kind: 'kit',
    primary: '#FF5A1F',
    secondary: '#111315',
    pattern: 'stripes',
    caption: 'Court season',
  },
  {
    kind: 'racket',
    primary: '#E31E24',
    secondary: '#111315',
    caption: 'Restring day',
  },
];

export default function InstagramGrid() {
  return (
    <section
      className="container-site py-16 sm:py-24"
      aria-labelledby="social-heading"
    >
      <SectionHeading
        eyebrow="Social"
        title="Follow"
        titleAccent="the game."
        description="Kit drops, print runs and finished team orders — posted as they leave the studio."
      />

      <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
        {TILES.map((tile, i) => (
          <Reveal as="li" key={i} delay={(i % 6) * 50}>
            <a
              href={siteConfig.social.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative block aspect-square overflow-hidden rounded-card border border-white/10 bg-ink-800"
              aria-label={`${tile.caption} — open Instagram`}
            >
              <div
                aria-hidden
                className="absolute inset-0"
                style={{
                  background: `radial-gradient(100% 80% at 50% 10%, ${tile.primary}22 0%, transparent 64%)`,
                }}
              />

              <div className="relative flex h-full items-center justify-center p-5">
                {tile.kind === 'kit' ? (
                  <JerseyGraphic
                    uid={`ig-${i}`}
                    primary={tile.primary}
                    secondary={tile.secondary}
                    pattern={tile.pattern}
                    className="h-full w-full transition-transform duration-[650ms] group-hover:scale-110"
                  />
                ) : (
                  <GearGraphic
                    uid={`ig-${i}`}
                    kind={tile.kind}
                    primary={tile.primary}
                    secondary={tile.secondary}
                    className="h-full w-full transition-transform duration-[650ms] group-hover:scale-110"
                  />
                )}
              </div>

              {/* Hover veil */}
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-1.5 bg-ink/80 opacity-0 backdrop-blur-[2px] transition-opacity duration-300 group-hover:opacity-100">
                <Instagram className="h-5 w-5 text-accent" />
                <span className="px-2 text-center text-[11px] font-medium text-bone">
                  {tile.caption}
                </span>
              </div>
            </a>
          </Reveal>
        ))}
      </ul>

      <Reveal className="mt-8 flex justify-center">
        <a
          href={siteConfig.social.instagram}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-outline btn-lg"
        >
          <Instagram className="h-4 w-4" />
          Follow {siteConfig.social.instagramHandle.toUpperCase()}
          <ArrowUpRight className="h-4 w-4" />
        </a>
      </Reveal>
    </section>
  );
}
