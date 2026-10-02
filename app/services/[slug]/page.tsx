import React from "react";
import { Metadata, ResolvingMetadata } from "next";
import { notFound } from "next/navigation";
import { servicesData, getServiceBySlug } from "@/app/data/servicesData";
import { SITE_URL, canonicalFor } from "@/lib/site";
import { buildMetadata } from "@/lib/metadata";
import SterlingServiceDetailView from "../components/SterlingServiceDetailView";

type Props = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export async function generateStaticParams() {
  return servicesData.map((service) => ({ slug: service.slug }));
}

export const dynamicParams = false;

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceBySlug(slug);

  if (!service) {
    return {
      title: "Service Not Found | instudia",
    };
  }

  const pageUrl = canonicalFor(`/services/${slug}`);

  return {
    title: service.metaTitle,
    description: service.metaDescription,
    keywords: service.keywords,
    metadataBase: new URL(SITE_URL),
    alternates: {
      canonical: pageUrl,
    },
    openGraph: {
      title: service.metaTitle,
      description: service.metaDescription,
      url: pageUrl,
      locale: "en_IN",
      siteName: "instudia",
      type: "website",
      images: [
        {
          url: "https://res.cloudinary.com/dhwg77gwm/image/upload/f_auto,q_auto/v1/instudia/tqo7qzztc4duzktj0jt9",
          width: 1200,
          height: 630,
          alt: `${service.title} by instudia`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: service.metaTitle,
      description: service.metaDescription,
      images: [
        "https://res.cloudinary.com/dhwg77gwm/image/upload/f_auto,q_auto/v1/instudia/tqo7qzztc4duzktj0jt9",
      ],
    },
  };
}

export default async function ServiceDetailPage({ params }: Props) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);

  if (!service) {
    notFound();
  }

  // Schema.org Structured Data
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.title,
    serviceType: service.badge,
    provider: {
      "@type": "EducationalOrganization",
      name: "instudia",
      url: SITE_URL,
      telephone: "+91-8798-587779",
      address: {
        "@type": "PostalAddress",
        streetAddress:
          "First Floor, Vikiye Center, Opposite Notun Bosti Gate, Fellowship Colony",
        addressLocality: "Dimapur",
        addressRegion: "Nagaland",
        postalCode: "797112",
        addressCountry: "IN",
      },
    },
    areaServed: [
      { "@type": "AdministrativeArea", name: "Nagaland" },
      { "@type": "AdministrativeArea", name: "Northeast India" },
      { "@type": "Country", name: "India" },
    ],
    description: service.heroDescription,
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: service.faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <main className="bg-[#F8F7F5] min-h-screen text-[#121212]">
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* Sterling Executive Service Detail View */}
      <SterlingServiceDetailView service={service} />
    </main>
  );
}
