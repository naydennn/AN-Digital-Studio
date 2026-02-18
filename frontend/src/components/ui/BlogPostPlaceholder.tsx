"use client";

const ICONS: Record<string, React.ReactNode> = {
  Design: (
    <svg className="h-12 w-12 text-gold/20" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.043-.025a15.994 15.994 0 011.622-3.395m3.38 3.395a15.995 15.995 0 004.769-2.623M3.38 20.005a15.996 15.996 0 004.293-5.77M18.002 9.48a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zm-9 0a15.996 15.996 0 01-2.623-4.293M20.005 3.38a15.996 15.996 0 01-5.77 4.293" />
    </svg>
  ),
  Development: (
    <svg className="h-12 w-12 text-gold/20" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />
    </svg>
  ),
  SEO: (
    <svg className="h-12 w-12 text-gold/20" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
    </svg>
  ),
  General: (
    <svg className="h-12 w-12 text-gold/20" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
    </svg>
  ),
};

export default function BlogPostPlaceholder({ category }: { category?: string }) {
  const categoryKey = category && ICONS[category] ? category : "General";
  const icon = ICONS[categoryKey] ?? ICONS.General;

  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(201,169,110,0.05),transparent_70%)]" />
      {icon}
    </div>
  );
}
