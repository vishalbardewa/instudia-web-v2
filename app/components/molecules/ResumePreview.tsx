"use client";
import React from "react";
import { IconMail, IconPhone, IconMapPin, IconWorld, IconBriefcase, IconExternalLink } from "@tabler/icons-react";

export const ResumePreview = ({ data }: any) => {
  const { basics, sections, settings } = data;
  const themeColor = settings?.themeColor || "#000000";
  const lineHeight = settings?.lineHeight || 1.6;
  const sectionGap = settings?.sectionGap || 24;
  const pagePadding = settings?.pagePadding || 20;
  const itemGap = settings?.itemGap || 10;
  const headerSize = settings?.headerSize || 4.0;
  const sectionTitleSize = settings?.sectionTitleSize || 11;
  const bodySize = settings?.bodySize || 14;

  const renderHeader = (alignment: "left" | "center" = "left", showContact: boolean = true) => (
    <div className={`mb-1 ${alignment === "center" ? "text-center" : ""}`}>
      <h1 className="text-[4em] font-black text-[#1B1C1E] mb-2 tracking-tighter leading-none">
        {basics.name?.split(" ")[0]} <span className="text-brandpurple">{basics.name?.split(" ").slice(1).join(" ")}</span>
      </h1>
      <div className={`flex flex-col gap-4 ${alignment === "center" ? "items-center" : "items-start"}`}>
        <span className="text-[#1B1C1E] border-b-2 border-brandpurple pb-0.5 text-[0.85em] font-black uppercase tracking-[0.1em]">{basics.title}</span>
        {showContact && (
          <div className={`flex flex-wrap items-center gap-2 text-[0.85em] font-black uppercase tracking-[0.1em] text-gray-400 ${alignment === "center" ? "justify-center" : ""}`}>
            <span>{basics.email}</span>
            <span>{basics.phone}</span>
            <span>{basics.location}</span>
            {basics.website && <span>{basics.website}</span>}
          </div>
        )}
      </div>
    </div>
  );

  const renderBento = () => (
    <div className="space-y-4">
      {renderHeader("left")}
      <div className="grid grid-cols-3 gap-12">
        <div className="col-span-2 space-y-12">
          {basics.summary && (
            <div className="section-spacing bg-neutral-50/30 p-8 rounded-[2rem] border border-neutral-100/50 shadow-sm">
              <div className="section-title">
                <h2 className="text-section-title font-black text-[#1B1C1E] uppercase">Professional Summary</h2>
              </div>
              <p className="font-medium text-justify text-gray-600 leading-relaxed">{basics.summary}</p>
            </div>
          )}

          {sections.filter((s: any) => s.type === "list").map((section: any) => (
            <div key={section.id} className="section-spacing">
              <div className="section-title">
                <h2 className="text-section-title font-black text-[#1B1C1E] uppercase">{section.title}</h2>
              </div>
              <div className="space-y-item-gap">
                {section.items.map((item: any, i: number) => (
                  <div key={i} className="group relative bg-white border border-neutral-100 rounded-[1.5rem] p-6 hover:shadow-md transition-all">
                    <div className="flex justify-between items-baseline mb-2">
                      <h3 className="text-[1.2em] font-black text-[#1B1C1E] tracking-tight">{item.title || "Entry Title"}</h3>
                      <span className="text-[0.7em] font-black text-gray-300 uppercase tracking-widest bg-neutral-50 px-2 py-1 rounded border border-neutral-100">{item.date}</span>
                    </div>
                    <div className="flex justify-between items-center mb-1">
                      <p className="text-[0.9em] font-black text-brandpurple uppercase tracking-widest">{item.subtitle}</p>
                      <span className="text-[0.7em] font-medium text-gray-400">{item.location}</span>
                    </div>
                    {item.description && (
                      <div className="item-description text-gray-500 font-medium whitespace-pre-wrap mt-3 pt-3 border-t border-neutral-50">
                        {item.description}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="col-span-1 space-y-12">
          {sections.filter((s: any) => s.type === "tags").map((section: any) => (
            <div key={section.id} className="section-spacing bg-neutral-50 p-8 rounded-[2rem] border border-neutral-100 h-fit">
              <div className="section-title">
                <h2 className="text-section-title font-black text-[#1B1C1E] uppercase">{section.title}</h2>
              </div>
              <div className="flex flex-wrap gap-2.5">
                {section.content?.split(",").map((tag: string, i: number) => (
                  <span key={i} className="px-3 py-1.5 bg-white text-[#1B1C1E] rounded-lg text-[0.7em] font-black border border-neutral-100 uppercase tracking-widest shadow-sm">
                    {tag.trim()}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderMinimalist = () => (
    <div className="max-w-4xl mx-auto space-y-14">
      {renderHeader("center")}
      {basics.summary && (
        <div className="section-spacing text-center border-y border-neutral-100 py-10">
          <p className="font-medium max-w-2xl mx-auto italic leading-relaxed text-gray-600">{basics.summary}</p>
        </div>
      )}

      {sections.map((section: any) => (
        <div key={section.id} className="section-spacing">
          <div className="section-title justify-center">
            <h2 className="text-section-title font-black text-[#1B1C1E] uppercase">{section.title}</h2>
          </div>

          {section.type === "list" ? (
            <div className="space-y-item-gap">
              {section.items.map((item: any, i: number) => (
                <div key={i} className="text-center">
                  <h3 className="text-[1.3em] font-black text-[#1B1C1E] mb-2">{item.title}</h3>
                  <p className="text-[0.9em] font-black text-brandpurple uppercase tracking-widest mb-2">{item.subtitle} — {item.date}</p>
                  {item.description && (
                    <div className="item-description text-gray-500 max-w-2xl mx-auto whitespace-pre-wrap">
                      {item.description}
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-wrap justify-center gap-3">
              {section.content?.split(",").map((tag: string, i: number) => (
                <span key={i} className="px-4 py-1.5 bg-neutral-50 text-[#1B1C1E] rounded-full text-[0.75em] font-black border border-neutral-100 uppercase tracking-widest">
                  {tag.trim()}
                </span>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );

  const renderExecutive = () => (
    <div className="space-y-4">
      {renderHeader("left")}
      <div className="grid grid-cols-12 gap-12 pt-12 border-t border-neutral-100">
        <div className="col-span-8 space-y-16">
          {sections.filter((s: any) => s.type === "list").map((sectionIndex: any) => (
            <div key={sectionIndex.id} className="section-spacing">
              <h2 className="text-section-title font-black text-[#1B1C1E] uppercase border-b-2 border-neutral-100 pb-2 mb-8">{sectionIndex.title}</h2>
              <div className="space-y-item-gap">
                {sectionIndex.items.map((item: any, i: number) => (
                  <div key={i} className="grid grid-cols-6 gap-6">
                    <div className="col-span-1 text-[0.75em] font-black text-gray-300 uppercase tracking-widest pt-1">{item.date}</div>
                    <div className="col-span-1 border-l-2 border-neutral-50 ml-2" />
                    <div className="col-span-4">
                      <h3 className="text-[1.1em] font-black text-[#1B1C1E] mb-1">{item.title}</h3>
                      <p className="text-[0.85em] font-black text-brandpurple uppercase tracking-widest mb-3">{item.subtitle}</p>
                      {item.description && (
                        <div className="item-description text-gray-500 whitespace-pre-wrap leading-relaxed">
                          {item.description}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="col-span-4 space-y-12 bg-neutral-50 px-8 py-10 rounded-[2rem] border border-neutral-100 h-fit">
          {basics.summary && (
            <div className="section-spacing mt-0!">
              <h2 className="text-[0.85em] font-black text-[#1B1C1E] uppercase tracking-widest mb-4">Target Profile</h2>
              <p className="text-[0.9em] font-medium leading-relaxed text-gray-600">{basics.summary}</p>
            </div>
          )}

          {sections.filter((s: any) => s.type === "tags").map((section: any) => (
            <div key={section.id} className="section-spacing">
              <h2 className="text-[0.85em] font-black text-[#1B1C1E] uppercase tracking-widest mb-4">{section.title}</h2>
              <div className="flex flex-col gap-3">
                {section.content?.split(",").map((tag: string, i: number) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-brandpurple"></div>
                    <span className="text-[0.85em] font-bold text-gray-700">{tag.trim()}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderMetropolitan = () => (
    <div className="grid grid-cols-12 gap-0 min-h-[297mm] -m-[var(--doc-page-padding)]">
      {/* Sidebar Focus (30%) */}
      <div className="col-span-4 bg-neutral-900 p-12 text-white space-y-16">
        <div>
          <h1 className="text-[3.5em] font-black leading-[0.9] tracking-tighter mb-4">
            {basics.name?.split(" ")[0]} <br />
            <span className="text-brandpurple">{basics.name?.split(" ").slice(1).join(" ")}</span>
          </h1>
          <p className="text-xs font-black uppercase tracking-[0.2em] text-neutral-400 mt-6 pb-2 border-b border-white/10">{basics.title}</p>
        </div>

        <div className="space-y-10">
          <div className="space-y-4">
            <h2 className="text-[0.7em] font-black uppercase tracking-[0.3em] text-brandpurple">Connect</h2>
            <div className="space-y-3 text-[0.8em] font-medium text-neutral-300">
              <div className="flex items-center gap-3"><IconMail size={14} className="text-neutral-500" /> {basics.email}</div>
              <div className="flex items-center gap-3"><IconPhone size={14} className="text-neutral-500" /> {basics.phone}</div>
              <div className="flex items-center gap-3"><IconMapPin size={14} className="text-neutral-500" /> {basics.location}</div>
              {basics.website && <div className="flex items-center gap-3"><IconWorld size={14} className="text-neutral-500" /> {basics.website}</div>}
            </div>
          </div>

          {sections.filter((s: any) => s.type === "tags").map((section: any) => (
            <div key={section.id} className="space-y-6">
              <h2 className="text-[0.7em] font-black uppercase tracking-[0.3em] text-brandpurple">{section.title}</h2>
              <div className="flex flex-wrap gap-2">
                {section.content?.split(",").map((tag: string, i: number) => (
                  <span key={i} className="px-3 py-1.5 bg-white/5 border border-white/10 rounded-lg text-[0.65em] font-black uppercase tracking-widest text-neutral-200">
                    {tag.trim()}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Main Content Focus (70%) */}
      <div className="col-span-8 p-16 bg-white space-y-16">
        {basics.summary && (
          <div className="section-spacing mt-0!">
            <div className="flex items-center gap-4 mb-4">
              <div className="h-[2px] w-8 bg-brandpurple" />
              <h2 className="text-[0.7em] font-black uppercase tracking-[0.3em] text-neutral-400">Core Narrative</h2>
            </div>
            <p className="text-[1.1em] font-medium leading-relaxed text-gray-800 italic">{basics.summary}</p>
          </div>
        )}

        {sections.filter((s: any) => s.type === "list").map((section: any) => (
          <div key={section.id} className="section-spacing">
            <h2 className="text-section-title font-black text-[#1B1C1E] uppercase flex items-center gap-4 mb-10">
              <span className="w-2 h-2 rounded-full bg-brandpurple" />
              {section.title}
            </h2>
            <div className="space-y-12 pl-6 border-l border-neutral-100">
              {section.items.map((item: any, i: number) => (
                <div key={i} className="relative">
                  <div className="absolute -left-[29px] top-1.5 w-3 h-3 rounded-full bg-white border-2 border-brandpurple" />
                  <div className="flex justify-between items-baseline mb-2">
                    <h3 className="text-[1.25em] font-black text-black tracking-tight">{item.title}</h3>
                    <span className="text-[0.7em] font-black text-brandpurple uppercase tracking-widest">{item.date}</span>
                  </div>
                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-[0.8em] font-bold text-gray-500">{item.subtitle}</span>
                    <span className="text-[0.8em] text-neutral-200">/</span>
                    <span className="text-[0.8em] font-medium text-gray-400 italic">{item.location}</span>
                  </div>
                  {item.description && (
                    <div className="text-[0.93em] text-gray-600 font-medium leading-relaxed whitespace-pre-wrap">
                      {item.description}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="resume-print-area relative p-0 overflow-hidden">
      <style dangerouslySetInnerHTML={{
        __html: `
        .resume-print-area {
            --local-brandpurple: ${themeColor};
            --doc-line-height: ${lineHeight};
            --doc-section-gap: ${sectionGap}px;
            --doc-page-padding: ${pagePadding}mm;
            --doc-item-gap: ${itemGap}px;
            --doc-header-size: ${headerSize}em;
            --doc-section-size: ${sectionTitleSize}px;
             --doc-body-size: ${bodySize}px;
            
            width: 210mm;
            min-height: 297mm;
            background: white;
            font-size: var(--doc-body-size);
            line-height: var(--doc-line-height);
            padding: var(--doc-page-padding);
            transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
         }
         .resume-print-area * {
            transition: color 0.35s ease-out, background-color 0.35s ease-out, border-color 0.35s ease-out, margin 0.35s ease-out, padding 0.35s ease-out, font-size 0.35s ease-out;
         }
         .resume-print-area .text-brandpurple { color: var(--local-brandpurple) !important; transition: color 0.3s ease-out; }
         .resume-print-area .bg-brandpurple { background-color: var(--local-brandpurple) !important; transition: background-color 0.3s ease-out; }
         .resume-print-area .border-brandpurple { border-color: var(--local-brandpurple) !important; transition: border-color 0.3s ease-out; }
         
         .resume-print-area h1 { 
           font-family: 'Plus Jakarta Sans', sans-serif; 
           letter-spacing: -0.05em; 
           line-height: 0.9; 
           font-size: var(--doc-header-size);
         }
         .text-section-title {
           font-size: var(--doc-section-size);
           font-family: 'Plus Jakarta Sans', sans-serif; 
           letter-spacing: 0.1em;
         }
         .resume-print-area h3 { font-family: 'Plus Jakarta Sans', sans-serif; }
         
         .section-title {
           display: flex;
           align-items: center;
           gap: 12px;
           margin-bottom: calc(var(--doc-line-height) * 12px);
         }
         .section-title::after {
           content: "";
           flex: 1;
           height: 1px;
           background: #f3f4f6;
         }

         .item-description {
            font-size: 0.93em;
            line-height: var(--doc-line-height);
            margin-top: calc(var(--doc-line-height) * 4px);
         }
         .section-spacing {
            margin-top: var(--doc-section-gap);
         }
         .space-y-item-gap > * + * {
            margin-top: var(--doc-item-gap);
         }

         @media print {
           body * { visibility: hidden; }
           .resume-print-area, .resume-print-area * { visibility: visible; }
           .resume-print-area { 
             position: absolute; left: 0; top: 0; width: 210mm; height: 297mm; 
             margin: 0; padding: var(--doc-page-padding); box-shadow: none !important; border: none !important; 
             -webkit-print-color-adjust: exact; print-color-adjust: exact;
           }
           @page { size: A4; margin: 0; }
         }
      `}} />

      {settings?.template === "minimalist" ? renderMinimalist() :
        settings?.template === "executive" ? renderExecutive() :
          settings?.template === "metropolitan" ? renderMetropolitan() :
            renderBento()}
    </div>
  );
};
