"use client";

import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ElementType,
  type ReactNode,
} from "react";
import { cn } from "../util/classname";

interface RevealProps {
  children: ReactNode;
  /** Extra classes applied to the wrapper. */
  className?: string;
  /** Stagger delay in ms before the element animates in. */
  delay?: number;
  /** Render as a different element (defaults to div). */
  as?: ElementType;
  /** How far (0-1) the element must be in view before revealing. */
  threshold?: number;
}

/**
 * Fades + slides its children into view once, when scrolled near the viewport.
 * Content is visible by default (SSR / no-JS / print); the hidden start state is
 * only applied once `html.js` is set, so JavaScript failure never hides content.
 */
const Reveal = ({
  children,
  className,
  delay = 0,
  as,
  threshold = 0.15,
}: RevealProps) => {
  const Tag = as ?? "div";
  const ref = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Hydration succeeded — cancel the layout's force-reveal safety timer.
    const w = window as unknown as { __revealFallback?: ReturnType<typeof setTimeout> };
    if (w.__revealFallback) {
      clearTimeout(w.__revealFallback);
      w.__revealFallback = undefined;
    }

    const node = ref.current;
    if (!node) return;

    if (typeof IntersectionObserver === "undefined") {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
            observer.disconnect();
          }
        });
      },
      { threshold, rootMargin: "0px 0px -10% 0px" }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [threshold]);

  return (
    <Tag
      ref={ref}
      className={cn("reveal", visible && "is-visible", className)}
      style={{ "--reveal-delay": `${delay}ms` } as CSSProperties}
    >
      {children}
    </Tag>
  );
};

export { Reveal };
