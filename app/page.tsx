import Image from "next/image";
import LandingTop from "./components/organisms/LandingTop";
import TestimonialWithStats from "./components/molecules/TestimonialWithStats";
import Stats from "./components/molecules/Stats";
import Incentives from "./components/molecules/Incentives";
import { StickyScroll } from "./components/organisms/StickyScroll";
import { LayoutGrid } from "./components/organisms/LayoutGrid";
import { AppConfig } from "./_utils/AppConfig";
import { Testimonials } from "./components/organisms/Testimonial";
import { CheckCircleIcon } from "@heroicons/react/20/solid";
import { Container } from "./components/atom/Container";
import Link from "next/link";
import { FadeIn, FadeInStagger } from "./components/atom/FadeIn";
import { SectionIntro } from "./components/atom/SectionIntro";
import { randomUUID } from "crypto";

const stats = [
  { label: "Founded", value: "2021" },
  { label: "Courses", value: "19+" },
  { label: "Offices", value: "2" },
  { label: "Team Experience", value: "12+ Years" },
];

const content = [
  {
    title: "Collaborative Editing",
    description:
      "Work together in real time with your team, clients, and stakeholders. Collaborate on documents, share ideas, and make decisions quickly. With our platform, you can streamline your workflow and increase productivity.",
    content: (
      <div className="h-full w-full bg-[linear-gradient(to_bottom_right,var(--cyan-500),var(--emerald-500))] flex items-center justify-center text-white">
        Collaborative Editing
      </div>
    ),
  },
  {
    title: "Real time changes",
    description:
      "See changes as they happen. With our platform, you can track every modification in real time. No more confusion about the latest version of your project. Say goodbye to the chaos of version control and embrace the simplicity of real-time updates.",
    content: (
      <div className="h-full w-full  flex items-center justify-center text-white">
        <Image
          src="/linear.webp"
          width={300}
          height={300}
          className="h-full w-full object-cover"
          alt="linear board demo"
        />
      </div>
    ),
  },
  {
    title: "Version control",
    description:
      "Experience real-time updates and never stress about version control again. Our platform ensures that you're always working on the most recent version of your project, eliminating the need for constant manual updates. Stay in the loop, keep your team aligned, and maintain the flow of your work without any interruptions.",
    content: (
      <div className="h-full w-full bg-[linear-gradient(to_bottom_right,var(--orange-500),var(--yellow-500))] flex items-center justify-center text-white">
        Version control
      </div>
    ),
  },
  {
    title: "Running out of content",
    description:
      "Experience real-time updates and never stress about version control again. Our platform ensures that you're always working on the most recent version of your project, eliminating the need for constant manual updates. Stay in the loop, keep your team aligned, and maintain the flow of your work without any interruptions.",
    content: (
      <div className="h-full w-full bg-[linear-gradient(to_bottom_right,var(--cyan-500),var(--emerald-500))] flex items-center justify-center text-white">
        Running out of content
      </div>
    ),
  },
];

const SkeletonOne = () => {
  return (
    <div>
      <p className="font-bold text-4xl text-white">House in the woods</p>
      <p className="font-normal text-base text-white"></p>
      <p className="font-normal text-base my-4 max-w-lg text-neutral-200">
        A serene and tranquil retreat, this house in the woods offers a peaceful
        escape from the hustle and bustle of city life.
      </p>
    </div>
  );
};

const SkeletonTwo = () => {
  return (
    <div>
      <p className="font-bold text-4xl text-white">House above the clouds</p>
      <p className="font-normal text-base text-white"></p>
      <p className="font-normal text-base my-4 max-w-lg text-neutral-200">
        Perched high above the world, this house offers breathtaking views and a
        unique living experience. It&apos;s a place where the sky meets home,
        and tranquility is a way of life.
      </p>
    </div>
  );
};
const SkeletonThree = () => {
  return (
    <div>
      <p className="font-bold text-4xl text-white">Greens all over</p>
      <p className="font-normal text-base text-white"></p>
      <p className="font-normal text-base my-4 max-w-lg text-neutral-200">
        A house surrounded by greenery and nature&apos;s beauty. It&apos;s the
        perfect place to relax, unwind, and enjoy life.
      </p>
    </div>
  );
};
const SkeletonFour = () => {
  return (
    <div>
      <p className="font-bold text-4xl text-white">Rivers are serene</p>
      <p className="font-normal text-base text-white"></p>
      <p className="font-normal text-base my-4 max-w-lg text-neutral-200">
        A house by the river is a place of peace and tranquility. It&apos;s the
        perfect place to relax, unwind, and enjoy life.
      </p>
    </div>
  );
};

const cards = [
  {
    id: 1,
    content: <SkeletonOne />,
    className: "md:col-span-2",
    thumbnail:
      "https://images.unsplash.com/photo-1476231682828-37e571bc172f?q=80&w=3474&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 2,
    content: <SkeletonTwo />,
    className: "col-span-1",
    thumbnail:
      "https://images.unsplash.com/photo-1464457312035-3d7d0e0c058e?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 3,
    content: <SkeletonThree />,
    className: "col-span-1",
    thumbnail:
      "https://images.unsplash.com/photo-1588880331179-bc9b93a8cb5e?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 4,
    content: <SkeletonFour />,
    className: "md:col-span-2",
    thumbnail:
      "https://images.unsplash.com/photo-1475070929565-c985b496cb9f?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
];

export const metadata = {
  title:
    "Unlock Excellence: Dimapur's Finest Computer and Skill Training Courses | instudia",
  description:
    "Elevate your career with premier computer and skill training in Dimapur, Nagaland. Explore cutting-edge courses in programming, web development, project management, and digital skills. Unlock your potential with instudia through industry-focused training for success.",
  openGraph: {
    title:
      "Unlock Excellence: Dimapur's Finest Computer and Skill Training Courses | instudia",
    description:
      "Elevate your career with premier computer and skill training in Dimapur, Nagaland. Explore cutting-edge courses in programming, web development, project management, and digital skills. Unlock your potential with instudia through industry-focused training for success.",
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
      "Unlock Excellence: Dimapur's Finest Computer and Skill Training Courses | instudia ",
    description:
      "Elevate your career with premier computer and skill training in Dimapur, Nagaland. Explore cutting-edge courses in programming, web development, project management, and digital skills. Unlock your potential with instudia through industry-focused training for success.",
    card: "https://res.cloudinary.com/dhwg77gwm/image/upload/f_auto,q_auto/v1/instudia/tqo7qzztc4duzktj0jt9",
  },
  metadataBase: new URL("https://instudianagaland.com"),
};

const benefits = [
  "Resume Building Sessions",
  "Flexible class hours",
  "Hands-on projects",
  "One-to-one doubt clearing",
  "Connect with Industry experts",
  "Interview Prep Sessions",
];

const caseStudies = [
  {
    id: randomUUID(),
    logo: "https://studio.tailwindui.com/_next/static/media/logomark-dark.73187f97.svg",
    client: "This is alt",
    date: "2024-12-12",
    title: "Skip the bank, borrow from those you trust",
    description:
      "FamilyFund is a crowdfunding platform for friends and family. Allowing users to take personal loans from their network without a traditional financial institution",
    classnames: "hover:bg-[#ffe01b]/70",
  },
  {
    id: randomUUID(),
    logo: "https://studio.tailwindui.com/_next/static/media/logomark-dark.73187f97.svg",
    client: "This is alt",
    date: "2024-12-12",
    title: "Skip the bank, borrow from those you trust",
    description:
      "FamilyFund is a crowdfunding platform for friends and family. Allowing users to take personal loans from their network without a traditional financial institution",
    classnames: "hover:bg-[#c21bff]/70",
  },
  {
    id: randomUUID(),
    logo: "https://studio.tailwindui.com/_next/static/media/logomark-dark.73187f97.svg",
    client: "This is alt",
    date: "2024-12-12",
    title: "Skip the bank, borrow from those you trust",
    description:
      "FamilyFund is a crowdfunding platform for friends and family. Allowing users to take personal loans from their network without a traditional financial institution",
    classnames: "hover:bg-[#58ff1b]/70",
  },
];
const CaseStudies = ({ caseStudies }: any) => {
  return (
    <>
      <SectionIntro
        title="Harnessing technology for a brighter future"
        className="lg:mx-24 mt-24 sm:mt-32 lg:mt-40"
      >
        <p>
          We believe technology is the answer to the world’s greatest
          challenges. It’s also the cause, so we find ourselves in bit of a
          catch 22 situation.
        </p>
      </SectionIntro>
      <Container className="mt-16">
        <FadeInStagger className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {caseStudies.map((caseStudy: any) => (
            <FadeIn key={caseStudy.id} className="flex">
              <article
                className={`relative flex w-full flex-col rounded-3xl p-6 ring-1 ring-neutral-950/5 transition ease-in-out duration-800 delay-100 ${caseStudy.classnames} sm:p-8`}
              >
                <h3>
                  <span className="absolute inset-0 rounded-3xl" />
                  <Image
                    src={caseStudy.logo}
                    alt={caseStudy.client}
                    className="h-16 w-16"
                    width={16}
                    height={16}
                  />
                </h3>
                <p className="mt-6 flex gap-x-2 text-sm text-neutral-950">
                  <time
                    dateTime={caseStudy.date.split("-")[0]}
                    className="font-semibold"
                  >
                    {caseStudy.date.split("-")[0]}
                  </time>
                  <span className="text-neutral-300" aria-hidden="true">
                    /
                  </span>
                  <span>Case study</span>
                </p>
                <p className="mt-6 font-display text-2xl font-semibold text-neutral-950">
                  {caseStudy.title}
                </p>
                <p className="mt-4 text-base text-neutral-600">
                  {caseStudy.description}
                </p>
              </article>
            </FadeIn>
          ))}
        </FadeInStagger>
      </Container>
    </>
  );
};

export default function Page() {
  return (
    <main className="w-full flex min-h-screen flex-col justify-between">
      <LandingTop />
      <TestimonialWithStats />

      <Stats stats={stats} />

      <Incentives />
      <Testimonials />

      {/* <StickyScroll content={content} /> */}

      <div className="relative isolate -z-10 mt-32 sm:mt-40">
        <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="mx-auto flex max-w-2xl flex-col gap-16 bg-black/5 px-6 py-16 sm:rounded-3xl sm:p-8 lg:mx-0 lg:max-w-none lg:flex-row lg:items-center lg:py-20 xl:gap-x-20 xl:px-20">
            <img
              alt=""
              src="https://images.unsplash.com/photo-1498758536662-35b82cd15e29?q=80&w=3088&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              className="h-96 w-full flex-none rounded-2xl object-cover shadow-xl lg:aspect-square lg:h-auto lg:max-w-sm"
            />
            <div className="w-full flex-auto">
              <h2 className="text-3xl font-bold tracking-tight text-[#1b1c1e] sm:text-4xl">
                Discover what makes our courses unique
              </h2>
              <p className="mt-6 text-lg leading-8 text-[#1b1c1e]">
                Experience hands-on learning with real-world projects, guided by
                industry experts. Our unique approach blends cutting-edge skills
                with personalized mentorship for your success.
              </p>
              <ul
                role="list"
                className="mt-10 grid grid-cols-1 gap-x-8 gap-y-3 text-base leading-7 text-[#1b1c1e] sm:grid-cols-2"
              >
                {benefits.map((benefit) => (
                  <li key={benefit} className="flex gap-x-3">
                    <CheckCircleIcon
                      aria-hidden="true"
                      className="h-7 w-5 flex-none"
                    />
                    {benefit}
                  </li>
                ))}
              </ul>
              <div className="mt-10 flex">
                <a
                  href="#"
                  className="text-sm font-semibold leading-6 text-[#1b1c1e]"
                >
                  Reach us <span aria-hidden="true">&rarr;</span>
                </a>
              </div>
            </div>
          </div>
        </div>
        <div
          aria-hidden="true"
          className="absolute inset-x-0 -top-16 -z-10 flex transform-gpu justify-center overflow-hidden blur-3xl"
        >
          <div
            style={{
              clipPath:
                "polygon(73.6% 51.7%, 91.7% 11.8%, 100% 46.4%, 97.4% 82.2%, 92.5% 84.9%, 75.7% 64%, 55.3% 47.5%, 46.5% 49.4%, 45% 62.9%, 50.3% 87.2%, 21.3% 64.1%, 0.1% 100%, 5.4% 51.1%, 21.4% 63.9%, 58.9% 0.2%, 73.6% 51.7%)",
            }}
            className="aspect-[1318/752] w-[82.375rem] flex-none bg-gradient-to-r from-[#1B1C1E] to-[#FAFAFA] opacity-25"
          />
        </div>
      </div>

      <CaseStudies caseStudies={caseStudies} />
    </main>
  );
}
