"use client";
import { Fragment, useState } from "react";
import { Dialog, Popover, Tab, Transition } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import Image from "next/image";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export default function NavigationWithDropdown({ navigation, onSearch }: { navigation: any; onSearch?: () => void }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="bg-white">
      {/* Mobile menu — tile-grid light slide */}
      <Transition.Root show={open} as={Fragment}>
        <Dialog as="div" className="relative z-50 lg:hidden" onClose={setOpen}>

          {/* Backdrop */}
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/40 backdrop-blur-sm" />
          </Transition.Child>

          {/* Panel */}
          <div className="fixed inset-0 z-40 flex">
            <Transition.Child
              as={Fragment}
              enter="transition ease-out duration-300 transform"
              enterFrom="translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in duration-200 transform"
              leaveFrom="translate-x-0"
              leaveTo="translate-x-full"
            >
              <Dialog.Panel className="relative ml-auto flex h-full w-[86vw] max-w-sm flex-col bg-white overflow-y-auto shadow-2xl">

                {/* ── Header ── */}
                <div className="flex items-center justify-between px-5 pt-5 pb-4 border-b border-neutral-100">
                  <Link href="/" onClick={() => setOpen(false)}>
                    <div className="h-10 sm:h-11 relative aspect-[3/1]">
                      <Image src="/assets/images/logo-with-tagline.png" alt="instudia" width={250} height={64} priority loading="eager" style={{ width: 'auto', height: 'auto' }} className="h-full object-contain" />
                    </div>
                  </Link>
                  <div className="flex items-center gap-2">
                    {/* Search button — mobile header */}
                    <button
                      onClick={() => { setOpen(false); onSearch?.(); }}
                      aria-label="Search"
                      className="flex items-center justify-center w-11 h-11 min-h-[44px] min-w-[44px] rounded-full border border-neutral-200 text-gray-500 hover:bg-gray-50 transition-colors"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                          d="M21 21l-4.35-4.35M17 11A6 6 0 115 11a6 6 0 0112 0z" />
                      </svg>
                    </button>
                    <button
                      onClick={() => setOpen(false)}
                      aria-label="Close menu"
                      className="flex items-center justify-center w-11 h-11 min-h-[44px] min-w-[44px] rounded-full border border-neutral-200 text-gray-500 hover:bg-gray-50 transition-colors"
                    >
                      <XMarkIcon className="h-5 w-5" aria-hidden="true" />
                    </button>
                  </div>
                </div>

                {/* ── Page tiles ── */}
                <nav className="flex-1 px-4 pt-5 pb-4">
                  <p className="text-[10px] font-extrabold uppercase tracking-widest text-gray-400 px-1 mb-3">
                    Menu
                  </p>
                  <div className="grid grid-cols-2 gap-2.5">
                    {navigation.pages.map((page: any) => (
                      <Link
                        key={page.name}
                        href={page.href}
                        onClick={() => setOpen(false)}
                        className="group relative flex flex-col justify-between rounded-2xl border border-neutral-100 bg-gray-50 px-4 py-4 hover:border-brandpurple/30 hover:bg-brandpurple/5 hover:shadow-sm transition-all duration-200"
                      >
                        <span className="text-sm font-extrabold text-[#1B1C1E] group-hover:text-brandpurple transition-colors leading-snug">
                          {page.name}
                        </span>
                        <div className="flex items-center justify-between mt-3">
                          {page.isNew ? (
                            <span className="inline-flex items-center gap-1 text-[9px] font-extrabold uppercase tracking-widest text-brandpurple">
                              <span className="w-1.5 h-1.5 rounded-full bg-brandpurple animate-pulse" />
                              New
                            </span>
                          ) : (
                            <span />
                          )}
                          <svg className="w-3.5 h-3.5 text-gray-300 group-hover:text-brandpurple group-hover:translate-x-0.5 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                          </svg>
                        </div>
                      </Link>
                    ))}
                  </div>

                  {/* ── Courses accordion ── */}
                  {navigation.categories.map((category: any) => (
                    <details key={category.name} className="group/cat mt-5">
                      <summary className="flex items-center justify-between rounded-2xl border border-neutral-100 bg-gray-50 px-4 py-4 cursor-pointer list-none hover:border-brandpurple/30 hover:bg-brandpurple/5 transition-all">
                        <span className="text-sm font-extrabold text-[#1B1C1E] group-open/cat:text-brandpurple">
                          {category.name}
                        </span>
                        <svg className="w-4 h-4 text-gray-400 transition-transform duration-200 group-open/cat:rotate-90 group-open/cat:text-brandpurple" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </summary>

                      <div className="mt-3 space-y-4 px-1">
                        {category.sections.map((section: any) => (
                          <div key={section.name}>
                            <p className="text-[10px] font-extrabold uppercase tracking-widest text-gray-400 mb-2">
                              {section.name}
                            </p>
                            <div className="grid grid-cols-2 gap-2">
                              {section.items.map((item: any) => (
                                <Link
                                  key={item.name}
                                  href={item.href}
                                  onClick={() => setOpen(false)}
                                  className="group/item flex items-center gap-2 rounded-xl border border-neutral-100 bg-white px-3 py-2.5 text-xs font-bold text-gray-600 hover:border-brandpurple/30 hover:text-brandpurple hover:bg-brandpurple/5 transition-all"
                                >
                                  <span className="w-1 h-1 rounded-full bg-brandpurple flex-shrink-0" />
                                  <span className="leading-tight">{item.name}</span>
                                </Link>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </details>
                  ))}
                </nav>

                {/* ── Bottom CTA ── */}
                <div className="px-4 py-5 border-t border-neutral-100 space-y-2.5">
                  <Link
                    href="/courses"
                    onClick={() => setOpen(false)}
                    className="flex items-center justify-center gap-2 w-full rounded-2xl bg-brandpurple px-6 py-3.5 text-sm font-extrabold text-white hover:bg-brandpurple/90 transition-all shadow-md shadow-brandpurple/20"
                  >
                    View All Courses
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </Link>
                  <a
                    href="tel:+918798587779"
                    className="flex items-center justify-center gap-2 w-full rounded-2xl px-6 py-3 text-sm font-bold text-gray-500 hover:text-gray-900 transition-all"
                  >
                    <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    +91 87985 87779
                  </a>
                </div>

              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>


      <header className="relative bg-white border-b border-neutral-100">

        <nav
          aria-label="Top"
          className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-2 sm:py-2.5 2xl:mx-32"
        >
          <div className="flex h-12 sm:h-14 lg:h-16 items-center justify-between">
            {/* Logo */}
            <div className="flex items-center">
              <Link href="/" className="flex items-center">
                <span className="sr-only">instudia</span>
                <div className="h-10 sm:h-12 lg:h-14 relative aspect-[3/1]">
                  <Image className="h-full object-contain" style={{ width: 'auto', height: 'auto' }} src="/assets/images/logo-with-tagline.png" alt="instudia logo" width={250} height={64} priority loading="eager" />
                </div>
              </Link>
            </div>

            {/* Flyout menus — Desktop */}
            <Popover.Group className="hidden lg:ml-8 lg:flex lg:self-stretch z-40">
              <div className="flex h-full space-x-8 items-center">
                {navigation.categories.map((category: any) => (
                  <Popover key={category.name} className="flex">
                    {({ open }) => {
                      return (
                        <>
                          <div className="relative flex">
                            {category.id === "courses" ? (
                              <Popover.Button className="animate-border inline-block rounded-md bg-white bg-gradient-to-r from-green-500 via-purple-500 to-purple-500 bg-[length:400%_400%] p-1 hover:cursor-pointer">
                                <span className="block rounded-md bg-slate-900 px-4 py-2 font-bold text-white">
                                  {" "}
                                  {category.name}{" "}
                                </span>
                              </Popover.Button>
                            ) : (
                              <Popover.Button
                                className={classNames(
                                  open
                                    ? "text-indigo-600"
                                    : "border-transparent text-gray-700 ",
                                  `relative z-10 -mb-px flex items-center text-sm font-medium transition-colors duration-200 ease-out focus-visible:outline-none`
                                )}
                              >
                                {category.name}
                              </Popover.Button>
                            )}
                          </div>

                          <Transition
                            as={Fragment}
                            enter="transition ease-out duration-200"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="transition ease-in duration-150"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                          >
                            <Popover.Panel className="absolute inset-x-0 top-full text-sm text-gray-500">
                              {/* Presentational element used to render the bottom shadow, if we put the shadow on the actual panel it pokes out the top, so we use this shorter element to hide the top of the shadow */}
                              <div
                                className="absolute inset-0 top-1/2 bg-white shadow"
                                aria-hidden="true"
                              />

                              <div className="relative bg-white">
                                <div className="mx-auto max-w-7xl px-8">
                                  <div className="grid grid-cols-2 gap-x-8 gap-y-10 py-16">
                                    <div className="col-start-2 grid grid-cols-2 gap-x-8">
                                      {category.featured.map((item: any) => (
                                        <div
                                          key={item.name}
                                          className="group relative text-base sm:text-sm"
                                        >
                                          <div className="aspect-h-1 aspect-w-1 overflow-hidden rounded-lg bg-gray-100 group-hover:opacity-75">
                                            <Image
                                              src={item.imageSrc}
                                              alt={item.imageAlt}
                                              fill
                                              sizes="(max-width: 1280px) 200px, 260px"
                                              loading="lazy"
                                              className="object-cover object-center"
                                            />
                                          </div>
                                          <a
                                            href={item.href}
                                            className="mt-6 block font-medium text-gray-900"
                                          >
                                            <span
                                              className="absolute inset-0 z-10"
                                              aria-hidden="true"
                                            />
                                            {item.name}
                                          </a>
                                          <p
                                            aria-hidden="true"
                                            className="mt-1"
                                          >
                                            See Details
                                          </p>
                                        </div>
                                      ))}
                                    </div>
                                    <div className="row-start-1 grid grid-cols-3 gap-x-8 gap-y-10 text-sm">
                                      {category.sections.map(
                                        (section: any) => (
                                          <div key={section.name}>
                                            <p
                                              id={`${section.name}-heading`}
                                              className="font-medium text-gray-900"
                                            >
                                              {section.name}
                                            </p>
                                            <ul
                                              role="list"
                                              aria-labelledby={`${section.name}-heading`}
                                              className="mt-6 space-y-6 sm:mt-4 sm:space-y-4"
                                            >
                                              {section.items.map(
                                                (item: any) => (
                                                  <li
                                                    key={item.name}
                                                    className="flex"
                                                  >
                                                    <a
                                                      href={item.href}
                                                      className="hover:text-gray-800"
                                                    >
                                                      {item.name}
                                                    </a>
                                                  </li>
                                                )
                                              )}
                                            </ul>
                                          </div>
                                        )
                                      )}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </Popover.Panel>
                          </Transition>
                        </>
                      );
                    }}
                  </Popover>
                ))}

                {navigation.pages.map((page: any) => (
                  <a
                    key={page.name}
                    href={page.href}
                    className="flex items-center text-[15px] font-semibold text-[#1B1C1E] hover:text-brandpurple transition-colors relative group"
                  >
                    {page.name}
                    {page.isNew && (
                      <span className="ml-2 inline-flex items-center justify-center px-1.5 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider text-black bg-white border border-neutral-200 shadow-sm gap-1.5 mt-0.5">
                        <span className="relative flex h-1.5 w-1.5">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brandpurple opacity-75" />
                          <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-brandpurple" />
                        </span>
                        New
                      </span>
                    )}
                  </a>
                ))}

              </div>
            </Popover.Group>

            {/* Right Action Area */}
            <div className="flex items-center gap-2 sm:gap-3">
              {/* Quick Search Button — Mobile */}
              <button
                type="button"
                onClick={onSearch}
                aria-label="Search"
                className="flex lg:hidden items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-neutral-200 text-neutral-600 hover:text-black hover:bg-neutral-100 active:scale-95 transition-all"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M21 21l-4.35-4.35M17 11A6 6 0 115 11a6 6 0 0112 0z" />
                </svg>
              </button>

              {/* Mobile Menu Button */}
              <button
                type="button"
                className="flex lg:hidden items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-neutral-100 text-neutral-800 hover:bg-neutral-200 active:scale-95 transition-all"
                onClick={() => setOpen(true)}
                aria-label="Open menu"
              >
                <Bars3Icon className="h-5 w-5" aria-hidden="true" />
              </button>

              {/* Search trigger — Desktop */}
              <div className="hidden lg:flex items-center">
                <button
                  onClick={onSearch}
                  aria-label="Search"
                  className="flex items-center gap-2 text-gray-400 border border-neutral-200 rounded-full px-3 py-1.5 hover:border-brandpurple/40 hover:text-brandpurple transition-all"
                >
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                      d="M21 21l-4.35-4.35M17 11A6 6 0 115 11a6 6 0 0112 0z" />
                  </svg>
                  <span className="text-xs">Search</span>
                  <kbd className="inline-flex items-center gap-0.5 text-[10px] font-mono font-medium text-gray-300 border border-neutral-200 rounded px-1 py-0.5">
                    <span>⌘</span>K
                  </kbd>
                </button>
              </div>
            </div>
          </div>
        </nav>
      </header>
    </div>
  );
}
