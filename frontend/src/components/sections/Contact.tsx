"use client";

import { useState, type FormEvent } from "react";
import ScrollReveal from "@/components/effects/ScrollReveal";
import SectionWrapper from "@/components/ui/SectionWrapper";
import Button from "@/components/ui/Button";
import { useTranslation } from "@/i18n/TranslationContext";

interface FormData { name: string; email: string; subject: string; message: string; }
const INITIAL: FormData = { name: "", email: "", subject: "", message: "" };

function FloatingInput({ id, label, type = "text", value, onChange, required = true, textarea = false }: { id: string; label: string; type?: string; value: string; onChange: (v: string) => void; required?: boolean; textarea?: boolean }) {
  const cls = "peer w-full rounded-xl border border-gold-border/10 bg-graphite px-5 pt-6 pb-2 text-sm text-ivory placeholder-transparent transition-all duration-200 focus:border-gold/30 focus:outline-none focus:ring-1 focus:ring-gold/20 focus:bg-slate";
  const lbl = "pointer-events-none absolute left-5 top-4 text-xs text-stone transition-all duration-200 peer-placeholder-shown:top-4 peer-placeholder-shown:text-sm peer-focus:top-1.5 peer-focus:text-[10px] peer-focus:text-gold";
  const f = value ? "!top-1.5 !text-[10px] !text-gold" : "";
  if (textarea) return <div className="relative"><textarea id={id} placeholder={label} value={value} onChange={e => onChange(e.target.value)} required={required} rows={5} className={`${cls} resize-none`} /><label htmlFor={id} className={`${lbl} ${f}`}>{label}</label></div>;
  return <div className="relative"><input id={id} type={type} placeholder={label} value={value} onChange={e => onChange(e.target.value)} required={required} className={cls} /><label htmlFor={id} className={`${lbl} ${f}`}>{label}</label></div>;
}

export default function Contact() {
  const { dict } = useTranslation();
  const t = dict.contact;
  const [form, setForm] = useState<FormData>(INITIAL);
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const upd = (k: keyof FormData) => (v: string) => setForm(p => ({ ...p, [k]: v }));

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    try {
      const url = process.env.NEXT_PUBLIC_WORDPRESS_API_URL;
      if (url) {
        const res = await fetch(`${url}/wp-json/contact/v1/submit`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        });
        if (!res.ok) throw new Error("Request failed");
      } else {
        /* No backend — use mailto fallback */
        const subject = encodeURIComponent(form.subject || "Website Contact");
        const body = encodeURIComponent(
          `Name: ${form.name}\nEmail: ${form.email}\n\n${form.message}`
        );
        window.open(`mailto:hello@andigital.bg?subject=${subject}&body=${body}`);
      }
      setStatus("sent");
      setForm(INITIAL);
      setTimeout(() => setStatus("idle"), 5000);
    } catch {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 5000);
    }
  };

  const btnLabel = status === "sending" ? t.formSending : status === "sent" ? t.formSent : status === "error" ? t.formError : t.formSend;

  return (
    <SectionWrapper id="contact">
      <div className="absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold/[0.03] blur-[120px] pointer-events-none" aria-hidden="true" />
      <div className="grid items-start gap-16 lg:grid-cols-2 lg:gap-24">
        <div>
          <ScrollReveal>
            <span className="mb-4 inline-block text-xs font-semibold uppercase tracking-[0.25em] text-gold">{t.label}</span>
            <h2 className="mb-8 font-display text-3xl font-bold tracking-tight text-ivory sm:text-4xl lg:text-5xl">{t.heading}<span className="gradient-text">{t.headingAccent}</span></h2>
          </ScrollReveal>
          <ScrollReveal delay={0.15}><p className="mb-10 text-base leading-relaxed text-stone sm:text-lg">{t.sub}</p></ScrollReveal>
          <ScrollReveal delay={0.3}>
            <div className="space-y-5">
              <div className="flex items-center gap-5">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-gold-border/10 bg-graphite text-gold"><svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" /></svg></div>
                <div><p className="text-xs text-stone">{t.emailLabel}</p><a href="mailto:hello@andigital.bg" className="text-base font-medium text-ivory transition-colors hover:text-gold">hello@andigital.bg</a></div>
              </div>
              <div className="flex items-center gap-5">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-gold-border/10 bg-graphite text-gold"><svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" /></svg></div>
                <div><p className="text-xs text-stone">{t.locationLabel}</p><p className="text-base font-medium text-ivory">{t.locationValue}</p></div>
              </div>
            </div>
          </ScrollReveal>
        </div>
        <ScrollReveal direction="right">
          <form onSubmit={handleSubmit} className="glass-strong rounded-2xl p-7 sm:p-9 space-y-5">
            <div className="grid gap-5 sm:grid-cols-2">
              <FloatingInput id="name" label={t.formName} value={form.name} onChange={upd("name")} />
              <FloatingInput id="email" label={t.formEmail} type="email" value={form.email} onChange={upd("email")} />
            </div>
            <FloatingInput id="subject" label={t.formSubject} value={form.subject} onChange={upd("subject")} />
            <FloatingInput id="message" label={t.formMessage} value={form.message} onChange={upd("message")} textarea />
            <Button type="submit" size="lg" className="w-full" disabled={status === "sending"}>{btnLabel}</Button>
            {status === "sent" && <p className="text-center text-sm text-gold">{t.formThankYou}</p>}
          </form>
        </ScrollReveal>
      </div>
    </SectionWrapper>
  );
}
