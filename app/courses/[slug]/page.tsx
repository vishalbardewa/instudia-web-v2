import React from "react";
import { Metadata, ResolvingMetadata } from "next";
import META_LOOKUP from "@/app/_utils/MetaLookup";
import { AppConfig } from "@/app/_utils/AppConfig";
import Script from "next/script";
import { notFound } from "next/navigation";
import CourseDetailContent from "./CourseDetailContent";
import { IMAGE_LIST } from "@/app/utils/CourseImageList";

const RECOMMENDED_COURSES_COUNT = 3;

type Props = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const slug = (await params).slug;
  const meta = META_LOOKUP[slug] ?? {};
  const courseImage = IMAGE_LIST[slug];

  return {
    ...meta,
    openGraph: {
      ...(meta.openGraph ?? {}),
      ...(courseImage
        ? {
            images: [
              {
                url: courseImage,
                width: 1200,
                height: 630,
                alt: meta.title ?? `${slug} course at instudia Dimapur`,
              },
            ],
          }
        : {}),
    },
    alternates: {
      canonical: `/courses/${slug}`,
    },
  };
}

const BE_URL =
  process.env.NODE_ENV === "development"
    ? "http://127.0.0.1:3000"
    : "https://instudianagaland.com/";

async function getCourseBySlug(slug: string) {
  const res = await fetch(`${BE_URL}/api/courses/${slug}`, {
    method: "GET",
  });
  return res.json();
}

async function getCourses() {
  const posts = await fetch(`${BE_URL}/api/courses`, {
    method: "GET",
  });
  return posts.json();
}

export default async function Course({ params }: any) {
  const resolvedParams = await params;
  const slug = resolvedParams?.slug || params?.slug;

  const { courseDetails } = await getCourseBySlug(slug);
  
  if (!courseDetails) {
    return notFound();
  }

  const { courses } = await getCourses();

  const getSimilarCourses = (allCourses: any[], currentCourse: any, minElements: number) => {
    if (!allCourses || allCourses.length === 0) return [];
    
    const otherCourses = allCourses.filter((c: any) => 
        c.slug !== slug && 
        c.slug !== currentCourse?.slug && 
        c.fullTitle !== currentCourse?.fullTitle
    );
    
    const currentWords = new Set(
      `${currentCourse.fullTitle} ${currentCourse.courseHightlight || currentCourse.courseHighlight || ""}`
        .toLowerCase()
        .replace(/[^a-z0-9 ]/g, '')
        .split(' ')
        .filter((w: string) => w.length > 3)
    );

    const scoredCourses = otherCourses.map((c: any) => {
      let score = 0;
      if (c.category && currentCourse.category && c.category === currentCourse.category) {
        score += 15;
      }
      const targetWords = `${c.fullTitle} ${c.courseHightlight || c.courseHighlight || ""}`
        .toLowerCase()
        .replace(/[^a-z0-9 ]/g, '')
        .split(' ');
        
      targetWords.forEach((word: string) => {
        if (word.length > 3 && currentWords.has(word)) {
          score += 2;
        }
      });
      return { course: c, score };
    });

    scoredCourses.sort((a, b) => b.score - a.score);
    const thresholdCourses = scoredCourses.filter(sc => sc.score > 2).map(sc => sc.course);
    
    if (thresholdCourses.length < minElements) {
       return scoredCourses.slice(0, Math.max(minElements, thresholdCourses.length)).map(sc => sc.course);
    }
    return thresholdCourses.slice(0, 8);
  };

  const relatedCourses = getSimilarCourses(courses?.courses || [], courseDetails, RECOMMENDED_COURSES_COUNT);

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "Course",
      "name": `${courseDetails.fullTitle} in Dimapur, Nagaland`,
      "description": `${courseDetails.courseHightlight ?? courseDetails.courseHighlight}`,
      "provider": {
        "@type": "Organization",
        "name": "instudia",
        "sameAs": `${AppConfig.canonicalBase}`,
        "image": "https://www.instudianagaland.com/assets/images/logo-with-tagline.png",
        "telephone": "+91-8798-587779"
      },
      "inLanguage": ["en", "hi"],
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": `${AppConfig.canonicalBase}` },
        { "@type": "ListItem", "position": 2, "name": "Courses", "item": `${AppConfig.canonicalBase}/courses` },
        { "@type": "ListItem", "position": 3, "name": courseDetails.fullTitle, "item": `${AppConfig.canonicalBase}/courses/${slug}` }
      ]
    }
  ]

  return (
    <>
      <CourseDetailContent courseDetails={courseDetails} relatedCourses={relatedCourses} />
      <Script
          id="site-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLd),
          }}
        />
    </>
  );
}
