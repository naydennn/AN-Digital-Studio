import { SITE_NAME, SITE_DESCRIPTION, SITE_URL } from "@/lib/constants";

/* ─── Organization ─── */

export function OrganizationJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_NAME,
    description: SITE_DESCRIPTION,
    url: SITE_URL,
    logo: `${SITE_URL}/logo.png`,
    contactPoint: {
      "@type": "ContactPoint",
      email: "hello@andigital.bg",
      contactType: "customer service",
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

/* ─── WebSite (AI Search Optimization) ─── */

export function WebSiteJsonLd({ locale }: { locale: string }) {
  const data = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: `${SITE_URL}/${locale}`,
    inLanguage: locale === "bg" ? "bg" : "en",
    publisher: { "@type": "Organization", name: SITE_NAME },
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${SITE_URL}/${locale}/blog?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

/* ─── Services (locale-aware) ─── */

export function ServicesJsonLd({
  services,
}: {
  services: { title: string; description: string }[];
}) {
  const data = services.map((service) => ({
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: service.title,
    provider: { "@type": "Organization", name: SITE_NAME },
    description: service.description,
  }));

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

/* ─── Blog Post ─── */

interface BlogPostJsonLdProps {
  title: string;
  description: string;
  datePublished: string;
  author: string;
  url: string;
  image?: string;
}

export function BlogPostJsonLd({
  title,
  description,
  datePublished,
  author,
  url,
  image,
}: BlogPostJsonLdProps) {
  const data = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: title,
    description,
    datePublished,
    author: { "@type": "Person", name: author },
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      logo: { "@type": "ImageObject", url: `${SITE_URL}/logo.png` },
    },
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
