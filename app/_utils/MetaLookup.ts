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
    title: "Python Programming Course in Dimapur, Nagaland",
    description:
      "Learn Python programming in 1 month at instudia Dimapur. Master variables, functions, OOP & real-world projects with hands-on training. Build your tech career in Nagaland. Enroll now!",
    openGraph: {
      title: "Python Programming Course in Dimapur | instudia",
      description:
        "1-month Python course in Dimapur. Master programming fundamentals and real-world projects with industry-certified experts at instudia, Nagaland.",
      url: `${AppConfig.canonicalBase}`,
      locale: AppConfig.locale,
      siteName: AppConfig.site_name,
      images: [
        {
          url: "https://res.cloudinary.com/dhwg77gwm/image/upload/f_auto,q_auto/v1/instudia/qzmdhewkbsyxmwsjccnu",
          width: 1200,
          height: 630,
          alt: "Learn Python with instudia",
          type: "image/png",
        },
      ],
    },
    twitter: {
      title: "Python Programming Course in Dimapur | instudia",
      description:
        "Master Python programming in Dimapur. Industry-focused training to help you build a successful tech career in Nagaland.",
      card: "https://res.cloudinary.com/dhwg77gwm/image/upload/f_auto,q_auto/v1/instudia/tqo7qzztc4duzktj0jt9",
    },
    metadataBase: new URL("https://instudianagaland.com"),
  },
  [slugs.DCA]: {
    title: "DCA Course in Dimapur, Nagaland — Diploma in Computer Applications",
    description:
      "Enroll in the 6-month DCA Diploma at instudia Dimapur. Learn MS Office, internet skills & computer fundamentals. ISO-certified training institute in Nagaland. Join now!",
    openGraph: {
      title: "DCA Diploma Course in Dimapur | instudia",
      description:
        "6-month Diploma in Computer Applications at instudia Dimapur. Master MS Office, internet basics & essential computer skills in Nagaland.",
      url: `${AppConfig.canonicalBase}`,
      locale: AppConfig.locale,
      siteName: AppConfig.site_name,
      images: [
        {
          url: "https://res.cloudinary.com/dhwg77gwm/image/upload/f_auto,q_auto/v1/instudia/qzmdhewkbsyxmwsjccnu",
          width: 1200,
          height: 630,
          alt: "DCA Course at instudia",
          type: "image/png",
        },
      ],
    },
    twitter: {
      title: "DCA Diploma Course in Dimapur | instudia",
      description:
        "Elevate your career with DCA in Dimapur. Practical training in computer applications to unlock new job opportunities in Nagaland.",
      card: "https://res.cloudinary.com/dhwg77gwm/image/upload/f_auto,q_auto/v1/instudia/qzmdhewkbsyxmwsjccnu",
    },
    metadataBase: new URL("https://instudianagaland.com"),
  },
  [slugs.PGDCA]: {
    title: "PGDCA Course in Dimapur, Nagaland — Post Graduate Diploma",
    description:
      "Join the 12-month PGDCA at instudia Dimapur. Master advanced IT concepts, software management & databases. Government-recognised diploma for career growth. Enroll today!",
    openGraph: {
      title: "PGDCA Course in Dimapur | instudia",
      description:
        "12-month Post Graduate Diploma in Computer Applications at instudia Dimapur. Advance your IT career in Nagaland with certified training.",
      url: `${AppConfig.canonicalBase}`,
      locale: AppConfig.locale,
      siteName: AppConfig.site_name,
      images: [
        {
          url: "https://res.cloudinary.com/dhwg77gwm/image/upload/f_auto,q_auto/v1/instudia/qzmdhewkbsyxmwsjccnu",
          width: 1200,
          height: 630,
          alt: "PGDCA Course at instudia",
          type: "image/png",
        },
      ],
    },
    twitter: {
      title: "PGDCA Course in Dimapur | instudia",
      description:
        "Take your IT skills to the next level with PGDCA. 12-month certified training for career success in Nagaland.",
      card: "https://res.cloudinary.com/dhwg77gwm/image/upload/f_auto,q_auto/v1/instudia/qzmdhewkbsyxmwsjccnu",
    },
    metadataBase: new URL("https://instudianagaland.com"),
  },
  [slugs.GRAPHIC_DESIGN]: {
    title: "Graphic Design Course in Dimapur, Nagaland | instudia",
    description:
      "Master Graphic Design in 6 months at instudia Dimapur. Learn Photoshop, Illustrator & Canva. Build a creative portfolio and launch your design career in Nagaland. Enroll now!",
    openGraph: {
      title: "Graphic Design Course in Dimapur | instudia",
      description:
        "6-month Graphic Design training in Dimapur. Master Photoshop, Illustrator & brand design with expert mentors at instudia, Nagaland.",
      url: `${AppConfig.canonicalBase}`,
      locale: AppConfig.locale,
      siteName: AppConfig.site_name,
      images: [
        {
          url: "https://res.cloudinary.com/dhwg77gwm/image/upload/f_auto,q_auto/v1/instudia/qzmdhewkbsyxmwsjccnu",
          width: 1200,
          height: 630,
          alt: "Graphic Design at instudia",
          type: "image/png",
        },
      ],
    },
    twitter: {
      title: "Graphic Design Course in Dimapur | instudia",
      description:
        "Learn Graphic Design in Dimapur. 6-month industry-certified training to help you launch a creative career in Nagaland.",
      card: "https://res.cloudinary.com/dhwg77gwm/image/upload/f_auto,q_auto/v1/instudia/qzmdhewkbsyxmwsjccnu",
    },
    metadataBase: new URL("https://instudianagaland.com"),
  },
  [slugs.ADVANCED_EXCEL]: {
    title: "Advanced Excel Course in Dimapur, Nagaland | instudia",
    description:
      "Master Advanced Excel in 3 months at instudia Dimapur. Learn pivot tables, data analysis & macros. Boost your finance or business career in Nagaland. Enroll now!",
    openGraph: {
      title: "Advanced Excel Course in Dimapur | instudia",
      description:
        "3-month Advanced Excel training in Dimapur. Master data management, pivot tables & automation for modern professionals in Nagaland.",
      url: `${AppConfig.canonicalBase}`,
      locale: AppConfig.locale,
      siteName: AppConfig.site_name,
      images: [
        {
          url: "https://res.cloudinary.com/dhwg77gwm/image/upload/f_auto,q_auto/v1/instudia/qzmdhewkbsyxmwsjccnu",
          width: 1200,
          height: 630,
          alt: "Advanced Excel at instudia",
          type: "image/png",
        },
      ],
    },
    twitter: {
      title: "Advanced Excel Course in Dimapur | instudia",
      description:
        "Master Advanced Excel in Dimapur in 3 months. Enhance your data skills and boost your employability in Nagaland.",
      card: "https://res.cloudinary.com/dhwg77gwm/image/upload/f_auto,q_auto/v1/instudia/qzmdhewkbsyxmwsjccnu",
    },
    metadataBase: new URL("https://instudianagaland.com"),
  },
  [slugs.FRONTEND]: {
    title: "Frontend Development Course in Dimapur, Nagaland | instudia",
    description:
      "Learn Frontend Development with React in 6 months at instudia Dimapur. Master HTML, CSS, JavaScript & React to build responsive web apps. Enroll at Nagaland's top institute!",
    openGraph: {
      title: "Frontend Development Course in Dimapur | instudia",
      description:
        "6-month Frontend Development training in Dimapur. Master React, JavaScript & modern web frameworks for high-paying tech roles in Nagaland.",
      url: `${AppConfig.canonicalBase}`,
      locale: AppConfig.locale,
      siteName: AppConfig.site_name,
      images: [
        {
          url: "https://res.cloudinary.com/dhwg77gwm/image/upload/f_auto,q_auto/v1/instudia/qzmdhewkbsyxmwsjccnu",
          width: 1200,
          height: 630,
          alt: "Frontend React Course at instudia",
          type: "image/png",
        },
      ],
    },
    twitter: {
      title: "Frontend Development Course in Dimapur | instudia",
      description:
        "Master Frontend Development with React in Dimapur. 6 months of hands-on training for modern web development careers in Nagaland.",
      card: "https://res.cloudinary.com/dhwg77gwm/image/upload/f_auto,q_auto/v1/instudia/qzmdhewkbsyxmwsjccnu",
    },
    metadataBase: new URL("https://instudianagaland.com"),
  },
  [slugs.BACKEND]: {
    title: "Backend Development Course in Dimapur, Nagaland | instudia",
    description:
      "Master Backend Development with Node.js & SQL in 6 months at instudia Dimapur. Build APIs, databases & scalable server-side apps. Join Nagaland's top tech institute!",
    openGraph: {
      title: "Backend Development Course in Dimapur | instudia",
      description:
        "6-month Backend Development training in Dimapur. Master Node.js, databases & REST APIs with industry-certified experts at instudia.",
      url: `${AppConfig.canonicalBase}`,
      locale: AppConfig.locale,
      siteName: AppConfig.site_name,
      images: [
        {
          url: "https://res.cloudinary.com/dhwg77gwm/image/upload/f_auto,q_auto/v1/instudia/qzmdhewkbsyxmwsjccnu",
          width: 1200,
          height: 630,
          alt: "Backend Course at instudia",
          type: "image/png",
        },
      ],
    },
    twitter: {
      title: "Backend Development Course in Dimapur | instudia",
      description:
        "Master server-side logic & database management in Dimapur in 6 months. Build powerful backends for modern web applications in Nagaland.",
      card: "https://res.cloudinary.com/dhwg77gwm/image/upload/f_auto,q_auto/v1/instudia/qzmdhewkbsyxmwsjccnu",
    },
    metadataBase: new URL("https://instudianagaland.com"),
  },
  [slugs.FULLSTACK_WEB_DEVELOPMENT]: {
    title: "Fullstack Web Development Course in Dimapur, Nagaland | instudia",
    description:
      "Become a Fullstack Developer in Dimapur with instudia. Learn frontend & backend in 6 months with React, Node.js & databases. Production-ready skills for Nagaland's job market!",
    openGraph: {
      title: "Fullstack Web Development Course in Dimapur | instudia",
      description:
        "6-month Fullstack Development training in Dimapur. Master the entire web stack from UI to database with expert guidance at instudia.",
      url: `${AppConfig.canonicalBase}`,
      locale: AppConfig.locale,
      siteName: AppConfig.site_name,
      images: [
        {
          url: "https://res.cloudinary.com/dhwg77gwm/image/upload/f_auto,q_auto/v1/instudia/qzmdhewkbsyxmwsjccnu",
          width: 1200,
          height: 630,
          alt: "Fullstack Course at instudia",
          type: "image/png",
        },
      ],
    },
    twitter: {
      title: "Fullstack Web Development Course in Dimapur | instudia",
      description:
        "Become a Fullstack Developer in Dimapur in 6 months. Master frontend & backend development and launch your tech career in Nagaland.",
      card: "https://res.cloudinary.com/dhwg77gwm/image/upload/f_auto,q_auto/v1/instudia/qzmdhewkbsyxmwsjccnu",
    },
    metadataBase: new URL("https://instudianagaland.com"),
  },
  [slugs.GST]: {
    title: "Tally with GST Course in Dimapur, Nagaland | instudia",
    description:
      "Master Tally Prime with GST in 3 months at instudia Dimapur. Learn GST invoicing, returns & accounting compliance. Essential for finance roles in Nagaland. Enroll now!",
    openGraph: {
      title: "Tally with GST Course in Dimapur | instudia",
      description:
        "3-month Tally with GST training in Dimapur. Master digital accounting and tax compliance for modern business roles in Nagaland.",
      url: `${AppConfig.canonicalBase}`,
      locale: AppConfig.locale,
      siteName: AppConfig.site_name,
      images: [
        {
          url: "https://res.cloudinary.com/dhwg77gwm/image/upload/f_auto,q_auto/v1/instudia/qzmdhewkbsyxmwsjccnu",
          width: 1200,
          height: 630,
          alt: "Tally GST Course at instudia",
          type: "image/png",
        },
      ],
    },
    twitter: {
      title: "Tally with GST Course in Dimapur | instudia",
      description:
        "Master Tally with GST in Dimapur in 3 months. Gain essential accounting & tax skills to boost your financial career in Nagaland.",
      card: "https://res.cloudinary.com/dhwg77gwm/image/upload/f_auto,q_auto/v1/instudia/qzmdhewkbsyxmwsjccnu",
    },
    metadataBase: new URL("https://instudianagaland.com"),
  },
  [slugs.TALLY]: {
    title: "Accounting with Tally Course in Dimapur, Nagaland | instudia",
    description:
      "Master Tally accounting in 1 month at instudia Dimapur. Learn ledger creation, inventory & financial reporting. Industry-certified training for business roles in Nagaland!",
    openGraph: {
      title: "Accounting with Tally Course in Dimapur | instudia",
      description:
        "1-month Accounting with Tally training in Dimapur. Master financial management and digital accounting for modern business in Nagaland.",
      url: `${AppConfig.canonicalBase}`,
      locale: AppConfig.locale,
      siteName: AppConfig.site_name,
      images: [
        {
          url: "https://res.cloudinary.com/dhwg77gwm/image/upload/f_auto,q_auto/v1/instudia/qzmdhewkbsyxmwsjccnu",
          width: 1200,
          height: 630,
          alt: "Tally Course at instudia",
          type: "image/png",
        },
      ],
    },
    twitter: {
      title: "Accounting with Tally Course in Dimapur | instudia",
      description:
        "Master Tally in Dimapur in 1 month. Gain practical accounting skills to advance your financial career in Nagaland.",
      card: "https://res.cloudinary.com/dhwg77gwm/image/upload/f_auto,q_auto/v1/instudia/qzmdhewkbsyxmwsjccnu",
    },
    metadataBase: new URL("https://instudianagaland.com"),
  },
  [slugs.MOBILE_APP_DEVELOPMENT]: {
    title: "Mobile App Development Course in Dimapur, Nagaland | instudia",
    description:
      "Build iOS & Android apps with React Native at instudia Dimapur. Learn mobile UI, native APIs & app deployment. Launch your app development career in Nagaland. Enroll now!",
    openGraph: {
      title: "Mobile App Development Course in Dimapur | instudia",
      description:
        "Professional React Native training in Dimapur. Build and deploy cross-platform mobile apps for the modern app economy in Nagaland.",
      url: `${AppConfig.canonicalBase}`,
      locale: AppConfig.locale,
      siteName: AppConfig.site_name,
      images: [
        {
          url: "https://res.cloudinary.com/dhwg77gwm/image/upload/f_auto,q_auto/v1/instudia/qzmdhewkbsyxmwsjccnu",
          width: 1200,
          height: 630,
          alt: "React Native Course at instudia",
          type: "image/png",
        },
      ],
    },
    twitter: {
      title: "Mobile App Development Course in Dimapur | instudia",
      description:
        "Master React Native in Dimapur. Build and deploy mobile apps for iOS and Android with expert guidance in Nagaland.",
      card: "https://res.cloudinary.com/dhwg77gwm/image/upload/f_auto,q_auto/v1/instudia/qzmdhewkbsyxmwsjccnu",
    },
    metadataBase: new URL("https://instudianagaland.com"),
  },
  [slugs.UIUX_DESIGN]: {
    title: "UI/UX Design Course in Dimapur, Nagaland | instudia",
    description:
      "Master UI/UX Design in 1 month at instudia Dimapur. Learn Figma, wireframing, user research & prototyping. Build a stunning portfolio and launch your design career in Nagaland!",
    openGraph: {
      title: "UI/UX Design Course in Dimapur | instudia",
      description:
        "Professional UI/UX design training in Dimapur. Master Figma, design thinking & user research with expert mentors at instudia Nagaland.",
      url: `${AppConfig.canonicalBase}`,
      locale: AppConfig.locale,
      siteName: AppConfig.site_name,
      images: [
        {
          url: "https://res.cloudinary.com/dhwg77gwm/image/upload/f_auto,q_auto/v1/instudia/qzmdhewkbsyxmwsjccnu",
          width: 1200,
          height: 630,
          alt: "UI/UX Design at instudia",
          type: "image/png",
        },
      ],
    },
    twitter: {
      title: "UI/UX Design Course in Dimapur | instudia",
      description:
        "Master UI/UX Design in Dimapur. Learn to create intuitive digital experiences and launch your design career in Nagaland.",
      card: "https://res.cloudinary.com/dhwg77gwm/image/upload/f_auto,q_auto/v1/instudia/qzmdhewkbsyxmwsjccnu",
    },
    metadataBase: new URL("https://instudianagaland.com"),
  },
  [slugs.BUSINESS_INTELLIGENCE]: {
    title: "Business Intelligence with Power BI Course in Dimapur, Nagaland | instudia",
    description:
      "Master Power BI & Business Intelligence in 1 month at instudia Dimapur. Learn dashboards, DAX & data modeling. Transform data into decisions for corporate roles in Nagaland!",
    openGraph: {
      title: "Business Intelligence with Power BI in Dimapur | instudia",
      description:
        "1-month Power BI & BI training in Dimapur. Master data analytics and interactive dashboards for informed business decision-making in Nagaland.",
      url: `${AppConfig.canonicalBase}`,
      locale: AppConfig.locale,
      siteName: AppConfig.site_name,
      images: [
        {
          url: "https://res.cloudinary.com/dhwg77gwm/image/upload/f_auto,q_auto/v1/instudia/qzmdhewkbsyxmwsjccnu",
          width: 1200,
          height: 630,
          alt: "PowerBI Course at instudia",
          type: "image/png",
        },
      ],
    },
    twitter: {
      title: "Business Intelligence with Power BI in Dimapur | instudia",
      description:
        "Master Power BI in Dimapur. Learn to visualize data and drive business growth with our industry-certified BI course in Nagaland.",
      card: "https://res.cloudinary.com/dhwg77gwm/image/upload/f_auto,q_auto/v1/instudia/qzmdhewkbsyxmwsjccnu",
    },
    metadataBase: new URL("https://instudianagaland.com"),
  },
  [slugs.PROJECT_MANAGEMENT]: {
    title: "Project Management Course in Dimapur, Nagaland | instudia",
    description:
      "Master Agile & Scrum Project Management in 6 months at instudia Dimapur. Learn planning, risk management & team leadership. Advance your corporate career in Nagaland. Enroll!",
    openGraph: {
      title: "Project Management Course in Dimapur | instudia",
      description:
        "6-month Project Management training in Dimapur. Master Agile, Scrum & project lifecycle for leadership roles in Nagaland.",
      url: `${AppConfig.canonicalBase}`,
      locale: AppConfig.locale,
      siteName: AppConfig.site_name,
      images: [
        {
          url: "https://res.cloudinary.com/dhwg77gwm/image/upload/f_auto,q_auto/v1/instudia/qzmdhewkbsyxmwsjccnu",
          width: 1200,
          height: 630,
          alt: "Project Management at instudia",
          type: "image/png",
        },
      ],
    },
    twitter: {
      title: "Project Management Course in Dimapur | instudia",
      description:
        "Master Project Management in Dimapur. Gain Agile & Scrum skills to plan, execute & deliver successful projects in Nagaland.",
      card: "https://res.cloudinary.com/dhwg77gwm/image/upload/f_auto,q_auto/v1/instudia/qzmdhewkbsyxmwsjccnu",
    },
    metadataBase: new URL("https://instudianagaland.com"),
  },
  [slugs.DEVOPS]: {
    title: "DevOps & Cloud Services Course in Dimapur, Nagaland | instudia",
    description:
      "Master DevOps with Docker, Kubernetes & AWS in 6 months at instudia Dimapur. Learn CI/CD, cloud infrastructure & automation. Fast-track your tech career in Nagaland. Enroll!",
    openGraph: {
      title: "DevOps & Cloud Services Course in Dimapur | instudia",
      description:
        "6-month DevOps training in Dimapur. Master Docker, Kubernetes, AWS & CI/CD pipelines with expert guidance at instudia Nagaland.",
      url: `${AppConfig.canonicalBase}`,
      locale: AppConfig.locale,
      siteName: AppConfig.site_name,
      images: [
        {
          url: "https://res.cloudinary.com/dhwg77gwm/image/upload/f_auto,q_auto/v1/instudia/qzmdhewkbsyxmwsjccnu",
          width: 1200,
          height: 630,
          alt: "DevOps Course at instudia",
          type: "image/png",
        },
      ],
    },
    twitter: {
      title: "DevOps & Cloud Services Course in Dimapur | instudia",
      description:
        "Master DevOps in Dimapur in 6 months. Learn cloud automation & CI/CD to accelerate your tech career in Nagaland.",
      card: "https://res.cloudinary.com/dhwg77gwm/image/upload/f_auto,q_auto/v1/instudia/qzmdhewkbsyxmwsjccnu",
    },
    metadataBase: new URL("https://instudianagaland.com"),
  },
  [slugs.HARDWARE_NETWORKING]: {
    title: "Hardware & Networking Course in Dimapur, Nagaland | instudia",
    description:
      "Master Hardware & Networking at instudia Dimapur. Learn computer assembly, troubleshooting & network admin. Industry-certified training for IT support roles in Nagaland. Join!",
    openGraph: {
      title: "Hardware & Networking Course in Dimapur | instudia",
      description:
        "Comprehensive Hardware and Networking training in Dimapur. Master IT infrastructure fundamentals for technical support roles in Nagaland.",
      url: `${AppConfig.canonicalBase}`,
      locale: AppConfig.locale,
      siteName: AppConfig.site_name,
      images: [
        {
          url: "https://res.cloudinary.com/dhwg77gwm/image/upload/f_auto,q_auto/v1/instudia/qzmdhewkbsyxmwsjccnu",
          width: 1200,
          height: 630,
          alt: "Hardware & Networking at instudia",
          type: "image/png",
        },
      ],
    },
    twitter: {
      title: "Hardware & Networking Course in Dimapur | instudia",
      description:
        "Master IT Hardware and Networking in Dimapur. Gain practical skills for technical support and infrastructure roles in Nagaland.",
      card: "https://res.cloudinary.com/dhwg77gwm/image/upload/f_auto,q_auto/v1/instudia/qzmdhewkbsyxmwsjccnu",
    },
    metadataBase: new URL("https://instudianagaland.com"),
  },
  [slugs.RETAIL_MANAGEMENT]: {
    title: "Retail Management Course in Dimapur, Nagaland | instudia",
    description:
      "Master Retail Management at instudia Dimapur. Learn customer service, inventory & sales strategies. Build a career in Nagaland's fast-growing retail sector. Enroll today!",
    openGraph: {
      title: "Retail Management Course in Dimapur | instudia",
      description:
        "Professional Retail Management training in Dimapur. Master retail operations, sales & customer service for modern business roles in Nagaland.",
      url: `${AppConfig.canonicalBase}`,
      locale: AppConfig.locale,
      siteName: AppConfig.site_name,
      images: [
        {
          url: "https://res.cloudinary.com/dhwg77gwm/image/upload/f_auto,q_auto/v1/instudia/qzmdhewkbsyxmwsjccnu",
          width: 1200,
          height: 630,
          alt: "Retail Management at instudia",
          type: "image/png",
        },
      ],
    },
    twitter: {
      title: "Retail Management Course in Dimapur | instudia",
      description:
        "Master Retail Management in Dimapur. Prepare for a successful career in the growing retail sector of Nagaland.",
      card: "https://res.cloudinary.com/dhwg77gwm/image/upload/f_auto,q_auto/v1/instudia/qzmdhewkbsyxmwsjccnu",
    },
    metadataBase: new URL("https://instudianagaland.com"),
  },
  [slugs.FOOD_PROCESSING]: {
    title: "Food Processing Course in Dimapur, Nagaland | instudia",
    description:
      "Learn Food Processing & preservation techniques at instudia Dimapur. Master quality control, food safety & production standards. Build your career in Nagaland's food industry!",
    openGraph: {
      title: "Food Processing Course in Dimapur | instudia",
      description:
        "Specialized Food Processing training in Dimapur. Master food preservation, safety standards & production skills in Nagaland.",
      url: `${AppConfig.canonicalBase}`,
      locale: AppConfig.locale,
      siteName: AppConfig.site_name,
      images: [
        {
          url: "https://res.cloudinary.com/dhwg77gwm/image/upload/f_auto,q_auto/v1/instudia/qzmdhewkbsyxmwsjccnu",
          width: 1200,
          height: 630,
          alt: "Food Processing at instudia",
          type: "image/png",
        },
      ],
    },
    twitter: {
      title: "Food Processing Course in Dimapur | instudia",
      description:
        "Master Food Processing in Dimapur. Gain practical skills for the food science and production industry in Nagaland.",
      card: "https://res.cloudinary.com/dhwg77gwm/image/upload/f_auto,q_auto/v1/instudia/qzmdhewkbsyxmwsjccnu",
    },
    metadataBase: new URL("https://instudianagaland.com"),
  },
  [slugs.AGENTIC_AI]: {
    title: "Agentic AI & Autonomous Workflows Course in Dimapur, Nagaland | instudia",
    description:
      "Master Agentic AI with LangGraph & CrewAI at instudia Dimapur. Build autonomous AI agents, multi-agent systems & real-world workflows. Lead the AI revolution in Nagaland!",
    openGraph: {
      title: "Agentic AI Course in Dimapur | instudia",
      description:
        "Advanced AI Agents training in Dimapur. Master LangGraph, CrewAI & autonomous workflow design with industry experts at instudia Nagaland.",
      url: `${AppConfig.canonicalBase}`,
      locale: AppConfig.locale,
      siteName: AppConfig.site_name,
      images: [
        {
          url: "https://res.cloudinary.com/dhwg77gwm/image/upload/f_auto,q_auto/v1/instudia/qzmdhewkbsyxmwsjccnu",
          width: 1200,
          height: 630,
          alt: "Agentic AI Course at instudia",
          type: "image/png",
        },
      ],
    },
    twitter: {
      title: "Agentic AI Course in Dimapur | instudia",
      description:
        "Learn to build autonomous AI agents in Dimapur. Master the next frontier of AI development and automation in Nagaland.",
      card: "https://res.cloudinary.com/dhwg77gwm/image/upload/f_auto,q_auto/v1/instudia/qzmdhewkbsyxmwsjccnu",
    },
    metadataBase: new URL("https://instudianagaland.com"),
  },
  // Note: data-analytics and generative-ai use numeric slugs from routes.ts
  [slugs.DATA_ANALYTICS]: {
    title: "Data Analytics Course in Dimapur, Nagaland | instudia",
    description:
      "Master Data Analytics with Python, SQL & Power BI in 6 months at instudia Dimapur. Analyse real datasets, build dashboards & launch your analytics career in Nagaland!",
    openGraph: {
      title: "Data Analytics Course in Dimapur | instudia",
      description:
        "6-month Data Analytics training in Dimapur. Master Python, SQL & Tableau to transform raw data into business insights in Nagaland.",
      url: `${AppConfig.canonicalBase}`,
      locale: AppConfig.locale,
      siteName: AppConfig.site_name,
      images: [
        {
          url: "https://res.cloudinary.com/dhwg77gwm/image/upload/f_auto,q_auto/v1/instudia/qzmdhewkbsyxmwsjccnu",
          width: 1200,
          height: 630,
          alt: "Data Analytics Course at instudia",
          type: "image/png",
        },
      ],
    },
    twitter: {
      title: "Data Analytics Course in Dimapur | instudia",
      description:
        "Master Data Analytics in Dimapur in 6 months. Learn Python, SQL & visualisation tools to drive data-driven decisions in Nagaland.",
      card: "https://res.cloudinary.com/dhwg77gwm/image/upload/f_auto,q_auto/v1/instudia/qzmdhewkbsyxmwsjccnu",
    },
    metadataBase: new URL("https://instudianagaland.com"),
  },
  [slugs.GENERATIVE_AI]: {
    title: "Generative AI Course in Dimapur, Nagaland | instudia",
    description:
      "Master Generative AI with GPT, LLMs & diffusion models at instudia Dimapur. Build real-world GenAI apps in 5 months. Join Nagaland's most in-demand AI course — Enroll now!",
    openGraph: {
      title: "Generative AI Course in Dimapur | instudia",
      description:
        "5-month Generative AI training in Dimapur. Master LLMs, prompt engineering & AI app development with expert mentors at instudia Nagaland.",
      url: `${AppConfig.canonicalBase}`,
      locale: AppConfig.locale,
      siteName: AppConfig.site_name,
      images: [
        {
          url: "https://res.cloudinary.com/dhwg77gwm/image/upload/f_auto,q_auto/v1/instudia/qzmdhewkbsyxmwsjccnu",
          width: 1200,
          height: 630,
          alt: "Generative AI Course at instudia",
          type: "image/png",
        },
      ],
    },
    twitter: {
      title: "Generative AI Course in Dimapur | instudia",
      description:
        "Master Generative AI in Dimapur. Learn to build GPT apps, AI chatbots & content systems for the future of technology in Nagaland.",
      card: "https://res.cloudinary.com/dhwg77gwm/image/upload/f_auto,q_auto/v1/instudia/qzmdhewkbsyxmwsjccnu",
    },
    metadataBase: new URL("https://instudianagaland.com"),
  },
  [slugs.PCA]: {
    title: "PCA Course in Dimapur, Nagaland | instudia",
    description:
      "Enroll in the PCA Certificate program at instudia Dimapur. Build foundational computer application skills with hands-on training. Kickstart your IT career in Nagaland today!",
    openGraph: {
      title: "PCA Course in Dimapur | instudia",
      description:
        "PCA Certificate training in Dimapur. Build essential computer application skills for career success in Nagaland with instudia.",
      url: `${AppConfig.canonicalBase}`,
      locale: AppConfig.locale,
      siteName: AppConfig.site_name,
      images: [
        {
          url: "https://res.cloudinary.com/dhwg77gwm/image/upload/f_auto,q_auto/v1/instudia/qzmdhewkbsyxmwsjccnu",
          width: 1200,
          height: 630,
          alt: "PCA Course at instudia",
          type: "image/png",
        },
      ],
    },
    twitter: {
      title: "PCA Course in Dimapur | instudia",
      description:
        "Master computer applications with the PCA Certificate at instudia, Dimapur. Build your IT career in Nagaland.",
      card: "https://res.cloudinary.com/dhwg77gwm/image/upload/f_auto,q_auto/v1/instudia/qzmdhewkbsyxmwsjccnu",
    },
    metadataBase: new URL("https://instudianagaland.com"),
  },
};

export default META_LOOKUP;
