import { Metadata } from "next";
import Link from "next/link";
import { SITE_URL, canonicalFor } from "@/lib/site";
import { buildMetadata } from "@/lib/metadata";
import { posts } from "../data/posts";
import BlogClient from "./BlogClient";
import { Container } from "../components/atom/Container";

export const metadata: Metadata = buildMetadata({
  title: "Tech & Career Insights Blog in Dimapur",
  description:
    "Explore career advice, programming tutorials, design guides & industry insights from instudia, Nagaland's top tech training institute in Dimapur.",
  path: "/blog",
  image: "https://res.cloudinary.com/dhwg77gwm/image/upload/f_auto,q_auto/v1/instudia/tqo7qzztc4duzktj0jt9",
  imageAlt: "instudia Blog — Tech & Career Insights",
});

export default function BlogPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "instudia Blog — Career & Tech Insights",
    description: "Career tips, skill guides, and tech insights from instudia — Nagaland's career-first tech institute in Dimapur.",
    url: canonicalFor("/blog"),
    mainEntity: {
      "@type": "ItemList",
      itemListElement: posts.map((post, index) => ({
        "@type": "ListItem",
        position: index + 1,
        url: canonicalFor(`/blog/${post.slug}`),
      })),
    },
  };

  return (
    <main className="bg-[#FAFAFA] min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {/* Interactive Hero + Filter + Posts (Animated Client Component) */}
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
