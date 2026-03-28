import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import "highlight.js/styles/github-dark.css";

import ConditionalLayout from "./components/layouts/ConditionalLayout";
import DeviceSizeIndicator from "./components/atom/DeviceSizeIndicator";
import { GoogleAnalytics } from "@next/third-parties/google";
import { AppConfig } from "./_utils/AppConfig";

const inter = Inter({ subsets: ["latin"] });
const jakarta = Plus_Jakarta_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Computer & Skill Courses in Nagaland | instudia",
  description: "Master in-demand skills in Dimapur! instudia offers top computer courses: Programming, Web Development, Graphic Design, Project Management, DCA, PGDCA, Tally, GST & Digital Skills. Boost your career in Nagaland. Enroll now!",
  metadataBase: new URL(AppConfig.canonicalBase),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Best Computer Courses & Skill Training in Dimapur | instudia",
    description: "Launch your tech career in Dimapur! instudia's expert training in Programming, Web Development, Project Management & Digital Skills. Practical courses for success in Nagaland. Learn more!",
    url: AppConfig.canonicalBase,
    locale: AppConfig.locale,
    siteName: AppConfig.site_name,
    images: [
      {
        url: "https://res.cloudinary.com/dhwg77gwm/image/upload/f_auto,q_auto/v1/instudia/tqo7qzztc4duzktj0jt9",
        width: 1200,
        height: 630,
        type: "image/jpeg",
        alt: "Upskill with instudia",
      },
    ],
  },
  twitter: {
    title: "Best Computer Courses & Skill Training in Dimapur | instudia",
    description: "Master in-demand skills in Dimapur! instudia offers top computer courses: Programming, Web Development, Project Management & Digital Skills. Boost your career in Nagaland. Enroll now!",
    card: "summary_large_image",
    images: ["https://res.cloudinary.com/dhwg77gwm/image/upload/f_auto,q_auto/v1/instudia/tqo7qzztc4duzktj0jt9"],
  },
};

const GA_MEASUREMENT_ID = "UA-232483046-1";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": ["EducationalOrganization", "LocalBusiness"],
  "name": "instudia",
  "url": "https://www.instudianagaland.com",
  "logo": "https://www.instudianagaland.com/assets/images/logo-with-tagline.png",
  "image": "https://www.instudianagaland.com/assets/images/logo-with-tagline.png",
  "telephone": "+91-8798-587779",
  "priceRange": "₹₹",
  description:
    "We offer top computer courses: Programming, Web Development, Graphic Design, Project Management & Digital Skills. Boost your career in Nagaland",
  address: {
    "@type": "PostalAddress",
    streetAddress:
      "First Floor, Vikiye Center, Opposite Notun Bosti Gate, Fellowship Colony",
    addressLocality: "Dimapur",
    addressRegion: "Nagaland",
    postalCode: "797112",
    addressCountry: "IN",
  },
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+91-8798-587779",
    contactType: "Admissions",
    email: "instudia.nagaland@gmail.com",
    availableLanguage: ["English", "Hindi", "Nagamese", "Assamese"],
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": "25.9123",
    "longitude": "93.7251"
  },
  "openingHoursSpecification": [
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      "opens": "09:00",
      "closes": "17:00"
    }
  ],
  sameAs: [
    "https://www.facebook.com/instudianagaland",
    "https://www.instagram.com/instudia_nagaland",
    "https://www.linkedin.com/instudia-trainings",
    "https://www.youtube.com/@instudia",
  ],
  founder: {
    "@type": "Person",
    name: "Daniel Changkija",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-IN">
      <body className={jakarta.className}>
        <ConditionalLayout>
          <DeviceSizeIndicator />
          {children}
        </ConditionalLayout>
        <GoogleAnalytics gaId={GA_MEASUREMENT_ID || ""} />
        <Script
          id="site-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLd),
          }}
        />
        <Script
          id="faq-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              "mainEntity": [
                {
                  "@type": "Question",
                  "name": "What computer courses does instudia offer in Dimapur?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "instudia offers 19+ courses in Dimapur, Nagaland including Web Development, Graphic Design, Programming (Python, JavaScript), Data Analysis, Tally with GST, DCA, PGDCA, Digital Marketing, and Project Management."
                  }
                },
                {
                  "@type": "Question",
                  "name": "Where is instudia located in Dimapur?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "instudia is located at First Floor, Vikiye Center, Opposite Notun Bosti Gate, Fellowship Colony, Dimapur, Nagaland 797112."
                  }
                },
                {
                  "@type": "Question",
                  "name": "Is instudia a certified computer institute?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Yes, instudia is ISO certified and affiliated with AISECT and MSME. It is a government-recognized skill training institution in Nagaland."
                  }
                },
                {
                  "@type": "Question",
                  "name": "How long are the courses at instudia?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Course durations at instudia range from 1 month to 12 months depending on the program. Short-term skill courses typically run 1-3 months, while diploma programs like DCA and PGDCA run 6-12 months."
                  }
                },
                {
                  "@type": "Question",
                  "name": "Does instudia offer job placement support?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Yes, instudia provides career services including resume building, interview preparation, salary negotiation coaching, and referrals to partner companies in Nagaland and beyond."
                  }
                },
                {
                  "@type": "Question",
                  "name": "How do I enroll in a course at instudia?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "You can enroll at instudia by visiting our institute in Dimapur, calling us at +91-8798-587779, or filling out the online enrollment form at instudianagaland.com."
                  }
                }
              ]
            })
          }}
        />
        <Script
          id="website-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "name": "instudia",
              "url": "https://www.instudianagaland.com",
              "potentialAction": {
                "@type": "SearchAction",
                "target": "https://www.instudianagaland.com/courses?q={search_term_string}",
                "query-input": "required name=search_term_string"
              }
            })
          }}
        />
      </body>
    </html>
  );
}
