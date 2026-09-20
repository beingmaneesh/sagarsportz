import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import Reveal from './Reveal';

interface Props {
  eyebrow?: string;
  title: string;
  /** Second line, rendered in outline type for the editorial sports look. */
  titleAccent?: string;
  description?: string;
  href?: string;
  linkLabel?: string;
  align?: 'left' | 'center';
  className?: string;
}

export default function SectionHeading({
  eyebrow,
  title,
  titleAccent,
  description,
  href,
  linkLabel = 'View all',
  align = 'left',
  className = '',
}: Props) {
  const centered = align === 'center';

  return (
    <Reveal
      className={`mb-9 flex flex-col gap-5 sm:mb-12 ${
        centered
          ? 'items-center text-center'
          : 'sm:flex-row sm:items-end sm:justify-between'
      } ${className}`}
    >
      <div className={centered ? 'max-w-3xl' : 'max-w-2xl'}>
        {eyebrow && (
          <span className="eyebrow mb-3">
            <span className="h-px w-6 bg-accent" aria-hidden />
            {eyebrow}
          </span>
        )}
        <h2 className="text-[clamp(2rem,5.4vw,3.75rem)] text-balance">
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
        </h2>
        {description && (
          <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-bone-400 text-pretty">
            {description}
          </p>
        )}
      </div>

      {href && (
        <Link
          href={href}
          className="btn btn-outline btn-md shrink-0 self-start sm:self-auto"
        >
          {linkLabel}
          <ArrowUpRight className="h-4 w-4" />
        </Link>
      )}
    </Reveal>
  );
}
