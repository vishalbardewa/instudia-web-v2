import type { Metadata } from 'next';
import { SITE_URL, canonicalFor } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Seminar Stash & Presentation Slides',
  description: 'Access secret slides, worksheets, and resources from instudia campus seminars.',
  robots: {
    index: false,
    follow: false,
  },
  alternates: {
    canonical: canonicalFor('/seminar'),
  },
  metadataBase: new URL(SITE_URL),
};

export default function SeminarLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
