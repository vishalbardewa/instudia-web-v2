import React from 'react'
import { IconHome, IconUser } from "@tabler/icons-react";
import { IconMessage } from "@tabler/icons-react";
import { FloatingNav } from '../organisms/FloatingNav';
import Footer from '../organisms/Footer';
import NavigationWithDropdown from '../organisms/NavigationWithDropdown';

const navItems = [
    {
      name: "Home",
      link: "/",
      icon: <IconHome className="h-4 w-4 text-neutral-500 dark:text-white" />,
    },
    {
      name: "About",
      link: "/about",
      icon: <IconUser className="h-4 w-4 text-neutral-500 dark:text-white" />,
    },
    {
      name: "Contact",
      link: "/contact",
      icon: <IconMessage className="h-4 w-4 text-neutral-500 dark:text-white" />,
    },
  ];
export default function PrimaryLayout({children}: any) {
  return (
    <>
     <FloatingNav navItems={navItems} />
      <NavigationWithDropdown />
      {children}
      <Footer />
    </>
  )
}
