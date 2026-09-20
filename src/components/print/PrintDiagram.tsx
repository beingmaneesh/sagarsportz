interface Props {
  method: 'dtf' | 'sublimation';
  accent: string;
  className?: string;
}

/**
 * Cross-section of a printed fabric, which is the honest way to show why the
 * two methods behave differently: DTF lays a film *on* the weave, sublimation
 * dyes the fibres themselves.
 */
export default function PrintDiagram({ method, accent, className }: Props) {
  const isDtf = method === 'dtf';
  const uid = method;
  const weaveId = `weave-${uid}`;
  const fadeId = `fade-${uid}`;

  // Warp threads, drawn as rounded verticals so the slab reads as fabric.
  const threads = Array.from({ length: 17 }, (_, i) => 26 + i * 16);

  return (
    <svg
      viewBox="0 0 320 190"
      className={className}
      role="img"
      aria-label={
        isDtf
          ? 'Cross-section: DTF ink film bonded on top of the fabric weave'
          : 'Cross-section: sublimation dye bonded inside the fabric fibres'
      }
    >
      <defs>
        <linearGradient id={fadeId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={accent} stopOpacity="0.95" />
          <stop
            offset="100%"
            stopColor={accent}
            stopOpacity={isDtf ? '0.95' : '0.22'}
          />
        </linearGradient>
        <clipPath id={weaveId}>
          <rect x="18" y="96" width="284" height="62" rx="8" />
        </clipPath>
      </defs>

      {/* Fabric slab */}
      <rect
        x="18"
        y="96"
        width="284"
        height="62"
        rx="8"
        fill={isDtf ? '#2A2F35' : `url(#${fadeId})`}
      />

      {/* Weave texture */}
      <g clipPath={`url(#${weaveId})`}>
        {threads.map((x) => (
          <rect
            key={x}
            x={x}
            y="92"
            width="7"
            height="70"
            rx="3.5"
            fill="#000"
            opacity="0.16"
          />
        ))}
        {/* Weft shadow, gives the slab depth */}
        <rect x="18" y="140" width="284" height="18" fill="#000" opacity="0.22" />
      </g>

      {isDtf ? (
        <>
          {/* Ink film sitting on the surface, with visible thickness */}
          <rect x="18" y="80" width="284" height="17" rx="4" fill={accent} />
          <rect x="18" y="80" width="284" height="5" rx="2" fill="#fff" opacity="0.28" />
          <line
            x1="18"
            y1="97"
            x2="302"
            y2="97"
            stroke="#000"
            strokeOpacity="0.45"
            strokeWidth="2"
          />
        </>
      ) : (
        // Dye reaching down into the threads — no separate surface layer
        <g clipPath={`url(#${weaveId})`} opacity="0.9">
          {threads.map((x, i) => (
            <rect
              key={x}
              x={x}
              y="92"
              width="7"
              height={30 + (i % 3) * 9}
              rx="3.5"
              fill={accent}
            />
          ))}
        </g>
      )}

      {/* Callout */}
      <g>
        <line
          x1="252"
          y1={isDtf ? 60 : 62}
          x2="252"
          y2={isDtf ? 80 : 118}
          stroke={accent}
          strokeWidth="1.5"
          strokeDasharray="3 3"
        />
        <circle cx="252" cy={isDtf ? 80 : 118} r="3.5" fill={accent} />
        <text
          x="244"
          y={isDtf ? 52 : 54}
          textAnchor="end"
          fill="#A8AEB5"
          style={{ font: '600 12px var(--font-sans), system-ui' }}
        >
          {isDtf ? 'Ink film bonded on top' : 'Dye bonded inside the fibre'}
        </text>
      </g>

      {/* Baseline label */}
      <text
        x="18"
        y="178"
        fill="#6B7280"
        style={{
          font: '700 10px var(--font-display), system-ui',
          letterSpacing: '1.6px',
        }}
      >
        {isDtf ? 'COTTON / POLY / BLEND' : 'POLYESTER'}
      </text>
    </svg>
  );
}
