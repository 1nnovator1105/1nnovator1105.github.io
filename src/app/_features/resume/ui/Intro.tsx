import Image from "next/image";
import Link from "next/link";
import { GithubIcon, TistoryIcon } from "../../shared/ui";

const Intro = () => {
  return (
    <div className="flex flex-row items-center justify-between w-full">
      <div className="flex flex-col gap-3">
        <h1 className="text-4xl lg:text-8xl font-bold">김민성</h1>

        <div className="text-2xl lg:text-5xl font-regular">
          Front-End Engineer
        </div>
        <hr className="w-[120px] h-[1.5px] bg-black" />
        <div className="flex flex-row items-center gap-2 text-2xl lg:text-4xl font-regular">
          <div>1nnovator1105@gmail.com</div>
        </div>
        <div className="flex-row items-center gap-6 lg:hidden flex">
          <Link
            href="https://github.com/1nnovator1105"
            target="_blank"
            className="hover:opacity-65 transition-colors duration-200"
          >
            <GithubIcon className="size-8" />
          </Link>
          <Link
            href="https://1nnovator.tistory.com/"
            target="_blank"
            className="hover:opacity-65 transition-colors duration-200"
          >
            <TistoryIcon className="size-8" />
          </Link>
        </div>
      </div>

      <div className="relative w-60 h-60 rounded-full overflow-hidden lg:block hidden">
        <Image
          src="/images/face.png"
          alt="face"
          fill
          className="object-cover"
        />
      </div>
    </div>
  );
};

export { Intro };
