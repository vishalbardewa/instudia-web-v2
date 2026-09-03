import React from "react";
import Image from "next/image";
import Link from "next/link";

interface FooterLink {
  name: string;
  href: string;
  isNew?: boolean;
  external?: boolean;
}

const navigation = {
  programs: [
    { name: "All Courses", href: "/courses" },
    { name: "Workshops", href: "/workshops" },
    { name: "Host a Seminar", href: "/host-a-seminar" },
    { name: "Success Stories", href: "/success-stories" },
    { name: "Campus Gallery", href: "/gallery" },
  ] as FooterLink[],
  tools: [
    { name: "Nagaland Career Guide", href: "/tools/career-guide", isNew: true },
    { name: "Interactive Flashcards", href: "/tools/flashcards", isNew: true },
    { name: "AI Resume Builder", href: "/tools/resume-builder" },
    { name: "ATS Resume Scanner", href: "/tools/ats-analyzer" },
    { name: "Career Blueprint", href: "/tools/career-blueprint" },
    { name: "Salary Insights", href: "/tools/salary-insights" },
    { name: "Study Planner", href: "/tools/study-planner" },
    { name: "Assessment Designer", href: "/tools/assessment-designer" },
    { name: "Pedagogical Assistant", href: "/tools/lecture-note-generator" },
  ] as FooterLink[],
  company: [
    { name: "About Us", href: "/about" },
    { name: "Contact & Admissions", href: "/contact" },
    { name: "Faculty & Staff", href: "/card" },
    { name: "Careers", href: "/careers" },
    { name: "Blog & Insights", href: "/blog" },
    { name: "FAQ", href: "/faq" },
  ] as FooterLink[],
  legal: [
    { name: "HTML Sitemap", href: "/sitemap" },
    { name: "Privacy Policy", href: "/privacy-policy" },
    { name: "Terms & Conditions", href: "/terms" },
    { name: "Cookie Policy", href: "/cookie-policy" },
  ] as FooterLink[],
  social: [
    {
      name: "Facebook",
      href: "https://www.facebook.com/instudianagaland/",
      icon: (props: React.SVGProps<SVGSVGElement>) => (
        <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
          <path
            fillRule="evenodd"
            d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
            clipRule="evenodd"
          />
        </svg>
      ),
    },
    {
      name: "Instagram",
      href: "https://www.instagram.com/instudia_nagaland/",
      icon: (props: React.SVGProps<SVGSVGElement>) => (
        <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
          <path
            fillRule="evenodd"
            d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
            clipRule="evenodd"
          />
        </svg>
      ),
    },
    {
      name: "LinkedIn",
      href: "https://www.linkedin.com/company/instudia-trainings",
      icon: (props: React.SVGProps<SVGSVGElement>) => (
        <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
          <path
            fillRule="evenodd"
            d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"
            clipRule="evenodd"
          />
        </svg>
      ),
    },
    {
      name: "YouTube",
      href: "https://www.youtube.com/@instudia?sub_confirmation=1",
      icon: (props: React.SVGProps<SVGSVGElement>) => (
        <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
          <path
            fillRule="evenodd"
            d="M19.812 5.418c.861.23 1.538.907 1.768 1.768C21.998 8.746 22 12 22 12s0 3.255-.418 4.814a2.504 2.504 0 0 1-1.768 1.768c-1.56.419-7.814.419-7.814.419s-6.255 0-7.814-.419a2.505 2.505 0 0 1-1.768-1.768C2 15.255 2 12 2 12s0-3.255.417-4.814a2.507 2.507 0 0 1 1.768-1.768C5.744 5 11.998 5 11.998 5s6.255 0 7.814.418ZM15.194 12 10 15V9l5.194 3Z"
            clipRule="evenodd"
          />
        </svg>
      ),
    },
  ],
};

function FooterLinkItem({ item }: { item: FooterLink }) {
  const content = (
    <>
      <span>{item.name}</span>
      {item.isNew && (
        <span className="ml-2 inline-flex items-center justify-center px-1.5 py-0.5 rounded-md text-[9px] font-bold uppercase tracking-wider text-black bg-white border border-neutral-200 shadow-xs gap-1.5">
          <span className="relative flex h-1.5 w-1.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brandpurple opacity-75" />
            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-brandpurple" />
          </span>
          New
        </span>
      )}
    </>
  );

  const className =
    "text-xs leading-6 flex items-center text-gray-600 hover:text-gray-900 transition-colors font-medium";

  if (item.external) {
    return (
      <a
        href={item.href}
        target="_blank"
        rel="noopener noreferrer"
        className={className}
      >
        {content}
      </a>
    );
  }

  return (
    <Link href={item.href} className={className}>
      {content}
    </Link>
  );
}

export default function Footer() {
  return (
    <footer aria-labelledby="footer-heading" className="bg-white border-t border-neutral-200/60">
      <h2 id="footer-heading" className="sr-only">
        Footer
      </h2>
      <div className="mx-auto max-w-7xl px-6 pb-8 pt-16 sm:pt-20 lg:px-8 lg:pt-24">
        <div className="xl:grid xl:grid-cols-5 xl:gap-8">
          {/* Brand & Address Column */}
          <div className="space-y-6 xl:col-span-2">
            <Link href="/" className="inline-block">
              <div className="h-16 relative aspect-[3/1]">
                <Image
                  alt="instudia logo"
                  className="h-full object-contain"
                  style={{ width: "auto", height: "auto" }}
                  src="/assets/images/logo-with-tagline.webp"
                  width={250}
                  height={64}
                  loading="lazy"
                  unoptimized
                />
              </div>
            </Link>
            <div className="text-xs leading-6 text-gray-600 max-w-sm">
              <address
                itemScope
                itemType="https://schema.org/LocalBusiness"
                style={{ fontStyle: "normal" }}
              >
                <div className="flex gap-x-3 mb-3.5">
                  <span className="sr-only">Address</span>
                  <svg
                    className="h-5 w-5 flex-none text-brandpurple mt-0.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
                    />
                  </svg>
                  <div>
                    <span className="sr-only" itemProp="name">
                      instudia
                    </span>
                    <p>
                      <span itemProp="streetAddress">
                        First Floor, Vikiye Center,
                        <br />
                        Opp. Notun Bosti Gate, Fellowship Colony
                      </span>
                    </p>
                    <p>
                      <span itemProp="addressLocality">Dimapur</span>,{" "}
                      <span itemProp="addressRegion">Nagaland</span>{" "}
                      <span itemProp="postalCode">797112</span>
                    </p>
                  </div>
                </div>
                <div className="flex gap-x-3 mb-3">
                  <span className="sr-only">Phone</span>
                  <svg
                    className="h-5 w-5 flex-none text-brandpurple"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"
                    />
                  </svg>
                  <a
                    href="tel:+918798587779"
                    itemProp="telephone"
                    className="hover:text-gray-900 transition-colors"
                  >
                    +91 87985 87779
                  </a>
                </div>
                <div className="flex gap-x-3">
                  <span className="sr-only">Email</span>
                  <svg
                    className="h-5 w-5 flex-none text-brandpurple"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
                    />
                  </svg>
                  <a
                    href="mailto:instudia.nagaland@gmail.com"
                    itemProp="email"
                    className="hover:text-gray-900 transition-colors"
                  >
                    instudia.nagaland@gmail.com
                  </a>
                </div>
              </address>
            </div>
          </div>

          {/* 4 Organized Navigation Columns */}
          <div className="mt-12 grid grid-cols-2 gap-8 sm:grid-cols-4 xl:col-span-3 xl:mt-0">
            {/* 1. Programs */}
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-gray-900">
                Programs
              </h3>
              <ul role="list" className="mt-4 space-y-2.5">
                {navigation.programs.map((item) => (
                  <li key={item.name}>
                    <FooterLinkItem item={item} />
                  </li>
                ))}
              </ul>
            </div>

            {/* 2. Products & Suite */}
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-gray-900">
                Products &amp; Tools
              </h3>
              <div className="mt-4 space-y-3.5">
                {/* Flagship Product: acadesx */}
                <div>
                  <a
                    href="https://acadesx.instudianagaland.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group block p-2.5 -mx-1 rounded-xl border border-neutral-200/80 bg-neutral-50/70 hover:bg-neutral-100 hover:border-brandpurple/30 transition-all shadow-2xs"
                  >
                    <div className="flex items-center justify-between gap-1.5">
                      <span className="text-xs font-bold text-[#1B1C1E] group-hover:text-brandpurple transition-colors">
                        acadesx
                      </span>
                      <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider bg-brandpurple text-white shadow-2xs shrink-0">
                        Campus OS
                      </span>
                    </div>
                    <p className="text-[10px] text-neutral-500 mt-1 font-medium leading-snug">
                      AI Powered School &amp; College Management System
                    </p>
                  </a>
                </div>

                {/* Free Student Tools Suite */}
                <ul role="list" className="space-y-2 pt-1 border-t border-neutral-100">
                  {navigation.tools.map((item) => (
                    <li key={item.name}>
                      <FooterLinkItem item={item} />
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* 3. Company */}
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-gray-900">
                Company
              </h3>
              <ul role="list" className="mt-4 space-y-2.5">
                {navigation.company.map((item) => (
                  <li key={item.name}>
                    <FooterLinkItem item={item} />
                  </li>
                ))}
              </ul>
            </div>

            {/* 4. Legal */}
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-gray-900">
                Legal
              </h3>
              <ul role="list" className="mt-4 space-y-2.5">
                {navigation.legal.map((item) => (
                  <li key={item.name}>
                    <FooterLinkItem item={item} />
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Social & Copyright Bar */}
        <div className="mt-12 border-t border-gray-900/10 pt-8 md:flex md:items-center md:justify-between">
          <div className="flex space-x-5 md:order-2">
            {navigation.social.map((item) => (
              <a
                key={item.name}
                target="_blank"
                rel="noopener noreferrer"
                href={item.href}
                className="text-gray-400 hover:text-brandpurple min-h-[44px] min-w-[44px] flex items-center justify-center transition-colors"
                aria-label={item.name}
              >
                <item.icon aria-hidden="true" className="h-5 w-5" />
              </a>
            ))}
          </div>
          <p className="mt-6 text-xs leading-5 text-gray-500 md:order-1 md:mt-0">
            &copy; {new Date().getFullYear()} Crafted by <span className="font-semibold text-gray-700">Team instudia</span>. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

