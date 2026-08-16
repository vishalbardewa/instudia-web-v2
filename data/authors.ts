export interface Author {
  name: string;
  role: string;
  credentials?: string;
  bio?: string;
  avatarUrl?: string;
  sameAs?: string[];
  expertise?: string[];
  isOrganization?: boolean;
}

export const authors: Record<string, Author> = {
  'daniel-changkija': {
    name: 'Daniel Changkija',
    role: 'Director & Lead Instructor',
    credentials: '',
    bio: "Visionary leader driving instudia's mission to bridge the tech skills gap in Nagaland.",
    avatarUrl: 'https://ik.imagekit.io/dxffek9yf/blogman/authors/new-logo-with-white-bg.png',
    sameAs: ['https://www.linkedin.com/in/instudia'],
    expertise: ['Python Programming', 'Software Engineering', 'IT Career Mentorship'],
  },
  'vishal-bardewa': {
    name: 'Vishal Bardewa',
    role: 'Technical Advisor & Fullstack Engineer',
    credentials: '',
    bio: "Full-stack developer and technical advisor powering instudia's digital infrastructure.",
    avatarUrl: 'https://ik.imagekit.io/dxffek9yf/blogman/authors/new-logo-with-white-bg.png',
    sameAs: ['https://www.linkedin.com/in/vishalbardewa'],
    expertise: ['Fullstack Web Development', 'Next.js', 'System Design'],
  },
  'niutoli-v': {
    name: 'Niutoli V',
    role: 'Accounting & Finance Faculty',
    credentials: '',
    bio: 'Dedicated faculty member specializing in Tally, GST, and business accounting fundamentals.',
    avatarUrl: 'https://ik.imagekit.io/dxffek9yf/blogman/authors/new-logo-with-white-bg.png',
    sameAs: [],
    expertise: ['Tally', 'GST', 'Business Accounting'],
  },
  'kivigho-kinimi': {
    name: 'Kivigho Kinimi',
    role: 'Design & Creative Instructor',
    credentials: '',
    bio: '',
    avatarUrl: 'https://ik.imagekit.io/dxffek9yf/blogman/authors/new-logo-with-white-bg.png',
    sameAs: [],
    expertise: ['Graphic Design', 'UI/UX Design', 'Visual Branding'],
  },
  'anguka-n-ayemi': {
    name: 'Anguka N Ayemi',
    role: 'Marketing Associate',
    credentials: '',
    bio: "Marketing associate driving instudia's mission to bridge the tech skills gap in Nagaland.",
    avatarUrl: 'https://ik.imagekit.io/dxffek9yf/blogman/authors/new-logo-with-white-bg.png',
    sameAs: ['https://www.linkedin.com/in/anguka-ayemi-5533353b1/'],
    expertise: ['Digital Marketing', 'Content Strategy'],
  },
  'marzulu': {
    name: 'Marzulu Jamir',
    role: 'Technical Instructor',
    credentials: '',
    bio: '',
    avatarUrl: 'https://ik.imagekit.io/dxffek9yf/blogman/authors/new-logo-with-white-bg.png',
    sameAs: [],
    expertise: ['Computer Fundamentals', 'Networking'],
  },
  'instudia-team': {
    name: 'instudia Editorial Team',
    role: 'Academic & Career Team',
    credentials: 'ISO Certified Skill Institute',
    bio: 'Official articles and curriculum guides prepared by instudia faculty and industry mentors in Dimapur.',
    avatarUrl: 'https://ik.imagekit.io/dxffek9yf/blogman/authors/new-logo-with-white-bg.png',
    sameAs: ['https://www.instudianagaland.com'],
    expertise: ['Skill Training', 'Tech Education', 'Nagaland Career Guidance'],
    isOrganization: true,
  },
};

export function getAuthorBySlug(slug?: string): Author {
  if (slug && authors[slug]) {
    return authors[slug];
  }
  return authors['instudia-team'];
}
