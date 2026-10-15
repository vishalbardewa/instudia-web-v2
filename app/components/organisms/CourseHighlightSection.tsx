"use client";

import React, { useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CheckCircleIcon } from "@heroicons/react/20/solid";

const defaultBenefits = [
  "Resume Building Sessions",
  "Flexible class hours",
  "Hands-on projects",
  "One-to-one doubt clearing",
  "Connect with Industry experts",
  "Interview Prep Sessions",
];

interface CourseHighlightSectionProps {
  benefits?: string[];
}

export default function CourseHighlightSection({
  benefits = defaultBenefits,
}: CourseHighlightSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageWrapperRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // 1. Image container entrance
      if (imageWrapperRef.current) {
        gsap.fromTo(
          imageWrapperRef.current,
          { opacity: 0, y: 36, scale: 0.96 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.95,
            ease: "power3.out",
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top 80%",
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

      // 3. Right side content staggered entrance
      if (contentRef.current) {
        const textElements = contentRef.current.querySelectorAll(".highlight-text-reveal");
        const listItems = contentRef.current.querySelectorAll(".highlight-list-item");

        gsap.fromTo(
          textElements,
          { opacity: 0, y: 24 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: contentRef.current,
              start: "top 80%",
              toggleActions: "play none none none",
            },
          }
        );

        gsap.fromTo(
          listItems,
          { opacity: 0, y: 16 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.06,
            ease: "power3.out",
            scrollTrigger: {
              trigger: contentRef.current,
              start: "top 78%",
              toggleActions: "play none none none",
            },
          }
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="relative isolate -z-10 mt-32 sm:mt-40">
      <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-2xl flex-col gap-16 bg-black/5 px-6 py-16 sm:rounded-3xl sm:p-8 lg:mx-0 lg:max-w-none lg:flex-row lg:items-center lg:py-20 xl:gap-x-20 xl:px-20">
          
          {/* Left image container with parallax */}
          <div
            ref={imageWrapperRef}
            className="relative h-96 w-full flex-none rounded-2xl overflow-hidden shadow-xl lg:aspect-square lg:h-auto lg:max-w-sm"
          >
            <div ref={imageRef} className="absolute inset-0 h-[115%] w-full -top-[7.5%]">
              <Image
                alt="Person staring at laptop sitting on the chair"
                src="/assets/images/course-unique-highlight.webp"
                className="object-cover"
                fill
                loading="lazy"
                sizes="(max-width: 1024px) 100vw, 384px"
              />
            </div>
          </div>

          {/* Right content */}
          <div ref={contentRef} className="w-full flex-auto">
            <h2 className="highlight-text-reveal text-3xl font-bold tracking-tight text-[#1b1c1e] sm:text-4xl">
              Discover what makes our courses unique
            </h2>
            <h3 className="sr-only">Computer training in Dimapur, Nagaland</h3>
            <p className="highlight-text-reveal mt-6 text-lg leading-8 text-[#1b1c1e]">
              Experience hands-on learning with real-world projects, guided by industry experts.
              Our unique approach blends cutting-edge skills with personalized mentorship for your
              success.
            </p>
            <ul
              role="list"
              className="mt-10 grid grid-cols-1 gap-x-8 gap-y-3 text-base leading-7 text-[#1b1c1e] sm:grid-cols-2"
            >
              {benefits.map((benefit, i) => (
                <li key={`${benefit}-${i}`} className="highlight-list-item flex gap-x-3">
                  <CheckCircleIcon aria-hidden="true" className="h-7 w-5 flex-none" />
                  {benefit}
                </li>
              ))}
            </ul>
            <div className="highlight-text-reveal mt-10 flex">
              <Link
                href="/contact"
                className="text-sm font-semibold leading-6 text-[#1b1c1e] hover:text-brandpurple transition-colors"
              >
                Reach us <span aria-hidden="true">&rarr;</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div
        aria-hidden="true"
        className="absolute inset-x-0 -top-16 -z-10 flex transform-gpu justify-center overflow-hidden blur-3xl pointer-events-none"
      >
        <div
          style={{
            clipPath:
              "polygon(73.6% 51.7%, 91.7% 11.8%, 100% 46.4%, 97.4% 82.2%, 92.5% 84.9%, 75.7% 64%, 55.3% 47.5%, 46.5% 49.4%, 45% 62.9%, 50.3% 87.2%, 21.3% 64.1%, 0.1% 100%, 5.4% 51.1%, 21.4% 63.9%, 58.9% 0.2%, 73.6% 51.7%)",
          }}
          className="aspect-[1318/752] w-[82.375rem] flex-none bg-gradient-to-r from-[#1B1C1E] to-[#FAFAFA] opacity-25"
        />
      </div>
    </div>
  );
}
