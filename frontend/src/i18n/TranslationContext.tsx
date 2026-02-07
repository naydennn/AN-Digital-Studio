"use client";

import { createContext, useContext } from "react";
import type { Dictionary } from "./types";
import type { Locale } from "./config";
import type { ReactNode } from "react";

interface TranslationContextValue {
  dict: Dictionary;
  locale: Locale;
}

const TranslationContext = createContext<TranslationContextValue | null>(null);

export function TranslationProvider({
  children,
  dict,
  locale,
}: {
  children: ReactNode;
  dict: Dictionary;
  locale: Locale;
}) {
  return (
    <TranslationContext.Provider value={{ dict, locale }}>
      {children}
    </TranslationContext.Provider>
  );
}

export function useTranslation(): TranslationContextValue {
  const ctx = useContext(TranslationContext);
  if (!ctx) {
    throw new Error("useTranslation must be used within TranslationProvider");
  }
  return ctx;
}
