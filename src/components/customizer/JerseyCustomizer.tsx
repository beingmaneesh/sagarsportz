'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import {
  Upload,
  X,
  RotateCw,
  ShoppingBag,
  MessageCircle,
  Check,
  Shuffle,
} from 'lucide-react';
import { customizerOptions } from '@/lib/categories';
import { getCustomisable, effectivePrice } from '@/lib/products';
import {
  buildCustomisationMessage,
  formatPrice,
  whatsappLink,
} from '@/lib/whatsapp';
import { siteConfig } from '@/lib/config';
import { readableOn } from '@/lib/brand';
import { useCart } from '@/store/cart';
import JerseyGraphic, {
  type NeckType,
} from '@/components/product/JerseyGraphic';
import QuantityStepper from '@/components/product/QuantityStepper';

const SIZES = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];
const MAX_UPLOAD_MB = 5;

/** Maps the configurator's sport choice onto a catalogue product. */
const SPORT_TO_SLUG: Record<string, string> = {
  Football: 'custom-football-jersey',
  Cricket: 'custom-cricket-jersey',
  Basketball: 'custom-basketball-jersey',
  Volleyball: 'custom-volleyball-jersey',
};

interface UploadState {
  name: string;
  dataUrl: string;
}

/** "Sagar Red (#E31E24)" reads far better than a bare hex in a WhatsApp order. */
function colourLabel(hex: string) {
  const match = customizerOptions.palette.find(
    (c) => c.hex.toLowerCase() === hex.toLowerCase(),
  );
  return match ? `${match.name} (${hex.toUpperCase()})` : hex.toUpperCase();
}

/* -------------------------------------------------------------------- */
/* Sub-components live at module scope on purpose. Declared inside the    */
/* render body they would get a fresh identity on every keystroke, which  */
/* remounts their inputs and steals focus mid-typing.                     */
/* -------------------------------------------------------------------- */

function Group({
  step,
  title,
  children,
}: {
  step: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="border-b border-white/10 py-6 first:pt-0 last:border-0">
      <h2 className="mb-4 flex items-center gap-2.5">
        <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full border border-accent/40 font-display text-[11px] font-bold text-accent">
          {step}
        </span>
        <span className="font-display text-base font-bold uppercase tracking-tight">
          {title}
        </span>
      </h2>
      {children}
    </section>
  );
}

function Swatches({
  value,
  onChange,
  label,
}: {
  value: string;
  onChange: (hex: string) => void;
  label: string;
}) {
  return (
    <div>
      <span className="label">{label}</span>
      <div className="flex flex-wrap items-center gap-2">
        {customizerOptions.palette.map((c) => (
          <button
            key={c.hex}
            type="button"
            onClick={() => onChange(c.hex)}
            aria-label={c.name}
            aria-pressed={value === c.hex}
            title={c.name}
            className={`grid h-9 w-9 place-items-center rounded-full border-2 transition-transform hover:scale-110 ${
              value === c.hex ? 'border-accent' : 'border-white/20'
            }`}
            style={{ background: c.hex }}
          >
            {value === c.hex && (
              <Check
                className="h-4 w-4"
                strokeWidth={3}
                style={{ color: readableOn(c.hex) }}
              />
            )}
          </button>
        ))}

        {/* Free colour picker for club-exact shades */}
        <label className="relative grid h-9 w-9 cursor-pointer place-items-center rounded-full border-2 border-dashed border-white/25 text-[10px] text-bone-400 transition-colors hover:border-accent hover:text-accent">
          <input
            type="color"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="absolute inset-0 cursor-pointer opacity-0"
            aria-label={`Pick a custom ${label.toLowerCase()}`}
          />
          +
        </label>
      </div>
    </div>
  );
}

function UploadBox({
  file,
  onPick,
  onClear,
  inputRef,
  onChange,
  label,
  hint,
}: {
  file: UploadState | null;
  onPick: () => void;
  onClear: () => void;
  inputRef: React.RefObject<HTMLInputElement | null>;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label: string;
  hint: string;
}) {
  return (
    <div>
      <span className="label">{label}</span>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        onChange={onChange}
        className="sr-only"
        aria-label={label}
      />

      {file ? (
        <div className="flex items-center gap-3 rounded-lg border border-accent/30 bg-accent/5 p-3">
          {/* Local preview of the shopper's own file; the original is sent
              over WhatsApp at full resolution. */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={file.dataUrl}
            alt=""
            className="h-11 w-11 shrink-0 rounded object-contain"
          />
          <span className="min-w-0 flex-1 truncate text-sm text-bone">
            {file.name}
          </span>
          <button
            type="button"
            onClick={onClear}
            aria-label={`Remove ${label}`}
            className="shrink-0 text-bone-400 transition-colors hover:text-flame"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      ) : (
        <button
          type="button"
          onClick={onPick}
          className="flex w-full items-center gap-3 rounded-lg border border-dashed border-white/20 p-3 text-left transition-colors hover:border-accent"
        >
          <span className="grid h-11 w-11 shrink-0 place-items-center rounded bg-ink-700 text-bone-400">
            <Upload className="h-4 w-4" />
          </span>
          <span>
            <span className="block text-sm text-bone">Upload {label}</span>
            <span className="block text-xs text-bone-400">{hint}</span>
          </span>
        </button>
      )}
    </div>
  );
}

export default function JerseyCustomizer({
  initialSlug,
}: {
  initialSlug?: string;
}) {
  const cart = useCart();
  const kits = useMemo(() => getCustomisable(), []);

  const initialKit = kits.find((k) => k.slug === initialSlug);
  const initialSport =
    Object.entries(SPORT_TO_SLUG).find(
      ([, slug]) => slug === initialKit?.slug,
    )?.[0] ?? 'Football';

  const [sport, setSport] = useState(initialSport);
  const [neck, setNeck] = useState<NeckType>('Round Neck');
  const [pattern, setPattern] = useState('chevron');
  const [primary, setPrimary] = useState('#E31E24');
  const [secondary, setSecondary] = useState('#111315');
  const [teamName, setTeamName] = useState('');
  const [playerName, setPlayerName] = useState('');
  const [playerNumber, setPlayerNumber] = useState('');
  const [size, setSize] = useState('L');
  const [qty, setQty] = useState(1);
  const [notes, setNotes] = useState('');
  const [logo, setLogo] = useState<UploadState | null>(null);
  const [sponsor, setSponsor] = useState<UploadState | null>(null);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [showBack, setShowBack] = useState(false);
  const [added, setAdded] = useState(false);

  const logoInput = useRef<HTMLInputElement>(null);
  const sponsorInput = useRef<HTMLInputElement>(null);

  /** The catalogue record this design maps to — drives name and price. */
  const product = useMemo(() => {
    const slug = SPORT_TO_SLUG[sport];
    return (
      kits.find((k) => k.slug === slug) ??
      initialKit ??
      kits[0]
    );
  }, [sport, kits, initialKit]);

  const unitPrice = product ? effectivePrice(product) : 0;

  // Keep the preview honest: sleeveless basketball kits have no polo collar.
  useEffect(() => {
    if (sport === 'Basketball' && neck === 'Polo') setNeck('V Neck');
  }, [sport, neck]);

  const readFile =
    (setter: (u: UploadState | null) => void) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;

      setUploadError(null);

      if (!file.type.startsWith('image/')) {
        setUploadError('Please choose an image file (PNG, JPG or SVG).');
        return;
      }
      if (file.size > MAX_UPLOAD_MB * 1024 * 1024) {
        setUploadError(`That file is over ${MAX_UPLOAD_MB} MB. Try a smaller one.`);
        return;
      }

      const reader = new FileReader();
      reader.onload = () =>
        setter({ name: file.name, dataUrl: String(reader.result) });
      reader.onerror = () => setUploadError('That file could not be read.');
      reader.readAsDataURL(file);
    };

  const randomise = () => {
    const p = customizerOptions.palette;
    const a = p[Math.floor(Math.random() * p.length)];
    let b = p[Math.floor(Math.random() * p.length)];
    if (b.hex === a.hex) b = p[(p.indexOf(b) + 3) % p.length];
    setPrimary(a.hex);
    setSecondary(b.hex);
    setPattern(
      customizerOptions.patterns[
        Math.floor(Math.random() * customizerOptions.patterns.length)
      ].id,
    );
  };

  const customisation = {
    sport,
    jerseyType: neck,
    pattern:
      customizerOptions.patterns.find((p) => p.id === pattern)?.name ?? pattern,
    primaryColor: primary,
    secondaryColor: secondary,
    primaryColorName: colourLabel(primary),
    secondaryColorName: colourLabel(secondary),
    teamName: teamName.trim() || undefined,
    playerName: playerName.trim() || undefined,
    playerNumber: playerNumber.trim() || undefined,
    logoFileName: logo?.name,
    sponsorFileName: sponsor?.name,
    notes: notes.trim() || undefined,
  };

  const waHref = whatsappLink(
    buildCustomisationMessage({
      product: product?.name ?? 'Custom jersey',
      ...customisation,
      size,
      quantity: qty,
    }),
  );

  const addToCart = () => {
    if (!product) return;
    cart.addItem({
      productId: product.id,
      slug: product.slug,
      name: product.name,
      price: unitPrice,
      art: {
        kind: 'jersey',
        colors: [primary, secondary],
        pattern: pattern as never,
      },
      size,
      quantity: qty,
      customisation,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  };

  return (
    <div className="container-site grid gap-8 py-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,420px)] lg:gap-12 lg:py-14">
      {/* ---------------- Preview ---------------- */}
      <div className="order-1 lg:order-2">
        <div className="lg:sticky lg:top-28">
          <div className="relative overflow-hidden rounded-card border border-white/10 bg-gradient-to-b from-ink-700 to-ink-900">
            <div
              aria-hidden
              className="absolute inset-0"
              style={{
                background: `radial-gradient(110% 80% at 50% 6%, ${primary}22 0%, transparent 62%)`,
              }}
            />

            <div className="relative flex items-center justify-between p-4">
              <span className="font-display text-[11px] font-bold uppercase tracking-[0.2em] text-bone-400">
                Live preview · {showBack ? 'Back' : 'Front'}
              </span>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={randomise}
                  className="grid h-9 w-9 place-items-center rounded-full border border-white/15 text-bone-400 transition-colors hover:border-accent hover:text-accent"
                  aria-label="Shuffle colours and pattern"
                  title="Shuffle colours"
                >
                  <Shuffle className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={() => setShowBack((v) => !v)}
                  className="btn btn-outline btn-sm"
                >
                  <RotateCw className="h-3.5 w-3.5" />
                  {showBack ? 'Front' : 'Back'}
                </button>
              </div>
            </div>

            <div className="relative px-5 pb-6">
              <JerseyGraphic
                uid="live-preview"
                primary={primary}
                secondary={secondary}
                pattern={pattern}
                neck={neck}
                teamName={teamName || 'Your Team'}
                playerName={playerName || undefined}
                number={playerNumber || '10'}
                back={showBack}
                className="mx-auto max-h-[440px] w-full drop-shadow-[0_28px_44px_rgba(0,0,0,.6)] transition-all duration-300"
              />

              {/* Uploaded marks, positioned the way they print */}
              {!showBack && logo && (
                <span className="pointer-events-none absolute left-[26%] top-[26%] w-[14%]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={logo.dataUrl} alt="" className="w-full" />
                </span>
              )}
              {!showBack && sponsor && (
                <span className="pointer-events-none absolute inset-x-[34%] top-[54%]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={sponsor.dataUrl} alt="" className="w-full" />
                </span>
              )}
            </div>

            <dl className="relative grid grid-cols-2 gap-px border-t border-white/10 bg-white/8 text-center">
              {[
                { k: 'Sport', v: sport },
                { k: 'Type', v: neck },
                {
                  k: 'Pattern',
                  v:
                    customizerOptions.patterns.find((p) => p.id === pattern)
                      ?.name ?? pattern,
                },
                { k: 'Size', v: size },
              ].map((row) => (
                <div key={row.k} className="bg-ink-900 px-2 py-3">
                  <dt className="font-display text-[10px] font-bold uppercase tracking-[0.16em] text-bone-400">
                    {row.k}
                  </dt>
                  <dd className="mt-0.5 truncate font-display text-sm font-bold">
                    {row.v}
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          {/* Order box */}
          <div className="mt-4 rounded-card border border-white/10 bg-ink-800 p-5">
            <div className="flex items-end justify-between">
              <div>
                <p className="font-display text-[11px] font-bold uppercase tracking-[0.16em] text-bone-400">
                  {product?.name ?? 'Custom jersey'}
                </p>
                <p className="mt-1 font-display text-2xl font-extrabold">
                  {formatPrice(unitPrice * qty)}
                </p>
                <p className="text-xs text-bone-400">
                  {formatPrice(unitPrice)} × {qty}
                </p>
              </div>
              <QuantityStepper value={qty} onChange={setQty} />
            </div>

            <div className="mt-4 flex flex-col gap-2.5">
              <button
                type="button"
                onClick={addToCart}
                className="btn btn-accent btn-lg w-full"
              >
                {added ? (
                  <>
                    <Check className="h-4 w-4" /> Added to bag
                  </>
                ) : (
                  <>
                    <ShoppingBag className="h-4 w-4" /> Add to cart
                  </>
                )}
              </button>
              <a
                href={waHref}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-wa btn-lg w-full"
              >
                <MessageCircle className="h-4 w-4" />
                Send design on WhatsApp
              </a>
            </div>

            {(logo || sponsor) && (
              <p className="mt-3 rounded-lg bg-ink-900 p-2.5 text-xs text-bone-400">
                Your design details travel with the order. Please attach{' '}
                <span className="text-bone">
                  {[logo?.name, sponsor?.name].filter(Boolean).join(' and ')}
                </span>{' '}
                in the WhatsApp chat so we can print at full resolution.
              </p>
            )}

            <p className="mt-3 text-center text-xs text-bone-400">
              Team pricing from {siteConfig.bulkMinQuantity} pieces ·{' '}
              {siteConfig.customDeliveryEstimate}
            </p>
          </div>
        </div>
      </div>

      {/* ---------------- Controls ---------------- */}
      <div className="order-2 lg:order-1">
        <Group step="1" title="Sport">
          <div className="flex flex-wrap gap-2">
            {customizerOptions.sports.map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => setSport(s)}
                className={`chip ${sport === s ? 'chip-on' : ''}`}
              >
                {s}
              </button>
            ))}
          </div>
        </Group>

        <Group step="2" title="Jersey type">
          <div className="flex flex-wrap gap-2">
            {customizerOptions.jerseyTypes.map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => setNeck(t as NeckType)}
                className={`chip ${neck === t ? 'chip-on' : ''}`}
              >
                {t}
              </button>
            ))}
          </div>
        </Group>

        <Group step="3" title="Pattern">
          <div className="grid grid-cols-3 gap-2.5 sm:grid-cols-6">
            {customizerOptions.patterns.map((p) => (
              <button
                key={p.id}
                type="button"
                onClick={() => setPattern(p.id)}
                aria-pressed={pattern === p.id}
                className={`overflow-hidden rounded-lg border p-1.5 transition-colors ${
                  pattern === p.id
                    ? 'border-accent bg-accent/10'
                    : 'border-white/12 hover:border-white/30'
                }`}
              >
                <JerseyGraphic
                  uid={`pat-${p.id}`}
                  primary={primary}
                  secondary={secondary}
                  pattern={p.id}
                  neck={neck}
                  className="mx-auto h-14 w-auto"
                />
                <span
                  className={`mt-1 block text-center text-[10px] font-medium ${
                    pattern === p.id ? 'text-accent' : 'text-bone-400'
                  }`}
                >
                  {p.name}
                </span>
              </button>
            ))}
          </div>
        </Group>

        <Group step="4" title="Colours">
          <div className="space-y-5">
            <Swatches
              label="Primary colour"
              value={primary}
              onChange={setPrimary}
            />
            <Swatches
              label="Secondary colour"
              value={secondary}
              onChange={setSecondary}
            />
          </div>
        </Group>

        <Group step="5" title="Team &amp; player">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <label className="label" htmlFor="team-name">
                Team name
              </label>
              <input
                id="team-name"
                value={teamName}
                onChange={(e) => setTeamName(e.target.value.slice(0, 20))}
                placeholder="TEAM SAGAR"
                maxLength={20}
                className="field uppercase"
              />
            </div>

            <div>
              <label className="label" htmlFor="player-name">
                Player name
              </label>
              <input
                id="player-name"
                value={playerName}
                onChange={(e) => setPlayerName(e.target.value.slice(0, 16))}
                placeholder="SAGAR"
                maxLength={16}
                className="field uppercase"
              />
            </div>

            <div>
              <label className="label" htmlFor="player-number">
                Player number
              </label>
              <input
                id="player-number"
                type="number"
                inputMode="numeric"
                min={0}
                max={99}
                value={playerNumber}
                onChange={(e) =>
                  setPlayerNumber(e.target.value.replace(/\D/g, '').slice(0, 2))
                }
                placeholder="10"
                className="field"
              />
            </div>
          </div>
          <p className="mt-2 text-xs text-bone-400">
            Ordering for a full squad? Add one kit here and send us the player
            list on WhatsApp — we print each name and number.
          </p>
        </Group>

        <Group step="6" title="Logos">
          <div className="grid gap-4 sm:grid-cols-2">
            <UploadBox
              label="team logo"
              hint="PNG or SVG, max 5 MB"
              file={logo}
              inputRef={logoInput}
              onPick={() => logoInput.current?.click()}
              onClear={() => setLogo(null)}
              onChange={readFile(setLogo)}
            />
            <UploadBox
              label="sponsor logo"
              hint="PNG or SVG, max 5 MB"
              file={sponsor}
              inputRef={sponsorInput}
              onPick={() => sponsorInput.current?.click()}
              onClear={() => setSponsor(null)}
              onChange={readFile(setSponsor)}
            />
          </div>
          {uploadError && (
            <p role="alert" className="mt-2 text-xs text-flame">
              {uploadError}
            </p>
          )}
        </Group>

        <Group step="7" title="Size &amp; notes">
          <span className="label">Size</span>
          <div className="flex flex-wrap gap-2">
            {SIZES.map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => setSize(s)}
                className={`min-w-[3.25rem] rounded-lg border px-3 py-2.5 font-display text-sm font-bold uppercase transition-all ${
                  size === s
                    ? 'border-accent bg-accent text-white'
                    : 'border-white/15 text-bone hover:border-white/40'
                }`}
              >
                {s}
              </button>
            ))}
          </div>

          <div className="mt-5">
            <label className="label" htmlFor="notes">
              Anything else?
            </label>
            <textarea
              id="notes"
              rows={3}
              value={notes}
              onChange={(e) => setNotes(e.target.value.slice(0, 400))}
              placeholder="Squad size, required date, matching shorts, specific colour codes…"
              className="field resize-none"
            />
          </div>
        </Group>
      </div>
    </div>
  );
}
