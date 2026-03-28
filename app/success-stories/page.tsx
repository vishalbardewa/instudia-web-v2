import { Metadata } from "next";
import { TESTIMONIALS } from "../data/testimonials";

export const metadata: Metadata = {
  title: "Student Success Stories | Instudia",
  description: "Read inspiring stories from Instudia alumni who transformed their careers and landed jobs as Developers, Designers, and Marketers.",
  alternates: { canonical: "https://www.instudianagaland.com/success-stories" },
};

export default function SuccessStoriesPage() {
  return (
    <main className="bg-gray-50 min-h-screen">
      {/* Premium Dark Hero */}
      <section className="relative pt-24 pb-16 md:pt-32 md:pb-24 overflow-hidden border-b border-neutral-100 bg-[#1B1C1E]">
        <div className="absolute inset-0 bg-brandpurple/10 mask-image:linear-gradient(to_bottom,black,transparent)"></div>
        <div className="mx-auto max-w-7xl px-6 lg:px-8 relative z-10 text-center text-white">
          <p className="inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-widest text-[#FFE01B] mb-6 px-3 py-1 rounded-full bg-[#FFE01B]/10 border border-[#FFE01B]/20">
            <span className="flex h-1.5 w-1.5 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FFE01B] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[#FFE01B]"></span>
            </span>
            Real Outcomes
          </p>
          <h1 className="text-4xl md:text-6xl font-black tracking-tight max-w-4xl mx-auto leading-tight">
            From Beginners to <span className="text-brandpurple drop-shadow-lg">Professionals.</span>
          </h1>
          <p className="mt-6 text-lg md:text-xl text-gray-400 max-w-2xl mx-auto">
            Meet the driven individuals who trusted Instudia to upskill and launch their careers in Nagaland and beyond.
          </p>
        </div>
      </section>

      {/* Main Video Placeholder (Crucial for high conversion) */}
      <section className="mx-auto max-w-7xl px-6 lg:px-8 py-16 -mt-16 relative z-20">
        <div className="relative w-full max-w-4xl mx-auto aspect-video bg-black rounded-3xl overflow-hidden shadow-2xl flex items-center justify-center group cursor-pointer border border-neutral-800">
          <img 
            src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070&auto=format&fit=crop" 
            alt="Students collaborating" 
            className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-40 transition-opacity duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
          
          <div className="relative z-10 flex flex-col items-center">
            <div className="w-20 h-20 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-500 shadow-xl border border-white/30">
              <svg className="w-8 h-8 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
            <p className="mt-4 text-white font-bold tracking-wide drop-shadow-md">Watch our Alumni Journey</p>
            <p className="text-sm text-gray-300 italic opacity-70">*Video placeholder</p>
          </div>
        </div>
      </section>

      {/* Testimonials Masonry / Grid */}
      <section className="mx-auto max-w-7xl px-6 lg:px-8 pb-24">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-black text-[#1B1C1E]">
            Verified Success Stories
          </h2>
          <div className="w-24 h-1 bg-brandpurple mx-auto mt-6 rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {TESTIMONIALS.map((testimonial) => (
            <div key={testimonial.id} className="bg-white rounded-3xl p-8 border border-neutral-100 shadow-xl shadow-gray-100/50 hover:-translate-y-2 transition-transform duration-300 flex flex-col h-full">
              {/* Quote marks */}
              <svg className="w-10 h-10 text-brandpurple/20 mb-4" fill="currentColor" viewBox="0 0 32 32">
                <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
              </svg>
              
              <blockquote className="text-gray-600 italic leading-relaxed mb-8 flex-grow">
                "{testimonial.quote}"
              </blockquote>
              
              <div className="flex items-center gap-4 mt-auto pt-6 border-t border-neutral-50">
                <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-brandpurple/20 bg-gray-100 flex-shrink-0">
                  <img src={testimonial.image} alt={testimonial.name} className="w-full h-full object-cover" />
                </div>
                <div>
                  <h4 className="font-extrabold text-[#1B1C1E]">{testimonial.name}</h4>
                  <div className="flex flex-col text-sm mt-0.5">
                    <span className="text-gray-400 line-through decoration-red-400/50">{testimonial.beforeCourse}</span>
                    <span className="font-bold text-brandpurple">{testimonial.afterCourse}</span>
                    <span className="text-xs text-gray-500 font-medium mt-0.5">@ {testimonial.company}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="bg-brandpurple py-20 text-center px-6">
        <h2 className="text-3xl md:text-5xl font-black text-white mb-6">You're next.</h2>
        <p className="text-brandpurple-100 text-lg max-w-xl mx-auto mb-10 text-white/80">
          Join hundreds of students who have upgraded their skills and launched new careers with Instudia.
        </p>
        <a 
          href="/enroll" 
          className="inline-flex items-center justify-center px-8 py-4 bg-white text-brandpurple font-black rounded-xl hover:bg-gray-50 hover:scale-105 transition-all shadow-xl shadow-black/10"
        >
          Enroll Now
        </a>
      </section>
    </main>
  );
}
