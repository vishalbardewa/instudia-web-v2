import { slugs } from "../routes";
import { AppConfig } from "./AppConfig";

const META_LOOKUP: Record<string, {
  title: string;
  description: string;
  openGraph: Record<string, any>;
  twitter: Record<string, any>;
  metadataBase: URL;
}> = {
  [slugs.PYTHON]: {
    title: "Python Programming Course in Dimapur | Instudia",
    description:
      "Master Python syntax, OOP & real-world projects in Dimapur. Beginner-friendly 1-month coding course in Nagaland. Join now!",
    openGraph: {
      title: "Python Programming Course in Dimapur | Instudia",
      description:
        "Master Python syntax, OOP & real-world projects in Dimapur with expert mentors at Instudia Nagaland.",
      url: `${AppConfig.canonicalBase}`,
      locale: AppConfig.locale,
      siteName: AppConfig.site_name,
      images: [
        {
          url: "https://res.cloudinary.com/dhwg77gwm/image/upload/f_auto,q_auto/v1/instudia/qzmdhewkbsyxmwsjccnu",
          width: 1200,
          height: 630,
          alt: "Learn Python at Instudia Dimapur",
          type: "image/png",
        },
      ],
    },
    twitter: {
      title: "Python Programming Course in Dimapur | Instudia",
      description:
        "Master Python programming in Dimapur. Hands-on coding course to build your tech career in Nagaland.",
      card: "summary_large_image",
    },
    metadataBase: new URL(AppConfig.canonicalBase),
  },
  [slugs.DCA]: {
    title: "DCA Computer Course in Dimapur, Nagaland | Instudia",
    description:
      "6-month DCA Diploma in Dimapur. Master MS Office, computer basics & Tally. ISO-certified training in Nagaland. Enroll today!",
    openGraph: {
      title: "DCA Diploma Course in Dimapur | Instudia",
      description:
        "6-month Diploma in Computer Applications at Instudia Dimapur. Master MS Office & digital fundamentals in Nagaland.",
      url: `${AppConfig.canonicalBase}`,
      locale: AppConfig.locale,
      siteName: AppConfig.site_name,
      images: [
        {
          url: "https://res.cloudinary.com/dhwg77gwm/image/upload/f_auto,q_auto/v1/instudia/qzmdhewkbsyxmwsjccnu",
          width: 1200,
          height: 630,
          alt: "DCA Computer Course at Instudia Dimapur",
          type: "image/png",
        },
      ],
    },
    twitter: {
      title: "DCA Computer Course in Dimapur | Instudia",
      description:
        "Elevate your computer skills with DCA in Dimapur. Practical training in computer applications in Nagaland.",
      card: "summary_large_image",
    },
    metadataBase: new URL(AppConfig.canonicalBase),
  },
  [slugs.PGDCA]: {
    title: "PGDCA Diploma Course in Dimapur, Nagaland | Instudia",
    description:
      "12-month PGDCA Diploma in Dimapur. Master advanced IT, database management & software. Government-recognised course in Nagaland.",
    openGraph: {
      title: "PGDCA Diploma Course in Dimapur | Instudia",
      description:
        "12-month Post Graduate Diploma in Computer Applications in Dimapur. Advance your IT career with Instudia Nagaland.",
      url: `${AppConfig.canonicalBase}`,
      locale: AppConfig.locale,
      siteName: AppConfig.site_name,
      images: [
        {
          url: "https://res.cloudinary.com/dhwg77gwm/image/upload/f_auto,q_auto/v1/instudia/qzmdhewkbsyxmwsjccnu",
          width: 1200,
          height: 630,
          alt: "PGDCA Course at Instudia Dimapur",
          type: "image/png",
        },
      ],
    },
    twitter: {
      title: "PGDCA Diploma Course in Dimapur | Instudia",
      description:
        "Take your IT skills to the next level with PGDCA. 12-month certified diploma for career success in Nagaland.",
      card: "summary_large_image",
    },
    metadataBase: new URL(AppConfig.canonicalBase),
  },
  [slugs.GRAPHIC_DESIGN]: {
    title: "Graphic Design Course in Dimapur, Nagaland | Instudia",
    description:
      "Master Photoshop, Illustrator & Canva in Dimapur. Build your creative design portfolio at Instudia Nagaland. Start today!",
    openGraph: {
      title: "Graphic Design Course in Dimapur | Instudia",
      description:
        "Professional Graphic Design training in Dimapur. Master Photoshop, Illustrator & brand design with expert mentors.",
      url: `${AppConfig.canonicalBase}`,
      locale: AppConfig.locale,
      siteName: AppConfig.site_name,
      images: [
        {
          url: "https://res.cloudinary.com/dhwg77gwm/image/upload/f_auto,q_auto/v1/instudia/qzmdhewkbsyxmwsjccnu",
          width: 1200,
          height: 630,
          alt: "Graphic Design Course at Instudia Dimapur",
          type: "image/png",
        },
      ],
    },
    twitter: {
      title: "Graphic Design Course in Dimapur | Instudia",
      description:
        "Learn Graphic Design in Dimapur. Industry-certified training to help you launch a creative career in Nagaland.",
      card: "summary_large_image",
    },
    metadataBase: new URL(AppConfig.canonicalBase),
  },
  [slugs.ADVANCED_EXCEL]: {
    title: "Advanced Excel Course in Dimapur, Nagaland | Instudia",
    description:
      "Master Excel pivot tables, VLOOKUP & data macros in Dimapur. Enhance your office productivity in Nagaland. Join today!",
    openGraph: {
      title: "Advanced Excel Course in Dimapur | Instudia",
      description:
        "Practical Advanced Excel training in Dimapur. Master data analytics, pivot tables & automation for work in Nagaland.",
      url: `${AppConfig.canonicalBase}`,
      locale: AppConfig.locale,
      siteName: AppConfig.site_name,
      images: [
        {
          url: "https://res.cloudinary.com/dhwg77gwm/image/upload/f_auto,q_auto/v1/instudia/qzmdhewkbsyxmwsjccnu",
          width: 1200,
          height: 630,
          alt: "Advanced Excel Course at Instudia Dimapur",
          type: "image/png",
        },
      ],
    },
    twitter: {
      title: "Advanced Excel Course in Dimapur | Instudia",
      description:
        "Master Advanced Excel in Dimapur. Enhance your data skills and boost your corporate employability in Nagaland.",
      card: "summary_large_image",
    },
    metadataBase: new URL(AppConfig.canonicalBase),
  },
  [slugs.FRONTEND]: {
    title: "Frontend React Course in Dimapur, Nagaland | Instudia",
    description:
      "Learn HTML, CSS, JavaScript & React in Dimapur. Build modern responsive web UIs at Instudia Nagaland. Enroll today!",
    openGraph: {
      title: "Frontend React Course in Dimapur | Instudia",
      description:
        "Comprehensive Frontend Web Development training in Dimapur. Master React & modern JavaScript for tech roles in Nagaland.",
      url: `${AppConfig.canonicalBase}`,
      locale: AppConfig.locale,
      siteName: AppConfig.site_name,
      images: [
        {
          url: "https://res.cloudinary.com/dhwg77gwm/image/upload/f_auto,q_auto/v1/instudia/qzmdhewkbsyxmwsjccnu",
          width: 1200,
          height: 630,
          alt: "Frontend React Course at Instudia Dimapur",
          type: "image/png",
        },
      ],
    },
    twitter: {
      title: "Frontend React Course in Dimapur | Instudia",
      description:
        "Master Frontend Web Development with React in Dimapur. Practical hands-on web design training in Nagaland.",
      card: "summary_large_image",
    },
    metadataBase: new URL(AppConfig.canonicalBase),
  },
  [slugs.BACKEND]: {
    title: "Backend Node.js Course in Dimapur, Nagaland | Instudia",
    description:
      "Master Node.js, Express & SQL database APIs in Dimapur. Industry-focused backend developer course in Nagaland.",
    openGraph: {
      title: "Backend Node.js Course in Dimapur | Instudia",
      description:
        "Professional Backend Development training in Dimapur. Build REST APIs & databases with expert guidance at Instudia.",
      url: `${AppConfig.canonicalBase}`,
      locale: AppConfig.locale,
      siteName: AppConfig.site_name,
      images: [
        {
          url: "https://res.cloudinary.com/dhwg77gwm/image/upload/f_auto,q_auto/v1/instudia/qzmdhewkbsyxmwsjccnu",
          width: 1200,
          height: 630,
          alt: "Backend Node.js Course at Instudia Dimapur",
          type: "image/png",
        },
      ],
    },
    twitter: {
      title: "Backend Node.js Course in Dimapur | Instudia",
      description:
        "Master server-side logic & databases in Dimapur. Build powerful backend services for modern apps in Nagaland.",
      card: "summary_large_image",
    },
    metadataBase: new URL(AppConfig.canonicalBase),
  },
  [slugs.FULLSTACK_WEB_DEVELOPMENT]: {
    title: "Fullstack Web Dev Course in Dimapur | Instudia",
    description:
      "Learn React, Node.js & databases in Dimapur. Build fullstack web apps with hands-on projects at Instudia Nagaland. Enroll now!",
    openGraph: {
      title: "Fullstack Web Dev Course in Dimapur | Instudia",
      description:
        "Complete Fullstack Web Development program in Dimapur. Master UI to backend server architecture with Instudia.",
      url: `${AppConfig.canonicalBase}`,
      locale: AppConfig.locale,
      siteName: AppConfig.site_name,
      images: [
        {
          url: "https://res.cloudinary.com/dhwg77gwm/image/upload/f_auto,q_auto/v1/instudia/qzmdhewkbsyxmwsjccnu",
          width: 1200,
          height: 630,
          alt: "Fullstack Web Development at Instudia Dimapur",
          type: "image/png",
        },
      ],
    },
    twitter: {
      title: "Fullstack Web Dev Course in Dimapur | Instudia",
      description:
        "Become a Fullstack Web Developer in Dimapur. Master frontend & backend engineering in Nagaland.",
      card: "summary_large_image",
    },
    metadataBase: new URL(AppConfig.canonicalBase),
  },
  [slugs.GST]: {
    title: "Tally with GST Course in Dimapur, Nagaland | Instudia",
    description:
      "Master Tally Prime & GST e-invoicing in Dimapur. Learn tax compliance and digital accounting with Instudia. Enroll today!",
    openGraph: {
      title: "Tally with GST Course in Dimapur | Instudia",
      description:
        "Tally Prime with GST training in Dimapur. Master digital accounting & GST returns for business roles in Nagaland.",
      url: `${AppConfig.canonicalBase}`,
      locale: AppConfig.locale,
      siteName: AppConfig.site_name,
      images: [
        {
          url: "https://res.cloudinary.com/dhwg77gwm/image/upload/f_auto,q_auto/v1/instudia/qzmdhewkbsyxmwsjccnu",
          width: 1200,
          height: 630,
          alt: "Tally with GST Course at Instudia Dimapur",
          type: "image/png",
        },
      ],
    },
    twitter: {
      title: "Tally with GST Course in Dimapur | Instudia",
      description:
        "Master Tally with GST in Dimapur. Practical accounting & tax filing skills for business careers in Nagaland.",
      card: "summary_large_image",
    },
    metadataBase: new URL(AppConfig.canonicalBase),
  },
  [slugs.TALLY]: {
    title: "Accounting with Tally Course in Dimapur | Instudia",
    description:
      "Learn digital bookkeeping & ledger management with Tally in Dimapur. Practical 1-month accounting course in Nagaland.",
    openGraph: {
      title: "Accounting with Tally Course in Dimapur | Instudia",
      description:
        "1-month Accounting with Tally training in Dimapur. Master financial entries & business reporting at Instudia Nagaland.",
      url: `${AppConfig.canonicalBase}`,
      locale: AppConfig.locale,
      siteName: AppConfig.site_name,
      images: [
        {
          url: "https://res.cloudinary.com/dhwg77gwm/image/upload/f_auto,q_auto/v1/instudia/qzmdhewkbsyxmwsjccnu",
          width: 1200,
          height: 630,
          alt: "Accounting with Tally at Instudia Dimapur",
          type: "image/png",
        },
      ],
    },
    twitter: {
      title: "Accounting with Tally Course in Dimapur | Instudia",
      description:
        "Master Tally in Dimapur. Gain practical bookkeeping skills to advance your finance career in Nagaland.",
      card: "summary_large_image",
    },
    metadataBase: new URL(AppConfig.canonicalBase),
  },
  [slugs.MOBILE_APP_DEVELOPMENT]: {
    title: "Mobile App Dev Course in Dimapur, Nagaland | Instudia",
    description:
      "Build iOS & Android apps with React Native in Dimapur. Learn mobile UI & native APIs at Instudia Nagaland. Join today!",
    openGraph: {
      title: "Mobile App Dev Course in Dimapur | Instudia",
      description:
        "Professional React Native mobile app development in Dimapur. Build & publish cross-platform apps in Nagaland.",
      url: `${AppConfig.canonicalBase}`,
      locale: AppConfig.locale,
      siteName: AppConfig.site_name,
      images: [
        {
          url: "https://res.cloudinary.com/dhwg77gwm/image/upload/f_auto,q_auto/v1/instudia/qzmdhewkbsyxmwsjccnu",
          width: 1200,
          height: 630,
          alt: "Mobile App Development at Instudia Dimapur",
          type: "image/png",
        },
      ],
    },
    twitter: {
      title: "Mobile App Dev Course in Dimapur | Instudia",
      description:
        "Master React Native in Dimapur. Build iOS & Android mobile applications with expert mentors in Nagaland.",
      card: "summary_large_image",
    },
    metadataBase: new URL(AppConfig.canonicalBase),
  },
  [slugs.UIUX_DESIGN]: {
    title: "UI/UX Design Course in Dimapur, Nagaland | Instudia",
    description:
      "Master Figma, wireframing & user research in Dimapur. Build intuitive mobile/web app prototypes at Instudia. Apply now!",
    openGraph: {
      title: "UI/UX Design Course in Dimapur | Instudia",
      description:
        "Professional UI/UX Design training in Dimapur. Master Figma, design systems & usability testing with Instudia Nagaland.",
      url: `${AppConfig.canonicalBase}`,
      locale: AppConfig.locale,
      siteName: AppConfig.site_name,
      images: [
        {
          url: "https://res.cloudinary.com/dhwg77gwm/image/upload/f_auto,q_auto/v1/instudia/qzmdhewkbsyxmwsjccnu",
          width: 1200,
          height: 630,
          alt: "UI/UX Design Course at Instudia Dimapur",
          type: "image/png",
        },
      ],
    },
    twitter: {
      title: "UI/UX Design Course in Dimapur | Instudia",
      description:
        "Master UI/UX Design in Dimapur. Create user-centered digital interfaces & launch your design career in Nagaland.",
      card: "summary_large_image",
    },
    metadataBase: new URL(AppConfig.canonicalBase),
  },
  [slugs.BUSINESS_INTELLIGENCE]: {
    title: "Power BI & BI Course in Dimapur, Nagaland | Instudia",
    description:
      "Create interactive dashboards & DAX analytics with Power BI in Dimapur. Boost corporate decision-making in Nagaland.",
    openGraph: {
      title: "Power BI & BI Course in Dimapur | Instudia",
      description:
        "Practical Power BI & Business Intelligence training in Dimapur. Learn data visualization & DAX modeling with Instudia.",
      url: `${AppConfig.canonicalBase}`,
      locale: AppConfig.locale,
      siteName: AppConfig.site_name,
      images: [
        {
          url: "https://res.cloudinary.com/dhwg77gwm/image/upload/f_auto,q_auto/v1/instudia/qzmdhewkbsyxmwsjccnu",
          width: 1200,
          height: 630,
          alt: "Power BI Course at Instudia Dimapur",
          type: "image/png",
        },
      ],
    },
    twitter: {
      title: "Power BI & BI Course in Dimapur | Instudia",
      description:
        "Master Power BI in Dimapur. Learn interactive dashboard reporting for data-driven decisions in Nagaland.",
      card: "summary_large_image",
    },
    metadataBase: new URL(AppConfig.canonicalBase),
  },
  [slugs.PROJECT_MANAGEMENT]: {
    title: "Project Management Course in Dimapur | Instudia",
    description:
      "Master Agile, Scrum & project lifecycle management in Dimapur. Prepare for leadership roles in Nagaland. Enroll today!",
    openGraph: {
      title: "Project Management Course in Dimapur | Instudia",
      description:
        "Agile & Scrum Project Management course in Dimapur. Learn sprint planning & team leadership with Instudia Nagaland.",
      url: `${AppConfig.canonicalBase}`,
      locale: AppConfig.locale,
      siteName: AppConfig.site_name,
      images: [
        {
          url: "https://res.cloudinary.com/dhwg77gwm/image/upload/f_auto,q_auto/v1/instudia/qzmdhewkbsyxmwsjccnu",
          width: 1200,
          height: 630,
          alt: "Project Management Course at Instudia Dimapur",
          type: "image/png",
        },
      ],
    },
    twitter: {
      title: "Project Management Course in Dimapur | Instudia",
      description:
        "Master Project Management in Dimapur. Gain Agile & Scrum skills to lead successful projects in Nagaland.",
      card: "summary_large_image",
    },
    metadataBase: new URL(AppConfig.canonicalBase),
  },
  [slugs.DEVOPS]: {
    title: "DevOps & Cloud Course in Dimapur, Nagaland | Instudia",
    description:
      "Learn Docker, Kubernetes, AWS & CI/CD pipelines in Dimapur. Practical cloud automation training at Instudia Nagaland.",
    openGraph: {
      title: "DevOps & Cloud Course in Dimapur | Instudia",
      description:
        "Hands-on DevOps & Cloud Services training in Dimapur. Learn Docker, Kubernetes & AWS with expert mentors.",
      url: `${AppConfig.canonicalBase}`,
      locale: AppConfig.locale,
      siteName: AppConfig.site_name,
      images: [
        {
          url: "https://res.cloudinary.com/dhwg77gwm/image/upload/f_auto,q_auto/v1/instudia/qzmdhewkbsyxmwsjccnu",
          width: 1200,
          height: 630,
          alt: "DevOps & Cloud Course at Instudia Dimapur",
          type: "image/png",
        },
      ],
    },
    twitter: {
      title: "DevOps & Cloud Course in Dimapur | Instudia",
      description:
        "Master DevOps in Dimapur. Learn CI/CD automation & cloud deployment to boost your IT career in Nagaland.",
      card: "summary_large_image",
    },
    metadataBase: new URL(AppConfig.canonicalBase),
  },
  [slugs.HARDWARE_NETWORKING]: {
    title: "Hardware & Networking Course in Dimapur | Instudia",
    description:
      "Computer assembly, hardware repair & network admin training in Dimapur. ISO-certified IT support course in Nagaland.",
    openGraph: {
      title: "Hardware & Networking Course in Dimapur | Instudia",
      description:
        "Practical Hardware & Computer Networking course in Dimapur. Prepare for technical IT support roles in Nagaland.",
      url: `${AppConfig.canonicalBase}`,
      locale: AppConfig.locale,
      siteName: AppConfig.site_name,
      images: [
        {
          url: "https://res.cloudinary.com/dhwg77gwm/image/upload/f_auto,q_auto/v1/instudia/qzmdhewkbsyxmwsjccnu",
          width: 1200,
          height: 630,
          alt: "Hardware & Networking at Instudia Dimapur",
          type: "image/png",
        },
      ],
    },
    twitter: {
      title: "Hardware & Networking Course in Dimapur | Instudia",
      description:
        "Master IT Hardware & Networking in Dimapur. Practical computer maintenance skills for jobs in Nagaland.",
      card: "summary_large_image",
    },
    metadataBase: new URL(AppConfig.canonicalBase),
  },
  [slugs.RETAIL_MANAGEMENT]: {
    title: "Retail Management Course in Dimapur, Nagaland | Instudia",
    description:
      "Master customer service, inventory & sales operations in Dimapur. Fast-track your retail career in Nagaland. Enroll now!",
    openGraph: {
      title: "Retail Management Course in Dimapur | Instudia",
      description:
        "Professional Retail Management program in Dimapur. Master retail store operations & customer handling in Nagaland.",
      url: `${AppConfig.canonicalBase}`,
      locale: AppConfig.locale,
      siteName: AppConfig.site_name,
      images: [
        {
          url: "https://res.cloudinary.com/dhwg77gwm/image/upload/f_auto,q_auto/v1/instudia/qzmdhewkbsyxmwsjccnu",
          width: 1200,
          height: 630,
          alt: "Retail Management Course at Instudia Dimapur",
          type: "image/png",
        },
      ],
    },
    twitter: {
      title: "Retail Management Course in Dimapur | Instudia",
      description:
        "Master Retail Management in Dimapur. Prepare for business and sales manager positions in Nagaland.",
      card: "summary_large_image",
    },
    metadataBase: new URL(AppConfig.canonicalBase),
  },
  [slugs.FOOD_PROCESSING]: {
    title: "Food Processing Course in Dimapur, Nagaland | Instudia",
    description:
      "Learn food preservation, safety standards & quality control in Dimapur. Skilled training for Nagaland's food sector.",
    openGraph: {
      title: "Food Processing Course in Dimapur | Instudia",
      description:
        "Practical Food Processing & Quality Control training in Dimapur. Learn packaging & food safety at Instudia Nagaland.",
      url: `${AppConfig.canonicalBase}`,
      locale: AppConfig.locale,
      siteName: AppConfig.site_name,
      images: [
        {
          url: "https://res.cloudinary.com/dhwg77gwm/image/upload/f_auto,q_auto/v1/instudia/qzmdhewkbsyxmwsjccnu",
          width: 1200,
          height: 630,
          alt: "Food Processing Course at Instudia Dimapur",
          type: "image/png",
        },
      ],
    },
    twitter: {
      title: "Food Processing Course in Dimapur | Instudia",
      description:
        "Master Food Processing skills in Dimapur. Quality preservation & safety standards training in Nagaland.",
      card: "summary_large_image",
    },
    metadataBase: new URL(AppConfig.canonicalBase),
  },
  [slugs.AGENTIC_AI]: {
    title: "Agentic AI Course in Dimapur, Nagaland | Instudia",
    description:
      "Build autonomous AI agents with LangGraph & CrewAI in Dimapur. Lead AI workflow automation in Nagaland. Apply today!",
    openGraph: {
      title: "Agentic AI Course in Dimapur | Instudia",
      description:
        "Advanced Agentic AI & Autonomous Workflows course in Dimapur. Build custom AI agent systems with Instudia Nagaland.",
      url: `${AppConfig.canonicalBase}`,
      locale: AppConfig.locale,
      siteName: AppConfig.site_name,
      images: [
        {
          url: "https://res.cloudinary.com/dhwg77gwm/image/upload/f_auto,q_auto/v1/instudia/qzmdhewkbsyxmwsjccnu",
          width: 1200,
          height: 630,
          alt: "Agentic AI Course at Instudia Dimapur",
          type: "image/png",
        },
      ],
    },
    twitter: {
      title: "Agentic AI Course in Dimapur | Instudia",
      description:
        "Build autonomous AI agents in Dimapur. Master LangGraph & CrewAI multi-agent development in Nagaland.",
      card: "summary_large_image",
    },
    metadataBase: new URL(AppConfig.canonicalBase),
  },
  [slugs.DATA_ANALYTICS]: {
    title: "Data Analytics Course in Dimapur, Nagaland | Instudia",
    description:
      "Master Python, SQL & Power BI in Dimapur. Transform raw data into business insights with Instudia Nagaland. Apply now!",
    openGraph: {
      title: "Data Analytics Course in Dimapur | Instudia",
      description:
        "Hands-on Data Analytics course in Dimapur. Master Python, SQL queries & Power BI dashboards in Nagaland.",
      url: `${AppConfig.canonicalBase}`,
      locale: AppConfig.locale,
      siteName: AppConfig.site_name,
      images: [
        {
          url: "https://res.cloudinary.com/dhwg77gwm/image/upload/f_auto,q_auto/v1/instudia/qzmdhewkbsyxmwsjccnu",
          width: 1200,
          height: 630,
          alt: "Data Analytics Course at Instudia Dimapur",
          type: "image/png",
        },
      ],
    },
    twitter: {
      title: "Data Analytics Course in Dimapur | Instudia",
      description:
        "Master Data Analytics in Dimapur. Practical data science & business intelligence training in Nagaland.",
      card: "summary_large_image",
    },
    metadataBase: new URL(AppConfig.canonicalBase),
  },
  [slugs.GENERATIVE_AI]: {
    title: "Generative AI Course in Dimapur, Nagaland | Instudia",
    description:
      "Master LLMs, prompt engineering & GPT apps in Dimapur. Build real-world GenAI projects with Instudia Nagaland.",
    openGraph: {
      title: "Generative AI Course in Dimapur | Instudia",
      description:
        "Practical Generative AI development training in Dimapur. Learn LLM fine-tuning, prompt design & AI chatbot creation.",
      url: `${AppConfig.canonicalBase}`,
      locale: AppConfig.locale,
      siteName: AppConfig.site_name,
      images: [
        {
          url: "https://res.cloudinary.com/dhwg77gwm/image/upload/f_auto,q_auto/v1/instudia/qzmdhewkbsyxmwsjccnu",
          width: 1200,
          height: 630,
          alt: "Generative AI Course at Instudia Dimapur",
          type: "image/png",
        },
      ],
    },
    twitter: {
      title: "Generative AI Course in Dimapur | Instudia",
      description:
        "Master Generative AI in Dimapur. Learn to build GPT apps & AI automation workflows in Nagaland.",
      card: "summary_large_image",
    },
    metadataBase: new URL(AppConfig.canonicalBase),
  },
  [slugs.PCA]: {
    title: "PCA Computer Course in Dimapur, Nagaland | Instudia",
    description:
      "Professional Computer Application certificate in Dimapur. Build core computer skills for office careers in Nagaland.",
    openGraph: {
      title: "PCA Computer Course in Dimapur | Instudia",
      description:
        "Certificate in Professional Computer Applications in Dimapur. Build practical office IT skills with Instudia.",
      url: `${AppConfig.canonicalBase}`,
      locale: AppConfig.locale,
      siteName: AppConfig.site_name,
      images: [
        {
          url: "https://res.cloudinary.com/dhwg77gwm/image/upload/f_auto,q_auto/v1/instudia/qzmdhewkbsyxmwsjccnu",
          width: 1200,
          height: 630,
          alt: "PCA Computer Course at Instudia Dimapur",
          type: "image/png",
        },
      ],
    },
    twitter: {
      title: "PCA Computer Course in Dimapur | Instudia",
      description:
        "Master computer applications with the PCA certificate at Instudia Dimapur. Build your IT skills in Nagaland.",
      card: "summary_large_image",
    },
    metadataBase: new URL(AppConfig.canonicalBase),
  },
};

export default META_LOOKUP;
