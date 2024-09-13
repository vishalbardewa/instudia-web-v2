import React from 'react';

import { SpeakerphoneIcon } from '@heroicons/react/outline';
import Link from 'next/link';

type BannerProps = {
  message: string;
  ctaText: string;
};
export default function TopBanner(props: BannerProps) {
  return (
    // eslint-disable-next-line tailwindcss/no-custom-classname
    <div className="bg-gradient-to-r from-purple-800 via-violet-900 to-purple-800">
      <div className="mx-auto max-w-7xl p-3 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center justify-between">
          <div className="flex w-0 flex-1 items-center">
            <span className="flex rounded-lg bg-gray-600 p-2">
              <SpeakerphoneIcon
                className="h-6 w-6 text-white"
                aria-hidden="true"
              />
            </span>
            <p className="ml-3 truncate font-medium text-white">
              <span className="md:hidden">{props.message}</span>
              <span className="hidden md:inline">{props.message}</span>
            </p>
          </div>
          <div className="order-3 mt-2 w-full shrink-0 sm:order-2 sm:mt-0 sm:w-auto">
            <Link
              href="/career"
              className="flex items-center justify-center rounded-md border border-transparent bg-white px-4 py-2 text-sm font-medium text-yellow-600 shadow-sm hover:bg-yellow-50"
            >
              {props.ctaText}
            </Link>
          </div>
          {/* <div className="order-2 shrink-0 sm:order-3 sm:ml-3">
            <button
              type="button"
              className="-mr-1 flex rounded-md p-2 hover:bg-yellow-500 focus:outline-none focus:ring-2 focus:ring-white sm:-mr-2"
            >
              <span className="sr-only">Dismiss</span>
              <XIcon className="h-6 w-6 text-white" aria-hidden="true" />
            </button>
          </div> */}
        </div>
      </div>
    </div>
  );
}
