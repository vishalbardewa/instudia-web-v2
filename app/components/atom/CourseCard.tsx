import React from 'react';

import { motion } from 'framer-motion';
import Link from 'next/link';

import { ICourse } from '@/interfaces';

export default function CourseCard({
  title,
  category,
  description,
  slug,
}: ICourse) {
  return (
    <motion.div
      whileHover={{ scale: 1.01, color: 'black' }}
      key={title}
      className="col-span-3 flex flex-col overflow-hidden rounded-lg shadow-lg lg:col-span-1"
    >
      <div className="shrink-0">
        <img
          className="h-full w-full object-cover"
          src={`/assets/images/${slug}.png`}
          alt=""
        />
      </div>
      <div className="flex flex-1 flex-col justify-between bg-white p-6 hover:bg-slate-100">
        <div className="flex-1">
          <p className="text-sm font-medium text-yellow-600">
            <Link href={`/${slug}`}>
              <span className="text-yellow-600 hover:underline">
                {category.name}
              </span>
            </Link>
          </p>
          <a href={`/courses/${slug}`} className="mt-2 block">
            <p className="text-xl font-semibold text-gray-900">{title}</p>
            <p className="mt-3 text-base text-gray-500">{description}</p>
          </a>
        </div>
      </div>
    </motion.div>
  );
}
