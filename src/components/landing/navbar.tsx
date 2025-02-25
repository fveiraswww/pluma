"use client";
import type {UserDetails} from "@/db/types";

import React, {useState} from "react";
import Link from "next/link";
import Image from "next/image";
import {motion, AnimatePresence} from "framer-motion";

import {Button as AnimatedButton} from "../ui/animated-button";

import {cn} from "@/lib/utils";

interface HamburgerIconProps {
  isOpen: boolean;
  toggle: () => void;
}

function HamburgerIcon({isOpen, toggle}: HamburgerIconProps) {
  return (
    <button
      className="flex h-8 w-8 flex-col items-center justify-center lg:hidden"
      type="button"
      onClick={toggle}
    >
      <motion.span
        animate={{rotate: isOpen ? 45 : 0, y: isOpen ? 7 : 0}}
        className="block h-0.5 w-6 bg-black dark:bg-white"
      />
      <motion.span
        animate={{opacity: isOpen ? 0 : 1}}
        className="my-1.5 block h-0.5 w-6 bg-black dark:bg-white"
      />
      <motion.span
        animate={{rotate: isOpen ? -45 : 0, y: isOpen ? -7 : 0}}
        className="block h-0.5 w-6 bg-black dark:bg-white"
      />
    </button>
  );
}

export function Navbar({user}: {user: UserDetails | null}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const menuItems = [
    {href: "/", label: "Home"},
    {href: "/", label: "About"},
  ];

  return (
    <div className="sticky inset-x-0 top-0 z-30 w-full transition-all">
      <div className="absolute inset-0 left-0 top-0 block w-full border-b border-neutral-100 bg-white/75 backdrop-blur-lg transition-all dark:border-white/10 dark:bg-black/75" />
      <nav className="xl:px-0l relative mx-auto w-full max-w-screen-lg px-3 py-2 lg:px-4">
        <div className="flex flex-row items-center justify-between">
          <Link href="/">
            <div className="relative flex h-[20px] w-[100px] items-center">
              <h1 className="text-xl font-bold">🪶 Pluma</h1>
            </div>
          </Link>
          <div className="hidden flex-row gap-6 text-black lg:flex">
            {menuItems.map((item) => (
              <Link key={item.href} href={item.href}>
                <div className="relative flex items-center text-sm font-medium">{item.label}</div>
              </Link>
            ))}
          </div>
          <div className="flex flex-row items-center gap-4">
            <div className="hidden !px-0 !py-0 lg:block">
              {!user?.user_id && (
                <Link className="flex flex-row gap-2" href="/signIn">
                  <AnimatedButton
                    gradient_blur
                    className={cn("!h-7 !w-32 cursor-pointer transition-all hover:bg-gray-200")}
                  >
                    <p>Sign in / Sign up</p>
                  </AnimatedButton>
                </Link>
              )}
              {user?.user_id ? (
                <Link className="flex flex-row gap-2" href={`/dashboard/${user?.username}`}>
                  <AnimatedButton
                    gradient_blur
                    className={cn("!h-7 !w-32 cursor-pointer transition-all hover:bg-gray-200")}
                  >
                    <p>Dashboard</p>
                  </AnimatedButton>
                </Link>
              ) : null}
            </div>
            <HamburgerIcon isOpen={isMenuOpen} toggle={toggleMenu} />
          </div>
        </div>
      </nav>
      <AnimatePresence>
        {isMenuOpen ? (
          <motion.div
            animate={{opacity: 1, height: "auto"}}
            className="absolute w-full border-b border-neutral-100 bg-white dark:border-white/10 dark:bg-black lg:hidden"
            exit={{opacity: 0, height: 0}}
            initial={{opacity: 0, height: 0}}
            transition={{duration: 0.3}}
          >
            <div className="space-y-2 px-4 py-2">
              {menuItems.map((item) => (
                <Link key={item.href} href={item.href}>
                  <div className="block py-2 text-sm font-medium !text-black">{item.label}</div>
                </Link>
              ))}
              {!user?.user_id && (
                <Link className="block py-2" href="/signIn">
                  <AnimatedButton
                    gradient_blur
                    className={cn("!h-7 !w-full cursor-pointer transition-all hover:bg-gray-200")}
                  >
                    <p>Sign in / Sign up</p>
                  </AnimatedButton>
                </Link>
              )}
              {user?.user_id ? (
                <Link className="block py-2" href={`/dashboard/${user?.username}`}>
                  <AnimatedButton
                    gradient_blur
                    className={cn("!h-7 !w-full cursor-pointer transition-all hover:bg-gray-200")}
                  >
                    <p>Dashboard</p>
                  </AnimatedButton>
                </Link>
              ) : null}
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
