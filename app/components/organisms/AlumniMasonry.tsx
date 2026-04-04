"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Testimonial } from "@/app/data/testimonials";

interface Props {
  testimonials: Testimonial[];
}

export default function AlumniMasonry({ testimonials }: Props) {
  return (
    <div className="columns-1 sm:columns-2 lg:columns-3 gap-8 space-y-8 pb-12 w-full">
      {testimonials.map((t, i) => (
        <div key={t.id} className="break-inside-avoid">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: (i % 3) * 0.1 }}
            className="group relative bg-white rounded-3xl border border-neutral-100 shadow-xl shadow-gray-100/50 overflow-hidden"
          >
            {/* Top Image Section */}
            <div className="relative w-full h-48 sm:h-56 overflow-hidden bg-neutral-100">
              <Image 
                src={t.image} 
                alt={t.name}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              
              {/* Overlay Gradient on Hover */}
              <div className="absolute inset-0 bg-[#1B1C1E]/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-center items-center p-6 text-center backdrop-blur-sm z-10">
                <span className="text-[10px] uppercase font-black tracking-widest text-[#FFE01B] mb-2 drop-shadow-md">
                  Career Transformation
                </span>
                <span className="text-gray-300 font-medium text-sm line-through decoration-[#FF4B4B] mb-1">
                  {t.beforeCourse}
                </span>
                <span className="text-white font-bold text-lg leading-tight mb-4 drop-shadow-lg">
                  {t.afterCourse} <br />
                  <span className="text-brandpurple font-black text-sm">@ {t.company}</span>
                </span>
                
                {t.linkedin && (
                  <Link 
                    href={t.linkedin}
                    target="_blank"
                    className="mt-2 inline-flex items-center gap-2 px-4 py-2 bg-white text-[#1B1C1E] text-xs font-black rounded-full hover:bg-neutral-100 hover:scale-105 transition-all shadow-xl"
                  >
                    <svg className="w-3.5 h-3.5 text-[#0A66C2]" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                    </svg>
                    Connect
                  </Link>
                )}
              </div>
            </div>

            {/* Bottom Content Section */}
            <div className="p-6 sm:p-8 relative z-20 bg-white">
              <svg className="w-8 h-8 text-brandpurple/20 mb-3" fill="currentColor" viewBox="0 0 32 32">
                <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
              </svg>
              
              <blockquote className="text-gray-600 italic text-sm md:text-base leading-relaxed mb-6 group-hover:text-black transition-colors duration-300">
                "{t.quote}"
              </blockquote>
              
              <p className="font-extrabold text-[#1B1C1E] tracking-tight">{t.name}</p>
            </div>
            
            {/* Color Strip at bottom */}
            <div className="h-1.5 w-full bg-gradient-to-r from-brandpurple via-brandpurple to-brandpurple/80 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
          </motion.div>
        </div>
      ))}
    </div>
  );
}
