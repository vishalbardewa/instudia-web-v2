"use client";

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { IconBrandWhatsapp, IconMapPin } from '@tabler/icons-react';

interface FaqItem {
  question: string;
  answer: string;
}

const FAQS: FaqItem[] = [
  {
    question: 'Why do local shopkeepers always offer 8GB RAM laptops?',
    answer:
      'Because brands produced massive inventory of 8GB soldered RAM laptops over the past two years, and retailers want to clear shelves before customers realize Windows 11 chokes on them. Once you open Android Studio, VS Code, and 15 browser tabs, an 8GB laptop starts freezing and paging to the SSD. If you buy a laptop today, make sure it has either 16GB out-of-the-box or an open SODIMM slot so you can add another 8GB stick for ₹1,800.',
  },
  {
    question: 'Why is a 45% NTSC screen a disaster for graphic designers?',
    answer:
      '45% NTSC is the cheapest LCD panel available. It can only reproduce about 62% of standard web colors. If you design a flyer, logo, or UI mockup on this screen, reds look like dull bricks and vibrant blues look faded. When your client opens your design on their iPhone or Samsung AMOLED phone, the colors look completely mismatched and oversaturated. If you are studying Graphic Design or UI/UX, always look for 100% sRGB or 100% DCI-P3 in the laptop specifications.',
  },
  {
    question: 'Can I run a desktop PC on my home inverter in Dimapur?',
    answer:
      'Only if your home has a pure sine wave inverter with fast transfer switch capability. Most square wave or budget home inverters have a 15–20 millisecond switching delay during power cuts. That delay causes a desktop power supply to trip instantly. If you build a PC in Dimapur or Kohima, budget ₹3,400 for an external APC Back-UPS (600VA or 1100VA) so your machine stays on through sudden voltage dips and power transfers.',
  },
  {
    question: 'Will instudia help me inspect a laptop or PC quote in person?',
    answer:
      'Yes, 100% free of cost. If a shop in Dimapur gives you a quotation, take a photo of the specs or print your build sheet from this page and walk into our centre at Vikiye Center, Fellowship Colony, Dimapur. One of our instructors will review the exact model number, CPU generation, and RAM expandability to ensure you aren’t overpaying.',
  },
];

export default function CounselingFaqSection() {
  const containerRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const faqListRef = useRef<HTMLDivElement>(null);
  const bottomCtaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Check user preference for reduced motion
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;
    if (prefersReducedMotion) return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // 1. Header reveal (badge -> title -> subtitle)
      if (headerRef.current) {
        const headerElements = headerRef.current.children;
        gsap.fromTo(
          headerElements,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.1,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: headerRef.current,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          }
        );
      }

      // 2. Staggered FAQ cards: Heading/Question fades in first, then body answer fades in
      if (faqListRef.current) {
        const faqCards = faqListRef.current.querySelectorAll('.faq-card');

        faqCards.forEach((card) => {
          const questionEl = card.querySelector('.faq-question');
          const answerEl = card.querySelector('.faq-answer');

          const cardTimeline = gsap.timeline({
            scrollTrigger: {
              trigger: card,
              start: 'top 86%',
              toggleActions: 'play none none none',
            },
          });

          // Card container subtle appearance
          cardTimeline.fromTo(
            card,
            { opacity: 0, y: 16 },
            { opacity: 1, y: 0, duration: 0.45, ease: 'power2.out' }
          );

          // Question fades in and translates up first
          if (questionEl) {
            cardTimeline.fromTo(
              questionEl,
              { opacity: 0, y: 10 },
              { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out' },
              '-=0.3'
            );
          }

          // Answer body fades in with a staggered follow-through
          if (answerEl) {
            cardTimeline.fromTo(
              answerEl,
              { opacity: 0, y: 10 },
              { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' },
              '-=0.2'
            );
          }
        });
      }

      // 3. Staggered entrance for the bottom consultation card
      if (bottomCtaRef.current) {
        gsap.fromTo(
          bottomCtaRef.current,
          { opacity: 0, y: 24 },
          {
            opacity: 1,
            y: 0,
            duration: 0.65,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: bottomCtaRef.current,
              start: 'top 88%',
              toggleActions: 'play none none none',
            },
          }
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="mx-auto max-w-5xl px-6 lg:px-8 py-16 border-t border-neutral-200"
    >
      {/* ── Section Header ── */}
      <div ref={headerRef} className="text-center mb-12">
        <span className="text-xs font-black uppercase tracking-widest text-neutral-500 px-3 py-1 bg-neutral-100 rounded-full inline-block mb-3 border border-neutral-200">
          Counseling FAQ
        </span>
        <h2 className="text-3xl font-extrabold text-neutral-950">
          Questions Students Ask Us Every Week
        </h2>
        <p className="text-sm text-neutral-600 mt-2">
          No marketing talk—just the honest answers our mentors give at our counseling desk.
        </p>
      </div>

      {/* ── Staggered FAQ Items ── */}
      <div ref={faqListRef} className="space-y-5">
        {FAQS.map((faq, idx) => (
          <div
            key={idx}
            className="faq-card p-6 md:p-7 bg-white rounded-3xl border border-neutral-200 shadow-xs transition-shadow hover:shadow-sm"
          >
            {/* Question Heading */}
            <h3 className="faq-question font-extrabold text-base md:text-lg text-neutral-950 mb-2 leading-snug">
              {faq.question}
            </h3>

            {/* Answer Body */}
            <p className="faq-answer text-sm text-neutral-600 leading-relaxed font-medium">
              {faq.answer}
            </p>
          </div>
        ))}
      </div>

      {/* ── Hallmark Light Bottom Card ── */}
      <div ref={bottomCtaRef} className="mt-12 p-8 md:p-12 bg-white rounded-3xl border border-neutral-200 text-neutral-900 text-center flex flex-col items-center shadow-sm">
        <span className="text-xs font-black uppercase tracking-widest text-brandpurple mb-2 px-3 py-1 bg-brandpurple/10 rounded-full border border-brandpurple/20">
          Talk to an Instructor
        </span>
        <h3 className="text-2xl md:text-3xl font-extrabold mb-3 text-neutral-950">
          Want us to verify your laptop or parts quote?
        </h3>
        <p className="text-sm text-neutral-600 max-w-xl mb-6 leading-relaxed">
          Message our WhatsApp counseling desk or walk into our Dimapur campus. We don’t sell hardware, so you get completely unbiased advice.
        </p>
        <div className="flex flex-wrap gap-4 justify-center">
          <a
            href="https://wa.me/918798587779?text=Hello%20instudia%2C%20I%20have%20a%20laptop%2FPC%20quotation%20I%20would%20like%20your%20mentor%20to%20review."
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow-xs transition-all flex items-center gap-2"
          >
            <IconBrandWhatsapp className="w-4 h-4" />
            Ask on WhatsApp
          </a>
          <Link
            href="/contact"
            className="px-6 py-3.5 bg-white hover:bg-neutral-50 text-neutral-900 font-bold text-xs uppercase tracking-wider rounded-xl border border-neutral-300 hover:border-neutral-400 transition-all flex items-center gap-2 shadow-2xs"
          >
            <IconMapPin className="w-4 h-4" />
            Find Our Dimapur Campus
          </Link>
        </div>
      </div>
    </section>
  );
}
