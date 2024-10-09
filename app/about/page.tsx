import Image from "next/image";
import { useEffect, useState } from "react";
import { AppConfig } from "../_utils/AppConfig";

const stats = [
  { label: "Students trained till date", value: "200+" },
  { label: "Hours of Training Delivered", value: "10,000+" },
  { label: "Course Completion Rate", value: "98%" },
];
const values = [
  {
    name: "Impart",
    description:
      "We strive to impart cutting-edge knowledge and skills, fostering a culture of continuous learning. Our commitment is to equip individuals with the expertise needed for success in the dynamic tech landscape.",
  },
  {
    name: "Inspirit",
    description:
      "We aspire to inspirit the youth, igniting a passion for innovation and excellence. Through mentorship and a supportive community, we aim to kindle the flames of creativity, enabling individuals to exceed their own expectations.",
  },
  {
    name: "Impact",
    description:
      "Our ultimate goal is to empower individuals to make a meaningful impact on society. By instilling a sense of responsibility and purpose, we believe that our trained professionals can contribute to a better future, driving positive change in the world.",
  },
];

export const metadata = {
  title:
    "Meet Our Team | instudia - Passionate Educators and Industry Experts Shaping the Future of Learning",
  description:
    "Discover the passionate team behind Instudia—educators, technologists, and industry experts dedicated to empowering learners. Learn how our diverse group is shaping the future of skill development with experience, innovation, and community support.",
  openGraph: {
    title:
      "Meet Our Team | instudia - Passionate Educators and Industry Experts Shaping the Future of Learning",
    description:
      "Discover the passionate team behind Instudia—educators, technologists, and industry experts dedicated to empowering learners. Learn how our diverse group is shaping the future of skill development with experience, innovation, and community support.",
    url: `${AppConfig.canonicalBase}`,
    locale: AppConfig.locale,
    siteName: AppConfig.site_name,
    images: [
      {
        url: "https://res.cloudinary.com/dhwg77gwm/image/upload/f_auto,q_auto/v1/instudia/tqo7qzztc4duzktj0jt9",
        width: 800,
        height: 600,
        type: "image/jpeg",
        alt: "Upskill with instudia",
      },
      {
        url: "https://res.cloudinary.com/dhwg77gwm/image/upload/f_auto,q_auto/v1/instudia/qzmdhewkbsyxmwsjccnu",
        width: 800,
        height: 600,
        alt: "Enroll with instudia",
        type: "image/jpeg",
      },
    ],
  },
  twitter: {
    title:
      "Meet Our Team | instudia - Passionate Educators and Industry Experts Shaping the Future of Learning",
    description:
      "Discover the passionate team behind Instudia—educators, technologists, and industry experts dedicated to empowering learners. Learn how our diverse group is shaping the future of skill development with experience, innovation, and community support.",
    card: "https://res.cloudinary.com/dhwg77gwm/image/upload/f_auto,q_auto/v1/instudia/tqo7qzztc4duzktj0jt9",
  },
  metadataBase: new URL("https://instudianagaland.com"),
};

const TeamMemberCard = ({ name, designation, imageUrl }: any) => (
  <div className="border-[2px] col-span-2 lg:col-span-1 border-black flex flex-col rounded-[30px] p-[18px]">
    <div className="flex flex-col items-center ">
      <Image
        alt="team"
        width={300}
        height={300}
        className="rounded-2xl"
        src={imageUrl}
      />
      <div className="space-y-[4px] pt-[20px] text-center mt-auto">
        <p className="xl:text-[18px] xl:leading-[1.3] xl:font-bold text-[18px] leading-[1.2777777777777777] font-medium">
          {name}
        </p>
        <p className="text-text-default text-[16px] leading-[1.625] font-normal">
          {designation}
        </p>
      </div>
    </div>
  </div>
);

export default function About() {
  return (
    <div className="bg-white">
      <main className="isolate">
        {/* Hero section */}
        <div className="relative isolate -z-10 overflow-hidden">
          <svg
            className="absolute inset-x-0 top-0 -z-10 h-[64rem] w-full stroke-gray-200 [mask-image:radial-gradient(32rem_32rem_at_center,white,transparent)]"
            aria-hidden="true"
          >
            <defs>
              <pattern
                id="1f932ae7-37de-4c0a-a8b0-a6e3b4d44b84"
                width={200}
                height={200}
                x="50%"
                y={-1}
                patternUnits="userSpaceOnUse"
              >
                <path d="M.5 200V.5H200" fill="none" />
              </pattern>
            </defs>
            <svg x="50%" y={-1} className="overflow-visible fill-gray-50">
              <path
                d="M-200 0h201v201h-201Z M600 0h201v201h-201Z M-400 600h201v201h-201Z M200 800h201v201h-201Z"
                strokeWidth={0}
              />
            </svg>
            <rect
              width="100%"
              height="100%"
              strokeWidth={0}
              fill="url(#1f932ae7-37de-4c0a-a8b0-a6e3b4d44b84)"
            />
          </svg>
          <div
            className="absolute left-1/2 right-0 top-0 -z-10 -ml-24 transform-gpu overflow-hidden blur-3xl lg:ml-24 xl:ml-48"
            aria-hidden="true"
          >
            <div
              className="aspect-[801/1036] w-[50.0625rem] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30"
              style={{
                clipPath:
                  "polygon(63.1% 29.5%, 100% 17.1%, 76.6% 3%, 48.4% 0%, 44.6% 4.7%, 54.5% 25.3%, 59.8% 49%, 55.2% 57.8%, 44.4% 57.2%, 27.8% 47.9%, 35.1% 81.5%, 0% 97.7%, 39.2% 100%, 35.2% 81.4%, 97.2% 52.8%, 63.1% 29.5%)",
              }}
            />
          </div>
          <div className="overflow-hidden">
            <div className="mx-auto max-w-7xl px-6 pb-32 pt-36 sm:pt-60 lg:px-8 lg:pt-32">
              <div className="mx-auto max-w-2xl gap-x-14 lg:mx-0 lg:flex lg:max-w-none lg:items-center leading-tight">
                <div className="w-full max-w-xl lg:shrink-0 xl:max-w-2xl">
                  <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
                    We&apos;re empowering students to upskill and build careers.
                  </h1>
                  <p className="relative mt-6 text-lg leading-8 text-gray-600 sm:max-w-md lg:max-w-none">
                    A specialized learning platform nestled in Dimapur,
                    Nagaland. We work to empower students and tech
                    professionals, guiding them to elevate their skill sets and
                    propel their careers to new heights. With a dedicated focus
                    on transformation, we are committed to providing a dynamic
                    learning environment that fosters growth and success.
                  </p>
                </div>
                <div className="mt-14 flex justify-end gap-8 sm:-mt-44 sm:justify-start sm:pl-20 lg:mt-0 lg:pl-0">
                  <div className="ml-auto w-44 flex-none space-y-8 pt-32 sm:ml-0 sm:pt-80 lg:order-last lg:pt-36 xl:order-none xl:pt-80">
                    <div className="relative">
                      <img
                        src="https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&h=528&q=80"
                        alt=""
                        className="aspect-[2/3] w-full rounded-xl bg-gray-900/5 object-cover shadow-lg"
                      />
                      <div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset ring-gray-900/10" />
                    </div>
                  </div>
                  <div className="mr-auto w-44 flex-none space-y-8 sm:mr-0 sm:pt-52 lg:pt-36">
                    <div className="relative">
                      <img
                        src="https://images.unsplash.com/photo-1485217988980-11786ced9454?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&h=528&q=80"
                        alt=""
                        className="aspect-[2/3] w-full rounded-xl bg-gray-900/5 object-cover shadow-lg"
                      />
                      <div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset ring-gray-900/10" />
                    </div>
                    <div className="relative">
                      <img
                        src="https://images.unsplash.com/photo-1559136555-9303baea8ebd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&crop=focalpoint&fp-x=.4&w=396&h=528&q=80"
                        alt=""
                        className="aspect-[2/3] w-full rounded-xl bg-gray-900/5 object-cover shadow-lg"
                      />
                      <div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset ring-gray-900/10" />
                    </div>
                  </div>
                  <div className="w-44 flex-none space-y-8 pt-32 sm:pt-0">
                    <div className="relative">
                      <img
                        src="https://images.unsplash.com/photo-1670272504528-790c24957dda?ixlib=rb-4.0.3&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&crop=left&w=400&h=528&q=80"
                        alt=""
                        className="aspect-[2/3] w-full rounded-xl bg-gray-900/5 object-cover shadow-lg"
                      />
                      <div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset ring-gray-900/10" />
                    </div>
                    <div className="relative">
                      <img
                        src="https://images.unsplash.com/photo-1670272505284-8faba1c31f7d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&h=528&q=80"
                        alt=""
                        className="aspect-[2/3] w-full rounded-xl bg-gray-900/5 object-cover shadow-lg"
                      />
                      <div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset ring-gray-900/10" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="rounded-[20px] xl:rounded-[40px] border-2 border-black aspect-[690/500] absolute bg-white z-[-1] top-[-14px] right-[-18px] w-full h-3/4 xl:top-14 xl:right-[-87px]">
            <div className="flex items-center absolute right-0 top-0 xl:translate-x-[calc(50%-12px)] translate-x-[calc(50%-6px)] translate-y-[-2px] rotate-[45deg]"></div>
          </div>
        </div>

        {/* Content section */}
        <div className="mx-auto -mt-12 max-w-7xl px-6 sm:mt-0 lg:px-8 xl:-mt-8">
          <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-none">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Our mission
            </h2>
            <div className="mt-6 flex flex-col gap-x-8 gap-y-20 lg:flex-row">
              <div className="lg:w-full lg:max-w-2xl lg:flex-auto">
                <p className="text-xl leading-8 text-gray-600">
                  The concept has evolved and continues to evolve. Nagaland's
                  youth want to be self-sufficient. Many Naga students are
                  providing honours and revenue to the state in the IT domain as
                  well as other professional fields.
                </p>
                <div className="mt-10 max-w-xl text-base leading-7 text-gray-700">
                  <p>
                    We have progressed toward skilling in order to adapt oneself
                    in order to be self-sufficient, understanding the need and
                    requirement to fill in the gap as well as the economic state
                    of our society. Considering the current market situation,
                    the need is so great that our current generation will need
                    to reskill their talent and creativity, which will
                    necessitate a suitable reskilling in addition to their
                    secular educational qualifications.
                  </p>
                  <p className="mt-10">
                    Our team aims to work tirelessly to eliminate the threat of
                    unemployment in Nagaland by placing sought IT jobs available
                    both nationally and locally. <b>instudia</b> has one goal:{" "}
                    <i>
                      unlocking the potential talents of Nagaland by making our
                      education system outcome driven.
                    </i>
                  </p>
                </div>
              </div>
              <div className="lg:flex lg:flex-auto lg:justify-center">
                <dl className="w-64 space-y-8 xl:w-80">
                  {stats.map((stat) => (
                    <div
                      key={stat.label}
                      className="flex flex-col-reverse gap-y-4"
                    >
                      <dt className="text-base leading-7 text-gray-600">
                        {stat.label}
                      </dt>
                      <dd className="text-5xl font-semibold tracking-tight text-gray-900">
                        {stat.value}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>
          </div>
        </div>

        {/* Image section */}
        <div className="mt-32 sm:mt-40 xl:mx-auto xl:max-w-7xl xl:px-8 border-[2px] border-black flex flex-col rounded-[30px] p-[18px]">
          <img
            src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2832&q=80"
            alt=""
            className="aspect-[5/2] w-full object-cover xl:rounded-3xl"
          />
        </div>

        {/* Values section */}
        <div className="mx-auto mt-32 max-w-7xl px-6 sm:mt-40 lg:px-8">
          <div className="mx-auto max-w-2xl lg:mx-0">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Our values
            </h2>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Our vision is defined by a framework we call the 3i&apos;s of
              instudia. The framework being defined as:
            </p>
          </div>
          <dl className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 text-base leading-7 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-3">
            {values.map((value) => (
              <div key={value.name}>
                <dt className="font-semibold text-gray-900">{value.name}</dt>
                <dd className="mt-1 text-gray-600">{value.description}</dd>
              </div>
            ))}
          </dl>
        </div>

        {/* Logo cloud */}
        {/* <div className="mx-auto mt-32 max-w-7xl sm:mt-40 sm:px-6 lg:px-8">
          <div className="relative isolate overflow-hidden bg-gray-900 px-6 py-24 text-center shadow-2xl sm:rounded-3xl sm:px-16">
            <h2 className="mx-auto max-w-2xl text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Our customers love us
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-gray-300">
              Aliquip reprehenderit incididunt amet quis fugiat ut velit. Sit occaecat labore proident cillum in nisi
              adipisicing officia excepteur tempor deserunt.
            </p>
            <div className="mx-auto mt-20 grid max-w-lg grid-cols-4 items-center gap-x-8 gap-y-12 sm:max-w-xl sm:grid-cols-6 sm:gap-x-10 sm:gap-y-14 lg:max-w-4xl lg:grid-cols-5">
              <img
                className="col-span-2 max-h-12 w-full object-contain lg:col-span-1"
                src="https://tailwindui.com/img/logos/158x48/transistor-logo-white.svg"
                alt="Transistor"
                width={158}
                height={48}
              />
              <img
                className="col-span-2 max-h-12 w-full object-contain lg:col-span-1"
                src="https://tailwindui.com/img/logos/158x48/reform-logo-white.svg"
                alt="Reform"
                width={158}
                height={48}
              />
              <img
                className="col-span-2 max-h-12 w-full object-contain lg:col-span-1"
                src="https://tailwindui.com/img/logos/158x48/tuple-logo-white.svg"
                alt="Tuple"
                width={158}
                height={48}
              />
              <img
                className="col-span-2 max-h-12 w-full object-contain sm:col-start-2 lg:col-span-1"
                src="https://tailwindui.com/img/logos/158x48/savvycal-logo-white.svg"
                alt="SavvyCal"
                width={158}
                height={48}
              />
              <img
                className="col-span-2 col-start-2 max-h-12 w-full object-contain sm:col-start-auto lg:col-span-1"
                src="https://tailwindui.com/img/logos/158x48/statamic-logo-white.svg"
                alt="Statamic"
                width={158}
                height={48}
              />
            </div>
            <div className="absolute -top-24 right-0 -z-10 transform-gpu blur-3xl" aria-hidden="true">
              <div
                className="aspect-[1404/767] w-[87.75rem] bg-gradient-to-r from-[#80caff] to-[#4f46e5] opacity-25"
                style={{
                  clipPath:
                    'polygon(73.6% 51.7%, 91.7% 11.8%, 100% 46.4%, 97.4% 82.2%, 92.5% 84.9%, 75.7% 64%, 55.3% 47.5%, 46.5% 49.4%, 45% 62.9%, 50.3% 87.2%, 21.3% 64.1%, 0.1% 100%, 5.4% 51.1%, 21.4% 63.9%, 58.9% 0.2%, 73.6% 51.7%)',
                }}
              />
            </div>
          </div>
        </div> */}

        {/* Content section */}
        <div className="relative mt-32 overflow-hidden sm:mt-40">
          <div className="mx-auto max-w-7xl px-6 lg:flex lg:px-8">
            <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-12 gap-y-16 lg:mx-0 lg:min-w-full lg:max-w-none lg:flex-none lg:gap-y-8">
              <div className="lg:col-end-1 lg:w-full lg:max-w-lg lg:pb-8">
                <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                  Our people
                </h2>
                <p className="mt-6 text-xl leading-8 text-gray-600">
                  At Instudia, our people are the heart of everything we do. We
                  are a diverse and passionate team of educators, technologists,
                  and industry experts dedicated to empowering learners and
                  shaping the future of skill development. Our faculty brings
                  years of industry experience and a deep commitment to
                  nurturing talent, ensuring every student has the support they
                  need to thrive.
                </p>
                <p className="mt-6 text-base leading-7 text-gray-600">
                  Our instructors are not just teachers; they are mentors who
                  guide learners through every step of their journey, bringing
                  practical insights from their own professional experiences.
                  Our curriculum designers work closely with industry leaders to
                  ensure that our courses are not only up-to-date but also
                  forward-thinking, preparing students for the challenges of
                  tomorrow.
                </p>
              </div>
              <div className="flex flex-wrap items-start justify-end gap-6 sm:gap-8 lg:contents">
                <div className="w-0 flex-auto lg:ml-auto lg:w-auto lg:flex-none lg:self-end">
                  <img
                    src="https://images.unsplash.com/photo-1670272502246-768d249768ca?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1152&q=80"
                    alt=""
                    className="aspect-[7/5] w-[37rem] max-w-none rounded-2xl bg-gray-50 object-cover"
                  />
                </div>
                <div className="contents lg:col-span-2 lg:col-end-2 lg:ml-auto lg:flex lg:w-[37rem] lg:items-start lg:justify-end lg:gap-x-8">
                  <div className="order-first flex w-64 flex-none justify-end self-end lg:w-auto">
                    <img
                      src="https://images.unsplash.com/photo-1605656816944-971cd5c1407f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=768&h=604&q=80"
                      alt=""
                      className="aspect-[4/3] w-[24rem] max-w-none flex-none rounded-2xl bg-gray-50 object-cover"
                    />
                  </div>
                  <div className="flex w-96 flex-auto justify-end lg:w-auto lg:flex-none">
                    <img
                      src="https://images.unsplash.com/photo-1568992687947-868a62a9f521?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1152&h=842&q=80"
                      alt=""
                      className="aspect-[7/5] w-[37rem] max-w-none flex-none rounded-2xl bg-gray-50 object-cover"
                    />
                  </div>
                  <div className="hidden sm:block sm:w-0 sm:flex-auto lg:w-auto lg:flex-none">
                    <img
                      src="https://images.unsplash.com/photo-1612872087720-bb876e2e67d1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=768&h=604&q=80"
                      alt=""
                      className="aspect-[4/3] w-[24rem] max-w-none rounded-2xl bg-gray-50 object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="rounded-[20px] xl:rounded-[40px] border-2 border-black aspect-[690/500] absolute bg-white z-[-1] top-[-14px] right-[-18px] w-full h-full xl:top-14 xl:right-[-87px]">
            <div className="flex items-center absolute right-0 top-0 xl:translate-x-[calc(50%-12px)] translate-x-[calc(50%-6px)] translate-y-[-2px] rotate-[45deg]"></div>
          </div>
        </div>

        {/* Stats */}
        <div className="mx-auto mt-32 max-w-7xl px-6 sm:mt-40 lg:px-8">
          <div className="mx-auto max-w-2xl lg:mx-0">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              We view the workplace as a space that enhances our lives and
              contributes value to the world.
            </h2>
            <p className="mt-6 text-base leading-7 text-gray-600">
              We see work as more than a job — it's a space to grow, create, and
              impact the world. Together, we shape a workplace that enriches
              lives and drives meaningful change.
            </p>
          </div>
          {/* <div className="mx-auto mt-16 flex max-w-2xl flex-col gap-8 lg:mx-0 lg:mt-20 lg:max-w-none lg:flex-row lg:items-end">
            <div className="flex flex-col-reverse justify-between gap-x-16 gap-y-8 rounded-2xl bg-gray-50 p-8 sm:w-3/4 sm:max-w-md sm:flex-row-reverse sm:items-end lg:w-72 lg:max-w-none lg:flex-none lg:flex-col lg:items-start">
              <p className="flex-none text-3xl font-bold tracking-tight text-gray-900">
                250k
              </p>
              <div className="sm:w-80 sm:shrink lg:w-auto lg:flex-none">
                <p className="text-lg font-semibold tracking-tight text-gray-900">
                  Users on the platform
                </p>
                <p className="mt-2 text-base leading-7 text-gray-600">
                  Vel labore deleniti veniam consequuntur sunt nobis.
                </p>
              </div>
            </div>
            <div className="flex flex-col-reverse justify-between gap-x-16 gap-y-8 rounded-2xl bg-gray-900 p-8 sm:flex-row-reverse sm:items-end lg:w-full lg:max-w-sm lg:flex-auto lg:flex-col lg:items-start lg:gap-y-44">
              <p className="flex-none text-3xl font-bold tracking-tight text-white">
                $8.9 billion
              </p>
              <div className="sm:w-80 sm:shrink lg:w-auto lg:flex-none">
                <p className="text-lg font-semibold tracking-tight text-white">
                  We’re proud that our customers have made over $8 billion in
                  total revenue.
                </p>
                <p className="mt-2 text-base leading-7 text-gray-400">
                  Eu duis porta aliquam ornare. Elementum eget magna egestas.
                </p>
              </div>
            </div>
            <div className="flex flex-col-reverse justify-between gap-x-16 gap-y-8 rounded-2xl bg-indigo-600 p-8 sm:w-11/12 sm:max-w-xl sm:flex-row-reverse sm:items-end lg:w-full lg:max-w-none lg:flex-auto lg:flex-col lg:items-start lg:gap-y-28">
              <p className="flex-none text-3xl font-bold tracking-tight text-white">
                401,093
              </p>
              <div className="sm:w-80 sm:shrink lg:w-auto lg:flex-none">
                <p className="text-lg font-semibold tracking-tight text-white">
                  Transactions this year
                </p>
                <p className="mt-2 text-base leading-7 text-indigo-200">
                  Eu duis porta aliquam ornare. Elementum eget magna egestas. Eu
                  duis porta aliquam ornare.
                </p>
              </div>
            </div>
          </div> */}
        </div>

        {/* Team section */}
        <div className=" mx-auto mt-32 max-w-7xl px-6 sm:mt-48 lg:px-8 overflow-hidden">
          <div className="relative grid grid-cols-2 gap-[16px] md:grid-cols-3 md:gap-y-[24px] xl:grid-cols-4 xl:gap-[36px]">
            <svg
              className="absolute inset-x-0 top-0 -z-10 h-[64rem] w-full stroke-gray-200 [mask-image:radial-gradient(32rem_32rem_at_center,white,transparent)]"
              aria-hidden="true"
            >
              <defs>
                <pattern
                  id="1f932ae7-37de-4c0a-a8b0-a6e3b4d44b84"
                  width={200}
                  height={200}
                  x="50%"
                  y={-1}
                  patternUnits="userSpaceOnUse"
                >
                  <path d="M.5 200V.5H200" fill="none" />
                </pattern>
              </defs>
              <svg x="50%" y={-1} className="overflow-visible fill-gray-50">
                <path
                  d="M-200 0h201v201h-201Z M600 0h201v201h-201Z M-400 600h201v201h-201Z M200 800h201v201h-201Z"
                  strokeWidth={0}
                />
              </svg>
              <rect
                width="100%"
                height="100%"
                strokeWidth={0}
                fill="url(#1f932ae7-37de-4c0a-a8b0-a6e3b4d44b84)"
              />
            </svg>
            <TeamMemberCard
              name="Daniel Changkija"
              designation="Director"
              imageUrl="https://images.unsplash.com/photo-1656338997878-279d71d48f6e?q=80&w=2551&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            />
            <div className="col-span-2 md:pl-[30px] xl:col-span-3 xl:pl-[70px]">
              <div className="space-y-[12px] pb-[24px] md:pb-0 md:pt-[56px] xl:max-w-[486px] xl:space-y-[24px] xl:pt-[80px]">
                <h2 className="text-text-highlight xl:text-[52px] xl:leading-[1.0961538461538463] xl:font-bold text-[32px] leading-[1.40625] font-bold max-w-[350px] xl:max-w-full">
                  Meet our team of talented educators and mentors
                </h2>
              </div>
            </div>
            <TeamMemberCard
              name="Kivigho Kinimi"
              designation="IT Faculty"
              imageUrl="https://images.unsplash.com/photo-1656337789708-cdf37b07112d?q=80&w=3087&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            />
            <TeamMemberCard
              name="Niutoli V"
              designation="Accounting Faculty"
              imageUrl="https://images.unsplash.com/photo-1678733527538-845ebdc2f6b8?q=80&w=3087&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            />
            <TeamMemberCard
              name="Susmita Ghosh"
              designation="Accounting Faculty"
              imageUrl="https://images.unsplash.com/photo-1672675611932-9d722165f0ad?q=80&w=3087&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            />
            <TeamMemberCard
              name="Imlisenla Imchen"
              designation="Marketing Executive"
              imageUrl="https://images.unsplash.com/photo-1656075203144-951d04f599ad?q=80&w=3087&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            />
            <div className="col-span-2 md:pl-[30px] xl:col-span-3 xl:pl-[160px]">
              <div className="space-y-[12px] pb-[24px] md:pb-0 md:pt-[56px] xl:max-w-[486px] xl:space-y-[24px] xl:pt-[80px]">
                <h2 className="xl:text-[52px] xl:leading-[1.0961538461538463] xl:font-bold text-[32px] leading-[1.40625] font-bold max-w-[350px] xl:max-w-full">
                  We solve your problems by upskilling you!
                </h2>
              </div>
            </div>
            <TeamMemberCard
              name="Vishal Bardewa"
              designation="Technical Advisor"
              imageUrl="https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=2960&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            />
            <svg
              className="absolute inset-x-0 top-0 -z-10 h-[64rem] w-full stroke-gray-200 [mask-image:radial-gradient(32rem_32rem_at_center,white,transparent)]"
              aria-hidden="true"
            >
              <defs>
                <pattern
                  id="1f932ae7-37de-4c0a-a8b0-a6e3b4d44b84"
                  width={200}
                  height={200}
                  x="50%"
                  y={-1}
                  patternUnits="userSpaceOnUse"
                >
                  <path d="M.5 200V.5H200" fill="none" />
                </pattern>
              </defs>
              <svg x="50%" y={-1} className="overflow-visible fill-gray-50">
                <path
                  d="M-200 0h201v201h-201Z M600 0h201v201h-201Z M-400 600h201v201h-201Z M200 800h201v201h-201Z"
                  strokeWidth={0}
                />
              </svg>
              <rect
                width="100%"
                height="100%"
                strokeWidth={0}
                fill="url(#1f932ae7-37de-4c0a-a8b0-a6e3b4d44b84)"
              />
            </svg>
          </div>
        </div>

        {/* Location section */}
        <div className="mx-8 lg:mx-14 mt-[40px] grid grid-cols-1 gap-[8px] md:grid-cols-[minmax(248px,1.2fr)_minmax(168px,0.9fr)_minmax(248px,1.2fr)] md:gap-[12px] xl:mt-[60px] xl:gap-[16px]">
          <div className="grid grid-cols-2 gap-[8px] md:gap-[12px] xl:gap-[16px] xl:rounded-[20px]">
            <div className="flex h-[172px] bg-[#C21FFF] w-full flex-col items-center justify-center space-y-[4px] rounded-[12px] bg-green md:h-[178px] xl:h-[296px] 2xl:h-[356px]">
              <h1 className="xl:text-[72px] xl:leading-[1.0972222222222223] xl:font-bold text-[38px] leading-[1.105263157894737] font-bold">
                20+
              </h1>
              <span className="text-text-highlight xl:text-[20px] xl:leading-[1.3] xl:font-medium text-[18px] leading-[1.2777777777777777] font-medium max-w-[108px] text-center">
                Combined YOE
              </span>
            </div>
            <div className="h-[172px] overflow-hidden rounded-[12px] md:h-[178px] xl:h-[296px] 2xl:h-[356px]">
              <picture className="overflow-hidden">
                <img
                  loading="eager"
                  className="h-full w-full object-cover"
                  src="https://a.storyblok.com/f/197805/4096x2732/bdf82eb04c/viw_rgb_230207vw-linearity-1812.jpg/m/319x0/filters:format(jpeg):quality(75)"
                  alt="around table"
                />
              </picture>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-[8px] md:grid-cols-1 md:gap-[12px] xl:gap-[16px] xl:rounded-[20px]">
            <div className="hidden overflow-hidden rounded-[12px] md:block md:h-[150px] xl:h-[260px] xl:rounded-[20px] 2xl:h-[320px]">
              <picture className="overflow-hidden">
                <img
                  loading="eager"
                  className="h-full w-full object-cover"
                  src="https://a.storyblok.com/f/197805/4096x2732/4c2cf8e271/linearity-group-executive-01.jpg/m/360x0/filters:format(jpeg):quality(75)"
                  alt="work table vladimir"
                />
              </picture>
            </div>
            <div className="h-[172px] overflow-hidden rounded-[12px] md:h-[109px] xl:h-[200px] xl:rounded-[20px] 2xl:h-[228px]">
              <picture className="overflow-hidden">
                <img
                  loading="eager"
                  className="h-full w-full object-cover"
                  src="https://a.storyblok.com/f/197805/4096x2732/304d867401/image_3.png/m/156x172/filters:format(png):quality(75)"
                  alt="table moritz anna wiebke"
                />
              </picture>
            </div>
            <div className="flex h-[172px] bg-[#58FF1B] w-full flex-col items-center justify-center space-y-[4px] rounded-[12px] bg-orange md:h-[168px] xl:h-[260px] xl:rounded-[20px] 2xl:h-[320px]">
              <h1 className="text-text-highlight xl:text-[72px] xl:leading-[1.0972222222222223] xl:font-bold text-[38px] leading-[1.105263157894737] font-bold">
                10+
              </h1>
              <span className="text-text-highlight xl:text-[20px] xl:leading-[1.3] xl:font-medium text-[18px] leading-[1.2777777777777777] font-medium max-w-[108px] text-center">
                Languages
              </span>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-[8px] md:gap-[12px] xl:gap-[16px]">
            <div className="order-1 col-span-2 h-[180px] w-full overflow-hidden rounded-[12px] md:order-3 md:h-[234px] xl:h-[366px] xl:rounded-[20px] 2xl:h-[442px]">
              <picture className="overflow-hidden">
                <img
                  loading="eager"
                  className="h-full w-full object-cover"
                  src="https://a.storyblok.com/f/197805/4096x2732/248870753d/image_5.png/m/500x0/filters:format(png):quality(75)"
                  alt="thanassis paulius"
                />
              </picture>
            </div>
            <div className="order-2 flex h-[172px] w-full flex-col items-center justify-center space-y-[4px] rounded-[12px] bg-[#FFE01B] md:h-[200px] xl:h-[366px] xl:rounded-[20px] 2xl:h-[442px]">
              <h1 className="text-text-highlight xl:text-[72px] xl:leading-[1.0972222222222223] xl:font-bold text-[38px] leading-[1.105263157894737] font-bold">
                2
              </h1>
              <span className="text-text-highlight xl:text-[20px] xl:leading-[1.3] xl:font-medium text-[18px] leading-[1.2777777777777777] font-medium max-w-[108px] text-center xl:max-w-[144px]">
                Work locations
              </span>
            </div>
            <div className="order-3 h-[172px] overflow-hidden rounded-[12px] md:order-1 md:h-[200px] xl:h-[368px] xl:rounded-[20px] 2xl:h-[442px]">
              <picture className="overflow-hidden">
                <img
                  loading="eager"
                  className="h-full w-full object-cover"
                  src="https://a.storyblok.com/f/197805/4096x2732/3dd6a9b6f0/image_4.png/m/156x172/filters:format(png):quality(75)"
                  alt="malte wiebke"
                />
              </picture>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
