import { getNewArrivals } from '@/lib/products';
import ProductCard from '@/components/product/ProductCard';
import SectionHeading from '@/components/ui/SectionHeading';

export default function NewArrivals() {
  const arrivals = getNewArrivals(10);

  return (
    <section
      className="border-y border-white/10 bg-ink-900/50 py-16 sm:py-24"
      aria-labelledby="new-heading"
    >
      <div className="container-site">
        <SectionHeading
          eyebrow="New in"
          title="Just"
          titleAccent="dropped."
          description="Fresh stock on the shelf and new colourways in the print queue."
          href="/shop"
          linkLabel="See everything"
        />
      </div>

      {/* Full-bleed rail so cards run to the screen edge on mobile */}
      <ul className="rail container-site !pr-0 lg:!pr-10">
        {arrivals.map((p) => (
          <li key={p.id}>
            <ProductCard product={p} rail />
          </li>
        ))}
        <li aria-hidden className="w-1 shrink-0" />
      </ul>
    </section>
  );
}
