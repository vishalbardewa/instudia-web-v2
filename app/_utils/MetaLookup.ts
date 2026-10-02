import { slugs } from "../routes";

// Compact course SEO metadata dictionary (ponytail shrink: titles & descriptions only)
const META_LOOKUP: Record<string, { title: string; description: string }> = {
  [slugs.PYTHON]: {
    title: "Python Programming Course in Dimapur",
    description:
      "Master Python syntax, OOP & real-world projects in Dimapur. Beginner-friendly 1-month coding course in Nagaland. Join now!",
  },
  [slugs.JAVASCRIPT]: {
    title: "JavaScript Programming Foundation Course in Dimapur",
    description:
      "Master JavaScript syntax, ES6+, DOM manipulation & async logic in Dimapur. Practical coding foundation course in Nagaland. Enroll today!",
  },
  [slugs.GO]: {
    title: "Go Programming Foundation Course in Dimapur",
    description:
      "Master Go (Golang) syntax, concurrency with goroutines, types & systems coding in Dimapur. High-performance coding course in Nagaland. Join now!",
  },
  [slugs.SPSS]: {
    title: "SPSS Data Analysis Course in Dimapur, Nagaland",
    description:
      "Master statistical data analysis with IBM SPSS in Dimapur. Learn hypothesis testing, ANOVA, regression, research methodology & survey analytics. Enroll today!",
  },
  [slugs.DCA]: {
    title: "DCA Computer Course in Dimapur, Nagaland",
    description:
      "6-month DCA Diploma in Dimapur. Master MS Office, computer basics & Tally. ISO-certified training in Nagaland. Enroll today!",
  },
  [slugs.PGDCA]: {
    title: "PGDCA Diploma Course in Dimapur, Nagaland",
    description:
      "12-month PGDCA Diploma in Dimapur. Master advanced IT concepts, database management & software applications at Instudia Nagaland.",
  },
  [slugs.GRAPHIC_DESIGN]: {
    title: "Graphic Design Course in Dimapur, Nagaland",
    description:
      "Master Photoshop, Illustrator & Canva in Dimapur. Build your creative design portfolio at Instudia Nagaland. Start today!",
  },
  [slugs.ADVANCED_EXCEL]: {
    title: "Advanced Excel Course in Dimapur, Nagaland",
    description:
      "Master Excel pivot tables, VLOOKUP & data macros in Dimapur. Enhance your office productivity in Nagaland. Join today!",
  },
  [slugs.FRONTEND]: {
    title: "Frontend React Course in Dimapur, Nagaland",
    description:
      "Learn HTML, CSS, JavaScript & React in Dimapur. Build modern responsive web UIs at Instudia Nagaland. Enroll today!",
  },
  [slugs.BACKEND]: {
    title: "Backend Node.js Course in Dimapur, Nagaland",
    description:
      "Master Node.js, Express & SQL database APIs in Dimapur. Industry-focused backend developer course in Nagaland.",
  },
  [slugs.FULLSTACK_WEB_DEVELOPMENT]: {
    title: "Fullstack Web Dev Course in Dimapur",
    description:
      "Learn React, Node.js & databases in Dimapur. Build fullstack web apps with hands-on projects at Instudia Nagaland. Enroll now!",
  },
  [slugs.GST]: {
    title: "Tally with GST Course in Dimapur, Nagaland",
    description:
      "Master Tally Prime & GST e-invoicing in Dimapur. Learn tax compliance and digital accounting with Instudia. Enroll today!",
  },
  [slugs.TALLY]: {
    title: "Accounting with Tally Course in Dimapur",
    description:
      "Learn digital bookkeeping & ledger management with Tally in Dimapur. Practical 1-month accounting course in Nagaland.",
  },
  [slugs.MOBILE_APP_DEVELOPMENT]: {
    title: "Mobile App Dev Course in Dimapur, Nagaland",
    description:
      "Build iOS & Android apps with React Native in Dimapur. Learn mobile UI & native APIs at Instudia Nagaland. Join today!",
  },
  [slugs.UIUX_DESIGN]: {
    title: "UI/UX Design Course in Dimapur, Nagaland",
    description:
      "Master Figma, wireframing & user research in Dimapur. Build intuitive mobile/web app prototypes at Instudia. Apply now!",
  },
  [slugs.BUSINESS_INTELLIGENCE]: {
    title: "Power BI & BI Course in Dimapur, Nagaland",
    description:
      "Create interactive dashboards & DAX analytics with Power BI in Dimapur. Boost corporate decision-making in Nagaland.",
  },
  [slugs.PROJECT_MANAGEMENT]: {
    title: "Project Management Course in Dimapur",
    description:
      "Master Agile, Scrum & project lifecycle management in Dimapur. Prepare for leadership roles in Nagaland. Enroll today!",
  },
  [slugs.DEVOPS]: {
    title: "DevOps & Cloud Course in Dimapur, Nagaland",
    description:
      "Learn Docker, Kubernetes, AWS & CI/CD pipelines in Dimapur. Practical cloud automation training at Instudia Nagaland.",
  },
  [slugs.HARDWARE_NETWORKING]: {
    title: "Hardware & Networking Course in Dimapur",
    description:
      "Computer assembly, hardware repair & network admin training in Dimapur. ISO-certified IT support course in Nagaland.",
  },
  [slugs.RETAIL_MANAGEMENT]: {
    title: "Retail Management Course in Dimapur, Nagaland",
    description:
      "Master customer service, inventory & sales operations in Dimapur. Fast-track your retail career in Nagaland. Enroll now!",
  },
  [slugs.FOOD_PROCESSING]: {
    title: "Food Processing Course in Dimapur, Nagaland",
    description:
      "Learn food preservation, safety standards & quality control in Dimapur. Skilled training for Nagaland's food sector.",
  },
  [slugs.AGENTIC_AI]: {
    title: "Agentic AI Course in Dimapur, Nagaland",
    description:
      "Build autonomous AI agents with LangGraph & CrewAI in Dimapur. Lead AI workflow automation in Nagaland. Apply today!",
  },
  [slugs.DATA_ANALYTICS]: {
    title: "Data Analytics Course in Dimapur, Nagaland",
    description:
      "Master Python, SQL & Power BI in Dimapur. Transform raw data into business insights with Instudia Nagaland. Apply now!",
  },
  [slugs.GENERATIVE_AI]: {
    title: "Generative AI Course in Dimapur, Nagaland",
    description:
      "Master LLMs, prompt engineering & GPT apps in Dimapur. Build real-world GenAI projects with Instudia Nagaland.",
  },
};

export default META_LOOKUP;
