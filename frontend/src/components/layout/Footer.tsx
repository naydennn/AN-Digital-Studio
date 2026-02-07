"use client";

import Link from "next/link";
import Image from "next/image";
import { useTranslation } from "@/i18n/TranslationContext";
import { SITE_NAME, SOCIAL_LINKS } from "@/lib/constants";

const CURRENT_YEAR = new Date().getFullYear();

function FacebookIcon() {
  return (
    <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  );
}
function InstagramIcon() {
  return (
    <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
    </svg>
  );
}
function LinkedInIcon() {
  return (
    <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

const SOCIAL_ICON_MAP: Record<string, () => React.ReactElement> = {
  facebook: FacebookIcon,
  instagram: InstagramIcon,
  linkedin: LinkedInIcon,
};

export default function Footer() {
  const { dict, locale } = useTranslation();

  const NAV_ITEMS = [
    { label: dict.nav.home, href: `/${locale}/#hero` },
    { label: dict.nav.about, href: `/${locale}/#about` },
    { label: dict.nav.services, href: `/${locale}/#services` },
    { label: dict.nav.portfolio, href: `/${locale}/#portfolio` },
    { label: dict.nav.contact, href: `/${locale}/#contact` },
    { label: dict.nav.blog, href: `/${locale}/blog` },
  ];

  return (
    <footer className="border-t border-gold-border/8 bg-midnight">
      <div className="container mx-auto px-5 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-2">
            <Link href={`/${locale}`} className="mb-4 flex items-center gap-3">
              <Image src="/logo.png" alt={SITE_NAME} width={36} height={36} className="h-9 w-9" />
              <span className="font-display text-lg font-semibold text-ivory">{SITE_NAME}</span>
            </Link>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-stone">{dict.footer.description}</p>
            <div className="mt-7 flex gap-3">
              {Object.entries(SOCIAL_LINKS).map(([platform, url]) => {
                const Icon = SOCIAL_ICON_MAP[platform];
                return (
                  <a key={platform} href={url} target="_blank" rel="noopener noreferrer" aria-label={platform} className="flex h-10 w-10 items-center justify-center rounded-full border border-gold-border/10 text-stone transition-all duration-300 hover:border-gold-border/25 hover:text-gold hover:bg-gold/5">
                    {Icon && <Icon />}
                  </a>
                );
              })}
            </div>
          </div>
          <div>
            <h3 className="mb-5 text-[10px] font-bold uppercase tracking-[0.25em] text-gold">{dict.footer.navTitle}</h3>
            <ul className="space-y-3">
              {NAV_ITEMS.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-sm text-stone transition-colors hover:text-ivory">{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="mb-5 text-[10px] font-bold uppercase tracking-[0.25em] text-gold">{dict.footer.contactTitle}</h3>
            <ul className="space-y-3 text-sm text-stone">
              <li><a href="mailto:hello@andigital.bg" className="transition-colors hover:text-ivory">hello@andigital.bg</a></li>
              <li>{dict.contact.locationValue}</li>
            </ul>
          </div>
        </div>
        <div className="section-divider mt-12 mb-7" />
        <p className="text-center text-xs text-ash">&copy; {CURRENT_YEAR} {SITE_NAME}. {dict.footer.rights}</p>
      </div>
    </footer>
  );
}
