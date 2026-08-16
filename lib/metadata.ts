import type { Metadata } from 'next';
import { SITE_URL, canonicalFor } from './site';

export interface PageMetadataInput {
  title: string;
  description: string;
  path: string;
  type?: 'website' | 'article';
  image?: string;
  imageAlt?: string;
  publishedTime?: string;
  modifiedTime?: string;
  authors?: string[];
  authorSlug?: string;
  ogTitle?: string;
  ogDescription?: string;
  noIndex?: boolean;
  keywords?: string[];
}

export const DEFAULT_OG_IMAGE =
  'https://res.cloudinary.com/dhwg77gwm/image/upload/f_auto,q_auto,fl_strip_profile/v1/instudia/tqo7qzztc4duzktj0jt9';

export function buildMetadata(input: PageMetadataInput): Metadata {
  const cleanTitle = input.title
    .replace(/\s*\|\s*instudia/gi, '')
    .replace(/\s*-\s*instudia/gi, '')
    .trim();
  const canonicalUrl = canonicalFor(input.path);
  const type = input.type || 'website';
  const ogTitle = input.ogTitle || cleanTitle;
  const ogDescription = input.ogDescription || input.description;
  const image = input.image || DEFAULT_OG_IMAGE;
  const imageAlt = input.imageAlt || `${cleanTitle} | instudia`;

  const meta: Metadata = {
    title: cleanTitle,
    description: input.description,
    metadataBase: new URL(SITE_URL),
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: ogTitle,
      description: ogDescription,
      url: canonicalUrl,
      siteName: 'instudia',
      locale: 'en_IN',
      type: type,
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: imageAlt,
        },
      ],
      ...(type === 'article'
        ? {
            publishedTime: input.publishedTime,
            modifiedTime: input.modifiedTime || input.publishedTime,
            authors: input.authors,
          }
        : {}),
    },
    twitter: {
      card: 'summary_large_image',
      title: ogTitle,
      description: ogDescription,
      images: [image],
    },
    ...(input.keywords ? { keywords: input.keywords } : {}),
    ...(input.noIndex ? { robots: { index: false, follow: false } } : {}),
  };

  return meta;
}
