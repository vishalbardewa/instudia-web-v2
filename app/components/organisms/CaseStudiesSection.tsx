"use client";

import React, { useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SectionIntro } from "../atom/SectionIntro";
import { Container } from "../atom/Container";

export interface CaseStudyItem {
  id: string;
  logo: string;
  client: string;
  date: string;
  title: string;
  description: string;
  href: string;
  accentBorder: string;
}

interface CaseStudiesSectionProps {
  caseStudies: CaseStudyItem[];
}

export default function CaseStudiesSection({ caseStudies }: CaseStudiesSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // 1. Intro section reveal
      gsap.fromTo(
        ".casestudies-intro-reveal",
        { opacity: 0, y: 32 },
        {
          opacity: 1,
          y: 0,
          duration: 0.85,
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );

      // 2. Case study cards stagger entrance
      if (gridRef.current) {
        const cards = gridRef.current.querySelectorAll(".casestudy-card");
        gsap.fromTo(
          cards,
          { opacity: 0, y: 44, scale: 0.96 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.9,
            stagger: 0.12,
            ease: "power3.out",
            scrollTrigger: {
              trigger: gridRef.current,
              start: "top 82%",
              toggleActions: "play none none none",
            },
          }
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef}>
      <div className="casestudies-intro-reveal">
        <SectionIntro
          title="Harnessing skills for a brighter future"
          className="lg:mx-24 mt-24 sm:mt-32 lg:mt-40"
        >
          <p>
            We believe upskilling is the solution to today&apos;s most pressing challenges.
            While the demand for new skills is rising, it can also feel overwhelming—but
            with the right guidance, upskilling can unlock endless opportunities for growth
            and success. Let us help you bridge the skills gap and build a future-ready career.
          </p>
        </SectionIntro>
      </div>

      <Container className="mt-16">
        <div ref={gridRef} className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {caseStudies.map((caseStudy) => (
            <div key={caseStudy.id} className="casestudy-card flex">
              <Link
                href={caseStudy.href}
                className={`relative flex w-full flex-col rounded-3xl p-6 bg-white border border-neutral-200/80 transition-all duration-300 ${caseStudy.accentBorder} sm:p-8 group hover:-translate-y-1.5`}
              >
                <div>
                  <Image
                    src={caseStudy.logo}
                    alt={caseStudy.client}
                    className="h-16 w-16 object-contain"
                    width={64}
                    height={64}
                    sizes="64px"
                  />
                </div>
                <p className="mt-6 flex gap-x-2 text-sm text-neutral-950">
                  <time dateTime={caseStudy.date.split("-")[0]} className="font-semibold">
                    {caseStudy.date.split("-")[0]}
                  </time>
                  <span className="text-neutral-300" aria-hidden="true">
                    /
                  </span>
                </p>
                <h3 className="mt-6 font-display text-2xl font-semibold text-neutral-950 group-hover:text-brandpurple transition-colors">
                  {caseStudy.title}
                </h3>
                <p className="mt-4 text-base text-neutral-600 leading-relaxed">
                  {caseStudy.description}
                </p>
              </Link>
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}
