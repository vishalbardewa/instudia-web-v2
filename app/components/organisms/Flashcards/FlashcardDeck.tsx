'use client';

import React, { useState, useEffect } from 'react';
import { motion, useAnimation, PanInfo, AnimatePresence, useMotionValue, useTransform } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import 'katex/dist/katex.min.css';
import { IconCheck, IconX, IconArrowBackUp, IconRotate, IconPrinter } from '@tabler/icons-react';
import { Flashcard } from '@/app/tools/flashcards/types';

const BRUTALIST_COLORS = ['#FFE01B', '#C21BFF', '#58FF1B', '#FF1B58', '#1BFFA8', '#FF8C1B'];

interface FlashcardDeckProps {
  cards: Flashcard[];
  onFinished: (updatedCards: Flashcard[]) => void;
  onGoBack: () => void;
  onPrint?: () => void;
}

export default function FlashcardDeck({ cards: initialCards, onFinished, onGoBack, onPrint }: FlashcardDeckProps) {
  const [cards, setCards] = useState<Flashcard[]>(initialCards);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  const controls = useAnimation();
  const x = useMotionValue(0);

  useEffect(() => {
    setCards(initialCards);
    setCurrentIndex(0);
    setIsFlipped(false);
    controls.set({ x: 0, opacity: 1, rotate: 0 });
    x.set(0);
  }, [initialCards, controls, x]);

  // Bind rotation and opacity to x position for the active card
  const rotate = useTransform(x, [-200, 200], [-10, 10]);
  const opacity = useTransform(x, [-300, -100, 0, 100, 300], [0, 1, 1, 1, 0]);

  // Swipe indicators opacity
  const knowItOpacity = useTransform(x, [20, 100], [0, 1]);
  const recallOpacity = useTransform(x, [-20, -100], [0, 1]);

  // Bind animations for the next card underneath based on the top card's drag
  const nextCardScale = useTransform(x, [-200, 0, 200], [1, 0.95, 1]);
  const nextCardY = useTransform(x, [-200, 0, 200], [0, 24, 0]);
  const nextCardOpacity = useTransform(x, [-200, 0, 200], [1, 0.6, 1]);

  const swipeConfidenceThreshold = 10000;
  const swipePower = (offset: number, velocity: number) => {
    return Math.abs(offset) * velocity;
  };

  const handleDragEnd = (e: any, { offset, velocity }: PanInfo) => {
    const swipe = swipePower(offset.x, velocity.x);

    if (swipe < -swipeConfidenceThreshold || offset.x < -150) {
      handleSwipe('left');
    } else if (swipe > swipeConfidenceThreshold || offset.x > 150) {
      handleSwipe('right');
    } else {
      controls.start({ x: 0, rotate: 0, transition: { type: 'spring', stiffness: 300, damping: 20 } });
    }
  };

  const handleSwipe = async (direction: 'left' | 'right') => {
    const currentCard = cards[currentIndex];

    const updatedCards = [...cards];
    updatedCards[currentIndex] = {
      ...currentCard,
      status: direction === 'right' ? 'know' : 'recall',
    };
    setCards(updatedCards);

    // Animate out quickly and smoothly
    await controls.start({
      x: direction === 'right' ? window.innerWidth * 0.5 : -window.innerWidth * 0.5,
      opacity: 0,
      transition: { duration: 0.25, ease: "easeOut" },
    });

    if (currentIndex < cards.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      setIsFlipped(false);

      // Reset position immediately before next card shows up
      controls.set({ x: 0, opacity: 1, rotate: 0 });
      x.set(0);
    } else {
      onFinished(updatedCards);
    }
  };

  const handleUndo = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
      setIsFlipped(false);
      controls.set({ x: 0, opacity: 1, rotate: 0 });
      x.set(0);
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement).tagName)) return;

      if (e.key === 'ArrowRight') {
        handleSwipe('right');
      } else if (e.key === 'ArrowLeft') {
        handleSwipe('left');
      } else if (e.key === ' ' || e.key === 'Enter' || e.key === 'ArrowUp' || e.key === 'ArrowDown') {
        e.preventDefault();
        setIsFlipped((prev) => !prev);
      } else if (e.key === 'Backspace' || e.key === 'z') {
        handleUndo();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex, cards, isFlipped]);

  const activeCard = cards[currentIndex];
  const nextCard = cards[currentIndex + 1];

  if (currentIndex >= cards.length) {
    return null;
  }

  const themeColor = BRUTALIST_COLORS[currentIndex % BRUTALIST_COLORS.length];

  return (
    <div className="w-full max-w-lg mx-auto flex flex-col items-center p-4 min-h-[70vh] justify-center relative overflow-hidden font-jakarta">
      <div className="absolute top-0 left-0 w-full flex justify-between p-4 z-20">
        <button 
          onClick={onGoBack} 
          className="border-2 border-black bg-white px-4 py-2 text-[10px] font-black text-black uppercase tracking-[0.2em] hover:bg-black hover:text-white transition-all shadow-[4px_4px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-[4px] hover:translate-y-[4px] flex items-center gap-2"
        >
          <IconArrowBackUp size={16} stroke={3} /> Back
        </button>
        <div className="flex gap-2">
          {onPrint && (
            <button 
              onClick={onPrint} 
              className="border-2 border-black bg-white px-4 py-2 text-[10px] font-black text-black uppercase tracking-[0.2em] hover:bg-black hover:text-white transition-all shadow-[4px_4px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-[4px] hover:translate-y-[4px] flex items-center gap-2"
            >
              <IconPrinter size={16} stroke={3} /> Print
            </button>
          )}
          <div className="text-[10px] font-black tracking-[0.2em] text-white bg-black px-4 py-2 uppercase border-2 border-black shadow-[4px_4px_0px_#C21BFF] flex items-center">
            {String(currentIndex + 1).padStart(2, '0')} / {String(cards.length).padStart(2, '0')}
          </div>
        </div>
      </div>

      <div className="relative w-full aspect-[3/4] max-h-[600px] perspective-1000 mt-10">

        {/* Next Card Preview (Stack effect) */}
        {nextCard && (
          <motion.div
            style={{ scale: nextCardScale, y: nextCardY, opacity: nextCardOpacity }}
            className="absolute w-full h-full bg-neutral-100 border-2 border-black flex flex-col items-center justify-center text-center p-10 z-0 shadow-[16px_16px_0px_#FFE01B]"
          >
            <div className="text-[10px] font-black tracking-[0.2em] text-black uppercase absolute top-6 left-6 border-2 border-black px-2 py-0.5 bg-white">
              Queue
            </div>
            <h2 className="text-3xl lg:text-4xl font-black text-black leading-tight uppercase blur-[2px] opacity-40">
              {nextCard.front || ''}
            </h2>
          </motion.div>
        )}

        {/* Current Card */}
        <AnimatePresence mode="popLayout">
          <motion.div
            key={activeCard.id}
            style={{ x, rotate, opacity, transformStyle: 'preserve-3d' }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            onDragEnd={handleDragEnd}
            animate={controls}
            className="w-full h-full absolute cursor-grab active:cursor-grabbing z-10"
          >
            {/* SWIPE STAMPS */}
            <motion.div
              style={{ opacity: knowItOpacity }}
              className="absolute top-12 left-8 z-20 -rotate-12 pointer-events-none"
            >
              <div className="border-[4px] border-black bg-[#58FF1B] text-black font-black text-2xl md:text-3xl px-4 py-2 uppercase tracking-[0.2em] shadow-[8px_8px_0px_rgba(0,0,0,1)]">
                I Know It
              </div>
            </motion.div>

            <motion.div
              style={{ opacity: recallOpacity }}
              className="absolute top-12 right-8 z-20 rotate-12 pointer-events-none"
            >
              <div className="border-[4px] border-black bg-[#FF1B58] text-black font-black text-2xl md:text-3xl px-4 py-2 uppercase tracking-[0.2em] shadow-[8px_8px_0px_rgba(0,0,0,1)]">
                Recall
              </div>
            </motion.div>

            <motion.div
              className="w-full h-full relative"
              initial={false}
              animate={{ rotateY: isFlipped ? 180 : 0 }}
              transition={{ type: 'spring', stiffness: 260, damping: 20 }}
              style={{ transformStyle: 'preserve-3d' }}
              onClick={() => setIsFlipped(!isFlipped)}
            >
              {/* Front */}
              <div
                className="absolute w-full h-full backface-hidden bg-white border-2 border-black p-10 flex flex-col items-center justify-center text-center"
                style={{ backfaceVisibility: 'hidden', boxShadow: '16px 16px 0px rgba(0,0,0,1)' }}
              >
                <div className="absolute top-6 left-6 text-[10px] font-black tracking-[0.2em] text-white bg-black px-2 py-0.5 uppercase">
                  Front
                </div>
                <div className="text-3xl lg:text-4xl font-black text-black leading-[1] uppercase tracking-tighter select-none prose prose-2xl prose-p:m-0 max-w-none text-center">
                  <ReactMarkdown remarkPlugins={[remarkGfm, remarkMath]} rehypePlugins={[rehypeKatex]}>
                    {activeCard.front || ''}
                  </ReactMarkdown>
                </div>
                <div className="absolute bottom-8 text-[10px] font-black tracking-[0.2em] text-black uppercase border-2 border-black px-4 py-2 animate-pulse bg-[#FFE01B]">
                  Tap to flip
                </div>
              </div>

              {/* Back */}
              <div
                className="absolute w-full h-full backface-hidden bg-black border-2 border-black p-10 flex flex-col items-center overflow-y-auto brutalist-scrollbar"
                style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)', boxShadow: `-16px 16px 0px ${themeColor}` }}
              >
                <div className="text-[10px] font-black tracking-[0.2em] text-black bg-white px-2 py-0.5 uppercase mb-8 w-fit self-start">
                  Back
                </div>
                <div className="prose prose-invert max-w-none text-left w-full h-full flex-1 font-bold select-none text-white">
                  <ReactMarkdown remarkPlugins={[remarkGfm, remarkMath]} rehypePlugins={[rehypeKatex]}>
                    {activeCard.back || ''}
                  </ReactMarkdown>
                </div>
                <div className="mt-4 text-white text-[10px] font-black uppercase tracking-[0.1em] text-center w-full pt-6 border-t-2 border-white opacity-80">
                  Swipe Left for Recall, Right for Know it
                </div>
              </div>
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="flex flex-col items-center gap-8 mt-16 w-full justify-center">
        <div className="flex gap-6 items-center">
          <button
            onClick={handleUndo}
            disabled={currentIndex === 0}
            className={`w-16 h-16 border-2 border-black flex items-center justify-center transition-all ${currentIndex === 0
                ? 'bg-neutral-100 text-neutral-400 cursor-not-allowed shadow-[0px_0px_0px_rgba(0,0,0,1)]'
                : 'bg-white text-black hover:bg-black hover:text-white shadow-[6px_6px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-[6px] hover:translate-y-[6px]'
              }`}
            title="Undo (Backspace or Z)"
          >
            <IconRotate size={24} stroke={3} />
          </button>
          <button
            onClick={() => handleSwipe('left')}
            className="w-16 h-16 bg-[#FF1B58] border-2 border-black text-black flex items-center justify-center shadow-[6px_6px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-[6px] hover:translate-y-[6px] transition-all"
          >
            <IconX size={32} stroke={4} />
          </button>
          <button
            onClick={() => handleSwipe('right')}
            className="w-16 h-16 bg-[#58FF1B] border-2 border-black text-black flex items-center justify-center shadow-[6px_6px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-[6px] hover:translate-y-[6px] transition-all"
          >
            <IconCheck size={32} stroke={4} />
          </button>
        </div>

        <div className="hidden md:flex items-center gap-2 text-black text-[10px] font-black uppercase tracking-[0.1em] mt-2 flex-wrap justify-center max-w-sm">
          <span>Press</span>
          <span className="bg-black text-white border-2 border-black px-2 py-0.5">←</span>
          <span className="bg-black text-white border-2 border-black px-2 py-0.5">→</span>
          <span>swipe,</span>
          <span className="bg-black text-white border-2 border-black px-2 py-0.5">Space</span>
          <span>flip,</span>
          <span className="bg-black text-white border-2 border-black px-2 py-0.5">Backspace</span>
          <span>undo</span>
        </div>
      </div>
    </div>
  );
}
