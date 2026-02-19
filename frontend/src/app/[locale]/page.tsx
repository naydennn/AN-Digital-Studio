import dynamic from "next/dynamic";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Services from "@/components/sections/Services";
import LatestPosts from "@/components/sections/LatestPosts";
import FAQ from "@/components/sections/FAQ";
import Contact from "@/components/sections/Contact";

const Portfolio = dynamic(() => import("@/components/sections/Portfolio"));
import { BreadcrumbJsonLd } from "@/components/seo/JsonLd";
import { getDictionary } from "@/i18n/get-dictionary";
import { isValidLocale } from "@/i18n/config";
import type { Locale } from "@/i18n/config";
import { SITE_URL } from "@/lib/constants";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const safeLocale: Locale = isValidLocale(locale) ? locale : "en";
  const dict = await getDictionary(safeLocale);

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: dict.faq.items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  return (
    <>
      <BreadcrumbJsonLd
        locale={safeLocale}
        items={[{ name: dict.nav.home, url: safeLocale === "en" ? SITE_URL : `${SITE_URL}/${safeLocale}` }]}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <Hero />
      <About />
      <Services />
      <Portfolio />
      <LatestPosts locale={safeLocale} dict={dict} />
      <FAQ />
      <Contact recaptchaSiteKey={process.env.RECAPTCHA_SITE_KEY} />
    </>
  );
}
