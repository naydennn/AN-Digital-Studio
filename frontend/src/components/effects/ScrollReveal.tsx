"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { ANIMATION } from "@/lib/constants";

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  direction?: "up" | "down" | "left" | "right";
  delay?: number;
  once?: boolean;
}

const OFFSET = 40;

const directionVariants = {
  up: { y: OFFSET, x: 0 },
  down: { y: -OFFSET, x: 0 },
  left: { x: OFFSET, y: 0 },
  right: { x: -OFFSET, y: 0 },
};

export default function ScrollReveal({
  children,
  className = "",
  direction = "up",
  delay = 0,
  once = true,
}: ScrollRevealProps) {
  const initial = directionVariants[direction];

  return (
    <motion.div
      initial={{ opacity: 0, ...initial }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once, margin: "-50px" }}
      transition={{
        duration: ANIMATION.sectionRevealDuration,
        delay,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
