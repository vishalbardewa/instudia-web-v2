import type { Metadata } from 'next';
import { SITE_URL, canonicalFor } from '@/lib/site';
import { ResumeBuilder } from '../../components/organisms/ResumeBuilder';

export const metadata: Metadata = {
  title: 'Free AI Resume Builder & ATS CV Maker',
  description: 'Create professional, ATS-optimized resumes with AI-assisted content suggestions. Free resume templates designed for tech and corporate jobs in India.',
  keywords: ['AI Resume Builder', 'Professional CV Maker', 'ATS Optimized Resume', 'Career Branding', 'Resume Templates', 'instudia tools'],
  alternates: { canonical: canonicalFor('/tools/resume-builder') },
  openGraph: {
    title: 'Free AI Resume Builder & ATS CV Maker',
    description: 'Create professional, ATS-optimized resumes with AI-assisted content suggestions. Free resume templates designed for tech and corporate jobs in India.',
    url: canonicalFor('/tools/resume-builder'),
    siteName: 'instudia',
    images: [
      {
        url: 'https://res.cloudinary.com/dhwg77gwm/image/upload/f_auto,q_auto/v1/instudia/tqo7qzztc4duzktj0jt9',
        width: 1200,
        height: 630,
        alt: 'instudia AI Resume Builder Preview',
      },
    ],
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free AI Resume Builder & ATS CV Maker',
    description: 'Create professional, ATS-optimized resumes with AI-assisted content suggestions. Free resume templates designed for tech and corporate jobs in India.',
    images: ['https://res.cloudinary.com/dhwg77gwm/image/upload/f_auto,q_auto/v1/instudia/tqo7qzztc4duzktj0jt9'],
  },
  metadataBase: new URL(SITE_URL),
};

export default function ResumeBuilderPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "AI Resume Builder",
    "url": "https://www.instudianagaland.com/tools/resume-builder",
    "description": "Create professional, ATS-optimized resumes with AI-assisted content refinement and cinematic templates.",
    "applicationCategory": "CareerTool",
    "operatingSystem": "All",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "INR"
    },
    "author": {
      "@type": "Organization",
      "name": "instudia"
    }
  };

  return (
    <main className="min-h-screen bg-[#fafafa]">
      {/* JSON-LD Structured Data Injection */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ResumeBuilder />
    </main>
  );
}
