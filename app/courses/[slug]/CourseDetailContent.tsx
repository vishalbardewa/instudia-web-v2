"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  CheckBadgeIcon,
  AcademicCapIcon,
  ClockIcon,
  BuildingLibraryIcon,
  ChevronRightIcon,
  LanguageIcon,
  CodeBracketIcon,
} from "@heroicons/react/24/solid";
import { m } from "framer-motion";
import ModernButton from "@/app/components/atom/ModernButton";
import { IMAGE_LIST } from "@/app/utils/CourseImageList";
import EnquiryForm from "@/app/components/organisms/EnquiryForm";

const ICON_LIST: any = {
  CheckBadgeIcon: <CheckBadgeIcon className="h-6 w-6" />,
  AcademicCapIcon: <AcademicCapIcon className="h-6 w-6" />,
  ClockIcon: <ClockIcon className="h-6 w-6" />,
  BuildingLibraryIcon: <BuildingLibraryIcon className="h-6 w-6" />,
  LanguageIcon: <LanguageIcon className="h-6 w-6" />,
  CodeBracketIcon: <CodeBracketIcon className="h-6 w-6" />,
};

// --- Modern Bento Hero ---
const BentoHero = ({ courseDetails }: any) => {
  const { pageTitle, image, category, comingSoon, inDemand, inTrending } = courseDetails;
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section className="relative pt-24 pb-16 lg:pt-32 lg:pb-24 overflow-hidden bg-white">
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-brandpurple/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-brightyellow/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <div className="bg-[#FAFAFA] rounded-[2.5rem] border border-neutral-100 p-8 lg:p-16 overflow-hidden relative shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

            <div className="lg:col-span-7">
              <m.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-3 mb-8"
              >
                <span className="bg-brandpurple/10 text-brandpurple text-[10px] font-extrabold uppercase tracking-widest px-4 py-1.5 rounded-full border border-brandpurple/20">
                  {category}
                </span>
                {mounted && inTrending && (
                  <span className="bg-green-500/10 text-green-600 text-[10px] font-extrabold uppercase tracking-widest px-4 py-1.5 rounded-full border border-green-500/20">
                    TRENDING
                  </span>
                )}
                {mounted && (inDemand || comingSoon) && (
                  <span className="bg-brightyellow/20 text-[#8B6E00] text-[10px] font-extrabold uppercase tracking-widest px-4 py-1.5 rounded-full border border-brightyellow/30">
                    {inDemand ? "IN DEMAND" : "COMING SOON"}
                  </span>
                )}
              </m.div>

              <m.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-5xl sm:text-6xl lg:text-7xl font-black tracking-tight text-[#1B1C1E] leading-[1.05] mb-8"
              >
                {pageTitle.text}{" "}
                <span className="text-brandpurple">{pageTitle.highlightText}</span>
              </m.h1>

              <m.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-lg text-neutral-500 font-medium mb-12 max-w-xl leading-relaxed"
              >
                Master professional industry-standard skills with our curated curriculum, designed to bridge the gap between classroom and career.
              </m.p>

              <div suppressHydrationWarning className="flex flex-wrap gap-4">
                {mounted && (
                  <ModernButton
                    text="Enroll Now"
                    href="#enquiry"
                    variant="primary"
                    size="lg"
                  />
                )}
              </div>
            </div>

            <div className="lg:col-span-5">
              <m.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="relative aspect-[4/5] w-full rounded-[2rem] overflow-hidden shadow-2xl shadow-black/10 group"
              >
                <Image
                  src={image}
                  alt={pageTitle.text}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  priority
                  loading="eager"
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60" />

                <div className="absolute bottom-6 left-6 right-6 p-6 bg-white/90 backdrop-blur-md rounded-2xl border border-white/20 shadow-lg">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-brandpurple flex items-center justify-center text-white shrink-0">
                      <CheckBadgeIcon className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="text-[10px] font-black text-neutral-400 uppercase tracking-widest leading-none mb-1">Status</p>
                      <p className="text-sm font-bold text-[#1B1C1E] uppercase">Verified Curriculum</p>
                    </div>
                  </div>
                </div>
              </m.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// --- Modern Metric Grid ---
const CourseStats = ({ features }: any) => (
  <section className="py-12 bg-white">
    <div className="mx-auto max-w-7xl px-6 lg:px-8">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {features.map((feature: any, idx: number) => (
          <m.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1 }}
            className="bg-white border border-neutral-100 rounded-3xl p-8 shadow-sm hover:shadow-md transition-shadow group"
          >
            <div className="p-3 bg-neutral-50 rounded-2xl w-fit mb-6 group-hover:bg-brandpurple/5 transition-colors text-brandpurple">
              {ICON_LIST[feature.icon] || <CheckBadgeIcon className="h-6 w-6" />}
            </div>
            <p className="text-[10px] font-black text-neutral-400 uppercase tracking-[0.2em] mb-1">{feature.name}</p>
            <p className="text-xl font-extrabold text-[#1B1C1E]">
              {feature.description}
              {feature.name === "Duration" && " Months"}
            </p>
          </m.div>
        ))}
      </div>
    </div>
  </section>
);

// --- Course Info Block (SEO + UX) ---
const CourseInfoBlock = ({ courseDetails }: any) => {
  const durationFeature = courseDetails.features?.find((f: any) => f.name === "Duration");
  const durationMonths = durationFeature?.description ? `${durationFeature.description} Month${parseInt(durationFeature.description) !== 1 ? "s" : ""}` : "Flexible";

  const items = [
    { label: "Duration", value: durationMonths, icon: "⏱" },
    { label: "Schedule", value: "Mon – Fri  ·  10AM – 4PM", icon: "📅" },
    { label: "Mode", value: "In-Person (Dimapur)", icon: "🏫" },
  ];

  return (
    <section className="py-12 bg-[#FAFAFA]">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <span className="text-[10px] font-black text-brandpurple uppercase tracking-[0.4em] mb-6 block">
          Course Details
        </span>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {items.map((item) => (
            <div
              key={item.label}
              className="bg-white border border-neutral-100 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow"
            >
              <span className="text-2xl mb-3 block" role="img" aria-label={item.label}>
                {item.icon}
              </span>
              <p className="text-[10px] font-black text-neutral-400 uppercase tracking-[0.15em] mb-1">
                {item.label}
              </p>
              <p className="text-base font-extrabold text-[#1B1C1E] leading-tight">{item.value}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// --- Subtle Outcome Roadmap ---
const BentoCurriculum = ({ fourReasons }: any) => {
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  // Hydration Escape Hatch: Only render structural changes on the client
  if (!mounted) {
    return (
      <section className="py-24 bg-white relative overflow-hidden">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 text-center mb-16">
          <div className="h-10 w-48 bg-neutral-100 rounded-full mx-auto" />
        </div>
      </section>
    );
  }

  return (
    <section className="py-24 bg-white relative overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-baseline justify-between mb-20 gap-4">
          <div>
            <span className="text-[10px] font-black text-brandpurple uppercase tracking-[0.4em] mb-4 block">Learning Outcomes</span>
            <h2 className="text-4xl sm:text-5xl font-black text-[#1B1C1E] tracking-tighter uppercase">
              What You'll <span className="text-neutral-200">Achieve</span>
            </h2>
          </div>
          <div className="h-[2px] flex-1 bg-neutral-100 hidden md:block" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {fourReasons?.map((reason: any, idx: number) => (
            <m.div
              key={reason.id}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="group relative bg-white border border-neutral-100 p-10 rounded-[2.5rem] transition-all hover:shadow-2xl hover:shadow-brandpurple/5 hover:-translate-y-1"
            >
              {/* Subtle Left Accent */}
              <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-12 bg-brandpurple/20 rounded-r-full group-hover:h-20 group-hover:bg-brandpurple transition-all duration-500" />

              <div className="flex items-start gap-8">
                <div className="w-14 h-14 rounded-2xl bg-brandpurple/5 flex items-center justify-center shrink-0 group-hover:bg-brandpurple group-hover:text-white transition-colors duration-500">
                  <CheckBadgeIcon className="h-7 w-7 text-brandpurple group-hover:text-white transition-colors" />
                </div>

                <div>
                  <span className="text-[10px] font-black text-neutral-300 tracking-widest mb-2 block">Outcome 0{idx + 1}</span>
                  <p className="text-xl font-semibold text-[#1B1C1E] leading-tight tracking-tight transition-colors">
                    {reason.description}
                  </p>
                </div>
              </div>
            </m.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// --- Refined Marquee ---
const FixedMarquee = () => (
  <div className="py-12 bg-neutral-50 overflow-hidden relative border-y border-neutral-100">
    <div className="flex whitespace-nowrap animate-marquee italic">
      {[1, 2, 3].map((_, i) => (
        <div key={i} className="flex items-center">
          <span className="text-[#1B1C1E] text-5xl font-black uppercase tracking-tighter mx-8">ELEVATE YOUR POTENTIAL •</span>
          <span className="text-neutral-200 text-5xl font-black uppercase tracking-tighter mx-8">SKILL UP •</span>
          <span className="text-brandpurple text-5xl font-black uppercase tracking-tighter mx-8">GO PROFESSIONAL •</span>
          <span className="text-neutral-200 text-5xl font-black uppercase tracking-tighter mx-8">FUTURE READY •</span>
        </div>
      ))}
    </div>
  </div>
);

// --- Modern Course Card ---
function RelatedCourseCard({ course, index }: { course: any; index: number }) {
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <m.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="group"
    >
      <Link href={`/courses/${course.slug}`} className="block">
        <div className="relative aspect-[3/2] rounded-[2rem] overflow-hidden bg-neutral-100 mb-6 shadow-sm group-hover:shadow-xl group-hover:-translate-y-2 transition-all duration-500">
          <Image
            alt={course.fullTitle}
            src={IMAGE_LIST[`${course.slug}`] || course.image}
            fill
            sizes="(max-width: 768px) 100vw, 400px"
            className="object-cover"
          />
          <div className="absolute top-4 right-4 flex flex-col items-end gap-2">
            <span className="bg-white/90 backdrop-blur-md text-[#1B1C1E] text-[9px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full border border-white/20 shadow-sm">
              {course.category || "CORE"}
            </span>
            {mounted && course.inTrending && (
              <span className="bg-green-500/90 backdrop-blur-md text-white text-[9px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full border border-green-500/20 shadow-sm">
                TRENDING
              </span>
            )}
            {mounted && (course.inDemand || course.comingSoon) && (
              <span className="bg-brightyellow/90 backdrop-blur-md text-[#8B6E00] text-[9px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full border border-brightyellow/20 shadow-sm">
                {course.inDemand ? "IN DEMAND" : "COMING SOON"}
              </span>
            )}
          </div>
        </div>
        <div className="px-2">
          <h3 className="text-xl font-extrabold text-[#1B1C1E] tracking-tight group-hover:text-brandpurple transition-colors leading-tight mb-2">
            {course.fullTitle}
          </h3>
          <p className="text-sm font-medium text-neutral-400 line-clamp-2 leading-relaxed">
            {course.courseHightlight || course.courseHighlight}
          </p>
        </div>
      </Link>
    </m.div>
  );
}

const RelatedCoursesGrid = ({ relatedCourses }: any) => {
  return (
    <section className="py-24 bg-white">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex items-end justify-between mb-16 px-2">
          <div>
            <span className="text-[10px] font-black text-brandpurple uppercase tracking-[0.4em] mb-4 block">Explore more</span>
            <h2 className="text-4xl font-black text-matteblack tracking-tight uppercase">Similar <span className="text-brandpurple">Courses</span></h2>
          </div>
          <Link href="/courses" className="text-xs font-black uppercase tracking-widest text-matteblack hover:text-brandpurple transition-colors flex items-center gap-2 group">
            Browse All <ChevronRightIcon className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {relatedCourses.map((course: any, idx: number) => (
            <RelatedCourseCard key={course.slug} course={course} index={idx} />
          ))}
        </div>
      </div>
    </section>
  );
};

const CourseCurriculum = ({ courseDetails }: any) => {
  const modules = courseDetails.curriculum || [
    { title: "Module 1: Foundations", description: `Introduction to core concepts of ${courseDetails.category || "the course"}.` },
    { title: "Module 2: Core Skills", description: "Hands-on practice with industry-standard tools and techniques." },
    { title: "Module 3: Advanced Topics", description: "Deep dive into specialized areas and complex problem-solving." },
    { title: "Module 4: Final Project", description: "Build a real-world portfolio project from scratch." },
  ];

  return (
    <section className="py-24 bg-[#FAFAFA]">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <span className="text-[10px] font-black text-brandpurple uppercase tracking-[0.4em] mb-4 block">Curriculum</span>
        <h2 className="text-4xl font-black text-[#1B1C1E] tracking-tight uppercase mb-16">
          What You'll <span className="text-brandpurple">Learn</span>
        </h2>

        <div className="space-y-6">
          {modules.map((mod: any, idx: number) => (
            <div key={idx} className="bg-white border border-neutral-100 p-8 rounded-3xl shadow-sm flex flex-col md:flex-row gap-6 items-start hover:shadow-md transition-all group">
              <div className="w-12 h-12 bg-neutral-50 rounded-2xl flex items-center justify-center shrink-0 group-hover:bg-brandpurple group-hover:text-white transition-colors">
                <span className="font-black text-lg">{idx + 1}</span>
              </div>
              <div>
                <h3 className="text-xl font-bold text-[#1B1C1E] mb-2">{mod.title}</h3>
                <p className="text-neutral-500">{mod.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const CourseInstructor = () => (
  <section className="py-24 bg-white border-y border-neutral-100">
    <div className="mx-auto max-w-7xl px-6 lg:px-8">
      <div className="bg-neutral-50 rounded-[3rem] p-10 md:p-16 flex flex-col md:flex-row gap-12 items-center relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-brandpurple/5 rounded-full blur-[80px]" />

        <div className="w-40 h-40 md:w-56 md:h-56 shrink-0 relative">
          <div className="absolute inset-0 bg-brandpurple rounded-full rotate-6 scale-105" />
          <Image
            src="https://res.cloudinary.com/dhwg77gwm/image/upload/f_auto,q_auto/v1/instudia/qzmdhewkbsyxmwsjccnu"
            alt="Instudia Expert Industry Mentor in Dimapur, Nagaland"
            width={224}
            height={224}
            className="w-full h-full object-cover rounded-full relative z-10 border-4 border-white shadow-xl bg-white"
          />
        </div>

        <div className="relative z-10 flex-1 text-center md:text-left">
          <span className="text-[10px] font-black text-brandpurple uppercase tracking-[0.4em] mb-4 block">Meet Your Mentor</span>
          <h3 className="text-3xl font-black text-[#1B1C1E] uppercase tracking-tight mb-2">Industry Expert</h3>
          <p className="text-sm font-bold text-neutral-400 uppercase tracking-widest mb-6">Certified Professional</p>
          <p className="text-lg text-neutral-600 leading-relaxed max-w-2xl">
            Learn directly from seasoned professionals who bring years of real-world experience into the classroom.
            Our instructors don't just teach theory—they prepare you for the challenges of the modern workplace with practical insights and hands-on guidance.
          </p>
        </div>
      </div>
    </div>
  </section>
);

const CourseFAQs = ({ courseDetails }: any) => {
  const faqs = [
    {
      question: `What will I learn in the ${courseDetails.fullTitle} course?`,
      answer: `You will gain comprehensive, practical experience in ${courseDetails.fullTitle}. The course covers core concepts, hands-on software tools, real-world projects, and industry workflows to build job-ready skills.`,
    },
    {
      question: `Is the ${courseDetails.fullTitle} training practical or theoretical?`,
      answer: `Our ${courseDetails.fullTitle} course is highly practical. You will work on hands-on assignments and projects to ensure you are job-ready.`,
    },
    {
      question: `Does instudia provide a certificate?`,
      answer: `Yes, instudia provides an industry-recognized certificate upon successful completion of the course. We are ISO certified and affiliated with AISECT and MSME.`,
    },
    {
      question: `What are the career opportunities?`,
      answer: `Graduates can explore various roles in IT, finance, management or creative fields. We also offer career placement support in Nagaland and beyond.`,
    }
  ];

  return (
    <section className="py-24 bg-[#FAFAFA]">
      <div className="mx-auto max-w-4xl px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-[10px] font-black text-brandpurple uppercase tracking-[0.4em] mb-4 block">Got Questions?</span>
          <h2 className="text-4xl font-black text-[#1B1C1E] tracking-tight uppercase">
            Frequently Asked <span className="text-brandpurple">Questions</span>
          </h2>
        </div>

        <div className="space-y-6">
          {faqs.map((faq, idx) => (
            <div key={idx} className="bg-white border border-neutral-100 p-8 rounded-3xl shadow-sm">
              <h3 className="text-lg font-bold text-[#1B1C1E] mb-3">{faq.question}</h3>
              <p className="text-neutral-500">{faq.answer}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default function CourseDetailContent({ courseDetails, relatedCourses }: any) {
  return (
    <>
      <BentoHero courseDetails={courseDetails} />
      <CourseStats features={courseDetails.features} />
      <CourseInfoBlock courseDetails={courseDetails} />
      <BentoCurriculum fourReasons={courseDetails.fourReasons} />
      <CourseCurriculum courseDetails={courseDetails} />
      <CourseFAQs courseDetails={courseDetails} />
      <FixedMarquee />
      <EnquiryForm courseName={courseDetails.fullTitle} />
      <section className="py-32 bg-white relative">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 text-center bg-matteblack rounded-[3rem] p-16 sm:p-24 overflow-hidden relative shadow-2xl shadow-matteblack/20">
          <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '32px 32px' }} />
          <div className="relative z-10">
            <span className="text-[10px] font-black text-white/60 uppercase tracking-[0.4em] mb-6 block">Ready to Transform Your Career?</span>
            <h2 className="text-4xl sm:text-6xl font-black text-white uppercase mb-12 tracking-tight leading-none">Your Future <br /> Starts Here.</h2>
            <ModernButton
              text="Secure Your Spot Today"
              href="#enquiry"
              variant="outline"
              size="lg"
              className="!bg-white !border-white !text-brandpurple hover:!bg-neutral-50 px-12"
            />
          </div>
        </div>
      </section>
      <RelatedCoursesGrid relatedCourses={relatedCourses} />
    </>
  );
}

