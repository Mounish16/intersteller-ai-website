"use client";

import { useEffect, useRef, ReactNode } from "react";

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  /** delay in ms before the element starts its reveal */
  delay?: number;
  /** slide direction: "up" (default) | "down" | "left" | "right" */
  from?: "up" | "down" | "left" | "right";
  /** how far it starts from (px) */
  distance?: number;
  /** CSS duration string */
  duration?: string;
  /** reveal when this fraction of the element is visible */
  threshold?: number;
}

const TRANSLATE: Record<string, string> = {
  up:    "translateY(VALpx)",
  down:  "translateY(-VALpx)",
  left:  "translateX(VALpx)",
  right: "translateX(-VALpx)",
};

export default function ScrollReveal({
  children,
  className = "",
  delay = 0,
  from = "up",
  distance = 40,
  duration = "0.8s",
  threshold = 0.15,
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const startTransform = TRANSLATE[from].replace("VAL", String(distance));
    el.style.opacity    = "0";
    el.style.transform  = startTransform;
    el.style.transition = `opacity ${duration} cubic-bezier(0.22,1,0.36,1) ${delay}ms, transform ${duration} cubic-bezier(0.22,1,0.36,1) ${delay}ms`;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.style.opacity   = "1";
          el.style.transform = "none";
          io.disconnect();
        }
      },
      { threshold }
    );

    io.observe(el);
    return () => io.disconnect();
  }, [from, distance, duration, delay, threshold]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
