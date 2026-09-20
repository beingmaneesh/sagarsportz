import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import {
  products,
  getProductBySlug,
  getRelated,
  effectivePrice,
} from '@/lib/products';
import { siteConfig } from '@/lib/config';
import ProductDetail from '@/components/product/ProductDetail';
import ProductCard from '@/components/product/ProductCard';
import Reveal from '@/components/ui/Reveal';

interface Params {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return { title: 'Product not found' };

  return {
    title: product.name,
    description: product.description,
    alternates: { canonical: `/product/${product.slug}` },
    openGraph: {
      type: 'website',
      title: `${product.name} | ${siteConfig.name}`,
      description: product.description,
      url: `${siteConfig.url}/product/${product.slug}`,
    },
  };
}

export default async function ProductPage({ params }: Params) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();

  const related = getRelated(product);
  const price = effectivePrice(product);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.description,
    sku: product.id,
    brand: { '@type': 'Brand', name: product.brand },
    category: product.category,
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: product.rating,
      reviewCount: product.reviewCount,
    },
    offers: {
      '@type': 'Offer',
      price,
      priceCurrency: 'INR',
      availability:
        product.stock > 0
          ? 'https://schema.org/InStock'
          : 'https://schema.org/OutOfStock',
      url: `${siteConfig.url}/product/${product.slug}`,
      seller: { '@type': 'Organization', name: siteConfig.name },
    },
  };

  return (
    <>
      {/* Breadcrumb */}
      <nav
        aria-label="Breadcrumb"
        className="border-b border-white/10 bg-ink-900/50"
      >
        <ol className="container-site flex flex-wrap items-center gap-1 py-3 text-xs text-bone-400">
          <li>
            <Link href="/" className="transition-colors hover:text-accent">
              Home
            </Link>
          </li>
          <li className="flex items-center gap-1">
            <ChevronRight className="h-3 w-3 opacity-50" />
            <Link href="/shop" className="transition-colors hover:text-accent">
              Shop
            </Link>
          </li>
          <li className="flex items-center gap-1">
            <ChevronRight className="h-3 w-3 opacity-50" />
            <Link
              href={`/shop/${product.sport}`}
              className="capitalize transition-colors hover:text-accent"
            >
              {product.sport === 'multi' ? 'All sports' : product.sport}
            </Link>
          </li>
          <li className="flex items-center gap-1">
            <ChevronRight className="h-3 w-3 opacity-50" />
            <span className="text-bone">{product.name}</span>
          </li>
        </ol>
      </nav>

      <ProductDetail product={product} />

      {related.length > 0 && (
        <section className="container-site pb-16 pt-4 sm:pb-24">
          <h2 className="mb-7 text-[clamp(1.6rem,4vw,2.4rem)]">
            You might also{' '}
            <span
              className="text-transparent"
              style={{ WebkitTextStroke: '1.5px rgba(246,247,248,.42)' }}
            >
              need.
            </span>
          </h2>
          <ul className="grid grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-4">
            {related.map((p, i) => (
              <Reveal as="li" key={p.id} delay={i * 60}>
                <ProductCard product={p} />
              </Reveal>
            ))}
          </ul>
        </section>
      )}

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </>
  );
}
