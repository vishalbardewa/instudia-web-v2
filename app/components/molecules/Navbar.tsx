/* eslint-disable @typescript-eslint/no-shadow */
import React, { Fragment } from 'react';

import { Popover, Transition } from '@headlessui/react';
import {
  ChevronDownIcon,
  MenuIcon,
  XIcon,
  AcademicCapIcon,
} from '@heroicons/react/outline';
import {
  CalculatorIcon,
  ChevronDoubleRightIcon,
  DesktopComputerIcon,
} from '@heroicons/react/solid';
import { motion } from 'framer-motion';
import Link from 'next/link';

import { routes, slugs } from '@/routes';
import { classNames } from '@/utils/classnames';

const navigation = [
  // { name: 'Community', href: routes.COMMUNITY },
  { name: 'About', href: routes.ABOUT_US },
  { name: 'Contact Us', href: routes.CONTACT },
];

const solutions = [
  {
    name: 'Diploma in Computer Applications',
    description:
      'Get a better understanding of different prospects with computer.',
    href: `${routes.COURSES}/${slugs.DCA}`,
    icon: AcademicCapIcon,
    duration: '6 to 12 months',
  },
  {
    name: 'Tally with GST',
    description: `Understand the concepts of GST and implement the same as per statutory obligations. Learn processing of GST transactions through Tally.`,
    href: `${routes.COURSES}/${slugs.GST}`,
    icon: CalculatorIcon,
    duration: '3 to 5 months',
  },
  {
    name: 'Frontend Development',
    description:
      'Master frontend development with our React JS course, covering JavaScript basics to advanced techniques for creating dynamic and interactive user interfaces.',
    href: `${routes.COURSES}/${slugs.FRONTEND}`,
    icon: DesktopComputerIcon,
    duration: '6 to 9 months',
    variant: 'Beginner, Intermediate and Advanced',
  },
  {
    name: 'Programming with Python II',
    description:
      'One of the most fastest-growing programming languages in the world driven by its application in machine learning.',
    href: `${routes.COURSES}/${slugs.PYTHON2}`,
    icon: DesktopComputerIcon,
    duration: '3 to 6 months',
    variant: 'Beginner, Intermediate and Advanced',
  },
  {
    name: 'All Courses',
    description: "There's lot more we have got to offer. Click to explore 👉",
    href: routes.COURSES,
    icon: ChevronDoubleRightIcon,
  },
];

const staggeredAnimation = {
  animate: {
    transition: {
      staggeredChildren: 0.1,
    },
  },
};

export default function Navbar() {
  return (
    <>
      <header>
        <Popover className="relative bg-white">
          {({ open }) => (
            <>
              <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-6 sm:px-6 md:justify-start md:space-x-10 lg:px-8">
                <div className="flex justify-start lg:w-0 lg:flex-1">
                  <motion.div variants={staggeredAnimation}>
                    <Link href="/">
                      <>
                        <span className="sr-only">instudia</span>
                        <motion.img
                          initial={{ x: 200, opacity: 0 }}
                          animate={{ x: 0, opacity: 1 }}
                          exit={{ x: 200, opacity: 0 }}
                          transition={{ type: 'spring', stiffness: 30 }}
                          className="h-10 w-auto sm:h-14"
                          src="/assets/images/logo-with-tagline.png"
                          alt="instudia official logo"
                        />
                      </>
                    </Link>
                  </motion.div>
                </div>
                <div className="-my-2 -mr-2 md:hidden">
                  <Popover.Button className="inline-flex items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-yellow-500">
                    <span className="sr-only">Open menu</span>
                    <MenuIcon className="h-6 w-6" aria-hidden="true" />
                  </Popover.Button>
                </div>
                <Popover.Group as="nav" className="hidden space-x-10 md:flex">
                  <Popover className="relative">
                    {({ open }) => (
                      <>
                        <Popover.Button
                          className={classNames(
                            open ? 'text-gray-900' : 'text-gray-500',
                            'group bg-white rounded-md inline-flex items-center text-base font-medium hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500'
                          )}
                        >
                          <span>Courses</span>
                          <ChevronDownIcon
                            className={classNames(
                              open ? 'text-gray-600' : 'text-gray-400',
                              'ml-2 h-5 w-5 group-hover:text-gray-500'
                            )}
                            aria-hidden="true"
                          />
                        </Popover.Button>

                        <Transition
                          show={open}
                          as={Fragment}
                          enter="transition ease-out duration-200"
                          enterFrom="opacity-0 translate-y-1"
                          enterTo="opacity-100 translate-y-0"
                          leave="transition ease-in duration-150"
                          leaveFrom="opacity-100 translate-y-0"
                          leaveTo="opacity-0 translate-y-1"
                        >
                          <Popover.Panel
                            static
                            className="absolute z-30 -ml-4 mt-3 w-screen max-w-md lg:left-1/2 lg:ml-0 lg:max-w-2xl lg:-translate-x-1/2"
                          >
                            <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black">
                              <div className="relative grid gap-6 bg-white px-5 py-6 sm:gap-8 sm:p-8 lg:grid-cols-2">
                                {solutions.map((item) => (
                                  <Link
                                    key={item.name}
                                    href={item.href}
                                    as={item.href}
                                  >
                                    <span className="-m-3 flex items-start rounded-lg p-3 hover:bg-gray-50">
                                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-yellow-600 text-white sm:h-12 sm:w-12">
                                        <item.icon
                                          className="h-6 w-6"
                                          aria-hidden="true"
                                        />
                                      </div>
                                      <div className="ml-4">
                                        <p className="!mt-0 text-base font-medium text-gray-900">
                                          {item.name}
                                        </p>
                                        <p className="mt-1 text-sm text-gray-500">
                                          {item.description}
                                        </p>
                                        {item.duration && (
                                          <p className="!mt-0 text-sm text-gray-500">
                                            <span className="font-bold">
                                              Duration:{' '}
                                            </span>
                                            {item.duration}
                                          </p>
                                        )}
                                        {item.variant && (
                                          <p className="!mt-0 text-sm text-gray-500">
                                            <span className="font-bold">
                                              Levels:{' '}
                                            </span>
                                            {item.variant}
                                          </p>
                                        )}
                                      </div>
                                    </span>
                                  </Link>
                                ))}
                              </div>
                            </div>
                          </Popover.Panel>
                        </Transition>
                      </>
                    )}
                  </Popover>

                  {navigation.map((item) => (
                    <Link key={item.name} href={item.href}>
                      <span className="text-base font-medium text-gray-500 hover:text-gray-900">
                        {item.name}
                      </span>
                    </Link>
                  ))}
                </Popover.Group>
              </div>

              <Transition
                show={open}
                as={Fragment}
                enter="duration-200 ease-out"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="duration-100 ease-in"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Popover.Panel
                  focus
                  static
                  className="absolute inset-x-0 top-0 z-30 origin-top-right p-2 transition md:hidden"
                >
                  <div className="divide-y-2 divide-gray-50 rounded-lg bg-white shadow-lg ring-1 ring-black">
                    <div className="px-5 pt-5 pb-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <img
                            className="h-8 w-auto"
                            src="/assets/images/logo-with-tagline.png"
                            alt="Instudia"
                          />
                        </div>
                        <div className="-mr-2">
                          <Popover.Button className="inline-flex items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-yellow-500">
                            <span className="sr-only">Close menu</span>
                            <XIcon className="h-6 w-6" aria-hidden="true" />
                          </Popover.Button>
                        </div>
                      </div>
                      <div className="mt-6">
                        <nav className="grid grid-cols-1 gap-7">
                          {solutions.map((item) => (
                            <a
                              key={item.name}
                              href={item.href}
                              className="-m-3 flex items-center rounded-lg p-3 hover:bg-gray-50"
                            >
                              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-yellow-600 text-white">
                                <item.icon
                                  className="h-6 w-6"
                                  aria-hidden="true"
                                />
                              </div>
                              <div className="ml-4 text-base font-medium text-gray-900">
                                {item.name}
                              </div>
                            </a>
                          ))}
                        </nav>
                      </div>
                    </div>
                    <div className="py-6 px-5">
                      <div className="grid grid-cols-2 gap-4">
                        {navigation.map((item) => (
                          <Link key={item.name} href={item.href}>
                            <span className="text-base font-medium text-gray-500 hover:text-gray-900">
                              {item.name}
                            </span>
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                </Popover.Panel>
              </Transition>
            </>
          )}
        </Popover>
      </header>
    </>
  );
}
