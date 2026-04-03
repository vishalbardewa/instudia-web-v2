import Link from "next/link";
import { Metadata } from "next";
import MemoryMatchGame from "./components/organisms/MemoryMatchGame";

export const metadata: Metadata = {
  title: "404 - Page Not Found",
  description: "The page you are looking for does not exist.",
};

export default function NotFound() {
  return (
    <main className="min-h-screen bg-[#fdfdfd] bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] font-mono flex py-16 px-6 relative overflow-hidden items-center justify-center text-black">

      <div className="w-full max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center relative z-10">

        {/* Terminal Output Section */}
        <div className="text-left space-y-6 max-w-xl mx-auto items-center justify-center lg:mx-0 p-8 bg-white border-4 border-black rounded-xl shadow-[8px_8px_0_0_rgba(0,0,0,1)]">
          <div className="flex gap-2 mb-6">
            <div className="w-4 h-4 rounded-full bg-red-500 border-2 border-black" />
            <div className="w-4 h-4 rounded-full bg-yellow-400 border-2 border-black" />
            <div className="w-4 h-4 rounded-full bg-green-500 border-2 border-black" />
          </div>

          <div className="space-y-2">
            <div className="inline-block bg-black text-white text-xs px-3 py-1 font-bold uppercase mb-4 shadow-[4px_4px_0_0_#9ca3af]">
              SYSTEM FAIL // v4.0.4 <span className="animate-pulse">_</span>
            </div>

            <h1 className="text-6xl md:text-7xl font-black tracking-tight text-black leading-none mb-6">
              ERROR
              <span className="block text-brandpurple">404</span>
            </h1>

            <div className="text-sm md:text-base text-gray-800 space-y-2 font-bold bg-[#58FF1B]/20 p-4 border-2 border-black border-dashed">
              <p><span className="text-brandpurple">{`>`}</span> WARNING: Route annihilated.</p>
              <p><span className="text-brandpurple">{`>`}</span> STATUS: Process quarantined.</p>
              <p><span className="text-brandpurple">{`>`}</span> EXECUTING: `memory_match.exe`...</p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch gap-4 pt-4">
            <Link
              href="/"
              className="group inline-flex items-center justify-center gap-2 text-sm font-black uppercase text-white bg-black border-4 border-black hover:bg-gray-800 hover:-translate-y-1 px-5 py-3 transition-transform shadow-[4px_4px_0_0_rgba(0,0,0,0.5)]"
            >
              ./return_home
            </Link>
            <Link
              href="/courses"
              className="group inline-flex items-center justify-center gap-2 text-sm font-black uppercase text-black bg-white border-4 border-black hover:bg-gray-100 hover:-translate-y-1 px-5 py-3 transition-transform shadow-[4px_4px_0_0_rgba(0,0,0,1)]"
            >
              ./cd_courses
            </Link>
          </div>
        </div>

        {/* Game Section */}
        <div className="w-full relative">
          {/* Decorative neo-brutalist stars/shapes could go here */}
          <MemoryMatchGame />
        </div>

      </div>
    </main>
  );
}
