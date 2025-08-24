import Image from "next/image";
import { GithubIcon, TistoryIcon } from "../../shared/ui";
import Link from "next/link";

const Intro = () => {
  return (
    <div className="flex flex-row items-center justify-between w-full">
      <div className="flex flex-col gap-3">
        <h1 className="text-8xl font-bold">김민성</h1>

        <div className="text-5xl font-regular">Front-End Engineer</div>
        <hr className="w-[120px] h-[1.5px] bg-black" />
        <div className="flex flex-row items-center gap-2 text-4xl font-regular">
          <div>1nnovator1105@gmail.com</div>
          <div>010-8121-9790</div>
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
