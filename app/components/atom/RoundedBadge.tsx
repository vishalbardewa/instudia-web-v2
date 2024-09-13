import { StarIcon } from '@heroicons/react/solid';

import { IRoundedBadge } from '@/interfaces';

export default function RoundedBadge({ text, color }: IRoundedBadge) {
  return (
    <>
      <span className="inline-flex items-center rounded-md bg-yellow-500 px-2.5 py-0.5 text-sm font-medium text-white ">
        <svg className="-ml-0.5 mr-1.5 h-5 w-5" fill={color} viewBox="0 0 8 8">
          <StarIcon />
        </svg>
        {text}
      </span>
    </>
  );
}
