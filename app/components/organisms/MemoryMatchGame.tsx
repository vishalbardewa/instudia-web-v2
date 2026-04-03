"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  IconBrandReact,
  IconBrandPython,
  IconBrandJavascript,
  IconBrandFigma,
  IconBrandHtml5,
  IconBrandTailwind,
  IconBrandNodejs,
  IconBrandNextjs,
  IconRefresh,
} from "@tabler/icons-react";

// Pair definitions
const CARD_PAIRS = [
  { name: "React", icon: IconBrandReact, color: "text-[#61DAFB]" },
  { name: "Python", icon: IconBrandPython, color: "text-[#3776AB]" },
  { name: "JS", icon: IconBrandJavascript, color: "text-[#F7DF1E]" },
  { name: "Figma", icon: IconBrandFigma, color: "text-[#F24E1E]" },
  { name: "HTML", icon: IconBrandHtml5, color: "text-[#E34F26]" },
  { name: "Tailwind", icon: IconBrandTailwind, color: "text-[#06B6D4]" },
  { name: "Node", icon: IconBrandNodejs, color: "text-[#339933]" },
  { name: "NextJS", icon: IconBrandNextjs, color: "text-black" },
];

interface CardState {
  id: number;
  name: string;
  icon: any;
  color: string;
  isFlipped: boolean;
  isMatched: boolean;
}

export default function MemoryMatchGame() {
  const [cards, setCards] = useState<CardState[]>([]);
  const [flippedIndices, setFlippedIndices] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [matches, setMatches] = useState(0);
  const [isLocked, setIsLocked] = useState(false);

  // Initialize Game
  useEffect(() => {
    initializeGame();
  }, []);

  const initializeGame = () => {
    const shuffledCards = [...CARD_PAIRS, ...CARD_PAIRS]
      .sort(() => Math.random() - 0.5)
      .map((card, index) => ({
        ...card,
        id: index,
        isFlipped: false,
        isMatched: false,
      }));
    
    setCards(shuffledCards);
    setFlippedIndices([]);
    setMoves(0);
    setMatches(0);
    setIsLocked(false);
  };

  const handleCardClick = (index: number) => {
    if (isLocked || cards[index].isFlipped || cards[index].isMatched) return;

    const newFlipped = [...flippedIndices, index];
    setFlippedIndices(newFlipped);

    const newCards = [...cards];
    newCards[index].isFlipped = true;
    setCards(newCards);

    if (newFlipped.length === 2) {
      setIsLocked(true);
      setMoves((m) => m + 1);

      const [firstIndex, secondIndex] = newFlipped;

      if (newCards[firstIndex].name === newCards[secondIndex].name) {
        // Match!
        newCards[firstIndex].isMatched = true;
        newCards[secondIndex].isMatched = true;
        setCards(newCards);
        setMatches((m) => m + 1);
        setFlippedIndices([]);
        setIsLocked(false);
      } else {
        // No match, turn back after delay
        setTimeout(() => {
          const resetCards = [...cards];
          resetCards[firstIndex].isFlipped = false;
          resetCards[secondIndex].isFlipped = false;
          setCards(resetCards);
          setFlippedIndices([]);
          setIsLocked(false);
        }, 1000);
      }
    }
  };

  const isWin = matches === CARD_PAIRS.length;

  return (
    <div className="w-full max-w-xl mx-auto bg-white border-4 border-black rounded-xl font-mono relative overflow-hidden shadow-[8px_8px_0_0_rgba(0,0,0,1)]">
      
      {/* Title Bar Frame */}
      <div className="border-b-4 border-black p-4 text-black flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#58FF1B]">
        <div className="flex items-center gap-4">
          <div className="hidden sm:flex gap-2">
            <div className="w-3 h-3 rounded-full bg-white border-2 border-black" />
            <div className="w-3 h-3 rounded-full bg-white border-2 border-black" />
            <div className="w-3 h-3 rounded-full bg-white border-2 border-black" />
          </div>
          <h2 className="text-base font-black tracking-widest uppercase">/games/memory</h2>
        </div>
        <div className="flex gap-4 text-xs font-black uppercase">
          <div className="flex items-center gap-2 bg-white border-2 border-black px-2 py-1 shadow-[2px_2px_0_0_#000]">
            <span>Moves:</span>
            <span>{moves.toString().padStart(2, '0')}</span>
          </div>
          <div className="flex items-center gap-2 bg-white border-2 border-black px-2 py-1 shadow-[2px_2px_0_0_#000]">
            <span>Matches:</span>
            <span>{matches.toString().padStart(2, '0')}/{CARD_PAIRS.length.toString().padStart(2, '0')}</span>
          </div>
        </div>
      </div>

      {/* Game Grid Box */}
      <div className="p-4 sm:p-6 bg-white relative">
        <div className="absolute inset-0 pointer-events-none opacity-10 [background-image:radial-gradient(#000_1px,transparent_1px)] [background-size:16px_16px]" />

        {isWin ? (
           <motion.div 
             initial={{ opacity: 0, scale: 0.9 }}
             animate={{ opacity: 1, scale: 1 }}
             className="py-12 flex flex-col items-center justify-center text-center h-[340px] text-black relative z-10"
           >
             <div className="w-24 h-24 bg-[#58FF1B] border-4 border-black flex items-center justify-center shadow-[4px_4px_0_0_#000] mb-8 rotate-12">
               <span className="text-5xl">🏆</span>
             </div>
             
             <h3 className="text-4xl font-black uppercase mb-2 bg-brandpurple text-white px-4 py-1 border-4 border-black -rotate-2">
               Victory!
             </h3>
             <p className="mb-8 mt-4 text-sm font-bold bg-white border-2 border-black px-4 py-2 shadow-[2px_2px_0_0_#000]">
               Recovered all {matches} objects in {moves} queries.
             </p>
             <button
               onClick={initializeGame}
               className="group font-black uppercase text-lg flex items-center gap-2 border-4 border-black bg-[#58FF1B] px-8 py-3 hover:-translate-y-1 transition-transform shadow-[4px_4px_0_0_#000]"
             >
               Play Again
             </button>
           </motion.div>
        ) : (
          <div className="grid grid-cols-4 gap-3 sm:gap-4 h-[340px] relative z-10">
            {cards.map((card, index) => {
               const Icon = card.icon;
               return (
                <div
                  key={card.id}
                  onClick={() => handleCardClick(index)}
                  className="relative w-full h-full aspect-square cursor-pointer"
                >
                  <motion.div
                    className="w-full h-full relative"
                    animate={{ rotateY: card.isFlipped ? 180 : 0 }}
                    transition={{ type: "spring", stiffness: 260, damping: 20 }}
                    style={{ transformStyle: "preserve-3d" }}
                  >
                    {/* Front (Hidden state, brutalist block) */}
                    <div className="absolute inset-0 w-full h-full bg-[#f4f4f5] border-4 border-black flex items-center justify-center hover:bg-gray-200 shadow-[4px_4px_0_0_#000] transition-colors" style={{ backfaceVisibility: "hidden" }}>
                       <span className="text-black text-3xl font-black opacity-30">?</span>
                    </div>

                    {/* Back (Revealed state) */}
                    <div 
                      className={`absolute inset-0 w-full h-full flex flex-col items-center justify-center border-4 border-black shadow-[4px_4px_0_0_#000] transition-colors ${
                        card.isMatched ? "bg-black text-white" : "bg-white text-black"
                      }`}
                      style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
                    >
                       <Icon className={`w-10 h-10 sm:w-12 sm:h-12 ${card.color}`} stroke={2} />
                       <span className={`text-[10px] mt-1 uppercase font-black tracking-widest hidden sm:block ${card.isMatched ? "text-[#58FF1B]" : "text-black"}`}>
                         {card.name}
                       </span>
                    </div>
                  </motion.div>
                </div>
               );
            })}
          </div>
        )}
      </div>

    </div>
  );
}
