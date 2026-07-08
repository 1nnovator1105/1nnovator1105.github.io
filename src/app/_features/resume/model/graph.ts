/**
 * Indra's Net graph model.
 *
 * The resume is expressed as an interconnected net: the person at the center,
 * companies + values on a primary ring, and skills fanning outward from each
 * company. The layout is computed in the container's pixel space (elliptical
 * ring so it fills both landscape and portrait), so it adapts to any screen —
 * on mobile it becomes a tall constellation instead of a tiny centered blob.
 *
 * Positions are a pure function of (w, h) — deterministic, so SSR and the first
 * client render (with default dims) agree; a ResizeObserver re-lays-out after.
 */

export type NodeType = "self" | "company" | "skill" | "value";

export interface GraphNodeDef {
  id: string;
  type: NodeType;
  label: string;
  sub?: string;
  detail?: string;
  parent?: string; // company id a skill belongs to
  slug?: string; // resume section anchor for company nodes
  angle?: number; // primary-ring angle in degrees (companies + values)
}

export interface GraphLink {
  source: string;
  target: string;
}

export interface PositionedNode extends GraphNodeDef {
  x: number;
  y: number;
  r: number;
}

export interface Layout {
  nodes: PositionedNode[];
  links: GraphLink[];
  minWH: number;
}

export const DEFAULT_DIMS = { w: 1000, h: 640 } as const;

const clamp = (v: number, lo: number, hi: number) =>
  Math.max(lo, Math.min(hi, v));

/** Company nodes — `slug` matches the anchor id of each resume section. */
const COMPANIES: GraphNodeDef[] = [
  {
    id: "newneek",
    type: "company",
    label: "뉴닉",
    sub: "Front-End Engineer · 2022.10–재직 중",
    slug: "company-newneek",
    angle: -90,
    detail:
      "AI 챗봇·댓글 검증, 아티클 음성화, WebView 전환, Fastlane 배포 자동화 등 서비스 고도화와 운영 효율화를 주도.",
  },
  {
    id: "uinetworks",
    type: "company",
    label: "유아이네트웍스",
    sub: "Full-Stack Engineer · 2019.01–2022.06",
    slug: "company-uinetworks",
    angle: 30,
    detail:
      "GIS 기반 교통·모빌리티 시스템을 풀스택으로 구축. 공간 쿼리 최적화와 데이터 연계 자동화를 담당.",
  },
  {
    id: "side",
    type: "company",
    label: "사이드프로젝트",
    sub: "Drippin · Biscat · 2024",
    slug: "company-side",
    angle: 150,
    detail: "MVP 리드 개발 및 기술 파트 작성. 빠른 프로덕트 구현을 실험.",
  },
];

const VALUES: GraphNodeDef[] = [
  {
    id: "v-solve",
    type: "value",
    label: "문제 해결",
    angle: 210,
    detail: "제품을 이해하고, 기술이라는 도구를 활용하여 문제를 해결해요.",
  },
  {
    id: "v-exp",
    type: "value",
    label: "실험·실행력",
    angle: -30,
    detail: "빠르게 실험하고 검증하는 실행력을 중요하게 생각해요.",
  },
  {
    id: "v-proc",
    type: "value",
    label: "프로세스 개선",
    angle: 90,
    detail: "더 나은 효율을 위해 고민하며 프로세스를 개선·자동화해요.",
  },
];

const SKILLS: GraphNodeDef[] = [
  // 뉴닉
  { id: "s-rn", type: "skill", label: "React Native", parent: "newneek", detail: "앱 개발 · WebView 전환 · 코드푸시/OTA" },
  { id: "s-next", type: "skill", label: "Next.js", parent: "newneek", detail: "웹·WebView·프로토타이핑 전용 서버" },
  { id: "s-ai", type: "skill", label: "LangChain · AI", parent: "newneek", detail: "AI 챗봇·댓글 검증·아티클 요약 자동화" },
  { id: "s-ts", type: "skill", label: "TypeScript", parent: "newneek", detail: "앱·웹 공통 타입 안정성" },
  { id: "s-ci", type: "skill", label: "CI/CD · Fastlane", parent: "newneek", detail: "RN 빌드·배포 자동화, 무중단 배포" },
  { id: "s-fb", type: "skill", label: "Firebase", parent: "newneek", detail: "Remote Config로 앱 UI 실시간 제어" },
  // 유아이네트웍스
  { id: "s-spring", type: "skill", label: "Spring · Java", parent: "uinetworks", detail: "백엔드 API · 데이터 연계 프로그램" },
  { id: "s-js", type: "skill", label: "JavaScript", parent: "uinetworks", detail: "지도·차트 기반 대시보드" },
  { id: "s-ol", type: "skill", label: "OpenLayers", parent: "uinetworks", detail: "웹 GIS 저작·시각화" },
  { id: "s-gis", type: "skill", label: "PostGIS", parent: "uinetworks", detail: "공간 쿼리 최적화 · Geofence" },
  // 사이드프로젝트
  { id: "s-product", type: "skill", label: "Product · MVP", parent: "side", detail: "MVP 리드 개발" },
  { id: "s-fullstack", type: "skill", label: "Full-Stack", parent: "side", detail: "프론트~백엔드 빠른 구현" },
];

const SELF: GraphNodeDef = {
  id: "self",
  type: "self",
  label: "김민성",
  sub: "Front-End Engineer",
  detail:
    "풀스택으로 시작해 현재는 프론트엔드 개발자로 경력을 이어가는 7년 차 개발자. 각 매듭이 서로를 비추듯, 경험과 기술이 촘촘히 연결되어 있어요.",
};

export const GRAPH_LINKS: GraphLink[] = [
  ...COMPANIES.map((c) => ({ source: "self", target: c.id })),
  ...VALUES.map((v) => ({ source: "self", target: v.id })),
  ...SKILLS.map((s) => ({ source: s.parent as string, target: s.id })),
  { source: "v-solve", target: "newneek" },
  { source: "v-solve", target: "side" },
  { source: "v-exp", target: "newneek" },
  { source: "v-proc", target: "newneek" },
  { source: "v-proc", target: "uinetworks" },
];

const deg2rad = (deg: number) => (deg * Math.PI) / 180;

/** Compute positioned nodes in the container's pixel space (adapts to w × h). */
export function computeGraph(w: number, h: number): Layout {
  const cx = w / 2;
  const cy = h / 2;
  const minWH = Math.min(w, h);
  const portrait = h > w * 1.05;

  // elliptical primary ring fills both orientations
  const Rx = w * (portrait ? 0.27 : 0.31);
  const Ry = h * (portrait ? 0.3 : 0.31);
  const skillR = minWH * (portrait ? 0.15 : 0.19);
  const spread = portrait ? 36 : 50; // degrees each side of the outward dir

  const R = {
    self: clamp(minWH * 0.022, 9, 16),
    company: clamp(minWH * 0.017, 7, 12),
    value: clamp(minWH * 0.014, 6, 10),
    skill: clamp(minWH * 0.0115, 4.5, 8.5),
  };

  const pad = 6;
  const cX = (x: number, rr: number) => clamp(x, rr + pad, w - rr - pad);
  const cY = (y: number, rr: number) => clamp(y, rr + pad, h - rr - pad);

  const positioned: PositionedNode[] = [];

  positioned.push({ ...SELF, x: cx, y: cy, r: R.self });

  const primaryPos: Record<string, { x: number; y: number }> = {};
  for (const node of [...COMPANIES, ...VALUES]) {
    const a = deg2rad(node.angle ?? 0);
    const x = cX(cx + Rx * Math.cos(a), R[node.type]);
    const y = cY(cy + Ry * Math.sin(a), R[node.type]);
    primaryPos[node.id] = { x, y };
    positioned.push({ ...node, x, y, r: R[node.type] });
  }

  const byCompany: Record<string, GraphNodeDef[]> = {};
  for (const skill of SKILLS) {
    const p = skill.parent as string;
    (byCompany[p] ||= []).push(skill);
  }

  for (const [companyId, skills] of Object.entries(byCompany)) {
    const base = primaryPos[companyId];
    if (!base) continue;
    // outward direction = away from the center (works with the ellipse)
    const outward = Math.atan2(base.y - cy, base.x - cx);
    const k = skills.length;
    skills.forEach((skill, i) => {
      const off = k > 1 ? (i / (k - 1)) * 2 * spread - spread : 0;
      const a = outward + deg2rad(off);
      const x = cX(base.x + skillR * Math.cos(a), R.skill);
      const y = cY(base.y + skillR * Math.sin(a), R.skill);
      positioned.push({ ...skill, x, y, r: R.skill });
    });
  }

  return { nodes: positioned, links: GRAPH_LINKS, minWH };
}

/**
 * Deterministic starfield in normalized [0,1] coords (seeded LCG). Normalized so
 * the pattern stays stable when the container resizes — multiply by w/h to draw.
 */
export function makeStars(count: number): {
  nx: number;
  ny: number;
  r: number;
  dur: number;
  delay: number;
}[] {
  let seed = 1337;
  const rand = () => {
    seed = (seed * 1103515245 + 12345) & 0x7fffffff;
    return seed / 0x7fffffff;
  };
  const stars = [];
  for (let i = 0; i < count; i++) {
    stars.push({
      nx: rand(),
      ny: rand(),
      r: 0.6 + rand() * 1.3,
      dur: 3 + rand() * 4,
      delay: rand() * 4,
    });
  }
  return stars;
}
