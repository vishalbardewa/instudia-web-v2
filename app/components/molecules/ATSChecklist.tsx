import React from 'react';
import { IconCheck, IconX, IconArrowRight, IconLayoutKanban } from '@tabler/icons-react';
import { getRecommendedCourses } from '../../utils/courseMatcher';

export const ATSChecklist = ({ keywordMatch, actionableFeedback }: { keywordMatch: any, actionableFeedback: string[] }) => {
  const recommendedCourses = getRecommendedCourses(keywordMatch?.missingKeywords || [], 2);
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

          {/* UPSELL FUNNEL: Missing Skills -> Native JSON Courses */}
          {keywordMatch.missingKeywords?.length > 0 && recommendedCourses.length > 0 && (
            <div className="bg-gradient-to-r from-brandpurple to-[#a116d4] rounded-[1.5rem] p-6 text-white mt-6 shadow-md border border-brandpurple/30 relative overflow-hidden transition-all hover:shadow-xl hover:-translate-y-1">
              <div className="absolute -right-8 -top-8 opacity-10 rotate-12 pointer-events-none">
                <IconLayoutKanban size={160} />
              </div>
              <div className="relative z-10 space-y-3">
                <h4 className="font-extrabold text-xl flex items-center gap-2">
                  Recommended Courses For You 🚀
                </h4>
                <p className="text-white/90 text-[14px] font-medium leading-relaxed max-w-sm mb-4">
                  Master the exact technical requirements missing from your ATS profile. We highly recommend these direct courses to immediately bypass recruitment filters:
                </p>

                <div className="flex flex-col gap-3 mt-4">
                  {recommendedCourses.map((course: any) => (
                    <a key={course.slug} href={`/courses/${course.slug}`} className="flex items-center justify-between p-3.5 bg-white/10 hover:bg-white/20 border border-white/20 rounded-[14px] transition-colors group">
                      <div className="flex flex-col">
                        <span className="font-extrabold text-white text-[15px]">{course.fullTitle}</span>
                        <span className="text-white/60 text-xs font-black uppercase tracking-wider">{course.category}</span>
                      </div>
                      <div className="p-2 bg-white text-brandpurple rounded-xl shadow-sm group-hover:scale-105 transition-transform">
                        <IconArrowRight size={18} stroke={3} />
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          )}
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
