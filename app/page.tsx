import Image from "next/image";
import Link from "next/link";
import LandingTop from "./components/organisms/LandingTop";
import Stats from "./components/molecules/Stats";
import Incentives from "./components/molecules/Incentives";
import { AppConfig } from "./_utils/AppConfig";
import { SITE_URL, canonicalFor } from "@/lib/site";
import { CheckCircleIcon } from "@heroicons/react/20/solid";
import { Container } from "./components/atom/Container";
import { FadeIn, FadeInStagger } from "./components/atom/FadeIn";
import { SectionIntro } from "./components/atom/SectionIntro";
import { posts } from "./data/posts";

import TestimonialWithStats from "./components/molecules/TestimonialWithStats";
import ScrollingLogos from "./components/organisms/ScrollingLogos";
import RandomGateway from "./components/organisms/RandomGateway";
import FeatureWithColumns from "./components/molecules/FeatureWithThreeCoulmns";
import TestimonialGrid from "./components/organisms/TestimonialGrid";
import BlogCarousel from "./components/organisms/BlogCarousel";



import { buildMetadata } from "@/lib/metadata";

const stats = [
  { label: "Founded", value: "2021" },
  { label: "Courses", value: "19+" },
  { label: "Office", value: "1" },
  { label: "Team Experience", value: "14+ Years" },
];

export const metadata = buildMetadata({
  title: "Best Computer Courses in Dimapur, Nagaland",
  description:
    "Master Programming, Web Development, Graphic Design & Digital Skills in Dimapur. Top computer courses like DCA, Tally & GST. Boost your career. Enroll now!",
  path: "/",
  image: "https://res.cloudinary.com/dhwg77gwm/image/upload/f_auto,q_auto/v1/instudia/tqo7qzztc4duzktj0jt9",
  imageAlt: "Upskill with instudia",
});

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
    id: "unlock-opportunities",
    logo: "https://ik.imagekit.io/dxffek9yf/website-workshop-instudia/logo-assets/unlock.svg?updatedAt=1729061047829",
    client: "Unlock New Opportunities",
    date: "001",
    title: "Unlock New Opportunities",
    description:
      "Upskilling equips you with the in-demand skills to thrive in today’s dynamic job market. Whether you're a student, professional, or looking for a career change, the right skills can open doors to exciting, future-ready opportunities.",
    classnames: "hover:bg-[#ffe01b]/70",
  },
  {
    id: "empower-career",
    logo: "https://ik.imagekit.io/dxffek9yf/website-workshop-instudia/logo-assets/medal.svg?updatedAt=1729061595377",
    client: "Empower Your Career",
    date: "002",
    title: "Empower Your Career",
    description:
      "Industries are changing faster than ever, and the demand for new skills is at an all-time high. Our tailored courses help you stay ahead of the curve, ensuring you remain competitive and adaptable as your career progresses.",
    classnames: "hover:bg-[#c21bff]/70",
  },
  {
    id: "bridge-skills-gap",
    logo: "https://ik.imagekit.io/dxffek9yf/website-workshop-instudia/logo-assets/announcement.svg?updatedAt=1729060940757",
    client: "Bridge the Skills Gap",
    date: "003",
    title: "Bridge the Skills Gap",
    description:
      "The skills gap is real, but it doesn’t have to hold you back. By upskilling with Instudia, you can close that gap and meet the demands of today’s industries. Prepare for a future where you not only meet expectations but exceed them.",
    classnames: "hover:bg-[#58ff1b]/70",
  },
];

const CaseStudies = ({ caseStudies }: any) => {
  return (
    <>
      <SectionIntro
        title="Harnessing skills for a brighter future"
        className="lg:mx-24 mt-24 sm:mt-32 lg:mt-40"
      >
        <p>
          We believe upskilling is the solution to today’s most pressing
          challenges While the demand for new skills is rising, it can also feel
          overwhelming—but with the right guidance, upskilling can unlock
          endless opportunities for growth and success. Let us help you bridge
          the skills gap and build a future-ready career.
        </p>
      </SectionIntro>
      <Container className="mt-16">
        <FadeInStagger className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {caseStudies.map((caseStudy: any, i: number) => (
            <FadeIn key={`${caseStudy.id}-${i}`} className="flex">
              <article
                className={`relative flex w-full flex-col rounded-3xl p-6 ring-1 ring-neutral-950/5 transition ease-in-out duration-800 delay-100 ${caseStudy.classnames} sm:p-8`}
              >
                <div>
                  <span className="absolute inset-0 rounded-3xl" />
                  <Image
                    src={caseStudy.logo}
                    alt={caseStudy.client}
                    className="h-16 w-16 object-contain"
                    width={64}
                    height={64}
                    sizes="64px"
                  />
                </div>
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
                  <span className="text-xs font-mono font-bold uppercase tracking-wider text-brandpurple">Feature</span>
                </p>
                <h3 className="mt-6 font-display text-2xl font-semibold text-neutral-950">
                  {caseStudy.title}
                </h3>
                <p className="mt-4 text-base text-neutral-950">
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
      <ScrollingLogos />

      <Stats stats={stats} />
      
      {/* Isolated Interactive Gateway Node — client picks randomly */}
      <RandomGateway />

      <Incentives />
      <FeatureWithColumns />

      {/* <Testimonials /> */}
      <TestimonialGrid />

      {/* <StickyScroll content={content} /> */}

      <div className="relative isolate -z-10 mt-32 sm:mt-40">
        <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="mx-auto flex max-w-2xl flex-col gap-16 bg-black/5 px-6 py-16 sm:rounded-3xl sm:p-8 lg:mx-0 lg:max-w-none lg:flex-row lg:items-center lg:py-20 xl:gap-x-20 xl:px-20">
            <Image
              alt="Person staring at laptop sitting on the chair"
              src="/assets/images/course-unique-highlight.webp"
              className="h-96 w-full flex-none rounded-2xl object-cover shadow-xl lg:aspect-square lg:h-auto lg:max-w-sm"
              width={600}
              height={600}
              loading="lazy"
              unoptimized
              sizes="(max-width: 1024px) 100vw, 384px"
            />
            <div className="w-full flex-auto">
              <h2 className="text-3xl font-bold tracking-tight text-[#1b1c1e] sm:text-4xl">
                Discover what makes our courses unique
              </h2>
              <h3 className="sr-only">Computer training in Dimapur, Nagaland</h3>
              <p className="mt-6 text-lg leading-8 text-[#1b1c1e]">
                Experience hands-on learning with real-world projects, guided by
                industry experts. Our unique approach blends cutting-edge skills
                with personalized mentorship for your success.
              </p>
              <ul
                role="list"
                className="mt-10 grid grid-cols-1 gap-x-8 gap-y-3 text-base leading-7 text-[#1b1c1e] sm:grid-cols-2"
              >
                {benefits.map((benefit, i) => (
                  <li key={`${benefit}-${i}`} className="flex gap-x-3">
                    <CheckCircleIcon
                      aria-hidden="true"
                      className="h-7 w-5 flex-none"
                    />
                    {benefit}
                  </li>
                ))}
              </ul>
              <div className="mt-10 flex">
                <Link
                  href="/contact"
                  className="text-sm font-semibold leading-6 text-[#1b1c1e] hover:text-brandpurple transition-colors"
                >
                  Reach us <span aria-hidden="true">&rarr;</span>
                </Link>
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

      {/* --- SEO Content Block (Hidden from visual UI, visible to crawlers and screen readers) --- */}
      <article className="sr-only">
        <h2>Best Computer Courses and Skill Training in Dimapur, Nagaland</h2>
        <p>
          Welcome to Instudia, the premier institute for <strong>computer courses in Dimapur</strong>. We are dedicated to empowering individuals with cutting-edge tech skills that transform potential into a paycheck. Whether you're looking to start a career in software development, graphic design, or digital marketing, our comprehensive programs are designed to meet industry standards.
        </p>
        <div>
          <h3>Why Choose Our Computer Institute?</h3>
          <p>
            At Instudia, we believe in an <Link href="/about">innovative approach</Link> to education. Unlike traditional institutes, we focus on hands-on experiences, project-based learning, and personalized mentorship. We offer over 19+ intensive courses, including DCA, PGDCA, Tally, Full-Stack Web Development, Data Analysis, and more. Our training bridges the gap between academic knowledge and real-world skills, ensuring our students are job-ready from day one. By learning from our expert instructors, you gain insights that go beyond the textbook.
          </p>
          
          <h3>Comprehensive Skills for the Future</h3>
          <p>
            Our mission is to establish Nagaland as a hub of digital literacy and technical expertise. We partner with top organizations to bring you courses that align with the latest market demands. Whether it's mastering React.js for web development, understanding SEO, or designing stunning visuals with Adobe Creative Suite, we have the right course layout for you. Explore our <Link href="/courses">complete course catalog</Link> to find a program that suits your career goals.
          </p>

          <h3>Join a Vibrant Community of Learners</h3>
          <p>
            Education at Instudia expands beyond the classroom walls. We provide resume-building workshops, interview preparation sessions, and excellent placement assistance. Joining us means you become part of a community that fosters growth, innovation, and success. Don't wait to ignite your career. Contact our admissions team at our Dimapur center today. Learn more about our <Link href="/contact">admissions process</Link> or read through our <Link href="/blog">student success stories</Link>. Upskill, innovate, and start your successful journey with Instudia today!
          </p>
        </div>
      </article>

      {/* --- Blog Horizon Carousel --- */}
      <BlogCarousel posts={posts.slice(0, 7)} />

      <CaseStudies caseStudies={caseStudies} />

    </main>
  );
}
