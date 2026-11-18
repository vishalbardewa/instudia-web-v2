export interface CourseOption {
  slug: string;
  title: string;
  category: string;
}

export const COURSE_OPTIONS: CourseOption[] = [
  // Technology & Programming
  {
    slug: "diploma-in-computer-applications",
    title: "Diploma in Computer Application (DCA)",
    category: "Computer Applications",
  },
  {
    slug: "pgdca",
    title: "Post Graduate Diploma in Computer Applications (PGDCA)",
    category: "Computer Applications",
  },
  {
    slug: "python",
    title: "Programming with Python",
    category: "Coding & AI",
  },
  {
    slug: "javascript",
    title: "Programming with JavaScript",
    category: "Coding & AI",
  },
  {
    slug: "fullstack-web-development",
    title: "Certificate in Fullstack Web Development",
    category: "Coding & AI",
  },
  {
    slug: "frontend-development",
    title: "Certificate in Frontend Development",
    category: "Coding & AI",
  },
  {
    slug: "backend-development",
    title: "Certificate in Backend Development",
    category: "Coding & AI",
  },
  {
    slug: "golang",
    title: "Programming with Go (Golang)",
    category: "Coding & AI",
  },
  {
    slug: "generative-ai",
    title: "Certificate in Generative AI",
    category: "Coding & AI",
  },
  {
    slug: "ai-agents-autonomic-workflows",
    title: "Certificate in AI Agents & Autonomic Workflows",
    category: "Coding & AI",
  },
  {
    slug: "mobile-app-development",
    title: "Certificate in Mobile App Development",
    category: "Coding & AI",
  },
  // Finance & Accounting
  {
    slug: "tally",
    title: "Accounting with Tally",
    category: "Accounting & Finance",
  },
  {
    slug: "gst",
    title: "Tally with GST Compliance",
    category: "Accounting & Finance",
  },
  {
    slug: "advanced-excel",
    title: "Certificate in Advanced Excel",
    category: "Accounting & Finance",
  },
  {
    slug: "data-analytics",
    title: "Certificate in Data Analytics",
    category: "Data & Analytics",
  },
  {
    slug: "buisness-intelligence-using-powerbi",
    title: "Certificate in Business Intelligence (Power BI)",
    category: "Data & Analytics",
  },
  {
    slug: "spss",
    title: "Statistical Analysis with SPSS",
    category: "Data & Analytics",
  },
  // Design & Multimedia
  {
    slug: "ui-ux-designing",
    title: "Certificate in UI/UX Design Specialization",
    category: "Design & Creative",
  },
  {
    slug: "graphic-designing",
    title: "Certificate in Graphic Designing",
    category: "Design & Creative",
  },
  // Infrastructure & Professional
  {
    slug: "learn-devops-cloud-services",
    title: "Certificate in DevOps Cloud Services",
    category: "Professional & IT",
  },
  {
    slug: "hardware-networking",
    title: "Certificate in Hardware and Networking",
    category: "Professional & IT",
  },
  {
    slug: "learn-project-management",
    title: "Certificate in Project Management",
    category: "Professional & IT",
  },
  {
    slug: "retail-management",
    title: "Certificate in Retail Management",
    category: "Professional & IT",
  },
  {
    slug: "food-processing",
    title: "Certificate in Food Processing",
    category: "Professional & IT",
  },
  // Fallback
  {
    slug: "other",
    title: "Other / General Experience at instudia",
    category: "General",
  },
];

export const STUDENT_SMART_TAGS = [
  "Hands-on coding projects",
  "1-on-1 Mentorship & support",
  "Clear, step-by-step explanations",
  "Quick doubt-clearing sessions",
  "Modern computer lab & tools",
  "Practical real-world assignments",
  "Friendly, patient instructors",
  "Boosted my career confidence",
  "Job-ready practical skills",
  "Beginner-friendly pace",
];

export const PARENT_SMART_TAGS = [
  "Noticeable boost in child's confidence",
  "Child genuinely looks forward to classes",
  "Caring & attentive instructors",
  "Safe, focused & disciplined campus",
  "Regular progress updates",
  "Transparent communication",
  "Practical skills for future career",
  "Valuable mentorship guidance",
  "Inspiring learning atmosphere",
  "Excellent value for investment",
];

export const STUDENT_ISSUE_TAGS = [
  "Teaching pace was too fast",
  "Teaching pace was too slow",
  "Needed more 1-on-1 doubt time",
  "Lab computer / software issue",
  "Class scheduling / timing clash",
  "Course notes or curriculum need updating",
  "Other concern",
];

export const PARENT_ISSUE_TAGS = [
  "Wanted more frequent progress reports",
  "Class timing or schedule conflict",
  "Need clearer communication with instructors",
  "Fee structure or installment clarity",
  "Child needed more individual attention",
  "Other concern",
];

function pickVariant<T>(items: T[], seed?: number, salt: number = 0): T {
  if (seed !== undefined) {
    const idx = Math.abs(Math.floor(seed + salt)) % items.length;
    return items[idx];
  }
  return items[Math.floor(Math.random() * items.length)];
}

export function generateReviewDraft({
  role,
  courseTitle,
  selectedTags,
  rating = 5,
  seed,
}: {
  role: "student" | "parent";
  courseTitle: string;
  selectedTags: string[];
  rating?: number;
  seed?: number;
}): string {
  const isStudent = role === "student";
  const displayCourse =
    courseTitle === "Other / General Experience at instudia"
      ? "instudia"
      : courseTitle;

  const isLowRating = rating <= 3;
  const s = seed !== undefined ? seed : Math.floor(Math.random() * 10000);

  // Format selected tags nicely
  const formattedTags =
    selectedTags.length === 1
      ? selectedTags[0].toLowerCase()
      : selectedTags.length === 2
      ? `${selectedTags[0].toLowerCase()} and ${selectedTags[1].toLowerCase()}`
      : selectedTags.length > 2
      ? `${selectedTags
          .slice(0, -1)
          .map((t) => t.toLowerCase())
          .join(", ")}, and ${selectedTags[selectedTags.length - 1].toLowerCase()}`
      : "";

  // 1–3 Stars Constructive Review Variants
  if (isLowRating) {
    const constructiveOpeners = isStudent
      ? [
          `I attended the ${displayCourse} course at instudia Dimapur.`,
          `Writing an honest review of my experience in ${displayCourse} at instudia.`,
          `I recently completed classes for ${displayCourse} at instudia Dimapur.`,
          `Sharing balanced feedback regarding the ${displayCourse} program at instudia.`,
        ]
      : [
          `My child attended the ${displayCourse} program at instudia Dimapur.`,
          `Writing a balanced parent review regarding the ${displayCourse} course at instudia.`,
          `Sharing our honest experience with ${displayCourse} at instudia Dimapur.`,
        ];

    const constructiveBodies = formattedTags
      ? [
          `While the mentors are approachable, areas such as ${formattedTags} could be better handled.`,
          `There were positive moments, but I felt ${formattedTags} needed more attention and improvement.`,
          `The program has good potential, but concerns around ${formattedTags} affected the overall learning experience.`,
          `Although the staff is polite, improvement in ${formattedTags} would make a big difference.`,
        ]
      : isStudent
      ? [
          `The mentors are knowledgeable, but I felt there is room for improvement in class pacing and doubt support.`,
          `While the staff is polite, certain adjustments in course scheduling and individual attention would help.`,
        ]
      : [
          `While the staff is approachable, we felt certain areas like timing and progress updates could be improved.`,
          `The institute has good intentions, but clearer communication and pacing adjustments are needed.`,
        ];

    const constructiveClosers = [
      `Sharing this constructive review to help future students and help the institute improve.`,
      `Hoping management takes this feedback positively to enhance upcoming batches.`,
      `Leaving this review based on my personal experience so others have a balanced view.`,
    ];

    const opener = pickVariant(constructiveOpeners, s, 1);
    const body = pickVariant(constructiveBodies, s, 3);
    const closer = pickVariant(constructiveClosers, s, 7);

    return `${opener} ${body} ${closer}`;
  }

  // 4–5 Stars Positive Review Variants

  // Student Variants (6 Openers x 6 Bodies x 4 Midpoints x 6 Closers = 800+ combos)
  if (isStudent) {
    const studentOpeners = [
      `I recently completed the ${displayCourse} course at instudia Dimapur.`,
      `Enrolling in ${displayCourse} at instudia was one of the best learning decisions I've made.`,
      `My journey studying ${displayCourse} at instudia in Dimapur has been truly practical and rewarding.`,
      `I had a fantastic experience taking the ${displayCourse} program at instudia.`,
      `As a student in the ${displayCourse} batch at instudia Dimapur, I gained real-world tech skills.`,
      `Joining instudia for ${displayCourse} gave me the exact hands-on training I was looking for.`,
      `Learning ${displayCourse} at instudia Dimapur exceeded all my expectations.`,
    ];

    const studentBodies = formattedTags
      ? [
          `What stood out the most was the ${formattedTags}.`,
          `The focus on ${formattedTags} made complex topics straightforward and enjoyable to understand.`,
          `I especially appreciated the ${formattedTags}, which gave me real confidence to work independently.`,
          `The curriculum is structured around ${formattedTags}, ensuring you don't just learn theory but practical execution.`,
          `Having ${formattedTags} throughout the classes made every session engaging and productive.`,
          `Their emphasis on ${formattedTags} prepared me with skills that are directly relevant to real industry work.`,
        ]
      : [
          `The mentors break down every concept step-by-step and patiently clarify doubts until you're completely clear.`,
          `The practical lab sessions and supportive environment made learning technology straightforward and enjoyable.`,
          `The guidance from instructors is top-notch, and the lab facilities in Dimapur are modern and well-equipped.`,
          `The atmosphere is focused yet beginner-friendly, ensuring no student is left behind.`,
        ];

    const studentMidpoints = [
      `The instructors are approachable, patient with questions, and genuinely care about your individual growth.`,
      `Whenever I got stuck during practical assignments, the mentors took the time to explain until I grasped it.`,
      `The lab atmosphere is modern, friendly, and very encouraging for anyone serious about building skills.`,
      `It's rare to find an institute in Nagaland that combines structured course material with such dedicated mentoring.`,
    ];

    const studentClosers = [
      `Highly recommend instudia to anyone looking for career-ready skills in Dimapur!`,
      `Definitely the premier training institute in Nagaland for practical technology learning.`,
      `Big thanks to the instudia faculty for their mentorship. 10/10 learning experience!`,
      `If you want to build genuine confidence in modern computer skills, instudia is the place to be.`,
      `Grateful for the entire experience. Strongly recommend instudia to all students and job seekers!`,
      `A fantastic place to upskill in Nagaland. Five stars without hesitation!`,
    ];

    const opener = pickVariant(studentOpeners, s, 1);
    const body = pickVariant(studentBodies, s, 3);
    const mid = pickVariant(studentMidpoints, s, 5);
    const closer = pickVariant(studentClosers, s, 7);

    return `${opener} ${body} ${mid} ${closer}`;
  }

  // Parent Variants
  const parentOpeners = [
    `Enrolling my child in the ${displayCourse} program at instudia Dimapur was a wonderful decision.`,
    `As a parent, I am genuinely impressed with instudia and their dedication in teaching ${displayCourse}.`,
    `We registered our child for ${displayCourse} at instudia and have seen remarkable progress in their confidence.`,
    `My experience with instudia Dimapur as a parent has been overwhelmingly positive.`,
    `instudia has provided our child with outstanding guidance during the ${displayCourse} course.`,
    `I am very glad we chose instudia Dimapur for our child's ${displayCourse} training.`,
  ];

  const parentBodies = formattedTags
    ? [
        `We particularly noticed a positive shift thanks to the ${formattedTags}.`,
        `What impressed us most as parents was their ${formattedTags}.`,
        `The dedication towards ${formattedTags} has given our child real enthusiasm for technology and learning.`,
        `Their focus on ${formattedTags} provides children with a strong foundation for their future careers.`,
        `Seeing our child benefit from the ${formattedTags} gave us complete peace of mind.`,
      ]
    : [
        `The teachers maintain a disciplined, safe, and motivating learning atmosphere where students thrive.`,
        `Our child genuinely looked forward to classes every day and speaks very highly of the mentors.`,
        `The personal attention given to each student and regular progress updates were truly commendable.`,
      ];

  const parentMidpoints = [
    `The faculty is disciplined, approachable, and provides a safe, motivating campus environment.`,
    `Communication from the team was clear and transparent throughout the program.`,
    `It is wonderful to see our child genuinely look forward to attending classes every day.`,
  ];

  const parentClosers = [
    `I wholeheartedly recommend instudia to fellow parents looking for quality computer education in Nagaland!`,
    `A disciplined, inspiring, and safe learning environment. Very thankful to team instudia!`,
    `Truly one of the finest educational institutes in Dimapur. Very grateful for their care and mentorship.`,
    `We strongly recommend instudia to any parent who wants their child to gain practical, future-proof skills.`,
    `Exceptional training and guidance. Thank you to the instructors and management!`,
  ];

  const opener = pickVariant(parentOpeners, s, 2);
  const body = pickVariant(parentBodies, s, 4);
  const mid = pickVariant(parentMidpoints, s, 6);
  const closer = pickVariant(parentClosers, s, 8);

  return `${opener} ${body} ${mid} ${closer}`;
}

export const GOOGLE_REVIEW_URL =
  process.env.NEXT_PUBLIC_GOOGLE_REVIEW_URL ||
  "https://search.google.com/local/writereview?placeid=ChIJfbTwkZDhNTcR4Me5nzBwYR4";

