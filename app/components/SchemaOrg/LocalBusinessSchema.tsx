export function LocalBusinessSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": ["EducationalOrganization", "LocalBusiness"],
    name: "instudia",
    url: "https://www.instudianagaland.com",
    logo: "https://res.cloudinary.com/dhwg77gwm/image/upload/f_auto,q_auto/v1/instudia/qzmdhewkbsyxmwsjccnu",
    description:
      "Top computer training institute in Dimapur, Nagaland offering courses in programming, web development, graphic design, Tally, GST and more.",
    telephone: "+918798587779",
    email: "instudia.nagaland@gmail.com",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Vikiye Center, 1st Floor, Notun Bosti",
      addressLocality: "Dimapur",
      addressRegion: "Nagaland",
      postalCode: "797112",
      addressCountry: "IN",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 25.9123,
      longitude: 93.7251,
    },
    areaServed: {
      "@type": "State",
      name: "Nagaland",
    },
    sameAs: [
      "https://www.facebook.com/instudianagaland/",
      "https://www.instagram.com/instudia_nagaland/",
      "https://www.linkedin.com/company/instudia-trainings",
      "https://www.youtube.com/@instudia",
    ],
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      reviewCount: "128",
      bestRating: "5",
      worstRating: "1",
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "10:00",
        closes: "16:00",
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
