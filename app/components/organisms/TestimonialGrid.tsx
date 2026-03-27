"use client";

import React, { useState, useEffect } from "react";
import { IconQuote, IconX } from "@tabler/icons-react";
import { motion, AnimatePresence } from "framer-motion";

const featuredTestimonial = {
  body: "I enrolled for DCA course and I wholeheartedly recommend Instudia to anyone ready to embrace growth and conquer new horizons! The platform’s dynamic range of courses empowers you to master skills that matter, while its vibrant, supportive community fuels your journey every step of the way. Whether you’re sharpening your expertise for the future or diving into bold challenges, Instudia is the ultimate launchpad for unlocking your potential.",
  author: {
    name: "Sentisenla",
    handle: "",
    imageUrl:
      "https://ik.imagekit.io/dxffek9yf/tr:fo-auto/landing-page/IMG-20240610-WA0035.jpg?updatedAt=1740029601907/tr:w-200,h-300,fo-auto",
    logoUrl: "https://tailwindui.com/img/logos/savvycal-logo-gray-900.svg",
  },
};

const testimonials = [
  [
    [
      {
        body: "The flexibility of the Diploma in Computer Applications class schedule was a game-changer, allowing me to balance learning with my personal commitments seamlessly. Incredibly supportive instructors, and inclusive empowerment, no matter your starting point, this program fuels growth!",
        author: {
          name: "Vevelu",
          handle: "",
          imageUrl:
            "https://ik.imagekit.io/dxffek9yf/tr:fo-auto/landing-page/IMG_20250220_111137.jpg?updatedAt=1740030755019",
        },
      },
      {
        body: "Studying at this institution has been an inspiring and transformative journey! The vibrant, welcoming environment and flawlessly organized systems make learning both seamless and enjoyable. The exceptional faculty members are truly dedicated to nurturing growth and innovation, offering guidance that elevates every student’s potential.",
        author: {
          name: "Minikivi",
          handle: "",
          imageUrl:
            "https://ik.imagekit.io/dxffek9yf/tr:fo-auto/landing-page/IMG_20250220_111213.jpg?updatedAt=1740030755030",
        },
      },
    ],
    [
      {
        body: "I love the welcoming environment and friendly vibe here—it’s so easy to connect and open up. The computer activities are incredibly fun and have been my favorite part of the experience!",
        author: {
          name: "Tongtila",
          handle: "",
          imageUrl:
            "https://ik.imagekit.io/dxffek9yf/tr:fo-auto/landing-page/IMG_20250220_111853.jpg?updatedAt=1740030754513",
        },
      },
    ],
  ],
  [
    [
      {
        body: "I had an incredible experience completing Frontend Development using React with Team Instudia, where their excellent communication skills, interactive training, and supportive environment truly stood out. They not only empowered us with skill-based knowledge but also guided us to develop a productive mindset. Grateful for the memorable journey and their dedication to our growth!",
        author: {
          name: "Ghupito",
          handle: "",
          imageUrl:
            "https://ik.imagekit.io/dxffek9yf/tr:fo-auto/landing-page/IMG_20250113_140237.jpg?updatedAt=1740031463994",
        },
      },
    ],
    [
      {
        body: "The Instudia team was incredibly friendly and supportive, always going above and beyond to help students excel. I explored numerous new skills in computer knowledge, gaining confidence and expertise. It was an inspiring and seamless experience—truly unmatched",
        author: {
          name: "Tunato",
          handle: "",
          imageUrl:
            "https://ik.imagekit.io/dxffek9yf/tr:fo-auto/landing-page/IMG_20250220_111018.jpg?updatedAt=1740030754604",
        },
      },
      {
        body: "Instudia is more than a learning space—it’s a place of growth, collaboration, and unforgettable memories. The team’s dedication, timely support, and passion for sharing knowledge set a remarkable standard. I’ll always carry the lessons and inspiration from this incredible community wherever I go!",
        author: {
          name: "Niukali",
          handle: "",
          imageUrl:
            "https://ik.imagekit.io/dxffek9yf/tr:fo-auto/landing-page/SNOW_20230320_111103_815.jpg?updatedAt=1740029602746",
        },
      },
    ],
  ],
];

export default function TestimonialGrid() {
  const [activeTestimonial, setActiveTestimonial] = useState<any>(null);

  // Prevent background scrolling natively when a lightbox state is active
  useEffect(() => {
    if (activeTestimonial) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [activeTestimonial]);

  return (
    <section className="relative overflow-hidden bg-[#FAFAFA] py-24 sm:py-32 border-y border-neutral-200/50">

      {/* Target localized Webkit scrollbar structural overrides completely preventing clipping natively */}
      <style dangerouslySetInnerHTML={{
        __html: `
        .modal-scrollbar::-webkit-scrollbar {
          width: 5px;
        }
        .modal-scrollbar::-webkit-scrollbar-track {
          background: transparent;
          margin-block: 40px;
        }
        .modal-scrollbar::-webkit-scrollbar-thumb {
          background-color: rgba(168, 85, 247, 0.15);
          border-radius: 10px;
        }
        .modal-scrollbar::-webkit-scrollbar-thumb:hover {
          background-color: rgba(168, 85, 247, 0.4);
        }
      `}} />

      {/* Sleek Instudia Ambient Background Orbs targeting pure SaaS depth algorithms */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 -mt-40 w-[600px] sm:w-[900px] h-[600px] sm:h-[800px] opacity-[0.15] lg:opacity-20 pointer-events-none blur-[120px] rounded-full bg-gradient-to-b from-brandpurple to-emerald-400 z-0 delay-100 transition-opacity" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* Typographic Header Block matching ecosystem variables */}
        <div className="mx-auto max-w-3xl text-center mb-16 sm:mb-24">
          <p className="text-xs md:text-sm font-extrabold tracking-[0.2em] text-brandpurple uppercase mb-4">
            Wall of Love
          </p>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-[#1B1C1E] leading-tight">
            Transformations
          </h2>
          <p className="text-xs md:text-sm font-extrabold tracking-[0.2em] text-brandpurple uppercase mb-4">built by us. driven by them</p>
        </div>

        {/* Core Rendering Grid */}
        <div className="mx-auto grid max-w-2xl grid-cols-1 grid-rows-1 gap-6 sm:gap-8 lg:mx-0 lg:max-w-none lg:grid-flow-col lg:grid-cols-4">

          {/* Featured Dominant Testimonial Card */}
          <figure
            onClick={() => setActiveTestimonial(featuredTestimonial)}
            className="rounded-[2.5rem] bg-white border border-neutral-100 shadow-xl shadow-brandpurple/5 flex flex-col justify-between sm:col-span-2 lg:col-start-2 lg:row-end-1 p-8 sm:p-12 hover:border-brandpurple/30 transition-all duration-500 group relative overflow-hidden cursor-pointer hover:-translate-y-2 hover:shadow-2xl"
          >
            <IconQuote size={160} className="absolute -top-6 -left-6 text-brandpurple/5 -z-0 group-hover:scale-110 group-hover:rotate-6 group-hover:text-brandpurple/10 transition-all duration-700" />
            <blockquote className="relative z-10 text-lg sm:text-xl md:text-2xl font-bold leading-relaxed tracking-tight text-[#1B1C1E] mb-12">
              <p>{`"${featuredTestimonial.body}"`}</p>
            </blockquote>
            <figcaption className="relative z-10 mt-auto flex items-center gap-x-5 border-t border-neutral-100 pt-6 group-hover:border-brandpurple/20 transition-colors duration-500">
              <img
                alt=""
                src={featuredTestimonial.author.imageUrl}
                className="h-14 w-14 sm:h-16 sm:w-16 flex-none rounded-full object-cover ring-2 ring-neutral-100 group-hover:ring-brandpurple/30 bg-neutral-50 transition-all duration-300"
              />
              <div className="flex-auto">
                <div className="font-extrabold text-[#1B1C1E] text-base sm:text-lg">{featuredTestimonial.author.name}</div>
                <div className="text-neutral-500 text-xs sm:text-sm font-bold tracking-wider uppercase mt-0.5">Graduate</div>
              </div>
            </figcaption>
          </figure>

          {/* Iterative Testimonial Array gracefully eliminating legacy randomUUID mapping errors */}
          {testimonials.map((columnGroup, columnGroupIdx) => (
            <div key={`col-group-${columnGroupIdx}`} className="space-y-6 sm:space-y-8 lg:contents lg:space-y-0">
              {columnGroup.map((column, columnIdx) => (
                <div
                  key={`col-${columnGroupIdx}-${columnIdx}`}
                  className={`space-y-6 sm:space-y-8 ${(columnGroupIdx === 0 && columnIdx === 0) || (columnGroupIdx === testimonials.length - 1 && columnIdx === columnGroup.length - 1) ? "lg:row-span-2" : "lg:row-start-1"}`}
                >
                  {column.map((testimonial, tIdx) => (
                    <figure
                      key={`test-${columnGroupIdx}-${columnIdx}-${tIdx}`}
                      onClick={() => setActiveTestimonial(testimonial)}
                      className="rounded-[2rem] bg-white p-6 sm:p-8 border border-neutral-100 shadow-sm hover:shadow-xl hover:shadow-brandpurple/10 hover:border-brandpurple/30 transition-all duration-500 flex flex-col relative group cursor-pointer hover:-translate-y-2"
                    >
                      <IconQuote size={60} className="absolute top-4 right-4 text-neutral-50 opacity-0 group-hover:opacity-100 -z-0 group-hover:scale-110 group-hover:-rotate-12 transition-all duration-700" />
                      <blockquote className="text-neutral-500 font-medium leading-relaxed mb-8 flex-1 relative z-10">
                        <p>{`"${testimonial.body}"`}</p>
                      </blockquote>
                      <figcaption className="mt-auto flex items-center gap-x-4 border-t border-neutral-100/60 group-hover:border-brandpurple/10 transition-colors duration-500 pt-5">
                        <img
                          alt=""
                          src={testimonial.author.imageUrl}
                          className="h-10 w-10 sm:h-12 sm:w-12 rounded-full object-cover ring-2 ring-transparent group-hover:ring-brandpurple/20 bg-neutral-50 transition-all duration-300"
                        />
                        <div>
                          <div className="font-extrabold text-[#1B1C1E] text-sm sm:text-base">
                            {testimonial.author.name}
                          </div>
                          <div className="text-neutral-400 text-[10px] sm:text-xs font-bold tracking-wider uppercase mt-0.5">Student</div>
                        </div>
                      </figcaption>
                    </figure>
                  ))}
                </div>
              ))}
            </div>
          ))}

        </div>
      </div>

      {/* Interactive Reading Overlay Modal native mapping */}
      <AnimatePresence>
        {activeTestimonial && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[#121214]/70 backdrop-blur-md"
            onClick={() => setActiveTestimonial(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-3xl bg-white rounded-[2.5rem] p-8 sm:p-12 md:p-16 shadow-2xl border border-neutral-100 flex flex-col max-h-[90vh] overflow-y-auto modal-scrollbar"
            >
              {/* Escape Button */}
              <button
                onClick={() => setActiveTestimonial(null)}
                className="absolute top-6 right-6 sm:top-8 sm:right-8 w-10 h-10 rounded-full bg-neutral-100/50 hover:bg-neutral-200 flex items-center justify-center text-neutral-500 hover:text-[#1B1C1E] transition-colors"
              >
                <IconX size={20} stroke={2.5} />
              </button>

              <IconQuote size={80} className="text-brandpurple/10 absolute top-8 left-8 sm:top-12 sm:left-12 -z-0" />

              <div className="relative z-10 pt-2 sm:pt-4">
                <blockquote className="text-xl sm:text-2xl md:text-3xl font-bold leading-relaxed tracking-tight text-[#1B1C1E] mb-10 sm:mb-12">
                  <p>{`"${activeTestimonial.body}"`}</p>
                </blockquote>

                <figcaption className="flex items-center gap-x-5 border-t border-neutral-100 pt-6 sm:pt-8 mt-auto">
                  <img
                    alt=""
                    src={activeTestimonial.author.imageUrl}
                    className="h-14 w-14 sm:h-16 sm:w-16 flex-none rounded-full object-cover ring-4 ring-brandpurple/10 bg-neutral-50"
                  />
                  <div>
                    <div className="font-extrabold text-[#1B1C1E] text-base sm:text-lg">{activeTestimonial.author.name}</div>
                    <div className="text-brandpurple text-xs sm:text-sm font-bold tracking-wider uppercase mt-1">Instudia Student</div>
                  </div>
                </figcaption>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </section>
  );
}
