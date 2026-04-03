import { Metadata } from "next";
import Link from "next/link";
import { posts } from "../data/posts";
import BlogClient from "./BlogClient";
import { Container } from "../components/atom/Container";
import { motion } from "framer-motion";

export const metadata: Metadata = {
  title: "Blog — Insights on Careers, Tech & Skills",
  description:
    "Career tips, skill guides, and tech insights from instudia — Nagaland's career-first tech institute in Dimapur.",
  alternates: { canonical: "/blog" },
  openGraph: {
    title: "instudia Blog — Career, Tech & Skill Insights",
    description:
      "Read practical guides on IT careers, design, accounting, and upskilling from our team in Dimapur.",
    url: "https://www.instudianagaland.com/blog",
    type: "website",
  },
};

export default function BlogPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "instudia Blog — Career & Tech Insights",
    description: "Career tips, skill guides, and tech insights from instudia — Nagaland's career-first tech institute in Dimapur.",
    url: "https://www.instudianagaland.com/blog",
    mainEntity: {
      "@type": "ItemList",
      itemListElement: posts.map((post, index) => ({
        "@type": "ListItem",
        position: index + 1,
        url: `https://www.instudianagaland.com/blog/${post.slug}`,
      })),
    },
  };

  return (
    <main className="bg-[#FAFAFA] min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {/* Swiss Archival Hero */}
      <section className="relative pt-32 pb-20 overflow-hidden border-b-2 border-black/5">
        {/* Swiss Grid Overlay */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

        <Container className="relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
            <div className="lg:col-span-8">
              <div className="flex items-center gap-4 mb-8">
                <span className="text-[10px] font-black text-white bg-black px-3 py-1 uppercase tracking-widest">
                  Latest
                </span>
                <p className="text-[10px] font-black tracking-[0.4em] text-black uppercase">
                  Knowledge Vault
                </p>
              </div>

              <h1 className="text-6xl sm:text-[9rem] font-black tracking-[-0.04em] text-black leading-[0.8] uppercase flex flex-col">
                <span>instudia</span>
                <span className="text-white [-webkit-text-stroke:4px_black]" style={{ paintOrder: 'stroke fill' }}>blogs.</span>
              </h1>
            </div>

            <div className="lg:col-span-4 lg:mb-4 lg:text-right">
              <p className="text-sm font-bold text-black leading-tight max-w-sm ml-auto uppercase mb-10 opacity-70">
                Insights to <span className="text-brandpurple underline decoration-2 underline-offset-4">build your career</span>. Practical guides on tech, design, and regional skills.
              </p>
              <div className="h-[2px] w-full bg-black/10 relative overflow-hidden hidden lg:block">
                <div className="absolute inset-0 bg-black w-1/3" />
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Interactive filter + posts (client component) */}
      <BlogClient posts={posts} />

      {/* Brutalist Newsletter / CTA */}
      <section className="py-24 sm:py-32 bg-white border-t-2 border-black">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center bg-white border-2 border-black p-8 sm:p-16 shadow-[12px_12px_0px_#FFE01B] relative overflow-hidden group">
            {/* Technical Accent Line */}
            <div className="absolute top-0 left-0 w-full h-1 bg-black" />

            <div className="lg:col-span-7">
              <span className="text-[10px] font-black text-white bg-black px-3 py-1 uppercase tracking-widest mb-6 inline-block">
                Community
              </span>
              <h2 className="text-4xl sm:text-6xl font-black text-black leading-[0.9] uppercase tracking-tighter">
                Join the Narrative <br />
                <span className="text-white [-webkit-text-stroke:1.5px_black]">Get Insights.</span>
              </h2>
              <p className="mt-8 text-sm sm:text-base font-bold text-black max-w-xl leading-relaxed uppercase opacity-80">
                Join 500+ students and professionals who get weekly career tips, course announcements, and skill guides directly from the instudia faculty.
              </p>
            </div>

            <div className="lg:col-span-5 flex flex-col gap-6">
              <div className="flex flex-col gap-4">
                <a
                  href="https://www.instagram.com/instudia_nagaland"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between border-2 border-black bg-white px-8 py-5 text-xs font-black text-black uppercase tracking-widest hover:bg-black hover:text-white transition-all shadow-[6px_6px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-[6px] hover:translate-y-[6px]"
                >
                  Follow on Instagram
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </a>
                <Link
                  href="/courses"
                  className="flex items-center justify-between border-2 border-black bg-white px-8 py-5 text-xs font-black text-black uppercase tracking-widest hover:bg-[#C21BFF] hover:text-white transition-all shadow-[6px_6px_0px_#C21BFF] hover:shadow-none hover:translate-x-[6px] hover:translate-y-[6px]"
                >
                  Explore Courses
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
}
