'use client';

import { Minus, Plus } from 'lucide-react';

interface Props {
  value: number;
  onChange: (n: number) => void;
  min?: number;
  max?: number;
  size?: 'sm' | 'md';
  label?: string;
}

export default function QuantityStepper({
  value,
  onChange,
  min = 1,
  max = 999,
  size = 'md',
  label = 'Quantity',
}: Props) {
  const clamp = (n: number) => Math.max(min, Math.min(max, n));
  const dim = size === 'sm' ? 'h-8 w-8' : 'h-11 w-11';

  return (
    <div
      className="inline-flex items-center rounded-full border border-white/15 bg-ink-900"
      role="group"
      aria-label={label}
    >
      <button
        type="button"
        onClick={() => onChange(clamp(value - 1))}
        disabled={value <= min}
        aria-label="Decrease quantity"
        className={`${dim} grid place-items-center rounded-full text-bone-400 transition-colors hover:text-bone disabled:opacity-30`}
      >
        <Minus className={size === 'sm' ? 'h-3.5 w-3.5' : 'h-4 w-4'} />
      </button>

      <input
        type="number"
        value={value}
        min={min}
        max={max}
        aria-label={label}
        onChange={(e) => onChange(clamp(Number(e.target.value) || min))}
        className={`${
          size === 'sm' ? 'w-9 text-sm' : 'w-12 text-base'
        } border-0 bg-transparent text-center font-display font-bold text-bone [appearance:textfield] focus:outline-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none`}
      />

      <button
        type="button"
        onClick={() => onChange(clamp(value + 1))}
        disabled={value >= max}
        aria-label="Increase quantity"
        className={`${dim} grid place-items-center rounded-full text-bone-400 transition-colors hover:text-bone disabled:opacity-30`}
      >
        <Plus className={size === 'sm' ? 'h-3.5 w-3.5' : 'h-4 w-4'} />
      </button>
    </div>
  );
}
