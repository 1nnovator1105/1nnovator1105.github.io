/**
 * Indra's Net graph model.
 *
 * The resume is expressed as an interconnected net of jewels: the person at the
 * center, companies + values on a primary ring, and skills fanning outward from
 * each company. Positions are computed deterministically (no randomness) so
 * server and client render identically (SSR-safe, no hydration mismatch).
 */

export type NodeType = "self" | "company" | "skill" | "value";

export interface GraphNodeDef {
  id: string;
  type: NodeType;
  label: string;
  sub?: string;
  detail?: string;
  /** company id a skill belongs to (drives clustering) */
  parent?: string;
  /** resume section anchor for company nodes */
  slug?: string;
  /** primary-ring angle in degrees (companies + values) */
  angle?: number;
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

export const VIEW = { w: 1000, h: 720 } as const;
const CENTER = { x: 500, y: 360 };
const R_PRIMARY = 152; // companies + values ring
const R_SKILL = 130; // skills fan radius from their company
const SKILL_SPREAD = 52; // degrees each side of the outward direction

const RADIUS_BY_TYPE: Record<NodeType, number> = {
  self: 13,
  company: 10,
  value: 8,
  skill: 6,
};

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
  // self ↔ companies
  ...COMPANIES.map((c) => ({ source: "self", target: c.id })),
  // self ↔ values
  ...VALUES.map((v) => ({ source: "self", target: v.id })),
  // company ↔ skills
  ...SKILLS.map((s) => ({ source: s.parent as string, target: s.id })),
  // value ↔ related companies
  { source: "v-solve", target: "newneek" },
  { source: "v-solve", target: "side" },
  { source: "v-exp", target: "newneek" },
  { source: "v-proc", target: "newneek" },
  { source: "v-proc", target: "uinetworks" },
];

const deg2rad = (deg: number) => (deg * Math.PI) / 180;

/** Compute positioned nodes deterministically from the definitions above. */
export function computeGraph(): {
  nodes: PositionedNode[];
  links: GraphLink[];
} {
  const positioned: PositionedNode[] = [];

  positioned.push({
    ...SELF,
    x: CENTER.x,
    y: CENTER.y,
    r: RADIUS_BY_TYPE.self,
  });

  const primary = [...COMPANIES, ...VALUES];
  const primaryPos: Record<string, { x: number; y: number; angle: number }> = {};

  for (const node of primary) {
    const a = deg2rad(node.angle ?? 0);
    const x = CENTER.x + R_PRIMARY * Math.cos(a);
    const y = CENTER.y + R_PRIMARY * Math.sin(a);
    primaryPos[node.id] = { x, y, angle: node.angle ?? 0 };
    positioned.push({ ...node, x, y, r: RADIUS_BY_TYPE[node.type] });
  }

  // group skills by company to fan them outward
  const byCompany: Record<string, GraphNodeDef[]> = {};
  for (const skill of SKILLS) {
    const p = skill.parent as string;
    (byCompany[p] ||= []).push(skill);
  }

  for (const [companyId, skills] of Object.entries(byCompany)) {
    const base = primaryPos[companyId];
    if (!base) continue;
    const k = skills.length;
    skills.forEach((skill, i) => {
      const offset = k > 1 ? (i / (k - 1)) * 2 * SKILL_SPREAD - SKILL_SPREAD : 0;
      const a = deg2rad(base.angle + offset);
      const x = base.x + R_SKILL * Math.cos(a);
      const y = base.y + R_SKILL * Math.sin(a);
      positioned.push({ ...skill, x, y, r: RADIUS_BY_TYPE.skill });
    });
  }

  return { nodes: positioned, links: GRAPH_LINKS };
}

/** Deterministic starfield (seeded LCG — identical on server + client). */
export function makeStars(count: number): {
  x: number;
  y: number;
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
      x: Math.round(rand() * VIEW.w),
      y: Math.round(rand() * VIEW.h),
      r: 0.6 + rand() * 1.4,
      dur: 3 + rand() * 4,
      delay: rand() * 4,
    });
  }
  return stars;
}
