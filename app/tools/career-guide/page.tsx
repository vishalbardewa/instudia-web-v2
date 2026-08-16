import { CareerGuideDashboard } from '../../components/organisms/CareerGuideDashboard';
import type { Metadata } from 'next';
import { SITE_URL, canonicalFor } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Career Guidance & IT Roadmap Tool',
  description: 'A comprehensive career roadmap tool to help students and job seekers in Nagaland choose in-demand IT career tracks and skill up with confidence.',
  alternates: { canonical: canonicalFor('/tools/career-guide') },
  openGraph: {
    title: 'Career Guidance & IT Roadmap Tool',
    description: 'A comprehensive career roadmap tool to help students and job seekers in Nagaland choose in-demand IT career tracks and skill up with confidence.',
    url: canonicalFor('/tools/career-guide'),
    siteName: 'instudia',
    images: [
      {
        url: 'https://res.cloudinary.com/dhwg77gwm/image/upload/f_auto,q_auto/v1/instudia/tqo7qzztc4duzktj0jt9',
        width: 1200,
        height: 630,
        alt: 'instudia Career Guide',
      },
    ],
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Career Guidance & IT Roadmap Tool',
    description: 'A comprehensive career roadmap tool to help students and job seekers in Nagaland choose in-demand IT career tracks and skill up with confidence.',
    images: ['https://res.cloudinary.com/dhwg77gwm/image/upload/f_auto,q_auto/v1/instudia/tqo7qzztc4duzktj0jt9'],
  },
  metadataBase: new URL(SITE_URL),
};

export default function CareerGuidePage() {
  return (
    <main className="min-h-screen bg-[#FAFAFA] text-[#1B1C1E] selection:bg-brandpurple/30 font-jakarta">
      <CareerGuideDashboard />
    </main>
  );
}
