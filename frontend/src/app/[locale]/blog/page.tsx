import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";

export const revalidate = 3600;
import { BreadcrumbJsonLd } from "@/components/seo/JsonLd";
import BlogPostPlaceholder from "@/components/ui/BlogPostPlaceholder";
import { getDictionary } from "@/i18n/get-dictionary";
import { isValidLocale } from "@/i18n/config";
import type { Locale } from "@/i18n/config";
import { SITE_URL } from "@/lib/constants";

interface BlogPost { slug: string; title: string; excerpt: string; date: string; image: string | null; author: string; category: string; categoryKey?: string; }

const PLACEHOLDER_SLUGS = ["why-mobile-first-design-matters", "headless-wordpress-nextjs-guide", "seo-trends-ai-search"] as const;
const PLACEHOLDER_DATES: Record<string, string> = {
  "why-mobile-first-design-matters": "2026-02-01",
  "headless-wordpress-nextjs-guide": "2026-01-25",
  "seo-trends-ai-search": "2026-01-18",
};

function getPlaceholderPosts(dict: { blog: { posts: Record<string, { title: string; excerpt: string; category: string }>; categoryLabels: Record<string, string> } }): BlogPost[] {
  const categoryLabels = dict.blog.categoryLabels;
  const result: BlogPost[] = [];
  for (const slug of PLACEHOLDER_SLUGS) {
    const post = dict.blog.posts[slug];
    if (!post) continue;
    result.push({
      slug,
      title: post.title,
      excerpt: post.excerpt,
      date: PLACEHOLDER_DATES[slug],
      image: null,
      author: "AN Digital Studio",
      category: categoryLabels[post.category] ?? post.category,
      categoryKey: post.category,
    });
  }
  return result;
}

function formatDate(d: string, locale: string) { return new Date(d).toLocaleDateString(locale === "bg" ? "bg-BG" : "en-US", { year: "numeric", month: "long", day: "numeric" }); }
const WPM = 200;
function readTime(t: string) { return Math.max(1, Math.ceil(t.split(/\s+/).length / WPM)); }

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const dict = await getDictionary(isValidLocale(locale) ? locale : "en");
  return { title: locale === "bg" ? "Блог" : "Blog", description: dict.blog.sub };
}

export default async function BlogPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const safeLocale: Locale = isValidLocale(locale) ? locale : "en";
  const dict = await getDictionary(safeLocale);
  const t = dict.blog;

  let posts: BlogPost[] = getPlaceholderPosts(dict);
  try { if (process.env.WORDPRESS_GRAPHQL_URL) { const { getPosts } = await import("@/lib/wordpress"); const language = safeLocale.toUpperCase() as "EN" | "BG"; const d = await getPosts(undefined, undefined, language); if (d.posts.length > 0) posts = d.posts.map(p => ({ slug: p.slug, title: p.title, excerpt: p.excerpt.replace(/<[^>]*>/g, ""), date: p.date, image: p.featuredImage?.node.sourceUrl || null, author: p.author.node.name, category: p.categories.nodes[0]?.name || "General" })); } } catch { /* fallback */ }

  return (
    <div className="min-h-screen bg-midnight pt-32 pb-24">
      <BreadcrumbJsonLd
        locale={safeLocale}
        items={[
          { name: dict.nav.home, url: safeLocale === "en" ? SITE_URL : `${SITE_URL}/${safeLocale}` },
          { name: dict.nav.blog, url: `${SITE_URL}/${safeLocale}/blog` },
        ]}
      />
      <div className="container mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <div className="mb-20 text-center">
          <span className="mb-4 inline-block text-xs font-semibold uppercase tracking-[0.25em] text-gold">{t.label}</span>
          <h1 className="mb-6 font-display text-4xl font-bold tracking-tight text-ivory sm:text-5xl lg:text-6xl">{t.heading}<span className="gradient-text">{t.headingAccent}</span></h1>
          <p className="mx-auto max-w-2xl text-base text-stone sm:text-lg">{t.sub}</p>
        </div>
        <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map(post => (
            <Link key={post.slug} href={`/${safeLocale}/blog/${post.slug}`} className="group overflow-hidden rounded-2xl border border-gold-border/8 bg-charcoal transition-all duration-400 hover:border-gold-border/20 hover:shadow-2xl hover:shadow-gold/[0.05] focus:outline-none focus:ring-2 focus:ring-gold/30 focus:ring-offset-2 focus:ring-offset-midnight">
              <div className="relative aspect-[16/10] overflow-hidden bg-midnight">
                {post.image ? <Image src={post.image} alt={post.title} fill className="object-cover transition-transform duration-500 group-hover:scale-105" sizes="(max-width:640px)100vw,(max-width:1024px)50vw,33vw" /> : <BlogPostPlaceholder category={post.categoryKey ?? post.category} />}
              </div>
              <div className="p-6">
                <div className="mb-4 flex items-center gap-3 text-xs text-stone"><span className="rounded-full border border-gold/20 px-3 py-0.5 font-semibold text-gold">{post.category}</span><span>{formatDate(post.date, safeLocale)}</span><span>{readTime(post.excerpt)} {dict.latestPosts.minRead}</span></div>
                <h2 className="mb-2 font-display text-base font-semibold text-ivory transition-colors group-hover:text-champagne">{post.title}</h2>
                <p className="line-clamp-2 text-sm leading-relaxed text-stone">{post.excerpt}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
