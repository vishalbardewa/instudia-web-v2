import React from "react";
import Image from "next/image";

import {
  CheckBadgeIcon,
  AcademicCapIcon,
  ClockIcon,
  BuildingLibraryIcon,
} from "@heroicons/react/24/solid";

import IconButton from "@/app/components/atom/IconButton";
import { IMAGE_LIST } from "@/app/utils/CourseImageList";
import { Metadata, ResolvingMetadata } from "next";
import META_LOOKUP from "@/app/_utils/MetaLookup";
import { AppConfig } from "@/app/_utils/AppConfig";
import Script from "next/script";
import { notFound } from "next/navigation";

const ICON_LIST: any = {
  CheckBadgeIcon: <CheckBadgeIcon className="h-6 w-6" aria-hidden="true" />,
  AcademicCapIcon: <AcademicCapIcon className="h-6 w-6" aria-hidden="true" />,
  ClockIcon: <ClockIcon className="h-6 w-6" aria-hidden="true" />,
  BuildingLibraryIcon: (
    <BuildingLibraryIcon className="h-6 w-6" aria-hidden="true" />
  ),
};

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
  };
}

const ContentHead = ({
  courseDetails: {
    pageTitle,
    features,
    inDemand,
    courseHightlight,
    image,
    category,
    comingSoon = ""
  },
}: any) => (
  <section className="mt-14 mx-auto max-w-7xl px-4 sm:mt-24 sm:px-6 lg:mt-16">
    <div className="grid md:grid-cols-2 md:gap-1 lg:grid-cols-12 lg:gap-8">
      <div className="sm:text-center md:mx-auto md:max-w-2xl md:text-left lg:col-span-6 lg:text-left">
        <h1>
          <span className="block text-base font-semibold text-gray-500 sm:text-lg lg:text-base xl:text-lg">
            {category}
          </span>
          <span className="mt-1 block text-5xl font-bold leading-none tracking-tight lg:text-6xl xl:text-6xl">
            <span className="block text-gray-900">{pageTitle.text}</span>
            <span className="block text-yellow-600">
              {pageTitle.highlightText}
            </span>
          </span>
        </h1>

        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:max-w-4xl">
          <dl className="grid max-w-xl grid-cols-1 gap-y-10 gap-x-8 lg:max-w-none lg:grid-cols-2 lg:gap-y-8">
            {features.map((feature: any) => (
              <div key={feature.name} className="relative pl-12">
                <dt className="text-base font-semibold leading-7 text-gray-900">
                  <div className="absolute top-0 left-0 flex h-10 w-10 items-center justify-center">
                    {ICON_LIST[feature.icon]}
                  </div>
                  {feature.name}{" "}
                </dt>
                <dd className="text-base leading-7 text-gray-600">
                  {feature.description}{" "}
                  {["Duration"].includes(feature.name)
                    ? !Number.isNaN(feature.description) &&
                      Number(feature.description) > 1
                      ? "months"
                      : "month"
                    : ""}
                </dd>
              </div>
            ))}
          </dl>
        </div>
        <p className="mt-6 text-base text-gray-500 sm:mt-5 sm:text-xl lg:text-lg xl:text-xl"></p>
      </div>
      <div className="relative mt-12 sm:mx-auto sm:max-w-lg md:flex md:self-center lg:col-span-6 lg:mx-0 lg:mt-0 lg:flex lg:max-w-none lg:items-center">
        <div className="relative mx-auto w-full rounded-lg shadow-lg lg:max-w-xl">
          <span className="sr-only">Watch our video to learn more</span>
          {inDemand && (
            <span className="absolute top-3 right-2 inline-flex items-center rounded-full bg-yellow-100 px-3 py-0.5 text-sm font-medium text-yellow-800">
              In Demand
            </span>
          )}
          {comingSoon && (
            <span className="absolute top-3 right-2 inline-flex items-center rounded-full bg-yellow-100 px-3 py-0.5 text-sm font-medium text-yellow-800">
              Coming Soon
            </span>
          )}
          <div className="relative w-full aspect-[16/9] rounded-lg overflow-hidden">
            <Image 
              src={image} 
              alt={pageTitle.text} 
              fill 
              priority 
              sizes="(max-width: 768px) 100vw, 600px"
              className="object-cover" 
            />
          </div>
        </div>
      </div>
    </div>

    <p className="!my-12 text-2xl font-semibold lg:text-4xl">
      {courseHightlight}
    </p>
  </section>
);

const FourParaGrid = ({ fourReasons }: any) => (
  <div className="mt-24 px-8 lg:px-16 font-bold">
    <div className="relative">
      <div className="absolute inset-0 flex items-center" aria-hidden="true">
        <div className="w-full border-t border-gray-300" />
      </div>
      <div className="relative flex justify-center">
        <span className="bg-white px-3 text-2xl font-medium text-gray-900">
          In This Course
        </span>
      </div>
    </div>
    <section className="mt-8 text-base font-normal lg:grid lg:grid-cols-2 lg:gap-x-24 lg:gap-y-4">
      {fourReasons?.map((reason: any) => (
        <div className="mt-8 sm:grid-cols-2" key={reason.id}>
          <span className="grid grid-flow-col gap-4">
            <CheckBadgeIcon className="h-8 w-8" aria-hidden="true" />
            {reason.description}
          </span>
        </div>
      ))}
    </section>
  </div>
);

const RelatedCoursesGrid = ({ relatedCourses }: any) => {
  const isCarousel = relatedCourses.length > 3;

  return (
    <div className="mt-48 px-16 font-bold pb-24">
      <div className="relative">
        <div className="absolute inset-0 flex items-center" aria-hidden="true">
          <div className="w-full border-t border-gray-300 lg:w-full" />
        </div>
        <div className="relative flex justify-center">
          <span className="bg-white px-3 text-2xl font-medium text-gray-900">
            Related Courses
          </span>
        </div>
      </div>
      <div>
        <h1>
          <span className="mt-1 block text-3xl font-bold leading-none tracking-tight sm:text-5xl lg:text-3xl xl:text-3xl">
            <span className="block text-gray-900 sm:max-w-sm lg:max-w-[35%]">
              Find More Courses Like This One.
            </span>
          </span>
        </h1>
      </div>
      
      {/* Hide scrollbar structurally using CSS modules or inline webkit rules, fallback to generic snap */}
      <style>{`.no-scrollbar::-webkit-scrollbar { display: none; } .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }`}</style>
      
      <section className={`mx-auto mt-16 ${isCarousel ? 'flex overflow-x-auto snap-x snap-mandatory gap-8 pb-8 no-scrollbar scroll-smooth' : 'grid max-w-2xl grid-cols-1 gap-x-8 gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-3'}`}>
        {relatedCourses.map((course: any) => (
          <article
            key={course.id || course.slug}
            className={`flex flex-col items-start justify-between ${isCarousel ? 'w-[85vw] sm:w-[47vw] lg:w-[31.5%] shrink-0 snap-center mb-8' : ''}`}
          >
            <div className="relative w-full aspect-[16/9] sm:aspect-[2/1] lg:aspect-[3/2] rounded-2xl overflow-hidden bg-gray-100">
              <Image
                alt={course.fullTitle}
                src={IMAGE_LIST[`${course.slug}`] || course.image}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover"
              />
              <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-gray-900/10 transition-colors" />
            </div>
            <div className="max-w-xl">
              <div className="group relative">
                <h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
                  <a href={`/courses/${course.slug}`}>
                    <span className="absolute inset-0" />
                    {course.fullTitle}
                  </a>
                </h3>
                <p className="mt-5 line-clamp-3 text-sm font-light leading-6 text-gray-600">
                  {course.courseHightlight || course.courseHighlight}
                </p>
              </div>
            </div>
          </article>
        ))}
        {/* {relatedCourses?.map((course: any, i: any) => (
          <div key={i} className="mt-12 space-y-1 sm:grid-cols-6">
            <figure className="relative max-w-xl cursor-pointer">
              <img
                className="rounded-lg"
                src={course.image}
                alt="image description"
              />
              <figcaption className="absolute bottom-0 rounded-tr-xl bg-slate-500 px-4 text-lg font-bold text-white hover:bg-yellow-500">
                <p className="text-3xl">{course.fullTitle}</p>
              </figcaption>
            </figure>

            <div className="space-y-2">
              <div className="space-y-1 text-lg font-medium leading-6">
                <p className="font-medium text-black">
                  {course.courseHightlight}
                </p>
              </div>
            </div>
          </div>
        ))} */}
      </section>
    </div>
  );
};

const FixedMarquee = () => (
  <div className="relative mx-5 flex overflow-x-hidden text-black">
    <div className="animate-marquee whitespace-nowrap py-12 font-extrabold ">
      <span className="ml-3 text-6xl">Start the </span>
      <span className="text-6xl">course and upskill </span>
      <span className="text-6xl">your </span>
      <span className="text-6xl">professional </span>
      <span className="text-6xl">career. </span>
    </div>

    <div className="absolute top-0 animate-marquee2 whitespace-nowrap py-12 font-extrabold">
      <span className="ml-3 text-6xl"> Start the </span>
      <span className="text-6xl">course and upskill </span>
      <span className="text-6xl">your </span>
      <span className="text-6xl">professional </span>
      <span className="text-6xl">career. </span>
    </div>
  </div>
);

const EnrollStrip = () => (
  <div className="mt-16 flex flex-col items-center px-4">
    <h1 className="block  text-xl font-semibold italic text-black lg:text-3xl">
      Wanna Start Today?
    </h1>
    <p className="px-4">
      <IconButton
        text="Enroll Now"
        formLink="https://tally.so/r/wMX0Dk"
        buttonSize="px-4 py-2 mt-0 lg:px-8 lg:py-4 lg:mt-4"
        textSize="font-extrabold text-base lg:text-2xl"
        iconSize="8"
      />
    </p>
  </div>
);

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
  // Gracefully enforce Promise-based unwrapping for Next 15+ stability
  const resolvedParams = await params;
  const slug = resolvedParams?.slug || params?.slug;

  const { courseDetails } = await getCourseBySlug(slug);
  
  if (!courseDetails) {
    return notFound();
  }

  const { courses } = await getCourses();

  const getSimilarCourses = (allCourses: any[], currentCourse: any, minElements: number) => {
    if (!allCourses || allCourses.length === 0) return [];
    
    // Aggressively rigorously filter out the current active course natively ensuring absolute omission
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
      
      // Category Match is the strongest indicator of similarity
      if (c.category && currentCourse.category && c.category === currentCourse.category) {
        score += 15;
      }

      // Keyword matching
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

    // Sort by descending correlation matrix
    scoredCourses.sort((a, b) => b.score - a.score);
    
    // Threshold barrier mapping to extract highly relevant cross-links
    const thresholdCourses = scoredCourses.filter(sc => sc.score > 2).map(sc => sc.course);
    
    // Fallback: If strict threshold fails to hit minimum carousel threshold, slice the top absolute matches
    if (thresholdCourses.length < minElements) {
       return scoredCourses.slice(0, Math.max(minElements, thresholdCourses.length)).map(sc => sc.course);
    }
    
    // Cap at 8 to prevent infinite snapping
    return thresholdCourses.slice(0, 8);
  };

  const relatedCourses = getSimilarCourses(courses?.courses || [], courseDetails, RECOMMENDED_COURSES_COUNT);

  const durationFeature = courseDetails.features?.find((f: any) => f.name === "Duration");
  const durationMonths = durationFeature?.description ? parseInt(durationFeature.description) : null;

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "Course",
      "name": `${courseDetails.fullTitle} in Dimapur, Nagaland`,
      "description": `${courseDetails.courseHightlight ?? courseDetails.courseHighlight}`,
      "provider": {
        "@type": "Organization",
        "name": "instudia",
        "sameAs": `${AppConfig.canonicalBase}`
      },
      ...(courseDetails.price && {
        "offers": {
          "@type": "Offer",
          "price": `${courseDetails.price.discountedPrice}`,
          "priceCurrency": "INR",
          "availability": "https://schema.org/InStock",
          "url": `${AppConfig.canonicalBase}/courses/${slug}`
        }
      }),
      ...(durationMonths && {
        "timeRequired": `P${durationMonths}M`,
        "hasCourseInstance": {
          "@type": "CourseInstance",
          "courseMode": "In-Person",
          "location": {
            "@type": "Place",
            "name": "instudia, Dimapur",
            "address": {
              "@type": "PostalAddress",
              "addressLocality": "Dimapur",
              "addressRegion": "Nagaland",
              "addressCountry": "IN"
            }
          }
        }
      }),
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
      <ContentHead courseDetails={courseDetails} />
      <FourParaGrid fourReasons={courseDetails.fourReasons} />
      <EnrollStrip />
      <FixedMarquee />
      <RelatedCoursesGrid relatedCourses={relatedCourses} />
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
