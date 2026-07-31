import { CareerGuideDashboard } from '../../components/organisms/CareerGuideDashboard';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Nagaland Career Guidance Tool | Instudia',
  description: 'A comprehensive, 6-part career guide to help the youth of Nagaland build adaptable career capital and solve pressing local problems.',
  alternates: { canonical: "https://www.instudianagaland.com/tools/career-guide" },
  openGraph: {
    title: 'The Ultimate Nagaland Career Guide | Instudia',
    description: 'Stop guessing your future. Build your A/B/Z career plan and find out exactly what skills Nagaland needs right now.',
    url: 'https://www.instudianagaland.com/tools/career-guide',
    siteName: 'Instudia',
    images: [
      {
        url: 'https://www.instudianagaland.com/assets/images/career-guide-og.jpg', // Placeholder for actual OG image
        width: 1200,
        height: 630,
        alt: 'Instudia Career Guide',
      },
    ],
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'The Ultimate Nagaland Career Guide',
    description: 'Stop guessing your future. Build your A/B/Z career plan and find out exactly what skills Nagaland needs right now.',
  },
};

export default function CareerGuidePage() {
  return (
    <main className="min-h-screen bg-[#FAFAFA] text-[#1B1C1E] selection:bg-brandpurple/30 font-jakarta">
      <CareerGuideDashboard />
    </main>
  );
}
