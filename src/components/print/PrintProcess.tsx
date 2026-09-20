import { PenTool, Printer, Scissors, Truck, ArrowRight } from 'lucide-react';
import Reveal from '@/components/ui/Reveal';

export const PIPELINE = [
  { Icon: PenTool, label: 'Design', body: 'Share your idea, crest or artwork.' },
  { Icon: Printer, label: 'Print', body: 'DTF or sublimation, in-house.' },
  { Icon: Scissors, label: 'Finish', body: 'Cut, stitched and quality checked.' },
  { Icon: Truck, label: 'Deliver', body: 'Packed per player, shipped to you.' },
];

/**
 * DESIGN → PRINT → FINISH → DELIVER. Shared by the homepage printing section
 * and the printing page so the two can never drift apart.
 */
export default function PrintProcess({ className = '' }: { className?: string }) {
  return (
    <Reveal>
      <ol className={`grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-0 ${className}`}>
        {PIPELINE.map(({ Icon, label, body }, i) => (
          <li
            key={label}
            className="relative flex flex-col items-center rounded-card border border-white/10 bg-ink-800 p-5 text-center sm:rounded-none sm:border-x-0 sm:border-y sm:first:rounded-l-card sm:first:border-l sm:last:rounded-r-card sm:last:border-r"
          >
            <span className="grid h-11 w-11 place-items-center rounded-full bg-accent/10 text-accent">
              <Icon className="h-5 w-5" />
            </span>
            <p className="mt-3 font-display text-lg font-bold uppercase tracking-tight">
              {label}
            </p>
            <p className="mt-1 text-xs leading-snug text-bone-400">{body}</p>

            {i < PIPELINE.length - 1 && (
              <ArrowRight
                aria-hidden
                className="absolute -right-2.5 top-1/2 hidden h-5 w-5 -translate-y-1/2 text-accent/60 sm:block"
              />
            )}
          </li>
        ))}
      </ol>
    </Reveal>
  );
}
