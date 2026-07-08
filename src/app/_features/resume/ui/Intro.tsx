import Image from "next/image";
import Link from "next/link";
import { GithubIcon, TistoryIcon } from "../../shared/ui";

const Intro = () => {
  return (
    <div className="flex flex-row items-center justify-between w-full">
      <div className="flex flex-col gap-3">
        <h1 className="text-4xl lg:text-8xl font-bold name-sheen anim-fade-up [--d:0ms]">
          김민성
        </h1>

        <div className="text-2xl lg:text-5xl font-regular anim-fade-up [--d:120ms]">
          Front-End Engineer
        </div>
        <hr className="w-[120px] h-[1.5px] bg-black border-0 anim-line" />
        <div className="flex flex-row items-center gap-2 text-2xl lg:text-4xl font-regular anim-fade-up [--d:260ms]">
          <div>1nnovator1105@gmail.com</div>
        </div>
        <div className="flex-row items-center gap-6 lg:hidden flex anim-fade-up [--d:360ms]">
          <Link
            href="https://github.com/1nnovator1105"
            target="_blank"
            className="hover:opacity-65 hover:-translate-y-0.5 transition-all duration-200"
          >
            <GithubIcon className="size-8" />
          </Link>
          <Link
            href="https://1nnovator.tistory.com/"
            target="_blank"
            className="hover:opacity-65 hover:-translate-y-0.5 transition-all duration-200"
          >
            <TistoryIcon className="size-8" />
          </Link>
        </div>
      </div>

      {/* opacity (fade-in) → translateY (idle float) → scale/ring (hover) are
          split across nested elements so they don't fight over `transform`. */}
      <div className="lg:block hidden anim-fade-in [--d:200ms]">
        <div className="anim-float">
          <div className="relative w-60 h-60 rounded-full overflow-hidden ring-2 ring-transparent shadow-sm transition-all duration-500 hover:ring-orange-500/60 hover:scale-[1.03] hover:shadow-xl">
            <Image
              src="/images/face.png"
              alt="face"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export { Intro };
