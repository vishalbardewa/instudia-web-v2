import type { Metadata } from 'next';
import Link from 'next/link';
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

const ToolCard = ({ name, description, icon, statusIcon, statusMessage, href, style, imageUrl }: ToolProps) => {
  return (
    <Link href={href} className={`group block max-w-sm rounded-[2rem] p-2 shadow-sm transition-shadow hover:shadow-lg ${styles[style].bg} ${styles[style].border} ${styles[style].text} ${styles[style].hover}`}>
      <div className="relative w-full overflow-hidden rounded-[1.5rem] bg-stone-50">
        {imageUrl ? (
          <img src={imageUrl} alt={name} className="h-full w-full object-contain transition-transform group-hover:scale-110 duration-500" />
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
        {tools.map((tool) => (
          <ToolCard key={tool.href} {...tool} />
        ))}
      </div>

      <Script
        id="tools-suite-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </main>
  );
}
