import React from 'react';
import { IconCheck, IconX, IconAlertTriangle } from '@tabler/icons-react';

export const ATSScorecard = ({ data }: { data: any }) => {
  const score = Number(data?.overallScore) || 0;
  const circumference = 2 * Math.PI * 70;
  const strokeDashoffset = circumference - (circumference * score) / 100;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
      {/* Overall Score Dial */}
      <div className="bg-white rounded-3xl p-8 border border-neutral-100 shadow-sm flex flex-col items-center justify-center relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-brandpurple/5 rounded-bl-full pointer-events-none" />
        
        <h3 className="text-neutral-500 font-extrabold tracking-wide mb-6 uppercase text-sm">Overall ATS Match</h3>
        
        <div className="relative w-40 h-40 flex flex-col items-center justify-center rounded-full border-[10px] border-brandpurple/10">
          <svg className="absolute inset-0 w-full h-full transform -rotate-90" viewBox="0 0 160 160">
             <circle 
               cx="80" cy="80" r="70" fill="transparent"
               stroke="currentColor" strokeWidth="10"
               className="text-brandpurple transition-all duration-1000 ease-out"
               strokeDasharray={circumference} 
               strokeDashoffset={strokeDashoffset}
               strokeLinecap="round"
             />
          </svg>
          <span className="text-4xl font-extrabold text-[#1B1C1E]">{score}%</span>
        </div>
      </div>
      
      {/* Parse-ability & Sectioning Overview */}
      <div className="space-y-6">
         <div className="bg-[#1B1C1E] text-white rounded-3xl p-8 shadow-md flex items-start gap-5 transform hover:-translate-y-1 transition-transform">
            <div className={`p-3 rounded-2xl shrink-0 ${data?.parseability?.status === 'Pass' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
               {data?.parseability?.status === 'Pass' ? <IconCheck size={28} /> : <IconX size={28} />}
            </div>
            <div>
               <h4 className="font-extrabold text-xl mb-1">Parse-ability</h4>
               <p className="text-[15px] text-neutral-400 font-medium leading-relaxed">{data?.parseability?.feedback || "Could not evaluate structure."}</p>
            </div>
         </div>

         <div className="bg-white rounded-3xl p-8 border border-neutral-100 shadow-sm flex items-start gap-5 transform hover:-translate-y-1 transition-transform">
            <div className={`p-3 rounded-2xl shrink-0 ${data?.sectioning?.status === 'Pass' || data?.sectioning?.status === 'Warning' ? (data?.sectioning?.status === 'Pass' ? 'bg-green-500/10 text-green-600' : 'bg-yellow-500/10 text-yellow-600') : 'bg-red-500/10 text-red-600'}`}>
               {data?.sectioning?.status === 'Pass' ? <IconCheck size={28} /> : <IconAlertTriangle size={28} />}
            </div>
            <div>
               <h4 className="font-extrabold text-xl text-[#1B1C1E] mb-1">Structural Sectioning</h4>
               <p className="text-[15px] text-neutral-500 font-medium leading-relaxed">{data?.sectioning?.feedback || "Could not map document sections."}</p>
            </div>
         </div>
      </div>
    </div>
  );
};
