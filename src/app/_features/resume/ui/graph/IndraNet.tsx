"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import {
  computeGraph,
  DEFAULT_DIMS,
  makeStars,
  type NodeType,
  type PositionedNode,
} from "../../model/graph";

const TYPE_VAR: Record<NodeType, string> = {
  self: "var(--c-self)",
  company: "var(--c-company)",
  skill: "var(--c-skill)",
  value: "var(--c-value)",
};

const TYPE_LABEL: Record<NodeType, string> = {
  self: "나",
  company: "회사",
  skill: "기술",
  value: "가치",
};

const AMP_BY_TYPE: Record<NodeType, number> = {
  self: 1.6,
  company: 3,
  value: 3.6,
  skill: 5,
};

const clamp = (v: number, lo: number, hi: number) =>
  Math.max(lo, Math.min(hi, v));

const IndraNet = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [dims, setDims] = useState<{ w: number; h: number }>({
    w: DEFAULT_DIMS.w,
    h: DEFAULT_DIMS.h,
  });

  // Measure the container so the graph lays out in real pixel space (adapts to
  // mobile portrait vs desktop landscape).
  useEffect(() => {
    const el = containerRef.current;
    if (!el || typeof ResizeObserver === "undefined") return;
    const ro = new ResizeObserver((entries) => {
      const cr = entries[0].contentRect;
      const w = Math.round(cr.width);
      const h = Math.round(cr.height);
      if (w > 0 && h > 0) setDims({ w, h });
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const { nodes, links, minWH } = useMemo(
    () => computeGraph(dims.w, dims.h),
    [dims.w, dims.h]
  );
  const stars = useMemo(() => makeStars(46), []);
  const nodeById = useMemo(() => {
    const m: Record<string, PositionedNode> = {};
    nodes.forEach((n) => (m[n.id] = n));
    return m;
  }, [nodes]);

  const ampScale = clamp(minWH / 700, 0.5, 1.15);
  const labelSize = (t: NodeType) =>
    t === "self"
      ? clamp(minWH * 0.03, 12, 22)
      : t === "company"
      ? clamp(minWH * 0.024, 11, 17)
      : clamp(minWH * 0.02, 9.5, 13);

  const drift = useMemo(() => {
    const m: Record<string, { amp: number; speed: number; phase: number }> = {};
    nodes.forEach((n, i) => {
      m[n.id] = {
        amp: AMP_BY_TYPE[n.type] * ampScale,
        speed: 0.22 + (i % 5) * 0.045,
        phase: i * 0.7,
      };
    });
    return m;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [nodes, ampScale]);

  const nodeEls = useRef(new Map<string, SVGGElement>());
  const linkEls = useRef(new Map<number, SVGLineElement>());

  const [hoverId, setHoverId] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const focusId = hoverId ?? selectedId;

  const connected = useMemo(() => {
    if (!focusId) return null;
    const set = new Set<string>([focusId]);
    links.forEach((l) => {
      if (l.source === focusId) set.add(l.target);
      if (l.target === focusId) set.add(l.source);
    });
    return set;
  }, [focusId, links]);

  // Gentle drift — nodes bob; links follow. Updates the DOM directly (refs) so
  // hover re-renders don't fight per-frame geometry.
  useEffect(() => {
    const reduce = window.matchMedia?.(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (reduce) return;

    let raf = 0;
    let startTs = 0;
    const loop = (now: number) => {
      if (!startTs) startTs = now;
      const t = (now - startTs) / 1000;
      const cur: Record<string, { x: number; y: number }> = {};
      for (const n of nodes) {
        const p = drift[n.id];
        const dx = p.amp * Math.sin(t * p.speed + p.phase);
        const dy = p.amp * Math.cos(t * p.speed * 0.92 + p.phase * 1.3);
        const x = n.x + dx;
        const y = n.y + dy;
        cur[n.id] = { x, y };
        const el = nodeEls.current.get(n.id);
        if (el) el.setAttribute("transform", `translate(${x} ${y})`);
      }
      links.forEach((l, i) => {
        const el = linkEls.current.get(i);
        const s = cur[l.source];
        const tg = cur[l.target];
        if (el && s && tg) {
          el.setAttribute("x1", String(s.x));
          el.setAttribute("y1", String(s.y));
          el.setAttribute("x2", String(tg.x));
          el.setAttribute("y2", String(tg.y));
        }
      });
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [nodes, links, drift]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedId(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const selected = selectedId ? nodeById[selectedId] : null;

  const scrollToSection = (slug?: string) => {
    if (!slug) return;
    document
      .getElementById(slug)
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
    setSelectedId(null);
  };

  return (
    <div
      ref={containerRef}
      className="indra-hero h-[60vh] min-h-[420px] max-h-[560px] sm:h-[74vh] sm:min-h-[500px] sm:max-h-[820px]"
    >
      <svg
        className="indra-svg"
        viewBox={`0 0 ${dims.w} ${dims.h}`}
        preserveAspectRatio="xMidYMid meet"
        role="img"
        aria-label="김민성의 경력·기술·가치를 노드-링크로 표현한 인드라망 그래프"
        data-active={focusId ? "true" : "false"}
        onClick={(e) => {
          if (e.target === e.currentTarget) setSelectedId(null);
        }}
      >
        {/* background stars */}
        <g>
          <rect
            x={0}
            y={0}
            width={dims.w}
            height={dims.h}
            fill="transparent"
            onClick={() => setSelectedId(null)}
          />
          {stars.map((s, i) => (
            <circle
              key={`star-${i}`}
              className="indra-star"
              cx={s.nx * dims.w}
              cy={s.ny * dims.h}
              r={s.r}
              style={
                {
                  "--tw-dur": `${s.dur}s`,
                  "--tw-delay": `${s.delay}s`,
                } as React.CSSProperties
              }
            />
          ))}
        </g>

        {/* links (the net) */}
        <g>
          {links.map((l, i) => {
            const s = nodeById[l.source];
            const tg = nodeById[l.target];
            if (!s || !tg) return null;
            const active =
              focusId != null &&
              (l.source === focusId || l.target === focusId);
            return (
              <line
                key={`link-${i}`}
                ref={(el) => {
                  if (el) linkEls.current.set(i, el);
                  else linkEls.current.delete(i);
                }}
                className={`indra-link${active ? " is-active" : ""}`}
                x1={s.x}
                y1={s.y}
                x2={tg.x}
                y2={tg.y}
              />
            );
          })}
        </g>

        {/* nodes (the knots) */}
        <g>
          {nodes.map((n) => {
            const isActive = connected ? connected.has(n.id) : false;
            const cls = [
              "indra-node",
              `is-${n.type}`,
              isActive ? "is-active" : "",
            ]
              .filter(Boolean)
              .join(" ");
            const hitR = Math.max(n.r * 2.4, 18);
            return (
              <g
                key={n.id}
                ref={(el) => {
                  if (el) nodeEls.current.set(n.id, el);
                  else nodeEls.current.delete(n.id);
                }}
                className={cls}
                transform={`translate(${n.x} ${n.y})`}
                style={{ ["--jewel" as string]: TYPE_VAR[n.type] }}
                role="button"
                tabIndex={0}
                aria-label={`${TYPE_LABEL[n.type]}: ${n.label}`}
                onPointerEnter={() => setHoverId(n.id)}
                onPointerLeave={() => setHoverId(null)}
                onFocus={() => setHoverId(n.id)}
                onBlur={() => setHoverId(null)}
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedId((prev) => (prev === n.id ? null : n.id));
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    setSelectedId((prev) => (prev === n.id ? null : n.id));
                  }
                }}
              >
                {/* enlarged invisible tap target (mobile-friendly) */}
                <circle r={hitR} fill="none" style={{ pointerEvents: "all" }} />
                {n.type === "self" && (
                  <circle className="pulse" cx={0} cy={0} r={n.r + 4} />
                )}
                <circle className="halo" cx={0} cy={0} r={n.r * 2.6} />
                <circle className="knot" cx={0} cy={0} r={n.r} />
                <text
                  className="label"
                  x={0}
                  y={n.r + labelSize(n.type) + 3}
                  textAnchor="middle"
                  fontSize={labelSize(n.type)}
                  fontWeight={n.type === "self" ? 700 : 400}
                >
                  {n.label}
                </text>
              </g>
            );
          })}
        </g>
      </svg>

      {/* detail panel */}
      <div
        className={`node-panel${selected ? " open" : ""}`}
        role="dialog"
        aria-hidden={selected ? "false" : "true"}
      >
        {selected && (
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-3">
              <span
                className="inline-block rounded-full"
                style={{
                  width: 11,
                  height: 11,
                  background: TYPE_VAR[selected.type],
                }}
              />
              <span className="text-lg font-light text-muted">
                {TYPE_LABEL[selected.type]}
              </span>
              <button
                type="button"
                onClick={() => setSelectedId(null)}
                aria-label="닫기"
                className="ml-auto text-2xl leading-none text-muted transition-transform hover:scale-125"
              >
                ×
              </button>
            </div>
            <div className="text-3xl font-bold text-body">{selected.label}</div>
            {selected.sub && (
              <div className="text-lg font-light text-muted">{selected.sub}</div>
            )}
            {selected.detail && (
              <p className="text-xl font-light text-body leading-relaxed">
                {selected.detail}
              </p>
            )}
            {selected.type === "company" && selected.slug && (
              <button
                type="button"
                onClick={() => scrollToSection(selected.slug)}
                className="mt-1 self-start rounded-full border border-line px-4 py-1.5 text-lg text-body transition-all hover:border-accent hover:text-accent"
              >
                이력서에서 자세히 보기 ↓
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export { IndraNet };
