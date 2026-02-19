"use client";

import { GoogleReCaptchaProvider } from "@google-recaptcha/react";

const RECAPTCHA_SITE_KEY = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY ?? "";

export default function RecaptchaProvider({ children }: { children: React.ReactNode }) {
  if (!RECAPTCHA_SITE_KEY) return <>{children}</>;
  return (
    <GoogleReCaptchaProvider type="v2-checkbox" siteKey={RECAPTCHA_SITE_KEY}>
      {children}
    </GoogleReCaptchaProvider>
  );
}
