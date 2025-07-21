"use client";

import { useId } from "react";

import { v4 as uuidv4 } from "uuid";
import Link from "next/link";

import { cn } from "../_utils/cn";
import { LayoutGrid } from "../components/organisms/LayoutGrid";
import { FadeIn, FadeInStagger } from "../components/atom/FadeIn";

function IconLink({
  children,
  className,
  compact = false,
  icon: Icon,
  ...props
}: React.ComponentPropsWithoutRef<typeof Link> & {
  compact?: boolean;
  icon?: React.ComponentType<{ className?: string }>;
}) {
  return (
    <Link
      {...props}
      className={cn(
        className,
        "group relative isolate flex items-center rounded-lg px-2 py-0.5 text-[0.8125rem]/6 font-medium text-white/30 transition-colors hover:text-sky-300",
        compact ? "gap-x-2" : "gap-x-3"
      )}
    >
      <span className="absolute inset-0 -z-10 scale-75 rounded-lg bg-white/5 opacity-0 transition group-hover:scale-100 group-hover:opacity-100" />
      {Icon && <Icon className="h-4 w-4 flex-none" />}
      <span className="self-baseline text-white">{children}</span>
    </Link>
  );
}

function BookIcon(props: React.ComponentPropsWithoutRef<"svg">) {
  return (
    <svg viewBox="0 0 16 16" aria-hidden="true" fill="currentColor" {...props}>
      <path d="M7 3.41a1 1 0 0 0-.668-.943L2.275 1.039a.987.987 0 0 0-.877.166c-.25.192-.398.493-.398.812V12.2c0 .454.296.853.725.977l3.948 1.365A1 1 0 0 0 7 13.596V3.41ZM9 13.596a1 1 0 0 0 1.327.946l3.948-1.365c.429-.124.725-.523.725-.977V2.017c0-.32-.147-.62-.398-.812a.987.987 0 0 0-.877-.166L9.668 2.467A1 1 0 0 0 9 3.41v10.186Z" />
    </svg>
  );
}

function GitHubIcon(props: React.ComponentPropsWithoutRef<"svg">) {
  return (
    <svg viewBox="0 0 16 16" aria-hidden="true" fill="currentColor" {...props}>
      <path d="M8 .198a8 8 0 0 0-8 8 7.999 7.999 0 0 0 5.47 7.59c.4.076.547-.172.547-.384 0-.19-.007-.694-.01-1.36-2.226.482-2.695-1.074-2.695-1.074-.364-.923-.89-1.17-.89-1.17-.725-.496.056-.486.056-.486.803.056 1.225.824 1.225.824.714 1.224 1.873.87 2.33.666.072-.518.278-.87.507-1.07-1.777-.2-3.644-.888-3.644-3.954 0-.873.31-1.586.823-2.146-.09-.202-.36-1.016.07-2.118 0 0 .67-.214 2.2.82a7.67 7.67 0 0 1 2-.27 7.67 7.67 0 0 1 2 .27c1.52-1.034 2.19-.82 2.19-.82.43 1.102.16 1.916.08 2.118.51.56.82 1.273.82 2.146 0 3.074-1.87 3.75-3.65 3.947.28.24.54.73.54 1.48 0 1.07-.01 1.93-.01 2.19 0 .21.14.46.55.38A7.972 7.972 0 0 0 16 8.199a8 8 0 0 0-8-8Z" />
    </svg>
  );
}

function FeedIcon(props: React.ComponentPropsWithoutRef<"svg">) {
  return (
    <svg viewBox="0 0 16 16" aria-hidden="true" fill="currentColor" {...props}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M2.5 3a.5.5 0 0 1 .5-.5h.5c5.523 0 10 4.477 10 10v.5a.5.5 0 0 1-.5.5h-.5a.5.5 0 0 1-.5-.5v-.5A8.5 8.5 0 0 0 3.5 4H3a.5.5 0 0 1-.5-.5V3Zm0 4.5A.5.5 0 0 1 3 7h.5A5.5 5.5 0 0 1 9 12.5v.5a.5.5 0 0 1-.5.5H8a.5.5 0 0 1-.5-.5v-.5a4 4 0 0 0-4-4H3a.5.5 0 0 1-.5-.5v-.5Zm0 5a1 1 0 1 1 2 0 1 1 0 0 1-2 0Z"
      />
    </svg>
  );
}

function Intro() {
  return (
    <>
      <div>
        {/* <Link href="/">
          <Logo className="inline-block h-8 w-auto" />
        </Link> */}
      </div>
      <span className="mt-14 font-semibold text-md text-[#C21BFF]">
        Workshops and Seminars
      </span>
      <h1 className="font-display text-4xl/tight font-bold text-black">
        Skill Development Initiatives
        {/* <span className="text-black">for macOS minimalists</span> */}
      </h1>
      <p className="mt-4 text-sm/6 text-black">
        We have been conducting workshops empowering Dimapur's student and
        professional communities with essential skill development workshops.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-x-1 gap-y-3 sm:gap-x-2 lg:justify-start">
        <IconLink href="#" icon={BookIcon} className="flex-none">
          Documentation
        </IconLink>
        <IconLink href="#" icon={GitHubIcon} className="flex-none">
          GitHub
        </IconLink>
        <IconLink href="/feed.xml" icon={FeedIcon} className="flex-none">
          RSS
        </IconLink>
      </div>
    </>
  );
}

function IntroFooter() {
  return (
    <p className="flex items-baseline gap-x-2 relative bottom-32 leading-[6rem] opacity-5 text-[#1B1C1E] font-bold text-[6rem]">
      Learn. Think. Excel.
    </p>
  );
}

function Timeline() {
  let id = useId();

  return (
    <div className="pointer-events-none absolute inset-0 z-50 overflow-hidden lg:right-[calc(max(2rem,50%-38rem)+40rem)] lg:min-w-[32rem] lg:overflow-visible">
      <svg
        className="absolute left-[max(0px,calc(50%-18.125rem))] top-0 h-full w-1.5 lg:left-full lg:ml-1 xl:left-auto xl:right-1 xl:ml-0"
        aria-hidden="true"
      >
        <defs>
          <pattern id={id} width="6" height="8" patternUnits="userSpaceOnUse">
            <path
              d="M0 0H6M0 8H6"
              className="stroke-sky-900/10 xl:stroke-white/10 dark:stroke-white/10"
              fill="none"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill={`url(#${id})`} />
      </svg>
    </div>
  );
}

function FixedSidebar({
  main,
  footer,
}: {
  main?: React.ReactNode;
  footer?: React.ReactNode;
}) {
  return (
    <div className="absolute flex-none overflow-hidden hidden px-6 lg:pointer-events-none lg:fixed lg:-z-10 lg:flex lg:px-0 lg:visible">
      <div className="relative bg-white  flex w-full lg:pointer-events-auto lg:mr-[calc(max(2rem,50%-38rem)+40rem)] lg:min-w-[32rem] lg:overflow-y-auto lg:overflow-x-hidden lg:pl-[max(4rem,calc(50%-38rem))]">
        <div className="mx-auto max-w-lg lg:mx-0 lg:flex lg:w-96 lg:max-w-none lg:flex-col lg:before:flex-1 lg:before:pt-6">
          <div className="pb-16 pt-20 sm:pb-20 sm:pt-32 lg:py-20">
            <div className="relative">{main}</div>
          </div>
          <div className="flex flex-1 items-end justify-center pb-4 lg:justify-start lg:pb-6">
            {footer}
          </div>
        </div>
      </div>
    </div>
  );
}

const SkeletonOne = ({
  title,
  caption,
}: {
  title: string;
  caption: string;
}) => {
  return (
    <div>
      <p className="font-bold text-4xl text-white">{title}</p>
      <p className="font-normal text-base text-white"></p>
      <p className="font-normal text-base my-4 max-w-lg text-neutral-200">
        {caption}
      </p>
    </div>
  );
};

const SkeletonTwo = ({
  title,
  caption,
}: {
  title: string;
  caption: string;
}) => {
  return (
    <div>
      <p className="font-bold text-4xl text-white">{title}</p>
      <p className="font-normal text-base text-white"></p>
      <p className="font-normal text-base my-4 max-w-lg text-neutral-200">
        {caption}
      </p>
    </div>
  );
};

const SkeletonThree = ({
  title,
  caption,
}: {
  title: string;
  caption: string;
}) => {
  return (
    <div>
      <p className="font-bold text-4xl text-white">{title}</p>
      <p className="font-normal text-base text-white"></p>
      <p className="font-normal text-base my-4 max-w-lg text-neutral-200">
        {caption}
      </p>
    </div>
  );
};

const SkeletonFour = ({
  title,
  caption,
}: {
  title: string;
  caption: string;
}) => {
  return (
    <div>
      <p className="font-bold text-4xl text-white">{title}</p>
      <p className="font-normal text-base text-white"></p>
      <p className="font-normal text-base my-4 max-w-lg text-neutral-200">
        {caption}
      </p>
    </div>
  );
};

const workshops = [
  {
    id: uuidv4(),
    title: "AI for Productive & Efficient Learning",
    date: "April 5th, 2025",
    description:
      "The session focused on how Artificial Intelligence is no longer a distant concept, but a present-day tool reshaping education and professional development. Through real-world examples, interactive discussions, and hands-on demonstrations, participants gained a solid understanding of how AI can be used to personalize learning, automate routine tasks, and enhance productivity.",
    highlights:
      "The workshop highlighted how AI-powered tools can offer personalized learning experiences tailored to individual pace and style, assist with research and project development through intelligent search and analysis and provide real-time feedback and virtual mentorship, even outside the classroom.",
    posts: [
      {
        title: "AI for Productive & Efficient Learning",
        href: "#",
        category: [
          { name: "Workshop", href: "#" },
          { name: "AI", href: "#" },
        ],
        description:
          "The session focused on how Artificial Intelligence is no longer a distant concept, but a present-day tool reshaping education and professional development. Through real-world examples, interactive discussions, and hands-on demonstrations, participants gained a solid understanding of how AI can be used to personalize learning, automate routine tasks, and enhance productivity.",
        date: "April 5th, 2025",
        datetime: "April 5th, 2025",
        images: [
          {
            id: 1,
            content: (
              <SkeletonOne
                title="1"
                caption="Interaction with students exploring AI-driven use cases"
              />
            ),
            className: "md:col-span-2",
            thumbnail:
              "https://ik.imagekit.io/dxffek9yf/tr:h-1800,w-1800,fo-face/website-workshop-instudia/ai-institute-workshop/ai-workshop-at-instudia.jpeg?updatedAt=1752486659667",
          },
          {
            id: 2,
            content: (
              <SkeletonTwo
                title="2"
                caption="Discussion on how to make prompting easier"
              />
            ),
            className: "col-span-1",
            thumbnail:
              "https://ik.imagekit.io/dxffek9yf/tr:h-1800,w-1800,fo-face,f-webp/website-workshop-instudia/ai-institute-workshop/WhatsApp%20Image%202025-07-14%20at%203.15.05%20PM%20(1).jpeg?updatedAt=1752486594279",
          },
          {
            id: 3,
            content: (
              <SkeletonThree
                title="3"
                caption="A snapshot of AI workshop being conducted"
              />
            ),
            className: "col-span-1",
            thumbnail:
              "https://ik.imagekit.io/dxffek9yf/tr:f-webp/website-workshop-instudia/ai-institute-workshop/WhatsApp%20Image%202025-07-14%20at%203.15.03%20PM.jpeg?updatedAt=1752486594248",
          },
          {
            id: 4,
            content: (
              <SkeletonFour
                title="4"
                caption="Resource person addressing students with Career insights"
              />
            ),
            className: "md:col-span-2",
            thumbnail:
              "https://ik.imagekit.io/dxffek9yf/tr:h-1800,w-1800,fo-face,f-webp/website-workshop-instudia/ai-institute-workshop/WhatsApp%20Image%202025-07-14%20at%203.15.05%20PM.jpeg?updatedAt=1752486594214",
          },
        ],
        imageUrl:
          "https://ik.imagekit.io/dxffek9yf/website-workshop-instudia/ai-institute-workshop/WhatsApp%20Image%202025-07-14%20at%203.15.05%20PM.jpeg?updatedAt=1752486594214",
        readingTime: "6 min",
      },
    ],
  },
  {
    id: uuidv4(),
    title: "Unlocking Potential with AI and Career insights",
    date: "September 7th, 2024",
    description:
      "A workshop was conducted at St. Edmund’s Higher Secondary School, Dimapur. The event featured engaging sessions led by experts from Instudia, who highlighted the growing significance of AI in reshaping industries and the modern job market. The sessions were designed to help students understand the critical role AI plays and how they can leverage it for both academic excellence and career readiness. Daniel Changkiri, Director of Instudia, explained the critical role of AI in modern education and its transformative potential. He emphasized how students can utilize AI tools to personalize and improve their learning experiences, thereby building stronger domain knowledge. Daniel also encouraged students to stay ahead in the digital age by acquiring AI-related skills—skills that are becoming increasingly relevant across a range of industries.",
    highlights:
      "Aimed to provide students with insights into new and evolving career paths while highlighting how Artificial Intelligence (AI) can be utilised to enhance their academic and professional growth,",
    posts: [
      {
        title: "Unlocking Potential with AI and Career insights",
        href: "#",
        category: [
          { name: "Workshop", href: "#" },
          { name: "AI", href: "#" },
        ],
        description:
          "A workshop was conducted at St. Edmund’s Higher Secondary School, Dimapur. The event featured engaging sessions led by experts from Instudia, who highlighted the growing significance of AI in reshaping industries and the modern job market. The sessions were designed to help students understand the critical role AI plays and how they can leverage it for both academic excellence and career readiness. Daniel Changkiri, Director of Instudia, explained the critical role of AI in modern education and its transformative potential. He emphasized how students can utilize AI tools to personalize and improve their learning experiences, thereby building stronger domain knowledge. Daniel also encouraged students to stay ahead in the digital age by acquiring AI-related skills—skills that are becoming increasingly relevant across a range of industries.",
        date: "September 7th, 2024",
        datetime: "September 7th, 2024",
        images: [
          {
            id: 1,
            content: (
              <SkeletonOne
                title="1"
                caption="A day of discovery and growth as students explore AI-driven career path"
              />
            ),
            className: "md:col-span-2",
            thumbnail:
              "https://ik.imagekit.io/dxffek9yf/website-workshop-instudia/ai-workshop-edmund/tinywow_IMG_2107-1_65553879.webp?updatedAt=1727345998353",
          },
          {
            id: 2,
            content: (
              <SkeletonTwo
                title="2"
                caption="Discussion on how to make a career and develop one's skill"
              />
            ),
            className: "col-span-1",
            thumbnail:
              "https://ik.imagekit.io/dxffek9yf/website-workshop-instudia/ai-workshop-edmund/tinywow_IMG_2105-1_65553879.webp?updatedAt=1727345998278",
          },
          {
            id: 3,
            content: (
              <SkeletonThree
                title="3"
                caption="A snapshot of curious students"
              />
            ),
            className: "col-span-1",
            thumbnail:
              "https://ik.imagekit.io/dxffek9yf/website-workshop-instudia/ai-workshop-edmund/tinywow_IMG_2104-1_65553879.webp?updatedAt=1727345998170",
          },
          {
            id: 4,
            content: (
              <SkeletonFour
                title="4"
                caption="Daniel Changkija addressing students with Career insights"
              />
            ),
            className: "md:col-span-2",
            thumbnail:
              "https://ik.imagekit.io/dxffek9yf/tr:w-500,h-500,c-maintain_ratio/website-workshop-instudia/ai-workshop-edmund/tinywow_IMG_2100-1_65553879.webp?updatedAt=1727413236974",
          },
        ],
        imageUrl:
          "https://images.unsplash.com/photo-1496128858413-b36217c2ce36?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1679&q=80",
        readingTime: "6 min",
      },
    ],
  },
  {
    id: uuidv4(),
    title: "Youth Upskilling Program",
    subtitle: "in association with Dimapur Ao Baptist Arogo",
    date: "March 1 - 10 July, 2024",
    description:
      "Instudia, in collaboration with Dimapur Ao Baptist Arogo, organized a Youth Upskilling Program to equip young individuals with essential digital and professional skills for thriving in the job market. Held in Dimapur, this program was focused on enhancing participants' knowledge in IT, communication, and career development to prepare them for today’s competitive job market. The Youth Upskilling Program was designed with a specific mission: to equip youth with the skills needed to thrive in an increasingly digital and professional world. By offering hands-on workshops, Instudia helped participants gain relevant skills that can be applied directly to their career goals.",
    posts: [
      {
        title:
          "Youth Upskilling Program in association with Dimapur Ao Baptist Arogo",
        href: "#",
        category: [
          { name: "Skill Program", href: "#" },
          { name: "DABA", href: "#" },
        ],
        description:
          "Instudia, in collaboration with Dimapur Ao Baptist Arogo, proudly organized the Youth Upskilling Program, aimed at empowering young individuals with essential digital and professional skills. This hands-on workshop focused on enhancing participants' knowledge in IT, communication, and career development, equipping them to thrive in today’s competitive job market. Through expert-led sessions, attendees gained practical insights into emerging technologies, effective problem-solving, and personal growth strategies. The program was a great success, fostering both skill enhancement and community growth for Dimapur's youth.",
        date: "March 1 - 10 July, 2024",
        datetime: "March 1 - 10 July, 2024",
        images: [
          {
            id: 1,
            content: (
              <SkeletonOne
                title="1"
                caption="Students concentrating on the work"
              />
            ),
            className: "lg:col-span-1",
            thumbnail:
              "https://ik.imagekit.io/dxffek9yf/website-workshop-instudia/youth-daba-training/class-youth-3.webp?updatedAt=1727556440957",
          },
          {
            id: 2,
            content: (
              <SkeletonTwo
                title="2"
                caption="Training under going with instructor"
              />
            ),
            className: "lg:col-span-2",
            thumbnail:
              "https://ik.imagekit.io/dxffek9yf/website-workshop-instudia/youth-daba-training/class-youth-1.webp?updatedAt=1727556440968",
          },
          {
            id: 3,
            content: (
              <SkeletonThree
                title="3"
                caption="Group shot of certificate distribution ceremony to successful participants"
              />
            ),
            className: "lg:col-span-2",
            thumbnail:
              "https://ik.imagekit.io/dxffek9yf/website-workshop-instudia/youth-daba-training/class-youth-group.webp?updatedAt=1728451444454",
          },
          {
            id: 4,
            content: (
              <SkeletonFour
                title="4"
                caption="A student being handed out the certificate"
              />
            ),
            className: "lg:col-span-1",
            thumbnail:
              "https://ik.imagekit.io/dxffek9yf/website-workshop-instudia/youth-daba-training/class-youth-4.webp?updatedAt=1727556661877&tr=w-1660%2Ch-2500%2Cfo-custom%2Ccm-extract",
          },
        ],
        imageUrl:
          "https://images.unsplash.com/photo-1496128858413-b36217c2ce36?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1679&q=80",
        readingTime: "6 min",
        author: {
          name: "Roel Aufderehar",
          href: "#",
          imageUrl:
            "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
        },
      },
    ],
  },
  {
    id: uuidv4(),
    title: "6 Weeks ESDP Training Program in Niuland",
    subtitle: "in association with Government of India and Ministry of MSME",
    date: "October 30th - 8th December, 2023",
    description:
      "Instudia, in partnership with the Government of India and MSME, offered a 6-week Entrepreneurial Skill Development Program in Niuland. This training initiative is designed to equip participants with crucial skills in Computer Basics, Information Technology (IT), and the MS Office Package to prepare them for success in today’s digital workplace. The Entrepreneurial Skill Development Program (ESDP) is structured to provide hands-on learning in foundational IT skills and practical computer literacy that enhances productivity and employability. This program is specifically targeted at aspiring entrepreneurs, students, and professionals seeking to strengthen their digital skills and improve their readiness for a competitive work environment.",
    posts: [
      {
        title: "6 Weeks ESDP Training Program in Niuland",
        href: "#",
        category: [
          { name: "Skill Program", href: "#" },
          { name: "MSME", href: "#" },
        ],
        description:
          "Instudia, in partnership with the Government of India and the Ministry of MSME, proudly presents a 6-week Entrepreneurial Skill Development Program (ESDP) in Niuland. This training program is designed to equip participants with essential skills in Computer Basics, Information Technology (IT), and the MS Office Package. The course offers hands-on learning, covering foundational topics in IT, computer literacy, and practical applications of Microsoft Office (Word, Excel, PowerPoint) to enhance productivity and employability. Open to aspiring entrepreneurs, students, and professionals, this program is aimed at fostering digital skills that are essential for today’s workplace and business environments.",
        date: "Mar 16, 2020",
        datetime: "2020-03-16",
        images: [
          {
            id: 1,
            content: (
              <SkeletonOne
                title="1"
                caption="Director enagaging with students in one of the sessions"
              />
            ),
            className: "md:col-span-2",
            thumbnail:
              "https://ik.imagekit.io/dxffek9yf/website-workshop-instudia/niuland-msme-workshop/niuland1.webp?updatedAt=1727423463408",
          },
          {
            id: 2,
            content: (
              <SkeletonTwo
                title="2"
                caption="A quick shoot of students after a full day class"
              />
            ),
            className: "col-span-1",
            thumbnail:
              "https://ik.imagekit.io/dxffek9yf/website-workshop-instudia/niuland-msme-workshop/niuland3.webp?updatedAt=1727423640960",
          },
          {
            id: 3,
            content: (
              <SkeletonThree
                title="3"
                caption="Group project focusing on topics from the training"
              />
            ),
            className: "col-span-1",
            thumbnail:
              "https://ik.imagekit.io/dxffek9yf/tr:w-500,h-500,c-maintain_ratio/website-workshop-instudia/niuland-msme-workshop/tinywow_niuland3_65552583.webp?updatedAt=1727345904268",
          },
          {
            id: 4,
            content: (
              <SkeletonFour
                title="4"
                caption="Students after a session on career insights"
              />
            ),
            className: "md:col-span-2",
            thumbnail:
              "https://ik.imagekit.io/dxffek9yf/website-workshop-instudia/niuland-msme-workshop/niuland4.webp?updatedAt=1727423217087",
          },
        ],
        imageUrl:
          "https://images.unsplash.com/photo-1496128858413-b36217c2ce36?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1679&q=80",
        readingTime: "6 min",
        author: {
          name: "Roel Aufderehar",
          href: "#",
          imageUrl:
            "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
        },
      },
    ],
  },
  {
    id: uuidv4(),
    title: "JobEx",
    date: "March 11th, 2023",
    description:
      "JobEx, a premium job fair organized by Instudia, connected over 70 job seekers with top companies from IT, finance, marketing, HR, and more, offering diverse career opportunities. instudia proudly hosted the job fair which aimed at bridging the gap between talented job seekers and top companies in the region. Held on March 11 at instudia's premises, the event brought together over 70 job seekers from various fields and more than 10 leading companies from industries. The event provided a valuable platform where job seekers had the chance to showcase their skills, interact with prospective employers, and explore exciting career opportunities—all under one roof. The JobEx job fair was designed to create a dynamic and interactive space for both job seekers and employers. With over 70 job seekers participating, the fair attracted talented individuals from diverse fields of expertise.",
    posts: [
      {
        title: "JobEx",
        href: "#",
        category: [{ name: "Job Fair", href: "#" }],
        description:
          "JobEx, a premium job fair organized by Instudia, connected over 70 job seekers with top companies from IT, finance, marketing, HR, and more, offering diverse career opportunities. instudia proudly hosted the job fair which aimed at bridging the gap between talented job seekers and top companies in the region. Held on March 11 at instudia's premises, the event brought together over 70 job seekers from various fields and more than 10 leading companies from industries. The event provided a valuable platform where job seekers had the chance to showcase their skills, interact with prospective employers, and explore exciting career opportunities—all under one roof. The JobEx job fair was designed to create a dynamic and interactive space for both job seekers and employers. With over 70 job seekers participating, the fair attracted talented individuals from diverse fields of expertise.",
        date: "March 11th, 2023",
        datetime: "March 11th, 2023",
        images: [
          {
            id: 1,
            content: (
              <SkeletonOne
                title="1"
                caption="Candidates awaiting their turns for a one-to-one"
              />
            ),
            className: "md:col-span-2",
            thumbnail:
              "https://ik.imagekit.io/dxffek9yf/website-workshop-instudia/instudia-job-fair/instudia_1.webp?updatedAt=1727456002083",
          },
          {
            id: 2,
            content: (
              <SkeletonTwo
                title="2"
                caption="Candidate being interviewed by one of the recruiters"
              />
            ),
            className: "col-span-1",
            thumbnail:
              "https://ik.imagekit.io/dxffek9yf/website-workshop-instudia/instudia-job-fair/job-fair-3.webp?updatedAt=1728451930044",
          },
          {
            id: 3,
            content: (
              <SkeletonThree
                title="3"
                caption="Another shot of candidates awaiting their turn"
              />
            ),
            className: "col-span-1",
            thumbnail:
              "https://ik.imagekit.io/dxffek9yf/website-workshop-instudia/instudia-job-fair/instudia_2.webp?updatedAt=1727456028615",
          },
          {
            id: 4,
            content: (
              <SkeletonFour
                title="4"
                caption="Briefing about the recruiters participating"
              />
            ),
            className: "md:col-span-2",
            thumbnail:
              "https://ik.imagekit.io/dxffek9yf/website-workshop-instudia/instudia-job-fair/job-fair-4.webp?updatedAt=1728451929991",
          },
        ],
        imageUrl:
          "https://images.unsplash.com/photo-1496128858413-b36217c2ce36?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1679&q=80",
        readingTime: "6 min",
        author: {
          name: "Roel Aufderehar",
          href: "#",
          imageUrl:
            "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
        },
      },
    ],
  },
  {
    id: uuidv4(),
    title: "Career Guidance at EduFest 2022",
    subtitle: "at Pilgrim Higher Secondary School",
    date: "17th September 2022",
    description:
      "Instudia was proud to participate in Edufest 2022, organized by Pilgrim Higher Secondary School, where students had the unique opportunity to engage with resource persons from a variety of professional fields. The event served as a platform to enlighten students about the diverse skill sets they can develop through vocational training programs aligned with their personal interests and career goals. Our team at Instudia highlighted the importance of developing practical skills through targeted vocational training, helping students explore future career paths in areas such as IT, Skill Training, Engineering and more.Students were encouraged to have one-on-one interactions with resource persons from these different departments, allowing them to gain firsthand insights into the specific skills and knowledge required for success in these fields. ",
    posts: [
      {
        title: "Career Guidance Program",
        href: "#",
        category: [{ name: "Career Guidance", href: "#" }],
        description:
          "Instudia was proud to participate in Edufest 2022, organized by Pilgrim Higher Secondary School, where students had the unique opportunity to engage with resource persons from a variety of professional fields. The event served as a platform to enlighten students about the diverse skill sets they can develop through vocational training programs aligned with their personal interests and career goals. Our team at Instudia highlighted the importance of developing practical skills through targeted vocational training, helping students explore future career paths in areas such as IT, Skill Training, Engineering and more.Students were encouraged to have one-on-one interactions with resource persons from these different departments, allowing them to gain firsthand insights into the specific skills and knowledge required for success in these fields. ",
        date: "17th September 2022",
        datetime: "17th September 2022",
        images: [
          {
            id: 1,
            content: (
              <SkeletonOne
                title="1"
                caption="Students being curious about the courses"
              />
            ),
            className: "md:col-span-2",
            thumbnail:
              "https://ik.imagekit.io/dxffek9yf/website-workshop-instudia/pilgrim-school-workshop/pilgrim2.webp?updatedAt=1727545806021",
          },
          {
            id: 2,
            content: (
              <SkeletonTwo
                title="2"
                caption="One of the participating schools along with their teacher-in-charge"
              />
            ),
            className: "col-span-1",
            thumbnail:
              "https://ik.imagekit.io/dxffek9yf/website-workshop-instudia/pilgrim-school-workshop/pilgrim1_3:4.webp?updatedAt=1727427228258",
          },
          {
            id: 3,
            content: (
              <SkeletonThree
                title="3"
                caption="Director Daniel Changkija interacting with students"
              />
            ),
            className: "col-span-1",
            thumbnail:
              "https://ik.imagekit.io/dxffek9yf/website-workshop-instudia/pilgrim-school-workshop/pilgrim3.webp?updatedAt=1727545778807",
          },
          {
            id: 4,
            content: (
              <SkeletonFour
                title="4"
                caption="Group of enthusiatic girl students - Girl Power"
              />
            ),
            className: "md:col-span-2",
            thumbnail:
              "https://ik.imagekit.io/dxffek9yf/website-workshop-instudia/pilgrim-school-workshop/pilgrim_3:4.webp?updatedAt=1728450451052&tr=w-733%2Ch-494%2Cfo-custom%2Ccm-extract",
          },
        ],
        imageUrl:
          "https://images.unsplash.com/photo-1496128858413-b36217c2ce36?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1679&q=80",
        readingTime: "6 min",
        author: {
          name: "Roel Aufderehar",
          href: "#",
          imageUrl:
            "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
        },
      },
    ],
  },
  {
    id: uuidv4(),
    title: "Workshop on Photography and Python",
    date: "June 23th - 24th 2022",
    description:
      "We organized an engaging two-day workshop on Basic Photography skills and Python programming with a renowned photographer and proprietor of StudioLagom, Akumyanger L. Jamir as the resource person along with Sr. Software Developer, Er. Vishal Bardewa on June 23 and 24. The resource person, Akumyanger L. Jamir gave a clear picture of different kinds of cameras and lens used by professional photographers for shooting different objects and situations. Jamir also trained the students on technical elements like composing photos, besides sharing his experiences. He also encouraged the students to be open to the unique needs of Naga people in photography profession in Nagaland. On the second day, the participants were divided into small groups and asked to take pictures in a restricted time limit. The participants were also introduced to various kinds of photography and helped to choose their favourite style of photography based on their personal preferences. On the second day, Vishal Bardewa, Sr. Software Developer led a session on Python programming, aimed at introducing participants to one of the most versatile and popular programming languages used today.",
    posts: [
      {
        title: "Workshop on Photography and Python",
        href: "#",
        category: [{ name: "Workshop", href: "#" }],
        description:
          "We organized an engaging two-day workshop on Basic Photography skills and Python programming with a renowned photographer and proprietor of StudioLagom, Akumyanger L. Jamir as the resource person along with Sr. Software Developer, Er. Vishal Bardewa on June 23 and 24. The resource person, Akumyanger L. Jamir gave a clear picture of different kinds of cameras and lens used by professional photographers for shooting different objects and situations. Jamir also trained the students on technical elements like composing photos, besides sharing his experiences. He also encouraged the students to be open to the unique needs of Naga people in photography profession in Nagaland. On the second day, the participants were divided into small groups and asked to take pictures in a restricted time limit. The participants were also introduced to various kinds of photography and helped to choose their favourite style of photography based on their personal preferences. On the second day, Vishal Bardewa, Sr. Software Developer led a session on Python programming, aimed at introducing participants to one of the most versatile and popular programming languages used today.",
        date: "17th September 2022",
        datetime: "17th September 2022",
        images: [
          {
            id: 1,
            content: (
              <SkeletonOne
                title="1"
                caption="Resource person sharing insights about the gears in use"
              />
            ),
            className: "md:col-span-2",
            thumbnail:
              "https://ik.imagekit.io/dxffek9yf/website-workshop-instudia/instudia-photography-workshop/photography-1.webp?updatedAt=1728451886303",
          },
          {
            id: 2,
            content: <SkeletonTwo title="2" caption="The session commencing" />,
            className: "col-span-1",
            thumbnail:
              "https://ik.imagekit.io/dxffek9yf/website-workshop-instudia/instudia-photography-workshop/photography-3.webp?updatedAt=1728452013442",
          },
          {
            id: 3,
            content: (
              <SkeletonThree
                title="3"
                caption="Participants taking the camera out for the day"
              />
            ),
            className: "col-span-1",
            thumbnail:
              "https://ik.imagekit.io/dxffek9yf/website-workshop-instudia/instudia-photography-workshop/photography-2.webp?updatedAt=1728451956240",
          },
          {
            id: 4,
            content: <SkeletonFour title="4" caption="Presentation time!!" />,
            className: "md:col-span-2",
            thumbnail:
              "https://ik.imagekit.io/dxffek9yf/website-workshop-instudia/instudia-photography-workshop/photography-4.webp?updatedAt=1728451855375",
          },
        ],
        imageUrl:
          "https://images.unsplash.com/photo-1496128858413-b36217c2ce36?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1679&q=80",
        readingTime: "6 min",
        author: {
          name: "Roel Aufderehar",
          href: "#",
          imageUrl:
            "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
        },
      },
    ],
  },
];

const PostCard = ({ workshop }: any) => (
  <FadeInStagger>
    <FadeIn>
      <div className="relative mx-auto max-w-7xl">
        <div className="text-center">
          <h2 className="text-3xl px-2 font-extrabold tracking-tight text-gray-900 sm:text-4xl lg:px-0">
            {workshop.title}
          </h2>
          {workshop.subtitle && (
            <p className="mx-auto p-0 max-w-2xl text-base text-gray-500 italic font-light">
              {workshop.subtitle}
            </p>
          )}
          <p className="mx-auto mt-3 max-w-2xl text-xl text-gray-500 sm:mt-4">
            {workshop.date}
          </p>
        </div>
        <div className="mx-auto mt-12 grid max-w-lg gap-5 lg:max-w-none lg:grid-cols-1">
          {workshop.posts.map((post: any, index: any) => (
            <div
              key={post.title}
              className="flex flex-col overflow-hidden rounded-lg shadow-lg"
            >
              <div className="shrink-0">
                <div className="relative h-screen w-full">
                  <LayoutGrid cards={post.images} />
                </div>
              </div>
              <div className="flex flex-1 flex-col justify-between bg-white p-6">
                <div className="flex-1">
                  <div className="flex flex-row gap-2">
                    {post.category.map((cat: any, i: any) => (
                      <p
                        key={uuidv4()}
                        className="text-xs font-sm text-yellow-600"
                      >
                        <a
                          href={cat.href}
                          className="text-white bg-black px-4 py-2 rounded-2xl"
                        >
                          {cat.name}
                        </a>
                      </p>
                    ))}
                  </div>
                  <a href={post.href} className="mt-2 block">
                    <p className="text-xl font-semibold text-gray-900">
                      {post.hightlights}
                    </p>
                    <p className="mt-3 text-base text-gray-500 text-justify">
                      {post.description}
                    </p>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </FadeIn>
  </FadeInStagger>
);

export default function Page() {
  return (
    <>
      <FixedSidebar main={<Intro />} footer={<IntroFooter />} />
      {/* <ThemeToggle /> */}
      <div className="grid grid-cols-8 relative">
        <Timeline />
        <main className="col-span-12 space-y-20 py-20 lg:col-start-4 lg:col-span-7 sm:space-y-32 sm:py-32">
          {workshops.map((workshop) => (
            <PostCard key={workshop.id} workshop={workshop} />
          ))}
        </main>
      </div>
    </>
  );
}
