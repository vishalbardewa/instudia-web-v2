import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  MapPinIcon,
  PhoneIcon,
  EnvelopeIcon,
  ClockIcon,
  ShieldCheckIcon,
  ArrowTopRightOnSquareIcon,
  ArrowRightIcon,
} from "@heroicons/react/24/outline";

interface FooterLink {
  name: string;
  href: string;
  badge?: string;
  external?: boolean;
}

const navigation = {
  programs: [
    { name: "All Courses", href: "/courses" },
    { name: "Workshops", href: "/workshops" },
    { name: "Host a Seminar", href: "/host-a-seminar" },
    { name: "Success Stories", href: "/success-stories" },
  ] as FooterLink[],
  services: [
    { name: "Services Overview", href: "/services", badge: "Hub" },
    { name: "Custom Software Dev", href: "/services/web-software-development" },
    { name: "Cloud & DevOps", href: "/services/cloud-devops-infrastructure" },
    { name: "UI/UX & Branding", href: "/services/ui-ux-branding" },
    { name: "Corporate Training", href: "/services/corporate-training" },
    { name: "Campus Bootcamps", href: "/services/campus-partnerships" },
    { name: "Career Mentorship", href: "/services/career-services" },
  ] as FooterLink[],
  tools: [
    { name: "AI Resume Builder", href: "/tools/resume-builder" },
    { name: "ATS Resume Scanner", href: "/tools/ats-analyzer" },
    { name: "Career Blueprint", href: "/tools/career-blueprint" },
    { name: "Interactive Flashcards", href: "/tools/flashcards" },
    { name: "Nagaland Career Guide", href: "/tools/career-guide" },
    { name: "Tech Salary Insights", href: "/tools/salary-insights" },
  ] as FooterLink[],
  company: [
    { name: "About Us", href: "/about" },
    { name: "Contact & Admissions", href: "/contact" },
    { name: "Careers", href: "/careers" },
    { name: "Blog & Insights", href: "/blog" },
    { name: "FAQ", href: "/faq" },
  ] as FooterLink[],
  legal: [
    { name: "Privacy Policy", href: "/privacy-policy" },
    { name: "Terms of Service", href: "/terms" },
    { name: "Cookie Policy", href: "/cookie-policy" },
    { name: "HTML Sitemap", href: "/sitemap" },
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
    <span className="inline-flex items-center gap-1.5 group">
      <span className="group-hover:text-neutral-900 group-hover:translate-x-0.5 transition-all duration-150">
        {item.name}
      </span>
      {item.badge && (
        <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[9px] font-mono font-bold uppercase tracking-wider text-brandpurple bg-brandpurple/10 shrink-0">
          {item.badge}
        </span>
      )}
    </span>
  );

  const className =
    "text-[13px] leading-6 text-neutral-600 hover:text-neutral-950 transition-colors inline-block";

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
    <footer
      aria-labelledby="footer-heading"
      className="bg-[#FAF9F5] border-t border-neutral-200/80 text-neutral-700 font-sans"
    >
      <h2 id="footer-heading" className="sr-only">
        Footer
      </h2>

      <div className="mx-auto max-w-7xl px-6 pt-16 pb-12 sm:pt-20 lg:px-8">
        {/* Main Footer Grid: 4-col Brand & Info + 8-col Navigation */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-12 items-start">
          {/* Left Column: Brand Identity, Accreditation & Local Business Details */}
          <div className="lg:col-span-4 space-y-6">
            <Link href="/" className="inline-block">
              <div className="h-12 relative aspect-[3.2/1]">
                <Image
                  alt="instudia logo"
                  className="h-full object-contain"
                  style={{ width: "auto", height: "auto" }}
                  src="/assets/images/logo-with-tagline.webp"
                  width={220}
                  height={50}
                  loading="lazy"
                  unoptimized
                />
              </div>
            </Link>

            <p className="text-xs leading-relaxed text-neutral-600 max-w-sm">
              Nagaland&apos;s premier career-first technology institute and engineering studio.
              Bridging modern computing education with enterprise-grade digital development.
            </p>

            {/* Institutional Trust Badges */}
            <div className="flex flex-wrap items-center gap-2 pt-1">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white border border-neutral-200/90 shadow-2xs text-[11px] font-mono font-medium text-neutral-700">
                <ShieldCheckIcon className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>ISO 9001:2015</span>
              </div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white border border-neutral-200/90 shadow-2xs text-[11px] font-mono font-medium text-neutral-700">
                <span className="w-2 h-2 rounded-full bg-brandpurple shrink-0" />
                <span>Govt. MSME Recognized</span>
              </div>
            </div>

            {/* Local Business Microdata & Contact Card */}
            <div className="pt-4 border-t border-neutral-200/60 text-xs text-neutral-600 space-y-3">
              <address
                itemScope
                itemType="https://schema.org/LocalBusiness"
                className="not-italic space-y-2.5"
              >
                <div className="flex items-start gap-2.5">
                  <MapPinIcon className="w-4 h-4 text-brandpurple shrink-0 mt-0.5" />
                  <div>
                    <span className="sr-only" itemProp="name">
                      instudia
                    </span>
                    <span itemProp="streetAddress">
                      First Floor, Vikiye Center, Opp. Notun Bosti Gate
                    </span>
                    <br />
                    <span>Fellowship Colony, </span>
                    <span itemProp="addressLocality">Dimapur</span>,{" "}
                    <span itemProp="addressRegion">Nagaland</span>{" "}
                    <span itemProp="postalCode">797112</span>
                  </div>
                </div>

                <div className="flex items-center gap-2.5">
                  <PhoneIcon className="w-4 h-4 text-brandpurple shrink-0" />
                  <a
                    href="tel:+918798587779"
                    itemProp="telephone"
                    className="hover:text-neutral-900 transition-colors font-medium"
                  >
                    +91 87985 87779
                  </a>
                </div>

                <div className="flex items-center gap-2.5">
                  <EnvelopeIcon className="w-4 h-4 text-brandpurple shrink-0" />
                  <a
                    href="mailto:instudia.nagaland@gmail.com"
                    itemProp="email"
                    className="hover:text-neutral-900 transition-colors"
                  >
                    instudia.nagaland@gmail.com
                  </a>
                </div>

                <div className="flex items-center gap-2.5 text-neutral-500">
                  <ClockIcon className="w-4 h-4 text-neutral-400 shrink-0" />
                  <span>Mon – Sat • 9:00 AM – 5:00 PM</span>
                </div>
              </address>
            </div>
          </div>

          {/* Right Area: 4 Symmetrical & Balanced Navigation Columns */}
          <div className="lg:col-span-8 grid grid-cols-2 md:grid-cols-4 gap-8 sm:gap-10">
            {/* Column 1: Programs & Courses */}
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-900 mb-4">
                Programs
              </h3>
              <ul role="list" className="space-y-2.5">
                {navigation.programs.map((item) => (
                  <li key={item.name}>
                    <FooterLinkItem item={item} />
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 2: Services & Solutions */}
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-900 mb-4">
                Services
              </h3>
              <ul role="list" className="space-y-2.5">
                {navigation.services.map((item) => (
                  <li key={item.name}>
                    <FooterLinkItem item={item} />
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 3: Platform & Free Tools */}
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-900 mb-4">
                Products &amp; Tools
              </h3>

              {/* acadesx Flagship Product Feature */}
              <div className="mb-4">
                <a
                  href="https://acadesx.instudianagaland.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block p-3 rounded-xl border border-neutral-200/90 bg-white hover:border-brandpurple/40 hover:shadow-xs transition-all"
                >
                  <div className="flex items-center justify-between gap-1.5 mb-1">
                    <span className="text-xs font-bold text-neutral-900 group-hover:text-brandpurple transition-colors">
                      acadesx
                    </span>
                    <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[8px] font-mono font-bold uppercase tracking-wider bg-brandpurple text-white shrink-0">
                      Campus OS
                    </span>
                  </div>
                  <p className="text-[11px] text-neutral-500 leading-snug">
                    AI School &amp; College OS
                  </p>
                </a>
              </div>

              {/* Free Tools List */}
              <ul role="list" className="space-y-2.5">
                {navigation.tools.map((item) => (
                  <li key={item.name}>
                    <FooterLinkItem item={item} />
                  </li>
                ))}
                <li className="pt-1.5">
                  <Link
                    href="/tools"
                    className="inline-flex items-center gap-1 text-[12px] font-semibold text-brandpurple hover:text-brandpurple/80 transition-colors"
                  >
                    <span>View all 9 tools</span>
                    <ArrowRightIcon className="w-3 h-3" />
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column 4: Company & Community */}
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-900 mb-4">
                Company
              </h3>
              <ul role="list" className="space-y-2.5">
                {navigation.company.map((item) => (
                  <li key={item.name}>
                    <FooterLinkItem item={item} />
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright, Legal Links & Socials */}
        <div className="mt-14 pt-8 border-t border-neutral-200/80 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-neutral-500">
          {/* Left: Copyright */}
          <div className="order-2 md:order-1 text-center md:text-left">
            <p>
              &copy; {new Date().getFullYear()}{" "}
              <span className="font-semibold text-neutral-800">instudia</span>. Built with precision in Dimapur, Nagaland.
            </p>
          </div>

          {/* Center: Legal Links */}
          <div className="order-1 md:order-2 flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
            {navigation.legal.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="hover:text-neutral-900 transition-colors"
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Right: Social Media Icons */}
          <div className="order-3 flex items-center gap-3">
            {navigation.social.map((item) => (
              <a
                key={item.name}
                target="_blank"
                rel="noopener noreferrer"
                href={item.href}
                className="w-8 h-8 rounded-full bg-white border border-neutral-200 flex items-center justify-center text-neutral-500 hover:text-brandpurple hover:border-brandpurple/40 hover:bg-neutral-50 transition-all shadow-2xs"
                aria-label={item.name}
              >
                <item.icon aria-hidden="true" className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
