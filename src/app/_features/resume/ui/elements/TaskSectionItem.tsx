import Link from "next/link";
import {
  DescriptionListItemType,
  TaskSectionItemType,
} from "../../model/types";

interface TaskSectionItemProps {
  taskSectionItem: TaskSectionItemType;
}

const TaskSectionItem = ({ taskSectionItem }: TaskSectionItemProps) => {
  const renderTitle = () => {
    if (taskSectionItem.link) {
      return (
        <Link
          href={taskSectionItem.link}
          target="_blank"
          className="hover:underline"
        >
          <div className="text-xl lg:text-3xl font-regular break-words">
            {taskSectionItem.title}
          </div>
        </Link>
      );
    }

    return (
      <div className="text-xl lg:text-3xl font-regular break-words">
        {taskSectionItem.title}
      </div>
    );
  };

  const renderDescription = (description: DescriptionListItemType) => {
    if (typeof description === "string") {
      return <div dangerouslySetInnerHTML={{ __html: description }} />;
    }

    if (description.link) {
      return (
        <Link
          href={description.link}
          target="_blank"
          className="hover:underline"
        >
          <ul className="list-disc">
            <li>{description.item}</li>
          </ul>
        </Link>
      );
    }
  };

  return (
    <div className="flex flex-col gap-6 px-9">
      <div className="flex flex-row items-start justify-between gap-6">
        <div className="flex flex-col">
          {renderTitle()}
          {taskSectionItem.techStacks && (
            <div className="text-xl lg:text-2xl font-light">
              {taskSectionItem.techStacks.join(", ")}
            </div>
          )}
        </div>
        {taskSectionItem.period && (
          <div className="text-xl lg:text-2xl font-light text-right">
            {taskSectionItem.period}
          </div>
        )}
      </div>

      <ul className="text-xl lg:text-3xl font-light list-disc pl-8 space-y-4">
        {taskSectionItem.descriptionList.map((description) => {
          if (typeof description === "string") {
            return (
              <li
                key={description}
                dangerouslySetInnerHTML={{ __html: description }}
              />
            );
          } else {
            return (
              <ul key={description.item} className="list-disc">
                {renderDescription(description)}
                {description.subItems && (
                  <ul className="custom-list-circle pl-8">
                    {description.subItems.map((subItem) => (
                      <li
                        key={subItem}
                        dangerouslySetInnerHTML={{ __html: subItem }}
                      />
                    ))}
                  </ul>
                )}
              </ul>
            );
          }
        })}
      </ul>
    </div>
  );
};

export { TaskSectionItem };
