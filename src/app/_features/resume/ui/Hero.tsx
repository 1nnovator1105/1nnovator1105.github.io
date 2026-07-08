import Image from "next/image";
import Link from "next/link";
import { GithubIcon, ThemeToggle, TistoryIcon } from "../../shared/ui";
import { IndraNet } from "./graph";

const LEGEND: { label: string; varName: string }[] = [
  { label: "회사", varName: "var(--c-company)" },
  { label: "기술", varName: "var(--c-skill)" },
  { label: "가치", varName: "var(--c-value)" },
];

const Hero = () => {
  return (
    <section className="flex w-full flex-col gap-6">
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="relative size-16 shrink-0 overflow-hidden rounded-full ring-2 ring-[var(--line)] anim-fade-in [--d:80ms] lg:size-24">
            <Image
              src="/images/face.png"
              alt="김민성"
              fill
              className="object-cover"
            />
          </div>
          <div className="flex flex-col gap-2">
            {/* fade on the wrapper, sheen on the text — they must not share the
                CSS `animation` property or one overrides the other. */}
            <div className="anim-fade-up [--d:0ms]">
              <h1 className="text-5xl lg:text-8xl font-bold name-sheen">
                김민성
              </h1>
            </div>
            <div className="text-2xl lg:text-4xl font-regular text-muted anim-fade-up [--d:120ms]">
              Front-End Engineer
            </div>
          </div>
        </div>

        <div className="flex shrink-0 items-center gap-3 anim-fade-in [--d:200ms]">
          <Link
            href="https://github.com/1nnovator1105"
            target="_blank"
            aria-label="GitHub"
            className="hero-chip hidden rounded-full p-2.5 transition-transform duration-200 hover:scale-110 sm:inline-flex"
          >
            <GithubIcon className="size-7" />
          </Link>
          <Link
            href="https://1nnovator.tistory.com/"
            target="_blank"
            aria-label="Tistory"
            className="hero-chip hidden rounded-full p-2.5 transition-transform duration-200 hover:scale-110 sm:inline-flex"
          >
            <TistoryIcon className="size-7" />
          </Link>
          <ThemeToggle />
        </div>
      </div>

      <div className="relative anim-fade-in [--d:280ms]">
        <IndraNet />

        {/* legend */}
        <div className="hero-chip absolute bottom-4 left-4 flex items-center gap-4 rounded-full px-4 py-2 text-base text-muted">
          {LEGEND.map((item) => (
            <span key={item.label} className="flex items-center gap-1.5">
              <span
                className="inline-block size-2.5 rounded-full"
                style={{
                  background: item.varName,
                  boxShadow: `0 0 8px ${item.varName}`,
                }}
              />
              {item.label}
            </span>
          ))}
        </div>

        {/* scroll cue */}
        <div className="pointer-events-none absolute bottom-3 left-1/2 -translate-x-1/2 text-base font-light text-muted opacity-70">
          ↓ 스크롤하여 이력서 보기
        </div>
      </div>

      <p className="text-lg lg:text-xl font-light text-muted anim-fade-up [--d:360ms]">
        ✦ 각 매듭이 서로를 비추는 인드라망처럼 — 노드를 눌러 경험과 기술의 연결을
        펼쳐보세요.
      </p>
    </section>
  );
};

export { Hero };
