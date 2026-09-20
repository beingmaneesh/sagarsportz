'use client';

import { useMemo, useState } from 'react';
import { MessageCircle, AlertCircle } from 'lucide-react';
import { bulkOrderEnquiry, whatsappLink, type BulkEnquiryFields } from '@/lib/whatsapp';
import { customizerOptions } from '@/lib/categories';
import { siteConfig } from '@/lib/config';

const SPORTS = [
  'Football',
  'Cricket',
  'Basketball',
  'Volleyball',
  'Badminton',
  'Athletics / Running',
  'Corporate / Event',
  'Other',
];

const EMPTY: BulkEnquiryFields = {
  teamName: '',
  sport: 'Football',
  players: '',
  jerseyType: 'Round Neck',
  requiredBy: '',
  requirements: '',
  contactName: '',
  contactPhone: '',
};

export default function BulkQuoteForm() {
  const [fields, setFields] = useState<BulkEnquiryFields>(EMPTY);
  const [touched, setTouched] = useState(false);

  const set =
    (key: keyof BulkEnquiryFields) =>
    (
      e: React.ChangeEvent<
        HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
      >,
    ) =>
      setFields((f) => ({ ...f, [key]: e.target.value }));

  const errors = useMemo(() => {
    const e: Partial<Record<keyof BulkEnquiryFields, string>> = {};
    if (!fields.teamName?.trim()) e.teamName = 'Tell us who the kit is for.';
    if (!fields.players?.trim()) e.players = 'How many players?';
    else if (Number(fields.players) < 1) e.players = 'Enter a number of players.';
    if (!fields.contactName?.trim()) e.contactName = 'Please add your name.';
    if (!fields.contactPhone?.replace(/\D/g, ''))
      e.contactPhone = 'Please add a contact number.';
    return e;
  }, [fields]);

  const valid = Object.keys(errors).length === 0;
  const href = whatsappLink(bulkOrderEnquiry(fields));

  const Err = ({ msg }: { msg?: string }) =>
    touched && msg ? (
      <p role="alert" className="mt-1.5 flex items-center gap-1 text-xs text-flame">
        <AlertCircle className="h-3 w-3" />
        {msg}
      </p>
    ) : null;

  const invalid = (msg?: string) => (touched && msg ? '!border-flame' : '');

  return (
    <div className="rounded-card border border-white/10 bg-ink-800 p-6 sm:p-7">
      <h2 className="font-display text-xl font-bold uppercase tracking-tight">
        Request a team quote
      </h2>
      <p className="mt-1.5 text-sm text-bone-400">
        Fill this in and we&apos;ll open WhatsApp with your enquiry ready to
        send. Quotes usually come back the same working day.
      </p>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <label className="label" htmlFor="bq-team">
            Team / organisation name <span className="text-accent">*</span>
          </label>
          <input
            id="bq-team"
            value={fields.teamName}
            onChange={set('teamName')}
            placeholder="Thunder FC / St. Xavier's School"
            className={`field ${invalid(errors.teamName)}`}
          />
          <Err msg={errors.teamName} />
        </div>

        <div>
          <label className="label" htmlFor="bq-sport">
            Sport
          </label>
          <select
            id="bq-sport"
            value={fields.sport}
            onChange={set('sport')}
            className="field"
          >
            {SPORTS.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="label" htmlFor="bq-players">
            Number of players <span className="text-accent">*</span>
          </label>
          <input
            id="bq-players"
            type="number"
            inputMode="numeric"
            min={1}
            value={fields.players}
            onChange={set('players')}
            placeholder={String(siteConfig.bulkMinQuantity)}
            className={`field ${invalid(errors.players)}`}
          />
          <Err msg={errors.players} />
        </div>

        <div>
          <label className="label" htmlFor="bq-type">
            Jersey type
          </label>
          <select
            id="bq-type"
            value={fields.jerseyType}
            onChange={set('jerseyType')}
            className="field"
          >
            {customizerOptions.jerseyTypes.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
            <option value="Tracksuit">Tracksuit</option>
            <option value="T-Shirt">T-Shirt</option>
            <option value="Full kit (jersey + shorts)">
              Full kit (jersey + shorts)
            </option>
          </select>
        </div>

        <div>
          <label className="label" htmlFor="bq-date">
            Required by
          </label>
          <input
            id="bq-date"
            type="date"
            value={fields.requiredBy}
            onChange={set('requiredBy')}
            className="field"
          />
        </div>

        <div className="sm:col-span-2">
          <label className="label" htmlFor="bq-req">
            Customization requirements
          </label>
          <textarea
            id="bq-req"
            rows={3}
            value={fields.requirements}
            onChange={set('requirements')}
            placeholder="Colours, club crest, sponsor logos, player names and numbers…"
            className="field resize-none"
          />
        </div>

        <div>
          <label className="label" htmlFor="bq-name">
            Your name <span className="text-accent">*</span>
          </label>
          <input
            id="bq-name"
            value={fields.contactName}
            onChange={set('contactName')}
            placeholder="Your name"
            className={`field ${invalid(errors.contactName)}`}
          />
          <Err msg={errors.contactName} />
        </div>

        <div>
          <label className="label" htmlFor="bq-phone">
            Your phone <span className="text-accent">*</span>
          </label>
          <input
            id="bq-phone"
            type="tel"
            inputMode="tel"
            value={fields.contactPhone}
            onChange={set('contactPhone')}
            placeholder="98765 43210"
            className={`field ${invalid(errors.contactPhone)}`}
          />
          <Err msg={errors.contactPhone} />
        </div>
      </div>

      {valid ? (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-wa btn-lg mt-6 w-full"
        >
          <MessageCircle className="h-4 w-4" />
          Get a team quote
        </a>
      ) : (
        <button
          type="button"
          onClick={() => setTouched(true)}
          className="btn btn-wa btn-lg mt-6 w-full"
        >
          <MessageCircle className="h-4 w-4" />
          Get a team quote
        </button>
      )}

      {touched && !valid && (
        <p role="alert" className="mt-2 text-center text-xs text-flame">
          Please complete the highlighted fields.
        </p>
      )}
    </div>
  );
}
