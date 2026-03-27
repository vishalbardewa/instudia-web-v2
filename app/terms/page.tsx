import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms & Conditions | instudia",
  description:
    "Read instudia's Terms and Conditions governing use of our platform, courses, and services. Last updated July 2025.",
  alternates: { canonical: "https://www.instudianagaland.com/terms" },
  robots: { index: true, follow: true },
};

const sections = [
  {
    id: "acceptance",
    title: "Acceptance of Terms",
    items: [
      {
        label: "Agreement to ToS",
        text: "Your access or use of the instudia Platform confirms that you have read, understood, and agree to be bound by these Terms and Conditions, including any terms incorporated by reference such as the Privacy Policy.",
      },
      {
        label: "Disagreement with Terms",
        text: "If you do not agree to these Terms, you must not use the Platform or its Services.",
      },
      {
        label: "Updates and Changes",
        text: "instudia may update these Terms at any time without notice. Your continued use of the Platform after changes are made indicates your acceptance of those changes.",
      },
      {
        label: "Incorporated Policies",
        text: "These ToS incorporate any relevant policies, such as the Privacy Policy.",
      },
    ],
  },
  {
    id: "accounts",
    title: "User Accounts and Registration",
    items: [
      {
        label: "Accurate Information",
        text: "You agree to provide accurate, complete, and truthful information during account registration and update it as needed.",
      },
      {
        label: "Account Security",
        text: "You are responsible for protecting your login details and all activities under your account.",
      },
      {
        label: "Unauthorized Use",
        text: "Immediately report any suspected security breaches or unauthorized account use to instudia.",
      },
      {
        label: "Liability for Misuse",
        text: "instudia is not liable for losses from unauthorized account access. You are responsible for any losses incurred by instudia or others due to misuse.",
      },
    ],
  },
  {
    id: "intellectual-property",
    title: "Intellectual Property",
    items: [
      {
        label: "Ownership",
        text: "instudia and its licensors own all intellectual property rights in the Platform and its content — including text, images, videos, software, logos, trademarks, and educational resources.",
      },
      {
        label: "Limited License",
        text: "You have a limited license to access and use the Platform Content for your personal, non-commercial use only.",
      },
      {
        label: "Prohibited Use",
        text: "Duplication, distribution, creating derivative works, or commercial exploitation of the Platform Content without instudia's permission is prohibited.",
      },
      {
        label: "User Data",
        text: "While you keep intellectual property rights in your data, you grant instudia a license to use it for the Services and promotional purposes.",
      },
    ],
  },
  {
    id: "prohibited",
    title: "Prohibited Activities",
    intro:
      "Users must not use the Platform in a way that violates these ToS, applicable laws, or instudia policies. Prohibited activities include:",
    bullets: [
      "Unlawful activity, harassment, or sharing restricted content",
      "Uploading harmful content (viruses, malware)",
      "Impersonating others",
      "Attempting unauthorized access",
      "Creating a hostile or inappropriate environment",
    ],
    footer:
      "The Platform can terminate accounts and remove violating content for policy breaches.",
  },
  {
    id: "third-party",
    title: "Third-Party Links",
    body: "The Platform may include links to third-party websites, but instudia is not responsible for their content or privacy practices. You access such websites at your own risk.",
  },
  {
    id: "warranties",
    title: "Disclaimer of Warranties",
    body: 'The Platform and its content are provided "as is" and "as available" without warranties of any kind. instudia does not guarantee uninterrupted service or the accuracy of information.',
  },
  {
    id: "liability",
    title: "Limitation of Liability",
    body: "instudia is not liable for indirect or consequential damages or losses, including lost data. instudia's total liability is limited to the amount paid for Platform use.",
  },
  {
    id: "indemnification",
    title: "Indemnification",
    body: "You agree to indemnify instudia and its affiliates against liabilities arising from your use of the Platform or any violation of these ToS or applicable law.",
  },
  {
    id: "governing-law",
    title: "Governing Law and Jurisdiction",
    body: "These ToS are governed by the laws of India. Any disputes will be subject to the exclusive jurisdiction of the courts in India.",
  },
  {
    id: "courses",
    title: "Specific Terms for instudia Programs & Courses",
    items: [
      {
        label: "Admissions & Enrollment",
        text: "Admissions procedures, eligibility, and non-transferability of enrollments apply. Visits may require prior appointments.",
      },
      {
        label: "Fees & Payments",
        text: "Course fees, payment methods, renewal policies, and refund eligibility (if applicable) are clearly stated at enrollment. Refund requests include timelines and any administrative charges.",
      },
      {
        label: "Course Content & Access",
        text: "Content scope and duration of access are defined per course at the time of enrollment.",
      },
      {
        label: "Student Conduct",
        text: "Standards of behavior during programs apply, including rules against plagiarism and academic dishonesty.",
      },
      {
        label: "Technical Requirements",
        text: "Necessary equipment or software for accessing courses is listed per program.",
      },
      {
        label: "Updates & Changes",
        text: "Course content and policies are subject to change at instudia's discretion.",
      },
      {
        label: "Certification",
        text: "Conditions for receiving certificates upon completion are stated per course.",
      },
      {
        label: "No Guarantee of Placement",
        text: "Job placement is not guaranteed by instudia as a result of completing any program.",
      },
    ],
  },
  {
    id: "miscellaneous",
    title: "Miscellaneous",
    items: [
      {
        label: "Severability",
        text: "If any part of these ToS is unenforceable, the remaining provisions remain in effect.",
      },
      {
        label: "Waiver",
        text: "Failure to enforce a right doesn't waive that right.",
      },
      {
        label: "Assignment",
        text: "These ToS cannot be assigned without written consent.",
      },
      {
        label: "Force Majeure",
        text: "instudia is not liable for performance failures due to circumstances beyond its control.",
      },
      {
        label: "Age Restriction",
        text: "Age requirements for Platform use or program enrollment apply as stated at registration.",
      },
    ],
  },
  {
    id: "contact",
    title: "Grievances & Contact",
    contact: {
      email: "instudia.nagaland@gmail.com",
      phone: "+91-8798-587-779",
      address:
        "First Floor, Vikiye Center, Notun Bosti, Dimapur, Nagaland 797112",
    },
  },
];

export default function TermsPage() {
  return (
    <main className="bg-white min-h-screen">
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-neutral-100 pt-24 pb-16 px-6">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[250px] bg-brandpurple/5 rounded-full blur-[80px] pointer-events-none" />
        <div className="relative mx-auto max-w-4xl">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-[10px] font-extrabold tracking-[0.2em] text-brandpurple uppercase">
              Legal
            </span>
            <span className="text-neutral-300">/</span>
            <span className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest">
              Terms & Conditions
            </span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-[#1B1C1E]">
            Terms & Conditions
          </h1>
          <p className="mt-4 text-gray-500 max-w-2xl leading-relaxed">
            These Terms and Conditions govern your access to and use of the instudia platform, courses, and all associated services. By using the Platform, you agree to be bound by these terms.
          </p>
          <div className="mt-6 inline-flex items-center gap-2 text-xs font-semibold text-gray-400 bg-gray-50 border border-neutral-100 rounded-full px-4 py-2">
            <span className="w-1.5 h-1.5 rounded-full bg-brightyellow" />
            Last updated: July 5, 2025
          </div>
        </div>
      </section>

      {/* Content */}
      <div className="mx-auto max-w-4xl px-6 py-16">
        <div className="space-y-16">
          {sections.map((section, i) => (
            <section key={section.id} id={section.id} className="scroll-mt-24">
              {/* Section header */}
              <div className="flex items-start gap-4 mb-6">
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-brandpurple/10 flex items-center justify-center text-xs font-black text-brandpurple mt-0.5">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h2 className="text-xl sm:text-2xl font-black text-[#1B1C1E]">
                  {section.title}
                </h2>
              </div>

              <div className="pl-12">
                {/* Key-value style items */}
                {"items" in section && section.items && (
                  <div className="space-y-3">
                    {section.items.map((item) => (
                      <div
                        key={item.label}
                        className="rounded-2xl border border-neutral-100 bg-gray-50 px-5 py-4"
                      >
                        <p className="text-xs font-extrabold uppercase tracking-widest text-brandpurple mb-1.5">
                          {item.label}
                        </p>
                        <p className="text-sm text-gray-700 leading-relaxed">
                          {item.text}
                        </p>
                      </div>
                    ))}
                  </div>
                )}

                {/* Intro + bullets + footer */}
                {"bullets" in section && section.bullets && (
                  <div className="space-y-4">
                    {"intro" in section && section.intro && (
                      <p className="text-sm text-gray-700 leading-relaxed">{section.intro}</p>
                    )}
                    <ul className="space-y-2 border-l-2 border-brandpurple/20 pl-5">
                      {section.bullets.map((b, bi) => (
                        <li key={bi} className="flex items-start gap-2.5 text-sm text-gray-700">
                          <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-brandpurple mt-1.5" />
                          {b}
                        </li>
                      ))}
                    </ul>
                    {"footer" in section && section.footer && (
                      <p className="text-sm text-gray-500 italic">{section.footer}</p>
                    )}
                  </div>
                )}

                {/* Plain body */}
                {"body" in section && section.body && (
                  <p className="text-sm text-gray-700 leading-relaxed">{section.body}</p>
                )}

                {/* Contact block */}
                {"contact" in section && section.contact && (
                  <div className="rounded-2xl border border-brandpurple/20 bg-brandpurple/5 px-6 py-5 space-y-3">
                    <p className="text-xs font-extrabold uppercase tracking-widest text-brandpurple">
                      Contact Information
                    </p>
                    {[
                      { label: "Email", value: section.contact.email, href: `mailto:${section.contact.email}` },
                      { label: "Phone", value: section.contact.phone, href: `tel:${section.contact.phone.replace(/\s|-/g, "")}` },
                      { label: "Address", value: section.contact.address },
                    ].map((row) => (
                      <div key={row.label} className="flex items-start gap-3">
                        <span className="text-xs font-bold text-gray-400 uppercase tracking-wider min-w-[52px] mt-0.5">
                          {row.label}
                        </span>
                        {row.href ? (
                          <a
                            href={row.href}
                            className="text-sm font-semibold text-brandpurple hover:underline"
                          >
                            {row.value}
                          </a>
                        ) : (
                          <p className="text-sm text-gray-700">{row.value}</p>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {i < sections.length - 1 && (
                <div className="mt-16 border-t border-neutral-100" />
              )}
            </section>
          ))}
        </div>

        {/* Footer note */}
        <div className="mt-16 rounded-2xl border border-brightye​llow/40 bg-brightyellow/5 px-6 py-5 flex items-start gap-3">
          <span className="text-xl mt-0.5">📋</span>
          <div>
            <p className="text-sm font-bold text-[#1B1C1E]">Questions about these terms?</p>
            <p className="text-xs text-gray-500 mt-1">
              Reach out to our team at{" "}
              <a
                href="mailto:instudia.nagaland@gmail.com"
                className="text-brandpurple font-semibold hover:underline"
              >
                instudia.nagaland@gmail.com
              </a>{" "}
              or call{" "}
              <a href="tel:+918798587779" className="text-brandpurple font-semibold hover:underline">
                +91-8798-587-779
              </a>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}