import Link from "next/link";
import { GithubIcon, TistoryIcon } from "../../shared/ui";

const SayHello = () => {
  return (
    <div className="flex flex-col mt-4 w-full gap-4">
      <div className="text-xl lg:text-2xl font-regular">
        <div>안녕하세요 👋</div>
        <div>
          풀스택 개발자로 시작해서 현재는 프론트엔드 개발자로 경력을 이어 나가고
          있는 7년 차 개발자 김민성입니다
        </div>
      </div>

      <div className="flex flex-row items-center justify-between">
        <ul className="text-xl lg:text-2xl font-light list-none">
          <li>
            ✨ 제품을 이해하고, 기술이라는 도구를 활용하여 문제를 해결해요.
          </li>
          <li>✨ 빠르게 실험하고 검증하는 실행력을 중요하게 생각해요.</li>
          <li>✨ 더 나은 효율을 위해 고민하며 프로세스를 개선해 나가요.</li>
        </ul>

        <div className="flex-row items-center gap-6 lg:flex hidden">
          <Link
            href="https://github.com/1nnovator1105"
            target="_blank"
            className="hover:opacity-65 transition-colors duration-200"
          >
            <GithubIcon className="size-12" />
          </Link>
          <Link
            href="https://1nnovator.tistory.com/"
            target="_blank"
            className="hover:opacity-65 transition-colors duration-200"
          >
            <TistoryIcon className="size-12" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export { SayHello };
