"use client";

import { usePathname, useRouter } from "next/navigation";
import { useTranslation } from "@/i18n/TranslationContext";
import { LOCALES, type Locale } from "@/i18n/config";

const LOCALE_LABELS: Record<Locale, string> = {
  en: "EN",
  bg: "BG",
};

const LOCALE_COOKIE = "NEXT_LOCALE";

export default function LanguageSwitcher() {
  const { locale } = useTranslation();
  const pathname = usePathname();
  const router = useRouter();

  const switchLocale = (newLocale: Locale) => {
    if (newLocale === locale) return;

    document.cookie = `${LOCALE_COOKIE}=${newLocale};path=/;max-age=${60 * 60 * 24 * 365}`;

    const segments = pathname.split("/");
    segments[1] = newLocale;
    router.push(segments.join("/"));
  };

  return (
    <div className="flex items-center rounded-full border border-gold-border/15 bg-graphite/60 p-0.5">
      {LOCALES.map((loc) => (
        <button
          key={loc}
          onClick={() => switchLocale(loc)}
          className={`relative rounded-full px-3 py-1 text-[11px] font-semibold tracking-wide transition-all duration-300 ${
            locale === loc
              ? "gradient-gold-bg text-midnight shadow-sm"
              : "text-stone hover:text-ivory"
          }`}
          aria-label={`Switch to ${loc === "en" ? "English" : "Bulgarian"}`}
        >
          {LOCALE_LABELS[loc]}
        </button>
      ))}
    </div>
  );
}
