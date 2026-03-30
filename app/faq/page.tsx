import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Frequently Asked Questions",
  description:
    "Find answers to common questions about our computer courses, admissions, and career services in Dimapur, Nagaland.",
  alternates: { canonical: "https://www.instudianagaland.com/faq" },
  robots: { index: true, follow: true },
};

const faqCategories = [
  {
    category: "General",
    questions: [
      {
        q: "What is instudia?",
        a: "instudia is a modern career-tech platform based in Dimapur, Nagaland. We bridge the gap between traditional education and industry requirements through hands-on workshops, career tools, and skill development programs.",
      },
      {
        q: "Where is instudia located?",
        a: "Our physical center is located at First Floor, Vikiye Center, Notun Bosti, Dimapur, Nagaland 797112. However, many of our tools and resources are available online for students across the region.",
      },
      {
        q: "How can I contact the instudia team?",
        a: "You can reach us via email at instudia.nagaland@gmail.com or call us at +91-8798-587-779. We're also active on WhatsApp for quick student queries.",
      },
    ],
  },
  {
    category: "Courses & Training",
    questions: [
      {
        q: "What kind of courses do you offer?",
        a: "We offer specialized training in Digital Marketing, Web Development, UI/UX Design, and AI Productivity. Our curriculum is designed to be highly practical and project-based.",
      },
      {
        q: "Are the courses certified?",
        a: "Yes, upon successful completion of our professional courses and projects, students receive a certificate of completion from instudia which validates their skills to potential employers.",
      },
      {
        q: "Do you offer placement assistance?",
        a: "We provide career guidance, resume building (via our ATS scanner), and interview preparation. We also connect top-performing students with our network of local and national partner organizations.",
      },
    ],
  },
  {
    category: "Student Tools",
    questions: [
      {
        q: "What is the Student Success Suite?",
        a: "It's a collection of free digital tools we've built to help students manage their time and careers. This includes our custom Study Planner, Salary Insights for Nagaland, and an ATS Resume Scanner.",
      },
      {
        q: "Is the Study Planner really free?",
        a: "Yes! Our Study Planner is a free resource for any student preparing for exams or personal goals. You can generate, customize, and print your schedule without creating an account.",
      },
      {
        q: "How accurate is the Salary Insights tool?",
        a: "The data is based on regional market research, industry standards in Nagaland, and feedback from professionals in our network. It serves as a benchmark for local career planning.",
      },
    ],
  },
  {
    category: "Workshops & Events",
    questions: [
      {
        q: "Who can attend instudia workshops?",
        a: "Our workshops are open to students, job seekers, and working professionals. Some events are category-specific (e.g., student seminars vs. professional AI networking), which is always mentioned in the event details.",
      },
      {
        q: "How do I register for an upcoming event?",
        a: "Upcoming events are listed on our Workshops page. You can register directly through the website or by contacting our team via WhatsApp.",
      },
    ],
  },
];

export default function FAQPage() {
  return (
    <main className="bg-white min-h-screen">
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
