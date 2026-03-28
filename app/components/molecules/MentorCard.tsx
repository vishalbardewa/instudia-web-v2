import React from 'react';
import Image from 'next/image';
import { IconBriefcase, IconExternalLink, IconUserCircle } from '@tabler/icons-react';

interface MentorProps {
  name: string;
  role: string;
  company: string;
  imageUrl?: string;
}

export const MentorCard = ({ name, role, company, imageUrl }: MentorProps) => {
  return (
    <div className="flex items-center p-4 bg-neutral-50 hover:bg-neutral-100 transition-colors border border-neutral-200 rounded-xl gap-4 group cursor-pointer shadow-sm">
      {imageUrl ? (
        <Image 
          src={imageUrl} 
          alt={name} 
          width={48}
          height={48}
          className="w-12 h-12 rounded-full object-cover border-2 border-brandpurple/30 group-hover:border-brandpurple transition-colors" 
        />
      ) : (
        <div className="w-12 h-12 rounded-full bg-neutral-200 flex items-center justify-center border-2 border-neutral-300 group-hover:border-brandpurple/50 transition-colors">
          <IconUserCircle className="text-neutral-400" size={28} />
        </div>
      )}
      
      <div className="flex-1">
        <h4 className="text-[#1B1C1E] font-bold tracking-tight">{name}</h4>
        <div className="flex items-center text-xs text-brandpurple gap-1.5 mt-0.5 font-semibold">
          <IconBriefcase size={14} />
          <span>{role} @ <span className="text-neutral-600 font-medium">{company}</span></span>
        </div>
      </div>
      <button 
        className="p-2.5 bg-white text-neutral-400 border border-neutral-200 rounded-lg group-hover:bg-brandpurple group-hover:text-white group-hover:border-brandpurple transition-all shadow-sm"
        aria-label={`Connect with ${name}`}
      >
        <IconExternalLink size={18} />
      </button>
    </div>
  );
};
