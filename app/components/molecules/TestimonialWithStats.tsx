import React from "react";
import { FadeIn, FadeInStagger } from "../atom/FadeIn";

export default function TestimonialWithStats() {
  return (
    <FadeInStagger>
      <FadeIn>
        <section className="relative bg-white overflow-hidden py-20 sm:py-28">
          {/* Background accent blob */}
          <div className="absolute -top-40 -left-20 w-[500px] h-[500px] bg-brandpurple/5 rounded-full blur-[100px] pointer-events-none" />

          <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">

              {/* Left: Image Card */}
              <div className="relative">
                <div className="relative overflow-hidden rounded-[2.5rem] shadow-2xl aspect-[4/3] lg:aspect-[3/4]">
                  <img
                    className="absolute inset-0 h-full w-full object-cover"
                    src="https://images.unsplash.com/photo-1543269664-647163ef2ee4?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    alt="Students at Instudia learning tech skills in Dimapur"
                  />
                  {/* Dark overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1B1C1E] via-[#1B1C1E]/40 to-transparent" />

                  {/* Blockquote overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-8">
                    <blockquote>
                      <svg className="h-7 w-7 text-brandpurple mb-3 opacity-80" fill="currentColor" viewBox="0 0 32 32" aria-hidden="true">
                        <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
                      </svg>
                      <p className="text-white text-base font-light leading-relaxed">
                        Education is the key to unlocking potential and creating opportunities for a better future. Join us today!
                      </p>
                      <footer className="mt-4">
                        <p className="text-sm font-bold text-brightyellow">
                          Elevate your skills, elevate your future — instudia
                        </p>
                      </footer>
                    </blockquote>
                  </div>
                </div>

                {/* Floating accent badge */}
                <div className="absolute -top-5 -right-5 w-24 h-24 bg-brandpurple/10 rounded-full blur-2xl pointer-events-none" />
                <div className="absolute -bottom-4 -left-4 w-48 h-48 bg-[#FFE01B]/10 rounded-full blur-3xl pointer-events-none" />
              </div>

              {/* Right: Content */}
              <div className="flex flex-col gap-8">
                <div>
                  <p className="text-xs font-extrabold tracking-[0.2em] text-brandpurple uppercase mb-4">Our Mission</p>
                  <h2 className="text-4xl sm:text-5xl font-black tracking-tight text-[#1B1C1E] leading-tight">
                    Driven by Ambition,{' '}
                    <span className="block text-brandpurple">Growth by Skills</span>
                  </h2>
                </div>

                <div className="space-y-5 text-gray-600">
                  <p className="text-lg leading-8 font-medium">
                    Our mission is to empower unemployed and unskilled youth with industry-specific courses that will impact their lives and open up new job opportunities.
                  </p>
                  <p className="text-base leading-7">
                    Our institute offers a wide range of computer courses designed to prepare students for success in today&apos;s job market — from web development and graphic design to data analysis and more.
                  </p>
                </div>

                {/* Inline stat chips */}
                <div className="flex flex-wrap gap-3 pt-2">
                  {[
                    { label: 'Students trained', value: '1,000+' },
                    { label: 'Courses offered', value: '19+' },
                    { label: 'Years of experience', value: '14+' },
                  ].map((s) => (
                    <div key={s.label} className="flex flex-col items-start rounded-2xl border border-neutral-200 bg-white px-5 py-4 shadow-sm">
                      <span className="text-2xl font-black text-[#1B1C1E]">{s.value}</span>
                      <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider mt-0.5">{s.label}</span>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>
        </section>
      </FadeIn>
    </FadeInStagger>
  );
}
