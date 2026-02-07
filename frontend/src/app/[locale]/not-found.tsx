"use client";

import Button from "@/components/ui/Button";
import { useTranslation } from "@/i18n/TranslationContext";

export default function NotFound() {
  const { dict, locale } = useTranslation();
  const t = dict.notFound;

  return (
    <div className="flex min-h-screen items-center justify-center bg-midnight px-4">
      <div
        className="absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold/[0.04] blur-[100px] pointer-events-none"
        aria-hidden="true"
      />
      <div className="relative z-10 text-center">
        <h1 className="mb-3 font-display text-9xl font-extrabold gradient-text">
          {t.title}
        </h1>
        <h2 className="mb-4 font-display text-2xl font-semibold text-ivory">
          {t.heading}
        </h2>
        <p className="mb-10 max-w-sm text-base text-stone">{t.description}</p>
        <Button href={`/${locale}`} size="lg">
          {t.cta}
        </Button>
      </div>
    </div>
  );
}
