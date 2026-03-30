"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

const LOGOS = [
  { src: "https://ik.imagekit.io/dxffek9yf/tr:f-png,w-0.1/landing-page/course-logos/Microsoft_Office_Word_Logo.svg?updatedAt=1740035646100", alt: "Microsoft Word" },
  { src: "https://ik.imagekit.io/dxffek9yf/tr:f-png,w-0.1/landing-page/course-logos/Microsoft_Office_Excel_Logo.svg?updatedAt=1740035641169", alt: "Microsoft Excel" },
  { src: "https://ik.imagekit.io/dxffek9yf/tr:f-png,w-0.1/landing-page/course-logos/Microsoft_Office_PowerPoint.svg?updatedAt=1740035646062", alt: "Powerpoint" },
  { src: "https://ik.imagekit.io/dxffek9yf/tr:f-png,w-0.5/landing-page/course-logos/html.svg?updatedAt=1740035638533", alt: "HTML5" },
  { src: "https://ik.imagekit.io/dxffek9yf/tr:f-png,w-0.5/landing-page/course-logos/css.svg?updatedAt=1740035638469", alt: "CSS3" },
  { src: "https://ik.imagekit.io/dxffek9yf/tr:f-png,w-0.5/landing-page/course-logos/JavaScript.svg?updatedAt=1740035639051", alt: "Javascript" },
  { src: "https://ik.imagekit.io/dxffek9yf/tr:f-png,w-0.5/landing-page/course-logos/Python.svg?updatedAt=1740035646577", alt: "Python" },
  { src: "https://ik.imagekit.io/dxffek9yf/tr:f-png,w-0.5/landing-page/course-logos/NodeJs.svg?updatedAt=1740035495089", alt: "NodeJs" },
  { src: "https://ik.imagekit.io/dxffek9yf/tr:f-png,w-0.5/landing-page/course-logos/React.svg?updatedAt=1740035646079", alt: "React" },
  { src: "https://ik.imagekit.io/dxffek9yf/tr:f-png,w-0.5/landing-page/course-logos/Git.svg?updatedAt=1740035638571", alt: "Git" },
  { src: "https://ik.imagekit.io/dxffek9yf/tr:f-png,w-0.5/landing-page/course-logos/Sass.svg?updatedAt=1740035646471", alt: "Sass" },
  { src: "https://ik.imagekit.io/dxffek9yf/tr:f-png,w-200/landing-page/course-logos/tally-logo.svg?updatedAt=1740035646877", alt: "Tally" },
  { src: "https://ik.imagekit.io/dxffek9yf/tr:f-png,w-0.5/landing-page/course-logos/Figma.svg?updatedAt=1740035639111", alt: "Figma" },
  { src: "https://ik.imagekit.io/dxffek9yf/tr:f-png,w-0.5/landing-page/course-logos/flask-original.svg?updatedAt=1740035634355", alt: "Flask" },
  { src: "https://ik.imagekit.io/dxffek9yf/tr:f-png,w-0.5/landing-page/course-logos/numpy-original.svg?updatedAt=1740035634328", alt: "Numpy" },
  { src: "https://ik.imagekit.io/dxffek9yf/tr:f-png,w-0.5/landing-page/course-logos/pandas-original-wordmark.svg?updatedAt=1740035634261", alt: "Pandas" },
  { src: "https://ik.imagekit.io/dxffek9yf/tr:f-png,w-0.5/landing-page/course-logos/jupyter-original-wordmark.svg?updatedAt=1740035634519", alt: "Jupyter" },
  { src: "https://ik.imagekit.io/dxffek9yf/tr:f-png,w-0.5/landing-page/course-logos/django-plain.svg?updatedAt=1740035634151", alt: "Django" },
  { src: "https://ik.imagekit.io/dxffek9yf/tr:f-png,w-0.5/landing-page/course-logos/docker-original.svg?updatedAt=1740035634402", alt: "Docker" },
  { src: "https://ik.imagekit.io/dxffek9yf/tr:f-png,w-0.5/landing-page/course-logos/graphql-plain.svg?updatedAt=1740035634342", alt: "GraphQL" },
  { src: "https://ik.imagekit.io/dxffek9yf/tr:f-png,w-0.5/landing-page/course-logos/nextjs-original.svg?updatedAt=1740035634166", alt: "NextJS" },
  { src: "https://ik.imagekit.io/dxffek9yf/tr:f-png,w-0.5/landing-page/course-logos/Illustrator.svg?updatedAt=1740035638602", alt: "Illustrator" }
];

export default function ScrollingLogos() {
  const TopRow = LOGOS.slice(0, 11);
  const BottomRow = LOGOS.slice(11);

  return (
    <section className="w-full bg-[#FAFAFA] py-20 border-y border-neutral-200/50 overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-10 relative z-20">
        <p className="text-xs md:text-sm font-extrabold tracking-[0.2em] text-[#1B1C1E]/40 uppercase">
          Master the technologies powering the world's top companies
        </p>
      </div>
      
      <div className="relative w-full flex flex-col gap-8 sm:gap-10 select-none">
        
        {/* Soft edge gradient masks seamlessly blending CSS loops into #FAFAFA container */}
        <div className="absolute inset-y-0 left-0 w-1/4 md:w-1/3 bg-gradient-to-r from-[#FAFAFA] to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-1/4 md:w-1/3 bg-gradient-to-l from-[#FAFAFA] to-transparent z-10 pointer-events-none" />

        {/* TOP ROW: scrolling left driven natively by rigid Framer linear interpolations */}
        <div className="flex relative overflow-visible">
          <motion.div 
            animate={{ x: ["0%", "-50%"] }}
            transition={{ ease: "linear", duration: 40, repeat: Infinity }}
            className="flex flex-nowrap w-max gap-8 sm:gap-12 px-4 sm:px-6 hover:[animation-play-state:paused]"
          >
             {[...TopRow, ...TopRow, ...TopRow, ...TopRow].map((logo, i) => (
                <div key={`top-${i}`} className="flex items-center justify-center shrink-0 group">
                  <div className="bg-white border border-neutral-100 shadow-sm rounded-[1.25rem] w-[85px] h-[85px] sm:w-[100px] sm:h-[100px] flex items-center justify-center p-5 group-hover:border-brandpurple/30 group-hover:shadow-xl transition-all duration-500 cursor-crosshair group-hover:-translate-y-2 relative overflow-hidden">
                    <Image 
                      src={logo.src} 
                      alt={logo.alt} 
                      className="w-full h-full object-contain opacity-90 group-hover:opacity-100 transition-all duration-500 relative z-10" 
                      width={100}
                      height={100}
                    />
                    <div className="absolute inset-0 bg-brandpurple/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </div>
                </div>
             ))}
          </motion.div>
        </div>

        {/* BOTTOM ROW: scrolling right bridging structural offsets natively */}
        <div className="flex relative overflow-visible">
          <motion.div 
             animate={{ x: ["-50%", "0%"] }}
             transition={{ ease: "linear", duration: 45, repeat: Infinity }}
             className="flex flex-nowrap w-max gap-8 sm:gap-12 px-4 sm:px-6 hover:[animation-play-state:paused]"
          >
             {[...BottomRow, ...BottomRow, ...BottomRow, ...BottomRow].map((logo, i) => (
                <div key={`bot-${i}`} className="flex items-center justify-center shrink-0 group">
                  <div className="bg-white border border-neutral-100 shadow-sm rounded-[1.25rem] w-[85px] h-[85px] sm:w-[100px] sm:h-[100px] flex items-center justify-center p-4 sm:p-5 group-hover:border-brandpurple/30 group-hover:shadow-xl transition-all duration-500 cursor-crosshair group-hover:-translate-y-2 relative overflow-hidden">
                    <Image 
                      src={logo.src} 
                      alt={logo.alt} 
                      className="w-full h-full object-contain opacity-90 group-hover:opacity-100 transition-all duration-500 relative z-10" 
                      width={100}
                      height={100}
                    />
                    <div className="absolute inset-0 bg-brandpurple/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </div>
                </div>
             ))}
          </motion.div>
        </div>

      </div>
    </section>
  );
}
