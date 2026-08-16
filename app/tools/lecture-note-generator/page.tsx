import type { Metadata } from 'next';
import { SITE_URL, canonicalFor } from '@/lib/site';
import { LectureNoteGenerator } from '../../components/organisms/LectureNoteGenerator';

export const metadata: Metadata = {
  title: 'AI Lecture Note & Summary Generator',
  description: 'Transform complex textbooks and documents into structured, high-retention lecture notes, simplified concepts and engaging lesson outlines.',
  alternates: { canonical: canonicalFor('/tools/lecture-note-generator') },
  keywords: ['pedagogical assistant', 'lecture notes generator', 'teacher tools', 'lesson planning AI', 'NCERT simplification', 'Bloom\'s Taxonomy', 'Indian education system'],
  metadataBase: new URL(SITE_URL),
};

export default function LectureNoteGeneratorPage() {
  return (
    <main className="min-h-screen bg-[#fafafa]">
      <LectureNoteGenerator />
    </main>
  );
}
