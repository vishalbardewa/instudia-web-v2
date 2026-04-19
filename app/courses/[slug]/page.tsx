import React from "react";
import { Metadata, ResolvingMetadata } from "next";
import META_LOOKUP from "@/app/_utils/MetaLookup";
import { AppConfig } from "@/app/_utils/AppConfig";
import Script from "next/script";
import { notFound } from "next/navigation";
import CourseDetailContent from "./CourseDetailContent";
import { IMAGE_LIST } from "@/app/utils/CourseImageList";
import coursesData from "@/app/courses.json";

const RECOMMENDED_COURSES_COUNT = 3;

type Props = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

/**
 * Pre-render all course pages at build time (SSG).
 * Reads directly from courses.json so no internal API fetch is needed.
 */
export async function generateStaticParams() {
  return coursesData.courses.map((course) => ({ slug: course.slug }));
}

export const dynamicParams = false;

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

/** Resolve course details directly from courses.json — no runtime API call needed */
function getCourseBySlug(slug: string) {
  const course = coursesData.courses.find((c) => c.slug === slug);
  return course ?? null;
}

/** Get all courses except the current one for related courses widget */
function getOtherCourses(currentSlug: string) {
  return coursesData.courses.filter((c) => c.slug !== currentSlug);
}

/** Score-based similar course finder */
function getSimilarCourses(allCourses: any[], currentCourse: any, minElements: number) {
  if (!allCourses || allCourses.length === 0) return [];

  const otherCourses = allCourses.filter(
    (c: any) =>
      c.slug !== currentCourse?.slug &&
      c.fullTitle !== currentCourse?.fullTitle
  );

  const currentWords = new Set(
    `${currentCourse.fullTitle} ${currentCourse.courseHightlight || currentCourse.courseHighlight || ""}`
      .toLowerCase()
      .replace(/[^a-z0-9 ]/g, "")
      .split(" ")
      .filter((w: string) => w.length > 3)
  );

  const scoredCourses = otherCourses.map((c: any) => {
    let score = 0;
    if (c.category && currentCourse.category && c.category === currentCourse.category) {
      score += 15;
    }
    const targetWords = `${c.fullTitle} ${c.courseHightlight || c.courseHighlight || ""}`
      .toLowerCase()
      .replace(/[^a-z0-9 ]/g, "")
      .split(" ");

    targetWords.forEach((word: string) => {
      if (word.length > 3 && currentWords.has(word)) {
        score += 2;
      }
    });
    return { course: c, score };
  });

  scoredCourses.sort((a, b) => b.score - a.score);
  const thresholdCourses = scoredCourses.filter((sc) => sc.score > 2).map((sc) => sc.course);

  if (thresholdCourses.length < minElements) {
    return scoredCourses.slice(0, Math.max(minElements, thresholdCourses.length)).map((sc) => sc.course);
  }
  return thresholdCourses.slice(0, 8);
}

/** Extract duration in months from course features */
function getDurationMonths(features: any[]): string {
  const d = features?.find((f: any) => f.name === "Duration");
  return d ? `${d.description} Month${parseInt(d.description) !== 1 ? "s" : ""}` : "";
}

export default async function Course({ params }: any) {
  const resolvedParams = await params;
  const slug = resolvedParams?.slug || params?.slug;

  const courseDetails = getCourseBySlug(slug);

  if (!courseDetails) {
    return notFound();
  }

  const allOtherCourses = getOtherCourses(slug);
  const relatedCourses = getSimilarCourses(allOtherCourses, courseDetails, RECOMMENDED_COURSES_COUNT);

  const durationMonths = getDurationMonths(courseDetails.features);
  const priceValue = courseDetails.price?.discountedPrice;

  // Course-specific FAQs derived from course details
  const courseFAQs = [
    {
      "@type": "Question",
      "name": `What will I learn in the ${courseDetails.fullTitle} course at instudia?`,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": courseDetails.courseHightlight || courseDetails.courseHighlight || `You will gain practical skills in ${courseDetails.fullTitle} with hands-on projects and industry-aligned training at instudia, Dimapur.`,
      },
    },
    {
      "@type": "Question",
      "name": `How long is the ${courseDetails.fullTitle} course?`,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": durationMonths
          ? `The ${courseDetails.fullTitle} course at instudia is ${durationMonths} long, with flexible batch timings available Monday to Saturday.`
          : `Contact instudia at +91 87985 87779 for the latest schedule and duration for the ${courseDetails.fullTitle} course.`,
      },
    },
    {
      "@type": "Question",
      "name": `What is the fee for the ${courseDetails.fullTitle} course at instudia?`,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": priceValue
          ? `The ${courseDetails.fullTitle} course is available at ₹${priceValue.toLocaleString("en-IN")} at instudia, Dimapur. EMI options may be available — call +91 87985 87779 for details.`
          : `Call instudia at +91 87985 87779 or visit our campus in Fellowship Colony, Dimapur to get the latest fee details for ${courseDetails.fullTitle}.`,
      },
    },
    {
      "@type": "Question",
      "name": `Does instudia provide a certificate for the ${courseDetails.fullTitle} course?`,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": `Yes, instudia provides an industry-recognized certificate upon successful completion of the ${courseDetails.fullTitle} course. instudia is ISO certified and affiliated with AISECT and MSME.`,
      },
    },
  ];

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
        "telephone": "+91 87985 87779",
      },
      "inLanguage": ["en", "hi"],
      ...(durationMonths ? { "timeRequired": `P${courseDetails.features?.find((f: any) => f.name === "Duration")?.description ?? ""}M` } : {}),
      ...(priceValue
        ? {
            "offers": {
              "@type": "Offer",
              "price": priceValue,
              "priceCurrency": "INR",
              "availability": "https://schema.org/InStock",
              "url": `${AppConfig.canonicalBase}/courses/${slug}`,
            },
          }
        : {}),
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": `${AppConfig.canonicalBase}` },
        { "@type": "ListItem", "position": 2, "name": "Courses", "item": `${AppConfig.canonicalBase}/courses` },
        {
          "@type": "ListItem",
          "position": 3,
          "name": courseDetails.fullTitle,
          "item": `${AppConfig.canonicalBase}/courses/${slug}`,
        },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": courseFAQs,
    },
  ];

  return (
    <>
      <CourseDetailContent courseDetails={courseDetails} relatedCourses={relatedCourses} />
      <Script
        id="course-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd),
        }}
      />
    </>
  );
}
