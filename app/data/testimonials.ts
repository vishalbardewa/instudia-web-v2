export interface Testimonial {
  id: string;
  name: string;
  image: string;
  beforeCourse: string;
  afterCourse: string;
  company: string;
  quote: string;
  linkedin: string;
}

export const TESTIMONIALS: Testimonial[] = [
  {
    id: "t1",
    name: "Atozo Y.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1974&auto=format&fit=crop",
    beforeCourse: "Recent Graduate",
    afterCourse: "Frontend Developer",
    company: "TechSolutions Dimapur",
    quote: "Instudia's hands-on approach completely changed how I learn. I went from struggling with basic HTML to building full React applications. The mentorship was invaluable.",
    linkedin: "https://linkedin.com/#mock-atozo",
  },
  {
    id: "t2",
    name: "Kenei M.",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1974&auto=format&fit=crop",
    beforeCourse: "Freelance Photographer",
    afterCourse: "UI/UX Designer",
    company: "Creative Studio Kohima",
    quote: "Transitioning into tech seemed daunting, but the UI/UX course was structured perfectly. I now design interfaces that are not just beautiful, but highly functional.",
    linkedin: "https://linkedin.com/#mock-kenei",
  },
  {
    id: "t3",
    name: "Imti L.",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1974&auto=format&fit=crop",
    beforeCourse: "High School Student",
    afterCourse: "Junior Web Developer",
    company: "Freelance",
    quote: "I took the Fullstack course during my gap year. The practical projects fast-tracked my progress, and I landed my first freelance gig before the course even ended!",
    linkedin: "https://linkedin.com/#mock-imti",
  },
  {
    id: "t4",
    name: "Vilu N.",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1976&auto=format&fit=crop",
    beforeCourse: "Retail Manager",
    afterCourse: "Data Analyst",
    company: "Remote (National)",
    quote: "Learning Data Analytics gave me a completely new career path. Instudia taught me how to find the stories hidden inside raw data, and I now work remotely for a firm in Bangalore.",
    linkedin: "https://linkedin.com/#mock-vilu",
  },
  {
    id: "t5",
    name: "Sungjem A.",
    image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=1974&auto=format&fit=crop",
    beforeCourse: "Self-taught Artist",
    afterCourse: "Graphic Designer",
    company: "Brand Agency",
    quote: "I always loved drawing, but Instudia taught me the industry-standard software (Photoshop/Illustrator) and design theory. Now I do branding for local startups.",
    linkedin: "https://linkedin.com/#mock-sungjem",
  },
  {
    id: "t6",
    name: "Lydia C.",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=1961&auto=format&fit=crop",
    beforeCourse: "B.Com Student",
    afterCourse: "Digital Marketer",
    company: "E-commerce Brand",
    quote: "The digital marketing strategies we practiced on real campaigns gave me the confidence to handle the online presence of a fast-growing retail business.",
    linkedin: "https://linkedin.com/#mock-lydia",
  }
];
