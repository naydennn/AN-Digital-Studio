"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "@/i18n/TranslationContext";
import LanguageSwitcher from "@/components/ui/LanguageSwitcher";
import { SITE_NAME } from "@/lib/constants";

const SCROLL_THRESHOLD = 50;
const SECTION_IDS = ["hero", "about", "services", "portfolio", "contact"] as const;

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
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("hero");
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  const homeBase = locale === "en" ? "" : `/${locale}`;
  const NAV_ITEMS = [
    { label: dict.nav.home, href: `${homeBase}/#hero`, sectionId: "hero" },
    { label: dict.nav.about, href: `${homeBase}/#about`, sectionId: "about" },
    { label: dict.nav.services, href: `${homeBase}/#services`, sectionId: "services" },
    { label: dict.nav.portfolio, href: `${homeBase}/#portfolio`, sectionId: "portfolio" },
    { label: dict.nav.contact, href: `${homeBase}/#contact`, sectionId: "contact" },
    { label: dict.nav.blog, href: `/${locale}/blog`, sectionId: "blog" },
  ];

  useEffect(() => {
    const handleScroll = () =>
      setIsScrolled(window.scrollY > SCROLL_THRESHOLD);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (pathname.includes("/blog")) {
      setActiveSection("blog");
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const intersecting = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => {
            const aIdx = SECTION_IDS.indexOf(a.target.id as (typeof SECTION_IDS)[number]);
            const bIdx = SECTION_IDS.indexOf(b.target.id as (typeof SECTION_IDS)[number]);
            return bIdx - aIdx;
          });
        if (intersecting.length > 0) {
          setActiveSection(intersecting[0].target.id);
        }
      },
      { rootMargin: "0px 0px -55% 0px", threshold: 0 }
    );

    SECTION_IDS.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [pathname]);

  useEffect(() => {
    if (isOpen) {
      const scrollY = window.scrollY;
      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = "100%";
      document.body.style.overflowY = "scroll";
    } else {
      const scrollY = Math.abs(parseInt(document.body.style.top || "0", 10));
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.width = "";
      document.body.style.overflowY = "";
      window.scrollTo(0, scrollY);
    }
    return () => {
      const scrollY = Math.abs(parseInt(document.body.style.top || "0", 10));
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.width = "";
      document.body.style.overflowY = "";
      if (scrollY) window.scrollTo(0, scrollY);
    };
  }, [isOpen]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? "glass-nav pt-[calc(env(safe-area-inset-top)+0.5rem)] pb-2.5"
          : "pt-[calc(env(safe-area-inset-top)+1.5rem)] pb-5"
      }`}
    >
      <nav className="container mx-auto flex items-center justify-between gap-6 px-5 sm:px-6 lg:px-8 lg:gap-10">
        {/* Logo */}
        <Link
          href={locale === "en" ? "/" : `/${locale}`}
          className={`relative z-50 flex items-center gap-3 group transition-all duration-500 lg:gap-4 ${isScrolled ? "gap-2 lg:gap-3" : ""}`}
        >
          <Image
            src="/logo.png"
            alt={SITE_NAME}
            width={48}
            height={48}
            className={`transition-all duration-500 group-hover:scale-105 ${isScrolled ? "h-8 w-8 sm:h-9 sm:w-9" : "h-9 w-9 sm:h-10 sm:w-10"}`}
            priority
          />
          <span className={`hidden font-display font-semibold tracking-tight text-ivory transition-all duration-500 sm:block ${isScrolled ? "text-base" : "text-lg"}`}>
            {SITE_NAME}
          </span>
        </Link>

        {/* Desktop Nav */}
        <ul className="hidden items-center gap-1 lg:flex lg:gap-6">
          {NAV_ITEMS.map((link) => (
            <li key={link.label}>
              <Link
                href={link.href}
                className={`relative rounded-lg px-4 py-2 text-[13px] font-medium text-stone transition-all duration-500 hover:text-ivory focus:outline-none focus:ring-2 focus:ring-gold/30 focus:ring-offset-2 focus:ring-offset-midnight focus:text-ivory lg:px-5 ${isScrolled ? "py-1.5 text-[12px] lg:px-4" : "py-2.5"}`}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Desktop CTA + Switcher */}
        <div className="hidden items-center gap-5 lg:flex lg:gap-8">
          <LanguageSwitcher compact={isScrolled} />
          <Link
            href={`${homeBase}/#contact`}
            className={`rounded-full gradient-gold-bg font-bold text-midnight transition-all duration-500 hover:shadow-lg hover:shadow-gold/20 hover:brightness-110 ${isScrolled ? "px-5 py-2 text-xs" : "px-7 py-2.5 text-[13px]"}`}
          >
            {dict.nav.getStarted}
          </Link>
        </div>

        {/* Mobile Hamburger */}
        <button
          ref={menuButtonRef}
          id="mobile-menu-button"
          onClick={() => setIsOpen(!isOpen)}
          className="relative z-50 flex min-h-[44px] min-w-[44px] items-center justify-center rounded-lg transition-colors hover:bg-gold/5 focus:outline-none focus:ring-2 focus:ring-gold/30 focus:ring-offset-2 focus:ring-offset-midnight touch-manipulation lg:hidden"
          aria-label={isOpen ? dict.a11y.closeMenu : dict.a11y.openMenu}
          aria-expanded={isOpen}
          aria-controls="mobile-nav-panel"
        >
          <div className="flex w-5 flex-col gap-[5px]">
            <span
              className={`block h-[1.5px] w-full rounded-full bg-ivory transition-[transform,opacity] duration-300 origin-center ${
                isOpen ? "translate-y-[6.5px] rotate-45" : ""
              }`}
            />
            <span
              className={`block h-[1.5px] w-full rounded-full bg-ivory transition-[transform,opacity] duration-300 ${
                isOpen ? "opacity-0 scale-x-0" : ""
              }`}
            />
            <span
              className={`block h-[1.5px] w-full rounded-full bg-ivory transition-[transform,opacity] duration-300 origin-center ${
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
                className="fixed inset-0 z-40 bg-black/70 backdrop-blur-sm transform-gpu"
                onClick={() => {
                  setIsOpen(false);
                  menuButtonRef.current?.focus();
                }}
              />

              <motion.div
                id="mobile-nav-panel"
                role="dialog"
                aria-modal="true"
                aria-labelledby="mobile-menu-button"
                variants={panelVariants}
                initial="closed"
                animate="open"
                exit="exit"
                className="fixed right-0 top-0 z-40 flex h-screen h-dvh w-[300px] flex-col border-l border-gold-border/10 bg-charcoal/95 backdrop-blur-2xl transform-gpu sm:w-[340px]"
              >
                <div className="flex flex-1 flex-col justify-center px-10">
                  <nav className="space-y-1">
                    {NAV_ITEMS.map((link, i) => {
                      const isActive = link.sectionId === activeSection;
                      return (
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
                            aria-current={isActive ? "page" : undefined}
                            className={`block rounded-lg border-l-2 py-3.5 pl-4 -ml-4 pr-4 font-display text-xl font-medium transition-colors duration-200 focus:outline-none focus:ring-0 ${
                              isActive
                                ? "border-l-gold bg-gold/[0.07] text-gold"
                                : "border-transparent text-stone hover:bg-gold/5 hover:text-gold focus:border-l-gold focus:bg-gold/[0.07] focus:text-gold"
                            }`}
                          >
                            {link.label}
                          </Link>
                        </motion.div>
                      );
                    })}
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
                      href={`${homeBase}/#contact`}
                      onClick={() => setIsOpen(false)}
                      className="block w-full rounded-full gradient-gold-bg py-3.5 text-center text-sm font-bold text-midnight"
                    >
                      {dict.nav.getStarted}
                    </Link>
                  </motion.div>
                </div>

                <div className="border-t border-gold-border/10 px-10 py-6">
                  <p className="text-xs text-ash">contact@andigital.bg</p>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
}
