import React from 'react';
import { IconCheck, IconX, IconArrowRight, IconLayoutKanban } from '@tabler/icons-react';

export const ATSChecklist = ({ keywordMatch, actionableFeedback }: { keywordMatch: any, actionableFeedback: string[] }) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      
      {/* Keyword Density Checker */}
      <div className="bg-white border border-neutral-100 rounded-[2rem] p-8 shadow-sm flex flex-col">
         <h3 className="text-xl font-extrabold text-[#1B1C1E] mb-8 flex items-center justify-between">
           Keyword Density 
           <span className="text-sm px-3 py-1.5 bg-brandpurple/10 text-brandpurple rounded-xl border border-brandpurple/20 font-bold">{keywordMatch.score}% Match</span>
         </h3>
         
         <div className="space-y-8 flex-1">
           <div>
             <h4 className="text-xs font-black text-red-500 mb-3 uppercase tracking-widest">Critical Missing Keywords</h4>
             <div className="flex flex-wrap gap-2.5">
               {keywordMatch.missingKeywords?.map((kw: string) => (
                 <span key={kw} className="px-3.5 py-1.5 bg-red-50 text-red-600 rounded-[10px] text-sm font-bold flex items-center gap-1.5 border border-red-100 shadow-sm">
                    <IconX size={16} stroke={3} /> {kw}
                 </span>
               ))}
               {!keywordMatch.missingKeywords?.length && <span className="text-neutral-500 text-sm font-bold">100% Keyword match achieved!</span>}
             </div>
           </div>

           <div>
             <h4 className="text-xs font-black text-green-500 mb-3 uppercase tracking-widest">Found Keywords</h4>
             <div className="flex flex-wrap gap-2.5">
               {keywordMatch.foundKeywords?.map((kw: string) => (
                 <span key={kw} className="px-3.5 py-1.5 bg-green-50 text-green-600 rounded-[10px] text-sm font-bold flex items-center gap-1.5 border border-green-100 shadow-sm">
                    <IconCheck size={16} stroke={3} /> {kw}
                 </span>
               ))}
             </div>
           </div>
         </div>
      </div>

      {/* Actionable Feedback Panel */}
      <div className="bg-brightyellow/10 border border-brightyellow/20 rounded-[2rem] p-8 shadow-sm">
         <h3 className="text-xl font-extrabold text-yellow-900 mb-6 flex items-center gap-2">
           <IconLayoutKanban size={24} />
           Actionable Recruiter Feedback
         </h3>
         <ul className="space-y-5">
           {actionableFeedback?.map((feedback: string, i: number) => (
             <li key={i} className="flex items-start gap-4">
               <div className="mt-0.5 bg-white p-1.5 rounded-full shadow-sm border border-yellow-200 shrink-0">
                 <IconArrowRight size={16} className="text-yellow-600" stroke={3} />
               </div>
               <span className="text-yellow-900 font-semibold leading-relaxed">{feedback}</span>
             </li>
           ))}
         </ul>
      </div>
      
    </div>
  );
};
