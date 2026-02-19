"use client";

import { useState } from "react";
import ScrollReveal from "@/components/effects/ScrollReveal";
import SectionWrapper from "@/components/ui/SectionWrapper";
import { useTranslation } from "@/i18n/TranslationContext";
import { ANIMATION } from "@/lib/constants";

export default function FAQ() {
  const { dict } = useTranslation();
  const t = dict.faq;
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <SectionWrapper id="faq">
      <div
        className="absolute left-1/2 top-[-10%] h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-gold/[0.03] blur-[120px] pointer-events-none"
        aria-hidden="true"
      />

      <div className="mb-16 text-center">
        <ScrollReveal>
          <span className="mb-4 inline-block text-xs font-semibold uppercase tracking-[0.25em] text-gold">
            {t.label}
          </span>
          <h2 className="mb-6 font-display text-3xl font-bold tracking-tight text-ivory sm:text-4xl lg:text-5xl">
            {t.heading}
            <span className="gradient-text">{t.headingAccent}</span>
          </h2>
          <p className="mx-auto max-w-2xl text-base text-stone sm:text-lg">
            {t.sub}
          </p>
        </ScrollReveal>
      </div>

      <div className="mx-auto max-w-3xl space-y-3">
        {t.items.map((item, index) => {
          const isOpen = openIndex === index;

          return (
            <ScrollReveal key={index} delay={index * ANIMATION.staggerChildren}>
              <div
                className={`rounded-xl border transition-colors duration-300 ${
                  isOpen
                    ? "border-gold/40 bg-gold/[0.04]"
                    : "border-white/[0.06] bg-white/[0.02] hover:border-gold/20 hover:bg-white/[0.04]"
                }`}
              >
                <button
                  onClick={() => toggle(index)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
                >
                  <span
                    className={`font-display text-base font-semibold transition-colors duration-200 sm:text-lg ${
                      isOpen ? "text-gold" : "text-ivory"
                    }`}
                  >
                    {item.question}
                  </span>

                  <span
                    className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full border transition-all duration-300 ${
                      isOpen
                        ? "border-gold bg-gold/10 text-gold rotate-45"
                        : "border-white/20 text-stone"
                    }`}
                    aria-hidden="true"
                  >
                    <svg
                      className="h-3.5 w-3.5"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2.5}
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 4.5v15m7.5-7.5h-15"
                      />
                    </svg>
                  </span>
                </button>

                <div
                  style={{
                    display: "grid",
                    gridTemplateRows: isOpen ? "1fr" : "0fr",
                    transition: "grid-template-rows 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
                  }}
                >
                  <div className="overflow-hidden">
                    <p className="border-t border-gold/10 px-6 pb-5 pt-4 text-sm leading-relaxed text-stone sm:text-base">
                      {item.answer}
                    </p>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          );
        })}
      </div>
    </SectionWrapper>
  );
}
