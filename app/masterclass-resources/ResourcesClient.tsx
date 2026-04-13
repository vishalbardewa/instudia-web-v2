"use client";

import React, { useState } from 'react';
import Image from 'next/image';

const DUMMY_RESOURCES = [
  {
    id: 1,
    title: 'Masterclass Presentation Deck',
    description: 'The complete slide deck used during the session, including bonus materials.',
    type: 'PDF',
    size: '4.2 MB',
    link: '#deck',
    bgColor: 'bg-[#FFD28A]',
  },
  {
    id: 2,
    title: 'Student Handout & Action Plan',
    description: 'Step-by-step action plan to implement what you learned today.',
    type: 'Document',
    size: '1.1 MB',
    link: '#handout',
    bgColor: 'bg-[#e16687]',
  },
  {
    id: 3,
    title: 'Design Assets Toolkit',
    description: 'A zip file containing all the UI templates and design assets discussed.',
    type: 'ZIP',
    size: '15.6 MB',
    link: '#assets',
    bgColor: 'bg-[#99daee]',
  },
  {
    id: 4,
    title: 'Recommended Tools & Links',
    description: 'Curated list of software, platforms, and readings for your journey.',
    type: 'Link',
    size: 'External',
    link: '#tools',
    bgColor: 'bg-[#b936d0]',
  }
];

export default function ResourcesClient() {
  const [hasAccess, setHasAccess] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [pendingResourceUrl, setPendingResourceUrl] = useState<string | null>(null);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleDownloadClick = (e: React.MouseEvent<HTMLAnchorElement>, link: string) => {
    if (!hasAccess) {
      e.preventDefault();
      setPendingResourceUrl(link);
      setShowModal(true);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const phone = formData.get('phone') as string;

    try {
      const res = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          email,
          phone,
          leadSource: 'Masterclass Resources Unlock',
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || 'Failed to verify details');
      }

      setHasAccess(true);
      setShowModal(false);

      if (pendingResourceUrl) {
        window.location.href = pendingResourceUrl;
      }
    } catch (err: any) {
      setError(err.message || 'Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#f8f9fa] relative overflow-hidden pb-20">
      {/* Background decoration taken from courses page */}
      <Image
        className="absolute right-0 top-0 size-80 lg:size-[800px] lg:right-[80px] opacity-[.04] pointer-events-none"
        src="https://ik.imagekit.io/dxffek9yf/course-list-page/background.png?updatedAt=1726161612844"
        width={800}
        height={800}
        alt="Design Hexagonal"
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 lg:pt-32">

        {/* Bold Hero Section */}
        <div className="mb-16 md:mb-24 max-w-4xl bg-white/90 backdrop-blur-xl border-[4px] border-black p-8 md:p-14 rounded-3xl shadow-[12px_12px_0px_rgba(0,0,0,1)] md:shadow-[20px_20px_0px_rgba(0,0,0,1)] relative z-10 transition-transform duration-300 hover:-translate-y-1">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-black text-white text-[10px] sm:text-xs font-mono font-bold uppercase tracking-widest mb-8">
            <span>🔒</span> Exclusive Student Access
          </div>

          <h1 className="text-5xl md:text-6xl lg:text-8xl font-bold leading-[1.1] tracking-tight mb-8 text-black">
            Masterclass <br className="hidden lg:block" />
            <span className="before:block before:absolute before:-inset-1 before:-skew-y-3 before:bg-yellow-500 relative inline-block mt-3 md:mt-4">
              <span className="relative px-3 py-2 text-white drop-shadow-sm">Resources.</span>
            </span>
          </h1>

          <p className="text-lg md:text-2xl text-black/80 font-medium leading-relaxed max-w-2xl mt-10 md:mt-12 border-l-[4px] border-black pl-6">
            Welcome! Here you'll find all the strategic handouts, presentation slides, and bonus toolkits mentioned during the session. Let's get to work.
          </p>
        </div>

        {hasAccess && (
          <div className="mb-8 p-3 md:p-4 bg-green-50 border-[3px] border-green-500 rounded-xl flex items-center gap-3 md:gap-4 animate-in fade-in zoom-in duration-300 max-w-2xl shadow-[6px_6px_0px_rgba(34,197,94,1)]">
            <div className="w-8 h-8 rounded-full bg-green-500 text-white flex items-center justify-center shrink-0">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
            </div>
            <p className="text-sm md:text-base text-green-900 font-bold uppercase tracking-wide">Success! Your resources are fully unlocked for this session.</p>
          </div>
        )}

        {/* Resources Grid always visible */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {DUMMY_RESOURCES.map((resource) => (
            <div
              key={resource.id}
              className={`group relative ${resource.bgColor} rounded-3xl p-6 md:p-8 transition-transform duration-300 hover:-translate-y-2 hover:shadow-[14px_14px_0px_rgba(0,0,0,1)] border-[3px] border-black overflow-hidden shadow-[8px_8px_0px_rgba(0,0,0,1)]`}
            >
              <div className="absolute -right-10 -top-10 w-48 h-48 bg-white/30 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700"></div>

              <div className="relative z-10 flex flex-col h-full">
                <div className="mb-8">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-black text-white text-[10px] font-mono font-bold uppercase tracking-wider rounded-lg border-2 border-black w-fit mb-5">
                    {resource.type} • {resource.size}
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold text-black mb-3 leading-snug group-hover:underline decoration-[4px] underline-offset-4">
                    {resource.title}
                  </h3>
                  <p className="text-black/80 font-semibold text-sm leading-relaxed">
                    {resource.description}
                  </p>
                </div>

                <div className="mt-auto pt-6">
                  <a
                    href={resource.link}
                    onClick={(e) => handleDownloadClick(e, resource.link)}
                    className="inline-flex items-center gap-2 bg-black text-white px-5 py-3 rounded-xl text-sm font-bold uppercase tracking-wider hover:bg-white hover:text-black hover:border-black border-[3px] border-black transition-colors w-fit shadow-sm"
                  >
                    {!hasAccess ? (
                      <>
                        Unlock & Download
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                          <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                          <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                        </svg>
                      </>
                    ) : (
                      <>
                        Download Now
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                          <polyline points="7 10 12 15 17 10" />
                          <line x1="12" y1="15" x2="12" y2="3" />
                        </svg>
                      </>
                    )}
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Support Section */}
        <div className="mt-16 md:mt-24 p-8 md:p-12 bg-yellow-400 rounded-3xl text-black border-[4px] border-black relative overflow-hidden transition-transform duration-300 hover:-translate-y-1 shadow-[12px_12px_0px_rgba(0,0,0,1)] group">
          <div className="absolute right-0 bottom-0 opacity-10 transform translate-x-1/4 translate-y-1/4 group-hover:scale-110 transition-transform duration-500">
            <svg width="300" height="300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
          </div>
          <div className="relative z-10 max-w-2xl">
            <h2 className="text-3xl md:text-4xl font-black mb-3 md:mb-5">Need additional help?</h2>
            <p className="text-black/80 font-bold text-sm md:text-base mb-6 md:mb-8 leading-relaxed">
              If you're having trouble downloading any of the resources or need further assistance with the masterclass content, our support team is ready to help you out immediately.
            </p>
            <a
              href="mailto:support@instudianagaland.com"
              className="inline-block border-[3px] border-black bg-white hover:bg-black hover:text-white rounded-xl px-6 md:px-8 py-3 md:py-4 font-mono text-xs md:text-sm font-bold uppercase tracking-widest transition-colors duration-300 shadow-[4px_4px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-y-1 hover:translate-x-1"
            >
              Contact Support
            </a>
          </div>
        </div>
      </div>

      {/* Unlock Modal Overlay */}
      {showModal && !hasAccess && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
          <div
            className="absolute inset-0 bg-neutral-900/60 backdrop-blur-sm"
            onClick={() => setShowModal(false)}
          ></div>

          <div className="relative bg-white rounded-[2rem] w-full max-w-lg p-6 md:p-10 shadow-[16px_16px_0px_rgba(0,0,0,1)] border-[4px] border-black animate-in fade-in zoom-in-95 duration-200">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-5 right-5 text-neutral-400 hover:text-black transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>

            <div className="absolute -top-6 -left-6 text-6xl transform -rotate-12">🔐</div>

            <div className="mt-2 md:mt-4">
              <h2 className="text-3xl font-bold mb-2">Verify to Download</h2>
              <p className="text-neutral-600 text-sm md:text-base mb-6 md:mb-8 font-medium">
                Please enter your details once to verify your attendance and unlock all downloads.
              </p>

              {error && (
                <div className="mb-4 md:mb-6 p-3 md:p-4 bg-red-50 border-2 border-red-500 text-red-700 rounded-xl font-medium text-sm">
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4 md:space-y-5">
                <div>
                  <label htmlFor="name" className="block text-xs md:text-sm font-bold uppercase tracking-wider text-black mb-1.5 md:mb-2">Full Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    placeholder="Jane Doe"
                    className="w-full px-4 py-2.5 md:py-3 rounded-xl border-[3px] border-neutral-300 focus:border-black focus:ring-black outline-none transition-colors text-sm md:text-base font-medium"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-xs md:text-sm font-bold uppercase tracking-wider text-black mb-1.5 md:mb-2">Email Address</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    placeholder="jane@example.com"
                    className="w-full px-4 py-2.5 md:py-3 rounded-xl border-[3px] border-neutral-300 focus:border-black focus:ring-black outline-none transition-colors text-sm md:text-base font-medium"
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-xs md:text-sm font-bold uppercase tracking-wider text-black mb-1.5 md:mb-2">WhatsApp Number</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    pattern="[0-9]{10}"
                    required
                    placeholder="9876543210"
                    title="Please enter exactly 10 digits"
                    className="w-full px-4 py-2.5 md:py-3 rounded-xl border-[3px] border-neutral-300 focus:border-black focus:ring-black outline-none transition-colors text-sm md:text-base font-medium"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-black text-white px-6 md:px-8 py-3 md:py-4 rounded-xl text-sm md:text-base font-bold uppercase tracking-wider hover:bg-neutral-800 disabled:bg-neutral-400 transition-colors flex justify-center items-center gap-2 mt-4 md:mt-6 shadow-[6px_6px_0px_rgba(0,0,0,0.2)] disabled:shadow-none"
                >
                  {isLoading ? 'Verifying...' : 'Unlock & Download!'}
                  {!isLoading && (
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                      <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                    </svg>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
