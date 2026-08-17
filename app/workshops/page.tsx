import { Metadata } from "next";
import Script from "next/script";
import WorkshopPhotoGrid from "./WorkshopPhotoGrid";
import WorkshopNav, { YearGroup } from "./WorkshopNav";

export const metadata: Metadata = {
  title: "Workshops & Events | Skill Programs",
  description:
    "Explore skill development workshops, job fairs, AI seminars and community programs conducted by instudia in Dimapur and Nagaland.",
  alternates: { canonical: "/workshops" },
};

const tagColors: Record<string, string> = {
  Upcoming: "bg-[#FFE01B] text-black font-black border border-black",
  Workshop: "bg-brandpurple/10 text-brandpurple",
  Seminar: "bg-brandpurple text-white font-bold",
  AI: "bg-flourescent/15 text-[#1B1C1E]",
  "Agentic AI": "bg-brandpurple text-white font-bold",
  "Skill Program": "bg-brightyellow/20 text-[#1B1C1E]",
  "School Outreach": "bg-[#C5F442]/30 text-[#1E1B2E] font-semibold border border-black/10",
  "Higher Education": "bg-brandpurple/15 text-[#1E1B2E] font-semibold border border-brandpurple/20",
  "Commerce & Arts": "bg-[#FF7A59]/15 text-[#1E1B2E] font-semibold",
  Education: "bg-brandpurple/10 text-brandpurple",
  DABA: "bg-brandpurple/10 text-brandpurple",
  MSME: "bg-redhue/10 text-redhue",
  "Job Fair": "bg-brightyellow/20 text-[#1B1C1E]",
  "Career Guidance": "bg-flourescent/15 text-[#1B1C1E]",
};

export interface WorkshopItem {
  title: string;
  subtitle?: string;
  date: string;
  year: string;
  tags: string[];
  description: string;
  highlights: string;
  newsLink?: {
    url: string;
    source: string;
  };
  photos: {
    src: string;
    caption: string;
    wide?: boolean;
  }[];
}

const workshops: WorkshopItem[] = [
  // --- 2026 ---
  {
    title: "Seminar on AI in Education Sector at MGM College",
    subtitle: "at MGM College, Dimapur — Featured in Eastern Mirror",
    date: "July 4th, 2026",
    year: "2026",
    tags: ["Seminar", "AI", "Higher Education"],
    description:
      "MGM College, Dimapur, in collaboration with Instudia, hosted a one-day seminar titled 'Artificial Intelligence in the Education Sector: AI Literacy for the Next Generation' at the college auditorium, bringing together students and educators to explore responsible AI adoption in academic settings.",
    highlights:
      "Aligned with NEP 2020 guidelines, Instudia Director Daniel Changkija and Technical Advisor Vishal Bardewa conducted sessions on using AI as a study companion for concept summarization, flashcard creation, revision notes, and research prompting while maintaining critical thinking.",
    newsLink: {
      url: "https://www.easternmirrornagaland.com/mgm-college-dimapur-hosts-seminar-on-ai-in-education-sector",
      source: "Eastern Mirror",
    },
    photos: [
      {
        src: "https://easternmirror-assets.s3.ap-south-1.amazonaws.com/images/2026/07/MGM%20College%20hosts%20seminar%20on%20AI%20in%20education%20sector%20copy-1783178428647.jpg",
        caption: "MGM College Dimapur faculty and students attending the AI in education seminar",
        wide: true,
      },
      {
        src: "https://ik.imagekit.io/oytjocebw/seminars/mgm/director-at-mgm-college.jpeg",
        caption: "Director Daniel Changkija interacting with students at MGM College",
      },
      {
        src: "https://ik.imagekit.io/oytjocebw/seminars/mgm/director-at-mgm-college-podium.jpeg",
        caption: "Addressing the seminar on NEP 2020 and AI competencies",
      },
      {
        src: "https://ik.imagekit.io/oytjocebw/seminars/mgm/WhatsApp%20Image%202026-08-16%20at%2002.44.06.jpeg",
        caption: "Participants and faculty during the AI literacy session",
        wide: true,
      },
    ],
  },
  {
    title: "Seminar on AI for Productivity at Immanuel College",
    subtitle: "at Immanuel College, Dimapur — Featured in Nagaland Tribune",
    date: "June 20th, 2026",
    year: "2026",
    tags: ["Seminar", "AI", "Higher Education"],
    description:
      "With Artificial Intelligence rapidly transforming modern workflows, Instudia, in collaboration with Immanuel College in Dimapur, hosted a high-impact seminar on 'AI for Productivity' on June 20, exploring how technology can optimize efficiency and enhance both academic and professional output.",
    highlights:
      "Director Daniel Changkija emphasized digital fluency and global competitiveness from Dimapur. Technical resource person Vishal Bardewa demonstrated practical applications of AI tools to automate repetitive tasks and serve as a catalyst to boost human capability.",
    newsLink: {
      url: "https://nagalandtribune.in/seminar-on-artificial-intelligence-held-at-immanuel-college/",
      source: "Nagaland Tribune",
    },
    photos: [
      {
        src: "https://nagalandtribune.in/wp-content/uploads/2026/06/Seminar-on-Artificial-Intelligence-held-at-Immanuel-College.png",
        caption: "Instudia resource persons and Immanuel College participants during the AI productivity seminar",
        wide: true,
      },
      {
        src: "https://ik.imagekit.io/oytjocebw/seminars/immanuel/student-in-seminar-long.jpeg",
        caption: "Students listening to the presentation at Immanuel College",
      },
      {
        src: "https://ik.imagekit.io/oytjocebw/seminars/immanuel/seminar-day.jpeg",
        caption: "Seminar hall in session during the AI productivity discussion",
      },
      {
        src: "https://ik.imagekit.io/oytjocebw/seminars/immanuel/student-in-seminar.jpeg",
        caption: "Interactive hands-on session with students",
        wide: true,
      },
    ],
  },
  {
    title: "Seminar on AI Integration & Digital Productivity at Spring Blossoms Academy",
    subtitle: "at Spring Blossoms Academy, Dimapur",
    date: "June 15th, 2026",
    year: "2026",
    tags: ["Seminar", "AI", "School Outreach"],
    description:
      "Instudia conducted an engaging seminar on Artificial Intelligence at Spring Blossoms Academy, Dimapur, introducing students and faculty to modern AI tools, prompt engineering, and intelligent study workflows. The session aimed to demystify AI technology, showing participants how to turn smart tools into personalized academic assistants.",
    highlights:
      "Director Daniel Changkija highlighted the importance of early digital literacy and shifting from passive tech consumers to active builders. Technical resource person Vishal Bardewa demonstrated practical applications of AI for research filtering, note structuring, and critical problem solving.",
    photos: [
      {
        src: "https://ik.imagekit.io/oytjocebw/seminars/spring-blossoms-academy/audience-spring-blossoms.jpeg",
        caption: "Students and faculty at Spring Blossoms Academy attending the AI seminar",
        wide: true,
      },
      {
        src: "https://ik.imagekit.io/oytjocebw/seminars/spring-blossoms-academy/director-address-2.jpeg",
        caption: "Interactive discussion on future technologies and careers",
      },
      {
        src: "https://ik.imagekit.io/oytjocebw/seminars/spring-blossoms-academy/resource-person.jpeg",
        caption: "Technical resource person Vishal Bardewa demonstrating AI study tools",
      },
      {
        src: "https://ik.imagekit.io/oytjocebw/seminars/spring-blossoms-academy/director-address.jpeg",
        caption: "Director Daniel Changkija addressing the students on AI competencies",
        wide: true,
      },
    ],
  },
  {
    title: "Instudia Hosts AI Seminar at Beanstalk School",
    subtitle: "at Beanstalk School, Dimapur — Featured in Nagaland Tribune",
    date: "June 12th, 2026",
    year: "2026",
    tags: ["Seminar", "AI", "School Outreach"],
    description:
      "Students at Beanstalk School, Dimapur, took a major step into the future of technology on June 12 during an interactive seminar on Artificial Intelligence conducted by instudia. The workshop was designed to demystify AI, showing participants exactly how to transform smart tools into personal study assistants for better learning outcomes and massive productivity gains.",
    highlights:
      "Director Daniel Changkija encouraged young students to transition from passive consumers to active builders and innovators. Technical resource person Vishal Bardewa demonstrated how AI upgrades personal learning toolkits for research filtering, organization, and creative problem solving.",
    newsLink: {
      url: "https://nagalandtribune.in/instudia-hosts-ai-seminar-at-beanstalk-school/",
      source: "Nagaland Tribune",
    },
    photos: [
      {
        src: "https://nagalandtribune.in/wp-content/uploads/2026/06/Instudia-hosts-AI-seminar-at-Beanstalk-School.png",
        caption: "Instudia team conducting the interactive AI seminar at Beanstalk School, Dimapur",
        wide: true,
      },
      {
        src: "https://ik.imagekit.io/oytjocebw/seminars/beanstalk/resource-person-ai-3.jpeg",
        caption: "Interactive prompt engineering session with students",
      },
      {
        src: "https://ik.imagekit.io/oytjocebw/seminars/beanstalk/resource-person-ai-2.jpeg",
        caption: "Demonstrating AI tools for personalized study assistance",
      },
      {
        src: "https://ik.imagekit.io/oytjocebw/seminars/beanstalk/resource-person-ai.jpeg",
        caption: "Technical resource person guiding students through AI workflows",
        wide: true,
      },
    ],
  },
  {
    title: "Seminar on Efficient Use of AI at Lewis Academy",
    subtitle: "at Lewis Academy, Dimapur — Featured in Nagaland Post",
    date: "June 6th, 2026",
    year: "2026",
    tags: ["Seminar", "AI", "School Outreach"],
    description:
      "Lewis Academy, Dimapur, in collaboration with Instudia, hosted a seminar on AI integration on June 6, bringing together students and faculty to explore how emerging technologies can be harnessed for academic excellence and future-ready skill development.",
    highlights:
      "Instudia director Daniel Changkija stressed the urgency of technological literacy and equipping youth with high-demand skills for an automated world. Technical and interactive sessions were led by Vishal Bardewa on using AI for impactful learning.",
    newsLink: {
      url: "https://nagalandpost.com/seminar-on-efficient-use-of-ai/",
      source: "Nagaland Post",
    },
    photos: [
      {
        src: "https://ik.imagekit.io/oytjocebw/seminars/lewis-academy/lewis-academy-group-shot.jpeg",
        caption: "Group photo with faculty and students at Lewis Academy, Dimapur",
        wide: true,
      },
      {
        src: "https://ik.imagekit.io/oytjocebw/seminars/lewis-academy/lewis-academy-director-address.jpeg",
        caption: "Director Daniel Changkija speaking on technological literacy",
      },
      {
        src: "https://ik.imagekit.io/oytjocebw/seminars/lewis-academy/lewis-academy-1.jpeg",
        caption: "Interactive session on AI study workflows and productivity",
      },
      {
        src: "https://ik.imagekit.io/oytjocebw/seminars/lewis-academy/seminar-initiate.jpeg",
        caption: "Seminar commencement and orientation at Lewis Academy",
        wide: true,
      },
    ],
  },
  {
    title: "CHSS Hosts 3-Day Seminar on AI Integration in Education",
    subtitle: "at Christian Higher Secondary School (CHSS), Dimapur — Featured in The Morung Express",
    date: "May 25, June 1 & June 2, 2026",
    year: "2026",
    tags: ["Seminar", "AI", "Commerce & Arts"],
    description:
      "Christian Higher Secondary School (CHSS), Dimapur, in partnership with instudia, conducted a three-day seminar on Artificial Intelligence (AI) integration on May 25, June 1, and June 2, focusing on the practical application of AI across Commerce and Arts education.",
    highlights:
      "For Commerce students, sessions covered AI tools in data analysis, market trend forecasting, and accounting. For Arts students, the focus was on AI-assisted literature research, historical archiving, and language learning, led by Daniel Changkija and Vishal Bardewa.",
    newsLink: {
      url: "https://morungexpress.com/chss-hosts-seminar-on-ai-integration",
      source: "The Morung Express",
    },
    photos: [
      {
        src: "https://morungexpress.com/uploads/2026/06/74218719_1780413507_CHSS.jpg",
        caption: "Students and faculty at Christian Higher Secondary School attending the AI integration seminar",
        wide: true,
      },
      {
        src: "https://ik.imagekit.io/oytjocebw/seminars/christain/audi-chss-2.png",
        caption: "Interactive auditorium presentation with Commerce and Arts students",
      },
      {
        src: "https://ik.imagekit.io/oytjocebw/seminars/christain/audi-chss.png",
        caption: "Faculty and students attending the AI integration seminar at CHSS",
      },
      {
        src: "https://ik.imagekit.io/oytjocebw/seminars/christain/class-chss.jpeg?updatedAt=1786831009129",
        caption: "Hands-on classroom discussion on AI research and learning tools",
        wide: true,
      },
    ],
  },
  {
    title: "AI Integration for 21st-Century Learning & Productivity",
    subtitle: "in association with Assisi Higher Secondary School — Featured in The Morung Express",
    date: "May 23rd, 2026",
    year: "2026",
    tags: ["Seminar", "AI", "Education"],
    description:
      "A dedicated workshop equipping participants with the mindset and tools required to navigate the AI revolution responsibly and effectively. Demonstrations covered how AI tools can automate repetitive study tasks, create personalised study plans, and foster critical thinking.",
    highlights:
      "Technical sessions led by Vishal Bardewa demonstrated AI as a catalyst to improve comprehension rather than replace human creativity, concluding with an interactive session on ethical AI and future workforce demands.",
    newsLink: {
      url: "https://www.morungexpress.com/instudia-assisi-hss-host-seminar-on-ai-integration-in-education",
      source: "The Morung Express",
    },
    photos: [
      {
        src: "https://nagalandpost.com/wp-content/uploads/2026/05/AI_result-scaled.webp",
        caption: "Interactive Q&A on data privacy, ethical tech, and careers at Assisi HSS",
        wide: true,
      },
      {
        src: "https://ik.imagekit.io/oytjocebw/seminars/assisi/students-ai-seminar.jpeg",
        caption: "Students engaged during the interactive AI presentation",
      },
      {
        src: "https://ik.imagekit.io/oytjocebw/seminars/assisi/instudia-director.jpeg",
        caption: "Director Daniel Changkija addressing the students on future tech readiness",
      },
      {
        src: "https://ik.imagekit.io/oytjocebw/seminars/assisi/assisi-long-shot-students.jpeg",
        caption: "Auditorium session in progress at Assisi Higher Secondary School",
        wide: true,
      },
    ],
  },
  {
    title: "Seminar on AI Integration & Productivity at Naga Adventist School",
    subtitle: "at Naga Adventist School, Dimapur",
    date: "May 22nd, 2026",
    year: "2026",
    tags: ["Seminar", "AI", "School Outreach"],
    description:
      "Instudia conducted an interactive seminar on Artificial Intelligence at Naga Adventist School, Dimapur, introducing students and faculty to modern AI tools, prompt engineering, and intelligent study workflows. The session aimed to demystify AI technology, showing participants how to transform smart tools into personalized academic assistants.",
    highlights:
      "Director Daniel Changkija highlighted the importance of early digital literacy and shifting from passive tech consumers to active builders. Technical resource person Vishal Bardewa demonstrated practical applications of AI for research filtering, note structuring, and critical problem solving.",
    photos: [
      {
        src: "https://ik.imagekit.io/oytjocebw/seminars/naga-adventist/group-naga-adventist.jpeg?updatedAt=1786827714492",
        caption: "Group photo with faculty and students at Naga Adventist School",
        wide: true,
      },
      {
        src: "https://ik.imagekit.io/oytjocebw/seminars/naga-adventist/naga-adventist-director-pic.jpeg?updatedAt=1786827746468",
        caption: "Director Daniel Changkija addressing the students on future tech readiness",
      },
      {
        src: "https://ik.imagekit.io/oytjocebw/seminars/naga-adventist/naga-adventist-director-long-shot.jpeg?updatedAt=1786827767416",
        caption: "Students actively participating during the seminar session",
      },
      {
        src: "https://ik.imagekit.io/oytjocebw/seminars/naga-adventist/naga-adventist-resource-pic.jpeg?updatedAt=1786827787896",
        caption: "Technical session by resource person Vishal Bardewa on study automation",
        wide: true,
      },
    ],
  },
  {
    title: "Navigating Your Career Roadmap — The Social Architect at NEISSR",
    subtitle: "at North East Institute of Social Sciences and Research (NEISSR), Chümoukedima",
    date: "April 17th, 2026",
    year: "2026",
    tags: ["Seminar", "Career Guidance", "Higher Education"],
    description:
      "A seminar titled 'Navigating Your Career Roadmap — The Social Architect: Designing a Career with Impact' was held at the North East Institute of Social Sciences and Research (NEISSR) for BSW (Bachelor of Social Work) and MSW (Master of Social Work) students. The session was organized and hosted by instudia in collaboration with NEISSR, focusing on empowering emerging social work professionals with strategic tools for purposeful career design.",
    highlights:
      "Development and social innovation practitioner Chand Bardewa engaged BSW and MSW scholars in redefining traditional career paths through social architecture, covering Strategic Career Mapping, Systems Thinking in the Social Sector, and building impact-driven portfolios for grassroots interventions.",
    photos: [
      {
        src: "https://ik.imagekit.io/oytjocebw/seminars/neissr/neissr-seminar-1.jpeg",
        caption: "BSW and MSW students alongside faculty at NEISSR attending the career roadmap seminar",
        wide: true,
      },
      {
        src: "https://ik.imagekit.io/oytjocebw/seminars/neissr/resource-person-neissr.jpeg",
        caption: "Resource person Chand Bardewa speaking on social architecture and impact career design",
      },
      {
        src: "https://ik.imagekit.io/oytjocebw/seminars/neissr/neissr-seminar-2.jpeg",
        caption: "Interactive Q&A discussion covering career transitions and grassroots problem-solving",
      },
      {
        src: "https://ik.imagekit.io/oytjocebw/seminars/neissr/neissr-seminar-3.jpeg",
        caption: "BSW & MSW participants and faculty members during the interactive session at NEISSR",
        wide: true,
      },
    ],
  },

  // --- 2025 ---
  {
    title: "AI for Productive & Efficient Learning",
    date: "April 5th, 2025",
    year: "2025",
    tags: ["Workshop", "AI"],
    description:
      "The session focused on how Artificial Intelligence is no longer a distant concept, but a present-day tool reshaping education and professional development. Through real-world examples, interactive discussions, and hands-on demonstrations, participants gained a solid understanding of how AI can be used to personalize learning, automate routine tasks, and enhance productivity.",
    highlights:
      "AI-powered tools can offer personalized learning experiences tailored to individual pace and style, assist with research and project development through intelligent search and analysis, and provide real-time feedback and virtual mentorship, even outside the classroom.",
    photos: [
      {
        src: "https://ik.imagekit.io/dxffek9yf/tr:h-1800,w-1800,fo-face/website-workshop-instudia/ai-institute-workshop/ai-workshop-at-instudia.jpeg?updatedAt=1752486659667",
        caption: "Interaction with students exploring AI-driven use cases",
        wide: true,
      },
      {
        src: "https://ik.imagekit.io/dxffek9yf/tr:h-1800,w-1800,fo-face,f-webp/website-workshop-instudia/ai-institute-workshop/WhatsApp%20Image%202025-07-14%20at%203.15.05%20PM%20(1).jpeg?updatedAt=1752486594279",
        caption: "Discussion on how to make prompting easier",
      },
      {
        src: "https://ik.imagekit.io/dxffek9yf/tr:f-webp/website-workshop-instudia/ai-institute-workshop/WhatsApp%20Image%202025-07-14%20at%203.15.03%20PM.jpeg?updatedAt=1752486594248",
        caption: "A snapshot of AI workshop being conducted",
      },
      {
        src: "https://ik.imagekit.io/dxffek9yf/tr:h-1800,w-1800,fo-face,f-webp/website-workshop-instudia/ai-institute-workshop/WhatsApp%20Image%202025-07-14%20at%203.15.05%20PM.jpeg?updatedAt=1752486594214",
        caption: "Resource person addressing students with Career insights",
        wide: true,
      },
    ],
    newsLink: {
      url: "https://www.morungexpress.com/workshop-on-emergence-of-ai-and-its-applications-in-education-held-in-dimapur",
      source: "The Morung Express",
    },
  },

  // --- 2024 ---
  {
    title: "Unlocking Potential with AI and Career Insights",
    subtitle: "at St. Edmund's Higher Secondary School — Featured in Eastern Mirror",
    date: "September 7th, 2024",
    year: "2024",
    tags: ["Workshop", "AI"],
    description:
      "A workshop was conducted at St. Edmund's Higher Secondary School, Dimapur. The event featured engaging sessions led by experts from instudia, who highlighted the growing significance of AI in reshaping industries and the modern job market. Daniel Changkija, Director of instudia, explained the critical role of AI in modern education and its transformative potential.",
    highlights:
      "Aimed to provide students with insights into new and evolving career paths while highlighting how AI can be utilised to enhance their academic and professional growth.",
    newsLink: {
      url: "https://www.easternmirrornagaland.com/instudia-conducts-workshop-on-ai-career-insights",
      source: "Eastern Mirror",
    },
    photos: [
      {
        src: "https://ik.imagekit.io/dxffek9yf/website-workshop-instudia/ai-workshop-edmund/tinywow_IMG_2107-1_65553879.webp?updatedAt=1727345998353",
        caption: "A day of discovery and growth as students explore AI-driven career paths",
        wide: true,
      },
      {
        src: "https://ik.imagekit.io/dxffek9yf/website-workshop-instudia/ai-workshop-edmund/tinywow_IMG_2105-1_65553879.webp?updatedAt=1727345998278",
        caption: "Discussion on how to make a career and develop one's skill",
      },
      {
        src: "https://ik.imagekit.io/dxffek9yf/website-workshop-instudia/ai-workshop-edmund/tinywow_IMG_2104-1_65553879.webp?updatedAt=1727345998170",
        caption: "A snapshot of curious students",
      },
      {
        src: "https://ik.imagekit.io/dxffek9yf/tr:w-500,h-500,c-maintain_ratio/website-workshop-instudia/ai-workshop-edmund/tinywow_IMG_2100-1_65553879.webp?updatedAt=1727413236974",
        caption: "Daniel Changkija addressing students with Career insights",
        wide: true,
      },
    ],
  },
  {
    title: "Youth Upskilling Program",
    subtitle: "in association with Dimapur Ao Baptist Arogo",
    date: "March 1 – July 10, 2024",
    year: "2024",
    tags: ["Skill Program", "DABA"],
    description:
      "instudia, in collaboration with Dimapur Ao Baptist Arogo, organized a Youth Upskilling Program to equip young individuals with essential digital and professional skills for thriving in the job market. The program focused on enhancing participants' knowledge in IT, communication, and career development.",
    highlights:
      "Hands-on workshops helped participants gain relevant skills directly applicable to career goals through IT, communication tools, and career development strategy sessions.",
    photos: [
      {
        src: "https://ik.imagekit.io/dxffek9yf/website-workshop-instudia/youth-daba-training/class-youth-3.webp?updatedAt=1727556440957",
        caption: "Students concentrating on the work",
      },
      {
        src: "https://ik.imagekit.io/dxffek9yf/website-workshop-instudia/youth-daba-training/class-youth-4.webp?updatedAt=1727556661877",
        caption: "A student being handed their certificate",
      },
      {
        src: "https://ik.imagekit.io/dxffek9yf/website-workshop-instudia/youth-daba-training/class-youth-1.webp?updatedAt=1727556440968",
        caption: "Training in progress with instructor",
        wide: true,
      },
      {
        src: "https://ik.imagekit.io/dxffek9yf/website-workshop-instudia/youth-daba-training/class-youth-group.webp?updatedAt=1728451444454",
        caption: "Group shot at the certificate distribution ceremony",
        wide: true,
      },
    ],
  },

  // --- 2023 ---
  {
    title: "6 Weeks ESDP Training Program",
    subtitle: "in association with Government of India & Ministry of MSME — Niuland",
    date: "October 30 – December 8, 2023",
    year: "2023",
    tags: ["Skill Program", "MSME"],
    description:
      "instudia, in partnership with the Government of India and MSME, offered a 6-week Entrepreneurial Skill Development Program in Niuland, covering Computer Basics, Information Technology, and the MS Office Package to prepare participants for success in today's digital workplace.",
    highlights:
      "Targeted at aspiring entrepreneurs, students, and professionals seeking to strengthen their digital skills and improve readiness for a competitive work environment.",
    photos: [
      {
        src: "https://ik.imagekit.io/dxffek9yf/website-workshop-instudia/niuland-msme-workshop/niuland1.webp?updatedAt=1727423463408",
        caption: "Director engaging with students in one of the sessions",
        wide: true,
      },
      {
        src: "https://ik.imagekit.io/dxffek9yf/website-workshop-instudia/niuland-msme-workshop/niuland3.webp?updatedAt=1727423640960",
        caption: "A quick shoot of students after a full day class",
      },
      {
        src: "https://ik.imagekit.io/dxffek9yf/tr:w-500,h-500,c-maintain_ratio/website-workshop-instudia/niuland-msme-workshop/tinywow_niuland3_65552583.webp?updatedAt=1727345904268",
        caption: "Group project focusing on topics from the training",
      },
      {
        src: "https://ik.imagekit.io/dxffek9yf/website-workshop-instudia/niuland-msme-workshop/niuland4.webp?updatedAt=1727423217087",
        caption: "Students after a session on career insights",
        wide: true,
      },
    ],
  },
  {
    title: "JobEx — instudia Job Fair",
    date: "March 11th, 2023",
    year: "2023",
    tags: ["Job Fair"],
    description:
      "JobEx, a premium job fair organized by instudia, connected over 70 job seekers with top companies from IT, finance, marketing, HR, and more. The event provided a valuable platform where job seekers showcased their skills, interacted with prospective employers, and explored exciting career opportunities — all under one roof.",
    highlights:
      "Over 70 job seekers and 10+ leading companies participated. One-on-one interviews and company briefings were held at instudia's premises in Dimapur.",
    photos: [
      {
        src: "https://ik.imagekit.io/dxffek9yf/website-workshop-instudia/instudia-job-fair/instudia_1.webp?updatedAt=1727456002083",
        caption: "Candidates awaiting their turns for a one-to-one",
        wide: true,
      },
      {
        src: "https://ik.imagekit.io/dxffek9yf/website-workshop-instudia/instudia-job-fair/job-fair-3.webp?updatedAt=1728451930044",
        caption: "Candidate being interviewed by one of the recruiters",
      },
      {
        src: "https://ik.imagekit.io/dxffek9yf/website-workshop-instudia/instudia-job-fair/instudia_2.webp?updatedAt=1727456028615",
        caption: "Another shot of candidates awaiting their turn",
      },
      {
        src: "https://ik.imagekit.io/dxffek9yf/website-workshop-instudia/instudia-job-fair/job-fair-4.webp?updatedAt=1728451929991",
        caption: "Briefing about the recruiters participating",
        wide: true,
      },
    ],
  },

  // --- 2022 ---
  {
    title: "Career Guidance at EduFest 2022",
    subtitle: "at Pilgrim Higher Secondary School",
    date: "September 17th, 2022",
    year: "2022",
    tags: ["Career Guidance"],
    description:
      "instudia participated in EduFest 2022 organized by Pilgrim Higher Secondary School, serving as a platform to enlighten students about the diverse skill sets they can develop through vocational training programs aligned with their personal interests and career goals.",
    highlights:
      "Students were encouraged to have one-on-one interactions with resource persons, gaining firsthand insights into the specific skills and knowledge required for success in IT, Engineering, and more.",
    photos: [
      {
        src: "https://ik.imagekit.io/dxffek9yf/website-workshop-instudia/pilgrim-school-workshop/pilgrim2.webp?updatedAt=1727545806021",
        caption: "Students being curious about the courses",
        wide: true,
      },
      {
        src: "https://ik.imagekit.io/dxffek9yf/website-workshop-instudia/pilgrim-school-workshop/pilgrim1_3:4.webp?updatedAt=1727427228258",
        caption: "Participating schools with their teacher-in-charge",
      },
      {
        src: "https://ik.imagekit.io/dxffek9yf/website-workshop-instudia/pilgrim-school-workshop/pilgrim3.webp?updatedAt=1727545778807",
        caption: "Director Daniel Changkija interacting with students",
      },
      {
        src: "https://ik.imagekit.io/dxffek9yf/website-workshop-instudia/pilgrim-school-workshop/pilgrim_3:4.webp?updatedAt=1728450451052",
        caption: "Group of enthusiastic girl students — Girl Power",
        wide: true,
      },
    ],
  },
  {
    title: "Workshop on Photography & Python",
    date: "June 23–24, 2022",
    year: "2022",
    tags: ["Workshop"],
    description:
      "An engaging two-day workshop on Basic Photography skills and Python programming. Renowned photographer and StudioLagom proprietor Akumyanger L. Jamir led the photography session covering cameras, lenses, composition, and Naga photography culture. Sr. Software Developer Vishal Bardewa led the Python programming session on the second day.",
    highlights:
      "Participants were divided into groups for a timed outdoor shoot, introduced to various photography styles, and walked through Python fundamentals — one of the most versatile programming languages today.",
    photos: [
      {
        src: "https://ik.imagekit.io/dxffek9yf/website-workshop-instudia/instudia-photography-workshop/photography-1.webp?updatedAt=1728451886303",
        caption: "Resource person sharing insights about gear in use",
        wide: true,
      },
      {
        src: "https://ik.imagekit.io/dxffek9yf/website-workshop-instudia/instudia-photography-workshop/photography-3.webp?updatedAt=1728452013442",
        caption: "The session commencing",
      },
      {
        src: "https://ik.imagekit.io/dxffek9yf/website-workshop-instudia/instudia-photography-workshop/photography-2.webp?updatedAt=1728451956240",
        caption: "Participants taking the camera out for the day",
      },
      {
        src: "https://ik.imagekit.io/dxffek9yf/website-workshop-instudia/instudia-photography-workshop/photography-4.webp?updatedAt=1728451855375",
        caption: "Presentation time!",
        wide: true,
      },
    ],
  },
];

// Stable slug for section ID anchors
const toId = (title: string) =>
  title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

// Group workshops by distinct years (in order of appearance)
const distinctYears = Array.from(new Set(workshops.map((w) => w.year)));

const navGroups: YearGroup[] = distinctYears.map((year) => ({
  year,
  items: workshops
    .filter((w) => w.year === year)
    .map((w) => ({
      id: toId(w.title),
      title: w.title,
      date: w.date,
      year: w.year,
    })),
}));

export default function WorkshopsPage() {
  const eventSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "instudia Workshops & Events",
    "itemListElement": workshops.map((w, i) => ({
      "@type": "ListItem",
      "position": i + 1,
      "item": {
        "@type": "Event",
        "name": w.title,
        "description": w.description.slice(0, 200),
        "startDate": w.date,
        "eventStatus": "https://schema.org/EventScheduled",
        "eventAttendanceMode": "https://schema.org/OfflineEventAttendanceMode",
        "location": {
          "@type": "Place",
          "name": "instudia, Dimapur",
          "address": {
            "@type": "PostalAddress",
            "addressLocality": "Dimapur",
            "addressRegion": "Nagaland",
            "addressCountry": "IN",
          },
        },
        "organizer": {
          "@type": "Organization",
          "name": "instudia",
          "url": "https://www.instudianagaland.com",
        },
      },
    })),
  };

  return (
    <main className="bg-white">
      <Script
        id="workshops-event-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(eventSchema) }}
      />
      {/* Hero */}
      <section className="relative overflow-hidden bg-white border-b border-neutral-100 pt-24 pb-20 px-6">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[300px] bg-brandpurple/5 rounded-full blur-[100px] pointer-events-none" />
        <div className="relative mx-auto max-w-4xl text-center">
          <p className="text-xs font-extrabold tracking-[0.2em] text-brandpurple uppercase mb-4">
            Events & Initiatives
          </p>
          <h1 className="text-5xl sm:text-6xl font-black tracking-tight text-[#1B1C1E] leading-tight">
            Skill Development{" "}
            <span className="text-brandpurple">Workshops</span>
          </h1>
          <p className="mt-5 text-lg text-gray-500 max-w-2xl mx-auto leading-relaxed">
            Empowering Dimapur's student and professional communities through
            hands-on learning, AI seminars, job fairs, and community skill programs.
          </p>

          {/* Stats strip */}
          <div className="mt-10 flex flex-wrap items-center justify-center gap-8">
            {[
              { value: "15+", label: "Events Conducted" },
              { value: "3,000+", label: "Participants" },
              { value: "22+", label: "Partner Institutions" },
            ].map((s) => (
              <div key={s.label} className="text-center">
                <p className="text-3xl font-black text-[#1B1C1E]">{s.value}</p>
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mt-1">
                  {s.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Workshop list + sticky nav */}
      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="flex gap-10 items-start">

          {/* Sticky sidebar nav (Accordion Grouped by Year) */}
          <div className="hidden xl:block sticky top-24 self-start">
            <WorkshopNav groups={navGroups} />
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0 space-y-24">
            {workshops.map((w, i) => (
              <article
                key={w.title}
                id={toId(w.title)}
                className="group relative scroll-mt-28"
              >
                {/* Year Anchor when it's the first event of that year */}
                {(i === 0 || workshops[i - 1].year !== w.year) && (
                  <div id={`year-${w.year}`} className="scroll-mt-28" />
                )}

                {i < workshops.length - 1 && (
                  <div className="absolute left-0 top-full w-px h-24 bg-gradient-to-b from-neutral-200 to-transparent hidden lg:block" />
                )}

                <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.6fr] gap-10 lg:gap-16 items-start">
                  {/* Left: Meta */}
                  <div className="lg:sticky lg:top-28">
                    {/* Index badge + tags */}
                    <div className="flex items-center gap-3 mb-5">
                      <span className="w-8 h-8 rounded-full bg-brandpurple/10 flex items-center justify-center text-xs font-black text-brandpurple">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {w.tags.map((tag) => (
                          <span
                            key={tag}
                            className={`text-[10px] font-extrabold uppercase tracking-widest px-2.5 py-1 rounded-full ${tagColors[tag] ?? "bg-gray-100 text-gray-500"}`}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    <h2 className="text-2xl sm:text-3xl font-black text-[#1B1C1E] leading-tight">
                      {w.title}
                    </h2>
                    {w.subtitle && (
                      <p className="mt-1 text-sm text-brandpurple font-semibold italic">
                        {w.subtitle}
                      </p>
                    )}

                    <div className="flex items-center gap-2 mt-3 text-sm text-gray-400">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <span className="font-medium">{w.date}</span>
                    </div>

                    <p className="mt-5 text-sm text-gray-600 leading-relaxed">
                      {w.description}
                    </p>

                    {/* Highlight callout */}
                    <div className="mt-5 border-l-2 border-brandpurple/30 pl-4">
                      <p className="text-xs font-extrabold uppercase tracking-widest text-brandpurple mb-1">
                        Key Highlight
                      </p>
                      <p className="text-sm text-gray-500 leading-relaxed italic">
                        {w.highlights}
                      </p>
                    </div>

                    {/* Press Coverage Link if present */}
                    {w.newsLink && (
                      <div className="mt-5">
                        <a
                          href={w.newsLink.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-xs font-bold text-brandpurple hover:underline bg-brandpurple/5 hover:bg-brandpurple/10 px-3 py-1.5 rounded-lg transition-colors border border-brandpurple/10"
                        >
                          <span>Read full coverage on {w.newsLink.source}</span>
                          <span>↗</span>
                        </a>
                      </div>
                    )}
                  </div>

                  {/* Right: Photo grid with lightbox */}
                  <WorkshopPhotoGrid photos={w.photos} eager={i === 0} />
                </div>

                {/* Divider */}
                {i < workshops.length - 1 && (
                  <div className="mt-20 border-t border-neutral-100" />
                )}
              </article>
            ))}
          </div> {/* end content wrapper */}
        </div> {/* end flex container */}
      </section>

      {/* CTA Banner */}
      <section className="mx-6 mb-20">
        {/* Gradient border wrapper */}
        <div className="rounded-[2.5rem] bg-gradient-to-r from-flourescent via-redhue via-brandpurple to-brightyellow p-[3px] shadow-lg">
          <div className="rounded-[calc(2.5rem-3px)] bg-white px-8 py-14 text-center lg:px-16 relative overflow-hidden">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[200px] bg-brandpurple/5 rounded-full blur-[80px] pointer-events-none" />
            <div className="relative">
              <p className="text-xs font-extrabold tracking-[0.2em] text-brandpurple uppercase mb-4">
                Stay Connected
              </p>
              <h2 className="text-3xl sm:text-4xl font-black text-[#1B1C1E]">
                Want to attend our next event?
              </h2>
              <p className="mt-3 text-gray-500 max-w-xl mx-auto">
                Follow instudia on Instagram and Facebook to be the first to know
                about upcoming workshops, bootcamps, and career events.
              </p>
              <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
                <a
                  href="/host-a-seminar"
                  className="inline-flex items-center gap-2 rounded-2xl bg-brandpurple px-6 py-3 text-sm font-extrabold text-white hover:bg-brandpurple/90 transition-all hover:-translate-y-0.5 shadow-lg shadow-brandpurple/20"
                >
                  Host instudia at Your School / College
                </a>
                <a
                  href="https://www.instagram.com/instudia_nagaland"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-2xl border border-neutral-200 bg-white px-6 py-3 text-sm font-extrabold text-[#1B1C1E] hover:bg-gray-50 transition-all hover:-translate-y-0.5"
                >
                  Follow on Instagram
                </a>
                <a
                  href="/contact"
                  className="inline-flex items-center gap-2 rounded-2xl border border-neutral-200 bg-white px-6 py-3 text-sm font-extrabold text-[#1B1C1E] hover:bg-gray-50 transition-all hover:-translate-y-0.5"
                >
                  Contact Us
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
