import { Star, Quote } from 'lucide-react';
import SectionHeading from '@/components/ui/SectionHeading';
import Reveal from '@/components/ui/Reveal';

/**
 * PLACEHOLDER REVIEWS — these are sample entries for layout only.
 * TODO(client): replace every entry below with real, attributable customer
 * feedback (or remove the section) before the site goes live. Do not publish
 * invented reviews.
 */
const TESTIMONIALS = [
  {
    rating: 5,
    quote:
      'Great quality jerseys and the customization came out exactly as we wanted.',
    author: 'Team Customer',
    role: 'Sample review — replace with a real one',
  },
  {
    rating: 5,
    quote:
      'Ordered kits for the whole squad. Names and numbers were all correct and delivery was on time.',
    author: 'Club Customer',
    role: 'Sample review — replace with a real one',
  },
  {
    rating: 4,
    quote:
      'Good print quality on the training tees. Easy to sort everything over WhatsApp.',
    author: 'Academy Customer',
    role: 'Sample review — replace with a real one',
  },
];

export default function Testimonials() {
  return (
    <section
      className="border-y border-white/10 bg-ink-900/50 py-16 sm:py-24"
      aria-labelledby="reviews-heading"
    >
      <div className="container-site">
        <SectionHeading
          eyebrow="Feedback"
          title="From the"
          titleAccent="dressing room."
          description="Placeholder entries shown while real customer reviews are collected."
        />

        <ul className="grid gap-4 md:grid-cols-3">
          {TESTIMONIALS.map((t, i) => (
            <Reveal as="li" key={i} delay={i * 80}>
              <figure className="relative h-full overflow-hidden rounded-card border border-white/10 bg-ink-800 p-6">
                <Quote
                  aria-hidden
                  className="absolute right-4 top-4 h-10 w-10 text-white/5"
                />

                <div
                  className="flex gap-0.5"
                  aria-label={`${t.rating} out of 5 stars`}
                >
                  {Array.from({ length: 5 }, (_, s) => (
                    <Star
                      key={s}
                      className={`h-4 w-4 ${
                        s < t.rating
                          ? 'fill-accent text-accent'
                          : 'text-white/15'
                      }`}
                    />
                  ))}
                </div>

                <blockquote className="relative mt-4 text-[15px] leading-relaxed text-bone">
                  “{t.quote}”
                </blockquote>

                <figcaption className="mt-5 border-t border-white/8 pt-4">
                  <p className="font-display text-sm font-bold uppercase tracking-wide">
                    — {t.author}
                  </p>
                  <p className="mt-0.5 text-[11px] uppercase tracking-[0.12em] text-bone-400">
                    {t.role}
                  </p>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
