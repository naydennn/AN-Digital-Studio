"use client";

import { useRef, useEffect, useState, type ReactNode, type MouseEvent } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
  hover3D?: boolean;
}

const TILT_AMOUNT = 5;

export default function Card({
  children,
  className = "",
  hover3D = true,
}: CardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isTouch, setIsTouch] = useState(true);

  useEffect(() => {
    setIsTouch(window.matchMedia("(pointer: coarse)").matches);
  }, []);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!hover3D || isTouch || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    const rotateX = (y - 0.5) * -TILT_AMOUNT;
    const rotateY = (x - 0.5) * TILT_AMOUNT;
    cardRef.current.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
  };

  const handleMouseLeave = () => {
    if (!cardRef.current) return;
    cardRef.current.style.transform = "";
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`glass glow-hover rounded-2xl p-6 transition-all duration-300 ease-out ${className}`}
    >
      {children}
    </div>
  );
}
