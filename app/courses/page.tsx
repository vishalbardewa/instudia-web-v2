import React from "react";
import CourseSectionList from "../components/molecules/CourseSectionList";
import Image from "next/image";

function Courses() {
  return (
    <div className="relative grid grid-cols-12 col-start-2 col-end-12">
      <Image
        className="absolute right-0 size-80 lg:size-[800px] lg:right-[80px] opacity-[.03] -z-1"
        src="https://ik.imagekit.io/dxffek9yf/course-list-page/background.png?updatedAt=1726161612844"
        width={800}
        height={800}
        alt="Design Hexagonal"
      />
      <h4 className="col-start-2 col-end-8 lg:col-start-2 lg:col-end-8 py-1 inline-block rounded-md text-sm font-mono uppercase tracking-wider text-stone-900/70 mt-16">
        <span>💪</span> Upskill Today!
      </h4>
      <div className="text-4xl col-start-2 col-end-9 font-semibold leading-tight lg:text-6xl">
        Empower{" "}
        <span className="before:block before:absolute before:-inset-1 before:-skew-y-3 before:bg-yellow-500 relative inline-block">
          <span className="relative p-4 text-white">Yourself</span>
        </span>{" "}
        <br />
        With Skills of Tomorrow.
      </div>
      <div className="col-start-2 col-end-12">
        <section className="gutter">
          <div className="mt-8">
            <h2 className="text-4xl font-light leading-tight lg:tracking-tight mb-10 lg:mb-16">
              Grow your expertise with instudia
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-2 gap-y-70 pb-150">
            <article className="col-span-1 relative bg-[#e16687] min-h-96 rounded-md card__hover">
              <a
                className="flex flex-col h-full py-5 arrow__right"
                href="#"
              >
                <div className="px-4 pb-2">
                  <h2 className="flex flex-col items-start w-4/5">
                    <span className="text-white font-mono tracking-wide uppercase text-sm">
                      Comprehensive Curriculum
                    </span>
                  </h2>
                </div>
                <img
                  className="w-9/12 md:w-11/12 max-w-md m-auto card__image initial loading"
                  src="https://ik.imagekit.io/dxffek9yf/course-list-page/pattern-1.png?updatedAt=1726168780299"
                  data-was-processed="true"
                />
                <div className="flex justify-between pt-2 px-4 mt-auto w-full lg:w-4/5">
                  <p className="flex flex-col items-start text-white">
                    Covers essential computing skills and advanced technologies.
                  </p>
                </div>
              </a>
            </article>
            <article className="col-span-1 relative bg-[#b936d0] min-h-96 rounded-md card__hover">
              <a
                className="flex flex-col h-full py-5 arrow__right"
                href="#"
              >
                <div className="px-4 pb-2">
                  <h2 className="flex flex-col items-start">
                    <span className="font-mono tracking-wide uppercase text-sm text-white">
                      Hands-on Projects
                    </span>
                  </h2>
                </div>
                <img
                  className="w-9/12 md:w-11/12 max-w-md m-auto card__image initial loading"
                  src="https://ik.imagekit.io/dxffek9yf/course-list-page/pattern-3.png?updatedAt=1726168779931"
                  data-was-processed="true"
                />
                <div className="flex justify-between pt-2 px-4 mt-auto w-full lg:w-3/4">
                  <p className="flex flex-col items-start text-white">
                    Practical tasks to enhance real-world problem-solving
                    abilities.
                  </p>
                </div>
              </a>
            </article>
            <article className="col-span-1 relative bg-[#99daee] min-h-96 rounded-md card__hover">
              <a
                className="flex flex-col h-full py-5 arrow__right"
                href="#"
              >
                <div className="px-4 pb-2">
                  <h2 className="flex flex-col items-start">
                    <span className="text-white font-mono tracking-wide uppercase text-sm">
                      Industry-Relevant Skills
                    </span>
                  </h2>
                </div>
                <img
                  className="w-9/12 md:w-11/12 max-w-md m-auto card__image initial loaded"
                  src="https://ik.imagekit.io/dxffek9yf/course-list-page/pattern-4.png?updatedAt=1726168780003"
                  data-was-processed="true"
                />
                <div className="flex justify-between pt-2 px-4 mt-auto w-full lg:w-3/4">
                  <p className="text-white flex flex-col items-start">
                    Prepares students for diverse roles in technology sectors.
                  </p>
                </div>
              </a>
            </article>
          </div>
        </section>
      </div>
      <section className="col-start-1 col-end-13 gutter mt-8 py-8 bg-[#171717] lg:mt-16"> 
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2 gap-y-70 pb-150 mx-20">
          <div className="flex md:px-4 py-4">
            <div className="content-center md:max-w-96">
              <h2 className="text-3xl text-white font-light tracking-tight mb-4">
                Earn certificate and stand out from the competition
              </h2>
              <div className="flex flex-wrap text-white space-y-4">
                {/* <p>
                  Verified Skills certificates prove your learning and domain
                  knowledge of specific topics covered in our courses and career
                  paths
                </p> */}
                <p>
                  Get domain knowledge across our Fundamental, Intermediate and
                  Professional series to showcase your capabilities.
                </p>
              </div>
            </div>
          </div>
          <article className="col-span-1 relative bg-[#FFD28A] min-h-96 rounded-md card__hover">
            <a
              className="flex flex-col h-full py-5 arrow__right"
              href="#"
            >
              <div className="px-4 pb-2">
                <h4 className="flex flex-col items-start w-4/5">
                  <span className="font-mono tracking-wide uppercase text-sm">
                    Receive Accredited Certificate for Proven Skill Mastery
                  </span>
                </h4>
              </div>
              <img
                className="w-9/12 md:w-11/12 max-w-md m-auto card__image loading"
                src="https://everpath-course-content.s3-accelerate.amazonaws.com/instructor%2Fa5kvkze8ki7bepnyswywp8vdk%2Fpublic%2F1718674299%2Fverified_export_test.1718674299381.png"
                width="800"
                height="400"
                data-was-processed="true"
              />
              <div className="flex justify-between pt-2 px-4 mt-auto w-full lg:w-4/5">
                <p className="flex flex-col items-start">
                  Discover your abilities in specific topics covered in our Curriculum
                </p>
              </div>
            </a>
          </article>
          <div className="relative bg-[#141414] min-h-96 w-full">
            <div className="flex flex-col gap-2 h-full">
              <a
                className="h-1/3 border border-stone-500 p-4 rounded-md"
                href="/page/badges#fundamentals"
              >
                <h4 className="text-stone-50">
                  <span className="font-mono tracking-wide uppercase text-sm internal_link">
                    Fundamental Courses
                  </span>
                </h4>
                <p className="text-sm text-stone-50">
                  Earn a certificate by mastering the fundamentals for success
                  on the Instudia platform, showcasing your skills and readiness
                  for the tech industry.
                </p>
              </a>{" "}
              <a
                className="h-1/3 border border-stone-500 p-4 rounded-md"
                href="/page/badges#fundamentals"
              >
                <h4 className="text-stone-50">
                  <span className="font-mono tracking-wide uppercase text-sm internal_link">
                    Intermediate Series
                  </span>
                </h4>
                <p className="text-sm text-stone-50">
                  Earn a certificate for mastering the intermediate skills
                  essential for your knowledge and enhance your career prospects
                  with our recognized certifications.
                </p>
              </a>{" "}
              <a
                className="h-1/3 border border-stone-500 p-4 rounded-md"
                href="/page/badges#retail"
              >
                <h4 className="text-stone-50">
                  <span className="font-mono tracking-wide uppercase text-sm internal_link">
                    Professional Series
                  </span>
                </h4>
                <p className="text-sm text-stone-50">
                  Earn a certificate for mastering the advanced skills for Top 10%
                </p>
              </a>
            </div>
          </div>
        </div>
      </section>
      <div className="col-start-2 col-end-12">
        <CourseSectionList />
      </div>
    </div>
  );
}

export default Courses;
