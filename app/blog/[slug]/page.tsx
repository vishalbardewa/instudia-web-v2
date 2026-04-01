import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { posts, getPostBySlug, formatDate } from "../../data/posts";
import hljs from "highlight.js";
import ReadingProgress from "../../components/atom/ReadingProgress";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import "katex/dist/katex.min.css";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};
  return {
    title: `${post.title} | instudia Blog`,
    description: post.excerpt,
    alternates: { canonical: `/blog/${slug}` },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.date,
      authors: [post.author],
      images: [{ url: post.coverImage, width: 1200, height: 630, alt: post.title }],
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const others = posts.filter((p) => p.slug !== slug).slice(-3);

  // Build TOC from section headings
  const slugify = (s: string) =>
    s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
  const tocItems = post!.body
    .filter((s) => s.heading)
    .map((s) => ({ label: s.heading!, id: slugify(s.heading!) }));

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post!.title,
    description: post!.excerpt,
    image: post!.coverImage,
    datePublished: post!.date,
    author: {
      "@type": "Person",
      name: post!.author,
      jobTitle: post!.authorRole,
    },
    publisher: {
      "@type": "Organization",
      name: "instudia",
      url: "https://www.instudianagaland.com",
    },
    url: `https://www.instudianagaland.com/blog/${slug}`,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://www.instudianagaland.com/blog/${slug}`,
    },
  };

  return (
    <main className="bg-white">
      <ReadingProgress />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {/* ── Hero / Cover ──────────────────────────────────── */}
      <section className="relative overflow-hidden pt-24 pb-0 px-6">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[200px] bg-brandpurple/5 rounded-full blur-[80px] pointer-events-none" />
        <div className="relative mx-auto max-w-3xl">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 mb-6 text-xs font-semibold text-gray-400">
            <Link href="/blog" className="hover:text-brandpurple transition-colors">
              Blog
            </Link>
            <span className="text-neutral-300">/</span>
            <span
              className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-widest ${post.categoryColor}`}
            >
              {post.category}
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-[#1B1C1E] leading-tight">
            {post.title}
          </h1>
          <p className="mt-4 text-lg text-gray-500 leading-relaxed">{post.excerpt}</p>

          {/* Author + meta */}
          <div className="mt-6 flex items-center gap-4 pb-8 border-b border-neutral-100">
            <img
              src={post.authorPhoto}
              alt={post.author}
              className="w-10 h-10 rounded-full object-cover ring-2 ring-brandpurple/20"
            />
            <div>
              <p className="text-sm font-bold text-[#1B1C1E]">{post.author}</p>
              <p className="text-xs text-gray-400">{post.authorRole}</p>
            </div>
            <div className="ml-auto text-right">
              <p className="text-xs font-semibold text-gray-400">{formatDate(post.date)}</p>
              <p className="text-xs text-gray-300">{post.readTime}</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Cover image ───────────────────────────────────── */}
      <div className="mx-auto max-w-4xl px-6 pt-8">
        <div className="rounded-3xl overflow-hidden aspect-[16/7]">
          <img
            src={post.coverImage}
            alt={post.title}
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* ── Article + TOC layout ─────────────────────────── */}
      <div className="mx-auto max-w-6xl px-6 py-14">
        <div className="flex gap-12 items-start">

          {/* ── Main article ─────────────────────────────── */}
          <article className="min-w-0 flex-1">

            {/* Mobile TOC — collapsible */}
            {tocItems.length > 0 && (
              <details className="lg:hidden mb-10 rounded-2xl border border-neutral-100 bg-gray-50 overflow-hidden group">
                <summary className="flex items-center justify-between px-5 py-4 cursor-pointer list-none">
                  <span className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-widest text-brandpurple">
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 6h16M4 12h10M4 18h7" />
                    </svg>
                    Table of Contents
                  </span>
                  <svg className="w-4 h-4 text-gray-400 transition-transform duration-200 group-open:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <ol className="px-5 pb-5 pt-2 space-y-2">
                  {tocItems.map((item, i) => (
                    <li key={item.id} className="flex items-start gap-2.5">
                      <span className="flex-shrink-0 w-5 h-5 rounded-full bg-brandpurple/10 text-brandpurple text-[10px] font-extrabold flex items-center justify-center mt-0.5">
                        {i + 1}
                      </span>
                      <a
                        href={`#${item.id}`}
                        className="text-sm text-gray-600 hover:text-brandpurple transition-colors leading-snug"
                      >
                        {item.label}
                      </a>
                    </li>
                  ))}
                </ol>
              </details>
            )}

            {/* Article sections */}
            <div className="space-y-12">
              {post.body.map((section, si) => (
                <section key={si}>
                  {section.heading && (
                    <h2
                      id={slugify(section.heading)}
                      className="scroll-mt-24 text-2xl font-black text-[#1B1C1E] mb-4 flex items-start gap-3"
                    >
                      <span className="flex-shrink-0 w-1 self-stretch rounded-full bg-brandpurple mt-0.5" />
                      {section.heading}
                    </h2>
                  )}
                  <div className={`space-y-5 ${section.heading ? "pl-4" : ""}`}>
                    {section.items.map((item, ii) => {
                      if (item.type === "paragraph") {
                        return (
                          <div key={ii} className="text-gray-700 leading-relaxed text-[1.05rem]">
                            <ReactMarkdown remarkPlugins={[remarkGfm, remarkMath]} rehypePlugins={[rehypeKatex]}>
                              {item.text}
                            </ReactMarkdown>
                          </div>
                        );
                      }
                      if (item.type === "subheading") {
                        return (
                          <h3 key={ii} className="pt-4 text-xl font-bold text-[#1B1C1E] tracking-tight">
                            {item.text}
                          </h3>
                        );
                      }
                      if (item.type === "bullets") {
                        return (
                          <ul key={ii} className="space-y-2.5 border-l-2 border-brandpurple/20 pl-5">
                            {item.items.map((b, bi) => (
                              <li key={bi} className="flex items-start gap-3 text-sm text-gray-700 leading-relaxed">
                                <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-brandpurple mt-1.5" />
                                <div className="flex-1 min-w-0">
                                  <ReactMarkdown remarkPlugins={[remarkGfm, remarkMath]} rehypePlugins={[rehypeKatex]}>
                                    {b}
                                  </ReactMarkdown>
                                </div>
                              </li>
                            ))}
                          </ul>
                        );
                      }
                      if (item.type === "code") {
                        const highlighted = (() => {
                          try {
                            return hljs.highlight(item.content, { language: item.language }).value;
                          } catch {
                            return hljs.highlightAuto(item.content).value;
                          }
                        })();
                        return (
                          <div key={ii} className="rounded-2xl overflow-hidden border border-neutral-800 shadow-lg">
                            {/* Language badge */}
                            <div className="flex items-center justify-between bg-[#1e1e2e] px-4 py-2 border-b border-neutral-700">
                              <span className="text-[10px] font-extrabold uppercase tracking-widest text-neutral-400">
                                {item.language}
                              </span>
                              <span className="flex gap-1.5">
                                <span className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
                                <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/70" />
                                <span className="w-2.5 h-2.5 rounded-full bg-green-500/70" />
                              </span>
                            </div>
                            {/* Code */}
                            <pre className="bg-[#fafafa] px-5 py-5 overflow-x-auto text-sm leading-relaxed">
                              <code
                                className={`hljs language-${item.language}`}
                                dangerouslySetInnerHTML={{ __html: highlighted }}
                              />
                            </pre>
                          </div>
                        );
                      }
                      return null;
                    })}
                  </div>
                </section>
              ))}
            </div>

            {/* Share this article */}
            <div className="mt-14 pt-10 border-t border-neutral-100">
              <p className="text-xs font-extrabold uppercase tracking-widest text-gray-400 mb-6">
                Share this article
              </p>
              <div className="flex flex-wrap gap-3">
                <a
                  href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(`https://www.instudianagaland.com/blog/${slug}`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-2xl bg-[#1DA1F2]/10 text-[#1DA1F2] hover:bg-[#1DA1F2] hover:text-white transition-all font-bold text-sm group"
                >
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.045 4.126H5.078z" />
                  </svg>
                  Twitter
                </a>
                <a
                  href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(`https://www.instudianagaland.com/blog/${slug}`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-2xl bg-[#0A66C2]/10 text-[#0A66C2] hover:bg-[#0A66C2] hover:text-white transition-all font-bold text-sm group"
                >
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                  LinkedIn
                </a>
                <a
                  href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(`https://www.instudianagaland.com/blog/${slug}`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-2xl bg-[#1877F2]/10 text-[#1877F2] hover:bg-[#1877F2] hover:text-white transition-all font-bold text-sm group"
                >
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                  Facebook
                </a>
              </div>
            </div>

            {/* CTA after article */}
            <div className="mt-14 rounded-3xl bg-brandpurple/5 border border-brandpurple/15 p-8 text-center">
              <p className="text-xs font-extrabold uppercase tracking-widest text-brandpurple mb-2">
                Ready to start?
              </p>
              <p className="text-xl font-black text-[#1B1C1E] mb-4">
                Turn your learning into a career at instudia
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                <Link
                  href="/courses"
                  className="inline-flex items-center gap-2 rounded-2xl bg-brandpurple px-5 py-2.5 text-sm font-extrabold text-white hover:bg-brandpurple/90 transition-all hover:-translate-y-0.5 shadow-md shadow-brandpurple/20"
                >
                  Explore Courses
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 rounded-2xl border border-neutral-200 px-5 py-2.5 text-sm font-extrabold text-[#1B1C1E] hover:bg-gray-50 transition-all"
                >
                  Contact Us
                </Link>
              </div>
            </div>
          </article>

          {/* ── Sticky TOC sidebar (desktop only) ─────────── */}
          {tocItems.length > 0 && (
            <aside className="hidden lg:block w-64 flex-shrink-0">
              <div className="sticky top-24 rounded-2xl border border-neutral-100 bg-gray-50 p-6">
                <p className="flex items-center gap-2 text-[10px] font-extrabold uppercase tracking-widest text-brandpurple mb-5">
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 6h16M4 12h10M4 18h7" />
                  </svg>
                  Contents
                </p>
                <ol className="space-y-3">
                  {tocItems.map((item, i) => (
                    <li key={item.id} className="flex items-start gap-2.5">
                      <span className="flex-shrink-0 w-5 h-5 rounded-full bg-brandpurple/10 text-brandpurple text-[10px] font-extrabold flex items-center justify-center mt-0.5">
                        {i + 1}
                      </span>
                      <a
                        href={`#${item.id}`}
                        className="text-sm text-gray-500 hover:text-brandpurple transition-colors leading-snug"
                      >
                        {item.label}
                      </a>
                    </li>
                  ))}
                </ol>

                <div className="mt-8 pt-8 border-t border-neutral-100">
                  <p className="text-[10px] font-extrabold uppercase tracking-widest text-gray-400 mb-4">
                    Share
                  </p>
                  <div className="flex gap-2.5">
                    <a
                      href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(`https://www.instudianagaland.com/blog/${slug}`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 rounded-xl bg-gray-100 text-gray-400 hover:bg-[#1DA1F2]/10 hover:text-[#1DA1F2] transition-all"
                      title="Share on Twitter"
                    >
                      <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.045 4.126H5.078z" />
                      </svg>
                    </a>
                    <a
                      href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(`https://www.instudianagaland.com/blog/${slug}`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 rounded-xl bg-gray-100 text-gray-400 hover:bg-[#0A66C2]/10 hover:text-[#0A66C2] transition-all"
                      title="Share on LinkedIn"
                    >
                      <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </aside>
          )}

        </div>
      </div>

      {/* ── More posts ────────────────────────────────────── */}
      {others.length > 0 && (
        <section className="border-t border-neutral-100 bg-gray-50 px-6 py-16">
          <div className="mx-auto max-w-5xl">
            <p className="text-xs font-extrabold tracking-[0.15em] text-gray-400 uppercase mb-8">
              More from instudia Blog
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              {others.map((p) => (
                <Link
                  key={p.slug}
                  href={`/blog/${p.slug}`}
                  className="group flex flex-col rounded-2xl bg-white border border-neutral-100 hover:shadow-lg hover:-translate-y-1 hover:border-brandpurple/20 transition-all duration-300 overflow-hidden"
                >
                  <div className="overflow-hidden aspect-[16/9] bg-gray-100">
                    <img
                      src={p.coverImage}
                      alt={p.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-4 flex flex-col flex-1">
                    <span
                      className={`self-start text-[9px] font-extrabold uppercase tracking-widest px-2 py-0.5 rounded-full ${p.categoryColor} mb-2`}
                    >
                      {p.category}
                    </span>
                    <h3 className="text-sm font-black text-[#1B1C1E] leading-snug group-hover:text-brandpurple transition-colors line-clamp-2 flex-1">
                      {p.title}
                    </h3>
                    <p className="text-[10px] text-gray-400 mt-2">
                      {formatDate(p.date)} · {p.readTime}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
            <div className="mt-8 text-center">
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 text-sm font-extrabold text-brandpurple hover:underline"
              >
                ← View all posts
              </Link>
            </div>
          </div>
        </section>
      )}
    </main>
  );
}
