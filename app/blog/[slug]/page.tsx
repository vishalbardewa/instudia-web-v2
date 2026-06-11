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
import { Container } from "../../components/atom/Container";
import "katex/dist/katex.min.css";
import BrutalistChart from "../../components/molecules/BrutalistChart";
import coursesData from "@/app/courses.json";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};
  return {
    // Clean format: "Post Title — instudia" (layout template appends "| instudia")
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: `/blog/${slug}` },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.date,
      authors: [post.author],
      images: [{ url: post.ogImage || post.coverImage, width: 1200, height: 630, alt: post.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      images: [post.ogImage || post.coverImage],
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const others = posts.filter((p) => p.slug !== slug).slice(-3);
  const slugify = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
  const tocItems = post!.body.filter((s) => s.heading).map((s) => ({ label: s.heading!, id: slugify(s.heading!) }));

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post!.title,
    description: post!.excerpt,
    image: post!.ogImage || post!.coverImage,
    datePublished: post!.date,
    dateModified: post!.date,
    author: {
      "@type": "Person",
      name: post!.author,
      jobTitle: post!.authorRole,
      url: "https://www.instudianagaland.com/blog",
    },
    publisher: {
      "@type": "Organization",
      name: "instudia",
      logo: {
        "@type": "ImageObject",
        url: "https://res.cloudinary.com/dhwg77gwm/image/upload/f_auto,q_auto/v1/instudia/qzmdhewkbsyxmwsjccnu",
      },
      url: "https://www.instudianagaland.com",
    },
    url: `https://www.instudianagaland.com/blog/${slug}`,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://www.instudianagaland.com/blog/${slug}`,
    },
  };

  // Related courses: match by post category/keywords against course fullTitle
  const postKeywords = `${post!.title} ${post!.excerpt} ${post!.category}`.toLowerCase();
  const relatedCourses = coursesData.courses
    .filter((c) => {
      const courseText = `${c.fullTitle} ${c.courseHightlight || ""}`.toLowerCase();
      // Simple keyword overlap check
      const postWords = postKeywords.split(/\W+/).filter((w) => w.length > 4);
      return postWords.some((w) => courseText.includes(w));
    })
    .slice(0, 3);

  return (
    <main className="bg-[#FAFAFA] min-h-screen pb-32">
      <ReadingProgress />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Swiss Editorial Header */}
      <section className="relative pt-32 pb-20 border-b-2 border-black/5 bg-white overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

        <Container className="relative z-10">
          <div className="flex items-center gap-4 mb-10">
            <Link href="/blog" className="text-[10px] font-black text-white bg-black px-3 py-1 uppercase tracking-widest hover:bg-brandpurple transition-colors">
              BACK TO ALL BLOGS
            </Link>
            <div className="h-[1px] w-12 bg-black" />
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-black">
              {post.category.toUpperCase()}
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-end">
            <div className="lg:col-span-9">
              <h1 className="text-4xl sm:text-6xl lg:text-8xl font-black tracking-[-0.04em] text-black leading-[0.9] uppercase flex flex-col mb-10">
                <span>{post.title.split(' ').slice(0, Math.ceil(post.title.split(' ').length / 2)).join(' ')}</span>
                <span className="text-white [-webkit-text-stroke:4px_black]" style={{ paintOrder: 'stroke fill' }}>
                  {post.title.split(' ').slice(Math.ceil(post.title.split(' ').length / 2)).join(' ')}
                </span>
              </h1>

              <div className="flex flex-wrap items-center gap-10">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 border-2 border-black rounded-full overflow-hidden">
                    <img src={post.authorPhoto} alt={post.author} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <p className="text-[10px] font-black uppercase leading-tight">{post.author}</p>
                    <p className="text-[9px] font-bold text-black opacity-40 uppercase tracking-tighter">{post.authorRole}</p>
                  </div>
                </div>
                <div className="h-8 w-[1px] bg-black/10 hidden sm:block" />
                <div>
                  <p className="text-[10px] font-black uppercase opacity-40 mb-1">Posted On</p>
                  <p className="text-[10px] font-black uppercase tracking-widest">{formatDate(post.date)}</p>
                </div>
                <div className="h-8 w-[1px] bg-black/10 hidden sm:block" />
                <div>
                  <p className="text-[10px] font-black uppercase opacity-40 mb-1">Time To Read</p>
                  <p className="text-[10px] font-black uppercase tracking-widest">{post.readTime}</p>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Cinematic Cover Vault */}
      <section className="mt-12 mb-20 px-4 sm:px-10 max-w-7xl mx-auto">
        <div className="border-2 border-black bg-white p-4 shadow-[12px_12px_0px_#FFE01B]">
          <img src={post.coverImage} alt={post.title} className="w-full aspect-[21/9] object-cover border-2 border-black transition-all duration-700" />
        </div>
      </section>

      {/* Asymmetric Drafting Grid */}
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-20">

          {/* Main Content Hub */}
          <article className="lg:col-span-8 order-2 lg:order-1">
            <div className="prose prose-neutral max-w-none">
              <p className="text-xl sm:text-2xl font-bold text-black leading-relaxed mb-16 opacity-80 uppercase tracking-tight">
                {post.excerpt}
              </p>

              <div className="space-y-24">
                {post.body.map((section, si) => (
                  <section key={si} className="relative">
                    {section.heading && (
                      <div className="mb-10">
                        <div className="flex items-center gap-4 mb-4">
                          <span className="text-[10px] font-black text-white bg-black px-2 py-0.5">
                            {String(si + 1).padStart(2, '0')}
                          </span>
                          <div className="flex-1 h-[2px] bg-black" />
                        </div>
                        <h2 id={slugify(section.heading)} className="text-3xl sm:text-5xl font-black text-black uppercase tracking-tighter leading-none scroll-mt-32">
                          {section.heading}
                        </h2>
                      </div>
                    )}

                    <div className="space-y-8">
                      {section.items.map((item, ii) => {
                        if (item.type === "paragraph") {
                          return (
                            <div key={ii} className="text-lg sm:text-xl font-medium text-black leading-relaxed opacity-80">
                              <ReactMarkdown
                                remarkPlugins={[remarkGfm, remarkMath]}
                                rehypePlugins={[rehypeKatex]}
                                components={{
                                  table: ({ children }) => (
                                    <div className="table-container">
                                      <table>{children}</table>
                                    </div>
                                  ),
                                }}
                              >
                                {item.text}
                              </ReactMarkdown>
                            </div>
                          );
                        }
                        if (item.type === "subheading") {
                          return (
                            <h3 key={ii} className="pt-4 text-xl sm:text-2xl font-black text-black uppercase tracking-tight border-l-4 border-black pl-6">
                              {item.text}
                            </h3>
                          );
                        }
                        if (item.type === "links") {
                          return (
                            <div key={ii} className="my-6 flex flex-col gap-2">
                              {item.items.map((b, bi) => (
                                <div key={bi} className="group border border-black bg-white p-2 sm:px-3 sm:py-2 hover:bg-neutral-50 transition-all cursor-pointer relative">
                                  <ReactMarkdown 
                                    remarkPlugins={[remarkGfm, remarkMath]} 
                                    rehypePlugins={[rehypeKatex]}
                                    components={{
                                      p: ({ children }) => <div className="text-xs sm:text-sm font-semibold text-black tracking-tight m-0 opacity-80 group-hover:opacity-100 transition-opacity">{children}</div>,
                                      a: ({ href, children }) => (
                                        <a href={href} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between gap-3 before:absolute before:inset-0">
                                          <span className="flex-1 group-hover:text-[#C21BFF] transition-colors line-clamp-1 sm:line-clamp-none">{children}</span>
                                          <span className="flex-shrink-0 w-5 h-5 sm:w-6 sm:h-6 border border-black flex items-center justify-center group-hover:bg-[#C21BFF] group-hover:text-white transition-colors bg-white">
                                            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                              <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                            </svg>
                                          </span>
                                        </a>
                                      )
                                    }}
                                  >
                                    {b}
                                  </ReactMarkdown>
                                </div>
                              ))}
                            </div>
                          );
                        }
                        if (item.type === "bullets") {
                          return (
                            <ul key={ii} className="space-y-4 my-10">
                              {item.items.map((b, bi) => (
                                <li key={bi} className="flex items-start gap-4 p-6 border-2 border-black bg-white shadow-[4px_4px_0px_#C21BFF]">
                                  <span className="flex-shrink-0 w-6 h-6 border-2 border-black bg-black text-white text-[10px] font-black flex items-center justify-center mt-1">
                                    {bi + 1}
                                  </span>
                                  <div className="text-base sm:text-lg font-bold text-black leading-relaxed uppercase tracking-tight">
                                    <ReactMarkdown remarkPlugins={[remarkGfm, remarkMath]} rehypePlugins={[rehypeKatex]}>
                                      {b}
                                    </ReactMarkdown>
                                  </div>
                                </li>
                              ))}
                            </ul>
                          );
                        }
                        if (item.type === "list-ordered") {
                          return (
                            <ol key={ii} className="space-y-6 my-12">
                              {item.items.map((b, bi) => (
                                <li key={bi} className="flex items-start gap-6 group">
                                  <span className="flex-shrink-0 w-10 h-10 border-2 border-black bg-white text-black text-xs font-black flex items-center justify-center shadow-[4px_4px_0px_rgba(0,0,0,1)] group-hover:bg-black group-hover:text-white transition-all">
                                    {bi + 1}
                                  </span>
                                  <div className="text-base sm:text-lg font-bold text-black leading-tight uppercase tracking-tight pt-2">
                                    <ReactMarkdown remarkPlugins={[remarkGfm, remarkMath]} rehypePlugins={[rehypeKatex]}>
                                      {b}
                                    </ReactMarkdown>
                                  </div>
                                </li>
                              ))}
                            </ol>
                          );
                        }
                        if (item.type === "blockquote") {
                          const sizeClass = item.fontSize ? `text-${item.fontSize}` : "text-xl sm:text-3xl";
                          const caseClass = item.textCase === "normal" ? "normal-case" : (item.textCase || "uppercase");

                          return (
                            <blockquote key={ii} className="my-16 border-l-8 border-[#FFE01B] bg-white p-10 sm:p-14 border-2 border-black shadow-[12px_12px_0px_rgba(0,0,0,1)] relative overflow-hidden">
                              <div className="absolute top-0 right-0 p-4 opacity-5">
                                <svg className="w-20 h-20" fill="currentColor" viewBox="0 0 24 24"><path d="M14.017 21L14.017 18C14.017 16.899 15.192 15.606 16.017 15C16.842 14.394 17.667 14.394 18.017 14L18.017 11C18.017 10.337 17.65 10 17 10L14 10L14 4L22 4L22 10C22 15 19 21 14.017 21ZM5.017 21L5.017 18C5.017 16.899 6.192 15.606 7.017 15C7.842 14.394 8.667 14.394 9.017 14L9.017 11C9.017 10.337 8.65 10 8 10L5 10L5 4L13 4L13 10C13 15 10 21 5.017 21Z" /></svg>
                              </div>
                              <div className={`font-black text-black leading-[1.1] tracking-tight italic relative z-10 ${sizeClass} ${caseClass}`}>
                                <ReactMarkdown remarkPlugins={[remarkGfm, remarkMath]} rehypePlugins={[rehypeKatex]}>
                                  {item.text}
                                </ReactMarkdown>
                              </div>
                            </blockquote>
                          );
                        }
                        if (item.type === "divider") {
                          return (
                            <div key={ii} className="my-24 h-[2px] bg-black relative flex items-center justify-center">
                              <div className="bg-white border-2 border-black rotate-45 w-4 h-4" />
                            </div>
                          );
                        }
                        if (item.type === "image") {
                          return (
                            <figure key={ii} className="my-20">
                              <div className="border-2 border-black bg-white p-4 shadow-[12px_12px_0px_#FF1B58]">
                                <img src={item.src} alt={item.alt} className="w-full object-cover border-2 border-black" />
                              </div>
                              {item.alt && (
                                <figcaption className="mt-6 text-[10px] font-black uppercase text-black/40 tracking-[0.2em] text-center">
                                  Fig. {item.alt}
                                </figcaption>
                              )}
                            </figure>
                          );
                        }
                        if (item.type === "chart") {
                          return <BrutalistChart key={ii} type={item.chartType} data={item.data} title={item.title} units={item.units} />;
                        }
                        if (item.type === "code") {
                          const highlighted = (() => {
                            try { return hljs.highlight(item.content, { language: item.language }).value; }
                            catch { return hljs.highlightAuto(item.content).value; }
                          })();
                          return (
                            <div key={ii} className="my-12 border-2 border-black bg-[#1B1C1E] shadow-[8px_8px_0px_rgba(0,0,0,1)] overflow-hidden">
                              <div className="flex items-center justify-between px-6 py-3 border-b-2 border-black bg-white">
                                <span className="text-[10px] font-black uppercase tracking-widest text-black">
                                  {item.language} // RECORD_04_01
                                </span>
                                <div className="flex gap-1.5">
                                  <div className="w-2 h-2 bg-black rounded-full" />
                                  <div className="w-2 h-2 bg-black rounded-full" />
                                  <div className="w-2 h-2 bg-black rounded-full" />
                                </div>
                              </div>
                              <pre className="p-8 overflow-x-auto text-sm sm:text-base leading-relaxed bg-white">
                                <code className={`hljs language-${item.language}`} dangerouslySetInnerHTML={{ __html: highlighted }} />
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
            </div>

            {/* Author Bio */}
            <div className="mt-24 p-8 sm:p-12 border-2 border-black bg-white shadow-[6px_6px_0px_rgba(0,0,0,1)] flex flex-col sm:flex-row gap-8 items-start">
              <div className="w-20 h-20 border-2 border-black rounded-full overflow-hidden shrink-0">
                <img src={post.authorPhoto} alt={post.author} className="w-full h-full object-cover" />
              </div>
              <div className="flex-1">
                <span className="text-[10px] font-black text-white bg-black px-3 py-1 uppercase tracking-widest mb-3 inline-block">
                  About the Author
                </span>
                <p className="text-xl font-black text-black uppercase tracking-tight mb-1">{post.author}</p>
                <p className="text-[10px] font-bold text-black/40 uppercase tracking-widest mb-4">{post.authorRole}</p>
                <p className="text-sm font-medium text-black/70 leading-relaxed">
                  {post.authorBio ||
                    `${post.author} is an educator and tech professional at instudia, Dimapur's leading computer training institute. 
                    Passionate about making technology accessible to students across Nagaland.`}
                </p>
              </div>
            </div>

            {/* Related Courses */}
            {relatedCourses.length > 0 && (
              <div className="mt-16">
                <p className="text-[10px] font-black uppercase tracking-[0.4em] text-black mb-6 pb-4 border-b-2 border-black/5">
                  Relevant Courses at Instudia
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {relatedCourses.map((course) => (
                    <Link
                      key={course.slug}
                      href={`/courses/${course.slug}`}
                      className="group flex flex-col gap-2 p-5 border-2 border-black bg-white hover:bg-black transition-colors shadow-[4px_4px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-1 hover:translate-y-1"
                    >
                      <span className="text-[9px] font-black uppercase tracking-widest text-black/40 group-hover:text-white/60">
                        {course.category}
                      </span>
                      <span className="text-sm font-black text-black uppercase tracking-tight group-hover:text-white leading-tight">
                        {course.fullTitle}
                      </span>
                      <span className="text-[10px] font-bold text-brandpurple group-hover:text-[#FFE01B] mt-1">
                        Explore Course →
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Post CTA */}
            <div className="mt-32 p-10 sm:p-20 border-2 border-black bg-white shadow-[12px_12px_0px_#C21BFF] text-center sm:text-left relative overflow-hidden group">
              <div className="relative z-10">
                <span className="text-[10px] font-black text-white bg-black px-3 py-1 uppercase tracking-widest mb-6 inline-block">
                  Right time to
                </span>
                <h2 className="text-4xl sm:text-6xl font-black text-black leading-[0.9] uppercase tracking-tighter mb-8">
                  Turn Learning into <br />
                  <span className="text-white [-webkit-text-stroke:3.5px_black]" style={{ paintOrder: 'stroke fill' }}>A Career.</span>
                </h2>
                <div className="flex flex-wrap gap-6">
                  <Link href="/courses" className="px-10 py-5 bg-black text-white text-xs font-black uppercase tracking-widest hover:bg-[#C21BFF] transition-all shadow-[6px_6px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-[6px] hover:translate-y-[6px]">
                    Explore Courses
                  </Link>
                  <Link href="/contact" className="px-10 py-5 bg-white border-2 border-black text-black text-xs font-black uppercase tracking-widest hover:bg-neutral-50 transition-all shadow-[6px_6px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-[6px] hover:translate-y-[6px]">
                    Get in Touch
                  </Link>
                </div>
              </div>
            </div>
          </article>

          {/* Sticky Swiss TOC Sidebar */}
          <aside className="lg:col-span-4 order-1 lg:order-2">
            <div className="sticky top-32 space-y-10">
              <div className="border-2 border-black bg-white p-8 shadow-[6px_6px_0px_rgba(0,0,0,1)]">
                <p className="text-[10px] font-black uppercase tracking-[0.4em] text-black mb-8 pb-4 border-b-2 border-black/5">
                  Table of Content
                </p>
                <ol className="space-y-4">
                  {tocItems.map((item, i) => (
                    <li key={item.id}>
                      <a href={`#${item.id}`} className="group flex items-start gap-4 hover:translate-x-2 transition-transform duration-300">
                        <span className="text-[10px] font-black opacity-30 mt-1">{String(i + 1).padStart(2, '0')}</span>
                        <span className="text-xs font-bold uppercase text-black group-hover:text-[#C21BFF] transition-colors leading-tight">
                          {item.label}
                        </span>
                      </a>
                    </li>
                  ))}
                </ol>
              </div>

              <div className="border-2 border-black bg-white p-8 shadow-[6px_6px_0px_#FF1B58]">
                <p className="text-[10px] font-black uppercase tracking-[0.4em] text-black mb-4">
                  Share on socials
                </p>
                <div className="flex gap-4">
                  {['Twitter', 'LinkedIn'].map(platform => (
                    <button key={platform} className="flex-1 border-2 border-black px-4 py-3 text-[10px] font-black uppercase hover:bg-black hover:text-white transition-all shadow-[2px_2px_0px_rgba(0,0,0,1)]">
                      {platform}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </aside>

        </div>
      </Container>
    </main>
  );
}
