import { TaskSectionItemType } from "../model/types";
import { TaskSectionItem } from "./elements";

interface TaskSectionProps {
  section: string;
  sectionItems: TaskSectionItemType[];
}

const TaskSection = ({ section, sectionItems }: TaskSectionProps) => {
  return (
    <div className="grid grid-cols-[80px_1fr] lg:grid-cols-[240px_1fr] border-b-[1.5px] border-black">
      <div className="text-xl lg:text-3xl font-regular pt-9 pl-9 flex-col">
        <div>주요 업무</div>
        <div dangerouslySetInnerHTML={{ __html: section }} />
      </div>
      <div className="flex flex-col py-9 gap-9">
        {sectionItems.map((item) => (
          <TaskSectionItem
            key={`${section}-${item.title}`}
            taskSectionItem={item}
          />
        ))}
      </div>
    </div>
  );
};

export { TaskSection };
