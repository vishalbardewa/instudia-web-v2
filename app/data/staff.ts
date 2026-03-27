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
      "https://images.unsplash.com/photo-1656338997878-279d71d48f6e?q=80&w=400&auto=format&fit=crop",
    bio: "Visionary leader driving instudia's mission to bridge the tech skills gap in Nagaland.",
    linkedin: "https://www.linkedin.com/in/instudia",
  },
  {
    slug: "kivigho-kinimi",
    name: "Kivigho Kinimi",
    designation: "IT Faculty",
    department: "Academics",
    phone: "+91 8798-587-779",
    email: "instudia.nagaland@gmail.com",
    photo:
      "https://images.unsplash.com/photo-1656337789708-cdf37b07112d?q=80&w=400&auto=format&fit=crop",
    bio: "Expert IT instructor passionate about empowering students with job-ready programming skills.",
  },
  {
    slug: "niutoli-v",
    name: "Niutoli V",
    designation: "Accounting Faculty",
    department: "Academics",
    phone: "+91 8798-587-779",
    email: "instudia.nagaland@gmail.com",
    photo:
      "https://images.unsplash.com/photo-1678733527538-845ebdc2f6b8?q=80&w=400&auto=format&fit=crop",
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
      "https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=400&auto=format&fit=crop",
    bio: "Full-stack developer and technical advisor powering instudia's digital infrastructure.",
    linkedin: "https://www.linkedin.com/in/vishalbardewa",
  },
];

export function getStaffBySlug(slug: string): StaffMember | undefined {
  return staff.find((s) => s.slug === slug);
}
