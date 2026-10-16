"use client";

import React, { useState, useMemo } from "react";

interface GmailComposeWidgetProps {
  initialRecipient?: string;
  initialSubject?: string;
}

export default function GmailComposeWidget({
  initialRecipient = "director.contact@organization.org",
  initialSubject = "Application for NEP Credit Internship [Month - Month Year] - [Your Full Name], [Degree & College]",
}: GmailComposeWidgetProps) {
  const [recipient, setRecipient] = useState(initialRecipient);
  const [subject, setSubject] = useState(initialSubject);
  const [copied, setCopied] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showCc, setShowCc] = useState(false);
  const [showBcc, setShowBcc] = useState(false);
  const [cc, setCc] = useState("");
  const [bcc, setBcc] = useState("");
  const [activeTab, setActiveTab] = useState<"preview" | "customize">("preview");

  // Personalization fields for quick-fill
  const [studentName, setStudentName] = useState("");
  const [collegeName, setCollegeName] = useState("");
  const [degreeName, setDegreeName] = useState("");
  const [orgName, setOrgName] = useState("");
  const [dates, setDates] = useState("");
  const [skills, setSkills] = useState("");
  const [phone, setPhone] = useState("");
  const [rollNumber, setRollNumber] = useState("");

  const defaultBody = useMemo(() => {
    const nameStr = studentName.trim() || "[Your Full Name]";
    const collegeStr = collegeName.trim() || "[College Name]";
    const degreeStr = degreeName.trim() || "[Bachelor of Computer Applications / B.Com / B.A.]";
    const orgStr = orgName.trim() || "[Organization Name]";
    const datesStr = dates.trim() || "[Start Date] to [End Date]";
    const skillsStr =
      skills.trim() ||
      "[modern web development with React and Next.js, relational database fundamentals, and agile project coordination]";
    const phoneStr = phone.trim() || "[Your Contact Number]";
    const rollStr = rollNumber.trim() || "[College Roll Number / Registration Number]";

    return `Respected Sir/Madam,

I am writing to formally apply for an internship opportunity at ${orgStr} during my upcoming semester break from ${datesStr}.

I am currently an undergraduate student pursuing ${degreeStr} at ${collegeStr}, affiliated with Nagaland University. Under the National Education Policy (NEP 2020) Four Year Undergraduate Programme (FYUGP) framework, I am required to complete a credit-bearing practical industry engagement to fulfill my academic curriculum.

Having followed ${orgStr}'s commendable contributions across Nagaland, I am keen to contribute practically to your ongoing projects. My core competencies include ${skillsStr}.

I have attached my academic resume alongside the official No-Objection Certificate (NOC) issued and signed by my college administration. I would welcome the opportunity to discuss how I can support your team during this tenure.

Thank you for your consideration.

Warm regards,

${nameStr}
Contact: ${phoneStr}
Roll / Reg No: ${rollStr}
College: ${collegeStr}`;
  }, [studentName, collegeName, degreeName, orgName, dates, skills, phone, rollNumber]);

  const [customBody, setCustomBody] = useState("");

  const activeBody = customBody || defaultBody;

  const handleCopy = async () => {
    try {
      const fullContent = `To: ${recipient}
Subject: ${subject}

${activeBody}`;
      await navigator.clipboard.writeText(fullContent);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // Fallback
      setCopied(false);
    }
  };

  const handleMailTo = () => {
    const mailtoUrl = `mailto:${encodeURIComponent(recipient)}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(activeBody)}`;
    window.open(mailtoUrl, "_blank");
  };

  const handleReset = () => {
    setRecipient(initialRecipient);
    setSubject(initialSubject);
    setCustomBody("");
    setStudentName("");
    setCollegeName("");
    setDegreeName("");
    setOrgName("");
    setDates("");
    setSkills("");
    setPhone("");
    setRollNumber("");
  };

  return (
    <div className="my-10 w-full max-w-3xl mx-auto font-sans not-prose">
      {/* Container simulating Gmail New Message modal */}
      <div
        className={`bg-white border-2 border-black rounded-t-xl overflow-hidden shadow-[8px_8px_0px_#000000] transition-all duration-200 ${isFullscreen ? "fixed inset-4 z-50 max-w-5xl mx-auto my-auto h-[90vh] flex flex-col" : ""
          }`}
      >
        {/* Gmail Title Header */}
        <div className="bg-[#202124] text-white px-4 py-2.5 flex items-center justify-between select-none">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#EA4335] inline-block" />
            <span className="text-xs sm:text-sm font-semibold tracking-wide text-neutral-100">
              New Message
            </span>
            <span className="hidden sm:inline-block text-[11px] bg-neutral-700 text-neutral-300 px-2 py-0.5 rounded font-mono ml-2">
              NEP Outreach Template
            </span>
          </div>

          <div className="flex items-center gap-2 text-neutral-400">
            {/* Quick Fill / Direct Tab */}
            <div className="hidden sm:flex items-center bg-neutral-800 rounded p-0.5 mr-2 text-[11px]">
              <button
                type="button"
                onClick={() => setActiveTab("preview")}
                className={`px-2.5 py-0.5 rounded font-medium transition-colors ${activeTab === "preview" ? "bg-white text-black font-bold" : "text-neutral-300 hover:text-white"
                  }`}
              >
                Draft
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("customize")}
                className={`px-2.5 py-0.5 rounded font-medium transition-colors ${activeTab === "customize" ? "bg-white text-black font-bold" : "text-neutral-300 hover:text-white"
                  }`}
              >
                Quick Variables
              </button>
            </div>

            {/* Window controls */}
            <button
              type="button"
              onClick={() => setIsMinimized(!isMinimized)}
              aria-label="Minimize"
              className="p-1 hover:text-white hover:bg-neutral-800 rounded transition-colors"
            >
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
                <line x1="5" y1="12" x2="19" y2="12" />
              </svg>
            </button>
            <button
              type="button"
              onClick={() => setIsFullscreen(!isFullscreen)}
              aria-label="Full screen"
              className="p-1 hover:text-white hover:bg-neutral-800 rounded transition-colors"
            >
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
                {isFullscreen ? (
                  <path d="M4 14h6v6m10-10h-6V4" />
                ) : (
                  <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
                )}
              </svg>
            </button>
            <button
              type="button"
              onClick={handleReset}
              aria-label="Reset template"
              title="Reset template"
              className="p-1 hover:text-white hover:bg-neutral-800 rounded transition-colors"
            >
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>
        </div>

        {/* Minimized Content Collapse */}
        {!isMinimized && (
          <div className="flex flex-col flex-1 bg-white">
            {/* Quick Fill Mode Banner */}
            {activeTab === "customize" && (
              <div className="bg-neutral-50 p-4 border-b border-neutral-200">
                <p className="text-xs font-bold text-neutral-800 uppercase tracking-wide mb-3">
                  Populate Your Details (Auto-fills the email below):
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <input
                    type="text"
                    placeholder="Your Full Name"
                    value={studentName}
                    onChange={(e) => {
                      setStudentName(e.target.value);
                      setCustomBody("");
                    }}
                    className="p-2 border border-neutral-300 rounded bg-white focus:outline-none focus:border-black"
                  />
                  <input
                    type="text"
                    placeholder="College Name (e.g., Kohima Science College)"
                    value={collegeName}
                    onChange={(e) => {
                      setCollegeName(e.target.value);
                      setCustomBody("");
                    }}
                    className="p-2 border border-neutral-300 rounded bg-white focus:outline-none focus:border-black"
                  />
                  <input
                    type="text"
                    placeholder="Degree (e.g., BCA / B.Com / B.Sc)"
                    value={degreeName}
                    onChange={(e) => {
                      setDegreeName(e.target.value);
                      setCustomBody("");
                    }}
                    className="p-2 border border-neutral-300 rounded bg-white focus:outline-none focus:border-black"
                  />
                  <input
                    type="text"
                    placeholder="Target Host (e.g., instudia / YouthNet)"
                    value={orgName}
                    onChange={(e) => {
                      setOrgName(e.target.value);
                      setCustomBody("");
                    }}
                    className="p-2 border border-neutral-300 rounded bg-white focus:outline-none focus:border-black"
                  />
                  <input
                    type="text"
                    placeholder="Dates (e.g., June 15 to July 25, 2026)"
                    value={dates}
                    onChange={(e) => {
                      setDates(e.target.value);
                      setCustomBody("");
                    }}
                    className="p-2 border border-neutral-300 rounded bg-white focus:outline-none focus:border-black"
                  />
                  <input
                    type="text"
                    placeholder="Phone / WhatsApp Contact"
                    value={phone}
                    onChange={(e) => {
                      setPhone(e.target.value);
                      setCustomBody("");
                    }}
                    className="p-2 border border-neutral-300 rounded bg-white focus:outline-none focus:border-black"
                  />
                  <input
                    type="text"
                    placeholder="Key Skills (e.g., React, Next.js, Python)"
                    value={skills}
                    onChange={(e) => {
                      setSkills(e.target.value);
                      setCustomBody("");
                    }}
                    className="sm:col-span-2 p-2 border border-neutral-300 rounded bg-white focus:outline-none focus:border-black"
                  />
                </div>
                <div className="mt-3 flex justify-end">
                  <button
                    type="button"
                    onClick={() => setActiveTab("preview")}
                    className="bg-black text-white text-xs font-bold px-3 py-1.5 rounded uppercase tracking-wider hover:bg-neutral-800 transition-colors"
                  >
                    View Completed Draft
                  </button>
                </div>
              </div>
            )}

            {/* Recipients (To) Row */}
            <div className="flex items-center px-4 py-2 border-b border-neutral-200 text-sm">
              <span className="w-16 text-neutral-500 font-medium text-xs sm:text-sm">To</span>
              <input
                type="text"
                value={recipient}
                onChange={(e) => setRecipient(e.target.value)}
                placeholder="Recipients"
                className="flex-1 bg-transparent text-neutral-900 focus:outline-none text-xs sm:text-sm font-mono"
              />
              <div className="flex items-center gap-1.5 text-xs text-neutral-500">
                {!showCc && (
                  <button
                    type="button"
                    onClick={() => setShowCc(true)}
                    className="hover:text-black hover:underline px-1"
                  >
                    Cc
                  </button>
                )}
                {!showBcc && (
                  <button
                    type="button"
                    onClick={() => setShowBcc(true)}
                    className="hover:text-black hover:underline px-1"
                  >
                    Bcc
                  </button>
                )}
              </div>
            </div>

            {/* Optional Cc Row */}
            {showCc && (
              <div className="flex items-center px-4 py-1.5 border-b border-neutral-200 text-sm bg-neutral-50/50">
                <span className="w-16 text-neutral-500 font-medium text-xs">Cc</span>
                <input
                  type="text"
                  value={cc}
                  onChange={(e) => setCc(e.target.value)}
                  placeholder="Carbon copy"
                  className="flex-1 bg-transparent text-neutral-900 focus:outline-none text-xs font-mono"
                />
              </div>
            )}

            {/* Optional Bcc Row */}
            {showBcc && (
              <div className="flex items-center px-4 py-1.5 border-b border-neutral-200 text-sm bg-neutral-50/50">
                <span className="w-16 text-neutral-500 font-medium text-xs">Bcc</span>
                <input
                  type="text"
                  value={bcc}
                  onChange={(e) => setBcc(e.target.value)}
                  placeholder="Blind carbon copy"
                  className="flex-1 bg-transparent text-neutral-900 focus:outline-none text-xs font-mono"
                />
              </div>
            )}

            {/* Subject Row */}
            <div className="flex items-center px-4 py-2.5 border-b border-neutral-200 text-sm">
              <span className="w-16 text-neutral-500 font-medium text-xs sm:text-sm">Subject</span>
              <input
                type="text"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="Subject"
                className="flex-1 bg-transparent text-neutral-900 font-medium text-xs sm:text-sm focus:outline-none"
              />
            </div>

            {/* Body Textarea */}
            <div className="relative p-4 flex-1">
              <textarea
                value={activeBody}
                onChange={(e) => setCustomBody(e.target.value)}
                rows={isFullscreen ? 18 : 12}
                className="w-full h-full resize-y bg-transparent text-neutral-800 text-xs sm:text-sm leading-relaxed font-sans focus:outline-none border-none"
                placeholder="Compose your outreach message..."
              />
            </div>

            {/* Gmail Bottom Action & Formatting Bar */}
            <div className="bg-[#F8F9FA] px-4 py-3 border-t border-neutral-200 flex flex-wrap items-center justify-between gap-3">
              {/* Primary Buttons */}
              <div className="flex items-center gap-2.5">
                {/* Main Blue Copy Button (Styled like Gmail Send Pill) */}
                <button
                  type="button"
                  onClick={handleCopy}
                  className="bg-[#1b1c1e] hover:bg-[#1c1c1c] text-white font-semibold text-xs sm:text-sm px-4 py-2 rounded-full flex items-center gap-2 shadow-sm transition-all active:scale-95"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    {copied ? (
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    ) : (
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"
                      />
                    )}
                  </svg>
                  <span>{copied ? "Copied to Clipboard!" : "Copy Full Message"}</span>
                </button>

                {/* Open in Mail Client */}
                <button
                  type="button"
                  onClick={handleMailTo}
                  className="border border-neutral-300 hover:border-black bg-white hover:bg-neutral-50 text-neutral-800 text-xs font-semibold px-3 py-2 rounded-full flex items-center gap-1.5 transition-colors"
                  title="Open in your default email client"
                >
                  <svg className="w-3.5 h-3.5 text-neutral-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                  <span className="hidden sm:inline">Open in Email</span>
                </button>
              </div>

              {/* Gmail Formatting / Utilities Icons */}
              <div className="flex items-center gap-1 text-neutral-600">
                {/* Paperclip attachment simulation */}
                <span
                  className="p-1.5 hover:bg-neutral-200 rounded cursor-pointer transition-colors"
                  title="Attach College NOC and Resume"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
                    />
                  </svg>
                </span>

                {/* Reset Trash Can */}
                <button
                  type="button"
                  onClick={handleReset}
                  className="p-1.5 hover:bg-neutral-200 hover:text-red-600 rounded transition-colors ml-1"
                  title="Reset to default template"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
