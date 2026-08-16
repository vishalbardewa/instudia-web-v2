import type { Metadata } from 'next';
import { SITE_URL, canonicalFor } from '@/lib/site';
import { AssessmentDesigner } from '../../components/organisms/AssessmentDesigner';

export const metadata: Metadata = {
  title: 'AI Assessment Designer & Quiz Creator',
  description: 'Generate high-quality curriculum-aligned tests and quizzes tailored for CBSE, ICSE and university exams with higher-order thinking rubrics.',
  alternates: { canonical: canonicalFor('/tools/assessment-designer') },
  keywords: ['AI quiz generator', 'assessment design', 'teacher tools', 'CBSE quiz generator', 'NCERT questions', 'Bloom\'s Taxonomy', 'Indian education system'],
  metadataBase: new URL(SITE_URL),
};

export default function AssessmentDesignerPage() {
  return (
    <main className="min-h-screen bg-[#fafafa]">
      <AssessmentDesigner />
    </main>
  );
}
