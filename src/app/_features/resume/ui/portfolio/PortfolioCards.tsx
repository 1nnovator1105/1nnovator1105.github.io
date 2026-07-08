import { RESUME_DATA } from "../../model/data";
import { COMPANY_ID, matchSkills, POINTS } from "../../model/graph";
import type {
  DescriptionListItemType,
  TaskSectionItemType,
} from "../../model/types";

interface TechStack {
  title: string;
  description: string;
}
interface Company {
  company: string;
  position: string;
  period: string;
  techStacks?: TechStack[];
  tasks: { section: string; items: TaskSectionItemType[] }[];
}

const RESUME = RESUME_DATA as unknown as Company[];

const mono = "font-mono text-muted";

/** Section labels in the source data carry <br/>/&nbsp; for the old layout. */
const cleanSection = (s: string) =>
  s
    .replace(/<[^>]*>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/\s+/g, " ")
    .trim();

const cardBase: React.CSSProperties = {
  border: "1px solid var(--line)",
  borderRadius: 14,
  background: "var(--bg)",
};

function DescItem({ d }: { d: DescriptionListItemType }) {
  const liStyle: React.CSSProperties = {
    fontSize: 15.5,
    lineHeight: 1.62,
    color: "var(--text)",
  };
  if (typeof d === "string") return <li style={liStyle}>{d}</li>;
  const label = d.link ? (
    <a href={d.link} target="_blank" rel="noreferrer">
      {d.item}
    </a>
  ) : (
    d.item
  );
  return (
    <li style={liStyle}>
      {label}
      {d.subItems && (
        <ul
          style={{
            listStyle: "circle",
            paddingLeft: 20,
            margin: "6px 0 0",
            display: "flex",
            flexDirection: "column",
            gap: 5,
          }}
        >
          {d.subItems.map((s, k) => (
            <li
              key={k}
              style={{ fontSize: 14.5, lineHeight: 1.55, color: "var(--muted)" }}
            >
              {s}
            </li>
          ))}
        </ul>
      )}
    </li>
  );
}

function TaskCard({
  it,
  sectionName,
  cid,
  ids,
}: {
  it: TaskSectionItemType;
  sectionName: string;
  cid: string;
  ids: string[];
}) {
  return (
    <div
      className="pcard"
      data-card="1"
      data-node={cid}
      data-skills={ids.join(" ")}
      style={{ ...cardBase, padding: "22px 24px" }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "baseline",
          gap: 12,
          marginBottom: 10,
        }}
      >
        {sectionName ? (
          <span
            className="font-mono"
            style={{ fontSize: 11, letterSpacing: ".06em", color: "var(--accent)" }}
          >
            {sectionName}
          </span>
        ) : (
          <span />
        )}
        {it.period && (
          <span
            className={mono}
            style={{ fontSize: 11, whiteSpace: "nowrap" }}
          >
            {it.period}
          </span>
        )}
      </div>

      {it.link ? (
        <a
          href={it.link}
          target="_blank"
          rel="noreferrer"
          style={{ fontSize: 17, fontWeight: 600, lineHeight: 1.4 }}
        >
          {it.title}
        </a>
      ) : (
        <div style={{ fontSize: 17, fontWeight: 600, lineHeight: 1.4 }}>
          {it.title}
        </div>
      )}

      {it.techStacks && (
        <div
          style={{
            marginTop: 9,
            display: "flex",
            flexWrap: "wrap",
            gap: 6,
          }}
        >
          {it.techStacks.map((s, i) => (
            <span
              key={i}
              className="font-mono"
              style={{
                fontSize: 11,
                color: "var(--muted)",
                border: "1px solid var(--line)",
                borderRadius: 999,
                padding: "2px 9px",
              }}
            >
              {s}
            </span>
          ))}
        </div>
      )}

      <ul
        style={{
          listStyle: "disc",
          paddingLeft: 18,
          margin: "14px 0 0",
          display: "flex",
          flexDirection: "column",
          gap: 7,
        }}
      >
        {it.descriptionList.map((d, i) => (
          <DescItem key={i} d={d} />
        ))}
      </ul>
    </div>
  );
}

function CompanyCard({
  c,
  cid,
  ids,
}: {
  c: Company;
  cid: string;
  ids: string[];
}) {
  return (
    <div
      className="pcard"
      data-card="1"
      data-node={cid}
      data-skills={ids.join(" ")}
      style={{
        ...cardBase,
        borderLeft: "3px solid var(--accent)",
        padding: "24px 26px",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "baseline",
          gap: 12,
        }}
      >
        <div style={{ fontSize: 26, fontWeight: 800, letterSpacing: "-.01em" }}>
          {c.company}
        </div>
        <div className={mono} style={{ fontSize: 13, whiteSpace: "nowrap" }}>
          {c.period}
        </div>
      </div>
      <div style={{ fontSize: 14, color: "var(--muted)", marginTop: 4 }}>
        {c.position}
      </div>
      {c.techStacks && (
        <div
          style={{
            marginTop: 16,
            display: "flex",
            flexDirection: "column",
            gap: 6,
            borderTop: "1px solid var(--line)",
            paddingTop: 14,
          }}
        >
          {c.techStacks.map((t) => (
            <div key={t.title} style={{ display: "flex", gap: 12 }}>
              <div
                className="font-mono"
                style={{
                  fontSize: 11,
                  color: "var(--accent)",
                  width: 78,
                  flexShrink: 0,
                }}
              >
                {t.title}
              </div>
              <div style={{ fontSize: 13.5 }}>{t.description}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

const companySkillIds = (c: Company): string[] => {
  const set = new Set<string>();
  c.tasks.forEach((s) =>
    s.items.forEach((it) => matchSkills(it.techStacks).forEach((id) => set.add(id)))
  );
  return [...set];
};

const PortfolioCards = () => {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
      <div
        className="pcard"
        data-card="1"
        data-node="self"
        data-skills=""
        style={{ ...cardBase, padding: "24px 26px" }}
      >
        <div style={{ fontSize: 19, lineHeight: 1.7, marginBottom: 14 }}>
          안녕하세요 👋
          <br />
          풀스택 개발자로 시작해서 현재는 프론트엔드 개발자로 경력을 이어 나가고
          있는 7년 차 개발자 김민성입니다
        </div>
        <ul
          style={{
            listStyle: "none",
            padding: 0,
            margin: 0,
            display: "flex",
            flexDirection: "column",
            gap: 8,
            fontSize: 15.5,
          }}
        >
          {POINTS.map((p) => (
            <li key={p}>{p}</li>
          ))}
        </ul>
      </div>

      {RESUME.map((c) => {
        const cid = COMPANY_ID[c.company];
        const ids = companySkillIds(c);
        return (
          <div
            key={c.company}
            style={{ display: "flex", flexDirection: "column", gap: 18 }}
          >
            <CompanyCard c={c} cid={cid} ids={ids} />
            {c.tasks.map((s) =>
              s.items.map((it) => (
                <TaskCard
                  key={`${c.company}-${s.section}-${it.title}`}
                  it={it}
                  sectionName={cleanSection(s.section)}
                  cid={cid}
                  ids={matchSkills(it.techStacks)}
                />
              ))
            )}
          </div>
        );
      })}
    </div>
  );
};

export { PortfolioCards };
