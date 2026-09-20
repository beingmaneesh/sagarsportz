import PageHero from './PageHero';

export interface LegalSection {
  heading: string;
  paragraphs?: string[];
  bullets?: string[];
}

interface Props {
  title: string;
  titleAccent?: string;
  intro: string;
  updated: string;
  sections: LegalSection[];
}

/**
 * Shared shell for the policy pages so they stay visually consistent.
 * TODO(client): have these reviewed against your actual trading terms.
 */
export default function LegalPage({
  title,
  titleAccent,
  intro,
  updated,
  sections,
}: Props) {
  return (
    <>
      <PageHero
        eyebrow="Legal"
        title={title}
        titleAccent={titleAccent}
        description={intro}
        crumbs={[{ label: title }]}
      />

      <article className="container-site max-w-3xl py-12 sm:py-16">
        <p className="mb-10 text-xs uppercase tracking-[0.16em] text-bone-400">
          Last updated: {updated}
        </p>

        <div className="space-y-10">
          {sections.map((s) => (
            <section key={s.heading}>
              <h2 className="text-[clamp(1.3rem,3vw,1.8rem)]">{s.heading}</h2>

              {s.paragraphs?.map((p, i) => (
                <p
                  key={i}
                  className="mt-3 text-[15px] leading-relaxed text-bone-400"
                >
                  {p}
                </p>
              ))}

              {s.bullets && (
                <ul className="mt-3 space-y-2">
                  {s.bullets.map((b) => (
                    <li
                      key={b}
                      className="flex gap-2.5 text-[15px] leading-relaxed text-bone-400"
                    >
                      <span
                        aria-hidden
                        className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent"
                      />
                      {b}
                    </li>
                  ))}
                </ul>
              )}
            </section>
          ))}
        </div>

        <p className="mt-12 rounded-card border border-white/10 bg-ink-800 p-5 text-sm text-bone-400">
          This page is a starting template and does not constitute legal advice.
          Please have it reviewed against your actual trading terms and local
          regulations before launch.
        </p>
      </article>
    </>
  );
}
