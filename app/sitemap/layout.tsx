import type { Metadata } from 'next';
import { SITE_URL, canonicalFor } from '@/lib/site';
import { buildMetadata } from '@/lib/metadata';

export const metadata: Metadata = buildMetadata({
  title: 'HTML Sitemap & Complete Site Directory',
  description: 'Explore the complete directory of courses, career tools, blog tutorials, and institutional resources at instudia, Dimapur, Nagaland.',
  path: '/sitemap',
  image: 'https://res.cloudinary.com/dhwg77gwm/image/upload/f_auto,q_auto/v1/instudia/tqo7qzztc4duzktj0jt9',
  imageAlt: 'instudia Complete HTML Sitemap',
});

export default function SitemapLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
