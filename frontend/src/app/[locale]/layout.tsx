import type { Metadata, Viewport } from "next";
import { Inter, Montserrat } from "next/font/google";
import { notFound } from "next/navigation";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import {
  OrganizationJsonLd,
  WebSiteJsonLd,
  ServicesJsonLd,
} from "@/components/seo/JsonLd";
import { TranslationProvider } from "@/i18n/TranslationContext";
import { getDictionary } from "@/i18n/get-dictionary";
import { isValidLocale, LOCALES } from "@/i18n/config";
import type { Locale } from "@/i18n/config";
import { SITE_NAME, SITE_DESCRIPTION, SITE_URL } from "@/lib/constants";
import RecaptchaProvider from "@/components/providers/RecaptchaProvider";

const inter = Inter({
  subsets: ["latin", "cyrillic"],
  display: "swap",
  variable: "--font-inter",
});

const montserrat = Montserrat({
  subsets: ["latin", "cyrillic"],
  display: "swap",
  variable: "--font-display",
  weight: ["400", "500", "600", "700", "800"],
});

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isBg = locale === "bg";
  const title = isBg
    ? `${SITE_NAME} | Уеб дизайн и разработка`
    : `${SITE_NAME} | Web Design & Development Agency`;
  const description = isBg
    ? "Създаваме зашеметяващи, високопроизводителни уебсайтове, които постигат резултати."
    : SITE_DESCRIPTION;

  return {
    metadataBase: new URL(SITE_URL),
    title: { default: title, template: `%s | ${SITE_NAME}` },
    description,
    keywords: isBg
      ? ["уеб дизайн", "уеб разработка", "дигитална агенция", "SEO", "София"]
      : ["web design", "web development", "digital agency", "SEO", "Sofia"],
    authors: [{ name: SITE_NAME }],
    alternates: {
      canonical: isBg ? `${SITE_URL}/bg` : SITE_URL,
      languages: { en: SITE_URL, bg: `${SITE_URL}/bg` },
    },
    openGraph: {
      type: "website",
      locale: isBg ? "bg_BG" : "en_US",
      alternateLocale: isBg ? "en_US" : "bg_BG",
      url: isBg ? `${SITE_URL}/bg` : SITE_URL,
      siteName: SITE_NAME,
      title,
      description,
      images: [
        {
          url: `${SITE_URL}/logo.png`,
          width: 800,
          height: 800,
          alt: SITE_NAME,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [`${SITE_URL}/logo.png`],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  };
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!isValidLocale(locale)) {
    notFound();
  }

  const dict = await getDictionary(locale as Locale);

  const skipLabel = dict.a11y.skipToContent;

  return (
    <html
      lang={locale}
      data-scroll-behavior="smooth"
      className={`${inter.variable} ${montserrat.variable}`}
    >
      <body className="font-body antialiased">
        <TranslationProvider dict={dict} locale={locale as Locale}>
          <RecaptchaProvider>
            <OrganizationJsonLd locale={locale as Locale} />
            <WebSiteJsonLd
              locale={locale as Locale}
              description={locale === "bg" ? dict.footer.description : dict.hero.sub}
            />
            <ServicesJsonLd services={dict.services.items} />
            <a
              href="#main-content"
              className="skip-link focus:outline-none focus:ring-2 focus:ring-gold focus:ring-offset-2 focus:ring-offset-midnight"
            >
              {skipLabel}
            </a>
            <Header />
            <main id="main-content">{children}</main>
            <Footer />
          </RecaptchaProvider>
        </TranslationProvider>
      </body>
    </html>
  );
}
