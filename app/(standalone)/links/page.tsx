import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Links & Resources",
  description:
    "Quick access to instudia's courses, AI career tools, and community links for students in Dimapur, Nagaland.",
  alternates: {
    canonical: "/links",
  },
};

const primaryLinks = [
  {
    label: "🎓 Explore All Courses",
    sub: "19+ programs in tech, design & business",
    href: "/courses",
    style: "bg-brandpurple text-white hover:bg-brandpurple/90 shadow-lg shadow-brandpurple/20",
    arrow: true,
  },
  {
    label: "✨ Enroll Now",
    sub: "Join instudia — admissions open",
    href: "/contact",
    style: "bg-brightyellow text-[#1B1C1E] hover:bg-brightyellow/90 shadow-lg shadow-brightyellow/20",
    arrow: true,
  },
  {
    label: "🤖 AI Career Blueprint",
    sub: "Get a personalized tech career roadmap",
    href: "/tools/career-blueprint",
    style: "bg-white border border-brandpurple/30 text-[#1B1C1E] hover:border-brandpurple/60 hover:bg-brandpurple/5",
    badge: "NEW",
    arrow: true,
  },
  {
    label: "📄 ATS CV Scanner",
    sub: "Check your resume against any job description",
    href: "/tools/ats-analyzer",
    style: "bg-white border border-neutral-200 text-[#1B1C1E] hover:border-brandpurple/40 hover:bg-gray-50",
    badge: "NEW",
    arrow: true,
  },
  {
    label: "🗓 Upcoming Workshops",
    sub: "Live sessions, bootcamps & events",
    href: "/workshops",
    style: "bg-white border border-neutral-200 text-[#1B1C1E] hover:border-brandpurple/40 hover:bg-gray-50",
    arrow: true,
  },
  {
    label: "📍 Find Us in Dimapur",
    sub: "Fellowship Colony, Vikiye Center",
    href: "/contact",
    style: "bg-white border border-neutral-200 text-[#1B1C1E] hover:border-brandpurple/40 hover:bg-gray-50",
    arrow: true,
  },
  {
    label: "💬 Chat on WhatsApp",
    sub: "Quick enquiries & admissions",
    href: "https://wa.me/918798587779",
    style: "bg-[#25D366] text-white hover:bg-[#22be5c] shadow-lg shadow-green-400/20",
    arrow: true,
    external: true,
  },
];

const socials = [
  {
    label: "Instagram",
    href: "https://www.instagram.com/instudia_nagaland",
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
      </svg>
    ),
  },
  {
    label: "Facebook",
    href: "https://www.facebook.com/instudianagaland",
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
      </svg>
    ),
  },
  {
    label: "YouTube",
    href: "https://www.youtube.com/@instudia",
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/instudia-trainings",
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
];

export default function LinksPage() {
  return (
    <main className="min-h-screen bg-[#FAFAFA] flex items-start justify-center px-4 py-12 sm:py-20 relative overflow-hidden">
      {/* Background blobs */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[400px] h-[300px] rounded-full blur-[80px] pointer-events-none" />

      <div className="relative w-full max-w-sm sm:max-w-md">
        {/* Profile area */}
        <div className="text-center mb-8">
          <div className="relative inline-block mb-4">
            {/* Gradient ring */}
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-brandpurple via-fuchsia-400 to-brightyellow p-[3px] mx-auto shadow-xl shadow-brandpurple/20">
              <div className="w-full h-full rounded-full bg-white flex items-center justify-center overflow-hidden">
                <img
                  src="/assets/images/logo-with-tagline.png"
                  alt="instudia"
                  className="w-16 h-16 object-contain"
                />
              </div>
            </div>
            {/* Live dot */}
            <span className="absolute bottom-1 right-1 w-4 h-4 bg-flourescent rounded-full border-2 border-white" />
          </div>

          <h1 className="text-2xl font-black tracking-tight text-[#1B1C1E]">
            instudia
          </h1>
          <p className="mt-1 text-sm text-gray-500 font-medium">
            Tech & Skill Training · Dimapur, Nagaland 🇮🇳
          </p>
          <div className="flex items-center justify-center gap-2 mt-3">
            <span className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[11px] font-extrabold text-brandpurple uppercase tracking-widest">
              <span className="w-1.5 h-1.5 rounded-full bg-brandpurple animate-pulse" />
              Admissions Open
            </span>
          </div>
        </div>

        {/* Links */}
        <div className="flex flex-col gap-3">
          {primaryLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              target={link.external ? "_blank" : undefined}
              rel={link.external ? "noopener noreferrer" : undefined}
              className={`relative flex items-center gap-4 rounded-2xl px-5 py-4 font-bold text-sm transition-all duration-200 hover:-translate-y-0.5 active:scale-[0.98] ${link.style}`}
            >
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="truncate">{link.label}</span>
                  {link.badge && (
                    <span className="flex-shrink-0 text-[9px] font-extrabold uppercase tracking-widest bg-brandpurple text-white px-2 py-0.5 rounded-full">
                      {link.badge}
                    </span>
                  )}
                </div>
                {link.sub && (
                  <p className="text-[11px] font-normal opacity-60 mt-0.5 truncate">
                    {link.sub}
                  </p>
                )}
              </div>
              {link.arrow && (
                <svg
                  className="w-4 h-4 flex-shrink-0 opacity-60"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2.5}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              )}
            </Link>
          ))}
        </div>

        {/* Social icons */}
        <div className="mt-8 flex items-center justify-center gap-4">
          {socials.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={s.label}
              className="w-10 h-10 rounded-2xl bg-white border border-neutral-200 flex items-center justify-center text-gray-500 hover:text-brandpurple hover:border-brandpurple/30 hover:shadow-md transition-all duration-200 hover:-translate-y-0.5"
            >
              {s.icon}
            </a>
          ))}
        </div>

        {/* Footer */}
        <p className="text-center mt-8 text-[11px] text-gray-400">
          instudianagaland.com
        </p>
      </div>
    </main>
  );
}
