import { CareerAdviceForm } from '../../components/organisms/CareerAdviceForm';
import type { Metadata } from 'next';
import { SITE_URL, canonicalFor } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Discover Your Career Path in Tech',
  description: 'Enter your skills, interests and education background to receive an AI-powered personalized tech career roadmap and local job insights.',
  alternates: { canonical: canonicalFor('/tools/career-blueprint') },
  metadataBase: new URL(SITE_URL),
};

export default function CareerDiscoveryPage() {
  return (
    <main className="min-h-screen bg-[#FAFAFA] flex items-center justify-center py-12 selection:bg-brandpurple/30 font-jakarta">
      <CareerAdviceForm />
    </main>
  );
}
