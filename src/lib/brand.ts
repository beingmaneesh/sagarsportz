/**
 * Brand colours, taken from the Sagar Sportz logo: red, white and black.
 *
 * Tailwind classes (`text-accent`, `bg-accent`, …) cover most of the UI — these
 * raw values exist for the places CSS classes can't reach: SVG artwork,
 * inline gradients and canvas-style backdrops. Change a colour here and in
 * `tailwind.config.ts` and it changes everywhere.
 */
export const brand = {
  /** Primary brand red — CTAs, active states, highlights. */
  red: '#E31E24',
  /** Lighter red for hovers and glows on dark ground. */
  redSoft: '#FF353C',
  /** Deeper red for pressed states and shadows. */
  redDeep: '#AE1218',
  /** Secondary warm accent — discounts, warnings, destructive hovers. */
  orange: '#FF7A1A',
  white: '#F6F7F8',
  ink: '#08090A',
} as const;

/** `rgba()` helper for the translucent washes used behind hero sections. */
export const redAlpha = (a: number) => `rgba(227, 30, 36, ${a})`;

/**
 * Picks black or white text for any background colour, by relative luminance.
 * Used for kit lettering and for the tick on a selected colour swatch — a
 * hard-coded list of "light" hexes breaks the moment someone picks a custom
 * colour in the configurator.
 */
export function readableOn(hex: string): string {
  const h = hex.replace('#', '');
  const full =
    h.length === 3
      ? h
          .split('')
          .map((c) => c + c)
          .join('')
      : h;

  const channel = (i: number) => parseInt(full.slice(i, i + 2), 16) / 255;
  const lin = (c: number) =>
    c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);

  const L =
    0.2126 * lin(channel(0)) +
    0.7152 * lin(channel(2)) +
    0.0722 * lin(channel(4));

  return L > 0.42 ? '#0B0C0E' : '#F6F7F8';
}
