"use client";

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { IconBrandWhatsapp, IconMapPin, IconChevronDown } from '@tabler/icons-react';

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
  const [openIndex, setOpenIndex] = useState<number | null>(0); // First FAQ open by default
  const containerRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const faqListRef = useRef<HTMLDivElement>(null);
  const bottomCtaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;
    if (prefersReducedMotion) return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      if (headerRef.current) {
        gsap.fromTo(
          headerRef.current.children,
          { opacity: 0, y: 16 },
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            stagger: 0.08,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: headerRef.current,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          }
        );
      }

      if (faqListRef.current) {
        gsap.fromTo(
          faqListRef.current.children,
          { opacity: 0, y: 12 },
          {
            opacity: 1,
            y: 0,
            duration: 0.45,
            stagger: 0.06,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: faqListRef.current,
              start: 'top 86%',
              toggleActions: 'play none none none',
            },
          }
        );
      }

      if (bottomCtaRef.current) {
        gsap.fromTo(
          bottomCtaRef.current,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.55,
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

  const toggleFaq = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <section
      ref={containerRef}
      className="mx-auto max-w-4xl px-6 lg:px-8 py-16 border-t border-neutral-200"
    >
      {/* ── Header ── */}
      <div ref={headerRef} className="text-center mb-10">
        <span className="text-xs font-black uppercase tracking-widest text-neutral-500 px-3 py-1 bg-neutral-100 rounded-full inline-block mb-3 border border-neutral-200">
          Frequently Asked Questions
        </span>
        <h2 className="text-2xl md:text-3xl font-extrabold text-neutral-950">
          Hardware Advice You Need to Know
        </h2>
        <p className="text-sm text-neutral-600 mt-1.5">
          Clear, honest answers from our Dimapur counseling desk.
        </p>
      </div>

      {/* ── Interactive Clean Accordion (Zero Text Clutter) ── */}
      <div ref={faqListRef} className="space-y-3">
        {FAQS.map((faq, idx) => {
          const isOpen = openIndex === idx;
          return (
            <div
              key={idx}
              className="bg-white rounded-2xl border border-neutral-200 shadow-2xs overflow-hidden transition-all"
            >
              <button
                type="button"
                onClick={() => toggleFaq(idx)}
                aria-expanded={isOpen}
                className="w-full p-5 text-left flex items-center justify-between gap-4 font-extrabold text-sm md:text-base text-neutral-950 hover:bg-neutral-50/70 transition-colors"
              >
                <span>{faq.question}</span>
                <IconChevronDown
                  className={`w-5 h-5 text-neutral-400 shrink-0 transition-transform duration-200 ${
                    isOpen ? 'rotate-180 text-brandpurple' : ''
                  }`}
                />
              </button>

              {isOpen && (
                <div className="px-5 pb-5 pt-1 text-sm text-neutral-600 leading-relaxed font-medium border-t border-neutral-100 bg-neutral-50/40">
                  {faq.answer}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* ── Compact Light Bottom Card ── */}
      <div
        ref={bottomCtaRef}
        className="mt-12 p-6 md:p-8 bg-white rounded-3xl border border-neutral-200 text-neutral-900 text-center flex flex-col items-center shadow-xs"
      >
        <span className="text-xs font-black uppercase tracking-wider text-brandpurple mb-1.5">
          Free Consultation Desk
        </span>
        <h3 className="text-xl md:text-2xl font-extrabold text-neutral-950 mb-2">
          Want a mentor to review your shop quotation?
        </h3>
        <p className="text-xs md:text-sm text-neutral-600 max-w-lg mb-5 leading-relaxed">
          Take a photo of the quote or print your sheet and send it to our desk. We don't sell hardware, so our review is 100% unbiased.
        </p>
        <div className="flex flex-wrap gap-3 justify-center">
          <a
            href="https://wa.me/918798587779?text=Hello%20instudia%2C%20I%20have%20a%20laptop%2FPC%20quotation%20I%20would%20like%20your%20mentor%20to%20review."
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow-xs transition-all flex items-center gap-2"
          >
            <IconBrandWhatsapp className="w-4 h-4" />
            Check Quote on WhatsApp
          </a>
          <Link
            href="/contact"
            className="px-5 py-3 bg-white hover:bg-neutral-50 text-neutral-900 font-bold text-xs uppercase tracking-wider rounded-xl border border-neutral-300 hover:border-neutral-400 transition-all flex items-center gap-2 shadow-2xs"
          >
            <IconMapPin className="w-4 h-4" />
            Visit Vikiye Center, Dimapur
          </Link>
        </div>
      </div>
    </section>
  );
}
