"use client";

import React, { useState } from "react";
import Link from "next/link";
import { CheckIcon, ArrowRightIcon } from "@heroicons/react/24/solid";

interface ComparisonPair {
  id: string;
  category: string;
  title: string;
  subtitle: string;
  courseA: {
    title: string;
    slug: string;
    duration: string;
    idealFor: string;
    prerequisites: string;
    tools: string[];
    outcomes: string[];
    level: string;
  };
  courseB: {
    title: string;
    slug: string;
    duration: string;
    idealFor: string;
    prerequisites: string;
    tools: string[];
    outcomes: string[];
    level: string;
  };
}

const COMPARISON_DATA: ComparisonPair[] = [
  {
    id: "fundamentals",
    category: "Office & Fundamentals",
    title: "DCA vs PGDCA",
    subtitle: "Choosing between Diploma in Computer Applications and Post Graduate Diploma",
    courseA: {
      title: "Diploma in Computer Applications (DCA)",
      slug: "diploma-in-computer-applications",
      duration: "6 Months",
      idealFor: "Students after 10th/12th or job seekers wanting essential office computing fluency",
      prerequisites: "Class 10th or basic literacy",
      tools: ["MS Word", "MS Excel", "MS PowerPoint", "Internet & Email", "Operating Systems", "Typing"],
      outcomes: ["Computer Operator", "Data Entry Specialist", "Office Executive", "Admin Assistant"],
      level: "Beginner / Intermediate",
    },
    courseB: {
      title: "Post Graduate Diploma in Computer Applications (PGDCA)",
      slug: "pgdca",
      duration: "12 Months",
      idealFor: "College graduates seeking advanced technical knowledge, databases, and programming fundamentals",
      prerequisites: "Graduate in any stream",
      tools: ["Advanced Excel", "Database Management (SQL)", "Programming Fundamentals", "Web Basics", "Office Automation"],
      outcomes: ["Junior Software Trainee", "Database Administrator", "Senior Office IT Executive", "IT Coordinator"],
      level: "Intermediate / Advanced",
    },
  },
  {
    id: "programming",
    category: "Coding & Development",
    title: "Python vs Fullstack Web Development",
    subtitle: "Comparing general-purpose scripting with complete web application engineering",
    courseA: {
      title: "Programming with Python",
      slug: "python",
      duration: "1–3 Months",
      idealFor: "Beginners starting their coding journey, automation enthusiasts, and aspiring data analysts",
      prerequisites: "Basic computer familiarity; no prior coding required",
      tools: ["Python 3", "VS Code", "Data Structures", "OOP Concepts", "Automation Scripts", "Mini-Projects"],
      outcomes: ["Python Developer Trainee", "Automation Script Writer", "Backend Logic Specialist"],
      level: "Beginner to Intermediate",
    },
    courseB: {
      title: "Fullstack Web Development",
      slug: "fullstack-web-development",
      duration: "3–6 Months",
      idealFor: "Aspiring software engineers wanting to build production-grade web applications from front to back",
      prerequisites: "Basic logic & computer literacy",
      tools: ["HTML5 / CSS3", "JavaScript (ES6+)", "React.js", "Node.js", "Express", "MongoDB / SQL", "Git & GitHub"],
      outcomes: ["Fullstack Web Developer", "Frontend Engineer", "MERN Stack Specialist", "Freelance Developer"],
      level: "Intermediate to Professional",
    },
  },
  {
    id: "creative",
    category: "Design & Media",
    title: "Graphic Designing vs UI/UX Design",
    subtitle: "Visual branding and marketing graphics versus digital product interface and user experience design",
    courseA: {
      title: "Graphic Designing",
      slug: "graphic-designing",
      duration: "3–6 Months",
      idealFor: "Creative students, artists, and marketers aiming to create print media, ads, and brand visual assets",
      prerequisites: "Creative mindset & basic computer skills",
      tools: ["Adobe Photoshop", "Adobe Illustrator", "CorelDRAW", "Canva Pro", "Typography & Color Theory"],
      outcomes: ["Graphic Designer", "Visual Branding Specialist", "Social Media Content Designer", "Print Production Artist"],
      level: "Beginner to Professional",
    },
    courseB: {
      title: "UI/UX Designing",
      slug: "ui-ux-designing",
      duration: "3 Months",
      idealFor: "Designers and problem solvers focusing on mobile apps, SaaS dashboards, and digital user research",
      prerequisites: "Basic design intuition or computer proficiency",
      tools: ["Figma", "Wireframing & Prototyping", "Design Systems", "User Personas & Journey Maps", "Usability Testing"],
      outcomes: ["UI/UX Designer", "Product Designer", "Mobile App Interface Designer", "Figma Design Lead"],
      level: "Intermediate to Professional",
    },
  },
  {
    id: "finance",
    category: "Commerce & Accounting",
    title: "Tally Prime vs GST Accounting",
    subtitle: "Complete accounting software workflows versus specialized tax compliance and return filing",
    courseA: {
      title: "Tally Prime with Accounting",
      slug: "tally",
      duration: "2 Months",
      idealFor: "Commerce students, business owners, and accounts assistants managing daily financial bookkeeping",
      prerequisites: "10+2 with basic commerce or math aptitude",
      tools: ["Tally Prime", "Voucher Entry", "Ledger Management", "Bank Reconciliation (BRS)", "Inventory Management"],
      outcomes: ["Accounts Executive", "Tally Operator", "Bookkeeper", "Billing Specialist"],
      level: "Beginner to Practical",
    },
    courseB: {
      title: "GST Compliance & Certification",
      slug: "gst",
      duration: "1–2 Months",
      idealFor: "Accountants and entrepreneurs wanting mastery over GST calculations, invoicing, and statutory returns",
      prerequisites: "Basic accounting knowledge",
      tools: ["GST Portal", "GSTR-1, GSTR-3B Filing", "E-Way Bills", "Input Tax Credit (ITC)", "Tax Invoicing"],
      outcomes: ["GST Practitioner", "Tax Compliance Specialist", "Junior Auditor", "Accounts Senior"],
      level: "Practical Compliance",
    },
  },
];

export default function CourseComparisonMatrix() {
  const [activeTab, setActiveTab] = useState<string>("fundamentals");
  const selected = COMPARISON_DATA.find((item) => item.id === activeTab) || COMPARISON_DATA[0];

  return (
    <section className="py-20 bg-white border-t border-b border-neutral-100">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-[10px] font-black uppercase tracking-[0.4em] text-brandpurple mb-3 block">
            Course Selection Guide
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-[#1B1C1E] uppercase">
            Compare Career <span className="text-brandpurple">Tracks</span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-gray-600 font-medium">
            Not sure which course fits your career goals? Compare syllabus, prerequisites, and job outcomes side-by-side.
          </p>
        </div>

        {/* Tab Selection */}
        <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-12">
          {COMPARISON_DATA.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`px-5 py-2.5 rounded-full text-xs font-extrabold uppercase tracking-wider transition-all ${
                activeTab === item.id
                  ? "bg-black text-white shadow-md shadow-black/10 scale-105"
                  : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200"
              }`}
            >
              {item.title}
            </button>
          ))}
        </div>

        {/* Comparison Table Box */}
        <div className="bg-[#FAFAFA] border border-neutral-200 rounded-3xl p-6 sm:p-10 shadow-sm">
          <div className="text-center mb-8 pb-6 border-b border-neutral-200">
            <span className="text-[10px] font-black uppercase tracking-widest text-neutral-400">
              {selected.category}
            </span>
            <h3 className="text-2xl sm:text-3xl font-black text-[#1B1C1E] mt-1">{selected.title}</h3>
            <p className="text-sm text-gray-500 mt-1">{selected.subtitle}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Course A */}
            <div className="bg-white rounded-2xl p-6 sm:p-8 border-2 border-neutral-200 hover:border-brandpurple transition-colors shadow-sm flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-start gap-4 mb-4">
                  <span className="text-[9px] font-black uppercase tracking-widest bg-brandpurple/10 text-brandpurple px-3 py-1 rounded-full">
                    {selected.courseA.level}
                  </span>
                  <span className="text-xs font-extrabold text-neutral-600 bg-neutral-100 px-2.5 py-1 rounded-md">
                    {selected.courseA.duration}
                  </span>
                </div>
                <h4 className="text-xl sm:text-2xl font-black text-[#1B1C1E] mb-3 leading-tight">
                  {selected.courseA.title}
                </h4>
                <p className="text-sm text-gray-600 mb-6 leading-relaxed">
                  <strong className="text-neutral-900 font-bold">Ideal for:</strong> {selected.courseA.idealFor}
                </p>

                <div className="space-y-4 mb-8 text-sm">
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-wider text-neutral-400 mb-1">
                      Prerequisites
                    </p>
                    <p className="font-semibold text-neutral-800">{selected.courseA.prerequisites}</p>
                  </div>

                  <div>
                    <p className="text-[10px] font-black uppercase tracking-wider text-neutral-400 mb-1.5">
                      Key Tools & Skills
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {selected.courseA.tools.map((t) => (
                        <span key={t} className="text-xs font-semibold bg-neutral-100 text-neutral-700 px-2.5 py-1 rounded-md">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <p className="text-[10px] font-black uppercase tracking-wider text-neutral-400 mb-1.5">
                      Career Opportunities
                    </p>
                    <ul className="space-y-1">
                      {selected.courseA.outcomes.map((o) => (
                        <li key={o} className="flex items-center gap-2 text-xs font-medium text-neutral-700">
                          <CheckIcon className="h-4 w-4 text-emerald-600 shrink-0" />
                          <span>{o}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              <Link
                href={`/courses/${selected.courseA.slug}`}
                className="inline-flex items-center justify-center gap-2 w-full py-3.5 px-6 rounded-xl bg-black text-white text-xs font-black uppercase tracking-wider hover:bg-brandpurple transition-colors mt-4 min-h-[44px]"
              >
                <span>View Full Curriculum</span>
                <ArrowRightIcon className="h-4 w-4" />
              </Link>
            </div>

            {/* Course B */}
            <div className="bg-white rounded-2xl p-6 sm:p-8 border-2 border-brandpurple/30 hover:border-brandpurple transition-colors shadow-sm flex flex-col justify-between relative">
              <div className="absolute top-4 right-4">
                <span className="text-[9px] font-black uppercase tracking-widest bg-emerald-50 text-emerald-700 border border-emerald-200 px-3 py-1 rounded-full">
                  High Demand
                </span>
              </div>
              <div>
                <div className="flex justify-between items-start gap-4 mb-4">
                  <span className="text-[9px] font-black uppercase tracking-widest bg-brandpurple/10 text-brandpurple px-3 py-1 rounded-full">
                    {selected.courseB.level}
                  </span>
                  <span className="text-xs font-extrabold text-neutral-600 bg-neutral-100 px-2.5 py-1 rounded-md">
                    {selected.courseB.duration}
                  </span>
                </div>
                <h4 className="text-xl sm:text-2xl font-black text-[#1B1C1E] mb-3 leading-tight">
                  {selected.courseB.title}
                </h4>
                <p className="text-sm text-gray-600 mb-6 leading-relaxed">
                  <strong className="text-neutral-900 font-bold">Ideal for:</strong> {selected.courseB.idealFor}
                </p>

                <div className="space-y-4 mb-8 text-sm">
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-wider text-neutral-400 mb-1">
                      Prerequisites
                    </p>
                    <p className="font-semibold text-neutral-800">{selected.courseB.prerequisites}</p>
                  </div>

                  <div>
                    <p className="text-[10px] font-black uppercase tracking-wider text-neutral-400 mb-1.5">
                      Key Tools & Skills
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {selected.courseB.tools.map((t) => (
                        <span key={t} className="text-xs font-semibold bg-neutral-100 text-neutral-700 px-2.5 py-1 rounded-md">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <p className="text-[10px] font-black uppercase tracking-wider text-neutral-400 mb-1.5">
                      Career Opportunities
                    </p>
                    <ul className="space-y-1">
                      {selected.courseB.outcomes.map((o) => (
                        <li key={o} className="flex items-center gap-2 text-xs font-medium text-neutral-700">
                          <CheckIcon className="h-4 w-4 text-emerald-600 shrink-0" />
                          <span>{o}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              <Link
                href={`/courses/${selected.courseB.slug}`}
                className="inline-flex items-center justify-center gap-2 w-full py-3.5 px-6 rounded-xl bg-brandpurple text-white text-xs font-black uppercase tracking-wider hover:bg-brandpurple/90 transition-colors mt-4"
              >
                <span>View Full Curriculum</span>
                <ArrowRightIcon className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
