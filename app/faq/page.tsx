import { Metadata } from "next";
import { SITE_URL, canonicalFor } from "@/lib/site";
import { buildMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildMetadata({
  title: "Course & Admission FAQs in Dimapur",
  description:
    "Find answers to common questions about our computer courses, fees, admissions, certifications and career services in Dimapur, Nagaland.",
  path: "/faq",
  image: "https://res.cloudinary.com/dhwg77gwm/image/upload/f_auto,q_auto/v1/instudia/tqo7qzztc4duzktj0jt9",
  imageAlt: "Course & Admission FAQs — instudia Dimapur",
});

const faqCategories = [
  {
    category: "Courses & Admissions",
    questions: [
      {
        q: "What computer and technical courses does instudia offer in Dimapur?",
        a: "instudia offers 19+ industry-focused programs in Dimapur, Nagaland across four main domains: Software Development (Python, Fullstack Web Development, Backend, Frontend), Creative Design (Graphic Designing, UI/UX Design), Accounting & Taxation (Tally Prime, GST Filing, Advance Excel), and Digital Literacy (DCA, PGDCA, AI Productivity Tools).",
      },
      {
        q: "What are the course fees and payment options at instudia?",
        a: "Course fees at instudia are structured transparently based on duration and specialization, starting from ₹3,999 for short-term skill programs up to ₹15,000 for comprehensive diploma courses. We provide flexible installment payment plans to ensure accessible learning for students across Nagaland without financial burden.",
      },
      {
        q: "Are the certificates issued by instudia government-recognized and verified?",
        a: "Yes. instudia is an ISO 9001:2015 Certified skill development institute. Students who successfully complete their coursework and capstone projects receive a verified certificate with unique credential verification that is recognized for employment in corporate, IT, and government contract opportunities.",
      },
      {
        q: "Who is eligible to enroll in instudia courses?",
        a: "Courses are designed with tiered entry levels. Foundational programs like DCA and Graphic Design welcome students from Class 10th and above. Advanced software and data engineering courses are ideal for college students, graduates, and working professionals looking to upskill.",
      },
    ],
  },
  {
    category: "Location, Batches & Timings",
    questions: [
      {
        q: "Where is the instudia campus located in Dimapur?",
        a: "instudia is located at First Floor, Vikiye Center, Opposite Notun Bosti Gate, Fellowship Colony, Dimapur, Nagaland 797112. The campus features modern computer labs with dedicated high-speed workstations.",
      },
      {
        q: "What are the class timings and batch schedules?",
        a: "Regular batches run Monday through Friday between 10:00 AM and 4:00 PM. We offer morning and afternoon slots to accommodate college students, school leavers, and working individuals.",
      },
      {
        q: "Does instudia offer online or remote classes?",
        a: "While our core interactive practical labs are conducted in-person at our Dimapur campus for maximum hands-on guidance, select masterclasses, webinars, and self-study resources are available digitally across Nagaland.",
      },
    ],
  },
  {
    category: "Placements, Internships & Career Support",
    questions: [
      {
        q: "Does instudia provide placement assistance and job support?",
        a: "Yes. Every student receives career grooming through our Student Success Suite, including ATS resume optimization, portfolio reviews, technical interview prep, and direct referral opportunities to local businesses and national remote tech hiring teams.",
      },
      {
        q: "Can I do freelancing or remote work after completing a course?",
        a: "Absolutely. Our Graphic Design, Web Development, and Python curricula include dedicated modules on freelancing, client communication, pricing projects, and building international portfolios on platforms like Upwork and GitHub.",
      },
    ],
  },
  {
    category: "Free Student Tools",
    questions: [
      {
        q: "What is the Student Success Suite?",
        a: "The Student Success Suite is instudia's collection of free AI-powered career tools. It includes our ATS Resume Analyzer, Nagaland Tech Salary Insights Calculator, Interactive Study Planner, and AI Quiz & Note Generators built specifically for students in the Northeast.",
      },
      {
        q: "Is any subscription required to use instudia student tools?",
        a: "No. All tools in the Student Success Suite are completely free to use with no hidden fees or account creation required.",
      },
    ],
  },
];

export default function FAQPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqCategories.flatMap((cat) =>
      cat.questions.map((q) => ({
        "@type": "Question",
        "name": q.q,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": q.a,
        },
      }))
    ),
  };

  return (
    <main className="bg-white min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-neutral-100 pt-24 pb-16 px-6 text-center">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[300px] bg-brandpurple/5 rounded-full blur-[100px] pointer-events-none" />
        <div className="relative mx-auto max-w-4xl">
          <p className="text-xs font-extrabold tracking-[0.2em] text-brandpurple uppercase mb-4">
            Help Center
          </p>
          <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-[#1B1C1E] leading-tight">
            Frequently Asked <span className="text-brandpurple">Questions</span>
          </h1>
          <p className="mt-5 text-lg text-gray-500 max-w-2xl mx-auto leading-relaxed">
            Everything you need to know about instudia's ecosystem, tools, and mission in Nagaland.
          </p>
        </div>
      </section>

      {/* Content */}
      <div className="mx-auto max-w-4xl px-6 py-16">
        <div className="space-y-20">
          {faqCategories.map((cat) => (
            <section key={cat.category} className="scroll-mt-24">
              <h2 className="text-sm font-black text-brandpurple uppercase tracking-[0.2em] mb-8 border-l-4 border-brandpurple pl-4">
                {cat.category}
              </h2>
              <div className="grid gap-6">
                {cat.questions.map((item, i) => (
                  <div
                    key={i}
                    className="p-6 sm:p-8 rounded-[2rem] bg-gray-50 border border-neutral-100 hover:border-brandpurple/30 transition-colors group"
                  >
                    <h3 className="text-xl font-bold text-[#1B1C1E] mb-3 flex gap-3">
                      <span className="text-brandpurple/40 group-hover:text-brandpurple transition-colors">Q.</span>
                      {item.q}
                    </h3>
                    <div className="flex gap-3 mt-1">
                      <span className="text-gray-300 font-bold shrink-0">A.</span>
                      <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
                        {item.a}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-20 p-8 sm:p-12 rounded-[3rem] bg-[#1B1C1E] text-white overflow-hidden relative">
          <div className="absolute top-0 right-0 w-64 h-64 bg-brandpurple/20 blur-[80px] -mr-32 -mt-32" />
          <div className="relative z-10 text-center max-w-2xl mx-auto">
            <h2 className="text-3xl font-black mb-4">Still have questions?</h2>
            <p className="text-gray-400 mb-8">
              We're here to help. Reach out to our team directly and we'll get back to you as soon as possible.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <a
                href="mailto:instudia.nagaland@gmail.com"
                className="px-8 py-3 bg-brandpurple hover:bg-brandpurple/90 rounded-full font-bold transition-all shadow-lg shadow-brandpurple/20"
              >
                Email Support
              </a>
              <a
                href="https://wa.me/918798587779"
                className="px-8 py-3 bg-white/10 hover:bg-white/20 border border-white/10 rounded-full font-bold transition-all backdrop-blur-sm"
              >
                WhatsApp Us
              </a>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
