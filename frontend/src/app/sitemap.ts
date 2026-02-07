import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/constants";
import { LOCALES } from "@/i18n/config";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticPages: MetadataRoute.Sitemap = LOCALES.flatMap((locale) => [
    {
      url: `${SITE_URL}/${locale}`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${SITE_URL}/${locale}/blog`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.8,
    },
  ]);

  let blogPosts: MetadataRoute.Sitemap = [];

  try {
    if (process.env.WORDPRESS_GRAPHQL_URL) {
      const { getAllPostSlugs } = await import("@/lib/wordpress");
      const slugs = await getAllPostSlugs();
      blogPosts = LOCALES.flatMap((locale) =>
        slugs.map((slug) => ({
          url: `${SITE_URL}/${locale}/blog/${slug}`,
          lastModified: new Date(),
          changeFrequency: "monthly" as const,
          priority: 0.6,
        }))
      );
    }
  } catch {
    // Return static pages only if WordPress is not connected
  }

  return [...staticPages, ...blogPosts];
}
