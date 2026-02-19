import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getDictionary } from "@/i18n/get-dictionary";
import { isValidLocale } from "@/i18n/config";
import type { Locale } from "@/i18n/config";
import { SITE_NAME, SITE_URL } from "@/lib/constants";
import { BlogPostJsonLd, BreadcrumbJsonLd } from "@/components/seo/JsonLd";

export const revalidate = 3600;
export const dynamicParams = true;

const LOCALES = ["en", "bg"] as const;
const STATIC_SLUGS = ["why-mobile-first-design-matters", "headless-wordpress-nextjs-guide", "seo-trends-ai-search"] as const;

export function generateStaticParams() {
  return LOCALES.flatMap((locale) =>
    STATIC_SLUGS.map((slug) => ({ locale, slug }))
  );
}

interface Props {
  params: Promise<{ locale: string; slug: string }>;
}
interface PostData {
  title: string;
  content: string;
  date: string;
  author: string;
  authorAvatar: string | null;
  image: string | null;
  imageAlt: string;
  categories: string[];
  tags: string[];
}

const WPM = 200;
function readTime(h: string) {
  return Math.max(
    1,
    Math.ceil(h.replace(/<[^>]*>/g, "").split(/\s+/).length / WPM)
  );
}
function fmtDate(d: string, l: string) {
  return new Date(d).toLocaleDateString(l === "bg" ? "bg-BG" : "en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

const PLACEHOLDER_SLUGS = ["why-mobile-first-design-matters", "headless-wordpress-nextjs-guide", "seo-trends-ai-search"] as const;
const PLACEHOLDER_DATES: Record<string, string> = {
  "why-mobile-first-design-matters": "2026-02-01",
  "headless-wordpress-nextjs-guide": "2026-01-25",
  "seo-trends-ai-search": "2026-01-18",
};
const PLACEHOLDER_IMAGE_ALTS: Record<string, string> = {
  "why-mobile-first-design-matters": "Mobile-first design",
  "headless-wordpress-nextjs-guide": "Headless WordPress",
  "seo-trends-ai-search": "SEO and AI",
};

async function getPost(slug: string, locale: Locale): Promise<PostData | null> {
  try {
    if (process.env.WORDPRESS_GRAPHQL_URL) {
      const { getPostBySlug } = await import("@/lib/wordpress");
      const language = locale.toUpperCase() as "EN" | "BG";
      const p = await getPostBySlug(slug, language);
      if (p)
        return {
          title: p.title,
          content: p.content,
          date: p.date,
          author: p.author.node.name,
          authorAvatar: p.author.node.avatar?.url || null,
          image: p.featuredImage?.node.sourceUrl || null,
          imageAlt: p.featuredImage?.node.altText || p.title,
          categories: p.categories.nodes.map((c) => c.name),
          tags: p.tags.nodes.map((t) => t.name),
        };
    }
  } catch {
    /* fallback */
  }
  if (!PLACEHOLDER_SLUGS.includes(slug as (typeof PLACEHOLDER_SLUGS)[number])) return null;
  const { getDictionary } = await import("@/i18n/get-dictionary");
  const dict = await getDictionary(locale);
  const post = dict.blog.posts[slug];
  if (!post) return null;
  const categoryLabels = dict.blog.categoryLabels;
  return {
    title: post.title,
    content: post.content,
    date: PLACEHOLDER_DATES[slug],
    author: "AN Digital Studio",
    authorAvatar: null,
    image: null,
    imageAlt: PLACEHOLDER_IMAGE_ALTS[slug],
    categories: [categoryLabels[post.category] ?? post.category],
    tags: post.tags,
  };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const safeLocale: Locale = isValidLocale(locale) ? locale : "en";
  const post = await getPost(slug, safeLocale);
  if (!post) return { title: "Post Not Found" };
  const description = post.content
    .replace(/<[^>]*>/g, "")
    .substring(0, 160);
  return {
    title: post.title,
    description,
    openGraph: {
      title: post.title,
      description,
      type: "article",
      publishedTime: post.date,
      authors: [post.author],
      url: `${SITE_URL}/${locale}/blog/${slug}`,
      ...(post.image && { images: [{ url: post.image }] }),
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { locale, slug } = await params;
  const safeLocale: Locale = isValidLocale(locale) ? locale : "en";
  const dict = await getDictionary(safeLocale);
  const post = await getPost(slug, safeLocale);
  if (!post) notFound();

  const postUrl = `${SITE_URL}/${safeLocale}/blog/${slug}`;

  return (
    <article className="min-h-screen bg-midnight pt-32 pb-24">
      <BreadcrumbJsonLd
        locale={safeLocale}
        items={[
          { name: dict.nav.home, url: safeLocale === "en" ? SITE_URL : `${SITE_URL}/${safeLocale}` },
          { name: dict.nav.blog, url: `${SITE_URL}/${safeLocale}/blog` },
          { name: post.title, url: postUrl },
        ]}
      />
      <BlogPostJsonLd
        title={post.title}
        description={post.content.replace(/<[^>]*>/g, "").substring(0, 160)}
        datePublished={post.date}
        author={post.author}
        url={postUrl}
        locale={safeLocale}
        image={post.image || undefined}
      />
      <div className="container mx-auto max-w-3xl px-5 sm:px-6 lg:px-8">
        <Link
          href={`/${safeLocale}/blog`}
          className="mb-10 inline-flex items-center gap-2 text-sm text-stone transition-colors hover:text-gold"
        >
          <svg
            className="h-4 w-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M7 16l-4-4m0 0l4-4m-4 4h18"
            />
          </svg>
          {dict.blog.backToBlog}
        </Link>
        <header className="mb-12">
          <div className="mb-5 flex flex-wrap items-center gap-3 text-xs text-stone">
            {post.categories.map((c) => (
              <span
                key={c}
                className="rounded-full border border-gold/20 px-3 py-0.5 font-semibold text-gold"
              >
                {c}
              </span>
            ))}
            <span>{fmtDate(post.date, safeLocale)}</span>
            <span>
              {readTime(post.content)} {dict.blog.minRead}
            </span>
          </div>
          <h1 className="mb-8 font-display text-3xl font-bold leading-tight tracking-tight text-ivory sm:text-4xl lg:text-5xl">
            {post.title}
          </h1>
          <div className="flex items-center gap-3">
            {post.authorAvatar ? (
              <Image
                src={post.authorAvatar}
                alt={post.author}
                width={40}
                height={40}
                className="rounded-full"
              />
            ) : (
              <div className="flex h-10 w-10 items-center justify-center rounded-full gradient-gold-bg font-display text-sm font-bold text-midnight">
                {post.author.charAt(0)}
              </div>
            )}
            <p className="text-sm font-medium text-ivory">{post.author}</p>
          </div>
        </header>
        {post.image && (
          <div className="mb-12 overflow-hidden rounded-2xl">
            <Image
              src={post.image}
              alt={post.imageAlt}
              width={800}
              height={450}
              className="w-full object-cover"
              priority
              sizes="(max-width: 768px) 100vw, 800px"
            />
          </div>
        )}
        <div
          className="prose prose-invert prose-base max-w-none prose-headings:font-display prose-headings:font-bold prose-headings:text-ivory prose-p:text-stone prose-p:leading-relaxed prose-a:text-gold prose-a:no-underline hover:prose-a:underline prose-strong:text-ivory prose-code:text-champagne prose-li:text-stone prose-li:marker:text-gold/30"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
        {post.tags.length > 0 && (
          <>
            <div className="section-divider mt-12 mb-7" />
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-gold-border/10 px-4 py-1.5 text-xs text-stone"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </>
        )}
      </div>
    </article>
  );
}
