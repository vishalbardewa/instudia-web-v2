import type { Metadata } from 'next';
import { SITE_URL, canonicalFor } from '@/lib/site';
import HardwareHeroSection from '@/app/components/organisms/HardwareHeroSection';
import PCLaptopBuilderDashboard from '@/app/components/organisms/PCLaptopBuilderDashboard';
import CounselingFaqSection from '@/app/components/organisms/CounselingFaqSection';
import { BreadcrumbSchema } from '@/app/components/SchemaOrg/BreadcrumbSchema';

export const dynamic = 'force-static';
export const revalidate = 86400;

export const metadata: Metadata = {
  title: 'Student PC & Laptop Guide for Coding and Design in Nagaland',
  description:
    'Honest hardware buying guide and custom PC builder for students in Nagaland. Avoid 8GB soldered RAM traps, washed-out screens, and get verified Indian market pricing.',
  keywords: [
    'student laptop guide nagaland',
    'laptop for programming dimapur',
    'pc builder dimapur',
    'graphic design laptop specs',
    'avoid soldered ram',
    'instudia tech consultation',
  ],
  alternates: {
    canonical: canonicalFor('/tools/pc-laptop-builder'),
  },
  openGraph: {
    title: 'Student PC & Laptop Guide for Coding and Design in Nagaland',
    description:
      'Honest hardware buying guide and custom PC builder for students in Nagaland. Avoid 8GB soldered RAM traps, washed-out screens, and get verified Indian market pricing.',
    url: canonicalFor('/tools/pc-laptop-builder'),
    siteName: 'instudia',
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Student PC & Laptop Guide for Coding and Design in Nagaland',
    description:
      'Honest hardware buying guide and custom PC builder for students in Nagaland. Avoid 8GB soldered RAM traps, washed-out screens, and get verified Indian market pricing.',
  },
  metadataBase: new URL(SITE_URL),
};

export default function PCLaptopBuilderPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'Student PC & Laptop Builder',
    url: canonicalFor('/tools/pc-laptop-builder'),
    applicationCategory: 'EducationalApplication',
    operatingSystem: 'All',
    description:
      'Practical hardware buying guide and custom PC/laptop planner for software development and graphic design students in Nagaland, India.',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'INR',
    },
    publisher: {
      '@type': 'Organization',
      name: 'instudia',
      url: SITE_URL,
    },
  };

  return (
    <main className="bg-gray-50 min-h-screen font-jakarta text-neutral-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: SITE_URL },
          { name: 'Student Tools', url: canonicalFor('/tools') },
          {
            name: 'PC & Laptop Guide',
            url: canonicalFor('/tools/pc-laptop-builder'),
          },
        ]}
      />

      {/* ── Staggered Entrance Hero Section ── */}
      <HardwareHeroSection />

      {/* ── Main Interactive Tool with Light 2D Schematic ── */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <PCLaptopBuilderDashboard />
      </section>

      {/* ── Staggered Counseling FAQ & Mentor Desk Section ── */}
      <CounselingFaqSection />
    </main>
  );
}
