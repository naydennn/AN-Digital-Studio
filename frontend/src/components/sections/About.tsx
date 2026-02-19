"use client";

import { useEffect, useRef, useState } from "react";
import ScrollReveal from "@/components/effects/ScrollReveal";
import SectionWrapper from "@/components/ui/SectionWrapper";
import { STATS } from "@/lib/constants";
import { useTranslation } from "@/i18n/TranslationContext";

const COUNTER_DURATION_MS = 2000;

function AnimatedCounter({ target, suffix, label }: { target: number; suffix: string; label: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const hasAnimatedRef = useRef(false);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimatedRef.current) {
          hasAnimatedRef.current = true;
          observer.disconnect();

          const start = performance.now();
          const tick = (now: number) => {
            const elapsed = now - start;
            const progress = Math.min(elapsed / COUNTER_DURATION_MS, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.round(eased * target));
            if (progress < 1) {
              rafRef.current = requestAnimationFrame(tick);
            }
          };
          rafRef.current = requestAnimationFrame(tick);
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(element);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(rafRef.current);
    };
  }, [target]);

  return (
    <div ref={ref} className="glass glow-hover group rounded-2xl px-5 py-7 text-center transition-all duration-300">
      <div className="font-display text-3xl font-extrabold gradient-text sm:text-4xl">{count}{suffix}</div>
      <div className="mt-2 text-sm text-stone">{label}</div>
    </div>
  );
}

const ICON_CLASS = "h-6 w-6 shrink-0";
const ICON_PROPS = { fill: "none" as const, stroke: "currentColor", strokeWidth: 2, strokeLinecap: "round" as const, strokeLinejoin: "round" as const, viewBox: "0 0 24 24" };

const STEP_ICONS = [
  <svg key="discover" className={ICON_CLASS} {...ICON_PROPS}><path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>,
  <svg key="design" className={ICON_CLASS} {...ICON_PROPS}><path d="M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.043-.025a15.994 15.994 0 011.622-3.395m3.42 3.42a15.995 15.995 0 004.764-4.648l3.876-5.814a1.151 1.151 0 00-1.597-1.597L14.146 6.32a15.996 15.996 0 00-4.649 4.764m3.42 3.42a6.776 6.776 0 00-3.42-3.42" /></svg>,
  <svg key="develop" className={ICON_CLASS} {...ICON_PROPS}><path d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" /></svg>,
  <svg key="launch" className={ICON_CLASS} {...ICON_PROPS}><path d="M6 12L3 21l18-9L3 3l3 9zm0 0h7.5" /></svg>,
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
                { title: t.badge1Title, sub: t.badge1Sub, icon: <svg className="h-5 w-5 shrink-0" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" /></svg> },
                { title: t.badge2Title, sub: t.badge2Sub, icon: <svg className="h-5 w-5 shrink-0" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" /></svg> },
                { title: t.badge3Title, sub: t.badge3Sub, icon: <svg className="h-5 w-5 shrink-0" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3" /></svg> },
              ].map((b) => (
                <div key={b.title} className="flex items-center gap-2.5">
                  <div className="icon-container icon-container-sm">{b.icon}</div>
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
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 items-stretch">
          {t.steps.map((item, i) => (
            <ScrollReveal key={item.step} delay={i * 0.1} className="h-full">
              <div className="group relative flex h-full flex-col rounded-2xl border border-gold-border/8 bg-graphite/50 p-7 transition-all duration-300 hover:border-gold-border/20 hover:bg-graphite hover:shadow-xl hover:shadow-gold/[0.04]">
                <span className="mb-6 block font-display text-4xl font-extrabold text-gold/10 transition-colors group-hover:text-gold/20">{item.step}</span>
                <div className="icon-container mb-5">{STEP_ICONS[i]}</div>
                <h4 className="mb-2 font-display text-lg font-semibold text-ivory">{item.title}</h4>
                <p className="text-sm leading-relaxed text-stone">{item.description}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
