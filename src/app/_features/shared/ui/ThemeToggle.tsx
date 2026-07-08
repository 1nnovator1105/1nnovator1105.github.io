"use client";

import { useEffect, useState } from "react";
import { cn } from "../util/classname";

type Theme = "dark" | "light";

const getInitialTheme = (): Theme => {
  if (typeof document === "undefined") return "dark";
  return (document.documentElement.getAttribute("data-theme") as Theme) || "dark";
};

/**
 * Toggles `data-theme` on <html> and persists the choice. The pre-paint script
 * in the layout applies the stored value, so this only handles user toggles.
 */
const ThemeToggle = ({ className }: { className?: string }) => {
  const [theme, setTheme] = useState<Theme>("dark");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setTheme(getInitialTheme());
    setMounted(true);
  }, []);

  const toggle = () => {
    const next: Theme = theme === "dark" ? "light" : "dark";
    setTheme(next);
    document.documentElement.setAttribute("data-theme", next);
    try {
      localStorage.setItem("theme", next);
    } catch {
      /* private mode — ignore */
    }
  };

  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={isDark ? "라이트 모드로 전환" : "다크 모드로 전환"}
      title={isDark ? "라이트 모드" : "다크 모드"}
      className={cn(
        "theme-toggle hero-chip flex items-center gap-2 rounded-full px-4 py-2 text-lg font-light transition-transform duration-200 hover:scale-105 active:scale-95",
        className
      )}
    >
      {/* Render a stable label until mounted to avoid hydration mismatch. */}
      <span aria-hidden="true" className="text-xl leading-none">
        {mounted ? (isDark ? "☾" : "☀") : "☾"}
      </span>
      <span className="hidden sm:inline">
        {mounted ? (isDark ? "Dark" : "Light") : "Dark"}
      </span>
    </button>
  );
};

export { ThemeToggle };
