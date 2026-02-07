"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ScrollReveal from "@/components/effects/ScrollReveal";
import SectionWrapper from "@/components/ui/SectionWrapper";
import { PORTFOLIO_ITEMS, PORTFOLIO_CATEGORIES } from "@/lib/constants";
import { useTranslation } from "@/i18n/TranslationContext";

export default function Portfolio() {
  const { dict } = useTranslation();
  const t = dict.portfolio;
  const [activeIdx, setActiveIdx] = useState(0);

  const filteredItems = activeIdx === 0
    ? PORTFOLIO_ITEMS
    : PORTFOLIO_ITEMS.filter(
        (item) => item.category === PORTFOLIO_CATEGORIES[activeIdx]
      );

  return (
    <SectionWrapper id="portfolio" elevated>
      <div className="absolute left-0 bottom-0 h-[400px] w-[400px] rounded-full bg-gold/[0.03] blur-[100px] pointer-events-none" aria-hidden="true" />
      <div className="mb-14 text-center">
        <ScrollReveal>
          <span className="mb-4 inline-block text-xs font-semibold uppercase tracking-[0.25em] text-gold">{t.label}</span>
          <h2 className="mb-6 font-display text-3xl font-bold tracking-tight text-ivory sm:text-4xl lg:text-5xl">{t.heading}<span className="gradient-text">{t.headingAccent}</span></h2>
          <p className="mx-auto max-w-2xl text-base text-stone sm:text-lg">{t.sub}</p>
        </ScrollReveal>
      </div>
      <ScrollReveal>
        <div className="mb-12 flex flex-wrap justify-center gap-3">
          {t.categories.map((cat, i) => (
            <button key={cat} onClick={() => setActiveIdx(i)} className={`rounded-full px-6 py-2.5 text-xs font-semibold tracking-wide transition-all duration-300 ${activeIdx === i ? "gradient-gold-bg text-midnight shadow-lg shadow-gold/15" : "border border-gold-border/10 text-stone hover:border-gold-border/25 hover:text-ivory"}`}>{cat}</button>
          ))}
        </div>
      </ScrollReveal>
      <motion.div layout className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {filteredItems.map((item, idx) => {
            const translated = t.items[PORTFOLIO_ITEMS.indexOf(item)];
            return (
              <motion.div key={item.id} layout initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} transition={{ duration: 0.35 }}>
                <a href={item.url} className="group relative block overflow-hidden rounded-2xl border border-gold-border/8 bg-graphite transition-all duration-400 hover:border-gold-border/20 hover:shadow-2xl hover:shadow-gold/[0.06]">
                  <div className="relative aspect-[4/3] overflow-hidden bg-midnight">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(201,169,110,0.05),transparent_70%)]" />
                    <div className="flex h-full w-full items-center justify-center"><svg className="h-14 w-14 text-gold/10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={0.75} d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3.75 21h16.5A2.25 2.25 0 0022.5 18.75V5.25A2.25 2.25 0 0020.25 3H3.75A2.25 2.25 0 001.5 5.25v13.5A2.25 2.25 0 003.75 21z" /></svg></div>
                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-midnight/85 backdrop-blur-md opacity-0 transition-all duration-400 group-hover:opacity-100">
                      <p className="mb-4 max-w-[80%] text-center text-sm text-stone">{translated?.description ?? item.description}</p>
                      <div className="flex flex-wrap justify-center gap-2">{item.technologies.map((tech) => (<span key={tech} className="rounded-full border border-gold/15 bg-gold/5 px-3 py-1 text-[11px] font-medium text-champagne">{tech}</span>))}</div>
                    </div>
                  </div>
                  <div className="p-5">
                    <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-gold">{item.category}</span>
                    <h3 className="mt-1.5 font-display text-base font-semibold text-ivory transition-colors group-hover:text-champagne">{translated?.title ?? item.title}</h3>
                  </div>
                </a>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </motion.div>
    </SectionWrapper>
  );
}
