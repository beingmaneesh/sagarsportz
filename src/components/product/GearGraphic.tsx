import type { ArtKind } from '@/lib/types';

interface Props {
  kind: ArtKind;
  primary: string;
  secondary: string;
  uid?: string;
  className?: string;
}

/**
 * Vector renderings for non-apparel products. Each shape is drawn in a
 * 0 0 300 300 box so every product tile reads at the same visual weight.
 */
export default function GearGraphic({
  kind,
  primary,
  secondary,
  uid = 'g',
  className,
}: Props) {
  // Ids land inside `url(#…)`, so strip anything that is not identifier-safe —
  // cart keys carry `#`, `|` and spaces, which would break every reference.
  const gid = `gear-${uid.replace(/[^A-Za-z0-9_-]/g, '-')}`;
  const shade = `${gid}-shade`;
  const sphere = `${gid}-sphere`;

  const defs = (
    <defs>
      <radialGradient id={sphere} cx="35%" cy="28%" r="78%">
        <stop offset="0%" stopColor="#fff" stopOpacity="0.55" />
        <stop offset="45%" stopColor="#fff" stopOpacity="0.06" />
        <stop offset="100%" stopColor="#000" stopOpacity="0.5" />
      </radialGradient>
      <linearGradient id={shade} x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#fff" stopOpacity="0.22" />
        <stop offset="50%" stopColor="#fff" stopOpacity="0.02" />
        <stop offset="100%" stopColor="#000" stopOpacity="0.4" />
      </linearGradient>
    </defs>
  );

  const shapes: Record<ArtKind, React.ReactNode> = {
    /* ---------------- balls ---------------- */
    football: (
      <>
        <circle cx="150" cy="150" r="104" fill={primary} />
        <g fill={secondary}>
          <path d="M150 78 l34 25 -13 40 h-42 l-13 -40 Z" />
          <path d="M62 150 l30 -22 26 22 -10 40 -36 4 Z" opacity="0.9" />
          <path d="M238 150 l-30 -22 -26 22 10 40 36 4 Z" opacity="0.9" />
          <path d="M150 248 l-32 -24 12 -32 h40 l12 32 Z" opacity="0.9" />
        </g>
        <circle cx="150" cy="150" r="104" fill={`url(#${sphere})`} />
        <circle
          cx="150"
          cy="150"
          r="104"
          fill="none"
          stroke="#000"
          strokeOpacity="0.35"
          strokeWidth="2"
        />
      </>
    ),
    basketball: (
      <>
        <circle cx="150" cy="150" r="104" fill={primary} />
        <g stroke={secondary} strokeWidth="6" fill="none" strokeLinecap="round">
          <line x1="46" y1="150" x2="254" y2="150" />
          <line x1="150" y1="46" x2="150" y2="254" />
          <path d="M74 78 Q150 150 74 222" />
          <path d="M226 78 Q150 150 226 222" />
        </g>
        <circle cx="150" cy="150" r="104" fill={`url(#${sphere})`} />
      </>
    ),
    ball: (
      <>
        <circle cx="150" cy="150" r="100" fill={primary} />
        <path
          d="M150 50 Q186 150 150 250"
          fill="none"
          stroke={secondary}
          strokeWidth="9"
        />
        <g stroke={secondary} strokeWidth="3" strokeLinecap="round">
          {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
            <line
              key={i}
              x1={138 + Math.sin(i) * 2}
              y1={72 + i * 22}
              x2={172}
              y2={78 + i * 22}
            />
          ))}
        </g>
        <circle cx="150" cy="150" r="100" fill={`url(#${sphere})`} />
      </>
    ),

    /* ---------------- cricket ---------------- */
    bat: (
      <>
        <rect x="138" y="22" width="24" height="96" rx="12" fill="#2A2F35" />
        <g stroke={secondary} strokeWidth="3" opacity="0.7">
          {[34, 48, 62, 76, 90, 104].map((y) => (
            <line key={y} x1="138" y1={y} x2="162" y2={y} />
          ))}
        </g>
        <path
          d="M118 118 q32 -14 64 0 l6 130 q0 22 -38 22 t-38 -22 Z"
          fill={primary}
        />
        <g stroke="#000" strokeOpacity="0.12" strokeWidth="2">
          {[128, 140, 152, 164, 176].map((x) => (
            <line key={x} x1={x} y1="124" x2={x} y2="262" />
          ))}
        </g>
        <path d="M112 246 q38 14 76 0 l2 18 q-40 16 -80 0 Z" fill={secondary} />
        <path
          d="M118 118 q32 -14 64 0 l6 130 q0 22 -38 22 t-38 -22 Z"
          fill={`url(#${shade})`}
        />
      </>
    ),
    pads: (
      <>
        {[86, 166].map((x, i) => (
          <g key={x}>
            <rect x={x} y="44" width="52" height="210" rx="20" fill={primary} />
            <rect x={x + 4} y="52" width="44" height="60" rx="14" fill="#fff" opacity="0.12" />
            {[92, 140, 188].map((y) => (
              <rect
                key={y}
                x={x - 6}
                y={y}
                width="64"
                height="10"
                rx="5"
                fill={secondary}
                opacity={0.85}
              />
            ))}
            <rect
              x={x}
              y="44"
              width="52"
              height="210"
              rx="20"
              fill={`url(#${shade})`}
              opacity={i ? 0.9 : 1}
            />
          </g>
        ))}
      </>
    ),
    helmet: (
      <>
        <path
          d="M52 150 a98 98 0 0 1 196 0 l0 26 -46 0 0 -22 a52 52 0 0 0 -104 0 l0 74 -46 0 Z"
          fill={primary}
        />
        <path d="M52 150 a98 98 0 0 1 196 0 l0 12 -196 0 Z" fill="#fff" opacity="0.1" />
        <g stroke={secondary} strokeWidth="7" strokeLinecap="round" fill="none">
          <path d="M108 168 q52 -10 96 6" />
          <path d="M104 198 q56 -10 100 6" />
          <path d="M106 228 q54 -8 96 4" />
          <path d="M108 168 L106 228" />
          <path d="M204 174 L202 232" />
        </g>
        <path d="M62 226 l46 0 0 26 -46 0 Z" fill={secondary} opacity="0.9" />
      </>
    ),
    gloves: (
      <>
        <path
          d="M88 118 q0 -30 24 -30 t24 30 l0 18 6 -34 q4 -26 26 -22 t20 28 l-6 40 10 -22 q10 -22 28 -12 t10 30 l-22 76 q-14 48 -62 48 t-62 -44 l-16 -72 q-6 -26 14 -32 t26 14 Z"
          fill={primary}
        />
        <g fill={secondary} opacity="0.9">
          <rect x="96" y="212" width="112" height="16" rx="8" />
          <rect x="102" y="106" width="22" height="58" rx="11" opacity="0.6" />
          <rect x="132" y="96" width="22" height="66" rx="11" opacity="0.6" />
          <rect x="162" y="104" width="22" height="60" rx="11" opacity="0.6" />
        </g>
        <path
          d="M88 118 q0 -30 24 -30 t24 30 l0 18 6 -34 q4 -26 26 -22 t20 28 l-6 40 10 -22 q10 -22 28 -12 t10 30 l-22 76 q-14 48 -62 48 t-62 -44 l-16 -72 q-6 -26 14 -32 t26 14 Z"
          fill={`url(#${shade})`}
        />
      </>
    ),

    /* ---------------- racket sports ---------------- */
    racket: (
      <>
        <ellipse cx="150" cy="104" rx="72" ry="86" fill="none" stroke={primary} strokeWidth="14" />
        <g stroke={secondary} strokeWidth="2" opacity="0.55">
          {[-48, -32, -16, 0, 16, 32, 48].map((d) => (
            <line key={`v${d}`} x1={150 + d} y1="26" x2={150 + d} y2="182" />
          ))}
          {[-64, -44, -24, -4, 16, 36, 56].map((d) => (
            <line key={`h${d}`} x1="82" y1={104 + d} x2="218" y2={104 + d} />
          ))}
        </g>
        <path d="M120 176 L142 216 M180 176 L158 216" stroke={primary} strokeWidth="12" strokeLinecap="round" />
        <rect x="140" y="212" width="20" height="66" rx="8" fill={secondary} />
        <g stroke="#000" strokeOpacity="0.25" strokeWidth="2">
          {[224, 236, 248, 260].map((y) => (
            <line key={y} x1="140" y1={y} x2="160" y2={y - 6} />
          ))}
        </g>
      </>
    ),
    shuttle: (
      <>
        <path d="M110 200 L82 86 q68 -34 136 0 L190 200 Z" fill={primary} opacity="0.5" />
        <g stroke={secondary} strokeWidth="3" fill={primary}>
          {[-52, -34, -16, 2, 20, 38].map((d, i) => (
            <path
              key={i}
              d={`M${150 + d * 0.42} 200 L${150 + d} 84 q10 -8 18 2 L${150 + d * 0.42 + 14} 200 Z`}
              opacity={0.85}
            />
          ))}
        </g>
        <path d="M108 196 q42 16 84 0 l0 12 q-42 16 -84 0 Z" fill={secondary} />
        <path d="M110 208 q40 44 80 0 l0 32 q-40 40 -80 0 Z" fill="#E8D3A9" />
        <path d="M110 208 q40 44 80 0 l0 32 q-40 40 -80 0 Z" fill={`url(#${shade})`} />
      </>
    ),
    net: (
      <>
        <rect x="30" y="74" width="240" height="18" rx="4" fill={secondary} />
        <rect x="30" y="92" width="240" height="132" fill="none" stroke={primary} strokeWidth="3" opacity="0.5" />
        <g stroke={primary} strokeWidth="2" opacity="0.65">
          {Array.from({ length: 13 }, (_, i) => (
            <line key={`v${i}`} x1={30 + i * 20} y1="92" x2={30 + i * 20} y2="224" />
          ))}
          {Array.from({ length: 8 }, (_, i) => (
            <line key={`h${i}`} x1="30" y1={92 + i * 19} x2="270" y2={92 + i * 19} />
          ))}
        </g>
        <rect x="22" y="60" width="12" height="190" rx="6" fill={secondary} />
        <rect x="266" y="60" width="12" height="190" rx="6" fill={secondary} />
      </>
    ),

    /* ---------------- footwear ---------------- */
    shoe: (
      <>
        <path
          d="M40 200 q0 -34 26 -40 l52 -12 42 -46 q14 -14 30 -4 l10 26 54 26 q34 16 34 44 l0 16 q0 14 -18 14 L58 224 q-18 0 -18 -24 Z"
          fill={primary}
        />
        <path
          d="M38 218 q0 -10 20 -10 l212 0 q18 0 18 14 l0 10 q0 12 -18 12 L58 244 q-20 0 -20 -14 Z"
          fill={secondary}
        />
        <path d="M118 148 q40 6 78 42" stroke={secondary} strokeWidth="10" fill="none" strokeLinecap="round" opacity="0.95" />
        <g stroke="#000" strokeOpacity="0.28" strokeWidth="3" strokeLinecap="round">
          <path d="M128 156 l18 -16 M148 164 l18 -16 M168 174 l18 -16" />
        </g>
        <path
          d="M40 200 q0 -34 26 -40 l52 -12 42 -46 q14 -14 30 -4 l10 26 54 26 q34 16 34 44 l0 16 q0 14 -18 14 L58 224 q-18 0 -18 -24 Z"
          fill={`url(#${shade})`}
        />
      </>
    ),
    shinguard: (
      <>
        {[84, 160].map((x) => (
          <g key={x}>
            <path
              d={`M${x} 70 q28 -12 56 0 l-6 128 q-22 12 -44 0 Z`}
              fill={primary}
            />
            <path d={`M${x + 22} 80 l12 0 -4 110 -12 0 Z`} fill={secondary} opacity="0.7" />
            <path
              d={`M${x} 70 q28 -12 56 0 l-6 128 q-22 12 -44 0 Z`}
              fill={`url(#${shade})`}
            />
            <rect x={x - 2} y="204" width="60" height="42" rx="12" fill={secondary} opacity="0.9" />
          </g>
        ))}
      </>
    ),

    /* ---------------- apparel ---------------- */
    jersey: null,
    tshirt: (
      <>
        <path
          d="M104 56 L52 80 L36 134 L88 154 L80 268 Q150 280 220 268 L212 154 L264 134 L248 80 L196 56 Q150 84 104 56 Z"
          fill={primary}
        />
        <path d="M104 56 Q150 86 196 56 L188 48 Q150 72 112 48 Z" fill={secondary} />
        <rect x="112" y="152" width="76" height="52" rx="6" fill={secondary} opacity="0.92" />
        <path
          d="M104 56 L52 80 L36 134 L88 154 L80 268 Q150 280 220 268 L212 154 L264 134 L248 80 L196 56 Q150 84 104 56 Z"
          fill={`url(#${shade})`}
        />
      </>
    ),
    polo: (
      <>
        <path
          d="M104 58 L52 82 L36 136 L88 156 L80 268 Q150 280 220 268 L212 156 L264 136 L248 82 L196 58 Q150 86 104 58 Z"
          fill={primary}
        />
        <path d="M118 56 L150 106 L182 56 L164 48 L150 74 L136 48 Z" fill={secondary} />
        <path d="M118 56 L136 48 L142 76 L122 82 Z" fill={secondary} />
        <path d="M182 56 L164 48 L158 76 L178 82 Z" fill={secondary} />
        <rect x="146" y="80" width="8" height="42" fill={secondary} opacity="0.9" />
        <path d="M36 128 l52 20 -4 16 -52 -20 Z" fill={secondary} opacity="0.9" />
        <path d="M264 128 l-52 20 4 16 52 -20 Z" fill={secondary} opacity="0.9" />
        <path
          d="M104 58 L52 82 L36 136 L88 156 L80 268 Q150 280 220 268 L212 156 L264 136 L248 82 L196 58 Q150 86 104 58 Z"
          fill={`url(#${shade})`}
        />
      </>
    ),
    lower: (
      <>
        <path d="M92 40 h116 l14 66 -8 158 h-44 l-16 -132 -16 132 h-44 l-8 -158 Z" fill={primary} />
        <rect x="92" y="34" width="116" height="24" rx="8" fill={secondary} />
        <path d="M98 70 l6 190 h10 l-8 -190 Z" fill={secondary} opacity="0.8" />
        <path d="M202 70 l-6 190 h-10 l8 -190 Z" fill={secondary} opacity="0.8" />
        <path d="M92 40 h116 l14 66 -8 158 h-44 l-16 -132 -16 132 h-44 l-8 -158 Z" fill={`url(#${shade})`} />
      </>
    ),
    shorts: (
      <>
        <path d="M78 66 h144 l10 52 -6 98 h-52 l-14 -76 -14 76 h-52 l-6 -98 Z" fill={primary} />
        <rect x="78" y="60" width="144" height="22" rx="8" fill={secondary} />
        <path d="M148 90 l4 0 0 126 -4 0 Z" fill={secondary} opacity="0.5" />
        <path d="M78 66 h144 l10 52 -6 98 h-52 l-14 -76 -14 76 h-52 l-6 -98 Z" fill={`url(#${shade})`} />
      </>
    ),
    tracksuit: (
      <>
        <path
          d="M106 52 L56 78 L40 138 L88 158 L82 264 Q150 276 218 264 L212 158 L260 138 L244 78 L194 52 Z"
          fill={primary}
        />
        <rect x="142" y="52" width="16" height="216" fill={secondary} opacity="0.95" />
        <rect x="145" y="52" width="10" height="216" fill="#000" opacity="0.28" />
        <path d="M106 52 L194 52 L190 40 L110 40 Z" fill={secondary} />
        <path d="M56 78 L88 158 L74 164 L40 92 Z" fill={secondary} opacity="0.7" />
        <path d="M244 78 L212 158 L226 164 L260 92 Z" fill={secondary} opacity="0.7" />
        <path
          d="M106 52 L56 78 L40 138 L88 158 L82 264 Q150 276 218 264 L212 158 L260 138 L244 78 L194 52 Z"
          fill={`url(#${shade})`}
        />
      </>
    ),
    cap: (
      <>
        <path d="M60 176 q0 -108 90 -108 t90 108 Z" fill={primary} />
        <path d="M150 68 q-46 36 -46 108 h16 q0 -74 30 -108 Z" fill="#000" opacity="0.12" />
        <path d="M150 68 q46 36 46 108 h-16 q0 -74 -30 -108 Z" fill="#000" opacity="0.08" />
        <path d="M56 176 h188 q44 4 44 26 q0 16 -44 16 H56 Z" fill={secondary} />
        <circle cx="150" cy="72" r="8" fill={secondary} />
        <ellipse cx="150" cy="140" rx="30" ry="18" fill={secondary} opacity="0.85" />
        <path d="M60 176 q0 -108 90 -108 t90 108 Z" fill={`url(#${shade})`} />
      </>
    ),
    socks: (
      <>
        {[92, 158].map((x, i) => (
          <g key={x} opacity={i ? 0.92 : 1}>
            <path d={`M${x} 48 h48 v104 q0 26 26 30 l0 44 q-74 -6 -74 -70 Z`} fill={primary} />
            <rect x={x} y="48" width="48" height="26" fill={secondary} />
            <path d={`M${x + 44} 182 q30 4 30 24 l0 20 q-40 -2 -46 -30 Z`} fill={secondary} opacity="0.8" />
            <path d={`M${x} 48 h48 v104 q0 26 26 30 l0 44 q-74 -6 -74 -70 Z`} fill={`url(#${shade})`} />
          </g>
        ))}
      </>
    ),
    support: (
      <>
        <path d="M96 52 h108 l14 64 q-20 34 0 68 l-14 64 h-108 l-14 -64 q20 -34 0 -68 Z" fill={primary} />
        <ellipse cx="150" cy="150" rx="36" ry="30" fill="none" stroke={secondary} strokeWidth="9" />
        <rect x="82" y="66" width="136" height="12" fill={secondary} opacity="0.9" />
        <rect x="82" y="224" width="136" height="12" fill={secondary} opacity="0.9" />
        <g stroke="#000" strokeOpacity="0.12" strokeWidth="2">
          {[100, 116, 132, 168, 184, 200].map((y) => (
            <line key={y} x1="88" y1={y} x2="212" y2={y} />
          ))}
        </g>
        <path d="M96 52 h108 l14 64 q-20 34 0 68 l-14 64 h-108 l-14 -64 q20 -34 0 -68 Z" fill={`url(#${shade})`} />
      </>
    ),
  };

  return (
    <svg viewBox="0 0 300 300" className={className} role="presentation">
      {defs}
      {shapes[kind]}
    </svg>
  );
}
