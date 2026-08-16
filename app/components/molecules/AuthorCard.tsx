import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Author } from "@/data/authors";

interface AuthorCardProps {
  author: Author;
  variant?: "compact" | "full";
}

export default function AuthorCard({ author, variant = "full" }: AuthorCardProps) {
  if (variant === "compact") {
    return (
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 border-2 border-black rounded-full overflow-hidden shrink-0 relative bg-neutral-100">
          <img
            src={author.avatarUrl || "https://res.cloudinary.com/dhwg77gwm/image/upload/f_auto,q_auto/v1/instudia/qzmdhewkbsyxmwsjccnu"}
            alt={author.name}
            className="w-full h-full object-cover"
          />
        </div>
        <div>
          <p className="text-[10px] font-black uppercase leading-tight text-black">{author.name}</p>
          <p className="text-[9px] font-bold text-black/60 uppercase tracking-tighter">{author.role}</p>
          {author.credentials && (
            <p className="text-[8px] font-semibold text-brandpurple uppercase tracking-tight">{author.credentials}</p>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="mt-24 p-8 sm:p-12 border-2 border-black bg-white shadow-[6px_6px_0px_rgba(0,0,0,1)] flex flex-col sm:flex-row gap-8 items-start">
      <div className="w-20 h-20 border-2 border-black rounded-full overflow-hidden shrink-0 bg-neutral-100">
        <img
          src={author.avatarUrl || "https://res.cloudinary.com/dhwg77gwm/image/upload/f_auto,q_auto/v1/instudia/qzmdhewkbsyxmwsjccnu"}
          alt={author.name}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="flex-1">
        <span className="text-[10px] font-black text-white bg-black px-3 py-1 uppercase tracking-widest mb-3 inline-block">
          About the Author
        </span>
        <h3 className="text-xl font-black text-black uppercase tracking-tight mb-1">{author.name}</h3>
        <p className="text-[10px] font-bold text-black/50 uppercase tracking-widest mb-1">{author.role}</p>
        {author.credentials && (
          <p className="text-xs font-semibold text-brandpurple mb-3">{author.credentials}</p>
        )}
        <p className="text-sm font-medium text-black/80 leading-relaxed mb-4">
          {author.bio ||
            (author.isOrganization
              ? "instudia is Nagaland's premier IT and skill training institute based in Dimapur, dedicated to equipping students with practical software engineering skills, career guidance, and accessible educational tools."
              : `${author.name} is an educator and instructor at instudia, Dimapur's leading computer training institute.`)}
        </p>
        {author.sameAs && author.sameAs.length > 0 && (
          <div className="flex items-center gap-3 pt-2 border-t border-neutral-200">
            <span className="text-[10px] font-black uppercase tracking-wider text-black/50">Verified Profiles:</span>
            {author.sameAs.map((url) => {
              const isLinkedin = url.includes("linkedin");
              const isGithub = url.includes("github");
              const label = isLinkedin ? "LinkedIn" : isGithub ? "GitHub" : "Website";
              return (
                <a
                  key={url}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-bold text-brandpurple hover:underline"
                >
                  {label} ↗
                </a>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
