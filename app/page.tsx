import Link from "next/link";
import LandingTop from "./components/organisms/LandingTop";
import Stats, { defaultStats } from "./components/molecules/Stats";
import Incentives from "./components/molecules/Incentives";
import TestimonialWithStats from "./components/molecules/TestimonialWithStats";
import ScrollingLogos from "./components/organisms/ScrollingLogos";
import FeatureWithColumns from "./components/molecules/FeatureWithThreeCoulmns";
import TestimonialGrid from "./components/organisms/TestimonialGrid";
import BlogCarousel from "./components/organisms/BlogCarousel";
import CaseStudiesSection, { CaseStudyItem } from "./components/organisms/CaseStudiesSection";
import CourseHighlightSection from "./components/organisms/CourseHighlightSection";
import AdmissionsCtaBanner from "./components/organisms/AdmissionsCtaBanner";
import { posts } from "./data/posts";
import { buildMetadata } from "@/lib/metadata";

const stats = defaultStats;

export const metadata = buildMetadata({
  title: "Best Computer Courses in Dimapur, Nagaland",
  description:
    "Master Programming, Web Development, Graphic Design & Digital Skills in Dimapur. Top computer courses like DCA, Tally & GST. Boost your career. Enroll now!",
  path: "/",
  image: "https://res.cloudinary.com/dhwg77gwm/image/upload/f_auto,q_auto/v1/instudia/tqo7qzztc4duzktj0jt9",
  imageAlt: "Upskill with instudia",
});

const caseStudies: CaseStudyItem[] = [
  {
    id: "unlock-opportunities",
    logo: "https://ik.imagekit.io/dxffek9yf/website-workshop-instudia/logo-assets/unlock.svg?updatedAt=1729061047829",
    client: "Unlock New Opportunities",
    date: "001",
    title: "Unlock New Opportunities",
    description:
      "Upskilling equips you with the in-demand skills to thrive in today’s dynamic job market. Whether you're a student, professional, or looking for a career change, the right skills can open doors to exciting, future-ready opportunities.",
    href: "/courses",
    accentBorder: "hover:border-brightyellow hover:shadow-lg",
  },
  {
    id: "empower-career",
    logo: "https://ik.imagekit.io/dxffek9yf/website-workshop-instudia/logo-assets/medal.svg?updatedAt=1729061595377",
    client: "Empower Your Career",
    date: "002",
    title: "Empower Your Career",
    description:
      "Industries are changing faster than ever, and the demand for new skills is at an all-time high. Our tailored courses help you stay ahead of the curve, ensuring you remain competitive and adaptable as your career progresses.",
    href: "/services",
    accentBorder: "hover:border-brandpurple hover:shadow-lg",
  },
  {
    id: "bridge-skills-gap",
    logo: "https://ik.imagekit.io/dxffek9yf/website-workshop-instudia/logo-assets/announcement.svg?updatedAt=1729060940757",
    client: "Bridge the Skills Gap",
    date: "003",
    title: "Bridge the Skills Gap",
    description:
      "The skills gap is real, but it doesn’t have to hold you back. By upskilling with Instudia, you can close that gap and meet the demands of today’s industries. Prepare for a future where you not only meet expectations but exceed them.",
    href: "/about",
    accentBorder: "hover:border-flourescent hover:shadow-lg",
  },
];

export default function Page() {
  return (
    <main className="w-full flex min-h-screen flex-col justify-between">
      <LandingTop />
      <TestimonialWithStats />
      <ScrollingLogos />

      <Stats stats={stats} />

      <Incentives />
      <FeatureWithColumns />

      <TestimonialGrid />

      <CourseHighlightSection />

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

      <CaseStudiesSection caseStudies={caseStudies} />

      {/* Peak-End Milestone: Final High-Impact Conversion Band */}
      <AdmissionsCtaBanner />
    </main>
  );
}
