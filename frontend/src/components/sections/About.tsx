"use client";

import { useEffect, useRef, useState } from "react";
import ScrollReveal from "@/components/effects/ScrollReveal";
import SectionWrapper from "@/components/ui/SectionWrapper";
import { STATS } from "@/lib/constants";
import { useTranslation } from "@/i18n/TranslationContext";

const COUNTER_DURATION_MS = 2000;
const COUNTER_FRAME_INTERVAL = 16;

function AnimatedCounter({ target, suffix, label }: { target: number; suffix: string; label: string }) {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          let current = 0;
          const steps = COUNTER_DURATION_MS / COUNTER_FRAME_INTERVAL;
          const increment = target / steps;
          const timer = setInterval(() => {
            current += increment;
            if (current >= target) { setCount(target); clearInterval(timer); }
            else { setCount(Math.floor(current)); }
          }, COUNTER_FRAME_INTERVAL);
        }
      },
      { threshold: 0.5 }
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, [target, hasAnimated]);

  return (
    <div ref={ref} className="glass glow-hover group rounded-2xl px-5 py-7 text-center transition-all duration-300">
      <div className="font-display text-3xl font-extrabold gradient-text sm:text-4xl">{count}{suffix}</div>
      <div className="mt-2 text-sm text-stone">{label}</div>
    </div>
  );
}

const STEP_ICONS = [
  <svg key="s" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" /></svg>,
  <svg key="d" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.043-.025a15.994 15.994 0 011.622-3.395m3.42 3.42a15.995 15.995 0 004.764-4.648l3.876-5.814a1.151 1.151 0 00-1.597-1.597L14.146 6.32a15.996 15.996 0 00-4.649 4.764m3.42 3.42a6.776 6.776 0 00-3.42-3.42" /></svg>,
  <svg key="c" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" /></svg>,
  <svg key="l" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.8m2.58-5.84a14.927 14.927 0 00-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 01-2.448-2.448 14.9 14.9 0 01.06-.312m-2.24 2.39a4.493 4.493 0 00-1.757 4.306 4.493 4.493 0 004.306-1.758M16.5 9a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" /></svg>,
];

export default function About() {
  const { dict } = useTranslation();
  const t = dict.about;

  return (
    <SectionWrapper id="about" elevated>
      <div className="absolute right-[-5%] top-[-10%] h-[500px] w-[500px] rounded-full bg-gold/[0.03] blur-[120px] pointer-events-none" aria-hidden="true" />

      <div className="grid items-center gap-16 lg:grid-cols-5 lg:gap-20">
        <div className="lg:col-span-3">
          <ScrollReveal>
            <span className="mb-4 inline-block text-xs font-semibold uppercase tracking-[0.25em] text-gold">{t.label}</span>
            <h2 className="mb-8 font-display text-3xl font-bold tracking-tight text-ivory sm:text-4xl lg:text-5xl">{t.heading}<span className="gradient-text">{t.headingAccent}</span></h2>
          </ScrollReveal>
          <ScrollReveal delay={0.12}><p className="mb-5 text-base leading-relaxed text-stone sm:text-lg">{t.p1}</p></ScrollReveal>
          <ScrollReveal delay={0.24}><p className="mb-8 text-base leading-relaxed text-stone sm:text-lg">{t.p2}</p></ScrollReveal>
          <ScrollReveal delay={0.36}>
            <div className="flex flex-wrap items-center gap-6">
              {[
                { title: t.badge1Title, sub: t.badge1Sub, icon: <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" /></svg> },
                { title: t.badge2Title, sub: t.badge2Sub, icon: <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" /></svg> },
                { title: t.badge3Title, sub: t.badge3Sub, icon: <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3" /></svg> },
              ].map((b) => (
                <div key={b.title} className="flex items-center gap-2.5">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-gold-border/10 bg-graphite text-gold">{b.icon}</div>
                  <div><p className="text-sm font-semibold text-ivory">{b.title}</p><p className="text-xs text-stone">{b.sub}</p></div>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>

        <div className="lg:col-span-2">
          <ScrollReveal direction="right">
            <div className="grid grid-cols-2 gap-5">
              {STATS.map((stat, i) => (
                <AnimatedCounter key={stat.label} target={stat.value} suffix={stat.suffix} label={t.stats[i]?.label ?? stat.label} />
              ))}
            </div>
          </ScrollReveal>
        </div>
      </div>

      {/* Process */}
      <div className="mt-28 sm:mt-36">
        <ScrollReveal>
          <div className="mb-16 text-center">
            <span className="mb-4 inline-block text-xs font-semibold uppercase tracking-[0.25em] text-gold">{t.processLabel}</span>
            <h3 className="font-display text-2xl font-bold tracking-tight text-ivory sm:text-3xl lg:text-4xl">{t.processHeading}<span className="gradient-text">{t.processAccent}</span></h3>
          </div>
        </ScrollReveal>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {t.steps.map((item, i) => (
            <ScrollReveal key={item.step} delay={i * 0.1}>
              <div className="group relative rounded-2xl border border-gold-border/8 bg-graphite/50 p-7 transition-all duration-300 hover:border-gold-border/20 hover:bg-graphite hover:shadow-xl hover:shadow-gold/[0.04]">
                <span className="mb-5 block font-display text-4xl font-extrabold text-gold/10 transition-colors group-hover:text-gold/20">{item.step}</span>
                <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl border border-gold-border/10 bg-midnight text-gold transition-all duration-300 group-hover:border-gold-border/25 group-hover:shadow-md group-hover:shadow-gold/10">{STEP_ICONS[i]}</div>
                <h4 className="mb-2 font-display text-lg font-semibold text-ivory">{item.title}</h4>
                <p className="text-sm leading-relaxed text-stone">{item.description}</p>
                {i < t.steps.length - 1 && <div className="absolute right-0 top-1/2 hidden h-px w-6 -translate-y-1/2 translate-x-full bg-gold/10 lg:block" aria-hidden="true" />}
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
