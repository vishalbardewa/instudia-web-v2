import { UsersIcon } from '@heroicons/react/24/solid';
import Link from 'next/link';

import RoundedBadge from '../atom/RoundedBadge';

export default function ImageBanner({
  title,
  description,
  slug,
  duration,
  durationUnit,
}: any) {
  return (
    <div className="relative col-span-3 bg-white">
      <div className="h-56 bg-yellow-600 sm:h-72 lg:absolute lg:left-0 lg:h-full">
        <img
          className="w-full object-cover lg:h-full"
          src={`/assets/images/${slug}.png`}
          alt={slug}
        />
      </div>
      <div className="relative mx-auto max-w-7xl px-4 py-8 sm:py-12 sm:px-6 lg:py-16">
        <div className="mx-auto mt-24 max-w-2xl lg:mr-0 lg:ml-auto lg:mt-0 lg:w-1/2 lg:max-w-none lg:pl-10">
          <div className="flex justify-between">
            <div className="flex h-12 w-12 items-center justify-center rounded-md bg-yellow-500 text-white">
              <UsersIcon className="h-6 w-6" aria-hidden="true" />
            </div>
            <RoundedBadge text="Bestseller" color="white" />
          </div>
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900 sm:text-4xl">
            <Link href={`/courses/${slug}`}>
              <span className="text-black">{title}</span>
            </Link>
          </h2>
          <p className="mt-6 text-lg text-gray-500">{description}</p>
          <div className="mt-8 overflow-hidden">
            <dl className="-mx-8 -mt-8 flex flex-wrap">
              <div className="flex flex-col px-8 pt-8">
                <dt className="order-2 text-base font-medium text-gray-500">
                  Duration
                </dt>
                <dd className="order-1 text-2xl font-extrabold text-yellow-600 sm:text-3xl">
                  {`${duration} ${durationUnit}`}
                </dd>
              </div>
              {/* <div className="flex flex-col px-8 pt-8">
                <dt className="order-2 text-base font-medium text-gray-500">
                  Pepperoni
                </dt>
                <dd className="order-1 text-2xl font-extrabold text-yellow-600 sm:text-3xl">
                  99.9%
                </dd>
              </div>
              <div className="flex flex-col px-8 pt-8">
                <dt className="order-2 text-base font-medium text-gray-500">
                  Calories
                </dt>
                <dd className="order-1 text-2xl font-extrabold text-yellow-600 sm:text-3xl">
                  100k+
                </dd>
              </div> */}
            </dl>
          </div>
        </div>
      </div>
    </div>
  );
}
