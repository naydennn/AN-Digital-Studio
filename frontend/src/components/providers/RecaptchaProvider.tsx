"use client";

import { GoogleReCaptchaProvider } from "@google-recaptcha/react";

const RECAPTCHA_SITE_KEY = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY ?? "";

export default function RecaptchaProvider({ children }: { children: React.ReactNode }) {
  if (!RECAPTCHA_SITE_KEY) return <>{children}</>;
  return (
    <GoogleReCaptchaProvider type="v3" siteKey={RECAPTCHA_SITE_KEY}>
      {children}
    </GoogleReCaptchaProvider>
  );
}
