import Image from "next/image";
import React from "react";
import {
  BasicBadge,
  DesignBadge,
  DevelopmentBadge,
  FinanceBadge,
  SkillBadge,
} from "../atom/Badge";
import { title } from "process";
import SideBySideCard from "./SideBySideCard";
import { routes, slugs } from "@/app/routes";
import Link from "next/link";

interface ICourseCard {
  title: string;
  description: string;
  badge: React.ReactNode;
  imageUrl: string;
  imageAlt: string;
  className?: string;
  gridFix?: boolean;
  href?: string;
}

let firstLayerCourses = [
  {
    title: "Programming with Python",
    imageUrl:
      "https://ik.imagekit.io/dxffek9yf/course-list-page/python.png?updatedAt=1726135539337",
    imageAlt: "Python Programming in Dimapur",
    description:
      "Learn the fundamentals of Python, from basic syntax to object-oriented programming. This beginner-friendly course offers hands-on projects to develop real-world coding skills. By the end, you'll be ready to build your own applications.",
    badge: <DevelopmentBadge />,
    href: slugs.PYTHON1
  },
  {
    title: "Accounting in Tally wih GST",
    imageUrl:
      "https://ik.imagekit.io/dxffek9yf/course-list-page/tally.png?updatedAt=1726135539366",
    imageAlt: "Tally with GST in Dimapur",
    description:
      "Learn the fundamentals of Tally, from basic accounting to GST compliance. This beginner-friendly course offers hands-on projects to develop real-world accounting skills. By the end, you'll be ready to manage GST-compliant financials.",
    badge: <FinanceBadge />,
    href: slugs.GST
  },

  {
    title: "Frontend Development",
    imageUrl:
      "https://ik.imagekit.io/dxffek9yf/course-list-page/frontend.png?updatedAt=1726135539217",
    imageAlt: "Tally with GST in Dimapur",
    description:
      "Learn the fundamentals of frontend development, from HTML, CSS to JavaScript and responsive design. This beginner-friendly course offers hands-on projects to develop real-world web design skills. Build your own websites.",
    badge: <DevelopmentBadge />,
  },

  {
    title: "Backend Development",
    imageUrl:
      "https://ik.imagekit.io/dxffek9yf/course-list-page/backend.png?updatedAt=1726135539480",
    imageAlt: "Tally with GST in Dimapur",
    description:
      "Learn the fundamentals of backend development, from server-side scripting to database management. This beginner-friendly course offers hands-on projects to build real-world APIs. Ready to develop and manage backend systems.",
    badge: <DevelopmentBadge />,
    href: slugs.FRONTEND
  },
];

let secondLayerCourses = [
  {
    title: "Certificate in UI/UX Design",
    imageUrl:
      "https://ik.imagekit.io/dxffek9yf/course-list-page/uiux-design.png?updatedAt=1726138195858",
    imageAlt: "UI/UX Design in Dimapur",
    description:
      "Learn the fundamentals of UI/UX design, from user research to prototyping and testing. This beginner-friendly course offers hands-on projects to develop real-world design skills. By the end, you'll be ready to create user-centered digital experiences.",
    badge: <DesignBadge />,
    href: slugs.FRONTEND
  },
  {
    title: "Certificate in Graphic Design",
    imageUrl:
      "https://ik.imagekit.io/dxffek9yf/course-list-page/graphic-design.png?updatedAt=1726138195936",
    imageAlt: "Graphic Design in Dimapur",
    description:
      "Learn the fundamentals of graphic design, from basic principles to advanced techniques. This beginner-friendly course offers hands-on projects to develop real-world design skills. By the end, you'll be ready to create your own professional designs.",
    badge: <DesignBadge />,
    href: slugs.FRONTEND
  },

  {
    title: "Certificate in Devops",
    imageUrl:
      "https://ik.imagekit.io/dxffek9yf/course-list-page/devops.png?updatedAt=1726138195852",
    imageAlt: "Devops in Dimapur",
    description:
      "Learn the fundamentals of DevOps, from basic concepts to continuous integration and deployment. This beginner-friendly course offers hands-on projects to develop real-world automation skills. By the end, you'll be ready to streamline application development and operations.",
    badge: <DevelopmentBadge />,
    href: slugs.FRONTEND
  },

  {
    title: "Certificate in PowerBI",
    imageUrl:
      "https://ik.imagekit.io/dxffek9yf/course-list-page/powerbi.png?updatedAt=1726138195839",
    imageAlt: "PowerBI in Dimapur",
    description:
      "Learn the fundamentals of Power BI, from data visualization to advanced analytics. This beginner-friendly course offers hands-on projects to develop real-world data analysis skills. By the end, you'll be ready to create your own interactive reports and dashboards.",
    badge: <FinanceBadge />,
    href: slugs.ADCA
  },
];

let thirdLayerCourses = [
  {
    title: "Certificate in Hardware and Networking",
    imageUrl:
      "https://ik.imagekit.io/dxffek9yf/course-list-page/hardware-networking.png?updatedAt=1726165860073",
    imageAlt: "Hardware and Networking in Dimapur",
    description:
      "Learn the fundamentals of computer hardware and networking, from assembling PCs to configuring networks. This beginner-friendly course offers hands-on projects to develop real-world technical skills. By the end, you'll be ready to manage and troubleshoot networks efficiently.",
    badge: <DevelopmentBadge />,
    href: slugs.PCA
  },
  {
    title: "Certificate in Project Management",
    imageUrl:
      "https://ik.imagekit.io/dxffek9yf/course-list-page/project-management.png?updatedAt=1726165860318",
    imageAlt: "Project Management in Dimapur",
    description:
      "Learn the fundamentals of project management, from planning and scheduling to risk management and execution. This beginner-friendly course offers hands-on projects to develop real-world management skills. By the end, you'll be ready to manage your own projects.",
    badge: <DesignBadge />,
    href: slugs.FRONTEND
  },

  {
    title: "Diploma in Computer Applications",
    imageUrl:
      "https://ik.imagekit.io/dxffek9yf/course-list-page/dca.png?updatedAt=1726165860101",
    imageAlt: "DCA in Dimapur",
    description:
      "Learn the fundamentals of computer applications, from basic software tools to advanced data management. This beginner-friendly course offers hands-on projects to develop real-world tech skills. By the end, you'll be ready to handle various IT tasks efficiently.",
    badge: <SkillBadge />,
    href: slugs.DCA
  },

  {
    title: "Certificate in Retail Management",
    imageUrl:
      "https://ik.imagekit.io/dxffek9yf/course-list-page/retail.png?updatedAt=1726165860169",
    imageAlt: "Retail Management in Dimapur",
    description:
      "Learn the fundamentals of Retail Management, from customer service to inventory control. This beginner-friendly course offers hands-on projects to develop real-world management skills. By the end, you'll be ready to excel in retail operations and sales.",
    badge: <FinanceBadge />,
    href: slugs.ADCA
  },
];

let fourthLayerCourses = [
  {
    title: "Mobile App Development",
    imageUrl:
      "https://ik.imagekit.io/dxffek9yf/course-list-page/uiux-design.png?updatedAt=1726138195858",
    imageAlt: "Fullstack Development in Dimapur",
    description:
      "Learn the fundamentals of mobile app development using React Native, from basic UI components to advanced navigation. This beginner-friendly course offers hands-on projects to build real-world apps. By the end, you'll be ready to create your own mobile applications.",
    badge: <DevelopmentBadge />,
  },
  {
    title: "Certificate in Food Processing",
    imageUrl:
      "https://ik.imagekit.io/dxffek9yf/course-list-page/graphic-design.png?updatedAt=1726138195936",
    imageAlt: "Food Processing in Dimapur",
    description:
      "Learn the fundamentals of food processing, from basic techniques to advanced preservation methods. This beginner-friendly course offers hands-on projects to develop practical skills. By the end, you'll be ready to apply your knowledge in real-world food processing environments.",
    badge: <SkillBadge />,
    href: slugs.FRONTEND
  },

  {
    title: "Fullstack Development",
    imageUrl:
      "https://ik.imagekit.io/dxffek9yf/course-list-page/uiux-design.png?updatedAt=1726138195858",
    imageAlt: "Fullstack Development in Dimapur",
    description:
      "Learn the fundamentals of UI/UX design, from user research to prototyping and testing. This beginner-friendly course offers hands-on projects to develop real-world design skills. By the end, you'll be ready to create user-centered digital experiences.",
    badge: <DevelopmentBadge />,
    href: slugs.FRONTEND
  },

  {
    title: "Certificate in Advanced Excel",
    imageUrl:
      "https://ik.imagekit.io/dxffek9yf/course-list-page/devops.png?updatedAt=1726138195852",
    imageAlt: "Advanced Excel in Dimapur",
    description:
      "Learn the fundamentals of Fullstack Development, from front-end design to back-end architecture. This beginner-friendly course offers hands-on projects to build real-world web applications. By the end, you'll be ready to create and deploy your own full-stack solutions.",
    badge: <BasicBadge />,
    href: slugs.ADVANCED_EXCEL
  },
];

let fifthLayerCourses = [
  {
    title: "Post Graduate in Diploma in Computer Applications",
    imageUrl:
      "https://ik.imagekit.io/dxffek9yf/course-list-page/pgdca.png?updatedAt=1726167281469",
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
  href
}: ICourseCard) => (
  <div className={`${gridFix   && "grid row-span-3 grid-rows-subgrid"} overflow-hidden rounded-lg bg-white shadow ${className} hover:bg-[#fefefe] hover:duration-150 hover:ease-fast-in-slow-out hover:scale-[1.01]`}>
    <Link href={`courses/${href}`} >
    <div className="px-4 py-4 pt-8 font-normal text-3xl leading-tight sm:px-6">
      {badge}
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
          <CourseCard key={title} {...course} />
        ))}
      </div>

      <div className="grid grid-cols-1 grid-rows-[200px auto auto] gap-4 mt-12 lg:grid-cols-4">
        {secondLayerCourses.map((course) => (
          <CourseCard key={title} {...course} />
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
            key={title}
            gridFix={false}
            {...course}
            className="lg:col-start-3 lg:col-end-4"
          />
        ))}
      </div>

      <div className="grid grid-cols-1 grid-rows-[200px auto auto] gap-4 mt-12 lg:grid-cols-4">
        {thirdLayerCourses.map((course) => (
          <CourseCard key={title} {...course} />
        ))}
      </div>

      <SideBySideCard />

      <div className="grid grid-cols-1 grid-rows-[200px auto auto] gap-4 mt-12 lg:grid-cols-4">
        {fourthLayerCourses.map((course) => (
          <CourseCard key={title} {...course} />
        ))}
      </div>
    </>
  );
}

export default CourseSectionList;
