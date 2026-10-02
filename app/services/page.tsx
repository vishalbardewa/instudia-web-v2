import React from "react";
import { Metadata } from "next";
import { getAllServices } from "@/app/data/servicesData";
import { SITE_URL } from "@/lib/site";
import { buildMetadata } from "@/lib/metadata";
import SterlingServicesView from "./components/SterlingServicesView";

export const metadata: Metadata = buildMetadata({
  title: "Technology Solutions & Institutional Services | instudia",
  description:
    "Explore instudia's specialized services: custom web and software development, cloud & DevOps engineering, UI/UX design, corporate tech upskilling, and campus bootcamps in Dimapur, Nagaland.",
  path: "/services",
  image: "https://res.cloudinary.com/dhwg77gwm/image/upload/f_auto,q_auto/v1/instudia/tqo7qzztc4duzktj0jt9",
  imageAlt: "instudia Technology Solutions and Services",
});

const partners = [
  "North East Institute of Social Sciences and Research (NEISSR)",
  "MGM College, Dimapur",
  "Immanuel College, Dimapur",
  "Ministry of MSME (Govt. of India)",
  "Christian Higher Secondary School (CHSS)",
  "Pilgrim Higher Secondary School",
  "Assisi Higher Secondary School",
  "Lewis Academy",
];

const generalFaqs = [
  {
    question: "What kinds of clients do you work with?",
    answer:
      "We work with growing businesses, startups, colleges, schools, and regional enterprises. Our work covers custom web apps, cloud infrastructure, UI/UX design, corporate team upskilling, and student coding bootcamps.",
  },
  {
    question: "Do you take on projects outside Nagaland?",
    answer:
      "Yes. While we are based in Dimapur, Nagaland, we work with founders and organizations across Northeast India, pan-India, and remotely using Google Meet, Slack, and GitHub.",
  },
  {
    question: "How do your pricing and contracts work?",
    answer:
      "We believe in transparent, fixed-price milestones. You know the exact cost and delivery date upfront with zero surprise hourly invoices. We also offer monthly retainers for ongoing development and support.",
  },
  {
    question: "How do we get started?",
    answer:
      "Send us a note through the form below or chat with our technical lead directly on WhatsApp at +91 87985 87779. We will review what you need and get back to you within 24 hours.",
  },
  {
    question: "What happens after our project launches?",
    answer:
      "Every custom build comes with a 30-day warranty for bug fixes and adjustments at no extra charge. We also offer monthly maintenance if you want us to handle updates and server monitoring long-term.",
  },
];

export default function ServicesHubPage() {
  const services = getAllServices();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    name: "instudia",
    url: `${SITE_URL}/services`,
    description:
      "Specialized technology and enterprise services including custom web development, cloud & DevOps infrastructure, UI/UX design, corporate training, campus bootcamps, and career mentorship.",
    telephone: "+91-8798-587779",
    address: {
      "@type": "PostalAddress",
      streetAddress: "First Floor, Vikiye Center, Opposite Notun Bosti Gate, Fellowship Colony",
      addressLocality: "Dimapur",
      addressRegion: "Nagaland",
      postalCode: "797112",
      addressCountry: "IN",
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "instudia Technical & Institutional Services Catalog",
      itemListElement: services.map((service) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: service.title,
          url: `${SITE_URL}/services/${service.slug}`,
          description: service.heroDescription,
        },
      })),
    },
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: generalFaqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <main className="min-h-screen bg-[#F8F7F5]">
      {/* Schema.org Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* Sterling Redesigned Services Experience */}
      <SterlingServicesView
        services={services}
        partners={partners}
        faqs={generalFaqs}
      />
    </main>
  );
}

