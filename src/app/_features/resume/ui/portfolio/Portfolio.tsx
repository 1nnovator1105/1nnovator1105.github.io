"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { neighbors } from "../../model/graph";
import { PortfolioCards } from "./PortfolioCards";
import { PortfolioNet } from "./PortfolioNet";

type Theme = "light" | "dark";

const LEGEND: { label: string; color: string }[] = [
  { label: "회사", color: "var(--accent)" },
  { label: "기술", color: "var(--jewel-skill)" },
  { label: "가치", color: "var(--jewel-value)" },
];

const Portfolio = () => {
  const [hoverId, setHoverId] = useState<string | null>(null);
  const [hoverCardIds, setHoverCardIds] = useState<string[] | null>(null);
  const [activeIds, setActiveIds] = useState<string[]>(["self"]);
  const [theme, setTheme] = useState<Theme>("light");

  const panelRef = useRef<HTMLDivElement | null>(null);
  const cardsRef = useRef<HTMLDivElement | null>(null);
  const activeKeyRef = useRef("");
  const hoverCardKeyRef = useRef<string | null>(null);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    setTheme(
      (document.documentElement.getAttribute("data-theme") as Theme) || "light"
    );
  }, []);

  const toggleTheme = () => {
    const next: Theme = theme === "light" ? "dark" : "light";
    setTheme(next);
    document.documentElement.setAttribute("data-theme", next);
    try {
      localStorage.setItem("theme", next);
    } catch {
      /* private mode */
    }
  };

  const isDesktop = () =>
    typeof window !== "undefined" &&
    window.matchMedia("(min-width: 1024px)").matches;

  // scroll-spy: the résumé card nearest the centerline drives which graph nodes
  // light up, and gets the .card-active outline.
  const updateSpy = useCallback(() => {
    const wrap = cardsRef.current;
    if (!wrap) return;
    const cards = wrap.querySelectorAll<HTMLElement>("[data-card]");
    if (!cards.length) return;

    let centerY: number;
    if (isDesktop() && panelRef.current) {
      const r = panelRef.current.getBoundingClientRect();
      centerY = r.top + r.height * 0.4;
    } else {
      centerY = window.innerHeight * 0.4;
    }

    let best: HTMLElement | null = null;
    let bd = Infinity;
    cards.forEach((cd) => {
      const r = cd.getBoundingClientRect();
      const mid = r.top + r.height / 2;
      const d = Math.abs(mid - centerY);
      if (d < bd) {
        bd = d;
        best = cd;
      }
    });
    if (!best) return;
    const chosen: HTMLElement = best;
    cards.forEach((cd) => cd.classList.toggle("card-active", cd === chosen));

    const node = chosen.getAttribute("data-node") || "";
    const skills = (chosen.getAttribute("data-skills") || "")
      .split(" ")
      .filter(Boolean);
    const set = [node, ...skills].filter(Boolean);
    const key = set.join(",");
    if (key !== activeKeyRef.current) {
      activeKeyRef.current = key;
      setActiveIds(set);
    }
  }, []);

  const onScroll = useCallback(() => {
    if (rafRef.current) return;
    rafRef.current = requestAnimationFrame(() => {
      rafRef.current = null;
      updateSpy();
    });
  }, [updateSpy]);

  useEffect(() => {
    const panel = panelRef.current;
    panel?.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    const id = requestAnimationFrame(() => updateSpy());
    return () => {
      panel?.removeEventListener("scroll", onScroll);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(id);
    };
  }, [onScroll, updateSpy]);

  const scrollToNode = useCallback((id: string) => {
    const wrap = cardsRef.current;
    if (!wrap) return;
    let t = wrap.querySelector<HTMLElement>(`[data-node="${id}"]`);
    if (!t) t = wrap.querySelector<HTMLElement>(`[data-skills~="${id}"]`);
    if (!t) return;
    if (isDesktop() && panelRef.current) {
      const el = panelRef.current;
      const tr = t.getBoundingClientRect();
      const er = el.getBoundingClientRect();
      el.scrollTo({
        top: el.scrollTop + (tr.top - er.top) - 28,
        behavior: "smooth",
      });
    } else {
      const y = window.scrollY + t.getBoundingClientRect().top - 84;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  }, []);

  // Hovering a card previews its connections in the graph (like scrolling to
  // it, but without moving). Delegated on the cards container.
  const onCardsOver = (e: React.MouseEvent) => {
    const card = (e.target as HTMLElement).closest<HTMLElement>("[data-card]");
    if (!card) return;
    const node = card.getAttribute("data-node") || "";
    const skills = (card.getAttribute("data-skills") || "")
      .split(" ")
      .filter(Boolean);
    const set = [node, ...skills].filter(Boolean);
    const key = set.join(",");
    if (key !== hoverCardKeyRef.current) {
      hoverCardKeyRef.current = key;
      setHoverCardIds(set);
    }
  };
  const onCardsLeave = () => {
    hoverCardKeyRef.current = null;
    setHoverCardIds(null);
  };

  // priority: node hover > card hover > scrolled-to card
  const base = hoverId
    ? neighbors(hoverId)
    : new Set(
        hoverCardIds && hoverCardIds.length
          ? hoverCardIds
          : activeIds.length
          ? activeIds
          : ["self"]
      );
  // keep 김민성(self) in focus so the self↔(focused company) link lights up —
  // but NOT all companies at once. Viewing 뉴닉 → 김민성↔뉴닉, etc.
  const active = new Set(base);
  active.add("self");

  return (
    <div className="book-desk min-h-screen lg:flex lg:h-screen lg:items-center lg:justify-center lg:p-6 xl:p-7">
      <div className="book relative flex w-full flex-col lg:h-full lg:max-w-[1660px] lg:flex-row lg:overflow-hidden lg:rounded-[16px]">
        {/* LEFT page — header + graph + legend */}
        <div className="book-page-left flex flex-col bg-page lg:w-1/2 lg:h-full lg:border-r lg:border-line-strong">
        <div className="px-6 pt-10 lg:px-10 lg:pt-16">
          <div className="flex items-start justify-between gap-4">
            <div className="anim-fade-up">
              <div className="mb-3 font-mono text-[11px] uppercase tracking-[0.16em] text-accent">
                Front-End Engineer
              </div>
              <h1 className="text-[44px] lg:text-[56px] font-extrabold leading-[0.95] tracking-[-0.02em]">
                김민성
              </h1>
              <div className="mt-2.5 font-mono text-[13px] text-muted">
                1nnovator1105@gmail.com
              </div>
            </div>
            <button
              type="button"
              className="chip theme-chip shrink-0"
              onClick={toggleTheme}
              aria-label={theme === "light" ? "다크 모드로 전환" : "라이트 모드로 전환"}
            >
              ◐ 테마
            </button>
          </div>
        </div>

        <div className="pnet-graph relative h-[42vh] min-h-[300px] px-2 lg:h-auto lg:min-h-0 lg:flex-1">
          <PortfolioNet
            active={active}
            onNodeClick={scrollToNode}
            onEnter={setHoverId}
            onLeave={() => setHoverId(null)}
          />
        </div>

        <div className="net-legend px-6 pb-8 lg:px-10">
          <div className="mb-3 flex gap-4 font-mono text-[11px] text-muted">
            {LEGEND.map((l) => (
              <span key={l.label} className="flex items-center gap-1.5">
                <span
                  className="inline-block h-2 w-2 rounded-full"
                  style={{ background: l.color }}
                />
                {l.label}
              </span>
            ))}
          </div>
          <p className="m-0 hidden text-[13px] leading-[1.65] text-muted sm:block">
            노드를 클릭하면 오른쪽 카드로 이동하고, 스크롤하면 화면 중앙 카드와
            연결된 노드가 그래프에서 빛납니다.
          </p>
        </div>
      </div>

        {/* RIGHT page — scrolling résumé cards */}
        <div
          ref={panelRef}
          className="book-page-right cards-scroll w-full bg-surface lg:w-1/2 lg:h-full lg:overflow-y-auto"
        >
          <div
            ref={cardsRef}
            onMouseOver={onCardsOver}
            onMouseLeave={onCardsLeave}
            className="px-5 pb-[240px] pt-9 sm:px-8 lg:px-11 lg:pb-[440px] lg:pt-11"
          >
            <PortfolioCards />
          </div>
        </div>

        {/* center spine / gutter (desktop) */}
        <div className="book-spine hidden lg:block" aria-hidden="true" />
      </div>
    </div>
  );
};

export { Portfolio };
