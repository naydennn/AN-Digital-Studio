import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { getDictionary } from "@/i18n/get-dictionary";
import { isValidLocale } from "@/i18n/config";
import type { Locale } from "@/i18n/config";

interface BlogPost { slug: string; title: string; excerpt: string; date: string; image: string | null; author: string; category: string; }

const PLACEHOLDER_POSTS: BlogPost[] = [
  { slug: "why-mobile-first-design-matters", title: "Why Mobile-First Design Matters in 2026", excerpt: "With over 60% of web traffic coming from mobile devices, designing for mobile first is no longer optional.", date: "2026-02-01", image: null, author: "AN Digital Studio", category: "Design" },
  { slug: "headless-wordpress-nextjs-guide", title: "The Complete Guide to Headless WordPress with Next.js", excerpt: "Learn how to combine the power of WordPress content management with the speed of Next.js.", date: "2026-01-25", image: null, author: "AN Digital Studio", category: "Development" },
  { slug: "seo-trends-ai-search", title: "SEO in the Age of AI: What You Need to Know", excerpt: "AI-powered search engines are changing the game. Here's how to optimize for both traditional and AI search.", date: "2026-01-18", image: null, author: "AN Digital Studio", category: "SEO" },
];

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

  let posts: BlogPost[] = PLACEHOLDER_POSTS;
  try { if (process.env.WORDPRESS_GRAPHQL_URL) { const { getPosts } = await import("@/lib/wordpress"); const d = await getPosts(); if (d.posts.length > 0) posts = d.posts.map(p => ({ slug: p.slug, title: p.title, excerpt: p.excerpt.replace(/<[^>]*>/g, ""), date: p.date, image: p.featuredImage?.node.sourceUrl || null, author: p.author.node.name, category: p.categories.nodes[0]?.name || "General" })); } } catch { /* fallback */ }

  return (
    <div className="min-h-screen bg-midnight pt-32 pb-24">
      <div className="container mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <div className="mb-20 text-center">
          <span className="mb-4 inline-block text-xs font-semibold uppercase tracking-[0.25em] text-gold">{t.label}</span>
          <h1 className="mb-6 font-display text-4xl font-bold tracking-tight text-ivory sm:text-5xl lg:text-6xl">{t.heading}<span className="gradient-text">{t.headingAccent}</span></h1>
          <p className="mx-auto max-w-2xl text-base text-stone sm:text-lg">{t.sub}</p>
        </div>
        <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map(post => (
            <Link key={post.slug} href={`/${safeLocale}/blog/${post.slug}`} className="group overflow-hidden rounded-2xl border border-gold-border/8 bg-charcoal transition-all duration-400 hover:border-gold-border/20 hover:shadow-2xl hover:shadow-gold/[0.05]">
              <div className="relative aspect-[16/10] overflow-hidden bg-midnight">
                {post.image ? <Image src={post.image} alt={post.title} fill className="object-cover transition-transform duration-500 group-hover:scale-105" sizes="(max-width:640px)100vw,(max-width:1024px)50vw,33vw" /> : <div className="flex h-full w-full items-center justify-center"><div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(201,169,110,0.05),transparent_70%)]" /><svg className="h-12 w-12 text-gold/10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" /></svg></div>}
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
