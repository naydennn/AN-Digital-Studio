"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import Button from "@/components/ui/Button";
import MagneticButton from "@/components/effects/MagneticButton";
import Spotlight from "@/components/effects/MouseGradient";
import ParticleField from "@/components/effects/ParticleField";
import TextReveal from "@/components/effects/TextReveal";
import { useTranslation } from "@/i18n/TranslationContext";

const RING_BASE =
  "absolute rounded-full border pointer-events-none opacity-[0.07]";

export default function Hero() {
  const { dict, locale } = useTranslation();

  return (
    <section
      id="hero"
      className="relative flex min-h-screen items-center overflow-hidden bg-midnight px-4 sm:px-6 lg:px-8"
    >
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute top-[-20%] right-[-10%] h-[700px] w-[700px] rounded-full bg-gold/[0.04] blur-[120px]" />
        <div className="absolute bottom-[-15%] left-[-10%] h-[500px] w-[500px] rounded-full bg-champagne/[0.03] blur-[100px]" />
        <div className="absolute top-[40%] left-[50%] h-[300px] w-[300px] -translate-x-1/2 rounded-full bg-amber/[0.02] blur-[80px]" />
      </div>
      <Spotlight />
      <ParticleField />
      <div className={`${RING_BASE} right-[12%] top-[18%] h-56 w-56 border-gold animate-spin-slow`} aria-hidden="true" />
      <div className={`${RING_BASE} left-[6%] bottom-[22%] h-36 w-36 border-champagne animate-float`} aria-hidden="true" />
      <div className={`${RING_BASE} right-[28%] bottom-[12%] h-24 w-24 border-gold animate-float-delayed`} aria-hidden="true" />

      <div className="container relative z-10 mx-auto max-w-5xl pt-24">
        <div className="text-center">
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.6 }} className="mb-10 inline-flex items-center gap-2.5 rounded-full border border-gold/15 bg-charcoal/60 px-5 py-2 backdrop-blur-md">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-gold opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-gold" />
            </span>
            <span className="text-xs font-medium tracking-wide text-stone">{dict.hero.badge}</span>
          </motion.div>

          <TextReveal>
            <h1 className="mb-8 font-display text-[2.5rem] font-extrabold leading-[1.05] tracking-tight sm:text-6xl md:text-7xl lg:text-8xl">
              <span className="text-ivory">{dict.hero.line1}</span><br />
              <span className="gradient-text">{dict.hero.line2}</span><br />
              <span className="text-ivory">{dict.hero.line3}</span>
            </h1>
          </TextReveal>

          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, duration: 0.7 }} className="mx-auto mb-14 max-w-2xl text-base leading-relaxed text-stone sm:text-lg">
            {dict.hero.sub}
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7, duration: 0.6 }} className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center sm:gap-5">
            <MagneticButton>
              <Button href={`/${locale}/#contact`} size="lg">
                {dict.hero.cta1}
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
              </Button>
            </MagneticButton>
            <MagneticButton>
              <Button href={`/${locale}/#portfolio`} variant="secondary" size="lg">{dict.hero.cta2}</Button>
            </MagneticButton>
          </motion.div>
        </div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.4, duration: 0.8 }} className="mt-28 flex justify-center sm:mt-36">
          <Link href={`/${locale}/#about`} className="flex flex-col items-center gap-3 text-ash transition-colors hover:text-gold" aria-label="Scroll down">
            <span className="text-[10px] font-medium uppercase tracking-[0.25em]">{dict.hero.scroll}</span>
            <motion.div animate={{ y: [0, 6, 0] }} transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}>
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 14l-7 7m0 0l-7-7m7 7V3" /></svg>
            </motion.div>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
