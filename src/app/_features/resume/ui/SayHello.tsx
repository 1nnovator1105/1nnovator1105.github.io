const POINTS: string[] = [
  "✨ 제품을 이해하고, 기술이라는 도구를 활용하여 문제를 해결해요.",
  "✨ 빠르게 실험하고 검증하는 실행력을 중요하게 생각해요.",
  "✨ 더 나은 효율을 위해 고민하며 프로세스를 개선해 나가요.",
];

const SayHello = () => {
  return (
    <div className="flex flex-col w-full gap-4">
      <div className="text-xl lg:text-2xl font-regular text-body">
        <div>안녕하세요 👋</div>
        <div>
          풀스택 개발자로 시작해서 현재는 프론트엔드 개발자로 경력을 이어 나가고
          있는 7년 차 개발자 김민성입니다
        </div>
      </div>

      <ul className="text-xl lg:text-2xl font-light list-none text-body">
        {POINTS.map((text) => (
          <li
            key={text}
            className="transition-transform duration-200 hover:translate-x-1"
          >
            {text}
          </li>
        ))}
      </ul>
    </div>
  );
};

export { SayHello };
