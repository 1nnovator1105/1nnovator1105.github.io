"use client";

import { LINKS, NODES, VIEW, type NodeType } from "../../model/graph";

interface PortfolioNetProps {
  active: Set<string>;
  onNodeClick: (id: string) => void;
  onEnter: (id: string) => void;
  onLeave: () => void;
}

const radiusFor = (t: NodeType) => (t === "self" ? 9 : t === "company" ? 6.5 : 4.5);
const fontFor = (t: NodeType) => (t === "self" ? 15 : t === "company" ? 13 : 11);
const fillFor = (t: NodeType) =>
  t === "self"
    ? "var(--jewel-self)"
    : t === "company"
    ? "var(--jewel-self)"
    : t === "skill"
    ? "var(--jewel-skill)"
    : "var(--jewel-value)";

/**
 * The node-link graph (fixed 800×440 layout from Portfolio.dc.html). The `active`
 * set — driven by hover or by the résumé card currently centered — lights up its
 * nodes and links; everything else dims. Non-value nodes scroll to their card.
 */
const PortfolioNet = ({
  active,
  onNodeClick,
  onEnter,
  onLeave,
}: PortfolioNetProps) => {
  return (
    <svg
      className="pnet"
      viewBox={`0 0 ${VIEW.w} ${VIEW.h}`}
      preserveAspectRatio="xMidYMid meet"
      role="img"
      aria-label="경력·기술·가치를 잇는 노드-링크 그래프"
    >
      {LINKS.map(([a, b], i) => {
        const A = NODES.find((n) => n.id === a)!;
        const C = NODES.find((n) => n.id === b)!;
        const act = active.has(a) && active.has(b);
        return (
          <line
            key={`l${i}`}
            className="pnet-link"
            x1={A.x}
            y1={A.y}
            x2={C.x}
            y2={C.y}
            stroke={act ? "var(--accent)" : "var(--line-strong)"}
            strokeWidth={act ? 1.8 : 1}
            opacity={act ? 0.95 : 0.16}
          />
        );
      })}

      {NODES.map((n) => {
        const on = active.has(n.id);
        const r = radiusFor(n.type);
        const fill = on ? "var(--accent)" : fillFor(n.type);
        const showLabel = n.type === "self" || n.type === "company" || on;
        const clickable = n.type !== "value";
        const hitR = Math.max(r * 2.6, 16);
        return (
          <g
            key={n.id}
            className="pnet-node"
            opacity={on ? 1 : 0.3}
            style={{ cursor: clickable ? "pointer" : "default" }}
            role={clickable ? "button" : undefined}
            tabIndex={clickable ? 0 : undefined}
            aria-label={clickable ? `${n.label} — 이력서로 이동` : n.label}
            onMouseEnter={() => onEnter(n.id)}
            onMouseLeave={onLeave}
            onFocus={() => onEnter(n.id)}
            onBlur={onLeave}
            onClick={clickable ? () => onNodeClick(n.id) : undefined}
            onKeyDown={
              clickable
                ? (e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      onNodeClick(n.id);
                    }
                  }
                : undefined
            }
          >
            <circle
              cx={n.x}
              cy={n.y}
              r={hitR}
              fill="none"
              style={{ pointerEvents: "all" }}
            />
            {n.type === "self" && (
              <circle
                className="net-pulse"
                cx={n.x}
                cy={n.y}
                r={r}
                fill="none"
                stroke="var(--accent)"
                strokeWidth={1}
              />
            )}
            <circle
              className="pnet-dot"
              cx={n.x}
              cy={n.y}
              r={r}
              fill={fill}
              stroke="var(--bg)"
              strokeWidth={1.4}
              style={on ? { filter: "drop-shadow(0 0 6px var(--accent))" } : undefined}
            />
            <text
              x={n.x}
              y={n.y - (r + 7)}
              textAnchor="middle"
              fontSize={fontFor(n.type)}
              fontWeight={n.type === "self" ? 700 : 500}
              fill="var(--text)"
              opacity={showLabel ? (on ? 1 : 0.78) : 0}
              style={{ transition: "opacity .35s", pointerEvents: "none" }}
              paintOrder="stroke"
              stroke="var(--bg)"
              strokeWidth={3.4}
            >
              {n.label}
            </text>
          </g>
        );
      })}
    </svg>
  );
};

export { PortfolioNet };
