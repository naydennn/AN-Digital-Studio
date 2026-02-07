export const SITE_NAME = "AN Digital Studio";
export const SITE_DESCRIPTION =
  "We craft stunning, high-performance websites that drive results. Digital agency specializing in web design, development, and digital strategy.";
export const SITE_URL = "https://andigital.bg";

export const SOCIAL_LINKS = {
  facebook: "https://facebook.com/andigital",
  instagram: "https://instagram.com/andigital",
  linkedin: "https://linkedin.com/company/andigital",
} as const;

export const ANIMATION = {
  sectionRevealDuration: 0.7,
  sectionRevealDelay: 0.15,
  staggerChildren: 0.08,
  particleCountDesktop: 30,
  particleCountMobile: 12,
  revalidateInterval: 60,
  spotlightSize: 280,
} as const;

export const STATS = [
  { label: "Projects Completed", value: 150, suffix: "+" },
  { label: "Happy Clients", value: 80, suffix: "+" },
  { label: "Years Experience", value: 5, suffix: "+" },
  { label: "Awards Won", value: 12, suffix: "" },
] as const;

export const PORTFOLIO_CATEGORIES = [
  "All",
  "Web Design",
  "Development",
  "E-Commerce",
  "Branding",
] as const;

export const PORTFOLIO_ITEMS = [
  {
    id: 1,
    title: "TechVision Platform",
    category: "Development",
    image: "/portfolio/project-1.jpg",
    description: "Full-stack SaaS platform with real-time analytics dashboard",
    technologies: ["Next.js", "TypeScript", "PostgreSQL"],
    url: "#",
  },
  {
    id: 2,
    title: "Luxe Fashion Store",
    category: "E-Commerce",
    image: "/portfolio/project-2.jpg",
    description: "Premium e-commerce experience with 40% conversion increase",
    technologies: ["WooCommerce", "React", "Stripe"],
    url: "#",
  },
  {
    id: 3,
    title: "GreenLife Organics",
    category: "Web Design",
    image: "/portfolio/project-3.jpg",
    description: "Clean, modern brand identity and responsive website",
    technologies: ["Figma", "Next.js", "Tailwind"],
    url: "#",
  },
  {
    id: 4,
    title: "FinanceHub App",
    category: "Development",
    image: "/portfolio/project-4.jpg",
    description: "Personal finance management app with bank integrations",
    technologies: ["React Native", "Node.js", "Plaid"],
    url: "#",
  },
  {
    id: 5,
    title: "Artisan Coffee Co.",
    category: "Branding",
    image: "/portfolio/project-5.jpg",
    description: "Complete brand overhaul from logo to digital presence",
    technologies: ["Illustrator", "Photoshop", "WordPress"],
    url: "#",
  },
  {
    id: 6,
    title: "CloudSync Solutions",
    category: "Web Design",
    image: "/portfolio/project-6.jpg",
    description: "Enterprise SaaS landing page with 60% lead increase",
    technologies: ["Next.js", "Framer Motion", "Vercel"],
    url: "#",
  },
] as const;
