import Image from 'next/image';
import type { ProductArt } from '@/lib/types';
import JerseyGraphic from './JerseyGraphic';
import GearGraphic from './GearGraphic';

interface Props {
  art: ProductArt;
  /** Real photography. When present it always wins over generated artwork. */
  image?: string;
  alt: string;
  uid: string;
  priority?: boolean;
  className?: string;
  /** Subtle studio backdrop — off for cart rows and other small thumbs. */
  backdrop?: boolean;
  sizes?: string;
}

/**
 * Single entry point for product imagery.
 *
 * The client can drop real photos into `product.images` at any time and this
 * component switches to them automatically — no other file needs editing.
 * Until then it renders a studio-lit vector rendering of the product so the
 * catalogue never shows empty grey boxes.
 */
export default function ProductMedia({
  art,
  image,
  alt,
  uid,
  priority,
  className = '',
  backdrop = true,
  sizes = '(max-width: 768px) 50vw, 25vw',
}: Props) {
  if (image) {
    return (
      <div className={`relative overflow-hidden ${className}`}>
        <Image
          src={image}
          alt={alt}
          fill
          sizes={sizes}
          priority={priority}
          className="object-cover"
        />
      </div>
    );
  }

  const [p, s] = art.colors;

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {backdrop && (
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            background: `radial-gradient(120% 90% at 50% 8%, ${p}1f 0%, transparent 62%), linear-gradient(168deg,#191D21 0%,#101315 58%,#0B0C0E 100%)`,
          }}
        >
          <div
            className="absolute inset-0 opacity-[0.45]"
            style={{
              backgroundImage:
                'linear-gradient(rgba(255,255,255,.035) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.035) 1px,transparent 1px)',
              backgroundSize: '28px 28px',
            }}
          />
          {/* Floor glow lifts the product off the backdrop */}
          <div
            className="absolute inset-x-[12%] bottom-[8%] h-6 rounded-[50%] blur-xl"
            style={{ background: `${p}44` }}
          />
        </div>
      )}

      <div className="relative flex h-full w-full items-center justify-center p-[12%]">
        {art.kind === 'jersey' ? (
          <JerseyGraphic
            uid={uid}
            primary={p}
            secondary={s}
            pattern={art.pattern}
            number="10"
            className="h-full w-full drop-shadow-[0_18px_28px_rgba(0,0,0,.55)]"
          />
        ) : (
          <GearGraphic
            uid={uid}
            kind={art.kind}
            primary={p}
            secondary={s}
            className="h-full w-full drop-shadow-[0_18px_28px_rgba(0,0,0,.55)]"
          />
        )}
      </div>
    </div>
  );
}
