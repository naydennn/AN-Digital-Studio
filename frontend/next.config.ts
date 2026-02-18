import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  compress: true,
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "andigital.bg" },
      { protocol: "https", hostname: "**.andigital.bg" },
      { protocol: "https", hostname: "secure.gravatar.com" },
      { protocol: "https", hostname: "mihaelafoods.com" },
      { protocol: "https", hostname: "www.mihaelafoods.com" },
      { protocol: "https", hostname: "citycomputers.bg" },
      { protocol: "https", hostname: "www.citycomputers.bg" },
      { protocol: "https", hostname: "cloudseven.bg" },
      { protocol: "https", hostname: "www.cloudseven.bg" },
      { protocol: "https", hostname: "pokanime.com" },
      { protocol: "https", hostname: "www.pokanime.com" },
      { protocol: "https", hostname: "cndiets.com" },
      { protocol: "https", hostname: "www.cndiets.com" },
    ],
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
