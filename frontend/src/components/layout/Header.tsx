"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "@/i18n/TranslationContext";
import LanguageSwitcher from "@/components/ui/LanguageSwitcher";
import { SITE_NAME } from "@/lib/constants";

const SCROLL_THRESHOLD = 50;

const panelVariants = {
  closed: { x: "100%" },
  open: {
    x: 0,
    transition: { type: "spring" as const, stiffness: 300, damping: 30 },
  },
  exit: {
    x: "100%",
    transition: { duration: 0.25, ease: "easeIn" as const },
  },
};

const linkVariants = {
  closed: { x: 30, opacity: 0 },
  open: (i: number) => ({
    x: 0,
    opacity: 1,
    transition: { delay: 0.1 + i * 0.06, duration: 0.3 },
  }),
};

export default function Header() {
  const { dict, locale } = useTranslation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const NAV_ITEMS = [
    { label: dict.nav.home, href: `/${locale}/#hero` },
    { label: dict.nav.about, href: `/${locale}/#about` },
    { label: dict.nav.services, href: `/${locale}/#services` },
    { label: dict.nav.portfolio, href: `/${locale}/#portfolio` },
    { label: dict.nav.contact, href: `/${locale}/#contact` },
    { label: dict.nav.blog, href: `/${locale}/blog` },
  ];

  useEffect(() => {
    const handleScroll = () =>
      setIsScrolled(window.scrollY > SCROLL_THRESHOLD);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled ? "glass-nav py-3" : "py-5"
      }`}
    >
      <nav className="container mx-auto flex items-center justify-between px-5 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link
          href={`/${locale}`}
          className="relative z-50 flex items-center gap-3 group"
        >
          <Image
            src="/logo.png"
            alt={SITE_NAME}
            width={48}
            height={48}
            className="h-9 w-9 sm:h-10 sm:w-10 transition-transform duration-300 group-hover:scale-105"
            priority
          />
          <span className="hidden font-display text-lg font-semibold tracking-tight text-ivory sm:block">
            {SITE_NAME}
          </span>
        </Link>

        {/* Desktop Nav */}
        <ul className="hidden items-center gap-1 lg:flex">
          {NAV_ITEMS.map((link) => (
            <li key={link.label}>
              <Link
                href={link.href}
                className="relative rounded-lg px-4 py-2 text-[13px] font-medium text-stone transition-colors duration-300 hover:text-ivory"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Desktop CTA + Switcher */}
        <div className="hidden items-center gap-3 lg:flex">
          <LanguageSwitcher />
          <Link
            href={`/${locale}/#contact`}
            className="rounded-full gradient-gold-bg px-7 py-2.5 text-[13px] font-bold text-midnight transition-all duration-300 hover:shadow-lg hover:shadow-gold/20 hover:brightness-110"
          >
            {dict.nav.getStarted}
          </Link>
        </div>

        {/* Mobile Hamburger */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="relative z-50 flex h-10 w-10 items-center justify-center lg:hidden"
          aria-label="Toggle menu"
          aria-expanded={isOpen}
        >
          <div className="flex w-5 flex-col gap-[5px]">
            <span
              className={`block h-[1.5px] w-full rounded-full bg-ivory transition-all duration-300 origin-center ${
                isOpen ? "translate-y-[6.5px] rotate-45" : ""
              }`}
            />
            <span
              className={`block h-[1.5px] w-full rounded-full bg-ivory transition-all duration-300 ${
                isOpen ? "opacity-0 scale-x-0" : ""
              }`}
            />
            <span
              className={`block h-[1.5px] w-full rounded-full bg-ivory transition-all duration-300 origin-center ${
                isOpen ? "-translate-y-[6.5px] -rotate-45" : ""
              }`}
            />
          </div>
        </button>

        {/* Mobile Sliding Panel */}
        <AnimatePresence>
          {isOpen && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="fixed inset-0 z-40 bg-black/70 backdrop-blur-sm"
                onClick={() => setIsOpen(false)}
              />

              <motion.div
                variants={panelVariants}
                initial="closed"
                animate="open"
                exit="exit"
                className="fixed right-0 top-0 z-40 flex h-full w-[300px] flex-col border-l border-gold-border/10 bg-charcoal/95 backdrop-blur-2xl sm:w-[340px]"
              >
                <div className="flex flex-1 flex-col justify-center px-10">
                  <nav className="space-y-1">
                    {NAV_ITEMS.map((link, i) => (
                      <motion.div
                        key={link.label}
                        custom={i}
                        variants={linkVariants}
                        initial="closed"
                        animate="open"
                      >
                        <Link
                          href={link.href}
                          onClick={() => setIsOpen(false)}
                          className="block py-3.5 font-display text-xl font-medium text-stone transition-colors hover:text-gold"
                        >
                          {link.label}
                        </Link>
                      </motion.div>
                    ))}
                  </nav>

                  {/* Mobile language switcher */}
                  <motion.div
                    custom={NAV_ITEMS.length}
                    variants={linkVariants}
                    initial="closed"
                    animate="open"
                    className="mt-8 flex items-center gap-3"
                  >
                    <span className="text-xs text-stone">
                      {locale === "bg" ? "Език:" : "Language:"}
                    </span>
                    <LanguageSwitcher />
                  </motion.div>

                  <motion.div
                    custom={NAV_ITEMS.length + 1}
                    variants={linkVariants}
                    initial="closed"
                    animate="open"
                    className="mt-6"
                  >
                    <Link
                      href={`/${locale}/#contact`}
                      onClick={() => setIsOpen(false)}
                      className="block w-full rounded-full gradient-gold-bg py-3.5 text-center text-sm font-bold text-midnight"
                    >
                      {dict.nav.getStarted}
                    </Link>
                  </motion.div>
                </div>

                <div className="border-t border-gold-border/8 px-10 py-6">
                  <p className="text-xs text-ash">hello@andigital.bg</p>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
}
