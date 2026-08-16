export function LocalBusinessSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": ["EducationalOrganization", "LocalBusiness"],
    name: "instudia",
    legalName: "instudia Tech & Skill Training Institute",
    url: "https://www.instudianagaland.com",
    logo: "https://res.cloudinary.com/dhwg77gwm/image/upload/f_auto,q_auto,fl_strip_profile/v1/instudia/qzmdhewkbsyxmwsjccnu",
    image: "https://res.cloudinary.com/dhwg77gwm/image/upload/f_auto,q_auto,fl_strip_profile/v1/instudia/tqo7qzztc4duzktj0jt9",
    description:
      "Premier computer training & skill development institute in Dimapur, Nagaland offering certification courses in programming, web development, graphic design, Tally with GST, and office applications.",
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
      "@type": "AdministrativeArea",
      name: "Nagaland",
    },
    knowsAbout: [
      "Computer Science Education",
      "Fullstack Web Development",
      "Python Programming",
      "Graphic Design",
      "Tally Prime & GST Accounting",
      "Diploma in Computer Applications",
      "Artificial Intelligence & Machine Learning",
      "Project Management",
    ],
    sameAs: [
      "https://www.facebook.com/instudianagaland/",
      "https://www.instagram.com/instudia_nagaland/",
      "https://www.linkedin.com/company/instudia-trainings",
      "https://www.youtube.com/@instudia",
    ],
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
