export interface Dictionary {
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
    heading: string;
    headingAccent: string;
    sub: string;
    categories: string[];
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
    locationLabel: string;
    locationValue: string;
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
  };
  notFound: {
    title: string;
    heading: string;
    description: string;
    cta: string;
  };
}
