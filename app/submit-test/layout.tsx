import type { Metadata } from 'next';
import { SITE_URL, canonicalFor } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Submit Test & Assignment Work',
  description: 'Submit your test and coursework files for grading and verification at instudia.',
  robots: {
    index: false,
    follow: false,
  },
  alternates: {
    canonical: canonicalFor('/submit-test'),
  },
  metadataBase: new URL(SITE_URL),
};

export default function SubmitTestLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
