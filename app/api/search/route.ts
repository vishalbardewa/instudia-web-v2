import { loadAllPosts } from "@/app/data/parsePost";
import { NextRequest, NextResponse } from "next/server";

// Static course data for search
const COURSES = [
  { title: "Diploma in Computer Applications (DCA)", href: "/courses/diploma-in-computer-applications", type: "Course" },
  { title: "PGDCA", href: "/courses/pgdca", type: "Course" },
  { title: "Tally with GST", href: "/courses/gst", type: "Course" },
  { title: "Advanced Excel", href: "/courses/advanced-excel", type: "Course" },
  { title: "Python Programming", href: "/courses/python", type: "Course" },
  { title: "UI/UX Designing", href: "/courses/ui-ux-designing", type: "Course" },
  { title: "Frontend Development", href: "/courses/frontend-development", type: "Course" },
  { title: "Backend Development", href: "/courses/backend-development", type: "Course" },
  { title: "Fullstack Web Development", href: "/courses/fullstack-web-development", type: "Course" },
  { title: "Mobile App Development", href: "/courses/mobile-app-development", type: "Course" },
  { title: "Business Intelligence using PowerBI", href: "/courses/buisness-intelligence-using-powerbi", type: "Course" },
  { title: "DevOps & Cloud Services", href: "/courses/learn-devops-cloud-services", type: "Course" },
  { title: "Project Management", href: "/courses/learn-project-management", type: "Course" },
  { title: "Hardware & Networking", href: "/courses/hardware-networking", type: "Course" },
  { title: "Retail Management", href: "/courses/retail-management", type: "Course" },
  { title: "Generative AI", href: "/courses/generative-ai", type: "Course" },
  { title: "Data Analytics", href: "/courses/data-analytics", type: "Course" },
  { title: "Graphic Designing", href: "/courses/graphic-designing", type: "Course" },
];

export async function GET(req: NextRequest) {
  const q = req.nextUrl.searchParams.get("q")?.toLowerCase().trim() ?? "";

  if (!q || q.length < 2) {
    return NextResponse.json({ results: [] });
  }

  // Search blog posts
  const posts = loadAllPosts();
  const postResults = posts
    .filter(
      (p) =>
        p.title.toLowerCase().includes(q) ||
        p.excerpt.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.author.toLowerCase().includes(q)
    )
    .slice(0, 5)
    .map((p) => ({
      title: p.title,
      excerpt: p.excerpt,
      href: `/blog/${p.slug}`,
      type: "Blog",
      category: p.category,
    }));

  // Search courses
  const courseResults = COURSES.filter((c) =>
    c.title.toLowerCase().includes(q)
  ).slice(0, 5);

  return NextResponse.json({
    results: [...courseResults, ...postResults],
  });
}
