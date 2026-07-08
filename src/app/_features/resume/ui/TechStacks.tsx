import { Reveal } from "../../shared/ui";
import { RESUME_DATA } from "../model/data";
import { TechStackItem } from "./elements";

interface TechStacksProps {
  company: string;
}

const TechStacks = ({ company }: TechStacksProps) => {
  const TECH_STACK_ITEMS = RESUME_DATA.find(
    (item) => item.company === company
  )?.techStacks;

  return (
    <div className="grid grid-cols-[80px_1fr] lg:grid-cols-[240px_1fr] py-9 border-b-[1.5px] border-line">
      <div className="text-xl lg:text-3xl font-regular pl-9">기술 스택</div>
      <div className="flex flex-col gap-2 pl-9">
        {TECH_STACK_ITEMS?.map((item, index) => (
          <Reveal key={`${company}-${item.title}`} delay={index * 90}>
            <TechStackItem title={item.title} description={item.description} />
          </Reveal>
        ))}
      </div>
    </div>
  );
};

export { TechStacks };
