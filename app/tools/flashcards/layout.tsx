import type { Metadata } from 'next';
import { SITE_URL, canonicalFor } from '@/lib/site';
import { buildMetadata } from '@/lib/metadata';

export const metadata: Metadata = buildMetadata({
  title: 'Free Interactive Flashcard Tool for Active Recall',
  description: 'Master any tech or study topic with markdown-powered interactive flashcards, spaced repetition tracking, and printable study decks by instudia.',
  path: '/tools/flashcards',
  keywords: ['flashcards', 'active recall', 'spaced repetition', 'study tool', 'interactive study deck', 'instudia tools', 'dimapur', 'nagaland'],
  image: 'https://res.cloudinary.com/dhwg77gwm/image/upload/f_auto,q_auto/v1/instudia/tqo7qzztc4duzktj0jt9',
  imageAlt: 'instudia Active Recall Flashcard Tool',
});

export default function FlashcardsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
