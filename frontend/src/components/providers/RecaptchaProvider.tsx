"use client";

import { GoogleReCaptchaProvider } from "@google-recaptcha/react";

interface RecaptchaProviderProps {
  children: React.ReactNode;
  siteKey?: string;
}

export default function RecaptchaProvider({ children, siteKey }: RecaptchaProviderProps) {
  if (!siteKey) return <>{children}</>;
  return (
    <GoogleReCaptchaProvider type="v2-checkbox" siteKey={siteKey}>
      {children}
    </GoogleReCaptchaProvider>
  );
}
