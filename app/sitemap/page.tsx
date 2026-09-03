import React from 'react';
import Link from 'next/link';
import { Container } from '../components/atom/Container';
import { BreadcrumbSchema } from '../components/SchemaOrg/BreadcrumbSchema';
import { SITE_URL, canonicalFor } from '@/lib/site';
import coursesData from '../courses.json';
import { posts, formatDate } from '../data/posts';
import { staff } from '../data/staff';

export default function SitemapPage() {
  // Group courses by category
  const coursesByCategory: Record<string, typeof coursesData.courses> = {};
  (coursesData.courses || []).forEach((course) => {
    const cat = course.category || 'General';
    if (!coursesByCategory[cat]) coursesByCategory[cat] = [];
    coursesByCategory[cat].push(course);
  });

  // Group blog posts by category
  const postsByCategory: Record<string, typeof posts> = {};
  posts.forEach((post) => {
    const cat = post.category || 'Insights';
    if (!postsByCategory[cat]) postsByCategory[cat] = [];
    postsByCategory[cat].push(post);
  });

  const toolsList = [
    {
      name: 'Nagaland Career Guide',
      href: '/tools/career-guide',
      desc: 'Interactive roadmap to high-impact careers and in-demand skills in Nagaland.',
    },
    {
      name: 'AI Career Blueprint',
      href: '/tools/career-blueprint',
      desc: 'Discover your career path and bridge the gap to your dream tech roles.',
    },
    {
      name: 'Student Career Planner',
      href: '/tools/career-planner',
      desc: 'Milestone tracking and skill planning dashboard for aspiring technologists.',
    },
    {
      name: 'ATS Resume Scanner',
      href: '/tools/ats-analyzer',
      desc: 'Scan your CV against modern Applicant Tracking Systems to optimize keywords.',
    },
    {
      name: 'Nagaland Tech Salary Insights',
      href: '/tools/salary-insights',
      desc: 'Salary benchmarks and compensation data for local and remote IT roles.',
    },
    {
      name: 'Interactive Study Planner',
      href: '/tools/study-planner',
      desc: 'Print-ready study timetables with Pomodoro blocks and exam tracking.',
    },
    {
      name: 'AI Assessment Designer',
      href: '/tools/assessment-designer',
      desc: 'High-quality assessment and test generation for CBSE, ICSE, and educators.',
    },
    {
      name: 'Pedagogical Assistant',
      href: '/tools/lecture-note-generator',
      desc: 'Transform textbooks into structured, guided lecture notes and lesson plans.',
    },
    {
      name: 'AI Resume Builder',
      href: '/tools/resume-builder',
      desc: 'Create professional, ATS-optimized resumes with AI content suggestions.',
    },
    {
      name: 'Interactive Flashcards',
      href: '/tools/flashcards',
      desc: 'Active recall spaced repetition decks with markdown flashcard creation.',
    },
  ];

  const mainPages = [
    { name: 'Home', href: '/', desc: 'Premier computer training & skill development institute in Dimapur.' },
    { name: 'All Courses', href: '/courses', desc: '19+ practical computer courses from DCA to Fullstack Web Development.' },
    { name: 'Student Success Suite Tools', href: '/tools', desc: 'Free AI-powered study, resume, and career tools for students and teachers.' },
    { name: 'Tech & Career Insights Blog', href: '/blog', desc: 'Practical tutorials, programming guides, and local career insights.' },
    { name: 'About instudia', href: '/about', desc: 'Our mission, ISO certification, leadership, and vision for Nagaland.' },
    { name: 'Contact & Admissions', href: '/contact', desc: 'Campus location, phone, WhatsApp, and enrollment assistance.' },
    { name: 'Workshops & Bootcamps', href: '/workshops', desc: 'Hands-on practical workshops, coding camps, and awareness sessions.' },
    { name: 'Host a Seminar', href: '/host-a-seminar', desc: 'Invite instudia to deliver tech workshops at your school or college.' },
    { name: 'Student Success Stories', href: '/success-stories', desc: 'Verified outcomes and testimonials from our alumni in Dimapur.' },
    { name: 'Frequently Asked Questions', href: '/faq', desc: 'Clear answers on fees, timings, certificates, and placement support.' },
    { name: 'Campus Gallery', href: '/gallery', desc: 'Photos of our modern computer labs, student projects, and events.' },
    { name: 'Careers & Faculty Openings', href: '/careers', desc: 'Join our mission-driven teaching and technical team in Dimapur.' },
    { name: 'Staff & Faculty Directory', href: '/card', desc: 'Meet our leadership team and access digital visiting cards.' },
  ];

  const legalPages = [
    { name: 'Privacy Policy', href: '/privacy-policy', desc: 'How we respect and safeguard your personal information.' },
    { name: 'Terms of Service', href: '/terms', desc: 'Guidelines and conditions for using instudia websites and services.' },
    { name: 'Cookie Policy', href: '/cookie-policy', desc: 'Information about cookie usage and browsing preferences.' },
  ];

  return (
    <main className="bg-[#FAFAFA] min-h-screen pb-32">
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: canonicalFor('/') },
          { name: 'Sitemap', url: canonicalFor('/sitemap') },
        ]}
      />

      {/* Swiss Editorial Header */}
      <section className="relative pt-32 pb-20 border-b-2 border-black/5 bg-white overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage:
              'linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }}
        />

        <Container className="relative z-10">
          <div className="flex items-center gap-4 mb-8">
            <span className="text-[10px] font-black text-white bg-black px-3 py-1 uppercase tracking-widest">
              Index
            </span>
            <span className="text-[10px] font-black tracking-[0.4em] text-black uppercase">
              Full Site Directory
            </span>
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-8xl font-black tracking-[-0.04em] text-black leading-[0.95] uppercase mb-8">
            Complete <br />
            <span
              className="text-white [-webkit-text-stroke:2px_black] sm:[-webkit-text-stroke:4px_black]"
              style={{ paintOrder: 'stroke fill' }}
            >
              Sitemap.
            </span>
          </h1>

          <p className="text-base sm:text-lg font-bold text-black max-w-2xl leading-relaxed uppercase opacity-75">
            A comprehensive, structured index of all {coursesData.courses.length} courses,{' '}
            {toolsList.length} free student tools, {posts.length} technical tutorials, and institutional pages.
          </p>
        </Container>
      </section>

      <Container className="pt-16 space-y-20">
        {/* Section 1: Main Pages */}
        <section className="bg-white border-2 border-black p-8 sm:p-12 shadow-[8px_8px_0px_#FFE01B]">
          <div className="flex items-center gap-4 mb-8 pb-4 border-b-2 border-black">
            <span className="text-xs font-black bg-black text-white px-3 py-1 uppercase tracking-widest">
              01
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-black uppercase tracking-tight">
              Core &amp; Institutional Pages
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mainPages.map((page) => (
              <Link
                key={page.href}
                href={page.href}
                className="group p-5 border-2 border-black bg-white hover:bg-neutral-50 transition-all shadow-[4px_4px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-1 hover:translate-y-1 flex flex-col justify-between"
              >
                <div>
                  <h3 className="text-base font-black text-black uppercase tracking-tight group-hover:text-brandpurple transition-colors">
                    {page.name}
                  </h3>
                  <p className="text-xs font-medium text-black/70 mt-2 leading-relaxed">
                    {page.desc}
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-black/10 flex items-center justify-between text-[10px] font-black text-brandpurple uppercase tracking-widest">
                  <span>Visit Page</span>
                  <span className="group-hover:translate-x-1 transition-transform">→</span>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Section 2: Courses Catalog */}
        <section className="bg-white border-2 border-black p-8 sm:p-12 shadow-[8px_8px_0px_#C21BFF]">
          <div className="flex items-center gap-4 mb-8 pb-4 border-b-2 border-black">
            <span className="text-xs font-black bg-black text-white px-3 py-1 uppercase tracking-widest">
              02
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-black uppercase tracking-tight">
              Computer Courses ({coursesData.courses.length} Programs)
            </h2>
          </div>

          <div className="space-y-10">
            {Object.entries(coursesByCategory).map(([category, courseItems]) => (
              <div key={category}>
                <h3 className="text-xs font-black text-brandpurple uppercase tracking-[0.3em] mb-4 pb-2 border-b border-black/10">
                  {category}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {courseItems.map((course) => (
                    <Link
                      key={course.slug}
                      href={`/courses/${course.slug}`}
                      className="group p-5 border-2 border-black bg-white hover:bg-neutral-50 transition-all shadow-[4px_4px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-1 hover:translate-y-1 flex flex-col justify-between"
                    >
                      <div>
                        <h4 className="text-sm font-black text-black uppercase tracking-tight group-hover:text-[#C21BFF] transition-colors leading-tight">
                          {course.fullTitle}
                        </h4>
                        <p className="text-xs font-medium text-black/70 mt-2 line-clamp-2 leading-relaxed">
                          {course.courseHightlight || course.courseHighlight || `Hands-on training in ${course.fullTitle} at instudia Dimapur.`}
                        </p>
                      </div>
                      <div className="mt-4 pt-3 border-t border-black/10 flex items-center justify-between text-[10px] font-black text-[#C21BFF] uppercase tracking-widest">
                        <span>Course Details</span>
                        <span className="group-hover:translate-x-1 transition-transform">→</span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Section 3: Student & Teacher Tools */}
        <section className="bg-white border-2 border-black p-8 sm:p-12 shadow-[8px_8px_0px_#58FF1B]">
          <div className="flex items-center gap-4 mb-8 pb-4 border-b-2 border-black">
            <span className="text-xs font-black bg-black text-white px-3 py-1 uppercase tracking-widest">
              03
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-black uppercase tracking-tight">
              Student Success Suite ({toolsList.length} Free Tools)
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {toolsList.map((tool) => (
              <Link
                key={tool.href}
                href={tool.href}
                className="group p-5 border-2 border-black bg-white hover:bg-neutral-50 transition-all shadow-[4px_4px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-1 hover:translate-y-1 flex flex-col justify-between"
              >
                <div>
                  <h3 className="text-base font-black text-black uppercase tracking-tight group-hover:text-emerald-700 transition-colors">
                    {tool.name}
                  </h3>
                  <p className="text-xs font-medium text-black/70 mt-2 leading-relaxed">
                    {tool.desc}
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-black/10 flex items-center justify-between text-[10px] font-black text-emerald-700 uppercase tracking-widest">
                  <span>Launch Tool</span>
                  <span className="group-hover:translate-x-1 transition-transform">→</span>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Section 4: Technical Articles & Blog Posts */}
        <section className="bg-white border-2 border-black p-8 sm:p-12 shadow-[8px_8px_0px_#FF1B58]">
          <div className="flex items-center gap-4 mb-8 pb-4 border-b-2 border-black">
            <span className="text-xs font-black bg-black text-white px-3 py-1 uppercase tracking-widest">
              04
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-black uppercase tracking-tight">
              Technical Blog &amp; Guides ({posts.length} Articles)
            </h2>
          </div>

          <div className="space-y-10">
            {Object.entries(postsByCategory).map(([category, postItems]) => (
              <div key={category}>
                <h3 className="text-xs font-black text-[#FF1B58] uppercase tracking-[0.3em] mb-4 pb-2 border-b border-black/10">
                  {category} ({postItems.length})
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {postItems.map((post) => (
                    <Link
                      key={post.slug}
                      href={`/blog/${post.slug}`}
                      className="group p-5 border-2 border-black bg-white hover:bg-neutral-50 transition-all shadow-[4px_4px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-1 hover:translate-y-1 flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex items-center justify-between text-[9px] font-bold text-black/50 uppercase tracking-wider mb-2">
                          <span>{post.readTime}</span>
                          <span>{formatDate(post.date)}</span>
                        </div>
                        <h4 className="text-sm font-black text-black uppercase tracking-tight group-hover:text-[#FF1B58] transition-colors leading-snug line-clamp-2">
                          {post.title}
                        </h4>
                        <p className="text-xs font-medium text-black/70 mt-2 line-clamp-2 leading-relaxed">
                          {post.excerpt}
                        </p>
                      </div>
                      <div className="mt-4 pt-3 border-t border-black/10 flex items-center justify-between text-[10px] font-black text-[#FF1B58] uppercase tracking-widest">
                        <span>Read Article</span>
                        <span className="group-hover:translate-x-1 transition-transform">→</span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Section 5: Staff Directory */}
        <section className="bg-white border-2 border-black p-8 sm:p-12 shadow-[8px_8px_0px_#FFE01B]">
          <div className="flex items-center gap-4 mb-8 pb-4 border-b-2 border-black">
            <span className="text-xs font-black bg-black text-white px-3 py-1 uppercase tracking-widest">
              05
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-black uppercase tracking-tight">
              Faculty &amp; Staff Digital Cards
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {staff.map((member) => (
              <Link
                key={member.slug}
                href={`/card/${member.slug}`}
                className="group p-5 border-2 border-black bg-white hover:bg-neutral-50 transition-all shadow-[4px_4px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-1 hover:translate-y-1 flex flex-col justify-between text-center"
              >
                <div>
                  <div className="w-16 h-16 rounded-full border-2 border-black mx-auto mb-3 overflow-hidden bg-brandpurple/10 flex items-center justify-center font-black text-xl text-brandpurple">
                    {member.photo ? (
                      <img src={member.photo} alt={member.name} className="w-full h-full object-cover" />
                    ) : (
                      member.name.charAt(0)
                    )}
                  </div>
                  <h3 className="text-sm font-black text-black uppercase tracking-tight group-hover:text-brandpurple transition-colors">
                    {member.name}
                  </h3>
                  <p className="text-[10px] font-bold text-black/60 uppercase tracking-wider mt-1">
                    {member.designation}
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-black/10 text-[10px] font-black text-brandpurple uppercase tracking-widest">
                  View Card →
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Section 6: Legal & Policies */}
        <section className="bg-white border-2 border-black p-8 sm:p-12 shadow-[8px_8px_0px_rgba(0,0,0,1)]">
          <div className="flex items-center gap-4 mb-8 pb-4 border-b-2 border-black">
            <span className="text-xs font-black bg-black text-white px-3 py-1 uppercase tracking-widest">
              06
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-black uppercase tracking-tight">
              Legal &amp; Compliance
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {legalPages.map((page) => (
              <Link
                key={page.href}
                href={page.href}
                className="group p-5 border-2 border-black bg-white hover:bg-neutral-50 transition-all shadow-[4px_4px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-1 hover:translate-y-1 flex flex-col justify-between"
              >
                <div>
                  <h3 className="text-base font-black text-black uppercase tracking-tight group-hover:text-brandpurple transition-colors">
                    {page.name}
                  </h3>
                  <p className="text-xs font-medium text-black/70 mt-2 leading-relaxed">
                    {page.desc}
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-black/10 flex items-center justify-between text-[10px] font-black text-brandpurple uppercase tracking-widest">
                  <span>Read Policy</span>
                  <span className="group-hover:translate-x-1 transition-transform">→</span>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </Container>
    </main>
  );
}
