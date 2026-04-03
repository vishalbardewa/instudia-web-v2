import React, { useState } from "react";
import { IconPlus, IconTrash, IconSparkles, IconLoader2, IconForms, IconTags, IconListNumbers, IconChevronUp, IconChevronDown } from "@tabler/icons-react";
import { motion, AnimatePresence } from "framer-motion";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      damping: 25,
      stiffness: 200
    }
  }
};

const Input = ({ label, value, onChange, placeholder, type = "text" }: any) => (
  <div className="space-y-3">
    <label className="text-[10px] font-black text-black uppercase tracking-[0.2em] ml-1">{label}</label>
    <input
      type={type}
      placeholder={placeholder}
      className="w-full p-4 bg-neutral-50 rounded-xl border border-neutral-100 outline-none focus:bg-white focus:border-brandpurple/20 transition-all text-sm font-medium text-black shadow-sm focus:shadow-md"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  </div>
);

export const ResumeForm = ({ data, setData }: any) => {
  const [loadingId, setLoadingId] = useState<string | null>(null);

  const updateBasics = (field: string, value: string) => {
    setData((prev: any) => ({
      ...prev,
      basics: { ...prev.basics, [field]: value }
    }));
  };

  const updateSection = (sectionIndex: number, field: string, value: any) => {
    setData((prev: any) => {
      const newSections = [...prev.sections];
      newSections[sectionIndex] = { ...newSections[sectionIndex], [field]: value };
      return { ...prev, sections: newSections };
    });
  };

  const moveSection = (index: number, direction: "up" | "down") => {
    setData((prev: any) => {
      const newSections = [...prev.sections];
      const nextIndex = direction === "up" ? index - 1 : index + 1;
      if (nextIndex < 0 || nextIndex >= newSections.length) return prev;
      [newSections[index], newSections[nextIndex]] = [newSections[nextIndex], newSections[index]];
      return { ...prev, sections: newSections };
    });
  };

  const updateItem = (sectionIndex: number, itemIndex: number, field: string, value: any) => {
    setData((prev: any) => {
      const newSections = [...prev.sections];
      const newItems = [...newSections[sectionIndex].items];
      newItems[itemIndex] = { ...newItems[itemIndex], [field]: value };
      newSections[sectionIndex] = { ...newSections[sectionIndex], items: newItems };
      return { ...prev, sections: newSections };
    });
  };

  const addItem = (sectionIndex: number) => {
    setData((prev: any) => {
      const newSections = [...prev.sections];
      const template = { title: "", subtitle: "", date: "", description: "", location: "" };
      newSections[sectionIndex] = {
        ...newSections[sectionIndex],
        items: [...newSections[sectionIndex].items, template]
      };
      return { ...prev, sections: newSections };
    });
  };

  const removeItem = (sectionIndex: number, itemIndex: number) => {
    setData((prev: any) => {
      const newSections = [...prev.sections];
      newSections[sectionIndex] = {
        ...newSections[sectionIndex],
        items: newSections[sectionIndex].items.filter((_: any, i: number) => i !== itemIndex)
      };
      return { ...prev, sections: newSections };
    });
  };

  const addSection = (type: "list" | "tags") => {
    setData((prev: any) => ({
      ...prev,
      sections: [...prev.sections, {
        id: `sec-${Date.now()}`,
        title: "New Section",
        type,
        items: type === "list" ? [{ title: "", subtitle: "", date: "", description: "" }] : [],
        content: type === "tags" ? "" : undefined
      }]
    }));
  };

  const removeSection = (sectionIndex: number) => {
    setData((prev: any) => ({
      ...prev,
      sections: prev.sections.filter((_: any, i: number) => i !== sectionIndex)
    }));
  };

  const refineSummary = async () => {
    setLoadingId("basics-summary");
    try {
      const res = await fetch("/api/refine-resume", {
        method: "POST",
        body: JSON.stringify({ content: data.basics.summary, type: "summary" }),
      });
      const result = await res.json();
      if (result.refinedText) updateBasics("summary", result.refinedText);
    } catch (err) { console.error(err); }
    finally { setLoadingId(null); }
  };

  const refineContent = async (text: string, sectionIndex: number, itemIndex?: number) => {
    if (!text.trim()) return;
    const lId = itemIndex !== undefined ? `sec-${sectionIndex}-item-${itemIndex}` : `sec-${sectionIndex}`;
    setLoadingId(lId);
    try {
      const res = await fetch("/api/refine-resume", {
        method: "POST",
        body: JSON.stringify({ content: text, type: "experience" }),
      });
      const result = await res.json();
      if (result.refinedText) {
        if (itemIndex !== undefined) {
          updateItem(sectionIndex, itemIndex, "description", result.refinedText);
        } else {
          if (data.sections[sectionIndex].type === "tags") {
            updateSection(sectionIndex, "content", result.refinedText);
          }
        }
      }
    } catch (err) { console.error(err); }
    finally { setLoadingId(null); }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-12 pb-40"
    >
      {/* Basics Section */}
      <motion.section
        variants={itemVariants}
        whileHover={{ y: -4 }}
        className="bg-white border border-neutral-200 rounded-[2.5rem] p-10 lg:p-12 shadow-sm hover:shadow-xl hover:shadow-black/[0.02] transition-shadow duration-500 space-y-12 relative group"
      >
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-2xl bg-neutral-50 flex items-center justify-center border border-neutral-100">
            <IconForms size={20} className="text-neutral-400" />
          </div>
          <div>
            <h3 className="text-xs font-black text-black uppercase tracking-[0.3em]">Identity Hub</h3>
            <p className="text-[10px] font-bold text-neutral-300 uppercase tracking-widest mt-0.5">Core Professional Data</p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-8">
          <Input label="Name" value={data.basics.name} onChange={(v: string) => updateBasics("name", v)} />
          <Input label="Role" value={data.basics.title} onChange={(v: string) => updateBasics("title", v)} placeholder="Architect" />
          <Input label="Email" value={data.basics.email} onChange={(v: string) => updateBasics("email", v)} type="email" />
          <Input label="Phone" value={data.basics.phone} onChange={(v: string) => updateBasics("phone", v)} />
          <Input label="Location" value={data.basics.location} onChange={(v: string) => updateBasics("location", v)} />
          <Input label="Website" value={data.basics.website} onChange={(v: string) => updateBasics("website", v)} />
        </div>

        <div className="space-y-6 pt-8 border-t border-neutral-50">
          <div className="flex items-center justify-between">
            <div className="flex flex-col">
              <label className="text-[10px] font-black text-black uppercase tracking-[0.2em] ml-1">Narrative Summary</label>
              <p className="text-[9px] font-bold text-neutral-300 uppercase tracking-widest ml-1 mt-0.5 whitespace-nowrap overflow-hidden text-ellipsis max-w-[200px]">Professional Bio</p>
            </div>
            <button
              onClick={refineSummary}
              disabled={loadingId === "basics-summary"}
              className="flex items-center gap-2.5 px-4 py-2 bg-neutral-50 border border-neutral-100 rounded-xl text-[10px] font-black uppercase tracking-widest text-neutral-500 hover:text-black hover:border-black/10 transition-all shadow-sm"
            >
              <IconSparkles size={14} className={loadingId === "basics-summary" ? "animate-spin" : ""} />
              {loadingId === "basics-summary" ? "Refining..." : "Optimize with AI"}
            </button>
          </div>
          <textarea
            className="w-full h-36 p-6 bg-neutral-50 rounded-[1.5rem] border border-neutral-100 outline-none focus:bg-white focus:border-brandpurple/20 transition-all text-sm font-medium text-black leading-relaxed resize-none shadow-inner"
            placeholder="Describe your professional journey..."
            value={data.basics.summary}
            onChange={(e) => updateBasics("summary", e.target.value)}
          />
        </div>
      </motion.section>

      {/* Dynamic Sections */}
      <AnimatePresence mode="popLayout">
        {data.sections.map((section: any, sIdx: number) => (
          <motion.section
            variants={itemVariants}
            whileHover={{ y: -4 }}
            layout
            key={section.id}
            className="bg-white border border-neutral-200 rounded-[2.5rem] p-10 lg:p-12 shadow-sm hover:shadow-xl hover:shadow-black/[0.02] transition-shadow duration-500 space-y-10 relative group"
          >
            <div className="absolute top-10 right-10 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-all">
              <div className="flex flex-col gap-1 border-r border-neutral-100 pr-3 mr-2">
                <button
                  onClick={() => moveSection(sIdx, "up")}
                  disabled={sIdx === 0}
                  className="p-1 text-neutral-200 hover:text-black hover:bg-neutral-50 rounded-lg transition-all disabled:opacity-0"
                >
                  <IconChevronUp size={18} />
                </button>
                <button
                  onClick={() => moveSection(sIdx, "down")}
                  disabled={sIdx === data.sections.length - 1}
                  className="p-1 text-neutral-200 hover:text-black hover:bg-neutral-50 rounded-lg transition-all disabled:opacity-0"
                >
                  <IconChevronDown size={18} />
                </button>
              </div>
              <button
                onClick={() => removeSection(sIdx)}
                className="p-2 text-neutral-200 hover:text-red-500 transition-colors"
              >
                <IconTrash size={18} />
              </button>
            </div>

            <div className="flex items-center gap-4">
              <input
                className="text-sm font-black text-black uppercase tracking-[0.2em] bg-transparent outline-none border-b-2 border-transparent focus:border-brandpurple/20 transition-all"
                value={section.title}
                onChange={(e) => updateSection(sIdx, "title", e.target.value)}
              />
            </div>

            {section.type === "list" ? (
              <div className="space-y-12">
                {section.items.map((item: any, iIdx: number) => (
                  <div key={iIdx} className="space-y-8 relative pl-8 border-l-2 border-neutral-50">
                    <button onClick={() => removeItem(sIdx, iIdx)} className="absolute top-0 -right-2 p-1.5 text-neutral-200 hover:text-black opacity-0 group-hover:opacity-100 transition-all">
                      <IconTrash size={14} />
                    </button>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <Input label="Primary" value={item.title} onChange={(v: string) => updateItem(sIdx, iIdx, "title", v)} placeholder="Role / Degree / Project" />
                      <Input label="Secondary" value={item.subtitle} onChange={(v: string) => updateItem(sIdx, iIdx, "subtitle", v)} placeholder="Company / School / Tech" />
                      <Input label="Timeline" value={item.date} onChange={(v: string) => updateItem(sIdx, iIdx, "date", v)} placeholder="2021 - Present" />
                      <Input label="Context" value={item.location} onChange={(v: string) => updateItem(sIdx, iIdx, "location", v)} placeholder="Remote / Bengaluru" />
                    </div>

                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <label className="text-[10px] font-black text-neutral-400 uppercase tracking-widest">Architectural Details</label>
                        <button
                          onClick={() => refineContent(item.description, sIdx, iIdx)}
                          disabled={loadingId === `sec-${sIdx}-item-${iIdx}`}
                          className="flex items-center gap-2 text-[9px] font-black uppercase tracking-widest text-neutral-300 hover:text-black transition-all"
                        >
                          <IconSparkles size={12} className={loadingId === `sec-${sIdx}-item-${iIdx}` ? "animate-spin" : ""} />
                          {loadingId === `sec-${sIdx}-item-${iIdx}` ? "Processing..." : "Refine with AI"}
                        </button>
                      </div>
                      <textarea
                        className="w-full h-32 p-5 bg-neutral-50 rounded-[1.25rem] border border-neutral-100 outline-none focus:bg-white focus:border-neutral-200 transition-all text-sm font-medium text-black leading-relaxed resize-none shadow-inner"
                        value={item.description}
                        onChange={(e) => updateItem(sIdx, iIdx, "description", e.target.value)}
                      />
                    </div>
                  </div>
                ))}
                <button
                  onClick={() => addItem(sIdx)}
                  className="w-full py-4 border-2 border-dashed border-neutral-100 rounded-2xl text-[10px] font-black uppercase tracking-widest text-neutral-300 hover:border-black/10 hover:text-black transition-all group flex items-center justify-center gap-2"
                >
                  <IconPlus size={14} className="group-hover:scale-110 transition-transform" />
                  Expand Project Entry
                </button>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <label className="text-[10px] font-black text-neutral-400 uppercase tracking-widest">Metadata Tags (Comma Separated)</label>
                  <button
                    onClick={() => refineContent(section.content, sIdx)}
                    disabled={loadingId === `sec-${sIdx}`}
                    className="flex items-center gap-2 text-[9px] font-black uppercase tracking-widest text-neutral-300 hover:text-black transition-all"
                  >
                    <IconSparkles size={12} className={loadingId === `sec-${sIdx}` ? "animate-spin" : ""} />
                    {loadingId === `sec-${sIdx}` ? "Categorizing..." : "AI Tagging"}
                  </button>
                </div>
                <textarea
                  className="w-full h-24 p-5 bg-neutral-50 rounded-[1.25rem] border border-neutral-100 outline-none focus:bg-white focus:border-neutral-200 transition-all text-sm font-bold text-black leading-relaxed resize-none tracking-wider shadow-inner"
                  value={section.content}
                  onChange={(e) => updateSection(sIdx, "content", e.target.value)}
                />
              </div>
            )}
          </motion.section>
        ))}
      </AnimatePresence>

      {/* Global Add Actions */}
      <div className="flex gap-4">
        <button
          onClick={() => addSection("list")}
          className="flex-1 py-6 bg-white border border-neutral-200 rounded-[1.5rem] flex items-center justify-center gap-3 text-[10px] font-black uppercase tracking-[0.2em] shadow-sm hover:shadow-xl hover:shadow-black/[0.02] hover:-translate-y-1 transition-all"
        >
          <IconListNumbers size={18} />
          New Timeline
        </button>
        <button
          onClick={() => addSection("tags")}
          className="flex-1 py-6 bg-white border border-neutral-200 rounded-[1.5rem] flex items-center justify-center gap-3 text-[10px] font-black uppercase tracking-[0.2em] shadow-sm hover:shadow-xl hover:shadow-black/[0.02] hover:-translate-y-1 transition-all"
        >
          <IconTags size={18} />
          Add Skills Hub
        </button>
      </div>
    </motion.div>
  );
};
