import { products, getFeatured } from '@/lib/products';
import ProductCard from '@/components/product/ProductCard';
import SectionHeading from '@/components/ui/SectionHeading';
import Reveal from '@/components/ui/Reveal';

/**
 * A deliberate cross-section of the catalogue rather than the first twelve
 * flagged products, so the row shows kit, equipment, footwear and accessories
 * side by side. Anything missing falls back to the featured list.
 */
const LINE_UP = [
  'custom-football-jersey',
  'match-football',
  'english-willow-cricket-bat',
  'leather-cricket-ball',
  'badminton-racket',
  'feather-shuttlecock',
  'running-shoes',
  'sports-shoes',
  'sports-lower',
  'tracksuit-set',
  'sports-cap',
  'knee-support',
];

export default function FeaturedProducts() {
  const curated = LINE_UP.map((slug) =>
    products.find((p) => p.slug === slug),
  ).filter(Boolean) as typeof products;

  const featured = curated.length ? curated : getFeatured(12);

  return (
    <section
      className="container-site py-16 sm:py-24"
      aria-labelledby="featured-heading"
    >
      <SectionHeading
        eyebrow="Best sellers"
        title="Game-day"
        titleAccent="essentials."
        description="The kit, gear and gadgets our teams reorder season after season."
        href="/shop"
        linkLabel="Shop all"
      />

      <ul className="grid grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-4">
        {featured.map((p, i) => (
          <Reveal as="li" key={p.id} delay={(i % 4) * 60}>
            <ProductCard product={p} />
          </Reveal>
        ))}
      </ul>
    </section>
  );
}
