import React from 'react';

import { AppConfig } from '@/utils/AppConfig';

export default function Footer({ footerNavigation }: any) {
  return (
    <footer className="mt-24 bg-gray-900 sm:mt-12">
      <div className="mx-auto max-w-md overflow-hidden py-12 px-4 sm:max-w-3xl sm:px-6 lg:max-w-7xl lg:px-8">
        <nav
          className="-mx-5 -my-2 flex flex-wrap justify-center"
          aria-label="Footer"
        >
          {footerNavigation.main.map((item: any) => (
            <div key={item.name} className="px-5 py-2">
              {item?.external ? (
                <a
                  href={item.href}
                  target="_blank"
                  rel={'noreferrer'}
                  className="text-base text-gray-400 hover:text-gray-300"
                >
                  {item.name}
                </a>
              ) : (
                <a
                  href={item.href}
                  className="text-base text-gray-400 hover:text-gray-300"
                >
                  {item.name}
                </a>
              )}
            </div>
          ))}
        </nav>
        <div className="mt-8 flex justify-center space-x-6">
          {footerNavigation.social.map((item: any) => (
            <a
              key={item.name}
              href={item.href}
              className="text-gray-400 hover:text-gray-300"
            >
              <span className="sr-only">{item.name}</span>
              <item.icon className="h-6 w-6" aria-hidden="true" />
            </a>
          ))}
        </div>
        <p className="mt-8 text-center text-base text-gray-400">
          &copy; {new Date().getFullYear()} {AppConfig.title}. Powered with{' '}
          <span role="img" aria-label="Love">
            🥰
          </span>{' '}
          by <b>Team instudia</b>
        </p>
      </div>
    </footer>
  );
}
