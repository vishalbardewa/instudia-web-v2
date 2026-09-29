import { staff } from "@/app/data/staff";
import { Metadata } from "next";
import Link from "next/link";
import { buildMetadata } from "@/lib/metadata";
import { canonicalFor } from "@/lib/site";

export const metadata: Metadata = buildMetadata({
  title: "Faculty & Leadership Team",
  description:
    "Meet the instudia leadership, faculty, and technical advisors shaping digital and tech careers in Dimapur, Nagaland.",
  path: "/card",
});

const departmentColors: Record<string, string> = {
  Management: "bg-brandpurple text-white",
  Academics: "bg-brightyellow text-[#1B1C1E]",
  Technology: "bg-flourescent text-[#1B1C1E]",
  Marketing: "bg-redhue text-white",
};

export default function StaffDirectory() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    name: "instudia Faculty and Leadership Team",
    description: "Meet the educators, mentors, and industry practitioners training students in computer applications, programming, and digital skills in Dimapur, Nagaland.",
    url: canonicalFor("/card"),
    mainEntity: {
      "@type": "ItemList",
      itemListElement: staff.map((member, index) => ({
        "@type": "ListItem",
        position: index + 1,
        item: {
          "@type": "Person",
          name: member.name,
          jobTitle: member.designation,
          worksFor: {
            "@type": "EducationalOrganization",
            name: "instudia",
            url: "https://www.instudianagaland.com",
          },
          url: canonicalFor(`/card/${member.slug}`),
        },
      })),
    },
  };

  return (
    <main className="relative min-h-screen bg-gray-50 overflow-hidden py-24 px-6">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-brandpurple/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative mx-auto max-w-6xl">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-xs font-extrabold tracking-[0.2em] text-brandpurple uppercase mb-4">
            instudia Team &amp; Faculty
          </p>
          <h1 className="text-5xl font-black tracking-tight text-[#1B1C1E]">
            Meet Our <span className="text-brandpurple">People</span>
          </h1>
          <p className="mt-4 text-base text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Our educators, technical mentors, and academic leadership bring decades of cumulative experience across software engineering, digital design, business accounting, and vocational education in Nagaland.
          </p>
        </div>

        {/* Staff Grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {staff.map((member) => (
            <Link
              key={member.slug}
              href={`/card/${member.slug}`}
              className="group relative flex flex-col rounded-[2rem] bg-white border border-neutral-200 overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300"
            >
              {/* Top accent bar */}
              <div className="h-1.5 bg-gradient-to-r from-brandpurple via-fuchsia-400 to-brightyellow" />

              <div className="p-7 flex items-center gap-5">
                {/* Photo */}
                {member.photo ? (
                  <img
                    src={member.photo}
                    alt={member.name}
                    className="w-16 h-16 rounded-2xl object-cover flex-shrink-0 shadow-md ring-2 ring-white"
                  />
                ) : (
                  <div className="w-16 h-16 rounded-2xl bg-brandpurple/10 flex items-center justify-center text-xl font-black text-brandpurple flex-shrink-0">
                    {member.name.charAt(0)}
                  </div>
                )}

                <div className="min-w-0">
                  <span
                    className={`inline-block text-[9px] font-extrabold uppercase tracking-widest px-2.5 py-0.5 rounded-full mb-2 ${departmentColors[member.department] ?? "bg-gray-100 text-gray-600"}`}
                  >
                    {member.department}
                  </span>
                  <h2 className="text-base font-black text-[#1B1C1E] leading-tight truncate">
                    {member.name}
                  </h2>
                  <p className="text-xs text-gray-500 mt-0.5">{member.designation}</p>
                </div>
              </div>

              {/* Footer row */}
              <div className="px-7 pb-6 mt-auto flex items-center justify-between">
                <span className="text-xs text-gray-400 truncate">{member.email}</span>
                <span className="text-xs font-extrabold text-brandpurple group-hover:gap-2 flex items-center gap-1 transition-all">
                  View card
                  <svg className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                  </svg>
                </span>
              </div>
            </Link>
          ))}
        </div>

        {/* Editorial Mentorship Section */}
        <section className="mt-20 bg-white rounded-[2rem] border border-neutral-200 p-8 sm:p-12 shadow-sm">
          <div className="max-w-3xl">
            <h2 className="text-2xl sm:text-3xl font-black text-[#1B1C1E] tracking-tight">
              Dedicated Mentorship for Real-World Tech Careers
            </h2>
            <p className="mt-4 text-base text-gray-600 leading-relaxed">
              At instudia, we believe that education is most impactful when taught by practitioners who build and solve problems daily. Every course curriculum across web development, data analysis, DCA, PGDCA, and Tally GST is curated directly by our instructors to reflect current industry benchmarks in India.
            </p>
            <p className="mt-4 text-base text-gray-600 leading-relaxed">
              Whether you are preparing for your first IT certification or upgrading skills for senior developer and analyst roles, our faculty provides one-on-one doubt clearance, project portfolio reviews, and career counseling.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/courses"
                className="px-6 py-3 bg-[#1B1C1E] hover:bg-neutral-800 text-white rounded-xl font-bold text-xs uppercase tracking-wider transition-all"
              >
                Explore Courses
              </Link>
              <Link
                href="/about"
                className="px-6 py-3 bg-neutral-100 hover:bg-neutral-200 text-[#1B1C1E] rounded-xl font-bold text-xs uppercase tracking-wider transition-all"
              >
                About instudia
              </Link>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
