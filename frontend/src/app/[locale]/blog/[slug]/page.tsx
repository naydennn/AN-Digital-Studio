import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getDictionary } from "@/i18n/get-dictionary";
import { isValidLocale } from "@/i18n/config";
import type { Locale } from "@/i18n/config";
import { SITE_NAME, SITE_URL } from "@/lib/constants";
import { BlogPostJsonLd } from "@/components/seo/JsonLd";

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

const PLACEHOLDER_POSTS: Record<string, PostData> = {
  "why-mobile-first-design-matters": {
    title: "Why Mobile-First Design Matters in 2026",
    content: `<p>With over 60% of web traffic now coming from mobile devices, designing for mobile first is no longer a nice-to-have — it's a fundamental requirement for any successful digital project.</p><h2>What is Mobile-First Design?</h2><p>Mobile-first design is a strategy where you design for the smallest screen first and then progressively enhance the experience for larger screens.</p><h2>Why It Matters</h2><p>Google uses mobile-first indexing, meaning it primarily uses the mobile version of your site for ranking and indexing. If your mobile experience is poor, your search rankings will suffer.</p><h2>Key Principles</h2><ul><li>Start with the smallest viewport and scale up</li><li>Prioritize content hierarchy</li><li>Use touch-friendly interactive elements</li><li>Optimize images and assets for mobile networks</li><li>Test on real devices, not just emulators</li></ul><p>At ${SITE_NAME}, every website we build starts with mobile.</p>`,
    date: "2026-02-01",
    author: "AN Digital Studio",
    authorAvatar: null,
    image: null,
    imageAlt: "Mobile-first design",
    categories: ["Design"],
    tags: ["mobile", "responsive", "UX"],
  },
  "headless-wordpress-nextjs-guide": {
    title: "The Complete Guide to Headless WordPress with Next.js",
    content: `<p>Headless WordPress combines the familiar content management experience of WordPress with the blazing-fast performance of modern frontend frameworks like Next.js.</p><h2>What is Headless WordPress?</h2><p>In a traditional WordPress setup, the same application handles both content management and rendering. In a headless setup, WordPress serves purely as a content backend.</p><h2>Why Go Headless?</h2><p>The benefits are significant: dramatically faster page loads through static generation, better security, and full creative freedom on the frontend.</p><h2>The Tech Stack</h2><ul><li><strong>WordPress</strong> — Content management</li><li><strong>WPGraphQL</strong> — GraphQL API</li><li><strong>Next.js</strong> — React frontend with SSR/SSG</li><li><strong>Vercel</strong> — Hosting with global CDN</li></ul><p>At ${SITE_NAME}, this is exactly how we build client websites.</p>`,
    date: "2026-01-25",
    author: "AN Digital Studio",
    authorAvatar: null,
    image: null,
    imageAlt: "Headless WordPress",
    categories: ["Development"],
    tags: ["wordpress", "nextjs", "headless"],
  },
  "seo-trends-ai-search": {
    title: "SEO in the Age of AI: What You Need to Know",
    content: `<p>AI-powered search engines are fundamentally changing how users find information online.</p><h2>How AI Changes Search</h2><p>Traditional SEO focused on keyword matching and backlinks. AI search engines understand context, intent, and nuance.</p><h2>Key Strategies</h2><ul><li><strong>Structured data</strong> — Use JSON-LD schema markup</li><li><strong>Semantic HTML</strong> — Proper heading hierarchies</li><li><strong>E-E-A-T</strong> — Experience, Expertise, Authoritativeness, Trustworthiness</li><li><strong>Page speed</strong> — Core Web Vitals remain critical</li></ul><p>At ${SITE_NAME}, we build every website with both traditional and AI SEO best practices.</p>`,
    date: "2026-01-18",
    author: "AN Digital Studio",
    authorAvatar: null,
    image: null,
    imageAlt: "SEO and AI",
    categories: ["SEO"],
    tags: ["seo", "ai", "marketing"],
  },
};

async function getPost(slug: string): Promise<PostData | null> {
  try {
    if (process.env.WORDPRESS_GRAPHQL_URL) {
      const { getPostBySlug } = await import("@/lib/wordpress");
      const p = await getPostBySlug(slug);
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
  return PLACEHOLDER_POSTS[slug] || null;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const post = await getPost(slug);
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
  const post = await getPost(slug);
  if (!post) notFound();

  return (
    <article className="min-h-screen bg-midnight pt-32 pb-24">
      <BlogPostJsonLd
        title={post.title}
        description={post.content.replace(/<[^>]*>/g, "").substring(0, 160)}
        datePublished={post.date}
        author={post.author}
        url={`${SITE_URL}/${safeLocale}/blog/${slug}`}
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
