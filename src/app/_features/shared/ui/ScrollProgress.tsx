"use client";

import { useEffect, useRef } from "react";

/**
 * Thin fixed bar at the top of the page whose horizontal scale tracks reading
 * progress. Purely decorative — hidden in print / reduced-motion via CSS.
 */
const ScrollProgress = () => {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const bar = ref.current;
    if (!bar) return;

    let ticking = false;

    const update = () => {
      const scrollTop = window.scrollY;
      const height =
        document.documentElement.scrollHeight - window.innerHeight;
      const progress = height > 0 ? Math.min(scrollTop / height, 1) : 0;
      bar.style.setProperty("--progress", String(progress));
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(update);
        ticking = true;
      }
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return <div ref={ref} className="scroll-progress" aria-hidden="true" />;
};

export { ScrollProgress };
