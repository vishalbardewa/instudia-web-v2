import Image from "next/image";
import React from "react";
import {
  BasicBadge,
  ComingSoonBadge,
  DesignBadge,
  DevelopmentBadge,
  FinanceBadge,
  SkillBadge,
  TrendingBadge,
} from "../atom/Badge";
import SideBySideCard from "./SideBySideCard";
import { slugs } from "@/app/routes";
import Link from "next/link";
import { IMAGE_LIST } from "@/app/utils/CourseImageList";

interface ICourseCard {
  title: string;
  description: string;
  badge: React.ReactNode;
  imageUrl: any;
  imageAlt: string;
  className?: string;
  gridFix?: boolean;
  href?: string;
  comingSoon?: false;
}

let firstLayerCourses = [
  {
    title: "Programming with Python",
    imageUrl:
      IMAGE_LIST[`${slugs.PYTHON}`],
    imageAlt: "Python Programming in Dimapur",
    description:
      "Learn the fundamentals of Python, from basic syntax to object-oriented programming. This beginner-friendly course offers hands-on projects to develop real-world coding skills. By the end, you'll be ready to build your own applications.",
    badge: <DevelopmentBadge />,
    href: slugs.PYTHON
  },
  {
    title: "Accounting in Tally with GST",
    imageUrl:
      IMAGE_LIST[`${slugs.GST}`],
    imageAlt: "Tally with GST in Dimapur",
    description:
      "Learn the fundamentals of Tally, from basic accounting to GST compliance. This beginner-friendly course offers hands-on projects to develop real-world accounting skills. By the end, you'll be ready to manage GST-compliant financials.",
    badge: <FinanceBadge />,
    href: slugs.GST
  },

  {
    title: "Frontend Web Development",
    imageUrl:
      IMAGE_LIST[`${slugs.FRONTEND}`],
    imageAlt: "Tally with GST in Dimapur",
    description:
      "Learn the fundamentals of frontend development, from HTML, CSS to JavaScript and responsive design. This beginner-friendly course offers hands-on projects to develop real-world web design skills. Build your own websites.",
    badge: <DevelopmentBadge />,
    href: slugs.FRONTEND
  },

  {
    title: "Backend Web Development",
    imageUrl: IMAGE_LIST[`${slugs.BACKEND}`],
    imageAlt: "Tally with GST in Dimapur",
    description:
      "Learn the fundamentals of backend development, from server-side scripting to database management. This beginner-friendly course offers hands-on projects to build real-world APIs. Ready to develop and manage backend systems.",
    badge: <DevelopmentBadge />,
    href: slugs.BACKEND
  },
];

let secondLayerCourses = [
  {
    title: "Certificate in UI/UX Design Specialization",
    imageUrl: IMAGE_LIST[`${slugs.UIUX_DESIGN}`],
    imageAlt: "UI/UX Design in Dimapur",
    description:
      "Learn the fundamentals of UI/UX design, from user research to prototyping and testing. This beginner-friendly course offers hands-on projects to develop real-world design skills. By the end, you'll be ready to create user-centered digital experiences.",
    badge: <DesignBadge />,
    href: slugs.UIUX_DESIGN
  },
  {
    title: "Certificate in Graphic Designing",
    imageUrl: IMAGE_LIST[`${slugs.GRAPHIC_DESIGN}`],
    imageAlt: "Graphic Design in Dimapur",
    description:
      "Learn the fundamentals of graphic design, from basic principles to advanced techniques. This beginner-friendly course offers hands-on projects to develop real-world design skills. By the end, you'll be ready to create your own professional designs.",
    badge: <DesignBadge />,
    href: slugs.GRAPHIC_DESIGN
  },

  {
    title: "Certificate in DevOps Cloud Services",
    imageUrl: IMAGE_LIST[`${slugs.DEVOPS}`],
    imageAlt: "Devops in Dimapur",
    description:
      "Learn the fundamentals of DevOps, from basic concepts to continuous integration and deployment. This beginner-friendly course offers hands-on projects to develop real-world automation skills. By the end, you'll be ready to streamline application development and operations.",
    badge: <DevelopmentBadge />,
    href: slugs.DEVOPS
  },

  {
    title: "Certificate in Business Intelligence",
    imageUrl:
      IMAGE_LIST[`${slugs.BUSINESS_INTELLIGENCE}`],
    imageAlt: "PowerBI in Dimapur",
    description:
      "Learn the fundamentals of Power BI, from data visualization to advanced analytics. This beginner-friendly course offers hands-on projects to develop real-world data analysis skills. By the end, you'll be ready to create your own interactive reports and dashboards.",
    badge: <FinanceBadge />,
    href: slugs.BUSINESS_INTELLIGENCE
  },
];

let thirdLayerCourses = [
  {
    title: "Certificate in Hardware and Networking",
    imageUrl:
      IMAGE_LIST[`${slugs.HARDWARE_NETWORKING}`],
    imageAlt: "Hardware and Networking in Dimapur",
    description:
      "Learn the fundamentals of computer hardware and networking, from assembling PCs to configuring networks. This beginner-friendly course offers hands-on projects to develop real-world technical skills. By the end, you'll be ready to manage and troubleshoot networks efficiently.",
    badge: <DevelopmentBadge />,
    href: slugs.HARDWARE_NETWORKING
  },
  {
    title: "Certificate in Project Management",
    imageUrl: IMAGE_LIST[`${slugs.PROJECT_MANAGEMENT}`],
    imageAlt: "Project Management in Dimapur",
    description:
      "Learn the fundamentals of project management, from planning and scheduling to risk management and execution. This beginner-friendly course offers hands-on projects to develop real-world management skills. By the end, you'll be ready to manage your own projects.",
    badge: <DesignBadge />,
    href: slugs.PROJECT_MANAGEMENT
  },

  {
    title: "Diploma in Computer Applications",
    imageUrl:
      IMAGE_LIST[`${slugs.DCA}`],
    imageAlt: "DCA in Dimapur",
    description:
      "Learn the fundamentals of computer applications, from basic software tools to advanced data management. This beginner-friendly course offers hands-on projects to develop real-world tech skills. By the end, you'll be ready to handle various IT tasks efficiently.",
    badge: <SkillBadge />,
    href: slugs.DCA
  },

  {
    title: "Certificate in Retail Management",
    imageUrl:
      IMAGE_LIST[`${slugs.RETAIL_MANAGEMENT}`],
    imageAlt: "Retail Management in Dimapur",
    description:
      "Learn the fundamentals of Retail Management, from customer service to inventory control. This beginner-friendly course offers hands-on projects to develop real-world management skills. By the end, you'll be ready to excel in retail operations and sales.",
    badge: <FinanceBadge />,
    href: slugs.RETAIL_MANAGEMENT
  },
];

let fourthLayerCourses = [
  {
    title: "Mobile App Development",
    imageUrl:
      IMAGE_LIST[`${slugs.MOBILE_APP_DEVELOPMENT}`],
    imageAlt: "Fullstack Development in Dimapur",
    description:
      "Learn the fundamentals of mobile app development using React Native, from basic UI components to advanced navigation. This beginner-friendly course offers hands-on projects to build real-world apps. By the end, you'll be ready to create your own mobile applications.",
    badge: <DevelopmentBadge />,
    href: slugs.MOBILE_APP_DEVELOPMENT
  },
  {
    title: "Certificate in Food Processing",
    imageUrl:
      IMAGE_LIST[`${slugs.FOOD_PROCESSING}`],
    imageAlt: "Food Processing in Dimapur",
    description:
      "Learn the fundamentals of food processing, from basic techniques to advanced preservation methods. This beginner-friendly course offers hands-on projects to develop practical skills. By the end, you'll be ready to apply your knowledge in real-world food processing environments.",
    badge: <SkillBadge />,
    href: slugs.FOOD_PROCESSING
  },

  {
    title: "Fullstack Web Development",
    imageUrl: IMAGE_LIST[`${slugs.FULLSTACK_WEB_DEVELOPMENT}`],
    imageAlt: "Fullstack Development in Dimapur",
    description:
      "Master end-to-end web application development with industry-relevant tech stack. Learn in-demand frontend frameworks like React, backend technologies including Node.js, and database management.",
    badge: <DevelopmentBadge />,
    href: slugs.FULLSTACK_WEB_DEVELOPMENT
  },

  {
    title: "Certificate in Advanced Excel",
    imageUrl: IMAGE_LIST[`${slugs.ADVANCED_EXCEL}`],
    imageAlt: "Advanced Excel in Dimapur",
    description:
      "Learn the fundamentals of Fullstack Development, from front-end design to back-end architecture. This beginner-friendly course offers hands-on projects to build real-world web applications. By the end, you'll be ready to create and deploy your own full-stack solutions.",
    badge: <SkillBadge />,
    href: slugs.ADVANCED_EXCEL
  },
  {
    title: "Certificate in Data Analytics",
    imageUrl: IMAGE_LIST[`${slugs.DATA_ANALYTICS}`],
    imageAlt: "Data Analytics in Dimapur",
    description:
      "Master in-demand data skills with Python, SQL, and visualization tools. Transform raw data into strategic insights through hands-on projects with real datasets.",
    badge: <DevelopmentBadge />,
    href: slugs.DATA_ANALYTICS
  },
  {
    title: "Certificate in Generative AI",
    imageUrl: IMAGE_LIST[`${slugs.GENERATIVE_AI}`],
    imageAlt: "Generative AI in Dimapur",
    description:
      "Master the future of artificial intelligence. Dive deep into generative models, transformer architectures, and ethical AI deployment.",
    badge: <TrendingBadge />,
    href: slugs.GENERATIVE_AI
  },
  {
    title: "Certificate in Agentic AI",
    imageUrl: IMAGE_LIST[`${slugs.AGENTIC_AI}`],
    imageAlt: "Agentic AI in Nagaland",
    description:
      "Master autonomous AI agents and enterprise workflows. Learn to build self-reasoning systems that use tools and execute complex business processes independently.",
    badge: <TrendingBadge />,
    href: slugs.AGENTIC_AI
  },
];

let fifthLayerCourses = [
  {
    title: "Post Graduate in Diploma in Computer Applications",
    imageUrl:
      IMAGE_LIST[`${slugs.PGDCA}`],
    imageAlt: "PGDCA in Dimapur",
    description:
      "Learn key concepts in computing, from basic programming to advanced software development. This beginner-friendly PGDCA course offers hands-on projects to build real-world IT skills. By the end, you'll be ready to excel in various tech roles.",
    badge: <SkillBadge />,
    href: slugs.PGDCA
  },
];

const CourseCard = ({
  title,
  description,
  badge,
  imageUrl,
  imageAlt,
  className,
  gridFix = true,
  href,
  comingSoon = false
}: ICourseCard) => (
  <div className={`${gridFix && "grid row-span-3"} overflow-hidden rounded-lg bg-white shadow ${className} hover:bg-[#fefefe] hover:duration-150 hover:ease-fast-in-slow-out hover:scale-[1.01]`}>
    <Link href={`courses/${href}`} >
      <div className="px-4 py-4 pt-8 font-normal text-3xl leading-tight sm:px-6">
        {badge}
        {comingSoon && <ComingSoonBadge />}
        <br />
        {title}
      </div>

      <div className="px-4 py-4 pb-0 font-light sm:px-6 sm:pb-0 line-clamp-2 md:line-clamp-3 lg:line-clamp-4">
        {description}
      </div>
      <div className="px-2 py-2 sm:px-2 mt-4">
        <Image
          className="rounded-md"
          width={800}
          height={800}
          alt={imageAlt}
          src={imageUrl}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
    </Link>
  </div>
);

function CourseSectionList() {
  return (
    <>
      <div className="grid grid-cols-1 grid-rows-[200px auto auto] gap-4 mt-12 lg:grid-cols-4">
        {firstLayerCourses.map((course) => (
          <CourseCard key={course.title} {...course} />
        ))}
      </div>

      <div className="grid grid-cols-1 grid-rows-[200px auto auto] gap-4 mt-12 lg:grid-cols-4">
        {secondLayerCourses.map((course) => (
          <CourseCard key={course.title} {...course} />
        ))}
      </div>

      <div className="grid grid-cols-1 gap-4 mt-12 lg:grid-cols-3">
        <div className="lg:col-start-1 lg:col-end-3 py-10 md:py-15 lg:py-20 px-6 md:px-8 lg:px-12 content-center bg-[#1B1C1E] rounded-xl">
          <article className="relative max-w-xl">
            <Image
              className="absolute right-0 size-80 lg:right-[-180px] lg:top-[-260px] opacity-[.3] -z-1"
              src="https://ik.imagekit.io/dxffek9yf/course-list-page/pattern2-white.png?updatedAt=1726167280960"
              width={800}
              height={800}
              alt="Design Hexagonal"
            />
            <div className="flex mb-auto leading-tight text-[#FAFAFA]">
              <a
                className="px-2 rounded-md text-sm font-mono uppercase tracking-wider underline"
                href="#"
              >
                Learn
              </a>{" "}
              /{" "}
              <span className="px-2 rounded-md text-sm font-mono uppercase tracking-wider ">
                Develop
              </span>
            </div>
            <h1 className="text-5xl tracking-tight text-[#FAFAFA] font-light mb-4">
              Learn how to build unique skill and experiences
            </h1>
            <p className="text-lg text-[#FAFAFA]">Grow your career for better goals</p>
          </article>
        </div>
        {fifthLayerCourses.map((course) => (
          <CourseCard
            key={course.title}
            gridFix={false}
            {...course}
            className="lg:col-start-3 lg:col-end-4"
          />
        ))}
      </div>

      <div className="grid grid-cols-1 grid-rows-[200px auto auto] gap-4 mt-12 lg:grid-cols-4">
        {thirdLayerCourses.map((course) => (
          <CourseCard key={course.title} {...course} />
        ))}
      </div>

      <SideBySideCard />

      <div className="grid grid-cols-1 grid-rows-[200px auto auto] gap-4 mt-12 lg:grid-cols-4">
        {fourthLayerCourses.map((course) => (
          <CourseCard key={course.title} {...course} />
        ))}
      </div>
    </>
  );
}

export default CourseSectionList;
