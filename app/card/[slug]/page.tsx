import { notFound } from "next/navigation";
import { getStaffBySlug, staff } from "@/app/data/staff";
import { Metadata } from "next";
import CardActions from "./CardActions";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const member = getStaffBySlug(slug);
  if (!member) return { title: "Card Not Found" };

  return {
    title: `${member.name} — ${member.designation} at instudia`,
    description: member.bio ?? `Connect with ${member.name}, ${member.designation} at instudia, Dimapur, Nagaland.`,
    openGraph: {
      title: `${member.name} — instudia`,
      description: member.bio,
      images: member.photo ? [{ url: member.photo }] : [],
    },
    alternates: {
      canonical: `https://www.instudianagaland.com/card/${slug}`,
    },
  };
}

export function generateStaticParams() {
  return staff.map((s) => ({ slug: s.slug }));
}

const departmentColors: Record<string, { bg: string; text: string; dot: string }> = {
  Management: { bg: "bg-brandpurple/10", text: "text-brandpurple", dot: "bg-brandpurple" },
  Academics: { bg: "bg-brightyellow/10", text: "text-[#1B1C1E]", dot: "bg-brightyellow" },
  Technology: { bg: "bg-flourescent/10", text: "text-[#1B1C1E]", dot: "bg-flourescent" },
  Marketing: { bg: "bg-redhue/10", text: "text-redhue", dot: "bg-redhue" },
};

export default async function CardPage({ params }: Props) {
  const { slug } = await params;
  const member = getStaffBySlug(slug);
  if (!member) notFound();

  const colors = departmentColors[member.department] ?? {
    bg: "bg-brandpurple/10",
    text: "text-brandpurple",
    dot: "bg-brandpurple",
  };

  const cardUrl = `https://www.instudianagaland.com/card/${member.slug}`;
  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?data=${encodeURIComponent(cardUrl)}&size=180x180&bgcolor=ffffff&color=1B1C1E&qzone=2&format=svg`;

  return (
    <main className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-16 sm:py-24 relative overflow-hidden">
      {/* Ambient blobs */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-brandpurple/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-brightyellow/8 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative w-full max-w-2xl">
        {/* Card */}
        <div className="rounded-[2.5rem] bg-white border border-neutral-200/80 shadow-[0_20px_80px_rgb(0,0,0,0.06)] overflow-hidden">
          {/* Header stripe */}
          <div className="h-2 bg-gradient-to-r from-brandpurple via-fuchsia-400 to-brightyellow" />

          <div className="p-8 sm:p-12">
            <div className="flex flex-col sm:flex-row gap-8 sm:gap-12 items-center sm:items-start">
              {/* Photo */}
              <div className="flex-shrink-0">
                {member.photo ? (
                  <img
                    src={member.photo}
                    alt={member.name}
                    className="w-28 h-28 sm:w-36 sm:h-36 rounded-[1.5rem] object-cover shadow-xl ring-4 ring-white"
                  />
                ) : (
                  <div className="w-28 h-28 sm:w-36 sm:h-36 rounded-[1.5rem] bg-brandpurple/10 flex items-center justify-center text-4xl font-black text-brandpurple">
                    {member.name.charAt(0)}
                  </div>
                )}
              </div>

              {/* Identity */}
              <div className="flex-1 text-center sm:text-left">
                {/* Department tag */}
                <div className="inline-flex items-center gap-2 mb-4">
                  <span className={`w-2 h-2 rounded-full ${colors.dot}`} />
                  <span className={`text-[10px] font-extrabold uppercase tracking-[0.2em] ${colors.text}`}>
                    {member.department}
                  </span>
                </div>

                <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-[#1B1C1E] leading-tight">
                  {member.name}
                </h1>
                <p className="mt-1 text-base font-semibold text-gray-500">
                  {member.designation}
                </p>

                {member.bio && (
                  <p className="mt-4 text-sm text-gray-500 leading-relaxed max-w-sm">
                    {member.bio}
                  </p>
                )}

                <CardActions slug={member.slug} name={member.name} />
              </div>
            </div>

            {/* Divider */}
            <div className="my-8 border-t border-neutral-100" />

            {/* Contact details + QR */}
            <div className="flex flex-col sm:flex-row gap-8 items-start">
              <div className="flex-1 space-y-4">
                <h2 className="text-xs font-extrabold uppercase tracking-[0.15em] text-gray-400">
                  Contact
                </h2>

                <a
                  href={`tel:${member.phone.replace(/\s|-/g, "")}`}
                  className="flex items-center gap-3 group"
                >
                  <div className="w-10 h-10 rounded-xl bg-brandpurple/8 flex items-center justify-center flex-shrink-0 group-hover:bg-brandpurple/15 transition-colors">
                    <svg className="w-5 h-5 text-brandpurple" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <span className="text-sm font-semibold text-[#1B1C1E] group-hover:text-brandpurple transition-colors">
                    {member.phone}
                  </span>
                </a>

                <a
                  href={`mailto:${member.email}`}
                  className="flex items-center gap-3 group"
                >
                  <div className="w-10 h-10 rounded-xl bg-brandpurple/8 flex items-center justify-center flex-shrink-0 group-hover:bg-brandpurple/15 transition-colors">
                    <svg className="w-5 h-5 text-brandpurple" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <span className="text-sm font-semibold text-[#1B1C1E] group-hover:text-brandpurple transition-colors break-all">
                    {member.email}
                  </span>
                </a>

                {member.linkedin && (
                  <a
                    href={member.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 group"
                  >
                    <div className="w-10 h-10 rounded-xl bg-brandpurple/8 flex items-center justify-center flex-shrink-0 group-hover:bg-brandpurple/15 transition-colors">
                      <svg className="w-5 h-5 text-brandpurple" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                      </svg>
                    </div>
                    <span className="text-sm font-semibold text-[#1B1C1E] group-hover:text-brandpurple transition-colors">
                      LinkedIn
                    </span>
                  </a>
                )}

                {/* Org info */}
                <div className="pt-2 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-brandpurple/10 flex items-center justify-center flex-shrink-0 text-brandpurple font-black text-sm">
                    i
                  </div>
                  <div>
                    <p className="text-xs font-extrabold text-[#1B1C1E]">instudia</p>
                    <p className="text-xs text-gray-400">Fellowship Colony, Dimapur</p>
                  </div>
                </div>
              </div>

              {/* QR Code */}
              <div className="flex-shrink-0 flex flex-col items-center gap-2">
                <div className="rounded-2xl border border-neutral-100 p-3 bg-white shadow-sm">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={qrUrl}
                    alt={`QR code for ${member.name}'s digital card`}
                    width={120}
                    height={120}
                    className="rounded-xl"
                  />
                </div>
                <p className="text-[10px] text-gray-400 font-semibold uppercase tracking-widest">
                  Scan to connect
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer branding */}
        <p className="text-center mt-6 text-xs text-gray-400">
          Digital card by{" "}
          <a
            href="https://www.instudianagaland.com"
            className="font-semibold text-brandpurple hover:underline"
          >
            instudia
          </a>
        </p>
      </div>
    </main>
  );
}
