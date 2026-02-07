import Link from "next/link";
import type { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  href?: string;
  type?: "button" | "submit";
  variant?: "primary" | "secondary" | "outline";
  size?: "sm" | "md" | "lg";
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
}

const VARIANT_STYLES = {
  primary:
    "gradient-gold-bg text-midnight font-bold hover:shadow-xl hover:shadow-gold/20 hover:brightness-110",
  secondary:
    "border border-gold/25 text-gold hover:bg-gold/10 hover:border-gold/40",
  outline:
    "border border-gold-border/10 text-stone hover:border-gold-border/25 hover:text-ivory",
} as const;

const SIZE_STYLES = {
  sm: "px-5 py-2 text-xs",
  md: "px-7 py-2.5 text-sm",
  lg: "px-9 py-3.5 text-sm",
} as const;

export default function Button({
  children,
  href,
  type = "button",
  variant = "primary",
  size = "md",
  className = "",
  onClick,
  disabled = false,
}: ButtonProps) {
  const baseStyles =
    "inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-gold/30 focus:ring-offset-2 focus:ring-offset-midnight disabled:opacity-40 disabled:cursor-not-allowed";
  const styles = `${baseStyles} ${VARIANT_STYLES[variant]} ${SIZE_STYLES[size]} ${className}`;

  if (href) {
    return (
      <Link href={href} className={styles}>
        {children}
      </Link>
    );
  }

  return (
    <button
      type={type}
      className={styles}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
