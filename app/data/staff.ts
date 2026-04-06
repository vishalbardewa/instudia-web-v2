export interface StaffMember {
  slug: string;
  name: string;
  designation: string;
  department: string;
  phone: string;
  email: string;
  photo?: string;
  bio?: string;
  linkedin?: string;
  instagram?: string;
}

export const staff: StaffMember[] = [
  {
    slug: "daniel-changkija",
    name: "Daniel Changkija",
    designation: "Director",
    department: "Management",
    phone: "+91 8798-587-779",
    email: "instudia.nagaland@gmail.com",
    photo:
      "https://ik.imagekit.io/dxffek9yf/blogman/authors/new-logo-with-white-bg.png?updatedAt=1775053172327&tr=cm-extract,w-0.7,h-0.7",
    bio: "Visionary leader driving instudia's mission to bridge the tech skills gap in Nagaland.",
    linkedin: "https://www.linkedin.com/in/instudia",
  },
  {
    slug: "niutoli-v",
    name: "Niutoli V",
    designation: "Accounting Faculty",
    department: "Academics",
    phone: "+91 8798-587-779",
    email: "instudia.nagaland@gmail.com",
    photo:
      "https://ik.imagekit.io/dxffek9yf/blogman/authors/new-logo-with-white-bg.png?updatedAt=1775053172327&tr=cm-extract,w-0.7,h-0.7",
    bio: "Dedicated faculty member specializing in Tally, GST, and business accounting fundamentals.",
  },
  {
    slug: "vishal-bardewa",
    name: "Vishal Bardewa",
    designation: "Technical Advisor",
    department: "Technology",
    phone: "+91 9233-606-322",
    email: "instudianagaland@gmail.com",
    photo:
      "https://ik.imagekit.io/dxffek9yf/blogman/authors/new-logo-with-white-bg.png?updatedAt=1775053172327&tr=cm-extract,w-0.7,h-0.7",
    bio: "Full-stack developer and technical advisor powering instudia's digital infrastructure.",
    linkedin: "https://www.linkedin.com/in/vishalbardewa",
  },
];

export function getStaffBySlug(slug: string): StaffMember | undefined {
  return staff.find((s) => s.slug === slug);
}
