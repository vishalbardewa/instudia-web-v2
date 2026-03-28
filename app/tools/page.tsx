import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import Script from 'next/script';
import { AppConfig } from '../_utils/AppConfig';

export const metadata: Metadata = {
  title: 'Student Success Suite | Tools & Resources | Instudia',
  description: 'Accelerate your career with our Student Success Suite. Access our ATS Resume Scanner, Salary Insights, Career Blueprint, and Study Planner to bridge the gap between education and industry.',
  keywords: ['career planning', 'ATS resume scanner', 'salary benchmarks', 'study planner', 'student success', 'instudia', 'dimapur', 'nagaland'],
  alternates: {
    canonical: `${AppConfig.canonicalBase}/tools`,
  },
  openGraph: {
    title: 'Student Success Suite | Navigate your Career | Instudia',
    description: 'Bridge the gap between education and industry with our premium career tools.',
    url: `${AppConfig.canonicalBase}/tools`,
    siteName: 'Instudia',
    images: [
      {
        url: 'https://ik.imagekit.io/dxffek9yf/course-list-page/tool-1.png',
        width: 1200,
        height: 630,
        alt: 'Student Success Suite - Instudia',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Student Success Suite | Instudia',
    description: 'Premium career tools for the next generation of talent.',
    images: ['https://ik.imagekit.io/dxffek9yf/course-list-page/tool-1.png'],
  },
};

interface ToolProps {
  name: string;
  description: string;
  icon?: string;
  category?: string;
  href: string;
  statusIcon?: string;
  statusMessage?: string;
  style: string;
  imageUrl?: string;
  priority?: boolean;
}

const tools = [
  {
    name: "Career Blueprint",
    href: "/tools/career-blueprint",
    description: "Bridge the gap between your current skills and your dream roles.",
    style: "purple",
    statusIcon: "⭐",
    statusMessage: "Updated",
    imageUrl: "https://ik.imagekit.io/dxffek9yf/course-list-page/tool-1.png"
  },
  {
    name: "Salary Insights",
    href: "/tools/salary-insights",
    description: "Discover salary benchmarks for various roles and industries.",
    style: "redhue",
    statusIcon: "📈",
    statusMessage: "Updated",
    imageUrl: "https://ik.imagekit.io/dxffek9yf/course-list-page/tool-2.png"
  },
  {
    name: "ATS Resume Scanner",
    href: "/tools/ats-analyzer",
    description: "Scan your resume for ATS compliance and get personalized recommendations.",
    style: "brightyellow",
    statusIcon: "🔍",
    statusMessage: "Most Popular",
    imageUrl: "https://ik.imagekit.io/dxffek9yf/course-list-page/tool-3.png"
  },
  {
    name: "Study Planner",
    href: "/tools/study-planner",
    description: "Get a personalized study plan based on your skills and interests.",
    style: "flourescent",
    statusIcon: "📅",
    statusMessage: "Updated",
    imageUrl: "https://ik.imagekit.io/dxffek9yf/course-list-page/tool-4.png"
  },
]

const FAQ_DATA = [
  {
    q: "How can the ATS Resume Scanner help my job search?",
    a: "Our ATS (Applicant Tracking System) Resume Scanner uses advanced algorithms to compare your resume against industry-standard requirements. It identifies missing keywords, formatting issues, and structural gaps that might prevent your application from reaching a human recruiter. By optimizing your resume with our scanner, you increase your chances of landing interviews by up to 3x."
  },
  {
    q: "What is the Career Blueprint tool?",
    a: "The Career Blueprint is an interactive roadmap generator that analyzes your current skill set and compares it with your dream role's requirements. It provides a step-by-step learning path, suggesting specific certifications, projects, and skills you need to bridge the gap and become a top-tier candidate."
  },
  {
    q: "Are these career tools free to use?",
    a: "Yes! Currently, all tools in the Student Success Suite are free for Instudia students and the wider community. We are committed to empowering Dimapur's talent by removing barriers to high-quality career resources and industrial insights."
  },
  {
    q: "How accurate are the Salary Insights for Nagaland?",
    a: "Our Salary Insights tool combines global industry benchmarks with local market data from our network of partners and alumni. While individual offers vary, it provides a realistic range for roles like Web Development, UI/UX Design, and Project Management specifically tailored for the regional context."
  }
];

const PROCESS_STEPS = [
  {
    title: "Assess",
    desc: "Use the ATS Scanner and Salary Insights to understand your current standing and market value in the tech ecosystem."
  },
  {
    title: "Plan",
    desc: "Generate your Career Blueprint to identify the exact skills and certifications needed to reach your professional goals."
  },
  {
    title: "Optimize",
    desc: "Leverage the Study Planner to create a manageable schedule that fits your daily life while ensuring consistent progress."
  },
  {
    title: "Succeed",
    desc: "Apply to your dream roles with a data-backed strategy, an optimized resume, and a clear path to career milestones."
  }
];

const styles: Record<string, { bg: string; border: string; text: string; hover: string; button: string }> = {
  purple: {
    bg: "bg-gradient-to-br from-brandpurple/10 to-brandpurple/5",
    border: "border-matteblack border-2",
    text: "text-brandpurple",
    hover: "hover:bg-brandpurple/10",
    button: "bg-brandpurple text-white hover:bg-brandpurple/90",
  },
  redhue: {
    bg: "bg-gradient-to-br from-redhue/10 to-redhue/5",
    border: "border-matteblack border-2",
    text: "text-redhue",
    hover: "hover:bg-redhue/10",
    button: "bg-redhue text-white hover:bg-redhue/90",
  },
  brightyellow: {
    bg: "bg-gradient-to-br from-brightyellow/10 to-brightyellow/5",
    border: "border-matteblack border-2",
    text: "text-brightyellow",
    hover: "hover:bg-brightyellow/10",
    button: "bg-brightyellow text-white hover:bg-brightyellow/90",
  },
  flourescent: {
    bg: "bg-gradient-to-br from-flourescent/10 to-flourescent/5",
    border: "border-matteblack border-2",
    text: "text-flourescent",
    hover: "hover:bg-flourescent/10",
    button: "bg-flourescent text-white hover:bg-flourescent/90",
  }
}

const ToolCard = ({ name, description, icon, statusIcon, statusMessage, href, style, imageUrl, priority }: ToolProps) => {
  return (
    <Link href={href} className={`group block max-w-sm rounded-[2rem] p-2 shadow-sm transition-shadow hover:shadow-lg ${styles[style].bg} ${styles[style].border} ${styles[style].text} ${styles[style].hover}`}>
      <div className="relative w-full aspect-[4/3] overflow-hidden rounded-[1.5rem] bg-stone-50">
        {imageUrl ? (
          <Image 
            src={`${imageUrl}?tr=f-auto,q-auto`} 
            alt={name} 
            fill
            priority={priority}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="h-full w-full object-contain transition-transform group-hover:scale-110 duration-500" 
          />
        ) : (
          icon
        )}

        <div className="absolute top-4 right-4 flex h-8 w-8 items-center justify-center rounded-lg bg-stone-900 text-stone-100 shadow-inner">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="h-5 w-5"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
          </svg>
        </div>
      </div>

      <div className="px-5 py-6">
        <h3 className="mb-2 text-xl font-bold tracking-tight text-stone-900">{name}</h3>
        <p className="text-base leading-relaxed text-stone-600">{description}</p>
      </div>

      <div className="flex items-center justify-between border-t border-stone-100 px-5 py-4 mt-1">
        <button className="rounded-xl border border-stone-200 bg-white px-5 py-2.5 text-sm font-semibold text-stone-900 transition-colors hover:bg-stone-50">
          Launch
        </button>
        <div className="flex items-center gap-2 text-sm text-stone-500">
          {statusIcon}
          <span>{statusMessage}</span>
        </div>
      </div>
    </Link>
  );
};

export default function CareerPlannerPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "Student Success Suite Tools",
    "description": "A collection of tools to help students and professionals succeed in their careers.",
    "itemListElement": tools.map((tool, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "item": {
        "@type": "WebApplication",
        "name": tool.name,
        "description": tool.description,
        "url": `${AppConfig.canonicalBase}${tool.href}`,
        "applicationCategory": "EducationalApplication",
        "image": tool.imageUrl,
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "INR"
        }
      }
    }))
  };

  return (
    <main className="min-h-screen bg-[#FAFAFA] text-[#1B1C1E] selection:bg-brandpurple/30 font-jakarta">
      {/* Hero */}
      <section className="relative overflow-hidden bg-white border-b border-neutral-100 pt-24 pb-20 px-6">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[300px] bg-brandpurple/5 rounded-full blur-[100px] pointer-events-none" />
        <div className="relative mx-auto max-w-4xl text-center">
          <p className="text-xs font-extrabold tracking-[0.2em] text-brandpurple uppercase mb-4">
            Student Success Suite
          </p>
          <h1 className="text-5xl sm:text-6xl font-black tracking-tight text-[#1B1C1E] leading-tight">
            Navigate towards your{" "}
            <span className="text-brandpurple">career milestones</span>
          </h1>
          <p className="mt-5 text-lg text-gray-500 max-w-2xl mx-auto leading-relaxed">
            Bridge the gap between education and industry. We provide the tools, seminars, and career pipelines to launch Dimapur’s next generation of talent.
          </p>

          {/* Stats strip */}
          <div className="mt-10 flex flex-wrap items-center justify-center gap-8">
            {[
              { value: "4", label: "Tools" },
              { value: "100+", label: "Users" },
              { value: "1", label: "Initiative" },
            ].map((s) => (
              <div key={s.label} className="text-center">
                <p className="text-3xl font-black text-[#1B1C1E]">{s.value}</p>
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mt-1">
                  {s.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-6 py-6">
        {tools.map((tool, index) => (
          <ToolCard 
            key={tool.href} 
            {...tool} 
            priority={index < 2} 
          />
        ))}
      </div>

      {/* Why Section */}
      <section className="bg-white py-20 px-6 border-y border-neutral-100 mt-12">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-black text-[#1B1C1E] mb-8">Why Use the Instudia Success Suite?</h2>
          <div className="space-y-6 text-lg text-gray-600 leading-relaxed">
            <p>
              In today's competitive job market, simply having a degree or a certificate isn't always enough. Employers are looking for specific, data-backed proof of your abilities and a strategic approach to your professional development. That's why we built the Student Success Suite—to bridge the gap between traditional education and industrial requirements.
            </p>
            <p>
              Our suite of tools is specifically designed for students and career-shifters in Dimapur and beyond. Whether you're struggling to get past automated resume filters or you're unsure which skills to learn next, our AI-powered resources provide the clarity you need. We combine local market insights with global industry standards to give you a unique advantage.
            </p>
            <p>
              By centralizing your career planning, resume optimization, and study scheduling, we help you save time and focus on what truly matters: building the expertise that will launch your dream career. Start navigating your path to success today with Instudia.
            </p>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 px-6 bg-[#FAFAFA]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-black text-[#1B1C1E]">The 4-Step Success Framework</h2>
            <p className="mt-4 text-gray-500">A systematic approach to landing your dream role in tech.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {PROCESS_STEPS.map((step, i) => (
              <div key={step.title} className="relative p-8 rounded-[2rem] bg-white border border-neutral-100 shadow-sm border-b-4 border-b-brandpurple/20">
                <span className="absolute -top-4 -left-4 w-10 h-10 bg-brandpurple text-white flex items-center justify-center rounded-xl font-bold italic shadow-lg">
                  0{i + 1}
                </span>
                <h3 className="text-xl font-bold mb-3 mt-2">{step.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Selection Guide Section */}
      <section className="bg-white py-20 px-6 border-b border-neutral-100">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-black text-[#1B1C1E] mb-8">Choosing the Right Tool for Your Journey</h2>
          <div className="space-y-6 text-lg text-gray-600 leading-relaxed italic">
            <p>
              Not sure where to start? We recommend beginning with the <strong>ATS Resume Scanner</strong>. Understanding how your current experience is perceived by automated systems is the first step in any modern job search. Once you have a clear picture of your resume's performance, use the <strong>Career Blueprint</strong> to map out your next skills.
            </p>
            <p>
              If you're already in a specialized role but feel you're being under-compensated, our <strong>Salary Insights</strong> tool will provide the negotiation power you need. Finally, the <strong>Study Planner</strong> is your best friend for long-term consistency, helping you turn your career blueprint into a realistic, daily habit. Whatever your goal, we have a resource to help you reach it faster.
            </p>
          </div>
        </div>
      </section>

      {/* Impact Section */}
      <section className="bg-brandpurple/5 py-24 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-black text-[#1B1C1E] mb-6">Our Commitment to Student Success</h2>
          <p className="text-xl text-gray-600 leading-relaxed mb-10 max-w-2xl mx-auto">
            At Instudia, we believe that education is only the first part of the equation. True success comes when that education is paired with the right industrial tools and a strategic mindset. Our mission is to provide every student in Dimapur with the same level of career resources available in major tech hubs worldwide.
          </p>
          <div className="inline-flex items-center gap-2 text-brandpurple font-bold border-b-2 border-brandpurple/20 pb-1">
            Build your future with us
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-6 bg-white border-t border-neutral-100">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-black text-[#1B1C1E] mb-12 text-center">Frequently Asked Questions</h2>
          <div className="grid gap-8">
            {FAQ_DATA.map((faq) => (
              <div key={faq.q} className="group">
                <h3 className="text-lg font-bold text-[#1B1C1E] mb-3 group-hover:text-brandpurple transition-colors italic">
                  Q: {faq.q}
                </h3>
                <p className="text-gray-600 leading-relaxed border-l-4 border-brandpurple/10 pl-6 py-2">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Script
        id="tools-suite-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </main>
  );
}
