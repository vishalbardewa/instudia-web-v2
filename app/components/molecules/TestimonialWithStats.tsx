"use client";

import React, { useRef, useEffect } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function TestimonialWithStats() {
  const containerRef = useRef<HTMLElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const stat1Ref = useRef<HTMLSpanElement>(null);
  const stat2Ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // 1. Image card entrance
      if (cardRef.current) {
        gsap.fromTo(
          cardRef.current,
          { opacity: 0, y: 40, scale: 0.96 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: cardRef.current,
              start: "top 82%",
              toggleActions: "play none none none",
            },
          }
        );
      }

      // 2. Parallax scrub on inner image
      if (imageRef.current && containerRef.current) {
        gsap.fromTo(
          imageRef.current,
          { yPercent: -6, scale: 1.08 },
          {
            yPercent: 6,
            scale: 1.08,
            ease: "none",
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top bottom",
              end: "bottom top",
              scrub: 0.6,
            },
          }
        );
      }

      // 3. Right column text entrance
      gsap.fromTo(
        ".mission-content-reveal",
        { opacity: 0, y: 28 },
        {
          opacity: 1,
          y: 0,
          duration: 0.85,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".mission-content-wrap",
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );

      // 4. Numeric Stat Counter 1: 1,000+
      if (stat1Ref.current) {
        const counterObj = { val: 0 };
        gsap.to(counterObj, {
          val: 1000,
          duration: 1.6,
          ease: "power2.out",
          scrollTrigger: {
            trigger: stat1Ref.current,
            start: "top 88%",
            toggleActions: "play none none none",
          },
          onUpdate: () => {
            if (stat1Ref.current) {
              stat1Ref.current.textContent = `${Math.round(counterObj.val).toLocaleString()}+`;
            }
          },
        });
      }

      // 5. Numeric Stat Counter 2: 50+
      if (stat2Ref.current) {
        const counterObj = { val: 0 };
        gsap.to(counterObj, {
          val: 50,
          duration: 1.4,
          ease: "power2.out",
          scrollTrigger: {
            trigger: stat2Ref.current,
            start: "top 88%",
            toggleActions: "play none none none",
          },
          onUpdate: () => {
            if (stat2Ref.current) {
              stat2Ref.current.textContent = `${Math.round(counterObj.val)}+`;
            }
          },
        });
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative bg-white overflow-hidden py-20 sm:py-28">
      {/* Background accent blob */}
      <div className="absolute -top-40 -left-20 w-[500px] h-[500px] bg-brandpurple/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">

          {/* Left: Image Card */}
          <div className="relative">
            <div
              ref={cardRef}
              className="relative overflow-hidden rounded-[2.5rem] shadow-2xl aspect-[4/3] lg:aspect-[3/4]"
            >
              <div ref={imageRef} className="absolute inset-0 h-[115%] w-full -top-[7.5%]">
                <Image
                  className="object-cover"
                  src="/assets/images/students-mission.webp"
                  alt="Students at Instudia learning tech skills in Dimapur"
                  fill
                  loading="lazy"
                  sizes="(max-width: 1024px) 100vw, 600px"
                />
              </div>

              {/* Dark overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#1B1C1E] via-[#1B1C1E]/40 to-transparent" />

              {/* Blockquote overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-8">
                <blockquote>
                  <svg
                    className="h-7 w-7 text-brandpurple mb-3 opacity-80"
                    fill="currentColor"
                    viewBox="0 0 32 32"
                    aria-hidden="true"
                  >
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
          <div className="mission-content-wrap flex flex-col gap-8">
            <div className="mission-content-reveal">
              <p className="text-xs font-extrabold tracking-[0.2em] text-brandpurple uppercase mb-4">
                Our Mission
              </p>
              <h2 className="text-4xl sm:text-5xl font-black tracking-tight text-[#1B1C1E] leading-tight">
                Driven by Ambition,{" "}
                <span className="block text-brandpurple">Growth by Skills</span>
              </h2>
            </div>

            <div className="mission-content-reveal space-y-5 text-gray-600">
              <p className="text-lg leading-8 font-medium">
                Our mission is to empower unemployed and unskilled youth with industry-specific courses that will impact their lives and open up new job opportunities.
              </p>
              <p className="text-base leading-7">
                Our institute offers a wide range of computer courses designed to prepare students for success in today&apos;s job market — from web development and graphic design to data analysis and more.
              </p>
            </div>

            {/* Inline stat chips */}
            <div className="mission-content-reveal flex flex-wrap justify-center md:justify-start gap-3 pt-2">
              <div className="flex flex-col items-start rounded-2xl border border-neutral-200 bg-white px-5 py-4 shadow-sm hover:border-neutral-300 transition-colors">
                <span ref={stat1Ref} className="text-2xl font-black text-[#1B1C1E] tabular-nums">
                  1,000+
                </span>
                <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider mt-0.5">
                  Students trained
                </span>
              </div>

              <div className="flex flex-col items-start rounded-2xl border border-neutral-200 bg-white px-5 py-4 shadow-sm hover:border-neutral-300 transition-colors">
                <span ref={stat2Ref} className="text-2xl font-black text-[#1B1C1E] tabular-nums">
                  50+
                </span>
                <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider mt-0.5">
                  Hands-on projects
                </span>
              </div>

              <div className="flex flex-col items-start rounded-2xl border border-neutral-200 bg-white px-5 py-4 shadow-sm hover:border-neutral-300 transition-colors">
                <span className="text-2xl font-black text-[#1B1C1E]">
                  1-on-1
                </span>
                <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider mt-0.5">
                  Career guidance
                </span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
