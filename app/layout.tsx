import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import Script from "next/script";
import "./globals.css";

import PrimaryLayout from "./components/layouts/PrimaryLayout";
import DeviceSizeIndicator from "./components/atom/DeviceSizeIndicator";
import { GoogleAnalytics } from "@next/third-parties/google";
import { AppConfig } from "./_utils/AppConfig";

const inter = Inter({ subsets: ["latin"] });
const jakarta = Plus_Jakarta_Sans({ subsets: ["latin"] });

export const metadata = {
  title:
    "Computer & Skill Courses in Nagaland | instudia",
  description:
    "Master in-demand skills in Dimapur! instudia offers top computer courses: Programming, Web Development, Project Management & Digital Skills. Boost your career in Nagaland. Enroll now!",
  openGraph: {
    title:
      "Best Computer Courses & Skill Training in Dimapur | instudia",
    description:
      "Launch your tech career in Dimapur! instudia's expert training in Programming, Web Development, Project Management & Digital Skills. Practical courses for success in Nagaland. Learn more!",
    url: `${AppConfig.canonicalBase}`,
    locale: AppConfig.locale,
    siteName: AppConfig.site_name,
    images: [
      {
        url: "https://res.cloudinary.com/dhwg77gwm/image/upload/f_auto,q_auto/v1/instudia/tqo7qzztc4duzktj0jt9",
        width: 800,
        height: 600,
        type: "image/jpeg",
        alt: "Upskill with instudia",
      },
      {
        url: "https://res.cloudinary.com/dhwg77gwm/image/upload/f_auto,q_auto/v1/instudia/qzmdhewkbsyxmwsjccnu",
        width: 800,
        height: 600,
        alt: "Enroll with instudia",
        type: "image/jpeg",
      },
    ],
  },
  twitter: {
    title:
      "Best Computer Courses & Skill Training in Dimapur | instudia",
    description:
      "Master in-demand skills in Dimapur! instudia offers top computer courses: Programming, Web Development, Project Management & Digital Skills. Boost your career in Nagaland. Enroll now!",
    card: "https://res.cloudinary.com/dhwg77gwm/image/upload/f_auto,q_auto/v1/instudia/tqo7qzztc4duzktj0jt9",
  },
  metadataBase: new URL("https://instudianagaland.com"),
  alternates: {
    canonical: "https://www.instudianagaland.com",
  },
};

const GA_MEASUREMENT_ID = "UA-232483046-1";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "EducationalOrganization",
  name: "instudia",
  url: "https://www.instudianagaland.com",
  logo: "https://www.instudianagaland.com/assets/images/logo-with-tagline.png",
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
    <html lang="en">
      <body className={jakarta.className}>
        <PrimaryLayout>
          <DeviceSizeIndicator />
          {children}
        </PrimaryLayout>
        <GoogleAnalytics gaId={GA_MEASUREMENT_ID || ""} />
        <Script
          id="site-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLd),
          }}
        />
      </body>
    </html>
  );
}
