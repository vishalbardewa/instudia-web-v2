export interface ServiceDeliverable {
  title: string;
  description: string;
  items: string[];
}

export interface ServiceCapability {
  title: string;
  badge?: string;
  description: string;
  deliverables: string[];
}

export interface ServiceProcessStep {
  step: string;
  title: string;
  description: string;
  timeline: string;
}

export interface ServiceEngagementModel {
  name: string;
  tag: string;
  badge?: string;
  description: string;
  features: string[];
  ctaText: string;
  popular?: boolean;
}

export interface ServiceFaq {
  question: string;
  answer: string;
}

export interface ServiceItem {
  slug: string;
  title: string;
  shortTitle: string;
  badge: string;
  category: "Engineering & Cloud" | "Design & Product" | "Institutional & Enterprise" | "Career & Placement";
  heroTagline: string;
  heroDescription: string;
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
  stats: { label: string; value: string }[];
  problemsSolved: { title: string; desc: string }[];
  capabilities: ServiceCapability[];
  process: ServiceProcessStep[];
  techStack?: { category: string; items: string[] }[];
  engagementModels: ServiceEngagementModel[];
  faqs: ServiceFaq[];
  relatedCourses: { title: string; slug: string; description: string }[];
  relatedTools: { title: string; slug: string; description: string }[];
  caseStudyNote: {
    client: string;
    headline: string;
    impact: string;
  };
}

export const servicesData: ServiceItem[] = [
  {
    slug: "web-software-development",
    title: "Custom Web & Software Development",
    shortTitle: "Web & Software",
    badge: "Engineering & Solutions",
    category: "Engineering & Cloud",
    heroTagline: "Fast web apps and business software, built right the first time.",
    heroDescription:
      "We build custom web apps, customer portals, and internal tools with Next.js and TypeScript. Everything is engineered to load under one second, stay secure, and grow easily with your business.",
    metaTitle: "Custom Web & Software Development Services | instudia",
    metaDescription:
      "Modern full-stack web and custom software development services by instudia. We build fast, scalable Next.js web applications, mobile apps, and business automation software in Dimapur, Nagaland and remotely.",
    keywords: [
      "Custom software development Nagaland",
      "Web development services Dimapur",
      "Next.js web application development",
      "Full stack development company",
      "SaaS MVP development",
      "Software company in Dimapur",
      "React developer Nagaland",
      "Business automation software",
    ],
    stats: [
      { value: "< 1.2s", label: "Average Page Load Time" },
      { value: "100%", label: "TypeScript & Code Ownership" },
      { value: "3x", label: "Faster MVP Delivery" },
      { value: "30-Day", label: "Post-Launch Warranty" },
    ],
    problemsSolved: [
      {
        title: "Slow, Bloated Websites",
        desc: "Old templates and sluggish platforms that fail Google speed checks, rank poorly, and lose customers before the page even loads.",
      },
      {
        title: "Rigid Off-the-Shelf Tools",
        desc: "Paying for generic software with inflexible workflows that force your team into clunky manual workarounds and split spreadsheets.",
      },
      {
        title: "Unreliable Freelancer Code",
        desc: "Messy, undocumented codebases that break under traffic spikes and leave you stranded when you need changes.",
      },
    ],
    capabilities: [
      {
        title: "Modern Web Applications",
        badge: "Next.js & React",
        description:
          "Fast, search-friendly web apps built with Next.js App Router, server rendering, and responsive interfaces that feel instant on any phone or laptop.",
        deliverables: [
          "Server-side rendering (SSR) for fast loads",
          "Mobile-responsive layouts",
          "Clean API and database integrations",
          "SEO structured data and metadata",
        ],
      },
      {
        title: "Custom Internal Tools & Portals",
        badge: "Operations",
        description:
          "Back-office software, customer dashboards, booking portals, and inventory trackers built to match your exact day-to-day operations.",
        deliverables: [
          "Role-based user permissions (RBAC)",
          "PostgreSQL database design",
          "Excel & PDF report exports",
          "Automated email and WhatsApp alerts",
        ],
      },
      {
        title: "SaaS & MVP Sprints",
        badge: "Startups & Growth",
        description:
          "Fixed-time sprints for founders who need to take a product idea from wireframe to paying customers without hiring an in-house tech department.",
        deliverables: [
          "User authentication & profiles",
          "Stripe and Razorpay payments",
          "Modular API architecture",
          "Continuous staging deployment",
        ],
      },
      {
        title: "Cross-Platform Mobile Apps",
        badge: "iOS & Android",
        description:
          "iOS and Android apps built with React Native, giving you one clean codebase with native speed and simple multi-platform updates.",
        deliverables: [
          "Offline data caching & sync",
          "Push notification integration",
          "App Store & Play Store publishing",
          "Backend API connectivity",
        ],
      },
    ],
    process: [
      {
        step: "01",
        title: "Discovery & Scope",
        description:
          "We sit down with you to map out workflows, clarify must-have features, and agree on a fixed milestone price.",
        timeline: "Days 1–3",
      },
      {
        step: "02",
        title: "Interactive Prototype",
        description:
          "You test a clickable Figma prototype to verify the user experience before we write a single line of code.",
        timeline: "Weeks 1–2",
      },
      {
        step: "03",
        title: "Sprint Development",
        description:
          "We build in two-week cycles. You get a private staging link to test features as they are finished.",
        timeline: "Weeks 3–6",
      },
      {
        step: "04",
        title: "Launch & 30-Day Warranty",
        description:
          "We launch with zero downtime, train your team, and stay on call for 30 days to resolve any bugs.",
        timeline: "Launch & Beyond",
      },
    ],
    techStack: [
      { category: "Frontend", items: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Redux / Zustand", "HTML5/CSS3"] },
      { category: "Backend & APIs", items: ["Node.js", "Express", "Python / FastAPI", "REST APIs", "Prisma / Drizzle"] },
      { category: "Databases & Storage", items: ["PostgreSQL", "Supabase", "MongoDB", "Redis", "Cloudflare R2", "S3"] },
      { category: "DevOps & Hosting", items: ["Vercel", "Docker", "AWS", "GitHub Actions", "Linux VPS", "Nginx"] },
    ],
    engagementModels: [
      {
        name: "Fixed-Scope Sprint",
        tag: "Best for MVPs & Defined Projects",
        description: "Clear milestones, fixed budget, and guaranteed deadlines. Perfect for MVPs and well-defined tools.",
        features: [
          "Complete scope and timeline document",
          "Full design and development delivery",
          "Staging testing and production launch",
          "30-day bug-fix warranty included",
        ],
        ctaText: "Request Scope Estimate",
      },
      {
        name: "Dedicated Engineering Pod",
        tag: "Best for Growing Products",
        badge: "Popular",
        popular: true,
        description: "A dedicated senior engineer working alongside you on regular feature rollouts and product improvements.",
        features: [
          "Dedicated senior engineer & tech lead",
          "Flexible bi-weekly sprint priorities",
          "Direct WhatsApp and Slack access",
          "Continuous maintenance and server monitoring",
        ],
        ctaText: "Consult on Retainer",
      },
      {
        name: "Code Audit & Modernization",
        tag: "Best for Slow Existing Sites",
        description: "Refactoring slow legacy sites into clean, high-speed Next.js applications that pass all Core Web Vitals.",
        features: [
          "Performance & Core Web Vitals audit",
          "Database and API optimization",
          "Mobile layout fixes",
          "Security and vulnerability check",
        ],
        ctaText: "Book Code Audit",
      },
    ],
    faqs: [
      {
        question: "How much does a custom web project cost?",
        answer:
          "It depends on the scope. A focused business tool or MVP starts from a fixed project fee, while larger platforms are delivered in clear milestone phases. We provide an exact quote with deliverables before you commit.",
      },
      {
        question: "Do you work with clients outside Nagaland?",
        answer:
          "Yes. We are based in Dimapur, Nagaland, but work with startups, businesses, and organizations across Northeast India, pan-India, and remotely using Google Meet, Slack, and GitHub.",
      },
      {
        question: "Who owns the code?",
        answer:
          "You do. 100%. Once project milestones are signed off, you get full ownership of the Git repository, design assets, and database architecture.",
      },
      {
        question: "What happens after launch?",
        answer:
          "Every build includes a 30-day warranty for any bug fixes. If you'd like ongoing maintenance, we also offer monthly retainers to handle updates and backups.",
      },
      {
        question: "Can you take over an existing project?",
        answer:
          "Yes. We often audit messy or abandoned codebases and help teams migrate to modern, reliable Next.js and TypeScript setups.",
      },
    ],
    relatedCourses: [
      {
        title: "Fullstack Web Development",
        slug: "fullstack-web-development",
        description: "Master modern full-stack web engineering with React, Node.js, Express, MongoDB, and Next.js.",
      },
      {
        title: "Programming with Python",
        slug: "python",
        description: "Learn Python programming, automation scripts, and server-side data workflows.",
      },
    ],
    relatedTools: [
      {
        title: "Salary Insights",
        slug: "salary-insights",
        description: "Explore tech engineering compensation and demand metrics across Northeast India.",
      },
      {
        title: "Career Blueprint",
        slug: "career-blueprint",
        description: "Discover roadmap guidance for software engineering careers.",
      },
    ],
    caseStudyNote: {
      client: "Regional Enterprise & Education Portals",
      headline: "Scalable Architecture for High-Demand Platforms",
      impact: "Zero downtime during peak admission cycles with 90+ Google PageSpeed scores across mobile and desktop.",
    },
  },

  {
    slug: "cloud-devops-infrastructure",
    title: "Cloud, DevOps & IT Infrastructure",
    shortTitle: "Cloud & DevOps",
    badge: "Reliability & Scale",
    category: "Engineering & Cloud",
    heroTagline: "Zero-downtime servers, automated deployments, and lower cloud bills.",
    heroDescription:
      "We keep your applications fast, reliable, and secure. From setting up automated GitHub CI/CD pipelines to trimming bloated AWS bills and hardening Linux servers, we handle the infrastructure so you can focus on your business.",
    metaTitle: "Cloud, DevOps & IT Infrastructure Consulting | instudia",
    metaDescription:
      "Reliable cloud architecture, DevOps automation, CI/CD pipeline setup, and Linux server management by instudia in Dimapur, Nagaland. Reduce downtime and accelerate deployments.",
    keywords: [
      "DevOps consulting Nagaland",
      "Cloud infrastructure services Dimapur",
      "AWS cloud management Northeast India",
      "Docker Kubernetes setup",
      "Linux server administration Dimapur",
      "CI/CD pipeline automation",
      "Database optimization consulting",
      "Server security audit",
    ],
    stats: [
      { value: "99.9%", label: "Target Uptime SLA" },
      { value: "Zero", label: "Downtime Deployments" },
      { value: "35%", label: "Average Cloud Savings" },
      { value: "24/7", label: "Automated Crash Alerts" },
    ],
    problemsSolved: [
      {
        title: "Server Crashes During Peak Traffic",
        desc: "Sites going down during ad campaigns or admission deadlines because databases get overloaded and servers aren't configured to scale.",
      },
      {
        title: "Manual, Error-Prone Deployments",
        desc: "Deploying code through manual FTP or terminal commands, where one small mistake brings down the whole site for hours.",
      },
      {
        title: "Skyrocketing Cloud Invoices",
        desc: "Paying for oversized AWS or GCP servers and forgotten storage disks that drain your budget without improving performance.",
      },
    ],
    capabilities: [
      {
        title: "Automated CI/CD Pipelines",
        badge: "GitHub Actions & GitLab",
        description:
          "Push code safely to production in minutes. Automated tests verify every commit, and new releases roll out with zero downtime.",
        deliverables: [
          "Automated linting and test runs",
          "Zero-downtime container updates",
          "Instant staging preview links",
          "Discord/Slack deployment notifications",
        ],
      },
      {
        title: "Docker Containers & Orchestration",
        badge: "Docker & Compose",
        description:
          "Package your apps into lightweight containers so they run identically on your laptop, staging, and live cloud servers.",
        deliverables: [
          "Clean multi-stage Dockerfiles",
          "Docker Compose multi-service configs",
          "Automated health checks & restarts",
          "Safe secret & environment variable management",
        ],
      },
      {
        title: "Cloud Migration & Cost Reduction",
        badge: "AWS & Hybrid Cloud",
        description:
          "Right-sizing oversized instances, setting up fast CDNs, and cutting out unused cloud resources to lower monthly bills.",
        deliverables: [
          "AWS, DigitalOcean, and VPS setups",
          "Cloud bill audit and resource trimming",
          "Automated daily snapshot backups",
          "Cloudflare CDN and DDoS protection",
        ],
      },
      {
        title: "Linux Server Hardening",
        badge: "Security & Tuning",
        description:
          "Securing Ubuntu/Debian servers, configuring reverse proxies, enforcing SSL certificates, and blocking brute-force attacks.",
        deliverables: [
          "SSH key security and UFW firewall",
          "Fail2ban intrusion prevention",
          "PostgreSQL connection pooling",
          "Automated offsite backups to S3",
        ],
      },
    ],
    process: [
      {
        step: "01",
        title: "Audit & Cost Review",
        description:
          "We review your current servers, bottlenecks, and monthly cloud bills to find easy wins.",
        timeline: "Days 1–3",
      },
      {
        step: "02",
        title: "Blueprint & Plan",
        description:
          "We map out containerized environments, staging links, and automated backup schedules.",
        timeline: "Days 4–7",
      },
      {
        step: "03",
        title: "Staging Migration",
        description:
          "We test containerized setups and deployment scripts in a staging environment without touching live traffic.",
        timeline: "Weeks 2–3",
      },
      {
        step: "04",
        title: "Zero-Downtime Launch",
        description:
          "We switch DNS over seamlessly, configure uptime monitors, and hand over clear runbooks.",
        timeline: "Week 4+",
      },
    ],
    techStack: [
      { category: "Cloud Providers", items: ["AWS (EC2, S3, RDS, CloudFront)", "DigitalOcean", "Hetzner", "Vercel", "Supabase"] },
      { category: "DevOps & Containers", items: ["Docker", "Docker Compose", "GitHub Actions", "GitLab CI", "Nginx", "Caddy"] },
      { category: "Monitoring & Reliability", items: ["Grafana", "Prometheus", "Uptime Kuma", "Sentry", "Logwatch"] },
      { category: "Security & Networking", items: ["Cloudflare", "UFW Firewall", "Fail2ban", "Let's Encrypt SSL", "OpenVPN / WireGuard"] },
    ],
    engagementModels: [
      {
        name: "Infrastructure Setup & Overhaul",
        tag: "Best for Immediate Stabilization",
        description: "Complete setup: containerize apps, configure GitHub Actions CI/CD, harden servers, and set up daily backups.",
        features: [
          "Full server security hardening",
          "Production Docker setup",
          "Automated GitHub CI/CD pipeline",
          "Automated daily cloud backups",
        ],
        ctaText: "Request Infrastructure Audit",
      },
      {
        name: "Monthly Managed Cloud Retainer",
        tag: "Best for Peace of Mind & 24/7 Uptime",
        badge: "Recommended",
        popular: true,
        description: "Proactive server monitoring, monthly security patches, database maintenance, and emergency support.",
        features: [
          "24/7 uptime & crash alerts",
          "Monthly security & OS updates",
          "Database indexing & vacuuming",
          "Priority emergency on-call support",
        ],
        ctaText: "Explore Managed DevOps",
      },
      {
        name: "Cloud Bill Optimization",
        tag: "Best for High Cloud Bills",
        description: "Detailed audit of your AWS or cloud setup to eliminate wasted resources and reduce monthly invoices.",
        features: [
          "Complete resource utilization review",
          "Removal of orphan disks & idle instances",
          "Architecture rightsizing plan",
          "Direct billing reduction implementation",
        ],
        ctaText: "Cut Cloud Costs",
      },
    ],
    faqs: [
      {
        question: "Can you migrate us away from slow shared hosting?",
        answer:
          "Yes. We move apps from slow cPanel or shared hosts to high-speed cloud VPS servers (like DigitalOcean, Hetzner, or AWS) with zero downtime.",
      },
      {
        question: "How do you release updates without taking the site down?",
        answer:
          "We use Docker containers and reverse proxies like Nginx. The new version boots up and passes health checks before traffic is directed to it. Your users never see a maintenance page.",
      },
      {
        question: "Will you train our in-house IT staff?",
        answer:
          "Yes. We provide plain-English documentation and walk your team through how to check server health, read logs, and trigger rollbacks if needed.",
      },
    ],
    relatedCourses: [
      {
        title: "Certificate in DevOps Cloud Services",
        slug: "learn-devops-cloud-services",
        description: "Hands-on training in Docker, CI/CD, cloud deployment, and Linux infrastructure fundamentals.",
      },
      {
        title: "Hardware & Networking",
        slug: "hardware-networking",
        description: "Master PC architecture, LAN routing, network protocols, and troubleshooting.",
      },
    ],
    relatedTools: [
      {
        title: "Salary Insights",
        slug: "salary-insights",
        description: "Inspect DevOps and Cloud Engineer salary benchmarks in India.",
      },
    ],
    caseStudyNote: {
      client: "Academic & Institutional Systems",
      headline: "100% Uptime Across Traffic Surges",
      impact: "Eliminated deployment outages completely and cut server response times by 55% using automated CI/CD and Redis caching.",
    },
  },

  {
    slug: "ui-ux-branding",
    title: "UI/UX Design & Digital Branding",
    shortTitle: "UI/UX & Branding",
    badge: "Design Systems & Usability",
    category: "Design & Product",
    heroTagline: "Interfaces that look sharp, feel natural, and convert visitors.",
    heroDescription:
      "We design clean web and mobile interfaces that your users will actually enjoy using. Built in Figma with reusable component kits, thoughtful user flows, and clear specs so developers can code them without guesswork.",
    metaTitle: "UI/UX Design & Digital Branding Agency | instudia",
    metaDescription:
      "Professional UI/UX design, Figma wireframing, interactive prototyping, and brand identity design by instudia. We design modern web apps and digital products that drive conversions.",
    keywords: [
      "UI UX design Dimapur",
      "Product design agency Nagaland",
      "Figma prototyping services",
      "Brand identity design Northeast India",
      "Web design company Dimapur",
      "Mobile app UI UX design",
      "Design systems development",
      "Conversion rate optimization design",
    ],
    stats: [
      { value: "Figma", label: "Design & Prototyping System" },
      { value: "100%", label: "Reusable Component Library" },
      { value: "Pixel-Ready", label: "Clear Developer Specs" },
      { value: "Mobile-First", label: "Tested on Real Devices" },
    ],
    problemsSolved: [
      {
        title: "High Bounce Rates & Confusing Layouts",
        desc: "Visitors landing on your website or app and bouncing because they can't quickly find what they need or how to take action.",
      },
      {
        title: "Outdated, Inconsistent Branding",
        desc: "Mismatched fonts, low-res graphics, and amateur visual styling that make your business look smaller than it is.",
      },
      {
        title: "Frustrated Developers Guessing States",
        desc: "Design files handed off without hover states, mobile layouts, or input errors, leading to messy implementations.",
      },
    ],
    capabilities: [
      {
        title: "User Flows & Information Architecture",
        badge: "Discovery",
        description:
          "Mapping out intuitive user journeys, sitemaps, and wireframes so every screen has a clear purpose and path to conversion.",
        deliverables: [
          "User journey and drop-off maps",
          "Low-fidelity structural wireframes",
          "Clear page hierarchies and navigation",
          "Competitor usability benchmarks",
        ],
      },
      {
        title: "Clickable Figma Prototypes",
        badge: "Figma",
        description:
          "Realistic, interactive prototypes that let you click through your product, test animations, and validate ideas before writing code.",
        deliverables: [
          "Desktop, tablet, and mobile layouts",
          "Interactive buttons, menus, and forms",
          "Dark and light mode variations",
          "Shareable links for team review",
        ],
      },
      {
        title: "Design Systems & Component Libraries",
        badge: "Scalability",
        description:
          "Scalable design tokens, typography scales, buttons, and input fields that keep your brand consistent and speed up coding.",
        deliverables: [
          "Figma auto-layout components",
          "Color palette and typography tokens",
          "All interactive states (hover, error, disabled)",
          "Direct CSS/Tailwind developer notes",
        ],
      },
      {
        title: "Brand Identity & Visual Kits",
        badge: "Branding",
        description:
          "Clean logos, modern typography, social media templates, and marketing graphics that build instant credibility.",
        deliverables: [
          "Primary and secondary logo marks",
          "Brand style guide (colors, fonts, rules)",
          "Social media launch templates",
          "Custom web icons and illustrations",
        ],
      },
    ],
    process: [
      {
        step: "01",
        title: "Brief & Moodboard",
        description:
          "We discuss your goals, review competitor sites, and align on visual direction with a moodboard.",
        timeline: "Week 1",
      },
      {
        step: "02",
        title: "Wireframes & Structure",
        description:
          "We map out low-fidelity layouts focused strictly on content flow and usability without color distractions.",
        timeline: "Week 2",
      },
      {
        step: "03",
        title: "High-Fidelity UI & Prototype",
        description:
          "We design polished screens, color palettes, and interactive Figma prototypes you can click around.",
        timeline: "Weeks 3–4",
      },
      {
        step: "04",
        title: "Developer Handoff",
        description:
          "We export organized assets, write component specs, and review the live build with your developers.",
        timeline: "Week 5",
      },
    ],
    engagementModels: [
      {
        name: "Full Product Redesign",
        tag: "Best for SaaS & Web Apps",
        badge: "Most Popular",
        popular: true,
        description: "Complete redesign for your web app, SaaS, or mobile product: wireframes, prototypes, and reusable design system.",
        features: [
          "UX audit and user journey mapping",
          "Clickable Figma prototype",
          "Full component design system",
          "Developer handoff walkthrough",
        ],
        ctaText: "Request UI/UX Proposal",
      },
      {
        name: "Brand Identity & Style Guide",
        tag: "Best for New Startups & Rebrands",
        description: "Modern visual identity for new businesses and rebrands: logo, color rules, fonts, and social media templates.",
        features: [
          "Logo suite with vector files",
          "Brand guidelines handbook (PDF)",
          "Social media post templates",
          "Web typography and color palette",
        ],
        ctaText: "Start Brand Project",
      },
      {
        name: "5-Day UI/UX Audit",
        tag: "Best for Quick Conversion Boosts",
        description: "A fast audit pinpointing why users are dropping off, fixing mobile layout quirks, and redesigning your key landing page.",
        features: [
          "Usability and friction audit",
          "Actionable recommendations list",
          "Redesigned high-impact landing page",
          "Video walkthrough explaining the fixes",
        ],
        ctaText: "Book Design Audit",
      },
    ],
    faqs: [
      {
        question: "What tool do you use for design?",
        answer:
          "We work exclusively in Figma. You get a live link where you can leave comments directly on screens, and your developers can inspect CSS and dimensions easily.",
      },
      {
        question: "Can you also code the designs?",
        answer:
          "Yes. Because instudia has both designers and full-stack software engineers, we can build your approved Figma designs into clean Next.js/React code.",
      },
      {
        question: "How many revisions are included?",
        answer:
          "We work in structured phases: wireframe approval, visual direction approval, and final polish. Revisions within agreed project goals are included so you love the final result.",
      },
    ],
    relatedCourses: [
      {
        title: "UI/UX Designing",
        slug: "ui-ux-designing",
        description: "Learn Figma, design principles, wireframing, and interactive product design from scratch.",
      },
      {
        title: "Graphic Designing",
        slug: "graphic-designing",
        description: "Master Photoshop, Illustrator, CorelDRAW, and visual branding.",
      },
    ],
    relatedTools: [
      {
        title: "Salary Insights",
        slug: "salary-insights",
        description: "Explore UI/UX designer and product designer compensation benchmarks.",
      },
    ],
    caseStudyNote: {
      client: "Digital Platforms & Educational Products",
      headline: "Intuitive Interfaces Built for High Engagement",
      impact: "Reduced user onboarding friction by 40% with clean visual hierarchy and componentized Figma design systems.",
    },
  },

  {
    slug: "corporate-training",
    title: "Corporate & Workforce Tech Training",
    shortTitle: "Corporate Training",
    badge: "Workforce Upskilling",
    category: "Institutional & Enterprise",
    heroTagline: "Practical tech skills that save your team hours every week.",
    heroDescription:
      "Help your employees master the tools they use every day. We provide practical, hands-on workshops in Advanced Excel, Power BI, Tally Prime with GST, and workplace AI tools—taught using your company's actual daily files and workflows.",
    metaTitle: "Corporate IT Training & Workforce Upskilling | instudia",
    metaDescription:
      "Custom corporate IT training in Dimapur, Nagaland. Upskill your workforce in Advanced Excel, Power BI, Tally Prime with GST, Generative AI, and software tools. Delivered on-premise or online.",
    keywords: [
      "Corporate IT training Nagaland",
      "Employee training Dimapur",
      "Corporate Excel training Northeast India",
      "Power BI training for corporate teams",
      "Tally GST corporate workshop",
      "Workforce upskilling Dimapur",
      "AI productivity workshops for business",
      "Executive computer training Nagaland",
    ],
    stats: [
      { value: "Tailored", label: "To Your Tech Stack" },
      { value: "100%", label: "Hands-on With Real Files" },
      { value: "ISO 9001", label: "Certified Quality Curriculum" },
      { value: "8+ Hours", label: "Average Weekly Time Saved" },
    ],
    problemsSolved: [
      {
        title: "Days Lost to Manual Spreadsheets",
        desc: "Staff spending hours copy-pasting numbers and reformatting tables every month instead of using automated formulas and Power Query.",
      },
      {
        title: "Decisions Made on Outdated Data",
        desc: "Managers waiting days for static reports because sales, inventory, and expense numbers are trapped in disconnected files.",
      },
      {
        title: "Unsure How to Use AI Safely",
        desc: "Employees curious about ChatGPT or Copilot but unsure how to use them productively without exposing private company data.",
      },
    ],
    capabilities: [
      {
        title: "Advanced Excel for Operations & Finance",
        badge: "Finance & Operations",
        description:
          "Turn your team into spreadsheet pros with XLOOKUP, dynamic pivot tables, Power Query automation, and clean dashboards.",
        deliverables: [
          "Hands-on practice with company files",
          "Automated monthly report templates",
          "Formula error-checking techniques",
          "Pre- and post-training skill reports",
        ],
      },
      {
        title: "Power BI Business Intelligence Dashboards",
        badge: "Executive Analytics",
        description:
          "Teach managers to connect data sources and build interactive dashboards that track revenue, sales, and team KPIs in real time.",
        deliverables: [
          "Automated connections to Excel & SQL",
          "Key metric calculation formulas (DAX)",
          "Interactive mobile-ready reports",
          "Scheduled automated report refreshes",
        ],
      },
      {
        title: "Tally Prime & GST Filing Workflows",
        badge: "Accounting & Tax",
        description:
          "Ensure your accounts team manages vouchers smoothly, stays on top of inventory, and reconciles GST without errors.",
        deliverables: [
          "GSTR-1 and GSTR-3B reconciliation",
          "E-Way bills and e-invoicing steps",
          "Inventory and cost center tracking",
          "Audit trail and compliance workflows",
        ],
      },
      {
        title: "Workplace AI & Practical Productivity",
        badge: "Future of Work",
        description:
          "Safe, effective training on modern AI tools to speed up drafting, summarize documents, and handle customer replies faster.",
        deliverables: [
          "Prompt templates for everyday tasks",
          "Company data privacy guidelines",
          "Document drafting and summarization",
          "Hands-on roleplay practice sessions",
        ],
      },
    ],
    process: [
      {
        step: "01",
        title: "Needs Assessment",
        description:
          "We speak with your department heads to review daily workflows and identify the biggest time-wasters.",
        timeline: "Days 1–3",
      },
      {
        step: "02",
        title: "Custom Course Material",
        description:
          "We design exercises and sample data based on your industry and actual day-to-day work.",
        timeline: "Days 4–7",
      },
      {
        step: "03",
        title: "Interactive Delivery",
        description:
          "Engaging, practical workshop sessions delivered at your office, online, or in our Dimapur lab.",
        timeline: "Workshop Days",
      },
      {
        step: "04",
        title: "Certification & 30-Day Help",
        description:
          "Verified certificates for staff, session summaries, and 30 days of follow-up doubt clearing.",
        timeline: "Post-Workshop",
      },
    ],
    engagementModels: [
      {
        name: "1–3 Day Intensive Workshop",
        tag: "Best for Quick Upskilling Sprints",
        description: "Fast, focused workshops on a specific topic like Advanced Excel automation or Workplace AI productivity.",
        features: [
          "Full-day or half-day practical format",
          "Customized real-world exercises",
          "Verified digital certificate for attendees",
          "Quick-reference cheat sheets and templates",
        ],
        ctaText: "Request Bootcamp Proposal",
      },
      {
        name: "Multi-Week Departmental Track",
        tag: "Best for Deep Competence",
        badge: "Enterprise Standard",
        popular: true,
        description: "Scheduled weekly sessions designed around office hours for deep competence across multiple software tools.",
        features: [
          "Flexible 2-to-4 hour weekly sessions",
          "Skill evaluations before and after training",
          "1-on-1 instructor doubt clearing",
          "Management attendance & progress report",
        ],
        ctaText: "Schedule Consultation",
      },
      {
        name: "Leadership & Executive Briefing",
        tag: "Best for Founders & Directors",
        description: "Private, high-impact sessions for founders and department heads on modern business intelligence and data strategy.",
        features: [
          "Confidential 1-on-1 or small group format",
          "Executive dashboard design guidance",
          "Data security and AI adoption roadmap",
          "Direct access to senior tech directors",
        ],
        ctaText: "Book Executive Session",
      },
    ],
    faqs: [
      {
        question: "Can training take place at our office?",
        answer:
          "Yes. We deliver training on-site at offices across Dimapur, Kohima, and other districts in Nagaland. We can also host your team at our computer lab in Dimapur or run interactive online sessions.",
      },
      {
        question: "What if our employees have different skill levels?",
        answer:
          "We run a quick baseline survey beforehand so we can pace the sessions properly and ensure everyone stays confident and supported.",
      },
      {
        question: "Do participants receive certificates?",
        answer:
          "Yes. Attendees receive verified certificates from instudia (ISO 9001:2015 certified and MSME registered), which can also be co-branded with your company logo.",
      },
    ],
    relatedCourses: [
      {
        title: "Advanced Excel",
        slug: "advance-excel",
        description: "Formulas, pivot tables, lookup functions, dashboards, and automated reporting.",
      },
      {
        title: "Business Intelligence using Power BI",
        slug: "buisness-intelligence-using-powerbi",
        description: "Data modeling, DAX queries, and executive business intelligence dashboards.",
      },
      {
        title: "Tally Prime with GST",
        slug: "tally",
        description: "Ledger management, voucher entry, inventory, bank reconciliation, and business reporting.",
      },
    ],
    relatedTools: [
      {
        title: "Assessment Designer",
        slug: "assessment-designer",
        description: "Generate tailored workplace technical assessments and quizzes.",
      },
    ],
    caseStudyNote: {
      client: "Corporate Teams & Regional Enterprises",
      headline: "Measurable Workplace Workflow Automation",
      impact: "Saved an estimated 8+ hours per week per employee in manual data entry through automated Excel workflows and Power BI dashboards.",
    },
  },

  {
    slug: "campus-partnerships",
    title: "Campus Tech Bootcamps & College Partnerships",
    shortTitle: "Campus Programs",
    badge: "Youth & Academia",
    category: "Institutional & Enterprise",
    heroTagline: "Practical tech skills and real-world projects for college students.",
    heroDescription:
      "Help your students build real technical confidence. We partner with schools, colleges, and institutes across Nagaland to run hands-on coding bootcamps, student career roadmaps, and faculty development workshops on educational AI tools.",
    metaTitle: "Campus Tech Bootcamps & College Partnerships | instudia",
    metaDescription:
      "Partner with instudia to conduct practical student tech seminars, coding bootcamps, and Faculty Development Programs in schools and colleges across Dimapur and Nagaland.",
    keywords: [
      "College tech workshops Nagaland",
      "School computer bootcamps Dimapur",
      "Faculty Development Program Nagaland",
      "Host tech seminar Nagaland",
      "Coding workshops for students",
      "Institutional STEM training Dimapur",
      "NEISSR MGM College partner",
      "Career seminar for schools Nagaland",
    ],
    stats: [
      { value: "15+", label: "Partner Colleges & Schools" },
      { value: "100%", label: "Hands-on Coding Labs" },
      { value: "100%", label: "Project-Based Learning" },
      { value: "ISO 9001", label: "Certified Quality Curriculum" },
    ],
    problemsSolved: [
      {
        title: "Textbook Theory Without Real Code",
        desc: "Computer classes that focus on blackboard definitions rather than building and running software, leaving students unprepared for jobs.",
      },
      {
        title: "Lack of Tech Career Clarity",
        desc: "Students eager to enter IT and modern design, but unsure where to start or what skills companies are actually hiring for.",
      },
      {
        title: "Teachers Overwhelmed by AI",
        desc: "Faculty wanting clear, practical guidance on how to use AI tools responsibly for lesson planning and assessments.",
      },
    ],
    capabilities: [
      {
        title: "Hands-on Student Coding Bootcamps",
        badge: "Higher Secondary & College",
        description:
          "Intensive 1 to 3 day workshops covering Web Development, Python, or UI/UX Design where every student builds a working project.",
        deliverables: [
          "Jargon-free, live coding instruction",
          "Working project built by every student",
          "Verified digital completion certificate",
          "Follow-up study roadmaps and resources",
        ],
      },
      {
        title: "Faculty Development on AI in Education",
        badge: "For Educators & Staff",
        description:
          "Show teachers and professors how to use modern AI tools to prepare lesson plans, draft question banks, and speed up grading.",
        deliverables: [
          "Curriculum-tailored prompt techniques",
          "Interactive quiz and rubric generation",
          "Digital safety and academic ethics",
          "Institutional FDP certification",
        ],
      },
      {
        title: "Career Awareness & Tech Roadmaps",
        badge: "Assemblies & Convocations",
        description:
          "High-energy assembly and auditorium seminars showing students clear pathways into software, design, and remote digital careers.",
        deliverables: [
          "Engaging multimedia keynote",
          "Current job demand and salary breakdowns",
          "Open Q&A for student and parent questions",
          "Free access to instudia student career tools",
        ],
      },
      {
        title: "Computer Lab & Infrastructure Guidance",
        badge: "Infrastructure",
        description:
          "Helping schools and colleges set up affordable, reliable computer labs, Linux terminals, and safe local networks.",
        deliverables: [
          "Hardware specs and cost-saving advice",
          "Open-source software setup guides",
          "Safe student internet filtering rules",
          "Lab technician maintenance checklists",
        ],
      },
    ],
    process: [
      {
        step: "01",
        title: "Initial Consultation",
        description:
          "We meet with your principal or department head to discuss academic goals, student batch size, and convenient dates.",
        timeline: "Step 1",
      },
      {
        step: "02",
        title: "Tailored Proposal",
        description:
          "We send an official proposal letter and syllabus customized to your stream (Arts, Commerce, or Science).",
        timeline: "Step 2",
      },
      {
        step: "03",
        title: "Campus Delivery",
        description:
          "Our mentors visit your campus computer lab or auditorium to run interactive, hands-on sessions.",
        timeline: "Event Day",
      },
      {
        step: "04",
        title: "Certificates & Feedback",
        description:
          "We issue co-branded digital certificates, share student feedback reports, and provide follow-up roadmaps.",
        timeline: "Post-Event",
      },
    ],
    engagementModels: [
      {
        name: "Campus Seminar & Keynote",
        tag: "Best for 50–200 Students",
        description: "Engaging 2 to 3 hour auditorium seminar introducing high-demand tech skills, career pathways, and real project demos.",
        features: [
          "Visual keynote by industry mentors",
          "Live interactive Q&A session",
          "Free digital study guides for students",
          "Certificate of appreciation for the institution",
        ],
        ctaText: "Book Campus Seminar",
      },
      {
        name: "Hands-on Multi-Day Bootcamp",
        tag: "Best for Lab Batches (30–80 Students)",
        badge: "Most Requested",
        popular: true,
        description: "Practical 2 to 3 day workshop in your computer lab guiding batches of 30 to 80 students through building real applications.",
        features: [
          "Project-based coding or design training",
          "1-on-1 mentor guidance during lab work",
          "Verified co-branded certificates for all students",
          "Recognition awards for top student projects",
        ],
        ctaText: "Plan Campus Bootcamp",
      },
      {
        name: "Annual Academic Partnership (MoU)",
        tag: "Best for Long-Term Excellence",
        description: "Long-term partnership covering semester workshops, faculty upskilling, and student internship opportunities.",
        features: [
          "Semester-wise technical guest sessions",
          "Priority internship access for top students",
          "Faculty training on classroom AI tools",
          "Official institutional MoU signing",
        ],
        ctaText: "Explore Institutional MoU",
      },
    ],
    faqs: [
      {
        question: "Which colleges and schools have worked with instudia?",
        answer:
          "We have conducted workshops and seminars with institutions including NEISSR, MGM College, Immanuel College, Christian Higher Secondary School (CHSS), Assisi Higher Secondary School, Pilgrim Higher Secondary School, and Lewis Academy, alongside Ministry of MSME programs.",
      },
      {
        question: "What equipment does our campus need?",
        answer:
          "For seminars, an auditorium with a projector, screen, sound system, and power is plenty. For coding bootcamps, access to your computer lab is ideal. We also have mobile-friendly modules when lab access is limited.",
      },
      {
        question: "Can you customize sessions for non-computer students?",
        answer:
          "Yes. We regularly tailor sessions: Excel, Tally, and GST for Commerce students; digital media and content tools for Arts; and coding and web development for Science students.",
      },
    ],
    relatedCourses: [
      {
        title: "Diploma in Computer Applications (DCA)",
        slug: "diploma-in-computer-applications",
        description: "6-month foundational computer diploma covering office automation and typing.",
      },
      {
        title: "Post Graduate Diploma in Computer Applications (PGDCA)",
        slug: "pgdca",
        description: "12-month advanced diploma in programming, database systems, and office IT.",
      },
    ],
    relatedTools: [
      {
        title: "Pedagogical Assistant",
        slug: "lecture-note-generator",
        description: "Study note structuring and revision helper for educators and students.",
      },
      {
        title: "Interactive Study Planner",
        slug: "study-planner",
        description: "Personalized study timetable generator.",
      },
    ],
    caseStudyNote: {
      client: "Colleges & Schools Across Nagaland",
      headline: "Over 3,000+ Students Inspired",
      impact: "Conducted certified tech workshops at MGM College, NEISSR, CHSS, and MSME, with over 96% positive student rating.",
    },
  },

  {
    slug: "career-services",
    title: "Career Acceleration & Placement Mentorship",
    shortTitle: "Career Services",
    badge: "Placement & Mentorship",
    category: "Career & Placement",
    heroTagline: "1-on-1 mentorship to get you hired in tech.",
    heroDescription:
      "Learning to code is only half the journey. We help you polish your resume for ATS filters, practice realistic technical and HR mock interviews, clean up your GitHub projects, and connect directly with hiring partners.",
    metaTitle: "Tech Career Mentorship & Placement Support | instudia",
    metaDescription:
      "Get hired in tech with instudia Career Services in Dimapur, Nagaland. 1-on-1 interview preparation, ATS resume audits, portfolio reviews, and hiring partner pipelines.",
    keywords: [
      "Tech job placement Nagaland",
      "Career mentorship Dimapur",
      "ATS resume review Northeast India",
      "Mock interview preparation IT",
      "Developer portfolio audit",
      "Career change to tech Nagaland",
      "Software developer hiring Dimapur",
      "Job guidance for graduates Nagaland",
    ],
    stats: [
      { value: "98%", label: "Target Resume ATS Score" },
      { value: "1-on-1", label: "Direct Mentor Coaching" },
      { value: "Real", label: "Company Interview Questions" },
      { value: "Alumni", label: "Network & Peer Community" },
    ],
    problemsSolved: [
      {
        title: "Getting Ghosted by Recruiters",
        desc: "Submitting dozens of applications and getting zero replies because your resume gets dropped by automated ATS filters.",
      },
      {
        title: "Freezing in Technical Interviews",
        desc: "Struggling to explain your code, justify architecture decisions, or answer behavioral questions under pressure.",
      },
      {
        title: "Generic Tutorial Projects on GitHub",
        desc: "Portfolios filled with basic to-do apps that don't prove real problem-solving or engineering depth to senior hiring managers.",
      },
    ],
    capabilities: [
      {
        title: "ATS Resume & LinkedIn Makeover",
        badge: "Profile Optimization",
        description:
          "Rewriting your CV line by line with clear metrics and ATS-friendly formatting so recruiters actually read it.",
        deliverables: [
          "Quantifiable bullet points highlighting results",
          "Clean machine-readable ATS typography",
          "Job description keyword alignment",
          "LinkedIn headline and profile makeover",
        ],
      },
      {
        title: "Technical & Behavioral Mock Interviews",
        badge: "Interview Mastery",
        description:
          "Simulated 1-on-1 interviews with experienced software engineers to eliminate interview nerves.",
        deliverables: [
          "Live 45-minute coding or design challenge",
          "STAR-method behavioral interview practice",
          "Video recording with written feedback rubric",
          "Salary negotiation tips and offer review",
        ],
      },
      {
        title: "GitHub & Portfolio Project Review",
        badge: "Proof of Work",
        description:
          "Auditing your repositories so your portfolio proves clean code, clear README documentation, and working live links.",
        deliverables: [
          "README overhaul with diagrams & live links",
          "Git commit history and folder structure review",
          "Guidance on building 2 original flagship projects",
          "Cloud deployment on custom domains",
        ],
      },
      {
        title: "Job Search Strategy & Referrals",
        badge: "Placement",
        description:
          "Direct introductions to partner agencies and startups looking for talent, plus cold outreach templates that work.",
        deliverables: [
          "Curated partner company recommendations",
          "Cold email and LinkedIn outreach templates",
          "Job application tracking spreadsheet",
          "Weekly accountability check-ins until hired",
        ],
      },
    ],
    process: [
      {
        step: "01",
        title: "Career Diagnostic",
        description:
          "We review your background, current skills, target roles (remote or on-site), and salary expectations.",
        timeline: "Session 1",
      },
      {
        step: "02",
        title: "Resume & Portfolio Polish",
        description:
          "We rebuild your resume, optimize your LinkedIn, and review your GitHub repositories.",
        timeline: "Weeks 1–2",
      },
      {
        step: "03",
        title: "Mock Interviews",
        description:
          "We run realistic technical and behavioral interview simulations until you feel calm and confident.",
        timeline: "Week 3",
      },
      {
        step: "04",
        title: "Application & Offer Sprints",
        description:
          "We guide you through targeted job applications, recruiter outreach, and salary negotiations.",
        timeline: "Week 4+",
      },
    ],
    engagementModels: [
      {
        name: "Resume & LinkedIn Makeover",
        tag: "Best for Quick Profile Polishing",
        description: "Complete ATS-friendly rewrite of your resume and LinkedIn profile to start landing interview callbacks.",
        features: [
          "Line-by-line ATS resume rewrite",
          "LinkedIn headline and profile optimization",
          "Keyword targeting for specific roles",
          "3-day turnaround time",
        ],
        ctaText: "Overhaul My Resume",
      },
      {
        name: "Complete Career Sprint",
        tag: "Best for Active Job Seekers",
        badge: "Recommended",
        popular: true,
        description: "End-to-end placement mentorship: resume, GitHub portfolio audit, two 1-on-1 mock interviews, and recruiter outreach coaching.",
        features: [
          "Full resume and LinkedIn rewrite",
          "GitHub portfolio and README overhaul",
          "2 live 1-on-1 mock interviews with feedback",
          "Introductions to hiring partner network",
        ],
        ctaText: "Apply for Mentorship",
      },
      {
        name: "Technical Mock Interview",
        tag: "Best for Upcoming Interviews",
        description: "A focused 60-minute simulated technical interview session to practice right before a real scheduled interview.",
        features: [
          "Questions tailored to your upcoming role",
          "Live coding or system walkthrough",
          "Detailed scorecard with strengths and blindspots",
          "Same-day recording and notes",
        ],
        ctaText: "Book Mock Interview",
      },
    ],
    faqs: [
      {
        question: "Is this service only for instudia students?",
        answer:
          "No. While instudia students receive career coaching in their courses, our Career Acceleration Services are open to any graduate, self-taught developer, or career changer looking for direct help.",
      },
      {
        question: "Can you help me prepare for remote developer jobs?",
        answer:
          "Yes. We focus heavily on skills remote companies look for: clear written communication, clean git commit history, and confident live problem-solving.",
      },
      {
        question: "Who conducts the mock interviews?",
        answer:
          "Active software engineers and technical leads who interview candidates in real hiring loops. You get realistic questions and honest, constructive feedback.",
      },
    ],
    relatedCourses: [
      {
        title: "Fullstack Web Development",
        slug: "fullstack-web-development",
        description: "Build full-stack portfolio applications that impress technical hiring managers.",
      },
      {
        title: "UI/UX Designing",
        slug: "ui-ux-designing",
        description: "Create case studies and Figma prototypes ready for design team presentations.",
      },
    ],
    relatedTools: [
      {
        title: "ATS Resume Analyzer",
        slug: "ats-analyzer",
        description: "Scan your resume against technical job descriptions with instant ATS scoring.",
      },
      {
        title: "AI Resume Builder",
        slug: "resume-builder",
        description: "Clean, ATS-friendly markdown resume creator.",
      },
      {
        title: "Nagaland Tech Salary Insights",
        slug: "salary-insights",
        description: "Explore market pay rates and compensation tiers in Northeast India.",
      },
    ],
    caseStudyNote: {
      client: "Students & Career Switchers",
      headline: "Outcome-Driven Career Mentorship",
      impact: "Graduates working across top regional enterprises, software agencies, and remote startups with an average 60% boost in interview callback rates.",
    },
  },
];

export function getAllServices(): ServiceItem[] {
  return servicesData;
}

export function getServiceBySlug(slug: string): ServiceItem | undefined {
  return servicesData.find((s) => s.slug === slug);
}
