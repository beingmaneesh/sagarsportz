import Image from 'next/image';
import Link from 'next/link';

interface LogoProps {
  /** Slightly smaller mark for the condensed navbar on scroll. */
  compact?: boolean;
  className?: string;
  /** Set on the navbar instance only — it's above the fold on every page. */
  priority?: boolean;
}

/**
 * The Sagar Sportz lockup: SZ monogram, "SAGAR" in white, "SPORTZ" in red.
 * Source file: `public/logo.png` (837 × 262, transparent — built for dark
 * backgrounds). Replace that file to change the logo everywhere.
 */
export default function Logo({
  compact = false,
  className = '',
  priority = false,
}: LogoProps) {
  return (
    <Link
      href="/"
      aria-label="Sagar Sportz — home"
      className={`flex shrink-0 items-center transition-transform duration-300 hover:scale-[1.03] ${className}`}
    >
      <Image
        src="/logo.png"
        alt="Sagar Sportz"
        width={837}
        height={262}
        priority={priority}
        /* Generous hint: the lockup is ~3.2:1, so a 48 px-tall render is
           ~154 CSS px wide and needs ~2× that to stay crisp on retina. */
        sizes="360px"
        className={`w-auto transition-all duration-300 ${
          compact ? 'h-9' : 'h-11 sm:h-12'
        }`}
      />
    </Link>
  );
}
