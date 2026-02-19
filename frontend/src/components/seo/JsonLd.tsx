import {
  SITE_NAME,
  SITE_DESCRIPTION,
  SITE_DESCRIPTION_BG,
  SITE_URL,
  ORGANIZATION_ID,
} from "@/lib/constants";

type Locale = "en" | "bg";

const LOCALE_LANG = { en: "en", bg: "bg" } as const;
const LOCALE_BCP47 = { en: "en-US", bg: "bg-BG" } as const;

/* ─── Organization + LocalBusiness (AI Search: entity depth, @id) ─── */

export function OrganizationJsonLd({ locale }: { locale: Locale }) {
  const description =
    locale === "bg" ? SITE_DESCRIPTION_BG : SITE_DESCRIPTION;
  const data = {
    "@context": "https://schema.org",
    "@type": ["Organization", "LocalBusiness", "ProfessionalService"],
    "@id": ORGANIZATION_ID,
    name: SITE_NAME,
    alternateName: locale === "bg" ? "AN Digital Studio София" : "AN Digital Studio Sofia",
    description,
    url: SITE_URL,
    logo: { "@type": "ImageObject", url: `${SITE_URL}/logo.png` },
    image: `${SITE_URL}/logo.png`,
    inLanguage: LOCALE_LANG[locale],
    areaServed: { "@type": "Country", name: "Bulgaria" },
    contactPoint: {
      "@type": "ContactPoint",
      email: "contact@andigital.bg",
      contactType: "customer service",
      areaServed: "BG",
      availableLanguage: ["English", "Bulgarian"],
    },
    address: {
      "@type": "PostalAddress",
      addressLocality: "Sofia",
      addressCountry: "BG",
    },
    sameAs: [
      "https://facebook.com/andigital",
      "https://instagram.com/andigital",
      "https://linkedin.com/company/andigital",
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

/* ─── WebSite (AI Search: alternateLanguage, speakable) ─── */

export function WebSiteJsonLd({
  locale,
  description,
}: {
  locale: Locale;
  description: string;
}) {
  const alternateLang = locale === "bg" ? "en" : "bg";
  const data = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    alternateName: "AN Digital Studio",
    description,
    url: locale === "en" ? SITE_URL : `${SITE_URL}/${locale}`,
    inLanguage: LOCALE_BCP47[locale],
    alternateLanguage: LOCALE_BCP47[alternateLang],
    publisher: { "@id": ORGANIZATION_ID },
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${SITE_URL}/${locale}/blog?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
    speakable: {
      "@type": "SpeakableSpecification",
      cssSelector: ["#hero", "#about", "#services"],
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

/* ─── BreadcrumbList (AI Search: site structure) ─── */

export function BreadcrumbJsonLd({
  locale,
  items,
}: {
  locale: Locale;
  items: { name: string; url: string }[];
}) {
  const data = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

/* ─── Services (locale-aware, provider @id) ─── */

export function ServicesJsonLd({
  services,
}: {
  services: { title: string; description: string }[];
}) {
  const data = services.map((service) => ({
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: service.title,
    provider: { "@id": ORGANIZATION_ID },
    description: service.description,
  }));

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

/* ─── Blog Post (AI Search: inLanguage, mainEntityOfPage) ─── */

interface BlogPostJsonLdProps {
  title: string;
  description: string;
  datePublished: string;
  author: string;
  url: string;
  locale: Locale;
  image?: string;
}

export function BlogPostJsonLd({
  title,
  description,
  datePublished,
  author,
  url,
  locale,
  image,
}: BlogPostJsonLdProps) {
  const data = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: title,
    description,
    datePublished,
    inLanguage: LOCALE_BCP47[locale],
    author: { "@type": "Person", name: author },
    publisher: { "@id": ORGANIZATION_ID },
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    url,
    ...(image && { image: { "@type": "ImageObject", url: image } }),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
