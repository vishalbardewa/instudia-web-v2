export type Flashcard = {
  id: string;
  front: string;
  back: string;
  status: 'new' | 'know' | 'recall';
};

export type SavedDeck = {
  id: string;
  name: string;
  cards: Flashcard[];
  createdAt: number;
};
