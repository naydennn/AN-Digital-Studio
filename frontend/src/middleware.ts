import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { LOCALES, DEFAULT_LOCALE } from "@/i18n/config";

const LOCALE_COOKIE = "NEXT_LOCALE";

function getPreferredLocale(request: NextRequest): string {
  const cookieLocale = request.cookies.get(LOCALE_COOKIE)?.value;
  if (cookieLocale && LOCALES.includes(cookieLocale as (typeof LOCALES)[number])) {
    return cookieLocale;
  }

  const acceptLang = request.headers.get("Accept-Language") || "";
  for (const lang of acceptLang.split(",")) {
    const code = lang.split(";")[0].trim().substring(0, 2).toLowerCase();
    if (LOCALES.includes(code as (typeof LOCALES)[number])) {
      return code;
    }
  }

  return DEFAULT_LOCALE;
}

function addSecurityHeaders(response: NextResponse): void {
  response.headers.set("X-Content-Type-Options", "nosniff");
  response.headers.set("X-Frame-Options", "DENY");
  response.headers.set("X-XSS-Protection", "1; mode=block");
  response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  response.headers.set(
    "Permissions-Policy",
    "camera=(), microphone=(), geolocation=()"
  );
  response.headers.set(
    "Strict-Transport-Security",
    "max-age=63072000; includeSubDomains; preload"
  );
  response.headers.set(
    "Content-Security-Policy",
    [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://www.google-analytics.com",
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
      "font-src 'self' https://fonts.gstatic.com",
      "img-src 'self' data: blob: https: http:",
      "connect-src 'self' https://www.google-analytics.com https://*.andigital.bg",
      "frame-ancestors 'none'",
    ].join("; ")
  );
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  /* Skip static/internal paths */
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.includes(".") // static files (favicon, logo, etc.)
  ) {
    const response = NextResponse.next();
    addSecurityHeaders(response);
    return response;
  }

  /* Check if URL already has a valid locale prefix */
  const pathnameHasLocale = LOCALES.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (pathnameHasLocale) {
    const response = NextResponse.next();
    addSecurityHeaders(response);
    return response;
  }

  /* Redirect to locale-prefixed path */
  const locale = getPreferredLocale(request);
  const newUrl = new URL(`/${locale}${pathname}`, request.url);
  newUrl.search = request.nextUrl.search;

  const response = NextResponse.redirect(newUrl);
  response.cookies.set(LOCALE_COOKIE, locale, {
    path: "/",
    maxAge: 60 * 60 * 24 * 365, // 1 year
  });
  addSecurityHeaders(response);
  return response;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
