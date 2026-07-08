/**
 * Node-link graph model for the Portfolio (2a) design.
 * Fixed coordinates in an 800×440 viewBox (ported from Portfolio.dc.html).
 */

export type NodeType = "self" | "company" | "skill" | "value";

export interface GNode {
  id: string;
  label: string;
  type: NodeType;
  x: number;
  y: number;
}

export const VIEW = { w: 800, h: 440 } as const;

export const NODES: GNode[] = [
  { id: "self", label: "김민성", type: "self", x: 400, y: 225 },
  { id: "newneek", label: "뉴닉", type: "company", x: 235, y: 150 },
  { id: "ui", label: "유아이네트웍스", type: "company", x: 575, y: 150 },
  { id: "side", label: "사이드프로젝트", type: "company", x: 585, y: 330 },
  { id: "rn", label: "React Native", type: "skill", x: 120, y: 95 },
  { id: "next", label: "Next.js", type: "skill", x: 300, y: 70 },
  { id: "react", label: "React", type: "skill", x: 150, y: 225 },
  { id: "lang", label: "LangChain", type: "skill", x: 110, y: 325 },
  { id: "ts", label: "TypeScript", type: "skill", x: 320, y: 320 },
  { id: "spring", label: "Spring", type: "skill", x: 665, y: 80 },
  { id: "ol", label: "OpenLayers", type: "skill", x: 720, y: 215 },
  { id: "gis", label: "PostGIS", type: "skill", x: 690, y: 290 },
  { id: "java", label: "Java", type: "skill", x: 555, y: 65 },
  { id: "django", label: "Django", type: "skill", x: 62, y: 280 },
  { id: "firebase", label: "Firebase", type: "skill", x: 48, y: 150 },
  { id: "aws", label: "AWS", type: "skill", x: 210, y: 400 },
  { id: "v1", label: "문제해결", type: "value", x: 430, y: 375 },
  { id: "v2", label: "실행력", type: "value", x: 300, y: 390 },
  { id: "v3", label: "효율", type: "value", x: 540, y: 388 },
];

export const LINKS: [string, string][] = [
  ["self", "newneek"],
  ["self", "ui"],
  ["self", "side"],
  ["self", "v1"],
  ["self", "v2"],
  ["self", "v3"],
  ["newneek", "rn"],
  ["newneek", "next"],
  ["newneek", "react"],
  ["newneek", "lang"],
  ["newneek", "ts"],
  ["newneek", "django"],
  ["newneek", "firebase"],
  ["newneek", "aws"],
  ["ui", "spring"],
  ["ui", "ol"],
  ["ui", "gis"],
  ["ui", "java"],
  ["side", "next"],
  ["side", "react"],
  ["v1", "newneek"],
  ["v3", "ui"],
  ["v2", "side"],
];

export const SKILL_MAP: [string, string][] = [
  ["React Native", "rn"],
  ["Next.js", "next"],
  ["React", "react"],
  ["LangChain", "lang"],
  ["TypeScript", "ts"],
  ["Spring", "spring"],
  ["OpenLayers", "ol"],
  ["PostGIS", "gis"],
  ["Java", "java"],
  ["Django", "django"],
  ["Firebase", "firebase"],
  ["AWS", "aws"],
  ["S3", "aws"],
];

export const COMPANY_ID: Record<string, string> = {
  뉴닉: "newneek",
  유아이네트웍스: "ui",
  사이드프로젝트: "side",
};

export const POINTS: string[] = [
  "✨ 제품을 이해하고, 기술이라는 도구를 활용하여 문제를 해결해요.",
  "✨ 빠르게 실험하고 검증하는 실행력을 중요하게 생각해요.",
  "✨ 더 나은 효율을 위해 고민하며 프로세스를 개선해 나가요.",
];

const NODE_BY_ID: Record<string, GNode> = Object.fromEntries(
  NODES.map((n) => [n.id, n])
);
export const getNode = (id: string): GNode | undefined => NODE_BY_ID[id];

/**
 * Does a tech-stack string contain this skill label as a distinct token?
 * Partial so "Django Framework"/"SpringBoot"/"WebView(Next.js 기반)"/"AWS Lambda"
 * match, but the char right after the label must not be a lowercase letter, so
 * "Java" does NOT match "Javascript".
 */
const labelMatches = (stack: string, label: string): boolean => {
  const i = stack.indexOf(label);
  if (i === -1) return false;
  const after = stack[i + label.length];
  return after === undefined || !/[a-z]/.test(after);
};

/** Skill ids matched from a task item's tech-stack labels (longest label wins). */
export function matchSkills(stacks?: string[]): string[] {
  if (!stacks) return [];
  const ids = new Set<string>();
  for (const stack of stacks) {
    let best: string | null = null;
    let bestLen = -1;
    for (const [label, id] of SKILL_MAP) {
      if (label.length > bestLen && labelMatches(stack, label)) {
        best = id;
        bestLen = label.length;
      }
    }
    if (best) ids.add(best);
  }
  return [...ids];
}

/** A node plus its directly connected nodes. */
export function neighbors(id: string): Set<string> {
  const set = new Set<string>([id]);
  for (const [a, b] of LINKS) {
    if (a === id) set.add(b);
    if (b === id) set.add(a);
  }
  return set;
}
