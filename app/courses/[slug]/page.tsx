import React from "react";

import {
  CheckBadgeIcon,
  AcademicCapIcon,
  ClockIcon,
  BuildingLibraryIcon,
} from "@heroicons/react/24/solid";

import IconButton from "@/app/components/atom/IconButton";

const ICON_LIST: any = {
  CheckBadgeIcon: <CheckBadgeIcon className="h-6 w-6" aria-hidden="true" />,
  AcademicCapIcon: <AcademicCapIcon className="h-6 w-6" aria-hidden="true" />,
  ClockIcon: <ClockIcon className="h-6 w-6" aria-hidden="true" />,
  BuildingLibraryIcon: (
    <BuildingLibraryIcon className="h-6 w-6" aria-hidden="true" />
  ),
};

const ContentHead = ({
  courseDetails: {
    pageTitle,
    features,
    inDemand,
    courseHightlight,
    image,
    category,
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
          <img className="w-full rounded-lg" src={image} alt="" />
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
  return (
    <div className="mt-48 px-4 font-bold">
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
            <span className="block text-gray-900 sm:max-w-sm lg:max-w-[25%]">
              Find More Courses Like This One.
            </span>
          </span>
        </h1>
      </div>
      <section className="font-light lg:grid lg:grid-cols-2 lg:gap-x-12 lg:gap-y-4">
        {relatedCourses?.map((course: any, i: any) => (
          <div key={i} className="mt-12 space-y-1 sm:grid-cols-6">
            <figure className="relative max-w-xl cursor-pointer">
              <img
                className="rounded-lg"
                src="/assets/images/python-level-1.png"
                alt="image description"
              />
              <figcaption className="absolute bottom-0 rounded-tr-xl bg-slate-500 px-4 text-lg font-bold text-white hover:bg-yellow-500">
                <p className="text-3xl">{course.title}</p>
              </figcaption>
            </figure>

            <div className="space-y-2">
              <div className="space-y-1 text-lg font-medium leading-6">
                <p className="font-medium text-black">
                  {course.shortDescription}
                </p>
              </div>
            </div>
          </div>
        ))}
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

const BE_URL = process.env.NODE_ENV === 'development' ? "http://127.0.0.1:3000" : "https://instudia-v2.netlify.app/"

async function getCourseBySlug(slug: string) {
  const res = await fetch(`${BE_URL}/api/courses/${slug}`, {
    method: "GET",
  });

  return res.json();
}

export default async function Course({ params: { slug } }: any) {
  const { courseDetails } = await getCourseBySlug(slug);

  return (
    <>
      <ContentHead courseDetails={courseDetails} />
      <FourParaGrid fourReasons={courseDetails.fourReasons} />
      <EnrollStrip />
      <FixedMarquee />
      <RelatedCoursesGrid relatedCourses={courseDetails.relatedCourses} />
    </>
  );
}
