import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { buildMetadata } from "@/lib/metadata";
import { SITE_URL } from "@/lib/site";
import ReviewForm from "./ReviewForm";
import {
  MapPinIcon,
  PhoneIcon,
  ShieldCheckIcon,
  StarIcon,
  SparklesIcon,
} from "@heroicons/react/24/outline";

export const metadata: Metadata = buildMetadata({
  title: "Share Your Experience | Google Reviews",
  description:
    "Leave a Google Review for instudia Dimapur. Help prospective students and parents make informed decisions about coding, accounting, AI, and career skills training.",
  path: "/review",
  image:
    "https://res.cloudinary.com/dhwg77gwm/image/upload/f_auto,q_auto/v1/instudia/tqo7qzztc4duzktj0jt9",
  imageAlt: "Share Your instudia Experience — Google Reviews",
});

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "EducationalOrganization",
  name: "instudia",
  url: SITE_URL,
  telephone: "+91 87985 87779",
  address: {
    "@type": "PostalAddress",
    streetAddress: "First Floor, Vikiye Center, Opposite Notun Bosti Gate, Fellowship Colony",
    addressLocality: "Dimapur",
    addressRegion: "Nagaland",
    postalCode: "797112",
    addressCountry: "IN",
  },
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.9",
    reviewCount: "120",
    bestRating: "5",
    worstRating: "1",
  },
};

export default function ReviewPage() {
  return (
    <div className="min-h-screen bg-[#FDFBF7] text-neutral-900 selection:bg-brandpurple selection:text-white">
      {/* Background Decorative Gradient */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[450px] pointer-events-none opacity-40 overflow-hidden"
        aria-hidden="true"
      >
        <div className="absolute top-[-20%] left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-gradient-to-b from-brandpurple/20 via-amber-200/20 to-transparent blur-3xl rounded-full" />
      </div>

      <main className="relative z-10 px-3 sm:px-6 lg:px-8 pt-4 sm:pt-10 pb-16 sm:pb-20">
        {/* The Review Funnel Form */}
        <ReviewForm />

        {/* Trust & Location Footer Card */}
        <div className="max-w-2xl mx-auto mt-8 sm:mt-12 bg-white/70 backdrop-blur-xs border border-neutral-200/90 rounded-2xl p-4 sm:p-6 text-xs text-neutral-600 shadow-2xs">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3.5 sm:gap-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-neutral-100 border border-neutral-200 flex items-center justify-center shrink-0">
                <MapPinIcon className="w-4 h-4 sm:w-5 sm:h-5 text-neutral-700" />
              </div>
              <div>
                <p className="font-bold text-neutral-900 text-xs sm:text-sm">
                  instudia • Dimapur, Nagaland
                </p>
                <p className="text-[10px] sm:text-[11px] text-neutral-500 leading-tight">
                  Vikiye Center, Opposite Notun Bosti Gate, Fellowship Colony
                </p>
              </div>
            </div>

            <div className="w-full sm:w-auto flex items-center justify-end text-xs">
              <a
                href="tel:+918798587779"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 font-bold text-neutral-800 hover:text-brandpurple bg-neutral-100/80 sm:bg-transparent py-2 px-3 sm:p-0 rounded-xl sm:rounded-none transition-colors"
              >
                <PhoneIcon className="w-3.5 h-3.5 text-neutral-500" />
                <span>+91 87985 87779</span>
              </a>
            </div>
          </div>
        </div>
      </main>

      {/* Schema.org EducationalOrganization structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </div>
  );
}

