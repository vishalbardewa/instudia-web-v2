'use client';

import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import 'katex/dist/katex.min.css';
import { IconPrinter, IconArrowBackUp } from '@tabler/icons-react';
import { Flashcard } from '@/app/tools/flashcards/types';

interface FlashcardPrintViewProps {
  cards: Flashcard[];
  onGoBack: () => void;
}

export default function FlashcardPrintView({ cards, onGoBack }: FlashcardPrintViewProps) {
  const [cardsPerPage, setCardsPerPage] = useState(8);

  const handlePrint = () => {
    window.print();
  };

  // Chunk the cards into pages
  const chunks: (Flashcard | null)[][] = [];
  for (let i = 0; i < cards.length; i += cardsPerPage) {
    const chunk: (Flashcard | null)[] = cards.slice(i, i + cardsPerPage);
    while (chunk.length < cardsPerPage) {
      chunk.push(null);
    }
    chunks.push(chunk);
  }

  type LayoutConfig = {
    cols: number;
    orientation: 'portrait' | 'landscape';
    label: string;
  };

  const getLayoutConfig = (): LayoutConfig => {
    switch (cardsPerPage) {
      case 4: return { cols: 2, orientation: 'portrait', label: '4 / Pg (Portrait)' };
      case 6: return { cols: 3, orientation: 'landscape', label: '6 / Pg (Landscape)' };
      case 8: return { cols: 2, orientation: 'portrait', label: '8 / Pg (Portrait)' };
      case 10: return { cols: 2, orientation: 'portrait', label: '10 / Pg (Portrait)' };
      default: return { cols: 2, orientation: 'portrait', label: '8 / Pg (Portrait)' };
    }
  };

  const layout = getLayoutConfig();

  const getMirroredChunk = (chunk: (Flashcard | null)[]) => {
    const mirrored: (Flashcard | null)[] = [];
    const cols = layout.cols;
    for (let i = 0; i < chunk.length; i += cols) {
      const row = chunk.slice(i, i + cols);
      // Pad row to ensure exact 'cols' elements so mirroring doesn't shift
      while (row.length < cols) {
        row.push(null as any);
      }
      mirrored.push(...row.reverse());
    }
    return mirrored;
  };

  const getDynamicFrontClass = (text: string) => {
    const len = text.length;
    const isTight = cardsPerPage >= 6;
    if (len < 30) return isTight ? 'prose-xl text-xl' : 'prose-2xl text-2xl';
    if (len < 80) return isTight ? 'prose-lg text-lg' : 'prose-xl text-xl';
    if (len < 150) return isTight ? 'prose-base text-base' : 'prose-lg text-lg';
    return isTight ? 'prose-sm text-sm' : 'prose-base text-base';
  };

  const getDynamicBackClass = (text: string) => {
    const len = text.length;
    const isTight = cardsPerPage >= 6;
    if (len < 100) return isTight ? 'prose-sm' : 'prose-base';
    if (len < 300) return isTight ? 'prose-sm [&_*]:text-xs [&_*]:leading-snug' : 'prose-sm';
    if (len < 500) return isTight ? 'prose-sm [&_*]:text-[10px] [&_*]:leading-tight' : 'prose-sm [&_*]:text-xs [&_*]:leading-snug';
    return isTight ? 'prose-sm [&_*]:text-[9px] [&_*]:leading-tight' : 'prose-sm [&_*]:text-[10px] [&_*]:leading-tight';
  };

  return (
    <div className="w-full max-w-5xl mx-auto p-4 md:p-8 font-jakarta min-h-screen bg-[#FAFAFA] print:bg-white print:p-0 print:m-0">
      <style dangerouslySetInnerHTML={{
        __html: `
        @media print {
          @page {
            size: ${layout.orientation};
            margin: 0.5cm;
          }
        }
      `}} />
      {/* Non-printable controls */}
      <div className="print:hidden bg-white border-2 border-black p-6 sm:p-8 shadow-[8px_8px_0px_rgba(0,0,0,1)] md:shadow-[12px_12px_0px_rgba(0,0,0,1)] mb-12 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 relative overflow-hidden">

        <div className="relative z-10 flex flex-col items-start text-left">
          <span className="text-[10px] font-black text-white bg-black px-2 py-0.5 uppercase tracking-widest mb-2">Print Configuration</span>
          <h2 className="text-3xl font-black text-black tracking-tighter uppercase">Print Setup</h2>
        </div>

        <div className="relative z-10 flex flex-col sm:flex-row flex-wrap gap-4 items-stretch sm:items-center w-full lg:w-auto mt-2 lg:mt-0">
          <div className="flex items-center justify-between sm:justify-start gap-4 w-full sm:w-auto sm:mr-2">
            <label className="text-[10px] font-black text-black uppercase tracking-widest shrink-0">Layout:</label>
            <select
              value={cardsPerPage}
              onChange={e => setCardsPerPage(Number(e.target.value))}
              className="flex-1 sm:flex-none h-14 bg-white border-2 border-black text-black font-black text-xs uppercase tracking-widest px-4 outline-none focus:bg-neutral-50 shadow-[4px_4px_0px_#C21BFF] cursor-pointer"
            >
              <option value={4}>4 / Pg (Portrait)</option>
              <option value={6}>6 / Pg (Landscape)</option>
              <option value={8}>8 / Pg (Portrait)</option>
              <option value={9}>9 / Pg (Portrait)</option>
              <option value={10}>10 / Pg (Portrait)</option>
            </select>
          </div>
          <button
            onClick={onGoBack}
            className="w-full sm:w-auto h-14 justify-center px-6 bg-white border-2 border-black text-black text-[10px] font-black uppercase tracking-[0.2em] hover:bg-black hover:text-white transition-all shadow-[4px_4px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-[4px] hover:translate-y-[4px] flex items-center gap-2 shrink-0"
          >
            <IconArrowBackUp size={16} stroke={3} />
            Back
          </button>
          <button
            onClick={handlePrint}
            className="w-full sm:w-14 h-14 bg-black border-2 border-black text-white hover:bg-white hover:text-black transition-all shadow-[4px_4px_0px_#FFE01B] hover:shadow-none hover:translate-x-[4px] hover:translate-y-[4px] flex items-center justify-center shrink-0"
            title="Print to PDF"
          >
            <IconPrinter size={24} stroke={3} />
          </button>
        </div>
      </div>

      {/* Printable Area */}
      <div className="print:block space-y-8 print:space-y-0 print:pb-[100px]">


        {chunks.map((chunk, chunkIndex) => {
          const mirroredChunk = getMirroredChunk(chunk);
          const startIndex = chunkIndex * cardsPerPage;

          return (
            <React.Fragment key={chunkIndex}>
              {/* FRONTS PAGE */}
              <div
                className="print:mb-0 mb-16 print:flex print:flex-col print:h-[94vh]"
                style={{ pageBreakAfter: 'always' }}
              >
                <div className="print:hidden text-xs font-black text-black bg-white border-2 border-black inline-block px-4 py-2 uppercase tracking-widest shadow-[4px_4px_0px_rgba(0,0,0,1)] mb-6">
                  Page {chunkIndex * 2 + 1}: Fronts
                </div>
                <div className={`grid grid-cols-1 md:grid-cols-2 ${layout.cols === 3 ? 'print:grid-cols-3' : 'print:grid-cols-2'} gap-6 print:gap-0 print:auto-rows-fr flex-1`}>
                  {chunk.map((card, idx) => {
                    if (!card) {
                      return (
                        <div
                          key={`empty-front-${idx}`}
                          className="print:border-[1px] print:border-dashed print:border-transparent p-0 print:p-2 hidden print:block h-full"
                        >
                          <div className={`border-[3px] border-transparent h-full`} />
                        </div>
                      );
                    }
                    return (
                      <div
                        key={card.id}
                        className="print:border-[1px] print:border-dashed print:border-neutral-400 p-0 print:p-2 break-inside-avoid h-full"
                      >
                        <div className={`border-2 border-black p-8 print:p-6 flex flex-col items-center justify-center min-h-[250px] print:min-h-0 print:h-full bg-white text-center shadow-[6px_6px_0px_rgba(0,0,0,1)] print:shadow-none relative overflow-hidden`}>
                          <div className="absolute top-0 left-0 bg-black text-white px-2 py-1 text-[10px] font-black tracking-widest uppercase">
                            F - {startIndex + idx + 1}
                          </div>
                          <div className={`w-full mt-4 prose prose-p:m-0 max-w-none text-center ${getDynamicFrontClass(card.front)}`}>
                            <div className="font-black text-black print:text-black uppercase tracking-tighter">
                              <ReactMarkdown remarkPlugins={[remarkGfm, remarkMath]} rehypePlugins={[rehypeKatex]}>
                                {card.front}
                              </ReactMarkdown>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* BACKS PAGE */}
              <div
                className="print:mb-0 mb-16 print:flex print:flex-col print:h-[94vh]"
                style={{ pageBreakAfter: 'always' }}
              >
                <div className="print:hidden text-xs font-black text-black bg-white border-2 border-black inline-block px-4 py-2 uppercase tracking-widest shadow-[4px_4px_0px_rgba(0,0,0,1)] mb-6">
                  Page {chunkIndex * 2 + 2}: Backs (Mirrored)
                </div>
                <div className={`grid grid-cols-1 md:grid-cols-2 ${layout.cols === 3 ? 'print:grid-cols-3' : 'print:grid-cols-2'} gap-6 print:gap-0 print:auto-rows-fr flex-1`}>
                  {mirroredChunk.map((card, idx) => {
                    if (!card) {
                      return (
                        <div
                          key={`empty-${idx}`}
                          className="print:border-[1px] print:border-dashed print:border-transparent p-0 print:p-2 hidden print:block h-full"
                        >
                          <div className={`border-[3px] border-transparent h-full`} />
                        </div>
                      );
                    }

                    // We need to calculate the original index to display it correctly
                    // In a mirrored chunk [1, 0, 3, 2], index mapping:
                    // idx 0 -> card at chunk[1]
                    // idx 1 -> card at chunk[0]
                    const rowIdx = Math.floor(idx / layout.cols);
                    const colIdx = idx % layout.cols;
                    const originalColIdx = (layout.cols - 1) - colIdx;
                    const originalIdxInChunk = rowIdx * layout.cols + originalColIdx;

                    return (
                      <div
                        key={card.id}
                        className="print:border-[1px] print:border-dashed print:border-neutral-400 p-0 print:p-2 break-inside-avoid h-full"
                      >
                        <div className={`border-2 border-black p-8 print:p-6 flex flex-col min-h-[250px] print:min-h-0 print:h-full bg-neutral-50 print:bg-white shadow-[6px_6px_0px_rgba(0,0,0,1)] print:shadow-none relative overflow-hidden`}>
                          <div className="absolute top-0 left-0 bg-black text-white px-2 py-1 text-[10px] font-black tracking-widest uppercase">
                            B - {startIndex + originalIdxInChunk + 1}
                          </div>
                          <div className="w-full mt-6 flex-1 overflow-y-auto brutalist-scrollbar flex items-center justify-start flex-col">
                            <div className={`prose max-w-none text-left print:text-black font-bold text-black w-full ${getDynamicBackClass(card.back)}`}>
                              <ReactMarkdown remarkPlugins={[remarkGfm, remarkMath]} rehypePlugins={[rehypeKatex]}>
                                {card.back}
                              </ReactMarkdown>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </React.Fragment>
          );
        })}
      </div>

      {/* Global Print Ad (Repeats on every printed page via fixed positioning) */}
      <div
        className="hidden print:flex fixed bottom-0 left-0 w-full flex-col items-center gap-0.5 pt-2 pb-2 text-center bg-black px-4 z-50"
        style={{ WebkitPrintColorAdjust: 'exact', printColorAdjust: 'exact' }}
      >
        <div className="flex items-center justify-center gap-1.5">
          <span className="text-[8px] font-black text-white uppercase tracking-[0.2em]">Created with</span>
          <img src="/assets/images/instudia-dark-logo.png" alt="Instudia" className="h-[10px] w-auto -mt-0.5" />
          <span className="text-[8px] font-black text-white uppercase tracking-[0.2em]">— Generate your own at instudianagaland.com</span>
        </div>
        <div className="flex gap-2 text-[7px] font-bold text-white uppercase tracking-widest opacity-80">
          <span>Explore Courses:</span>
          <span>DCA</span>
          <span>•</span>
          <span>PGDCA</span>
          <span>•</span>
          <span>AI</span>
          <span>•</span>
          <span>Web Development</span>
          <span>•</span>
          <span>UI/UX Design</span>
          <span>•</span>
          <span>Data Science</span>
          <span>•</span>
          <span>Digital Marketing</span>
        </div>
      </div>
    </div>
  );
}
