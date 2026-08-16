import React from "react";
import Image from "next/image";

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
  { src: "https://ik.imagekit.io/dxffek9yf/tr:f-png,w-0.5/landing-page/course-logos/Illustrator.svg?updatedAt=1740035638602", alt: "Illustrator" },
];

const TopRow = LOGOS.slice(0, 11);
const BottomRow = LOGOS.slice(11);

/** Single logo tile */
function LogoTile({ logo }: { logo: { src: string; alt: string } }) {
  return (
    <div className="flex items-center justify-center shrink-0 group px-4 sm:px-6">
      <div className="bg-white border border-neutral-100 shadow-sm rounded-[1.25rem] w-[85px] h-[85px] sm:w-[100px] sm:h-[100px] flex items-center justify-center p-5 group-hover:border-brandpurple/30 group-hover:shadow-xl transition-all duration-500 cursor-crosshair group-hover:-translate-y-2 relative overflow-hidden">
        <Image
          src={logo.src}
          alt={logo.alt}
          className="w-full h-full object-contain opacity-90 group-hover:opacity-100 transition-all duration-500 relative z-10"
          width={100}
          height={100}
          loading="lazy"
          sizes="(max-width: 640px) 70px, 100px"
        />
        <div className="absolute inset-0 bg-brandpurple/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </div>
    </div>
  );
}

export default function ScrollingLogos() {
  return (
    <section className="w-full bg-[#FAFAFA] py-20 border-y border-neutral-200/50 overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-10 relative z-20">
        <p className="text-xs md:text-sm font-extrabold tracking-[0.2em] text-[#1B1C1E]/40 uppercase">
          Master the technologies powering the world&apos;s top companies
        </p>
      </div>

      {/* CSS keyframe scrolling — no JS, no Framer Motion, minimal DOM */}
      <style>{`
        @keyframes scroll-left {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes scroll-right {
          0%   { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }
        .marquee-left  { animation: scroll-left  40s linear infinite; }
        .marquee-right { animation: scroll-right 45s linear infinite; }
        .marquee-left:hover,
        .marquee-right:hover { animation-play-state: paused; }
      `}</style>

      <div className="relative w-full flex flex-col gap-8 sm:gap-10 select-none">
        {/* Soft edge masks */}
        <div className="absolute inset-y-0 left-0 w-1/4 md:w-1/3 bg-gradient-to-r from-[#FAFAFA] to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-1/4 md:w-1/3 bg-gradient-to-l from-[#FAFAFA] to-transparent z-10 pointer-events-none" />

        {/* TOP ROW — scrolling left. 2 copies = seamless loop */}
        <div className="flex overflow-hidden">
          <div className="flex flex-nowrap w-max marquee-left will-change-transform">
            {TopRow.map((logo) => (
              <LogoTile key={logo.alt} logo={logo} />
            ))}
            {/* Duplicate for seamless loop — screen readers skip this */}
            <div aria-hidden="true" className="flex flex-nowrap">
              {TopRow.map((logo, i) => (
                <LogoTile key={`dup-top-${i}`} logo={logo} />
              ))}
            </div>
          </div>
        </div>

        {/* BOTTOM ROW — scrolling right. 2 copies = seamless loop */}
        <div className="flex overflow-hidden">
          <div className="flex flex-nowrap w-max marquee-right will-change-transform">
            {BottomRow.map((logo) => (
              <LogoTile key={logo.alt} logo={logo} />
            ))}
            {/* Duplicate for seamless loop — screen readers skip this */}
            <div aria-hidden="true" className="flex flex-nowrap">
              {BottomRow.map((logo, i) => (
                <LogoTile key={`dup-bot-${i}`} logo={logo} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
