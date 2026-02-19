"use client";

import { usePathname, useRouter } from "next/navigation";
import { useTranslation } from "@/i18n/TranslationContext";
import { LOCALES, type Locale } from "@/i18n/config";

const LOCALE_LABELS: Record<Locale, string> = {
  en: "EN",
  bg: "BG",
};

const LOCALE_COOKIE = "NEXT_LOCALE";

interface LanguageSwitcherProps {
  compact?: boolean;
}

export default function LanguageSwitcher({ compact = false }: LanguageSwitcherProps) {
  const { locale } = useTranslation();
  const pathname = usePathname();
  const router = useRouter();

  const switchLocale = (newLocale: Locale) => {
    if (newLocale === locale) return;

    document.cookie = `${LOCALE_COOKIE}=${newLocale};path=/;max-age=${60 * 60 * 24 * 365}`;

    const segments = pathname.split("/").filter(Boolean);

    if (segments.length > 0 && LOCALES.includes(segments[0] as Locale)) {
      segments[0] = newLocale;
    } else {
      segments.unshift(newLocale);
    }

    let newPath = "/" + segments.join("/");
    if (newPath === "/en") newPath = "/";

    router.push(newPath);
  };

  return (
    <div
      role="group"
      aria-label="Language"
      className={`inline-flex rounded-full border border-gold-border/10 bg-charcoal/90 p-0.5 transition-all duration-300 ${
        compact ? "p-px" : ""
      }`}
    >
      {LOCALES.map((loc) => (
        <button
          key={loc}
          type="button"
          onClick={() => switchLocale(loc)}
          className={`rounded-full px-3.5 py-1.5 text-[11px] font-semibold tracking-wide transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-gold/30 focus:ring-offset-2 focus:ring-offset-midnight touch-manipulation ${
            compact ? "px-3 py-1 text-[10px]" : ""
          } ${
            locale === loc
              ? "gradient-gold-bg text-midnight"
              : "text-stone hover:text-ivory hover:bg-white/5"
          }`}
          aria-label={`Switch to ${loc === "en" ? "English" : "Bulgarian"}`}
          aria-current={locale === loc ? "true" : undefined}
        >
          {LOCALE_LABELS[loc]}
        </button>
      ))}
    </div>
  );
}
