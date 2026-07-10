'use client';

import React, { useState, useRef } from 'react';
import { IconUpload, IconFileText, IconCheck, IconSettings } from '@tabler/icons-react';
import { Flashcard } from '@/app/tools/flashcards/types';

interface FlashcardCreatorProps {
  onCardsGenerated: (cards: Flashcard[]) => void;
}

export default function FlashcardCreator({ onCardsGenerated }: FlashcardCreatorProps) {
  const [markdown, setMarkdown] = useState('');
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const parseMarkdown = (md: string) => {
    // Split cards by horizontal rule (---)
    const blocks = md.split(/\n---\n|\r\n---\r\n|^---\n|\n---$/m).filter((block) => block.trim().length > 0);
    
    const cards: Flashcard[] = blocks.map((block, index) => {
      const match = block.match(/##\s+(.*)(?:\r?\n)([\s\S]*)/);
      if (match) {
        return {
          id: `card-${index}-${Date.now()}`,
          front: match[1].trim(),
          back: match[2].trim(),
          status: 'new',
        };
      }
      return {
        id: `card-${index}-${Date.now()}`,
        front: 'Card ' + (index + 1),
        back: block.trim(),
        status: 'new',
      };
    });

    onCardsGenerated(cards);
  };

  const handleGenerate = () => {
    if (!markdown.trim()) return;
    parseMarkdown(markdown);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target?.result as string;
      setMarkdown(text);
      parseMarkdown(text);
    };
    reader.readAsText(file);
  };

  const onDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const onDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const file = e.dataTransfer.files?.[0];
    if (!file || !file.name.endsWith('.md')) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target?.result as string;
      setMarkdown(text);
      parseMarkdown(text);
    };
    reader.readAsText(file);
  };

  return (
    <div className="bg-white border-2 border-black p-6 md:p-12 shadow-[8px_8px_0px_#FFE01B] md:shadow-[12px_12px_0px_#FFE01B] relative overflow-hidden group">
      
      <div className="relative z-10 w-full">
        <div className="text-center mb-12">
          <span className="text-[10px] font-black text-white bg-black px-3 py-1 uppercase tracking-widest inline-block mb-6">
            Module
          </span>
          <h1 className="text-4xl md:text-6xl font-black text-black tracking-tighter mb-4 uppercase leading-[0.9]">
            Generate <br/>
            <span className="text-white [-webkit-text-stroke:1.5px_black]">Flashcards.</span>
          </h1>
          <p className="text-black font-bold uppercase opacity-80 max-w-lg mx-auto text-sm mt-6">
            Paste your Markdown below or upload a .md file to generate study cards with an interactive swiping interface.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Paste Markdown */}
          <div className="space-y-4 flex flex-col h-full">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-black text-white bg-black px-2 py-0.5">01</span>
              <h3 className="text-xs font-black text-black uppercase tracking-widest">Paste Markdown</h3>
            </div>
            <textarea
              className="flex-1 w-full min-h-[250px] p-5 border-2 border-black focus:outline-none bg-white focus:bg-neutral-50 transition-all font-bold text-black resize-none shadow-[6px_6px_0px_rgba(0,0,0,1)]"
              placeholder={`## What is React?
A JavaScript library for building user interfaces.

---

## What is Next.js?
A React framework that gives you building blocks to create web applications.`}
              value={markdown}
              onChange={(e) => setMarkdown(e.target.value)}
            />
            <button
              onClick={handleGenerate}
              disabled={!markdown.trim()}
              className="w-full mt-4 py-5 px-4 border-2 border-black bg-black text-white text-xs font-black uppercase tracking-widest hover:bg-white hover:text-black transition-all shadow-[6px_6px_0px_#C21BFF] hover:shadow-none hover:translate-x-[6px] hover:translate-y-[6px] disabled:opacity-50 disabled:shadow-none disabled:translate-x-0 disabled:translate-y-0 disabled:hover:bg-black disabled:hover:text-white flex items-center justify-center space-x-2"
            >
              <IconFileText size={18} stroke={3} />
              <span>Generate Deck</span>
            </button>
          </div>

          {/* Upload File */}
          <div className="space-y-4 flex flex-col h-full">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-black text-white bg-black px-2 py-0.5">02</span>
              <h3 className="text-xs font-black text-black uppercase tracking-widest">Upload File</h3>
            </div>
            <div
              onDragOver={onDragOver}
              onDragLeave={onDragLeave}
              onDrop={onDrop}
              onClick={() => fileInputRef.current?.click()}
              className={`flex-1 w-full border-2 border-dashed flex flex-col items-center justify-center cursor-pointer transition-all shadow-[6px_6px_0px_rgba(0,0,0,1)] bg-white ${
                isDragging
                  ? 'border-[#C21BFF] bg-neutral-50'
                  : 'border-black hover:bg-neutral-50'
              }`}
            >
              <div className="p-4 border-2 border-black bg-black text-white mb-6 shadow-[4px_4px_0px_#C21BFF]">
                <IconUpload size={24} stroke={3} />
              </div>
              <p className="font-black text-black uppercase tracking-tight text-sm">
                Drag & Drop .md file
              </p>
              <p className="text-[10px] font-bold text-black uppercase tracking-widest mt-2 opacity-60">
                or click to browse
              </p>
              <input
                type="file"
                accept=".md,text/markdown"
                className="hidden"
                ref={fileInputRef}
                onChange={handleFileUpload}
              />
            </div>
          </div>
        </div>

        <div className="mt-12 bg-white border-2 border-black p-6 flex flex-col md:flex-row gap-8 justify-between items-start md:items-center shadow-[8px_8px_0px_#58FF1B]">
          <div>
            <h4 className="text-[10px] font-black text-black uppercase tracking-[0.2em] flex items-center gap-2 mb-4">
              <IconSettings size={16} stroke={3} />
              Formatting Guide
            </h4>
            <ul className="list-disc list-inside space-y-3 text-xs text-black font-bold uppercase">
              <li>Use <code className="bg-black text-white px-2 py-0.5 border-2 border-black">## Heading</code> for the front of the card.</li>
              <li>Write the back of the card below the heading.</li>
              <li>Separate cards using three dashes (<code className="bg-black text-white px-2 py-0.5 border-2 border-black">---</code>).</li>
            </ul>
          </div>
          <button
            onClick={() => {
              const sample = `## What is React?\nA JavaScript library for building user interfaces.\n\n---\n\n## What is Next.js?\nA React framework that gives you building blocks to create web applications.`;
              const blob = new Blob([sample], { type: 'text/markdown' });
              const url = URL.createObjectURL(blob);
              const a = document.createElement('a');
              a.href = url;
              a.download = 'sample-flashcards.md';
              a.click();
              URL.revokeObjectURL(url);
            }}
            className="px-6 py-4 border-2 border-black bg-white text-[10px] font-black text-black uppercase tracking-[0.2em] hover:bg-black hover:text-white transition-all shadow-[4px_4px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-[4px] hover:translate-y-[4px] flex items-center gap-2 shrink-0"
          >
            <IconFileText size={16} stroke={3} />
            Download Sample
          </button>
        </div>
      </div>
    </div>
  );
}
