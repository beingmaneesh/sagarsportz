import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

interface Crumb {
  href?: string;
  label: string;
}

interface Props {
  eyebrow?: string;
  title: string;
  titleAccent?: string;
  description?: string;
  crumbs?: Crumb[];
  children?: React.ReactNode;
  /** Tint behind the heading — usually the section's own accent colour. */
  accent?: string;
}

export default function PageHero({
  eyebrow,
  title,
  titleAccent,
  description,
  crumbs = [],
  children,
  accent = '#E31E24',
}: Props) {
  return (
    <section className="relative overflow-hidden border-b border-white/10">
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background: `radial-gradient(85% 70% at 82% 0%, ${accent}1f 0%, transparent 58%)`,
        }}
      />
      <div
        aria-hidden
        className="absolute inset-0 opacity-50"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,.022) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.022) 1px,transparent 1px)',
          backgroundSize: '56px 56px',
          maskImage:
            'radial-gradient(80% 90% at 40% 20%, #000 20%, transparent 80%)',
        }}
      />

      <div className="container-site relative py-12 sm:py-16">
        {crumbs.length > 0 && (
          <nav aria-label="Breadcrumb" className="mb-5">
            <ol className="flex flex-wrap items-center gap-1 text-xs text-bone-400">
              <li>
                <Link href="/" className="transition-colors hover:text-accent">
                  Home
                </Link>
              </li>
              {crumbs.map((c) => (
                <li key={c.label} className="flex items-center gap-1">
                  <ChevronRight className="h-3 w-3 opacity-50" />
                  {c.href ? (
                    <Link
                      href={c.href}
                      className="transition-colors hover:text-accent"
                    >
                      {c.label}
                    </Link>
                  ) : (
                    <span className="text-bone">{c.label}</span>
                  )}
                </li>
              ))}
            </ol>
          </nav>
        )}

        {eyebrow && (
          <span className="eyebrow mb-3">
            <span className="h-px w-6 bg-accent" aria-hidden />
            {eyebrow}
          </span>
        )}

        <h1 className="max-w-4xl text-[clamp(2.2rem,6.4vw,4.5rem)] text-balance">
          {title}
          {titleAccent && (
            <>
              {' '}
              <span
                className="text-transparent"
                style={{ WebkitTextStroke: '1.5px rgba(246,247,248,.42)' }}
              >
                {titleAccent}
              </span>
            </>
          )}
        </h1>

        {description && (
          <p className="mt-5 max-w-2xl text-[15px] leading-relaxed text-bone-400 text-pretty sm:text-base">
            {description}
          </p>
        )}

        {children && <div className="mt-7">{children}</div>}
      </div>
    </section>
  );
}
