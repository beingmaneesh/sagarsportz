import type { Config } from 'tailwindcss';

/**
 * Tailwind's default opacity scale jumps 5 → 10 → 20, which is too coarse for
 * the hairline borders this design leans on. A full 0–100 scale keeps values
 * like `border-white/12` valid inside `@apply` as well as in class names.
 */
const opacity = Object.fromEntries(
  Array.from({ length: 101 }, (_, i) => [i, (i / 100).toString()]),
);

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      opacity,
      colors: {
        ink: {
          DEFAULT: '#08090A',
          900: '#0B0C0E',
          800: '#111315',
          700: '#16191C',
          600: '#1D2126',
          500: '#282D33',
          400: '#3A4048',
        },
        bone: {
          DEFAULT: '#F6F7F8',
          200: '#E9EBED',
          300: '#D4D8DC',
          400: '#A8AEB5',
        },
        accent: {
          DEFAULT: '#E31E24',
          soft: '#FF353C',
          deep: '#AE1218',
        },
        flame: '#FF7A1A',
      },
      fontFamily: {
        display: ['var(--font-display)'],
        sans: ['var(--font-sans)'],
      },
      letterSpacing: {
        tightest: '-0.045em',
      },
      borderRadius: {
        card: '14px',
      },
      boxShadow: {
        card: '0 1px 2px rgba(0,0,0,.28), 0 12px 32px -12px rgba(0,0,0,.55)',
        lift: '0 24px 60px -20px rgba(0,0,0,.7)',
        glow: '0 0 0 1px rgba(227,30,36,.45), 0 16px 48px -16px rgba(227,30,36,.45)',
      },
      maxWidth: {
        site: '1400px',
      },
      keyframes: {
        'fade-up': {
          from: { opacity: '0', transform: 'translateY(16px)' },
          to: { opacity: '1', transform: 'none' },
        },
        'fade-in': {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        marquee: {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(-50%)' },
        },
        'slide-in-right': {
          from: { transform: 'translateX(100%)' },
          to: { transform: 'none' },
        },
        pop: {
          '0%': { transform: 'scale(1)' },
          '40%': { transform: 'scale(1.18)' },
          '100%': { transform: 'scale(1)' },
        },
      },
      animation: {
        'fade-up': 'fade-up .6s cubic-bezier(.22,1,.36,1) both',
        'fade-in': 'fade-in .5s ease both',
        marquee: 'marquee 32s linear infinite',
        'slide-in-right': 'slide-in-right .32s cubic-bezier(.22,1,.36,1) both',
        pop: 'pop .35s ease',
      },
    },
  },
  plugins: [],
};

export default config;
