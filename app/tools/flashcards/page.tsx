'use client';

import React, { useState, useEffect } from 'react';
import FlashcardCreator from '@/app/components/organisms/Flashcards/FlashcardCreator';
import FlashcardDeck from '@/app/components/organisms/Flashcards/FlashcardDeck';
import FlashcardPrintView from '@/app/components/organisms/Flashcards/FlashcardPrintView';
import { Flashcard, SavedDeck } from '@/app/tools/flashcards/types';
import { IconRotate, IconPrinter, IconPlus, IconTrash, IconCards, IconDeviceFloppy } from '@tabler/icons-react';
import { motion, AnimatePresence } from 'framer-motion';
import { getAllDecks, deleteDeck, saveDeck } from '@/app/tools/flashcards/utils/indexedDB';
import ConfirmModal from '@/app/components/molecules/ConfirmModal';

export default function FlashcardsPage() {
  const [cards, setCards] = useState<Flashcard[]>([]);
  const [mode, setMode] = useState<'input' | 'study' | 'summary' | 'print'>('input');
  const [printSource, setPrintSource] = useState<'study' | 'summary'>('summary');

  // Saved decks state
  const [savedDecks, setSavedDecks] = useState<SavedDeck[]>([]);
  const [deckName, setDeckName] = useState('');
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [deckToDelete, setDeckToDelete] = useState<string | null>(null);

  useEffect(() => {
    loadDecks();
    // Load saved user info
    const savedName = localStorage.getItem('instudia-flashcard-name');
    const savedEmail = localStorage.getItem('instudia-flashcard-email');
    if (savedName) setUserName(savedName);
    if (savedEmail) setUserEmail(savedEmail);
  }, []);

  const loadDecks = async () => {
    try {
      const decks = await getAllDecks();
      setSavedDecks(decks);
    } catch (e) {
      console.error(e);
    }
  };

  const handleDeleteClick = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setDeckToDelete(id);
  };

  const confirmDeleteDeck = async () => {
    if (!deckToDelete) return;
    try {
      await deleteDeck(deckToDelete);
      await loadDecks();
    } catch (e) {
      console.error(e);
    } finally {
      setDeckToDelete(null);
    }
  };

  const handleLoadDeck = (deck: SavedDeck) => {
    setCards(deck.cards.map(c => ({ ...c, status: 'new' })));
    setMode('study');
  };

  const handleSaveDeck = async () => {
    if (!deckName.trim() || !userName.trim() || !userEmail.trim() || cards.length === 0) return;
    setIsSaving(true);
    
    // Save user info to localStorage
    localStorage.setItem('instudia-flashcard-name', userName.trim());
    localStorage.setItem('instudia-flashcard-email', userEmail.trim());

    try {
      await saveDeck({
        id: `deck-${Date.now()}`,
        name: deckName.trim(),
        cards: cards,
        createdAt: Date.now()
      });
      setDeckName('');
      await loadDecks();
    } catch (e) {
      console.error(e);
    } finally {
      setIsSaving(false);
    }
  };

  const handleCardsGenerated = (newCards: Flashcard[]) => {
    setCards(newCards);
    setMode('study');
  };

  const handleStudyFinished = (completedCards: Flashcard[]) => {
    setCards(completedCards);
    setMode('summary');
  };

  const resetStudy = () => {
    setCards(cards.map(c => ({ ...c, status: 'new' })));
    setMode('study');
  };

  const studyRecallOnly = () => {
    const recallCards = cards.filter(c => c.status === 'recall');
    if (recallCards.length === 0) return;
    setCards(recallCards.map(c => ({ ...c, status: 'new' })));
    setMode('study');
  };

  if (mode === 'print') {
    return (
      <div className="print:m-0 print:p-0 print:bg-white bg-[#FAFAFA] min-h-screen">
        <FlashcardPrintView
          cards={cards}
          onGoBack={() => setMode(printSource)}
        />
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-[#FAFAFA] flex flex-col font-jakarta">

      {/* Swiss Archival Hero */}
      <section className="relative pt-32 pb-20 overflow-hidden border-b-2 border-black bg-white">
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
        <div className="relative z-10 w-full max-w-[1400px] mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
            <div className="lg:col-span-8">
              <div className="flex items-center gap-4 mb-8">
                <span className="text-[10px] font-black text-white bg-black px-3 py-1 uppercase tracking-widest">
                  Tool
                </span>
                <p className="text-[10px] font-black tracking-[0.4em] text-black uppercase">
                  Active Recall Memory
                </p>
              </div>

              <h1 className="text-5xl md:text-7xl lg:text-[9rem] font-black tracking-[-0.04em] text-black leading-[0.8] uppercase flex flex-col">
                <span>flash</span>
                <span className="text-white [-webkit-text-stroke:2px_black] md:[-webkit-text-stroke:4px_black]" style={{ paintOrder: 'stroke fill' }}>cards.</span>
              </h1>
            </div>

            <div className="lg:col-span-4 lg:mb-4 lg:text-right">
              <p className="text-sm font-bold text-black leading-tight max-w-sm ml-auto uppercase mb-10 opacity-70">
                Master any topic with <span className="text-brandpurple underline decoration-2 underline-offset-4">spaced repetition</span>. Create, swipe, and print your study material.
              </p>
              <div className="h-[2px] w-full bg-black/10 relative overflow-hidden hidden lg:block">
                <div className="absolute inset-0 bg-black w-1/3" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Container */}
      <div className="w-full max-w-[1400px] mx-auto px-4 md:px-8 py-12 flex flex-col lg:flex-row items-start justify-center gap-12 selection:bg-brandpurple/30">

        {/* SIDEBAR */}
        <aside className="w-full lg:w-80 shrink-0 flex flex-col gap-4 order-2 lg:order-1 mt-8 lg:mt-0">
          <div className="bg-white border-2 border-black p-6 h-fit shadow-[8px_8px_0px_rgba(0,0,0,1)] sticky top-8">
            <h3 className="font-black text-black mb-6 uppercase tracking-tight text-xl flex items-center gap-3">
              <div className="w-8 h-8 flex items-center justify-center text-white bg-black border-2 border-black">
                <IconCards size={18} />
              </div>
              Vault
            </h3>
            <div className="space-y-4 max-h-[60vh] overflow-y-auto brutalist-scrollbar pr-2">
              {savedDecks.length === 0 ? (
                <p className="text-[10px] font-black text-black uppercase tracking-widest text-center py-8 bg-neutral-100 border-2 border-dashed border-black">
                  [NO DECKS FOUND]
                </p>
              ) : (
                savedDecks.map(deck => (
                  <div
                    key={deck.id}
                    onClick={() => handleLoadDeck(deck)}
                    className="group bg-white border-2 border-black p-4 cursor-pointer transition-all flex items-center justify-between shadow-[4px_4px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-[4px] hover:translate-y-[4px]"
                  >
                    <div className="flex-1 min-w-0 pr-2">
                      <h4 className="font-black text-black text-sm truncate uppercase">{deck.name}</h4>
                      <p className="text-[10px] font-bold text-black opacity-60 mt-1 uppercase tracking-widest">{deck.cards.length} Cards</p>
                    </div>
                    <button 
                      onClick={(e) => handleDeleteClick(deck.id, e)}
                      className="w-8 h-8 flex items-center justify-center text-black hover:text-white hover:bg-black border-2 border-transparent hover:border-black transition-all opacity-0 group-hover:opacity-100 shrink-0"
                      title="Delete Deck"
                    >
                      <IconTrash size={16} />
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>
        </aside>

        {/* MAIN CONTENT */}
        <div className="flex-1 w-full max-w-4xl relative z-10 flex flex-col justify-center order-1 lg:order-2">

          <AnimatePresence mode="wait">
            {mode === 'input' && (
              <motion.div key="input" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, x: -20 }}>
                <FlashcardCreator onCardsGenerated={handleCardsGenerated} />
              </motion.div>
            )}

            {mode === 'study' && (
              <motion.div key="study" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }}>
                <FlashcardDeck
                  cards={cards}
                  onFinished={handleStudyFinished}
                  onGoBack={() => setMode('input')}
                  onPrint={() => {
                    setPrintSource('study');
                    setMode('print');
                  }}
                />
              </motion.div>
            )}

            {mode === 'summary' && (
            <motion.div key="summary" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white border-2 border-black p-6 md:p-12 shadow-[8px_8px_0px_#FFE01B] md:shadow-[12px_12px_0px_#FFE01B] relative overflow-hidden flex flex-col items-center text-center">
              
              <div className="relative z-10 w-full flex flex-col items-center">
                  <span className="text-[10px] font-black text-white bg-black px-3 py-1 uppercase tracking-widest mb-6">
                    Session Complete
                  </span>
                  <h2 className="text-4xl md:text-6xl font-black text-black tracking-tighter mb-4 uppercase leading-[0.9]">
                    Deck <br /><span className="text-white [-webkit-text-stroke:1.5px_black]">Mastered.</span>
                  </h2>
                  <p className="text-black font-bold opacity-80 uppercase text-sm mt-4">Here is a quick summary of your study session.</p>

                  <div className="flex flex-col sm:flex-row gap-8 my-10 w-full justify-center">
                    <div className="bg-white p-6 md:p-8 border-2 border-black min-w-[160px] shadow-[8px_8px_0px_#58FF1B] relative">
                      <div className="absolute -top-4 -right-4 w-10 h-10 border-2 border-black bg-[#58FF1B] text-black font-black flex items-center justify-center shadow-[4px_4px_0px_rgba(0,0,0,1)]">✓</div>
                      <div className="text-5xl font-black text-black mb-2">{cards.filter(c => c.status === 'know').length}</div>
                      <div className="text-black font-black uppercase tracking-[0.2em] text-[10px]">Known</div>
                    </div>
                    <div className="bg-white p-6 md:p-8 border-2 border-black min-w-[160px] shadow-[8px_8px_0px_#FF1B58] relative">
                      <div className="absolute -top-4 -right-4 w-10 h-10 border-2 border-black bg-[#FF1B58] text-black font-black flex items-center justify-center shadow-[4px_4px_0px_rgba(0,0,0,1)]">↺</div>
                      <div className="text-5xl font-black text-black mb-2">{cards.filter(c => c.status === 'recall').length}</div>
                      <div className="text-black font-black uppercase tracking-[0.2em] text-[10px]">To Recall</div>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4 mt-2 w-full justify-center">
                    <button
                      onClick={resetStudy}
                      className="px-8 py-5 border-2 border-black bg-white text-xs font-black text-black uppercase tracking-widest hover:bg-black hover:text-white transition-all shadow-[6px_6px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-[6px] hover:translate-y-[6px] flex items-center justify-center gap-2"
                    >
                      <IconRotate size={18} stroke={3} />
                      Study All Again
                    </button>

                    {cards.filter(c => c.status === 'recall').length > 0 && (
                      <button
                        onClick={studyRecallOnly}
                        className="px-8 py-5 border-2 border-black bg-white text-xs font-black text-black uppercase tracking-widest hover:bg-[#C21BFF] hover:text-white transition-all shadow-[6px_6px_0px_#C21BFF] hover:shadow-none hover:translate-x-[6px] hover:translate-y-[6px] flex items-center justify-center gap-2"
                      >
                        <IconRotate size={18} stroke={3} />
                        Study To Recall
                      </button>
                    )}
                  </div>

                  {/* Inline Save Input */}
                  <div className="mt-12 pt-10 border-t-2 border-black w-full max-w-md">
                    <label className="block text-[10px] font-black text-black uppercase tracking-widest mb-4 text-left">Save this deck to the vault?</label>
                    <div className="flex flex-col gap-3 w-full">
                      <input 
                        type="text" 
                        placeholder="YOUR NAME..."
                        value={userName}
                        onChange={e => setUserName(e.target.value)}
                        className="w-full bg-white border-2 border-black px-4 py-3 text-sm font-black text-black uppercase outline-none focus:bg-neutral-50 shadow-[4px_4px_0px_rgba(0,0,0,1)] placeholder:text-neutral-400 placeholder:normal-case transition-all"
                      />
                      <input 
                        type="email" 
                        placeholder="YOUR EMAIL ID..."
                        value={userEmail}
                        onChange={e => setUserEmail(e.target.value)}
                        className="w-full bg-white border-2 border-black px-4 py-3 text-sm font-black text-black uppercase outline-none focus:bg-neutral-50 shadow-[4px_4px_0px_rgba(0,0,0,1)] placeholder:text-neutral-400 placeholder:normal-case transition-all"
                      />
                      <div className="flex flex-col sm:flex-row items-center gap-2 w-full mt-2">
                        <input
                          type="text"
                          placeholder="DECK NAME..."
                          value={deckName}
                          onChange={e => setDeckName(e.target.value)}
                          onKeyDown={e => e.key === 'Enter' && handleSaveDeck()}
                          className="w-full sm:flex-1 bg-white border-2 border-black px-4 py-4 text-sm font-black text-black uppercase outline-none focus:bg-neutral-50 shadow-[4px_4px_0px_rgba(0,0,0,1)] placeholder:text-neutral-400 placeholder:normal-case transition-all"
                        />
                        <button
                          onClick={handleSaveDeck}
                          disabled={!deckName.trim() || !userName.trim() || !userEmail.trim() || isSaving}
                          className="w-full sm:w-auto h-[56px] px-6 border-2 border-black bg-black text-white font-black uppercase text-xs tracking-widest hover:bg-white hover:text-black transition-all shadow-[4px_4px_0px_#C21BFF] hover:shadow-none hover:translate-x-[4px] hover:translate-y-[4px] disabled:opacity-50 disabled:shadow-none disabled:translate-x-0 disabled:translate-y-0 disabled:hover:bg-black disabled:hover:text-white flex items-center justify-center"
                          title="Save Deck"
                        >
                          SAVE
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-4 mt-12 w-full justify-center">
                    <button
                      onClick={() => {
                        setPrintSource('summary');
                        setMode('print');
                      }}
                      className="px-6 py-4 border-2 border-black bg-white text-[10px] font-black text-black uppercase tracking-[0.2em] hover:bg-black hover:text-white transition-all shadow-[4px_4px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-[4px] hover:translate-y-[4px] flex items-center gap-2"
                    >
                      <IconPrinter size={16} stroke={3} />
                      Print View
                    </button>
                    <button
                      onClick={() => setMode('input')}
                      className="px-6 py-4 border-2 border-black bg-white text-[10px] font-black text-black uppercase tracking-[0.2em] hover:bg-black hover:text-white transition-all shadow-[4px_4px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-[4px] hover:translate-y-[4px] flex items-center gap-2"
                    >
                      <IconPlus size={16} stroke={3} />
                      New Deck
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <ConfirmModal
        isOpen={!!deckToDelete}
        onClose={() => setDeckToDelete(null)}
        onConfirm={confirmDeleteDeck}
        title="Delete Deck"
        message="Are you sure you want to delete this deck? This action cannot be undone."
        confirmText="Delete"
        cancelText="Cancel"
        isDestructive={true}
      />
    </main>
  );
}
