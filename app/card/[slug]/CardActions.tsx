"use client";

import { useState } from "react";

const SHARE_URL = typeof window !== "undefined" ? window.location.href : "";

export default function CardActions({ slug, name }: { slug: string; name: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(
      `https://www.instudianagaland.com/card/${slug}`
    );
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShare = async () => {
    const url = `https://www.instudianagaland.com/card/${slug}`;
    if (navigator.share) {
      await navigator.share({
        title: `${name} — instudia`,
        text: `Connect with ${name} from instudia`,
        url,
      });
    } else {
      handleCopy();
    }
  };

  return (
    <div className="flex gap-3 mt-8 flex-wrap justify-center sm:justify-start">
      {/* Save Contact */}
      <a
        href={`/api/vcard/${slug}`}
        download={`${slug}.vcf`}
        className="inline-flex items-center gap-2 rounded-2xl bg-brandpurple px-6 py-3 text-sm font-extrabold text-white hover:bg-brandpurple/90 transition-all duration-200 shadow-lg shadow-brandpurple/20 hover:shadow-brandpurple/30 hover:-translate-y-0.5"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
        </svg>
        Save Contact
      </a>

      {/* Share */}
      <button
        onClick={handleShare}
        className="inline-flex items-center gap-2 rounded-2xl border border-neutral-200 bg-white px-6 py-3 text-sm font-extrabold text-[#1B1C1E] hover:bg-gray-50 transition-all duration-200 hover:-translate-y-0.5"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
        </svg>
        {copied ? "Copied!" : "Share"}
      </button>
    </div>
  );
}
