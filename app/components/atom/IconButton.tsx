import React from 'react';

// import { PaperAirplaneIcon } from '@heroicons/react/outline';

interface IIconButton {
  text: string;
  formLink?: string;
  buttonSize?: string;
  textSize?: string;
  iconSize?: string;
}

export default function IconButton({
  text,
  formLink,
  buttonSize = 'px-4 py-2',
  textSize = 'text-base',
  iconSize = '5',
}: IIconButton) {
  return (
    <button
      type="button"
      className={`mt-4 inline-flex items-center rounded-md border border-transparent bg-black ${buttonSize} ${textSize} font-medium text-white shadow-sm hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2`}
    >
      <a
        className="text-white hover:border-b-0"
        href={formLink}
        target="_blank"
        rel="noreferrer"
        // typeform "https://2vbjldc556s.typeform.com/to/UV8mGea7"
      >
        {text}
      </a>
      {/* <PaperAirplaneIcon
        className={`h- ml-3 -mr-1${iconSize} w-${iconSize}`}
        aria-hidden="true"
      /> */}
    </button>
  );
}
