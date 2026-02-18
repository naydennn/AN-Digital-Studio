import Link from "next/link";
import Image from "next/image";
import ScrollReveal from "@/components/effects/ScrollReveal";
import SectionWrapper from "@/components/ui/SectionWrapper";
import Button from "@/components/ui/Button";
import BlogPostPlaceholder from "@/components/ui/BlogPostPlaceholder";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/types";

interface PostPreview { slug: string; title: string; excerpt: string; date: string; image: string | null; category: string; categoryKey?: string; }

const PLACEHOLDER_SLUGS = ["why-mobile-first-design-matters", "headless-wordpress-nextjs-guide", "seo-trends-ai-search"] as const;
const PLACEHOLDER_DATES: Record<string, string> = {
  "why-mobile-first-design-matters": "2026-02-01",
  "headless-wordpress-nextjs-guide": "2026-01-25",
  "seo-trends-ai-search": "2026-01-18",
};

function formatDate(d: string, locale: Locale): string {
  return new Date(d).toLocaleDateString(locale === "bg" ? "bg-BG" : "en-US", { year: "numeric", month: "short", day: "numeric" });
}

async function getLatestPosts(locale: Locale, dict: Dictionary): Promise<PostPreview[]> {
  try {
    if (process.env.WORDPRESS_GRAPHQL_URL) {
      const { getPosts } = await import("@/lib/wordpress");
      const data = await getPosts(3);
      if (data.posts.length > 0) return data.posts.map(p => ({ slug: p.slug, title: p.title, excerpt: p.excerpt.replace(/<[^>]*>/g, ""), date: p.date, image: p.featuredImage?.node.sourceUrl || null, category: p.categories.nodes[0]?.name || "General" }));
    }
  } catch { /* fallback */ }
  const categoryLabels = dict.blog.categoryLabels;
  const result: PostPreview[] = [];
  for (const slug of PLACEHOLDER_SLUGS) {
    const post = dict.blog.posts[slug];
    if (!post) continue;
    result.push({
      slug,
      title: post.title,
      excerpt: post.excerpt,
      date: PLACEHOLDER_DATES[slug],
      image: null,
      category: categoryLabels[post.category] ?? post.category,
      categoryKey: post.category,
    });
  }
  return result;
}

export default async function LatestPosts({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const posts = await getLatestPosts(locale, dict);
  const t = dict.latestPosts;

  return (
    <SectionWrapper id="blog-preview">
      <div className="absolute right-[-5%] top-[20%] h-[400px] w-[400px] rounded-full bg-gold/[0.03] blur-[100px] pointer-events-none" aria-hidden="true" />
      <div className="mb-14 flex flex-col items-center justify-between gap-6 sm:flex-row">
        <ScrollReveal>
          <div>
            <span className="mb-4 inline-block text-xs font-semibold uppercase tracking-[0.25em] text-gold">{t.label}</span>
            <h2 className="font-display text-3xl font-bold tracking-tight text-ivory sm:text-4xl lg:text-5xl">{t.heading}<span className="gradient-text">{t.headingAccent}</span></h2>
          </div>
        </ScrollReveal>
        <ScrollReveal delay={0.15}>
          <Button href={`/${locale}/blog`} variant="secondary" size="md">
            {t.viewAll}
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
          </Button>
        </ScrollReveal>
      </div>
      <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((post, i) => (
          <ScrollReveal key={post.slug} delay={i * 0.1}>
            <Link href={`/${locale}/blog/${post.slug}`} className="group flex h-full flex-col overflow-hidden rounded-2xl border border-gold-border/8 bg-charcoal transition-all duration-400 hover:border-gold-border/20 hover:shadow-2xl hover:shadow-gold/[0.05] focus:outline-none focus:ring-2 focus:ring-gold/30 focus:ring-offset-2 focus:ring-offset-charcoal">
              <div className="relative aspect-[16/10] overflow-hidden bg-midnight">
                {post.image ? <Image src={post.image} alt={post.title} fill className="object-cover transition-transform duration-500 group-hover:scale-105" sizes="(max-width:640px)100vw,(max-width:1024px)50vw,33vw" /> : (
                  <BlogPostPlaceholder category={post.categoryKey ?? post.category} />
                )}
              </div>
              <div className="flex flex-1 flex-col p-6">
                <div className="mb-3 flex items-center gap-3 text-xs text-stone"><span className="rounded-full border border-gold/20 px-2.5 py-0.5 font-semibold text-gold">{post.category}</span><span>{formatDate(post.date, locale)}</span></div>
                <h3 className="mb-2 font-display text-base font-semibold text-ivory transition-colors group-hover:text-champagne">{post.title}</h3>
                <p className="mt-auto line-clamp-2 text-sm leading-relaxed text-stone">{post.excerpt}</p>
              </div>
            </Link>
          </ScrollReveal>
        ))}
      </div>
    </SectionWrapper>
  );
}
