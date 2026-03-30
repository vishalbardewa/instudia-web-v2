import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cookie Policy — instudia Tech Institute Nagaland",
  description:
    "Learn about how we use cookies to improve your experience on the instudia platform and how you can manage them.",
  alternates: { canonical: "/cookie-policy" },
  robots: { index: true, follow: true },
};

const sections = [
  {
    id: "what-are-cookies",
    title: "What are Cookies?",
    body: `Cookies are small text files that are placed on your computer or mobile device by websites that you visit. They are widely used to make websites work, or work more efficiently, as well as to provide information to the owners of the site.

A cookie cannot read data off your hard drive or read cookie files created by other sites. Cookies do not damage your system.`,
  },
  {
    id: "how-we-use-cookies",
    title: "How We Use Cookies",
    body: `instudia uses cookies to improve your experience while you navigate through the website. Out of these, the cookies that are categorized as "Necessary" are stored on your browser as they are essential for the working of basic functionalities of the website.

We also use third-party cookies that help us analyze and understand how you use this website. These cookies will be stored in your browser only with your consent.`,
  },
  {
    id: "types-of-cookies",
    title: "Types of Cookies We Use",
    content: [
      {
        term: "NECESSARY",
        def: "Necessary cookies are absolutely essential for the website to function properly. These cookies ensure basic functionalities and security features of the website, anonymously.",
      },
      {
        term: "FUNCTIONAL",
        def: "Functional cookies help to perform certain functionalities like sharing the content of the website on social media platforms, collect feedbacks, and other third-party features.",
      },
      {
        term: "ANALYTICS",
        def: "Analytical cookies are used to understand how visitors interact with the website. These cookies help provide information on metrics the number of visitors, bounce rate, traffic source, etc.",
      },
      {
        term: "PERFORMANCE",
        def: "Performance cookies are used to understand and analyze the key performance indexes of the website which helps in delivering a better user experience for the visitors.",
      },
      {
        term: "ADVERTISEMENT",
        def: "Advertisement cookies are used to provide visitors with relevant ads and marketing campaigns. These cookies track visitors across websites and collect information to provide customized ads.",
      },
    ],
  },
  {
    id: "managing-cookies",
    title: "Managing Cookies",
    body: `Most web browsers allow some control of most cookies through the browser settings. To find out more about cookies, including how to see what cookies have been set, visit www.aboutcookies.org or www.allaboutcookies.org.

Find out how to manage cookies on popular browsers:
• Google Chrome
• Microsoft Edge
• Mozilla Firefox
• Microsoft Internet Explorer
• Opera
• Apple Safari

To find information relating to other browsers, visit the browser developer's website. To opt out of being tracked by Google Analytics across all websites, visit http://tools.google.com/dlpage/gaoptout.`,
  },
  {
    id: "changes",
    title: "Changes to This Cookie Policy",
    body: `We may update our Cookie Policy from time to time. We will notify you of any changes by posting the new Cookie Policy on this page and updating the "effective date" at the top.

You are advised to review this Cookie Policy periodically for any changes. Changes to this Cookie Policy are effective when they are posted on this page.`,
  },
  {
    id: "contact",
    title: "Contact Us",
    body: `If you have any questions about our Cookie Policy, please contact us:\n\nEmail: instudia.nagaland@gmail.com\nPhone: +91-8798-587-779\nAddress: First Floor, Vikiye Center, Notun Bosti, Dimapur, Nagaland 797112`,
  },
];

export default function CookiePolicyPage() {
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
              Cookie Policy
            </span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-[#1B1C1E]">
            Cookie Policy
          </h1>
          <p className="mt-4 text-gray-500 max-w-2xl leading-relaxed">
            This policy explains how instudia uses cookies and similar technologies to recognize you when you visit our website.
          </p>
          <div className="mt-6 inline-flex items-center gap-2 text-xs font-semibold text-gray-400 bg-gray-50 border border-neutral-100 rounded-full px-4 py-2">
            <span className="w-1.5 h-1.5 rounded-full bg-flourescent" />
            Effective date: January 1, 2026
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
                {/* Definitions/Content list */}
                {"content" in section && section.content && (
                  <div className="space-y-4">
                    {section.content.map((item) => (
                      <div
                        key={item.term}
                        className="flex gap-4 p-4 rounded-2xl bg-gray-50 border border-neutral-100"
                      >
                        <span className="flex-shrink-0 text-xs font-extrabold uppercase tracking-widest text-brandpurple mt-0.5 min-w-[9rem]">
                          {item.term}
                        </span>
                        <p className="text-sm text-gray-600 leading-relaxed">{item.def}</p>
                      </div>
                    ))}
                  </div>
                )}

                {/* Body text */}
                {"body" in section && section.body && (
                  <div className="space-y-4">
                    {section.body.split("\n\n").map((para, pi) =>
                      section.id === "contact" && pi === 0 ? (
                        <p key={pi} className="text-sm text-gray-700 leading-relaxed">{para}</p>
                      ) : section.id === "contact" && pi === 1 ? (
                        <div key={pi} className="border border-brandpurple/20 rounded-2xl p-5 bg-brandpurple/5 space-y-1.5">
                          {para.split("\n").map((line, li) => (
                            <p key={li} className="text-sm font-semibold text-[#1B1C1E]">{line}</p>
                          ))}
                        </div>
                      ) : (
                        <p key={pi} className="text-sm text-gray-700 leading-relaxed">{para}</p>
                      )
                    )}
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
        <div className="mt-16 rounded-2xl border border-flourescent/30 bg-flourescent/5 px-6 py-5 flex items-start gap-3">
          <span className="text-xl mt-0.5">🍪</span>
          <div>
            <p className="text-sm font-bold text-[#1B1C1E]">Cookie Settings</p>
            <p className="text-xs text-gray-500 mt-1">
              You can choose to disable cookies through your individual browser options. For more detailed information about cookie management with specific web browsers, it can be found at the browsers' respective websites.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
