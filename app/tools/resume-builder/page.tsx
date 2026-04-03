import type { Metadata } from 'next';
import { ResumeBuilder } from '../../components/organisms/ResumeBuilder';

export const metadata: Metadata = {
  title: 'AI Resume Builder | Professional ATS-Optimized CV Creator',
  description: 'Create high-fidelity, ATS-optimized resumes with AI-assisted content refinement. Choose from professional templates like Bento, Minimalist, and Metropolitan.',
  keywords: ['AI Resume Builder', 'Professional CV Maker', 'ATS Optimized Resume', 'Career Branding', 'Resume Templates', 'instudia tools'],
  alternates: { canonical: "/tools/resume-builder" },
  openGraph: {
    title: 'AI Resume Builder | instudia',
    description: 'Transform your career identity with our cinematic, AI-powered resume document engine.',
    url: 'https://www.instudianagaland.com/tools/resume-builder',
    siteName: 'instudia',
    images: [
      {
        url: 'https://www.instudianagaland.com/og-resume-builder.jpg', // Placeholder for actual OG image
        width: 1200,
        height: 630,
        alt: 'instudia AI Resume Builder Preview',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI Resume Builder | instudia',
    description: 'Create professional, ATS-optimized resumes with AI-assisted content refinement.',
    images: ['https://www.instudianagaland.com/og-resume-builder.jpg'],
  },
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
