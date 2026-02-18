export const SITE_NAME = "AN Digital Studio";
export const SITE_DESCRIPTION =
  "We craft stunning, high-performance websites that drive results. Digital agency specializing in web design, development, and digital strategy.";
export const SITE_DESCRIPTION_BG =
  "Създаваме зашеметяващи, високопроизводителни уебсайтове, които постигат резултати. Дигитална агенция за уеб дизайн, разработка и SEO в София.";
export const SITE_URL = "https://andigital.bg";
export const ORGANIZATION_ID = "https://andigital.bg/#organization";

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
  { label: "Satisfaction Rate", value: 98, suffix: "%" },
] as const;

export const PORTFOLIO_CATEGORIES = [
  "All",
  "Web Design",
  "E-Commerce",
] as const;

export const PORTFOLIO_ITEMS = [
  {
    id: 1,
    title: "Pokanime",
    category: "Web Design",
    image: "https://andigital.bg/wp-content/uploads/2026/02/pokanime_logo_red-1.svg",
    description: "Digital invitations platform for weddings and events. Personalized designs, RSVP management, and photo gallery.",
    url: "https://pokanime.com/",
  },
  {
    id: 2,
    title: "Mihaela Foods & Bakery",
    category: "Web Design",
    image: "https://andigital.bg/wp-content/uploads/2026/02/mihaela_logo_transperent-1.png",
    imageSize: "small",
    description: "Family fast-food restaurant and bakery in Plovdiv. Cozy website with menu, gallery, and contact info.",
    url: "https://mihaelafoods.com/",
  },
  {
    id: 3,
    title: "City Computers",
    category: "Web Design",
    image: "https://andigital.bg/wp-content/uploads/2026/02/city-computers-1.png",
    imageSize: "small",
    description: "IT store and computer repair service in Plovdiv. 20+ years experience, subscription support, and custom builds.",
    url: "https://citycomputers.bg/",
  },
  {
    id: 4,
    title: "CloudSeven",
    category: "E-Commerce",
    image: "https://andigital.bg/wp-content/uploads/2026/02/cloudseven-02.png",
    description: "Premium adjustable memory foam pillow. E-commerce with product customization and subscription options.",
    url: "https://cloudseven.bg/",
  },
  {
    id: 5,
    title: "CN Diets",
    category: "Web Design",
    image: "https://andigital.bg/wp-content/uploads/2026/02/logo-martina-izmirliyska-clear-1.png",
    imageSize: "small",
    description: "Clinical nutrition and dietetic services. Personalized diet programs, consultations, and wellness solutions.",
    url: "https://cndiets.com/",
  },
  {
    id: 6,
    title: "MC Pro Clothing",
    category: "E-Commerce",
    image: "https://andigital.bg/wp-content/uploads/2026/02/screenshot.png",
    imageSize: "small",
    description: "Motorcycle clothing e-commerce. T-shirts, hoodies, caps from Classic Team, Enduro Team, Sportbike Team. Free shipping over 120 BGN.",
    url: "https://mcproclothing.com/",
  },
] as const;
