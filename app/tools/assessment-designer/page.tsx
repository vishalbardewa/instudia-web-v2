import type { Metadata } from 'next';
import { AssessmentDesigner } from '../../components/organisms/AssessmentDesigner';

export const metadata: Metadata = {
  title: 'Assessment Design Specialist | AI Quiz Generator',
  description: 'Generate high-quality, calibrated assessments strictly based on your source material. Tailored for the Indian Education System (CBSE/ICSE/UGC) with a focus on higher-order thinking.',
  alternates: { canonical: "/tools/assessment-designer" },
  keywords: ['AI quiz generator', 'assessment design', 'teacher tools', 'CBSE quiz generator', 'NCERT questions', 'Bloom\'s Taxonomy', 'Indian education system'],
};

export default function AssessmentDesignerPage() {
  return (
    <main className="min-h-screen bg-[#fafafa]">
      <AssessmentDesigner />
    </main>
  );
}
