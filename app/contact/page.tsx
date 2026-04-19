import Script from "next/script";

export const metadata = {
  title: "Contact Us | Reach Us in Dimapur",
  description:
    "Get in touch with instudia — the premier computer training institute in Dimapur. Contact us for admissions, collaborations, or career queries.",
  openGraph: {
    title: "Contact Us | Reach Us in Dimapur",
    description:
      "Contact instudia for admissions and enquiries. Located in Fellowship Colony, Dimapur, Nagaland.",
  },
  alternates: {
    canonical: "/contact",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "instudia",
  image: "https://www.instudianagaland.com/assets/images/logo-with-tagline.png",
  url: "https://www.instudianagaland.com",
  telephone: "+91 87985 87779",
  email: "instudia.nagaland@gmail.com",
  address: {
    "@type": "PostalAddress",
    streetAddress:
      "First Floor, Vikiye Center, Opposite Notun Bosti Gate, Fellowship Colony",
    addressLocality: "Dimapur",
    addressRegion: "Nagaland",
    postalCode: "797112",
    addressCountry: "IN",
  },
  openingHoursSpecification: {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ],
    opens: "09:00",
    closes: "18:00",
  },
};

const contacts = [
  {
    label: "Collaborate",
    tag: "Partnerships",
    email: "instudianagaland@gmail.com",
    phone: "+91 87985 87779",
    accent: "border-brandpurple/20 bg-brandpurple/5",
    dot: "bg-brandpurple",
  },
  {
    label: "Join Our Team",
    tag: "Careers",
    email: "instudianagaland@gmail.com",
    phone: "+91 87985 87779",
    accent: "border-brightyellow/25 bg-brightyellow/5",
    dot: "bg-brightyellow",
  },
  {
    label: "Say Hello",
    tag: "General",
    email: "hello@instudianagaland.com",
    phone: "+91 87985 87779",
    accent: "border-flourescent/20 bg-flourescent/5",
    dot: "bg-flourescent",
  },
];

const ContactUs = () => {
  return (
    <>
      <main className="relative bg-white overflow-hidden">
        {/* Ambient glows */}
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-brandpurple/5 rounded-full blur-[100px] pointer-events-none -z-10" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-brightyellow/8 rounded-full blur-[100px] pointer-events-none -z-10" />

        <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
          {/* Header */}
          <div className="max-w-2xl mb-20">
            <p className="text-xs font-extrabold tracking-[0.2em] text-brandpurple uppercase mb-4">
              Contact Us
            </p>
            <h1 className="text-5xl sm:text-6xl font-black tracking-tight text-[#1B1C1E] leading-tight">
              Let&apos;s{" "}
              <span className="text-brandpurple">start a conversation</span>
            </h1>
            <p className="mt-5 text-lg text-gray-500 leading-relaxed">
              Whether you want to enroll, collaborate, or just say hello —
              we&apos;d love to hear from you.
            </p>
          </div>

          {/* Contact Cards */}
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-3 mb-20">
            {contacts.map((c) => (
              <div
                key={c.label}
                className={`relative flex flex-col gap-5 rounded-[2rem] border ${c.accent} p-8 hover:-translate-y-1.5 hover:shadow-lg transition-all duration-300 overflow-hidden`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-2.5 h-2.5 rounded-full ${c.dot} flex-shrink-0`}
                  />
                  <span className="text-[10px] font-extrabold uppercase tracking-widest text-gray-500">
                    {c.tag}
                  </span>
                </div>
                <div>
                  <h2 className="text-xl font-black text-[#1B1C1E]">
                    {c.label}
                  </h2>
                  <div className="mt-3 space-y-1">
                    <a
                      href={`mailto:${c.email}`}
                      className="block text-sm text-gray-600 hover:text-brandpurple transition-colors duration-200 font-medium"
                    >
                      {c.email}
                    </a>
                    <a
                      href={`tel:${c.phone.replace(/\s/g, "")}`}
                      className="block text-sm text-gray-500 hover:text-brandpurple transition-colors duration-200"
                    >
                      {c.phone}
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Location + Map Row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
            {/* Address Card */}
            <div className="rounded-[2.5rem] border border-neutral-200 bg-white p-10 shadow-sm">
              <p className="text-xs font-extrabold tracking-[0.2em] text-brandpurple uppercase mb-5">
                Our Location
              </p>
              <h2 className="text-3xl font-black text-[#1B1C1E] mb-6">
                Find Us in Dimapur
              </h2>

              <div className="space-y-6 text-sm text-gray-600">
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-xl bg-brandpurple/10 flex items-center justify-center flex-shrink-0">
                    <svg
                      className="w-5 h-5 text-brandpurple"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="font-semibold text-[#1B1C1E]">Address</p>
                    <p className="mt-1 leading-relaxed">
                      First Floor, Vikiye Center,
                      <br />
                      Opp. Notun Bosti Gate, Fellowship Colony,
                      <br />
                      Dimapur, Nagaland – 797112
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-xl bg-brightyellow/15 flex items-center justify-center flex-shrink-0">
                    <svg
                      className="w-5 h-5 text-[#1B1C1E]"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="font-semibold text-[#1B1C1E]">Hours</p>
                    <p className="mt-1">Mon – Sat &nbsp;·&nbsp; 9:00 AM – 6:00 PM</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-xl bg-flourescent/10 flex items-center justify-center flex-shrink-0">
                    <svg
                      className="w-5 h-5 text-[#1B1C1E]"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="font-semibold text-[#1B1C1E]">Phone</p>
                    <a
                      href="tel:+918798587779"
                      className="mt-1 block hover:text-brandpurple transition-colors"
                    >
                      +91 87985 87779
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Embedded Map */}
            <div className="rounded-[2.5rem] overflow-hidden border border-neutral-200 shadow-sm aspect-[4/3] lg:aspect-auto lg:h-full min-h-[380px]">
            <iframe
              src="https://maps.google.com/maps?q=Vikiye+Center,+Opposite+Notun+Bosti+Gate,+Fellowship+Colony,+Dimapur,+Nagaland+797112&z=17&output=embed"
              width="100%"
              height="100%"
              className="w-full border-0 min-h-[380px]"
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="instudia location on Google Maps — Vikiye Center, Fellowship Colony, Dimapur"
            />
            </div>
          </div>
        </div>
      </main>

      <Script
        id="contact-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </>
  );
};

export default ContactUs;
