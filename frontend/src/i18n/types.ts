export interface Dictionary {
  a11y: {
    skipToContent: string;
    openMenu: string;
    closeMenu: string;
    visitFacebook: string;
    visitInstagram: string;
    visitLinkedIn: string;
  };
  nav: {
    home: string;
    about: string;
    services: string;
    portfolio: string;
    contact: string;
    blog: string;
    getStarted: string;
  };
  hero: {
    badge: string;
    line1: string;
    line2: string;
    line3: string;
    sub: string;
    cta1: string;
    cta2: string;
    scroll: string;
  };
  about: {
    label: string;
    heading: string;
    headingAccent: string;
    p1: string;
    p2: string;
    badge1Title: string;
    badge1Sub: string;
    badge2Title: string;
    badge2Sub: string;
    badge3Title: string;
    badge3Sub: string;
    processLabel: string;
    processHeading: string;
    processAccent: string;
    steps: { step: string; title: string; description: string }[];
    stats: { label: string }[];
  };
  services: {
    label: string;
    heading: string;
    headingAccent: string;
    sub: string;
    items: { title: string; description: string }[];
  };
  portfolio: {
    label: string;
    filterAriaLabel: string;
    heading: string;
    headingAccent: string;
    sub: string;
    categories: string[];
    moreProjects: string;
    items: { title: string; description: string }[];
  };
  latestPosts: {
    label: string;
    heading: string;
    headingAccent: string;
    viewAll: string;
    minRead: string;
  };
  contact: {
    label: string;
    heading: string;
    headingAccent: string;
    sub: string;
    emailLabel: string;
    phoneLabel: string;
    phoneValue: string;
    formName: string;
    formEmail: string;
    formSubject: string;
    formMessage: string;
    formSend: string;
    formSending: string;
    formSent: string;
    formError: string;
    formThankYou: string;
  };
  footer: {
    description: string;
    navTitle: string;
    contactTitle: string;
    rights: string;
  };
  blog: {
    label: string;
    heading: string;
    headingAccent: string;
    sub: string;
    backToBlog: string;
    minRead: string;
    categoryLabels: Record<string, string>;
    posts: Record<string, { title: string; excerpt: string; content: string; category: string; tags: string[] }>;
  };
  faq: {
    label: string;
    heading: string;
    headingAccent: string;
    sub: string;
    items: { question: string; answer: string }[];
  };
  notFound: {
    title: string;
    heading: string;
    description: string;
    cta: string;
  };
}
