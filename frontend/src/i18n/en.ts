import type { Dictionary } from "./types";

const en: Dictionary = {
  a11y: {
    skipToContent: "Skip to main content",
    openMenu: "Open menu",
    closeMenu: "Close menu",
    visitFacebook: "Visit us on Facebook",
    visitInstagram: "Visit us on Instagram",
    visitLinkedIn: "Visit us on LinkedIn",
  },
  nav: {
    home: "Home",
    about: "About",
    services: "Services",
    portfolio: "Portfolio",
    contact: "Contact",
    blog: "Blog",
    getStarted: "Get Started",
  },
  hero: {
    badge: "Available for new projects",
    line1: "We Create",
    line2: "Digital Experiences",
    line3: "That Inspire",
    sub: "AN Digital Studio crafts stunning, high-performance websites that captivate your audience and accelerate your growth.",
    cta1: "Start Your Project",
    cta2: "View Our Work",
    scroll: "Scroll",
  },
  about: {
    label: "About Us",
    heading: "We Build Websites That ",
    headingAccent: "Actually Perform",
    p1: "AN Digital Studio is a digital agency specializing in web design, websites, logos, business cards, and other digital materials. Our team pours heart into every project. Each one is unique and aligned with your ideas and brand identity. We help build brand identity when you're unsure — clear guidance, the right questions. Our portfolio speaks for itself.",
    p2: "We help small and medium businesses grow online — in Bulgaria and beyond. We're growing and ready to create websites for clients worldwide. High quality at accessible prices so businesses with potential can be noticed. Our goal: everyone gets a chance to showcase their idea.",
    badge1Title: "100% Custom",
    badge1Sub: "No templates",
    badge2Title: "Blazing Fast",
    badge2Sub: "Performance first",
    badge3Title: "Mobile First",
    badge3Sub: "Responsive always",
    processLabel: "Our Process",
    processHeading: "How We ",
    processAccent: "Bring Ideas to Life",
    steps: [
      {
        step: "01",
        title: "Discover",
        description:
          "We deep-dive into your business, goals, audience, and competitors to understand exactly what your project needs.",
      },
      {
        step: "02",
        title: "Design",
        description:
          "We craft pixel-perfect mockups and prototypes, iterating until every detail reflects your brand perfectly.",
      },
      {
        step: "03",
        title: "Develop",
        description:
          "We build with modern technologies — fast, secure, and scalable code that performs flawlessly on every device.",
      },
      {
        step: "04",
        title: "Launch",
        description:
          "We deploy, optimize, and provide ongoing support to ensure your project continues to grow and succeed.",
      },
    ],
    stats: [
      { label: "Projects Completed" },
      { label: "Happy Clients" },
      { label: "Years Experience" },
      { label: "Satisfaction Rate" },
    ],
  },
  services: {
    label: "What We Do",
    heading: "Services That ",
    headingAccent: "Transform Businesses",
    sub: "From design to deployment, we offer end-to-end digital solutions tailored to your unique business needs.",
    items: [
      {
        title: "Web Design",
        description:
          "Beautiful, user-centered designs that captivate your audience and reflect your brand identity.",
      },
      {
        title: "Web Development",
        description:
          "High-performance websites built with modern technologies for speed, security, and scalability.",
      },
      {
        title: "E-Commerce",
        description:
          "Online stores that convert visitors into customers with seamless shopping experiences.",
      },
      {
        title: "SEO & Marketing",
        description:
          "Data-driven strategies to boost your visibility, traffic, and rankings across search engines.",
      },
      {
        title: "UI/UX Design",
        description:
          "Intuitive interfaces and user experiences backed by research, testing, and best practices.",
      },
      {
        title: "Maintenance & Support",
        description:
          "Ongoing care, updates, and optimization to keep your website running at peak performance.",
      },
    ],
  },
  portfolio: {
    label: "Our Work",
    filterAriaLabel: "Filter projects",
    heading: "Featured ",
    headingAccent: "Projects",
    sub: "A showcase of our best work across web design, development, and digital branding.",
    categories: ["All", "Web Design", "E-Commerce"],
    moreProjects: "We've delivered many more — each project is custom to the client's requirements.",
    items: [
      { title: "Pokanime", description: "Digital invitations platform for weddings and events. Personalized designs, RSVP management, and photo gallery." },
      { title: "Mihaela Foods & Bakery", description: "Family fast-food restaurant and bakery in Plovdiv. Cozy website with menu, gallery, and contact info." },
      { title: "City Computers", description: "IT store and computer repair service in Plovdiv. 20+ years experience, subscription support, and custom builds." },
      { title: "CloudSeven", description: "Premium adjustable memory foam pillow. E-commerce with product customization and subscription options." },
      { title: "CN Diets", description: "Clinical nutrition and dietetic services. Personalized diet programs, consultations, and wellness solutions." },
      { title: "MC Pro Clothing", description: "Motorcycle clothing e-commerce. T-shirts, hoodies, caps from Classic Team, Enduro Team, Sportbike Team. Free shipping over 120 BGN." },
    ],
  },
  latestPosts: {
    label: "From Our Blog",
    heading: "Latest ",
    headingAccent: "Insights",
    viewAll: "View All Posts",
    minRead: "min",
  },
  contact: {
    label: "Get In Touch",
    heading: "Let's Build Something ",
    headingAccent: "Amazing Together",
    sub: "Have a project in mind? We'd love to hear about it. Send us a message and we'll get back to you within 24 hours.",
    emailLabel: "Email",
    phoneLabel: "Phone",
    phoneValue: "+359 8888 06 557",
    formName: "Your Name",
    formEmail: "Email Address",
    formSubject: "Subject",
    formMessage: "Your Message",
    formSend: "Send Message",
    formSending: "Sending...",
    formSent: "Message Sent!",
    formError: "Failed - Try Again",
    formThankYou: "Thank you! We'll get back to you within 24 hours.",
  },
  footer: {
    description:
      "We craft stunning, high-performance websites that drive results. Your digital presence is our passion.",
    navTitle: "Navigation",
    contactTitle: "Contact",
    rights: "All rights reserved.",
  },
  blog: {
    label: "Our Blog",
    heading: "Insights & ",
    headingAccent: "Resources",
    sub: "Tips, trends, and insights on web design, development, and digital growth.",
    backToBlog: "Back to Blog",
    minRead: "min read",
    categoryLabels: { Design: "Design", Development: "Development", SEO: "SEO", General: "General" } as Record<string, string>,
    posts: {
      "why-mobile-first-design-matters": {
        title: "Why Mobile-First Design Matters in 2026",
        excerpt: "With over 60% of web traffic coming from mobile devices, designing for mobile first is no longer optional.",
        content: `<p>With over 60% of web traffic now coming from mobile devices, designing for mobile first is no longer a nice-to-have — it's a fundamental requirement for any successful digital project.</p><h2>What is Mobile-First Design?</h2><p>Mobile-first design is a strategy where you design for the smallest screen first and then progressively enhance the experience for larger screens.</p><h2>Why It Matters</h2><p>Google uses mobile-first indexing, meaning it primarily uses the mobile version of your site for ranking and indexing. If your mobile experience is poor, your search rankings will suffer.</p><h2>Key Principles</h2><ul><li>Start with the smallest viewport and scale up</li><li>Prioritize content hierarchy</li><li>Use touch-friendly interactive elements</li><li>Optimize images and assets for mobile networks</li><li>Test on real devices, not just emulators</li></ul><p>At AN Digital Studio, every website we build starts with mobile.</p>`,
        category: "Design",
        tags: [],
      },
      "headless-wordpress-nextjs-guide": {
        title: "The Complete Guide to Headless WordPress with Next.js",
        excerpt: "Learn how to combine the power of WordPress content management with the speed of Next.js.",
        content: `<p>Headless WordPress combines the familiar content management experience of WordPress with the blazing-fast performance of modern frontend frameworks like Next.js.</p><h2>What is Headless WordPress?</h2><p>In a traditional WordPress setup, the same application handles both content management and rendering. In a headless setup, WordPress serves purely as a content backend.</p><h2>Why Go Headless?</h2><p>The benefits are significant: dramatically faster page loads through static generation, better security, and full creative freedom on the frontend.</p><h2>The Tech Stack</h2><ul><li><strong>WordPress</strong> — Content management</li><li><strong>WPGraphQL</strong> — GraphQL API</li><li><strong>Next.js</strong> — React frontend with SSR/SSG</li><li><strong>Vercel</strong> — Hosting with global CDN</li></ul><p>At AN Digital Studio, this is exactly how we build client websites.</p>`,
        category: "Development",
        tags: [],
      },
      "seo-trends-ai-search": {
        title: "SEO in the Age of AI: What You Need to Know",
        excerpt: "AI-powered search engines are changing the game. Here's how to optimize for both traditional and AI search.",
        content: `<p>AI-powered search engines are fundamentally changing how users find information online.</p><h2>How AI Changes Search</h2><p>Traditional SEO focused on keyword matching and backlinks. AI search engines understand context, intent, and nuance.</p><h2>Key Strategies</h2><ul><li><strong>Structured data</strong> — Use JSON-LD schema markup</li><li><strong>Semantic HTML</strong> — Proper heading hierarchies</li><li><strong>E-E-A-T</strong> — Experience, Expertise, Authoritativeness, Trustworthiness</li><li><strong>Page speed</strong> — Core Web Vitals remain critical</li></ul><p>At AN Digital Studio, we build every website with both traditional and AI SEO best practices.</p>`,
        category: "SEO",
        tags: [],
      },
    } as Record<string, { title: string; excerpt: string; content: string; category: string; tags: string[] }>,
  },
  faq: {
    label: "FAQ",
    heading: "Common ",
    headingAccent: "Questions",
    sub: "Everything you need to know before starting your project with us.",
    items: [
      {
        question: "How long does it take to build a website?",
        answer: "It depends on the scope. A landing page or simple site is typically ready in 1–2 weeks. A full business website takes 2–4 weeks, and a custom e-commerce store can take 4–8 weeks. We always agree on a clear timeline before we start.",
      },
      {
        question: "How much does a website cost?",
        answer: "Every project is different, so every quote is tailored to your specific requirements. We offer transparent, fixed pricing — no surprises. Contact us for a free, no-obligation quote and we'll outline exactly what's included.",
      },
      {
        question: "Do you work with clients outside Bulgaria?",
        answer: "Absolutely. We work with clients across Europe and beyond. Everything happens online — discovery calls, design reviews, feedback, and delivery — so location is never a barrier.",
      },
      {
        question: "What do I need to provide to get started?",
        answer: "Just your ideas, goals, and any brand assets you already have (logo, colors, photos). If you don't have them yet, we can help you create them. We guide you through every step so nothing gets missed.",
      },
      {
        question: "Will my website work on mobile and all devices?",
        answer: "Yes, without exception. Every website we build is mobile-first and fully responsive across all screen sizes — phones, tablets, laptops, and desktops.",
      },
      {
        question: "Can I update the website myself after launch?",
        answer: "Yes. We can integrate a content management system (CMS) so you can edit text, images, and pages without any technical knowledge. If you prefer, we can handle updates for you as part of a support package.",
      },
      {
        question: "Do you offer support and maintenance after launch?",
        answer: "Yes. We offer ongoing maintenance and support packages that cover security updates, performance monitoring, content changes, and technical assistance — so your website stays fast, secure, and up to date.",
      },
    ],
  },
  notFound: {
    title: "404",
    heading: "Page Not Found",
    description: "The page you're looking for doesn't exist or has been moved.",
    cta: "Back to Home",
  },
};

export default en;
