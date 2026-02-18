import type { ReactNode } from "react";

interface SectionWrapperProps {
  children: ReactNode;
  id: string;
  className?: string;
  elevated?: boolean;
}

export default function SectionWrapper({
  children,
  id,
  className = "",
  elevated = false,
}: SectionWrapperProps) {
  return (
    <>
      <div className="section-divider" />
      <section
        id={id}
        className={`relative overflow-hidden px-5 py-24 sm:px-6 sm:py-32 lg:px-8 lg:py-40 ${
          elevated ? "bg-charcoal" : "bg-midnight"
        } ${className}`}
      >
        <div className="container relative z-10 mx-auto max-w-7xl">
          {children}
        </div>
      </section>
    </>
  );
}
