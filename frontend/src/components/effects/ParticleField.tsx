"use client";

import { useEffect, useRef, useCallback } from "react";
import { ANIMATION } from "@/lib/constants";

const CONNECTION_DISTANCE = 90;
const CONNECTION_DISTANCE_SQ = CONNECTION_DISTANCE * CONNECTION_DISTANCE;

interface Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  fillStyle: string;
}

export default function ParticleField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animationRef = useRef<number>(0);
  const isMobileRef = useRef(false);

  const initParticles = useCallback((width: number, height: number) => {
    isMobileRef.current = width < 768;
    const count = isMobileRef.current
      ? ANIMATION.particleCountMobile
      : ANIMATION.particleCountDesktop;

    particlesRef.current = Array.from({ length: count }, () => {
      const opacity = Math.random() * 0.3 + 0.05;
      return {
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 1.5 + 0.3,
        speedX: (Math.random() - 0.5) * 0.3,
        speedY: (Math.random() - 0.5) * 0.2,
        fillStyle: `rgba(201,169,110,${opacity.toFixed(3)})`,
      };
    });
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resizeCanvas = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      canvas.width = parent.clientWidth;
      canvas.height = parent.clientHeight;
      initParticles(canvas.width, canvas.height);
    };

    resizeCanvas();

    let paused = false;

    const handleVisibility = () => {
      paused = document.hidden;
      if (!paused) animationRef.current = requestAnimationFrame(animate);
    };

    const animate = () => {
      if (paused || !ctx || !canvas) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const particles = particlesRef.current;
      const w = canvas.width;
      const h = canvas.height;

      for (const p of particles) {
        p.x += p.speedX;
        p.y += p.speedY;
        if (p.x < 0) p.x = w;
        else if (p.x > w) p.x = 0;
        if (p.y < 0) p.y = h;
        else if (p.y > h) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.fillStyle;
        ctx.fill();
      }

      if (!isMobileRef.current) {
        ctx.lineWidth = 0.4;
        for (let i = 0; i < particles.length; i++) {
          for (let j = i + 1; j < particles.length; j++) {
            const dx = particles[i].x - particles[j].x;
            const dy = particles[i].y - particles[j].y;
            const distSq = dx * dx + dy * dy;
            if (distSq < CONNECTION_DISTANCE_SQ) {
              const opacity =
                ((CONNECTION_DISTANCE_SQ - distSq) / CONNECTION_DISTANCE_SQ) *
                0.05;
              ctx.beginPath();
              ctx.moveTo(particles[i].x, particles[i].y);
              ctx.lineTo(particles[j].x, particles[j].y);
              ctx.strokeStyle = `rgba(201,169,110,${opacity.toFixed(3)})`;
              ctx.stroke();
            }
          }
        }
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    const resizeObserver = new ResizeObserver(resizeCanvas);
    if (canvas.parentElement) resizeObserver.observe(canvas.parentElement);
    document.addEventListener("visibilitychange", handleVisibility);

    return () => {
      cancelAnimationFrame(animationRef.current);
      resizeObserver.disconnect();
      document.removeEventListener("visibilitychange", handleVisibility);
    };
  }, [initParticles]);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none absolute inset-0"
      style={{ willChange: "transform" }}
      aria-hidden="true"
    />
  );
}
