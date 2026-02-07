import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Services from "@/components/sections/Services";
import Portfolio from "@/components/sections/Portfolio";
import LatestPosts from "@/components/sections/LatestPosts";
import Contact from "@/components/sections/Contact";
import { getDictionary } from "@/i18n/get-dictionary";
import { isValidLocale } from "@/i18n/config";
import type { Locale } from "@/i18n/config";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const safeLocale: Locale = isValidLocale(locale) ? locale : "en";
  const dict = await getDictionary(safeLocale);

  return (
    <>
      <Hero />
      <About />
      <Services />
      <Portfolio />
      <LatestPosts locale={safeLocale} dict={dict} />
      <Contact />
    </>
  );
}
