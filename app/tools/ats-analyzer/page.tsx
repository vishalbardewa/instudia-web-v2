import type { Metadata } from 'next';
import { SITE_URL, canonicalFor } from '@/lib/site';
import { ATSAnalyzer } from '../../components/organisms/ATSAnalyzer';

export const metadata: Metadata = {
  title: 'Free ATS Resume Analyzer & Score Checker',
  description: 'Scan your CV against modern Applicant Tracking Systems to optimize keyword density, format compatibility and score for top tech hiring teams.',
  alternates: { canonical: canonicalFor('/tools/ats-analyzer') },
  metadataBase: new URL(SITE_URL),
};

export default function ATSAnalyzerPage() {
  return (
    <main className="min-h-screen bg-[#fafafa]">
      <ATSAnalyzer />
    </main>
  );
}
