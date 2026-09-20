import type { CSSProperties } from 'react';
import { readableOn } from '@/lib/brand';

export type NeckType =
  | 'Round Neck'
  | 'Polo'
  | 'V Neck'
  | 'Full Sleeve'
  | 'Half Sleeve';

export interface JerseyGraphicProps {
  primary: string;
  secondary: string;
  pattern?: string;
  neck?: NeckType | string;
  teamName?: string;
  playerName?: string;
  number?: string;
  /** Renders the back of the kit (player name over a large number). */
  back?: boolean;
  className?: string;
  style?: CSSProperties;
  /** Unique suffix so multiple jerseys on a page don't share gradient ids. */
  uid?: string;
}

/**
 * SVG element ids end up inside `url(#…)` references, so anything that is not
 * a plain identifier character has to go. Cart keys, for example, carry `#`,
 * `|` and spaces — left in, they silently break the clip path and the whole
 * kit renders as an unclipped block.
 */
const safeId = (s: string) => s.replace(/[^A-Za-z0-9_-]/g, '-');

const BODY_FULL =
  'M96 36 L28 64 L8 132 L78 156 L70 330 Q150 342 230 330 L222 156 L292 132 L272 64 L204 36 Q150 66 96 36 Z';
const BODY_HALF =
  'M96 36 L38 62 L18 126 L80 150 L70 330 Q150 342 230 330 L220 150 L282 126 L262 62 L204 36 Q150 66 96 36 Z';

/**
 * A single, reusable kit renderer. It powers the product artwork, the cart
 * thumbnails and the live customizer preview, so a design always looks the
 * same wherever it appears.
 */
export default function JerseyGraphic({
  primary,
  secondary,
  pattern = 'solid',
  neck = 'Round Neck',
  teamName,
  playerName,
  number,
  back = false,
  className,
  style,
  uid = 'j',
}: JerseyGraphicProps) {
  const id = safeId(uid);
  const clipId = `kit-clip-${id}`;
  const shadeId = `kit-shade-${id}`;
  const glossId = `kit-gloss-${id}`;
  const ink = readableOn(primary);
  const inkOnSecondary = readableOn(secondary);
  const fullSleeve = neck === 'Full Sleeve';
  const body = fullSleeve ? BODY_FULL : BODY_HALF;

  return (
    <svg
      viewBox="0 0 300 360"
      className={className}
      style={style}
      role="img"
      aria-label={`${teamName ? teamName + ' ' : ''}jersey design preview`}
    >
      <defs>
        <clipPath id={clipId}>
          <path d={body} />
        </clipPath>
        {/* Fabric shading: light from upper-left, fold shadow bottom-right. */}
        <linearGradient id={shadeId} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#fff" stopOpacity="0.20" />
          <stop offset="42%" stopColor="#fff" stopOpacity="0.02" />
          <stop offset="100%" stopColor="#000" stopOpacity="0.38" />
        </linearGradient>
        <linearGradient id={glossId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#fff" stopOpacity="0.16" />
          <stop offset="55%" stopColor="#fff" stopOpacity="0" />
        </linearGradient>
      </defs>

      {/* Base */}
      <path d={body} fill={primary} />

      {/* Pattern layer */}
      <g clipPath={`url(#${clipId})`}>
        {pattern === 'stripes' &&
          [0, 1, 2, 3, 4, 5].map((i) => (
            <rect
              key={i}
              x={8 + i * 50}
              y={0}
              width={22}
              height={360}
              fill={secondary}
              opacity={0.92}
            />
          ))}

        {pattern === 'hoops' &&
          [0, 1, 2, 3, 4].map((i) => (
            <rect
              key={i}
              x={0}
              y={70 + i * 58}
              width={300}
              height={24}
              fill={secondary}
              opacity={0.92}
            />
          ))}

        {pattern === 'sash' && (
          <>
            <path d="M-40 300 L200 -40 L268 -40 L28 300 Z" fill={secondary} />
            <path
              d="M-40 336 L228 -40 L246 -40 L-22 336 Z"
              fill="#fff"
              opacity={0.14}
            />
          </>
        )}

        {pattern === 'chevron' && (
          <>
            <path d="M0 150 L150 236 L300 150 L300 200 L150 286 L0 200 Z" fill={secondary} />
            <path
              d="M0 96 L150 182 L300 96 L300 118 L150 204 L0 118 Z"
              fill={secondary}
              opacity={0.5}
            />
          </>
        )}

        {pattern === 'camo' && (
          <g fill={secondary} opacity={0.88}>
            <path d="M-10 60 q50 -30 96 4 t70 -14 q40 22 86 -6 l0 66 q-56 26 -92 2 t-74 16 q-42 -26 -86 -2 Z" />
            <path d="M-10 190 q54 24 92 -2 t78 10 q44 -26 90 0 l0 60 q-54 -24 -96 4 t-74 -12 q-44 22 -90 -4 Z" />
            <path d="M6 300 q60 26 104 -4 t92 12 l0 52 l-196 0 Z" opacity={0.7} />
          </g>
        )}

        {/* Side panels — present on every pattern, keeps the kit looking built */}
        <path d="M78 150 L96 158 L88 340 L70 336 Z" fill="#000" opacity={0.12} />
        <path d="M222 150 L204 158 L212 340 L230 336 Z" fill="#000" opacity={0.12} />

        {/* Sleeve cuffs */}
        <path d="M8 118 L78 142 L74 162 L4 138 Z" fill={secondary} opacity={0.95} />
        <path d="M292 118 L222 142 L226 162 L296 138 Z" fill={secondary} opacity={0.95} />

        {/* Hem band */}
        <path d="M70 318 Q150 330 230 318 L230 332 Q150 344 70 332 Z" fill={secondary} opacity={0.9} />

        <rect width="300" height="360" fill={`url(#${shadeId})`} />
        <rect width="300" height="360" fill={`url(#${glossId})`} />
      </g>

      {/* Collar */}
      {neck === 'V Neck' && (
        <path
          d="M96 36 L150 96 L204 36 L192 32 L150 78 L108 32 Z"
          fill={secondary}
        />
      )}
      {neck === 'Round Neck' && (
        <path
          d="M96 36 Q150 70 204 36 L196 26 Q150 56 104 26 Z"
          fill={secondary}
        />
      )}
      {(neck === 'Half Sleeve' || neck === 'Full Sleeve') && (
        <path
          d="M96 36 Q150 68 204 36 L198 27 Q150 55 102 27 Z"
          fill={secondary}
        />
      )}
      {neck === 'Polo' && (
        <>
          <path d="M112 34 L150 92 L188 34 L166 26 L150 58 L134 26 Z" fill={secondary} />
          <path d="M112 34 L134 26 L142 56 L118 62 Z" fill={secondary} />
          <path d="M188 34 L166 26 L158 56 L182 62 Z" fill={secondary} />
          <rect x="145" y="62" width="10" height="46" fill={secondary} opacity={0.85} />
        </>
      )}

      {/* Outline keeps the silhouette crisp on dark backgrounds */}
      <path d={body} fill="none" stroke="#000" strokeOpacity="0.35" strokeWidth="2" />

      {/* Typography */}
      {back ? (
        <>
          {playerName && (
            <text
              x="150"
              y="140"
              textAnchor="middle"
              fill={ink}
              style={{
                font: '700 20px var(--font-display), system-ui',
                letterSpacing: '3px',
              }}
            >
              {playerName.toUpperCase().slice(0, 14)}
            </text>
          )}
          {number && (
            <text
              x="150"
              y="255"
              textAnchor="middle"
              fill={ink}
              stroke={secondary}
              strokeWidth="3"
              paintOrder="stroke"
              style={{ font: '800 110px var(--font-display), system-ui' }}
            >
              {number.slice(0, 2)}
            </text>
          )}
        </>
      ) : (
        <>
          {teamName && (
            <text
              x="150"
              y="152"
              textAnchor="middle"
              fill={ink}
              style={{
                font: '800 22px var(--font-display), system-ui',
                letterSpacing: '2.5px',
              }}
            >
              {teamName.toUpperCase().slice(0, 16)}
            </text>
          )}
          {number && (
            <text
              x="150"
              y="238"
              textAnchor="middle"
              fill={ink}
              stroke={secondary}
              strokeWidth="2.5"
              paintOrder="stroke"
              style={{ font: '800 74px var(--font-display), system-ui' }}
            >
              {number.slice(0, 2)}
            </text>
          )}
          {playerName && (
            <text
              x="150"
              y="272"
              textAnchor="middle"
              fill={ink}
              opacity={0.85}
              style={{
                font: '700 13px var(--font-display), system-ui',
                letterSpacing: '2px',
              }}
            >
              {playerName.toUpperCase().slice(0, 16)}
            </text>
          )}
          {/* Brand mark on the chest */}
          <circle cx="108" cy="118" r="9" fill={secondary} opacity={0.9} />
          <text
            x="108"
            y="122"
            textAnchor="middle"
            fill={inkOnSecondary}
            style={{ font: '800 10px var(--font-display), system-ui' }}
          >
            S
          </text>
        </>
      )}
    </svg>
  );
}
