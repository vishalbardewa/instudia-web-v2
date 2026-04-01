import type { Metadata } from 'next';
import { LectureNoteGenerator } from '../../components/organisms/LectureNoteGenerator';

export const metadata: Metadata = {
  title: 'Pedagogical Assistant | Guided Lecture Notes Generator',
  description: 'Transform complex documents into high-retention lecture notes for teachers. Features include jargon simplification, visual cues, analogies, and the Rule of Three.',
  alternates: { canonical: "/tools/lecture-note-generator" },
  keywords: ['pedagogical assistant', 'lecture notes generator', 'teacher tools', 'lesson planning AI', 'NCERT simplification', 'Bloom\'s Taxonomy', 'Indian education system'],
};

export default function LectureNoteGeneratorPage() {
  return (
    <main className="min-h-screen bg-[#fafafa]">
      <LectureNoteGenerator />
    </main>
  );
}
