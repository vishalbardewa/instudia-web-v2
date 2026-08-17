import { Metadata } from "next";
import Script from "next/script";
import Image from "next/image";
import { SITE_URL, canonicalFor } from "@/lib/site";
import { buildMetadata } from "@/lib/metadata";
import HostSeminarForm from "./HostSeminarForm";
import SeminarHeroCollage from "./SeminarHeroCollage";
import SeminarTracksSection from "./SeminarTracksSection";
import SeminarFormatsSection from "./SeminarFormatsSection";
import SeminarTestimonialsSection from "./SeminarTestimonialsSection";
import { FadeIn, FadeInStagger } from "../components/atom/FadeIn";

export const metadata: Metadata = buildMetadata({
  title: "Host a Tech Seminar & School Workshop",
  description:
    "Partner with instudia to host practical tech seminars, coding bootcamps & teacher training workshops for schools and colleges across Nagaland.",
  path: "/host-a-seminar",
  image: "https://res.cloudinary.com/dhwg77gwm/image/upload/f_auto,q_auto/v1/instudia/tqo7qzztc4duzktj0jt9",
  imageAlt: "Host instudia Tech Seminars in Nagaland",
});



const pastInstitutions = [
  "North East Institute of Social Sciences and Research (NEISSR)",
  "MGM College",
  "Immanuel College",
  "Christian Higher Secondary School (CHSS)",
  "St. Edmund's Higher Secondary School",
  "Lewis Academy",
  "Beanstalk School",
  "Naga Adventist School",
  "Spring Blossoms Academy",
  "Assisi Higher Secondary School",
  "Dimapur Ao Baptist Arogo (DABA)",
  "Ministry of MSME (Government of India)",
  "Pilgrim Higher Secondary School",
];

const faqs = [
  {
    question: "What equipment or venue setup is needed from our institution?",
    answer:
      "For general seminars and assembly talks, all that is needed is an auditorium or lecture room with a projector or large screen, a working sound system with a microphone, and stable power. For hands-on workshops, access to a computer lab or having students bring laptops is helpful, but we also design sessions that work smoothly with just mobile phones.",
  },
  {
    question: "Do students and teachers receive certificates?",
    answer:
      "Yes. For our practical workshops and multi-day sessions, instudia provides verified digital certificates of participation or completion, customized with your institution's official name and logo.",
  },
  {
    question: "Can the topics be customized for our specific department or class?",
    answer:
      "Absolutely. We tailor every session to match your audience—whether you want examples focused on Commerce and Accounting, Literature and Social Sciences for Arts students, Coding and Web Development for Computer Science batches, or practical lesson-planning tools for school teachers.",
  },
  {
    question: "How far in advance should we schedule a visit?",
    answer:
      "We usually recommend booking 1 to 2 weeks ahead so we can align schedules and prepare customized examples for your students. However, if you have an upcoming event or sudden opening, feel free to reach out and we will do our best to accommodate you.",
  },
  {
    question: "Does instudia travel to schools and colleges outside Dimapur?",
    answer:
      "Yes. While we are based in Dimapur, our team regularly visits institutions across Kohima, Mokokchung, Chümoukedima, Niuland, and other districts across Nagaland and the Northeast.",
  },
  {
    question: "What is the fee or honorarium for hosting a seminar?",
    answer:
      "We believe practical education should be accessible to all institutions. Whether you are hosting a community awareness session, a departmental workshop, or a multi-day campus camp, we work with your institution's budget to offer a clear, supportive proposal.",
  },
];

export default function HostSeminarPage() {
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Host instudia for Institutional Seminars & Workshops",
    "provider": {
      "@type": "EducationalOrganization",
      "name": "instudia",
      "url": "https://www.instudianagaland.com",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Dimapur",
        "addressRegion": "Nagaland",
        "addressCountry": "IN",
      },
    },
    "description":
      "Practical technology, coding, study habits, and skill development workshops for schools, colleges, and organizations in Nagaland.",
    "serviceType": "Skill Development Seminars",
    "areaServed": "Nagaland and Northeast India",
  };

  return (
    <main className="bg-white text-[#1B1C1E] selection:bg-brandpurple selection:text-white">
      <Script
        id="host-seminar-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />

      {/* 1. Hero Section (2-Column with Editorial Image Collage & Load on Scroll) */}
      <section className="relative overflow-hidden bg-white pt-20 pb-20 px-6 border-b border-neutral-200/80">
        <div className="absolute top-0 left-1/4 -translate-x-1/2 w-[600px] h-[300px] bg-brandpurple/5 rounded-full blur-[120px] pointer-events-none" />

        <div className="relative mx-auto max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
            {/* Left Column: Editorial Headline, Subtext, CTAs */}
            <FadeIn className="lg:col-span-7">
              {/* Eyebrow Pill */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-neutral-100 border border-neutral-200 text-neutral-800 text-xs font-mono font-bold uppercase tracking-widest mb-6">
                <span className="w-2 h-2 rounded-full bg-brandpurple animate-pulse" />
                <span>Campus Workshops &amp; Seminars</span>
              </div>

              {/* Headline with Inline Accent Chips */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-[#1B1C1E] leading-[1.08]">
                <span>Helping Students </span>
                <span className="inline-flex items-center align-middle px-3 py-1 mx-1 rounded-xl bg-brandpurple text-white text-xs sm:text-sm font-black uppercase tracking-wider shadow-sm transform -rotate-1">
                  Learn Tech
                </span>
                <span>Build </span>
                <span className="inline-flex items-center align-middle px-3 py-1 mx-1 rounded-xl bg-[#FFE01B] text-black text-xs sm:text-sm font-black uppercase tracking-wider shadow-sm border border-black transform rotate-1">
                  Confidence
                </span>
                <span>&amp; Real Skills</span>
              </h1>

              {/* Subtext */}
              <p className="mt-6 text-base sm:text-lg text-neutral-600 max-w-2xl leading-relaxed font-medium">
                We bring engaging, practical workshops directly to your school or college. From helping students study smarter and build real software to supporting teachers with digital tools, we make modern technology simple, relatable, and genuinely useful.
              </p>

              {/* Dual CTAs */}
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <a
                  href="#booking-form"
                  className="inline-flex items-center gap-2 rounded-2xl bg-[#1B1C1E] px-7 py-4 text-xs sm:text-sm font-black uppercase tracking-wider text-white shadow-xl shadow-black/10 hover:bg-brandpurple transition-all duration-200 hover:-translate-y-0.5"
                >
                  <span>Request a Seminar</span>
                  <span>→</span>
                </a>
                <a
                  href="#capabilities"
                  className="inline-flex items-center gap-2 rounded-2xl border border-neutral-300 bg-white px-7 py-4 text-xs sm:text-sm font-bold text-[#1B1C1E] hover:bg-neutral-50 transition-all duration-200"
                >
                  <span>View Topics</span>
                </a>
              </div>

              {/* Key Quick Badges */}
              <div className="mt-10 pt-6 border-t border-neutral-100 flex flex-wrap items-center gap-6 text-xs font-mono text-neutral-500">
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  <strong className="text-neutral-900">15+</strong> Campus Visits
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-brandpurple" />
                  <strong className="text-neutral-900">3,000+</strong> Students &amp; Teachers
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FFE01B]" />
                  <strong className="text-neutral-900">22+</strong> Partner Schools &amp; Colleges
                </div>
              </div>
            </FadeIn>

            {/* Right Column: Dynamic Swapping Campus Photo Collage */}
            <FadeIn className="lg:col-span-5 relative">
              <SeminarHeroCollage />
            </FadeIn>
          </div>

          {/* Logobar Strip with Dividers below 2-col hero */}
          <FadeIn className="mt-16 pt-10 border-t border-neutral-100">
            <p className="text-xs font-mono text-neutral-500 uppercase tracking-wider mb-6 text-center">
              Trusted by leading institutions across Nagaland
            </p>

            <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 max-w-5xl mx-auto">
              {pastInstitutions.map((inst, idx) => (
                <div key={inst} className="flex items-center gap-3 sm:gap-4">
                  <span className="text-xs sm:text-sm font-bold text-neutral-700 hover:text-brandpurple transition-colors">
                    {inst}
                  </span>
                  {idx < pastInstitutions.length - 1 && (
                    <span className="text-neutral-300 select-none">•</span>
                  )}
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* 2. Problem & Impact Stat Section (Humanized & Load on Scroll) */}
      <section className="bg-white py-24 px-6 border-b border-neutral-200/80">
        <div className="mx-auto max-w-6xl">
          <FadeIn className="max-w-3xl mb-16">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-brandpurple mb-3">
              Why We Do This
            </p>
            <h2 className="text-3xl sm:text-5xl font-black text-[#1B1C1E] tracking-tight leading-[1.15]">
              Making technology friendly, practical, and accessible for every classroom in Nagaland.
            </h2>
            <p className="text-xs font-mono text-neutral-400 mt-4 uppercase tracking-wider">
              15+ Interactive Campus Sessions • 100% Practical &amp; Relatable
            </p>
          </FadeIn>

          {/* 3-Column Bordered Stat Grid */}
          <FadeInStagger className="grid grid-cols-1 md:grid-cols-3 border border-neutral-200 rounded-3xl overflow-hidden bg-[#FAFAFA] divide-y md:divide-y-0 md:divide-x divide-neutral-200">
            <FadeIn className="p-8 sm:p-10 flex flex-col justify-between bg-white">
              <div>
                <span className="text-5xl sm:text-6xl font-black text-[#1B1C1E] tracking-tight block mb-2">
                  15+
                </span>
                <span className="text-sm font-bold text-neutral-800 block">
                  Campus Sessions Completed
                </span>
              </div>
              <p className="text-xs text-neutral-500 mt-6 leading-relaxed">
                Covering practical digital study tools, coding basics, team leadership, and teacher support.
              </p>
            </FadeIn>

            <FadeIn className="p-8 sm:p-10 flex flex-col justify-between bg-white">
              <div>
                <span className="text-5xl sm:text-6xl font-black text-brandpurple tracking-tight block mb-2">
                  3,000+
                </span>
                <span className="text-sm font-bold text-neutral-800 block">
                  Students &amp; Teachers Guided
                </span>
              </div>
              <p className="text-xs text-neutral-500 mt-6 leading-relaxed">
                Gaining hands-on confidence with study techniques, coding fundamentals, and career guidance.
              </p>
            </FadeIn>

            <FadeIn className="p-8 sm:p-10 flex flex-col justify-between bg-white">
              <div>
                <span className="text-5xl sm:text-6xl font-black text-[#1B1C1E] tracking-tight block mb-2">
                  22+
                </span>
                <span className="text-sm font-bold text-neutral-800 block">
                  Partner Schools &amp; Colleges
                </span>
              </div>
              <p className="text-xs text-neutral-500 mt-6 leading-relaxed">
                Colleges, higher secondary schools, youth groups, and government vocational programs.
              </p>
            </FadeIn>
          </FadeInStagger>

          <FadeIn className="mt-4 text-right text-xs font-mono text-neutral-400 italic">
            *Real skills. Honest mentorship. Real student confidence.
          </FadeIn>
        </div>
      </section>

      {/* 3. Interactive Tracks Section */}
      <SeminarTracksSection />

      {/* 4. Flexible Engagement Models */}
      <SeminarFormatsSection />

      {/* 5. Press Coverage & Stories */}
      <SeminarTestimonialsSection />

      {/* 6. Lead Facilitators / Speakers Section */}
      <section className="bg-[#FAFAFA] border-t border-neutral-200/80 py-24 px-6">
        <div className="mx-auto max-w-6xl">
          <FadeIn className="text-center max-w-3xl mx-auto mb-16">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-neutral-400 mb-3">
              Mentors &amp; Speakers
            </p>
            <h2 className="text-3xl sm:text-5xl font-black text-[#1B1C1E] tracking-tight leading-[1.1]">
              Led by Educators and Practitioners from Nagaland
            </h2>
            <p className="mt-4 text-sm text-neutral-600 leading-relaxed">
              Our sessions are delivered directly by instructors who understand our local classrooms, talk with students at eye-level, and bring genuine passion for education.
            </p>
          </FadeIn>

          <FadeInStagger className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Speaker 1 */}
            <FadeIn className="rounded-3xl border border-neutral-200 bg-white p-8 sm:p-10 shadow-sm flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-4 mb-5">
                  <div className="w-14 h-14 rounded-2xl bg-brandpurple/10 text-brandpurple font-black text-xl flex items-center justify-center border border-brandpurple/20">
                    DC
                  </div>
                  <div>
                    <h3 className="text-xl font-black text-[#1B1C1E]">
                      Daniel Changkija
                    </h3>
                    <p className="text-xs font-bold text-brandpurple uppercase tracking-wider">
                      Director, instudia
                    </p>
                  </div>
                </div>
                <p className="text-sm text-neutral-600 leading-relaxed">
                  Keynote speaker and education mentor with deep experience inspiring young minds across Nagaland. Passionate about helping students discover their strengths, build genuine career curiosity, and use technology to unlock opportunities right from our home state.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-neutral-100 flex flex-wrap gap-2 text-[11px] font-semibold text-neutral-600">
                <span className="bg-neutral-100 px-2.5 py-1 rounded-full">Youth Inspiration</span>
                <span className="bg-neutral-100 px-2.5 py-1 rounded-full">Career Guidance</span>
                <span className="bg-neutral-100 px-2.5 py-1 rounded-full">Digital Literacy</span>
                <span className="bg-neutral-100 px-2.5 py-1 rounded-full">NEP 2020</span>
              </div>
            </FadeIn>

            {/* Speaker 2 */}
            <FadeIn className="rounded-3xl border border-neutral-200 bg-white p-8 sm:p-10 shadow-sm flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-4 mb-5">
                  <div className="w-14 h-14 rounded-2xl bg-[#FFE01B]/20 text-black font-black text-xl flex items-center justify-center border border-black/10">
                    VB
                  </div>
                  <div>
                    <h3 className="text-xl font-black text-[#1B1C1E]">
                      Vishal Bardewa
                    </h3>
                    <p className="text-xs font-bold text-brandpurple uppercase tracking-wider">
                      Technical Advisor
                    </p>
                  </div>
                </div>
                <p className="text-sm text-neutral-600 leading-relaxed">
                  Software developer and educator at heart. Loves sitting down with students to break down coding, web development, and digital study tools into fun, easy-to-understand steps that anyone can follow with confidence.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-neutral-100 flex flex-wrap gap-2 text-[11px] font-semibold text-neutral-600">
                <span className="bg-neutral-100 px-2.5 py-1 rounded-full">Hands-on Coding</span>
                <span className="bg-neutral-100 px-2.5 py-1 rounded-full">Web Development</span>
                <span className="bg-neutral-100 px-2.5 py-1 rounded-full">Digital Study Habits</span>
                <span className="bg-neutral-100 px-2.5 py-1 rounded-full">Student Projects</span>
              </div>
            </FadeIn>
          </FadeInStagger>
        </div>
      </section>

      {/* 7. "Sounds Good?" Hero CTA Banner */}
      <section className="bg-white py-20 px-6 border-t border-neutral-200/80">
        <FadeIn className="mx-auto max-w-4xl text-center">
          <h2 className="text-4xl sm:text-6xl font-black text-[#1B1C1E] tracking-tight leading-tight mb-4">
            Sounds Good?
          </h2>
          <p className="text-base sm:text-lg text-neutral-600 max-w-xl mx-auto leading-relaxed mb-8">
            Let's bring a lively, practical technology or skill workshop to your students and teachers.
          </p>
          <a
            href="#booking-form"
            className="inline-flex items-center gap-2 rounded-2xl bg-brandpurple px-8 py-4 text-sm font-black uppercase tracking-wider text-white shadow-xl shadow-brandpurple/20 hover:bg-brandpurple/90 transition-all hover:-translate-y-0.5"
          >
            <span>Request a Campus Visit</span>
            <span>→</span>
          </a>
        </FadeIn>
      </section>

      {/* 8. Institutional Booking Section */}
      <section id="booking-form" className="bg-[#FAFAFA] py-24 px-6 border-t border-neutral-200/80 scroll-mt-10">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Left Col: Redesigned Campus Coordination Flow */}
            <FadeIn className="lg:col-span-5 space-y-6">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-200/70 text-neutral-800 text-xs font-mono font-bold uppercase tracking-wider mb-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-brandpurple" />
                  <span>How Hosting Works</span>
                </div>
                <h2 className="text-3xl sm:text-4xl font-black text-[#1B1C1E] tracking-tight leading-tight">
                  Smooth &amp; Simple from First Hello to Workshop Day
                </h2>
                <p className="mt-3 text-sm text-neutral-600 leading-relaxed">
                  We take care of syllabus design, slide decks, interactive demonstrations, and student activity sheets so your campus team can simply welcome our mentors.
                </p>
              </div>

              {/* Numbered Process Timeline (Dstudio Style) */}
              <div className="space-y-3 pt-2">
                {[
                  {
                    step: "01",
                    title: "Share Your Class Details & Preferred Date",
                    desc: "Pick your topic of interest, audience size, and tentative date using this form or WhatsApp.",
                  },
                  {
                    step: "02",
                    title: "Receive a Tailored Proposal & Syllabus",
                    desc: "We send a clean proposal letter with session outcomes addressed to your Principal or Management.",
                  },
                  {
                    step: "03",
                    title: "Turnkey Workshop Day on Campus",
                    desc: "Our mentors arrive on time with ready-to-run slides, live exercises, and relatable demonstrations.",
                  },
                  {
                    step: "04",
                    title: "Digital Certificates & Take-Home Guides",
                    desc: "Every participant receives verified certificates and clear revision notes to keep learning.",
                  },
                ].map((item) => (
                  <div
                    key={item.step}
                    className="relative flex items-start gap-4 p-4 rounded-2xl bg-white border border-neutral-200/80 shadow-xs hover:border-neutral-300 transition-colors group"
                  >
                    <span className="shrink-0 flex items-center justify-center w-8 h-8 rounded-xl bg-neutral-100 group-hover:bg-brandpurple group-hover:text-white font-mono text-xs font-black text-neutral-700 transition-colors">
                      {item.step}
                    </span>
                    <div>
                      <h4 className="text-xs sm:text-sm font-black text-[#1B1C1E] tracking-tight">
                        {item.title}
                      </h4>
                      <p className="text-xs text-neutral-500 mt-1 leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Proposal Letter Card */}
              <div className="p-5 sm:p-6 rounded-3xl bg-[#1B1C1E] text-white border border-neutral-800 shadow-lg">
                <div className="flex items-center gap-2 mb-2">
                  <span className="w-2 h-2 rounded-full bg-[#FFE01B]" />
                  <p className="text-[11px] font-mono font-bold uppercase tracking-wider text-neutral-300">
                    Official Proposal Letters
                  </p>
                </div>
                <p className="text-xs text-neutral-300 leading-relaxed mb-4">
                  Need a formal document for your Principal, Dean, or Academic Council? We provide official letters with custom agenda breakdowns.
                </p>
                <div className="flex flex-wrap items-center gap-3 text-xs">
                  <a
                    href="mailto:instudia.nagaland@gmail.com"
                    className="inline-flex items-center gap-1.5 font-bold text-white hover:text-brandpurple transition-colors underline"
                  >
                    <span>Email Proposal Desk</span>
                    <span>↗</span>
                  </a>
                  <span className="text-neutral-600">•</span>
                  <a
                    href="https://wa.me/919366904494?text=Hello%20instudia%20team!%20We%20need%20an%20official%20seminar%20proposal%20letter%20for%20our%20institution."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 font-bold text-[#25D366] hover:underline"
                  >
                    <span>Instant WhatsApp Request</span>
                    <span>↗</span>
                  </a>
                </div>
              </div>
            </FadeIn>

            {/* Right Col: Booking Form */}
            <FadeIn className="lg:col-span-7">
              <HostSeminarForm />
            </FadeIn>
          </div>
        </div>
      </section>

      {/* 9. Institutional FAQ Section */}
      <section className="bg-white py-24 px-6 border-t border-neutral-200/80">
        <div className="mx-auto max-w-4xl">
          <FadeIn className="text-center mb-16">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-neutral-400 mb-3">
              Common Questions
            </p>
            <h2 className="text-3xl sm:text-4xl font-black text-[#1B1C1E] tracking-tight">
              Everything You Need to Know
            </h2>
            <p className="mt-3 text-sm text-neutral-500">
              Clear, honest answers about equipment setup, certificates, and out-of-district visits.
            </p>
          </FadeIn>

          <FadeInStagger className="space-y-4">
            {faqs.map((faq) => (
              <FadeIn
                key={faq.question}
                className="rounded-2xl border border-neutral-200 bg-[#FAFAFA] p-6 shadow-xs"
              >
                <h3 className="text-base font-black text-[#1B1C1E] mb-2">
                  {faq.question}
                </h3>
                <p className="text-sm text-neutral-600 leading-relaxed">
                  {faq.answer}
                </p>
              </FadeIn>
            ))}
          </FadeInStagger>
        </div>
      </section>

      {/* 10. Minimalist Footer CTA */}
      <section className="bg-[#1B1C1E] text-white py-20 px-6">
        <FadeIn className="mx-auto max-w-6xl flex flex-col sm:flex-row items-center justify-between gap-8">
          <div>
            <p className="text-xs font-mono font-bold uppercase tracking-widest text-brandpurple mb-2">
              Start a Conversation
            </p>
            <h3 className="text-2xl sm:text-3xl font-black tracking-tight">
              Bring instudia to your campus today.
            </h3>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <a
              href="#booking-form"
              className="inline-flex items-center gap-2 rounded-2xl bg-[#FFE01B] px-6 py-3.5 text-xs font-black uppercase tracking-wider text-black hover:bg-white transition-colors"
            >
              <span>Submit Request</span>
              <span>→</span>
            </a>
            <a
              href="/workshops"
              className="inline-flex items-center gap-2 rounded-2xl border border-neutral-700 bg-transparent px-6 py-3.5 text-xs font-bold text-white hover:bg-neutral-800 transition-colors"
            >
              <span>View Past Workshops</span>
            </a>
          </div>
        </FadeIn>
      </section>
    </main>
  );
}
