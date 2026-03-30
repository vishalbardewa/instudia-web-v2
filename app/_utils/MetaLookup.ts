import { slugs } from "../routes";
import { AppConfig } from "./AppConfig";

const META_LOOKUP = {
  [slugs.PYTHON]: {
    title: "Python Programming in Dimapur",
    description:
      "Master Python programming with industry-certified training. Build real-world projects and launch your developer career in Nagaland.",
    openGraph: {
      title: "Build Your Career: Learn Python",
      description:
        "Top Python training in Dimapur. Master programming and software development with industry-certified experts at instudia.",
      url: `${AppConfig.canonicalBase}`,
      locale: AppConfig.locale,
      siteName: AppConfig.site_name,
      images: [
        {
          url: "https://res.cloudinary.com/dhwg77gwm/image/upload/f_auto,q_auto/v1/instudia/qzmdhewkbsyxmwsjccnu",
          width: 800,
          height: 600,
          alt: "Learn Python with instudia",
          type: "image/png",
        },
      ],
    },
    twitter: {
      title: "Python Programming Course",
      description:
        "Master Python programming in Dimapur. Industry-focused training to help you build a successful tech career in Nagaland.",
      card: "https://res.cloudinary.com/dhwg77gwm/image/upload/f_auto,q_auto/v1/instudia/tqo7qzztc4duzktj0jt9",
    },
    metadataBase: new URL("https://instudianagaland.com"),
  },
  [slugs.DCA]: {
    title: "Diploma in Computer Application (DCA) in Dimapur",
    description:
      "Comprehensive DCA course in Dimapur. Master fundamental computer skills, MS Office, and internet basics with industry-certified training.",
    openGraph: {
      title:
        "Build Your Career: Learn DCA",
      description:
        "Top DCA training institute in Dimapur. Master fundamental computer applications for career success in Nagaland.",
      url: `${AppConfig.canonicalBase}`,
      locale: AppConfig.locale,
      siteName: AppConfig.site_name,
      images: [
        {
          url: "https://res.cloudinary.com/dhwg77gwm/image/upload/f_auto,q_auto/v1/instudia/qzmdhewkbsyxmwsjccnu",
          width: 800,
          height: 600,
          alt: "DCA Course at instudia",
          type: "image/png",
        },
      ],
    },
    twitter: {
      title: "Diploma in Computer Application (DCA)",
      description:
        "Elevate your career with DCA in Dimapur. Practical training in computer applications to unlock new job opportunities.",
      card: "https://res.cloudinary.com/dhwg77gwm/image/upload/f_auto,q_auto/v1/instudia/qzmdhewkbsyxmwsjccnu",
    },
    metadataBase: new URL("https://instudianagaland.com"),
  },
  [slugs.PGDCA]: {
    title: "PGDCA Course in Dimapur",
    description:
      "Post Graduate Diploma in Computer Application. Master IT concepts and software management in Nagaland.",
    openGraph: {
      title:
        "Build Your Career: Learn PGDCA",
      description:
        "PGDCA training in Dimapur. Master IT fundamentals and applications for professional growth in Nagaland.",
      url: `${AppConfig.canonicalBase}`,
      locale: AppConfig.locale,
      siteName: AppConfig.site_name,
      images: [
        {
          url: "https://res.cloudinary.com/dhwg77gwm/image/upload/f_auto,q_auto/v1/instudia/qzmdhewkbsyxmwsjccnu",
          width: 800,
          height: 600,
          alt: "PGDCA Course at instudia",
          type: "image/png",
        },
      ],
    },
    twitter: {
      title: "PGDCA Course in Dimapur",
      description:
        "Take your IT skills to the next level with PGDCA. Industry-certified training for career success in Nagaland.",
      card: "https://res.cloudinary.com/dhwg77gwm/image/upload/f_auto,q_auto/v1/instudia/qzmdhewkbsyxmwsjccnu",
    },
    metadataBase: new URL("https://instudianagaland.com"),
  },
  [slugs.GRAPHIC_DESIGN]: {
    title: "Graphic Design Course in Dimapur",
    description:
      "Master industry-standard design tools like Photoshop, Illustrator, and Canva. Learn visual storytelling and brand design in Nagaland.",
    openGraph: {
      title: "Build Your Career: Learn Graphic Design",
      description:
        "Professional Graphic Design training in Dimapur. Master the tools and techniques to become a creative professional.",
      url: `${AppConfig.canonicalBase}`,
      locale: AppConfig.locale,
      siteName: AppConfig.site_name,
      images: [
        {
          url: "https://res.cloudinary.com/dhwg77gwm/image/upload/f_auto,q_auto/v1/instudia/qzmdhewkbsyxmwsjccnu",
          width: 800,
          height: 600,
          alt: "Graphic Design at instudia",
          type: "image/png",
        },
      ],
    },
    twitter: {
      title: "Graphic Design Course",
      description:
        "Learn Graphic Design in Dimapur. Industry-certified training to help you launch a creative career in Nagaland.",
      card: "https://res.cloudinary.com/dhwg77gwm/image/upload/f_auto,q_auto/v1/instudia/qzmdhewkbsyxmwsjccnu",
    },
    metadataBase: new URL("https://instudianagaland.com"),
  },
  [slugs.ADVANCED_EXCEL]: {
    title: "Advanced Excel Training in Dimapur",
    description:
      "Master data analysis, pivot tables, and advanced formulas. Professional Excel training for finance and business roles in Nagaland.",
    openGraph: {
      title: "Build Your Career: Learn Advanced Excel",
      description:
        "Master data management and analysis with our Advanced Excel course in Dimapur. Essential for modern professionals.",
      url: `${AppConfig.canonicalBase}`,
      locale: AppConfig.locale,
      siteName: AppConfig.site_name,
      images: [
        {
          url: "https://res.cloudinary.com/dhwg77gwm/image/upload/f_auto,q_auto/v1/instudia/qzmdhewkbsyxmwsjccnu",
          width: 800,
          height: 600,
          alt: "Advanced Excel at instudia",
          type: "image/png",
        },
      ],
    },
    twitter: {
      title: "Advanced Excel Course",
      description:
        "Master Advanced Excel in Dimapur. Enhance your data skills and boost your employability in Nagaland.",
      card: "https://res.cloudinary.com/dhwg77gwm/image/upload/f_auto,q_auto/v1/instudia/qzmdhewkbsyxmwsjccnu",
    },
    metadataBase: new URL("https://instudianagaland.com"),
  },
  [slugs.FRONTEND]: {
    title: "Frontend Development using React in Dimapur",
    description:
      "Learn modern web development with React. Master HTML, CSS, and JavaScript to build responsive web applications in Dimapur.",
    openGraph: {
      title:
        "Build Your Career: Learn Frontend Development",
      description:
        "State-of-the-art Frontend training in Dimapur. Master React and modern JS frameworks for high-paying tech roles.",
      url: `${AppConfig.canonicalBase}`,
      locale: AppConfig.locale,
      siteName: AppConfig.site_name,
      images: [
        {
          url: "https://res.cloudinary.com/dhwg77gwm/image/upload/f_auto,q_auto/v1/instudia/qzmdhewkbsyxmwsjccnu",
          width: 800,
          height: 600,
          alt: "Frontend React Course at instudia",
          type: "image/png",
        },
      ],
    },
    twitter: {
      title: "Frontend Development with React",
      description:
        "Master Frontend Development in Dimapur. Learn React and build modern web applications for the global market.",
      card: "https://res.cloudinary.com/dhwg77gwm/image/upload/f_auto,q_auto/v1/instudia/qzmdhewkbsyxmwsjccnu",
    },
    metadataBase: new URL("https://instudianagaland.com"),
  },
  [slugs.BACKEND]: {
    title: "Backend Development Course in Dimapur",
    description:
      "Master server-side programming, databases, and API development. Learn Node.js and SQL to build robust web backends in Nagaland.",
    openGraph: {
      title: "Build Your Career: Learn Backend Development",
      description:
        "Professional Backend training in Dimapur. Master the architecture behind the web with industry-certified experts.",
      url: `${AppConfig.canonicalBase}`,
      locale: AppConfig.locale,
      siteName: AppConfig.site_name,
      images: [
        {
          url: "https://res.cloudinary.com/dhwg77gwm/image/upload/f_auto,q_auto/v1/instudia/qzmdhewkbsyxmwsjccnu",
          width: 800,
          height: 600,
          alt: "Backend Course at instudia",
          type: "image/png",
        },
      ],
    },
    twitter: {
      title: "Backend Development Course",
      description:
        "Master server-side logic and database management in Dimapur. Build powerful backends for modern web applications.",
      card: "https://res.cloudinary.com/dhwg77gwm/image/upload/f_auto,q_auto/v1/instudia/qzmdhewkbsyxmwsjccnu",
    },
    metadataBase: new URL("https://instudianagaland.com"),
  },
  [slugs.FULLSTACK_WEB_DEVELOPMENT]: {
    title: "Fullstack Web Development Course in Dimapur",
    description:
      "Master both Frontend and Backend development. Build complete, production-ready web applications with modern tech stacks in Nagaland.",
    openGraph: {
      title: "Build Your Career: Learn Fullstack Web Development",
      description:
        "Comprehensive Fullstack training in Dimapur. Master the entire web stack from database to UI with expert guidance.",
      url: `${AppConfig.canonicalBase}`,
      locale: AppConfig.locale,
      siteName: AppConfig.site_name,
      images: [
        {
          url: "https://res.cloudinary.com/dhwg77gwm/image/upload/f_auto,q_auto/v1/instudia/qzmdhewkbsyxmwsjccnu",
          width: 800,
          height: 600,
          alt: "Fullstack Course at instudia",
          type: "image/png",
        },
      ],
    },
    twitter: {
      title: "Fullstack Web Development Course",
      description:
        "Become a Fullstack Developer in Dimapur. Master the complete development cycle and launch your tech career.",
      card: "https://res.cloudinary.com/dhwg77gwm/image/upload/f_auto,q_auto/v1/instudia/qzmdhewkbsyxmwsjccnu",
    },
    metadataBase: new URL("https://instudianagaland.com"),
  },
  [slugs.GST]: {
    title: "Tally Prime with GST Course in Dimapur",
    description:
      "Master Tally Prime with GST implementation. Learn accounting, taxation, and financial management with practical training in Nagaland.",
    openGraph: {
      title: "Build Your Career: Learn Tally with GST",
      description:
        "Expert Tally with GST training in Dimapur. Master digital accounting and tax compliance for modern business roles.",
      url: `${AppConfig.canonicalBase}`,
      locale: AppConfig.locale,
      siteName: AppConfig.site_name,
      images: [
        {
          url: "https://res.cloudinary.com/dhwg77gwm/image/upload/f_auto,q_auto/v1/instudia/qzmdhewkbsyxmwsjccnu",
          width: 800,
          height: 600,
          alt: "Tally GST Course at instudia",
          type: "image/png",
        },
      ],
    },
    twitter: {
      title: "Tally with GST Course",
      description:
        "Master Tally with GST in Dimapur. Gain essential accounting skills and boost your financial career in Nagaland.",
      card: "https://res.cloudinary.com/dhwg77gwm/image/upload/f_auto,q_auto/v1/instudia/qzmdhewkbsyxmwsjccnu",
    },
    metadataBase: new URL("https://instudianagaland.com"),
  },
  [slugs.TALLY]: {
    title: "Accounting with Tally in Dimapur",
    description:
      "Master professional accounting with Tally. Industry-certified training for finance and business success in Nagaland.",
    openGraph: {
      title: "Build Your Career: Learn Tally",
      description:
        "Top Accounting with Tally training in Dimapur. Master financial management and digital accounting for modern business.",
      url: `${AppConfig.canonicalBase}`,
      locale: AppConfig.locale,
      siteName: AppConfig.site_name,
      images: [
        {
          url: "https://res.cloudinary.com/dhwg77gwm/image/upload/f_auto,q_auto/v1/instudia/qzmdhewkbsyxmwsjccnu",
          width: 800,
          height: 600,
          alt: "Tally Course at instudia",
          type: "image/png",
        },
      ],
    },
    twitter: {
      title: "Accounting with Tally Course",
      description:
        "Master Tally in Dimapur. Gain practical accounting skills to advance your financial career in Nagaland.",
      card: "https://res.cloudinary.com/dhwg77gwm/image/upload/f_auto,q_auto/v1/instudia/qzmdhewkbsyxmwsjccnu",
    },
    metadataBase: new URL("https://instudianagaland.com"),
  },
  [slugs.MOBILE_APP_DEVELOPMENT]: {
    title: "Mobile App Development with React Native in Dimapur",
    description:
      "Build cross-platform mobile apps for iOS and Android using React Native. Master mobile UI and native features in Nagaland.",
    openGraph: {
      title:
        "Build Your Career: Learn Mobile App Development",
      description:
        "Professional React Native training in Dimapur. Master mobile app development for the modern app economy.",
      url: `${AppConfig.canonicalBase}`,
      locale: AppConfig.locale,
      siteName: AppConfig.site_name,
      images: [
        {
          url: "https://res.cloudinary.com/dhwg77gwm/image/upload/f_auto,q_auto/v1/instudia/qzmdhewkbsyxmwsjccnu",
          width: 800,
          height: 600,
          alt: "React Native Course at instudia",
          type: "image/png",
        },
      ],
    },
    twitter: {
      title: "Mobile App Development Course",
      description:
        "Master React Native in Dimapur. Build and deploy mobile apps for iOS and Android with expert guidance.",
      card: "https://res.cloudinary.com/dhwg77gwm/image/upload/f_auto,q_auto/v1/instudia/qzmdhewkbsyxmwsjccnu",
    },
    metadataBase: new URL("https://instudianagaland.com"),
  },
  [slugs.UIUX_DESIGN]: {
    title: "UI/UX Design Course in Dimapur",
    description:
      "Master user experience and interface design. Learn Figma, wireframing, and prototyping to build user-centric digital products in Nagaland.",
    openGraph: {
      title: "Build Your Career: Learn UI/UX Design",
      description:
        "Professional UI/UX training in Dimapur. Master the design thinking process and build a stunning portfolio with expert mentors.",
      url: `${AppConfig.canonicalBase}`,
      locale: AppConfig.locale,
      siteName: AppConfig.site_name,
      images: [
        {
          url: "https://res.cloudinary.com/dhwg77gwm/image/upload/f_auto,q_auto/v1/instudia/qzmdhewkbsyxmwsjccnu",
          width: 800,
          height: 600,
          alt: "UI/UX Design at instudia",
          type: "image/png",
        },
      ],
    },
    twitter: {
      title: "UI/UX Design Course",
      description:
        "Master UI/UX Design in Dimapur. Learn to create intuitive digital experiences and launch your design career in Nagaland.",
      card: "https://res.cloudinary.com/dhwg77gwm/image/upload/f_auto,q_auto/v1/instudia/qzmdhewkbsyxmwsjccnu",
    },
    metadataBase: new URL("https://instudianagaland.com"),
  },
  [slugs.BUSINESS_INTELLIGENCE]: {
    title: "Business Intelligence using PowerBI in Dimapur",
    description:
      "Master data visualization and business intelligence with PowerBI. Transform raw data into actionable insights for corporate roles in Nagaland.",
    openGraph: {
      title:
        "Build Your Career: Learn Business Intelligence",
      description:
        "Top PowerBI training in Dimapur. Master data analytics and reporting for informed business decision-making.",
      url: `${AppConfig.canonicalBase}`,
      locale: AppConfig.locale,
      siteName: AppConfig.site_name,
      images: [
        {
          url: "https://res.cloudinary.com/dhwg77gwm/image/upload/f_auto,q_auto/v1/instudia/qzmdhewkbsyxmwsjccnu",
          width: 800,
          height: 600,
          alt: "PowerBI Course at instudia",
          type: "image/png",
        },
      ],
    },
    twitter: {
      title: "Business Intelligence using PowerBI",
      description:
        "Master PowerBI in Dimapur. Learn to visualize data and drive business growth with our industry-certified BI course.",
      card: "https://res.cloudinary.com/dhwg77gwm/image/upload/f_auto,q_auto/v1/instudia/qzmdhewkbsyxmwsjccnu",
    },
    metadataBase: new URL("https://instudianagaland.com"),
  },
  [slugs.PROJECT_MANAGEMENT]: {
    title: "Project Management Course in Dimapur",
    description:
      "Master Agile, Scrum, and project lifecycle management. Develop leadership and organizational skills for corporate success in Nagaland.",
    openGraph: {
      title: "Build Your Career: Learn Project Management",
      description:
        "Professional Project Management training in Dimapur. Master the tools and methodologies to lead successful teams and projects.",
      url: `${AppConfig.canonicalBase}`,
      locale: AppConfig.locale,
      siteName: AppConfig.site_name,
      images: [
        {
          url: "https://res.cloudinary.com/dhwg77gwm/image/upload/f_auto,q_auto/v1/instudia/qzmdhewkbsyxmwsjccnu",
          width: 800,
          height: 600,
          alt: "Project Management at instudia",
          type: "image/png",
        },
      ],
    },
    twitter: {
      title: "Project Management Course",
      description:
        "Master Project Management in Dimapur. Gain the skills to plan, execute, and deliver successful projects in any industry.",
      card: "https://res.cloudinary.com/dhwg77gwm/image/upload/f_auto,q_auto/v1/instudia/qzmdhewkbsyxmwsjccnu",
    },
    metadataBase: new URL("https://instudianagaland.com"),
  },
  [slugs.DEVOPS]: {
    title: "DevOps Engineering Course in Dimapur",
    description:
      "Master CI/CD pipelines, cloud infrastructure, and automation. Learn to bridge the gap between development and operations in Nagaland.",
    openGraph: {
      title: "Build Your Career: Learn DevOps",
      description:
        "Advanced DevOps training in Dimapur. Master the tools and culture of modern software delivery with expert guidance.",
      url: `${AppConfig.canonicalBase}`,
      locale: AppConfig.locale,
      siteName: AppConfig.site_name,
      images: [
        {
          url: "https://res.cloudinary.com/dhwg77gwm/image/upload/f_auto,q_auto/v1/instudia/qzmdhewkbsyxmwsjccnu",
          width: 800,
          height: 600,
          alt: "DevOps Course at instudia",
          type: "image/png",
        },
      ],
    },
    twitter: {
      title: "DevOps Engineering Course",
      description:
        "Master DevOps in Dimapur. Learn automation, cloud computing, and CI/CD to accelerate your tech career in Nagaland.",
      card: "https://res.cloudinary.com/dhwg77gwm/image/upload/f_auto,q_auto/v1/instudia/qzmdhewkbsyxmwsjccnu",
    },
    metadataBase: new URL("https://instudianagaland.com"),
  },
  [slugs.HARDWARE_NETWORKING]: {
    title: "Hardware and Networking Course in Dimapur",
    description:
      "Master computer hardware, troubleshooting, and network administration. Industry-certified training for IT support roles in Nagaland.",
    openGraph: {
      title: "Build Your Career: Learn Hardware & Networking",
      description:
        "Comprehensive Hardware and Networking training in Dimapur. Master the physical foundation of IT infrastructure.",
      url: `${AppConfig.canonicalBase}`,
      locale: AppConfig.locale,
      siteName: AppConfig.site_name,
      images: [
        {
          url: "https://res.cloudinary.com/dhwg77gwm/image/upload/f_auto,q_auto/v1/instudia/qzmdhewkbsyxmwsjccnu",
          width: 800,
          height: 600,
          alt: "Hardware & Networking at instudia",
          type: "image/png",
        },
      ],
    },
    twitter: {
      title: "Hardware & Networking Course",
      description:
        "Master IT Hardware and Networking in Dimapur. Gain practical skills for technical support and infrastructure management.",
      card: "https://res.cloudinary.com/dhwg77gwm/image/upload/f_auto,q_auto/v1/instudia/qzmdhewkbsyxmwsjccnu",
    },
    metadataBase: new URL("https://instudianagaland.com"),
  },
  [slugs.RETAIL_MANAGEMENT]: {
    title: "Retail Management Course in Dimapur",
    description:
      "Develop essential skills for the retail industry. Learn customer service, inventory management, and sales strategies in Nagaland.",
    openGraph: {
      title: "Build Your Career: Learn Retail Management",
      description:
        "Professional Retail Management training in Dimapur. Master the operations and strategies of modern retail business.",
      url: `${AppConfig.canonicalBase}`,
      locale: AppConfig.locale,
      siteName: AppConfig.site_name,
      images: [
        {
          url: "https://res.cloudinary.com/dhwg77gwm/image/upload/f_auto,q_auto/v1/instudia/qzmdhewkbsyxmwsjccnu",
          width: 800,
          height: 600,
          alt: "Retail Management at instudia",
          type: "image/png",
        },
      ],
    },
    twitter: {
      title: "Retail Management Course",
      description:
        "Master Retail Management in Dimapur. Prepare for a successful career in the fast-growing retail sector in Nagaland.",
      card: "https://res.cloudinary.com/dhwg77gwm/image/upload/f_auto,q_auto/v1/instudia/qzmdhewkbsyxmwsjccnu",
    },
    metadataBase: new URL("https://instudianagaland.com"),
  },
  [slugs.FOOD_PROCESSING]: {
    title: "Food Processing Course in Dimapur",
    description:
      "Learn techniques for food preservation, quality control, and safety standards. Professional vocational training in Nagaland.",
    openGraph: {
      title: "Build Your Career: Learn Food Processing",
      description:
        "Specialized Food Processing training in Dimapur. Master the skills to excel in the food production and safety industry.",
      url: `${AppConfig.canonicalBase}`,
      locale: AppConfig.locale,
      siteName: AppConfig.site_name,
      images: [
        {
          url: "https://res.cloudinary.com/dhwg77gwm/image/upload/f_auto,q_auto/v1/instudia/qzmdhewkbsyxmwsjccnu",
          width: 800,
          height: 600,
          alt: "Food Processing at instudia",
          type: "image/png",
        },
      ],
    },
    twitter: {
      title: "Food Processing Course",
      description:
        "Master Food Processing in Dimapur. Gain practical skills for the food science and production industry in Nagaland.",
      card: "https://res.cloudinary.com/dhwg77gwm/image/upload/f_auto,q_auto/v1/instudia/qzmdhewkbsyxmwsjccnu",
    },
    metadataBase: new URL("https://instudianagaland.com"),
  }
};

export default META_LOOKUP;
