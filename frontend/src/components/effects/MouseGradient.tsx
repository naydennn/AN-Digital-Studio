"use client";

import { useEffect, useRef } from "react";
import { ANIMATION } from "@/lib/constants";

interface SpotlightProps {
  className?: string;
}

export default function Spotlight({ className = "" }: SpotlightProps) {
  const spotRef = useRef<HTMLDivElement>(null);
  const posRef = useRef({ x: 0, y: 0 });
  const targetRef = useRef({ x: 0, y: 0 });
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const el = spotRef.current;
    if (!el) return;

    const isTouchDevice = window.matchMedia("(pointer: coarse)").matches;
    if (isTouchDevice) {
      el.style.display = "none";
      return;
    }

    const EASE = 0.1;
    const SIZE = ANIMATION.spotlightSize;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = el.parentElement?.getBoundingClientRect();
      if (!rect) return;
      targetRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
    };

    const animate = () => {
      posRef.current.x += (targetRef.current.x - posRef.current.x) * EASE;
      posRef.current.y += (targetRef.current.y - posRef.current.y) * EASE;

      el.style.background = `radial-gradient(${SIZE}px circle at ${posRef.current.x}px ${posRef.current.y}px, rgba(201,169,110,0.08), rgba(201,169,110,0.02) 40%, transparent 70%)`;

      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);
    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div
      ref={spotRef}
      className={`pointer-events-none absolute inset-0 z-[1] ${className}`}
      aria-hidden="true"
    />
  );
}
