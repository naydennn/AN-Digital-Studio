import type { Dictionary } from "./types";

const en: Dictionary = {
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
    p1: "AN Digital Studio is a full-service digital agency based in Sofia, Bulgaria. We combine strategic thinking with creative design and cutting-edge technology to deliver websites that don't just look beautiful — they convert visitors into customers.",
    p2: "Every project starts with understanding your business. We obsess over the details — from pixel-perfect design and smooth animations to lightning-fast load times and search engine optimization. The result? Digital experiences that leave a lasting impression.",
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
      { label: "Awards Won" },
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
    heading: "Featured ",
    headingAccent: "Projects",
    sub: "A showcase of our best work across web design, development, and digital branding.",
    categories: ["All", "Web Design", "Development", "E-Commerce", "Branding"],
    items: [
      { title: "TechVision Platform", description: "Full-stack SaaS platform with real-time analytics dashboard" },
      { title: "Luxe Fashion Store", description: "Premium e-commerce experience with 40% conversion increase" },
      { title: "GreenLife Organics", description: "Clean, modern brand identity and responsive website" },
      { title: "FinanceHub App", description: "Personal finance management app with bank integrations" },
      { title: "Artisan Coffee Co.", description: "Complete brand overhaul from logo to digital presence" },
      { title: "CloudSync Solutions", description: "Enterprise SaaS landing page with 60% lead increase" },
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
    locationLabel: "Location",
    locationValue: "Sofia, Bulgaria",
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
  },
  notFound: {
    title: "404",
    heading: "Page Not Found",
    description: "The page you're looking for doesn't exist or has been moved.",
    cta: "Back to Home",
  },
};

export default en;
