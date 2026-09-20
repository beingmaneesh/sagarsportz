import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { sportCategories, sportCategoryFilter } from '@/lib/categories';
import { products } from '@/lib/products';
import PageHero from '@/components/ui/PageHero';
import ShopBrowser from '@/components/product/ShopBrowser';

interface Params {
  params: Promise<{ category: string }>;
}

export function generateStaticParams() {
  return sportCategories.map((c) => ({ category: c.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { category } = await params;
  const cat = sportCategories.find((c) => c.slug === category);
  if (!cat) return { title: 'Not found' };

  return {
    title: `${cat.name} — ${cat.blurb}`,
    description: `Shop ${cat.name.toLowerCase()} at Sagar Sportz: ${cat.items
      .join(', ')
      .toLowerCase()}. Custom printing and team orders available.`,
    alternates: { canonical: `/shop/${cat.slug}` },
  };
}

export default async function SportCategoryPage({ params }: Params) {
  const { category } = await params;
  const cat = sportCategories.find((c) => c.slug === category);
  if (!cat) notFound();

  const filter = sportCategoryFilter[cat.slug] ?? {};
  const source = products.filter((p) => {
    if (filter.sport) return p.sport === filter.sport;
    if (filter.category) return p.category === filter.category;
    return true;
  });

  return (
    <>
      <PageHero
        eyebrow="Shop by sport"
        title={cat.name}
        titleAccent="gear."
        description={`${cat.blurb}. Everything we stock for ${cat.name.toLowerCase()}, plus custom kit printed in-house.`}
        crumbs={[{ href: '/shop', label: 'Shop' }, { label: cat.name }]}
        accent={cat.accent}
      >
        <ul className="flex flex-wrap gap-2">
          {cat.items.map((item) => (
            <li key={item} className="chip">
              {item}
            </li>
          ))}
        </ul>
      </PageHero>

      <div className="container-site py-10 sm:py-14">
        <ShopBrowser source={source} />
      </div>
    </>
  );
}
