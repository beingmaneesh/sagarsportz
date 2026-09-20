import type { MetadataRoute } from 'next';
import { siteConfig } from '@/lib/config';
import { products } from '@/lib/products';
import { sportCategories } from '@/lib/categories';

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.url;
  const now = new Date();

  const staticRoutes: {
    path: string;
    priority: number;
    changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency'];
  }[] = [
    { path: '', priority: 1, changeFrequency: 'weekly' },
    { path: '/shop', priority: 0.9, changeFrequency: 'weekly' },
    { path: '/custom-jerseys', priority: 0.9, changeFrequency: 'weekly' },
    { path: '/custom-tshirts', priority: 0.8, changeFrequency: 'weekly' },
    { path: '/sportswear', priority: 0.8, changeFrequency: 'weekly' },
    { path: '/equipment', priority: 0.8, changeFrequency: 'weekly' },
    { path: '/customize', priority: 0.9, changeFrequency: 'monthly' },
    { path: '/customization', priority: 0.7, changeFrequency: 'monthly' },
    { path: '/printing', priority: 0.8, changeFrequency: 'monthly' },
    { path: '/bulk-orders', priority: 0.9, changeFrequency: 'monthly' },
    { path: '/about', priority: 0.6, changeFrequency: 'yearly' },
    { path: '/contact', priority: 0.6, changeFrequency: 'yearly' },
    { path: '/faq', priority: 0.6, changeFrequency: 'monthly' },
    { path: '/privacy-policy', priority: 0.3, changeFrequency: 'yearly' },
    { path: '/terms', priority: 0.3, changeFrequency: 'yearly' },
    { path: '/shipping-policy', priority: 0.3, changeFrequency: 'yearly' },
    { path: '/returns-policy', priority: 0.3, changeFrequency: 'yearly' },
  ];

  return [
    ...staticRoutes.map((r) => ({
      url: `${base}${r.path}`,
      lastModified: now,
      changeFrequency: r.changeFrequency,
      priority: r.priority,
    })),
    ...sportCategories.map((c) => ({
      url: `${base}/shop/${c.slug}`,
      lastModified: now,
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    })),
    ...products.map((p) => ({
      url: `${base}/product/${p.slug}`,
      lastModified: now,
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    })),
  ];
}
