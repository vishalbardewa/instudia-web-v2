import { slugs } from "../routes";
import { AppConfig } from "./AppConfig";

const META_LOOKUP = {
  [slugs.PYTHON]: {
    title: "Python Programming in Dimapur",
    description:
      "Master Python programming. Industry-certified training for career success. Join Instudia today!",
    openGraph: {
      title: "Build Your Career: Learn Python | Instudia",
      description:
        "Top python training institute in Dimapur, Nagaland. Master programming, Tally, GST, web design & graphic courses. Industry-certified training for career success. Join Instudia today!",
      url: `${AppConfig.canonicalBase}`,
      locale: AppConfig.locale,
      siteName: AppConfig.site_name,
      images: [
        {
          url: "https://res.cloudinary.com/dhwg77gwm/image/upload/f_auto,q_auto/v1/instudia/qzmdhewkbsyxmwsjccnu",
          width: 800,
          height: 600,
          alt: "Enroll with instudia",
          type: "image/png",
        },
      ],
    },
    twitter: {
      title: "Courses | instudia ",
      description:
        "Elevate your career with premier computer and skill training in Dimapur, Nagaland. Explore cutting-edge courses in programming, graphic design, web development, Tally, GST, and more at Instudia. Unlock success with industry-focused training.",
      card: "https://res.cloudinary.com/dhwg77gwm/image/upload/f_auto,q_auto/v1/instudia/tqo7qzztc4duzktj0jt9",
    },
    metadataBase: new URL("https://instudianagaland.com"),
  },
  [slugs.DCA]: {
    title: "Diploma in Computer Application in Dimapur",
    description:
      "Upskill in DCA. Industry-certified training for career success. Join Instudia today!",
    openGraph: {
      title:
        "Build Your Career: Learn Diploma in Computer Application | Instudia",
      description:
        "Top DCA training institute in Dimapur, Nagaland. Master programming, Tally, GST, web design & graphic courses. Industry-certified training for career success. Join Instudia today!",
      url: `${AppConfig.canonicalBase}`,
      locale: AppConfig.locale,
      siteName: AppConfig.site_name,
      images: [
        {
          url: "https://res.cloudinary.com/dhwg77gwm/image/upload/f_auto,q_auto/v1/instudia/qzmdhewkbsyxmwsjccnu",
          width: 800,
          height: 600,
          alt: "Enroll with instudia",
          type: "image/png",
        },
      ],
    },
    twitter: {
      title: "Diploma in Computer Application in Dimapur",
      description:
        "Elevate your career with DCA in Dimapur, Nagaland. Explore cutting-edge courses in programming, graphic design, web development, Tally, GST, and more at Instudia. Unlock success with industry-focused training.",
      card: "https://res.cloudinary.com/dhwg77gwm/image/upload/f_auto,q_auto/v1/instudia/qzmdhewkbsyxmwsjccnu",
    },
    metadataBase: new URL("https://instudianagaland.com"),
  },
  [slugs.PGDCA]: {
    title: "Post Graduate Diploma in Computer Application in Dimapur",
    description:
      "Upskill in PGDCA. Industry-certified training for career success. Join Instudia today!",
    openGraph: {
      title:
        "Build Your Career: Learn Post Graduate Diploma in Computer Application | Instudia",
      description:
        "Top PGDCA training institute in Dimapur, Nagaland. Master programming, Tally, GST, web design & graphic courses. Industry-certified training for career success. Join Instudia today!",
      url: `${AppConfig.canonicalBase}`,
      locale: AppConfig.locale,
      siteName: AppConfig.site_name,
      images: [
        {
          url: "https://res.cloudinary.com/dhwg77gwm/image/upload/f_auto,q_auto/v1/instudia/qzmdhewkbsyxmwsjccnu",
          width: 800,
          height: 600,
          alt: "Enroll with instudia",
          type: "image/png",
        },
      ],
    },
    twitter: {
      title: "Post Graduate Diploma in Computer Application in Dimapur",
      description:
        "Elevate your career with PGDCA in Dimapur, Nagaland. Explore cutting-edge courses in programming, graphic design, web development, Tally, GST, and more at Instudia. Unlock success with industry-focused training.",
      card: "https://res.cloudinary.com/dhwg77gwm/image/upload/f_auto,q_auto/v1/instudia/qzmdhewkbsyxmwsjccnu",
    },
    metadataBase: new URL("https://instudianagaland.com"),
  },
  [slugs.GRAPHIC_DESIGN]: {
    title: "Graphic Design in Dimapur",
    description:
      "Upskill in Graphic Design. Industry-certified training for career success. Join Instudia today!",
    openGraph: {
      title: "Build Your Career: Learn Graphic Design | Instudia",
      description:
        "Top Graphic Design training institute in Dimapur, Nagaland. Master programming, Tally, GST, web design & graphic courses. Industry-certified training for career success. Join Instudia today!",
      url: `${AppConfig.canonicalBase}`,
      locale: AppConfig.locale,
      siteName: AppConfig.site_name,
      images: [
        {
          url: "https://res.cloudinary.com/dhwg77gwm/image/upload/f_auto,q_auto/v1/instudia/qzmdhewkbsyxmwsjccnu",
          width: 800,
          height: 600,
          alt: "Enroll with instudia",
          type: "image/png",
        },
      ],
    },
    twitter: {
      title: "Graphic Design in Dimapur",
      description:
        "Elevate your career with Graphic Design in Dimapur, Nagaland. Explore cutting-edge courses in programming, graphic design, web development, Tally, GST, and more at Instudia. Unlock success with industry-focused training.",
      card: "https://res.cloudinary.com/dhwg77gwm/image/upload/f_auto,q_auto/v1/instudia/qzmdhewkbsyxmwsjccnu",
    },
    metadataBase: new URL("https://instudianagaland.com"),
  },
  [slugs.ADVANCED_EXCEL]: {
    title: "Advanced Excel in Dimapur",
    description:
      "Upskill in Advanced Excel. Industry-certified training for career success. Join Instudia today!",
    openGraph: {
      title: "Build Your Career: Learn Advanced Excel | Instudia",
      description:
        "Top Advanced Excel training institute in Dimapur, Nagaland. Master programming, Tally, GST, web design & graphic courses. Industry-certified training for career success. Join Instudia today!",
      url: `${AppConfig.canonicalBase}`,
      locale: AppConfig.locale,
      siteName: AppConfig.site_name,
      images: [
        {
          url: "https://res.cloudinary.com/dhwg77gwm/image/upload/f_auto,q_auto/v1/instudia/qzmdhewkbsyxmwsjccnu",
          width: 800,
          height: 600,
          alt: "Enroll with instudia",
          type: "image/png",
        },
      ],
    },
    twitter: {
      title: "Advanced Excel in Dimapur",
      description:
        "Elevate your career with Advanced Excel in Dimapur, Nagaland. Explore cutting-edge courses in programming, graphic design, web development, Tally, GST, and more at Instudia. Unlock success with industry-focused training.",
      card: "https://res.cloudinary.com/dhwg77gwm/image/upload/f_auto,q_auto/v1/instudia/qzmdhewkbsyxmwsjccnu",
    },
    metadataBase: new URL("https://instudianagaland.com"),
  },
  [slugs.FRONTEND]: {
    title: "Frontend Development using React in Dimapur",
    description:
      "Upskill in Frontend Development using React. Industry-certified training for career success. Join Instudia today!",
    openGraph: {
      title:
        "Build Your Career: Learn Frontend Development using React | Instudia",
      description:
        "Top Frontend Development using React training institute in Dimapur, Nagaland. Master programming, Tally, GST, web design & graphic courses. Industry-certified training for career success. Join Instudia today!",
      url: `${AppConfig.canonicalBase}`,
      locale: AppConfig.locale,
      siteName: AppConfig.site_name,
      images: [
        {
          url: "https://res.cloudinary.com/dhwg77gwm/image/upload/f_auto,q_auto/v1/instudia/qzmdhewkbsyxmwsjccnu",
          width: 800,
          height: 600,
          alt: "Enroll with instudia",
          type: "image/png",
        },
      ],
    },
    twitter: {
      title: "Frontend Development using React in Dimapur",
      description:
        "Elevate your career with Frontend Development using React in Dimapur, Nagaland. Explore cutting-edge courses in programming, graphic design, web development, Tally, GST, and more at Instudia. Unlock success with industry-focused training.",
      card: "https://res.cloudinary.com/dhwg77gwm/image/upload/f_auto,q_auto/v1/instudia/qzmdhewkbsyxmwsjccnu",
    },
    metadataBase: new URL("https://instudianagaland.com"),
  },
  [slugs.BACKEND]: {
    title: "Backend Development in Dimapur",
    description:
      "Upskill in Backend Development. Industry-certified training for career success. Join Instudia today!",
    openGraph: {
      title: "Build Your Career: Learn Backend Development | Instudia",
      description:
        "Top Backend Development training institute in Dimapur, Nagaland. Master programming, Tally, GST, web design & graphic courses. Industry-certified training for career success. Join Instudia today!",
      url: `${AppConfig.canonicalBase}`,
      locale: AppConfig.locale,
      siteName: AppConfig.site_name,
      images: [
        {
          url: "https://res.cloudinary.com/dhwg77gwm/image/upload/f_auto,q_auto/v1/instudia/qzmdhewkbsyxmwsjccnu",
          width: 800,
          height: 600,
          alt: "Enroll with instudia",
          type: "image/png",
        },
      ],
    },
    twitter: {
      title: "Backend Development in Dimapur",
      description:
        "Elevate your career with Backend Development in Dimapur, Nagaland. Explore cutting-edge courses in programming, graphic design, web development, Tally, GST, and more at Instudia. Unlock success with industry-focused training.",
      card: "https://res.cloudinary.com/dhwg77gwm/image/upload/f_auto,q_auto/v1/instudia/qzmdhewkbsyxmwsjccnu",
    },
    metadataBase: new URL("https://instudianagaland.com"),
  },
  [slugs.FULLSTACK_WEB_DEVELOPMENT]: {
    title: "Fullstack Web Development in Dimapur",
    description:
      "Upskill in Fullstack Web Development. Industry-certified training for career success. Join Instudia today!",
    openGraph: {
      title: "Build Your Career: Learn Fullstack Web Development | Instudia",
      description:
        "Top Fullstack Web Development training institute in Dimapur, Nagaland. Master programming, Tally, GST, web design & graphic courses. Industry-certified training for career success. Join Instudia today!",
      url: `${AppConfig.canonicalBase}`,
      locale: AppConfig.locale,
      siteName: AppConfig.site_name,
      images: [
        {
          url: "https://res.cloudinary.com/dhwg77gwm/image/upload/f_auto,q_auto/v1/instudia/qzmdhewkbsyxmwsjccnu",
          width: 800,
          height: 600,
          alt: "Enroll with instudia",
          type: "image/png",
        },
      ],
    },
    twitter: {
      title: "Fullstack Web Development in Dimapur",
      description:
        "Elevate your career with Fullstack Web Development in Dimapur, Nagaland. Explore cutting-edge courses in programming, graphic design, web development, Tally, GST, and more at Instudia. Unlock success with industry-focused training.",
      card: "https://res.cloudinary.com/dhwg77gwm/image/upload/f_auto,q_auto/v1/instudia/qzmdhewkbsyxmwsjccnu",
    },
    metadataBase: new URL("https://instudianagaland.com"),
  },
  [slugs.GST]: {
    title: "Tally with GST in Dimapur",
    description:
      "Upskill in Tally with GST. Industry-certified training for career success. Join Instudia today!",
    openGraph: {
      title: "Build Your Career: Learn Tally with GST | Instudia",
      description:
        "Top Tally with GST training institute in Dimapur, Nagaland. Master programming, Tally, GST, web design & graphic courses. Industry-certified training for career success. Join Instudia today!",
      url: `${AppConfig.canonicalBase}`,
      locale: AppConfig.locale,
      siteName: AppConfig.site_name,
      images: [
        {
          url: "https://res.cloudinary.com/dhwg77gwm/image/upload/f_auto,q_auto/v1/instudia/qzmdhewkbsyxmwsjccnu",
          width: 800,
          height: 600,
          alt: "Enroll with instudia",
          type: "image/png",
        },
      ],
    },
    twitter: {
      title: "Tally with GST in Dimapur",
      description:
        "Elevate your career with Tally with GST in Dimapur, Nagaland. Explore cutting-edge courses in programming, graphic design, web development, Tally, GST, and more at Instudia. Unlock success with industry-focused training.",
      card: "https://res.cloudinary.com/dhwg77gwm/image/upload/f_auto,q_auto/v1/instudia/qzmdhewkbsyxmwsjccnu",
    },
    metadataBase: new URL("https://instudianagaland.com"),
  },
  [slugs.TALLY]: {
    title: "Accounting with Tally in Dimapur",
    description:
      "Upskill in Accounting with Tally. Industry-certified training for career success. Join Instudia today!",
    openGraph: {
      title: "Build Your Career: Learn Accounting with Tally | Instudia",
      description:
        "Top Accounting with Tally training institute in Dimapur, Nagaland. Master programming, Tally, GST, web design & graphic courses. Industry-certified training for career success. Join Instudia today!",
      url: `${AppConfig.canonicalBase}`,
      locale: AppConfig.locale,
      siteName: AppConfig.site_name,
      images: [
        {
          url: "https://res.cloudinary.com/dhwg77gwm/image/upload/f_auto,q_auto/v1/instudia/qzmdhewkbsyxmwsjccnu",
          width: 800,
          height: 600,
          alt: "Enroll with instudia",
          type: "image/png",
        },
      ],
    },
    twitter: {
      title: "Accounting with Tally in Dimapur",
      description:
        "Elevate your career with Accounting with Tally in Dimapur, Nagaland. Explore cutting-edge courses in programming, graphic design, web development, Tally, GST, and more at Instudia. Unlock success with industry-focused training.",
      card: "https://res.cloudinary.com/dhwg77gwm/image/upload/f_auto,q_auto/v1/instudia/qzmdhewkbsyxmwsjccnu",
    },
    metadataBase: new URL("https://instudianagaland.com"),
  },
  [slugs.MOBILE_APP_DEVELOPMENT]: {
    title: "Mobile App Development using React Native in Dimapur",
    description:
      "Upskill in Mobile App Development using React Native. Industry-certified training for career success. Join Instudia today!",
    openGraph: {
      title:
        "Build Your Career: Learn Mobile App Development using React Native | Instudia",
      description:
        "Top Mobile App Development using React Native training institute in Dimapur, Nagaland. Master programming, Tally, GST, web design & graphic courses. Industry-certified training for career success. Join Instudia today!",
      url: `${AppConfig.canonicalBase}`,
      locale: AppConfig.locale,
      siteName: AppConfig.site_name,
      images: [
        {
          url: "https://res.cloudinary.com/dhwg77gwm/image/upload/f_auto,q_auto/v1/instudia/qzmdhewkbsyxmwsjccnu",
          width: 800,
          height: 600,
          alt: "Enroll with instudia",
          type: "image/png",
        },
      ],
    },
    twitter: {
      title: "Mobile App Development using React Native in Dimapur",
      description:
        "Elevate your career with Mobile App Development using React Native in Dimapur, Nagaland. Explore cutting-edge courses in programming, graphic design, web development, Tally, GST, and more at Instudia. Unlock success with industry-focused training.",
      card: "https://res.cloudinary.com/dhwg77gwm/image/upload/f_auto,q_auto/v1/instudia/qzmdhewkbsyxmwsjccnu",
    },
    metadataBase: new URL("https://instudianagaland.com"),
  },
  [slugs.UIUX_DESIGN]: {
    title: "UI/UX Design in Dimapur",
    description:
      "Upskill in UI/UX Design. Industry-certified training for career success. Join Instudia today!",
    openGraph: {
      title: "Build Your Career: Learn UI/UX Design | Instudia",
      description:
        "Top UI/UX Design training institute in Dimapur, Nagaland. Master programming, Tally, GST, web design & graphic courses. Industry-certified training for career success. Join Instudia today!",
      url: `${AppConfig.canonicalBase}`,
      locale: AppConfig.locale,
      siteName: AppConfig.site_name,
      images: [
        {
          url: "https://res.cloudinary.com/dhwg77gwm/image/upload/f_auto,q_auto/v1/instudia/qzmdhewkbsyxmwsjccnu",
          width: 800,
          height: 600,
          alt: "Enroll with instudia",
          type: "image/png",
        },
      ],
    },
    twitter: {
      title: "UI/UX Design in Dimapur",
      description:
        "Elevate your career with UI/UX Design in Dimapur, Nagaland. Explore cutting-edge courses in programming, graphic design, web development, Tally, GST, and more at Instudia. Unlock success with industry-focused training.",
      card: "https://res.cloudinary.com/dhwg77gwm/image/upload/f_auto,q_auto/v1/instudia/qzmdhewkbsyxmwsjccnu",
    },
    metadataBase: new URL("https://instudianagaland.com"),
  },
  [slugs.BUSINESS_INTELLIGENCE]: {
    title: "Business Intelligence using PowerBI in Dimapur",
    description:
      "Upskill in Business Intelligence using PowerBI. Industry-certified training for career success. Join Instudia today!",
    openGraph: {
      title:
        "Build Your Career: Learn Business Intelligence using PowerBI | Instudia",
      description:
        "Top Business Intelligence using PowerBI training institute in Dimapur, Nagaland. Master programming, Tally, GST, web design & graphic courses. Industry-certified training for career success. Join Instudia today!",
      url: `${AppConfig.canonicalBase}`,
      locale: AppConfig.locale,
      siteName: AppConfig.site_name,
      images: [
        {
          url: "https://res.cloudinary.com/dhwg77gwm/image/upload/f_auto,q_auto/v1/instudia/qzmdhewkbsyxmwsjccnu",
          width: 800,
          height: 600,
          alt: "Enroll with instudia",
          type: "image/png",
        },
      ],
    },
    twitter: {
      title: "Business Intelligence using PowerBI in Dimapur",
      description:
        "Elevate your career with Business Intelligence using PowerBI in Dimapur, Nagaland. Explore cutting-edge courses in programming, graphic design, web development, Tally, GST, and more at Instudia. Unlock success with industry-focused training.",
      card: "https://res.cloudinary.com/dhwg77gwm/image/upload/f_auto,q_auto/v1/instudia/qzmdhewkbsyxmwsjccnu",
    },
    metadataBase: new URL("https://instudianagaland.com"),
  },
  [slugs.PROJECT_MANAGEMENT]: {
    title: "Project Management in Dimapur",
    description:
      "Upskill in Project Management. Industry-certified training for career success. Join Instudia today!",
    openGraph: {
      title: "Build Your Career: Learn Project Management | Instudia",
      description:
        "Top Project Management training institute in Dimapur, Nagaland. Master programming, Tally, GST, web design & graphic courses. Industry-certified training for career success. Join Instudia today!",
      url: `${AppConfig.canonicalBase}`,
      locale: AppConfig.locale,
      siteName: AppConfig.site_name,
      images: [
        {
          url: "https://res.cloudinary.com/dhwg77gwm/image/upload/f_auto,q_auto/v1/instudia/qzmdhewkbsyxmwsjccnu",
          width: 800,
          height: 600,
          alt: "Enroll with instudia",
          type: "image/png",
        },
      ],
    },
    twitter: {
      title: "Project Management in Dimapur",
      description:
        "Elevate your career with Project Management in Dimapur, Nagaland. Explore cutting-edge courses in programming, graphic design, web development, Tally, GST, and more at Instudia. Unlock success with industry-focused training.",
      card: "https://res.cloudinary.com/dhwg77gwm/image/upload/f_auto,q_auto/v1/instudia/qzmdhewkbsyxmwsjccnu",
    },
    metadataBase: new URL("https://instudianagaland.com"),
  },
  [slugs.DEVOPS]: {
    title: "DevOps in Dimapur",
    description:
      "Upskill in DevOps. Industry-certified training for career success. Join Instudia today!",
    openGraph: {
      title: "Build Your Career: Learn DevOps | Instudia",
      description:
        "Top DevOps training institute in Dimapur, Nagaland. Master programming, Tally, GST, web design & graphic courses. Industry-certified training for career success. Join Instudia today!",
      url: `${AppConfig.canonicalBase}`,
      locale: AppConfig.locale,
      siteName: AppConfig.site_name,
      images: [
        {
          url: "https://res.cloudinary.com/dhwg77gwm/image/upload/f_auto,q_auto/v1/instudia/qzmdhewkbsyxmwsjccnu",
          width: 800,
          height: 600,
          alt: "Enroll with instudia",
          type: "image/png",
        },
      ],
    },
    twitter: {
      title: "DevOps in Dimapur",
      description:
        "Elevate your career with DevOps in Dimapur, Nagaland. Explore cutting-edge courses in programming, graphic design, web development, Tally, GST, and more at Instudia. Unlock success with industry-focused training.",
      card: "https://res.cloudinary.com/dhwg77gwm/image/upload/f_auto,q_auto/v1/instudia/qzmdhewkbsyxmwsjccnu",
    },
    metadataBase: new URL("https://instudianagaland.com"),
  },
  [slugs.HARDWARE_NETWORKING]: {
    title: "Hardware and Networking in Dimapur",
    description:
      "Upskill in Hardware and Networking. Industry-certified training for career success. Join Instudia today!",
    openGraph: {
      title: "Build Your Career: Learn Hardware and Networking | Instudia",
      description:
        "Top Hardware and Networking training institute in Dimapur, Nagaland. Master programming, Tally, GST, web design & graphic courses. Industry-certified training for career success. Join Instudia today!",
      url: `${AppConfig.canonicalBase}`,
      locale: AppConfig.locale,
      siteName: AppConfig.site_name,
      images: [
        {
          url: "https://res.cloudinary.com/dhwg77gwm/image/upload/f_auto,q_auto/v1/instudia/qzmdhewkbsyxmwsjccnu",
          width: 800,
          height: 600,
          alt: "Enroll with instudia",
          type: "image/png",
        },
      ],
    },
    twitter: {
      title: "Hardware and Networking in Dimapur",
      description:
        "Elevate your career with Hardware and Networking in Dimapur, Nagaland. Explore cutting-edge courses in programming, graphic design, web development, Tally, GST, and more at Instudia. Unlock success with industry-focused training.",
      card: "https://res.cloudinary.com/dhwg77gwm/image/upload/f_auto,q_auto/v1/instudia/qzmdhewkbsyxmwsjccnu",
    },
    metadataBase: new URL("https://instudianagaland.com"),
  },
  [slugs.RETAIL_MANAGEMENT]: {
    title: "Retail Management in Dimapur",
    description:
      "Upskill in Retail Management. Industry-certified training for career success. Join Instudia today!",
    openGraph: {
      title: "Build Your Career: Learn Retail Management | Instudia",
      description:
        "Top Retail Management training institute in Dimapur, Nagaland. Master programming, Tally, GST, web design & graphic courses. Industry-certified training for career success. Join Instudia today!",
      url: `${AppConfig.canonicalBase}`,
      locale: AppConfig.locale,
      siteName: AppConfig.site_name,
      images: [
        {
          url: "https://res.cloudinary.com/dhwg77gwm/image/upload/f_auto,q_auto/v1/instudia/qzmdhewkbsyxmwsjccnu",
          width: 800,
          height: 600,
          alt: "Enroll with instudia",
          type: "image/png",
        },
      ],
    },
    twitter: {
      title: "Retail Management in Dimapur",
      description:
        "Elevate your career with Retail Management in Dimapur, Nagaland. Explore cutting-edge courses in programming, graphic design, web development, Tally, GST, and more at Instudia. Unlock success with industry-focused training.",
      card: "https://res.cloudinary.com/dhwg77gwm/image/upload/f_auto,q_auto/v1/instudia/qzmdhewkbsyxmwsjccnu",
    },
    metadataBase: new URL("https://instudianagaland.com"),
  },
  [slugs.FOOD_PROCESSING]: {
    title: "Food Processing in Dimapur",
    description:
      "Upskill in Food Processing. Industry-certified training for career success. Join Instudia today!",
    openGraph: {
      title: "Build Your Career: Learn Food Processing | Instudia",
      description:
        "Top Food Processing training institute in Dimapur, Nagaland. Master programming, Tally, GST, web design & graphic courses. Industry-certified training for career success. Join Instudia today!",
      url: `${AppConfig.canonicalBase}`,
      locale: AppConfig.locale,
      siteName: AppConfig.site_name,
      images: [
        {
          url: "https://res.cloudinary.com/dhwg77gwm/image/upload/f_auto,q_auto/v1/instudia/qzmdhewkbsyxmwsjccnu",
          width: 800,
          height: 600,
          alt: "Enroll with instudia",
          type: "image/png",
        },
      ],
    },
    twitter: {
      title: "Food Processing in Dimapur",
      description:
        "Elevate your career with Food Processing in Dimapur, Nagaland. Explore cutting-edge courses in programming, graphic design, web development, Tally, GST, and more at Instudia. Unlock success with industry-focused training.",
      card: "https://res.cloudinary.com/dhwg77gwm/image/upload/f_auto,q_auto/v1/instudia/qzmdhewkbsyxmwsjccnu",
    },
    metadataBase: new URL("https://instudianagaland.com"),
  }
};

export default META_LOOKUP;
