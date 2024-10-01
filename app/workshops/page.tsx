"use client";

import { useId } from "react";

// import { Intro, IntroFooter } from '@/components/Intro'
// import { StarField } from '@/components/StarField'
// import { ThemeToggle } from '@/components/ThemeToggle'
import { v4 as uuidv4 } from 'uuid';
import Link from "next/link";

import { cn } from "../_utils/cn";
import CardSection from "../components/molecules/CardSection";
import Image from "next/image";
import BlogCard from "../components/atom/BlogCard";
import { LayoutGrid } from "../components/organisms/LayoutGrid";
import { randomUUID } from "crypto";
import { FadeIn, FadeInStagger } from "../components/atom/FadeIn";

function ButtonInner({
  arrow = false,
  children,
}: {
  arrow?: boolean;
  children: React.ReactNode;
}) {
  return (
    <>
      <span className="absolute inset-0 rounded-md bg-gradient-to-b from-white/80 to-white opacity-10 transition-opacity group-hover:opacity-15" />
      <span className="absolute inset-0 rounded-md opacity-7.5 shadow-[inset_0_1px_1px_white] transition-opacity group-hover:opacity-10" />
      {children} {arrow ? <span aria-hidden="true">&rarr;</span> : null}
    </>
  );
}

function Button({
  className,
  arrow,
  children,
  ...props
}: { arrow?: boolean } & (
  | React.ComponentPropsWithoutRef<typeof Link>
  | ({ href?: undefined } & React.ComponentPropsWithoutRef<"button">)
)) {
  className = cn(
    className,
    "group relative isolate flex-none rounded-md py-1.5 text-[0.8125rem]/6 font-semibold text-white",
    arrow ? "pl-2.5 pr-[calc(9/16*1rem)]" : "px-2.5"
  );

  return typeof props.href === "undefined" ? (
    <button className={className} {...props}>
      <ButtonInner arrow={arrow}>{children}</ButtonInner>
    </button>
  ) : (
    <Link className={className} {...props}>
      <ButtonInner arrow={arrow}>{children}</ButtonInner>
    </Link>
  );
}

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

function SignUpForm() {
  let id = useId();

  return (
    <form className="relative isolate mt-8 flex items-center pr-1">
      <label htmlFor={id} className="sr-only">
        Email address
      </label>
      <input
        required
        type="email"
        autoComplete="email"
        name="email"
        id={id}
        placeholder="Email address"
        className="peer w-0 flex-auto bg-transparent px-4 py-2.5 text-base text-white placeholder:text-gray-500 focus:outline-none sm:text-[0.8125rem]/6"
      />
      <Button type="submit" arrow>
        Get updates
      </Button>
      <div className="absolute inset-0 -z-10 rounded-lg transition peer-focus:ring-4 peer-focus:ring-sky-300/15" />
      <div className="absolute inset-0 -z-10 rounded-lg bg-white/2.5 ring-1 ring-white/15 transition peer-focus:ring-sky-300" />
    </form>
  );
}

function Logo(props: React.ComponentPropsWithoutRef<"svg">) {
  let id = useId();

  return (
    <svg viewBox="0 0 140 32" fill="none" aria-hidden="true" {...props}>
      <title>Commit</title>
      <mask id={`${id}-m`} fill="#fff">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M31.75 18h-8.13a8 8 0 01-15.5 0H0a16 16 0 0031.75 0zm0-4h-8.13a8 8 0 00-15.5 0H0a16 16 0 0131.75 0z"
        />
      </mask>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M31.75 18h-8.13a8 8 0 01-15.5 0H0a16 16 0 0031.75 0zm0-4h-8.13a8 8 0 00-15.5 0H0a16 16 0 0131.75 0z"
        fill={`url(#${id}-g)`}
      />
      <path
        d="M31.75 18l1 .12.13-1.12h-1.13v1zm-8.13 0v-1h-.77l-.2.75.97.25zm-15.5 0l.98-.25-.2-.75h-.77v1zM0 18v-1h-1.13l.14 1.12L0 18zm23.62-4l-.96.25.19.75h.77v-1zm8.13 0v1h1.13l-.14-1.12-.99.12zM8.13 14v1h.77l.2-.75-.97-.25zM0 14l-1-.12-.13 1.12H0v-1zm31.75 3h-8.13v2h8.13v-2zm-9.1.75A7 7 0 0115.89 23v2a9 9 0 008.71-6.75l-1.93-.5zM15.89 23a7 7 0 01-6.78-5.25l-1.94.5A9 9 0 0015.88 25v-2zm-7.75-6H0v2h8.13v-2zm7.75 14A15 15 0 01.99 17.88l-1.98.24A17 17 0 0015.88 33v-2zm14.88-13.12A15 15 0 0115.88 31v2a17 17 0 0016.86-14.88l-1.98-.24zM23.62 15h8.13v-2h-8.13v2zm-7.74-6a7 7 0 016.78 5.25l1.93-.5A9 9 0 0015.88 7v2zM9.1 14.25A7 7 0 0115.88 9V7a9 9 0 00-8.72 6.75l1.94.5zM0 15h8.13v-2H0v2zm1-.88A15 15 0 0115.87 1v-2A17 17 0 00-1 13.88l1.98.24zM15.87 1a15 15 0 0114.88 13.12l1.98-.24A17 17 0 0015.88-1v2z"
        fill="#fff"
        fillOpacity={0.2}
        mask={`url(#${id}-m)`}
      />
      <path
        d="M52.42 24.24c4.5 0 7.83-2.54 8.26-6.36h-4.37c-.33 1.63-1.94 2.69-3.89 2.69-2.7 0-4.46-1.66-4.46-5.33 0-3.65 1.75-5.3 4.46-5.3 2.02 0 3.5 1.1 3.9 2.66h4.36c-.43-3.8-3.7-6.34-8.26-6.34-5.32 0-8.88 3.24-8.88 8.98 0 5.76 3.56 9 8.88 9zm16.35 0c4.18 0 6.56-2.71 6.56-6.72 0-4.25-2.62-6.72-6.56-6.72-4.17 0-6.57 2.71-6.57 6.72 0 4.25 2.64 6.72 6.57 6.72zm0-3.29c-1.5 0-2.47-1.05-2.47-3.43 0-2.4.99-3.46 2.47-3.46 1.5 0 2.48 1.06 2.48 3.46s-.99 3.43-2.48 3.43zm8.6 3.05h4.06v-7.27c0-1.35.8-2.64 2.33-2.64 1.42 0 2 .96 2 2.93V24h4.07v-7.27c0-1.35.8-2.64 2.3-2.64 1.42 0 2.02.96 2.02 2.93V24h4.06v-7.87c0-3.87-1.94-5.33-4.4-5.33-1.91 0-3.57.94-4.14 2.8h-.2c-.7-2.06-2.3-2.8-4.05-2.8-1.68 0-3.2.84-3.8 2.47h-.19l-.12-2.23h-3.93V24zm23.5 0h4.05v-7.27c0-1.35.8-2.64 2.33-2.64 1.41 0 1.99.96 1.99 2.93V24h4.08v-7.27c0-1.35.8-2.64 2.3-2.64 1.42 0 2.02.96 2.02 2.93V24h4.05v-7.87c0-3.87-1.94-5.33-4.39-5.33-1.92 0-3.57.94-4.15 2.8h-.2c-.69-2.06-2.3-2.8-4.05-2.8-1.68 0-3.19.84-3.79 2.47h-.2l-.11-2.23h-3.94V24zm23.48-14.47h4.05V6.5h-4.05v3.03zm0 14.47h4.05V11.04h-4.05V24zm11.45 0h2.95v-3.26h-1.51c-.63 0-.99-.17-.99-.9V14.3h2.5v-3.26h-2.5v-3.8l-4.05.37v3.43h-2.23v3.26h2.23v6.3c0 2.06.72 3.4 3.6 3.4z"
        fill="#fff"
      />
      <defs>
        <linearGradient
          id={`${id}-g`}
          x1={15.88}
          y1={0}
          x2={15.88}
          y2={32}
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#AAE4FF" />
          <stop offset={1} stopColor="#38BDF8" />
        </linearGradient>
      </defs>
    </svg>
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

function XIcon(props: React.ComponentPropsWithoutRef<"svg">) {
  return (
    <svg viewBox="0 0 16 16" aria-hidden="true" fill="currentColor" {...props}>
      <path d="M9.51762 6.77491L15.3459 0H13.9648L8.90409 5.88256L4.86212 0H0.200195L6.31244 8.89547L0.200195 16H1.58139L6.92562 9.78782L11.1942 16H15.8562L9.51728 6.77491H9.51762ZM7.62588 8.97384L7.00658 8.08805L2.07905 1.03974H4.20049L8.17706 6.72795L8.79636 7.61374L13.9654 15.0075H11.844L7.62588 8.97418V8.97384Z" />
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
      <h1 className="mt-14 font-display text-4xl/tight font-bold text-black">
        Workshops and Seminars
        {/* <span className="text-black">for macOS minimalists</span> */}
      </h1>
      <p className="mt-4 text-sm/6 text-black">
        Get ahead with instudia’s workshops and seminars, tailored to provide
        students with real-world skills and education as per current job market
        scenario.
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

const posts = [
  {
    title: "Boost your conversion rate",
    href: "#",
    category: { name: "Article", href: "#" },
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto accusantium praesentium eius, ut atque fuga culpa, similique sequi cum eos quis dolorum.",
    date: "Mar 16, 2020",
    datetime: "2020-03-16",
    images: [
      {
        id: 1,
        content: (
          <SkeletonOne
            title="lorem ipsum"
            caption="Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum"
          />
        ),
        className: "md:col-span-2",
        thumbnail:
          "https://images.unsplash.com/photo-1476231682828-37e571bc172f?q=80&w=3474&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      },
      {
        id: 2,
        content: (
          <SkeletonTwo
            title="lorem ipsum"
            caption="Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum"
          />
        ),
        className: "col-span-1",
        thumbnail:
          "https://images.unsplash.com/photo-1464457312035-3d7d0e0c058e?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      },
      {
        id: 3,
        content: (
          <SkeletonThree
            title="lorem ipsum"
            caption="Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum"
          />
        ),
        className: "col-span-1",
        thumbnail:
          "https://images.unsplash.com/photo-1588880331179-bc9b93a8cb5e?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      },
      {
        id: 4,
        content: (
          <SkeletonFour
            title="lorem ipsum"
            caption="Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum"
          />
        ),
        className: "md:col-span-2",
        thumbnail:
          "https://images.unsplash.com/photo-1475070929565-c985b496cb9f?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
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
];

const workshops = [
  {
    id: uuidv4(),
    title: "Unlocking Potential with AI and Career insights",
    date: "September 7th, 2024",
    description:
      "Explored how AI can support students in gaining deeper insights into their areas of study, as well as the importance of preparing for future career opportunities by embracing AI and other technological advancements.",
    highlights:
      "Aimed to provide students with insights into new and evolving career paths while highlighting how Artificial Intelligence (AI) can be utilised to enhance their academic and professional growth,",
    posts: [
      {
        title: "Unlocking Potential with AI and Career insights",
        href: "#",
        category: [{ name: "Workshop", href: "#" }],
        description:
          "Explored how AI can support students in gaining deeper insights into their areas of study, as well as the importance of preparing for future career opportunities by embracing AI and other technological advancements. Daniel Changkiri, director of instudia, expounded on the critical role that AI plays in modern education and how students can use AI tools to personalise and improve their learning experiences, thereby building stronger domain knowledge. During the workshop, participants were introduced to various applications of AI in education, with a focus on personalised learning and the expanding opportunities in technology-driven fields.",
        date: "September 7th, 2024",
        datetime: "September 7th, 2024",
        images: [
          {
            id: 1,
            content: (
              <SkeletonOne
                title="lorem ipsum"
                caption="Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum"
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
                title="lorem ipsum"
                caption="Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum"
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
                title="lorem ipsum"
                caption="Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum"
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
                title="lorem ipsum"
                caption="Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum"
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
      "Instudia, in collaboration with Dimapur Ao Baptist Arogo, proudly organized the Youth Upskilling Program, aimed at empowering young individuals with essential digital and professional skills. This hands-on workshop focused on enhancing participants' knowledge in IT, communication, and career development, equipping them to thrive in today’s competitive job market. Through expert-led sessions, attendees gained practical insights into emerging technologies, effective problem-solving, and personal growth strategies. The program was a great success, fostering both skill enhancement and community growth for Dimapur's youth.",
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
                title="lorem ipsum"
                caption="Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum"
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
                title="lorem ipsum"
                caption="Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum"
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
                title="lorem ipsum"
                caption="Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum"
              />
            ),
            className: "lg:col-span-2",
            thumbnail:
              "https://ik.imagekit.io/dxffek9yf/website-workshop-instudia/youth-daba-training/class-youth-2.webp?updatedAt=1727556592864&tr=w-2013%2Ch-2007%2Cfo-custom%2Ccm-extract",
          },
          {
            id: 4,
            content: (
              <SkeletonFour
                title="lorem ipsum"
                caption="Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum"
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
      "Instudia, in partnership with the Government of India and the Ministry of MSME, proudly presents a 6-week Entrepreneurial Skill Development Program (ESDP) in Niuland. This training program is designed to equip participants with essential skills in Computer Basics, Information Technology (IT), and the MS Office Package. The course offers hands-on learning, covering foundational topics in IT, computer literacy, and practical applications of Microsoft Office (Word, Excel, PowerPoint) to enhance productivity and employability. Open to aspiring entrepreneurs, students, and professionals, this program is aimed at fostering digital skills that are essential for today’s workplace and business environments.",
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
                title="lorem ipsum"
                caption="Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum"
              />
            ),
            className: "md:col-span-2",
            thumbnail:
              "https://ik.imagekit.io/dxffek9yf/website-workshop-instudia/niuland-msme-workshop/tinywow_niuland1_65552583.webp?updatedAt=1727345903918",
          },
          {
            id: 2,
            content: (
              <SkeletonTwo
                title="lorem ipsum"
                caption="Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum"
              />
            ),
            className: "col-span-1",
            thumbnail:
              "https://ik.imagekit.io/dxffek9yf/tr:w-500,h-500,c-maintain_ratio/website-workshop-instudia/niuland-msme-workshop/tinywow_niuland4_65552583.webp?updatedAt=1727345904105",
          },
          {
            id: 3,
            content: (
              <SkeletonThree
                title="lorem ipsum"
                caption="Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum"
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
                title="lorem ipsum"
                caption="Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum"
              />
            ),
            className: "md:col-span-2",
            thumbnail:
              "https://ik.imagekit.io/dxffek9yf/website-workshop-instudia/niuland-msme-workshop/tinywow_niuland9_65552583.webp?updatedAt=1727345904280",
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
      "A premium job fair aimed at bridging the gap between talented job seekers and top companies in the region. The event, held on March 11 at Instudia's premises, saw active participation from over 70 job seekers across various fields of expertise.More than 10 leading companies from sectors including IT, finance, marketing, human resources, and more, took part in the job fair, offering a diverse range of employment opportunities. JobEx provided an invaluable platform for candidates to showcase their skills, interact with potential employers, and explore exciting career paths.Participants had the chance to network with company representatives, submit resumes, and attend on-the-spot interviews, creating a direct link between employers and job seekers. The event not only facilitated meaningful connections but also empowered attendees with real-time opportunities to advance their careers.",
    posts: [
      {
        title: "JobEx",
        href: "#",
        category: [{ name: "Job Fair", href: "#" }],
        description:
          "A premium job fair aimed at bridging the gap between talented job seekers and top companies in the region. The event, held on March 11 at Instudia's premises, saw active participation from over 70 job seekers across various fields of expertise.More than 10 leading companies from sectors including IT, finance, marketing, human resources, and more, took part in the job fair, offering a diverse range of employment opportunities. JobEx provided an invaluable platform for candidates to showcase their skills, interact with potential employers, and explore exciting career paths.Participants had the chance to network with company representatives, submit resumes, and attend on-the-spot interviews, creating a direct link between employers and job seekers. The event not only facilitated meaningful connections but also empowered attendees with real-time opportunities to advance their careers.",
        date: "March 11th, 2023",
        datetime: "March 11th, 2023",
        images: [
          {
            id: 1,
            content: (
              <SkeletonOne
                title="lorem ipsum"
                caption="Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum"
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
                title="lorem ipsum"
                caption="Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum"
              />
            ),
            className: "col-span-1",
            thumbnail:
              "https://ik.imagekit.io/dxffek9yf/website-workshop-instudia/instudia-job-fair/instudia.webp?updatedAt=1727455974544",
          },
          {
            id: 3,
            content: (
              <SkeletonThree
                title="lorem ipsum"
                caption="Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum"
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
                title="lorem ipsum"
                caption="Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum"
              />
            ),
            className: "md:col-span-2",
            thumbnail:
              "https://images.unsplash.com/photo-1475070929565-c985b496cb9f?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
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
                title="lorem ipsum"
                caption="Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum"
              />
            ),
            className: "md:col-span-2",
            thumbnail:
              "https://ik.imagekit.io/dxffek9yf/tr:w-500,h-500,c-maintain_ratio/website-workshop-instudia/pilgrim-school-workshop/tinywow_pilgrim_65554046.webp?updatedAt=1727346075613",
          },
          {
            id: 2,
            content: (
              <SkeletonTwo
                title="lorem ipsum"
                caption="Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum"
              />
            ),
            className: "col-span-1",
            thumbnail:
              "https://ik.imagekit.io/dxffek9yf/website-workshop-instudia/pilgrim-school-workshop/tinywow_pilgrim1_65552583.webp?updatedAt=1727346105546",
          },
          {
            id: 3,
            content: (
              <SkeletonThree
                title="lorem ipsum"
                caption="Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum"
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
                title="lorem ipsum"
                caption="Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum"
              />
            ),
            className: "md:col-span-2",
            thumbnail:
              "https://ik.imagekit.io/dxffek9yf/website-workshop-instudia/pilgrim-school-workshop/pilgrim2.webp?updatedAt=1727545806021",
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
      "a two-day workshop on basic photography skills and Python programming at Instudia, Vikiye Centre, Notun Bosti junction, Dimapur with a renowned photographer and proprietor of StudioLagom, Akumyanger L. Jamir as the resource person along with Sr. Software Developer, Er. Vishal Bardewa on June 23 and 24.The resource person, Akumyanger L. Jamir gave a clear picture of different kinds of cameras and lens used by professional photographers for shooting different objects and situations. Jamir also trained the students on technical elements like composing photos, besides sharing his experiences. He also encouraged the students to be open to the unique needs of Naga people in photography profession in Nagaland. On the second day, the participants were divided into small groups and asked to take pictures in a restricted time limit. The participants were also introduced to various kinds of photography and helped to choose their favourite style of photography based on their personal preferences.",
    posts: [
      {
        title: "Workshop on Photography and Python",
        href: "#",
        category: [{ name: "Workshop", href: "#" }],
        description:
          "a two-day workshop on basic photography skills and Python programming at Instudia, Vikiye Centre, Notun Bosti junction, Dimapur with a renowned photographer and proprietor of StudioLagom, Akumyanger L. Jamir (Aakum Den) as the resource person along with Sr. Software Developer, Vishal Bardewa on June 23 and 24.The resource person, Akumyanger L. Jamir gave a clear picture of different kinds of cameras and lens used by professional photographers for shooting different objects and situations. Jamir also trained the students on technical elements like composing photos, besides sharing his experiences. He also encouraged the students to be open to the unique needs of Naga people in photography profession in Nagaland. On the second day, the participants were divided into small groups and asked to take pictures in a restricted time limit. The participants were also introduced to various kinds of photography and helped to choose their favourite style of photography based on their personal preferences.",
        date: "17th September 2022",
        datetime: "17th September 2022",
        images: [
          {
            id: 1,
            content: (
              <SkeletonOne
                title="lorem ipsum"
                caption="Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum"
              />
            ),
            className: "md:col-span-2",
            thumbnail:
              "https://images.unsplash.com/photo-1476231682828-37e571bc172f?q=80&w=3474&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          },
          {
            id: 2,
            content: (
              <SkeletonTwo
                title="lorem ipsum"
                caption="Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum"
              />
            ),
            className: "col-span-1",
            thumbnail:
              "https://images.unsplash.com/photo-1464457312035-3d7d0e0c058e?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          },
          {
            id: 3,
            content: (
              <SkeletonThree
                title="lorem ipsum"
                caption="Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum"
              />
            ),
            className: "col-span-1",
            thumbnail:
              "https://images.unsplash.com/photo-1588880331179-bc9b93a8cb5e?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          },
          {
            id: 4,
            content: (
              <SkeletonFour
                title="lorem ipsum"
                caption="Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum"
              />
            ),
            className: "md:col-span-2",
            thumbnail:
              "https://images.unsplash.com/photo-1475070929565-c985b496cb9f?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
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
