import type { Metadata, Viewport } from "next";
import { Suspense } from "react";
import { Plus_Jakarta_Sans } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import MotionProvider from "./components/atom/MotionProvider";

import ConditionalLayout from "./components/layouts/ConditionalLayout";
import DeviceSizeIndicator from "./components/atom/DeviceSizeIndicator";
import { GoogleAnalytics } from "@next/third-parties/google";
import { AppConfig } from "./_utils/AppConfig";
import { LocalBusinessSchema } from "./components/SchemaOrg/LocalBusinessSchema";

import { SITE_URL, canonicalFor } from "@/lib/site";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  display: "swap",
  preload: true,
  adjustFontFallback: true,
});

export const viewport: Viewport = {
  themeColor: "#1E1B2E",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  title: {
    default: "Best Computer Courses & Skill Training in Dimapur | instudia",
    template: "%s | instudia",
  },
  description: "Master Programming, Web Development, Graphic Design & Digital Skills in Dimapur. Top computer courses like DCA, Tally & GST. Boost your career. Enroll now!",
  metadataBase: new URL(SITE_URL),
  alternates: {
    canonical: canonicalFor("/"),
  },
  icons: {
    icon: "/assets/icons/icon.png",
    shortcut: "/assets/icons/icon.png",
    apple: "/assets/icons/icon.png",
  },
  openGraph: {
    title: {
      default: "Best Computer Courses & Skill Training in Dimapur | instudia",
      template: "%s | instudia",
    },
    description: "Launch your tech career in Dimapur! instudia's expert training in Programming, Web Development, Project Management & Digital Skills.",
    url: canonicalFor("/"),
    locale: "en_IN",
    siteName: "instudia",
    images: [
      {
        url: "https://res.cloudinary.com/dhwg77gwm/image/upload/f_auto,q_auto,fl_strip_profile/v1/instudia/tqo7qzztc4duzktj0jt9",
        width: 1200,
        height: 630,
        type: "image/jpeg",
        alt: "Upskill with instudia",
      },
    ],
  },
  twitter: {
    title: {
      default: "Best Computer Courses & Skill Training in Dimapur | instudia",
      template: "%s | instudia",
    },
    description: "Master in-demand skills in Dimapur! instudia offers top computer courses: Programming, Web Development, Project Management & Digital Skills. Boost your career in Nagaland. Enroll now!",
    card: "summary_large_image",
    images: ["https://res.cloudinary.com/dhwg77gwm/image/upload/f_auto,q_auto,fl_strip_profile/v1/instudia/tqo7qzztc4duzktj0jt9"],
  },
};

const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_ID || "";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-IN">
      <head>
        <link rel="preload" as="image" href="/assets/images/hero-students.webp" type="image/webp" fetchPriority="high" />
        <link rel="preconnect" href="https://ik.imagekit.io" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://ik.imagekit.io" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://res.cloudinary.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://res.cloudinary.com" />
        <LocalBusinessSchema />
        <link rel="alternate" type="application/rss+xml" title="instudia RSS Feed" href="https://www.instudianagaland.com/rss.xml" />
        <script
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
      </head>
      <body className={jakarta.className}>
        <MotionProvider>
          <ConditionalLayout>
            <DeviceSizeIndicator />
            {children}
          </ConditionalLayout>
        </MotionProvider>
        {/* Deferred analytics — loads after page is interactive */}
        {GA_MEASUREMENT_ID && (
          <Suspense fallback={null}>
            <GoogleAnalytics gaId={GA_MEASUREMENT_ID} />
          </Suspense>
        )}
      </body>
    </html>
  );
}
