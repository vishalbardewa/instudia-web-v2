import { Metadata } from "next";
import { SITE_URL, canonicalFor } from "@/lib/site";
import SalaryDashboard from "../../components/organisms/SalaryDashboard";

export const metadata: Metadata = {
  title: "Tech Salary Insights in Nagaland",
  description: "Explore competitive salary benchmarks, local job pay bands & remote compensation data for IT and design professionals across Nagaland.",
  alternates: { canonical: canonicalFor("/tools/salary-insights") },
  metadataBase: new URL(SITE_URL),
};

export default function SalaryInsightsPage() {
  return (
    <main className="bg-white min-h-screen">
      {/* Premium Hero */}
      <section className="relative pt-24 pb-16 md:pt-32 md:pb-24 overflow-hidden border-b border-neutral-100">
        <div className="absolute inset-0 bg-brandpurple/5 mask-image:linear-gradient(to_bottom,white,transparent)"></div>
        <div className="mx-auto max-w-7xl px-6 lg:px-8 relative z-10 text-center">
          <p className="inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-widest text-brandpurple mb-6 px-3 py-1 rounded-full bg-brandpurple/10 border border-brandpurple/20">
            <span className="flex h-1.5 w-1.5 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brandpurple opacity-75"></span>
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-brandpurple"></span>
            </span>
            Salary Insights
          </p>
          <h1 className="text-4xl md:text-6xl font-black tracking-tight text-[#1B1C1E] max-w-4xl mx-auto leading-tight">
            Discover your earning potential in <span className="text-brandpurple">Nagaland's</span> tech ecosystem
          </h1>
          <p className="mt-6 text-lg md:text-xl text-gray-500 max-w-2xl mx-auto">
            Explore realistic salary ranges for local opportunities in Dimapur and Kohima, or see how much you can earn working remotely for national companies.
          </p>
        </div>
      </section>

      {/* Dashboard Component */}
      <section className="mx-auto max-w-7xl px-6 lg:px-8 py-16 md:py-24">
        <SalaryDashboard />
      </section>
    </main>
  );
}
