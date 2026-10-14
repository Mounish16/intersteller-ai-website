"use client";

import { useRef, useCallback, ReactNode } from "react";

interface MagneticButtonProps {
  children: ReactNode;
  className?: string;
  /** How far the element travels toward the cursor. 0.4 = 40% of offset */
  pull?: number;
  /** Spring stiffness for LERP (lower = softer) */
  ease?: number;
  as?: "a" | "button" | "div";
  href?: string;
  onClick?: () => void;
  [key: string]: unknown;
}

export default function MagneticButton({
  children,
  className = "",
  pull = 0.38,
  ease = 0.18,
  as: Tag = "div",
  href,
  onClick,
  ...props
}: MagneticButtonProps) {
  const ref = useRef<HTMLElement>(null);
  const raf = useRef<number>(0);
  const target = useRef({ x: 0, y: 0 });
  const current = useRef({ x: 0, y: 0 });
  const active = useRef(false);

  const animate = useCallback(() => {
    const el = ref.current;
    if (!el) return;

    current.current.x += (target.current.x - current.current.x) * ease;
    current.current.y += (target.current.y - current.current.y) * ease;

    el.style.transform = `translate(${current.current.x}px, ${current.current.y}px)`;

    const dist = Math.hypot(target.current.x - current.current.x, target.current.y - current.current.y);
    if (active.current || dist > 0.05) {
      raf.current = requestAnimationFrame(animate);
    }
  }, [ease]);

  const onMouseMove = useCallback((e: React.MouseEvent<HTMLElement>) => {
    if (typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches) {
      return;
    }
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top  + rect.height / 2;
    target.current = {
      x: (e.clientX - cx) * pull,
      y: (e.clientY - cy) * pull,
    };
    if (!active.current) {
      active.current = true;
      raf.current = requestAnimationFrame(animate);
    }
  }, [pull, animate]);

  const onMouseLeave = useCallback(() => {
    active.current = false;
    target.current = { x: 0, y: 0 };
    // keep animating until snapped back
    raf.current = requestAnimationFrame(animate);
  }, [animate]);

  const commonProps = {
    ref,
    onMouseMove,
    onMouseLeave,
    className,
    onClick,
    style: { display: "inline-block", willChange: "transform" },
    ...props,
  };

  if (Tag === "a") {
    return <a href={href} {...(commonProps as React.AnchorHTMLAttributes<HTMLAnchorElement>)}>{children}</a>;
  }
  if (Tag === "button") {
    return <button {...(commonProps as React.ButtonHTMLAttributes<HTMLButtonElement>)}>{children}</button>;
  }
  return <div {...(commonProps as React.HTMLAttributes<HTMLDivElement>)}>{children}</div>;
}
