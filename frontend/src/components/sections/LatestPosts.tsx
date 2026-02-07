import Link from "next/link";
import Image from "next/image";
import ScrollReveal from "@/components/effects/ScrollReveal";
import SectionWrapper from "@/components/ui/SectionWrapper";
import Button from "@/components/ui/Button";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/types";

interface PostPreview { slug: string; title: string; excerpt: string; date: string; image: string | null; category: string; }

const PLACEHOLDER_POSTS: PostPreview[] = [
  { slug: "why-mobile-first-design-matters", title: "Why Mobile-First Design Matters in 2026", excerpt: "With over 60% of web traffic coming from mobile devices, designing for mobile first is no longer optional.", date: "2026-02-01", image: null, category: "Design" },
  { slug: "headless-wordpress-nextjs-guide", title: "The Complete Guide to Headless WordPress with Next.js", excerpt: "Learn how to combine the power of WordPress content management with the speed of Next.js.", date: "2026-01-25", image: null, category: "Development" },
  { slug: "seo-trends-ai-search", title: "SEO in the Age of AI: What You Need to Know", excerpt: "AI-powered search engines are changing the game. Here's how to optimize for both traditional and AI search.", date: "2026-01-18", image: null, category: "SEO" },
];

function formatDate(d: string, locale: Locale): string {
  return new Date(d).toLocaleDateString(locale === "bg" ? "bg-BG" : "en-US", { year: "numeric", month: "short", day: "numeric" });
}

async function getLatestPosts(): Promise<PostPreview[]> {
  try {
    if (process.env.WORDPRESS_GRAPHQL_URL) {
      const { getPosts } = await import("@/lib/wordpress");
      const data = await getPosts(3);
      if (data.posts.length > 0) return data.posts.map(p => ({ slug: p.slug, title: p.title, excerpt: p.excerpt.replace(/<[^>]*>/g, ""), date: p.date, image: p.featuredImage?.node.sourceUrl || null, category: p.categories.nodes[0]?.name || "General" }));
    }
  } catch { /* fallback */ }
  return PLACEHOLDER_POSTS;
}

export default async function LatestPosts({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const posts = await getLatestPosts();
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
            <Link href={`/${locale}/blog/${post.slug}`} className="group flex h-full flex-col overflow-hidden rounded-2xl border border-gold-border/8 bg-charcoal transition-all duration-400 hover:border-gold-border/20 hover:shadow-2xl hover:shadow-gold/[0.05]">
              <div className="relative aspect-[16/10] overflow-hidden bg-midnight">
                {post.image ? <Image src={post.image} alt={post.title} fill className="object-cover transition-transform duration-500 group-hover:scale-105" sizes="(max-width:640px)100vw,(max-width:1024px)50vw,33vw" /> : (
                  <div className="flex h-full w-full items-center justify-center"><div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(201,169,110,0.05),transparent_70%)]" /><svg className="h-10 w-10 text-gold/10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" /></svg></div>
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
