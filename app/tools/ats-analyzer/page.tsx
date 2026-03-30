import type { Metadata } from 'next';
import { ATSAnalyzer } from '../../components/organisms/ATSAnalyzer';

export const metadata: Metadata = {
  title: 'ATS Analyzer | CV Scanner',
  description: 'Simulate ATS systems and analyze your CV keyword density against actual job descriptions for tech roles in Nagaland.',
  alternates: { canonical: "/tools/ats-analyzer" },
};

export default function ATSAnalyzerPage() {
  return (
    <main className="min-h-screen bg-[#fafafa]">
      <ATSAnalyzer />
    </main>
  );
}
