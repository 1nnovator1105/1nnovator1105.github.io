import { RESUME_DATA } from "../model/data";
import { TaskSection } from "./TaskSection";

interface TaskProps {
  company: string;
}

const Task = ({ company }: TaskProps) => {
  const TASKS_ITEMS = RESUME_DATA.find((item) => item.company === company);

  return (
    <div className="flex flex-col">
      {TASKS_ITEMS?.tasks.map((task) => {
        return (
          <TaskSection
            key={`${company}-${task.section}`}
            section={task.section}
            sectionItems={task.items}
          />
        );
      })}
    </div>
  );
};

export { Task };
